# Verify Before Acting

## The instinct

Training data goes stale. A library's actual capabilities may have changed since you last saw
them, and a codebase's installed version may not match what you remember. Before you act on
assumed knowledge — proposing a workaround, or just answering a question about what something
does — check the current, authoritative source. This is one instinct with two common triggers:
working around external code, and answering from memory.

## Trigger 1: proposing a workaround for third-party code

Any change whose justification starts with "the library/SDK/framework doesn't support..." is a
claim, not a fact, until checked.

**What it looks like when missing:** an agent proposes patching internals, injecting CLI args
through wrapper code, or building a shim — the workaround itself becomes the first proposal,
before anyone reads whether it was necessary.

**What to do instead — the checklist, in order:**

1. **Read the current docs** for the feature you think is missing. Check constructor/factory
   options, config objects, method params. Check for aliases — the option might exist under a
   different name than the one you're picturing.
2. **Search the source** for related names. Grep types/interfaces for option fields. Grep the
   changelog/release notes for recent additions.
3. **Check GitHub issues** — open and closed. It may already be implemented, or someone may have
   already found the documented workaround.
4. **Confirm installed vs. latest version.** The feature might exist in a newer version than
   what's actually installed.
5. **Consult a domain skill/agent if one exists** — e.g. `claude-code-guide` for Claude Code /
   Agent SDK questions, a `working-with-*` skill if this repo has one for the tool in question.

Only once all five steps confirm the feature genuinely doesn't exist should a workaround be
proposed — and it should be labeled explicitly as a workaround, stating what was checked, why the
native path doesn't work, and the tradeoff of the workaround vs. waiting for native support.

**Worked example:** an agent proposed editing `spawnSdkProcess` to inject `--system-prompt` as a
CLI arg — without checking whether the Claude Agent SDK already had a native option. It did:
`systemPrompt`, available since SDK v0.1.0, alongside `settingSources` and a `canUseTool` audit
callback with no CLI equivalent. None of the five checks above had been done before the
workaround was proposed. Once actually investigated, the hack was never needed.

## Trigger 2: answering from memory about what something supports

Same failure, different entry point: instead of building a workaround, the agent just states
what a library/framework does, without checking whether that's still true for the version
actually installed.

**What to do instead:** the same five-step checklist, applied to "what does this version
actually support" rather than "does a workaround exist."

**Worked example (already-adopted rule, generalized here):** Next.js ships its own docs inside
the installed npm package (`node_modules/next`). The rule in Joe's own AGENTS.md is: read those
directly instead of recalling from memory, confirm the installed version first
(`package.json`/lockfile), then pull the matching docs — treating them as authoritative unless
the actual code in the repo contradicts them. This is the same instinct as Trigger 1, just
applied to answering instead of building — Next.js is one concrete instance of a general rule,
not a special case that only applies to Next.js.

## Why both triggers share one fix

Both are the same root cause: trusting remembered/trained knowledge over a source that's
currently checkable. The checklist doesn't change based on whether the output is a proposed
workaround or a stated fact — only the trigger differs.
