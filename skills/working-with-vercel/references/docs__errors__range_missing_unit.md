---
title: RANGE_MISSING_UNIT
product: vercel
url: /docs/errors/RANGE_MISSING_UNIT
canonical_url: "https://vercel.com/docs/errors/RANGE_MISSING_UNIT"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The unit identifier of the Range header in the request is missing. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/range_missing_unit.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "412fc26f8fdfaf9110b5a7a7877590e5335fa5089a290a76dbe7ed5ef2145a97"
---

# RANGE_MISSING_UNIT

The `RANGE_MISSING_UNIT` error occurs when the unit identifier of the `Range` header in a request is missing. The `Range` header is used to request a specific portion of a resource from the server, and the unit identifier indicates the unit in which the range is specified, such as bytes.

**Error Code:** `416`

**Name:** Requested Range Not Satisfiable

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Specify unit identifier:** Ensure that the `Range` header in your request specifies a unit identifier like `bytes`
2. **Check configuration:** If the `Range` header values are being set automatically by some part of your system, check the configuration to ensure the unit identifier is being included
3. **Verify syntax:** Verify that the syntax of the `Range` header is correct and follows the format `unit=range-start-range-end`, for example, `bytes=0-999`
4. **Debugging:** If the error persists, log the `Range` header values in your server logs to debug and understand what values are being sent in requests


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
