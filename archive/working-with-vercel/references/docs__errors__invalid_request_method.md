---
title: INVALID_REQUEST_METHOD
product: vercel
url: /docs/errors/INVALID_REQUEST_METHOD
canonical_url: "https://vercel.com/docs/errors/INVALID_REQUEST_METHOD"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The request method used is invalid or not supported. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/invalid_request_method.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "66c72e59fd2c1d1059d7593dfc4635dbef34dd18f4a9d2fab19b8996e758ccac"
---

# INVALID_REQUEST_METHOD

The `INVALID_REQUEST_METHOD` error occurs when a request is made with a method that is either invalid or not supported by the server. This error typically happens when trying to use an HTTP method that the endpoint does not accept or recognize.

**Error Code:** `405`

**Name:** Method Not Allowed

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify request method:** Ensure that the HTTP request method used is correct and supported by the endpoint. Common HTTP methods include `GET`, `POST`, `PUT`, `DELETE` etc
2. **Review code:** Check the code where the request is being made to ensure the correct method is being used
3. **Test with different methods:** If possible, test the endpoint with different HTTP methods to determine if the issue is with the method or another part of the request

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
