# Agent SDK billing_error — two distinct causes

`@anthropic-ai/claude-agent-sdk` `query()` can return `error: "billing_error"` (the SDK's label
for the API message "Your credit balance is too low") for two unrelated reasons. Distinguish
them before "fixing" the wrong one.

## Cause 1: missing the claude_code system-prompt preset under a subscription

Happens when authenticated via a **Claude subscription / OAuth token**
(`claude auth status` → `authMethod: "oauth_token"`, no `ANTHROPIC_API_KEY`) **and**
`systemPrompt` is omitted or custom. SDK v0.2.x defaults `systemPrompt` to empty (a breaking
change from the `claude-code` → `claude-agent-sdk` rename). With an OAuth token, only requests
carrying the Claude Code identity are entitled to subscription billing — an empty/custom system
prompt falls through to API credits, and $0 API credits → `billing_error`.

**Fix:** add `systemPrompt: { type: "preset", preset: "claude_code" }` (optionally
`append: "..."`) to the `query()` options. Confirmed in
`node_modules/@anthropic-ai/claude-agent-sdk/cli.js`: `billing_error` is emitted only when the
underlying message includes "Your credit balance is too low".

## Cause 2: subscription 5-hour usage window exhausted

Happens even *with* the preset correctly applied. Once the subscription's rolling 5-hour usage
window is exhausted, the API rejects further calls because overage is disabled
(`overageStatus: "rejected"`, `overageDisabledReason: "out_of_credits"` — no API credits to fall
back on), which again surfaces as "credit balance too low" → `billing_error`. The failing (and
succeeding) message carries `rate_limit_info: { rateLimitType: "five_hour", resetsAt: <unix>, ... }`.
Each call using the `claude_code` preset is comparatively expensive (~24k tokens, mostly the
preset system prompt), so bulk runs (hundreds of calls) exhaust the window fast.

## Distinguishing the two

- Single/occasional calls succeed, bulk runs fail partway through → cause 2 (window exhaustion).
- Everything always fails, immediately → cause 1 (wrong auth path).

## Handling cause 2 in a batch job

Classify it as a distinct `UsageLimitError` (don't conflate with cause 1), early-stop the current
batch, sleep until `rate_limit_info.resetsAt`, then resume — already-completed items should be
skipped on resume, not redone. For a one-time bulk backfill where a 5-hour window is the wrong
shape entirely, use an `ANTHROPIC_API_KEY` (direct Messages API, no preset needed, no 5-hour cap)
instead of riding the subscription.

## Origin

First hit in an `engineering-notebook` project's `summarizeGroupAttempt()` — an SDK bump
silently broke ~500 existing summarize calls that had been working under the old default.
