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
source: "https://vercel.com/docs/errors/invalid_request_method.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "d5f09b9401480ed14fbd78f548aa4149dcdb26253c99a5b11530f3d2ce758150"
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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
