---
title: TOO_MANY_RANGES
product: vercel
url: /docs/errors/TOO_MANY_RANGES
canonical_url: "https://vercel.com/docs/errors/TOO_MANY_RANGES"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: Too many ranges have been specified in the Range header of the request. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/too_many_ranges.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9ba9b9dc5bd1d62b4ec9d6f92eb295c17c0bdffddde17df2b2cc8c06abbad2e5"
---

# TOO_MANY_RANGES

The `TOO_MANY_RANGES` error occurs when too many ranges have been specified in the `Range` header of a request. The `Range` header is used to request specific portions of a resource from the server, and specifying too many ranges can lead to an excessive load on the server.

**Error Code:** `416`

**Name:** Requested Range Not Satisfiable

## Troubleshoot

To troubleshoot this error, follow these steps:

To troubleshoot this error, follow these steps:

1. **Reduce number of Ranges:** Reduce the number of ranges specified in the `Range` header to a reasonable amount
2. **Check configuration:** If the `Range` header values are being set automatically by some part of your system, check the configuration to ensure a reasonable number of ranges are being specified
3. **Verify server capabilities:** Check the documentation for the server or service you are interacting with to determine the maximum number of supported ranges
4. **Debugging:** If the error persists, log the `Range` header values in your server logs to debug and understand what values are being sent in requests

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
