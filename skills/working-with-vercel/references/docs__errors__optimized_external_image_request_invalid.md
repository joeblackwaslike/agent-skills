---
title: OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID
product: vercel
url: /docs/errors/OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID
canonical_url: "https://vercel.com/docs/errors/OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The external image request is invalid. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/optimized_external_image_request_invalid.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "958bc7068a6bcf0f1fdf5bc3eac1b1eea590c6991ec369d3a721a45b1ae61adb"
---

# OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID

The `OPTIMIZED_EXTERNAL_IMAGE_REQUEST_INVALID` error occurs when the external image request is invalid.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify external URL:** Ensure that the external image URL is absolute and correctly formatted
2. **Check query parameters:** Ensure that any query parameters are valid
3. **Validate source configuration:** Verify that the external source is configured correctly and accessible

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
