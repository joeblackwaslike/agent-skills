# Editing Skills, Runbooks, and Instructions

The same red-green discipline that governs code applies to prose that instructs an
agent — a `SKILL.md`, a `references/*.md` runbook, a `CLAUDE.md`/`AGENTS.md`, or any
file whose job is to change what an agent does. A doc edit is only worth making if you
can state what would be different without it, so check that first:

1. **RED** — run a concrete check that the guidance is missing or wrong. The check
   must be *behavioral*: the transcript/PR where its absence caused the failure, or a
   pressure-scenario subagent run (`superpowers:writing-skills`) that fails without the
   text. If the check already passes, the edit is redundant — stop.
2. **Edit** the smallest thing that closes the gap.
3. **GREEN** — re-run the same check.

## Grepping is a dedup check, not a RED

It answers "is this text already here" — worth running first, and sufficient on its
own only to *abandon* an edit. It can never answer "would behavior differ without it,"
which is what RED means. `superpowers:writing-skills`' `writing-good-tests.md`
reference names this exact move: "Asserting that a script, skill, or config contains
an exact line proves only that the source is the source… Documents that instruct
agents are tested by the consuming agent's behavior; prose for humans earns no test at
all." Its gate function rejects `"The source text changed"` as a failure reason
outright.

## Anchor every rule to an incident

A runbook line with a real failure attached survives review and gets followed; an
abstract best-practice does not. Cite the PR, thread, or transcript in the text.

**One citation per rule.** Keep only the most recent incident citation inline — it
provides the concrete example an LLM needs to pattern-match. When a new failure
supersedes an older one, replace the old citation, don't append. The goal is
specificity, not a changelog — one good example beats four.

## When a correction is also a process failure, fix the process too

The RED/edit/GREEN loop above covers *how* to make a rigorous doc edit; this is the
trigger for *when* to widen the scope: if what's being pointed out would recur — a
missing check, a gap in a runbook, an instruction that let the same mistake happen
twice — run RED/edit/GREEN on the process itself in the same pass, unprompted, and
name what was broken and how it was fixed in the summary. Don't wait to be asked a
second time.

## Where the fix lives — scope by reach, not by convenience

Before writing ANY process fix, correction, fact, reference, or lesson — not just
corrections — ask: would this need to hold in a repo or project I haven't opened yet?

- **Yes** (a cross-repo, cross-tool behavioral policy, or a memory whose whole job is
  defining what a proper-noun tool/project *is* so a casual mention of it resolves
  correctly elsewhere, even if its subject is a single codebase — see the
  glossary/identity exception below) → the global instruction file(s) loaded into
  every session regardless of which project directory is open (e.g. a symlinked
  `AGENTS.md`/`CLAUDE.md` pair, or a tool-specific extension file it imports).
- **No** (true only of one repo's own conventions, or deep technical payload —
  architecture, build phases, protocol tables — only actionable while actually working
  in that repo, even for a proper noun that could come up elsewhere) → that project's
  own memory store, or its own `AGENTS.md`/`CLAUDE.md` if it should survive a
  memory-store wipe or migration.

Never use per-project auto-memory as the sole channel for anything that must hold
everywhere — it is scoped to the single project directory it was written under and is
never loaded from any other project's session. A duplicate filed in a channel only one
project can read is worse than no entry — it invites drift between two sources of
truth instead of having one authoritative one.

**Glossary/identity exception.** A memory whose job is defining what a proper-noun
tool/project *is* — so casual mentions of it resolve correctly — needs global reach
even when its subject is a single codebase. Tell it apart from ordinary project facts
by content, not subject: thin/orientational content ("X is the ... framework for Y")
routes globally; deep technical payload only actionable while actually working in that
repo stays in that project's own memory or `AGENTS.md`/`CLAUDE.md`, even for the same
proper noun.

## See also

- `superpowers:writing-skills` — the full RED-GREEN-REFACTOR cycle for *creating* a
  new skill (pressure scenarios, rationalization tables, bulletproofing). This runbook
  is the lighter-weight discipline for *editing* an existing instruction file where the
  content isn't inventing new judgment, just correcting or relocating it.
- `agent-skills:senior-engineering-best-practices` — `fix-the-process-not-just-the-instance.md`
  for the general (non-instruction-file) version of the "is this a one-off or systemic" check.
