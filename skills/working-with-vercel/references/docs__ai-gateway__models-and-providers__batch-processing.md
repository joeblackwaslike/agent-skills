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
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/sdks-and-apis/rest-api
  - /docs/ai-gateway/security-and-compliance/regional-inference
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
summary: Process large volumes of text generation requests asynchronously through AI Gateway at discounted batch prices, using the AI SDK, the OpenAI Batch...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/models-and-providers/batch-processing.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "3c0cc543d3c008bdc18e5d62113607265ca875900b825c3498cb8bcd8d1627a9"
---

# AI Gateway Batch Processing

Batch processing lets you submit many text generation requests as a single asynchronous job. Instead of waiting for each response, you start a batch, poll its status or receive a webhook, and read the results when the job finishes. AI Gateway bills batches at a discount on the model's standard token prices (50% for most models), and batches reach a terminal state within 24 hours.

You can create batches in four API formats, so you can keep the client library you already use:

- **AI SDK**: the `experimental_startBatch` functions in the `ai` package
- **OpenAI Chat Completions**: the OpenAI Batch API with Chat Completions request bodies
- **OpenAI Responses**: the OpenAI Batch API with Responses request bodies
- **Anthropic Messages**: the Anthropic Message Batches API

All formats share the same pricing and 24-hour completion window, and you can cancel a batch in any format. Batches of Anthropic models can also run in a specific region with [regional inference](#regional-inference). See [API formats](#api-formats) for how the formats differ.

Use batch processing when you don't need immediate responses:

- Large-scale evaluations and benchmarking
- Content classification and moderation
- Bulk summarization, translation, or data extraction
- Synthetic data generation

> **💡 Note:** Batch processing is in beta. The AI SDK batch functions carry the
> `experimental_` prefix and may change in minor releases. The OpenAI and
> Anthropic batch formats are in early access, and your team must have access
> enabled before you can create batches with them.

## API formats

Chat Completions and Responses batches both use the OpenAI Batch API. You upload a JSONL file of requests, then create a batch from the uploaded file. The AI SDK and Anthropic Messages formats take the requests directly in the call that starts the batch.

| Format             | Entry point                                                                       | Client library      | Models                                        |
| ------------------ | --------------------------------------------------------------------------------- | ------------------- | --------------------------------------------- |
| AI SDK             | `experimental_startBatch` and the related status, results, and cancel functions   | `ai`                | All [batch-capable models](#supported-models) |
| Chat Completions   | `POST /v1/files`, then `POST /v1/batches` with `endpoint: "/v1/chat/completions"` | `openai`            | Batch-capable OpenAI models                   |
| Responses          | `POST /v1/files`, then `POST /v1/batches` with `endpoint: "/v1/responses"`        | `openai`            | Batch-capable OpenAI models                   |
| Anthropic Messages | `POST /v1/messages/batches`                                                       | `@anthropic-ai/sdk` | All batch-capable models                      |

The formats also behave differently in a few places:

| Behavior          | AI SDK                                    | Chat Completions and Responses                  | Anthropic Messages                      |
| ----------------- | ----------------------------------------- | ----------------------------------------------- | --------------------------------------- |
| Request input     | Array of requests in the start call       | JSONL file uploaded before you create the batch | Array of requests in the create call    |
| Idempotency key   | Optional                                  | Required on the file upload and batch creation  | Required                                |
| Completion notice | Polling or [webhooks](#webhooks)          | Polling                                         | Polling                                 |
| Results           | Async iterable of result items            | JSONL output and error files                    | JSONL results stream                    |
| Listing batches   | Store the references `startBatch` returns | `GET /v1/batches`                               | `GET /v1/messages/batches`              |
| Request content   | Text and images                           | Text only                                       | See [request options](#request-options) |

## Requirements

Requests authenticate the same way as other AI Gateway requests, with an API key or an OIDC token. See [Authentication](/docs/ai-gateway/authentication-and-byok) for setup.

| Format                         | Client library                                                                                                   | Base URL                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| AI SDK                         | `ai` version 7.0.108 or later. If you install the provider separately, `@ai-sdk/gateway` version 4.0.88 or later | Set by the AI Gateway provider                |
| Chat Completions and Responses | The OpenAI SDK, such as `openai` for TypeScript or Python                                                        | `https://ai-gateway.vercel.sh/v1`             |
| Anthropic Messages             | The Anthropic SDK, such as `@anthropic-ai/sdk` for TypeScript or `anthropic` for Python                          | `https://ai-gateway.vercel.sh`, without `/v1` |

Earlier AI SDK releases used a different batch API (`experimental_startTextBatch`). Upgrade to use the functions on this page.

## Supported models

Batch processing is available for language models from Anthropic, Google, OpenAI, and SpaceXAI. Each batch-capable model has a `<model>-batch` entry in [`GET /v1/models`](/docs/ai-gateway/sdks-and-apis/rest-api#list-models), such as `anthropic/claude-haiku-4.5-batch`, priced at the model's batch rates. The IDs that end in `-batch` are the complete list of batch-capable models, and the endpoint requires no authentication.

You can pass a `-batch` ID anywhere a batch takes a model, in any format, and AI Gateway treats it as the base model. Synchronous requests don't accept `-batch` IDs.

The Chat Completions and Responses formats accept OpenAI models only. Use the AI SDK or Anthropic Messages format to batch Anthropic, Google, or SpaceXAI models. In Chat Completions and Responses request bodies, you can write the model as `openai/gpt-5.4-mini` or as the bare OpenAI name `gpt-5.4-mini`.

AI Gateway validates batch support for your requested model and any fallback candidates when you start the batch, and returns an error if none of them support it. Batches run on the model provider's own batch API, so AI Gateway doesn't route them through other providers that serve the same model, such as Amazon Bedrock or Google Vertex AI.

### Regional inference

Batches support [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference) for Anthropic models: set `inferenceRegion` and the provider processes and stores the batch in that region, with the regional price adjustment applied. Setting `inferenceRegion` on a batch for another provider's model fails at submission.

## How it works

1. You submit up to 1,000 requests, either in one call or, for Chat Completions and Responses, in one uploaded JSONL file. AI Gateway validates the batch, submits it to the provider's native batch API, and returns a batch ID once the provider accepts it.
2. AI Gateway tracks the batch durably from that point. No client connection needs to stay open while the batch processes.
3. The provider processes requests within its batch window, which is at most 24 hours. Most batches finish sooner.
4. You poll the batch status until it finishes, or receive a [webhook](#webhooks) with the AI SDK, then read the per-request results.

In every format, batch and file IDs are AI Gateway identifiers, not the provider's IDs. Only your team can read the batch's status and results.

## Starting a batch

Every request in a batch must use the same model. To batch across models, start one batch per model. Each request also needs a unique ID, which you use to match results back to requests.

#### AI SDK

Use `experimental_startBatch` with a list of requests. Each request needs a unique `id`, a `type` of `'text'`, and the `model` to run:

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

#### Chat Completions

Write one Chat Completions request per line of a JSONL file. Each line has a unique `custom_id`, `method: "POST"`, `url: "/v1/chat/completions"`, and the request `body`. Upload the file with `purpose: "batch"`, then create a batch from the returned file ID:

```typescript filename="batch.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const instructions = 'Classify the sentiment as positive, negative, or neutral.';
const reviews = [
  { id: 'review-1042', text: 'The checkout flow was fast and painless.' },
  { id: 'review-1043', text: 'The app crashed twice before I could pay.' },
];

const jsonl = reviews
  .map((review) =>
    JSON.stringify({
      custom_id: review.id,
      method: 'POST',
      url: '/v1/chat/completions',
      body: {
        model: 'openai/gpt-5.4-mini',
        messages: [
          { role: 'system', content: instructions },
          { role: 'user', content: review.text },
        ],
      },
    }),
  )
  .join('\n');

// Store this key with your job and reuse it if you retry these calls.
const key = 'sentiment-eval-2026-10-20';

const file = await client.files.create(
  {
    file: new File([jsonl], 'batch.jsonl', { type: 'application/jsonl' }),
    purpose: 'batch',
  },
  { headers: { 'Idempotency-Key': `${key}-file` } },
);

const batch = await client.batches.create(
  {
    input_file_id: file.id,
    endpoint: '/v1/chat/completions',
    completion_window: '24h',
  },
  { headers: { 'Idempotency-Key': `${key}-batch` } },
);

console.log(batch.id, batch.status);
```

Both calls require an `Idempotency-Key` header. See [Retrying safely](#retrying-safely) for how AI Gateway handles retries.

AI Gateway validates every line when you upload the file. All lines must use the same model and the same `url`, and that `url` must match the `endpoint` you pass when you create the batch. `completion_window` must be `24h`. You can also pass `metadata` with up to 16 string key-value pairs.

Each uploaded file can start one batch. Create the batch within 23 hours of uploading its file. After that, upload the file again with a new idempotency key.

#### Responses

Write one Responses request per line of a JSONL file. Each line has a unique `custom_id`, `method: "POST"`, `url: "/v1/responses"`, and the request `body`. Upload the file with `purpose: "batch"`, then create a batch from the returned file ID:

```typescript filename="batch.ts"
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const instructions = 'Classify the sentiment as positive, negative, or neutral.';
const reviews = [
  { id: 'review-1042', text: 'The checkout flow was fast and painless.' },
  { id: 'review-1043', text: 'The app crashed twice before I could pay.' },
];

const jsonl = reviews
  .map((review) =>
    JSON.stringify({
      custom_id: review.id,
      method: 'POST',
      url: '/v1/responses',
      body: {
        model: 'openai/gpt-5.4-mini',
        instructions,
        input: review.text,
      },
    }),
  )
  .join('\n');

// Store this key with your job and reuse it if you retry these calls.
const key = 'sentiment-eval-2026-10-20';

const file = await client.files.create(
  {
    file: new File([jsonl], 'batch.jsonl', { type: 'application/jsonl' }),
    purpose: 'batch',
  },
  { headers: { 'Idempotency-Key': `${key}-file` } },
);

const batch = await client.batches.create(
  {
    input_file_id: file.id,
    endpoint: '/v1/responses',
    completion_window: '24h',
  },
  { headers: { 'Idempotency-Key': `${key}-batch` } },
);

console.log(batch.id, batch.status);
```

Both calls require an `Idempotency-Key` header. See [Retrying safely](#retrying-safely) for how AI Gateway handles retries.

AI Gateway validates every line when you upload the file. All lines must use the same model and the same `url`, and that `url` must match the `endpoint` you pass when you create the batch. `completion_window` must be `24h`. You can also pass `metadata` with up to 16 string key-value pairs.

Each uploaded file can start one batch. Create the batch within 23 hours of uploading its file. After that, upload the file again with a new idempotency key.

#### Anthropic Messages

Use `client.messages.batches.create` with a list of requests. Each request has a unique `custom_id` and the Messages API `params` to run. The call requires an `Idempotency-Key` header:

```typescript filename="batch.ts"
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const system = 'Classify the sentiment as positive, negative, or neutral.';

const batch = await client.messages.batches.create(
  {
    requests: [
      {
        custom_id: 'review-1042',
        params: {
          model: 'anthropic/claude-haiku-4.5',
          max_tokens: 64,
          system,
          messages: [
            { role: 'user', content: 'The checkout flow was fast and painless.' },
          ],
        },
      },
      {
        custom_id: 'review-1043',
        params: {
          model: 'anthropic/claude-haiku-4.5',
          max_tokens: 64,
          system,
          messages: [
            { role: 'user', content: 'The app crashed twice before I could pay.' },
          ],
        },
      },
    ],
  },
  // Store this key with your job and reuse it if you retry this call.
  { headers: { 'Idempotency-Key': 'sentiment-eval-2026-10-20' } },
);

console.log(batch.id, batch.processing_status);
```

For JavaScript and Python versions of this workflow, see [Message batches](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api#message-batches).

### Request options

#### AI SDK

Each request accepts the standard text generation options: `prompt` or `messages`, `instructions`, `maxOutputTokens`, `temperature`, `topP`, `topK`, `seed`, `stopSequences`, `frequencyPenalty`, `presencePenalty`, `reasoning`, structured output, and per-request `providerOptions`. Prompts can include images for vision models, either inline or by URL.

Requests can also define tools with `tools` and `toolChoice`. Batch tools are definition-only: the model can return tool calls, but the AI SDK never runs their `execute` functions or sends tool results back. Pass the same `tools` to `getBatchResults` to validate and normalize the returned tool calls.

The following are not supported in batch requests:

- Image generation requests (`type: 'image'`)
- Provider-executed tools, such as web search or MCP servers
- Streaming
- References to provider-hosted resources, such as file IDs, stored responses, or containers. Batch inputs must be self-contained. This restriction doesn't apply when the batch runs on [your own provider keys](#byok).

#### Chat Completions

Each line's `body` accepts these Chat Completions fields:

- `model` (required): an OpenAI model, such as `openai/gpt-5.4-mini` or `gpt-5.4-mini`
- `messages` (required): `system`, `developer`, `user`, `assistant`, and `tool` messages with text content. Assistant messages can include function `tool_calls`.
- `max_completion_tokens` or `max_tokens`
- `temperature`, `top_p`, `seed`, `frequency_penalty`, `presence_penalty`, and `logit_bias`
- `stop`, with up to four sequences
- `logprobs` and `top_logprobs`
- `reasoning_effort`: `none`, `minimal`, `low`, `medium`, `high`, or `xhigh`
- `response_format`: `text`, `json_object`, or `json_schema`
- `tools`, `tool_choice`, and `parallel_tool_calls`, for function tools
- `n`, which must be `1`
- `safety_identifier` and `user`, up to 64 characters each
- `stream` and `store`, which you can omit or set to `false`

The upload returns a 400 error if any line includes another field, such as image or audio content, or a hosted tool like web search. Each `custom_id` can be 1 to 64 characters.

#### Responses

Each line's `body` accepts these Responses fields:

- `model` (required): an OpenAI model, such as `openai/gpt-5.4-mini` or `gpt-5.4-mini`
- `input` (required): a string, or a list of `system`, `developer`, `user`, and `assistant` messages with text content. The list can also include `function_call` and `function_call_output` items.
- `instructions`
- `max_output_tokens`
- `temperature` and `top_p`
- `reasoning`, with `effort` and `summary`
- `text`, with `format` (`text`, `json_object`, or `json_schema`) and `verbosity`
- `tools`, `tool_choice`, and `parallel_tool_calls`, for function tools
- `truncation`: `auto` or `disabled`
- `safety_identifier` and `user`, up to 64 characters each
- `stream` and `store`, which you can omit or set to `false`

The upload returns a 400 error if any line includes another field, such as image or file inputs, a hosted tool like web search, or `previous_response_id`. Batch inputs must be self-contained, so they can't reference stored responses or conversations. Each `custom_id` can be 1 to 64 characters.

#### Anthropic Messages

Each request's `params` accepts the same fields as [`POST /v1/messages`](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages), with these exceptions:

- `stream` isn't supported.
- Provider-executed tools, such as web search, and MCP servers aren't supported. Tools you define yourself work, and the model returns their tool calls in the results.
- Server-side model fallbacks aren't supported.
- Citations on user text aren't supported.
- Inside `tool_result` blocks, citations, search results, plain-text documents, and `cache_control` aren't supported. Set `cache_control` on the `tool_result` block itself instead.

Each `custom_id` can be 1 to 64 letters, numbers, underscores, or hyphens (`[A-Za-z0-9_-]`).

## Checking batch status

Chat Completions and Responses batches share the OpenAI Batch API, so you check their status the same way.

#### AI SDK

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

#### Chat Completions and Responses

Use `client.batches.retrieve` to poll the batch until it reaches a terminal status:

```typescript filename="batch.ts"
import { setTimeout } from 'node:timers/promises';

const terminal = ['completed', 'failed', 'expired', 'cancelled'];

let current = await client.batches.retrieve(batch.id);
while (!terminal.includes(current.status)) {
  await setTimeout(30_000);
  current = await client.batches.retrieve(batch.id);
  console.log('Batch status:', current.status, current.request_counts);
}
```

The status is one of:

| Status        | Meaning                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------- |
| `validating`  | The provider is validating the input file.                                                         |
| `in_progress` | The provider is processing requests.                                                               |
| `finalizing`  | Processing finished, and the provider is preparing the output files.                               |
| `completed`   | Results are ready to download. Individual requests can still have errors.                          |
| `failed`      | The batch failed. `errors` describes the failure.                                                  |
| `expired`     | The batch didn't finish within 24 hours. Requests that completed before then still return results. |
| `cancelling`  | You requested cancellation, and AI Gateway is waiting for the provider to confirm it.              |
| `cancelled`   | The batch was cancelled. Requests that completed before then still return results.                 |

The batch also reports `request_counts` with `total`, `completed`, and `failed` request tallies.

#### Anthropic Messages

Use `client.messages.batches.retrieve` to poll the batch until `processing_status` is `ended`:

```typescript filename="batch.ts"
import { setTimeout } from 'node:timers/promises';

let current = await client.messages.batches.retrieve(batch.id);
while (current.processing_status !== 'ended') {
  await setTimeout(30_000);
  current = await client.messages.batches.retrieve(batch.id);
  console.log('Batch status:', current.processing_status, current.request_counts);
}
```

The processing status is one of:

| Status        | Meaning                                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| `in_progress` | The batch is validating or processing at the provider.                                                       |
| `canceling`   | You requested cancellation, and AI Gateway is waiting for the provider to confirm it.                        |
| `ended`       | Processing finished. Results are ready when `results_url` is set. Individual requests can still have errors. |

The batch also reports `request_counts` with `processing`, `succeeded`, `errored`, `canceled`, and `expired` request tallies.

## Retrieving results

In every format, results may not match the order you submitted, so always match them to requests by ID.

#### AI SDK

Once the batch is no longer `pending`, stream the results with `experimental_getBatchResults`. Results arrive as an async iterable:

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

#### Chat Completions

Once the batch reaches a terminal status, download its output and error files. The file at `output_file_id` holds the requests that succeeded, and the file at `error_file_id` holds the requests that failed. Each line uses the OpenAI batch output format, with your `custom_id` and the full Chat Completions response in `response.body`:

```typescript filename="batch.ts"
const done = await client.batches.retrieve(batch.id);

for (const fileId of [done.output_file_id, done.error_file_id]) {
  if (!fileId) continue;
  const content = await client.files.content(fileId);
  for (const line of (await content.text()).split('\n').filter(Boolean)) {
    const item = JSON.parse(line);
    if (item.error || item.response.status_code !== 200) {
      console.error(item.custom_id, item.error ?? item.response.body.error);
    } else {
      console.log(item.custom_id, item.response.body.choices[0].message.content);
    }
  }
}
```

You can download output and error files until the `expires_at` time on the file object.

#### Responses

Once the batch reaches a terminal status, download its output and error files. The file at `output_file_id` holds the requests that succeeded, and the file at `error_file_id` holds the requests that failed. Each line uses the OpenAI batch output format, with your `custom_id` and the full Responses object in `response.body`:

```typescript filename="batch.ts"
const done = await client.batches.retrieve(batch.id);

for (const fileId of [done.output_file_id, done.error_file_id]) {
  if (!fileId) continue;
  const content = await client.files.content(fileId);
  for (const line of (await content.text()).split('\n').filter(Boolean)) {
    const item = JSON.parse(line);
    if (item.error || item.response.status_code !== 200) {
      console.error(item.custom_id, item.error ?? item.response.body.error);
      continue;
    }
    let text = '';
    for (const output of item.response.body.output) {
      if (output.type !== 'message') continue;
      for (const part of output.content) {
        if (part.type === 'output_text') text += part.text;
      }
    }
    console.log(item.custom_id, text);
  }
}
```

The raw Responses object doesn't include the SDK's `output_text` helper, so the example collects the text from the `output` items. You can download output and error files until the `expires_at` time on the file object.

#### Anthropic Messages

Once `processing_status` is `ended`, a non-null `results_url` means results are available. Read them with `client.messages.batches.results`, which returns an async iterable:

```typescript filename="batch.ts"
const done = await client.messages.batches.retrieve(batch.id);
if (!done.results_url) {
  throw new Error(`No downloadable results for batch ${batch.id}.`);
}

const results = await client.messages.batches.results(batch.id);
for await (const item of results) {
  if (item.result.type === 'succeeded') {
    console.log(item.custom_id, item.result.message.content);
  } else {
    console.error(item.custom_id, item.result);
  }
}
```

Each item's `result.type` reports its outcome:

| Result type             | Meaning                                                                           |
| ----------------------- | --------------------------------------------------------------------------------- |
| `succeeded`             | The request completed. `result.message` has the Messages API response.            |
| `errored`               | The provider rejected or errored on this request. `result.error` has the details. |
| `canceled` or `expired` | The provider didn't process this request before the batch ended.                  |

You aren't billed for requests that fail, are cancelled, or expire.

## Cancelling a batch

Cancelling works the same way in every format. AI Gateway asks the provider to cancel, and the batch keeps reporting an in-progress status until the provider confirms. Requests the provider finished before the cancellation still return results and are billed. If the batch already finished, cancelling has no effect and the batch keeps its terminal status.

#### AI SDK

Use `experimental_cancelBatch` to stop a batch that's still `pending`:

```typescript filename="batch.ts"
import { experimental_cancelBatch as cancelBatch, gateway } from 'ai';

await cancelBatch({ provider: gateway, batch });
```

The batch stays `pending` until the provider confirms the cancellation. It then reports `failed` with a cancellation error.

#### Chat Completions and Responses

Use `client.batches.cancel`:

```typescript filename="batch.ts"
await client.batches.cancel(batch.id);
```

The batch reports `cancelling` until the provider confirms the cancellation, and then `cancelled`. Requests that finished before the cancellation appear in the output file.

#### Anthropic Messages

Use `client.messages.batches.cancel`:

```typescript filename="batch.ts"
await client.messages.batches.cancel(batch.id);
```

The batch reports `canceling` until the provider confirms the cancellation, and then `ended`. Requests the provider didn't run have a `canceled` result.

You can't delete batches through AI Gateway in any format. Batch results expire on their own, on the schedule under [Batch size and timing](#batch-size-and-timing).

## Listing batches

Each format lists only the batches created in that format.

#### AI SDK

AI Gateway doesn't support `experimental_listBatches`, so store the batch references that `startBatch` returns.

#### Chat Completions and Responses

Use `client.batches.list`. The SDK follows the `after` cursor to fetch later pages:

```typescript filename="batch.ts"
for await (const item of client.batches.list({ limit: 20 })) {
  console.log(item.id, item.status);
}
```

`limit` accepts 1 to 100.

#### Anthropic Messages

Use `client.messages.batches.list`:

```typescript filename="batch.ts"
for await (const item of client.messages.batches.list({ limit: 20 })) {
  console.log(item.id, item.processing_status);
}
```

The default page size is 20, with a maximum of 100. To paginate manually, pass either `after_id` or `before_id`, never both.

## Managing batch files

Chat Completions and Responses batches read their input from a file and write their results to files. AI Gateway supports these OpenAI Files API operations for batch files:

| Operation              | Endpoint                          | OpenAI SDK method       |
| ---------------------- | --------------------------------- | ----------------------- |
| Upload a batch input   | `POST /v1/files`                  | `client.files.create`   |
| List files             | `GET /v1/files`                   | `client.files.list`     |
| Retrieve file metadata | `GET /v1/files/{file_id}`         | `client.files.retrieve` |
| Download file content  | `GET /v1/files/{file_id}/content` | `client.files.content`  |
| Delete a file          | `DELETE /v1/files/{file_id}`      | `client.files.delete`   |

The Files API follows these rules for batch files:

- An upload takes exactly one file and `purpose: "batch"`. Other upload options, such as `expires_after`, aren't supported. Every upload requires an `Idempotency-Key` header.
- Listing returns the newest files first. It accepts `limit` (1 to 100), `after`, `order=desc`, and `purpose` set to `batch` for inputs or `batch_output` for output and error files.
- Downloading an input file returns the validated JSONL that AI Gateway sends to the provider, which can differ from the bytes you uploaded. For example, model IDs can appear in the provider's format.
- You can delete an input file until a batch uses it. After that, AI Gateway keeps the file until the provider's retention deadline.
- You can't delete output and error files before the provider's retention deadline, because AI Gateway needs them for usage accounting. They expire on their own.
- When a batch runs on [your own provider keys](#byok), its files live in your OpenAI account. AI Gateway can't delete them, so delete them in your OpenAI account.

## Webhooks

Webhooks are available for batches you start with the AI SDK. For the Chat Completions, Responses, and Anthropic Messages formats, poll the batch status instead.

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

An idempotency key lets you retry a create call after a timeout or dropped connection without submitting a second batch. Keys can be 1 to 255 characters. Store each key with your job so a retry sends the same one.

#### AI SDK

Starting a batch with the AI SDK is not idempotent by default: calling `startBatch` twice submits two batches. To make retries safe, pass an idempotency key. AI Gateway returns the existing batch instead of creating a duplicate when it sees the same key with the same payload, and rejects a reused key whose payload differs:

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

#### Chat Completions and Responses

`POST /v1/files` and `POST /v1/batches` both require an `Idempotency-Key` header. Use one key for each file upload and one for each batch, and resend the same key when you retry:

- Retrying an upload with the same key returns the original file. If the original upload is still in progress, AI Gateway returns a 409 error with a `Retry-After` header.
- Retrying batch creation with the same key returns the original batch.
- Reusing a key for a different request returns a 409 error.
- Each input file can start only one batch. Creating a second batch from the same file with a new key returns a 409 error.

If batch creation fails with an `x-should-retry: false` response header, the provider may have accepted the batch. Retry with the same key, which never submits a second batch, or check `client.batches.list` before you create a new batch with a new key.

#### Anthropic Messages

`POST /v1/messages/batches` requires an `Idempotency-Key` header. Retrying with the same key and the same payload returns the existing batch. Reusing the key with a different payload returns an error.

If batch creation fails with an `x-should-retry: false` response header, the provider may have accepted the batch. Retry with the same key, which never submits a second batch, or check `client.messages.batches.list` before you submit again with a new key.

## When to use synchronous requests instead

AI Gateway batches run text generation requests in the AI SDK, OpenAI, and Anthropic batch formats. For the needs below, send synchronous requests or use the alternative listed.

| If you need                                                  | Use                                                                                                                                       |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Embeddings, including OpenAI Batch API `/v1/embeddings` jobs | Synchronous requests to the [embeddings API](/docs/ai-gateway/modalities/embeddings)                                                      |
| Image generation                                             | Synchronous [image generation](/docs/ai-gateway/modalities/image-generation)                                                              |
| Image inputs with Chat Completions or Responses              | The AI SDK format, which accepts images for vision models                                                                                 |
| Streamed responses                                           | Synchronous requests. A batch returns results when it finishes, which you can poll for or receive by [webhook](#webhooks) with the AI SDK |
| Web search, other provider-executed tools, or MCP servers    | Synchronous requests. In a batch, define your own tools, and the model returns their tool calls in the results                            |
| [Zero data retention](#zero-data-retention)                  | Synchronous requests with ZDR                                                                                                             |

## Batch size and timing

These sizes and time windows apply to every format. Plan your batches around them:

| Size or window       | Value                                                                                                                                                        | How to plan for it                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| Requests per batch   | Up to 1,000                                                                                                                                                  | Split larger jobs across several batches. A batch with more requests returns a 400 error |
| Models per batch     | 1                                                                                                                                                            | Start one batch per model. A batch that mixes models returns a 400 error                 |
| Request size         | AI SDK and Anthropic Messages: up to 4.5 MB total body size. Chat Completions and Responses: up to 4 MiB per uploaded file, including the multipart envelope | Split larger jobs across several batches                                                 |
| Completion window    | 24 hours                                                                                                                                                     | Resubmit any unprocessed requests in a new batch. They expire without being billed       |
| Results availability | AI SDK and Anthropic Messages: at least 29 days after the batch completes. Chat Completions and Responses: until the output file's `expires_at` time         | Retrieve results within that window                                                      |

Chat Completions and Responses batches also follow these file rules:

| File rule           | Value                                                                                | How to plan for it                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Input file lifetime | Create the batch within 23 hours of uploading its file                               | Upload the file again if it's older. An expired file returns a 400 error                                      |
| Batches per file    | 1                                                                                    | Upload the file again with a new `Idempotency-Key` to start another batch. Reusing a file returns a 409 error |
| File uploads        | Up to 10 per minute per team                                                         | Space out uploads. Faster uploads return a 429 error, so wait a minute and retry                              |
| Batch metadata      | Up to 16 string pairs, with keys up to 64 characters and values up to 512 characters | Keep metadata within this size. Larger metadata returns a 400 error                                           |

## Pricing

AI Gateway bills batch requests in every format at a reduced rate. Anthropic, Google, and OpenAI batches cost 50% of the model's standard token prices. Batch-capable SpaceXAI models cost 80% of standard prices, a 20% discount. Usage is recorded once, when the batch reaches a terminal state, and covers only the requests that succeeded.

Other price adjustments apply before the batch discount: prompt caching discounts stack with batch pricing where the provider supports caching in batches, and [regional inference](/docs/ai-gateway/security-and-compliance/regional-inference) price adjustments apply to regional batches. For some Gemini models, Google bills cached input at the standard cache rate in batches, and AI Gateway does the same.

Batch usage appears in your [observability views](/docs/ai-gateway/observability-and-spend) after the batch finishes, attributed to the batch rather than to individual synchronous requests.

## BYOK

Batches in every format work with [your own provider keys](/docs/ai-gateway/authentication-and-byok/byok) configured at the team level. The batch then runs in your provider account: the provider bills you directly at its batch rates, and batch artifacts stay in your account. For Chat Completions and Responses batches, that includes the input, output, and error files. In AI SDK batches, provider-hosted resource references, such as file IDs and stored responses, are allowed since they resolve against your own account.

Request-scoped keys, such as `providerOptions.gateway.byok` in the AI SDK, don't work with batches, because AI Gateway can't keep them for the lifetime of the job. Configure keys at the team level instead.

## Zero data retention

For [zero data retention](/docs/ai-gateway/security-and-compliance/zdr), send synchronous requests. Providers store batch inputs and results for the lifetime of the batch, so AI Gateway rejects batches at submission when they set `zeroDataRetention: true` or come from a team that enforces ZDR.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
