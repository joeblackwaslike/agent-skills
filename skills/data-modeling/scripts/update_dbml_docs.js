#!/usr/bin/env node

/**
 * Fetches the official DBML syntax and CLI docs (markdown source in holistics/dbml)
 * into references/ with source, fetched_at and sha256 frontmatter.
 *
 * Usage: node scripts/update_dbml_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const RAW_BASE = 'https://raw.githubusercontent.com/holistics/dbml/master/dbml-homepage/docs';
const PAGES = [
  { url: `${RAW_BASE}/docs.md`, file: 'dbml-syntax.md' },
  { url: `${RAW_BASE}/cli.md`, file: 'dbml-cli.md' },
];
const REFERENCES_DIR = path.join(__dirname, '..', 'references');
const SKILL_MD = path.join(__dirname, '..', 'SKILL.md');
const SOURCE_FRONTMATTER_RE = /^---\n[\s\S]*?\n---\n/;
const RUN_NOW = new Date().toISOString();

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
          else reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        });
      })
      .on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  let docsChanged = false;

  for (const { url, file } of PAGES) {
    const body = (await fetchUrl(url)).replace(SOURCE_FRONTMATTER_RE, '');
    const filePath = path.join(REFERENCES_DIR, file);
    const wrapped = withFrontmatter({ filePath, body, source: url, now: RUN_NOW });
    fs.writeFileSync(filePath, wrapped.content, 'utf8');
    if (wrapped.changed) docsChanged = true;
    console.log(`  ${file}${wrapped.changed ? ' (changed)' : ''}`);
  }

  if (docsChanged) setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
}

main().catch((error) => {
  console.error(`update_dbml_docs failed: ${error.message}`);
  process.exit(1);
});
