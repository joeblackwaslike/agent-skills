---
title: RANGE_GROUP_NOT_VALID
product: vercel
url: /docs/errors/RANGE_GROUP_NOT_VALID
canonical_url: "https://vercel.com/docs/errors/RANGE_GROUP_NOT_VALID"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The group value of the Range header in the request is invalid. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/range_group_not_valid.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "3ba52e43ca5f01124ebc38167ed42b90f6bad8836250f3c8db300e168618ef8c"
---

# RANGE_GROUP_NOT_VALID

The `RANGE_GROUP_NOT_VALID` error occurs when the group value of the `Range` header in a request is invalid. This header is used to request a specific portion of a resource from the server, and the group value can be used to specify multiple ranges or a set of subranges.

**Error Code:** `416`

**Name:** Requested Range Not Satisfiable

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Validate Range header values:** Ensure that the group value in the `Range` header is a valid format. It should correctly specify the range or subranges you wish to retrieve
2. **Correct grouping:** Ensure that the group value is correctly formatted and contains valid range specifications
3. **Check configuration:** If the `Range` header values are being set automatically by some part of your system, check the configuration to ensure it's being set correctly
4. **Debugging:** If the error persists, log the `Range` header values in your server logs to debug and understand what values are being sent in requests


---

[View full sitemap](/docs/sitemap)
