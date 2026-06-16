---
title: Trace Drains Reference
product: vercel
url: /docs/drains/reference/traces
canonical_url: "https://vercel.com/docs/drains/reference/traces"
last_updated: 2026-04-29
type: reference
prerequisites:
  - /docs/drains
related:
  - /docs/drains/using-drains
  - /docs/functions/runtimes/edge
  - /docs/drains
summary: Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/reference/traces.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "860397d9520e7b1ce641570e71ae70837eccb930dcad40f055a3ebcfe2f35d90"
---

# Trace Drains Reference

Trace Drains forward distributed tracing data from your deployments to external endpoints for storage and analysis. You can configure Trace Drains in two ways:

- **[Custom endpoint](/docs/drains/using-drains#custom-endpoint)**: Send traces to any OTLP/HTTP-compatible endpoint you configure
- **[Native integration](/docs/drains/using-drains#native-integrations)**: Use integrations from the Vercel Marketplace like [Braintrust](https://vercel.com/marketplace/braintrust)

> **💡 Note:** Trace Drains use the [OTLP/HTTP](https://opentelemetry.io/docs/specs/otlp/#otlphttp) protocol exclusively. OTLP/gRPC endpoints (typically port 4317) are not supported. Make sure your endpoint accepts OTLP/HTTP requests (typically port 4318, path `/v1/traces`).

Vercel sends traces to endpoints over HTTPS following the [OTLP/HTTP](https://opentelemetry.io/docs/specs/otlp/#otlphttp) specification.

## Traces Schema

Trace Drains follow the [OpenTelemetry traces specification](https://opentelemetry.io/docs/concepts/signals/traces/). Vercel automatically adds these specific resource attributes to all traces:

| Name                  | Type   | Description                          | Example                                            |
| --------------------- | ------ | ------------------------------------ | -------------------------------------------------- |
| `vercel.projectId`    | string | Identifier for the Vercel project    | `"Qmc52npNy86S8VV4Mt8a8dP1LEkRNbgosW3pBCQytkcgf2"` |
| `vercel.deploymentId` | string | Identifier for the Vercel deployment | `"dpl_2YZzo1cJAjijSf1hwDFK5ayu2Pid"`               |

## Format

Vercel supports the following formats for Trace Drains. You can configure the format when [configuring the Drain destination](/docs/drains/using-drains#configure-destination):

### JSON

Vercel sends traces as JSON objects following the OpenTelemetry specification:

```json
{ "resourceSpans": [{ "resource": { "attributes": [{ "key": "service.name", "value": { "stringValue": "vercel-function" } }] }, "scopeSpans": [{ "scope": { "name": "vercel" }, "spans": [{ "traceId": "7bba9f33312b3dbb8b2c2c62bb7abe2d", "spanId": "086e83747d0e381e", "name": "GET /api/users", "kind": "server", "startTimeUnixNano": "1694723400000000000", "endTimeUnixNano": "1694723400150000000" }] }] }] }
```

### Protobuf

Vercel sends traces in binary protobuf format over OTLP/HTTP. This format is more efficient for high-volume trace data transmission.

## Sampling Rate

Sampling rules control how much trace data each drain forwards so you can manage observability depth and spend. Add sampling rules to define how much data reaches your destination:

1. If no rules exist, click **Add sampling rule**.
2. Choose the environment you want to sample from.
3. Set the sampling percentage.
4. (Optional) Specify a request path prefix. Leave it blank to apply the rule to every path.

Example workflows:

- Launch-day monitoring: sample **100%** of production traffic when you launch a new feature, then decrease to **10%** once traffic stabilizes.
- Static coverage: always collect **5%** from `/docs` so you can spot regressions on a static documentation site.

Rules run from top to bottom. Requests that match a rule use that rule’s sampling rate, and any other requests are dropped. If you do not add rules, the drain forwards **100%** of data to the destination.

## Limitations

- Each traced request is limited to **10 MB of compressed trace data**.
- Individual spans larger than **1 MB of compressed data** will be dropped and not appear in your trace.
- Custom spans from functions using the [Edge runtime](/docs/functions/runtimes/edge) are not forwarded via the Trace Drain.

## More resources

For more information on Trace Drains and how to use them, check out the following resources:

- [Drains overview](/docs/drains)
- [Configure Drains](/docs/drains/using-drains)
- [OpenTelemetry traces specification](https://opentelemetry.io/docs/concepts/signals/traces/)


---

[View full sitemap](/docs/sitemap)
