#!/usr/bin/env node
/**
 * update_docs.js — working-with-git
 *
 * Pins the Git version via Homebrew (`brew info --json=v2 git`), records it in
 * PINNED_VERSION, then fetches version-matched reference content:
 *   1. Git command + concept docs as AsciiDoc from git/git `Documentation/git*.adoc`
 *      at the pinned tag (vX.Y.Z) → references/cli/*.adoc
 *   2. The Pro Git book (2nd ed.) as AsciiDoc from progit/progit2 `book/**` → references/book/*.asc
 *
 * Every file is freshness-stamped via the shared helper. When Homebrew is
 * unavailable (e.g. CI), the committed PINNED_VERSION tag is used as-is.
 *
 * Run: node skills/working-with-git/scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFS_DIR = path.join(SKILL_DIR, 'references');
const CLI_DIR = path.join(REFS_DIR, 'cli');
const BOOK_DIR = path.join(REFS_DIR, 'book');
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');
const RATE_LIMIT_DELAY_MS = 70;
const FAILURE_THRESHOLD = 0.25;
const RUN_NOW = new Date().toISOString();
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || '';
// git Documentation files to include: command pages (git-*) + concept pages (git*).
const GIT_DOC_RE = /^Documentation\/git[a-z0-9-]*\.adoc$/;
let docsChanged = false;

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

function normalizeVersion(v) {
  const m = String(v).match(/(\d+\.\d+\.\d+)/);
  return m ? m[1] : null;
}

// ---------------------------------------------------------------------------
// Version resolution (Homebrew → pin)
// ---------------------------------------------------------------------------

function brewStableGit() {
  try {
    const json = JSON.parse(execFileSync('brew', ['info', '--json=v2', 'git'], { encoding: 'utf8' }));
    return normalizeVersion(json.formulae[0].versions.stable);
  } catch {
    return null;
  }
}

function resolvePin() {
  const existing = fs.existsSync(PINNED_VERSION_FILE)
    ? parsePinnedVersion(fs.readFileSync(PINNED_VERSION_FILE, 'utf8'))
    : {};
  const brew = brewStableGit();
  if (brew) {
    const pin = { git: brew, tag: `v${brew}` };
    fs.writeFileSync(PINNED_VERSION_FILE, `git=${pin.git}\ntag=${pin.tag}\n`, 'utf8');
    console.log(`📌 Git pinned to ${pin.git} (via Homebrew)`);
    return pin;
  }
  if (!existing.tag) throw new Error('Homebrew unavailable and no PINNED_VERSION tag to fall back on');
  console.log(`📌 Homebrew unavailable; using committed pin ${existing.git} (${existing.tag})`);
  return existing;
}

// ---------------------------------------------------------------------------
// Fetch helpers (raw.githubusercontent.com → no API rate limit)
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchText(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'agent-skills-update-script/1.0', ...headers } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(fetchText(res.headers.location, headers));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          res.statusCode === 200
            ? resolve(Buffer.concat(chunks).toString('utf8'))
            : reject(new Error(`HTTP ${res.statusCode} for ${url}`)));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

function fetchTree(repo, ref) {
  const headers = { Accept: 'application/vnd.github+json' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  return fetchText(`https://api.github.com/repos/${repo}/git/trees/${ref}?recursive=1`, headers).then(JSON.parse);
}

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

// ---------------------------------------------------------------------------
// git/git Documentation (AsciiDoc, version-matched)
// ---------------------------------------------------------------------------

async function fetchGitDocs(pin) {
  console.log(`\n── git/git Documentation @ ${pin.tag} ──`);
  const tree = await fetchTree('git/git', pin.tag);
  if (tree.truncated) console.warn('  ⚠ git/git tree truncated — some pages may be missing');
  const files = tree.tree.filter((e) => e.type === 'blob' && GIT_DOC_RE.test(e.path));
  const results = [];
  for (const e of files) {
    const name = e.path.replace(/^Documentation\//, '');
    const url = `https://raw.githubusercontent.com/git/git/${pin.tag}/${e.path}`;
    try {
      const body = await fetchText(url);
      writeRef(path.join(CLI_DIR, name), body, `${url} @ ${pin.tag}`);
      results.push(true);
    } catch (err) {
      console.error(`  ✘ ${name}: ${err.message}`);
      results.push(false);
    }
    await sleep(RATE_LIMIT_DELAY_MS);
  }
  console.log(`  ✔ ${results.filter(Boolean).length}/${files.length} command/concept pages`);
  return results;
}

// ---------------------------------------------------------------------------
// Pro Git book (progit/progit2, AsciiDoc)
// ---------------------------------------------------------------------------

async function fetchProGit() {
  console.log('\n── Pro Git book (progit/progit2 @ main) ──');
  const tree = await fetchTree('progit/progit2', 'main');
  const files = tree.tree.filter((e) => e.type === 'blob' && /^book\/.*\.asc$/.test(e.path));
  const results = [];
  for (const e of files) {
    const name = e.path.replace(/^book\//, '').replace(/\//g, '__');
    const url = `https://raw.githubusercontent.com/progit/progit2/main/${e.path}`;
    try {
      const body = await fetchText(url);
      writeRef(path.join(BOOK_DIR, name), body, url);
      results.push(true);
    } catch (err) {
      console.error(`  ✘ ${name}: ${err.message}`);
      results.push(false);
    }
    await sleep(RATE_LIMIT_DELAY_MS);
  }
  console.log(`  ✔ ${results.filter(Boolean).length}/${files.length} book sections`);
  return results;
}

// ---------------------------------------------------------------------------
// VERSIONS.md
// ---------------------------------------------------------------------------

function writeVersions(pin) {
  const body = [
    '# Pinned versions',
    '',
    `Auto-stamped by \`scripts/update_docs.js\`. Last run: ${RUN_NOW.slice(0, 10)}`,
    '',
    `- **Git:** \`${pin.git}\` (\`${pin.tag}\`) — resolved via Homebrew stable. Command/concept docs in \`references/cli/\` are the AsciiDoc sources from \`git/git\` at this tag.`,
    '- **Pro Git book:** 2nd edition, fetched from `progit/progit2` `main` (the book is maintained as a living document; not version-tagged to Git releases).',
    '',
    'The Git pin is bumped automatically on each run from `brew info --json=v2 git`; bump locally with `brew upgrade git` then rerun the updater.',
    '',
  ].join('\n');
  writeRef(path.join(REFS_DIR, 'VERSIONS.md'), body, 'generated');
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  fs.mkdirSync(REFS_DIR, { recursive: true });
  const pin = resolvePin();
  console.log(`🚀 working-with-git updater (git=${pin.git} tag=${pin.tag})`);

  const results = [...(await fetchGitDocs(pin)), ...(await fetchProGit())];
  writeVersions(pin);

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  const failed = results.filter((r) => !r).length;
  const ratio = results.length ? failed / results.length : 1;
  if (results.length === 0 || ratio > FAILURE_THRESHOLD) {
    console.error(`❌ doc-fetch failure ratio ${(ratio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
  console.log(`✅ Done (${failed} failure(s) of ${results.length}).`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}

module.exports = { parsePinnedVersion, normalizeVersion };
