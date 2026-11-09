---
title: Bulk Redirects
product: vercel
url: /docs/routing/redirects/bulk-redirects
canonical_url: "https://vercel.com/docs/routing/redirects/bulk-redirects"
last_updated: 2026-09-21
type: reference
prerequisites:
  - /docs/routing/redirects
  - /docs/routing
related:
  - /docs/cli/dev
  - /docs/routing/redirects/bulk-redirects/getting-started
  - /docs/project-configuration/vercel-json
  - /docs/functions
  - /docs/routing/redirects/configuration-redirects
summary: Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects/bulk-redirects.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "27fe8bba0f949c5d1c7028836167a4eea3335c7557659e0056487f0ac937aca5"
---

# Bulk Redirects

> Bulk Redirects are available on Enterprise and Pro plans

With bulk redirects, you can handle thousands of simple path-to-path or path-to-URL redirects efficiently. You can configure bulk redirects at deployment time through files in your repository, or at runtime through the dashboard, API, or CLI. They are framework agnostic and Vercel processes them before any other route specified in your deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Bulk redirects are now generally available](https://vercel.com/changelog/bulk-redirects-are-now-generally-available)
- [Bulk redirects UI, API, and CLI now generally available](https://vercel.com/changelog/bulk-redirects-ui-api-and-cli-now-generally-available)
- [Scaling redirects to infinity on Vercel](https://vercel.com/blog/scaling-redirects-to-infinity-on-vercel)
- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [Managing redirects at scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [Gets project-level redirects.](https://vercel.com/docs/rest-api/bulk-redirects/gets-project-level-redirects) — GET /v1/bulk-redirects — Get the version history for a project's bulk redirects
- [Edit a project-level redirect.](https://vercel.com/docs/rest-api/bulk-redirects/edit-a-project-level-redirect) — PATCH /v1/bulk-redirects — Edits a single redirect identified by its source path. Stages a new change with the modified
- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects) — Use list_bulk_redirects with Vercel MCP.
- [Stages new redirects for a project.](https://vercel.com/docs/rest-api/bulk-redirects/stages-new-redirects-for-a-project) — PUT /v1/bulk-redirects — Stages new redirects for a project and returns the new version.

Full cross-link map for this page: [/docs/routing/redirects/bulk-redirects.graph.md](/docs/routing/redirects/bulk-redirects.graph.md)
<!-- /docsgraph:related -->

Use bulk redirects when you have thousands of redirects that do not require wildcard or header matching functionality.

## Using bulk redirects

You can configure bulk redirects at deployment time through source control, or update them at runtime through the dashboard, API, or CLI. Use deployment-time redirects when you want redirects versioned with your code, or runtime redirects when you need to change them without redeploying.

Runtime changes are saved to a staging version first and only take effect once you publish or promote that version to production.

You can test bulk redirects locally with [`vercel dev`](/docs/cli/dev) when you configure `bulkRedirectsPath` in `vercel.json`.

| Method          | Configuration                        | When changes apply                | Best for                            |
| --------------- | ------------------------------------ | --------------------------------- | ----------------------------------- |
| Deployment time | `bulkRedirectsPath` in `vercel.json` | On deploy                         | Redirects managed in source control |
| Runtime         | Dashboard, API, or CLI               | After publishing/promoting        | Updates that should not redeploy    |

Visit [Getting Started](/docs/routing/redirects/bulk-redirects/getting-started) to create bulk redirects [with deployments](/docs/routing/redirects/bulk-redirects/getting-started#deployment-time-redirects) or in the [dashboard, API, or CLI](/docs/routing/redirects/bulk-redirects/getting-started#project-redirects).

## Available fields

Each redirect supports the following fields:

| Field                 | Type      | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`              | `string`  | Yes      | `N/A`   | An absolute path or fully qualified URL that matches each incoming request, excluding the query string. The `source` field does not support query parameters. Vercel ignores any query parameters you include in `source`. Max 2048 characters.<br /><br />Example: `/old-marketing-page` or `https://old-domain.com/page`                                                                                                                                                                                                                                                |
| `destination`         | `string`  | Yes      | `N/A`   | A location destination defined as an absolute pathname or external URL. Max 2048 characters.<br /><br />Example `/new-marketing-page`                                                                                                                                                                                                                                                                                                               |
| `permanent`           | `boolean` | No       | `false` | Toggle between permanent ([308](https://developer.mozilla.org/docs/Web/HTTP/Status/308)) and temporary ([307](https://developer.mozilla.org/docs/Web/HTTP/Status/307)) redirect.                                                                                                                                                                                                                                                                  |
| `statusCode`          | `integer` | No       | `307`   | Specify the exact status code. Can be [301](https://developer.mozilla.org/docs/Web/HTTP/Status/301), [302](https://developer.mozilla.org/docs/Web/HTTP/Status/302), [303](https://developer.mozilla.org/docs/Web/HTTP/Status/303), [307](https://developer.mozilla.org/docs/Web/HTTP/Status/307), or [308](https://developer.mozilla.org/docs/Web/HTTP/Status/308). Overrides permanent when set, otherwise defers to permanent value or default. |
| `caseSensitive`       | `boolean` | No       | `false` | Toggle whether source path matching is case sensitive.                                                                                                                                                                                                                                                                                                                                                                                            |
| `preserveQueryParams` | `boolean` | No       | `false` | Toggle whether to preserve the query string on the redirect.                                                                                                                                                                                                                                                                                                                                                                                      |

To improve space efficiency, all boolean values can be the single characters `t` (true) or `f` (false).

We recommend using status code `307` or `308` to avoid the ambiguity of non `GET` methods, which is necessary when your application needs to redirect a public API.

For complete configuration details and advanced options, see the [`bulkRedirectsPath` configuration reference](/docs/project-configuration/vercel-json#bulkredirectspath).

## Redirects from a function

If you're on the Hobby plan, or your redirects need logic that bulk redirects don't support, handle them in a [Vercel Function](/docs/functions). A function can read redirect rules from any source, such as a file, a database, or an API, and has no limit on the number of rules. Keep rules that need wildcards or header matching in [configuration redirects](/docs/routing/redirects/configuration-redirects), and send the remaining paths to the function as a fallback.

First, rewrite the paths the function handles. This rule sends every request under `/campaign/` to the function and passes the rest of the path as the `slug` query parameter:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/campaign/:slug*", "destination": "/api/redirects?slug=:slug*" }
  ]
}
```

Then create the function. It looks up the slug, returns a `308` redirect when it finds a match, and returns a `404` otherwise:

**api/redirects.ts**

```ts filename="api/redirects.ts" framework=other
const redirects = new Map<string, string>([
  ['spring', '/sale'],
  ['summer/2026', '/sale/summer'],
]);

export function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get('slug') ?? '';
  const destination = redirects.get(slug);

  if (!destination) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(null, {
    status: 308,
    headers: {
      Location: destination,
      'Cache-Control': 's-maxage=600',
    },
  });
}
```

**api/redirects.js**

```js filename="api/redirects.js" framework=other
const redirects = new Map([
  ['spring', '/sale'],
  ['summer/2026', '/sale/summer'],
]);

export function GET(request) {
  const slug = new URL(request.url).searchParams.get('slug') ?? '';
  const destination = redirects.get(slug);

  if (!destination) {
    return new Response('Not found', { status: 404 });
  }

  return new Response(null, {
    status: 308,
    headers: {
      Location: destination,
      'Cache-Control': 's-maxage=600',
    },
  });
}
```

A request to `/campaign/spring` now redirects to `/sale`. The `Cache-Control` header lets Vercel's [CDN cache](/docs/caching/cdn-cache) the redirect for 10 minutes, so repeat requests for the same path don't invoke the function. For a Next.js version that splits redirects between `next.config.js` and a catch-all route handler, see the [redirect with fallback example](https://github.com/vercel/examples/tree/main/app-directory/redirect-with-fallback).

## Limits and pricing

Bulk redirects are available on the [Pro and Enterprise plans](/docs/plans). They are not available on the Hobby plan.

Each project includes bulk redirect capacity based on your plan, shown in the table below, and additional bulk redirect capacity can be purchased in groups of 25,000 redirects by going to the [Advanced section of your project's settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fadvanced\&title=Go+to+Project+Settings+Advanced). At runtime, requests served by bulk redirects are treated like any other request for billing purposes. For more information, see the [pricing page](https://vercel.com/pricing).

| Plan | Included in plan | Price for additional capacity |
| --- | --- | --- |
| Pro | 1,000 | $0.002/month per additional 25,000 |
| Enterprise | 10,000 | $0.002/month per additional 25,000 |


- Bulk redirects do not support wildcard or header matching
- A maximum of 1,000,000 bulk redirects can be configured per project.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
