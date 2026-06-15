# Registration checklist

What to touch after the skill's files exist, so it's discoverable, auto-updated, and shippable. Work top to bottom.

## 1. `AGENTS.md` (source of truth)

`CLAUDE.md` is just `@AGENTS.md`, so all human-facing skill docs live in [`AGENTS.md`](../../../AGENTS.md).

- **Available Skills table** — add a row in the form `| skill-name | When to invoke (one line) |` (wrap the skill name in backticks, matching the existing rows).
- **Common Workflows** — if the skill fits an existing workflow narrative (e.g. "Vercel AI SDK development"), add a bullet. Optional for niche skills.

## 2. `README.md`

Add the skill to the README's `## Skills` listing so the repo's public docs include it. **Easy to forget — skills have drifted out of this list before.** The list is a flat, alphabetically-sorted code block of `agent-skills:<name>` entries; add yours in the correct alphabetical slot:

```text
agent-skills:<skill-name>
```

Confirm the README matches the `skills/` directory exactly (catches both the just-added skill and any earlier drift):

```bash
diff <(grep -oE 'agent-skills:[a-z-]+' README.md | sed 's/agent-skills://' | sort) <(ls -1 skills/ | sort)
```

No output = in sync.

## 3. `Makefile` (doc-wrappers only)

Discovery is **automatic** — `make update-all` and CI glob every fetch script via:

```make
UPDATE_SCRIPTS := $(shell find skills -path '*/scripts/update*.js' -o -path '*/scripts/update*.sh' 2>/dev/null | sort)
```

So a new `skills/<name>/scripts/update*.{js,sh}` is picked up by `update-all` with **no wiring**. By convention, still add a **named** target for ergonomics, and add it to `.PHONY`:

```make
update-<skill-name>: ## Update <skill-name> references (what it fetches)
	node skills/<skill-name>/scripts/update_docs.js
```

Skills with **no** fetch script (topic/`developing-X`) get **no** Makefile target. Verify discovery with `make list-update-scripts`.

## 4. CI — no edit needed

[`.github/workflows/update-docs.yml`](../../../.github/workflows/update-docs.yml) runs `make update-all` on a weekly schedule (`cron: '0 4 * * 1'` — Monday 04:00 UTC) plus `workflow_dispatch`. It auto-discovers your script through `update-all`. It commits **only** `skills/*/references/` diffs with `[skip ci]` to avoid re-triggering itself:

```yaml
git add skills/*/references/
git diff --cached --quiet || git commit -m "chore: update auto-generated skill docs [skip ci]"
git push
```

Nothing to change here when adding a skill.

## 5. Version bump

Bump the plugin manifests so the marketplace ships the new skill:

- [`.claude-plugin/plugin.json`](../../../.claude-plugin/plugin.json)
- [`.codex-plugin/plugin.json`](../../../.codex-plugin/plugin.json)

Use the `marketplace-publishing` skill for the versioning rules (semantic version — adding a skill is a minor bump). Keep both manifests in lockstep.

## 6. Commit & post-push

- Commit (docs-only — no `executing-plans`/code-review gate per the repo's docs-only override).
- After pushing, refresh the installed cache: `/plugin update agent-skills@agent-marketplace`.

## Verification

1. `make list-update-scripts` — your fetch script appears (doc-wrappers); a topic skill adds nothing.
2. `make update-<skill-name>` (doc-wrappers) — fetches, writes `references/`, and stamps `last_updated` on first run.
3. Every `references/*.md` path the `SKILL.md` links to exists (no dangling links).
4. `README.md` matches `skills/` exactly (the `diff` in step 2 prints nothing).
5. Skill triggers: load the skill and confirm the `description` fires on its intended phrases (optionally via `skill-creator` eval).
