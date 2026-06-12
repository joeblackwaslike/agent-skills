# Beads Skills Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two beads skills to `agent-skills` — `working-with-beads` (CLI reference auto-generated from the pinned `bd` binary + repo docs fetched at the pinned tag) and `beads-operations` (Joe's conventions, workflows, and a QA'd troubleshooting/maintenance runbook) — and pin `bd` at 1.0.5.

**Architecture:** `working-with-beads` follows the repo's `authoring-agent-skills` doc-wrapper conventions: a Node generator reads a tracked `PINNED_VERSION`, walks `bd help`/`bd <cmd> --help` (+ `bd prime`) from the locally pinned binary, and fetches `gastownhall/beads/docs/*.md` at tag `v1.0.5`, freshness-stamping every file via the shared `scripts/lib/doc-frontmatter.cjs`. CLI generation gracefully skips when `bd` is absent (CI) so the weekly workflow stays green; repo docs are pinned to the tag so they don't churn. `beads-operations` is a hand-written, QA-against-the-binary topic skill that supersedes the third-party plugin's conventions.

**Tech Stack:** Node 20 (CommonJS, stdlib only — `https`, `child_process`, `node:test`), Make, the existing `doc-frontmatter.cjs` helper, Homebrew (`brew pin`), GitHub contents API.

**Spec:** `docs/superpowers/specs/2026-06-12-beads-skills-design.md`

**Branch:** Create `feat/beads-skills` off `main` before Task 1. All commits land there; open a PR at the end under signoff.

---

## File Structure

- `skills/working-with-beads/SKILL.md` — reference map + how-to-use; `metadata.last_updated`.
- `skills/working-with-beads/PINNED_VERSION` — `bd=1.0.5 plugin=1.0.4 tag=v1.0.5`; single source of truth for the pin.
- `skills/working-with-beads/scripts/update_docs.js` — generator + fetcher (the only real code).
- `skills/working-with-beads/scripts/cli-parsers.test.js` — `node --test` unit tests for the pure parsers (named so the Makefile `update*.js` glob can't match it).
- `skills/working-with-beads/references/cli/*.md`, `references/prime.md`, `references/docs/*.md` — generated/fetched (committed).
- `skills/beads-operations/SKILL.md` + `references/{conventions,workflows,troubleshooting,long-term-maintenance}.md` — hand-written.
- Modified: root `Makefile`, `AGENTS.md`, `README.md`, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`.
- User-level (outside repo, final phase): `~/.claude/CLAUDE.md` beads activation section.

---

## Task 1: Pin `bd` and record `PINNED_VERSION`

**Files:**
- Create: `skills/working-with-beads/PINNED_VERSION`

- [ ] **Step 1: Confirm the installed binary version**

Run: `bd version`
Expected: `bd version 1.0.5 (Homebrew)` — confirm it's `1.0.5`. If not, stop and reconcile with the user before pinning.

- [ ] **Step 2: Pin the brew formula (signoff-gated system mutation)**

Run: `brew pin beads`
Then verify: `brew list --pinned | grep beads`
Expected: `beads` appears in the pinned list.

- [ ] **Step 3: Create the PINNED_VERSION file**

Create `skills/working-with-beads/PINNED_VERSION`:

```text
bd=1.0.5
plugin=1.0.4
tag=v1.0.5
```

- [ ] **Step 4: Commit**

```bash
git add skills/working-with-beads/PINNED_VERSION
git commit -m "feat(beads): pin bd at 1.0.5 and record PINNED_VERSION"
```

---

## Task 2: Scaffold `working-with-beads/SKILL.md`

**Files:**
- Create: `skills/working-with-beads/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Create `skills/working-with-beads/SKILL.md` (model the structure on `skills/working-with-vercel-ai-sdk/SKILL.md`):

```markdown
---
name: working-with-beads
description: Use when working with the beads CLI (`bd`) — issue/task tracking, dependencies, the full command surface (create, ready, dep, epic, gate, swarm, federation, dolt, worktree, compaction), `bd prime`, and the beads data model. Provides an offline CLI reference generated verbatim from the pinned `bd` binary plus the upstream repo docs, pinned to a known version. Invoke for any `bd <command>` question, flag lookup, or beads concept. For Joe's operating conventions and troubleshooting, use `beads-operations`.
metadata:
  last_updated: "2026-06-12"
---

# Working with beads (`bd`)

Offline reference for the [beads](https://github.com/gastownhall/beads) CLI, **pinned to a known version** (see [`PINNED_VERSION`](PINNED_VERSION)). The CLI pages in [`references/cli/`](references/cli/) are generated verbatim from the installed pinned `bd` binary; the conceptual docs in [`references/docs/`](references/docs/) are fetched from the repo at the matching tag. Every file carries `source`/`fetched_at`/`sha256` frontmatter.

## How to use this skill

1. **CLI reference:** read [`references/cli/_index.md`](references/cli/_index.md) for the command tree, then `references/cli/<command>.md` (or `<command>__<subcommand>.md`) for exact flags/usage — these are the literal output of `bd <command> --help` at the pinned version.
2. **Workflow context:** [`references/prime.md`](references/prime.md) is the captured `bd prime` output.
3. **Concepts/advanced:** `grep` [`references/docs/`](references/docs/) (ADVANCED, federation, adaptive IDs, config, etc.).
4. **If the installed `bd` differs from `PINNED_VERSION`**, the reference may not match — bump the pin (see below) and regenerate, or run `bd <cmd> --help` directly.

## Behavioral guidance

- The reference reflects the **pinned** version only. Always trust `bd <cmd> --help` from the live binary if they disagree, and surface the drift.
- For **how Joe runs beads** (`--shared-server`, shared Dolt server on port 3308, `--skip-agents`) and for fixing broken states, use the `beads-operations` skill — not this one.

## Reference map

- `references/cli/_index.md` — `bd help` top-level command tree.
- `references/cli/<command>.md` — per-command `--help` (nested groups as `<command>__<subcommand>.md`).
- `references/prime.md` — `bd prime` output.
- `references/docs/*.md` — upstream `docs/` + `README.md` at the pinned tag.

## Keeping this current

Regenerated by [`scripts/update_docs.js`](scripts/update_docs.js): it reads `PINNED_VERSION`, generates the CLI reference from the local pinned `bd`, and fetches repo docs at the tag. Refresh locally with `make update-working-with-beads`. **Bumping the pin is signoff-gated:** edit `PINNED_VERSION`, run `brew unpin beads && brew upgrade beads && brew pin beads` (or install the target version), then rerun the update. The weekly CI workflow auto-discovers the script but produces no churn while the tag is unchanged, and skips CLI generation when `bd` is absent.
```

- [ ] **Step 2: Commit**

```bash
git add skills/working-with-beads/SKILL.md
git commit -m "feat(beads): add working-with-beads SKILL.md"
```

---

## Task 3: Pure parser helpers + unit tests (TDD)

The generator's risky logic is parsing `bd help` / `bd <cmd> --help`. Build and test these pure functions first. Uses Node's built-in `node:test` (zero new dependencies).

**Files:**
- Create: `skills/working-with-beads/scripts/update_docs.js` (helpers + exports only, this task)
- Test: `skills/working-with-beads/scripts/cli-parsers.test.js` (named to dodge the `update*.js` Makefile glob)

- [ ] **Step 1: Write the failing test**

Create `skills/working-with-beads/scripts/cli-parsers.test.js`:

```js
const { test } = require('node:test');
const assert = require('node:assert');
const {
  parsePinnedVersion, normalizeVersion, parseCommandTree, parseSubcommands, filenameForCommand,
} = require('./update_docs.js');

test('parsePinnedVersion parses key=value lines', () => {
  const pin = parsePinnedVersion('bd=1.0.5\nplugin=1.0.4\ntag=v1.0.5\n');
  assert.deepEqual(pin, { bd: '1.0.5', plugin: '1.0.4', tag: 'v1.0.5' });
});

test('normalizeVersion extracts semver from bd version output', () => {
  assert.equal(normalizeVersion('bd version 1.0.5 (Homebrew)'), '1.0.5');
  assert.equal(normalizeVersion('v1.0.5'), '1.0.5');
  assert.equal(normalizeVersion('nope'), null);
});

test('parseCommandTree extracts commands under section headers', () => {
  const help = [
    'Some preamble.',
    '',
    'Working With Issues:',
    '  assign          Assign an issue to someone',
    '  create-form     Create a new issue using an interactive form',
    '',
    'Views & Reports:',
    '  find-duplicates Find semantically similar issues',
    '',
    'Flags:',
    '  -h, --help      help for bd',
  ].join('\n');
  assert.deepEqual(parseCommandTree(help), ['assign', 'create-form', 'find-duplicates']);
});

test('parseSubcommands reads the Available Commands block only', () => {
  const help = [
    'Manage dependencies',
    '',
    'Usage:',
    '  bd dep [command]',
    '',
    'Available Commands:',
    '  add         Add a dependency',
    '  remove      Remove a dependency',
    '  help        Help about any command',
    '',
    'Flags:',
    '  -h, --help   help for dep',
  ].join('\n');
  assert.deepEqual(parseSubcommands(help), ['add', 'remove']);
});

test('filenameForCommand joins path with __ and .md', () => {
  assert.equal(filenameForCommand(['create']), 'create.md');
  assert.equal(filenameForCommand(['dep', 'add']), 'dep__add.md');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test skills/working-with-beads/scripts/cli-parsers.test.js`
Expected: FAIL — `Cannot find module './update_docs.js'` (file not created yet).

- [ ] **Step 3: Write the helpers**

Create `skills/working-with-beads/scripts/update_docs.js` with exactly this content (full generator is completed in Tasks 4–6; this establishes the tested helpers and the module exports):

```js
#!/usr/bin/env node
/**
 * update_docs.js — working-with-beads
 *
 * Generates the CLI reference from the locally pinned `bd` binary and fetches
 * the beads repo docs/ at the pinned tag. Every file is freshness-stamped via
 * the shared doc-frontmatter helper. CLI generation gracefully skips when `bd`
 * is absent or its version != the pin (e.g. in CI).
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { withFrontmatter, setSkillLastUpdated } = require('../../../scripts/lib/doc-frontmatter.cjs');

const SKILL_DIR = path.join(__dirname, '..');
const SKILL_MD = path.join(SKILL_DIR, 'SKILL.md');
const REFERENCES_DIR = path.join(SKILL_DIR, 'references');
const CLI_DIR = path.join(REFERENCES_DIR, 'cli');
const DOCS_DIR = path.join(REFERENCES_DIR, 'docs');
const PINNED_VERSION_FILE = path.join(SKILL_DIR, 'PINNED_VERSION');
const REPO = 'gastownhall/beads';
const RUN_NOW = new Date().toISOString();
const FAILURE_THRESHOLD = 0.25;
let docsChanged = false;

// ---------- pure helpers (unit-tested in update_docs.test.js) ----------

function parsePinnedVersion(text) {
  const out = {};
  for (const m of text.matchAll(/(\w+)\s*=\s*(\S+)/g)) out[m[1]] = m[2];
  return out;
}

function normalizeVersion(v) {
  const m = String(v).match(/(\d+\.\d+\.\d+)/);
  return m ? m[1] : null;
}

function parseCommandTree(helpText) {
  const cmds = new Set();
  let inCommands = false;
  for (const line of helpText.split('\n')) {
    if (/^[A-Z][A-Za-z &]+:\s*$/.test(line)) { inCommands = true; continue; }
    if (/^(Flags|Global Flags|Additional help topics):/.test(line)) { inCommands = false; continue; }
    if (inCommands) {
      const m = line.match(/^\s{2,}([a-z][a-z0-9-]*)\s{2,}\S/);
      if (m) cmds.add(m[1]);
    }
  }
  return [...cmds].sort();
}

function parseSubcommands(helpText) {
  const subs = new Set();
  let inAvail = false;
  for (const line of helpText.split('\n')) {
    if (/^Available Commands:\s*$/.test(line)) { inAvail = true; continue; }
    if (inAvail && /^\S/.test(line)) { inAvail = false; continue; }
    if (inAvail) {
      const m = line.match(/^\s{2,}([a-z][a-z0-9-]*)\s{2,}\S/);
      if (m && !['help', 'completion'].includes(m[1])) subs.add(m[1]);
    }
  }
  return [...subs].sort();
}

function filenameForCommand(cmdPath) {
  return cmdPath.join('__') + '.md';
}

module.exports = {
  parsePinnedVersion, normalizeVersion, parseCommandTree, parseSubcommands, filenameForCommand,
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test skills/working-with-beads/scripts/update_docs.test.js`
Expected: PASS — all 5 tests pass.

- [ ] **Step 5: Commit**

```bash
git add skills/working-with-beads/scripts/update_docs.js skills/working-with-beads/scripts/update_docs.test.js
git commit -m "feat(beads): tested parser helpers for the bd CLI generator"
```

---

## Task 4: CLI generation from the pinned binary (graceful skip)

**Files:**
- Modify: `skills/working-with-beads/scripts/update_docs.js` (insert before `module.exports`)

- [ ] **Step 1: Add the binary-walk + writeRef functions**

In `update_docs.js`, insert this block immediately **before** the `module.exports = {` line:

```js
// ---------- CLI generation (needs the pinned `bd`) ----------

function runBd(args) {
  return execFileSync('bd', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function writeRef(filepath, body, source) {
  const wrapped = withFrontmatter({ filePath: filepath, body, source, now: RUN_NOW });
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, wrapped.content, 'utf8');
  if (wrapped.changed) docsChanged = true;
}

function bdMatchesPin(pin) {
  try {
    return normalizeVersion(runBd(['version'])) === normalizeVersion(pin.bd);
  } catch {
    return false;
  }
}

function generateCliRef(pin) {
  if (!bdMatchesPin(pin)) {
    console.log(`⏭  bd absent or != pinned ${pin.bd}; skipping CLI generation`);
    return false;
  }
  console.log('🔧 Generating CLI reference from pinned bd...');
  const helpText = runBd(['help']);
  writeRef(path.join(CLI_DIR, '_index.md'), helpText, `bd help @ ${pin.bd}`);

  try {
    writeRef(path.join(REFERENCES_DIR, 'prime.md'), runBd(['prime']), `bd prime @ ${pin.bd}`);
  } catch (e) {
    console.error(`  ⚠ bd prime failed: ${e.message}`);
  }

  for (const cmd of parseCommandTree(helpText)) {
    let cmdHelp;
    try {
      cmdHelp = runBd([cmd, '--help']);
    } catch (e) {
      console.error(`  ⚠ bd ${cmd} --help failed: ${e.message}`);
      continue;
    }
    writeRef(path.join(CLI_DIR, filenameForCommand([cmd])), cmdHelp, `bd ${cmd} --help @ ${pin.bd}`);
    for (const sub of parseSubcommands(cmdHelp)) {
      try {
        const subHelp = runBd([cmd, sub, '--help']);
        writeRef(path.join(CLI_DIR, filenameForCommand([cmd, sub])), subHelp, `bd ${cmd} ${sub} --help @ ${pin.bd}`);
      } catch (e) {
        console.error(`  ⚠ bd ${cmd} ${sub} --help failed: ${e.message}`);
      }
    }
  }
  return true;
}
```

- [ ] **Step 2: Verify the module still loads and tests still pass**

Run: `node --test skills/working-with-beads/scripts/update_docs.test.js`
Expected: PASS (unchanged — helpers untouched; new functions are not yet called).

- [ ] **Step 3: Smoke-test CLI generation against the real binary**

Run:
```bash
node -e "const m=require('./skills/working-with-beads/scripts/update_docs.js');" && echo "module loads"
```
Expected: `module loads` (no throw). (Full generation is exercised in Task 7.)

- [ ] **Step 4: Commit**

```bash
git add skills/working-with-beads/scripts/update_docs.js
git commit -m "feat(beads): generate CLI reference from pinned bd with graceful skip"
```

---

## Task 5: Fetch repo docs at the pinned tag

**Files:**
- Modify: `skills/working-with-beads/scripts/update_docs.js` (insert before `module.exports`)

- [ ] **Step 1: Add the fetch functions**

Insert immediately **before** `module.exports = {`:

```js
// ---------- repo docs fetch (no `bd` needed) ----------

function fetchUrl(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'agent-skills', ...headers } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        return resolve(fetchUrl(res.headers.location, headers));
      }
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () =>
        res.statusCode >= 200 && res.statusCode < 300
          ? resolve(data)
          : reject(new Error(`HTTP ${res.statusCode} for ${url}`)));
    }).on('error', reject);
  });
}

async function fetchRepoDocs(pin) {
  console.log(`📥 Fetching ${REPO} docs @ ${pin.tag}...`);
  const listing = JSON.parse(
    await fetchUrl(`https://api.github.com/repos/${REPO}/contents/docs?ref=${pin.tag}`, {
      Accept: 'application/vnd.github+json',
    }),
  );
  const entries = listing.filter((e) => e.type === 'file' && e.name.endsWith('.md'));
  const results = [];
  for (const e of entries) {
    try {
      writeRef(path.join(DOCS_DIR, e.name), await fetchUrl(e.download_url), e.download_url);
      results.push(true);
    } catch (err) {
      console.error(`  ⚠ ${e.name}: ${err.message}`);
      results.push(false);
    }
    await new Promise((r) => setTimeout(r, 80));
  }
  const readmeUrl = `https://raw.githubusercontent.com/${REPO}/${pin.tag}/README.md`;
  try {
    writeRef(path.join(DOCS_DIR, 'README.md'), await fetchUrl(readmeUrl), readmeUrl);
    results.push(true);
  } catch (e) {
    console.error(`  ⚠ README: ${e.message}`);
    results.push(false);
  }
  return results;
}
```

- [ ] **Step 2: Verify module still loads / tests pass**

Run: `node --test skills/working-with-beads/scripts/update_docs.test.js`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add skills/working-with-beads/scripts/update_docs.js
git commit -m "feat(beads): fetch repo docs at the pinned tag"
```

---

## Task 6: Main orchestration + exit behavior

**Files:**
- Modify: `skills/working-with-beads/scripts/update_docs.js` (insert before `module.exports`)

- [ ] **Step 1: Add `main()` and the entrypoint guard**

Insert immediately **before** `module.exports = {`:

```js
// ---------- main ----------

async function main() {
  if (!fs.existsSync(PINNED_VERSION_FILE)) throw new Error(`Missing ${PINNED_VERSION_FILE}`);
  const pin = parsePinnedVersion(fs.readFileSync(PINNED_VERSION_FILE, 'utf8'));
  if (!pin.tag) throw new Error('PINNED_VERSION must define tag=');
  fs.mkdirSync(REFERENCES_DIR, { recursive: true });
  console.log(`🚀 working-with-beads updater (bd=${pin.bd} tag=${pin.tag})`);

  generateCliRef(pin); // graceful skip handled inside
  const docResults = await fetchRepoDocs(pin);

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
  console.log('✅ Done.');
}

if (require.main === module) {
  main().catch((e) => {
    console.error('❌', e.message);
    process.exit(1);
  });
}
```

- [ ] **Step 2: Verify tests still pass**

Run: `node --test skills/working-with-beads/scripts/update_docs.test.js`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add skills/working-with-beads/scripts/update_docs.js
git commit -m "feat(beads): main orchestration and failure-threshold exit"
```

---

## Task 7: Makefile target + generate the references

**Files:**
- Modify: `Makefile`
- Create (generated): `skills/working-with-beads/references/**`

- [ ] **Step 1: Add the Makefile target**

In `Makefile`, add `update-working-with-beads` to the `.PHONY` line, and add this target after `update-working-with-vercel-ai-sdk`:

```make
update-working-with-beads: ## Update working-with-beads references (CLI ref from pinned bd + repo docs @ tag)
	node skills/working-with-beads/scripts/update_docs.js
```

- [ ] **Step 2: Confirm auto-discovery**

Run: `make list-update-scripts`
Expected: the output includes `skills/working-with-beads/scripts/update_docs.js`. Confirm `update_docs.test.js` is NOT listed (the glob matches `update*.js`, so verify the test file name doesn't get picked up — it does match `update*`! see Step 3).

- [ ] **Step 3: Guard the glob against the test file**

The Makefile glob is `find skills -path '*/scripts/update*.js'`, which would also match `update_docs.test.js`. Confirm by re-reading `make list-update-scripts`. If `update_docs.test.js` appears, rename the test to `skills/working-with-beads/scripts/cli-parsers.test.js` (and update the `require('./update_docs.js')` path stays the same) so only the real script matches. Re-run `make list-update-scripts` and confirm only `update_docs.js` is listed.

- [ ] **Step 4: Generate the references against the pinned binary**

Run: `make update-working-with-beads`
Expected: `references/cli/_index.md`, many `references/cli/*.md`, `references/prime.md`, and `references/docs/*.md` are written; console shows CLI generation ran (bd matches pin) and docs fetched at `v1.0.5`; no non-zero exit.

- [ ] **Step 5: Verify generated content is correct + freshness-stamped**

Run:
```bash
head -5 skills/working-with-beads/references/cli/create.md
diff <(sed -n '/^---$/,/^---$/!p' skills/working-with-beads/references/cli/create.md | sed '/^$/d' | head -40) <(bd create --help | head -40) && echo "create.md matches bd create --help"
ls skills/working-with-beads/references/docs | head
```
Expected: `create.md` starts with `source:`/`fetched_at:`/`sha256:` frontmatter; its body matches `bd create --help`; `references/docs/` contains `ADVANCED.md`, `README.md`, etc.

- [ ] **Step 6: Commit**

```bash
git add Makefile skills/working-with-beads/references skills/working-with-beads/scripts
git commit -m "feat(beads): wire Makefile target and generate working-with-beads references"
```

---

## Task 8: `beads-operations/SKILL.md`

**Files:**
- Create: `skills/beads-operations/SKILL.md`

- [ ] **Step 1: Write SKILL.md**

Create `skills/beads-operations/SKILL.md`:

```markdown
---
name: beads-operations
description: Use when running, maintaining, or troubleshooting beads (`bd`) day-to-day — deciding bd vs TodoWrite, Joe's shared-server conventions (`bd init --shared-server --skip-agents`, the shared Dolt server on port 3308), the ready→claim→note→close workflow, compaction recovery, and recovering from broken/nasty beads states (stale ports, orphan/duplicate Dolt servers, db-name mismatch, "database is locked"). Invoke on "beads is broken", "bd won't start", "set up beads in this project", "how do I track this", or any beads failure. For the raw CLI reference, use `working-with-beads`.
metadata:
  last_updated: "2026-06-12"
---

# Beads operations

Opinionated guidance for *running* beads the way Joe does, plus a troubleshooting/maintenance runbook. For the exhaustive command reference, use the `working-with-beads` skill.

> **Precedence:** This skill **supersedes the conventions in the bundled third-party `beads` plugin skill.** Where they differ (especially server setup), follow this skill. The plugin is kept for its lifecycle hooks, commands, and task-agent — not its convention guidance.

## Decision: bd vs TodoWrite

Ask "will I need this context in 2 weeks / across sessions?" — **yes → `bd`** (durable, dependency-aware, survives compaction); **no → TodoWrite** (this-hour working copy). They layer: read a bead → spin up TodoWrite items for the current hour → update the bead's notes → TodoWrite is discarded, the bead persists.

## Reference map

- [`references/conventions.md`](references/conventions.md) — the **mandatory** setup: `--shared-server`, the shared Dolt server, port 3308, `--skip-agents`, env vars, the `bd` shell wrapper.
- [`references/workflows.md`](references/workflows.md) — the core loop, compaction recovery, discovered-from side-quests.
- [`references/troubleshooting.md`](references/troubleshooting.md) — symptom → diagnosis → recovery for the nasty states.
- [`references/long-term-maintenance.md`](references/long-term-maintenance.md) — version pin/bump, server lifecycle, backup/export, db hygiene, compaction.

## When beads is broken

Go straight to [`references/troubleshooting.md`](references/troubleshooting.md). Do **not** improvise schema/server fixes — beads' shared-server states have specific recoveries, and guessing makes them worse.

## Niche features

Chemistry/molecules, async gates, worktrees, swarm, federation — not duplicated here. See `working-with-beads/references/cli/` (`mol.md`, `gate.md`, `worktree.md`, `swarm.md`, `federation.md`).
```

- [ ] **Step 2: Commit**

```bash
git add skills/beads-operations/SKILL.md
git commit -m "feat(beads): add beads-operations SKILL.md"
```

---

## Task 9: `beads-operations` references (QA'd against the pinned binary)

Each reference file is hand-written but **every command/flag claim must be verified** by running it against the pinned `bd` before writing it. No unverified assertions.

**Files:**
- Create: `skills/beads-operations/references/conventions.md`
- Create: `skills/beads-operations/references/workflows.md`
- Create: `skills/beads-operations/references/troubleshooting.md`
- Create: `skills/beads-operations/references/long-term-maintenance.md`

- [ ] **Step 1: Gather ground truth from the binary and Joe's config**

Run and capture for reference while writing:
```bash
bd init --help
bd dolt --help 2>/dev/null || bd server --help 2>/dev/null
bd config --help
grep -n 'BEADS\|shared-server\|skip-agents\|3308' ~/.zshenv ~/.claude/CLAUDE.md
```
Expected: confirms the exact flag names, the shared-server invocation, the env var (`BEADS_DOLT_SHARED_SERVER=1`), port 3308, and the `bd()` shell wrapper. If any flag named in the spec does NOT exist in the installed bd, note it and adjust the docs to what the binary actually supports.

- [ ] **Step 2: Write `conventions.md`**

Create `skills/beads-operations/references/conventions.md` covering, with verified commands:
- Always `bd init --shared-server --skip-agents` (never plain `bd init`). Why: plain init creates a per-project Dolt server that drifts (stale ports, orphan servers, db-name mismatch).
- The shared Dolt server: one server at `~/.beads/shared-server`, port **3308**, for all projects.
- `BEADS_DOLT_SHARED_SERVER=1` in `~/.zshenv` enforces shared-server by default; the flag is belt-and-suspenders.
- The `bd()` shell function wrapper that auto-adds `--skip-agents` on `init` (quote the wrapper from `~/.zshenv`).
- A "correct first-run in a new repo" snippet: `git init` (Dolt needs git) → `bd init --shared-server --skip-agents`.

Each shell snippet must be copy-paste runnable and match the installed bd. Cross-link: `See working-with-beads/references/cli/init.md for the full flag list.`

- [ ] **Step 3: Write `workflows.md`**

Create `skills/beads-operations/references/workflows.md` covering, with verified commands:
- The core loop: `bd ready` → `bd show <id>` → claim (verify the exact claim command/flag via `bd update --help`) → add notes (`bd note`/`bd comment` — verify which exists) → `bd close <id> --reason "..."`.
- Compaction recovery: how `bd prime` restores context; the note-discipline that makes it work.
- Temporal layering with TodoWrite (bead = month, TodoWrite = hour).
- Side-quests: filing discovered work and linking with `discovered-from` (verify via `bd dep --help`).

- [ ] **Step 4: Write `troubleshooting.md` (the runbook)**

Create `skills/beads-operations/references/troubleshooting.md`. Symptom-first; each entry = **Symptom → Diagnosis (exact command) → Recovery (exact steps)**. Include at minimum these entries, each verified against the installed bd / Dolt:

1. **Dolt server won't start** — Symptom: server start errors. Diagnosis: check for a git repo (`git rev-parse --is-inside-work-tree`). Recovery: `git init` then retry.
2. **Stale port / orphan or duplicate Dolt server on 3308** — Symptom: connection refused / "address already in use" / commands hang. Diagnosis: `lsof -iTCP:3308 -sTCP:LISTEN`; inspect `~/.beads/shared-server`. Recovery: stop stray servers (verified stop command), confirm a single shared server, restart.
3. **Per-project vs shared-server drift / db-name mismatch** — Symptom: a project sees an empty/wrong DB. Diagnosis: confirm the project was `bd init`-ed with `--shared-server`; inspect `.beads/` config. Recovery: re-init against the shared server / fix the db name (verified steps).
4. **`--shared-server` omitted → silent per-project server** — Symptom: a new per-project server appears. Diagnosis/Recovery: detect and migrate to shared.
5. **"database is locked" / `disk I/O error (522)`** — Symptom on cloud-synced dirs. Diagnosis: is `.beads/` under iCloud/Dropbox/OneDrive? Recovery: move `.beads/` to a local path.
6. **Database not initialized** — Symptom: "not initialized". Recovery: `bd init --shared-server --skip-agents`.
7. **Embedded vs server mode confusion** — Symptom: updates not visible for 3–5s. Diagnosis: is the shared server running? Recovery: start it for immediate consistency.
8. **Beads stuck in a weird state mid-session** — a general recovery checklist: stop servers → verify single shared server on 3308 → `bd status`/`bd prime` → re-init if needed → restore from `bd export`/backup.

For each, run the diagnosis command on the live system while writing so the documented output is real.

- [ ] **Step 5: Write `long-term-maintenance.md`**

Create `skills/beads-operations/references/long-term-maintenance.md` covering, with verified commands:
- The version pin workflow (point to `working-with-beads/PINNED_VERSION`): bump = edit file → `brew unpin/upgrade/pin` → `make update-working-with-beads` → review → commit. Always signoff.
- Keeping the third-party plugin in lockstep: `/plugin update beads@beads-marketplace`.
- Server lifecycle: start/stop/status of the shared Dolt server (verified commands).
- Backup/export hygiene: `bd export` to JSONL; where backups live (verify via `bd backup --help`/`bd export --help`).
- Compaction of old closed issues (verify via `bd compact --help`).

- [ ] **Step 6: Verify no dangling links + claims hold**

Run:
```bash
cd skills/beads-operations && for f in SKILL.md references/*.md; do grep -oE '\]\(([^)#]+)' "$f" | sed -E 's/^\]\(//' | while read l; do case "$l" in http*) continue;; esac; [ -e "$(dirname "$f")/$l" ] || echo "BROKEN: $f -> $l"; done; done; echo done
```
Expected: `done` with no `BROKEN:` lines. (Cross-skill links like `../working-with-beads/references/cli/init.md` resolve because both skills exist.)

- [ ] **Step 7: Commit**

```bash
git add skills/beads-operations/references
git commit -m "feat(beads): beads-operations references (conventions, workflows, troubleshooting, maintenance)"
```

---

## Task 10: Register both skills

**Files:**
- Modify: `AGENTS.md`, `README.md`, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`

- [ ] **Step 1: AGENTS.md — Available Skills table**

Add two rows after the `authoring-agent-skills` row in the Available Skills table:

```markdown
| `working-with-beads` | Working with the beads CLI (`bd`) — offline CLI reference generated from the pinned binary (`bd <cmd> --help`, `bd prime`) plus upstream repo docs, pinned to a known version. Use for any `bd` command/flag/concept lookup |
| `beads-operations` | Running/maintaining/troubleshooting beads day-to-day — bd vs TodoWrite, Joe's shared-server conventions (port 3308, `--skip-agents`), the ready→claim→note→close loop, compaction recovery, and recovering broken beads states |
```

- [ ] **Step 2: AGENTS.md — Common Workflows**

Add after the `authoring-agent-skills` workflow bullet:

```markdown
**Beads task management:** `beads-operations` for setup conventions (`bd init --shared-server --skip-agents`), the core workflow, and the troubleshooting runbook; `working-with-beads` for the exact CLI reference at the pinned version. These supersede the third-party `beads` plugin's convention guidance.
```

- [ ] **Step 3: README.md — skills list**

Add (alphabetical placement) `agent-skills:beads-operations` and `agent-skills:working-with-beads` to the skills code block in `README.md`. `beads-operations` goes after `best-practices-for-agentic-development`; `working-with-beads` goes after `working-with-claude-code`.

- [ ] **Step 4: Version bump both manifests**

In `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json`, change `"version": "1.8.0"` to `"version": "1.9.0"`.

- [ ] **Step 5: Verify discovery + links**

Run: `make list-update-scripts`
Expected: includes `skills/working-with-beads/scripts/update_docs.js`; `beads-operations` adds nothing (no fetch script).

- [ ] **Step 6: Commit**

```bash
git add AGENTS.md README.md .claude-plugin/plugin.json .codex-plugin/plugin.json
git commit -m "feat(beads): register working-with-beads + beads-operations; bump to 1.9.0"
```

---

## Task 11: Migration & activation (signoff-gated; partly outside the repo)

**Files:**
- User-level (outside repo): `~/.claude/CLAUDE.md`

- [ ] **Step 1: Update the installed plugin to lockstep**

Run: `/plugin update beads@beads-marketplace` (in-session) — brings the local 1.0.4 clone to 1.0.5.
Verify: `grep '"version"' ~/.claude/plugins/marketplaces/beads-marketplace/plugins/beads/.claude-plugin/plugin.json`
Expected: `1.0.5`.

- [ ] **Step 2: Repoint the global beads activation section (use the `agent-instructions` skill)**

Invoke the `agent-instructions` skill, then edit the "Beads for task management" section of `~/.claude/CLAUDE.md` so it references the new skills and precedence:
- `agent-skills:beads-operations` for conventions/workflow/troubleshooting (authoritative for conventions; supersedes the plugin).
- `agent-skills:working-with-beads` for the CLI reference.
- Keep the existing `bd init --shared-server --skip-agents` mandate; note the plugin is retained for hooks/commands/agent only.

This is a user-level file — present the diff and get explicit signoff before writing. Not part of the repo commit.

- [ ] **Step 3: Confirm with the user**

Confirm the global edit reads correctly and that beads still primes on session start (plugin hooks intact).

---

## Task 12: Final verification + PR

- [ ] **Step 1: Full local doc-update dry run**

Run: `make update-working-with-beads`
Expected: re-running is idempotent — no spurious diffs (sha256 unchanged → `fetched_at` preserved); `git status` shows no changes if nothing upstream/binary changed.

- [ ] **Step 2: Re-run unit tests**

Run: `node --test skills/working-with-beads/scripts/*.test.js`
Expected: PASS.

- [ ] **Step 3: Confirm `brew` pin + PINNED_VERSION agree**

Run: `brew list --pinned | grep beads && bd version && cat skills/working-with-beads/PINNED_VERSION`
Expected: pinned; `bd version` semver == `bd=` in PINNED_VERSION.

- [ ] **Step 4: Link + lint sweep**

Run the dangling-link check from Task 9 Step 6 across both skills; confirm no `BROKEN:` lines and no markdown-lint errors introduced.

- [ ] **Step 5: Open PR (signoff)**

```bash
git push -u origin feat/beads-skills
gh pr create --title "feat: beads skills (working-with-beads + beads-operations) and bd pin" --body "Implements docs/superpowers/specs/2026-06-12-beads-skills-design.md. Two skills + bd 1.0.5 pin; plugin retained, global activation repointed."
```

- [ ] **Step 6: Post-merge**

After merge, run `/plugin update agent-skills@agent-marketplace` to refresh the installed cache.

---

## Self-review notes

- **Spec coverage:** working-with-beads (Tasks 2–7) ✓; both reference sources pinned to tag (Tasks 4–5) ✓; graceful no-bd skip (Task 4) ✓; beads-operations conventions/workflows/troubleshooting/maintenance (Tasks 8–9) ✓; pin + PINNED_VERSION (Task 1) ✓; registration + version bump (Task 10) ✓; migration/activation + plugin-kept (Task 11) ✓; verification (Task 12) ✓.
- **No-bd CI path:** `generateCliRef` returns early; repo-docs fetch is tag-pinned → no churn; weekly CI stays green without bd. The graceful-skip is covered by the `bdMatchesPin` guard (Task 4), exercised implicitly; a no-bd environment is rare locally so it is verified by code-reading, not a dedicated test.
- **Glob collision:** Task 7 Step 3 explicitly handles the `update*.js` glob matching the `.test.js` file (rename to `cli-parsers.test.js` if needed).
- **Type/name consistency:** exported helper names (`parsePinnedVersion`, `normalizeVersion`, `parseCommandTree`, `parseSubcommands`, `filenameForCommand`) are identical across Tasks 3–6 and the test file; `writeRef`, `bdMatchesPin`, `generateCliRef`, `fetchUrl`, `fetchRepoDocs`, `main` are each defined once.
