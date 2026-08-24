---
title: Always-on Tracing
product: vercel
url: /docs/tracing/always-on-tracing
canonical_url: "https://vercel.com/docs/tracing/always-on-tracing"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/tracing
related:
  - /docs/tracing/session-tracing
  - /docs/rbac/access-roles/team-level-roles
  - /docs/tracing/instrumentation
  - /docs/tracing
  - /docs/cli/traces
summary: Learn about always-on tracing on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/tracing/always-on-tracing.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "09b49ccc897cbd569cc8c1ff93def6a4fae91d23f09c7bfb9792b27098bbc382"
---

# Always-on Tracing

With always-on tracing, Vercel continuously collects traces from your production and preview traffic, so you can debug real requests without reproducing them first. You control how much data is collected with sampling rules you set per project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Observability Plus](https://vercel.com/docs/observability/observability-plus?from=related) — Learn about using Observability Plus and its limits.
- [Runtime](https://vercel.com/docs/logs/runtime?from=related) — Learn how to search, inspect, and share your runtime logs with the Logs tab.
- [Manage & Optimize](https://vercel.com/docs/manage-and-optimize-observability?from=related) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi

Full cross-link map for this page: [/docs/tracing/always-on-tracing.graph.md](/docs/tracing/always-on-tracing.graph.md)
<!-- /docsgraph:related -->

> **🔒 Permissions Required**: Always-on tracing

## When to use always-on tracing

Always-on tracing captures traces from real traffic in the background, unlike [session tracing](/docs/tracing/session-tracing), which only captures requests from your own browser session. Because the traces are already collected, you don't have to reproduce a problem to investigate it.

Use always-on tracing to:

- Debug production issues after they happen, using traces that were already collected.
- Catch rare or intermittent errors that you can't reliably reproduce.
- Monitor performance across real user traffic, not just your own session.
- Control how many traces you collect with sampling rules that target specific environments and paths.

## Prerequisites

- A Vercel project deployed to production or preview.
- Permission to update the project. Managing sampling rules requires a role with project update access. See [team-level roles](/docs/rbac/access-roles/team-level-roles).

Always-on tracing captures infrastructure and outbound fetch spans automatically. To also capture framework and custom spans, [instrument your application with `@vercel/otel`](/docs/tracing/instrumentation). Once instrumented, Next.js 13.4+ contributes framework spans for routes and rendering automatically.

## Enable always-on tracing

You turn on always-on tracing by adding at least one sampling rule with a rate above 0%. Vercel starts collecting traces as soon as you save it.

You can configure sampling rules from two places in the dashboard:

- **Project settings**: Select your team and project, then go to [**Settings → Tracing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ftracing\&title=Go+to+Tracing+settings).
- **Logs page**: Select your team and project, then open [**Logs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Go+to+Logs) in the sidebar. In the search bar, select the settings icon next to the tracing filter icon.

To add a rule:

1. Open the tracing configuration from either entry point above.
2. Select **Add Sampling Rule**.
3. Choose the **Environment** to sample: **All Environments**, **Production**, or **Preview**.
4. Set the **Rate**, the percentage of matching requests to trace, from 0 to 100%. A rate of 0% matches requests but collects nothing.
5. (Optional) Enter a **Request Path Prefix** to apply the rule only to matching paths, such as `/api`. Leave it blank to match every path.
6. Select **Save**.

To sample different environments or paths at different rates, add more rules. You can add up to 10 rules per project. Because the first matching rule wins and new rules are added to the bottom, add a rule with a 0% rate before a broader rule to exclude matching requests, such as a 0% rule on `/health`. To learn how overlapping rules are resolved and how sampling works, see [Sampling](/docs/tracing#sampling).

To collect fewer traces, lower the sampling **Rate** or narrow rules with a **Request Path Prefix**. To turn off always-on tracing, remove all sampling rules and save. With no rules, Vercel stops collecting production and preview traces for the project.

You can also read and write the same rules from the terminal with [`vercel traces config`](/docs/cli/traces#manage-trace-sampling-rules). The CLI accepts rates from 1 to 100%, so a 0% rule has to be added from the dashboard.

## View your traces

Once always-on tracing is collecting data, view your traces in the dashboard:

1. Select your team and project, then open [**Logs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Go+to+Logs) in the sidebar.
2. Use the tracing icon in the filter bar to filter to traces.
3. Find a request and select **Trace** to open its spans.

For the full walkthrough, including the timeline, tree, and waterfall layouts, see [Viewing traces in the dashboard](/docs/tracing#viewing-traces-in-the-dashboard).

You can also inspect a single trace from the terminal with [`vercel traces get <request-id>`](/docs/cli/traces), using the request ID from a log line.

## Usage and pricing

During Beta, always-on tracing usage is measured in span units for spans indexed after sampling.

An indexed span up to 2 KB counts as one span unit. Larger spans count in additional 2 KB increments. For example, a 3 KB span counts as two span units, and a 5 KB span counts as three.

## Retention

During Beta, collected traces are retained for these periods:

| Plan       | Retention |
| ---------- | --------- |
| Hobby      | 1 hour    |
| Pro        | 1 day     |
| Enterprise | 3 days    |

## Limitations

Always-on tracing follows the shared [Tracing limitations](/docs/tracing#limitations).

## More resources

- [Tracing overview](/docs/tracing)
- [Session Tracing](/docs/tracing/session-tracing)
- [Instrumentation](/docs/tracing/instrumentation)
- [Trace Drains](/docs/drains/reference/traces)


---

[View full sitemap](/docs/sitemap)
