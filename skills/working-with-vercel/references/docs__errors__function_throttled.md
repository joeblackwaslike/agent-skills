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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/function_throttled.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d9664e72eee36b77090dd64bfb352df84795e02825e2f616bc15e6dd2ed6c408"
---

# FUNCTION_THROTTLED

The `FUNCTION_THROTTLED` error occurs when your Vercel Functions exceed the concurrent execution limit, often due to a sudden request spike or backend API issues. For more information, see [What should I do if I receive a 503 error on Vercel?](/kb/guide/what-should-i-do-if-i-receive-a-503-error-on-vercel).

Although this is a rare scenario, this error can also occur when Vercel's infrastructure encounters an abnormal system load and tries to mitigate the impact autonomously.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Vercel Function being invoked. For example, your function might be waiting for a slow backend API without a reasonable timeout. These information can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view), as well as the [Observability](/docs/observability) section in the sidebar in the Vercel dashboard.
2. **Handle request spikes**: If you're experiencing a sudden spike in requests, consider using the [Vercel Firewall](/docs/vercel-firewall) to block unwanted traffic, or enabling [Rate Limiting](/docs/security/vercel-waf/rate-limiting) to limit the number of requests per second.
3. **Optimize your function**: Review your function code to ensure it's optimized for performance. For example, you can use [Vercel's CDN Cache](/docs/cdn-cache) to cache responses and reduce the number of invocations. You can also enable [fluid compute](/docs/fluid-compute) to handle more requests concurrently on a single function instance.

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
