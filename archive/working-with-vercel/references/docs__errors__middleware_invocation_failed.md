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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/middleware_invocation_failed.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "50f6559ec77462ee8dd5fbe4de0486cf0fa23e449542d37c35b533ae1c1d5175"
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
