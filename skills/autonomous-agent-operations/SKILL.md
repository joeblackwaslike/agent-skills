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
