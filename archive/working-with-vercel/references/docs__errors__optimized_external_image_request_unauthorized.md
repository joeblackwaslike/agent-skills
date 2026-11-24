---
title: OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED
product: vercel
url: /docs/errors/OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED
canonical_url: "https://vercel.com/docs/errors/OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The external image request is unauthorized. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/optimized_external_image_request_unauthorized.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d667f079935818d771a29f23a274e9c780686938d1ed39f8301bb1de18edb6bf"
---

# OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED

The `OPTIMIZED_EXTERNAL_IMAGE_REQUEST_UNAUTHORIZED` error occurs when the external image request is unauthorized.

**Error Code:** `502`

**Name:** Bad Gateway

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check permissions:** Ensure that you have the necessary permissions to access the external image
2. **Verify authentication:** Check for any authentication or authorization issues with the external source
3. **Update credentials:** Ensure that any required credentials or tokens are correctly set and not expired
4. **Remove filters**: Remove any filters that may be blocking the request, such as headers or IP restrictions

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
