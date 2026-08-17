---
title: Redirects
product: vercel
url: /docs/routing/redirects
canonical_url: "https://vercel.com/docs/routing/redirects"
last_updated: 2026-07-29
type: conceptual
prerequisites:
  - /docs/routing
related:
  - /docs/frameworks
  - /docs/routing/redirects/configuration-redirects
  - /docs/routing/redirects/bulk-redirects
  - /docs/routing-middleware
  - /docs/global-config
summary: "Learn how to use redirects on Vercel to instruct Vercel's platform to redirect incoming requests to a new URL."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "e10d94f54743053a32787055a6a5eb1f51b184c50c74b7865b13cf23d762b24b"
---

# Redirects

Redirects are rules that instruct Vercel to send users to a different URL than the one they requested. For example, if you rename a public route in your application, adding a redirect ensures there are no broken links for your users.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I increase the limit of redirects or use dynamic redirects on Vercel?](https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel?from=related) — Instructions on how to use Serverless Functions to handle redirects on Vercel.
- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy?from=related) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [Does Vercel support permanent redirects?](https://vercel.com/kb/guide/does-vercel-support-permanent-redirects?from=related) — Information on Vercel's support for permanent redirects.
- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects?from=related) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [Redirecting](https://nextjs.org/docs/pages/guides/redirecting?from=related) — Learn the different ways to handle redirects in Next.js.
- [redirects](https://nextjs.org/docs/pages/api-reference/config/next-config-js/redirects?from=related) — Add redirects to your Next.js app.
- [vercel redirects](https://vercel.com/docs/cli/redirects?from=related) — Learn how to manage project-level redirects using the vercel redirects CLI command.
- [Incremental Migration](https://vercel.com/docs/incremental-migration?from=related) — Learn how to migrate your app or website to Vercel with minimal risk and high impact.
- [Rewrites](https://vercel.com/docs/routing/rewrites?from=related) — Learn how to use rewrites to send users to different URLs without modifying the visible URL.
- [Overview](https://vercel.com/docs/cdn?from=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [vercel dev](https://vercel.com/docs/cli/dev?from=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/routing/redirects.graph.md](/docs/routing/redirects.graph.md)
<!-- /docsgraph:related -->

With redirects on Vercel, you can define HTTP redirects in your application's configuration, regardless of the [framework](/docs/frameworks) that you are using. Redirects are processed at the Edge across all regions.

## Use cases

- **Moving to a new domain:** Redirects help maintain a seamless user experience when moving a website to a new domain by ensuring that visitors and search engines are aware of the new location.
- **Replacing a removed page:** If a page has been moved, temporarily or permanently, you can use redirects to send users to a relevant new page, thus avoiding any negative impact on user experience.
- **Canonicalization of multiple URLs:** If your website can be accessed through several URLs (e.g., `acme.com/home`, `home.acme.com`, or `www.acme.com`), you can choose a canonical URL and use redirects to guide traffic from the other URLs to the chosen one.
- **Geolocation-based redirects:** Redirects can be configured to consider the source country of requests, enabling tailored experiences for users based on their geographic location.

We recommend using status code `307` or `308` to avoid the ambiguity of non `GET` methods, which is necessary when your application needs to redirect a public API.

## Implementing redirects

Review the table below to understand which redirect method best fits your use case:

| Redirect method                                                    | Use case                                                                                                                                       | Definition location               |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| [Configuration redirects](/docs/routing/redirects/configuration-redirects) | Support needed for wildcards, pattern matching, and geolocation-based rules.                                                                   | Framework config or `vercel.json` |
| [Bulk redirects](/docs/routing/redirects/bulk-redirects)                   | For large-scale migrations or maintaining extensive redirect lists. It supports many thousands of simple redirects and is performant at scale. | CSV, JSON, or JSONL files         |
| [Vercel Functions](#vercel-functions)                              | For complex custom redirect logic.                                                                                                             | Route files (code)                |
| [Middleware](#middleware)                                          | Dynamic redirects that need to update without redeploying.                                                                                     | Middleware file and Global Config   |
| [Domain redirects](#domain-redirects)                              | Domain-level redirects such as www to apex domain.                                                                                             | Dashboard (Domains section)       |
| [Firewall redirects](#firewall-redirects)                          | Emergency redirects that must execute before other redirects.                                                                                  | Firewall rules (dashboard)        |

### Vercel Functions

Use Vercel Functions to implement any redirect logic you need. This may not be optimal depending on the use case.

Any route can redirect requests like so:

```ts filename="pages/api/handler.ts" framework=nextjs
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Use 308 for a permanent redirect, 307 for a temporary redirect
  return response.redirect(307, '/new-route');
}
```

```js filename="pages/api/handler.js" framework=nextjs
export default function handler(request, response) {
  // Use 308 for a permanent redirect, 307 for a temporary redirect
  return response.redirect(307, '/new-route');
}
```

```ts filename="app/api/route.ts" framework=nextjs-app
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  redirect('https://nextjs.org/');
}
```

```js filename="app/api/route.js" framework=nextjs-app
import { redirect } from 'next/navigation';

export async function GET(request) {
  redirect('https://nextjs.org/');
}
```

```ts filename="src/routes/user/+layout.server.ts" framework=sveltekit
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
  if (!locals.user) {
    throw redirect(307, '/login');
  }
}) satisfies LayoutServerLoad;
```

```js filename="src/routes/user/+layout.server.js" framework=sveltekit
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
  if (!locals.user) {
    throw redirect(307, '/login');
  }
}
```

```ts filename="server/api/foo.get.ts" framework=nuxt
export default defineEventHandler((event) => {
  return sendRedirect(event, '/path/redirect/to', 307);
});
```

```js filename="server/api/foo.get.js" framework=nuxt
export default defineEventHandler((event) => {
  return sendRedirect(event, '/path/redirect/to', 307);
});
```

```ts filename="api/handler.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Use 308 for a permanent redirect, 307 for a temporary redirect
  return response.redirect(307, '/new-route');
}
```

```js filename="api/handler.js" framework=other
export default function handler(request, response) {
  // Use 308 for a permanent redirect, 307 for a temporary redirect
  return response.redirect(307, '/new-route');
}
```

### Middleware

For dynamic, critical redirects that need to run on every request, you can use [Middleware](/docs/routing-middleware) and [Global Config](/docs/global-config).

Redirects can be stored in a Global Config and instantly read from Middleware. This enables you to update redirect values without having to redeploy your website.

[Deploy a template](https://vercel.com/templates/next.js/maintenance-page) to get started.

### Domain Redirects

You can redirect a `www` subdomain to an apex domain, or other domain redirects, through the [Domains](/docs/domains/working-with-domains/deploying-and-redirecting#redirecting-domains) section of the dashboard.

### Firewall Redirects

In emergency situations, you can also define redirects using [Firewall rules](/docs/vercel-firewall/vercel-waf/examples#emergency-redirect) to redirect requests to a new page. Firewall redirects execute before CDN configuration redirects (e.g. `vercel.json` or `next.config.js`) are evaluated.

## Redirect status codes

- **307 Temporary Redirect**: Not cached by client, the method and body never changed. This type of redirect does not affect SEO and search engines will treat them as normal redirects.
- **302 Found**: Not cached by client, the method may or may not be changed to `GET`.
- **308 Permanent Redirect**: Cached by client, the method and body never changed. This type of redirect does not affect SEO and search engines will treat them as normal redirects.
- **301 Moved Permanently**: Cached by client, the method may or may not be changed to `GET`.

## Observing redirects

You can observe your redirect performance using Observability. The **Edge Requests** tab shows request counts and cache status for your redirected routes, helping you understand traffic patterns and validate that redirects are working as expected. You can filter by redirect location to analyze specific redirect paths.

Learn more in the [Observability Insights](/docs/observability/insights#edge-requests) documentation.

## Draining redirects

You can export redirect data by draining logs from your application. Redirect events appear in your runtime logs, allowing you to analyze redirect patterns, debug redirect chains, and track how users move through your site.

To get started, configure a [logs drain](/docs/drains/using-drains).

## Automatic URL normalization

Vercel's CDN automatically normalizes certain URL patterns and redirects with a `308` status code. These normalizations happen before your redirects, rewrites, or application code runs.

### Consecutive slashes

The CDN normalizes URLs containing consecutive slashes (e.g., `//`) to single slashes and redirects with a `308` status code.

For example:

- `/blog//post` redirects to `/blog/post`
- `//about` redirects to `/about`

### Case sensitivity

The CDN does **not** normalize URL paths to lowercase. URLs are case-sensitive, and requests are served exactly as specified.

For example, `/About` and `/about` are treated as different paths. If no content exists at the requested path with the given case, the CDN returns a `404` response.

## Best practices for implementing redirects

There are some best practices to keep in mind when implementing redirects in your application:

1. **Test thoroughly**: Test your redirects thoroughly to ensure they work as expected. Use a [preview deployment](/docs/deployments/environments#preview-environment-pre-production) to test redirects before deploying them to production
2. **Use relative paths**: Use relative paths in your `destination` field to avoid hardcoding your domain name
3. **Use permanent redirects**: Use [permanent redirects](#adding-redirects "Adding Redirects") for permanent URL changes and [temporary redirects](#adding-redirects "Adding Redirects") for temporary changes
4. **Use wildcards carefully**: Wildcards can be powerful but should be used with caution. For example, if you use a wildcard in a source rule that matches any URL path, you could inadvertently redirect all incoming requests to a single destination, effectively breaking your site.
5. **Prioritize HTTPS**: Use redirects to enforce HTTPS for all requests to your domain


---

[View full sitemap](/docs/sitemap)
