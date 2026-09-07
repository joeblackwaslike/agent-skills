---
title: Drain Audit Logs to Panther
product: vercel
url: /docs/drains/audit-logs-to-panther
canonical_url: "https://vercel.com/docs/drains/audit-logs-to-panther"
last_updated: 2026-08-07
type: how-to
prerequisites:
  - /docs/drains
related:
  - /docs/drains/using-drains
  - /docs/drains/reference/audit-logs
summary: "Learn how to forward Vercel Audit Log Drain events to Panther using Panther's built-in Vercel source."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/audit-logs-to-panther.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "31f78c508f3701d169b1cc687c45ab5705c2d61630a148b596df70d0a9224fca"
---

# Drain Audit Logs to Panther

> **🔒 Permissions Required**: Audit Log Drains

Audit Log Drains can forward team activity events to [Panther](https://panther.com/) using [Panther's built-in Vercel source](https://docs.panther.com/data-onboarding/supported-logs/vercel). Use this setup to ingest audit logs into Panther for security monitoring, compliance review, and threat detection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Audit Log Drains now support Datadog, Splunk, and Panther](https://vercel.com/changelog/audit-log-drains-now-support-datadog-splunk-and-panther?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related)
- [Expanded Audit Log coverage, now delivered through Vercel Drains](https://vercel.com/changelog/expanded-audit-log-coverage-now-delivered-through-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related)
- [Drain Audit Logs to Datadog](https://vercel.com/docs/drains/audit-logs-to-datadog?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related) — Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.
- [Introducing Vercel Drains: Complete observability data, anywhere](https://vercel.com/blog/introducing-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related)
- [Migrating from Custom SIEM Log Streaming to Audit Log Drains](https://vercel.com/docs/audit-log/migrating-to-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related) — Move your SIEM integration from Custom SIEM Log Streaming to Audit Log Drains, with wider event coverage and a new event
- [Drain Audit Logs to Splunk](https://vercel.com/docs/drains/audit-logs-to-splunk?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related) — Learn how to forward Vercel Audit Log Drain events to Splunk using the HTTP Event Collector \\(HEC\\).
- [Web Analytics Drains Reference](https://vercel.com/docs/drains/reference/analytics?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related) — Learn about Web Analytics Drains - data formats and custom events configuration.
- [Trace Drains Reference](https://vercel.com/docs/drains/reference/traces?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=related) — Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.

Full cross-link map for this page: [/docs/drains/audit-logs-to-panther.graph.md](/docs/drains/audit-logs-to-panther.graph.md?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-panther&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The Panther destination sends Audit Log Drain events as JSON to the HTTP Source URL that Panther generates. Vercel authenticates each request with the source's Bearer token, and Panther ingests the events as the `Vercel.Audit` log type.

## Getting started with Audit Logs to Panther

Before you configure the drain, make sure you have:

- Permission to create log sources in Panther
- Access to [configure Audit Log Drains](/docs/drains/using-drains) for your Vercel team

- ### Create a Vercel source in Panther
  - In the Panther Console, open **Log Sources**, click **Create New**, search for **Vercel**, and select the Vercel source.
  - Click **Start Setup**, then enter a name for the source. Panther sets the log type to `Vercel.Audit` and the authentication method to **Bearer**.
  Generate a Bearer token and save it in a secure location. Click **Setup**, wait for Panther to create the endpoint, then copy the **HTTP Source URL** from the source details.

- ### Configure the drain in Vercel
  In the Vercel dashboard, go to **Team Settings** > [**Drains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fdrains\&title=Go+to+Drains+settings), click **Add Drain**, and choose **Audit Log** as the data type.

  Enter a name for the drain, select **Panther** as the destination, and configure these fields:
  - **Webhook URL**: Paste the **HTTP Source URL** from Panther.
  - **Token**: Paste the generated Bearer token without the `Bearer` prefix. Vercel adds the prefix to the `Authorization` header.
  Click **Test** to send an example event to Panther. A successful test confirms that the source URL and token are valid.

- ### Create and verify the drain
  Click **Create Drain** to begin forwarding team activity events. In Panther, open the Vercel log source and verify that `Vercel.Audit` events arrive.

## Configuration reference

| Field       | Description                                                       | Example                                                          |
| ----------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| Webhook URL | The HTTP Source URL that Panther generates for the Vercel source. | `https://logs.your_panther_domain_here/http/your_source_id_here` |
| Token       | The Bearer token that Panther generates for the source.           | `your_panther_token_here`                                       |

## Format

Vercel sends the standard Audit Log Drain JSON format to the Panther HTTP Source URL over HTTPS and sets the `Authorization` header to `Bearer <token>`.

See the [Audit Log Drains reference](/docs/drains/reference/audit-logs#panther) for delivery details and the underlying audit log schema.

## More resources

- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Configure Drains](/docs/drains/using-drains)
- [Vercel Logs in Panther](https://docs.panther.com/data-onboarding/supported-logs/vercel)


---

[View full sitemap](/docs/sitemap)
