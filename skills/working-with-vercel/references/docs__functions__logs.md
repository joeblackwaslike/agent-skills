---
title: Vercel Function Logs
product: vercel
url: /docs/functions/logs
canonical_url: "https://vercel.com/docs/functions/logs"
last_updated: 2026-08-11
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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/functions/logs.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "90da216b26d206bb87042776b417f5dc5ff635873ea570094152ec03523fa2b1"
---

# Vercel Function Logs

Vercel Functions allow you to debug and monitor your functions using runtime logs. Users on the Pro and Enterprise plans can use Vercel's support for [Log Drains](/docs/drains) to collect and analyze your logs using third-party providers. Functions have full support for the [`console`](https://developer.mozilla.org/docs/Web/API/Console) API, including `time`, `debug`, `timeEnd`, and more.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Troubleshooting Inconsistent Logs in Vercel Functions](https://vercel.com/kb/guide/troubleshooting-inconsistent-logs-in-vercel-functions) — Learn how to troubleshoot and resolve logs that appear mixed in Vercel Functions. This guide explains why logs from diff
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Logs](https://vercel.com/docs/logs) — Use logs to find information on deployment builds, function executions, and more.
- [Troubleshooting Vercel Functions](https://vercel.com/docs/functions/troubleshooting) — Diagnose errors in Vercel Functions, including ECONNRESET errors when a function calls an external API or database.
- [get_runtime_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_runtime_logs) — Use get_runtime_logs with Vercel MCP.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.

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

In Next.js projects, logged functions include API Routes (those defined in `pages/api/**/*.ts` or `app/**/route.ts`).

Pages that use SSR, such as those that call `getServerSideProps` or export [`revalidate`](https://nextjs.org/docs/app/guides/incremental-static-regeneration), will also be available both in the filter dropdown and the real time logs.

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
