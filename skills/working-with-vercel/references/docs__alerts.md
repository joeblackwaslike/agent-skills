---
title: Alerts
product: vercel
url: /docs/alerts
canonical_url: "https://vercel.com/docs/alerts"
last_updated: 2026-06-16
type: how-to
prerequisites:
  []
related:
  - /docs/functions/usage-and-pricing
  - /docs/manage-cdn-usage
  - /docs/alerts/configure-alerts
  - /docs/agent/investigation
summary: "Get notified when something's wrong with your Vercel projects. Set up alerts through Slack, webhooks, or email so you can fix issues quickly."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/alerts.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "c3dbefae1afad9751c006b67ad338ce9bfa722353754678f995ef126a1cf3f94"
---

# Alerts

> **🔒 Permissions Required**: Alerts

Alerts let you know when something's wrong with your Vercel projects, like a spike in failed function invocations or unusual usage patterns. You can get these alerts by email, through Slack, or set up a webhook so you can respond to issues.

By default, you'll be notified about:

- **Usage anomaly**: When your project's usage exceeds abnormal levels.
- **Error anomaly**: When your project's error rate of function invocations exceeds abnormal levels.

## Alert types

Vercel-defined minimum activity thresholds reduce low-volume noise and are not configured in alert rules. For error anomaly minimum error counts, see the [Error anomaly reference table](#error-anomaly-reference-table).

| Alert Type        | Triggered when                                                                                                                                                                                                                                         | Grouping          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| **Error Anomaly** | Fires when your 5-minute error rate is more than 4 standard deviations above your 24-hour average and crosses Vercel's minimum activity threshold. By default, error anomalies track **5xx** status codes, but alert rules can be configured for **4xx** detections. | Route, Http Group |
| **Usage Anomaly** | Fires when your 5-minute usage is more than 4 standard deviations above your 24-hour average and crosses Vercel's minimum activity threshold.                                                                                                                        | Metric            |

### Usage anomaly metrics

Usage anomaly alerts support these metrics:

- [Function CPU duration](/docs/functions/usage-and-pricing#active-cpu)
- [Function duration](/docs/functions/usage-and-pricing)
- [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer)
- [Edge requests](/docs/manage-cdn-usage#edge-requests)
- [Function invocations](/docs/functions/usage-and-pricing)

## Configure alerts

Use [Configure alerts](/docs/alerts/configure-alerts) to create built-in alert rules, set notification destinations, and configure Slack or webhooks.

## Investigate alerts with AI

When you get an alert, [Agent Investigation](/docs/agent/investigation) can run on its own to help you debug. Instead of digging through logs and metrics yourself, AI analyzes what's happening and displays highlights of the anomaly in your dashboard.

When you view an alert in the dashboard, you can click **Enable Auto Run** to trigger an investigation. This takes you to the **Agents** section in the sidebar, where you can set up investigations to run on new alerts. You can also click **Rerun** to start a new investigation.

Learn more in the [Agent Investigation docs](/docs/agent/investigation).

## Error anomaly reference table

Error anomaly detection compares current error rates against a 24-hour baseline using statistical confidence intervals. These are the minimum error counts needed to trigger alerts at different traffic volumes:

| Traffic Volume                     | Avg Error Rate | Minimum Errors | Notes                                    |
| ---------------------------------- | -------------- | -------------- | ---------------------------------------- |
| Sparse (1 req/hour)                | 2%             | 51 errors      | or 5 with 2 consecutive 5-min intervals  |
| Low (10 req/min)                   | 1%             | 51 errors      | or 6 with 2 consecutive 5-min intervals  |
| Medium (100 req/min)               | 0.5%           | 51 errors      | or 18 with 2 consecutive 5-min intervals |
| High (1k req/min)                  | 0.5%           | 106 errors     |                                          |
| High (10k req/min)                 | 0.2%           | 361 errors     |                                          |
| Zero Error Baseline (1000 req/min) | 0%             | 51 errors      | or 5 with 2 consecutive 5-min intervals  |
| High Error Rate (100 req/min)      | 5%             | 106 errors     |                                          |


---

[View full sitemap](/docs/sitemap)
