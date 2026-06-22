---
title: Custom Reporting
product: vercel
url: /docs/ai-gateway/observability-and-spend/custom-reporting
canonical_url: "https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/openresponses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
summary: Learn about custom reporting on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/observability-and-spend/custom-reporting.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "27f324a47858d196e3ebf84c489818fc7d1c1425dfbe110d0de015b94fbccebc"
---

# Custom Reporting

The Custom Reporting API gives you detailed visibility into your AI Gateway usage. You can break down costs and token consumption by model, user, tag, provider, or credential type to understand exactly where your AI spend is going.

Use it to:

- **Track costs by model**: See how much you're spending on each model and compare cost efficiency across providers
- **Monitor per-user usage**: Identify which users are driving the most spend and token consumption
- **Analyze by tags**: Tag requests by feature, environment, or team to attribute costs and track usage across your organization
- **Compare providers**: Understand cost and usage differences between providers serving the same models
- **Audit BYOK vs system credentials**: Break down usage by credential type to see the impact of bring-your-own-key requests

> **💡 Note:** Custom Reporting is in beta. The API is currently scoped to your entire account, so the API key you use will return usage data for everything on the account.

## Pricing

| Charge type | Cost                                         |
| ----------- | -------------------------------------------- |
| Write       | $0.075 / 1,000 tag/user ID writes            |
| Query       | $5 / 1,000 queries to the reporting endpoint |

> **💡 Note:** Each unique tag or user ID within a single request scope counts as one
> write.

## Applying user and tag info to requests

To use reporting, attach a `user` and/or `tags` to your AI Gateway requests. You can do this through the AI SDK, Chat Completions API, Responses API, OpenResponses API, or Anthropic Messages API.

### AI SDK

The AI SDK supports user and tag submission through the gateway provider. See the [AI SDK docs on usage tracking with user and tags](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#usage-tracking-with-user-and-tags) for details.

```typescript
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'Tell me about San Francisco.',
  providerOptions: {
    gateway: {
      user: 'user-123',
      tags: ['a', 'b'],
    },
  },
});
```

### Chat Completions API

You have two options when using the [Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions):

1. **User only**: Pass `user` in the standard [chat completions `user` field](https://platform.openai.com/docs/api-reference/chat/create#chat_create-user)
2. **User and tags**: Pass `user` and/or `tags` through [provider options](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced#provider-options)

#### TypeScript

```typescript
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-4.6',
  messages: [
    {
      role: 'user',
      content: 'Tell me about San Francisco.',
    },
  ],
  providerOptions: {
    gateway: {
      user: 'user-123',
      tags: ['a', 'b'],
    },
  },
});
```

#### Python

```python
completion = client.chat.completions.create(
    model='anthropic/claude-sonnet-4.6',
    messages=[
        {
            'role': 'user',
            'content': 'Tell me about San Francisco.',
        },
    ],
    extra_body={
        'providerOptions': {
            'gateway': {
                'user': 'user-123',
                'tags': ['a', 'b'],
            },
        },
    },
)
```

### Responses API

Pass `user` and/or `tags` through `providerOptions` on the [Responses API](/docs/ai-gateway/sdks-and-apis/responses) or [OpenResponses API](/docs/ai-gateway/sdks-and-apis/openresponses):

#### TypeScript

```typescript
const response = await openai.responses.create({
  model: 'anthropic/claude-sonnet-4.6',
  input: [
    {
      type: 'message',
      role: 'user',
      content: 'Tell me about San Francisco.',
    },
  ],
  providerOptions: {
    gateway: {
      user: 'user-123',
      tags: ['a', 'b'],
    },
  },
});
```

#### Python

```python
response = client.responses.create(
    model='anthropic/claude-sonnet-4.6',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': 'Tell me about San Francisco.',
        },
    ],
    extra_body={
        'providerOptions': {
            'gateway': {
                'user': 'user-123',
                'tags': ['a', 'b'],
            },
        },
    },
)
```

### Anthropic Messages API

Pass `user` and/or `tags` through [provider options](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api) on the Anthropic Messages API:

#### TypeScript

```typescript
const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-4.6',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: 'Tell me about San Francisco.',
    },
  ],
  providerOptions: {
    gateway: {
      user: 'user-123',
      tags: ['a', 'b'],
    },
  },
});
```

#### Python

```python
message = client.messages.create(
    model='anthropic/claude-sonnet-4.6',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': 'Tell me about San Francisco.',
        },
    ],
    extra_body={
        'providerOptions': {
            'gateway': {
                'user': 'user-123',
                'tags': ['a', 'b'],
            },
        },
    },
)
```

### Using HTTP headers

You can also send reporting metadata as HTTP headers instead of (or in addition to) `providerOptions.gateway`. This is useful when a platform or proxy layer stamps context onto traffic without modifying application code:

| Header              | Type   | Behavior when the request body also sets the same field                |
| ------------------- | ------ | ---------------------------------------------------------------------- |
| `ai-reporting-tags` | string | Comma-separated list. **Merged** with `providerOptions.gateway.tags` (deduped union). |
| `ai-reporting-user` | string | Single value. **Overwrites** `providerOptions.gateway.user` when present. |

Validation limits match the body schema: up to 10 tags total after merging header and body values (deduped), with each tag between 1 and 64 characters; `user` up to 256 characters. An invalid header returns HTTP `400`.

Both headers work across AI Gateway endpoints that accept `providerOptions.gateway`, including the formats shown below. The `defaultHeaders` / `default_headers` pattern on the SDK client is the same regardless of which endpoint you call. Swap in `responses.create`, `messages.create`, embeddings, image generation, or other supported calls as needed.

#### Chat Completions (OpenAI SDK)

#### TypeScript

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
    'ai-reporting-user': 'user-12345',
  },
});

const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-4.6',
  messages: [{ role: 'user', content: 'Tell me about San Francisco.' }],
});
```

#### Python

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ['AI_GATEWAY_API_KEY'],
    base_url='https://ai-gateway.vercel.sh/v1',
    default_headers={
        'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
        'ai-reporting-user': 'user-12345',
    },
)

completion = client.chat.completions.create(
    model='anthropic/claude-sonnet-4.6',
    messages=[{'role': 'user', 'content': 'Tell me about San Francisco.'}],
)
```

#### Responses (OpenAI SDK)

#### TypeScript

```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
  defaultHeaders: {
    'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
    'ai-reporting-user': 'user-12345',
  },
});

const response = await openai.responses.create({
  model: 'anthropic/claude-sonnet-4.6',
  input: 'Tell me about San Francisco.',
});
```

#### Python

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ['AI_GATEWAY_API_KEY'],
    base_url='https://ai-gateway.vercel.sh/v1',
    default_headers={
        'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
        'ai-reporting-user': 'user-12345',
    },
)

response = client.responses.create(
    model='anthropic/claude-sonnet-4.6',
    input='Tell me about San Francisco.',
)
```

#### Anthropic SDK (Messages)

#### TypeScript

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
  defaultHeaders: {
    'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
    'ai-reporting-user': 'user-12345',
  },
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-sonnet-4.6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Tell me about San Francisco.' }],
});
```

#### Python

```python
import os
from anthropic import Anthropic

client = Anthropic(
    api_key=os.environ['AI_GATEWAY_API_KEY'],
    base_url='https://ai-gateway.vercel.sh',
    default_headers={
        'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
        'ai-reporting-user': 'user-12345',
    },
)

message = client.messages.create(
    model='anthropic/claude-sonnet-4.6',
    max_tokens=1024,
    messages=[{'role': 'user', 'content': 'Tell me about San Francisco.'}],
)
```

#### Direct HTTP (OpenResponses and raw requests)

#### TypeScript

```typescript
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
    'ai-reporting-user': 'user-12345',
  },
  body: JSON.stringify({
    model: 'anthropic/claude-sonnet-4.6',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Tell me about San Francisco.',
      },
    ],
  }),
});
```

#### Python

```python
import os
import requests

response = requests.post(
    'https://ai-gateway.vercel.sh/v1/responses',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f"Bearer {os.environ['AI_GATEWAY_API_KEY']}",
        'ai-reporting-tags': 'team:billing,feature:chat,env:prod',
        'ai-reporting-user': 'user-12345',
    },
    json={
        'model': 'anthropic/claude-sonnet-4.6',
        'input': [
            {
                'type': 'message',
                'role': 'user',
                'content': 'Tell me about San Francisco.',
            },
        ],
    },
)
```

## Custom Reporting API reference

The reporting endpoint is available on Pro and Enterprise plans. The team is inferred from the API key or OIDC token. Hobby and Pro-trial plans cannot use this endpoint.

### Endpoint

```http filename="Endpoint"
GET https://ai-gateway.vercel.sh/v1/report
```

### Authentication

All requests require a Bearer token in the `Authorization` header:

```bash
Authorization: Bearer YOUR_API_KEY
```

### Required query parameters

| Parameter    | Type   | Description                       |
| ------------ | ------ | --------------------------------- |
| `start_date` | string | Start date in `YYYY-MM-DD` format |
| `end_date`   | string | End date in `YYYY-MM-DD` format   |

Dates are inclusive (both `start_date` and `end_date` are included) and in UTC.

### Optional query parameters

#### Grouping

| Parameter   | Type   | Options                                                                                                                                                                                                                  | Description                                                                                              |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `group_by`  | string | `day` (default), `user`, `model`, `tag`, [`provider`](/docs/ai-gateway/models-and-providers/provider-options#available-providers), `credential_type`, `zero_data_retention`, `api_key_name`                            | How to aggregate the results. Each row represents one bucket of this dimension.                          |
| `date_part` | string | `day` (default), `hour`                                                                                                                                                                                                  | Time granularity. Only applies when `group_by=day`. Use `hour` for per-hour rows, `day` for per-day rows. |

#### Filtering

Filters are applied before aggregation. Combine them with any `group_by` value.

| Parameter             | Type    | Description                                                                                                                      | Example                          |
| --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `user_id`             | string  | Filter by a specific user ID                                                                                                     | `user_123`                       |
| `model`               | string  | Filter by a specific [model](https://vercel.com/ai-gateway/models) in `creator/model-name` format                                | `anthropic/claude-sonnet-4.6`    |
| `provider`            | string  | Filter by [provider](/docs/ai-gateway/models-and-providers/provider-options#available-providers)                                 | `openai`                         |
| `credential_type`     | string  | Filter by credential type                                                                                                        | `byok` or `system`               |
| `zero_data_retention` | boolean | Filter to Zero Data Retention (ZDR)-requested vs non-ZDR requests                                                                | `true` or `false`                |
| `tags`                | string  | Filter by one or more comma-separated tags. By default, requests match when they contain any listed tag.                         | `production` or `production,api` |
| `tags_match`          | string  | Match mode for `tags`. Use `any` to match requests with any listed tag, or `all` to require every listed tag. Defaults to `any`. | `any` or `all`                   |

### Example request

```bash filename="terminal"
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&group_by=model" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY"
```

### Response format

The API returns a JSON object with a `results` array. Each row contains the one grouping field that matches the `group_by` parameter you used, plus the aggregated metrics. The example below shows every possible field together so you can see the shape; in a real response, only the grouping field for your selected `group_by` will be present. It can take a few minutes for requests to appear in the reporting endpoint.

```json filename="Response"
{
  "results": [
    {
      "day": "2026-01-01",
      "model": "anthropic/claude-sonnet-4.6",
      "provider": "anthropic",
      "user": "user_123",
      "tag": "production",
      "credential_type": "system",
      "zero_data_retention": "false",
      "api_key_name": "Production key",
      "total_cost": 10.5,
      "market_cost": 12.0,
      "surcharge_cost": 0.5,
      "gateway_cost": 0,
      "input_tokens": 1000,
      "output_tokens": 500,
      "cached_input_tokens": 200,
      "cache_creation_input_tokens": 50,
      "reasoning_tokens": 100,
      "request_count": 25
    }
  ]
}
```

### Response fields

Every row includes a single grouping field that depends on `group_by`, plus the metrics below.

#### Grouping fields

| Field                 | Present when                                 | Type   | Notes                                                          |
| --------------------- | -------------------------------------------- | ------ | -------------------------------------------------------------- |
| `day`                 | `group_by=day` and `date_part=day` (default) | string | The UTC date for the bucket (`YYYY-MM-DD`)                     |
| `hour`                | `group_by=day` and `date_part=hour`          | string | The UTC hour for the bucket (`YYYY-MM-DDTHH`)                  |
| `user`                | `group_by=user`                              | string | The user ID attached to the request                            |
| `model`               | `group_by=model`                             | string | The model in `creator/model-name` form                         |
| `tag`                 | `group_by=tag`                               | string | A single tag value (one row per tag in the request)            |
| `provider`            | `group_by=provider`                          | string | The provider that served the request                           |
| `credential_type`     | `group_by=credential_type`                   | string | `byok` or `system`                                             |
| `zero_data_retention` | `group_by=zero_data_retention`               | string | `true` or `false`                                              |
| `api_key_name`        | `group_by=api_key_name`                      | string | The human-readable name of the API key that served the request |

#### Metric fields

| Field                         | Type   | Description                                                                           |
| ----------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `total_cost`                  | number | Charged price in USD. Returns `0.00` for BYOK requests.                               |
| `market_cost`                 | number | Market price of the request at the time it ran. Includes both BYOK and non-BYOK cost. |
| `surcharge_cost`              | number | Surcharge portion of `total_cost` (for example, from add-on capabilities).            |
| `gateway_cost`                | number | AI Gateway's own cost, separate from the provider rate.                               |
| `input_tokens`                | number | Input tokens used                                                                     |
| `output_tokens`               | number | Output tokens used                                                                    |
| `cached_input_tokens`         | number | Cached input tokens                                                                   |
| `cache_creation_input_tokens` | number | Cache creation tokens                                                                 |
| `reasoning_tokens`            | number | Reasoning tokens                                                                      |
| `request_count`               | number | Number of requests in this row                                                        |

All cost values are in USD and aggregated based on the grouping parameter.

## Querying reports with the AI SDK

Query spend reports with the AI SDK's `getSpendReport()` method. It accepts the same parameters as the REST API (in camelCase) and returns camelCase results.

```typescript
import { gateway } from 'ai';

const report = await gateway.getSpendReport({
  startDate: '2026-03-01',
  endDate: '2026-03-25',
  groupBy: 'model',
});

for (const row of report.results) {
  console.log(`${row.model}: $${row.totalCost.toFixed(4)}`);
}
```

You can combine tagging on requests with filtered queries to attribute costs by feature, team, or environment:

```typescript
import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { gateway, streamText } from 'ai';

// 1. Make requests with tags
const result = streamText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'Summarize this quarter's results',
  providerOptions: {
    gateway: {
      tags: ['team:finance', 'feature:summaries'],
    } satisfies GatewayProviderOptions,
  },
});

// 2. Later, query spend filtered by those tags
const report = await gateway.getSpendReport({
  startDate: '2026-03-01',
  endDate: '2026-03-31',
  groupBy: 'tag',
  tags: ['team:finance'],
});

for (const row of report.results) {
  console.log(
    `${row.tag}: $${row.totalCost.toFixed(4)} (${row.requestCount} requests)`,
  );
}
```

See the [AI SDK docs on spend reports](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#querying-spend-reports) for the full list of parameters and response fields.

## Generation lookup

Use the AI SDK's `getGenerationInfo()` method to look up a specific generation by its ID, including cost, token usage, latency, and provider details. Generation IDs are available in `providerMetadata.gateway.generationId` on both `generateText` and `streamText` responses.

When streaming, the generation ID is injected on the first content chunk, so you can capture it early without waiting for completion. This is useful when a network interruption cuts off the final response. AI Gateway records the final status server-side, so you can use the generation ID to look up the results later.

#### generateText

```typescript
import { gateway, generateText } from 'ai';

const result = await generateText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'Explain quantum entanglement briefly',
});

const generationId = result.providerMetadata?.gateway?.generationId;
const generation = await gateway.getGenerationInfo({ id: generationId });

console.log(`Model: ${generation.model}`);
console.log(`Cost: $${generation.totalCost.toFixed(6)}`);
console.log(`Latency: ${generation.latency}ms`);
console.log(`Prompt tokens: ${generation.promptTokens}`);
console.log(`Completion tokens: ${generation.completionTokens}`);
```

#### streamText

```typescript
import { gateway, streamText } from 'ai';

const result = streamText({
  model: 'anthropic/claude-opus-4.7',
  prompt: 'Explain quantum entanglement briefly',
});

let generationId: string | undefined;

for await (const part of result.fullStream) {
  if (!generationId && part.providerMetadata?.gateway?.generationId) {
    generationId = part.providerMetadata.gateway.generationId as string;
  }
}

if (generationId) {
  const generation = await gateway.getGenerationInfo({ id: generationId });
  console.log(`Cost: $${generation.totalCost.toFixed(6)}`);
  console.log(`Finish reason: ${generation.finishReason}`);
}
```

See the [AI SDK docs on generation lookup](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#generation-lookup) for the full list of response fields.

## REST API usage examples

### Group by day

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&date_part=day" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Group by model per hour

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&date_part=hour&group_by=model" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Group by user

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&group_by=user" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Group by tag

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&group_by=tag" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Group by credential type

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&group_by=credential_type" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Filter by user, model, or tags

You can combine filters to narrow results:

```bash
curl "https://ai-gateway.vercel.sh/v1/report?start_date=2026-01-01&end_date=2026-01-31&date_part=day&user_id=user_123&model=anthropic/claude-sonnet-4.6&tags=production,api" \
  -H "Authorization: Bearer YOUR_API_KEY"
```


---

[View full sitemap](/docs/sitemap)
