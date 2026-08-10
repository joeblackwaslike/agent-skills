---
name: autonomous-agent-operations
description: Use when operating solo on a task handed off without the user available for interactive check-ins — ask every clarifying question up front, decide and file a labeled bd ticket on a genuine mid-run fork rather than blocking or guessing silently, and summarize plus record a worked example at the end. Covers the ticket-review promotion loop and the project/global decision-log hierarchy.
license: MIT
metadata:
  last_updated: "2026-08-10"
---

# Autonomous Agent Operations

## What this is

A framework for operating solo on a handed-off task, at whatever autonomy level the task
and available infrastructure support today. Not capped at one scenario — the loose,
growing part is *how much* gets done solo before a fork appears, not *whether* the
contract below applies.

## The fixed contract

Three things are always true, regardless of how much autonomy is in play.

### Upfront

Ask every clarifying question needed before starting solo work — the same discipline as
a live `AskUserQuestion` pass in an interactive session, batched up front rather than
dripped out mid-run. A task description with real ambiguity (scope, target files,
definition of done, what "improve" or "fix" means concretely) gets a list of questions
before any implementation action, not a guessed interpretation. If the handoff already
answered a question, don't re-ask it — only ask what's genuinely open.

**"Before any action" means before any action, not just before implementation.**
Read-only investigation to *scope* the ambiguity is fine and often necessary — you
usually can't write a good clarifying question without looking first. But investigation
is not a substitute for asking: if the investigation surfaces a real fork (which of
several plausible interpretations to pursue, whether a design decision is intentional or
a bug), that goes in the upfront question list, not into a silently-chosen default
buried in a final report.

### Mid-run fork

When something needs a real decision — a hard-to-reverse action, a real product/design
call, or a factor no existing precedent (memory, backlog, prior ticket) covers — and the
user might plausibly be reachable, ask live. When not, or when waiting would stall the
run, use best judgment, then immediately file a ticket (see "Ticket mechanics" below)
capturing the question, the decision made, and the rationale, and continue. This is the
same fork logic already documented for PR review autonomy in `AGENTS.md` ("Stop and hand
off ... only for: a genuinely hard-to-reverse action ... a real product/design decision
...") — reused here rather than redefined, since it's the same judgment. **That includes
its hard-stop carve-outs**, not just its "decide and continue" cases: a genuinely
destructive, hard-to-reverse action (e.g. force-pushing over a colleague's shared
branch) is a stop-and-escalate, not a decide-and-ticket — filing a ticket is for *bounded,
reversible* judgment calls with no clear precedent (a config default, which of two valid
approaches, a naming choice), not a substitute for the hard stop.

**Filing the ticket is not optional, and it is not the same as mentioning the decision in
a final report.** A decision noted only in the end-of-run summary is invisible to
anything that queries open tickets in the meantime, and doesn't get the structured
question/decision/rationale shape a later review pass needs — file it the moment the
decision is made, not deferred to the wrap-up.

### End of run

One closing summary — what shipped, and every judgment ticket filed this run, pulled
directly from `bd` rather than hand-tracked — **and** one new dated file appended to the
example log (see `references/examples/`). The example-log entry is not optional or
occasional; it is part of what "done" means for a run under this contract.

## Ticket mechanics and closing the loop

**What "the decision log" actually is, precisely:** `AGENTS.md`'s Decision Log is a
**per-project memory file**, not a database or an automated pipeline. It lives at
`~/.claude/projects/<project-path>/memory/feedback_decision-log.md`, one file per
project, appended to over time, with a one-line pointer added to that directory's
`MEMORY.md` index. Each entry: a bolded one-line rule, the date, which options were
offered and which was picked, a short interpretive gloss of the tradeoff. An "Inferred
pattern" section at the end synthesizes what the entries have in common.
`[[wikilinks]]` cross-reference related memory files.

The on-disk naming (`feedback_decision-log.md`) is the auto-memory system's own
`{type}_{slug}.md` convention (`type` one of `user`/`feedback`/`project`/`reference`) —
unrelated to any repo's code style.

**There is no automated pipeline from `AskUserQuestion` to the decision log — it is
agent-driven, not hook-driven.** No hook in `~/.claude/settings.json` is scoped to
`AskUserQuestion` or the memory directory. `AGENTS.md`'s Decision Log section is a
standing instruction the agent follows itself: after every `AskUserQuestion`
resolution, the agent performs the Edit/Write itself. There is no technical
enforcement — see "Architecture evaluation" below for the compliance gap this leaves
and the proposed fix.

**A ticket is never written to `feedback_decision-log.md` directly — it goes through
`/autonomous:review` first.** The decision log is for judgment calls Joe has actually
reviewed (whether live via `AskUserQuestion`, or later via ticket review); a solo
decision the user never saw is provisional until reviewed, not yet a logged precedent.

**Ticket filing.** On a solo mid-run fork:

```bash
bd create --labels autonomous-judgment \
  --title "<short description of the fork>" \
  --description "Question: <what was ambiguous>
Decision: <what was chosen>
Rationale: <why>"
```

The same three fields (question, decision, rationale) a decision-log entry needs, so
promotion later is a copy, not a rewrite.
