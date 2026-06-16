#!/usr/bin/env node

/**
 * update_docs.js — working-with-vercel (the hosting PLATFORM)
 *
 * Fetches the Vercel platform documentation (CLI, MCP server, deployments,
 * domains, env vars, functions, edge config, blob, firewall, …) from vercel.com.
 *
 * Scope split: the REST API reference (/docs/rest-api/*) and the OpenAPI spec are
 * intentionally EXCLUDED here — they live in the sibling `working-with-vercel-api`
 * skill (kept separate so each skill stays under the 8 MB skill-size limit). This
 * skill is NOT the Vercel AI SDK (`ai` package) either — that's
 * working-with-vercel-ai-sdk.
 *
 * Discovery: vercel.com/sitemap.xml lists every URL. We keep /docs/ pages (minus
 * /docs/rest-api) and fetch each as Markdown by appending `.md` to the path (every
 * doc page is served as clean Markdown that way — verified:
 * https://vercel.com/docs/cli.md). The curated index at vercel.com/llms.txt /
 * vercel.com/docs/sitemap.md is a fallback if the XML sitemap ever moves.
 *
 * Filenames: doc paths collide on basename, so we slugify the full path (/ → __)
 * and write them flat into references/ (e.g. references/docs__cli__deploy.md).
 *
 * Vercel docs and CLI are NOT URL-versioned — these are a SNAPSHOT at fetch time
 * (recorded by fetched_at/sha256 frontmatter), not a version pin. There is
 * intentionally no PINNED_VERSION file.
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const BASE_URL = 'https://vercel.com';
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');

const RUN_NOW = new Date().toISOString();
// Fail the run only if more than this fraction of doc pages fail to fetch.
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

/**
 * Fetch a URL over https. Buffers chunks and decodes once at the end —
 * `data += chunk` corrupts multi-byte UTF-8 that straddles a chunk boundary.
 * Follows cross-host and relative redirects.
 */
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
 * Extract in-scope (/docs/, minus /docs/rest-api) relative paths from sitemap.xml.
 * Returns a sorted, deduped array of paths like "/docs/cli/deploy".
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
    pathname = pathname.replace(/\/+$/, '') || '/docs';
    if (pathname !== '/docs' && !pathname.startsWith('/docs/')) continue;
    // REST API reference + OpenAPI spec live in working-with-vercel-api.
    if (pathname === '/docs/rest-api' || pathname.startsWith('/docs/rest-api/')) continue;
    paths.add(pathname);
  }
  return [...paths].sort();
}

/**
 * Turn a doc path into a flat, collision-free reference filename.
 *   /docs/cli/deploy → docs__cli__deploy.md
 */
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

async function main() {
  console.log('🚀 working-with-vercel (platform) documentation updater\n');
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });

  const paths = await getDocPaths();
  console.log(`✅ Found ${paths.length} in-scope /docs pages (REST API excluded)\n`);

  console.log('📥 Downloading documentation...');
  const results = [];
  for (const docPath of paths) {
    results.push(await fetchAndSaveDoc(docPath));
    await new Promise((r) => setTimeout(r, 100)); // be nice to the server
  }

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
