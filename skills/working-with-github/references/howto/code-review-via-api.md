# Code Review via the GitHub API

The API mechanics for doing code review programmatically — fetching diffs, posting a batched review with inline comments, replying to and resolving threads, requesting reviewers, reporting results via the Checks/Statuses APIs, and reading review state. This is the building-block reference. The *agent loop* that strings these together (triage → fix → reply → poll) lives in `howto/driving-a-pr-to-approval.md`, and a complete LLM reviewer bot lives in the `developing-for-github` skill's `references/howto/llm-pr-reviewer.md`. This guide does not duplicate either — it's the primitives both build on.

Examples use `gh api` (gh 2.94) and Octokit (`@octokit/rest` v5 / the `octokit` v4 umbrella). All REST calls assume the version header `X-GitHub-Api-Version: 2022-11-28` (gh sends it automatically). Writing **check runs** requires a GitHub App token — OAuth/user tokens can read check runs but not create them; for those, use commit **statuses** instead (see §5).

```ts
import { Octokit } from "octokit"; // umbrella: .rest.*, .graphql, .paginate
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
```

## 1. Fetch the diff / patch of a PR

Two distinct shapes, for two distinct jobs.

**Raw unified diff** — one blob for the whole PR. Set the `Accept` media type to `application/vnd.github.v3.diff` (also `.diff` works) on `GET /repos/{o}/{r}/pulls/{n}`. The response body is the raw `git diff` text, *not* JSON.

```bash
gh api repos/OWNER/REPO/pulls/123 \
  -H "Accept: application/vnd.github.v3.diff" > pr.diff
# .patch gives the mbox-style format with commit metadata instead
```

```ts
const { data: diff } = await octokit.rest.pulls.get({
  owner, repo, pull_number: 123,
  mediaType: { format: "diff" }, // "patch" for the mbox format
});
// `diff` is a string here — TS types still say PullRequest, so cast: (diff as unknown as string)
```

Use the raw diff when feeding a model or scanning the whole change as text. It does **not** give you per-file metadata or stable comment anchors.

**Per-file patches** — `GET /repos/{o}/{r}/pulls/{n}/files` returns an array where each entry has `filename`, `status` (`added`/`modified`/`removed`/`renamed`), `additions`/`deletions`/`changes`, a `patch` string (the per-file hunk text), and `sha`/`blob_url`. Binary or very large files have **no `patch`** — guard for that. This is the list to drive inline comments from, because you can map a comment to a `path` + `line`.

The endpoint paginates (30/page, up to 3000 files total). Always paginate:

```bash
gh api --paginate repos/OWNER/REPO/pulls/123/files \
  --jq '.[] | {filename, status, additions, hasPatch: (.patch != null)}'
```

```ts
const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
  owner, repo, pull_number: 123, per_page: 100,
});
for (const f of files) {
  if (!f.patch) continue;     // binary / too-large — no anchorable lines
  // parse f.patch hunks → set of valid right-side line numbers (see below)
}
```

### `position` vs `line` — placing a comment on the diff

This is the single most common footgun. There are two anchoring schemes:

- **`line`** (modern, what you want) — the actual line number in the file's new version (right side of the diff). Pair with `side: "RIGHT"` (additions/context) or `"LEFT"` (deletions). For a multi-line range add `start_line` + `start_side`.
- **`position`** (legacy, closing down) — *not* a file line number. It's the count of lines down from the first `@@` hunk header in that file's patch (the line just below the hunk header is position 1, incrementing through whitespace and subsequent hunks). GitHub still accepts it but `line` supersedes it; if you pass `line`, you can omit `position`.

A comment's `line` must fall on a line that actually appears on the chosen side of the diff. GitHub rejects comments on unchanged lines outside any hunk. Compute the valid right-side line set by walking the patch hunks — parse each `@@ -a,b +c,d @@` header to seed the new-file line counter, then advance it for ` ` (context) and `+` (added) lines, skipping `-` (removed):

```ts
function rightSideLines(patch: string): Set<number> {
  const lines = new Set<number>();
  let n = 0;
  for (const ln of patch.split("\n")) {
    const m = /@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/.exec(ln);
    if (m) { n = Number(m[1]); continue; }
    if (ln.startsWith("+") || ln.startsWith(" ")) lines.add(n++);
    // "-" lines don't consume a right-side number
  }
  return lines;
}
```

Validate every inline comment's `line` (and `start_line`) against this set *before* posting, and drop the ones that miss — GitHub fails the **entire review** if any single comment has an invalid position, so client-side validation is the difference between a posted review and a 422. Joe's bot drops out-of-diff comments and backwards ranges (`start_line >= line`) rather than letting the API reject the batch.

## 2. Post a review — one batched review, not N comments

Always submit **one review** carrying all inline comments, not a loop of individual `POST .../comments` calls. The batched form fires a single notification, is atomic, and lets you attach an `event` (the merge-gate verb). The endpoint is `POST /repos/{o}/{r}/pulls/{n}/reviews`:

- `event`: `COMMENT` (informational), `APPROVE`, or `REQUEST_CHANGES` (blocks merge under branch protection). Omitting `event` leaves the review **PENDING** — visible only to you until you submit it via `POST .../reviews/{review_id}/events`.
- `body`: the top-level review summary (Markdown).
- `comments[]`: inline comments, each `{ path, line, side, body }`, plus `start_line` + `start_side` for a multi-line range.
- `commit_id` (optional): pin the review to a SHA so anchors don't drift if new commits land mid-review.

```bash
gh api repos/OWNER/REPO/pulls/123/reviews -X POST \
  -f event=REQUEST_CHANGES \
  -f body='### Review

2 findings — see inline comments.' \
  -f 'comments[0][path]=src/auth.ts' \
  -F 'comments[0][line]=42' \
  -f 'comments[0][side]=RIGHT' \
  -f 'comments[0][body]=Token compared with `==` — use a constant-time compare.'
```

```ts
await octokit.rest.pulls.createReview({
  owner, repo, pull_number: 123,
  event: "REQUEST_CHANGES",      // or "COMMENT" / "APPROVE"
  body: "### Review\n\n2 findings — see inline comments.",
  comments: [
    // single-line
    {
      path: "src/auth.ts",
      line: 42,
      side: "RIGHT",
      body: "Token compared with `==` — use a constant-time compare.",
    },
    // multi-line range (lines 10–14): start_* marks the first line, line marks the last
    {
      path: "src/server.ts",
      start_line: 10,
      start_side: "RIGHT",
      line: 14,
      side: "RIGHT",
      body: [
        "These four lines re-parse the request body on every call.",
        "",
        "```suggestion",
        "const body = await req.json();",
        "process(body);",
        "```",
      ].join("\n"),
    },
  ],
});
```

A `\`\`\`suggestion` fenced block in a comment `body` renders as a one-click "commit suggestion" in the GitHub UI. Its lines replace exactly the lines the comment is anchored to — so a multi-line suggestion must be anchored to a multi-line range (`start_line`→`line`) whose span equals the number of replacement lines you intend. Build the body programmatically:

```ts
const body = `**Constant-time compare**\n\nUse \`timingSafeEqual\`:\n\n` +
  "```suggestion\n" + suggestedCode + "\n```";
```

**Pacing / partial reviews:** if your comments come from a model that can rate-limit, decide the `event` from what actually succeeded — only upgrade to `APPROVE` when every check passed and nothing was flagged; keep `COMMENT` for a partial pass so you don't approve on incomplete analysis.

## 3. Reply to / resolve review feedback

**Reply to a review comment** (REST). To thread a reply under an existing top-level review comment, `POST /repos/{o}/{r}/pulls/{n}/comments/{comment_id}/replies` with a `body`. `comment_id` must be a top-level comment — replies to replies aren't supported. (Equivalently, `createReviewComment` with `in_reply_to` set to the parent id.)

```bash
gh api repos/OWNER/REPO/pulls/123/comments/998877/replies \
  -X POST -f body='Fixed in a1b2c3d — switched to timingSafeEqual.'
```

```ts
await octokit.rest.pulls.createReplyForReviewComment({
  owner, repo, pull_number: 123, comment_id: 998877,
  body: "Fixed in a1b2c3d — switched to timingSafeEqual.",
});
```

**Resolving a review thread is GraphQL-only.** There is no REST endpoint to mark a thread resolved — the `resolveReviewThread` / `unresolveReviewThread` mutations are the only way. The catch: you need the thread's **node ID**, which is *not* the REST comment id. Walk the PR's `reviewThreads` connection to get it (and the thread's `path`/`line`/`isResolved`):

```graphql
query ($owner: String!, $repo: String!, $pr: Int!, $cursor: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      reviewThreads(first: 100, after: $cursor) {
        nodes {
          id              # ← threadId for the mutation
          isResolved
          path
          line
          comments(first: 1) { nodes { body } }
        }
        pageInfo { hasNextPage endCursor }
      }
    }
  }
}
```

```graphql
mutation ($threadId: ID!) {
  resolveReviewThread(input: { threadId: $threadId }) {
    thread { id isResolved }
  }
}
```

```ts
type ThreadPage = {
  repository: { pullRequest: { reviewThreads: {
    nodes: { id: string; isResolved: boolean; path: string; line: number | null;
             comments: { nodes: { body: string }[] } }[];
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
  }; }; };
};

let cursor: string | null = null;
const threads: ThreadPage["repository"]["pullRequest"]["reviewThreads"]["nodes"] = [];
do {
  const page: ThreadPage = await octokit.graphql(THREADS_QUERY, { owner, repo, pr: 123, cursor });
  const conn = page.repository.pullRequest.reviewThreads;
  threads.push(...conn.nodes);
  cursor = conn.pageInfo.hasNextPage ? conn.pageInfo.endCursor : null;
} while (cursor);

// Resolve threads whose line no longer exists in the new diff (the issue was fixed/removed):
for (const t of threads) {
  if (t.isResolved) continue;
  const stillInDiff = t.line != null && rightSideLines(patchFor(t.path)).has(t.line);
  if (!stillInDiff) {
    await octokit.graphql(
      `mutation ($threadId: ID!) {
         resolveReviewThread(input: { threadId: $threadId }) { thread { id isResolved } }
       }`,
      { threadId: t.id },
    );
  }
}
```

`gh` can run the mutation too — `gh api graphql -f query='mutation { resolveReviewThread(input: {threadId: "PRRT_xxx"}) { thread { id } } }'`. Use `unresolveReviewThread` with the same `{ threadId }` input to reopen. Identify *your own* threads (vs. a human's or another bot's) by matching a known marker in the first comment's body before resolving — never auto-resolve threads you didn't author.

## 4. Request / re-request reviewers

`POST /repos/{o}/{r}/pulls/{n}/requested_reviewers` with `reviewers` (usernames) and/or `team_reviewers` (team slugs). Re-requesting an existing reviewer after a push resets their review state to "requested" — handy for nudging a re-review.

```bash
gh api repos/OWNER/REPO/pulls/123/requested_reviewers -X POST \
  -f 'reviewers[]=alice' -f 'reviewers[]=bob' \
  -f 'team_reviewers[]=backend'
```

```ts
await octokit.rest.pulls.requestReviewers({
  owner, repo, pull_number: 123,
  reviewers: ["alice", "bob"],
  team_reviewers: ["backend"],
});

// Remove a pending request (DELETE, same body shape):
await octokit.rest.pulls.removeRequestedReviewers({
  owner, repo, pull_number: 123, reviewers: ["bob"],
});

// See who's currently requested:
const { data } = await octokit.rest.pulls.listRequestedReviewers({ owner, repo, pull_number: 123 });
// data.users[], data.teams[]
```

You can't request a reviewer who has already submitted a review without first re-requesting; you also can't request the PR author. A user can't be both an individual reviewer and only-via-team in the same call's expectations — request individuals explicitly when you need a specific person.

## 5. Reporting review results — Checks vs Statuses

**Check runs** are the rich, per-line option (and the one CI surfaces best). `POST /repos/{o}/{r}/check-runs` with `name`, `head_sha`, `status` (`queued`/`in_progress`/`completed`), and on completion a `conclusion` (`success`/`failure`/`neutral`/`cancelled`/`action_required`/`timed_out`/`skipped`). The `output` object carries `title`, `summary` (both required when you send `output`), an optional `text`, and `annotations[]` — each annotation is `{ path, start_line, end_line, annotation_level: "notice"|"warning"|"failure", message, title? }`.

**The 50-annotation cap is per request.** To attach more, create the run with the first ≤50, then `PATCH /repos/{o}/{r}/check-runs/{id}` with each subsequent batch of ≤50 — the API appends them. Map review severity to `conclusion`/`annotation_level`: blocking findings → `action_required` + `failure`, advisory → `neutral` + `warning`/`notice`.

```ts
async function postCheckRun(review: { event: string; comments: Annotation[] }) {
  const annotations = review.comments; // {path,start_line,end_line,annotation_level,message,title}
  const conclusion =
    review.event === "REQUEST_CHANGES" ? "action_required"
    : review.event === "APPROVE" ? "success"
    : "neutral";

  const { data: run } = await octokit.rest.checks.create({
    owner, repo, name: "ai-review", head_sha: headSha,
    status: "completed", conclusion,
    output: {
      title: `${annotations.length} finding(s)`,
      summary: `Found ${annotations.length} inline finding(s).`,
      annotations: annotations.slice(0, 50), // first batch only
    },
  });

  for (let i = 50; i < annotations.length; i += 50) {
    await octokit.rest.checks.update({
      owner, repo, check_run_id: run.id,
      output: { title: run.output.title!, summary: run.output.summary!,
                annotations: annotations.slice(i, i + 50) },
    });
  }
}
```

```bash
gh api repos/OWNER/REPO/check-runs -X POST \
  -f name='ai-review' -f head_sha="$SHA" \
  -f status=completed -f conclusion=action_required \
  -f 'output[title]=2 finding(s)' \
  -f 'output[summary]=See annotations.' \
  -f 'output[annotations][0][path]=src/auth.ts' \
  -F 'output[annotations][0][start_line]=42' \
  -F 'output[annotations][0][end_line]=42' \
  -f 'output[annotations][0][annotation_level]=failure' \
  -f 'output[annotations][0][message]=Use a constant-time compare.'
```

**Commit statuses** are the simpler, App-free fallback. `POST /repos/{o}/{r}/statuses/{sha}` with `state` (`error`/`failure`/`pending`/`success`), a `context` label (e.g. `ci/ai-review`), an optional `target_url` (link to full output), and `description`. No per-line annotations — just one pass/fail dot per `context`, combinable via `GET /commits/{ref}/status`.

```ts
await octokit.rest.repos.createCommitStatus({
  owner, repo, sha: headSha,
  state: "failure",                 // error | failure | pending | success
  context: "ci/ai-review",
  description: "2 blocking findings",
  target_url: "https://ci.example.com/run/42",
});
```

**Which to use:** check runs need a **GitHub App** installation token and give you per-file/line annotations, a summary panel, and re-run buttons — use them when you're a bot/App and want findings to show up as inline annotations in the Files tab. Commit statuses work from any token (PAT/OAuth/user), are trivial, and are right when you only need a single pass/fail gate per context or you're not an App. A common split: the **review** (§2) owns conversational inline comments, while a **check run** owns the machine-generated annotations and the merge-gate conclusion.

## 6. Reading review state

For "is this PR approved / who still needs to review", query GraphQL — `reviewDecision` collapses branch-protection requirements into one of `APPROVED` / `CHANGES_REQUESTED` / `REVIEW_REQUIRED` / `null`, and `latestReviews` gives the current (deduped) review per reviewer:

```graphql
query ($owner: String!, $repo: String!, $pr: Int!) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $pr) {
      reviewDecision
      latestReviews(first: 50) {
        nodes { author { login } state }   # APPROVED / CHANGES_REQUESTED / COMMENTED / ...
      }
      reviewThreads(first: 100) {
        nodes { isResolved isOutdated path line }
      }
    }
  }
}
```

```ts
const r = await octokit.graphql(REVIEW_STATE_QUERY, { owner, repo, pr: 123 });
// r.repository.pullRequest.reviewDecision === "APPROVED" → merge gate satisfied
```

The REST `GET /repos/{o}/{r}/pulls/{n}/reviews` lists every review event (including superseded ones) — useful for idempotency ("did I already review this SHA?") by stamping a marker like `Reviewed commit: \`<sha>\`` in your review `body` and checking for it before re-reviewing. For counting unresolved threads or deciding what to re-poll, prefer the GraphQL `reviewThreads` (`isResolved` / `isOutdated`) — REST has no thread-resolution state. The full polling loop (read state → act → wait → re-poll until `reviewDecision === APPROVED` and CI is green) is the workflow guide's job, below.

## See also

- `howto/driving-a-pr-to-approval.md` — the agent workflow loop that orchestrates these primitives: triage incoming review comments, implement fixes, reply, re-request review, and poll review/CI state to approval.
- `developing-for-github` skill → `references/howto/llm-pr-reviewer.md` — a complete LLM-backed reviewer bot wiring these calls together (model-generated findings → batched review + suggestions + check-run annotations + thread resolution).
