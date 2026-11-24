---
title: RANGE_START_NOT_VALID
product: vercel
url: /docs/errors/RANGE_START_NOT_VALID
canonical_url: "https://vercel.com/docs/errors/RANGE_START_NOT_VALID"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The start value of the Range header in the request is invalid. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/range_start_not_valid.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "5bbfe1b43e7d2c11dc89de920293742d165b255b2b569dc13512183c13a662ec"
---

# RANGE_START_NOT_VALID

The `RANGE_START_NOT_VALID` error occurs when the start value of the `Range` header in a request is invalid. The `Range` header is used to request a specific portion of a resource from the server, and the start value should be a valid integer indicating the beginning of the requested range.

**Error Code:** `416`

**Name:** Requested Range Not Satisfiable

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Validate Range header values:** Ensure that the start value in the `Range` header is a valid integer. It should not be a letter, a decimal, or a scientific notation value
2. **Correct ordering:** Ensure the start value is less than the end value in the `Range` header, if an end value is specified
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
