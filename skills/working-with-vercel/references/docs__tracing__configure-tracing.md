---
title: Configuring Tracing
product: vercel
url: /docs/tracing/configure-tracing
canonical_url: "https://vercel.com/docs/tracing/configure-tracing"
last_updated: 2026-11-03
type: how-to
prerequisites:
  - /docs/tracing
related:
  - /docs/tracing/session-tracing
  - /docs/tracing/instrumentation
  - /docs/rbac/access-roles/team-level-roles
  - /docs/tracing
  - /docs/cli/traces
summary: Turn tracing on or off and control sampling for production and preview traffic, including default tracing for Next.js projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/tracing/configure-tracing.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "9ac0d97f831e87b2e9e29d460e6f50029be17b679b9835d8d4da11afea9044fd"
---

# Configuring Tracing

With tracing turned on, Vercel continuously collects traces from your production and preview traffic, so you can debug real requests without reproducing them first. You control how much Vercel collects with sampling rules you set per project. New projects on Next.js 16.5 or later have it on by default.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Tracing is now generally available](https://vercel.com/changelog/vercel-tracing-is-now-generally-available)
- [Trace and debug eve agent runs](https://vercel.com/kb/guide/trace-and-debug-eve-agent-runs) — Inspect eve traces in Vercel Agent Runs, control captured content, export OpenTelemetry spans, and test fixes with regre
- [Vercel Pricing](https://vercel.com/pricing) — Choose a Vercel plan and compare features and usage pricing.
- [Always-on tracing for production and preview traffic](https://vercel.com/changelog/always-on-tracing-for-production-and-preview-traffic)
- [Search trace spans from the Vercel CLI](https://vercel.com/changelog/search-trace-spans-from-the-vercel-cli)
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [AI Gateway Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi
- [Manage and optimize usage for Observability](https://vercel.com/docs/manage-and-optimize-observability) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Understanding Vercel](https://vercel.com/docs/plans/pro-plan/trials) — Learn all about Vercel's Pro Plan free trial, including features, usage limits, and options post-trial. Learn how to man
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.

Full cross-link map for this page: [/docs/tracing/configure-tracing.graph.md](/docs/tracing/configure-tracing.graph.md)
<!-- /docsgraph:related -->

> Tracing is available on Enterprise, Pro, and Hobby plans

## When to use tracing

Tracing captures traces from real traffic in the background, unlike [Session Tracing](/docs/tracing/session-tracing), which only captures requests from your own browser session. Because Vercel has already collected the traces, you don't have to reproduce a problem to investigate it.

Use tracing to:

- Debug production issues after they happen, using traces that Vercel already collected.
- Catch rare or intermittent errors that you can't reliably reproduce.
- Monitor performance across real user traffic, not only your own session.
- Control how many traces you collect with sampling rules that target specific environments and paths.

## What tracing captures

Tracing captures infrastructure and fetch spans automatically. To also capture framework and custom spans, [instrument your application with `@vercel/otel`](/docs/tracing/instrumentation). If your project is eligible for [default tracing](#default-tracing-for-new-next.js-projects), Vercel adds `@vercel/otel` for framework spans. For custom spans, set up `@vercel/otel` yourself.

- **Infrastructure spans**: How the request moved through Vercel, including routing, middleware, and caching.
- **Fetch spans**: Outbound HTTP requests from your functions. See [How OpenTelemetry affects fetch spans](/docs/tracing/instrumentation#how-opentelemetry-affects-fetch-spans).
- **Framework spans**: Spans your framework emits, such as Next.js routes and rendering. Next.js 13.4 or later emits them once `@vercel/otel` runs.
- **Custom spans**: Spans you add with `@opentelemetry/api`. See [Adding custom spans](/docs/tracing/instrumentation#adding-custom-spans).

## Prerequisites

- A Vercel project deployed to production or preview.
- Permission to update the project. Managing sampling rules requires a role with project update access. See [team-level roles](/docs/rbac/access-roles/team-level-roles).

## Turn on tracing

If your project is eligible for [default tracing](#default-tracing-for-new-next.js-projects), you don't need to turn on tracing. Vercel turns it on for you after your first successful build on Next.js 16.5 or later.

For any other project, turn on tracing by adding at least one sampling rule with a rate above 0%. Vercel starts collecting traces as soon as you save it.

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

## Default tracing for new Next.js projects

Vercel turns on tracing for new Next.js projects, so you get traces, including Next.js framework spans, without any setup.

Your project is eligible for default tracing when all of these are true:

- You created the project on or after November 5, 2026.
- The deployment builds on Vercel with Next.js 16.5 or later. Deployments made with `vercel deploy --prebuilt` don't qualify.
- The deployment includes at least one Node.js function. Static exports and apps that only use the Edge runtime don't qualify.
- You haven't turned off tracing for the project.

After the first successful build on Next.js 16.5 or later, Vercel:

1. Turns on tracing with one sampling rule that traces 100% of requests in all environments. You can change this rule like any other. See [Manage sampling rules](#manage-sampling-rules).
2. Adds `@vercel/otel` to each build so your traces include Next.js framework spans. Vercel doesn't change your `package.json` or lockfile. Spans use your project name as the service name. To use a different name, set the `OTEL_SERVICE_NAME` environment variable.

Vercel doesn't add `@vercel/otel` if your project:

- Has its own `instrumentation` file, such as `instrumentation.ts`, in the project, its `src` folder, or a monorepo parent folder.
- Uses `@opentelemetry/api` 1.10 or later, directly or through another package.
- Sets `instrumentationInject` in its Next.js config, directly or through a plugin.

Tracing still collects infrastructure spans. To get framework spans, set up `@vercel/otel` yourself as described in [Getting started](/docs/tracing/instrumentation#getting-started).

Vercel bills default tracing like any other tracing usage. The default rule traces 100% of requests, and every indexed span uses at least one span unit. For example, if each request produces 20 indexed spans, tracing 100,000 requests uses at least 2 million span units. To use fewer span units, [lower the rule's **Rate**](#manage-sampling-rules) or [turn off tracing](#turn-off-tracing). For rates, see [Usage and pricing](#usage-and-pricing).

## Manage sampling rules

Manage sampling rules in [**Settings → Tracing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ftracing\&title=Go+to+Tracing+settings), or from the Logs page as described in [Turn on tracing](#turn-on-tracing). You can add up to 10 rules per project. Vercel applies the first rule that matches a request, and new rules go to the bottom of the list. To learn how Vercel picks between overlapping rules, see [Sampling](/docs/tracing#sampling).

To collect fewer traces, lower a rule's **Rate** or narrow it with a **Request Path Prefix**.

To stop tracing one path, such as `/health`, put a 0% rule for that path above any broader rule. You can't reorder rules, so if a broader rule already exists, such as the 100% rule from default tracing, make these changes before you save:

1. Remove the broader rule.
2. Add the 0% rule for the path.
3. Add the broader rule back.
4. Select **Save**.

You can also manage rules from the terminal with [`vercel traces config`](/docs/cli/traces#manage-trace-sampling-rules). The CLI accepts rates from 1 to 100%, so add 0% rules from the dashboard.

## Turn off tracing

To turn off tracing for a project:

1. Select your team and project, then go to [**Settings → Tracing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ftracing\&title=Go+to+Tracing+settings).
2. Remove all sampling rules.
3. Select **Save**.

Vercel stops collecting production and preview traces for the project as soon as you save, and you stop incurring tracing charges for it.

If the project has [default tracing](#default-tracing-for-new-next.js-projects), Vercel also stops adding `@vercel/otel` from your next deployment and doesn't turn default tracing back on. To turn tracing on again, add a sampling rule. Vercel then resumes adding `@vercel/otel` from your next deployment.

## View your traces

Once tracing is collecting data, view your traces in the dashboard:

1. Select your team and project, then open [**Traces**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ftraces\&title=Go+to+Traces) in the sidebar.
2. Search or filter to find the request you want.
3. Select a row to open its spans.

The trace timeline shows the spans and their durations:

![Trace timeline showing spans for a request.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/observability/tracing-span-example-light.png?lightbox)

To open the trace for a single request, start from its log in [**Logs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Flogs\&title=Go+to+Logs). For the full walkthrough, including the available filters and the timeline, tree, and waterfall layouts, see [Viewing traces in the dashboard](/docs/tracing#viewing-traces-in-the-dashboard).

You can also inspect a single trace from the terminal with [`vercel traces inspect <request-id>`](/docs/cli/traces), using the request ID from a log line.

## Usage and pricing

Vercel measures tracing usage in span units, counting the spans it indexes after sampling.

Plan

Pricing

Hobby

1

million span units included per month

Pro

$0.50

per 1 million span units

Enterprise

Starting at

$0.50

per 1 million span units

An indexed span up to 2 KiB (2,048 bytes) counts as one span unit. Larger spans count in additional 2 KiB increments. For example, a 3 KiB span counts as two span units, and a 5 KiB span counts as three.

On the Hobby plan, when your team uses all of its included span units for the usage period, Vercel pauses tracing for every project on the team. Tracing doesn't resume on its own. After the period ends, anyone with permission to update every project on the team can select **Resume Tracing** in **Settings → Tracing**. To resume right away, upgrade to Pro.

To see how many span units your team has used, open [**Usage**](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fusage%2Ftracing-span-units\&title=Go+to+Usage) in your team's dashboard. For more on tracking spend, see [Manage and optimize usage](/docs/pricing/manage-and-optimize-usage).

To stop tracing charges for a project, remove all of its sampling rules. See [Turn off tracing](#turn-off-tracing).

## Retention

Vercel keeps collected traces for these periods:

| Plan       | Retention |
| ---------- | --------- |
| Hobby      | 3 days    |
| Pro        | 14 days   |
| Enterprise | 14 days   |

## Limitations

- Each traced request is limited to **10 MB of compressed trace data**.
- Vercel drops spans that still exceed **1 MB of compressed data** after [attribute truncation](/docs/tracing#attribute-truncation).
- Custom spans from functions using the [Edge runtime](/docs/functions/runtimes/edge) don't appear in traces.

For details, see the shared [tracing limitations](/docs/tracing#limitations).

## More resources

- [Tracing overview](/docs/tracing)
- [Session Tracing](/docs/tracing/session-tracing)
- [Instrumentation](/docs/tracing/instrumentation)
- [Trace Drains](/docs/drains/reference/traces)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
