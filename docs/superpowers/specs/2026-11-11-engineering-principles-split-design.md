# Split writing-and-reviewing-code into engineering-principles + reviewing-code

## Context

`skills/writing-and-reviewing-code/` was written as a code-review guide, so its ~700 lines of real engineering principles (simplicity, design, correctness, readability) are buried under review framing, and nothing triggers them while *writing* code. Joe wants a standalone principles skill and a leaner review skill.

Decisions made with Joe:
- **Two skills**, not one-per-principle (each description loads every session; principles have no distinct triggers; they are cross-cutting).
- **Playbooks stay in the review skill** ("what to check per diff type").
- **This repo owns the content now.** The verbatim-snapshot-of-ai-review-bot headers go away; no more hand-syncing.
- Names: `engineering-principles` (recommended over "...-and-discipline": discipline-type content already lives in `senior-engineering-best-practices`, and a vaguer name triggers worse) and `reviewing-code` (Joe's pick; the description must say "your own diff, not someone else's PR" to avoid misfires). This is still Joe's call, open to change before the rename commit.

## Target layout

```text
skills/engineering-principles/            NEW - fires when writing or designing code
  SKILL.md                                short: principles in brief + routing table
  references/
    principles.md                         from guide-principles.md: "## Principles" summary + sections 1-4
    language-notes.md                     moved as-is, reframed for writing first

skills/reviewing-code/                    RENAMED from writing-and-reviewing-code
  SKILL.md                                8-step procedure + reviewer table (step 3 -> load engineering-principles)
  references/
    self-review.md                        runbook (reviewer prompt reads principles.md + playbooks/index.md + language-notes.md)
    review-guide.md                       from guide-principles.md: "How to run a review" + "Writing the review"
    checklist.md                          from guide-principles.md: the condensed checklist
    worked-example.md                     from guide-principles.md: the example code review
    pr-description-template.md            from guide-principles.md: the PR body appendix
    playbooks/
      index.md                            the group table from playbooks.md, each playbook linked
      <slug>.md                           one file per playbook (~37), e.g. new-api-endpoints.md,
                                          migrations-and-deployment-sequencing.md, new-dependencies.md
  scripts/report.ts, report.test.ts       unchanged
commands/self-review.md                   keeps its name, repointed
```

## Steps (docs/markdown only, so execute directly; no code in `.ts` changes)

Work in `.worktrees/split-engineering-principles`; the design doc (this plan, copied to `docs/superpowers/specs/2026-11-11-engineering-principles-split-design.md`) is the first commit; one branch, one PR.

1. `git mv skills/writing-and-reviewing-code skills/reviewing-code` (keeps history). Then `git mv` language-notes.md into the new `skills/engineering-principles/references/`.
2. Split `guide-principles.md` by heading (line numbers from current file):
   - To `engineering-principles/references/principles.md`: header + intro (rewritten for writing-first), `## Principles` (14-145), sections 1-4 (251-703).
   - To `reviewing-code/references/`: `review-guide.md` = `## How to run a review` (146-250) + `### Writing the review` (704-729); `worked-example.md` = `### Worked example` (730-793); `checklist.md` = `## Checklist` (798-842); `pr-description-template.md` = the appendix (843-889). The section 5 stub (794-797) is dropped; `playbooks/index.md` replaces it.
   - Delete the old `guide-principles.md`. Remove the "Snapshot ... Edit the source, not this copy" blockquote from all moved files; replace with a one-line note that this repo is the source.
   - Split `playbooks.md` into `playbooks/index.md` (lines 1-21: intro + group table, each playbook name linked to its file) and one file per `##` heading (36 playbooks, lines 22-742). Slug = kebab-case of the heading. Do the split with a short throwaway script (not by hand-copying) and prove it lossless: concatenating the new files in heading order must reproduce lines 22-742 of the original exactly (`diff`). Fix internal links between playbooks (e.g. "see Data modeling") to the new relative paths.
   - Each split file gets a short `#` title and a one-line "Use when" taken from the index table row, so it makes sense opened alone by a reviewer agent.
3. Reframe, not rewrite: in `principles.md` and `language-notes.md`, change lead-ins that say "reviewer/reviewing" to writing-first with a "when reviewing" aside. Keep the substance. Link to `solid-principles`, `test-driven-development`, `domain-driven-design` instead of duplicating (light overlap found in sections 2 and 4).
4. Write `engineering-principles/SKILL.md`: description triggers on writing/designing/refactoring code and "what's the right way to structure this"; body is the principle list in brief plus a routing table to `principles.md` sections and `language-notes.md` (load only the language that matches). Not for reviewing a diff (-> `reviewing-code`).
5. Rewrite `reviewing-code/SKILL.md`: new name/description; step 3 becomes "load `engineering-principles` and read the diff in its order"; step 7 opens `references/playbooks/index.md` and only the matching playbook files; References list updated with the new pages (checklist for the final pass, worked example and PR template loaded on demand). Fix the playbook headers' links (`guide-principles.md` -> principles skill by name, not a cross-skill relative path, so per-skill Codex symlinks don't break).
6. Update `references/self-review.md` reviewer prompt: it reads `<GUIDE_DIR>/guide-principles.md`, `playbooks.md` and `language-notes.md`. Check how `GUIDE_DIR` is derived, then point it at `playbooks/index.md` (read only matching playbook files) and give the reviewer the principles skill's directory too (builder's call on the mechanism; the reviewer must still read principles.md and language-notes.md).
7. Update every caller of the old name: `commands/self-review.md:7,11-13`, `commands/commit-push-pr.md:72`, `skills/git-github-workflows/SKILL.md:3`, `README.md:104`, `SKILLS.md:40` (add a row for `engineering-principles`).
8. Skill-authoring discipline (`superpowers:writing-skills`): before finalizing `engineering-principles/SKILL.md`, run one pressure scenario in a subagent without the skill (write a small endpoint/module; does it over-abstract?) and one with it, and keep the description trigger only if behavior differs. Run `skill-reviewer` on both SKILL.md files.

## Verification

- `rg -n 'writing-and-reviewing-code|guide-principles|playbooks\.md' .` returns nothing outside git history.
- Playbook split is lossless (the `diff` in step 2) and `playbooks/` has exactly one file per original `##` heading plus `index.md`.
- `rg -n 'ai-review-bot/blob' skills/engineering-principles skills/reviewing-code` returns nothing.
- Every relative link in the four moved/new SKILL.md and reference files resolves (extract link targets with `rg -o` and check each path exists).
- `cd skills/reviewing-code/scripts && bun test` still passes (untouched).
- Run `/self-review` on the branch itself; its reviewer must actually open `principles.md` (check its report's "sections applied" line).
- After merge: follow `marketplace-publishing`'s "After pushing" to confirm the new skills reached `~/.claude/plugins/cache/.../agent-skills/<sha>/`.

## Risks / calls I made (flag for Joe)

- Line ranges above come from `rg '^#'` headings plus the Explore summary, not a full read of the 889-line file; confirm boundaries while splitting.
- The checklist is mixed principles/process; it stays with review. If principles feel thin without it, add a 5-line "before you finish" list to `engineering-principles/SKILL.md` later.
- Renaming the plugin-visible skill name drops the old name; anyone invoking `writing-and-reviewing-code` by name breaks. No external callers found in this repo; none checked in other repos (`rg` across `~/github` is a cheap follow-up).
