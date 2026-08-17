# Extract and Propagate the Real Fix

## The instinct

Finding the true root cause and fixing it in the one place that triggered the investigation is
not the end of the job. If the same defect shape exists anywhere else with the same preconditions,
it's a live bug there too — silently, until it accumulates enough volume to surface its own
incident. Extraction isn't complete when the fix ships once; it's complete when every consumer
with the same shape has been checked, including ones found mid-audit rather than known up front.

## What it looks like when missing

A fix lands in the one repo/file that had the incident. The team (or agent) moves on. Nobody asks
"where else does this pattern exist?" The same defect surfaces again later, at a different site,
often read as an unrelated new bug rather than a known pattern that was never propagated.

## What to do instead

1. Once the true fix is understood, ask explicitly: **does this generalize?** Is the underlying
   mechanism (not just the specific bug) present anywhere else — same API used elsewhere, same
   pattern copy-pasted, same architectural shape reused?
2. If yes, **extract the fix into a reusable, documented form** — a shared reference doc, a
   shared utility, a named pattern other code can point at — rather than leaving it as tribal
   knowledge in one PR's diff.
3. **Actively audit every potential consumer.** Don't assume adoption happens by osmosis or that
   people will read the postmortem. Grep for the vulnerable pattern across every repo/project
   that could plausibly have it.
4. **Track partial adoption as an open item, not a closed one.** A consumer that adopted half the
   fix (e.g. one flag out of four) is not done — it's a narrower version of the same gap.

## Worked example: the `claude -p` isolation pattern

PM-005 (`/Users/joe/github/joeblackwaslike/postmortems/postmortems/005-pieces-stop-hook-session-pollution.md`)
found that a bare `claude -p` spawned from a hook creates a **full session** — its own transcript,
its own hook triggers, including its own Stop hook re-indexing itself — not a lightweight
subprocess call. The extracted fix: `--setting-sources ""` + `--no-session-persistence` +
`--strict-mcp-config` + `--system-prompt` (CLI), or `settingSources: []` + `tools: []` +
`canUseTool` + `strictMcpConfig` (SDK). This was written up as a generalized, public reference:
`agent-skills/skills/working-with-claude-code/references/claude-setting-sources-isolation.md`.

**Adoption, as of this skill being written:**

| Consumer | Status |
| --- | --- |
| pieces-dev (`hooks/pieces-memory-stop.sh`) | Full adoption — origin of the fix |
| claude-mem (`src/sdk/hardened-options.ts`) | Full adoption, SDK-native form |
| cc-recall (`src/record/synthesizer.ts`) | Partial — has `--setting-sources ""` and `--no-session-persistence`, missing `--strict-mcp-config`/`--system-prompt` |
| lessons-learned (`hooks/precompact-handoff.mjs`) | Partial — has `--no-session-persistence` only, missing `--setting-sources ""` |
| anti-compact (`hooks/precompact-handoff.mjs`, a fork of lessons-learned's hook) | Same gap as lessons-learned — every installer of this public plugin currently spawns an unisolated `claude -p` on every compaction |

Three of five known consumers have incomplete adoption. None have yet accumulated enough volume
to trigger their own postmortem — but the defect shape is identical to PM-005's, which took 59
days and ~36,000 ghost sessions to surface by accident. **Closing this gap across all three repos
is active work, not a historical footnote** — it's the live proof that "the fix shipped once" and
"the fix is propagated" are different claims, and that the audit step is easy to skip even when
the pattern is well-documented.

## The meta-lesson

A generalized reference doc existing is necessary but not sufficient. The propagation step is
its own piece of work — actively grepping every consumer, not assuming the doc's existence causes
adoption — and it should be tracked to completion the same way the original fix was.
