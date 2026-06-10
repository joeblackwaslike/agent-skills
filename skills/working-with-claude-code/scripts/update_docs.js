#!/usr/bin/env node

/**
 * update_docs.js
 *
 * Fetches the latest Claude Code documentation from code.claude.com
 * and saves it to the references/ directory.
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const LLMS_TXT_URL = 'https://code.claude.com/docs/llms.txt';
const DOCS_MAP_URL = 'https://code.claude.com/docs/en/claude_code_docs_map.md';
const CLAUDE_CODE_PATTERN = /https:\/\/code\.claude\.com\/docs\/en\/[^\s)]+\.md/g;
const REFERENCES_DIR = path.join(__dirname, '..', 'references');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');
const SKILL_MD = path.join(__dirname, '..', 'SKILL.md');
const RUN_NOW = new Date().toISOString();
let docsChanged = false;

/**
 * Fetch content from a URL using https module
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
 * Extract Claude Code doc URLs from llms.txt
 */
async function getClaudeCodeUrls() {
  console.log('📥 Fetching llms.txt...');
  const content = await fetchUrl(LLMS_TXT_URL);

  const urls = new Set();
  const matches = content.matchAll(CLAUDE_CODE_PATTERN);

  for (const match of matches) {
    urls.add(match[0]);
  }

  return Array.from(urls).sort();
}

/**
 * Fetch and save a single documentation page
 */
async function fetchAndSaveDoc(url) {
  const filename = path.basename(url);
  const filepath = path.join(REFERENCES_DIR, filename);

  try {
    console.log(`  Fetching ${filename}...`);
    const content = await fetchUrl(url);
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
  console.log('🚀 Claude Code Documentation Updater\n');

  // Ensure references directory exists
  if (!fs.existsSync(REFERENCES_DIR)) {
    fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  }

  // Get all Claude Code documentation URLs
  const urls = await getClaudeCodeUrls();
  console.log(`✅ Found ${urls.length} Claude Code documentation pages\n`);

  // Fetch documentation map (overview of all docs)
  console.log('📥 Downloading documentation map...');
  const mapResult = await fetchAndSaveDoc(DOCS_MAP_URL);

  // Fetch all documentation pages
  console.log('📥 Downloading documentation...');
  const results = [mapResult];
  for (const url of urls) {
    const result = await fetchAndSaveDoc(url);
    results.push(result);
    // Small delay to be nice to the server
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

module.exports = { getClaudeCodeUrls, fetchAndSaveDoc };
