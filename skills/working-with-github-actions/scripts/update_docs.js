#!/usr/bin/env node
/**
 * Update script for working-with-github-actions skill.
 *
 * Fetches two types of content:
 *   1. GitHub Actions documentation from the public github/docs repo (raw markdown)
 *   2. Latest release versions for commonly used actions (from GitHub Releases API)
 *
 * Run: node skills/working-with-github-actions/scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const REFS_DIR = path.join(__dirname, '..', 'references');
const RATE_LIMIT_DELAY_MS = 300;

const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');
const SKILL_MD = path.join(__dirname, '..', 'SKILL.md');
const RUN_NOW = new Date().toISOString();
let docsChanged = false;

// ---------------------------------------------------------------------------
// Fetch helpers
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fetchText(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { ...options, headers: { 'User-Agent': 'agent-skills-update-script/1.0', ...options.headers } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchText(res.headers.location, options).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      res.on('error', reject);
    });
    req.on('error', reject);
  });
}

function fetchJson(url) {
  return fetchText(url, { headers: { Accept: 'application/vnd.github.v3+json' } }).then(JSON.parse);
}

// Strip YAML frontmatter from GitHub docs markdown files
function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n/, '');
}

// Ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Write only if content changed; return true if written
function writeIfChanged(filePath, content) {
  ensureDir(path.dirname(filePath));
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
  if (existing === content) return false;
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

// ---------------------------------------------------------------------------
// GitHub docs: raw markdown from the github/docs repo
// ---------------------------------------------------------------------------

const RAW_BASE = 'https://raw.githubusercontent.com/github/docs/main/content/actions';

// Map of output filename → path within content/actions/
// Paths verified against github/docs repo structure (reorganized 2024-2025)
const DOC_FILES = {
  // Reference: workflow and action syntax
  'workflow-syntax.md': 'reference/workflows-and-actions/workflow-syntax.md',
  'triggers.md': 'reference/workflows-and-actions/events-that-trigger-workflows.md',
  'expressions.md': 'reference/workflows-and-actions/expressions.md',
  'contexts.md': 'reference/workflows-and-actions/contexts.md',
  'variables-ref.md': 'reference/workflows-and-actions/variables.md',
  'workflow-commands.md': 'reference/workflows-and-actions/workflow-commands.md',
  'deployments-and-environments.md': 'reference/workflows-and-actions/deployments-and-environments.md',
  'reusing-workflow-configurations.md': 'reference/workflows-and-actions/reusing-workflow-configurations.md',
  'dependency-caching-ref.md': 'reference/workflows-and-actions/dependency-caching.md',

  // Reference: runners
  'runners.md': 'reference/runners/github-hosted-runners.md',
  'larger-runners.md': 'reference/runners/larger-runners.md',
  'self-hosted-runners.md': 'reference/runners/self-hosted-runners.md',

  // Concepts: workflows and actions
  'concurrency.md': 'concepts/workflows-and-actions/concurrency.md',
  'caching.md': 'concepts/workflows-and-actions/dependency-caching.md',
  'artifacts.md': 'concepts/workflows-and-actions/workflow-artifacts.md',
  'custom-actions.md': 'concepts/workflows-and-actions/custom-actions.md',
  'reusable-workflow-concepts.md': 'concepts/workflows-and-actions/reusing-workflow-configurations.md',
  'variables-concepts.md': 'concepts/workflows-and-actions/variables.md',

  // Concepts: security
  'secrets.md': 'concepts/security/secrets.md',
  'github-token.md': 'concepts/security/github_token.md',
  'oidc-concepts.md': 'concepts/security/openid-connect.md',
  'script-injections.md': 'concepts/security/script-injections.md',
  'compromised-runners.md': 'concepts/security/compromised-runners.md',

  // How-tos: write workflows
  'matrix-strategy.md': 'how-tos/write-workflows/choose-what-workflows-do/run-job-variations.md',
  'use-secrets.md': 'how-tos/write-workflows/choose-what-workflows-do/use-secrets.md',
  'use-variables.md': 'how-tos/write-workflows/choose-what-workflows-do/use-variables.md',
  'trigger-a-workflow.md': 'how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow.md',
  'control-concurrency.md': 'how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency.md',
  'control-jobs-with-conditions.md': 'how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions.md',
  'choose-runner.md': 'how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job.md',

  // How-tos: reuse automations
  'reusable-workflows.md': 'how-tos/reuse-automations/reuse-workflows.md',

  // How-tos: deploy
  'manage-environments.md': 'how-tos/deploy/configure-and-manage-deployments/manage-environments.md',
  'control-deployments.md': 'how-tos/deploy/configure-and-manage-deployments/control-deployments.md',

  // How-tos: OIDC deployments
  'oidc-cloud.md': 'how-tos/secure-your-work/security-harden-deployments/oidc-in-cloud-providers.md',
  'oidc-aws.md': 'how-tos/secure-your-work/security-harden-deployments/oidc-in-aws.md',
  'oidc-gcp.md': 'how-tos/secure-your-work/security-harden-deployments/oidc-in-google-cloud-platform.md',
  'oidc-azure.md': 'how-tos/secure-your-work/security-harden-deployments/oidc-in-azure.md',
  'oidc-with-reusable-workflows.md': 'how-tos/secure-your-work/security-harden-deployments/oidc-with-reusable-workflows.md',
};

async function fetchDocFiles(errors) {
  console.log('\n── Fetching GitHub Actions documentation ──');
  for (const [outFile, docPath] of Object.entries(DOC_FILES)) {
    const url = `${RAW_BASE}/${docPath}`;
    const destPath = path.join(REFS_DIR, outFile);
    try {
      const raw = await fetchText(url);
      const body = stripFrontmatter(raw).trim() + '\n';
      const { content } = withFrontmatter({ filePath: destPath, body, source: url, now: RUN_NOW });
      const changed = writeIfChanged(destPath, content);
      if (changed) docsChanged = true;
      console.log(`  ${changed ? '✔' : '–'} ${outFile}${changed ? '' : ' (unchanged)'}`);
    } catch (err) {
      console.error(`  ✘ ${outFile}: ${err.message}`);
      errors.push({ file: outFile, error: err.message });
    }
    await sleep(RATE_LIMIT_DELAY_MS);
  }
}

// ---------------------------------------------------------------------------
// Action versions: latest release from GitHub Releases API
// ---------------------------------------------------------------------------

const TRACKED_ACTIONS = [
  // GitHub official actions
  'actions/checkout',
  'actions/setup-node',
  'actions/setup-python',
  'actions/setup-java',
  'actions/setup-go',
  'actions/cache',
  'actions/upload-artifact',
  'actions/download-artifact',
  'actions/github-script',
  'actions/labeler',
  'actions/stale',
  'actions/dependency-review-action',
  // Node/package managers
  'pnpm/action-setup',
  // Docker
  'docker/login-action',
  'docker/build-push-action',
  'docker/metadata-action',
  'docker/setup-buildx-action',
  'docker/setup-qemu-action',
  // Cloud deployments
  'aws-actions/configure-aws-credentials',
  'aws-actions/amazon-ecr-login',
  'google-github-actions/auth',
  'google-github-actions/setup-gcloud',
  'azure/login',
  // Release / publishing
  'googleapis/release-please-action',
  'softprops/action-gh-release',
  'peaceiris/actions-gh-pages',
  // Code quality
  'codecov/codecov-action',
  'github/codeql-action/init',
  // Dependencies
  'dependabot/fetch-metadata',
];

async function fetchActionVersions(errors) {
  console.log('\n── Fetching latest action versions ──');
  const versions = {};

  for (const action of TRACKED_ACTIONS) {
    // codeql-action/init is a sub-action of github/codeql-action
    const repoSlug = action.includes('/') && action.split('/').length > 2
      ? action.split('/').slice(0, 2).join('/')
      : action;

    const url = `https://api.github.com/repos/${repoSlug}/releases/latest`;
    try {
      const data = await fetchJson(url);
      const tag = data.tag_name || 'unknown';
      versions[action] = tag;
      console.log(`  ✔ ${action}@${tag}`);
    } catch (err) {
      console.warn(`  ✘ ${action}: ${err.message}`);
      errors.push({ action, error: err.message });
    }
    await sleep(RATE_LIMIT_DELAY_MS);
  }

  return versions;
}

function renderActionVersionsFile(versions) {
  const now = new Date().toISOString().slice(0, 10);
  const lines = [
    `# Action Versions`,
    ``,
    `Latest release versions for commonly used GitHub Actions.`,
    `Auto-updated by \`scripts/update_docs.js\` — do not edit manually.`,
    `Last updated: ${now}`,
    ``,
    `## GitHub Official`,
    ``,
    `| Action | Latest tag | Example usage |`,
    `|--------|-----------|---------------|`,
  ];

  const groups = {
    'GitHub Official': ['actions/checkout', 'actions/setup-node', 'actions/setup-python', 'actions/setup-java', 'actions/setup-go', 'actions/cache', 'actions/upload-artifact', 'actions/download-artifact', 'actions/github-script', 'actions/labeler', 'actions/stale', 'actions/dependency-review-action'],
    'Package Managers': ['pnpm/action-setup'],
    'Docker': ['docker/login-action', 'docker/build-push-action', 'docker/metadata-action', 'docker/setup-buildx-action', 'docker/setup-qemu-action'],
    'Cloud Deployments': ['aws-actions/configure-aws-credentials', 'aws-actions/amazon-ecr-login', 'google-github-actions/auth', 'google-github-actions/setup-gcloud', 'azure/login'],
    'Release & Publishing': ['googleapis/release-please-action', 'softprops/action-gh-release', 'peaceiris/actions-gh-pages'],
    'Code Quality': ['codecov/codecov-action', 'github/codeql-action/init', 'dependabot/fetch-metadata'],
  };

  const output = [`# Action Versions`, ``, `Latest release versions for commonly used GitHub Actions.`, `Auto-updated by \`scripts/update_docs.js\` — do not edit manually.`, `Last updated: ${now}`, ``];

  for (const [group, actions] of Object.entries(groups)) {
    output.push(`## ${group}`, ``);
    output.push(`| Action | Latest tag | Pin usage |`);
    output.push(`|--------|-----------|-----------|`);
    for (const action of actions) {
      if (!versions[action]) continue;
      const tag = versions[action];
      output.push(`| \`${action}\` | \`${tag}\` | \`uses: ${action}@${tag}\` |`);
    }
    output.push(``);
  }

  output.push(
    `## Pinning to SHA (recommended for production)`,
    ``,
    `For production workflows, pin to a full commit SHA rather than a tag to prevent`,
    `supply-chain attacks where a tag is moved:`,
    ``,
    '```yaml',
    `# Resolve the SHA for a tag:`,
    `#   gh api repos/actions/checkout/git/refs/tags/v4 --jq '.object.sha'`,
    `uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683  # v4.2.2`,
    '```',
    ``,
    `Tools like \`dependabot\` and \`pinact\` can automate SHA pinning across your workflows.`,
  );

  return output.join('\n') + '\n';
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  ensureDir(REFS_DIR);
  const errors = [];

  await fetchDocFiles(errors);
  const versions = await fetchActionVersions(errors);

  const versionsContent = renderActionVersionsFile(versions);
  const versionsPath = path.join(REFS_DIR, 'action-versions.md');
  const changed = writeIfChanged(versionsPath, versionsContent);
  console.log(`\n  ${changed ? '✔' : '–'} action-versions.md${changed ? '' : ' (unchanged)'}`);
  if (changed) docsChanged = true;

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('  ✔ Stamped SKILL.md last_updated');
  }

  if (errors.length > 0) {
    console.error(`\n✘ ${errors.length} error(s):`);
    for (const e of errors) console.error(`  - ${JSON.stringify(e)}`);
    process.exit(1);
  }

  console.log('\n✔ Done');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
