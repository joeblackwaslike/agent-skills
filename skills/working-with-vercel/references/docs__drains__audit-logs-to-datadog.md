---
title: Drain Audit Logs to Datadog
product: vercel
url: /docs/drains/audit-logs-to-datadog
canonical_url: "https://vercel.com/docs/drains/audit-logs-to-datadog"
last_updated: 2026-08-06
type: how-to
prerequisites:
  - /docs/drains
related:
  - /docs/drains/using-drains
  - /docs/drains/reference/audit-logs
summary: Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/audit-logs-to-datadog.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c1bbcfce8b39cdfa77deec2da0758ad36d18e514f622fa90aa906115da5a6726"
---

# Drain Audit Logs to Datadog

> **🔒 Permissions Required**: Audit Log Drains


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I store logs on Vercel?](https://vercel.com/kb/guide/how-do-i-store-logs-on-vercel?from=related) — Learn how to store logs on Vercel.
- [Migrating from SIEM](https://vercel.com/docs/audit-log/migrating-to-drains?from=related) — Move your SIEM integration from Custom SIEM Log Streaming to Audit Log Drains, with wider event coverage and a new event
- [Drain Audit Logs to Splunk](https://vercel.com/docs/drains/audit-logs-to-splunk?from=related) — Learn how to forward Vercel Audit Log Drain events to Splunk using the HTTP Event Collector \(HEC\).
- [Drain Audit Logs to Panther](https://vercel.com/docs/drains/audit-logs-to-panther?from=related) — Learn how to forward Vercel Audit Log Drain events to Panther using Panther's built-in Vercel source.
- [Drain Audit Logs to S3](https://vercel.com/docs/drains/audit-logs-to-s3?from=related) — Learn how to configure AWS IAM and Amazon S3 so Vercel can write Audit Log Drain events to your S3 bucket.
- [Web Analytics](https://vercel.com/docs/drains/reference/analytics?from=related) — Learn about Web Analytics Drains - data formats and custom events configuration.

Full cross-link map for this page: [/docs/drains/audit-logs-to-datadog.graph.md](/docs/drains/audit-logs-to-datadog.graph.md)
<!-- /docsgraph:related -->

Audit Log Drains can forward team activity events to [Datadog](https://www.datadoghq.com/) using the [Datadog Logs API](https://docs.datadoghq.com/api/latest/logs/). Use this setup to ingest audit logs into Datadog for security monitoring, compliance review, and alerting.

The Datadog destination sends events over HTTPS to the log intake endpoint for your [Datadog site](https://docs.datadoghq.com/getting_started/site/), authenticated with a Datadog API key.

## Getting started with Audit Logs to Datadog

Before you configure the drain, make sure you have:

- A Datadog API key
- The Datadog site where your organization is hosted
- Access to [configure Audit Log Drains](/docs/drains/using-drains) for your Vercel team

- ### Create a Datadog API key
  In Datadog, go to **Organization Settings** > **API Keys** and create an API key, or copy an existing one. Datadog documents the full process in [API and Application Keys](https://docs.datadoghq.com/account_management/api-app-keys/).

- ### Find your Datadog site
  Vercel builds the log intake endpoint from the site you select, so the site must match where your Datadog organization is hosted. You can read the site from your Datadog browser URL, as described in [Getting Started with Datadog Sites](https://docs.datadoghq.com/getting_started/site/).

- ### Configure the drain in Vercel
  In the Vercel dashboard, go to **Team Settings** > [**Drains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fdrains\&title=Go+to+Drains+settings), click **Add Drain**, and choose **Audit Log** as the data type.

  Enter a name for the drain, select **Datadog** as the destination, and configure these fields:
  - **Datadog Site**: Select the site from the previous step.
  - **API Key**: Paste your Datadog API key.
  Click **Test** to send an example event to Datadog. A successful test returns a 202 response, which means Datadog accepted the event for processing. A 403 response usually means the API key is invalid or doesn't match the selected site.

- ### Create and verify the drain
  Click **Create Drain** to begin forwarding team activity events. In the Datadog [Log Explorer](https://docs.datadoghq.com/logs/explorer/), search for `source:vercel service:audit-logs` and verify that events arrive. Datadog surfaces the `ddsource` field from the [event format](#format) through the reserved `source` facet.

> **💡 Note:** Vercel doesn't manage log retention or indexing in Datadog. Configure
> indexes, retention, and exclusion filters in Datadog based on your compliance
> and cost requirements.

## Configuration reference

| Field        | Description                                                | Example                            |
| ------------ | ---------------------------------------------------------- | ---------------------------------- |
| Datadog Site | The Datadog site that receives your audit log events.      | `US1 (datadoghq.com)`              |
| API Key      | The API key Vercel uses to authenticate with the Logs API. | `00000000000000000000000000000000` |

## Format

Vercel sends each audit log event to the Datadog Logs API with the event fields at the top level. Vercel tags events with `ddsource` set to `vercel` and `service` set to `audit-logs`, so pipelines, facets, and monitors have a stable identity to target.

See the [Audit Log Drains reference](/docs/drains/reference/audit-logs#datadog) for delivery details and the underlying audit log schema.

## More resources

- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Configure Drains](/docs/drains/using-drains)
- [Datadog Logs API documentation](https://docs.datadoghq.com/api/latest/logs/)


---

[View full sitemap](/docs/sitemap)
