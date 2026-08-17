---
title: Bulk Redirects
product: vercel
url: /docs/routing/redirects/bulk-redirects
canonical_url: "https://vercel.com/docs/routing/redirects/bulk-redirects"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/routing/redirects
  - /docs/routing
related:
  - /docs/routing/redirects/bulk-redirects/getting-started
  - /docs/project-configuration/vercel-json
summary: Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects/bulk-redirects.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1a9f48d72819e845789defcb45621304484d2f73bbc28aeba8c71de364cf5918"
---

# Bulk Redirects

> **🔒 Permissions Required**: Bulk Redirects


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects?from=related) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [How can I increase the limit of redirects or use dynamic redirects on Vercel?](https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel?from=related) — Instructions on how to use Serverless Functions to handle redirects on Vercel.
- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy?from=related) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [Configuration Redirects](https://vercel.com/docs/routing/redirects/configuration-redirects?from=related) — Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern
- [Manage Redirects at Scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale?from=related) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [Delete project-level redirects.](https://vercel.com/docs/rest-api/bulk-redirects/delete-project-level-redirects?from=related)
- [Gets project-level redirects.](https://vercel.com/docs/rest-api/bulk-redirects/gets-project-level-redirects?from=related)
- [vercel redirects](https://vercel.com/docs/cli/redirects?from=related) — Learn how to manage project-level redirects using the vercel redirects CLI command.

Full cross-link map for this page: [/docs/routing/redirects/bulk-redirects.graph.md](/docs/routing/redirects/bulk-redirects.graph.md)
<!-- /docsgraph:related -->

With bulk redirects, you can handle thousands of simple path-to-path or path-to-URL redirects efficiently. You can configure bulk redirects at deployment time through files in your repository, or at runtime through the dashboard, API, or CLI. They are framework agnostic and Vercel processes them before any other route specified in your deployment.

Use bulk redirects when you have thousands of redirects that do not require wildcard or header matching functionality.

## Using bulk redirects

You can configure bulk redirects at deployment time through source control, or update them at runtime through the dashboard, API, or CLI. Use deployment-time redirects when you want redirects versioned with your code, or runtime redirects when you need to change them without redeploying.

Runtime changes are saved to a staging version first and only take effect once you publish or promote that version to production.

| Method          | Configuration                        | When changes apply                | Best for                            |
| --------------- | ------------------------------------ | --------------------------------- | ----------------------------------- |
| Deployment time | `bulkRedirectsPath` in `vercel.json` | On deploy                         | Redirects managed in source control |
| Runtime         | Dashboard, API, or CLI               | After publishing/promoting        | Updates that should not redeploy    |

Visit [Getting Started](/docs/routing/redirects/bulk-redirects/getting-started) to create bulk redirects [with deployments](/docs/routing/redirects/bulk-redirects/getting-started#deployment-time-redirects) or in the [dashboard, API, or CLI](/docs/routing/redirects/bulk-redirects/getting-started#project-redirects).

## Available fields

Each redirect supports the following fields:

| Field                 | Type      | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------------- | --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`              | `string`  | Yes      | `N/A`   | An absolute path or fully qualified URL that matches each incoming request (excluding query string). Max 2048 characters.Example: `/old-marketing-page` or `https://old-domain.com/page`                                                                                                                                                                                                                                                |
| `destination`         | `string`  | Yes      | `N/A`   | A location destination defined as an absolute pathname or external URL. Max 2048 characters.Example `/new-marketing-page`                                                                                                                                                                                                                                                                                                               |
| `permanent`           | `boolean` | No       | `false  | Toggle between permanent ([308](https://developer.mozilla.org/docs/Web/HTTP/Status/308)) and temporary ([307](https://developer.mozilla.org/docs/Web/HTTP/Status/307)) redirect.                                                                                                                                                                                                                                                                  |
| `statusCode`         |`integer`| No       |`307`  | Specify the exact status code. Can be [301](https://developer.mozilla.org/docs/Web/HTTP/Status/301), [302](https://developer.mozilla.org/docs/Web/HTTP/Status/302), [303](https://developer.mozilla.org/docs/Web/HTTP/Status/303), [307](https://developer.mozilla.org/docs/Web/HTTP/Status/307), or [308](https://developer.mozilla.org/docs/Web/HTTP/Status/308). Overrides permanent when set, otherwise defers to permanent value or default. |
|`caseSensitive`      |`boolean`| No       |`false`| Toggle whether source path matching is case sensitive.                                                                                                                                                                                                                                                                                                                                                                                            |
|`preserveQueryParams`|`boolean`| No       |`false\` | Toggle whether to preserve the query string on the redirect.                                                                                                                                                                                                                                                                                                                                                                                      |

In order to improve space efficiency, all boolean values can be the single characters `t` (true) or `f` (false).

We recommend using status code `307` or `308` to avoid the ambiguity of non `GET` methods, which is necessary when your application needs to redirect a public API.

For complete configuration details and advanced options, see the [`bulkRedirectsPath` configuration reference](/docs/project-configuration/vercel-json#bulkredirectspath).

## Limits and pricing

Each project has a free configurable capacity of bulk redirects, and additional bulk redirect capacity can be purchased in groups of 25,000 redirects by going to the [Advanced section of your project's settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fadvanced\&title=Go+to+Project+Settings+Advanced). At runtime, requests served by bulk redirects are treated like any other request for billing purposes. For more information, see the [pricing page](https://vercel.com/pricing).

| Plan | Included in plan | Price for additional capacity |
| --- | --- | --- |
| Pro | 1,000 | $0.002/month per additional 25,000 |
| Enterprise | 10,000 | $0.002/month per additional 25,000 |


- Bulk redirects do not support wildcard or header matching
- Bulk redirects do not work locally while using `vercel dev`
- A maximum of 1,000,000 bulk redirects can be configured per project.


---

[View full sitemap](/docs/sitemap)
