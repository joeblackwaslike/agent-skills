---
title: Multi-tenant Preview URLs
product: vercel
url: /docs/platforms/multi-tenant-platforms/preview-url-prefixes
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/preview-url-prefixes"
last_updated: 2026-07-28
type: how-to
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/deployments/preview-deployment-suffix
summary: Test tenant-specific experiences in preview deployments using dynamic URL prefixes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/preview-url-prefixes.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4a950e8ef46f3e63747743fed99b2f584b8e25c04fee269e78fd74dd72ca93ca"
---

# Multi-tenant Preview URLs

Multi-tenant preview URLs let you test tenant-specific experiences in preview deployments without configuring additional domains. Add any prefix before `---` in a preview URL, and Vercel routes the request to the same deployment while passing the full hostname to your code.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Can I use Preview Deployment Suffix without switching to Vercel Nameservers?](https://vercel.com/kb/guide/preview-deployment-suffix-without-vercel-nameservers?from=related) — Information on how to use Preview Deployment Suffix without Vercel Nameservers
- [Why do my Vercel deployments have multiple domains?](https://vercel.com/kb/guide/why-do-my-vercel-deployments-have-multiple-domains?from=related) — Learn about why Vercel auto generates URLs for your deployments.
- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [Preview Deployment Suffix](https://vercel.com/docs/deployments/preview-deployment-suffix?from=related) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
- [Proxy and Routing](https://vercel.com/docs/platforms/multi-tenant-platforms/middleware-and-routing?from=related) — Resolve tenants and route requests by subdomain, custom domain, or path using Next.js Proxy on Vercel.
- [Reference](https://vercel.com/docs/platforms/multi-tenant-platforms/reference?from=related) — Reference for the Vercel domain API, error codes, troubleshooting, and FAQ for multi-tenant platforms.
- [Concepts](https://vercel.com/docs/platforms/multi-tenant-platforms/concepts?from=related) — Understand tenants, domains, routing, and architecture for building multi-tenant applications on Vercel for Platforms.
- [Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart?from=related) — Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.

Full cross-link map for this page: [/docs/platforms/multi-tenant-platforms/preview-url-prefixes.graph.md](/docs/platforms/multi-tenant-platforms/preview-url-prefixes.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** This feature requires a [custom preview
> suffix](/docs/deployments/preview-deployment-suffix). It does not work with
> the default `.vercel.app` suffix.

## The problem

Standard preview URLs like `my-app-git-feature.vercel.dev` work well for single-tenant applications, but multi-tenant apps need to test changes for each tenant separately.

Without tenant-aware previews, you would need to:

- Manually switch tenant context in your application
- Deploy separate preview environments per tenant
- Manually assign domains to each preview deployment

## The solution

You can add any **dynamic prefix** before `---` in your preview URL:

```
{prefix}---{preview-url}
```

Vercel routes the request to the same deployment as `{preview-url}`, but your code receives the full hostname including the prefix. This lets you extract the prefix and handle tenant routing however you want.

**Examples**:

| URL                                      | Routes to                       | Your code receives                             |
| ---------------------------------------- | ------------------------------- | ---------------------------------------------- |
| `acme---preview-xyz.vercel.dev`          | `preview-xyz.vercel.dev`        | `host: acme---preview-xyz.vercel.dev`          |
| `globex---my-app-git-feature.vercel.dev` | `my-app-git-feature.vercel.dev` | `host: globex---my-app-git-feature.vercel.dev` |
| `tenant-123---my-app-abc123.vercel.dev`  | `my-app-abc123.vercel.dev`      | `host: tenant-123---my-app-abc123.vercel.dev`  |

## How it works

1. User visits `{tenant}---{preview-url}`
2. Vercel routes the request to the deployment at `{preview-url}`
3. Your code receives the full hostname: `{tenant}---{preview-url}`
4. Your code extracts the prefix and handles routing

The prefix can be anything, such as a tenant ID, workspace name, feature flag, or anything else your application needs.

## Reference implementation

Below is a reference implementation of extracting a tenant prefix from the hostname and routing to the `/[domain]/page.tsx` path.

> **💡 Note:** Next.js renamed the `middleware` file convention to `proxy` in Next.js 16.
> This example uses `proxy.ts`. On Next.js 15 and earlier, use `middleware.ts`
> with an exported `middleware` function instead.

```ts filename="proxy.ts"
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSubdomain } from 'tldts';

export async function proxy(request: NextRequest) {
  const hostname = request.headers.get('host') || request.nextUrl.hostname;
  const subdomain = getSubdomain(hostname) || '';
  const [tenantPart] = subdomain.includes('---') ? subdomain.split('---') : [];

  if (!tenantPart) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  // Rewrite to tenant-prefixed path
  url.pathname = `/${tenantPart}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

> **💡 Note:** Checkout multi-tenant preview URLs in action with this
> [demo](https://multi-tenant-preview-urls-k6oodlv4w.vercel.rocks/all).

## Limitations

- Preview URL prefixes only work with custom deployment URL suffixes, not the default `.vercel.app`
- The prefix must appear before `---` in the preview URL path
- Total hostname length must not exceed DNS limits (253 characters)


---

[View full sitemap](/docs/sitemap)
