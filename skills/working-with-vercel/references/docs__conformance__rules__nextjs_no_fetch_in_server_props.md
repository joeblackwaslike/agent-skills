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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "73ed033937b5c1fe62daee0bd9cf9f89a97fa523d7a863f9754b3b967be296d5"
---

# NEXTJS_NO_FETCH_IN_SERVER_PROPS

> **🔒 Permissions Required**: Conformance

Since both `getServerSideProps` and API routes run on the server, calling `fetch` on a non-relative
URL will trigger an additional network request.

## How to fix

Instead of using `fetch` to make a call to the API route, you can instead share the code in a shared
library or module to avoid another network request. You can then import this hared logic and call directly
within your `getServerSideProps` function, avoiding additional network requests entirely.


---

[View full sitemap](/docs/sitemap)
