---
name: reviewing-code
description: >-
  Use before opening a PR or sharing finished work, to self-review your own diff
  as a reviewer who didn't write it. Triggers on "/self-review", "about to open
  a PR", "polish this before I share it", "is my diff ready", or before
  `gh pr create`. Not for reviewing someone else's PR. Not for writing or
  designing code (use engineering-principles). Not for opening the PR, driving
  it to merge or answering review feedback (use git-github-workflows).
---

# Reviewing Code

Stop before the PR. Read your own diff the way a reviewer who didn't write it would, and fix what they would find. Agent-written code tends to carry shortcuts, speculative abstractions and stale docs that the author can't see anymore. The aim is a PR you'd be glad to have your name on.

The principles the review applies live in the `engineering-principles` skill, which also covers writing code. Load it for step 3. This skill is the process: how to read the diff, what to run, which playbooks and reviewer agents to bring in.

## Procedure

Do the steps in order. Fix problems as you find them, then re-run step 2 when you finish.

1. **Size and intent.** State the change's intent in one sentence, taken from the spec, plan or bead. If you can't, stop and find out. Check the diff size. Past about 400 hand-written lines (or 200,000 diff characters), split along a seam into stacked PRs. Put mechanical edits (renames, moves, formatting) in their own commits.
2. **Mechanical gate.** Find what the project enforces (formatters, every linter, type checking, each kind of test) from its `CLAUDE.md`/`AGENTS.md`, manifests and CI, run the checks cheapest first, and run the changed behavior once on a real input (skip for docs-only changes). Discovery runs once per worktree and is cached. Say what the project lacks under "Gate gaps". It costs no LLM tokens. Fix every red result before reading further. Detail: [references/mechanical-gate.md](references/mechanical-gate.md).
3. **Read the diff in the principles' order.** Load the `engineering-principles` skill and read its `references/principles.md`. Scope first (KISS, YAGNI, DRY, Rule of Three), then design (SOLID, separation of concerns, coupling, Law of Demeter, Tell Don't Ask, composition, command-query separation), then correctness (fail fast, parse don't validate, least privilege, Hyrum's Law), then readability (least astonishment, Chesterton's Fence, Boy Scout Rule). Accept a speed change only with a measurement. If scope or design is wrong, fix that before any line-level cleanup. How to run and write up a review: [references/review-guide.md](references/review-guide.md).
4. **Check what the diff can't show.**
   - For every removed or changed symbol, find its callers and sibling code paths (`find_referencing_symbols` or Go to References).
   - Run `git blame` on anything removed (Chesterton's Fence).
   - List the new public surface: names, endpoints, config keys, migrations, error text. Each one becomes a contract.
5. **Tests.** Would they fail if the behavior broke? Confirm every new or changed test was seen failing first (write the test, watch it fail, then make it pass). If you can't show the red output, revert the fix, watch the test fail, restore.
6. **Docs and README.** When a feature is added or changed, update the README, docs, config reference and examples in the same branch. Grep the docs for the old name or flag of anything renamed or removed.
7. **Matching playbooks.** Name the kinds of change in the diff (endpoint, migration, auth, Dockerfile, shell, skill or instruction file, new dependency, LLM prompt, and so on). Open [references/playbooks/index.md](references/playbooks/index.md), use its table to pick the matching playbooks, open only those files, and apply each one on top of steps 3-6.
8. **Reviewer agents.** Dispatch the agents whose trigger matches, up to the cap of 6 at the end of this step, in parallel with step 7, each with `model: sonnet`, and fold their findings into your fixes. These are custom installed agents, not built-ins. Most come from [everything-claude-code](https://github.com/affaan-m/everything-claude-code). If one isn't installed, dispatch a `general-purpose` agent with the same task and the reviewer's role in one line.

| Agent | Dispatch when the diff… |
|---|---|
| `code-reviewer` | always. In `/self-review` it is the main reviewer and gets the runbook's prompt. |
| `database-reviewer` | changes database schemas, tables, queries or migrations |
| `python-reviewer`, `typescript-reviewer`, `rust-reviewer`, `go-reviewer`, `swift-reviewer`, `ruby-reviewer`, `vue-reviewer` | has code in that language or framework. They run the language's own tools (ruff, mypy, bandit, tsc). |
| `react-reviewer`, `fastapi-reviewer` | changes a React or FastAPI app |
| `security-reviewer` | touches auth, secrets, user input, URL fetching or external APIs |
| `mle-reviewer` | changes ML code: data contracts, feature pipelines, training reproducibility, model serving |
| `pr-test-analyzer` | changes code. Skip it when the change is documentation or configuration only. |
| `comment-analyzer` | adds or changes code comments |
| `type-design-analyzer` | adds or changes types |
| `rag-pipeline-reviewer` | changes a RAG pipeline |
| `silent-failure-hunter` | adds error handling, retries or fallbacks |
| `performance-optimizer` | claims a speedup or changes a hot path |
| `code-simplifier` | adds a new module or more than about 200 lines of new code |
| `refactor-cleaner` | refactors or removes code |
| `reviewing-skills` roles | adds or edits any file under `skills/`. Dispatch a `general-purpose` agent whose whole prompt is the filled role template from the `reviewing-skills` runbook; do not tell it to load the skill. The instruction-quality role is always kept; content, routing and pipeline follow the trigger table in that skill's "Inside /self-review" section. |
| `plugin-validator` | changes a plugin's manifests, hooks, commands, agents, mcp, or skill layout |
| `agent-evaluator` | is mainly prose written for a reader: a spec, plan, design doc, report or runbook. It scores accuracy, completeness, clarity, actionability and conciseness. |
| `doc-updater` | changes code that docs describe, so the docs need checking |

`code-simplifier`, `performance-optimizer`, `refactor-cleaner` and `doc-updater` can edit files. Start their prompt with "Report findings only. Do not edit files, commit, or post anywhere."

Send at most 6 in one round. Always keep `code-reviewer`, the `reviewing-skills` instruction-quality role, and `pr-test-analyzer` and `security-reviewer` when they apply. Drop the others in this order until 6 remain: `code-simplifier`, `comment-analyzer`, `doc-updater`, `refactor-cleaner`, `performance-optimizer`, `agent-evaluator`, `type-design-analyzer`, the `reviewing-skills` pipeline, routing and content roles (in that order), `python-reviewer` when `fastapi-reviewer` runs, `silent-failure-hunter`, then, one at a time, the remaining reviewer whose trigger matches the fewest changed lines. Count each reviewer's matching changed lines once, before dropping any.

When the pass is done, re-run the mechanical gate from step 2. The pass ends there.

## Runbook

To run the whole pass with fresh-eyes reviewers, use `/self-review`, or follow [references/self-review.md](references/self-review.md). It turns steps 1-8 into a procedure: freeze the scope, run the gate, dispatch a new reviewer that reads the principles, triage and fix its findings, re-review the fixes (at most twice), and report. Use the procedure above as the checklist and the runbook as how to execute it.

## References

Load only what the step needs.

- [references/self-review.md](references/self-review.md): the `/self-review` runbook, including the reviewer prompt. Run it before opening a PR.
- [references/mechanical-gate.md](references/mechanical-gate.md): how to discover the project's checks, order them, scope them to the changes, and cache the result. Step 2.
- [references/review-guide.md](references/review-guide.md): how to run a review of your own diff and how to write up the findings. Steps 1 and 3.
- [references/playbooks/index.md](references/playbooks/index.md): the table of playbooks, one file per kind of change. Step 7.
- [references/checklist.md](references/checklist.md): the condensed checklist. Use it for the final pass.
- [references/worked-example.md](references/worked-example.md): one complete review, for calibrating tone and content.
- [references/pr-description-template.md](references/pr-description-template.md): the PR body template. Use it when you write the description.
- The `engineering-principles` skill: `references/principles.md` for step 3, `references/language-notes/index.md`, then the file for each language in the diff.
- [reviewing-skills](../reviewing-skills/SKILL.md): the review process for diffs under `skills/`. Step 8 dispatches its roles.
