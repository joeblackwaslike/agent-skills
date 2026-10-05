---
title: embedMany
description: API Reference for embedMany.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/embed-many"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/embed-many.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "62e1de05f3131ba354df034644589cbda60d059a47dd0d600abc0d65ba4470f6"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Embed several values using an embedding model.

`embedMany` automatically splits large requests into smaller chunks when the
model has a limit on either the number of embeddings or the UTF-8 input bytes
that can be processed in a single call. Providers can use a conservative byte
budget to keep requests below aggregate token limits without adding a tokenizer
to the AI SDK core package. An individual value larger than the byte budget is
sent in its own call because splitting it would change the resulting embedding.

```ts
import { embedMany } from 'ai';

const { embeddings } = await embedMany({
  model: 'openai/text-embedding-3-small',
  values: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
});
```

## Import

```
import { embedMany } from "ai"
```

## API Signature

### Parameters

- `model` (`EmbeddingModel`): The embedding model to use. Example: openai.embeddingModel('text-embedding-3-small')
- `values` (`Array<string>`): The values to embed.
- `maxRetries?` (`number`): Maximum number of retries. Set to 0 to disable retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal that can be used to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.
- `providerOptions?` (`ProviderOptions`): Provider-specific options that are passed through to the provider.
- `maxParallelCalls?` (`number`): Maximum number of concurrent requests when a request is split into multiple model calls. Must be greater than 0 when chunking is active and the model supports parallel calls; invalid values throw AI\_InvalidArgumentError. Default: Infinity.
- `runtimeContext?` (`RUNTIME_CONTEXT`): User-defined runtime context passed to lifecycle callbacks. Defaults to an empty object. Telemetry integrations only receive top-level properties explicitly included with telemetry.includeRuntimeContext.
- `telemetry?` (`TelemetryOptions<RUNTIME_CONTEXT>`): Telemetry configuration.
  - `TelemetryOptions`
    - `isEnabled?` (`boolean`): Enable or disable telemetry. Enabled by default. Set to \`false\` to opt out.
    - `recordInputs?` (`boolean`): Enable or disable input recording. Enabled by default.
    - `recordOutputs?` (`boolean`): Enable or disable output recording. Enabled by default.
    - `functionId?` (`string`): Identifier for this function. Used to group telemetry data by function.
    - `includeRuntimeContext?` (`{ [KEY in keyof RUNTIME_CONTEXT]?: boolean }`): Top-level runtime context properties to include in telemetry. Only properties set to true are included. All properties are excluded by default. User callbacks still receive the full context.
    - `integrations?` (`Telemetry | Telemetry[]`): Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call.
- `onStart?` (`(event: EmbedStartEvent<RUNTIME_CONTEXT>) => PromiseLike<void> | void`): Callback that is called when the embedMany operation begins, before the embedding model is called. Errors thrown in this callback are silently caught and do not break the embedding flow.
  - `EmbedStartEvent<RUNTIME_CONTEXT>`
    - `runtimeContext` (`RUNTIME_CONTEXT`): The full, unfiltered runtime context supplied to the operation.
    - `callId` (`string`): Unique identifier for this embedMany call.
    - `operationId` (`string`): Identifies the operation type ('ai.embedMany').
    - `model` (`{ provider: string; modelId: string }`): The embedding model being used.
    - `value` (`string | Array<string>`): The values being embedded (array of strings for embedMany).
    - `maxRetries` (`number`): Maximum number of retries for failed requests.
    - `abortSignal` (`AbortSignal | undefined`): Abort signal for cancelling the operation.
    - `headers` (`Record<string, string | undefined> | undefined`): Additional HTTP headers sent with the request.
    - `providerOptions` (`ProviderOptions | undefined`): Additional provider-specific options.
- `onEnd?` (`(event: EmbedEndEvent<RUNTIME_CONTEXT>) => PromiseLike<void> | void`): Callback that is called when the embedMany operation completes, after all embedding model calls return. Errors thrown in this callback are silently caught and do not break the embedding flow.
  - `EmbedEndEvent<RUNTIME_CONTEXT>`
    - `runtimeContext` (`RUNTIME_CONTEXT`): The full, unfiltered runtime context supplied to the operation.
    - `callId` (`string`): Unique identifier for this embedMany call.
    - `operationId` (`string`): Identifies the operation type ('ai.embedMany').
    - `model` (`{ provider: string; modelId: string }`): The embedding model that was used.
    - `value` (`string | Array<string>`): The values that were embedded (array of strings for embedMany).
    - `embedding` (`Embedding | Array<Embedding>`): The resulting embedding vectors (array of embeddings for embedMany).
    - `usage` (`EmbeddingModelUsage`): Token usage for the embedding operation.
    - `warnings` (`Array<Warning>`): Warnings from the embedding model.
    - `providerMetadata` (`ProviderMetadata | undefined`): Optional provider-specific metadata.
    - `response` (`Array<{ headers?: Record<string, string>; body?: unknown } | undefined>`): Response data from each embedding call. There may be multiple responses if the request was split into chunks.

### Returns

- `values` (`Array<string>`): The values that were embedded.
- `embeddings` (`number[][]`): The embeddings. They are in the same order as the values.
- `usage` (`EmbeddingModelUsage`): The token usage for generating the embeddings.
  - `EmbeddingModelUsage`
    - `tokens` (`number`): The total number of input tokens.
- `warnings` (`Warning[]`): Warnings from the model provider (e.g. unsupported settings).
- `providerMetadata?` (`ProviderMetadata | undefined`): Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.
- `responses?` (`Array<{ headers?: Record<string, string>; body?: unknown } | undefined>`): Optional raw response data from each chunk request. There may be multiple responses if the request was split into multiple chunks.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)