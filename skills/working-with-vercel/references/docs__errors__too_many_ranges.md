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
source: "https://vercel.com/docs/errors/too_many_ranges.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "cd0ad492ed4e66ccb6260965c31961bcb726ab13a27786d8349512ddf62082e8"
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


---

[View full sitemap](/docs/sitemap)
