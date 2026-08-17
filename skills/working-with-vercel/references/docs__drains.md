---
title: Working with Drains
product: vercel
url: /docs/drains
canonical_url: "https://vercel.com/docs/drains"
last_updated: 2026-07-22
type: reference
prerequisites:
  []
related:
  - /docs/drains/using-drains
  - /docs/drains/audit-logs-to-s3
  - /docs/drains/audit-logs-to-splunk
  - /docs/drains/audit-logs-to-datadog
  - /docs/drains/audit-logs-to-panther
summary: Drains collect logs, traces, speed insights, and analytics from your applications. Forward observability data to custom endpoints or popular services.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f1b76cc441f06e03a6b1e676208987402e2320d623f5c6b622ceb26f722b47e8"
---

# Working with Drains

> **🔒 Permissions Required**: Drains


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime?from=related) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [Migrate self-hosted Next.js and containers from AWS to Vercel](https://vercel.com/kb/guide/migrate-containers-from-aws-to-vercel?from=related) — Migrate containers from AWS to Vercel: deploy with Dockerfile.vercel, keep RDS, S3, and SQS in AWS over OIDC, and cut ov
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Migrating from SIEM](https://vercel.com/docs/audit-log/migrating-to-drains?from=related) — Move your SIEM integration from Custom SIEM Log Streaming to Audit Log Drains, with wider event coverage and a new event
- [Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi
- [Creates a new Integration Log Drain \(deprecated\)](https://vercel.com/docs/rest-api/logdrains/creates-a-new-integration-log-drain-deprecated?from=related)
- [Retrieves a Configurable Log Drain \(deprecated\)](https://vercel.com/docs/rest-api/logdrains/retrieves-a-configurable-log-drain-deprecated?from=related)
- [Tools](https://vercel.com/docs/agent-resources/vercel-mcp/tools?from=related) — Available tools in Vercel MCP for searching docs, managing teams, projects, deployments, Web Analytics, runtime logs and

Full cross-link map for this page: [/docs/drains.graph.md](/docs/drains.graph.md)
<!-- /docsgraph:related -->

Drains let you forward observability data from your applications to external services for debugging, performance optimization, analysis, and alerting, so that you can:

- Store observability data persistently in your preferred external services
- Process large volumes of telemetry data using your own tools
- Set up alerts based on application behavior patterns
- Build custom metrics and dashboards from your data

## Getting started with Drains

You can add Drains in the following ways:

- Custom endpoints: [Configure](/docs/drains/using-drains#configuring-drains) any data type to send to a [custom HTTP endpoint](/docs/drains/using-drains#custom-endpoint)
- Audit Log destinations: Configure Audit Log Drains to send data to [Amazon S3](/docs/drains/audit-logs-to-s3), [Splunk](/docs/drains/audit-logs-to-splunk), [Datadog](/docs/drains/audit-logs-to-datadog), or [Panther](/docs/drains/audit-logs-to-panther)
- Native integrations: [Configure](/docs/drains/using-drains#configuring-drains) logs and trace data types to send to popular services like Dash0 and Braintrust using [native integrations](/docs/drains/using-drains#native-integrations)

Learn how to [manage your active drains](/docs/drains/using-drains#managing-your-active-drains).

## Data types

Drains support the following data types:

- **Logs**: Runtime, build, and static logs from your deployments (supports custom endpoints and native integrations)
- **Traces**: Distributed tracing data in OpenTelemetry format (supports custom endpoints and native integrations)
- **Speed Insights**: Performance metrics and web vitals (custom endpoints only)
- **Web Analytics**: Page views and custom events (custom endpoints only)
- **Connect**: Runtime events in the form of token requests, authorizations, revocations, and trigger deliveries from [Vercel Connect](/docs/connect) connectors (custom endpoints only)
- **Audit Logs**: Team activity events

### Data type references

Each drain data type has specific formats, fields, and schemas. Review the reference documentation for [logs](/docs/drains/reference/logs), [traces](/docs/drains/reference/traces), [speed insights](/docs/drains/reference/speed-insights), [analytics](/docs/drains/reference/analytics), [connect events](/docs/connect/observability#events-reference), and [audit logs](/docs/drains/reference/audit-logs) to understand the data structure you'll receive from each data type.

## REST API `schemas` property

When you [create](/docs/rest-api/drains/create-a-new-drain) or [update](/docs/rest-api/drains/update-an-existing-drain) drains through the REST API, use the `schemas` property in the request body to specify which data type the drain receives. Each drain handles one data type.

The `schemas` object maps a schema name to a version object:

```ts
{
  schemas: {
    [schemaName: string]: {
      version: string;
    };
  }
}
```

The following table lists the available schema names:

| Schema name      | Version | Data type                                        |
| ---------------- | ------- | ------------------------------------------------ |
| `log`            | `v1`    | Runtime, build, and static logs                  |
| `trace`          | `v1`    | Distributed tracing data in OpenTelemetry format |
| `analytics`      | `v2`    | Web Analytics page views and custom events       |
| `speed_insights` | `v1`    | Performance metrics and web vitals               |
| `audit_log`      | `v1`    | Team activity events                             |
| `connect`        | `v1`    | Vercel Connect token and trigger events          |

For example, to create a log drain, set `log` as the schema name with version `v1`:

```json
{
  "schemas": {
    "log": { "version": "v1" }
  }
}
```

You also use the `schemas` property when [validating drain delivery configuration](/docs/rest-api/drains/validate-drain-delivery-configuration). Pass the same `schemas` and `delivery` values you plan to use when creating the drain to verify your endpoint before the drain is live.

For details on the data each schema delivers, see the reference docs for [logs](/docs/drains/reference/logs), [traces](/docs/drains/reference/traces), [speed insights](/docs/drains/reference/speed-insights), [analytics](/docs/drains/reference/analytics), [Connect events](/docs/connect/observability#events-reference), and [audit logs](/docs/drains/reference/audit-logs).

## Security

You can secure your drains by checking for valid signatures and hiding IP addresses. Learn how to [add security to your drains](/docs/drains/security).

## Usage and pricing

Drains are available to all users on the [Pro](/docs/plans/pro-plan) and [Enterprise](/docs/plans/enterprise) plans. Audit Log Drains are available only on [Enterprise](/docs/plans/enterprise) plans. If you are on the [Hobby](/docs/plans/hobby) or [Pro Trial](/docs/plans/pro-plan/trials) plan, you'll need to [upgrade to Pro](/docs/plans/hobby#upgrading-to-pro) to access non-audit-log drains.

Drains usage is billed based on the pricing table below. Pricing is the same regardless of data type:

| Resource | Pro Price |
| --- | --- |
| Drains Volume | $0.50 |


### How usage is measured

Billed gigabytes are measured as the uncompressed JSON serialization of each drained record, regardless of the format or encoding used to deliver it. Delivery to a destination can use protobuf, compression, or both, so the bytes a destination reports receiving (for example, an ingestion or "bytes received" metric in the destination service) can be lower than the billed bytes. The two figures measure different things and are not directly comparable. This difference is expected.

See [Optimizing Drains](/docs/manage-and-optimize-observability#optimizing-drains-usage) for information on how to manage costs associated with Drains.

## More resources

For more information on Drains, check out the following resources:

- [Configure Drains](/docs/drains/using-drains)
- [Log Drains reference](/docs/drains/reference/logs)
- [Traces reference](/docs/drains/reference/traces)
- [Speed Insights reference](/docs/drains/reference/speed-insights)
- [Analytics reference](/docs/drains/reference/analytics)
- [Connect Events reference](/docs/connect/observability#events-reference)
- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Drains REST API endpoints](/docs/rest-api/drains/retrieve-a-list-of-all-drains)


---

[View full sitemap](/docs/sitemap)
