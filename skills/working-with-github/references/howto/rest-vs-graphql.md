# REST vs GraphQL on GitHub

Both APIs cover most of GitHub. The right choice is per-task, not per-project — `gh api` speaks both, so you can mix them freely in the same script.

## Decision rule

Reach for **REST** when:

- You're doing a simple single-resource operation (get a repo, create an issue, close a PR).
- You need an endpoint that only exists in REST. REST has broader coverage — Actions, Pages, repo contents/file uploads, LFS, migrations, admin endpoints, and most "write" operations are REST-first.
- You're uploading binary content (release assets, file contents). GraphQL can't do binary uploads.
- You want the simplest possible auth/debugging story: predictable URLs, `curl`-able, status codes that mean what they say, and request/response shapes you can eyeball.

Reach for **GraphQL** when:

- You need nested/related data in **one round-trip** (a PR plus its reviews plus those reviews' comments plus each author).
- You want to **avoid over-fetching** — pull exactly the fields you need and nothing else, which also keeps your point cost down (see `api-efficiency.md`).
- You're walking a graph (issue → linked PRs → commits → checks) that would otherwise be a fan-out of REST calls.

Rule of thumb: **writes and uploads → REST; wide reads of related data → GraphQL.**

## The contrast: a PR with its reviews, review comments, and author

### REST — N calls

```bash
# 1. The PR itself (author is embedded here)
gh api repos/OWNER/REPO/pulls/42

# 2. Its reviews
gh api repos/OWNER/REPO/pulls/42/reviews

# 3. Review comments (one call per review, or the PR-wide comments endpoint)
gh api repos/OWNER/REPO/pulls/42/comments
```

Three+ requests, three round-trips, and you over-fetch every field of every object whether you wanted it or not. If you needed each reviewer's name, that's potentially more calls.

### GraphQL — 1 call, exactly the fields you want

```bash
gh api graphql -f query='
query($owner:String!, $repo:String!, $num:Int!) {
  repository(owner:$owner, name:$repo) {
    pullRequest(number:$num) {
      title
      author { login }
      reviews(first: 50) {
        nodes {
          state
          author { login }
          comments(first: 50) {
            nodes { body path author { login } }
          }
        }
      }
    }
  }
}' -F owner=OWNER -F repo=REPO -F num=42
```

One request, no over-fetch. Note `-f` passes string params (and the query), `-F` passes typed params (numbers/booleans get coerced) — `num=42` becomes an `Int`.

## Versioning model — they differ

- **REST is versioned** via the `X-GitHub-Api-Version` header (date-based, e.g. `2022-11-28`). Pin it so a future breaking version can't surprise you. Requests without the header fall back to the current default.

  ```bash
  gh api -H "X-GitHub-Api-Version: 2022-11-28" repos/OWNER/REPO
  ```

- **GraphQL is a single, continuously evolving schema** — no version header. Breaking changes are managed via deprecation, not versions. You can introspect it:
  - The public schema is published (downloadable) and you can introspect at runtime.
  - Add `__typename` to any selection to learn the concrete type of a node.
  - The `__schema` / `__type` introspection queries enumerate types and fields.

  ```bash
  gh api graphql -f query='{ __schema { queryType { name } } }'
  ```

## Global node IDs — the bridge between the two

Every GraphQL object has a global `id` (an opaque node ID). REST objects also expose a `node_id`. That ID is the handle you use to:

- Fetch any object directly in GraphQL via the `node(id:)` / `nodes(ids:)` root fields.
- Cross over from a REST response into GraphQL: grab `node_id` from REST, then resolve it in GraphQL.

```bash
# REST gives you node_id
gh api repos/OWNER/REPO/issues/7 --jq .node_id
# -> "I_kwDOABCDEF..."

# GraphQL resolves it (and you can fragment on the concrete type)
gh api graphql -f query='
query($id:ID!) {
  node(id:$id) {
    __typename
    ... on Issue { title state }
  }
}' -F id=I_kwDOABCDEF...
```

This is how you "switch" mid-workflow: do a broad REST listing, then batch-resolve the interesting nodes in a single GraphQL `nodes(ids: [...])` call instead of N REST follow-ups.

## Both run through `gh api`

```bash
gh api repos/OWNER/REPO/pulls            # REST
gh api graphql -f query='{ viewer { login } }'   # GraphQL
```

Same auth (your `gh` token), same `--jq`, `--paginate`, `--template` flags. There's no reason to bolt on a separate HTTP client for one-off scripting.
