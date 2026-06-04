#!/usr/bin/env node

/**
 * update_docs.js
 *
 * Fetches the latest OpenCode documentation from official sources
 * and saves it to the references/ directory.
 *
 * Fetch strategy:
 *   1. Try opencode.ai/llms.txt — extract OpenCode doc URLs
 *   2. Fall back to GitHub API — discover markdown files in opencode-ai/opencode repo
 *   3. Always fetch README.md from the GitHub repo directly
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_REPO = 'anomalyco/opencode';
const GITHUB_BRANCH = 'dev';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/anomalyco/opencode/${GITHUB_BRANCH}`;
const GITHUB_API_TREE = `https://api.github.com/repos/anomalyco/opencode/git/trees/${GITHUB_BRANCH}?recursive=1`;
const LLMS_TXT_URL = 'https://opencode.ai/llms.txt';
const OPENCODE_DOC_PATTERN = /https?:\/\/opencode\.ai\/docs\/[^\s)]+/g;

// Files to skip (test fixtures, changelogs, translations, spec drafts, etc.)
const SKIP_PATTERNS = [
  /^\.github\//,
  /^README\.(ar|bn|br|bs|da|de|es|fr|gr|it|ja|ko|no|pl|ru|th|tr|uk|vi|zh|zht)\.md$/,
  /\/glossary\//,
  /\/fixtures?\//,
  /\/specs?\//,
  /BUN_SHELL_MIGRATION/,
  /EFFECT_TEST_MIGRATION/,
  /\/perf\//,
  /pull_request_template/,
  /\/icons\//,
];
const REFERENCES_DIR = path.join(__dirname, '..', 'references');
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
 * Try to get OpenCode doc URLs from opencode.ai/llms.txt
 * Returns an array of URLs (may be empty if llms.txt doesn't exist or has none).
 */
async function getUrlsFromLlmsTxt() {
  try {
    console.log('  Trying opencode.ai/llms.txt...');
    const content = await fetchUrl(LLMS_TXT_URL, { 'Accept': 'text/plain' });
    const allMatches = [...content.matchAll(OPENCODE_DOC_PATTERN)].map(m => m[0]);
    if (allMatches.length > 0) {
      console.log(`  ✅ Found ${allMatches.length} OpenCode doc URLs in llms.txt`);
    } else {
      console.log(`  ⚠️  llms.txt found but no OpenCode doc URLs matched — will use GitHub fallback`);
    }
    return allMatches;
  } catch (err) {
    console.log(`  ⚠️  llms.txt not available (${err.message}) — using GitHub fallback`);
    return [];
  }
}

/**
 * Get markdown file paths from the GitHub repo tree API
 */
async function getUrlsFromGitHub() {
  console.log('  Fetching GitHub repo tree (opencode-ai/opencode)...');
  const treeJson = await fetchUrl(GITHUB_API_TREE, {
    'Accept': 'application/vnd.github.v3+json',
  });
  const tree = JSON.parse(treeJson);

  if (tree.message) {
    throw new Error(`GitHub API error: ${tree.message}`);
  }

  const mdPaths = (tree.tree || [])
    .filter(item => item.type === 'blob' && item.path.endsWith('.md'))
    .filter(item => !SKIP_PATTERNS.some(p => p.test(item.path)))
    .map(item => item.path);

  console.log(`  ✅ Found ${mdPaths.length} markdown files in GitHub repo`);
  return mdPaths.map(p => `${GITHUB_RAW_BASE}/${p}`);
}

/**
 * Derive a safe filename from a URL
 */
function urlToFilename(url) {
  if (url.startsWith(GITHUB_RAW_BASE)) {
    const rel = url.slice(GITHUB_RAW_BASE.length + 1);
    const parts = rel.split('/');
    if (parts.length === 1) return parts[0];
    // Prefix with parent dir to avoid name collisions
    return parts.slice(-2).join('-');
  }
  // For opencode.ai/docs URLs, derive filename from the path
  try {
    const u = new URL(url);
    const parts = u.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    return 'docs-' + parts.slice(1).join('-') + '.md';
  } catch {
    return path.basename(url);
  }
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
    fs.writeFileSync(filepath, content, 'utf8');
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
  console.log('🚀 OpenCode Documentation Updater\n');

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
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { getUrlsFromLlmsTxt, getUrlsFromGitHub, fetchAndSaveDoc };
