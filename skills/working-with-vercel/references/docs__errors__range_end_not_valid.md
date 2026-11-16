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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/range_end_not_valid.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "2ce1aa5e8c6a270b3206d224d29939a2c118ad412a7fca23ad6b2e449c7a30bb"
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
