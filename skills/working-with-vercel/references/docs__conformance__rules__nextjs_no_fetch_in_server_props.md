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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "507a6be80ca0909e9b804a9ecd084dc38c97822f2311c99eea445f82b1d26213"
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
