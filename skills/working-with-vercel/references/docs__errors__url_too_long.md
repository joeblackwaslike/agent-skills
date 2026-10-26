---
title: URL_TOO_LONG
product: vercel
url: /docs/errors/URL_TOO_LONG
canonical_url: "https://vercel.com/docs/errors/URL_TOO_LONG"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The URL of the request is too long. This is a request error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/url_too_long.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "312c08fc339f324ca528cad3be90390c0ae3c67585a65ec98c27dfd31cb2579f"
---

# URL_TOO_LONG

The `URL_TOO_LONG` error occurs when the URL of the request exceeds the maximum length allowed by the CDN (**14 KB**). Long URLs can be a result of long query strings, lengthy path segments, or an excessive number of path segments.

**Error Code:** `414`

**Name:** Request-URI Too Long

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Shorten the URL:** Simplify the URL by reducing the length of the path segments and the query string
2. **Reduce query parameters:** If the URL has many query parameters, consider reducing the number of parameters or use `POST` method instead where the parameters can be sent in the body of the request
3. **Use POST method:** If the long URL is a result of a form submission, consider changing the form method from `GET` to `POST`
4. **Check for unintended redirection:** Ensure there isn't a redirection loop or logic that is appending to the URL causing it to grow in length with each redirect


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
