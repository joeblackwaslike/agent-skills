---
title: INTERNAL_CACHE_KEY_TOO_LONG
product: vercel
url: /docs/errors/INTERNAL_CACHE_KEY_TOO_LONG
canonical_url: "https://vercel.com/docs/errors/INTERNAL_CACHE_KEY_TOO_LONG"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The CDN is failing to fetch from the internal cache due to a cache key being too long. This error can be caused by a request URL that is too long.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/internal_cache_key_too_long.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "f7f3c78bccbe77ccd5d2a491959da0ae1a77d8c6a4105b34e326fc24749021f9"
---

# INTERNAL_CACHE_KEY_TOO_LONG

The `INTERNAL_CACHE_KEY_TOO_LONG` error occurs when the CDN is unable to fetch from the internal cache due to a cache key being too long. This error can be caused by a request URL that is too long.

**Error Code:** `500`

**Name:** Internal Server Error

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Contact support:** If the error persists, [contact support](/help#issues) for further assistance

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
