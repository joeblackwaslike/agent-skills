---
title: RANGE_END_NOT_VALID
product: vercel
url: /docs/errors/RANGE_END_NOT_VALID
canonical_url: "https://vercel.com/docs/errors/RANGE_END_NOT_VALID"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The end value of the Range header in the request is invalid. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/range_end_not_valid.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "641bb86b511aa4cf8c65baf5191dfc00712b3c911c9b66274a856ef9bc230a4e"
---

# RANGE_END_NOT_VALID

The `RANGE_END_NOT_VALID` error occurs when the end value of the `Range` header in a request is invalid. This header is used to request a specific portion of a resource from the server, which is useful for operations like resuming downloads or streaming media.

**Error Code:** `416`

**Name:** Requested Range Not Satisfiable

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Validate Range header values:** Ensure that the end value in the `Range` header is a valid integer. It should not be a letter, a decimal, or a scientific notation value
2. **Correct ordering:** Ensure the start value is less than the end value in the `Range` header
3. **Omit end value if necessary:** If you want to request all bytes from a certain start point to the end of the resource, you can omit the end value
4. **Check configuration:** If the `Range` header values are being set automatically by some part of your system, check the configuration to ensure it's being set correctly
5. **Debugging:** If the error persists, log the `Range` header values in your server logs to debug and understand what values are being sent in requests


---

[View full sitemap](/docs/sitemap)
