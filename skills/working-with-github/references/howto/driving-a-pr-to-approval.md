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
gh pr create --fill --base main --reviewer alice,my-org/reviewers
```

- `--fill` autofills title/body from commits; `--fill-verbose` includes commit bodies. `--title`/`--body` override `--fill` when both are given.
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
gh pr view "$PR" --json statusCheckRollup,reviewDecision,reviews,latestReviews,mergeStateStatus
```

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

**Detect bot vs human reviewers.** Author logins ending in `[bot]` (e.g. `copilot[bot]`, `coderabbitai[bot]`), or a known prefix/marker your bot stamps on its comments, identify automated reviewers. The distinction drives steps 7–8: AI reviewers converge only if **every** actionable comment is addressed and answered; human reviewers tolerate judgment and discussion. Filter threads to the reviewers you intend to converge on (the real bot matches a configured comment prefix or a leading marker to claim its own threads).

## 7. Triage and validate feedback

For each **unresolved** thread, classify the comment, then decide: **apply**, **push back**, or **defer**.

**Validate before applying — this is non-negotiable.** Invoke `superpowers:receiving-code-review` and run its Read → Verify → Evaluate → Respond loop. Do not perform agreement and do not blindly apply suggestions, including AI suggestions and one-click ` ```suggestion ` blocks:

- **Verify the claim technically** against the actual code — AI reviewers hallucinate. Confirm the flagged line/behavior really exists and the suggested change is correct in context before touching anything.
- **Apply** when the finding is real and the fix is correct.
- **Push back** when the reviewer is wrong, the suggestion breaks something, or it contradicts an established invariant — and say why on the thread.
- **Defer** out-of-scope or speculative items to a follow-up issue rather than scope-creeping the PR.

Triage out the noise: deduplicate comments that flag the same line/issue (keep the most specific), and treat pure nitpicks (Nit/FYI) as optional. Concentrate effort on correctness, security, and contract-breaking findings first.

## 8. Reply to each thread

Communicate back on **every** actionable thread — what you changed, or why you won't. Replies go to the existing thread (so the conversation stays threaded) via the REST reply endpoint:

```
POST /repos/{owner}/{repo}/pulls/{pr}/comments/{comment_id}/replies
```

where `{comment_id}` is the **root** comment's `databaseId` from step 6. Where the fix is unambiguous, post a ` ```suggestion ` block so the reviewer (or a human) can accept it in one click; multi-line suggestions span the comment's `start_line`…`line` range. For batched feedback prefer a single pending review (`POST …/pulls/{pr}/reviews`) over one API call per comment, to fire one notification instead of many. Exact payloads and the suggestion-block format are in [`code-review-via-api.md`](./code-review-via-api.md).

For **AI reviewers specifically**, leaving a concrete reply on each actionable comment is what lets the next pass converge: the reviewer re-reads the thread, sees the change or the rebuttal, and either approves or narrows its remaining concerns instead of re-raising the same point.

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
4. `mergeStateStatus` is mergeable (not `BLOCKED`/`DIRTY`/`BEHIND` — rebase on base if `BEHIND`).

Then merge per repo policy:

```bash
gh pr merge "$PR" --squash --auto --delete-branch
```

`--auto` enables auto-merge so the PR merges the moment the gates clear (and joins a merge queue if the branch requires one); `--squash` collapses the convergence-loop commits into one (use `--merge`/`--rebase` per repo convention); `--delete-branch` cleans up local + remote.

### Poll cadence, backoff, and guards

The loop runs unattended, so bound it:

- **Cadence + backoff.** Poll review state on a fixed interval (e.g. 30–60s) with exponential backoff up to a cap (e.g. 5 min) while nothing changes; reset to the base interval when new activity (a new review, a new push) appears. CI is cheaper to watch directly with `gh pr checks --watch` than to poll by hand.
- **Max-iteration guard.** Cap total iterations (or wall-clock, e.g. 20 passes / 60 min). On hitting the cap, stop and hand off to the supervising engineer with the current `reviewDecision`, failing checks, and the list of still-unresolved threads — never spin forever.
- **Idempotency keyed on the head SHA.** Record which `(thread id, head SHA)` pairs you've already processed. On each pass, skip any thread you already handled at the **current** `headRefOid` and only act on threads that are new or whose head SHA changed. This is the core safeguard against reprocessing the same feedback twice when a poll fires before a reviewer re-runs. The real bot applies the same principle to reaction polling — it stores the last-seen verdict per reactor and diffs against it so re-observing an unchanged reaction emits no new event; the analog here is the last-processed head SHA per thread. Persist this map so a restarted run doesn't replay old feedback. Note: if appending fixes to a thread partially fails, it's safer to *not* mark it processed and risk a rare duplicate reply on the next pass than to mark it done and silently drop the unhandled part.

### What this adds over `pr-loop`

`pr-loop` does steps 5–8 and 11's approval poll. This runbook hardens it with: GraphQL **thread resolution** (step 9) so AI reviewers converge instead of re-flagging; **`reviewDecision` + required-check + unresolved-thread** gating (step 11) instead of a hand-counted approval tally; **validate-before-apply** (step 7) via `superpowers:receiving-code-review`; **head-SHA idempotency** so feedback is processed once per commit; and an explicit **max-iteration guard** with a clean handoff instead of an unbounded loop.
