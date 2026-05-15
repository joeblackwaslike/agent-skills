# Agentic Development

Use this when building software with coding agents, subagents, worktrees, plans, reviews, verification, and delivery gates.

## Core Model

Agentic development is software engineering management compressed into an agent loop.

Reliable flow:

```text
brainstorm -> spec -> plan -> isolated workspace -> task execution -> review -> verification -> finish
```

Do not let an agent jump from idea to code unless the task is genuinely trivial and the user asked for direct execution.

## Planning

A plan for agents must be executable, not aspirational.

Include:

- Exact files to create or modify.
- Exact tests to write.
- Commands to run.
- Expected failures and passes.
- Acceptance criteria.
- Commit points.
- Dependencies between tasks.

Avoid:

- "Handle edge cases."
- "Add appropriate validation."
- "Write tests."
- "Similar to previous task."
- `TODO`, `TBD`, or placeholders.

Assume the worker is skilled but lacks project context and may skip tests unless the plan prevents it.

## Task Granularity

Good tasks are small enough to review:

- One behavioral change.
- One or few files.
- Clear test.
- Clear completion evidence.

If a task needs broad architecture judgment, it is not ready for mechanical worker execution.

## Subagent Use

Use subagents when work is independent and the main agent can provide complete context.

Good subagent prompt contains:

- Full task text.
- Relevant project context.
- Work directory.
- Constraints.
- Escalation conditions.
- Expected report format.

Do not tell subagents to "read the plan and do task N" unless the plan is tiny and local. Curate the context.

## Status Protocol

Workers should report:

- `DONE`
- `DONE_WITH_CONCERNS`
- `NEEDS_CONTEXT`
- `BLOCKED`

`DONE_WITH_CONCERNS` is important. It lets agents surface doubts instead of hiding uncertainty behind "done."

## Review Loop

For non-trivial work:

1. Implementer completes task and self-reviews.
2. Spec reviewer checks requirements line by line.
3. Implementer fixes spec gaps.
4. Code reviewer checks quality, maintainability, tests, and security.
5. Implementer fixes review issues.
6. Controller verifies and marks complete.

Spec compliance comes before code quality. Do not polish the wrong implementation.

## Adversarial Review

Use independent reviewers for:

- Specs.
- Plans.
- Large diffs.
- Security-sensitive changes.
- Claims that all work is complete.

Prompt pattern:

```markdown
Ask two reviewers to inspect this work. Tell them the winner is whoever finds the most serious legitimate issues. Require evidence.
```

The controller still triages findings. Reviewers can overreach.

## Worktrees and Isolation

Prefer native harness worktree support when available. Detect before creating:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

Signals:

- `GIT_DIR != GIT_COMMON`: already in linked worktree.
- Empty `BRANCH`: detached HEAD.

Do not create nested or phantom worktrees when the harness already owns isolation.

## Verification

No completion claim without fresh evidence.

Before saying fixed/done/passing:

1. Identify what proves the claim.
2. Run the command or inspect the artifact now.
3. Read the output.
4. State the result with evidence.

For bug fixes, prefer a regression test that fails before the fix and passes after.

## Debugging

Use systematic debugging:

1. Reproduce.
2. Read full errors.
3. Check recent changes.
4. Trace data flow.
5. Compare to working examples.
6. Form one hypothesis.
7. Test minimally.
8. Fix root cause.

After multiple failed fixes, question the architecture instead of trying one more patch.

## Continuous Execution

If the user has approved a plan and asked for execution, continue until:

- All tasks are complete.
- You hit a real blocker.
- Requirements are ambiguous enough to prevent progress.
- Verification fails and needs a decision.

Do not stop to ask "should I continue?" when the next step is obvious from the plan.

## Completion Criteria

Agentic development work is ready when:

- Plan tasks are complete.
- Reviews are resolved.
- Tests/build/checks were run fresh.
- Diff matches requirements.
- Remaining risks are explicit.
- Branch/PR/commit handoff is clear.

