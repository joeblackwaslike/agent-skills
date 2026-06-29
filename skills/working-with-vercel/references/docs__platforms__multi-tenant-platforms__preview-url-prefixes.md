---
title: Multi-tenant Preview URLs
product: vercel
url: /docs/platforms/multi-tenant-platforms/preview-url-prefixes
canonical_url: "https://vercel.com/docs/platforms/multi-tenant-platforms/preview-url-prefixes"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/multi-tenant-platforms
  - /docs/platforms
related:
  - /docs/deployments/preview-deployment-suffix
summary: Learn about multi-tenant preview urls on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/multi-tenant-platforms/preview-url-prefixes.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "68b80ebc231935359c34052c90f6f7fde5f66962c52cecc5b31e47992c641f5b"
---

# Multi-tenant Preview URLs

Multi-tenant preview URLs let you test tenant-specific experiences in preview deployments without configuring additional domains. Add any prefix before `---` in a preview URL, and Vercel routes the request to the same deployment while passing the full hostname to your code.

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

```ts filename="middleware.ts"
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSubdomain } from 'tldts';

export async function middleware(request: NextRequest) {
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
