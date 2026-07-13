---
title: Working with Drains
product: vercel
url: /docs/drains
canonical_url: "https://vercel.com/docs/drains"
last_updated: 2026-06-29
type: reference
prerequisites:
  []
related:
  - /docs/drains/using-drains
  - /docs/drains/audit-logs-to-s3
  - /docs/drains/reference/logs
  - /docs/drains/reference/traces
  - /docs/drains/reference/speed-insights
summary: Drains collect logs, traces, speed insights, and analytics from your applications. Forward observability data to custom endpoints or popular services.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains.md"
fetched_at: "2026-07-13T07:00:47.058Z"
sha256: "189ff19fc4a7f29e94065cca1e0ab30cb0ec124fa67695564a2e2bcd626be37c"
---

# Working with Drains

> **🔒 Permissions Required**: Drains

Drains let you forward observability data from your applications to external services for debugging, performance optimization, analysis, and alerting, so that you can:

- Store observability data persistently in your preferred external services
- Process large volumes of telemetry data using your own tools
- Set up alerts based on application behavior patterns
- Build custom metrics and dashboards from your data

## Getting started with Drains

You can add Drains in two ways:

- Custom endpoints: [Configure](/docs/drains/using-drains#configuring-drains) any data type to send to a [custom HTTP endpoint](/docs/drains/using-drains#custom-endpoint)
- Native integrations: [Configure](/docs/drains/using-drains#configuring-drains) logs and trace data types to send to popular services like Dash0 and Braintrust using [native integrations](/docs/drains/using-drains#native-integrations)
- AWS S3: [Configure](/docs/drains/audit-logs-to-s3) Drains to write data directly to your AWS S3 bucket (only available for Audit Logs)

Learn how to [manage your active drains](/docs/drains/using-drains#managing-your-active-drains).

## Data types

Drains support the following data types:

- **Logs**: Runtime, build, and static logs from your deployments (supports custom endpoints and native integrations)
- **Traces**: Distributed tracing data in OpenTelemetry format (supports custom endpoints and native integrations)
- **Speed Insights**: Performance metrics and web vitals (custom endpoints only)
- **Web Analytics**: Page views and custom events (custom endpoints only)
- **Audit Logs**: Team activity events (custom endpoints and AWS S3)

### Data type references

Each drain data type has specific formats, fields, and schemas. Review the reference documentation for [logs](/docs/drains/reference/logs), [traces](/docs/drains/reference/traces), [speed insights](/docs/drains/reference/speed-insights), [analytics](/docs/drains/reference/analytics), and [audit logs](/docs/drains/reference/audit-logs) to understand the data structure you'll receive from each data type.

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

For example, to create a log drain, set `log` as the schema name with version `v1`:

```json
{
  "schemas": {
    "log": { "version": "v1" }
  }
}
```

You also use the `schemas` property when [validating drain delivery configuration](/docs/rest-api/drains/validate-drain-delivery-configuration). Pass the same `schemas` and `delivery` values you plan to use when creating the drain to verify your endpoint before the drain is live.

For details on the data each schema delivers, see the reference docs for [logs](/docs/drains/reference/logs), [traces](/docs/drains/reference/traces), [speed insights](/docs/drains/reference/speed-insights), [analytics](/docs/drains/reference/analytics), and [audit logs](/docs/drains/reference/audit-logs).

## Security

You can secure your drains by checking for valid signatures and hiding IP addresses. Learn how to [add security to your drains](/docs/drains/security).

## Usage and pricing

Drains are available to all users on the [Pro](/docs/plans/pro-plan) and [Enterprise](/docs/plans/enterprise) plans. Audit Log Drains are available only on [Enterprise](/docs/plans/enterprise) plans. If you are on the [Hobby](/docs/plans/hobby) or [Pro Trial](/docs/plans/pro-plan/trials) plan, you'll need to [upgrade to Pro](/docs/plans/hobby#upgrading-to-pro) to access non-audit-log drains.

Drains usage is billed based on the pricing table below. Pricing is the same regardless of data type:

| Resource | Pro Price |
| --- | --- |
| Drains Volume | $0.50 |


See [Optimizing Drains](/docs/manage-and-optimize-observability#optimizing-drains-usage) for information on how to manage costs associated with Drains.

## More resources

For more information on Drains, check out the following resources:

- [Configure Drains](/docs/drains/using-drains)
- [Log Drains reference](/docs/drains/reference/logs)
- [Traces reference](/docs/drains/reference/traces)
- [Speed Insights reference](/docs/drains/reference/speed-insights)
- [Analytics reference](/docs/drains/reference/analytics)
- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Drains REST API endpoints](/docs/rest-api/drains)


---

[View full sitemap](/docs/sitemap)
