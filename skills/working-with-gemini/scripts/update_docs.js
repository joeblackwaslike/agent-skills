#!/usr/bin/env node

/**
 * update_docs.js
 *
 * Fetches the latest Gemini CLI documentation from official Google GitHub repos
 * and saves it to the references/ directory.
 *
 * Sources:
 *   1. github.com/google-gemini/gemini-cli  — main docs/ directory
 *   2. github.com/google-gemini/gemini-skills — skills library reference (if available)
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REPOS = [
  {
    name: 'gemini-cli',
    owner: 'google-gemini',
    repo: 'gemini-cli',
    branch: 'main',
  },
  {
    name: 'gemini-skills',
    owner: 'google-gemini',
    repo: 'gemini-skills',
    branch: 'main',
    optional: true, // skip gracefully if repo doesn't exist
  },
];

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';
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
 * Get all markdown file paths from a GitHub repo tree
 */
async function getMarkdownUrlsFromRepo({ owner, repo, branch, optional }) {
  const treeUrl = `${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  try {
    console.log(`  Fetching GitHub tree: ${owner}/${repo}...`);
    const treeJson = await fetchUrl(treeUrl, {
      'Accept': 'application/vnd.github.v3+json',
    });
    const tree = JSON.parse(treeJson);

    if (tree.message) {
      if (optional) {
        console.log(`  ⚠️  ${owner}/${repo} not available (${tree.message}) — skipping`);
        return [];
      }
      throw new Error(`GitHub API error: ${tree.message}`);
    }

    const mdPaths = (tree.tree || [])
      .filter(item => item.type === 'blob' && item.path.endsWith('.md'))
      .map(item => item.path);

    console.log(`  ✅ Found ${mdPaths.length} markdown files in ${owner}/${repo}`);
    return mdPaths.map(p => ({
      url: `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${p}`,
      repoName: repo,
      filePath: p,
    }));
  } catch (err) {
    if (optional) {
      console.log(`  ⚠️  ${owner}/${repo} not reachable (${err.message}) — skipping`);
      return [];
    }
    throw err;
  }
}

/**
 * Derive a safe, human-readable filename from a repo path.
 * Flattens directory structure while preserving enough context to be useful.
 *
 * Examples:
 *   docs/cli/skills.md          → docs-skills.md
 *   docs/extensions.md          → docs-extensions.md
 *   README.md                   → README.md
 *   CHANGELOG.md                → CHANGELOG.md
 *   docs/cli/creating-skills.md → docs-creating-skills.md
 */
function pathToFilename(repoName, filePath) {
  const parts = filePath.split('/');
  const basename = parts[parts.length - 1];

  // Root-level special files keep their name
  if (parts.length === 1) return basename;

  // For docs/ paths, prefix with "docs-" + basename (drop intermediate dirs)
  const topDir = parts[0];
  if (topDir === 'docs') {
    return `docs-${basename}`;
  }

  // For paths from secondary repos, prefix with repo shortname
  if (repoName !== 'gemini-cli') {
    return `${repoName}-${parts.slice(-2).join('-')}`;
  }

  // Default: parent-basename
  return parts.slice(-2).join('-');
}

/**
 * Fetch and save a single documentation page
 */
async function fetchAndSaveDoc({ url, repoName, filePath }) {
  const filename = pathToFilename(repoName, filePath);
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
  console.log('🚀 Gemini CLI & Antigravity CLI Documentation Updater\n');

  if (!fs.existsSync(REFERENCES_DIR)) {
    fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  }

  // Collect all doc entries from all repos
  let allEntries = [];
  console.log('📥 Discovering documentation sources...\n');
  for (const repo of REPOS) {
    const entries = await getMarkdownUrlsFromRepo(repo);
    allEntries = allEntries.concat(entries);
  }

  // Deduplicate by filename (later repos win on collision)
  const seen = new Map();
  for (const entry of allEntries) {
    seen.set(pathToFilename(entry.repoName, entry.filePath), entry);
  }
  const deduped = Array.from(seen.values());

  console.log(`\n📥 Downloading ${deduped.length} documentation pages...`);
  const results = [];

  for (const entry of deduped) {
    const result = await fetchAndSaveDoc(entry);
    results.push(result);
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
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { getMarkdownUrlsFromRepo, fetchAndSaveDoc };
