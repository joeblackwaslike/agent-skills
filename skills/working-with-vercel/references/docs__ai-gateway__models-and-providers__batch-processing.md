---
title: Batch Processing
product: vercel
url: /docs/ai-gateway/models-and-providers/batch-processing
canonical_url: "https://vercel.com/docs/ai-gateway/models-and-providers/batch-processing"
last_updated: 2026-08-22
type: reference
prerequisites:
  - /docs/ai-gateway/models-and-providers
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/security-and-compliance/regional-inference
  - /docs/ai-gateway/observability-and-spend
  - /docs/ai-gateway/authentication-and-byok/byok
  - /docs/ai-gateway/security-and-compliance/zdr
summary: Process large volumes of text generation requests asynchronously through AI Gateway at 50% of standard token prices, with results available within 24...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/batch-processing.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "cf1c58f7c604facc92f4f369e5aab7fd65545a063d22b72f0b4ea8f32bf1d91c"
---

# Batch Processing

Batch processing lets you submit many text generation requests as a single asynchronous job. Instead of waiting for each response, you start a batch, poll its status, and stream the results when the job finishes. AI Gateway bills batches at 50% of the model's standard token prices, and batches reach a terminal state within 24 hours.

Use batch processing when you don't need immediate responses:

- Large-scale evaluations and benchmarking
- Content classification and moderation
- Bulk summarization, translation, or data extraction
- Synthetic data generation

> **💡 Note:** Batch processing is in beta. The AI SDK batch functions carry the
> `experimental_` prefix and may change in minor releases.

## Requirements

Batch processing uses the AI SDK's experimental batch functions with the AI Gateway provider:

- `ai` version 7.0.71 or later, which includes the batch functions and an AI Gateway provider that supports them
- If you install the provider separately, `@ai-sdk/gateway` version 4.0.57 or later

Requests authenticate the same way as other AI Gateway requests. See [Authentication](/docs/ai-gateway/authentication-and-byok) for setup.

## Supported models

Batch processing is available for OpenAI and Anthropic language models. All active Anthropic models support batching. OpenAI supports batching on most, but not all, of its models. AI Gateway validates batch support for your requested model and any fallback candidates when you start the batch, and returns an error if none of them support it.

### Regional inference

Batches support [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference) for Anthropic models: set `inferenceRegion` and the provider processes and stores the batch in that region, with the regional price adjustment applied. Region-pinned batches aren't supported for OpenAI models yet and fail at submission.

## How it works

1. You submit up to 1,000 requests in one call. AI Gateway validates the batch, submits it to the provider's native batch API, and returns a batch ID once the provider accepts it.
2. AI Gateway tracks the batch durably from that point. No client connection needs to stay open while the batch processes.
3. The provider processes requests within its batch window, which is at most 24 hours. Most batches finish sooner.
4. You poll the batch status until it's no longer `pending`, then stream the per-request results.

The batch ID is an AI Gateway identifier, not the provider's batch ID. Only your team can read the batch's status and results.

## Starting a batch

Use `experimental_startTextBatch` with a model string and a list of requests. Each request needs a unique `id`, which you use to match results back to requests:

```typescript filename="batch.ts"
import { experimental_startTextBatch as startTextBatch } from 'ai';

const batch = await startTextBatch({
  model: 'anthropic/claude-haiku-4.5',
  requests: [
    {
      id: 'review-1042',
      system: 'Classify the sentiment as positive, negative, or neutral.',
      prompt: 'The checkout flow was fast and painless.',
    },
    {
      id: 'review-1043',
      system: 'Classify the sentiment as positive, negative, or neutral.',
      prompt: 'The app crashed twice before I could pay.',
    },
  ],
});

console.log(batch.id, batch.status);
```

The start call stays open until the provider accepts the batch, so large payloads take longer to submit. Once the call returns, `batch.status` starts as `pending`.

The returned `batch` object is a serializable reference containing the batch `id`, `provider`, and `modelId`. Batches can run for hours, so store it, for example in a database or queue message. Any process can then poll the batch later by passing the stored reference to the status and results functions.

Every request in a batch uses the same model. To batch across models, start one batch per model.

### Request options

Each request accepts the standard text generation options: `prompt` or `messages`, `system`, `maxOutputTokens`, `temperature`, `topP`, `topK`, `seed`, `stopSequences`, `frequencyPenalty`, `presencePenalty`, reasoning settings, and per-request `providerOptions`. Prompts can include images for vision models, either inline or by URL.

The following are not supported in batch requests:

- Tool calls
- Structured output
- Streaming
- References to provider-hosted resources, such as file IDs, stored responses, or containers. Batch inputs must be self-contained. This restriction doesn't apply when the batch runs on [your own provider keys](#byok).

## Checking batch status

Use `experimental_getBatchStatus` to poll the batch:

```typescript filename="batch.ts"
import { experimental_getBatchStatus as getBatchStatus } from 'ai';
import { setTimeout } from 'node:timers/promises';

const model = 'anthropic/claude-haiku-4.5';

let status;
do {
  await setTimeout(30_000);
  ({ status } = await getBatchStatus({ model, batch }));
  console.log('Batch status:', status);
} while (status === 'pending');
```

The status is one of:

| Status      | Meaning                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------- |
| `pending`   | The batch is validating or processing at the provider.                                      |
| `completed` | Processing finished. Results are ready to retrieve. Individual requests can still have errors. |
| `failed`    | The batch reached a terminal failure, expired at the provider, or was cancelled. Any requests that completed before the failure still return results, and you're only billed for those. |

The status response can also include `requestCounts` with `total`, `pending`, `completed`, and `failed` request tallies, and a `rawStatus` field with the provider's own status string.

All batch functions accept `abortSignal`, `headers`, and `timeout` options. `getBatchStatus` and `getBatchResults` also accept `maxRetries`.

## Retrieving results

Once the batch is no longer `pending`, stream the results with `experimental_getBatchResults`. Results arrive as an async iterable and may not match the order you submitted, so always match by `id`:

```typescript filename="batch.ts"
import { experimental_getBatchResults as getBatchResults } from 'ai';

for await (const item of getBatchResults({ model, batch })) {
  if (item.status === 'succeeded') {
    console.log(item.id, item.text, item.usage);
  } else {
    console.error(item.id, item.status, item.error);
  }
}
```

Each item reports its own outcome:

| Item status              | Meaning                                                                    |
| ------------------------ | --------------------------------------------------------------------------- |
| `succeeded`              | The request completed. `text`, `finishReason`, and `usage` are available.  |
| `failed`                 | The provider rejected or errored on this request. `error` has the details. |
| `cancelled` or `expired` | The provider didn't process this request before the batch ended.           |

You aren't billed for `failed`, `cancelled`, or `expired` requests.

## Retrying safely

Starting a batch is not idempotent by default: calling `startTextBatch` twice submits two batches. To make retries safe, pass an idempotency key. AI Gateway returns the existing batch instead of creating a duplicate when it sees the same key with the same payload, and rejects a reused key whose payload differs:

```typescript filename="batch.ts"
import { experimental_startTextBatch as startTextBatch } from 'ai';

const batch = await startTextBatch({
  model: 'anthropic/claude-haiku-4.5',
  requests,
  providerOptions: {
    gateway: {
      idempotencyKey: 'nightly-eval-2026-08-20',
    },
  },
});
```

## Limits

| Limit                  | Value                                                        |
| ---------------------- | ------------------------------------------------------------ |
| Requests per batch     | 1,000                                                        |
| Start request size     | 4.5 MB total body size                                       |
| Completion window      | 24 hours. Unprocessed requests expire and aren't billed.     |
| Results availability   | At least 29 days after the batch completes                   |

Cancelling a batch isn't available through the AI SDK yet.

## Pricing

AI Gateway bills batch requests at 50% of the model's standard input and output token prices. Usage is recorded once, when the batch reaches a terminal state, and covers only the requests that succeeded. Other price adjustments apply before the batch discount: prompt caching discounts stack with batch pricing where the provider supports caching in batches, and [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference) price adjustments apply to regional batches.

Batch usage appears in your [observability views](/docs/ai-gateway/observability-and-spend) after the batch finishes, attributed to the batch rather than to individual synchronous requests.

## BYOK

Batches work with [your own provider keys](/docs/ai-gateway/authentication-and-byok/byok) configured at the team level. The batch then runs in your provider account: the provider bills you directly at its batch rates, and batch artifacts stay in your account. Provider-hosted resource references, such as file IDs and stored responses, are allowed since they resolve against your own account.

Per-request keys passed in `providerOptions.gateway.byok` aren't supported for batches, because AI Gateway can't retain them for the lifetime of the job.

## Zero data retention

Batch processing doesn't support [zero data retention](/docs/ai-gateway/security-and-compliance/zdr). Providers store batch inputs and results for the lifetime of the batch, so requests with `zeroDataRetention: true`, and requests from teams with ZDR enforced, are rejected at submission.


---

[View full sitemap](/docs/sitemap)
