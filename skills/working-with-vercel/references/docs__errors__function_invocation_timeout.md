---
title: FUNCTION_INVOCATION_TIMEOUT
product: vercel
url: /docs/errors/FUNCTION_INVOCATION_TIMEOUT
canonical_url: "https://vercel.com/docs/errors/FUNCTION_INVOCATION_TIMEOUT"
last_updated: 2026-05-14
type: reference
prerequisites:
  []
related:
  - /docs/functions/limitations
  - /docs/fluid-compute
  - /docs/workflows
  - /docs/deployments/build-features
summary: The request for a Vercel Function reached the timeout threshold. This is an application error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/function_invocation_timeout.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "6752f6263ab295781d27f998435815e4431adc39c1d1d937c95d6e31a36f7889"
---

# FUNCTION_INVOCATION_TIMEOUT

The `FUNCTION_INVOCATION_TIMEOUT` error occurs when a function invocation takes longer than the [allowed execution time](/docs/functions/limitations#max-duration). This could be due to an error within the function itself, a slow network call, or an issue with the environment in which the function is running.

**Error Code:** `504`

**Name:** Gateway Timeout

#### Troubleshoot

To troubleshoot this error, follow these steps:

1. **The function is taking too long to process a request**: Ensure that any API or database requests you make in your function respond within the [Vercel Function maximum duration](/docs/functions/limitations#max-duration) limit applicable to your plan. **If you require a longer execution**, consider enabling [Fluid compute](/docs/fluid-compute), which provides significantly longer durations and optimized performance for extended workloads. For workloads that require unlimited execution time, use [Vercel Workflows](/docs/workflows).
2. **The function isn't returning a response**: The function must return an HTTP response, even if that response is an error. If no response is returned, the function will time out
3. **You have an infinite loop within your function**: Check that your function is not making an infinite loop at any stage of execution
4. **Upstream errors**: Check that any external API or database that you are attempting to call doesn't have any errors
5. A common cause for this issue is when the application contains an unhandled exception. Check the application logs, which can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view), for example:

```javascript filename="logs-url"
https://my-deployment-my-username.vercel.app/_logs
```

For more information on Vercel Functions timeouts, see [What can I do about Vercel Functions timing out?](/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out)


---

[View full sitemap](/docs/sitemap)
