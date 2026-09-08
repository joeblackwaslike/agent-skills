# Agentic Development

Use this when building software with coding agents, subagents, worktrees, plans, reviews, verification, and delivery gates.

## Core Model

Agentic development is software engineering management compressed into an agent loop.

Reliable flow:

```text
brainstorm -> spec -> plan -> isolated workspace -> task execution -> review -> verification -> finish
```

Do not let an agent jump from idea to code unless the task is genuinely trivial and the user asked for direct execution.

## Ceremony Triage

Classify before entering the brainstorm -> spec -> plan pipeline:

| Path | When | Output |
| --- | --- | --- |
| SPIKE | Feasibility question | Recommendation, no design doc |
| BOUNDED | Well-scoped change to an existing flow | A few sentences of in-chat design, no spec/plan file |
| ARCHITECTURAL | New subsystems/interfaces | Full spec -> plan pipeline |

Rules: when in doubt, take the heavier path. Classification ratchets one-way only — hidden complexity mid-task can upgrade the path, never downgrade. Approval-before-implementation is a hard gate on ALL three paths; only the ceremony/paperwork scales.

Reject: "I'll call it bounded to skip the spec." / "It's bounded and the design is obvious, I'll start while they read it."

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
- `Spec:` header pointing at the spec/design doc the plan implements — greppable traceability.

Avoid:

- "Handle edge cases."
- "Add appropriate validation."
- "Write tests."
- "Similar to previous task." (repeat the code — tasks get read out of order.)
- `TODO`, `TBD`, or placeholders.
- References to undefined types/functions.
- Steps describing WHAT without showing HOW.

Assume the worker is skilled but lacks project context and may skip tests unless the plan prevents it.

### Plan Structure: Constraints and Interfaces

- Global Constraints block: project-wide rules (version floors, dependency limits, exact naming/copy) copied verbatim from the spec, binding on every task.
- Per-task Interfaces block: what a task consumes from earlier tasks / produces for later ones, with exact signatures.

An implementer subagent sees only its own task brief and has no other way to learn a neighboring task's contract.

## Task Granularity

Good tasks are small enough to review:

- One behavioral change.
- One or few files.
- Clear test.
- Clear completion evidence.

If a task needs broad architecture judgment, it is not ready for mechanical worker execution.

Sizing test: the smallest unit that carries its own test cycle and is worth a fresh reviewer's gate. Fold setup/scaffolding into the task whose deliverable needs it; split only where a reviewer could reject one task while approving its neighbor. Measured: right-sized plans needed ~1 fix round vs. 2-4 for over-split plans, and the over-split control shipped a real bug.

## Batching Micro-Tasks

When a plan lists several small, independent, same-kind edits, dispatch a single implementer with every file+change listed, and review the whole batch as one diff — explicitly verify every listed file made it into the diff. Per-task dispatch overhead dominates cost on trivial tasks.

## Subagent Use

Use subagents when work is independent and the main agent can provide complete context.

Good subagent prompt contains:

- Full task text.
- Relevant project context.
- Work directory.
- Constraints.
- Escalation conditions.
- Expected report format.
- File paths to diffs/task briefs, not pasted content — a pasted diff permanently occupies the most expensive context (measured: one dispatch hit 42k chars, 99% pasted history).

Do not tell subagents to "read the plan and do task N" unless the plan is tiny and local. Curate the context. Measured failure of the alternative: reviewers given only a diff, with no task brief, produced confident spec-compliance verdicts that silently redefined "spec" as whatever constraints were visible in the diff — 0 of 5 test reviewers flagged the missing brief.

### Model Selection

Name the model explicitly on every dispatch — left implicit, controllers default every dispatch to the session's priciest model.

| Task type | Tier |
| --- | --- |
| Mechanical/pure transcription (plan already has exact code) | Cheapest |
| Integration/standard | Mid |
| Architecture/most-capable judgment; reviewers; prose-driven implementers | Top / mid floor |

Rule: turn count beats token price — cheap models can take 2-3x the turns on multi-step work and cost more overall than a mid-tier model finishing faster.

### Delegation Depth Cap

Implementers/reviewers must not spawn their own sub-subagents — a worker-spawned reviewer duplicates the controller's own review seat with no gate wired to it. Reject "free extra assurance" framing; it's a duplicate seat reviewing the same diff, a defect to flag.

### Subagent Skill-Discovery Escape Hatch

If subagents inherit the same skill-discovery/auto-trigger mechanism as the top-level agent, a dispatched subagent can misfire into running a full skill workflow instead of executing its assigned task. Give dispatched subagents an explicit instruction to skip auto-triggered skill workflows and just execute the assigned task.

### Polling Discipline

Never poll with short timeouts; never sit in one silent open-ended wait. Do local work while children run. When genuinely idle, wait in bounded 5-10 minute stretches with one status line between stretches, then reconcile any children that finished without reporting.

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

Where feasible, consolidate steps 2 and 4 into one reviewer pass returning both spec-compliance and code-quality verdicts, so one fix cycle clears both concerns. Add a third verdict class, "cannot verify from diff" (for requirements living in code the diff never touched) — flag it for the controller, who holds cross-task context, rather than letting the reviewer guess.

Before adding a fresh-subagent double-check step, verify it earns its cost — compare against an inline self-review checklist across ~5 versions x 5 trials; cut the subagent step if scores match. Measured case: identical quality scores, ~25 minutes cut per review.

### Review Cadence

Concentrate review effort at two high-signal points in addition to per-task review: a pre-flight read of the whole plan before Task 1 (catches structural plan defects for free) and a single final whole-branch review after all tasks integrate (catches cross-task interaction bugs).

## Fix Loop

- Rounds 1-3: resume the original implementer (context intact).
- Rounds 4-5: dispatch a fresh implementer on a more capable model, explicitly framed ("a prior implementer attempted this N times; you own it now").
- 5-round cap trips CONTROLLER ADJUDICATION: park non-load-bearing findings with a recorded ruling, or rule on load-bearing ones and carry the ruling forward. No silent discards — every ruling lands in a durable ledger.
- Re-reviews after a fix round are SCOPED to the fix diff only, verdict ADDRESSED/NOT-ADDRESSED per finding — not a full re-review.

"Loop until convergence" is unsafe for LLM pipelines — always pair a hard round cap with an explicit, auditable adjudication protocol.

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

### Do Not Coach Reviewers

Controllers must not coach or pre-judge reviewers. Named tells — if a dispatch prompt contains any of these, stop:

- "do not flag..."
- "don't treat X as a defect"
- "at most Minor"
- "the plan chose..."

Structural backstop: reviewers are READ-ONLY (a reviewer that ran `git checkout` orphaned later commits). Stay skeptical of implementer self-justification — "I left this unabstracted on purpose" doesn't talk a reviewer out of a real finding.

## Rulings

Non-catastrophic conflicts/ambiguities get a recorded ruling and work continues, instead of blocking:

`Ruling: <what> — <why> — <cost if wrong>`

Still stop for a human when: the action is irreversible or destructive, security-sensitive, has a side effect outside the worktree (merge/push/publish), or every path forward is a genuine guess.

Log every ruling to a progress ledger; surface all rulings in the final report under "Rulings I made" for human audit/undo. Converges with the `autonomous-agent-operations` skill's decide-and-file-a-ticket pattern.

### Plan-Scoped State

A shared scratch/ledger directory must be keyed by plan identity — resolve a per-plan subdirectory from the plan file, and have the ledger self-identify its plan on line 1. Otherwise a follow-up plan in the same working tree can silently inherit a previous plan's ledger state.

## Worktrees and Isolation

Step 0: consent. Detect existing isolation first (below). If not already isolated, ask the user for explicit consent before creating a worktree, unless the user's own instructions already declare a worktree preference. Never create a worktree implicitly as a "protective" side effect.

Prefer native harness worktree support when available — a native `EnterWorktree`/`WorktreeCreate` tool, a `/worktree` command, or a `--worktree` flag. Bypassing a harness's own abstraction with raw `git worktree add` creates phantom state the harness can't see or manage — the #1 rationalization to reject. Detect before creating:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

Signals:

- `GIT_DIR != GIT_COMMON`: already in linked worktree.
- Empty `BRANCH`: detached HEAD.

Do not create nested or phantom worktrees when the harness already owns isolation. Cleanup automation scopes itself by provenance — did I create this worktree? — never by pattern-matching what "looks stale."

## Finishing and Teardown

- If `git worktree remove` (or a branch delete) refuses due to uncommitted work, stop, name the specific files, and ask the human to choose (commit/move/delete). Do not reach for `--force` — a refused destructive git operation is a signal to surface, not an obstacle to route around.
- Keep "discard this work" out of the default finishing menu (Merge/PR/Keep) — don't advertise destroying finished, passing work alongside safe options. Gate discard behind an explicit request plus a TYPED confirmation: the literal required string only, natural-language affirmatives like "yeah, get rid of it" do not count.
- Forge-agnostic finishing: don't hardcode one CLI ecosystem (e.g. `gh pr create`) into a general workflow — use "your forge's CLI, or the URL printed on push."

### PR Pre-Submission Checklist

Before submitting a PR: read the template; search for existing PRs/issues first; verify a real problem exists; confirm the change belongs in this change, not scope creep; show the full diff to your human partner before submitting. Disclose which model/harness/plugin-version produced the contribution when the receiving project asks — provenance disclosure is a structural requirement on some projects, not optional courtesy.

## Verification

No completion claim without fresh evidence.

Before saying fixed/done/passing:

1. Identify what proves the claim.
2. Run the command or inspect the artifact now.
3. Read the output.
4. State the result with evidence.

For bug fixes, prefer a regression test that fails before the fix and passes after.

### Agent-Driven Tests

Add a test tier where a real worker agent drives the system end-to-end through its actual interface, not by calling internals directly — internal/unit tests can miss bugs that only surface via the real interface path. Add new scenarios whenever a real-use bug exposes a coverage gap. Worked MCP example: mcp-development.md Testing.

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
