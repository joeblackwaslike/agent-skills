#!/usr/bin/env node
/**
 * update_docs.js — working-with-serena
 *
 * Two outputs, both freshness-stamped via the shared doc-frontmatter helper:
 *
 *   references/cli/   — generated VERBATIM from the pinned `serena` (and
 *                       `serena-hooks`) CLIs, run through `uvx --from
 *                       serena-agent==<pin>` so the output is VERSION-EXACT and
 *                       reproducible in CI (no local install required). Gracefully
 *                       skipped when neither uvx nor a pin-matching local binary
 *                       is available.
 *   references/docs/  — fetched from the Sphinx docs site (oraios.github.io/serena).
 *                       There is no llms.txt or sitemap, so doc pages are discovered
 *                       from the rendered toctree on index.html and mapped to their
 *                       `_sources/<path>.md` Markdown originals. The docs site is NOT
 *                       URL-versioned, so these are a SNAPSHOT at fetch time (recorded
 *                       by fetched_at/sha256). Also fetches the repo's README/AGENTS/CLAUDE.
 *
 * Serena's CLI is standard Click (`Usage:` / `Commands:` blocks), so subcommands
 * are discovered by parsing the `Commands:` section of each group's help.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');
const CLI_DIR = path.join(REFERENCES_DIR, 'cli');
const DOCS_DIR = path.join(REFERENCES_DIR, 'docs');
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');

const DOCS_BASE = 'https://oraios.github.io/serena';
const DOCS_INDEX = `${DOCS_BASE}/index.html`;
const REPO_RAW = 'https://raw.githubusercontent.com/oraios/serena/main';
const REPO_FILES = ['README.md', 'AGENTS.md', 'CLAUDE.md'];
// Doc-tree pages to skip: eval write-ups / result blogs (noise, not API value) and
// Sphinx's auto-generated genindex/search pages (no `_sources/*.md` original exists).
const DOC_SKIP_RE = /^(04-evaluation\/|genindex$|search$)/;

const RUN_NOW = new Date().toISOString();
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

// ---------- pure helpers (unit-tested in cli-parsers.test.js) ----------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

function normalizeVersion(v) {
  const m = String(v).match(/(\d+\.\d+\.\d+)/);
  return m ? m[1] : null;
}

// Standard Click groups print a `Commands:` section listing "  <name>  <desc>".
// Leaf commands have no such section. Returns the subcommand names, sorted.
function parseClickCommands(helpText) {
  const lines = helpText.split('\n');
  const idx = lines.findIndex((l) => /^Commands:\s*$/.test(l));
  if (idx === -1) return [];
  const names = new Set();
  for (const line of lines.slice(idx + 1)) {
    if (/^\S/.test(line)) break; // dedent → next section
    const m = line.match(/^\s{2,}([a-z][a-z0-9-]*)\b/);
    if (m) names.add(m[1]);
  }
  return [...names].sort();
}

function filenameForCommand(cmdPath) {
  return cmdPath.join('__') + '.md';
}

// Slugify a docs path ("02-usage/030_clients" -> "02-usage__030_clients.md")
function slugForDocPath(docPath) {
  return docPath.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\//g, '__') + '.md';
}

// Pull internal .html toctree links out of the docs index, strip .html, drop
// anchors/externals and the skip-list, map to { mdUrl, slug }. Deduped + sorted.
function parseDocLinks(indexHtml) {
  const out = new Map();
  for (const m of indexHtml.matchAll(/href="([^"#?]+?)\.html"/g)) {
    let rel = m[1];
    if (/^https?:/i.test(rel) || rel.startsWith('/') || rel === 'index') continue;
    rel = rel.replace(/^\.\//, '');
    if (DOC_SKIP_RE.test(rel)) continue;
    out.set(rel, { mdUrl: `${DOCS_BASE}/_sources/${rel}.md`, slug: slugForDocPath(rel) });
  }
  return [...out.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

// ---------- shared writer ----------

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

// ---------- CLI generation (version-exact via uvx) ----------

// Resolve how to invoke a serena entrypoint at the pinned version.
//   1. `uvx --from serena-agent==<pin> <entry>`  (version-exact, CI-capable)
//   2. local `<entry>` ONLY if its --version matches the pin
// Returns a runner fn `(args) => stdout` or null if neither is available.
function resolveRunner(entry, pin) {
  // Try uvx first (deterministic).
  try {
    const probe = execFileSync('uvx', ['--from', `serena-agent==${pin}`, entry, '--help'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 300000 });
    if (probe) {
      return (args) => execFileSync('uvx', ['--from', `serena-agent==${pin}`, entry, ...args],
        { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 300000 });
    }
  } catch { /* fall through */ }

  // Fall back to a local binary at the exact pin.
  try {
    const ver = execFileSync(entry, ['--version'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    if (normalizeVersion(ver) === normalizeVersion(pin)) {
      return (args) => execFileSync(entry, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    }
  } catch { /* not present */ }

  return null;
}

// Generate <entry> --help, each command, and one level of subcommands.
function generateEntry(entry, run, pin, fileBase) {
  const top = run(['--help']);
  writeRef(path.join(CLI_DIR, `${fileBase}.md`), top, `${entry} --help @ serena-agent ${pin}`);

  for (const cmd of parseClickCommands(top)) {
    let cmdHelp;
    try {
      cmdHelp = run([cmd, '--help']);
    } catch (e) {
      console.error(`  ⚠ ${entry} ${cmd} --help failed: ${e.message}`);
      continue;
    }
    writeRef(path.join(CLI_DIR, filenameForCommand([fileBase, cmd])), cmdHelp, `${entry} ${cmd} --help @ serena-agent ${pin}`);

    for (const sub of parseClickCommands(cmdHelp)) {
      try {
        const subHelp = run([cmd, sub, '--help']);
        writeRef(path.join(CLI_DIR, filenameForCommand([fileBase, cmd, sub])), subHelp, `${entry} ${cmd} ${sub} --help @ serena-agent ${pin}`);
      } catch (e) {
        console.error(`  ⚠ ${entry} ${cmd} ${sub} --help failed: ${e.message}`);
      }
    }
  }
}

function generateCliRef(pin) {
  let generated = false;
  for (const [entry, base] of [['serena', '_index'], ['serena-hooks', 'serena-hooks']]) {
    const run = resolveRunner(entry, pin.serena_agent);
    if (!run) {
      console.log(`⏭  ${entry} unavailable at pin ${pin.serena_agent} (no uvx, no matching binary); skipping`);
      continue;
    }
    console.log(`🔧 Generating CLI reference for ${entry}...`);
    generateEntry(entry, run, pin.serena_agent, base);
    generated = true;
  }
  return generated;
}

// ---------- docs fetch (no binary needed) ----------

// Buffer chunks and decode once — `data += chunk` corrupts multi-byte UTF-8 that
// straddles a chunk boundary. Follows redirects.
function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'agent-skills', ...headers } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).toString();
        return resolve(fetchUrl(next, headers));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () =>
        res.statusCode >= 200 && res.statusCode < 300
          ? resolve(Buffer.concat(chunks).toString('utf8'))
          : reject(new Error(`HTTP ${res.statusCode} for ${url}`)));
    }).on('error', reject);
  });
}

async function fetchDocs() {
  console.log(`📥 Discovering doc pages from ${DOCS_INDEX}...`);
  const indexHtml = await fetchUrl(DOCS_INDEX);
  const pages = parseDocLinks(indexHtml);
  console.log(`   ${pages.length} doc pages discovered`);
  const results = [];

  for (const { mdUrl, slug } of pages) {
    try {
      const body = await fetchUrl(mdUrl);
      writeRef(path.join(DOCS_DIR, slug), body, mdUrl);
      results.push(true);
    } catch (err) {
      console.error(`  ⚠ ${slug}: ${err.message}`);
      results.push(false);
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  for (const file of REPO_FILES) {
    const url = `${REPO_RAW}/${file}`;
    try {
      const body = await fetchUrl(url);
      writeRef(path.join(DOCS_DIR, `repo__${file}`), body, url);
      results.push(true);
    } catch (err) {
      console.error(`  ⚠ repo__${file}: ${err.message}`);
      results.push(false);
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  return results;
}

// ---------- main ----------

async function main() {
  if (!fs.existsSync(PINNED_VERSION_FILE)) throw new Error(`Missing ${PINNED_VERSION_FILE}`);
  const pin = parsePinnedVersion(fs.readFileSync(PINNED_VERSION_FILE, 'utf8'));
  if (!pin.serena_agent) throw new Error('PINNED_VERSION must define serena_agent=');
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  console.log(`🚀 working-with-serena updater (serena-agent=${pin.serena_agent})`);

  generateCliRef(pin); // graceful skip handled inside
  const docResults = await fetchDocs();

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  const failed = docResults.filter((r) => !r).length;
  const ratio = docResults.length ? failed / docResults.length : 1;
  if (docResults.length === 0 || ratio > FAILURE_THRESHOLD) {
    console.error(`❌ doc-fetch failure ratio ${(ratio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
  console.log('✅ Done.');
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}

module.exports = {
  parsePinnedVersion, normalizeVersion, parseClickCommands, filenameForCommand,
  slugForDocPath, parseDocLinks,
};
