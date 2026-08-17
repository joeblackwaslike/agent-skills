---
title: Alerts
product: vercel
url: /docs/alerts
canonical_url: "https://vercel.com/docs/alerts"
last_updated: 2026-07-01
type: how-to
prerequisites:
  []
related:
  - /docs/functions/usage-and-pricing
  - /docs/routing-middleware
  - /docs/manage-cdn-usage
  - /docs/alerts/configure-alerts
  - /docs/agent/investigation
summary: "Get notified when something's wrong with your Vercel projects. Set up alerts through Slack, webhooks, or email so you can fix issues quickly."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/alerts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "fbd1d1d232d5ce9de8289b9c1de051a0e4cbc3755a6a50c126c21bce7e3b1e66"
---

# Alerts

> **🔒 Permissions Required**: Alerts


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Detect memory and OOM failures in Vercel Functions](https://vercel.com/kb/guide/detect-memory-and-oom-failures-in-serverless-functions?from=related) — Fix out-of-memory \(OOM\) errors and memory limit exceeded crashes in Vercel serverless functions. Debug 5xx errors, mon
- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts?from=related) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [vercel alerts](https://vercel.com/docs/cli/alerts?from=related) — List recent alerts for a linked project, a specific project, or an entire team with the Vercel CLI.
- [Notifications](https://vercel.com/docs/notifications?from=related) — Learn how to use Notifications to view and manage important alerts about your deployments, domains, integrations, accoun
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/alerts.graph.md](/docs/alerts.graph.md)
<!-- /docsgraph:related -->

Alerts let you know when something's wrong with your Vercel projects, like a spike in failed function invocations or unusual usage patterns. You can get these alerts by email, through Slack, or set up a webhook so you can respond to issues.

By default, you'll be notified about:

- **Usage anomaly**: When your project's usage exceeds abnormal levels.
- **Error anomaly**: When your project's error rate of function invocations exceeds abnormal levels.

## Alert types

Vercel-defined minimum activity thresholds reduce low-volume noise and are not configured in alert rules. For details, see [How error anomaly alerts trigger](#how-error-anomaly-alerts-trigger).

| Alert Type        | Triggered when                                                                                                                                                                                                                                                                             | Grouping                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| **Error Anomaly** | Fires when a route's five-minute error count is unusually high compared to its recent baseline and passes Vercel's minimum activity checks. By default, error anomalies track **5xx** status codes, but alert rules can be configured for **4xx** detections.                              | Route, HTTP status group |
| **Usage Anomaly** | Fires when your 5-minute usage is more than 4 standard deviations above your 24-hour average and crosses Vercel's minimum activity threshold. For Function invocations, Function duration, and Function CPU duration, usage combines metrics from Vercel Functions and Routing Middleware. | Metric                   |

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
- [Edge requests](/docs/manage-cdn-usage#edge-requests)

## Configure alerts

Use [Configure alerts](/docs/alerts/configure-alerts) to create built-in alert rules, set notification destinations, and configure Slack or webhooks.

## Investigate alerts with AI

When you get an alert, [Agent Investigation](/docs/agent/investigation) can run on its own to help you debug. Instead of digging through logs and metrics yourself, AI analyzes what's happening and displays highlights of the anomaly in your dashboard.

When you view an alert in the dashboard, you can click **Enable Auto Run** to trigger an investigation. This takes you to the **Agents** section in the sidebar, where you can set up investigations to run on new alerts. You can also click **Rerun** to start a new investigation.

Learn more in the [Agent Investigation docs](/docs/agent/investigation).

## How error anomaly alerts trigger

Vercel compares each completed five-minute interval with the route's trailing 24-hour baseline. These examples assume default sensitivity:

| 24-hour baseline                                                     | Current five-minute interval  | Result                                                                                                           |
| -------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| About 1,000 requests per interval, about 1% errors, and low variance | 1,000 requests and 100 errors | A high-impact anomaly triggers after the current interval                                                        |
| About 1,000 requests per interval, about 1% errors, and low variance | 1,000 requests and 40 errors  | A lower-impact anomaly waits for the next interval, then triggers if the trailing two-interval validation passes |
| Similar average traffic and error rate, but with recent error spikes | 1,000 requests and 100 errors | The anomaly might not trigger if baseline variance keeps it below the threshold                                  |

Actual results depend on baseline traffic, error rate, variance, and statistical confidence checks. Error counts alone do not guarantee an alert. The following interval does not need to contain another unusual spike, and alerts based on two intervals reflect data from both.


---

[View full sitemap](/docs/sitemap)
