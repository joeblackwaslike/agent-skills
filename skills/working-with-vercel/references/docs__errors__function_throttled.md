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
  - /docs/functions/concurrency-scaling
  - /docs/deployments/build-features
  - /docs/observability
  - /docs/vercel-firewall
  - /docs/security/vercel-waf/rate-limiting
summary: The function you are trying to call has exceeded the rate limit.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/errors/function_throttled.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a8ca089d7f4b0122defb884935b1b902e385d9dbe60449d97754e10da70bd017"
---

# FUNCTION_THROTTLED

The `FUNCTION_THROTTLED` error occurs when your Vercel Functions exceed the concurrent execution limit, often due to a sudden request spike or backend API issues. Vercel returns it with a `503` status code. For the limits on each plan and how quickly Vercel adds capacity during a traffic burst, see [concurrency scaling](/docs/functions/concurrency-scaling).

Although this is a rare scenario, this error can also occur when Vercel's infrastructure encounters an abnormal system load and tries to mitigate the impact autonomously.

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check application logs**: Review the application logs to identify any specific errors related to the Vercel Function being invoked. For example, your function might be waiting for a slow backend API without a reasonable timeout. These information can be found at the host URL under [the `/_logs` path](/docs/deployments/build-features#logs-view), as well as the [Observability](/docs/observability) section in the sidebar in the Vercel dashboard.
2. **Handle request spikes**: If you're experiencing a sudden spike in requests, consider using the [Vercel Firewall](/docs/vercel-firewall) to block unwanted traffic, or enabling [Rate Limiting](/docs/security/vercel-waf/rate-limiting) to limit the number of requests per second.
3. **Optimize your function**: Review your function code to ensure it's optimized for performance. For example, you can use [Vercel's CDN Cache](/docs/cdn-cache) to cache responses and reduce the number of invocations. You can also enable [fluid compute](/docs/fluid-compute) to handle more requests concurrently on a single function instance.
4. **Check the services your function calls**: When a database, API, or content management system (CMS) responds slowly, each invocation runs for longer and more invocations run at the same time. Confirm that the service scales with your traffic, because more concurrent functions also send it more requests.
5. **Serve fewer requests from functions**: Use [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration) for pages that don't need to render on every request, and set a [maximum duration](/docs/functions/configuring-functions/duration) so that a stalled invocation ends instead of holding capacity.

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
