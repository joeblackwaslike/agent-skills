#!/usr/bin/env node

/**
 * update_docs.js
 *
 * Fetches the latest Vercel AI SDK documentation from ai-sdk.dev and saves it
 * to the references/ directory.
 *
 * Discovery: ai-sdk.dev publishes a markdown index at /sitemap.md listing every
 * page as a relative link. We keep the /docs/, /providers/, and /cookbook/
 * sections, append `.md` to each path (every page is served as Markdown that
 * way), and fetch them individually.
 *
 * Filenames: ai-sdk paths collide on basename (e.g. /docs/foundations/overview
 * and /docs/ai-sdk-core/overview both → "overview"), so we slugify the full
 * path (/ → __) instead of using path.basename.
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://ai-sdk.dev';
const SITEMAP_URL = `${BASE_URL}/sitemap.md`;
// Markdown links to in-scope sections: - [Title](/docs/...), /providers/..., /cookbook/...
const SITEMAP_LINK_PATTERN = /\]\((\/(?:docs|providers|cookbook)\/[^)\s#?]+)\)/g;
const REFERENCES_DIR = path.join(__dirname, '..', 'references');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');
const SKILL_MD = path.join(__dirname, '..', 'SKILL.md');
const RUN_NOW = new Date().toISOString();
// Fail the run only if more than this fraction of pages fail to fetch.
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

/**
 * Fetch content from a URL using the https module.
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Turn a doc path into a flat, collision-free reference filename.
 *   /docs/reference/ai-sdk-core/generate-text → docs__reference__ai-sdk-core__generate-text.md
 */
function slugForPath(docPath) {
  return docPath.replace(/^\//, '').replace(/\/+$/, '').replace(/\//g, '__') + '.md';
}

/**
 * Fetch the sitemap and extract the in-scope doc paths.
 */
async function getDocPaths() {
  console.log('📥 Fetching sitemap.md...');
  const content = await fetchUrl(SITEMAP_URL);

  const paths = new Set();
  for (const match of content.matchAll(SITEMAP_LINK_PATTERN)) {
    paths.add(match[1]);
  }
  return Array.from(paths).sort();
}

/**
 * Fetch and save a single documentation page (as Markdown).
 */
async function fetchAndSaveDoc(docPath) {
  const url = `${BASE_URL}${docPath}.md`;
  const filename = slugForPath(docPath);
  const filepath = path.join(REFERENCES_DIR, filename);

  try {
    console.log(`  Fetching ${docPath}...`);
    const content = await fetchUrl(url);
    const wrapped = withFrontmatter({ filePath: filepath, body: content, source: url, now: RUN_NOW });
    fs.writeFileSync(filepath, wrapped.content, 'utf8');
    if (wrapped.changed) docsChanged = true;
    return { url, filename, success: true };
  } catch (error) {
    console.error(`  ❌ Failed to fetch ${docPath}: ${error.message}`);
    return { url, filename, success: false, error: error.message };
  }
}

/**
 * Main execution.
 */
async function main() {
  console.log('🚀 Vercel AI SDK Documentation Updater\n');

  if (!fs.existsSync(REFERENCES_DIR)) {
    fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  }

  const paths = await getDocPaths();
  console.log(`✅ Found ${paths.length} in-scope documentation pages\n`);

  console.log('📥 Downloading documentation...');
  const results = [];
  for (const docPath of paths) {
    results.push(await fetchAndSaveDoc(docPath));
    // Small delay to be nice to the server.
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n✅ Documentation update complete!`);
  console.log(`   ${successful} files downloaded successfully`);
  if (failed > 0) {
    console.log(`   ${failed} files failed to download`);
  }
  console.log(`\n📁 Documentation saved to: ${REFERENCES_DIR}`);

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  // Only treat the run as failed if a large fraction of pages failed (one dead
  // sitemap link should not fail the whole run).
  const failureRatio = results.length ? failed / results.length : 1;
  if (results.length === 0 || failureRatio > FAILURE_THRESHOLD) {
    console.error(`\n❌ Failure ratio ${(failureRatio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { getDocPaths, fetchAndSaveDoc, slugForPath };
