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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/range_group_not_valid.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3ea1c9e04632f6bde6d1e65b40c3a513312f8e141cbf2b1da6c4d6f837d62c61"
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
