---
title: embed
description: API Reference for embed.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/embed"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/embed.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "97061cfe435c1696afc2c7209ff8ca822f38168caebef0097f04c7f37137dbb1"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Generate an embedding for a single value using an embedding model.

This is ideal for use cases where you need to embed a single value to e.g. retrieve similar items or to use the embedding in a downstream task.

```ts
import { embed } from 'ai';

const { embedding } = await embed({
  model: 'openai/text-embedding-3-small',
  value: 'sunny day at the beach',
});
```

## Import

```
import { embed } from "ai"
```

## API Signature

### Parameters

- `model` (`EmbeddingModel`): The embedding model to use. Example: openai.embeddingModel('text-embedding-3-small')
- `value` (`VALUE`): The value to embed. The type depends on the model.
- `dimensions?` (`number`): Requested output embedding dimensions. Must be a positive integer. Forwarded to the model; requires support in the provider implementation. Provider mappings are being added separately. Use providerOptions until your provider supports this setting.
- `maxRetries?` (`number`): Maximum number of retries. Set to 0 to disable retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal that can be used to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.
- `providerOptions?` (`ProviderOptions`): Provider-specific options that are passed through to the provider.
- `runtimeContext?` (`RUNTIME_CONTEXT`): User-defined runtime context passed to lifecycle callbacks. Defaults to an empty object. Telemetry integrations only receive top-level properties explicitly included with telemetry.includeRuntimeContext.
- `telemetry?` (`TelemetryOptions<RUNTIME_CONTEXT>`): Telemetry configuration.
  - `TelemetryOptions`
    - `isEnabled?` (`boolean`): Enable or disable telemetry. Enabled by default. Set to \`false\` to opt out.
    - `recordInputs?` (`boolean`): Enable or disable input recording. Enabled by default.
    - `recordOutputs?` (`boolean`): Enable or disable output recording. Enabled by default.
    - `functionId?` (`string`): Identifier for this function. Used to group telemetry data by function.
    - `includeRuntimeContext?` (`{ [KEY in keyof RUNTIME_CONTEXT]?: boolean }`): Top-level runtime context properties to include in telemetry. Only properties set to true are included. All properties are excluded by default. User callbacks still receive the full context.
    - `integrations?` (`Telemetry | Telemetry[]`): Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call.
- `onStart?` (`(event: EmbedStartEvent<RUNTIME_CONTEXT>) => PromiseLike<void> | void`): Callback that is called when the embed operation begins, before the embedding model is called. Errors thrown in this callback are silently caught and do not break the embedding flow.
  - `EmbedStartEvent<RUNTIME_CONTEXT>`
    - `runtimeContext` (`RUNTIME_CONTEXT`): The full, unfiltered runtime context supplied to the operation.
    - `callId` (`string`): Unique identifier for this embed call.
    - `operationId` (`string`): Identifies the operation type ('ai.embed').
    - `model` (`{ provider: string; modelId: string }`): The embedding model being used.
    - `value` (`string | Array<string>`): The value being embedded.
    - `dimensions?` (`number`): Requested output embedding dimensions, when specified.
    - `maxRetries` (`number`): Maximum number of retries for failed requests.
    - `abortSignal` (`AbortSignal | undefined`): Abort signal for cancelling the operation.
    - `headers` (`Record<string, string | undefined> | undefined`): Additional HTTP headers sent with the request.
    - `providerOptions` (`ProviderOptions | undefined`): Additional provider-specific options.
- `onEnd?` (`(event: EmbedEndEvent<RUNTIME_CONTEXT>) => PromiseLike<void> | void`): Callback that is called when the embed operation completes, after the embedding model returns. Errors thrown in this callback are silently caught and do not break the embedding flow.
  - `EmbedEndEvent<RUNTIME_CONTEXT>`
    - `runtimeContext` (`RUNTIME_CONTEXT`): The full, unfiltered runtime context supplied to the operation.
    - `callId` (`string`): Unique identifier for this embed call.
    - `operationId` (`string`): Identifies the operation type ('ai.embed').
    - `model` (`{ provider: string; modelId: string }`): The embedding model that was used.
    - `value` (`string | Array<string>`): The value that was embedded.
    - `embedding` (`Embedding | Array<Embedding>`): The resulting embedding vector.
    - `usage` (`EmbeddingModelUsage`): Token usage for the embedding operation.
    - `warnings` (`Array<Warning>`): Warnings from the embedding model.
    - `providerMetadata` (`ProviderMetadata | undefined`): Optional provider-specific metadata.
    - `response` (`{ headers?: Record<string, string>; body?: unknown } | undefined`): Optional response data including headers and body.

### Returns

- `value` (`VALUE`): The value that was embedded.
- `embedding` (`number[]`): The embedding of the value.
- `usage` (`EmbeddingModelUsage`): The token usage for generating the embeddings.
  - `EmbeddingModelUsage`
    - `tokens` (`number`): The number of tokens used in the embedding.
- `warnings` (`Warning[]`): Warnings from the model provider (e.g. unsupported settings).
- `response?` (`Response`): Optional response data.
  - `Response`
    - `headers?` (`Record<string, string>`): Response headers.
    - `body?` (`unknown`): The response body.
- `providerMetadata?` (`ProviderMetadata | undefined`): Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)