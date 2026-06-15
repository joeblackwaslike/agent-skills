#!/usr/bin/env node
/**
 * update_docs.js — working-with-github
 *
 * Two content sources, both freshness-stamped via the shared helper:
 *   1. gh CLI reference — generated verbatim from the locally pinned `gh`
 *      binary (`gh <command> --help`, recursive). Pinned via Homebrew (the pin
 *      lives in PINNED_VERSION). Skips gracefully when `gh` is absent or its
 *      version != the pin (e.g. in CI), leaving the committed reference intact.
 *   2. docs.github.com guides — a curated map of raw markdown from the public
 *      github/docs repo (REST, GraphQL, auth/tokens, PRs, code review, issues,
 *      releases, branch protection, Dependabot + CodeQL security config).
 *
 * Run: node skills/working-with-github/scripts/update_docs.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFS_DIR = path.join(SKILL_DIR, 'references');
const CLI_DIR = path.join(REFS_DIR, 'cli');
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');
const RAW_BASE = 'https://raw.githubusercontent.com/github/docs/main';
const RATE_LIMIT_DELAY_MS = 120;
const FAILURE_THRESHOLD = 0.25;
const RUN_NOW = new Date().toISOString();
let docsChanged = false;

// ---------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

function normalizeVersion(v) {
  const m = String(v).match(/(\d+\.\d+\.\d+)/);
  return m ? m[1] : null;
}

// Parse a gh help screen: collect command names listed under any "* COMMANDS"
// section. gh formats entries as two-space-indented `name:` lines.
function parseGhCommands(helpText) {
  const cmds = new Set();
  let inCommands = false;
  for (const line of helpText.split('\n')) {
    if (/^[A-Z][A-Z0-9 ]*COMMANDS\s*$/.test(line)) {
      inCommands = !/^ALIAS COMMANDS/.test(line); // skip alias shortcuts
      continue;
    }
    if (/^[A-Z]/.test(line)) { inCommands = false; continue; } // USAGE/FLAGS/etc.
    if (inCommands) {
      const m = line.match(/^\s{2,}([a-z][a-z0-9-]*):/);
      if (m && !['help', 'completion', 'alias'].includes(m[1])) cmds.add(m[1]);
    }
  }
  return [...cmds].sort();
}

function filenameForCommand(cmdPath) {
  // Always namespaced under `gh`: [] → gh.md, ['pr','create'] → gh__pr__create.md
  return ['gh', ...cmdPath].join('__') + '.md';
}

// ---------------------------------------------------------------------------
// gh CLI generation (needs the pinned `gh`)
// ---------------------------------------------------------------------------

function runGh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function ghVersion() {
  try {
    return normalizeVersion(runGh(['version']).split('\n')[0]);
  } catch {
    return null;
  }
}

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

function captureCommand(cmdPath, pinVer, depth) {
  const args = [...cmdPath, '--help'];
  let help;
  try {
    help = runGh(args);
  } catch (e) {
    console.error(`  ⚠ gh ${cmdPath.join(' ')} --help failed: ${e.message}`);
    return;
  }
  writeRef(
    path.join(CLI_DIR, filenameForCommand(cmdPath)),
    help,
    `gh ${cmdPath.join(' ')} --help @ ${pinVer}`,
  );
  if (depth <= 0) return;
  for (const sub of parseGhCommands(help)) {
    captureCommand([...cmdPath, sub], pinVer, depth - 1);
  }
}

function generateCliRef(pin) {
  const local = ghVersion();
  if (!local || normalizeVersion(pin.gh) !== local) {
    console.log(`⏭  gh absent or != pinned ${pin.gh} (local ${local || 'none'}); skipping CLI generation`);
    return false;
  }
  console.log(`🔧 Generating gh CLI reference from pinned gh ${pin.gh}...`);
  const root = runGh(['--help']);
  writeRef(path.join(CLI_DIR, filenameForCommand([])), root, `gh --help @ ${pin.gh}`);
  for (const cmd of parseGhCommands(root)) {
    captureCommand([cmd], pin.gh, 2); // recurse up to 3 levels deep
  }
  return true;
}

// ---------------------------------------------------------------------------
// docs.github.com curated map (raw markdown, no GitHub API → no rate limit)
// ---------------------------------------------------------------------------

// outFile (flat in references/) → path within github/docs `content/`
const DOC_FILES = {
  // — REST API —
  'rest-about.md': 'content/rest/about-the-rest-api/about-the-rest-api.md',
  'rest-graphql-comparison.md': 'content/rest/about-the-rest-api/comparing-githubs-rest-api-and-graphql-api.md',
  'rest-api-versions.md': 'content/rest/about-the-rest-api/api-versions.md',
  'rest-openapi.md': 'content/rest/about-the-rest-api/about-the-openapi-description-for-the-rest-api.md',
  'rest-authentication.md': 'content/rest/authentication/authenticating-to-the-rest-api.md',
  'rest-credentials-secure.md': 'content/rest/authentication/keeping-your-api-credentials-secure.md',
  'rest-getting-started.md': 'content/rest/using-the-rest-api/getting-started-with-the-rest-api.md',
  'rest-best-practices.md': 'content/rest/using-the-rest-api/best-practices-for-using-the-rest-api.md',
  'rest-rate-limits.md': 'content/rest/using-the-rest-api/rate-limits-for-the-rest-api.md',
  'rest-pagination.md': 'content/rest/using-the-rest-api/using-pagination-in-the-rest-api.md',
  'rest-scripting-js.md': 'content/rest/guides/scripting-with-the-rest-api-and-javascript.md',
  'rest-libraries.md': 'content/rest/using-the-rest-api/libraries-for-the-rest-api.md',
  'rest-troubleshooting.md': 'content/rest/using-the-rest-api/troubleshooting-the-rest-api.md',

  // — GraphQL API —
  'graphql-about.md': 'content/graphql/overview/about-the-graphql-api.md',
  'graphql-rate-limits.md': 'content/graphql/overview/rate-limits-and-query-limits-for-the-graphql-api.md',
  'graphql-public-schema.md': 'content/graphql/overview/public-schema.md',
  'graphql-intro.md': 'content/graphql/guides/introduction-to-graphql.md',
  'graphql-forming-calls.md': 'content/graphql/guides/forming-calls-with-graphql.md',
  'graphql-pagination.md': 'content/graphql/guides/using-pagination-in-the-graphql-api.md',
  'graphql-migrating-from-rest.md': 'content/graphql/guides/migrating-from-rest-to-graphql.md',
  'graphql-clients.md': 'content/graphql/guides/using-graphql-clients.md',

  // — Auth / tokens —
  'tokens-personal-access.md': 'content/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens.md',
  'tokens-fine-grained-endpoints.md': 'content/rest/authentication/endpoints-available-for-fine-grained-personal-access-tokens.md',

  // — Pull requests & code review —
  'pr-about.md': 'content/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests.md',
  'pr-creating.md': 'content/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request.md',
  'pr-from-fork.md': 'content/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork.md',
  'pr-requesting-review.md': 'content/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review.md',
  'pr-collaborative-models.md': 'content/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models.md',
  'review-about.md': 'content/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews.md',
  'review-proposed-changes.md': 'content/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request.md',
  'review-approving-required.md': 'content/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/approving-a-pull-request-with-required-reviews.md',
  'pr-merges-about.md': 'content/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges.md',
  'pr-merging.md': 'content/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request.md',
  'pr-auto-merge.md': 'content/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request.md',
  'pr-merge-queue.md': 'content/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request-with-a-merge-queue.md',
  'pr-reverting.md': 'content/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request.md',
  'pr-merge-conflicts.md': 'content/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts.md',
  'pr-resolve-conflict-cli.md': 'content/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line.md',
  'pr-status-checks.md': 'content/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks.md',
  'fork-syncing.md': 'content/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork.md',

  // — Merge methods, branch protection, rulesets —
  'merge-methods.md': 'content/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/about-merge-methods-on-github.md',
  'protected-branches.md': 'content/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches.md',
  'branch-protection-rule.md': 'content/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule.md',
  'rulesets-about.md': 'content/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets.md',
  'rulesets-available-rules.md': 'content/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets.md',

  // — Issues —
  'issues-about.md': 'content/issues/tracking-your-work-with-issues/learning-about-issues/about-issues.md',
  'issues-quickstart.md': 'content/issues/tracking-your-work-with-issues/learning-about-issues/quickstart.md',
  'issues-creating.md': 'content/issues/tracking-your-work-with-issues/using-issues/creating-an-issue.md',
  'issues-linking-pr.md': 'content/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue.md',
  'issues-sub-issues.md': 'content/issues/tracking-your-work-with-issues/using-issues/adding-sub-issues.md',
  'issues-assigning.md': 'content/issues/tracking-your-work-with-issues/using-issues/assigning-issues-and-pull-requests-to-other-github-users.md',

  // — Releases —
  'releases-about.md': 'content/repositories/releasing-projects-on-github/about-releases.md',
  'releases-managing.md': 'content/repositories/releasing-projects-on-github/managing-releases-in-a-repository.md',
  'releases-auto-notes.md': 'content/repositories/releasing-projects-on-github/automatically-generated-release-notes.md',

  // — Programmatic code review & checks: REST guides (raw markdown has real content) —
  'guide-interact-with-checks.md': 'content/rest/guides/using-the-rest-api-to-interact-with-checks.md',
  'guide-working-with-comments.md': 'content/rest/guides/working-with-comments.md',

  // — GitHub flow / connecting —
  'github-flow-official.md': 'content/get-started/using-github/github-flow.md',
  'connecting-to-github.md': 'content/get-started/using-github/connecting-to-github.md',

  // — Dependabot security config (CI workflow YAML → working-with-github-actions) —
  'dependabot-yml.md': 'content/code-security/concepts/supply-chain-security/about-the-dependabot-yml-file.md',
  'dependabot-version-updates.md': 'content/code-security/concepts/supply-chain-security/dependabot-version-updates.md',
  'dependabot-options-reference.md': 'content/code-security/reference/supply-chain-security/dependabot-options-reference.md',
  'dependabot-quickstart.md': 'content/code-security/tutorials/secure-your-dependencies/dependabot-quickstart.md',
  'dependabot-alerts.md': 'content/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-dependabot-alerts.md',

  // — CodeQL / code scanning config —
  'code-scanning-advanced-setup.md': 'content/code-security/how-tos/find-and-fix-code-vulnerabilities/configure-code-scanning/configuring-advanced-setup-for-code-scanning.md',
  'code-scanning-default-setup.md': 'content/code-security/tutorials/customize-code-scanning/evaluate-default-setup.md',
  'codeql-compiled-languages.md': 'content/code-security/concepts/code-scanning/codeql/codeql-for-compiled-languages.md',
  'codeql-cli-setup.md': 'content/code-security/how-tos/find-and-fix-code-vulnerabilities/scan-from-the-command-line/set-up-codeql-cli.md',
};

// REST endpoint reference pages are generated from the OpenAPI description at
// build time, so the raw github/docs markdown is just a stub. Fetch the fully
// rendered article (endpoints, parameters, curl/JS/gh examples) from the
// docs.github.com Article Body API instead. outFile → /en/rest pathname.
const REST_REFERENCE = {
  'api-pulls.md': '/en/rest/pulls/pulls',
  'api-pr-reviews.md': '/en/rest/pulls/reviews',
  'api-pr-review-comments.md': '/en/rest/pulls/comments',
  'api-pr-review-requests.md': '/en/rest/pulls/review-requests',
  'api-checks-runs.md': '/en/rest/checks/runs',
  'api-checks-suites.md': '/en/rest/checks/suites',
  'api-commit-statuses.md': '/en/rest/commits/statuses',
  'api-commit-comments.md': '/en/rest/commits/comments',
  'api-issues.md': '/en/rest/issues/issues',
  'api-issue-comments.md': '/en/rest/issues/comments',
};

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
        // Buffer chunks; `data += chunk` corrupts multi-byte UTF-8 on boundaries.
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

function stripFrontmatter(content) {
  return content.replace(/^---\n[\s\S]*?\n---\n/, '');
}

async function fetchDocFiles() {
  console.log('\n── Fetching docs.github.com guides ──');
  const results = [];
  for (const [outFile, docPath] of Object.entries(DOC_FILES)) {
    const url = `${RAW_BASE}/${docPath}`;
    const dest = path.join(REFS_DIR, outFile);
    try {
      const raw = await fetchText(url);
      const body = stripFrontmatter(raw).trim() + '\n';
      writeRef(dest, body, url);
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

async function fetchRestReference() {
  console.log('\n── Fetching rendered REST endpoint reference (docs.github.com) ──');
  const results = [];
  for (const [outFile, pathname] of Object.entries(REST_REFERENCE)) {
    const url = `https://docs.github.com/api/article/body?pathname=${encodeURIComponent(pathname)}`;
    const dest = path.join(REFS_DIR, outFile);
    try {
      const body = (await fetchText(url)).trim() + '\n';
      if (body.length < 200) throw new Error('suspiciously short body');
      writeRef(dest, body, `https://docs.github.com${pathname}`);
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

// ---------------------------------------------------------------------------
// VERSIONS.md
// ---------------------------------------------------------------------------

function writeVersions(pin, generated) {
  const date = RUN_NOW.slice(0, 10);
  const body = [
    '# Pinned versions',
    '',
    `Auto-stamped by \`scripts/update_docs.js\`. Last run: ${date}`,
    '',
    `- **gh CLI:** \`${pin.gh}\` — CLI reference in \`references/cli/\` was ${generated ? 'generated from this version' : 'NOT regenerated this run (local gh absent or mismatched; committed reference retained)'}.`,
    '- **docs.github.com guides:** fetched from the `github/docs` `main` branch (always current).',
    '',
    'The gh pin is bumped via Homebrew: `brew upgrade gh`, update `PINNED_VERSION`, then rerun the updater.',
    '',
  ].join('\n');
  writeRef(path.join(REFS_DIR, 'VERSIONS.md'), body, 'generated');
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  if (!fs.existsSync(PINNED_VERSION_FILE)) throw new Error(`Missing ${PINNED_VERSION_FILE}`);
  const pin = parsePinnedVersion(fs.readFileSync(PINNED_VERSION_FILE, 'utf8'));
  if (!pin.gh) throw new Error('PINNED_VERSION must define gh=');
  fs.mkdirSync(REFS_DIR, { recursive: true });
  console.log(`🚀 working-with-github updater (gh pin=${pin.gh})`);

  const generated = generateCliRef(pin);

  const docResults = [...(await fetchDocFiles()), ...(await fetchRestReference())];
  writeVersions(pin, generated);

  if (docsChanged) {
    setSkillLastUpdated(SKILL_MD, RUN_NOW.slice(0, 10));
    console.log('📅 Stamped SKILL.md last_updated');
  }

  const failed = docResults.filter((r) => !r).length;
  const ratio = docResults.length ? failed / docResults.length : 1;
  if (docResults.length === 0 || ratio > FAILURE_THRESHOLD) {
    console.error(`❌ doc-fetch failure ratio ${(ratio * 100).toFixed(0)}% exceeds threshold`);
    process.exit(1);
  }
  console.log(`✅ Done (${failed} fetch failure(s) of ${docResults.length}).`);
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}

module.exports = { parsePinnedVersion, normalizeVersion, parseGhCommands, filenameForCommand };
