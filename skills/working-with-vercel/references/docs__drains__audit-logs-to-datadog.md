---
title: Drain Audit Logs to Datadog
product: vercel
url: /docs/drains/audit-logs-to-datadog
canonical_url: "https://vercel.com/docs/drains/audit-logs-to-datadog"
last_updated: 2026-08-07
type: how-to
prerequisites:
  - /docs/drains
related:
  - /docs/drains/using-drains
  - /docs/drains/reference/audit-logs
summary: Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/audit-logs-to-datadog.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "3ce9ffdf2548ff9bc2a310b03c4af601146b77be773904fc97dce8cd7079a6e4"
---

# Drain Audit Logs to Datadog

> **🔒 Permissions Required**: Audit Log Drains


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Audit Log Drains now support Datadog, Splunk, and Panther](https://vercel.com/changelog/audit-log-drains-now-support-datadog-splunk-and-panther?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related)
- [Expanded Audit Log coverage, now delivered through Vercel Drains](https://vercel.com/changelog/expanded-audit-log-coverage-now-delivered-through-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related)
- [Introducing Vercel Drains: Complete observability data, anywhere](https://vercel.com/blog/introducing-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related)
- [How do I store logs on Vercel?](https://vercel.com/kb/guide/how-do-i-store-logs-on-vercel?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related) — Learn how to store logs on Vercel.
- [Migrating from Custom SIEM Log Streaming to Audit Log Drains](https://vercel.com/docs/audit-log/migrating-to-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related) — Move your SIEM integration from Custom SIEM Log Streaming to Audit Log Drains, with wider event coverage and a new event
- [Drain Audit Logs to Splunk](https://vercel.com/docs/drains/audit-logs-to-splunk?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related) — Learn how to forward Vercel Audit Log Drain events to Splunk using the HTTP Event Collector \\(HEC\\).
- [Web Analytics Drains Reference](https://vercel.com/docs/drains/reference/analytics?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related) — Learn about Web Analytics Drains - data formats and custom events configuration.
- [Trace Drains Reference](https://vercel.com/docs/drains/reference/traces?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related) — Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/drains/audit-logs-to-datadog.graph.md](/docs/drains/audit-logs-to-datadog.graph.md?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-datadog&source_site=vercel-docs&relationship=graph)
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
