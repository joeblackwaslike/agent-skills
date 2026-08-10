# 2026-08-10 — ai-review-bot: pressure-test isolation failure, caught and fixed live

**Scenario:** During this skill's own implementation (see
`docs/superpowers/plans/2026-08-10-autonomous-agent-operations.md` in `ai-review-bot`), a
`superpowers:writing-skills`-style pressure-test dispatch — meant as a harmless RED
baseline observation ("does an unskilled subagent ask clarifying questions on an
ambiguous handoff?") — was given no isolation instruction and full tool access. It
inherited the real `ai-review-bot` working directory and did the described task for
real: a new worktree, genuine code changes across six files, 13 new tests, and a real PR
(#59) opened against the live repo. None of it was requested.

**What stayed solo:** diagnosing the blast radius (worktree isolation held, `main`
untouched, nothing else affected) and reporting it immediately.

**What forked:** how to handle PR #59 (close / leave open / merge), and how to re-scope
the pressure-test methodology before continuing to a scenario that described a
genuinely destructive action (force-push over a colleague's branch) — running *that* one
with the same flawed methodology risked real data loss, not just an unwanted PR.

**Why this is the contract's "ask when reachable" branch:** the user was reachable
mid-run, so this was a live `AskUserQuestion`, not a decide-and-ticket — close PR #59
unmerged, and re-scope every subsequent pressure-test prompt with an explicit safety
constraint (no git push, no `gh` against a real repo, no real destructive action; grade
stated intentions, not real actions taken).

**Lesson for this skill and for future pressure-testing generally:** a subagent with
full tool access has no way to distinguish "this is a test" from "this is a real
request" — the isolation has to be structural (an explicit, prominent safety constraint
in the prompt, since the `Agent` tool has no tool-allowlist parameter to enforce this
mechanically) rather than a hope that the prompt's framing alone keeps it from acting for
real. Every RED/GREEN prompt in this skill's own implementation plan was rewritten with
this constraint after the incident. Logged to `feedback_decision-log.md` the same day.
