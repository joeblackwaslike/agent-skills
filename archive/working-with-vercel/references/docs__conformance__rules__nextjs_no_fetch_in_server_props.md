---
title: NEXTJS_NO_FETCH_IN_SERVER_PROPS
product: vercel
url: /docs/conformance/rules/NEXTJS_NO_FETCH_IN_SERVER_PROPS
canonical_url: "https://vercel.com/docs/conformance/rules/NEXTJS_NO_FETCH_IN_SERVER_PROPS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent relative fetch calls in getServerSideProps from being added to Next.js applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/nextjs_no_fetch_in_server_props.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a9e8957656c9f2c2319d520b54d71c9de8677f9ecc4925836a227be4aa4742b5"
---

# NEXTJS_NO_FETCH_IN_SERVER_PROPS

> Conformance is available on Enterprise plans

Since both `getServerSideProps` and API routes run on the server, calling `fetch` on a non-relative
URL will trigger an additional network request.

## How to fix

Instead of using `fetch` to make a call to the API route, you can instead share the code in a shared
library or module to avoid another network request. You can then import this hared logic and call directly
within your `getServerSideProps` function, avoiding additional network requests entirely.

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
