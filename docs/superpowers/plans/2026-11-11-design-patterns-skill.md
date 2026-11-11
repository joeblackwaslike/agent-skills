# design-patterns Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `skills/design-patterns/`: a problem-routed catalog plus one in-depth Python and TypeScript reference per production pattern.

**Architecture:** `SKILL.md` routes by problem to `references/<category>/<pattern>.md`; `references/catalog.md` lists every pattern (full and catalog-only) with prevalence. Every reference file follows one fixed template. Content is verified by extracting fenced code blocks and type-checking them.

**Tech Stack:** Markdown; `pyright` and `tsc` (via `bunx`) for block checks; `make lint-descriptions`.

**Spec:** `docs/superpowers/specs/2026-11-11-design-patterns-skill-design.md`

## Global Constraints

- Skill name `design-patterns`, directory equals frontmatter `name`, file `SKILL.md` uppercase, kebab-case.
- Description under 400 characters, trigger first, "Not for X (use Y)" exclusions in both directions.
- `metadata.last_updated: "2026-11-11"`. No `version` field anywhere (CI guard).
- Python 3.12+ (`Protocol`, `dataclass`, type hints); TypeScript with structural types, no class where a function and closure do. Examples run, one running domain (orders/payments).
- Per-pattern template, in this order: What it is and Problem it solves; Do you need this?; Python; TypeScript; In production; Smells and misuse; Related. Target 80 to 150 lines per file.
- Every reference opens by naming the plain alternative. No ASCII banner comments, no inline comments unless unavoidable.
- Library claims (tenacity, pybreaker, cockatiel, p-retry, SQLAlchemy `Session`, Express/Koa middleware) verified against current docs (Ref or context7) before they are written. Pin no versions.
- Prose passes `no-ai-slop` then `humanizer`; flagged tics: colon-reveal lead-ins, `load-bearing` as metaphor, `quietly`.
- Do not edit the modified `skills/working-with-opencode/references/docs-AGENTS.md` in the main checkout. Work only in `.worktrees/design-patterns`.

## Review Focus

- A pattern file whose Python or TS block does not type-check. Expected: zero errors from the extraction script.
- A `references/` link in `SKILL.md` or `catalog.md` pointing at a file that was merged away (Facade into Adapter, Null Object into Result/Option). Expected: link check passes.
- The negative control ("add a second CSV export format") getting a pattern after the skill loads. Expected: a plain function argument.
- Description over the lint threshold or missing a reciprocal exclusion. Expected: `make lint-descriptions` clean.
- A catalog row naming a pattern that has no file and is not marked catalog-only. Expected: every row is either a link or "catalog-only".

---

### Task 0: RED baseline

**Files:**
- Create (scratchpad, uncommitted): `<scratchpad>/red-baseline.md`

**Interfaces:**
- Produces: recorded baseline failures for scenarios 1 to 4 from the spec, used in Task 4 to compare.

- [ ] **Step 1:** Dispatch four fresh Sonnet subagents, one per spec scenario (payment providers with an `if provider ==` chain; make an HTTP call reliable; notify modules when an order ships; second CSV export format). Each gets a small inline code sample in a temp dir outside the repo, and a task prompt only. No skill access to `design-patterns` (it does not exist yet).
- [ ] **Step 2:** Write each subagent's output summary and the failure it shows (or "no failure") to `red-baseline.md`.
- [ ] **Step 3:** Run: `ls skills/design-patterns 2>&1`. Expected: no such directory (confirms baseline ran without the skill).

### Task 1: Scaffold, router and catalog (PR 1 part A)

**Files:**
- Create: `skills/design-patterns/SKILL.md`, `skills/design-patterns/references/catalog.md`
- Modify: `SKILLS.md` (new row), `skills/solid-principles/SKILL.md` and `skills/engineering-principles/SKILL.md` (add `design-patterns` to Related skills)
- Create (scratchpad, uncommitted): `<scratchpad>/verify-blocks.ts`

**Interfaces:**
- Produces: the file path convention `references/<category>/<pattern>.md` with categories `creational`, `structural`, `behavioral`, `data-access`, `resilience`, `value-modeling`. Tasks 2 to 4 create the files this task links to.
- Produces: `bun <scratchpad>/verify-blocks.ts <file...>` exits non-zero if any fenced `python` or `typescript` block fails `pyright` or `tsc --noEmit`; blocks whose first line is `# fragment` or `// fragment` are skipped.

- [ ] **Step 1:** Write `verify-blocks.ts` (Bun). Self-check: run it on a temp file with one valid and one invalid block per language and confirm exit 1 naming the invalid blocks, then exit 0 with only valid ones.
- [ ] **Step 2:** Write `SKILL.md` with frontmatter (name, description from the spec, `metadata.last_updated`), a "Default to no pattern" paragraph, a "What to load" table (problem to file, same shape as `skills/engineering-principles/SKILL.md`), and Related skills (`engineering-principles`, `solid-principles`, `domain-driven-design`).
- [ ] **Step 3:** Write `catalog.md`: one table per category with columns Pattern, What it is (one line), Prevalence (common/occasional/rare), Link or "catalog-only". Include the nine catalog-only entries from the spec, each with "you probably want X instead".
- [ ] **Step 4:** Add the SKILLS.md row; add the Related skills line to the two sibling SKILL.md files.
- [ ] **Step 5:** Run: `make lint-descriptions`. Expected: exit 0, no FAIL for `design-patterns`.
- [ ] **Step 6:** Commit: `feat(design-patterns): scaffold skill router and catalog`.

### Task 2: Behavioral patterns (PR 1 part B)

**Files:**
- Create: `skills/design-patterns/references/behavioral/{strategy,observer,command,chain-of-responsibility,state,template-method,iterator}.md`

**Interfaces:**
- Consumes: the template and conventions in Global Constraints; the running orders/payments domain.
- Produces: seven files whose relative paths match the Task 1 links.

- [ ] **Step 1:** For each pattern, write the file per the template. Strategy opens with "a function argument or dict of functions" as the plain alternative; Observer covers error isolation between subscribers; Chain of Responsibility cites Express/Koa and ASGI middleware after the docs are checked.
- [ ] **Step 2:** Run: `bun <scratchpad>/verify-blocks.ts skills/design-patterns/references/behavioral/*.md`. Expected: exit 0.
- [ ] **Step 3:** Run `no-ai-slop` then `humanizer` on the prose of the seven files.
- [ ] **Step 4:** Commit: `feat(design-patterns): behavioral pattern references`.
- [ ] **Step 5:** Run the `/self-review` command, fix real findings, then open PR 1 and drive it with `/pr-loop`.

### Task 3: Creational, structural, value modeling (PR 2)

**Files:**
- Create: `references/creational/{factory,builder,dependency-injection,singleton}.md`, `references/structural/{adapter,decorator,proxy}.md`, `references/value-modeling/result-option.md` (all under `skills/design-patterns/`). Facade folds into `adapter.md` and Null Object into `result-option.md` unless either exceeds 40 lines of real content on its own.

**Interfaces:**
- Consumes: Task 1 conventions. If a pattern was merged, update its `SKILL.md` and `catalog.md` links in this task so the Review Focus link check passes.

- [ ] **Step 1:** Branch from PR 1's branch. Write the files per the template. Singleton recommends module-level instance or DI; Decorator covers both the wrapper object and Python/TS decorator syntax.
- [ ] **Step 2:** Run the verify script on the new files, then a link check (`rg -o 'references/[a-z/-]+\.md' skills/design-patterns/SKILL.md skills/design-patterns/references/catalog.md` and confirm each path exists). Expected: exit 0, no missing paths.
- [ ] **Step 3:** Prose pass (`no-ai-slop`, `humanizer`), commit `feat(design-patterns): creational, structural and value-modeling references`.
- [ ] **Step 4:** `/self-review`, fix, open PR 2, `/pr-loop`.

### Task 4: Data access, resilience, GREEN check (PR 3)

**Files:**
- Create: `references/data-access/{repository,unit-of-work,dto-mapper}.md`, `references/resilience/{retry-backoff,circuit-breaker,idempotency-key,outbox}.md` (under `skills/design-patterns/`)
- Modify: `metadata.last_updated` in `SKILL.md` if the date has changed.

**Interfaces:**
- Consumes: `domain-driven-design` for Repository (link, do not restate aggregates).

- [ ] **Step 1:** Write the seven files per the template. Retry covers jitter and idempotency; Outbox covers the dual-write problem and a polling relay; Unit of Work uses SQLAlchemy `Session` and a TS transaction wrapper.
- [ ] **Step 2:** Run the verify script and link check as in Task 3. Expected: exit 0.
- [ ] **Step 3:** Rerun Task 0 scenarios 1 to 4 with fresh Sonnet subagents that have the skill loaded; compare to `red-baseline.md`. Expected: 1 to 3 improve, 4 stays a plain function argument. If 4 regresses, tighten "Default to no pattern" in `SKILL.md` and rerun.
- [ ] **Step 4:** Prose pass, commit `feat(design-patterns): data-access and resilience references`.
- [ ] **Step 5:** `/self-review`, fix, open PR 3, `/pr-loop`.

### Task 5: Release confirmation

- [ ] **Step 1:** After the last merge, load `marketplace-publishing` and run its "After pushing" cache refresh.
- [ ] **Step 2:** Run: `grep -c design-patterns ~/.claude/plugins/cache/agent-marketplace/agent-skills/*/SKILLS.md`. Expected: at least one match in the newest SHA directory.
- [ ] **Step 3:** Run `wt-reap design-patterns` from the main checkout once all three PRs are `MERGED`.
