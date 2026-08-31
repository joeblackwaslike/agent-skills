---
title: Drain Audit Logs to Splunk
product: vercel
url: /docs/drains/audit-logs-to-splunk
canonical_url: "https://vercel.com/docs/drains/audit-logs-to-splunk"
last_updated: 2026-07-03
type: how-to
prerequisites:
  - /docs/drains
related:
  - /docs/drains/reference/audit-logs
  - /docs/drains/using-drains
summary: Learn how to forward Vercel Audit Log Drain events to Splunk using the HTTP Event Collector (HEC).
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/audit-logs-to-splunk.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "b79b515c55ddd90a0757f8e7e7fef63b5fb62a73b934718de971dd3ec6ed0ded"
---

# Drain Audit Logs to Splunk

> **🔒 Permissions Required**: Audit Log Drains


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Audit Log Drains now support Datadog, Splunk, and Panther](https://vercel.com/changelog/audit-log-drains-now-support-datadog-splunk-and-panther?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related)
- [Expanded Audit Log coverage, now delivered through Vercel Drains](https://vercel.com/changelog/expanded-audit-log-coverage-now-delivered-through-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related)
- [Drain Audit Logs to Datadog](https://vercel.com/docs/drains/audit-logs-to-datadog?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related) — Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.
- [Introducing Vercel Drains: Complete observability data, anywhere](https://vercel.com/blog/introducing-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related)
- [How do I store logs on Vercel?](https://vercel.com/kb/guide/how-do-i-store-logs-on-vercel?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related) — Learn how to store logs on Vercel.
- [Migrating from Custom SIEM Log Streaming to Audit Log Drains](https://vercel.com/docs/audit-log/migrating-to-drains?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related) — Move your SIEM integration from Custom SIEM Log Streaming to Audit Log Drains, with wider event coverage and a new event
- [Web Analytics Drains Reference](https://vercel.com/docs/drains/reference/analytics?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related) — Learn about Web Analytics Drains - data formats and custom events configuration.
- [Trace Drains Reference](https://vercel.com/docs/drains/reference/traces?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related) — Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.
- [Retrieves a Configurable Log Drain \\(deprecated\\)](https://vercel.com/docs/rest-api/logdrains/retrieves-a-configurable-log-drain-deprecated?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=related) — GET /v1/log-drains/{id} — Retrieves a Configurable Log Drain. This endpoint must be called with a team AccessToken \\(int

Full cross-link map for this page: [/docs/drains/audit-logs-to-splunk.graph.md](/docs/drains/audit-logs-to-splunk.graph.md?from=related&source_path=%2Fdocs%2Fdrains%2Faudit-logs-to-splunk&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Audit Log Drains can forward team activity events to [Splunk](https://www.splunk.com/) using the [HTTP Event Collector (HEC)](https://help.splunk.com/en/data-management/collect-http-event-data/use-hec-in-splunk-cloud-platform/set-up-and-use-http-event-collector-in-splunk-web). Use this setup to ingest audit logs into Splunk for security monitoring, compliance review, and search.

The Splunk destination sends events over HTTPS to your HEC endpoint, authenticated with an HEC token. Vercel formats each event using the [Splunk HEC event envelope](#format) so Splunk indexes the event time and fields correctly. The destination works with both Splunk Cloud and self-hosted Splunk Enterprise collectors.

Follow the steps below to create an HEC token, find your HEC host, and configure the drain. After setup, use [Configuration reference](#configuration-reference) for field values and [Format](#format) for the event envelope.

## Getting started with Audit Logs to Splunk

Pre-requisites:

- A Splunk deployment with the HTTP Event Collector enabled
- An HEC token
- Your Splunk HEC host

- ### Enable and create an HEC token
  In Splunk, enable the HTTP Event Collector and create a token. Splunk documents the full process, including index selection, in [Set up and use HTTP Event Collector in Splunk Web](https://help.splunk.com/en/data-management/collect-http-event-data/use-hec-in-splunk-cloud-platform/set-up-and-use-http-event-collector-in-splunk-web).

- ### Find your HEC host
  Vercel builds the full HEC endpoint from the host you enter. Enter the host that matches your Splunk deployment:

  | Deployment                    | HEC host                             |
  | ----------------------------- | ------------------------------------ |
  | Splunk Cloud on AWS           | `http-inputs-<host>.splunkcloud.com` |
  | Splunk Cloud on GCP or Azure  | `http-inputs.<host>.splunkcloud.com` |
  | Self-hosted Splunk Enterprise | `<host>:8088`                        |

  For the exact host format and prefixes, see Splunk's [Set up and use HTTP Event Collector in Splunk Web](https://help.splunk.com/en/data-management/collect-http-event-data/use-hec-in-splunk-cloud-platform/set-up-and-use-http-event-collector-in-splunk-web).

- ### Configure the drain in Vercel
  In Vercel, create an Audit Log drain and choose **Splunk** as the destination. Enter your **HEC host** and **HEC token**, then select **Test** to send an example event. A successful test returns a 2xx response from Splunk. A 403 response means the token is invalid or disabled.

  To verify the host and token outside of Vercel, send a test event to your collector with `curl`:
  ```bash
  curl "https://your_hec_host_here/services/collector/event" \
    -H "Authorization: Splunk your_hec_token_here" \
    -d '{"sourcetype": "vercel:audit_log", "event": {"message": "test event"}}'
  ```
  A reachable collector returns `{"text":"Success","code":0}`.

> **💡 Note:** Vercel doesn't manage index retention or lifecycle in Splunk. Configure index
> retention and storage in Splunk based on your compliance and cost
> requirements.

## Configuration reference

| Field     | Description                                                | Example                                |
| --------- | ---------------------------------------------------------- | -------------------------------------- |
| HEC host  | The host of your Splunk HEC endpoint.                      | `http-inputs-acme.splunkcloud.com`     |
| HEC token | The token Vercel uses to authenticate with your collector. | `00000000-0000-0000-0000-000000000000` |

## Format

Vercel wraps each audit log event in the Splunk HEC event envelope, placing the event time in a `time` field and the audit log event under `event`. Vercel tags events with the `vercel` source and the `vercel:audit_log` source type, so searches and field extractions have a stable identity to target. To index events under a different source type, override the source type in Splunk as described in [Override source types on a per-event basis](https://docs.splunk.com/Documentation/SplunkCloud/latest/Data/Advancedsourcetypeoverrides).

See the [Audit Log Drains reference](/docs/drains/reference/audit-logs#splunk-hec) for the schema and an example.

## More resources

- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Configure Drains](/docs/drains/using-drains)
- [Splunk HTTP Event Collector documentation](https://help.splunk.com/en/data-management/collect-http-event-data/use-hec-in-splunk-cloud-platform/set-up-and-use-http-event-collector-in-splunk-web)


---

[View full sitemap](/docs/sitemap)
