---
title: Trace Drains
product: vercel
url: /docs/ai-gateway/observability-and-spend/trace-drains
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains"
last_updated: 2026-07-30
type: reference
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/drains
  - /docs/drains/using-drains
  - /docs/ai-gateway/authentication-and-byok
  - /docs/drains/reference/traces
  - /docs/ai-gateway/models-and-providers/provider-options
summary: Forward an OpenTelemetry trace of every AI Gateway request to your own observability tool, and understand trace drain billing.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/trace-drains.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9d59b4337aef1c360eefa91aa4b88796f36fcfd981b07dd5439b01eb3cdc5087"
---

# Trace Drains

AI Gateway produces an [OpenTelemetry](https://opentelemetry.io/docs/concepts/signals/traces/) trace for every request it handles. A trace drain forwards those traces to any OTLP/HTTP-compatible endpoint, such as your own collector or a native integration from the Marketplace, so you can inspect latency, token usage, and provider failover in the observability tool you already use.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Tracing](https://vercel.com/docs/tracing?from=related) — Learn how to trace your application to understand performance and infrastructure details.
- [Web Analytics](https://vercel.com/docs/drains/reference/analytics?from=related) — Learn about Web Analytics Drains - data formats and custom events configuration.
- [Audit Logs](https://vercel.com/docs/drains/reference/audit-logs?from=related) — Learn about Audit Log Drains - data formats, fields, and team activity events.
- [Migrating from SIEM](https://vercel.com/docs/audit-log/migrating-to-drains?from=related) — Move your SIEM integration from Custom SIEM Log Streaming to Audit Log Drains, with wider event coverage and a new event
- [Drain Audit Logs to S3](https://vercel.com/docs/drains/audit-logs-to-s3?from=related) — Learn how to configure AWS IAM and Amazon S3 so Vercel can write Audit Log Drain events to your S3 bucket.

Full cross-link map for this page: [/docs/ai-gateway/observability-and-spend/trace-drains.graph.md](/docs/ai-gateway/observability-and-spend/trace-drains.graph.md)
<!-- /docsgraph:related -->

> **🔒 Permissions Required**: Trace Drains

For the underlying drain configuration and OTLP formats, see the [Drains documentation](/docs/drains).

## Set up a trace drain

- ### Create a trace drain
  From the Vercel dashboard, go to **Team Settings** > [**Drains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fdrains\&title=Go+to+Drains+settings) and click **Add Drain**. You can also use a [native integration](/docs/drains/using-drains#native-integrations) that configures the endpoint for you.

- ### Configure the destination
  Configure the destination to send traces to your OTLP/HTTP collector.

- ### Send an AI Gateway request
  Set `AI_GATEWAY_API_KEY` to your [AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys), then run:
  ```bash filename="Terminal"
  curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
    -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "openai/gpt-5.5",
      "input": "Write a one-sentence bedtime story."
    }'
  ```
  Once the drain is active, AI Gateway forwards the resulting trace based on your [sampling rules](/docs/drains/reference/traces#sampling-rate).

Native integrations that support trace drains include:

- [Braintrust](/marketplace/braintrust): AI evaluation, monitoring, and observability
- [Dash0](/marketplace/dash0): OpenTelemetry-native logs, traces, and metrics
- [Kubiks](/marketplace/kubiks): Logs, traces, dashboards, and alerts
- [Sentry](/marketplace/sentry): Error and performance monitoring
- [Statsig](/marketplace/statsig): Feature flags, experiments, and analytics

The **Native Integrations** section of the drain creation flow always shows the current list of integrations that support trace drains.

> **💡 Note:** Trace drains use [OTLP/HTTP](https://opentelemetry.io/docs/specs/otlp/#otlphttp) exclusively and don't support OTLP/gRPC endpoints (typically port 4317). Make sure your endpoint accepts OTLP/HTTP requests (typically port 4318, path `/v1/traces`).

## Usage and pricing

AI Gateway Traces bills on two meters: the number of trace events delivered to your drains, and the volume of trace data transferred (egress). Vercel bills the two meters separately.

Pro plans don't include an allowance for either meter. Charges begin with the first delivered trace and first byte of trace egress.

Vercel applies these billing rules:

- Each request counts as a **single trace event for each drain that delivers it**, even when the request fails over across multiple providers
- A trace event is counted only when a delivered payload contains the request's root span
- Failed deliveries don't incur a trace-event charge

Provider attempts appear as separate spans within the trace, but they don't add trace events.

[Sampling rules](/docs/drains/reference/traces#sampling-rate) control the percentage of traces forwarded to each drain. A higher sampling rate can increase both trace-event and egress charges.

You can track both meters on the [Usage dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fusage\&title=Usage) under **Drains → AI Gateway Traces**.

To stop future charges, [pause or delete the trace drain](/docs/drains/using-drains#managing-your-active-drains).

## What a trace contains

Each AI Gateway request produces a single trace with the resource attributes `service.name: ai-gateway` and `service.namespace: vercel`. Within that trace, AI Gateway emits these spans:

| Span name                                  | Kind     | Description                                                                                          |
| ------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------- |
| `<operation> <model>` (root)               | Server   | The full request: model, token usage, cost, latency, and response status                              |
| `vercel.ai_gateway.routing`                | Internal | Model resolution and provider ordering, including any custom provider filters                         |
| `vercel.ai_gateway.model_attempt <model>`  | Internal | One per model attempt, when [fallback models](/docs/ai-gateway/models-and-providers/provider-options) run |
| `<model> (<provider>)`                     | Client   | One per upstream provider call, so a request that fails over shows every attempt in order             |

The root span's `<operation>` reflects the request type: `chat`, `embeddings`, `generate_content` for image and video models, or `retrieval` for reranking.

Span attributes use two namespaces: `gen_ai.*` follows the [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/), and `vercel.ai_gateway.*` carries gateway-specific fields. Attributes are omitted when they don't apply to a request. See the [Trace Drains reference](/docs/drains/reference/traces) for the OTLP envelope and JSON/Protobuf formats.

AI Gateway traces contain request metadata, but they don't include prompt or completion content.

### Root span attributes

Standard `gen_ai.*` attributes describe the model interaction:

| Attribute                             | Type     | Description                                                                    |
| ------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| `gen_ai.operation.name`               | string   | The operation type: `chat`, `embeddings`, `generate_content`, or `retrieval`   |
| `gen_ai.provider.name`                | string   | The provider, mapped to OTel well-known values (for example, `aws.bedrock`)    |
| `gen_ai.request.model`                | string   | The model slug the client requested                                            |
| `gen_ai.response.model`               | string   | The resolved canonical model that served the request                           |
| `gen_ai.response.finish_reasons`      | string\[] | Why generation stopped                                                         |
| `gen_ai.request.stream`               | boolean  | Whether the response streamed                                                  |
| `gen_ai.response.time_to_first_chunk` | double   | Time to first token, in seconds                                                |
| `gen_ai.usage.input_tokens`           | int      | Input tokens                                                                   |
| `gen_ai.usage.output_tokens`          | int      | Output tokens                                                                  |
| `gen_ai.usage.reasoning.output_tokens` | int     | Reasoning tokens                                                               |
| `gen_ai.usage.cache_creation.input_tokens` | int | Input tokens written to the provider's prompt cache                            |
| `gen_ai.usage.cache_read.input_tokens` | int     | Input tokens served from the provider's prompt cache                           |
| `http.response.status_code`           | int      | The gateway's response status                                                  |

Gateway-specific `vercel.ai_gateway.*` attributes carry routing, billing, and attribution detail:

AI Gateway records project and deployment IDs as span attributes named `vercel.project.id` and `vercel.deployment.id`. These differ from the `vercel.projectId` and `vercel.deploymentId` resource attributes on Vercel deployment traces.

| Attribute                                  | Type    | Description                                                          |
| ------------------------------------------ | ------- | -------------------------------------------------------------------- |
| `vercel.ai_gateway.provider`               | string  | The exact gateway provider slug (for example, `vertexAnthropic`)      |
| `vercel.ai_gateway.request.id`             | string  | The gateway request ID                                                |
| `vercel.ai_gateway.generation.id`          | string  | The generation ID shown in the AI Gateway dashboard                   |
| `vercel.ai_gateway.api_key.id`             | string  | The API key that made the request                                     |
| `vercel.ai_gateway.api_key.name`           | string  | The API key's display name                                            |
| `vercel.ai_gateway.api_format`             | string  | The API format the client used (for example, the Chat Completions or Anthropic formats) |
| `vercel.ai_gateway.credential.type`        | string  | `byok` or `system`                                                    |
| `vercel.ai_gateway.byok.credential.id`     | string  | The BYOK credential used, if any                                      |
| `vercel.ai_gateway.cost.total`             | string  | Request cost, as a decimal string                                     |
| `vercel.ai_gateway.cost.currency`          | string  | Cost currency                                                         |
| `vercel.ai_gateway.cost.market`            | string  | The provider's list price for the request, as a decimal string        |
| `vercel.ai_gateway.cost.market_currency`   | string  | Market cost currency                                                  |
| `vercel.ai_gateway.zdr.requested`          | boolean | Whether the request required [Zero Data Retention](/docs/ai-gateway/security-and-compliance/zdr) |
| `vercel.ai_gateway.service_tier`           | string  | The service tier that served the request                              |
| `vercel.ai_gateway.referring_site.url`     | string  | The referring site, when the request came from a registered app       |
| `vercel.ai_gateway.referring_site.name`    | string  | The referring site's name                                             |
| `vercel.ai_gateway.tags`                   | string  | Request tags you attached for reporting                               |
| `vercel.ai_gateway.environment`            | string  | The Vercel environment the request came from                          |
| `vercel.ai_gateway.region`                 | string  | The region that handled the request                                   |
| `vercel.ai_gateway.user.id`                | string  | The end-user ID you attached to the request                           |
| `vercel.project.id`                        | string  | The Vercel project the request is attributed to                       |
| `vercel.deployment.id`                     | string  | The Vercel deployment the request is attributed to                    |

### Routing and model attempt attributes

The routing span records how AI Gateway chose a provider, and each model attempt span records one model in the fallback chain:

| Attribute                                              | Type    | Description                                        |
| ------------------------------------------------------ | ------- | -------------------------------------------------- |
| `vercel.ai_gateway.vmc.id`                             | string  | The Vercel Managed Credential used, if any         |
| `vercel.ai_gateway.vmc.used`                           | boolean | Whether a Vercel Managed Credential was used       |
| `vercel.ai_gateway.routing.provider_only_filter`       | string  | The `only` provider filter, if you set one         |
| `vercel.ai_gateway.routing.custom_provider_order`      | string  | The `order` provider preference, if you set one    |
| `vercel.ai_gateway.model_attempt.index`                | int     | This model's position in the fallback chain        |
| `vercel.ai_gateway.model_attempt.total`                | int     | Total models attempted                             |
| `vercel.ai_gateway.model_attempt.is_last`              | boolean | Whether this was the last model attempted          |
| `vercel.ai_gateway.model_attempt.success`              | boolean | Whether this model attempt succeeded               |
| `vercel.ai_gateway.model_attempt.provider_attempt_count` | int   | Provider attempts made for this model              |

### Provider attempt attributes

Each provider attempt span records one upstream call:

| Attribute                                          | Type    | Description                                                  |
| -------------------------------------------------- | ------- | ------------------------------------------------------------ |
| `gen_ai.provider.name`                             | string  | The provider, mapped to OTel well-known values                |
| `gen_ai.request.model`                             | string  | The canonical model slug for this attempt                     |
| `http.response.status_code`                        | int     | The provider's response status                                |
| `error.type`                                       | string  | The provider error, on failed attempts                        |
| `vercel.ai_gateway.attempt.id`                     | string  | The attempt ID                                                |
| `vercel.ai_gateway.attempt.number`                 | int     | This attempt's position within its model attempt              |
| `vercel.ai_gateway.attempt.total_in_request`       | int     | Total provider attempts across the request                    |
| `vercel.ai_gateway.attempt.total_in_model_attempt` | int     | Total provider attempts for this model                        |
| `vercel.ai_gateway.attempt.is_final`               | boolean | Whether this was the last attempt in the request              |
| `vercel.ai_gateway.attempt.success`                | boolean | Whether the provider call succeeded                           |
| `vercel.ai_gateway.attempt.provider_timeout`       | boolean | Whether the attempt hit a [provider timeout](/docs/ai-gateway/models-and-providers/provider-timeouts) |
| `vercel.ai_gateway.attempt.configured_timeout_ms`  | int     | The configured timeout, in milliseconds                       |
| `vercel.ai_gateway.attempt.provider_request_id`    | string  | The provider's own request ID, for support escalations        |
| `vercel.ai_gateway.attempt.provider_response_id`   | string  | The provider's own response ID                                |
| `vercel.ai_gateway.credential.type`                | string  | `byok` or `system`                                            |
| `vercel.ai_gateway.byok.credential.id`             | string  | The BYOK credential used, if any                              |
| `vercel.ai_gateway.region`                         | string  | The region that made the upstream call                        |

## More resources

- [Drains overview](/docs/drains)
- [Configure Drains](/docs/drains/using-drains)
- [Trace Drains reference](/docs/drains/reference/traces)
- [AI Gateway pricing](/docs/ai-gateway/pricing)


---

[View full sitemap](/docs/sitemap)
