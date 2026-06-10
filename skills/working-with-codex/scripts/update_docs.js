#!/usr/bin/env node

/**
 * update_docs.js
 *
 * Fetches the latest Codex CLI documentation from OpenAI sources
 * and saves it to the references/ directory.
 *
 * Fetch strategy:
 *   1. Try platform.openai.com/llms.txt — extract Codex CLI doc URLs
 *   2. Fall back to GitHub API — discover markdown files in openai/codex repo
 *   3. Always fetch README.md from the GitHub repo directly
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_REPO = 'openai/codex';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/openai/codex/main';
const GITHUB_API_TREE = 'https://api.github.com/repos/openai/codex/git/trees/main?recursive=1';
const LLMS_TXT_URL = 'https://platform.openai.com/llms.txt';
const CODEX_DOC_PATTERN = /https:\/\/platform\.openai\.com\/docs\/[^\s)]+\.md/g;
const REFERENCES_DIR = path.join(__dirname, '..', 'references');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');
const SKILL_MD = path.join(__dirname, '..', 'SKILL.md');
const RUN_NOW = new Date().toISOString();
let docsChanged = false;
const USER_AGENT = 'agent-skills-updater/1.0 (github.com/joeblackwaslike/agent-skills)';

/**
 * Fetch content from a URL using https module
 */
function fetchUrl(url, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'application/json',
        ...extraHeaders,
      },
    };
    https.get(url, options, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, extraHeaders).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        }
      });
    }).on('error', reject);
  });
}

/**
 * Try to get Codex CLI doc URLs from platform.openai.com/llms.txt
 * Returns an array of URLs (may be empty if llms.txt doesn't exist or has none).
 */
async function getUrlsFromLlmsTxt() {
  try {
    console.log('  Trying platform.openai.com/llms.txt...');
    const content = await fetchUrl(LLMS_TXT_URL, { 'Accept': 'text/plain' });
    const allMatches = [...content.matchAll(CODEX_DOC_PATTERN)].map(m => m[0]);
    // Filter for codex-related paths
    const codexUrls = allMatches.filter(u =>
      /\/(codex|agents?)\//i.test(u)
    );
    if (codexUrls.length > 0) {
      console.log(`  ✅ Found ${codexUrls.length} Codex doc URLs in llms.txt`);
    } else {
      console.log(`  ⚠️  llms.txt found but no Codex CLI URLs matched — will use GitHub fallback`);
    }
    return codexUrls;
  } catch (err) {
    console.log(`  ⚠️  llms.txt not available (${err.message}) — using GitHub fallback`);
    return [];
  }
}

/**
 * Get markdown file paths from the GitHub repo tree API
 */
async function getUrlsFromGitHub() {
  console.log('  Fetching GitHub repo tree (openai/codex)...');
  const treeJson = await fetchUrl(GITHUB_API_TREE, {
    'Accept': 'application/vnd.github.v3+json',
  });
  const tree = JSON.parse(treeJson);

  if (tree.message) {
    throw new Error(`GitHub API error: ${tree.message}`);
  }

  const mdPaths = (tree.tree || [])
    .filter(item => item.type === 'blob' && item.path.endsWith('.md'))
    .map(item => item.path);

  console.log(`  ✅ Found ${mdPaths.length} markdown files in GitHub repo`);
  return mdPaths.map(p => `${GITHUB_RAW_BASE}/${p}`);
}

/**
 * Derive a safe filename from a URL
 */
function urlToFilename(url) {
  // For platform.openai.com URLs: use basename
  // For raw.githubusercontent.com URLs: use the path basename, but prefix with directory
  // to avoid collisions (e.g. docs/plugins.md and docs/advanced/plugins.md)
  if (url.startsWith(GITHUB_RAW_BASE)) {
    const rel = url.slice(GITHUB_RAW_BASE.length + 1); // strip leading /
    // Flatten: replace / with - except keep the basename
    const parts = rel.split('/');
    if (parts.length === 1) return parts[0];
    // Prefix with parent dir to avoid name collisions
    return parts.slice(-2).join('-');
  }
  return path.basename(url);
}

/**
 * Fetch and save a single documentation page
 */
async function fetchAndSaveDoc(url) {
  const filename = urlToFilename(url);
  const filepath = path.join(REFERENCES_DIR, filename);

  try {
    console.log(`  Fetching ${filename}...`);
    const content = await fetchUrl(url, { 'Accept': 'text/plain, text/markdown' });
    const wrapped = withFrontmatter({ filePath: filepath, body: content, source: url, now: RUN_NOW });
    fs.writeFileSync(filepath, wrapped.content, 'utf8');
    if (wrapped.changed) docsChanged = true;
    return { url, filename, success: true };
  } catch (error) {
    console.error(`  ❌ Failed to fetch ${filename}: ${error.message}`);
    return { url, filename, success: false, error: error.message };
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Codex CLI Documentation Updater\n');

  // Ensure references directory exists
  if (!fs.existsSync(REFERENCES_DIR)) {
    fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  }

  // Step 1: Always fetch the main README (guaranteed to exist)
  const readmeUrl = `${GITHUB_RAW_BASE}/README.md`;
  console.log('📥 Fetching main README...');
  const readmeResult = await fetchAndSaveDoc(readmeUrl);

  // Step 2: Try llms.txt first, fall back to GitHub tree
  let docUrls = [];
  console.log('\n📥 Discovering documentation sources...');

  docUrls = await getUrlsFromLlmsTxt();

  if (docUrls.length === 0) {
    docUrls = await getUrlsFromGitHub();
    // Filter out README.md since we already fetched it
    docUrls = docUrls.filter(u => !u.endsWith('/README.md'));
  }

  // Step 3: Download all discovered pages
  console.log(`\n📥 Downloading ${docUrls.length} documentation pages...`);
  const results = [readmeResult];

  for (const url of docUrls) {
    const result = await fetchAndSaveDoc(url);
    results.push(result);
    // Small delay to be polite
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Summary
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
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { getUrlsFromLlmsTxt, getUrlsFromGitHub, fetchAndSaveDoc };
