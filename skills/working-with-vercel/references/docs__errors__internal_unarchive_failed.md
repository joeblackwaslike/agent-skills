---
title: INTERNAL_UNARCHIVE_FAILED
product: vercel
url: /docs/errors/INTERNAL_UNARCHIVE_FAILED
canonical_url: "https://vercel.com/docs/errors/INTERNAL_UNARCHIVE_FAILED"
last_updated: 2026-06-25
type: reference
prerequisites:
  []
related:
  - /docs/functions/limitations
summary: Unarchiving of the deployment or resource failed. This is an internal error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/internal_unarchive_failed.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "a44b0e73151c96228ccc76d2915179c0d4381a6d88361299202444355d65ab86"
---

# INTERNAL_UNARCHIVE_FAILED

The `INTERNAL_UNARCHIVE_FAILED` error typically occurs when the platform encounters a problem trying to extract your deployment's archive. This issue often can be related to one of the following:

- The size of your deployment bundle for Vercel functions exceeds the limit. For Vercel functions, see the [bundle size limits](/docs/functions/limitations#bundle-size-limits)

**Error Code:** `503`

**Name:** Service Unavailable

## Troubleshoot

To troubleshoot this error, follow these steps:

- **Check your project files**: Check for any files or directories that have been unnecessarily included in the deployment. Removing unnecessary files or directories can help reduce the size of your deployment
- **Check bundle size**: Looking into your `includeFiles` and `excludeFiles` configuration to specify items affecting the function size. See [bundle size limits](/docs/functions/limitations#bundle-size-limits)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
