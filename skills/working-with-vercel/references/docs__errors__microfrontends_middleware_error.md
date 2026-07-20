---
title: MICROFRONTENDS_MIDDLEWARE_ERROR
product: vercel
url: /docs/errors/MICROFRONTENDS_MIDDLEWARE_ERROR
canonical_url: "https://vercel.com/docs/errors/MICROFRONTENDS_MIDDLEWARE_ERROR"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The microfrontend middleware returned an invalid application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/microfrontends_middleware_error.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "4801f494800fcc40bbc0985e147a86d350273c1d59e3f673206e0649fca5fe8b"
---

# MICROFRONTENDS_MIDDLEWARE_ERROR

The `MICROFRONTENDS_MIDDLEWARE_ERROR` error occurs when the middleware returned a header `x-vercel-mfe-zone` with an invalid value. The value must be a name of an application from `microfrontends.json`.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. If you are setting the header, ensure that the value is a valid application name.
2. If you are not setting the header, this is an error caused by the [@vercel/microfrontends](https://www.npmjs.com/package/@vercel/microfrontends) package. Please [open an issue](https://github.com/vercel/microfrontends/issues) and include the error message.


---

[View full sitemap](/docs/sitemap)
