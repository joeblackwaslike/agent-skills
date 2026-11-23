---
title: Enabling Cross-Origin Isolation
product: vercel
url: /docs/cdn-security/cross-origin-isolation
canonical_url: "https://vercel.com/docs/cdn-security/cross-origin-isolation"
last_updated: 2026-11-17
type: how-to
prerequisites:
  - /docs/cdn-security
related:
  - /docs/project-configuration/vercel-json
summary: Fix the SharedArrayBuffer is not defined error on Vercel by enabling cross-origin isolation with the COOP and COEP response headers.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cdn-security/cross-origin-isolation.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "c459f4db88eec1916415ebcc165ac8694b2b413022ae4ef181e30643d040a94c"
---

# Enabling Cross-Origin Isolation

Browsers only make `SharedArrayBuffer` available to pages that are cross-origin isolated. On a page that isn't isolated, code that depends on it, such as WebAssembly modules that use threads, fails with `ReferenceError: SharedArrayBuffer is not defined`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to enable CORS on Vercel](https://vercel.com/kb/guide/how-to-enable-cors) — Learn how to enable CORS on Vercel with vercel.json, Routing Middleware, framework config, and route handlers, plus how
- [Troubleshooting Cross-Origin Errors \\(net::ERR_BLOCKED_BY_ORB\\) with Deployment Protection](https://vercel.com/kb/guide/troubleshooting-cross-origin-errors-neterr-blocked-by-orb-with-deployment-protection) — Learn to resolve \\`net::ERR_BLOCKED_BY_ORB\\` errors on protected Vercel deployments. This guide explains how cross-origi
- [Security](https://vercel.com/docs/vercel-blob/security) — Learn how your Vercel Blob store is secured
- [Enable or disable Vercel CI for a connected repository](https://vercel.com/docs/rest-api/vercel-ci/enable-or-disable-vercel-ci-for-a-connected-repository) — PATCH /v1/vercel-ci/repository-settings — Update Repository Settings
- [Reverse Proxy Servers and Vercel](https://vercel.com/docs/security/reverse-proxy) — Learn why reverse proxy servers are not recommended with Vercel's firewall.
- [How Vercel CDN Works](https://vercel.com/docs/how-vercel-cdn-works) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption) — Learn how Vercel encrypts data in transit and at rest.

Full cross-link map for this page: [/docs/cdn-security/cross-origin-isolation.graph.md](/docs/cdn-security/cross-origin-isolation.graph.md)
<!-- /docsgraph:related -->

To make a page cross-origin isolated, send these two response headers with the HTML document:

| Header | Value | Effect |
| --- | --- | --- |
| `Cross-Origin-Opener-Policy` | `same-origin` | Separates the document from cross-origin windows, including popups that it opens |
| `Cross-Origin-Embedder-Policy` | `require-corp` | Blocks cross-origin resources unless they opt in with a `Cross-Origin-Resource-Policy` header or load through CORS |

## Set the cross-origin isolation headers

Set both headers in your project configuration. With [`vercel.json`](/docs/project-configuration/vercel-json#headers), this example applies them to every path:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
        { "key": "Cross-Origin-Embedder-Policy", "value": "require-corp" }
      ]
    }
  ]
}
```

With Next.js, set the same headers in `next.config.ts`:

```ts filename="next.config.ts"
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

After you deploy, open the page, and run `self.crossOriginIsolated` in the browser console. The page is cross-origin isolated when the value is `true`.

## What cross-origin isolation changes

Cross-origin isolation restricts how a page works with other origins, so check these before you enable it in production:

- **Cross-origin resources**: The browser blocks images, scripts, and stylesheets from other origins unless the resource sends `Cross-Origin-Resource-Policy: cross-origin` or you load it with CORS, for example with the `crossorigin` attribute.
- **Iframes**: The browser blocks a document in an iframe unless that document sends its own `Cross-Origin-Embedder-Policy: require-corp` header, even when it comes from your origin. A document from another origin must also send `Cross-Origin-Resource-Policy: cross-origin`.
- **Popups**: The page can't communicate with cross-origin windows that it opens. Sign-in and payment flows that pass results back through a popup stop working.

To limit the effect, narrow `source` to the routes that need `SharedArrayBuffer`. To find resources that isolation would block before you enforce it, send `Cross-Origin-Opener-Policy-Report-Only` and `Cross-Origin-Embedder-Policy-Report-Only` first. For the full procedure, see the [guide to enabling cross-origin isolation](https://web.dev/articles/cross-origin-isolation-guide).

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
