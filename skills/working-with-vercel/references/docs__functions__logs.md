---
title: Vercel Function Logs
product: vercel
url: /docs/functions/logs
canonical_url: "https://vercel.com/docs/functions/logs"
last_updated: 2026-02-26
type: reference
prerequisites:
  - /docs/functions
related:
  - /docs/drains
  - /docs/logs/runtime
  - /docs/functions/streaming-functions
  - /docs/incremental-static-regeneration
  - /docs/caching/cdn-cache
summary: Use runtime logs to debug and monitor your Vercel Functions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/logs.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3b505464eb88c8ce2e6df78e8db08f584c7b5234cc241a9f1fef26380e9b5f09"
---

# Vercel Function Logs

Vercel Functions allow you to debug and monitor your functions using runtime logs. Users on the Pro and Enterprise plans can use Vercel's support for [Log Drains](/docs/drains) to collect and analyze your logs using third-party providers. Functions have full support for the [`console`](https://developer.mozilla.org/docs/Web/API/Console) API, including `time`, `debug`, `timeEnd`, and more.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [How do I store logs on Vercel?](https://vercel.com/kb/guide/how-do-i-store-logs-on-vercel?from=related) — Learn how to store logs on Vercel.
- [Troubleshooting Inconsistent Logs in Vercel Functions](https://vercel.com/kb/guide/troubleshooting-inconsistent-logs-in-vercel-functions?from=related) — Learn how to troubleshoot and resolve logs that appear mixed in Vercel Functions. This guide explains why logs from diff
- [Logs](https://vercel.com/docs/logs?from=related) — Use logs to find information on deployment builds, function executions, and more.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [Accessing Build Logs](https://vercel.com/docs/deployments/logs?from=related) — Learn how to use Vercel's build logs to monitor the progress of building or running your deployment, and check for possi
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Logs](https://vercel.com/docs/ai-gateway/observability-and-spend/logs?from=related) — Search, filter, and follow individual AI Gateway requests, inspect provider routing for one request, and export the resu

Full cross-link map for this page: [/docs/functions/logs.graph.md](/docs/functions/logs.graph.md)
<!-- /docsgraph:related -->

## Runtime Logs

You can view [runtime logs](/docs/logs/runtime#what-are-runtime-logs) for all Vercel Functions in real-time from [the **Logs** section in the sidebar](/docs/logs/runtime#view-runtime-logs) of your project's dashboard. You can use the various filters and options to find specific log information. These logs are held for an [amount of time based on your plan](/docs/logs/runtime#limits).

When your function is [streaming](/docs/functions/streaming-functions), you'll get the following:

- You can [view the logs](/docs/logs/runtime#view-runtime-logs) in real-time from **Logs** in your dashboard sidebar.
- Each action of writing to standard output, such as using `console.log`, results in a separate log entry.
- Each of the logs are 256 KB **per line**.
- The path in streaming logs will be prefixed with a forward slash (`/`).

For more information, see [Runtime Logs](/docs/logs/runtime).

> **💡 Note:** These changes in the frequency and format of logs will affect Log Drains. If
> you are using Log Drains we recommend ensuring that your ingestion can handle
> both the new format and frequency.

### Number of logs per request

When a Function on a specific path receives a user request, you *may* see more than one log when the application renders or regenerates the page.

This can occur in the following situations:

1. When a new page is rendered
2. When you are using [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration)

In the case of ISR, multiple logs are the result of:

- A [stale](/docs/caching/cdn-cache#cache-invalidation) page having to be regenerated. For stale pages, both HTML (for direct browser navigation) and JSON (for Single Page App (SPA) transitions) are rendered simultaneously to maintain consistency
- On-demand ISR happening with `fallback` set as [`blocking`](/docs/incremental-static-regeneration/quickstart). During on-demand ISR, the page synchronously renders (e.g., HTML) upon request, followed by a background revalidation of both HTML and JSON versions

### Next.js logs

In Next.js projects, logged functions include API Routes (those defined in  or ).

Pages that use SSR, such as those that call `getServerSideProps` or export [`revalidate`](https://nextjs.org/docs/app/guides/incremental-static-regeneration), will also be available both in the filter dropdown and the real time logs.


---

[View full sitemap](/docs/sitemap)
