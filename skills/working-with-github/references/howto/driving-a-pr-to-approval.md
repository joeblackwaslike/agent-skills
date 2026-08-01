# Driving a PR to Approval

An operating runbook for an autonomous coding agent (and the engineer supervising it) that takes a change from local edits all the way to an all-green, all-approved, merged PR. It is an explicit ordered loop with decision points and exit conditions.

This is a **more robust version of the `pr-loop`** system prompt. Where `pr-loop` triages review comments and polls until approval, this runbook adds the mechanics that make convergence reliable against modern AI reviewers and protected branches:

- **Review-thread resolution** — resolve handled threads via GraphQL `resolveReviewThread` (no REST equivalent), so the next reviewer pass sees a clean slate and converges instead of re-flagging.
- **`reviewDecision` gating** — gate the merge on the PR-level `reviewDecision` plus required-check rollup, not on a hand-counted tally of approvals.
- **Validation before apply** — every suggestion is verified technically before it is applied; agreement is never performed (`superpowers:receiving-code-review`).
- **Idempotency keyed on the head SHA** — feedback is processed once per commit, so a slow poll loop never reprocesses the same comment twice.
- **Convergence with AI reviewers** — address *every* actionable comment and reply on its thread, so a bot reviewer's next pass has something concrete to verify and can approve.

Tooling baseline: `git`, `gh` 2.94, and Octokit (or `gh api graphql`) for the GraphQL-only mechanics. Concrete API request shapes (reply endpoints, GraphQL queries/mutations) live in the sibling [`code-review-via-api.md`](./code-review-via-api.md) — this runbook links there rather than repeating them.

---

## Autonomy posture

This runbook is meant to run **to completion without check-ins**. The default is: once the step-11 exit conditions hold — approved, required checks green, threads resolved — **merge it yourself and move on to the next PR**. Don't pause to ask a human to perform the merge. Own the whole loop end to end: triage feedback, validate, fix real issues, reply, resolve, re-poll, merge.

Stop and hand off to the supervising engineer only for: a genuinely hard-to-reverse action (data loss, a destructive/irreversible op, an outward-facing publish), a real product/design decision that isn't yours to make, or the max-iteration guard tripping (step 11). Everything else has a defined path in this runbook — including a reviewer that *can't* be satisfied (see [When a reviewer can't be satisfied](#when-a-reviewer-cant-be-satisfied-dismiss--merge)). Take the path; don't escalate a routine step.

Sequence stacked or multi-PR work lowest-number-first, and don't open the next PR until the current one is merged.

---

## The loop at a glance

```
1. Branch  ──▶ 2. Commit ──▶ 3. Push ──▶ 4. Open PR ──▶ 5. Watch checks
                                                              │
        ┌─────────────────────────────────────────────────────┘
        ▼
6. Enumerate review threads ──▶ 7. Triage + validate ──▶ 8. Reply on threads
        ▲                                                      │
        │                                                      ▼
11. Re-poll ◀── 10. Push fixes + re-request ◀── 9. Resolve handled threads
        │
        ▼
   reviewDecision == APPROVED  AND  checks all green  AND  no unresolved threads?
        │ yes
        ▼
   gh pr merge --squash --auto --delete-branch
```

Steps 5–11 are the **convergence loop**. Everything before it runs once.

---

## 0. Pin the repo (do this first on a fork)

`gh` resolves to the **upstream** on a fork, so an unpinned loop reads the upstream's PRs and posts to the upstream's threads. Resolve the fork's own origin once and bind it to every `gh` call for the session:

```bash
GH_REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
# if that returned the upstream, override from origin:
GH_REPO=$(git remote get-url origin | sed -E 's|.*github\.com[:/]||; s|\.git$||')
```

Pass `--repo "$GH_REPO"` (or `repos/$GH_REPO` for `gh api`) on every command thereafter. The failure is quiet on read and loud on write — you get someone else's review threads, or a comment posted to a repository you do not own.

## 1. Branch

Create a feature branch off the correct base. Branch from `main` for normal feature/fix work; branch from a `release/x.y` branch only when patching an already-released line (see `multi-branch-release.md`). Don't start work on a detached or already-shared branch.

```bash
git switch main && git pull --ff-only          # start from a current base
git switch -c feat/csv-export                   # or fix/…, chore/…, docs/…
# patching a released line instead:
git switch -c fix/v2-null-deref release/2.3
```

Naming: `<type>/<slug>` using Conventional-Commit types (`feat`, `fix`, `chore`, `docs`, `refactor`). Keep one logical change per branch — don't bundle a refactor with a feature. See `working-with-git` for branch hygiene and `github-flow.md` for the surrounding workflow.

## 2. Commit

Stage and commit in small, logical units with Conventional Commit messages. Prefer several focused commits over one mega-commit — it makes review and selective revert tractable. See the `commit` workflow (`agent-skills:git-github-workflows` → commit) for message format and staging discipline.

```bash
git add -p                                      # stage hunks deliberately
git commit -m "feat(export): stream CSV rows instead of buffering"
```

**Footgun — `git stash -u`:** if you stash to switch context, `-u` (or `-a`) sweeps **untracked** files into the stash. A later `git stash pop` can collide with files the working tree recreated, leaving the stash un-popped and changes apparently "lost." Prefer committing WIP to the branch over stashing; if you must stash, `git stash list` and `git stash pop` deliberately, and never `git stash drop` until you've confirmed the pop applied cleanly.

## 3. Push

```bash
git push -u origin feat/csv-export
```

After you rewrite history (rebase, amend, squash) the remote ref diverges and a plain push is rejected. Use `--force-with-lease`, never bare `--force`:

```bash
git push --force-with-lease origin feat/csv-export
```

`--force-with-lease` refuses the push if the remote moved since your last fetch (e.g. a bot pushed a `suggestion` commit), so you can't silently clobber someone else's work. Bare `--force` overwrites unconditionally — treat it as off-limits on a shared PR branch.

## 4. Open the PR

```bash
gh pr create --fill --base main --assignee @me --reviewer alice,my-org/reviewers
```

- `--fill` autofills title/body from commits; `--fill-verbose` includes commit bodies. `--title`/`--body` override `--fill` when both are given.
- `--assignee @me` sets the owner. **Assignee and reviewer are different roles and both must be set**: the assignee answers "whose work is this", the reviewer answers "who must look at it". Setting `--reviewer` alone leaves the PR ownerless, and every "assigned to me" surface — `gh pr status`, the GitHub dashboard, Launchpad-style views — keys on assignee. A PR that is nobody's appears in nobody's queue, which is exactly wrong for work an agent opened on a user's behalf and handed back. `@me` resolves to the authenticated account, so it is correct whether a human or an agent acting as that account opens the PR. For a PR that is already open: `gh pr edit <n> --add-assignee @me`.
- `--base` sets the target branch explicitly — do this whenever the default branch isn't the intended base (release branches, stacked PRs).
- `--draft` opens in draft. Open as a draft when CI is expensive or the work isn't ready for human eyes; many review bots check `isDraft` and skip until `ready_for_review`. Mark ready with `gh pr ready` (step 10).
- **Link issues** in the body: `Fixes #123` / `Closes #123` auto-closes the issue on merge.
- `--reviewer` requests reviews up front (people or `org/team` handles). For the GitHub-native AI reviewer, `gh pr edit --add-reviewer @copilot`.

Capture the PR number for the rest of the loop:

```bash
PR=$(gh pr view --json number -q .number)
```

## 5. Watch checks

Stream checks until they settle, then inspect the rollup:

```bash
gh pr checks "$PR" --watch --interval 15 --fail-fast   # exits non-zero on failure; exit 8 = still pending
gh pr checks "$PR" --required                          # only the checks that gate merge
```

Distinguish **required** from **optional** checks: only required checks block merge (and only required-reviewer approval gates `reviewDecision`). An optional/advisory check that's red is a signal to triage, not necessarily a stop. The `--json bucket` field buckets each check into `pass`/`fail`/`pending`/`skipping`/`cancel`.

Pull the consolidated state in one call:

```bash
gh pr view "$PR" --json headRefOid,statusCheckRollup,reviewDecision,reviews,latestReviews,mergeStateStatus
```

**Build the whole working map in one pass** rather than fetching per-question — PR state and head SHA, requested reviewers, check-runs *and* legacy commit statuses, top-level comments, every review with its state and commit, and every inline comment (`id`, `databaseId`, `path`, `line`, `body`, `in_reply_to_id`, `user.login`). Each of those answers a different question later in the loop, and gathering them separately invites acting on a half-fetched picture — a triage pass that never saw the newest review reaches confident, wrong conclusions.

When a check fails, fetch the failing job's logs and fix CI — don't guess:

```bash
gh run view <run-id> --log-failed
```

For diagnosing and fixing the workflow itself, see `working-with-github-actions`.

## 6. Enumerate review threads

Do **not** rely on the REST "list review comments" endpoint to drive the loop — it returns comment bodies but **not** thread resolution state. Resolution lives only on the GraphQL `reviewThreads` connection. Query it (paginated, `first: 100`, follow `pageInfo.endCursor`) and pull each thread's `id`, `isResolved`, `path`, `line`, and the comments' `author.login` + `body`:

```bash
gh api graphql -f query='
  query($owner:String!,$repo:String!,$pr:Int!,$cursor:String){
    repository(owner:$owner,name:$repo){
      pullRequest(number:$pr){
        reviewDecision
        reviewThreads(first:100, after:$cursor){
          nodes{
            id isResolved path line
            comments(first:50){ nodes{ id databaseId author{ login } body } }
          }
          pageInfo{ hasNextPage endCursor }
        }
      }
    }
  }' -F owner=OWNER -F repo=REPO -F pr="$PR"
```

The exact query/variables and pagination handling are in [`code-review-via-api.md`](./code-review-via-api.md). The bot's real implementation paginates the same `reviewThreads(first:100, after:$cursor)` connection in a `do … while (hasNextPage)` loop and keeps only unresolved threads (`reviewThreads.filter(t => !t.isResolved)`).

**Resolving ends your obligation, not the reviewer's — re-read threads you already closed.** The `!isResolved` filter above is what every later pass sees, so a thread you answered and resolved leaves the loop permanently. Bots reply *after* resolution: CodeRabbit in particular responds to a rebuttal with a more detailed counter-argument, and that reply is invisible to a filter keyed on resolution state.

On each pass, re-fetch **all** threads and check for any whose last comment is not yours:

```bash
gh api graphql --paginate -f query='...reviewThreads(first:100, after:$endCursor){
  nodes{ id isResolved comments(first:20){ nodes{ author{login} body } } } }' \
| jq -s -r '[.[].data.repository.pullRequest.reviewThreads.nodes[]][]
    | select(.comments.nodes[-1].author.login != "YOUR_LOGIN")
    | "\(.id) resolved=\(.isResolved) last=\(.comments.nodes[-1].author.login)"'
```

A thread matching that — resolved or not — is unfinished. Three did on ai-review-bot#46, each a `bot → me → bot` sequence; one was a correct rebuttal of a wrong reply of mine, and the PR merged with the defect it described. Cheap to check, and the only thing that catches a reviewer who was right the second time.

Treat a counter-reply as a finding with a presumption *against* you: you already committed to a position, and re-reading your own argument is not evidence. Re-derive from the code.

**Detect bot vs human reviewers.** Author logins ending in `[bot]` (e.g. `copilot[bot]`, `coderabbitai[bot]`), or a known prefix/marker your bot stamps on its comments, identify automated reviewers. The distinction drives steps 7–8: AI reviewers converge only if **every** actionable comment is addressed and answered; human reviewers tolerate judgment and discussion. Filter threads to the reviewers you intend to converge on (the real bot matches a configured comment prefix or a leading marker to claim its own threads).

**Required/internal vs advisory/external bots.** Sharpen the bot bucket further. A **required** reviewer (its approval gates `reviewDecision`, or it's an internal bot your org treats as mandatory) must be converged on or, if stuck, dismissed (step 11). An **advisory/external** bot (e.g. `coderabbitai`, `sourcery-ai`, `gemini-code-assist`, `chatgpt-codex-connector`) is *not* required: dedupe its findings against the required reviewers', apply the genuinely useful ones, decline the rest with a one-line rationale, and do **not** block merge on its approval or its `CHANGES_REQUESTED`. Match the exact `[bot]` suffix — don't let an advisory bot's red review hold a PR that's otherwise green.

**The internal bots, by name: `anthropicreviewbot` and `codexreviewbot`.** Both are first-party and **both are required** — each one's `CHANGES_REQUESTED` blocks approval on its own, so converging on one and ignoring the other will not merge. Their findings carry senior-human weight and have no decline path: if you believe one is a false positive, reply with the evidence and get acknowledgement rather than resolving past it.

- **They run the same pipeline on different models, deliberately**, so each can catch what the other is biased about. **Treat disagreement between them as signal, not noise** — reason to the right answer from the code rather than deferring to whichever spoke last. Observed on cc-recall#55: the Anthropic model flagged one block three times, once with advice that *caused* a regression, while the codex model produced the version that resolved it.
- **Both wait ~7.5 minutes before their first review** after a PR opens or any push — they let the external bots finish, then dedupe against them. Polling for them before that elapses is wasted work. They re-review on every push; if one posts mid-loop, interrupt and address it before continuing.
- **`chatgpt-codex-connector` is a different actor from `codexreviewbot`** — the former is advisory and external, the latter internal and required. The names invite conflation and the consequence is asymmetric: mistaking the required bot for the advisory one merges a PR that was never approved.

> Counting only the reviewers you *expected* is how a required bot gets missed. Enumerate the actual review authors on the PR and check each against the required list by name.

## 7. Triage and validate feedback

For each **unresolved** thread, classify the comment, then decide: **apply**, **push back**, or **defer**.

Classify by severity first, because it sets the order of work and the reply obligation:

| Class | Handling |
|---|---|
| **CRITICAL** (runtime break, data corruption) and **SECURITY** | Fix immediately, top of queue, ahead of anything already in progress |
| **HIGH** (correctness, silent data loss) | Fix in the same pass |
| **SUGGESTION** | Implement if reasonable; otherwise decline with a rationale on the thread |
| **NITPICK** (Nit/FYI) | Fix silently and acknowledge — don't argue a nit |
| **INFORMATIONAL** / bot summary tables | No reply. Replying to a summary table adds noise to a thread nobody reads |

Severity is the reviewer's claim, not a verdict — a comment labelled CRITICAL still gets verified against the code before anything is applied.

**Validate before applying — this is non-negotiable.** Invoke `superpowers:receiving-code-review` and run its Read → Verify → Evaluate → Respond loop. Do not perform agreement and do not blindly apply suggestions, including AI suggestions and one-click ` ```suggestion ` blocks:

- **Verify the claim technically** against the actual code — AI reviewers hallucinate. Confirm the flagged line/behavior really exists and the suggested change is correct in context before touching anything.
- **Apply** when the finding is real and the fix is correct.
- **Push back** when the reviewer is wrong, the suggestion breaks something, or it contradicts an established invariant — and say why on the thread.
- **Defer** out-of-scope or speculative items to a follow-up issue rather than scope-creeping the PR.

**When a bot's structured output contradicts its prose, trust the prose.** Some AI reviewers emit a synthesized summary *body* plus a findings *table* plus a mechanical *event* (`APPROVE`/`REQUEST_CHANGES`). These can disagree: the body says "the prior concerns are resolved" while the table still lists them as 🔴 and the event stays `REQUEST_CHANGES`. The body is the most reliable signal — the table and event are often re-derived from a truncated or incremental diff and lag the holistic state. Read the body first; if it confirms resolution while the event blocks, you're likely looking at a stuck reviewer (step 11), not a real defect.

Triage out the noise: deduplicate comments that flag the same line/issue (keep the most specific), and treat pure nitpicks (Nit/FYI) as optional. Concentrate effort on correctness, security, and contract-breaking findings first.

## 8. Reply to each thread

Communicate back on **every** actionable thread — what you changed, or why you won't. Replies go to the existing thread (so the conversation stays threaded) via the REST reply endpoint:

```
POST /repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies
```

where `{comment_id}` is the **root** comment's `databaseId` from step 6. Where the fix is unambiguous, post a ` ```suggestion ` block so the reviewer (or a human) can accept it in one click; multi-line suggestions span the comment's `start_line`…`line` range. For batched feedback prefer a single pending review (`POST …/pulls/{pr}/reviews`) over one API call per comment, to fire one notification instead of many. Exact payloads and the suggestion-block format are in [`code-review-via-api.md`](./code-review-via-api.md).

For **AI reviewers specifically**, leaving a concrete reply on each actionable comment is what lets the next pass converge: the reviewer re-reads the thread, sees the change or the rebuttal, and either approves or narrows its remaining concerns instead of re-raising the same point.

Shape of a reply, by outcome:

- **Fixed** — state what changed and cite the commit SHA (8 chars). The SHA is what lets the next pass verify rather than re-derive.
- **Declined** — state why, without defensiveness, and offer the alternative you'd accept.
- **Needs input** — ask exactly one specific question. A reply that asks three things gets one answered.

Do not thank the reviewer, and do not restate their comment back to them. Both are pure padding in a thread whose next reader is a machine diffing your reply against its own finding — and for a human reviewer they bury the one sentence that matters.

### Rate every bot comment with a reaction

Replying is half the loop. The **reaction** is the graded signal an internal review bot learns from, and it is a separate obligation from the reply — a thread that is answered but unrated teaches nothing.

| Reaction | Meaning |
|---|---|
| 👍 | The finding helped — it was real and worth raising. |
| 👎 | The finding was **factually wrong** — the claim does not hold against the code. |
| 😕 | The finding did not land — technically accurate but not useful here (out of scope, already handled, misread intent, noise). |

- **😕 is not a synonym for 👎, and it must always carry a reply** explaining why it missed. The reply is what makes it interpretable; a bare 😕 is indistinguishable from disagreement about facts. This constraint is enforced upstream in the bot's own `src/feedback/types.ts`.
- **Rate every actionable comment, not a subset.** Partial rating silently biases the corpus toward whatever the agent happened to find notable, which is the opposite of what the signal is for.
- **Say *why* in the reply** — valuable because X, or a false positive because `file:line` shows Y. A reaction without a reason is a vote with no argument attached.

Full guidance on what each reaction means, the reply openers that classify without a model call, and where the signal ends up: [`giving-feedback-on-ai-reviews.md`](./giving-feedback-on-ai-reviews.md). The maintainer-side counterpart — reading the trends and acting on them — is [`tuning-the-ai-reviewer.md`](./tuning-the-ai-reviewer.md).

Do not skip 😕 as a middle option. Sampled across one PR's review corpus (cc-recall#55: 51 👍 / 41 😕 / 7 👎), 😕 was the **dominant negative signal** — collapsing it into 👎 or omitting it discards most of the usable feedback. Reactions post via the REST reactions endpoint on the comment id; payloads are in [`code-review-via-api.md`](./code-review-via-api.md).

**Pace a bulk pass — GitHub's secondary rate limit will stop you.** Replying to a large thread backlog in a tight loop trips abuse detection, which returns `422 Validation Failed` with `{"resource":"PullRequestReview","code":"abuse"}` — not a `429`, and not obviously a rate limit unless you read the error body. Measured on a 43-thread pass: the first 40 replies succeeded, then every subsequent call failed until backoff. Two consequences worth designing for:

- **Retry with backoff rather than aborting** — the failure is transient and per-burst, so a bounded retry loop recovers the tail without re-posting the ones that landed.
- **Never treat a bulk-post failure as "the reply was rejected"** — the content was fine. Blindly re-running the whole loop would double-post the successful 40. Track which comment ids succeeded and retry only the remainder.

## 9. Resolve conversations

After a thread is genuinely handled (fix pushed, or rebuttal posted and accepted), **resolve it** so it stops counting against the merge gate and the next reviewer pass sees a clean slate. There is **no REST equivalent** — resolution is the GraphQL `resolveReviewThread` mutation keyed on the thread `id` (not the comment id) from step 6:

```bash
gh api graphql -f query='
  mutation($threadId:ID!){
    resolveReviewThread(input:{ threadId:$threadId }){
      thread{ id isResolved }
    }
  }' -F threadId="$THREAD_ID"
```

Only resolve what's actually addressed. The real bot is conservative about this: it auto-resolves a thread only when the underlying finding no longer applies — e.g. the flagged `path:line` no longer exists in the current diff (it intersects each thread's line against the set of valid lines per file and resolves the ones that fell out of range), wrapping the mutation in a try/catch and logging failures rather than aborting the run. Mirror that posture: resolve fixed/stale threads; leave genuinely open disagreements unresolved.

## 10. Push fixes and re-request review

**Re-sync before every fix pass.** `git pull origin <head>` first — a reviewer's own suggestion may already be committed, and a fix written against a stale tree lands as a conflict or silently reverts someone else's change.

Keep each fix minimal and scoped to its comment. No opportunistic refactors: an unrelated change in a review-fix commit forces the reviewer to re-review surface they had already cleared, which is how a converging loop stops converging. **If a single fix would touch more than ~5 files, stop and summarize the plan before writing it** — that size usually means the comment implied a design change, and it deserves a decision rather than a reflex.

Run the repo's gate over the changed files after each logical group (`pre-commit run --files <changed>`, or the project's lint/test equivalent) and repair before committing — verify by **exit code**, never by grepping output for the word "error". Name the commits for what they are: `fix(review): <desc>`, `fix(security): <desc>`.

Commit the fixes from step 7 (small logical commits, step 2), push (step 3 — `--force-with-lease` if you amended/rebased), then nudge reviewers to re-run:

```bash
git commit -m "fix(export): handle empty result set per review"
git push origin feat/csv-export
gh pr ready "$PR"                                   # promote draft → ready (--undo to go back)
gh pr edit "$PR" --add-reviewer alice,@copilot      # re-request; re-adding re-triggers a bot pass
```

Re-adding a reviewer that already reviewed re-requests their review — for bot reviewers this is what triggers the next pass against the new head SHA. Pushing new commits to the PR branch automatically re-runs CI.

## 11. Loop until done

Re-poll from step 5. Continue the convergence loop until **all** exit conditions hold:

1. `reviewDecision == "APPROVED"` (or, where `reviewDecision` is `null` because no review is *required*, every requested required reviewer has an `APPROVED` entry in `latestReviews`), **and**
2. `statusCheckRollup` — every required check in `bucket: pass` (or `skipping`), none `fail`/`pending`, **and**
3. no unresolved review threads remain (`reviewThreads` all `isResolved: true`), **and**
4. `mergeStateStatus` is mergeable (not `BLOCKED`/`DIRTY`/`BEHIND` — rebase on base if `BEHIND`), **and**
5. every finding you answered carries a reaction (see [Rate every bot comment](#rate-every-bot-comment-with-a-reaction)).

**Condition 5 is the one that fails silently.** The other four are enforced by GitHub — you cannot merge past a missing approval or a red check. Nothing enforces rating, so "I answered every thread" reads as done while the corpus records none of it. On ai-review-bot#47 the two came apart for four rounds: twelve findings argued with in replies, not one of them rated, and no signal anywhere that the loop was only half-run. Check it mechanically rather than from memory:

```bash
ai-review unrated --repo "$OWNER/$REPO" --pr "$PR"   # exits non-zero, lists permalinks
```

Without that CLI, the same query over the API — our bot's findings that a human answered but nobody reacted to:

```bash
gh api --paginate "repos/$OWNER/$REPO/pulls/$PR/comments" --jq '
  (map(select(.in_reply_to_id != null)) | map(.in_reply_to_id) | unique) as $answered
  | map(select((.user.login | test("reviewbot")) and (.id as $i | $answered | index($i)) and .reactions.total_count == 0))
  | .[] | "unrated: \(.id) \(.path):\(.line)"'
```

**Check-run conclusion and review event are separate signals, and they can disagree.** A check run is keyed to a head SHA; a review event is not superseded automatically and persists until that reviewer submits a new one. So a bot can evaluate three newer commits, find nothing actionable, and report `neutral` on the check — while `reviewDecision` still reads `CHANGES_REQUESTED` from a review event three pushes back. The merge gate reads `reviewDecision`, so the PR stays blocked by a verdict that no newer pass ever superseded.

- **Read both signals, and verify review age against the head SHA.** Query `reviews { commit { oid } }` and compare each to the current `headRefOid` — do not trust `reviewDecision` alone. Condition 1 above means *approved against the current head*, not approved at some point.
- A bot that reports via check runs but never submits a follow-up review event will hold `reviewDecision` at its oldest negative verdict indefinitely. That is a **state-machine gap, not a stuck reviewer** — the findings are genuinely resolved, so no dismissal is warranted; see [When a reviewer can't be satisfied](#when-a-reviewer-cant-be-satisfied-dismiss--merge) for the case that *does* need one.
- Counting threads is subject to the same staleness trap in reverse: `reviewThreads(first:100)` without following `pageInfo.endCursor` will report a clean slate that is only the first page. **A count exactly equal to the page size is a truncation signal, not a measurement.**
- **`reviews` needs the same pagination, and it overflows sooner than you expect.** `reviews(first:100)` is the natural way to check freshness against `headRefOid` — and it silently returns the *oldest* 100. Every threaded reply you post creates a review entry, so on a PR where you answer a few dozen inline comments the connection blows past 100 from your own replies alone, and the newest bot review falls off the end. The failure is silent and reads as "no fresh review yet", so the loop waits for a verdict that already arrived. Either paginate `reviews` the same way as `reviewThreads`, or read freshness over REST with `--paginate`:

  ```bash
  gh api repos/{owner}/{repo}/pulls/{pr}/reviews --paginate \
    --jq '.[] | "\(.submitted_at) \(.user.login) \(.state) \(.commit_id[0:8])"' | tail -5
  ```

  Observed on ai-review-bot#34: 89 threaded replies pushed the review count past 100, and a `CHANGES_REQUESTED` submitted against the current head was invisible to a `first:100` poll for twelve minutes.

Then merge per repo policy:

```bash
gh pr merge "$PR" --squash --auto --delete-branch
```

`--auto` enables auto-merge so the PR merges the moment the gates clear (and joins a merge queue if the branch requires one); `--squash` collapses the convergence-loop commits into one (use `--merge`/`--rebase` per repo convention); `--delete-branch` cleans up local + remote.

### Poll cadence, backoff, and guards

The loop runs unattended, so bound it:

- **Cadence + backoff.** Poll review state on a fixed interval (e.g. 30–60s) with exponential backoff up to a cap (e.g. 5 min) while nothing changes; reset to the base interval when new activity (a new review, a new push) appears. CI is cheaper to watch directly with `gh pr checks --watch` than to poll by hand.
- **Working defaults**, once the required-reviewer delay above has elapsed: reviews every 60s for ~10 min, CI every 90s, a full thread re-fetch every 3 min. On new comments, drop back into triage/fix/reply/push and reset the timer. Filter every poll by `submitted_at` (or the review's commit oid) so a review you already handled doesn't re-trigger a pass.
- **Max-iteration guard.** Cap total iterations (or wall-clock, e.g. 20 passes / 60 min). On hitting the cap, stop and hand off to the supervising engineer with the current `reviewDecision`, failing checks, and the list of still-unresolved threads — never spin forever.
- **Idempotency keyed on the head SHA.** Record which `(thread id, head SHA)` pairs you've already processed. On each pass, skip any thread you already handled at the **current** `headRefOid` and only act on threads that are new or whose head SHA changed. This is the core safeguard against reprocessing the same feedback twice when a poll fires before a reviewer re-runs. The real bot applies the same principle to reaction polling — it stores the last-seen verdict per reactor and diffs against it so re-observing an unchanged reaction emits no new event; the analog here is the last-processed head SHA per thread. Persist this map so a restarted run doesn't replay old feedback. Note: if appending fixes to a thread partially fails, it's safer to *not* mark it processed and risk a rare duplicate reply on the next pass than to mark it done and silently drop the unhandled part.

### When a reviewer can't be satisfied (dismiss + merge)

Addressing every comment assumes the reviewer *converges*. Some don't. An AI reviewer that re-reviews a **truncated or incremental diff** and keeps **no memory of its own prior pass** can become mechanically unable to approve a correct PR: every pass re-derives already-addressed findings from scratch, and if a single agent re-raises one, the merged event stays `REQUEST_CHANGES` — forever. Replying and pushing fixes doesn't help, because the next pass has forgotten them.

**A second, distinct non-convergence mode: the fix itself is reviewable.** The stuck-reviewer case below is about a reviewer *recycling* old findings. The opposite also happens — every finding is genuinely new, and the loop still never terminates, because each fix you push is new diff for the next pass to review. Observed on ai-review-bot#34: five rounds producing 28 → 21 → 15 → 25 → 19 findings, with only 1 of 40 in rounds 3–4 restating an earlier one. Measure it before diagnosing: normalize titles to content-word sets and compare rounds pairwise; a low overlap means new findings, so **dismissal is not warranted** — the reviewer is working, the loop just has no fixed point.

Tells that a round has crossed into diminishing returns:

- Findings that state the code is *correct* (`"the inline comment accurately describes the new logic"`, `"the export location change is fine"`). A finding with no defect in it is noise wearing a severity badge.
- A round contradicting the previous one on the same line — round N says a counter over-counts, you fix it, round N+1 says it now under-counts.
- Severity inflation on doc/comment wording: several 🟡 on the phrasing of a JSDoc.

**The exit is a scope boundary, not a dismissal.** Fix what is substantive, answer and resolve the rest, and stop taking new cosmetic findings on code introduced *by review fixes* — file them as follow-ups instead. Say so explicitly on the PR so the decision is on the record. Without a boundary the loop is unbounded by construction, and the max-iteration guard is what should trip.

**Recognize the signature** (all from data, not a hunch):

- The prose **body** says resolved / only-nits while the **event** stays `REQUEST_CHANGES` and the **table** recycles prior findings (the body-vs-event split from step 7).
- The *same* findings reappear across passes despite confirmed fixes and replies.
- Findings reference code "not present" / "not visible" that **is** present in the full diff (a truncated-diff tell), or restate the full PR rather than the delta.

**Before dismissing, prove it's genuinely stuck and the PR is genuinely correct:** re-read the body; verify the live findings are false-positives or already-addressed, citing the code/replies; confirm required checks are green and your own validation (and any required *human* review) is done. If the reviewer raised a real new bug, **fix it** — don't dismiss.

**Protected vs unprotected base decides the mechanic:**

- On an **unprotected** base (or when the stuck reviewer isn't a *required* one), its `CHANGES_REQUESTED` does **not** gate merge — `mergeStateStatus` stays `CLEAN`/`UNSTABLE`, not `BLOCKED`. Just merge; the red review is advisory.
- On a **protected** base where that reviewer **is** required, dismiss the blocking review first so `reviewDecision` clears.

**Dismiss mechanic** (REST; no GraphQL needed). Dismissals are per-review, keyed on the review `id`:

```bash
gh api -X PUT repos/{owner}/{repo}/pulls/{pr}/reviews/{review_id}/dismissals \
  -f message="Stuck-loop: body confirms the core is resolved; table/event re-derive
  already-fixed findings from a truncated diff. CI green, validated. Dismissing to merge." \
  -f event=DISMISS
```

A reviewer's blocking reviews **stack** — list them and dismiss **every** `CHANGES_REQUESTED` from that reviewer, not just the latest:

```bash
gh api "repos/{owner}/{repo}/pulls/{pr}/reviews?per_page=100" \
  --jq '.[] | select(.user.login=="that-bot[bot]" and .state=="CHANGES_REQUESTED") | .id'
```

Then merge (step 11). **This is an authorized exception, not the norm** — only for a confirmed stuck/false-positive loop, with the reasoning recorded in the dismissal `message` so the audit trail explains why a `CHANGES_REQUESTED` was overridden. Tie it into the **max-iteration guard**: when the cap trips and the *only* thing blocking is a stuck non-required reviewer (everything else green, threads resolved), dismiss + merge instead of handing off — that's the path, not an escalation.

### What this adds over `pr-loop`

`pr-loop` does steps 5–8 and 11's approval poll. This runbook hardens it with: an explicit **autonomy posture** (merge-yourself-on-green default, with a bounded set of escalation triggers); GraphQL **thread resolution** (step 9) so AI reviewers converge instead of re-flagging; **`reviewDecision` + required-check + unresolved-thread** gating (step 11) instead of a hand-counted approval tally; **validate-before-apply** (step 7) via `superpowers:receiving-code-review`; the **required/internal vs advisory/external** bot split (step 6) so an advisory bot can't hold a green PR; a **dismiss-the-stuck-reviewer** exit (step 11) for AI reviewers that are mechanically unable to approve a correct PR; **head-SHA idempotency** so feedback is processed once per commit; and an explicit **max-iteration guard** that resolves to dismiss+merge or a clean handoff instead of an unbounded loop.
