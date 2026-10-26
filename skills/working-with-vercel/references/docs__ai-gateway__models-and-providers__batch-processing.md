---
title: AI Gateway Batch Processing
product: vercel
url: /docs/ai-gateway/models-and-providers/batch-processing
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/batch-processing"
last_updated: 2026-09-18
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway/security-and-compliance/regional-inference
  - /docs/ai-gateway/modalities/video-generation
summary: Process large volumes of text generation requests asynchronously through AI Gateway at discounted batch prices, with results available within 24...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/batch-processing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c27deba09285a031770a15c1e8a379d1b89af201d31faddcdf6d1020fb7e3929"
---

# AI Gateway Batch Processing

Batch processing lets you submit many text generation requests as a single asynchronous job. Instead of waiting for each response, you start a batch, poll its status or receive a webhook, and stream the results when the job finishes. AI Gateway bills batches at a discount on the model's standard token prices (50% for most models), and batches reach a terminal state within 24 hours.

Use batch processing when you don't need immediate responses:

- Large-scale evaluations and benchmarking
- Content classification and moderation
- Bulk summarization, translation, or data extraction
- Synthetic data generation

> **💡 Note:** Batch processing is in beta. The AI SDK batch functions carry the
> `experimental_` prefix and may change in minor releases.

## Requirements

For the native Anthropic SDK workflow, see [Message batches](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api#message-batches).

Batch processing uses the AI SDK's experimental batch functions with the AI Gateway provider:

- `ai` version 7.0.108 or later, which includes the batch functions and an AI Gateway provider that supports them
- If you install the provider separately, `@ai-sdk/gateway` version 4.0.88 or later

Earlier releases used a different batch API (`experimental_startTextBatch`). Upgrade to use the functions on this page.

Requests authenticate the same way as other AI Gateway requests. See [Authentication](/docs/ai-gateway/authentication-and-byok) for setup.

## Supported models

Batch processing is available for language models served by Anthropic, Google, OpenAI, and SpaceXAI:

| Provider  | Batch-capable models                                                    | Batch price              |
| --------- | ----------------------------------------------------------------------- | ------------------------ |
| Anthropic | All active models                                                       | 50% of standard pricing  |
| Google    | Gemini text models, such as `google/gemini-2.5-flash`                   | 50% of standard pricing  |
| OpenAI    | Most, but not all, models, such as `openai/gpt-5-mini`                  | 50% of standard pricing  |
| SpaceXAI  | Selected models, such as `spacexai/grok-4.3`                            | 80% of standard pricing  |

AI Gateway validates batch support for your requested model and any fallback candidates when you start the batch, and returns an error if none of them support it. Batches run on the model provider's own batch API, so AI Gateway doesn't route them through other providers that serve the same model, such as Amazon Bedrock or Google Vertex AI.

The [models list](/docs/ai-gateway/models-and-providers) includes a `<model>-batch` entry, such as `anthropic/claude-haiku-4.5-batch`, for each batch-capable model, priced at its batch rates. You can pass that ID anywhere a batch takes a model, and AI Gateway treats it as the base model. Synchronous requests don't accept `-batch` IDs.

### Regional inference

Batches support [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference) for Anthropic models: set `inferenceRegion` and the provider processes and stores the batch in that region, with the regional price adjustment applied. Region-pinned batches aren't supported for other providers yet and fail at submission.

## How it works

1. You submit up to 1,000 requests in one call. AI Gateway validates the batch, submits it to the provider's native batch API, and returns a batch ID once the provider accepts it.
2. AI Gateway tracks the batch durably from that point. No client connection needs to stay open while the batch processes.
3. The provider processes requests within its batch window, which is at most 24 hours. Most batches finish sooner.
4. You poll the batch status until it's no longer `pending`, or receive a [webhook](#webhooks) when it finishes, then stream the per-request results.

The batch ID is an AI Gateway identifier, not the provider's batch ID. Only your team can read the batch's status and results.

## Starting a batch

Use `experimental_startBatch` with a list of requests. Each request needs a unique `id`, which you use to match results back to requests, a `type` of `'text'`, and the `model` to run:

```typescript filename="batch.ts"
import { experimental_startBatch as startBatch, gateway } from 'ai';

const instructions = 'Classify the sentiment as positive, negative, or neutral.';

const batch = await startBatch({
  provider: gateway,
  requests: [
    {
      id: 'review-1042',
      type: 'text',
      model: 'anthropic/claude-haiku-4.5',
      instructions,
      prompt: 'The checkout flow was fast and painless.',
    },
    {
      id: 'review-1043',
      type: 'text',
      model: 'anthropic/claude-haiku-4.5',
      instructions,
      prompt: 'The app crashed twice before I could pay.',
    },
  ],
});

console.log(batch.id, batch.status);
```

The `provider` option defaults to AI Gateway when you haven't configured a different global provider, so you can omit it. Pass it explicitly when your application sets a global provider, or when you use a custom gateway instance from `createGateway`.

The start call stays open until the provider accepts the batch, so large payloads take longer to submit. Once the call returns, `batch.status` starts as `pending`.

The returned `batch` object is a serializable reference containing the batch `id`, `provider`, and `version`. Batches can run for hours, so store it, for example in a database or queue message. Any process can then poll the batch later by passing the stored reference, with the same provider, to the status, results, and cancel functions.

Every request in a batch must use the same model. To batch across models, start one batch per model.

### Request options

Each request accepts the standard text generation options: `prompt` or `messages`, `instructions`, `maxOutputTokens`, `temperature`, `topP`, `topK`, `seed`, `stopSequences`, `frequencyPenalty`, `presencePenalty`, `reasoning`, structured output, and per-request `providerOptions`. Prompts can include images for vision models, either inline or by URL.

Requests can also define tools with `tools` and `toolChoice`. Batch tools are definition-only: the model can return tool calls, but the AI SDK never runs their `execute` functions or sends tool results back. Pass the same `tools` to `getBatchResults` to validate and normalize the returned tool calls.

The following are not supported in batch requests:

- Image generation requests (`type: 'image'`)
- Provider-executed tools, such as web search or MCP servers
- Streaming
- References to provider-hosted resources, such as file IDs, stored responses, or containers. Batch inputs must be self-contained. This restriction doesn't apply when the batch runs on [your own provider keys](#byok).

## Checking batch status

Use `experimental_getBatchStatus` to poll the batch:

```typescript filename="batch.ts"
import { experimental_getBatchStatus as getBatchStatus, gateway } from 'ai';
import { setTimeout } from 'node:timers/promises';

let status = batch.status;
while (status === 'pending') {
  await setTimeout(30_000);
  ({ status } = await getBatchStatus({ provider: gateway, batch }));
  console.log('Batch status:', status);
}
```

The status is one of:

| Status      | Meaning                                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pending`   | The batch is validating or processing at the provider.                                                                                                                                  |
| `completed` | Processing finished. Results are ready to retrieve. Individual requests can still have errors.                                                                                          |
| `failed`    | The batch reached a terminal failure, expired at the provider, or was cancelled. Any requests that completed before the failure still return results, and you're only billed for those. |

The status response can also include `requestCounts` with `total`, `pending`, `completed`, and `failed` request tallies, and a `rawStatus` field with the provider's own status string.

All batch functions accept `abortSignal`, `headers`, and `timeout` options. `getBatchStatus` and `getBatchResults` also accept `maxRetries`.

## Retrieving results

Once the batch is no longer `pending`, stream the results with `experimental_getBatchResults`. Results arrive as an async iterable and may not match the order you submitted, so always match by `id`:

```typescript filename="batch.ts"
import { experimental_getBatchResults as getBatchResults, gateway } from 'ai';

for await (const item of getBatchResults({ provider: gateway, batch })) {
  if (item.status !== 'succeeded') {
    console.error(item.id, item.status, item.error);
  } else if (item.type === 'text') {
    console.log(item.id, item.text, item.usage);
  }
}
```

Each item reports its own outcome:

| Item status              | Meaning                                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `succeeded`              | The request completed. `text`, `content`, `finishReason`, and `usage` are available. `content` includes any tool calls.       |
| `failed`                 | The provider rejected or errored on this request. `error` has the details.                                                    |
| `cancelled` or `expired` | The provider didn't process this request before the batch ended.                                                              |

You aren't billed for `failed`, `cancelled`, or `expired` requests.

## Cancelling a batch

Use `experimental_cancelBatch` to stop a batch that's still `pending`:

```typescript filename="batch.ts"
import { experimental_cancelBatch as cancelBatch, gateway } from 'ai';

await cancelBatch({ provider: gateway, batch });
```

Cancellation is a request, not an immediate stop. AI Gateway asks the provider to cancel, and the batch stays `pending` until the provider confirms. It then reports `failed` with a cancellation error. Requests the provider finished before the cancellation still return results and are billed. If the batch already finished, cancelling has no effect and the batch keeps its terminal status.

Listing batches with `experimental_listBatches` isn't supported through AI Gateway yet. Store the batch references that `startBatch` returns.

## Webhooks

To be notified when a batch finishes instead of polling, pass `webhookUrl` when you start it. The URL must use HTTPS and be publicly reachable. The signing secret for the batch's deliveries comes back on the start response, so store it where your receiver can find it:

```typescript filename="batch-webhook.ts"
import {
  experimental_startBatch as startBatch,
  gateway,
  type GatewayProviderMetadata,
} from 'ai';
import { randomUUID } from 'node:crypto';

// Mint the token before the call: the batch ID doesn't exist until it returns.
// Record it first so the receiver recognizes a delivery that beats saveBatch.
const token = randomUUID();
await db.savePendingBatch(token);

const batch = await startBatch({
  provider: gateway,
  requests,
  webhookUrl: `https://example.com/api/batch-webhook?token=${token}`,
});

const gatewayMetadata = batch.providerMetadata?.gateway as
  | GatewayProviderMetadata
  | undefined;
const secret = gatewayMetadata?.asyncJob?.webhookSigningSecret;
if (typeof secret !== 'string') {
  throw new Error('Missing webhook signing secret');
}
await db.saveBatch(token, { batch, secret });
```

A terminal delivery can, rarely, arrive before your code stores the secret. If your receiver finds a pending token without a secret, return a 5xx response so AI Gateway retries the delivery instead of rejecting it.

When the batch reaches a terminal state, AI Gateway posts one of three events: `batch.completed`, `batch.failed`, or `batch.cancelled`. The payload carries terminal facts only, never results:

```json
{
  "type": "batch.completed",
  "createdAt": "2026-10-06T18:00:00.000Z",
  "data": {
    "jobId": "job_01J...",
    "status": "completed",
    "modelId": "anthropic/claude-haiku-4.5",
    "createdAt": 1791320400000,
    "completedAt": 1791324000000
  }
}
```

On `batch.failed`, `data.error.message` describes the failure. Your receiver verifies the delivery, then fetches the results with `getBatchResults` and the stored batch reference.

Deliveries are signed the same way as video generation webhooks. Verify the `x-ai-gateway-signature` header against the raw request body before you trust a delivery, as shown in [verifying the delivery](/docs/ai-gateway/modalities/video-generation#verifying-the-delivery). AI Gateway expects a 2xx response within 10 seconds and retries failed deliveries, so make your receiver idempotent. The `x-ai-gateway-idempotency-key` header is the same across retries of one delivery.

## Retrying safely

Starting a batch is not idempotent by default: calling `startBatch` twice submits two batches. To make retries safe, pass an idempotency key. AI Gateway returns the existing batch instead of creating a duplicate when it sees the same key with the same payload, and rejects a reused key whose payload differs:

```typescript filename="batch.ts"
import { experimental_startBatch as startBatch, gateway } from 'ai';

const batch = await startBatch({
  provider: gateway,
  requests,
  providerOptions: {
    gateway: {
      idempotencyKey: 'nightly-eval-2026-08-20',
    },
  },
});
```

## Limits

| Limit                | Value                                                    |
| -------------------- | -------------------------------------------------------- |
| Requests per batch   | 1,000                                                    |
| Models per batch     | 1                                                        |
| Start request size   | 4.5 MB total body size                                   |
| Completion window    | 24 hours. Unprocessed requests expire and aren't billed. |
| Results availability | At least 29 days after the batch completes               |

## Pricing

AI Gateway bills batch requests at a discount on the model's standard token prices: 50% for Anthropic, Google, and OpenAI models, and 80% for batch-capable SpaceXAI models. Usage is recorded once, when the batch reaches a terminal state, and covers only the requests that succeeded.

Other price adjustments apply before the batch discount: prompt caching discounts stack with batch pricing where the provider supports caching in batches, and [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference) price adjustments apply to regional batches. For some Gemini models, Google bills cached input at the standard cache rate in batches, and AI Gateway does the same.

Batch usage appears in your [observability views](/docs/ai-gateway/observability-and-spend) after the batch finishes, attributed to the batch rather than to individual synchronous requests.

## BYOK

Batches work with [your own provider keys](/docs/ai-gateway/authentication-and-byok/byok) configured at the team level. The batch then runs in your provider account: the provider bills you directly at its batch rates, and batch artifacts stay in your account. Provider-hosted resource references, such as file IDs and stored responses, are allowed since they resolve against your own account.

Per-request keys passed in `providerOptions.gateway.byok` aren't supported for batches, because AI Gateway can't retain them for the lifetime of the job.

## Zero data retention

Batch processing doesn't support [zero data retention](/docs/ai-gateway/security-and-compliance/zdr). Providers store batch inputs and results for the lifetime of the batch, so requests with `zeroDataRetention: true`, and requests from teams with ZDR enforced, are rejected at submission.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
