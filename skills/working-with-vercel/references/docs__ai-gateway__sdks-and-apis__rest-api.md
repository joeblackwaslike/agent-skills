---
title: REST API
product: vercel
url: /docs/ai-gateway/sdks-and-apis/rest-api
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/rest-api"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/ai-sdk
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis/openresponses
summary: Learn about rest api on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/rest-api.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3647c3b7fd66cecd1a233d22f85060f622cae9857f7fefd9c45d71642da154ac"
---

# REST API Reference

For sending inference requests, the [AI SDK](/docs/ai-gateway/sdks-and-apis/ai-sdk) is the easiest way to interact with AI Gateway. You can also send requests through the [chat completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/chat-completions), [responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses) APIs.

AI Gateway exposes a REST API for looking up usage and generations, querying spend reports, and discovering models. This page is the canonical reference for those endpoints. The [AI SDK AI Gateway provider](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#dynamic-model-discovery) also exposes TypeScript APIs for the same data, which you can use as an alternative to calling the REST endpoints directly.

## Base URL

```bash filename="Base URL"
https://ai-gateway.vercel.sh/v1
```

## Authentication

Most endpoints require authentication. The exceptions are noted on each endpoint.

### API key (Bearer token)

Pass an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/authentication#api-key) in the `Authorization` header. AI Gateway infers the team from the key.

```http filename="HTTP header"
Authorization: Bearer <api_key>
```

### Vercel OIDC token

On Vercel deployments, you can pass the [Vercel OIDC token](/docs/ai-gateway/authentication-and-byok/authentication#oidc-token) in the `Authorization` header instead. The token is generated automatically per project.

## Supported endpoints

| Endpoint                                                            | Description                                                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [`GET /v1/models`](#list-models)                                    | List all available models                                          |
| [`GET /v1/models/{creator}/{model}/endpoints`](#get-model-endpoints) | Get every provider endpoint serving a model                        |
| [`GET /v1/credits`](#check-credit-balance)                          | Check the team's AI Gateway Credits balance and total spend        |
| [`GET /v1/generation`](#look-up-a-generation)                       | Look up cost, latency, and token usage for a specific generation   |
| [`GET /v1/report`](#query-spend-report)                             | Query aggregated spend reports for the team                        |

## Models

### List models

```http filename="Endpoint"
GET /v1/models
```

Lists every model available through AI Gateway. Follows the OpenAI models API format. No authentication required.

For the AI SDK equivalent, see [Dynamic Model Discovery](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#dynamic-model-discovery).

#### Example request

```typescript filename="list-models.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v1/models');
const { data: models } = await response.json();

models.forEach((model) => {
  console.log(`${model.id}: ${model.name}`);
});
```

#### Sample response

```json filename="Response"
{
  "object": "list",
  "data": [
    {
      "id": "google/gemini-3.1-pro-preview",
      "object": "model",
      "created": 1755815280,
      "released": 1763424000,
      "owned_by": "google",
      "name": "Gemini 3.1 Pro Preview",
      "description": "This model improves upon Gemini 2.5 Pro and is catered towards challenging tasks, especially those involving complex reasoning or agentic workflows.",
      "context_window": 1000000,
      "max_tokens": 64000,
      "type": "language",
      "tags": ["file-input", "tool-use", "reasoning", "vision"],
      "pricing": {
        "input": "0.000002",
        "output": "0.000012",
        "input_cache_read": "0.0000002",
        "input_cache_write": "0.000002"
      }
    }
  ]
}
```

#### Response fields

| Field                                    | Type     | Description                                                           |
| ---------------------------------------- | -------- | --------------------------------------------------------------------- |
| `object`                                 | string   | Always `"list"`                                                       |
| `data`                                   | array    | Array of available models                                             |
| `data[].id`                              | string   | Model identifier (for example, `openai/gpt-5.5`)                      |
| `data[].object`                          | string   | Always `"model"`                                                      |
| `data[].created`                         | integer  | Unix timestamp when the model was added                               |
| `data[].released`                        | integer  | Unix timestamp when the model was released                            |
| `data[].owned_by`                        | string   | Model provider or owner                                               |
| `data[].name`                            | string   | Human-readable model name                                             |
| `data[].description`                     | string   | Model description                                                     |
| `data[].context_window`                  | integer  | Maximum context length in tokens                                      |
| `data[].max_tokens`                      | integer  | Maximum output tokens                                                 |
| `data[].type`                            | string   | Model type: `language`, `embedding`, `reranking`, `image`, or `video` |
| `data[].tags`                            | string\[] | Capability tags (for example, `reasoning`, `tool-use`, `vision`)      |
| `data[].pricing`                         | object   | Pricing information (structure varies by model type)                  |
| `data[].pricing.input`                   | string   | Base cost per input token                                             |
| `data[].pricing.input_tiers`             | array    | Tiered pricing for input tokens (see [Tiered pricing](#tiered-pricing)) |
| `data[].pricing.output`                  | string   | Base cost per output token (language models only)                     |
| `data[].pricing.output_tiers`            | array    | Tiered pricing for output tokens                                      |
| `data[].pricing.input_cache_read`        | string   | Cost per cached input token (read)                                    |
| `data[].pricing.input_cache_write`       | string   | Cost per input token (cache write)                                    |
| `data[].pricing.image`                   | string   | Cost per generated image (image models only)                          |
| `data[].pricing.web_search`              | string   | Cost per web search request                                           |

### Get model endpoints

```http filename="Endpoint"
GET /v1/models/{creator}/{model}/endpoints
```

Returns every provider endpoint serving a specific model, along with per-endpoint pricing, capabilities, and supported parameters. No authentication required.

#### Example request

```typescript filename="get-model-endpoints.ts"
const response = await fetch(
  'https://ai-gateway.vercel.sh/v1/models/google/gemini-3.1-pro-preview/endpoints',
);
const { data } = await response.json();

console.log(`Model: ${data.name}`);
data.endpoints.forEach((endpoint) => {
  console.log(`  ${endpoint.provider_name}: ${endpoint.context_length} tokens`);
});
```

#### Sample response

```json filename="Response"
{
  "data": {
    "id": "google/gemini-3.1-pro-preview",
    "name": "Gemini 3.1 Pro Preview",
    "created": 1755815280,
    "released": 1763424000,
    "description": "This model improves upon Gemini 2.5 Pro and is catered towards challenging tasks, especially those involving complex reasoning or agentic workflows.",
    "architecture": {
      "tokenizer": null,
      "instruct_type": null,
      "modality": "text+image+file→text",
      "input_modalities": ["text", "image", "file"],
      "output_modalities": ["text"]
    },
    "endpoints": [
      {
        "name": "google | google/gemini-3.1-pro-preview",
        "model_name": "Gemini 3.1 Pro Preview",
        "context_length": 1000000,
        "pricing": {
          "prompt": "0.000002",
          "completion": "0.000012",
          "input_cache_read": "0.0000002",
          "input_cache_write": "0.000002"
        },
        "provider_name": "google",
        "max_completion_tokens": 64000,
        "supported_parameters": ["max_tokens", "temperature", "tools", "reasoning"],
        "status": 0,
        "uptime_last_15m": 100,
        "uptime_last_1h": 99.8,
        "uptime_last_1d": 99.6,
        "throughput_last_1h": { "p50": 67, "p95": 69.85 },
        "latency_last_1h": { "p50": 2292, "p95": 2685 },
        "supports_implicit_caching": false
      }
    ]
  }
}
```

#### Response fields

| Field                                              | Type     | Description                                                     |
| -------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `data.id`                                          | string   | Model identifier                                                |
| `data.name`                                        | string   | Human-readable model name                                       |
| `data.created`                                     | integer  | Unix timestamp when the model was added                         |
| `data.released`                                    | integer  | Unix timestamp when the model was released                      |
| `data.description`                                 | string   | Model description                                               |
| `data.architecture`                                | object   | Model architecture details                                      |
| `data.architecture.modality`                       | string   | Input/output modality string                                    |
| `data.architecture.input_modalities`               | string\[] | Supported input types                                           |
| `data.architecture.output_modalities`              | string\[] | Supported output types                                          |
| `data.endpoints`                                   | array    | Array of provider endpoints                                     |
| `data.endpoints[].provider_name`                   | string   | Provider name (for example, `google`, `anthropic`)              |
| `data.endpoints[].context_length`                  | integer  | Maximum context window in tokens                                |
| `data.endpoints[].max_completion_tokens`           | integer  | Maximum output tokens                                           |
| `data.endpoints[].pricing.prompt`                  | string   | Cost per prompt token                                           |
| `data.endpoints[].pricing.completion`              | string   | Cost per completion token                                       |
| `data.endpoints[].pricing.input_cache_read`        | string   | Cost per cached input token (read)                              |
| `data.endpoints[].pricing.input_cache_write`       | string   | Cost per input token (cache write)                              |
| `data.endpoints[].supported_parameters`            | string\[] | API parameters supported by this endpoint                       |
| `data.endpoints[].supports_implicit_caching`       | boolean  | Whether the provider supports automatic caching                 |
| `data.endpoints[].status`                          | integer  | Endpoint status: `0` is active                                  |
| `data.endpoints[].uptime_last_15m`                 | number   | Uptime percentage over the last 15 minutes                      |
| `data.endpoints[].uptime_last_1h`                  | number   | Uptime percentage over the last hour                            |
| `data.endpoints[].uptime_last_1d`                  | number   | Uptime percentage over the last day                             |
| `data.endpoints[].throughput_last_1h`              | object   | p50 and p95 throughput (tokens/sec) over the last hour          |
| `data.endpoints[].latency_last_1h`                 | object   | p50 and p95 time to first token (ms) over the last hour         |

For more on the uptime and metrics fields, see [Uptime and Status](/docs/ai-gateway/models-and-providers/uptime) and [Metrics](/docs/ai-gateway/models-and-providers/metrics).

#### Tiered pricing

Some models have tiered pricing based on context size. When tiered pricing applies, the `*_tiers` arrays contain pricing tiers:

| Field  | Type   | Description                                                   |
| ------ | ------ | ------------------------------------------------------------- |
| `cost` | string | Cost per token for this tier                                  |
| `min`  | number | Minimum token count (inclusive)                               |
| `max`  | number | Maximum token count (exclusive), omitted for the highest tier |

## Usage and billing

### Check credit balance

```http filename="Endpoint"
GET /v1/credits
```

Returns the team's current AI Gateway Credits balance and lifetime spend.

For the AI SDK equivalent, see [Credit Usage](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#credit-usage).

#### Example request

#### TypeScript

```typescript filename="credits.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const response = await fetch('https://ai-gateway.vercel.sh/v1/credits', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

const credits = await response.json();
console.log(credits);
```

#### Python

```python filename="credits.py"
import os
import requests

api_key = os.getenv("AI_GATEWAY_API_KEY") or os.getenv("VERCEL_OIDC_TOKEN")

response = requests.get(
    "https://ai-gateway.vercel.sh/v1/credits",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    },
)

credits = response.json()
print(credits)
```

#### Sample response

```json filename="Response"
{
  "balance": "95.50",
  "total_used": "4.50"
}
```

#### Response fields

- `balance`: Remaining credit balance, in USD
- `total_used`: Total credits used to date, in USD

### Look up a generation

```http filename="Endpoint"
GET /v1/generation?id={generation_id}
```

Returns detailed information about a specific generation, including cost, latency, and token usage. Generation information becomes available shortly after the generation completes. Much of this data is also returned in `providerMetadata` on the chat completion response.

For the AI SDK equivalent, see [Generation Lookup](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#generation-lookup).

#### Parameters

- `id` (required): The generation ID to look up. Format: `gen_<ulid>`.

#### Example request

#### TypeScript

```typescript filename="generation-lookup.ts"
const generationId = 'gen_01ARZ3NDEKTSV4RRFFQ69G5FAV';

const response = await fetch(
  `https://ai-gateway.vercel.sh/v1/generation?id=${generationId}`,
  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  },
);

const generation = await response.json();
console.log(generation);
```

#### Python

```python filename="generation-lookup.py"
import os
import requests

generation_id = 'gen_01ARZ3NDEKTSV4RRFFQ69G5FAV'

response = requests.get(
    f"https://ai-gateway.vercel.sh/v1/generation?id={generation_id}",
    headers={
        "Authorization": f"Bearer {os.getenv('AI_GATEWAY_API_KEY')}",
        "Content-Type": "application/json",
    },
)

generation = response.json()
print(generation)
```

#### Sample response

```json filename="Response"
{
  "data": {
    "id": "gen_01ARZ3NDEKTSV4RRFFQ69G5FAV",
    "total_cost": 0.00123,
    "upstream_inference_cost": 0,
    "usage": 0.00123,
    "created_at": "2026-05-22T00:00:00.000Z",
    "model": "anthropic/claude-opus-4.7",
    "is_byok": false,
    "provider_name": "anthropic",
    "streamed": true,
    "finish_reason": "stop",
    "latency": 200,
    "generation_time": 1500,
    "tokens_prompt": 100,
    "tokens_completion": 50,
    "native_tokens_prompt": 100,
    "native_tokens_completion": 50,
    "native_tokens_reasoning": 0,
    "native_tokens_cached": 0,
    "native_tokens_cache_creation": 0,
    "billable_web_search_calls": 0
  }
}
```

#### Response fields

- `id`: The generation ID
- `total_cost`: Total cost in USD for this generation, including any surcharges (for example, Zero Data Retention or Custom Reporting writes)
- `upstream_inference_cost`: Market price the provider would have charged for the inference. Non-zero only for BYOK generations, where `total_cost` does not include this amount; `0` otherwise.
- `usage`: Same as `total_cost`. Kept for compatibility with the OpenRouter schema this endpoint mirrors.
- `created_at`: ISO 8601 timestamp when the generation was created
- `model`: Model identifier used for this generation
- `is_byok`: Whether this generation used Bring Your Own Key (BYOK) credentials
- `provider_name`: The provider that served this generation
- `streamed`: Whether this generation used streaming
- `finish_reason`: Why the generation ended (for example, `stop`, `length`, `content_filter`, `tool_calls`)
- `latency`: Time to first token in milliseconds
- `generation_time`: Total generation time in milliseconds
- `tokens_prompt`: Number of prompt tokens
- `tokens_completion`: Number of completion tokens
- `native_tokens_prompt`: Native prompt tokens (provider-specific)
- `native_tokens_completion`: Native completion tokens (provider-specific)
- `native_tokens_reasoning`: Reasoning tokens used
- `native_tokens_cached`: Cached input tokens read
- `native_tokens_cache_creation`: Cache creation tokens written
- `billable_web_search_calls`: Number of billable web search calls performed during this generation

> **💡 Note:** **Generation IDs:** Generation IDs are returned on every chat completion
> response as the [`id`](https://platform.openai.com/docs/api-reference/chat/object#chat/object-id)
> field, and on streaming responses are injected into the first content chunk so
> you can capture them before the stream completes. They are also surfaced via
> `providerMetadata.gateway.generationId` in the AI SDK.

## Custom Reporting

Use the Custom Reporting API to break down spend and usage by model, user, tag, provider, or credential type. For concepts, how to attach tags and user IDs to requests, querying with the AI SDK, and the full response field reference, see the [Custom Reporting page](/docs/ai-gateway/capabilities/custom-reporting).

### Query spend report

```http filename="Endpoint"
GET /v1/report
```

Returns aggregated spend over a date range. The team is inferred from the API key or OIDC token. Hobby and Pro-trial plans cannot use this endpoint.

For the AI SDK equivalent, see [Querying Spend Reports](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#querying-spend-reports).

#### Required query parameters

| Parameter    | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `start_date` | string | Start date in `YYYY-MM-DD` format |
| `end_date`   | string | End date in `YYYY-MM-DD` format   |

Dates are inclusive (both `start_date` and `end_date` are included) and in UTC.

#### Optional query parameters

| Parameter             | Type    | Description                                                                                                                                                                                                              |
| --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `group_by`            | string  | How to aggregate results. One of `day` (default), `user`, `model`, `tag`, `provider`, `credential_type`, `zero_data_retention`, `api_key_name`.                                                                          |
| `date_part`           | string  | Time granularity when `group_by=day`. One of `day` (default) or `hour`.                                                                                                                                                  |
| `user_id`             | string  | Filter by a specific user ID.                                                                                                                                                                                            |
| `model`               | string  | Filter by a specific model in `creator/model-name` format.                                                                                                                                                               |
| `provider`            | string  | Filter by provider.                                                                                                                                                                                                      |
| `credential_type`     | string  | Filter by credential type: `byok` or `system`.                                                                                                                                                                           |
| `zero_data_retention` | boolean | Filter to ZDR-requested vs non-ZDR requests.                                                                                                                                                                             |
| `tags`                | string  | Filter by one or more comma-separated tags. By default, requests match when they contain any listed tag.                                                                                                                 |
| `tags_match`          | string  | Match mode for `tags`. Use `any` to match requests with any listed tag, or `all` to require every listed tag. Defaults to `any`.                                                                                         |

#### Example request

```bash filename="terminal"
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&group_by=model" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

For the full response shape, sample JSON, and the per-field reference (which grouping fields appear with which `group_by` value, plus all metric fields), see [Response format](/docs/ai-gateway/capabilities/custom-reporting#response-format) and [Response fields](/docs/ai-gateway/capabilities/custom-reporting#response-fields) on the Custom Reporting page.

## Error responses

Errors return a JSON body with an `error` field. Some endpoints additionally include a `type` discriminator on the error object.

```json filename="Error response"
{
  "error": {
    "message": "Invalid request body",
    "type": "invalid_request_error"
  }
}
```

| Status | Meaning                                                                                                  |
| ------ | -------------------------------------------------------------------------------------------------------- |
| `400`  | Invalid request body, missing required fields, or validation error.                                      |
| `401`  | Authentication failed (invalid API key or OIDC token).                                                   |
| `403`  | Endpoint requires a paid plan (for example, Hobby and Pro-trial cannot query `/v1/report`).              |
| `404`  | Resource not found (for example, a generation that doesn't exist).                                       |
| `500`  | Internal server error.                                                                                   |
| `503`  | A backing service is misconfigured or unavailable.                                                       |


---

[View full sitemap](/docs/sitemap)
