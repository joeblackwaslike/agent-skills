---
title: INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT
product: vercel
url: /docs/errors/INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT
canonical_url: "https://vercel.com/docs/errors/INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/deployments/build-features
  - /docs/functions/limitations
  - /docs/functions/streaming-functions
summary: The Edge Function invocation timed out unexpectedly.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/internal_edge_function_invocation_timeout.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c5088730efe99d50f1d7bd3aade8e29513cf451b5fb0f60b226438c02d055b83"
---

# INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT

The `INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT` error occurs when an Edge Function takes longer than the allowed execution time to complete. This can be caused by long-running processes within the function or external dependencies that fail to respond in a timely manner.

**Error Code:** `504`

**Name:** Gateway Timeout

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Edge Function being invoked. They can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view)
2. **Review function code:** Inspect the Edge Function code for any long-running operations or infinite loops that could cause a timeout
3. **Verify return value:** Ensure the function begins responding within [25 seconds](/docs/functions/limitations#max-duration)
4. **Optimize external calls:** If the function makes calls to external services or APIs, ensure they are optimized and responding quickly
5. **Consider streaming data**: If the function is processing large amounts of data, consider using a [streaming approach](/docs/functions/streaming-functions) to avoid timeouts
6. **Implement error handling:** Add error handling in the function to manage timeouts and other exceptions effectively

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
