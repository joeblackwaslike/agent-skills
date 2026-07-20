---
title: FUNCTION_THROTTLED
product: vercel
url: /docs/errors/FUNCTION_THROTTLED
canonical_url: "https://vercel.com/docs/errors/FUNCTION_THROTTLED"
last_updated: 2026-02-26
type: reference
prerequisites:
  []
related:
  - /docs/deployments/build-features
  - /docs/observability
  - /docs/vercel-firewall
  - /docs/security/vercel-waf/rate-limiting
  - /docs/cdn-cache
summary: The function you are trying to call has exceeded the rate limit.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/function_throttled.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "6ce5c187bb308970a04f93d8e7c482a47498d32899609c35e18d594676470970"
---

# FUNCTION_THROTTLED

The `FUNCTION_THROTTLED` error occurs when your Vercel Functions exceed the concurrent execution limit, often due to a sudden request spike or backend API issues. For more information, see [What should I do if I receive a 503 error on Vercel?](/kb/guide/what-should-i-do-if-i-receive-a-503-error-on-vercel).

Although this is a rare scenario, this error can also occur when Vercel's infrastructure encounters an abnormal system load and tries to mitigate the impact autonomously.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Vercel Function being invoked. For example, your function might be waiting for a slow backend API without a reasonable timeout. These information can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view), as well as the [Observability](/docs/observability) section in the sidebar in the Vercel dashboard.
2. **Handle request spikes**: If you're experiencing a sudden spike in requests, consider using the [Vercel Firewall](/docs/vercel-firewall) to block unwanted traffic, or enabling [Rate Limiting](/docs/security/vercel-waf/rate-limiting) to limit the number of requests per second.
3. **Optimize your function**: Review your function code to ensure it's optimized for performance. For example, you can use [Vercel's CDN Cache](/docs/cdn-cache) to cache responses and reduce the number of invocations. You can also enable [fluid compute](/docs/fluid-compute) to handle more requests concurrently on a single function instance.


---

[View full sitemap](/docs/sitemap)
