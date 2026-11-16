---
title: FUNCTION_PAYLOAD_TOO_LARGE
product: vercel
url: /docs/errors/FUNCTION_PAYLOAD_TOO_LARGE
canonical_url: "https://vercel.com/docs/errors/FUNCTION_PAYLOAD_TOO_LARGE"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/functions/limitations
  - /docs/storage/vercel-blob
summary: The payload sent to the function is too large. This is a function error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/function_payload_too_large.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d5426ce54cbece93aa8871bf28dd000445e1dbda78ad6465b4b212dd0faf7039"
---

# FUNCTION_PAYLOAD_TOO_LARGE

The `FUNCTION_PAYLOAD_TOO_LARGE` error occurs when the payload sent to a function exceeds the maximum allowed size. This typically happens when the data sent in the request body to a serverless function is larger than the server can process.

**Error Code:** `413`

**Name:** Payload Too Large

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Review payload size:** Check the size of the payload being sent to the function to ensure it's within the allowed limits, and does not exceed the [limit of 4.5MB](/docs/functions/limitations#request-body-size)
2. **Reduce payload size:** If possible, reduce the size of the payload being sent to the function. This might include sending less data or compressing the data before sending it
3. **Client-side uploads**: For large file uploads, consider using client-side uploads directly to [Vercel Blob](/docs/storage/vercel-blob#server-and-client-uploads), where the file is sent securely from the client to Vercel Blob without going through the server
4. **Split into multiple requests:** If the payload data is too large to be sent in a single request, consider splitting the data into smaller chunks and sending multiple requests
5. **Use external storage:** If the data is very large, consider using external storage solutions to handle the data instead of sending it directly in the request

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
