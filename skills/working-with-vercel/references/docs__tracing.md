---
title: Tracing
product: vercel
url: /docs/tracing
canonical_url: "https://vercel.com/docs/tracing"
last_updated: 2026-07-06
type: how-to
prerequisites:
  []
related:
  - /docs/tracing/always-on-tracing
  - /docs/tracing/session-tracing
  - /docs/drains/reference/traces
  - /docs/tracing/instrumentation
  - /docs/logs/runtime
summary: Learn how to trace your application to understand performance and infrastructure details.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/tracing.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "a93596c30a9b97b29645974672489576583b9db246cb59f0914e5084a1f78083"
---

# Tracing

In observability, tracing is the process of collecting and analyzing how a request or operation flows through your application and through Vercel's infrastructure. Traces are used to explain how your application works, debug errors, and identify performance bottlenecks.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank?from=related) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, security defaults, AI infrastructure, GPU comp
- [OpenTelemetry](https://nextjs.org/docs/app/guides/open-telemetry?from=related) — Learn how to instrument your Next.js app with OpenTelemetry.
- [Observability](https://eve.dev/docs/guides/instrumentation?from=related) — Trace an agent with OpenTelemetry in instrumentation.ts, read the workflow run tags eve emits, and debug discovery with
- [SigNoz](https://ai-sdk.dev/providers/observability/signoz?from=related)
- [Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Observability](https://vercel.com/docs/eve/observability?from=related) — View agent runs in the Vercel dashboard with no setup, and optionally export AI SDK spans through OpenTelemetry.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.

Full cross-link map for this page: [/docs/tracing.graph.md](/docs/tracing.graph.md)
<!-- /docsgraph:related -->

You can think of a trace as the story of a single request:

**Request arrives at Vercel CDN -> Middleware executes -> Function handler processes request -> Database query runs -> Response returns to client**

Each step in this process is a **span**. A span is a single unit of work in a trace. Spans are used to measure the performance of each step in the request and include a name, a start time, an end time, and a duration.

## Automatic instrumentation

Vercel automatically instruments your application without needing any additional code changes. When you enable [always-on tracing](/docs/tracing/always-on-tracing) or start a [session trace](/docs/tracing/session-tracing), you'll be able to visualize traces in the dashboard for:

- **Vercel infrastructure**: You'll be able to view spans showing the lifecycle of each invocation of your Vercel Functions and how it moves through Vercel's infrastructure, including routing, middleware, caching, and other infrastructure details.
- **Outbound HTTP calls**: The HTTP requests made from your function will be displayed as fetch spans, displaying information on the length of time, location, and other attributes.

To send this trace data to an external observability tool, use [Trace Drains](/docs/drains/reference/traces).

For additional tracing, such as framework spans, you can install the [@vercel/otel](/docs/tracing/instrumentation) package to use the OpenTelemetry SDK. In addition, you can [add custom spans](/docs/tracing/instrumentation#adding-custom-spans) to your traces to capture spans and gain more visibility into your application.

## Always-on tracing

Always-on tracing continuously collects traces from your production and preview traffic, so you can investigate real requests without reproducing them first. You choose how much to collect with sampling rules you set per project.

Unlike [session tracing](/docs/tracing/session-tracing), it captures traces across real user traffic, not just your own browser session. Collection is sampled at the rate you set. It lets you:

- Debug issues after they happen, using traces that were already collected.
- Catch rare or intermittent errors across real user traffic.
- Monitor performance for all sampled requests, not just your own session.

> **💡 Note:** Always-on tracing is in Beta and available on all plans.

To turn it on and configure sampling rules, see [Always-on tracing](/docs/tracing/always-on-tracing).

## Sampling

Vercel collects a sample of your traffic based on the sampling rules you configure, evaluates these rules in the order they appear in the table and applies the first one that matches a request, ignoring the rest. Since new rules are added to the bottom, add more specific rules first. Requests that do not match any rule are not sampled.

Sampling applies to a whole trace at once, not to individual spans. For each trace, Vercel makes one keep-or-drop decision and applies it to every span, so you never see a partial trace: a sampled request keeps all of its spans, and a dropped one keeps none.

Always-on tracing and Trace Drains use separate rule sets that behave differently when empty. With no rules, always-on tracing collects nothing, while a [Trace Drain](/docs/drains/reference/traces) forwards all traces. Adding rules to either then limits collection to the requests those rules match. To configure rules, see [Always-on tracing](/docs/tracing/always-on-tracing#enable-always-on-tracing).

## Session tracing

Session tracing captures spans for requests made during **your** individual browser session, using the Vercel toolbar. Use it for targeted, interactive debugging when you want to trace a specific flow you're clicking through, without collecting traces for all of your traffic.

You can initiate a session trace in two ways:

- **Page Trace**: Trace a single page load to see how that specific request flows through your application.
- **Session Trace**: Start an ongoing trace that captures all requests from your browser until you stop it or clear cookies.

For detailed instructions on starting traces, managing active sessions, and viewing previous traces, see the [Session Tracing](/docs/tracing/session-tracing) documentation.

## Using OpenTelemetry

Vercel uses [OpenTelemetry](https://opentelemetry.io/), an open standard for collecting traces from your application. In order to capture framework and custom spans, install the `@vercel/otel` package. This package provides helper methods to make it easier to instrument your application with OpenTelemetry.

See the [Instrumentation](/docs/tracing/instrumentation) guide to set up OpenTelemetry for your project.

## Viewing traces in the dashboard

Once traces are being collected, through always-on tracing or a session trace, you can visualize them in your dashboard:

1. Select your team from the team switcher and select your project.
2. Select the [**Logs** section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Go+to+Logs).
3. Use the tracing icon  in the filter bar to filter to traces. You can filter traces using [all the same filters available](/docs/logs/runtime#log-filters) in the **Logs** section in the sidebar of the dashboard. To view traces for requests to your browser, press the user icon next to the Traces icon.
4. Find the request you want to view traces for and click the **Trace** button at the bottom of the request details panel. This will open the traces for that request:

![Image](https://vercel.com/front/docs/observability/trace-timeline-view-light.png?lightbox)

### Anatomy of a trace

When you view a trace in the dashboard, you see a visualization of how a request flows through your application and Vercel's infrastructure. Each horizontal bar in the visualization is a **span**, which represents a single unit of work with a start time, end time, and duration.

Your traces display the following types of spans:

| Span type                | Visual appearance                    | Description                                                                                                                                                                    |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Infrastructure spans** | Black and white with a triangle icon | Capture how requests move through Vercel's infrastructure, including routing, middleware, and caching.                                                                         |
| **Fetch spans**          | Green                                | Represent HTTP requests made from your functions.                                                                                                                              |
| **Framework spans**      | Blue                                 | Appear when you [instrument your application](/docs/tracing/instrumentation) with OpenTelemetry. Next.js 13.4+ automatically contributes spans for routes and rendering tasks. |
| **Custom spans**         | Blue                                 | [Custom instrumentation](/docs/tracing#adding-custom-spans) you can add to your application using OpenTelemetry.                                                               |

To view details of a span, click on the span in the trace. The sidebar will display the span's details. For infrastructure spans, a "what is this?" explanation will be provided.

To view trace spans in more detail, click and drag to zoom in on a specific area of the trace. You can also use the zoom controls in the bottom right corner of the trace.

## Exporting traces to a third party

You can export traces to a third party observability provider using [Vercel Drains](/docs/drains). This can be done either by sending traces to a custom HTTP endpoint, or by using a [native integration from the Vercel Marketplace](/marketplace/category/observability).

See the [Vercel Drains](/docs/drains) page to learn how to set up a Drain to export traces to a third party observability provider.

### Using custom OpenTelemetry setup with Sentry

If you want to trace your Vercel application using `@vercel/otel` while also using Sentry SDK v8+, you need to configure them to work together. The Sentry SDK [automatically sets up OpenTelemetry by default](https://docs.sentry.io/platforms/javascript/guides/nextjs/opentelemetry/), which can conflict with Vercel's OpenTelemetry setup and break trace propagation.

To use both together, configure Sentry to work with your custom OpenTelemetry setup by following the [Sentry custom setup documentation](https://docs.sentry.io/platforms/javascript/guides/nextjs/opentelemetry/custom-setup/).

> **💡 Note:** **Using Vercel OTel instead of Sentry:** If you prefer to use Vercel's
> OpenTelemetry setup instead of Sentry's OTel instrumentation, add
> `skipOpenTelemetrySetup: true` to your Sentry initialization in your
> `instrumentation.ts` file. This resolves conflicts between Vercel's OTel and
> Sentry v8+ that can prevent traces from reaching downstream providers.

## Attribute truncation

When a span exceeds **1 MB of compressed data**, Vercel may truncate
oversized attributes to keep the span within the size limit. Vercel starts
with the largest attributes and adds a matching
`<attribute_name>.truncated` boolean attribute set to `true` for each truncated
attribute.

## Limitations

- Each traced request is limited to **10 MB of compressed trace data**.
- Spans that still exceed **1 MB of compressed data** after [attribute truncation](#attribute-truncation) are dropped.
- Custom spans from functions using the [Edge runtime](/docs/functions/runtimes/edge) don't appear in traces, regardless of how they're collected.

## More resources

- [Always-on Tracing](/docs/tracing/always-on-tracing)
- [Using Vercel Drains](/docs/drains)
- [Trace Drains](/docs/drains/reference/traces)
- [Learn about the Vercel toolbar](/docs/vercel-toolbar)
- [Session Tracing](/docs/tracing/session-tracing)


---

[View full sitemap](/docs/sitemap)
