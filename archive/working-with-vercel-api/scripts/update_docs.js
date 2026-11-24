#!/usr/bin/env node

/**
 * update_docs.js — working-with-vercel-api (the Vercel REST API)
 *
 * Two outputs, stored flat in references/:
 *
 *   openapi.yaml         — the machine-readable OpenAPI spec from openapi.vercel.sh,
 *                          converted JSON → YAML (canonical, readable, line-diffable
 *                          form). This is the COMPLETE, authoritative REST reference:
 *                          every endpoint, param, and schema. Conversion shells out
 *                          to `yq` (this repo has no npm deps); falls back to pretty
 *                          JSON (openapi.json) if yq is unavailable.
 *   docs__rest-api*.md   — the handful of CONCEPTUAL REST pages from vercel.com
 *                          (overview, errors, sdk). Per-endpoint doc pages are
 *                          intentionally omitted — they're generated from the spec
 *                          above, so bundling both would duplicate ~3 MB.
 *
 * Split rationale: the REST surface (spec + docs) is large enough that bundling it
 * with the platform docs would push a single skill past the 8 MB limit, hence the
 * sibling `working-with-vercel` (CLI + MCP + platform) / `working-with-vercel-api`
 * (this skill) split.
 *
 * Snapshot freshness only (fetched_at/sha256) — the API/docs are not URL-versioned,
 * so there is no PINNED_VERSION file.
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');
const { execFileSync } = require('child_process');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const BASE_URL = 'https://vercel.com';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;
const OPENAPI_URL = 'https://openapi.vercel.sh';

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');
const OPENAPI_YAML = path.join(REFERENCES_DIR, 'openapi.yaml');
const OPENAPI_JSON = path.join(REFERENCES_DIR, 'openapi.json');

const RUN_NOW = new Date().toISOString();
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'agent-skills', ...headers } }, (res) => {
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
            : reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`)),
        );
      })
      .on('error', reject);
  });
}

/**
 * Keep only the CONCEPTUAL REST pages: /docs/rest-api itself and one-level-deep
 * pages like /docs/rest-api/errors, /docs/rest-api/sdk. Per-endpoint pages have a
 * deeper path (/docs/rest-api/<group>/<action>) and are dropped — they duplicate
 * the OpenAPI spec.
 */
function parseSitemap(xml) {
  const paths = new Set();
  for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)) {
    let pathname;
    try {
      pathname = new URL(m[1]).pathname;
    } catch {
      continue;
    }
    pathname = pathname.replace(/\/+$/, '');
    if (pathname !== '/docs/rest-api' && !pathname.startsWith('/docs/rest-api/')) continue;
    const segments = pathname.split('/').filter(Boolean); // ['docs','rest-api', ...]
    if (segments.length > 3) continue; // drop per-endpoint pages
    paths.add(pathname);
  }
  return [...paths].sort();
}

function slugForPath(docPath) {
  return docPath.replace(/^\//, '').replace(/\/+$/, '').replace(/\//g, '__') + '.md';
}

async function getDocPaths() {
  console.log('📥 Fetching sitemap.xml...');
  const xml = await fetchUrl(SITEMAP_URL);
  return parseSitemap(xml);
}

async function fetchAndSaveDoc(docPath) {
  const url = `${BASE_URL}${docPath}.md`;
  const filepath = path.join(REFERENCES_DIR, slugForPath(docPath));
  try {
    const content = await fetchUrl(url);
    const wrapped = withFrontmatter({ filePath: filepath, body: content, source: url, now: RUN_NOW });
    fs.mkdirSync(path.dirname(filepath), { recursive: true });
    fs.writeFileSync(filepath, wrapped.content, 'utf8');
    if (wrapped.changed) docsChanged = true;
    return { url, success: true };
  } catch (error) {
    console.error(`  ❌ ${docPath}: ${error.message}`);
    return { url, success: false, error: error.message };
  }
}

/**
 * Fetch the OpenAPI spec and store it as YAML (readable, line-diffable). Shells out
 * to `yq` for JSON → YAML; falls back to pretty JSON if yq/JSON is unavailable.
 * No frontmatter — it's a spec, not a doc. Change-detected via sha256. Non-fatal.
 */
async function fetchOpenApi() {
  console.log('📥 Fetching OpenAPI spec...');
  let body;
  try {
    body = await fetchUrl(OPENAPI_URL, { Accept: 'application/json' });
  } catch (error) {
    console.error(`  ⚠ OpenAPI fetch failed (non-fatal): ${error.message}`);
    return;
  }
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });

  let outFile = OPENAPI_YAML;
  let out;
  try {
    const pretty = JSON.stringify(JSON.parse(body), null, 2) + '\n';
    out = execFileSync('yq', ['-p', 'json', '-o', 'yaml'], {
      input: pretty,
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    });
    if (fs.existsSync(OPENAPI_JSON)) fs.rmSync(OPENAPI_JSON); // drop stale JSON copy
  } catch (e) {
    console.error(`  ⚠ YAML conversion unavailable (${e.message.split('\n')[0]}); writing JSON`);
    outFile = OPENAPI_JSON;
    out = body;
    if (fs.existsSync(OPENAPI_YAML)) fs.rmSync(OPENAPI_YAML);
  }

  const newHash = createHash('sha256').update(out, 'utf8').digest('hex');
  const prevHash = fs.existsSync(outFile)
    ? createHash('sha256').update(fs.readFileSync(outFile, 'utf8'), 'utf8').digest('hex')
    : null;
  fs.writeFileSync(outFile, out, 'utf8');
  if (newHash !== prevHash) docsChanged = true;
  console.log(`   OpenAPI spec saved → ${path.basename(outFile)} (${(out.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log('🚀 working-with-vercel-api documentation updater\n');
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });

  const paths = await getDocPaths();
  console.log(`✅ Found ${paths.length} conceptual REST pages\n`);

  const results = [];
  for (const docPath of paths) {
    results.push(await fetchAndSaveDoc(docPath));
    await new Promise((r) => setTimeout(r, 100));
  }

  await fetchOpenApi();

  const successful = results.filter((r) => r.success).length;
  const failed = results.length - successful;
  console.log(`\n✅ ${successful} docs saved, ${failed} failed`);
  console.log(`📁 ${REFERENCES_DIR}`);

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  const failureRatio = results.length ? failed / results.length : 1;
  if (results.length === 0 || failureRatio > FAILURE_THRESHOLD) {
    console.error(`\n❌ Failure ratio ${(failureRatio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { getDocPaths, fetchAndSaveDoc, slugForPath, parseSitemap };
