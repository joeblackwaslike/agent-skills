---
title: EDGE_FUNCTION_INVOCATION_FAILED
product: vercel
url: /docs/errors/EDGE_FUNCTION_INVOCATION_FAILED
canonical_url: "https://vercel.com/docs/errors/EDGE_FUNCTION_INVOCATION_FAILED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/deployments/build-features
summary: The request for a Edge Function was not completed successfully. This is an application error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/edge_function_invocation_failed.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "491070f77af5e30e64e751dac64f777bd3b6667831a4ae8138314ac5db377aa0"
---

# EDGE_FUNCTION_INVOCATION_FAILED

The `EDGE_FUNCTION_INVOCATION_FAILED` error occurs when there is an issue with the Edge Function being invoked on the CDN. This error can be caused by a variety of issues, including unhandled exceptions, timeouts, or malformed requests.

**Error Code:** `500`

**Name:** Internal Server Error

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Edge Function being invoked. They can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view)
2. **Review deployment configuration**: Double-check the deployment configuration to ensure that the Edge Function is being deployed correctly
3. **Investigate build errors**: If the error occurs during the build process, troubleshoot any build errors that might be preventing the necessary resources from being deployed.
4. **Check function code**: Ensure that the code for the Edge Function is correct and does not contain any errors or infinite loops
5. **Use Vercel's status page**: If you have tried the steps above and are still experiencing the error, check Vercel's [status page](https://www.vercel-status.com/) for any reported outages in the CDN, which can sometimes cause this error


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
