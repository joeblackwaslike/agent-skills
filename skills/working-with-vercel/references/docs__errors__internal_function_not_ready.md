---
title: INTERNAL_FUNCTION_NOT_READY
product: vercel
url: /docs/errors/INTERNAL_FUNCTION_NOT_READY
canonical_url: "https://vercel.com/docs/errors/INTERNAL_FUNCTION_NOT_READY"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  []
summary: The internal function is not ready to be invoked. This is a Vercel error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/internal_function_not_ready.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4889ca56c0a375a80ff502cb7fb2bce67821c5aba08fc8449b5c4dc388a647a5"
---

# INTERNAL_FUNCTION_NOT_READY

The `INTERNAL_FUNCTION_NOT_READY` error occurs when an attempt is made to invoke a function before it is ready to accept requests. This might happen if the function is still being deployed, initialized, or if there is a misconfiguration preventing the function from becoming ready.

**Error Code:** `500`

**Name:** Internal Server Error

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Verify deployment status:** Ensure that the function has been successfully deployed and the deployment process has completed
2. **Check initialization logs:** Review the function's initialization logs to identify any errors or warnings that might indicate why the function is not ready
3. **Review configuration:** Ensure that the function and environment configurations are correct and that there are no misconfigurations preventing the function from becoming ready
4. **Check dependencies:** Verify that all dependencies required by the function are available and correctly configured

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
