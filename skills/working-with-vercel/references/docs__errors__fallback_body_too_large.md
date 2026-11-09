---
title: FALLBACK_BODY_TOO_LARGE
product: vercel
url: /docs/errors/FALLBACK_BODY_TOO_LARGE
canonical_url: "https://vercel.com/docs/errors/FALLBACK_BODY_TOO_LARGE"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The fallback body is too large for the cache. This is a cache error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/fallback_body_too_large.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "7d275141eefe588eb57a6e0cd8663ad576b0be5e7f528be67fd45fc9150ab0a5"
---

# FALLBACK_BODY_TOO_LARGE

The `FALLBACK_BODY_TOO_LARGE` error indicates that the size of the fallback body exceeds the maximum cache limit. This error typically occurs in prerendered pages when the response body of a fallback page is larger than the cache can accommodate. Notably, if the fallback exceeds 20 MB, it cannot be cached.

**Error Code:** `502`

**Name:** Prerender fallback file is too big for cache

## Troubleshoot

To resolve this error, consider the following steps:

1. **Review response size:** Examine the size of the response body for the affected page. If it's too large, try to reduce the content size
2. **Optimize content:** Minimize HTML, CSS, and JavaScript on the fallback page Remove unnecessary assets or data to reduce the page size
3. **Implement pagination:** If the large response body is due to extensive datasets, consider using pagination. This divides the data into smaller, manageable sections
4. **Dynamic data loading:** Where possible, load data dynamically on the client-side instead of sending all data in the initial server response

To prevent this error, ensure that the size of the fallback page is less than 20 MB.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
