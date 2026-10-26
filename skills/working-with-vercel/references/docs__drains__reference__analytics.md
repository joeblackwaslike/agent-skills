---
title: Web Analytics Drains Reference
product: vercel
url: /docs/drains/reference/analytics
canonical_url: "https://vercel.com/docs/drains/reference/analytics"
last_updated: 2026-07-03
type: reference
prerequisites:
  - /docs/drains
related:
  - /docs/drains/using-drains
  - /docs/drains
summary: Learn about Web Analytics Drains - data formats and custom events configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/reference/analytics.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4396f37b47d751344a3731af2726b1e47b27dcdd48784bf9d834ee7009c608b9"
---

# Web Analytics Drains Reference

If a Web Analytics Drains has been configured, Vercel will send page views and custom events from your applications to external endpoints for storage and analysis over HTTPS when your application tracks events.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Drains: Complete observability data, anywhere](https://vercel.com/blog/introducing-vercel-drains)
- [Speed Insights Drains Reference](https://vercel.com/docs/drains/reference/speed-insights) — Learn about Speed Insights Drains - data formats and performance metrics configuration.
- [Audit Log Drains Reference](https://vercel.com/docs/drains/reference/audit-logs) — Learn about Audit Log Drains - data formats, fields, and team activity events.
- [Trace Drains Reference](https://vercel.com/docs/drains/reference/traces) — Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.
- [Drains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains) — Vercel MCP tools for drains.
- [Drain Audit Logs to Datadog](https://vercel.com/docs/drains/audit-logs-to-datadog) — Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.

Full cross-link map for this page: [/docs/drains/reference/analytics.graph.md](/docs/drains/reference/analytics.graph.md)
<!-- /docsgraph:related -->

## Web Analytics Schema

The following table describes the possible fields that are sent via Web Analytics Drains:

| Name                   | Type   | Description                                | Example                                          |
| ---------------------- | ------ | ------------------------------------------ | ------------------------------------------------ |
| `schema`               | string | Schema version identifier                  | `vercel.analytics.v2`                            |
| `eventType`            | string | Type of analytics event                    | `pageview` or `event`                            |
| `eventName`            | string | Name of the custom event                   | `button_click`                                   |
| `eventData`            | string | Additional data associated with the event  | `{"button": "signup"}`                           |
| `timestamp`            | number | Unix timestamp when the event was recorded | 1694723400000                                    |
| `projectId`            | string | Identifier for the Vercel project          | `Qmc52npNy86S8VV4Mt8a8dP1LEkRNbgosW3pBCQytkcgf2` |
| `ownerId`              | string | Identifier for the project owner           | `team_nLlpyC6REAqxydlFKbrMDlud`                  |
| `deviceId`             | number | Unique device identifier                   | 67890                                            |
| `origin`               | string | Origin URL where the event was recorded    | `https://example.com`                            |
| `path`                 | string | URL path where the event was recorded      | `/dashboard`                                     |
| `referrer`             | string | Referrer URL                               | `https://google.com`                             |
| `queryParams`          | string | Query parameters from the URL              | `utm_source=google&utm_medium=cpc`               |
| `route`                | string | Route pattern for the page                 | `/dashboard/[id]`                                |
| `country`              | string | Country code of the user                   | `US`                                             |
| `region`               | string | Region code of the user                    | `CA`                                             |
| `city`                 | string | City of the user                           | `San Francisco`                                  |
| `osName`               | string | Operating system name                      | `macOS`                                          |
| `osVersion`            | string | Operating system version                   | `13.4`                                           |
| `clientName`           | string | Client browser name                        | `Chrome`                                         |
| `clientType`           | string | Type of client                             | `browser`                                        |
| `clientVersion`        | string | Client browser version                     | `114.0.5735.90`                                  |
| `deviceType`           | string | Type of device                             | `desktop`                                        |
| `deviceBrand`          | string | Device brand                               | `Apple`                                          |
| `deviceModel`          | string | Device model                               | `MacBook Pro`                                    |
| `browserEngine`        | string | Browser engine name                        | `Blink`                                          |
| `browserEngineVersion` | string | Browser engine version                     | `114.0.5735.90`                                  |
| `sdkVersion`           | string | SDK version used to track events           | `2.1.0`                                          |
| `sdkName`              | string | SDK name used to track events              | `@vercel/analytics`                              |
| `sdkVersionFull`       | string | Full SDK version string                    | `2.1.0-beta.1`                                   |
| `vercelEnvironment`    | string | Vercel environment                         | `production`                                     |
| `vercelUrl`            | string | Vercel deployment URL                      | `*.vercel.app`                                   |
| `flags`                | string | Feature flags information                  | `{"feature_a": true}`                            |
| `deployment`           | string | Identifier for the Vercel deployment       | `dpl_2YZzo1cJAjijSf1hwDFK5ayu2Pid`               |

## Format

Vercel supports the following formats for Web Analytics Drains, which you can configure when [setting the Drain destination](/docs/drains/using-drains#configure-destination):

### JSON

Vercel sends Web Analytics data as JSON arrays containing event objects:

```json
[
  { "schema": "vercel.analytics.v2", "eventType": "pageview", "timestamp": 1694723400000, "projectId": "Qmc52npNy86S8VV4Mt8a8dP1LEkRNbgosW3pBCQytkcgf2", "ownerId": "team_nLlpyC6REAqxydlFKbrMDlud", "deviceId": 67890, "origin": "https://example.com", "path": "/dashboard" },
  { "schema": "vercel.analytics.v2", "eventType": "event", "eventName": "button_click", "eventData": "{\"button\": \"signup\"}", "timestamp": 1694723405000, "projectId": "Qmc52npNy86S8VV4Mt8a8dP1LEkRNbgosW3pBCQytkcgf2", "ownerId": "team_nLlpyC6REAqxydlFKbrMDlud", "deviceId": 67890, "origin": "https://example.com", "path": "/signup" }
]
```

### NDJSON

Vercel sends Web Analytics data as newline-delimited JSON objects:

```json
{"schema": "vercel.analytics.v2","eventType": "pageview","timestamp": 1694723400000,"projectId": "Qmc52npNy86S8VV4Mt8a8dP1LEkRNbgosW3pBCQytkcgf2","ownerId": "team_nLlpyC6REAqxydlFKbrMDlud","deviceId": 67890,"origin": "https://example.com","path": "/dashboard"}
{"schema": "vercel.analytics.v2","eventType": "event","eventName": "button_click","eventData": "{\"button\": \"signup\"}","timestamp": 1694723405000,"projectId": "Qmc52npNy86S8VV4Mt8a8dP1LEkRNbgosW3pBCQytkcgf2","ownerId": "team_nLlpyC6REAqxydlFKbrMDlud","deviceId": 67890,"origin": "https://example.com","path": "/signup"}
```

## Sampling Rate

When you configure a Web Analytics Drain in the Vercel UI, you can set the sampling rate to control the volume of data sent. This helps manage costs when you have high traffic volumes.

## More resources

For more information on Web Analytics Drains and how to use them, refer to the following resources:

- [Drains overview](/docs/drains)
- [Configure Drains](/docs/drains/using-drains)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
