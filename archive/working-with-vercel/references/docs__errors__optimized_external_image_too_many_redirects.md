---
title: OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS
product: vercel
url: /docs/errors/OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS
canonical_url: "https://vercel.com/docs/errors/OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The external image request encountered too many redirects. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/optimized_external_image_too_many_redirects.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "105ce70be88fac27ed0b794ad68cba1b11786e8a56704304c0403bbc5b81f361"
---

# OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS

The `OPTIMIZED_EXTERNAL_IMAGE_TOO_MANY_REDIRECTS` error occurs when the external image request encounters too many redirects.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check URL for redirects:** Verify the external image URL to ensure it does not cause an infinite redirect loop

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
