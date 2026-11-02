---
title: MALFORMED_REQUEST_HEADER
product: vercel
url: /docs/errors/MALFORMED_REQUEST_HEADER
canonical_url: "https://vercel.com/docs/errors/MALFORMED_REQUEST_HEADER"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The MALFORMED_REQUEST_HEADER error occurs when a request contains an improperly formatted or invalid header. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/malformed_request_header.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "5f94bafd72c5fcc7504d7942fce2751183c8e8e391b592f753bf7b2825801bdf"
---

# MALFORMED_REQUEST_HEADER

The `MALFORMED_REQUEST_HEADER` error signifies that a request made to the server includes a header that is incorrectly formatted or contains invalid data. This could be due to syntax errors, incorrect header field names, or incompatible header values.

**Error Code:** `400`

**Name:** Bad Request

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Inspect request headers**: Review the headers in your request. Ensure that they are correctly formatted and adhere to the [HTTP standard](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
2. **Validate UTF-8 encoding**: Confirm that all request headers, especially cookie values, are valid UTF-8 strings. Non-UTF-8 characters in headers, particularly in the cookie header, often cause this error
3. **Examine Vercel Function behavior**: Since this error is specific to Vercel functions, verify the functionality and responses of your Vercel functions. Ensure they are correctly handling request headers and not contributing to malformed responses


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
