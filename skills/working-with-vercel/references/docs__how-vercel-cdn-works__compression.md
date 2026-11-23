---
title: Vercel CDN Compression
product: vercel
url: /docs/how-vercel-cdn-works/compression
canonical_url: "https://vercel.com/docs/how-vercel-cdn-works/compression"
last_updated: 2026-03-05
type: conceptual
prerequisites:
  - /docs/how-vercel-cdn-works
related:
  - /docs/image-optimization
summary: Vercel helps reduce data transfer and improve performance by supporting both Gzip and Brotli compression
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/how-vercel-cdn-works/compression.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "76ca8521c6de94f49a99806937ff69e71e5c0f37a23c00aa5aa49cce210abb61"
---

# Vercel CDN Compression

Vercel helps reduce data transfer and improve performance by supporting both Gzip and Brotli compression. These algorithms are widely used to compress files, such as HTML, CSS, and JavaScript, to reduce their size and improve performance.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Pricing](https://vercel.com/pricing) — Choose a Vercel plan and compare features and usage pricing.
- [How to troubleshoot stale content returned from the Vercel CDN when using an external proxy or CDN](https://vercel.com/kb/guide/how-to-troubleshoot-stale-content-returned-from-the-edge-network-when-using-an-external-proxy-or-cdn) — Learn how to diagnose and fix stale content issues when using external proxies or CDNs with Vercel. Understand troublesh
- [Vercel CDN overview](https://vercel.com/docs/cdn) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [CDN security](https://vercel.com/docs/cdn-security) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [CDN pricing and usage](https://vercel.com/docs/manage-cdn-usage) — Understand CDN pricing resources, monitor usage from your dashboard, and optimize Fast Data Transfer, Fast Origin Transf
- [Encryption and TLS](https://vercel.com/docs/cdn-security/encryption) — Learn how Vercel encrypts data in transit and at rest.
- [Caching](https://vercel.com/docs/caching) — Learn how Vercel caches content across multiple layers to deliver fast responses and reduce load on your backend.

Full cross-link map for this page: [/docs/how-vercel-cdn-works/compression.graph.md](/docs/how-vercel-cdn-works/compression.graph.md)
<!-- /docsgraph:related -->

## Compression algorithms

While `gzip` has been around for quite some time, `brotli` is a newer compression algorithm built by Google that best serves text compression. If your client supports [brotli](https://en.wikipedia.org/wiki/Brotli), it takes precedence over [gzip](https://en.wikipedia.org/wiki/LZ77_and_LZ78#LZ77) because:

- `brotli` compressed JavaScript files are 14% smaller than `gzip`
- HTML files are 21% smaller than `gzip`
- CSS files are 17% smaller than `gzip`

`brotli` has an advantage over `gzip` since it uses a dictionary of common keywords on both the client and server-side, which gives a better compression ratio.

## Compression negotiation

Many clients (e.g., browsers like Chrome, Firefox, and Safari) include the `Accept-Encoding` [request header](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Encoding) by default. This automatically enables compression for Vercel's CDN.

You can verify if a response was compressed by checking the `Content-Encoding` [response header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding) has a value of `gzip` or `br`.

### Clients that don't use `Accept-Encoding`

The following clients may not include the `Accept-Encoding` header by default:

- Custom applications, such as Python scripts, Node.js servers, or other software that can send HTTP requests to your deployment
- HTTP libraries, such as [`http`](https://nodejs.org/api/http.html) in Node.js, and networking tools, like `curl` or `wget`
- Older browsers. Check [MDN's browser compatibility list](https://developer.mozilla.org/docs/Web/HTTP/Headers/Accept-Encoding#browser_compatibility) to see if your client supports `Accept-Encoding` by default
- Bots and crawlers sometimes don't specify `Accept-Encoding` in their headers by default when visiting your deployment

When writing a client that doesn't run in a browser, for example a CLI, you will need to set the `Accept-Encoding` request header in your client code to opt into compression.

### Automatically compressed MIME types

When the `Accept-Encoding` request header is present, Vercel automatically compresses only responses that have a compressible MIME type. This includes `text/html` and the common types in the following list. The list is not exhaustive.

#### Application types

- `json`
- `x-web-app-manifest+json`
- `geo+json`
- `manifest+json`
- `ld+json`
- `atom+xml`
- `rss+xml`
- `xhtml+xml`
- `xml`
- `rdf+xml`
- `javascript`
- `tar`
- `vnd.ms-fontobject`
- `wasm`

#### Font types

- `otf`
- `ttf`

#### Image types

- `svg+xml`
- `bmp`
- `x-icon`

#### Text types

- `cache-manifest`
- `css`
- `csv`
- `javascript`
- `plain`
- `markdown`
- `vcard`
- `vtt`
- `x-component`

### Compression allowlist

The compression allowlist above is necessary to avoid accidentally increasing the size of non-compressible files, which can negatively impact performance.

For example, most image formats are already compressed such as JPEG, PNG, WebP, etc. If you want to compress an image even further, consider lowering the quality using [Vercel Image Optimization](/docs/image-optimization).

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
