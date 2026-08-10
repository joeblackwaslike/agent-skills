# 2026-08-09 — ai-review-bot: multi-item plan, forked twice while reachable

**Scenario:** A pre-approved multi-item plan (a root-cause writeup, four small backlog
items, this skill's own spec, a dashboard risk spike) executed end to end across two
repos, including driving three PRs through multi-round review to merge.

**What stayed solo:** all implementation, all review-thread triage and replies, two
dismiss-and-merge calls on stuck/silent reviewer bots (each matching an existing
`AGENTS.md`-documented pattern).

**What forked:** whether to pause before touching production infrastructure with a
silent, wide blast radius (the Dashboard's Next.js/webhook-coexistence risk) — paused
even though every other item in the same plan ran straight through; and how to treat a
required reviewer bot that was mechanically silent on a fresh commit rather than raising
a content objection.

**Why:** both were live `AskUserQuestion` calls, not decide-and-ticket, because the user
was in fact reachable — the contract's "ask when reachable" branch, not its "ticket when
not" branch. No `autonomous-judgment` ticket was filed this run for that reason.
