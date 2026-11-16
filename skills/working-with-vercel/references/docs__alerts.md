---
title: Alerts
product: vercel
url: /docs/alerts
canonical_url: "https://vercel.com/docs/alerts"
last_updated: 2026-09-09
type: how-to
prerequisites:
  []
related:
  - /docs/alerts/configure-alerts
  - /docs/observability/observability-plus
  - /docs/functions/usage-and-pricing
  - /docs/routing-middleware
  - /docs/manage-cdn-usage
summary: "Get notified when something's wrong with your Vercel projects. Set up alerts through Slack, webhooks, or email so you can fix issues quickly."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/alerts.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9024fc46ba7db02fd7b52dff5041368ea25af56d3a0ff38cb6e0c5caf8a5b0b9"
---

# Alerts

> Alerts are available on Enterprise and Pro plans with Observability Plus

Alerts let you know when something's wrong with your Vercel projects, like a spike in failed function invocations or unusual usage patterns. You can get these alerts by email, through Slack, or set up a webhook so you can respond to issues.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [Anomaly alert configuration now available](https://vercel.com/changelog/anomaly-alert-configuration-now-available)
- [Anomaly alerts are now generally available](https://vercel.com/changelog/anomaly-alerts-ga)
- [Anomaly alerts now available via email](https://vercel.com/changelog/anomaly-alerts-now-available-via-email)
- [Anomaly alerts now in limited beta for Enterprise customers](https://vercel.com/changelog/anomaly-alerts-now-in-limited-beta-for-enterprise-customers)
- [Anomaly alerts now in public beta](https://vercel.com/changelog/anomaly-alerts-now-in-public-beta)
- [Detect memory and OOM failures in Vercel Functions](https://vercel.com/kb/guide/detect-memory-and-oom-failures-in-serverless-functions) — Fix out-of-memory \\(OOM\\) errors and memory limit exceeded crashes in Vercel serverless functions. Debug 5xx errors, mon
- [Vercel Agent can now run AI investigations](https://vercel.com/blog/vercel-agent-can-now-run-ai-investigations)
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Manage and optimize usage for Observability](https://vercel.com/docs/manage-and-optimize-observability) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.

Full cross-link map for this page: [/docs/alerts.graph.md](/docs/alerts.graph.md)
<!-- /docsgraph:related -->

By default, you'll be notified about:

- **Usage anomaly**: When your project's usage exceeds abnormal levels.
- **Error anomaly**: When your project's error rate of function invocations exceeds abnormal levels.

## Alert types

Vercel-defined minimum activity thresholds reduce low-volume noise and are not configured in monitors. For details, see [How error anomaly alerts trigger](#how-error-anomaly-alerts-trigger).

| Alert Type        | Triggered when                                                                                                                                                                                                                                                                             | Grouping                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| **Error Anomaly** | Fires when a route's five-minute error count is unusually high compared to its recent baseline and passes Vercel's minimum activity checks. By default, error anomalies track **5xx** status codes, but monitors can be configured for **4xx** detections.                              | Route, HTTP status group |
| **Usage Anomaly** | Fires when your 15-minute usage is more than 4 standard deviations above both your 24-hour and 7-day averages and crosses Vercel's minimum activity threshold. For Function invocations, Function duration, and Function CPU duration, usage combines metrics from Vercel Functions and Routing Middleware. | Metric                   |

Beyond these built-in alert types, [custom monitors](/docs/alerts/configure-alerts#configure-custom-rules) let you define project-scoped detection logic with Observability metric or ratio queries, triggering when a value crosses a threshold or becomes anomalous for the selected alert window. Custom monitors are available only with [Observability Plus](/docs/observability/observability-plus).

### Usage anomaly metrics

Usage anomaly alerts support these metrics:

- CPU duration
  - [Function CPU duration](/docs/functions/usage-and-pricing#active-cpu)
  - [Routing Middleware CPU duration](/docs/routing-middleware#observability)
- Duration
  - [Function duration](/docs/functions/usage-and-pricing)
  - [Routing Middleware duration](/docs/routing-middleware#observability)
- Invocations
  - [Function invocations](/docs/functions/usage-and-pricing#invocations)
  - [Routing Middleware invocations](/docs/routing-middleware#observability)
- [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer)
- [CDN Requests](/docs/manage-cdn-usage#cdn-requests)

## Observability Plus activation period

Alerts only use data collected while [Observability Plus](/docs/observability/observability-plus) was active. After you enable or re-enable Observability Plus for your team, Vercel holds back alerts until it has enough data, which avoids false positives:

- **Error anomalies**, including external API failure insights, start after Observability Plus has been active for 24 hours.
- **Usage anomalies** start after Observability Plus has been active for 3 days. Until it has been active for 7 days, the 7-day average uses the data collected so far.

If you disable Observability Plus for your team or for a project, alerts stop for that scope. When you re-enable it for your team, the activation periods start again. When you re-enable it for a project, that project's alerts resume without a new activation period.

## Configure alerts

Use [Configure alerts](/docs/alerts/configure-alerts) to create built-in monitors, set notification destinations, and configure Slack or webhooks.

You can also configure [custom
monitors](/docs/alerts/configure-alerts#configure-custom-rules) with
project-scoped Observability metric or ratio queries.

## Investigate alerts with AI

When you get an [eligible](/docs/agent/investigation#eligible-alerts-for-automatic-investigation) Medium or High anomaly alert, [Vercel Agent Investigation](/docs/agent/investigation) can run automatically. Low-severity alerts do not start automatic investigations.

In the investigation panel, click **Configure Vercel Agent** to manage automatic investigations. You can also run an investigation manually.

Learn more in the [Agent Investigation docs](/docs/agent/investigation).

## How error anomaly alerts trigger

Vercel compares each completed five-minute interval with the route's trailing 24-hour baseline. These examples assume default sensitivity:

| 24-hour baseline                                                     | Current five-minute interval  | Result                                                                                                           |
| -------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| About 1,000 requests per interval, about 1% errors, and low variance | 1,000 requests and 100 errors | A high-impact anomaly triggers after the current interval                                                        |
| About 1,000 requests per interval, about 1% errors, and low variance | 1,000 requests and 40 errors  | A lower-impact anomaly waits for the next interval, then triggers if the trailing two-interval validation passes |
| Similar average traffic and error rate, but with recent error spikes | 1,000 requests and 100 errors | The anomaly might not trigger if baseline variance keeps it below the threshold                                  |

Actual results depend on baseline traffic, error rate, variance, and statistical confidence checks. Error counts alone do not guarantee an alert. The following interval does not need to contain another unusual spike, and alerts based on two intervals reflect data from both.

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
