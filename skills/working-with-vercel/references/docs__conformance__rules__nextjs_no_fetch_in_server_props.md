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
source: "https://vercel.com/docs/conformance/rules/nextjs_no_fetch_in_server_props.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "2de1d03d0af6cfc0380fc88f62f9b714403e59c23fe8f420981fd1afcc4933b7"
---

# NEXTJS_NO_FETCH_IN_SERVER_PROPS

> Conformance is available on Enterprise plans

Since both `getServerSideProps` and API routes run on the server, calling `fetch` on a non-relative
URL will trigger an additional network request.

## How to fix

Instead of using `fetch` to make a call to the API route, you can instead share the code in a shared
library or module to avoid another network request. You can then import this hared logic and call directly
within your `getServerSideProps` function, avoiding additional network requests entirely.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
