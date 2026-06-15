#!/usr/bin/env node
/**
 * update_docs.js — developing-for-github
 *
 * Content for *building on* GitHub (Apps, OAuth apps, webhooks, Octokit JS/TS):
 *   1. docs.github.com guides — curated map of raw markdown from github/docs
 *      (creating GitHub Apps, app auth/JWT/installation tokens, OAuth apps, webhooks).
 *   2. Octokit SDK READMEs — fetched raw from each octokit/* repo (main→master fallback).
 *   3. SDK versions — resolved from the npm registry (no GitHub API) into VERSIONS.md.
 *
 * Raw markdown only → no GitHub API rate limit. Every file is freshness-stamped.
 *
 * Run: node skills/developing-for-github/scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFS_DIR = path.join(SKILL_DIR, 'references');
const OCTOKIT_DIR = path.join(REFS_DIR, 'octokit');
const RAW_BASE = 'https://raw.githubusercontent.com/github/docs/main';
const RATE_LIMIT_DELAY_MS = 120;
const FAILURE_THRESHOLD = 0.25;
const RUN_NOW = new Date().toISOString();
let docsChanged = false;

// outFile (flat in references/) → path within github/docs `content/`
const DOC_FILES = {
  // — Deciding & registering —
  'app-about-creating.md': 'content/apps/creating-github-apps/about-creating-github-apps/about-creating-github-apps.md',
  'app-deciding.md': 'content/apps/creating-github-apps/about-creating-github-apps/deciding-when-to-build-a-github-app.md',
  'app-best-practices.md': 'content/apps/creating-github-apps/about-creating-github-apps/best-practices-for-creating-a-github-app.md',
  'app-vs-oauth.md': 'content/apps/oauth-apps/building-oauth-apps/differences-between-github-apps-and-oauth-apps.md',
  'app-registering.md': 'content/apps/creating-github-apps/registering-a-github-app/registering-a-github-app.md',
  'app-permissions.md': 'content/apps/creating-github-apps/registering-a-github-app/choosing-permissions-for-a-github-app.md',
  'app-rate-limits.md': 'content/apps/creating-github-apps/registering-a-github-app/rate-limits-for-github-apps.md',
  'app-using-webhooks.md': 'content/apps/creating-github-apps/registering-a-github-app/using-webhooks-with-github-apps.md',

  // — App authentication (the JWT → installation-token flow) —
  'app-auth-about.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/about-authentication-with-a-github-app.md',
  'app-auth-as-app.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app.md',
  'app-jwt.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-json-web-token-jwt-for-a-github-app.md',
  'app-auth-installation.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-as-a-github-app-installation.md',
  'app-installation-token.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app.md',
  'app-user-token.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app.md',
  'app-on-behalf-of-user.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user.md',
  'app-private-keys.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/managing-private-keys-for-github-apps.md',
  'app-refreshing-user-tokens.md': 'content/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens.md',

  // — Writing code for an App —
  'app-writing-code.md': 'content/apps/creating-github-apps/writing-code-for-a-github-app/about-writing-code-for-a-github-app.md',
  'app-respond-to-webhooks.md': 'content/apps/creating-github-apps/writing-code-for-a-github-app/building-a-github-app-that-responds-to-webhook-events.md',
  'app-ci-checks.md': 'content/apps/creating-github-apps/writing-code-for-a-github-app/building-ci-checks-with-a-github-app.md',
  'app-login-button.md': 'content/apps/creating-github-apps/writing-code-for-a-github-app/building-a-login-with-github-button-with-a-github-app.md',

  // — OAuth apps —
  'oauth-creating.md': 'content/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app.md',
  'oauth-authorizing.md': 'content/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps.md',
  'oauth-scopes.md': 'content/apps/oauth-apps/building-oauth-apps/scopes-for-oauth-apps.md',
  'oauth-best-practices.md': 'content/apps/oauth-apps/building-oauth-apps/best-practices-for-creating-an-oauth-app.md',

  // — Webhooks —
  'webhooks-about.md': 'content/webhooks/about-webhooks.md',
  'webhooks-creating.md': 'content/webhooks/using-webhooks/creating-webhooks.md',
  'webhooks-handling.md': 'content/webhooks/using-webhooks/handling-webhook-deliveries.md',
  'webhooks-validating.md': 'content/webhooks/using-webhooks/validating-webhook-deliveries.md',
  'webhooks-failed-deliveries.md': 'content/webhooks/using-webhooks/handling-failed-webhook-deliveries.md',
  'webhooks-events-and-payloads.md': 'content/webhooks/webhook-events-and-payloads.md',
};

// Octokit repos → output file. README fetched from the repo (main→master fallback).
const OCTOKIT_REPOS = {
  'octokit-js.md': { repo: 'octokit/octokit.js', npm: 'octokit' },
  'octokit-core.md': { repo: 'octokit/core.js', npm: '@octokit/core' },
  'octokit-rest.md': { repo: 'octokit/rest.js', npm: '@octokit/rest' },
  'octokit-graphql.md': { repo: 'octokit/graphql.js', npm: '@octokit/graphql' },
  'octokit-webhooks.md': { repo: 'octokit/webhooks.js', npm: '@octokit/webhooks' },
  'octokit-auth-app.md': { repo: 'octokit/auth-app.js', npm: '@octokit/auth-app' },
  'octokit-plugin-paginate-rest.md': { repo: 'octokit/plugin-paginate-rest.js', npm: '@octokit/plugin-paginate-rest' },
  'octokit-plugin-throttling.md': { repo: 'octokit/plugin-throttling.js', npm: '@octokit/plugin-throttling' },
  'octokit-plugin-retry.md': { repo: 'octokit/plugin-retry.js', npm: '@octokit/plugin-retry' },
};

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { 'User-Agent': 'agent-skills-update-script/1.0' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(fetchText(res.headers.location));
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () =>
          res.statusCode === 200
            ? resolve(Buffer.concat(chunks).toString('utf8'))
            : reject(new Error(`HTTP ${res.statusCode} for ${url}`)));
        res.on('error', reject);
      })
      .on('error', reject);
  });
}

async function fetchFirst(urls) {
  let lastErr;
  for (const url of urls) {
    try {
      return { body: await fetchText(url), url };
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n/, '');
}

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

// ---------------------------------------------------------------------------
// Fetchers
// ---------------------------------------------------------------------------

async function fetchDocFiles() {
  console.log('\n── docs.github.com (Apps / OAuth / webhooks) ──');
  const results = [];
  for (const [outFile, docPath] of Object.entries(DOC_FILES)) {
    const url = `${RAW_BASE}/${docPath}`;
    try {
      const raw = await fetchText(url);
      writeRef(path.join(REFS_DIR, outFile), stripFrontmatter(raw).trim() + '\n', url);
      results.push(true);
      console.log(`  ✔ ${outFile}`);
    } catch (err) {
      console.error(`  ✘ ${outFile}: ${err.message}`);
      results.push(false);
    }
    await sleep(RATE_LIMIT_DELAY_MS);
  }
  return results;
}

async function fetchOctokit() {
  console.log('\n── Octokit SDK READMEs ──');
  const results = [];
  const versions = {};
  for (const [outFile, { repo, npm }] of Object.entries(OCTOKIT_REPOS)) {
    const urls = ['main', 'master'].map((b) => `https://raw.githubusercontent.com/${repo}/${b}/README.md`);
    try {
      const { body, url } = await fetchFirst(urls);
      writeRef(path.join(OCTOKIT_DIR, outFile), body.trim() + '\n', url);
      results.push(true);
      console.log(`  ✔ ${outFile} (${repo})`);
    } catch (err) {
      console.error(`  ✘ ${outFile} (${repo}): ${err.message}`);
      results.push(false);
    }
    // npm version (no GitHub API)
    try {
      const meta = JSON.parse(await fetchText(`https://registry.npmjs.org/${encodeURIComponent(npm)}/latest`));
      versions[npm] = meta.version;
    } catch {
      versions[npm] = 'unknown';
    }
    await sleep(RATE_LIMIT_DELAY_MS);
  }
  return { results, versions };
}

function writeVersions(versions) {
  const rows = Object.entries(versions).map(([pkg, v]) => `| \`${pkg}\` | \`${v}\` |`);
  const body = [
    '# SDK versions',
    '',
    `Auto-stamped by \`scripts/update_docs.js\`. Last run: ${RUN_NOW.slice(0, 10)}`,
    '',
    'Latest published versions on the npm registry (the README snapshots in `references/octokit/` track each repo default branch):',
    '',
    '| Package | Latest |',
    '|---|---|',
    ...rows,
    '',
  ].join('\n');
  writeRef(path.join(REFS_DIR, 'VERSIONS.md'), body, 'generated');
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  fs.mkdirSync(REFS_DIR, { recursive: true });
  console.log('🚀 developing-for-github updater');

  const docResults = await fetchDocFiles();
  const { results: octoResults, versions } = await fetchOctokit();
  writeVersions(versions);

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  const all = [...docResults, ...octoResults];
  const failed = all.filter((r) => !r).length;
  const ratio = all.length ? failed / all.length : 1;
  if (all.length === 0 || ratio > FAILURE_THRESHOLD) {
    console.error(`❌ doc-fetch failure ratio ${(ratio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
  console.log(`✅ Done (${failed} failure(s) of ${all.length}).`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}

module.exports = { DOC_FILES, OCTOKIT_REPOS };
