#!/usr/bin/env node

/**
 * update_docs.js
 *
 * Fetches the latest Cursor IDE documentation from official sources
 * and saves it to the references/ directory.
 *
 * Fetch strategy:
 *   1. Try cursor.com/llms.txt — extract cursor.com/docs/** URLs
 *   2. Try cursor.com/docs/llms.txt — alternative location
 *   3. Fallback: fetch a curated list of known cursor.com/docs pages
 *
 * Usage: node scripts/update_docs.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CURSOR_DOC_PATTERN = /https?:\/\/(?:www\.)?cursor\.com\/docs\/[^\s)<>"]+/g;
const LLMS_TXT_URLS = [
  'https://cursor.com/llms.txt',
  'https://cursor.com/docs/llms.txt',
  'https://www.cursor.com/llms.txt',
];

// Curated fallback: known cursor.com/docs page paths
const CURATED_DOC_PATHS = [
  '/docs/overview',
  '/docs/get-started/introduction',
  '/docs/get-started/installation',
  '/docs/context/rules',
  '/docs/context/codebase-indexing',
  '/docs/context/at-symbols',
  '/docs/context/model-context-protocol',
  '/docs/skills',
  '/docs/plugins',
  '/docs/mcp',
  '/docs/agents',
  '/docs/commands',
  '/docs/hooks',
  '/docs/settings',
  '/docs/chat/overview',
  '/docs/chat/agent',
  '/docs/chat/ask',
  '/docs/tab/overview',
  '/docs/tab/settings',
  '/docs/editor/overview',
  '/docs/customization/extensions',
  '/docs/customization/themes',
  '/docs/troubleshooting',
  '/docs/faq',
  '/docs/security',
  '/docs/privacy',
];

const REFERENCES_DIR = path.join(__dirname, '..', 'references');
const USER_AGENT = 'agent-skills-updater/1.0 (github.com/joeblackwaslike/agent-skills)';

function fetchUrl(url, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const options = {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/plain, text/markdown, text/html',
        ...extraHeaders,
      },
    };
    lib.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location, extraHeaders).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ body: data, contentType: res.headers['content-type'] || '' });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        }
      });
    }).on('error', reject);
  });
}

async function getUrlsFromLlmsTxt() {
  for (const llmsUrl of LLMS_TXT_URLS) {
    try {
      console.log(`  Trying ${llmsUrl}...`);
      const { body } = await fetchUrl(llmsUrl);
      const matches = [...body.matchAll(CURSOR_DOC_PATTERN)].map(m => m[0]);
      const unique = [...new Set(matches)];
      if (unique.length > 0) {
        console.log(`  ✅ Found ${unique.length} Cursor doc URLs in ${llmsUrl}`);
        return unique;
      }
      console.log(`  ⚠️  Found but no cursor.com/docs URLs matched`);
    } catch (err) {
      console.log(`  ⚠️  Not available (${err.message})`);
    }
  }
  return [];
}

function urlToFilename(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.replace(/\/$/, '').split('/').filter(Boolean);
    // Drop leading 'docs'
    const relevant = parts[0] === 'docs' ? parts.slice(1) : parts;
    // Strip existing .md extension from last segment before joining
    const last = relevant[relevant.length - 1].replace(/\.md$/, '');
    const slug = [...relevant.slice(0, -1), last].join('-');
    return slug + '.md';
  } catch {
    return path.basename(url).replace(/\.md$/, '').replace(/[^a-z0-9-]/gi, '-') + '.md';
  }
}

function pathToFilename(docPath) {
  const parts = docPath.replace(/\/$/, '').split('/').filter(Boolean);
  const relevant = parts[0] === 'docs' ? parts.slice(1) : parts;
  return relevant.join('-') + '.md';
}

async function fetchAndSave(url, filename) {
  const filepath = path.join(REFERENCES_DIR, filename);
  try {
    console.log(`  Fetching ${filename}...`);
    const { body, contentType } = await fetchUrl(url);
    // Save content regardless — AI models can parse HTML if needed
    fs.writeFileSync(filepath, body, 'utf8');
    return { url, filename, success: true };
  } catch (err) {
    console.error(`  ❌ Failed ${filename}: ${err.message}`);
    return { url, filename, success: false };
  }
}

async function main() {
  console.log('🚀 Cursor Documentation Updater\n');

  if (!fs.existsSync(REFERENCES_DIR)) {
    fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  }

  // Step 1: Try llms.txt sources
  console.log('📥 Discovering documentation sources...');
  let docUrls = await getUrlsFromLlmsTxt();

  const results = [];

  if (docUrls.length > 0) {
    // Use llms.txt URLs
    console.log(`\n📥 Downloading ${docUrls.length} pages from llms.txt...`);
    for (const url of docUrls) {
      const filename = urlToFilename(url);
      results.push(await fetchAndSave(url, filename));
      await new Promise(r => setTimeout(r, 100));
    }
  } else {
    // Curated fallback
    console.log('\n📥 No llms.txt found — using curated fallback list...');
    console.log(`  Fetching ${CURATED_DOC_PATHS.length} known cursor.com/docs pages`);
    for (const docPath of CURATED_DOC_PATHS) {
      const url = `https://cursor.com${docPath}`;
      const filename = pathToFilename(docPath);
      results.push(await fetchAndSave(url, filename));
      await new Promise(r => setTimeout(r, 150));
    }
  }

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`\n✅ Documentation update complete!`);
  console.log(`   ${successful} files downloaded`);
  if (failed > 0) console.log(`   ${failed} files failed`);
  console.log(`\n📁 References saved to: ${REFERENCES_DIR}`);
}

if (require.main === module) {
  main().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
}

module.exports = { getUrlsFromLlmsTxt, fetchAndSave };
