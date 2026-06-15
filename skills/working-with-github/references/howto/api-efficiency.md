# API Efficiency & Rate Limits

The playbook for staying fast and under the limits when hammering the GitHub API.

## The limits

### REST — primary

| Caller | Limit |
| --- | --- |
| Unauthenticated (by IP) | 60 req/hr |
| Authenticated user / PAT / OAuth | 5,000 req/hr |
| GitHub App installation | 5,000 req/hr, scaling up with repos+users (≈50/hr per repo over 20, per user over 20) to a max of 12,500/hr; **15,000/hr** for installations on GitHub Enterprise Cloud orgs |
| `GITHUB_TOKEN` in Actions | 1,000 req/hr per repo (15,000/hr per repo against an enterprise's resources) |

`search/*` endpoints have their own much lower limit (≈30 req/min) — don't lump search into your main budget. Git LFS gets a separate bucket too.

### GraphQL — primary (separate bucket: points, not requests)

GraphQL has its **own 5,000 *points*/hr** limit (10,000 for GHEC-owned apps), completely separate from your REST 5,000. A simple query costs the minimum **1 point**; complex multi-connection queries cost more.

**Node-cost formula:** sum the requests needed to fulfill each connection (assume every connection hits its `first`/`last` limit), divide by 100, round to nearest whole number (minimum 1). So a query touching 100 repos × 50 issues × 60 labels = 5,101 underlying requests ≈ **51 points**. Check it directly:

```bash
gh api graphql -f query='{ viewer { login } rateLimit { cost remaining resetAt } }'
```

Also enforced on GraphQL: connections **must** specify `first`/`last` (1–100), and a single call can't request more than 500,000 total nodes.

### Secondary rate limits (trip independently of the primary budget)

These catch abusive *patterns*, not raw counts:

- **Too many concurrent requests** — keep concurrency low (single-digit).
- **Too many points per minute** — even within your hourly budget, bursting trips this.
- **Content creation** — rapid issue/comment/PR creation. Pause **≥1s between mutating requests** and avoid concurrency on writes.

There's no header to read your secondary-limit status; you only learn by getting blocked. Calling `/rate_limit` *can* count against the secondary limit even though it's free against the primary.

## Reading the headers

Every response carries:

| Header | Meaning |
| --- | --- |
| `x-ratelimit-limit` | Max requests (REST) / points (GraphQL) per window |
| `x-ratelimit-remaining` | What's left this window |
| `x-ratelimit-used` | What you've spent |
| `x-ratelimit-reset` | Window reset, **UTC epoch seconds** |
| `x-ratelimit-resource` | Which bucket it hit (`core`, `search`, `graphql`, …) |
| `retry-after` | On a secondary-limit `403`/`429`: seconds to wait |

```bash
gh api -i repos/OWNER/REPO | grep -i ratelimit
```

**Exceeding it:** REST returns `403` or `429` with `remaining: 0`. GraphQL is sneakier — it returns **`200`** with an error body and `remaining: 0`. In both cases, do not retry before `x-ratelimit-reset`. On a *secondary* limit, honor `retry-after` if present, else wait ≥60s, then back off exponentially.

## The free check: `/rate_limit`

```bash
gh api rate_limit --jq '.resources'
```

Querying this endpoint **does not count against your primary limit** (though it can count against the secondary one). Prefer reading the response headers from real requests over polling this.

## Conditional requests — 304s are free

The single biggest win for **polling**: send the ETag you got last time. If nothing changed, GitHub returns `304 Not Modified` and **it does not count against your rate limit**.

```bash
# First call: capture the ETag
ETAG=$(gh api -i repos/OWNER/REPO/issues | awk -F': ' '/^etag/{print $2}' | tr -d '\r')

# Subsequent polls: 304 (free) if unchanged
gh api repos/OWNER/REPO/issues -H "If-None-Match: $ETAG"
```

`If-Modified-Since: <HTTP-date>` works the same way for endpoints that support it (also yields a free `304`). Build your poller around ETags and you can watch a resource far more often than 5,000/hr would otherwise allow.

## Pagination done right

REST defaults to 30 items/page. Always bump it and follow `Link`:

```bash
# Max page size + auto-follow rel="next" until exhausted
gh api --paginate "repos/OWNER/REPO/issues?per_page=100" --jq '.[].number'

# Aggregate paginated arrays/objects into one JSON value
gh api --paginate --slurp "repos/OWNER/REPO/issues?per_page=100"
```

Manually, parse the `Link` header's `rel="next"` URL and loop until it's gone. Don't compute page numbers yourself — follow the links.

**GraphQL uses cursors**, not page numbers — page via `pageInfo`:

```bash
gh api graphql --paginate -f query='
query($owner:String!, $repo:String!, $cursor:String) {
  repository(owner:$owner, name:$repo) {
    issues(first: 100, after: $cursor) {
      nodes { number title }
      pageInfo { hasNextPage endCursor }
    }
  }
}' -F owner=OWNER -F repo=REPO'
```

`gh api graphql --paginate` auto-follows cursors **only if** your query includes a `pageInfo { hasNextPage endCursor }` block and accepts an `$cursor: String` variable — wire those up and it walks every page for you.

## Practical tips

- **Collapse N REST calls into 1 GraphQL query** when fetching related data — the biggest efficiency lever you have (see `rest-vs-graphql.md`).
- **Batch** with GraphQL `nodes(ids: [...])` instead of looping REST `GET`s.
- **Cache** read-only responses: `gh api --cache 1h repos/OWNER/REPO`. Combine with ETags for polling.
- **Back off exponentially** on `403`/`429`; honor `retry-after` / `x-ratelimit-reset`. Continuing to hammer while limited can get your integration banned.
- **Use a GitHub App** instead of a PAT for automation — higher and scaling limits (and 15,000/hr on GHEC orgs).
- **Don't poll — use webhooks** where you can. For unavoidable polling, ETags make it cheap.
- **Pin the REST version**: `gh api -H "X-GitHub-Api-Version: 2022-11-28" ...`.
- **Keep search separate and slow** — its limit is ~30/min, an order of magnitude tighter than core.
