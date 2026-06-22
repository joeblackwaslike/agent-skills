---
title: Observability
product: vercel
url: /docs/observability
canonical_url: "https://vercel.com/docs/observability"
last_updated: 2026-06-01
type: conceptual
prerequisites:
  []
related:
  - /docs/notebooks
  - /docs/observability/observability-plus
  - /docs/observability/insights
  - /docs/observability/debug-production-errors
  - /docs/observability/monitoring
summary: Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application performance.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/observability.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "f0ea17c485cd4fc40a989869e6808da82a9881b6655b250e0201450b696ec85c"
---

# Observability

> **🔒 Permissions Required**: Observability

Observability provides a way for you to monitor and analyze the performance and traffic of your projects on Vercel through a variety of [events](#tracked-events) and [insights](#available-insights), aligned with your app's architecture.

- Learn how to [use Observability](#using-observability) and the available [insight sections](/docs/observability#available-insights)
- Learn how you can save and organize your Observability queries with [Notebooks](/docs/notebooks)

### Observability feature access

You can use Observability on all plans to monitor your projects. [Observability Plus](/docs/observability/observability-plus) is available on Paid Pro and Enterprise teams, providing [additional features and metrics](/docs/observability/observability-plus#limitations), higher limits, and increased retention. Pro Trial does not include Observability Plus by default.

[Try Observability](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability\&title=Try+Observability) to get started.

![Image](`/docs-assets/static/docs/concepts/observability/O11y-Tab-Light.png`)

## Using Observability

How you use Observability depends on the needs of your project, for example, perhaps builds are taking longer than expected, or your Vercel Functions seem to be increasing in cost. A brief overview of how you might use the tab would be:

1. Decide what feature you want to investigate. For example, **Vercel Functions**.
2. Use the date picker or the time range selector to choose the time period you want to investigate. Users on [Observability Plus](/docs/observability/observability-plus) will have a longer retention period and more granular data.
3. Let's investigate our graphs in more detail, for example, **Error Rate**. Click and drag to select a period of time and press the **Zoom In** button.

![Image](`/docs-assets/static/docs/concepts/observability/error-rate-light.png`)

4. Then, from the list of routes below, choose to reorder either based on the error rate or the duration to get an idea of which routes are causing the most issues.
5. To learn more about specific routes, click on the route.
6. The functions view will show you the performance of each route or function, including details about the function, latency, paths, and External APIs. Note that Latency and breakdown by path are only available for [Observability Plus](/docs/observability/observability-plus) users.
7. The function view also provides a direct link to the logs for that function, enabling you to pinpoint the cause of the issue.

### Available insights

Observability provides different sections of features and traffic sources that help you monitor, analyze, and manage your applications either at the team or the project level. The following table shows their availability at each level:

| Data source                                                                                               | Team Level | Project Level |
| --------------------------------------------------------------------------------------------------------- | ---------- | ------------- |
| [Vercel Functions](/docs/observability/insights#vercel-functions)                                         | ✓          | ✓             |
| [External APIs](/docs/observability/insights#external-apis)                                               | ✓          | ✓             |
| [Edge Requests](/docs/observability/insights#edge-requests)                                               | ✓          | ✓             |
| [Middleware](/docs/observability/insights#middleware)                                                     | ✓          | ✓             |
| [Fast Data Transfer](/docs/observability/insights#fast-data-transfer)                                     | ✓          | ✓             |
| [Image Optimization](/docs/observability/insights#image-optimization)                                     | ✓          | ✓             |
| [ISR (Incremental Static Regeneration)](/docs/observability/insights#isr-incremental-static-regeneration) | ✓          | ✓             |
| [Blob](/docs/observability/insights#blob)                                                                 | ✓          |               |
| [Build Diagnostics](/docs/observability/insights#build-diagnostics)                                       |            | ✓             |
| [AI Gateway](/docs/observability/insights#ai-gateway)                                                     | ✓          | ✓             |
| [Queues](/docs/observability/insights#queues)                                                             |            | ✓             |
| [External Rewrites](/docs/observability/insights#external-rewrites)                                       | ✓          | ✓             |
| [Microfrontends](/docs/observability/insights#microfrontends)                                             | ✓          | ✓             |

## Tracked events

Vercel tracks the following event types for Observability:

- Edge Requests
- Vercel Function Invocations
- External API Requests
- Routing Middleware Invocations
- AI Gateway Requests

Vercel creates one or more of these events each time a request is made to your site. Depending on your application and configuration a single request to Vercel might be:

- 1 edge request event if it's cached.
- 1 Edge Request, 1 Middleware, 1 Function Invocation, 2 External API calls, and 1 AI Gateway request, for a total of 6 events.
- 1 edge request event if it's a static asset.

Vercel tracks events at the team level, counting them across all projects in the team.

## Pricing and limitations

Users on all plans can use Observability at no additional cost, with some [limitations](/docs/observability/observability-plus#limitations). The Observability section in the sidebar is available on the project dashboard for all projects in the team.

Paid Pro and Enterprise teams can use [Observability Plus](/docs/observability/observability-plus) for additional features, higher limits, and increased retention.

For more information on pricing, see [Pricing](/docs/observability/observability-plus#pricing).

## CLI workflows

For step-by-step debugging workflows using the Vercel CLI with Observability data, see [Debugging production 500 errors](/docs/observability/debug-production-errors).

## Explore Observability

**Insights**: Inspect requests, functions, middleware, and more. [Learn more →](/docs/observability/insights)

**Observability Plus**: Higher limits, additional metrics, and longer retention. [Learn more →](/docs/observability/observability-plus)

**Notebooks**: Save and organize Observability queries. [Learn more →](/docs/notebooks)

**Monitoring**: Build dashboards and alerts on top of metrics. [Learn more →](/docs/observability/monitoring)

**Debug production errors**: Step-by-step CLI workflow for debugging 500 errors. [Learn more →](/docs/observability/debug-production-errors)

**Managing projects**: Control which projects are included in Observability Plus. [Learn more →](/docs/observability/observability-plus#managing-projects)


---

[View full sitemap](/docs/sitemap)
