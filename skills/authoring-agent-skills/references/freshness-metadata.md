# Freshness metadata

Two freshness signals let an agent judge how current a skill's docs are. Both flow through one shared helper: [`scripts/lib/doc-frontmatter.cjs`](../../../scripts/lib/doc-frontmatter.cjs). Never re-implement hashing or frontmatter parsing in an individual update script — import the helper.

## The two signals

### 1. Per fetched doc — `source` / `fetched_at` / `sha256`

Every auto-fetched file in a `working-with-X` skill's `references/` gets a frontmatter block:

```yaml
---
source: "https://ai-sdk.dev/docs/ai-sdk-core/generating-text.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "b41dcb133f745b287da0567231e75c32bbed209592502ec00d1f3cb38056797e"
---
```

- `source` — the exact upstream URL the body came from.
- `fetched_at` — ISO timestamp of the **last time the content changed** (see change-detection below), not the last run.
- `sha256` — hash of the fetched body; drives change-detection.

Hand-written reference files get **no** such block. The `working-with-pieces` skill is the documented exception: its docs merge multiple upstreams, so they carry only the skill-level signal, and its hand-written reference files may instead carry a `name`/`description` block.

### 2. Per skill — `metadata.last_updated`

`SKILL.md` frontmatter carries a coarse `YYYY-MM-DD` date the agent sees the moment it loads the skill:

```yaml
metadata:
  last_updated: "2026-06-11"
```

For doc-wrappers, the update script restamps this **only when a fetched doc actually changed**. For hand-written skills, set it on creation and bump it on meaningful edits (or backfill from git — see below).

## The `doc-frontmatter.cjs` API

```js
const { withFrontmatter, setSkillLastUpdated, sha256, parseFrontmatter }
  = require('../../../scripts/lib/doc-frontmatter.cjs');
```

### `withFrontmatter({ filePath, body, source, title?, now })`

Wraps a freshly-fetched `body` with (or merges into) freshness frontmatter.

- **`filePath`** — path to the existing reference file (used for change-detection; pass it even on first write — it just won't exist yet).
- **`body`** — the raw fetched content.
- **`source`** — upstream URL → stored as `source:`.
- **`title`** *(optional)* — used only when the body has no frontmatter of its own; written as a `title:` line.
- **`now`** — the run's ISO timestamp (`RUN_NOW`). **Required** — throws if missing.

**Returns** `{ content, changed, sha256, fetched_at }`:

- `content` — the final markdown to write to disk.
- `changed` — `true` if this fetch detected a content change (i.e. `fetched_at` moved to `now`); OR `false` if the sha matched the previous fetch.
- `sha256`, `fetched_at` — the values stamped into the frontmatter (handy for a `manifest.json`).

If `body` already starts with its own frontmatter (e.g. raw docs from a repo), the freshness keys are **merged** into that block rather than stacking a second one.

### `setSkillLastUpdated(skillMdPath, date)`

Sets `metadata.last_updated` in a SKILL.md, creating the `metadata:` block or the `last_updated:` field if absent, preserving existing indentation. Returns `true` if the file changed. Call it with `RUN_NOW.slice(0, 10)`.

### `sha256(body)` / `parseFrontmatter(content)`

Low-level helpers (hex digest; `{ block, raw, rest } | null`). Rarely needed directly — `withFrontmatter` uses them internally.

## Change-detection (why timestamps don't churn)

On each run `withFrontmatter` hashes the new body and compares it to the `sha256` stored in the existing file:

- **sha matches** → reuse the old `fetched_at`, return `changed: false`. The file is rewritten byte-identical, so `git` sees no diff.
- **sha differs (or no prior file)** → set `fetched_at = now`, return `changed: true`.

The script ORs every `wrapped.changed` into a single `docsChanged` flag and only calls `setSkillLastUpdated` when it's true. Net effect: a weekly run where nothing upstream changed produces **zero** git churn — no moved timestamps, no `last_updated` bump.

## Backfilling / re-stamping `last_updated`

To stamp (or correct) `metadata.last_updated` on every SKILL.md from each skill's real last-content-change date in git history:

```bash
node scripts/backfill-last-updated.cjs
```

It runs `git log -1 --format=%cs -- <skill path>` per skill, is idempotent, and also migrates any legacy `metadata.version: <date>` field to `last_updated`. Use it after adding a batch of skills or when timestamps drift.
