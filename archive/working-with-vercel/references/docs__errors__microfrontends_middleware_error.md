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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/microfrontends_middleware_error.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "1c3906db62ced1d8b320462eaeeefd87d43f61e8ff4ab4a9eb5c65051b63903c"
---

# MICROFRONTENDS_MIDDLEWARE_ERROR

The `MICROFRONTENDS_MIDDLEWARE_ERROR` error occurs when the middleware returned a header `x-vercel-mfe-zone` with an invalid value. The value must be a name of an application from `microfrontends.json`.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. If you are setting the header, ensure that the value is a valid application name.
2. If you are not setting the header, this is an error caused by the [@vercel/microfrontends](https://www.npmjs.com/package/@vercel/microfrontends) package. Please [open an issue](https://github.com/vercel/microfrontends/issues) and include the error message.

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
