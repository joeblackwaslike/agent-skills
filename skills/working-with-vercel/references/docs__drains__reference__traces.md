---
title: Trace Drains Reference
product: vercel
url: /docs/drains/reference/traces
canonical_url: "https://vercel.com/docs/drains/reference/traces"
last_updated: 2026-08-21
type: reference
prerequisites:
  - /docs/drains
related:
  - /docs/drains/using-drains
  - /docs/tracing
  - /docs/drains
summary: Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/reference/traces.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "98eae69f4861e3b1c37e56d8ebfb82e1a86c1e7994f2bb37d32a7c2f52c0f739"
---

# Trace Drains Reference

Trace Drains forward distributed tracing data from your deployments to external endpoints for storage and analysis. You can configure Trace Drains in two ways:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Introducing Vercel Drains: Complete observability data, anywhere](https://vercel.com/blog/introducing-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related)
- [Introducing Trace Drains on the Vercel Marketplace](https://vercel.com/changelog/introducing-trace-drains-on-the-vercel-marketplace?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related)
- [Export AI Gateway traces with Vercel Drains](https://vercel.com/changelog/export-ai-gateway-traces-with-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related)
- [Export traces, web analytics events, and speed insights datapoints to any destination](https://vercel.com/changelog/export-more-data-with-vercel-drains?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related)
- [Trace Drains](https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related) — Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain bi
- [Web Analytics Drains Reference](https://vercel.com/docs/drains/reference/analytics?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related) — Learn about Web Analytics Drains - data formats and custom events configuration.
- [Speed Insights Drains Reference](https://vercel.com/docs/drains/reference/speed-insights?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related) — Learn about Speed Insights Drains - data formats and performance metrics configuration.
- [Audit Log Drains Reference](https://vercel.com/docs/drains/reference/audit-logs?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related) — Learn about Audit Log Drains - data formats, fields, and team activity events.
- [Drain Audit Logs to Datadog](https://vercel.com/docs/drains/audit-logs-to-datadog?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=related) — Learn how to forward Vercel Audit Log Drain events to Datadog using the Datadog Logs API.

Full cross-link map for this page: [/docs/drains/reference/traces.graph.md](/docs/drains/reference/traces.graph.md?from=related&source_path=%2Fdocs%2Fdrains%2Freference%2Ftraces&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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

1. If no rules exist, click **Add Sampling Rule**.
2. Choose the environment you want to sample from.
3. Set the sampling percentage.
4. (Optional) Specify a request path prefix. Leave it blank to apply the rule to every path.

Example workflows:

- Launch-day monitoring: sample **100%** of production traffic when you launch a new feature, then decrease to **10%** once traffic stabilizes.
- Static coverage: always collect **5%** from `/docs` so you can spot regressions on a static documentation site.

Rules run from top to bottom. Requests that match a rule use that rule’s sampling rate, and any other requests are dropped. If you do not add rules, the drain forwards **100%** of data to the destination.

For how sampling decisions are made, including per-trace hashing and rule precedence, see [Sampling](/docs/tracing#sampling).

## Attribute truncation

Trace Drains follow the shared [attribute truncation behavior](/docs/tracing#attribute-truncation).

## Limitations

Trace Drains follow the shared [Tracing limitations](/docs/tracing#limitations).

## More resources

For more information on Trace Drains and how to use them, check out the following resources:

- [Drains overview](/docs/drains)
- [Configure Drains](/docs/drains/using-drains)
- [OpenTelemetry traces specification](https://opentelemetry.io/docs/concepts/signals/traces/)


---

[View full sitemap](/docs/sitemap)
