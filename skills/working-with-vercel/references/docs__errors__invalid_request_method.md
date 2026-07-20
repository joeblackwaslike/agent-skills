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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b47b47204e7b38bf3427f168c70197e556da0bd96cc36998f4dd3bb7dcae916b"
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
