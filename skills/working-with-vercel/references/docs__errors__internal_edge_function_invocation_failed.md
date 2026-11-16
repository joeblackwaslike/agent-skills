---
title: INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED
product: vercel
url: /docs/errors/INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED
canonical_url: "https://vercel.com/docs/errors/INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The request for a Edge Function was not completed successfully due to an internal error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/internal_edge_function_invocation_failed.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e0d002c8ba8afb9a9ec713d4d32e7eb77a6350b2b247d81293a841dff887386c"
---

# INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED

The `INTERNAL_EDGE_FUNCTION_INVOCATION_FAILED` error occurs when there is an issue with the Edge Function being invoked on the CDN. This error can be caused by a variety of internal issues.

**Error Code:** `500`

**Name:** Internal Server Error

## Troubleshoot

While this error can be caused by a variety of issues, it's transient and retrying the request will succeed. If the error persists, [**contact support**](/help) along with the request ID on the error page.

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
