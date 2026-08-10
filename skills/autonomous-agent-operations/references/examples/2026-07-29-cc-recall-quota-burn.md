# 2026-07-29 — cc-recall: quota burn, a cautionary anti-pattern

**Source:** `postmortems/postmortems/001-cc-recall-quota-burn.md`.

**This is not a demonstration of the fixed contract working — it's the reason the fork
logic exists at all.** A `/recall:backfill` run spawned ~2,825 headless sessions over
~43 hours, running unattended 1am–9am with "no rate limit, no session-count alarm, no
cost ceiling, and no convergence check," burning an estimated 69% of a weekly quota
before anyone noticed. Root cause: three compounding defects in `runClaudeHeadless`
(inherited the interactive model instead of a cheap one, inherited a ~39.5k-token
settings prefix per cold call, indexed its own output in an unbounded loop). Fixed in
cc-recall PR #54 and #55 — the same night the overnight-feedback-pipeline entry above
describes cleaning up.

**Lesson for this skill:** unattended operation with *no* bounded decision/ticket points
and no cost ceiling is exactly the failure mode the fixed contract's "mid-run fork" and
"file a ticket rather than run forever unchecked" discipline is meant to prevent.
