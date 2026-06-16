#!/usr/bin/env node
/**
 * update_docs.js — working-with-release-please
 *
 * Fetches release-please's official docs VERBATIM from the pinned git tags and
 * writes them to references/, each freshness-stamped via the shared
 * doc-frontmatter helper (source / fetched_at / sha256).
 *
 * There is no local binary to shell out to (unlike working-with-dolt) — this is
 * a pure-fetch updater. Two upstreams, both pinned by PINNED_VERSION:
 *
 *   googleapis/release-please         @ v<release_please>
 *     README.md                 -> references/release-please-README.md
 *     docs/*.md                 -> references/docs/*.md   (7 files)
 *     schemas/config.json       -> references/schemas/config.json
 *     schemas/manifest.json     -> references/schemas/manifest.json
 *   googleapis/release-please-action  @ v<release_please_action>
 *     README.md                 -> references/release-please-action-README.md
 *
 * references/guides/** is HAND-WRITTEN and never touched here.
 *
 * Pinning to the tag (not main) makes the snapshot reproducible: bump
 * PINNED_VERSION to refresh. Unchanged content keeps its old fetched_at (sha256
 * change-detection), so re-runs produce no git churn.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');
const DOCS_DIR = path.join(REFERENCES_DIR, 'docs');
const SCHEMAS_DIR = path.join(REFERENCES_DIR, 'schemas');
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');

const RUN_NOW = new Date().toISOString();
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

// ---------- pure helpers ----------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

// Build the full fetch plan (raw URL -> local path) from the pinned versions.
// release-please docs/ has exactly these 7 files (no node.md/python.md — per-
// language behavior lives in customizing.md + the README strategy table).
const RP_DOCS = [
  'cli', 'customizing', 'design', 'manifest-releaser', 'troubleshooting', 'java', 'java-releases',
];

function buildPlan(pin) {
  const rpBase = `https://raw.githubusercontent.com/googleapis/release-please/v${pin.release_please}`;
  const actionBase = `https://raw.githubusercontent.com/googleapis/release-please-action/v${pin.release_please_action}`;
  const plan = [
    { url: `${rpBase}/README.md`, dest: path.join(REFERENCES_DIR, 'release-please-README.md') },
    { url: `${rpBase}/schemas/config.json`, dest: path.join(SCHEMAS_DIR, 'config.json') },
    { url: `${rpBase}/schemas/manifest.json`, dest: path.join(SCHEMAS_DIR, 'manifest.json') },
    { url: `${actionBase}/README.md`, dest: path.join(REFERENCES_DIR, 'release-please-action-README.md') },
  ];
  for (const d of RP_DOCS) {
    plan.push({ url: `${rpBase}/docs/${d}.md`, dest: path.join(DOCS_DIR, `${d}.md`) });
  }
  return plan;
}

// ---------- fetch ----------

// Buffer chunks and decode once at the end — `data += chunk` corrupts multi-byte
// UTF-8 characters that straddle a chunk boundary. Follows redirects, retries
// transient failures with backoff.
function fetchUrl(url, headers = {}, attempt = 1) {
  const MAX_ATTEMPTS = 4;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'agent-skills', ...headers } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).toString();
        return resolve(fetchUrl(next, headers, attempt));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () =>
        res.statusCode >= 200 && res.statusCode < 300
          ? resolve(Buffer.concat(chunks).toString('utf8'))
          : reject(new Error(`HTTP ${res.statusCode} for ${url}`)));
    }).on('error', reject);
  }).catch((err) => {
    if (attempt >= MAX_ATTEMPTS) throw err;
    const delay = 600 * 2 ** (attempt - 1);
    return new Promise((r) => setTimeout(r, delay)).then(() => fetchUrl(url, headers, attempt + 1));
  });
}

function writeRef(filepath, body, source) {
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  // JSON schemas must remain valid JSON — a YAML frontmatter header would break
  // them. Write them verbatim; provenance (pinned-tag source) is documented in
  // SKILL.md, and change-detection falls back to a raw content compare.
  if (filepath.endsWith('.json')) {
    const prev = fs.existsSync(filepath) ? fs.readFileSync(filepath, 'utf8') : null;
    if (prev !== body) docsChanged = true;
    fs.writeFileSync(filepath, body, 'utf8');
    return;
  }
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

async function fetchAll(plan) {
  const results = [];
  for (const { url, dest } of plan) {
    try {
      const body = await fetchUrl(url);
      writeRef(dest, body, url);
      console.log(`  ✓ ${path.relative(REFERENCES_DIR, dest)}`);
      results.push(true);
    } catch (err) {
      console.error(`  ⚠ ${path.relative(REFERENCES_DIR, dest)}: ${err.message}`);
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
  if (!pin.release_please) throw new Error('PINNED_VERSION must define release_please=');
  if (!pin.release_please_action) throw new Error('PINNED_VERSION must define release_please_action=');

  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  console.log(`🚀 working-with-release-please updater (release-please=${pin.release_please}, action=${pin.release_please_action})`);

  const plan = buildPlan(pin);
  const results = await fetchAll(plan);

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
  console.log('✅ Done.');
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}

module.exports = { parsePinnedVersion, buildPlan, RP_DOCS };
