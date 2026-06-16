# Vercel REST API — cross-cutting guide

Hand-written companion to the OpenAPI spec ([`openapi.yaml`](openapi.yaml)). The spec
is the source of truth for endpoints; this page covers the conventions that apply
across all of them.

## Base URL & versioning

- Base: `https://api.vercel.com`
- **Versioning is per-endpoint**, encoded in the path: `/v1/...`, `/v2/...`, `/v8/...`,
  `/v9/...`, `/v13/...`. There is no global API version. Always use the exact version
  segment shown for that operation in `openapi.yaml` — different resources sit at
  different versions, and the same resource can expose multiple versions.

## Authentication

Every request needs a bearer token:

```
Authorization: Bearer $VERCEL_TOKEN
```

- Create tokens on the account **Tokens** page (`/account/tokens`). Tokens are personal
  or team-scoped.
- The same token authenticates the `vercel` CLI (`VERCEL_TOKEN` env var).
- **Never hardcode tokens.** Read them from the environment; in CI use a secret.
- The OpenAPI spec models this as the `bearerToken` security scheme on each operation.

## Team scoping

Resources owned by a team require identifying the team on the request:

- `?teamId=team_xxxx` (preferred), or `?slug=<team-slug>`.
- Omitting it on a team-owned resource is the most common cause of unexpected `403`
  / `404` responses — the call resolves against your personal scope instead.

## Pagination

List endpoints paginate with a `limit` plus a timestamp cursor:

- Request: `?limit=<n>` and `?until=<ms-timestamp>` (and sometimes `?since=`).
- Response: a `pagination` object with `count`, `next`, and `prev` cursors. Follow
  `next` (a millisecond timestamp) via the `until` param until it's `null`.

## Errors & rate limits

- Errors return a JSON body `{ "error": { "code": "...", "message": "..." } }` with a
  standard HTTP status. See `docs__rest-api__errors.md` for the code catalog.
- Rate limits are communicated via `X-RateLimit-Limit` / `X-RateLimit-Remaining` /
  `X-RateLimit-Reset` response headers; a `429` means back off until the reset time.

## `@vercel/sdk` (TypeScript)

A typed client generated from the same OpenAPI spec — prefer it over hand-rolled
`fetch` for TS automation:

```ts
import { Vercel } from "@vercel/sdk";
const vercel = new Vercel({ bearerToken: process.env.VERCEL_TOKEN! });
const { deployments } = await vercel.deployments.getDeployments({ limit: 10 });
```

Pass `teamId`/`slug` per call (or configure a default). See `docs__rest-api__sdk.md`
for installation and the full surface.

## Finding an endpoint fast

```bash
# by operationId or path
grep -n 'operationId: createDeployment' openapi.yaml
grep -n '/v13/deployments' openapi.yaml
# then read the block: method, params, requestBody, responses
```
