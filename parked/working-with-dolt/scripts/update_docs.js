#!/usr/bin/env node
/**
 * update_docs.js — working-with-dolt
 *
 * Two outputs, both freshness-stamped via the shared doc-frontmatter helper:
 *
 *   references/cli/   — generated VERBATIM from the locally pinned `dolt` binary
 *                       (`dolt --help`, `dolt <cmd> --help`, `dolt <cmd> <sub> --help`).
 *                       Version-EXACT. Gracefully skipped when `dolt` is absent or
 *                       != the pin (e.g. in CI).
 *   references/docs/  — fetched from Dolt's llms.txt. The dolthub.com docs site is
 *                       NOT URL-versioned, so these are a SNAPSHOT at fetch time
 *                       (recorded by fetched_at/sha256), not a true version pin.
 *
 * Dolt's CLI help is NOT Cobra-standard. Group commands print
 *   "Valid commands for dolt <cmd> are" followed by "  <sub> - <desc>" lines;
 * leaf commands print a NAME/SYNOPSIS/DESCRIPTION block. The parser below keys
 * off the "Valid commands for" header to discover subcommands.
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

const LLMS_TXT_URL = 'https://www.dolthub.com/docs/llms.txt';
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

// A "Valid commands for ... are" block lists "  <name> - <desc>" lines. Only
// trust these names when the header is present (top-level help and group help).
function parseValidCommands(helpText) {
  if (!/Valid commands for /.test(helpText)) return [];
  const names = new Set();
  for (const line of helpText.split('\n')) {
    const m = line.match(/^\s{2,}([a-z][a-z0-9-]*)\s+-\s+\S/);
    if (m) names.add(m[1]);
  }
  return [...names].sort();
}

function filenameForCommand(cmdPath) {
  return cmdPath.join('__') + '.md';
}

// Slugify a docs path ("introduction/installation/mac" -> "introduction__installation__mac.md")
function slugForDocPath(docPath) {
  return docPath.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\//g, '__') + '.md';
}

// Pull every dolthub docs .md URL out of llms.txt, normalized to www host.
// Drops non-/docs/ links (e.g. /blog/ HTML). Returns [{ url, slug }].
function parseLlmsDocs(llmsText) {
  const out = new Map();
  for (const m of llmsText.matchAll(/https?:\/\/(?:www\.)?dolthub\.com\/docs\/([^()\s]+?\.md)/g)) {
    const relPath = m[1].replace(/\.md$/, '');
    const url = `https://www.dolthub.com/docs/${m[1]}`;
    out.set(url, { url, slug: slugForDocPath(relPath) });
  }
  return [...out.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

// ---------- CLI generation (needs the pinned `dolt`) ----------

function runDolt(args) {
  return execFileSync('dolt', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

function doltMatchesPin(pin) {
  try {
    return normalizeVersion(runDolt(['version'])) === normalizeVersion(pin.dolt);
  } catch {
    return false;
  }
}

function generateCliRef(pin) {
  if (!doltMatchesPin(pin)) {
    console.log(`⏭  dolt absent or != pinned ${pin.dolt}; skipping CLI generation`);
    return false;
  }
  console.log('🔧 Generating CLI reference from pinned dolt...');
  const topHelp = runDolt(['--help']);
  writeRef(path.join(CLI_DIR, '_index.md'), topHelp, `dolt --help @ ${pin.dolt}`);

  for (const cmd of parseValidCommands(topHelp)) {
    let cmdHelp;
    try {
      cmdHelp = runDolt([cmd, '--help']);
    } catch (e) {
      console.error(`  ⚠ dolt ${cmd} --help failed: ${e.message}`);
      continue;
    }
    writeRef(path.join(CLI_DIR, filenameForCommand([cmd])), cmdHelp, `dolt ${cmd} --help @ ${pin.dolt}`);

    // Group commands re-print a "Valid commands for dolt <cmd> are" block.
    for (const sub of parseValidCommands(cmdHelp)) {
      try {
        const subHelp = runDolt([cmd, sub, '--help']);
        writeRef(path.join(CLI_DIR, filenameForCommand([cmd, sub])), subHelp, `dolt ${cmd} ${sub} --help @ ${pin.dolt}`);
      } catch (e) {
        console.error(`  ⚠ dolt ${cmd} ${sub} --help failed: ${e.message}`);
      }
    }
  }
  return true;
}

// ---------- docs fetch (no `dolt` needed) ----------

// Buffer chunks and decode once at the end — `data += chunk` corrupts multi-byte
// UTF-8 characters that straddle a chunk boundary. Follows redirects.
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
  console.log(`📥 Fetching Dolt docs from ${LLMS_TXT_URL}...`);
  const llms = await fetchUrl(LLMS_TXT_URL);
  const docs = parseLlmsDocs(llms);
  console.log(`   ${docs.length} doc URLs discovered`);
  const results = [];
  for (const { url, slug } of docs) {
    try {
      const body = await fetchUrl(url);
      writeRef(path.join(DOCS_DIR, slug), body, url);
      results.push(true);
    } catch (err) {
      console.error(`  ⚠ ${slug}: ${err.message}`);
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
  if (!pin.dolt) throw new Error('PINNED_VERSION must define dolt=');
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  console.log(`🚀 working-with-dolt updater (dolt=${pin.dolt})`);

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
  parsePinnedVersion, normalizeVersion, parseValidCommands, filenameForCommand,
  slugForDocPath, parseLlmsDocs,
};
