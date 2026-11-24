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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/range_unit_not_supported.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e73ac38052d65a439ac49c2c550a6fbeada8f53eb7295274dc9261a51a35d880"
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
