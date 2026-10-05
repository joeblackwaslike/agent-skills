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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4c6530249c67b2f99cd8f601b9f78c1084e483ac4bebb81656b4f6a0e5d8ba41"
---

# NEXTJS_NO_FETCH_IN_SERVER_PROPS

> **Availability**: Conformance is available on Enterprise plans

Since both `getServerSideProps` and API routes run on the server, calling `fetch` on a non-relative
URL will trigger an additional network request.

## How to fix

Instead of using `fetch` to make a call to the API route, you can instead share the code in a shared
library or module to avoid another network request. You can then import this hared logic and call directly
within your `getServerSideProps` function, avoiding additional network requests entirely.


---

[View full sitemap](/docs/sitemap)
