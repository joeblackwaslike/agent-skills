# data-modeling skill: design

## Context

When Claude architects a feature that needs new persistent data, it improvises tables. There is no failure being fixed. The goal is a skill that makes it methodical and informed at design time, before code. Typical case (Joe's words): "a table to support a new feature", added to an existing relational database.

This repo has no design-time data-modeling skill. It does have review-time guidance: `skills/reviewing-code/references/playbooks/` holds `data-modeling-tables-relationships-and-domain-objects.md`, `queries-and-indexes.md` and `migrations-and-deployment-sequencing.md`. They cover keys, constraints, FK behavior, normalization, column-type smells and relationship shapes, but they lean Python/TypeScript. `domain-driven-design` covers aggregates and bounded contexts. `code-architectures` covers CQRS, event sourcing and sagas. `joe-stack-preferences` covers ORM and database picks.

## Decisions (Joe's)

- Relational, database-agnostic. Where engines differ, the skill flags it and does not pick a side.
- Fires during brainstorming and spec writing when a feature needs new persistent data. Not during implementation.
- Output is a short data-model section inside the spec.
- Topics: entities and relationships, access patterns, keys and constraints, normalization and its limits, evolution of an existing schema. Plus a DBML section.
- Approach A: one skill, with DBML as a reference file kept fresh by an update script.
- Lint: a checklist, plus one optional tool reference page.
- Link to the existing reviewing-code playbooks. Do not copy their content, and do not edit reviewing-code.

## Goals, non-goals, anti-goals

- Goals: a repeatable design method an agent follows before proposing tables. A spec section that Joe can review. A DBML sketch as the notation.
- Non-goals: engine-specific defaults. ORM mapping. Domain-boundary design. Event sourcing. Migration mechanics.
- Anti-goals: two copies of the same schema advice that drift. A skill that always demands tooling (Java, a scratch database) to be usable.

## Files

New, under `skills/data-modeling/`:

- `SKILL.md` (~80 lines, shaped like `domain-driven-design/SKILL.md`). Frontmatter has `name`, a "Use when" description under 400 characters, and `metadata.last_updated`. Body has a "do you need it?" table (one new column versus a real design pass), a Route First table, and a Related skills section.
- `references/design-method.md`. The ordered method: entities and relationships, then access patterns written first, then keys and constraints, then normalization, then the spec-section template. It links into the reviewing-code playbooks for depth on types, keys and relationship shapes.
- `references/model-review-checklist.md`. The lint-by-reading checklist. One line per check, each linking out to the right playbook section.
- `references/evolving-an-existing-schema.md`. Fitting new tables into what exists (naming, conventions, soft deletes, history, tenancy), then handing off to `migrations-and-deployment-sequencing.md`.
- `references/dbml.md`. A fetched snapshot of the official DBML docs, with `source`, `fetched_at` and `sha256` frontmatter.
- `references/linting-tools.md`. The optional pipeline: `dbml2sql`, a scratch database, SchemaCrawler Lint. Notes that migration linters (Squawk, Postgres-only) belong at migration time. Marks the third-party `dbml-tools` `check` subcommand as unverified.
- `scripts/update_dbml_docs.js`. Fetches the DBML docs page and uses `withFrontmatter` and `setSkillLastUpdated` from `scripts/lib/doc-frontmatter.cjs`. Pattern reference: `skills/working-with-claude-code/scripts/update_docs.js`.

Edited:

- `SKILLS.md`: add one row (`` | `data-modeling` | When to invoke | ``).
- `README.md`: add a row to the skills table.
- `Makefile`: add `update-data-modeling` and add it to `.PHONY`. The glob already finds the script.
- Optional: one bullet under Common Workflows in `AGENTS.md`.

Do not touch: `.claude-plugin/plugin.json` or `.codex-plugin/plugin.json` (no `version` field allowed, CI guard enforces it), and anything in `reviewing-code`.

## How to build it

1. Create the worktree `.worktrees/data-modeling`. The design spec (copy of this plan) is the first commit, at `docs/superpowers/specs/2026-11-13-data-modeling-skill-design.md`.
2. Invoke `superpowers:writing-skills`. Run the RED pressure scenario first: a subagent designs tables for a feature with no skill, and the gaps found shape the text.
3. Verify DBML syntax and the CLI against the current docs at dbml.dbdiagram.io. Do not write it from memory. Confirm what `dbml-tools check` does before saying anything about it, or leave it marked unverified.
4. Write the files above. Run `no-ai-slop` then `humanizer` on every markdown file written, per the docs rule.
5. GREEN run: repeat the scenario with the skill loaded.
6. Run `make update-data-modeling` and `python3 -I scripts/lint-descriptions.py`. Both must pass.
7. `/self-review`, open the PR, run `/pr-loop`. Target is one branch, one PR.

## Verification

- `make update-data-modeling` exits 0 and `references/dbml.md` has frontmatter with a sha.
- `python3 -I scripts/lint-descriptions.py` passes.
- GREEN scenario produces a spec section with entities, access patterns, constraints and a DBML block, and cites the linked playbooks. The RED run does not.
- `rg -n 'data-modeling' SKILLS.md README.md Makefile` finds all three registrations.
- After the push, grep the plugin cache for the new skill, per the repo's release notes (`~/.claude/plugins/cache/<marketplace>/agent-skills/<sha>/skills/data-modeling`), not the working tree.

## Left to the builder

Exact wording and section order inside each page. Whether the fetched DBML page needs trimming. Which SchemaCrawler lint checks to name on the tools page, once confirmed against its docs.

## Changes during the build

- `references/evolving-an-existing-schema.md` was dropped. Two no-skill baseline runs already read the existing schema, flagged missing columns and wrote online migrations, and the migrations playbook covers sequencing. The content became step 1 of `design-method.md`.
- `references/dbml.md` became `dbml-syntax.md` and `dbml-cli.md`, fetched from the raw markdown in holistics/dbml (`docs.md`, `cli.md`). The CLI page is needed for `dbml2sql`.
- Baseline finding that shaped the skill. Agents already knew keys, constraints and tenant isolation. The failure was output shape: 2,500 to 2,800 words of Postgres DDL with access patterns late. So `SKILL.md` carries a six-part contract with a size bound, not a tutorial.
- Not verified. The worked DBML example was not run through `dbml2sql`, because installing the CLI was not permitted in the build session. It was checked by hand against the fetched syntax page.
