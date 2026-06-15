# Building an LLM-Powered GitHub PR Review Bot

This is the flagship guide for building a production AI code reviewer: a **GitHub App** that listens for pull request events, sends the diff to an LLM, and posts a single batched review with inline comments and `suggestion` blocks. The design is **LLM-provider-neutral** — built on the [Vercel AI SDK](https://ai-sdk.dev) (`ai` v6), so swapping Claude for OpenAI (or any provider) is a one-line change.

This guide focuses on the *review-bot-specific* layers: the LLM review pipeline, diff anchoring, batched review assembly, and convergence on re-runs. For the foundations it builds on, read these first:

- **App auth + installation clients:** [`building-a-github-app.md`](./building-a-github-app.md)
- **Webhook delivery + signature verification:** [`webhooks.md`](./webhooks.md)
- **The exact GitHub review/comment API call mechanics:** the sibling **`working-with-github`** skill's `references/howto/code-review-via-api.md` (Reviews API, inline comment anchoring, GraphQL review threads)
- **AI SDK specifics** (`generateObject`, providers, prompt caching, reasoning options): the **`working-with-vercel-ai-sdk`** skill — grep its `references/` for `generateObject`, `@ai-sdk/anthropic`, `@ai-sdk/openai`

The patterns below are distilled from a real two-provider review bot running on Vercel. Versions are current as of 2026: `ai@^6`, `@ai-sdk/anthropic@^3`, `@ai-sdk/openai@^3`, `octokit@^4`, `zod@^4`.

---

## 1. Architecture overview

```
                  pull_request.opened / .synchronize / .ready_for_review
                  issue_comment.created  (/ai-review slash command)
                                  │
                                  ▼
                    verify HMAC signature  ───────────►  202 ack fast
                                  │                      (queue heavy work)
                                  ▼
                    installation Octokit (App auth)
                                  │
                                  ▼
            GET pulls/{n}/files  → diff per file (unified patch)
                                  │
                                  ▼
            filter (skip lockfiles/generated/vendored/binary)
            chunk by file + size to fit the context window
                                  │
                                  ▼
            reviewChunk(diff) ─► generateObject({ model, schema })  ◄── provider-neutral
                  (concurrency-limited, rate-limit aware)
                                  │
                                  ▼
            collect Finding[]  →  validate line anchors against diff
                                  │
                                  ▼
            assemble ONE review: body + comments[] (inline + ```suggestion)
            event = REQUEST_CHANGES if any high-severity, else COMMENT
                                  │
                          ┌───────┴────────┐
                          ▼                ▼
            POST pulls/{n}/reviews   POST check-runs (annotations + summary)
                          │
                          ▼
            on re-run: resolve stale threads (GraphQL), skip already-reported
```

The two non-obvious load-bearing ideas: **batch everything into one review** (not N comments), and **anchor every inline comment to a line that actually exists in the diff** — GitHub rejects the whole review if any anchor is invalid.

---

## 2. App setup & permissions

Create a GitHub App (see `building-a-github-app.md`). A review bot needs:

**Repository permissions**

| Permission | Level | Why |
| --- | --- | --- |
| Pull requests | **Read & write** | Read files/diff, post reviews and inline comments |
| Checks | **Read & write** | Optional Check Run with annotations + a pass/fail summary |
| Contents | **Read** | Fetch file contents for context beyond the diff |
| Metadata | **Read** | Mandatory baseline for all apps |

**Subscribe to events:** `Pull request`, `Issue comment` (for a `/ai-review` slash command). `Check run` only if you support re-running from the Checks UI.

**Environment variables**

```bash
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"  # PKCS#8, \n-escaped
GITHUB_WEBHOOK_SECRET=...        # HMAC-SHA256 secret for webhook verification
ANTHROPIC_API_KEY=sk-ant-...     # provider key (Claude)
OPENAI_API_KEY=sk-...            # provider key (OpenAI) — only the one you use
REVIEW_MODEL=claude-sonnet-4-6   # which model; drives the provider swap below
```

> **PKCS#1 → PKCS#8.** GitHub hands you a PKCS#1 key (`BEGIN RSA PRIVATE KEY`). The Node `crypto` path tolerates it, but WebCrypto runtimes (Cloudflare Workers, Vercel Edge, some Lambda configs) require PKCS#8. Convert once and validate at boot:
> ```bash
> openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in key.pem -out key.pkcs8.pem
> ```
> ```ts
> function validatePrivateKey(key: string): string {
>   if (key.includes("BEGIN RSA PRIVATE KEY")) {
>     throw new Error("Private key is PKCS#1 — convert to PKCS#8 with `openssl pkcs8 -topk8 ...`");
>   }
>   return key;
> }
> const privateKey = validatePrivateKey(process.env.GITHUB_APP_PRIVATE_KEY!.replaceAll("\\n", "\n"));
> ```

**Installation-scoped Octokit.** Use the high-level `App` from `octokit` — it caches and refreshes installation tokens for you. Construct it once (module singleton) and derive a per-installation client per webhook:

```ts
import { App } from "octokit";

const app = new App({
  appId: process.env.GITHUB_APP_ID!,
  privateKey,
  webhooks: { secret: process.env.GITHUB_WEBHOOK_SECRET! },
});

// inside a webhook handler, after reading payload.installation.id:
const octokit = await app.getInstallationOctokit(installationId);
```

`app.webhooks.on(...)` (from `@octokit/webhooks`, re-exported by `octokit`) verifies the HMAC signature for you — never skip verification. See `webhooks.md` for the raw-body requirement and serverless gotchas.

---

## 3. Fetching & chunking the diff

Pull the per-file patches. `octokit.paginate` flattens pagination on large PRs:

```ts
interface PullFile {
  filename: string;
  status: string;       // "added" | "modified" | "removed" | "renamed"
  patch?: string;       // unified diff hunk; absent for binary/too-large files
}

const files = await octokit.paginate<PullFile>(
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
  { owner, repo, pull_number: pullNumber },
);
```

**Filter out noise** before spending tokens. Lockfiles, generated code, vendored deps, and binaries waste budget and produce useless findings:

```ts
const SKIP_PATTERNS = [
  /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|poetry\.lock|Cargo\.lock|go\.sum)$/,
  /(^|\/)(dist|build|vendor|node_modules|\.next|__generated__)\//,
  /\.(min\.(js|css)|map|snap|lock)$/,
  /\.(png|jpe?g|gif|webp|ico|pdf|woff2?|ttf|zip|wasm)$/,
];

const reviewable = files.filter(
  (f) => f.patch && f.status !== "removed" && !SKIP_PATTERNS.some((re) => re.test(f.filename)),
);
```

**Chunk to fit the context window.** A single huge PR can blow past the model's input limit. Group files into chunks under a character budget (a coarse but reliable proxy for tokens — roughly 1 token ≈ 4 chars), and truncate any one pathological patch:

```ts
const MAX_PATCH_CHARS = 8_000;   // per file
const CHUNK_CHAR_BUDGET = 60_000; // per LLM call; tune to model + headroom for the prompt

function trimPatch(patch: string): string {
  return patch.length <= MAX_PATCH_CHARS
    ? patch
    : `${patch.slice(0, MAX_PATCH_CHARS)}\n\n[patch truncated]`;
}

function chunkFiles(files: PullFile[]): PullFile[][] {
  const chunks: PullFile[][] = [];
  let current: PullFile[] = [];
  let size = 0;
  for (const f of files) {
    const len = trimPatch(f.patch!).length;
    if (size + len > CHUNK_CHAR_BUDGET && current.length > 0) {
      chunks.push(current);
      current = [];
      size = 0;
    }
    current.push(f);
    size += len;
  }
  if (current.length) chunks.push(current);
  return chunks;
}
```

### The line-anchor gotcha (read this twice)

GitHub's Reviews API anchors inline comments to **the line number in the file's new (RIGHT) side**, and the comment is only valid if that line appears in the diff hunk. If you submit *one* comment with a bad anchor, GitHub **rejects the entire review** (422). So you must compute the set of valid right-side line numbers per file from the `@@` hunk headers, then drop any LLM finding that doesn't land on one:

```ts
/** Right-side (new file) line numbers that actually appear in a unified diff patch. */
export function collectRightSideLines(patch: string): Set<number> {
  const lines = new Set<number>();
  let nextRight = 0;
  for (const line of patch.split("\n")) {
    if (line.startsWith("@@")) {
      const m = /@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(line);
      if (m) nextRight = Number(m[1]);
      continue;
    }
    if (line.startsWith("+") || line.startsWith(" ")) {
      lines.add(nextRight);
      nextRight += 1;
    }
    // lines starting with "-" exist only on the left; they don't advance the right cursor
  }
  return lines;
}

const validLinesByPath = new Map<string, Set<number>>();
for (const f of reviewable) validLinesByPath.set(f.filename, collectRightSideLines(f.patch!));
```

(The legacy `position` parameter — offset within the diff — is even more error-prone. Prefer `line` + `side: "RIGHT"`.) The mechanics of multi-line ranges (`start_line`/`start_side`) live in `code-review-via-api.md`.

---

## 4. The LLM review layer (provider-neutral)

This is the heart of the bot, and the reason to use the AI SDK: **`generateObject` returns a typed object validated against a Zod schema, regardless of provider.** Claude and OpenAI are interchangeable behind the same call.

### Structured output schema

Define the finding shape once. This schema *is* the contract — the model is constrained to it:

```ts
import { z } from "zod";

const FindingSchema = z.object({
  path: z.string(),
  line: z.number().int(),                       // RIGHT-side line in the new file
  start_line: z.number().int().nullable(),      // for multi-line ranges; null otherwise
  severity: z.enum(["high", "medium", "low"]),  // high = blocking bug/security
  title: z.string(),
  body: z.string(),                             // the explanation
  suggestion: z.string().nullable(),            // exact replacement for the line(s), or null
});

const ReviewSchema = z.object({
  event: z.enum(["COMMENT", "REQUEST_CHANGES"]),
  general_findings: z.array(
    z.object({ title: z.string(), body: z.string(), severity: z.enum(["high", "medium", "low"]) }),
  ),
  inline_comments: z.array(FindingSchema),
});

export type Review = z.infer<typeof ReviewSchema>;
export type Finding = z.infer<typeof FindingSchema>;
```

### One-line provider swap

`createAIModel` is the only place that knows about a specific provider. Everything downstream is provider-agnostic:

```ts
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";

export function createAIModel(modelId: string): LanguageModel {
  // swap providers by env: REVIEW_MODEL=gpt-5 → OpenAI; otherwise Anthropic
  return modelId.startsWith("gpt") || modelId.startsWith("o")
    ? openai(modelId)
    : anthropic(modelId);
}
```

That's the whole point: setting `REVIEW_MODEL=claude-sonnet-4-6` vs `REVIEW_MODEL=gpt-5` changes the provider without touching the review logic. You can take it further with a tier router that picks a model by PR complexity (doc-only → cheap/fast model; touches `auth`/`crypto`/`db` or >500 lines → a stronger model with reasoning enabled).

### The review system prompt

A high-signal prompt is what separates a useful bot from a nitpicking one. The essentials:

```ts
const SYSTEM_PROMPT = `
You are a senior software engineer reviewing a GitHub pull request diff.

Report ONLY material issues you are at least 80% confident about:
- Correctness bugs, logic errors, off-by-one, unhandled edge cases
- Security: injection, path traversal, XSS, SSRF, auth/authorization gaps, secrets in code
- Silently swallowed errors, empty catch blocks, fallbacks that hide failures
- Race conditions, resource leaks, missing await
- Missing test coverage on a critical/risky path

Do NOT report:
- Style, formatting, naming preferences, or anything a linter/formatter handles
- Speculative "consider maybe" musings, or restating what the code obviously does
- Issues outside the changed lines

Rules:
- Cite the exact file path and the line number AS IT APPEARS IN THE NEW FILE (right side of the diff).
- Only place inline comments on lines present in the provided diff. Unanchored concerns go in general_findings.
- When you can give an exact fix, set "suggestion" to the complete replacement text for the
  referenced line(s), matching the original indentation EXACTLY. Otherwise set it to null.
- Use start_line only for true multi-line ranges, and only when start_line < line.
- Set severity: high = blocking (bug/security), medium = real concern, low = optional nit.
- If there are no material issues, return event "COMMENT" with empty arrays.
`.trim();
```

### `reviewChunk` — the provider-neutral call

```ts
import { generateObject } from "ai";

export async function reviewChunk(
  modelId: string,
  diffText: string,
  prContext: string,        // title, description, labels — small, helps relevance
): Promise<Review> {
  const { object, usage } = await generateObject({
    model: createAIModel(modelId),
    schema: ReviewSchema,
    system: SYSTEM_PROMPT,
    maxOutputTokens: 4096,
    maxRetries: 4,           // AI SDK retries transient/5xx with backoff
    messages: [
      {
        role: "user",
        content: [
          // Cache the (large, stable) instruction/context block across chunks on Anthropic.
          {
            type: "text",
            text: `${prContext}\n\nReview the following diff:\n\n${diffText}`,
            providerOptions: { anthropic: { cacheControl: { type: "ephemeral" } } },
          },
        ],
      },
    ],
  });

  logCost(usage, modelId); // see token budgeting below
  return object;
}
```

> The `providerOptions.anthropic.cacheControl` breakpoint is ignored by OpenAI, so the same code stays correct after a provider swap. Reasoning controls work the same way — `providerOptions: { anthropic: { thinking: { type: "enabled", budgetTokens: 8000 } } }` or `{ openai: { reasoningEffort: "high" } }` — applied only on the complex/deep tier. See the `working-with-vercel-ai-sdk` skill for the full provider-options matrix.

### Concurrency, token budgeting, and cost control

- **Cap concurrency.** Running every chunk in parallel will trip provider input-tokens-per-minute (ITPM) limits on large PRs. Use a small worker pool (a simple `mapWithConcurrency(items, limit, fn)` over a shared cursor) and keep `limit` low (often `1`–`3`) to stay under ITPM. Merge results with `Promise.allSettled` so one chunk failing doesn't abort the whole review.
- **Budget tokens.** Compute cost from `usage.inputTokens` / `usage.outputTokens` against a per-model rate table; log per-review cost and surface it in the review footer. This makes runaway spend visible immediately.
- **Pace on rate-limit signals.** Read `anthropic-ratelimit-input-tokens-remaining` / `x-ratelimit-remaining-tokens` from response headers; if remaining drops below a floor, sleep until the reset before the next chunk. On a hard 429, surface a "rate-limited, will retry on next push" comment rather than failing silently.

```ts
function computeCost(usage: { inputTokens?: number; outputTokens?: number }, model: string): number {
  const rates: Record<string, { in: number; out: number }> = {  // USD per 1M tokens
    "claude-sonnet-4-6": { in: 3.0, out: 15.0 },
    "gpt-5": { in: 2.5, out: 15.0 },
  };
  const r = rates[model];
  if (!r) return 0;
  return ((usage.inputTokens ?? 0) / 1e6) * r.in + ((usage.outputTokens ?? 0) / 1e6) * r.out;
}
```

---

## 5. Posting the review

**Collapse every finding into ONE `pulls.createReview` call.** Never post comments one at a time — that spams notifications and fragments the conversation. Build the inline `comments[]`, drop invalid anchors, pick the verdict, and submit once.

```ts
interface ReviewComment {
  path: string;
  body: string;
  line: number;
  side: "RIGHT";
  start_line?: number;
  start_side?: "RIGHT";
}

function buildCommentBody(f: Finding): string {
  const badge = { high: "🔴 High", medium: "🟡 Medium", low: "🟢 Low" }[f.severity];
  let body = `${badge}\n\n**${f.title}**\n\n${f.body}`;
  if (f.suggestion) {
    body += `\n\n\`\`\`suggestion\n${f.suggestion}\n\`\`\``; // one-click "Commit suggestion"
  }
  return body;
}

function buildReviewComments(findings: Finding[], valid: Map<string, Set<number>>): ReviewComment[] {
  return findings.flatMap((f) => {
    const lines = valid.get(f.path);
    if (!lines || !lines.has(f.line)) return [];                  // drop unanchored — don't 422 the review
    if (f.start_line !== null && f.start_line >= f.line) return []; // backwards range guard
    if (f.start_line !== null && !lines.has(f.start_line)) return [];
    return [{
      path: f.path,
      body: buildCommentBody(f),
      line: f.line,
      side: "RIGHT" as const,
      ...(f.start_line !== null ? { start_line: f.start_line, start_side: "RIGHT" as const } : {}),
    }];
  });
}
```

**Pick the verdict from max severity.** `REQUEST_CHANGES` if any finding is `high`; otherwise `COMMENT`. Only `APPROVE` if you ran the full review with zero findings — and consider keeping bots out of the `APPROVE` business entirely so a human still signs off.

```ts
const comments = buildReviewComments(allFindings, validLinesByPath);
const hasBlocking = allFindings.some((f) => f.severity === "high");
const event: "COMMENT" | "REQUEST_CHANGES" = hasBlocking ? "REQUEST_CHANGES" : "COMMENT";

await octokit.request("POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews", {
  owner, repo, pull_number: pullNumber,
  commit_id: headSha,                 // anchor the review to the exact SHA reviewed
  event,
  body: summaryMarkdown,              // human-readable summary + findings table
  comments,
});
```

Wrap that POST in a small retry-with-backoff loop; if it still fails after a few attempts, **fall back to posting a plain issue comment** containing the findings (by `path:line`) so the work isn't lost. The exact request/response shapes and a working end-to-end example are in `code-review-via-api.md`.

**Optional Check Run.** A Check Run gives a green/red status line and file annotations independent of the review conversation:

```ts
await octokit.request("POST /repos/{owner}/{repo}/check-runs", {
  owner, repo,
  name: "ai-review",
  head_sha: headSha,
  status: "completed",
  conclusion: hasBlocking ? "action_required" : "neutral",  // never "failure" — fail safe
  output: {
    title: `${comments.length} finding(s)`,
    summary: summaryMarkdown,
    annotations: comments.slice(0, 50).map((c) => ({   // GitHub caps at 50 per request
      path: c.path,
      start_line: c.start_line ?? c.line,
      end_line: c.line,
      annotation_level: hasBlocking ? "warning" : "notice",
      message: c.body.replace(/\*\*/g, "").slice(0, 500),
      title: "Review finding",
    })),
  },
});
```

---

## 6. Re-review on `synchronize` & convergence

When the author pushes new commits, GitHub fires `pull_request.synchronize`. A good bot **converges** — it doesn't repeat itself, and it cleans up findings that no longer apply.

**Idempotency keyed on the head SHA.** Embed a marker in the review body and skip if you've already reviewed this SHA (unless the user forces a re-run):

```ts
const marker = `Reviewed commit: \`${headSha.slice(0, 12)}\``;
const existing = (await octokit.request(
  "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
  { owner, repo, pull_number: pullNumber },
)).data as Array<{ body?: string | null }>;

if (!force && existing.some((r) => (r.body ?? "").includes(marker))) {
  return; // already reviewed this exact SHA
}
```

**Don't repeat resolved or already-reported findings.** Two complementary moves:
- Inject prior reviews (yours *and* other bots' on the same SHA) into the prompt with an instruction: *"do not re-report any finding already mentioned below."*
- On a follow-up review, ask the summary step to describe only *what changed since the last review*.

**Resolve stale threads via GraphQL.** After re-reviewing, any of your unresolved inline threads whose line no longer exists in the new diff is stale — resolve it so the PR isn't cluttered with comments on code that's gone:

```ts
const RESOLVE = `mutation ($threadId: ID!) {
  resolveReviewThread(input: { threadId: $threadId }) { thread { id isResolved } }
}`;

for (const thread of unresolvedBotThreads) {
  const valid = validLinesByPath.get(thread.path);
  if (!valid || (thread.line !== null && !valid.has(thread.line))) {
    await octokit.graphql(RESOLVE, { threadId: thread.id });
  }
}
```

(Query `repository.pullRequest.reviewThreads` to enumerate threads — paginate, filter to your bot's comments by a body marker. Full query in `code-review-via-api.md`.) You can also **reply to a thread** with `addPullRequestReviewThreadReply` to acknowledge a fix instead of resolving silently.

---

## 7. Production hardening

**Throttling + retry plugins.** Octokit's defaults will hammer the API under load. Always install both:

```ts
import { Octokit } from "octokit";
import { throttling } from "@octokit/plugin-throttling";
import { retry } from "@octokit/plugin-retry";

const ReviewerOctokit = Octokit.plugin(throttling, retry);
// throttling onRateLimit / onSecondaryRateLimit callbacks decide whether to retry;
// retry handles transient 5xx with exponential backoff.
```

`App` from `octokit` already bundles retry behavior; for raw `Octokit` clients wire these explicitly. Respect **secondary rate limits** (abuse detection) — back off and retry once, don't loop.

**Ack the webhook fast, process async.** Webhook deliveries time out (~10s). A full review takes far longer. Verify the signature, enqueue the job (or use the platform's "after response" primitive — Vercel `waitUntil`, Cloudflare `ctx.waitUntil`, a real queue for heavier loads), and return `202` immediately. Many bots also add a deliberate delay (e.g. several minutes on `opened`) so CI and other bots finish first and you can dedupe against them.

**Structured logging.** Log a JSON line per stage — `agent ok`, `cache read tokens`, `inline comments dropped (path not in diff)`, `review POST attempt N`, per-review cost. When a review looks wrong, the dropped-anchor logs are the first thing you'll want.

**Deploy targets.** Vercel functions, Cloudflare Workers, and AWS Lambda all work. The portability tax is the private key (PKCS#8 for WebCrypto runtimes, see §2) and the raw-request-body access needed for HMAC verification (see `webhooks.md`). Keep provider keys and the webhook secret in the platform's secret store, never in code.

**Feedback loops (optional, high-leverage).** Persist each posted inline comment keyed by `comment_id` along with which prompt/heuristic produced it. Poll comment reactions (`GET .../comments/{id}/reactions`) for 👍/👎 and store an append-only verdict log. Over time that log tells you which finding categories are signal vs. noise — feed it back into prompt tuning or per-category confidence thresholds.

---

## 8. Best practices for AI review bots

- **Batch into one review.** A single `createReview` with all inline `comments[]` — never a stream of individual comments. One notification, one conversation.
- **Be precise with line anchors.** Compute valid right-side lines from the diff and silently drop any finding that doesn't match. One bad anchor 422s the entire review.
- **Suggestions over prose.** A \`\`\`suggestion block the author can commit in one click beats three paragraphs explaining the fix. Match indentation exactly.
- **Converge on re-runs.** Idempotent per head SHA; don't re-report resolved or duplicate findings; resolve stale threads when their lines disappear.
- **Make findings high-signal.** Enforce a confidence floor (≥80%), forbid style/formatting nitpicks (a linter's job), and require every finding to cite a concrete file + line. A bot that cries wolf gets muted.
- **Respect rate limits.** Throttling + retry plugins, low concurrency, pace on ITPM headers, and a graceful "rate-limited, will retry" message instead of a hard failure.
- **Don't review your own (or other bots') commits.** Skip bot-authored commits and draft PRs; gate the slash command on trusted `author_association` (`OWNER`/`MEMBER`/`COLLABORATOR`).
- **Let humans override.** Prefer `COMMENT`/`REQUEST_CHANGES`; be conservative about `APPROVE`. The bot advises; a human merges.
- **Fail safe.** A bot crash, an LLM timeout, or a rejected POST must **never** block a PR. Default to neutral Check conclusions, fall back to a plain comment when the Reviews API rejects, and let `Promise.allSettled` keep one chunk's failure from sinking the whole review.

---

## Related

- [`building-a-github-app.md`](./building-a-github-app.md) — App registration, JWT/installation auth, `App` client
- [`webhooks.md`](./webhooks.md) — HMAC verification, raw-body handling, serverless delivery
- [`octokit-bot-example.md`](./octokit-bot-example.md) — minimal end-to-end bot scaffold
- **`working-with-github`** → `references/howto/code-review-via-api.md` — Reviews API, inline anchoring, GraphQL review threads (the API call mechanics this guide references)
- **`working-with-vercel-ai-sdk`** → `references/` — `generateObject`, provider options, prompt caching, reasoning (`grep` for `generateObject`, `@ai-sdk/anthropic`, `@ai-sdk/openai`)
