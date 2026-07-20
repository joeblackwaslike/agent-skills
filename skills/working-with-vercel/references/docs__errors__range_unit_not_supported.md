---
title: RANGE_UNIT_NOT_SUPPORTED
product: vercel
url: /docs/errors/RANGE_UNIT_NOT_SUPPORTED
canonical_url: "https://vercel.com/docs/errors/RANGE_UNIT_NOT_SUPPORTED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The unit identifier of the Range header in the request is not supported. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/range_unit_not_supported.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "5c2d42a581e4c5466570f367216f47eb5e2295b29751c430f1c5c3fa6b9c577d"
---

# RANGE_UNIT_NOT_SUPPORTED

The `RANGE_UNIT_NOT_SUPPORTED` error occurs when the unit identifier of the `Range` header in a request is not supported by the server. The `Range` header is used to request a specific portion of a resource from the server, and the unit identifier indicates the unit in which the range is specified, such as bytes.

**Error Code:** `416`

**Name:** Requested Range Not Satisfiable

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify supported Range units:** Check the documentation for the server or service you are interacting with to determine the supported range units
2. **Correct Range unit:** If the `Range` header in your request specifies an unsupported unit, correct it to use a supported unit
3. **Check configuration:** If the `Range` header values are being set automatically by some part of your system, check the configuration to ensure a supported unit identifier is being used
4. **Debugging:** If the error persists, log the `Range` header values in your server logs to debug and understand what values are being sent in requests


---

[View full sitemap](/docs/sitemap)
