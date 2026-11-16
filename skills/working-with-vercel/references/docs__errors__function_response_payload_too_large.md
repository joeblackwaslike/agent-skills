---
title: FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE
product: vercel
url: /docs/errors/FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE
canonical_url: "https://vercel.com/docs/errors/FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/functions/limitations
summary: The function returned a response that is too large. This is a function error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/function_response_payload_too_large.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9062c2b383282e04c569d64f60b699bf9e41b3150b170fe812a499ae9b9839aa"
---

# FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE

The `FUNCTION_RESPONSE_PAYLOAD_TOO_LARGE` error occurs when the function returned a response that exceeds the maximum allowed size of 4.5 MB.

**Error Code:** `500`

**Name:** Response Payload Too Large

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review response payload size:** Check the size of the response payload being returned by the function to ensure it's within the allowed limits, and does not exceed the [limit of 4.5 MB](/docs/functions/limitations#request-body-size)
2. **Reduce response payload size:** If possible, reduce the size of the response payload being returned by the function

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
