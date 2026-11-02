---
title: MIDDLEWARE_INVOCATION_FAILED
product: vercel
url: /docs/errors/MIDDLEWARE_INVOCATION_FAILED
canonical_url: "https://vercel.com/docs/errors/MIDDLEWARE_INVOCATION_FAILED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/deployments/build-features
summary: The request for an Routing Middleware was not completed successfully. This is an application error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/middleware_invocation_failed.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "39f1d8476d289370507c8a8a22c1b5828613be304b72b6281d1c07e9a741b2d7"
---

# MIDDLEWARE_INVOCATION_FAILED

The `MIDDLEWARE_INVOCATION_FAILED` error occurs when there is an issue with the Routing Middleware being invoked on the CDN. This error can be caused by a variety of issues, including unhandled exceptions.

**Error Code:** `500`

**Name:** Internal Server Error

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Routing Middleware being invoked. They can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view)
2. **Use Vercel's status page**: If you have tried the steps above and are still experiencing the error, check Vercel's [status page](https://www.vercel-status.com/) for any reported outages in the CDN, which can sometimes cause this error
3. **Check function code**: Ensure that the code for the Routing Middleware is correct and does not contain any errors or infinite loops


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
