---
title: Observability
product: vercel
url: /docs/observability
canonical_url: "https://vercel.com/docs/observability"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  []
related:
  - /docs/observability/observability-plus
  - /docs/observability/insights
  - /docs/observability/debug-production-errors
  - /docs/notebooks
  - /docs/query/monitoring
summary: Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/observability.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "88201f5282734db7e6304588a12122fd59cc466a9b33082dc7e41762ee31db3a"
---

# Observability

## Debug applications with Vercel Observability

Find production errors, capture request traces, and discover queryable metrics from the dashboard or Vercel CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI query prompting now available in Observability Plus](https://vercel.com/changelog/ai-query-prompting-now-available-in-observability-plus?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related)
- [Anomaly alert configuration now available](https://vercel.com/changelog/anomaly-alert-configuration-now-available?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related)
- [Create and share queries with notebooks in Vercel Observability](https://vercel.com/changelog/create-and-share-queries-with-notebooks-in-vercel-observability?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related)
- [Edge Function metrics now available in Monitoring](https://vercel.com/changelog/edge-function-metrics-now-available-in-monitoring?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related)
- [Enhanced firewall data now available in Monitoring](https://vercel.com/changelog/enhanced-firewall-data-now-available-in-monitoring?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related)
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [How to prepare your storefront for Black Friday traffic](https://vercel.com/kb/guide/black-friday-preparation?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related) — A practical checklist for keeping your storefront fast and your checkout path healthy through Black Friday and Cyber Mon
- [Connect Next.js to Amazon Aurora PostgreSQL using Vercel Marketplace](https://vercel.com/kb/guide/connect-next-js-to-amazon-aurora-postgresql-using-vercel-marketplace?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to connect your Next.js application to Amazon Aurora PostgreSQL securely using the Vercel Marketplace AWS inte
- [Debug routing on Vercel](https://vercel.com/kb/guide/debug-routing-on-vercel?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to debug how Vercel decides where to route your request
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [Agentic Infrastructure](https://vercel.com/blog/agentic-infrastructure?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related)
- [How to integrate AI into your business](https://vercel.com/blog/how-to-integrate-ai-into-your-business?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/observability.graph.md](/docs/observability.graph.md?from=related&source_path=%2Fdocs%2Fobservability&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### Inspect 500 errors

```bash filename="terminal"
vercel logs --environment production --status-code 500 --json
```

#### Capture a request trace

```bash filename="terminal"
vercel curl --trace --json /api/hello
```

#### List metrics

```bash filename="terminal"
# Most metrics require Observability Plus
vercel metrics list
```

> **🔒 Permissions Required**: Observability

### Observability feature access

You can use Observability on all plans to monitor your projects. [Observability Plus](/docs/observability/observability-plus) is available on Paid Pro and Enterprise teams, providing [additional features and metrics](/docs/observability/observability-plus#limitations), higher limits, and increased retention. Pro Trial does not include Observability Plus by default.

![Image](`/docs-assets/static/docs/concepts/observability/O11y-Tab-Light.png`)

## Debug errors and latency with Observability

Use logs to find failing requests, traces to inspect one request path, and metrics to compare behavior over time. Use JSON output when a script or coding agent needs structured data.

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

If you've [excluded specific projects](/docs/observability/observability-plus#managing-projects) from Observability Plus, those projects won't generate metered events.

## Pricing and limitations

Users on all plans can use Observability at no additional cost, with some [limitations](/docs/observability/observability-plus#limitations). The Observability section in the sidebar is available on the project dashboard for all projects in the team.

Paid Pro and Enterprise teams can use [Observability Plus](/docs/observability/observability-plus) for additional features, higher limits, and increased retention.

You can also [manage which projects](/docs/observability/observability-plus#managing-projects) are included in your Observability Plus subscription to control costs.

For more information on pricing, see [Pricing](/docs/observability/observability-plus#pricing).

## CLI workflows

For step-by-step debugging workflows using the Vercel CLI with Observability data, see [Debugging production 500 errors](/docs/observability/debug-production-errors).

## Explore Observability

**Insights**: Inspect requests, functions, middleware, and more. [Learn more →](/docs/observability/insights)

**Observability Plus**: Higher limits, additional metrics, and longer retention. [Learn more →](/docs/observability/observability-plus)

**Notebooks**: Save and organize Observability queries. [Learn more →](/docs/notebooks)

**Monitoring**: Build dashboards and alerts on top of metrics. [Learn more →](/docs/query/monitoring)

**Debug production errors**: Step-by-step CLI workflow for debugging 500 errors. [Learn more →](/docs/observability/debug-production-errors)

**Managing projects**: Control which projects are included in Observability Plus. [Learn more →](/docs/observability/observability-plus#managing-projects)


---

[View full sitemap](/docs/sitemap)
