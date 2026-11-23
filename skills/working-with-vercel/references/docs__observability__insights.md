---
title: Observability Insights
product: vercel
url: /docs/observability/insights
canonical_url: "https://vercel.com/docs/observability/insights"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/observability
related:
  - /docs/functions
  - /docs/observability/observability-plus
  - /docs/functions/usage-and-pricing
  - /docs/cli/metrics
  - /docs/manage-cdn-usage
summary: List of available data sources that you can view and monitor with Observability on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/observability/insights.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "4e271b933a3ec1c7f51d0b9c0c123c0ac2cb7f83bb8aa7ef4f3d7ff6fea9b283"
---

# Observability Insights

Vercel organizes Observability through sections that correspond to different features and traffic sources that you can view, monitor and filter.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI traffic insights now available in Vercel Observability](https://vercel.com/changelog/ai-traffic-insights-now-available-in-vercel-observability)
- [Troubleshoot and optimize Active CPU usage on Fluid compute](https://vercel.com/kb/guide/optimize-active-cpu-on-fluid-compute) — Diagnose which routes drive Active CPU usage and learn to optimize it. Separate traffic growth from per-request CPU work
- [Troubleshoot and optimize Function Invocations on Vercel](https://vercel.com/kb/guide/optimize-function-invocations) — Diagnose which routes drive Function Invocations and learn to optimize them. Separate necessary dynamic traffic from div
- [Anyone can build agents, but it takes a platform to run them](https://vercel.com/blog/anyone-can-build-agents-but-it-takes-a-platform-to-run-them)
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Manage and optimize usage for Observability](https://vercel.com/docs/manage-and-optimize-observability) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Runtime Logs](https://vercel.com/docs/logs/runtime) — Learn how to search, inspect, and share your runtime logs with the Logs tab.
- [Observability](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability) — Vercel MCP tools for observability.
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.

Full cross-link map for this page: [/docs/observability/insights.graph.md](/docs/observability/insights.graph.md)
<!-- /docsgraph:related -->

## Vercel Functions

The **Vercel Functions** tab provides a detailed view of the performance of your Vercel Functions. You can see the number of invocations and the error rate of your functions. You can also see the performance of your functions broken down by route.

For more information, see [Vercel Functions](/docs/functions).

### Find the routes that drive function usage

When your function usage is higher than you expect, use the **Functions** section to find the routes responsible:

1. From your project dashboard, open **Observability** in the sidebar, then select **Functions**.
2. Set the time range to the period you want to investigate, such as **Last 24 hours**.
3. Sort the routes table by **Invocations** to find the routes that run most often. Sort by **Active CPU** or **GB-Hours**, whichever column your project shows, to find the routes that use the most compute.
4. Select a route to see its **Invocations**, **Error Rate**, and **Duration** charts.
5. Expand **Advanced metrics** to see **Active CPU**, **Memory Usage**, **CPU Throttle**, **Time to First Byte**, and **Start Type** for the route. A high share of cold starts or frequent CPU throttling makes each invocation take longer.
6. Select the route's **External APIs** tab to see the requests it sends to other services. A slow upstream API keeps the function running while it waits for a response.

The **P75 Duration** column, the **Duration** chart, and the **Time to First Byte** chart require [Observability Plus](/docs/observability/observability-plus). To learn how Vercel bills function usage, see [Vercel Functions usage and pricing](/docs/functions/usage-and-pricing).

### CPU Throttling

When your function uses too much CPU time, Vercel pauses its execution periodically to stay within limits. This means your function may take longer to complete, which, in a worst-case scenario, can cause timeouts or slow responses for users.

CPU throttling itself isn't necessarily a problem as it's designed to keep functions within their resource limits. Some throttling is normal when your functions are making full use of their allocated resources. In general, low throttling rates (under 10% on average) aren't an issue. However, if you're seeing high latency, timeouts, or slow response times, check your CPU throttling metrics. High throttling rates can help explain why your functions are performing poorly, even when your code is optimized.

To reduce throttling, optimize heavy computations, add caching, or increase the memory size of the affected functions.

## External APIs

You can use the **External APIs** tab to understand more information about requests from your functions to external APIs. You can organize by number of requests, p75 (latency), and error rate to help you understand potential causes for slow upstream times or timeouts.

### Find slow external APIs

When a function times out or responds slowly, check whether it's waiting on an external API:

1. From your project dashboard, open **Observability** in the sidebar, then select **External APIs**.
2. Set the time range to the period you want to investigate, such as **Last 6 hours**.
3. Review the hostnames your functions call. The table shows **API Calls**, **Cached Calls**, **Latency**, and **Error Rate** for each hostname. Sort by **Latency** to bring the slowest hostnames to the top.
4. Select a hostname to see its **API Calls** and **Latency** charts over the time range.
5. Select the **Functions** tab to see which of your routes sent the requests, with **API Calls**, **P75 Duration**, and **Error Rate** for each route. The **Endpoints** tab lists the endpoints requested on that hostname.

Without [Observability Plus](/docs/observability/observability-plus), you can see request totals for each hostname. Latency, error rate, and the hostname detail views require Observability Plus.

## Middleware

The **Middleware** observability tab shows invocation counts and performance metrics of your application's middleware.

Observability Plus users receive additional insights and tooling:

- Analyze invocations by request path, matched against your middleware config
- Break down middleware actions by type (e.g., redirect, rewrite)
- View rewrite targets and frequency
- Query middleware invocations using the query builder

## CDN Requests

You can use the **CDN Requests** tab to understand the requests to each of static and dynamic routes through the global network. This includes the number of requests, the regions, and the requests that have been cached for each route.

It also provides detailed breakdowns for individual bots and bot categories, including AI crawlers and search engines.

Additionally, Observability Plus users can:

- Filter traffic by bot category, such as AI
- View metrics for individual bots
- Break down traffic by bot or category in the query builder
- Filter traffic by redirect location
- Break down traffic by redirect location in the query builder

## AI Traffic

The **AI Traffic** tab shows how AI bots interact with your site. You can see requests from AI bots over time, broken down by AI crawlers that index or train on your content and AI assistants that fetch pages on behalf of a user.

It also shows:

- Paths that AI crawlers request the most
- Paths that AI assistants request the most from user-initiated sessions
- Paths that AI bots requested but received an error
- Paths that AI bots request as Markdown

You can also query AI crawler, assistant, and failed-request counts with the [AI traffic metrics in the Vercel CLI](/docs/cli/metrics#ai-traffic).

## Fast Data Transfer

You can use the **Fast Data Transfer** tab to understand how data is being transferred within the global network for your project.

For more information, see [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer).

## Image Optimization

The **Image Optimization** tab provides deeper insights into image transformations and efficiency.

It contains:

- Transformation insights: View formats, quality settings, and width adjustments
- Optimization analysis: Identify high-frequency transformations to help inform caching strategies
- Bandwidth savings: Compare transformed images against their original sources to measure bandwidth reduction and efficiency
- Image-specific views: See all referrers and unique variants of an optimized image in one place

For more information, see [Image Optimization](/docs/image-optimization).

## ISR (Incremental Static Regeneration)

You can use the **ISR** tab to understand your revalidations and cache hit ratio to help you optimize towards cached requests by default.

For more information on ISR, see [Incremental Static Regeneration](/docs/incremental-static-regeneration).

## Blob

Use the **Vercel Blob** tab to gain visibility into how Blob stores are used across your applications.
It allows you to understand usage patterns, identify inefficiencies, and optimize how your application stores and serves assets.

At the team level, you will access:

- Total data transfer
- Download volume
- Cache activity
- API operations

You can also drill into activity by user agent, edge region, and client IP.

Learn more about [Vercel Blob](/docs/vercel-blob).

## Build Diagnostics

You can use the **Build Diagnostics** tab to view the performance of your builds. You can see the build time and resource usage for each of your builds. In addition, you can see the build time broken down by each step in the build and deploy process.

To learn more, see [Builds](/docs/builds).

## AI Gateway

With the AI Gateway you can switch between 400+ AI models without needing to manage API keys, rate limits, or provider accounts.

The **AI Gateway** tab surfaces metrics related to the AI Gateway, and provides visibility into:

- Requests by model
- Time to first token (TTFT)
- Request duration
- Input/output token count
- Cost per request (free while in alpha)

You can view these metrics across all projects or drill into per-project and per-model usage to understand which models are performing well, how they compare on latency, and what each request would cost in production.

For more information, see [the AI Gateway announcement](/blog/ai-gateway).

## Sandbox

With [Vercel Sandbox](/docs/sandbox), you can safely run untrusted or user-generated code on Vercel in isolated, persistent Linux microVMs using the `@vercel/sandbox` SDK.

The **Sandboxes** tab in Observability shows charts of sandbox creations, running sandboxes, CPU usage, memory usage, and data transfer.

To view a list of your project's sandboxes, open the **Sandboxes** page from your project's sidebar. For each sandbox, you can see:

- Name
- Status such as running or stopped
- Resources such as `4x CPU · 8 GiB`
- Time it was last used
- Time it was created

Clicking on a sandbox item from the list takes you to the detail page that provides detailed information, including the URL and port of the sandbox.

## External Origins

The **External Origins** tab gives you visibility into how your [rewrites to external origins](/docs/routing/rewrites#rewrites-to-external-origins), also called external rewrites, are performing at both the team and project levels. For each external rewrite, you can see:

- Total external rewrites
- External rewrites by hostnames

Additionally, Observability Plus users can view:

- External rewrite connection latency
- External rewrites by source/destination paths

To learn more, see [External Rewrites](/docs/routing/rewrites#rewrites-to-external-origins).

## Microfrontends

Vercel's microfrontends support allows you to split large applications into smaller ones to move faster and develop with independent tech stacks.

The **Microfrontends** tab provides visibility into microfrontends routing on Vercel:

- The response reason from the microfrontends routing logic
- The path expression used to route the request to that microfrontend

For more information, see [Microfrontends](/docs/microfrontends).

## Queues

With [Vercel Queues](/docs/queues), you can build durable event streaming systems for serverless applications with automatic retries and delivery guarantees.

The **Queues** tab provides metrics for monitoring your queue operations:

- Message throughput per second by queue
- Total messages queued, received, and deleted
- Max message age by consumer group
- Consumer group performance and processing rates

You can view queue metrics at the project level and drill down into individual queues to see detailed charts and consumer-level breakdowns. Since queue consumers run as Vercel Functions, you can also monitor consumer performance in the Vercel Functions tab.

For more information, see [Queues Observability](/docs/queues/observability).

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
