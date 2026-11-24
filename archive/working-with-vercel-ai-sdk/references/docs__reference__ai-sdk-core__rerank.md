---
title: rerank
description: API Reference for rerank.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/rerank"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/rerank.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "362d10369cf90084997e4a2ba997aa2895493b6f0f1103369ece47c2e802ca49"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Rerank a set of documents based on their relevance to a query using a reranking model.

This is ideal for improving search relevance by reordering documents, emails, or other content based on semantic understanding of the query and documents.

```ts
import { cohere } from '@ai-sdk/cohere';
import { rerank } from 'ai';

const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: ['sunny day at the beach', 'rainy afternoon in the city'],
  query: 'talk about rain',
});
```

## Import

```
import { rerank } from "ai"
```

## API Signature

### Parameters

- `model` (`RerankingModel`): The reranking model to use. Example: cohere.reranking('rerank-v4.0-pro')
- `documents` (`Array<VALUE>`): The documents to rerank. Can be an array of strings or JSON objects.
- `query` (`string`): The search query to rank documents against.
- `topN?` (`number`): Maximum number of top documents to return. If not specified, all documents are returned.
- `maxRetries?` (`number`): Maximum number of retries. Set to 0 to disable retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal that can be used to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.
- `providerOptions?` (`ProviderOptions`): Provider-specific options for the reranking request.
- `runtimeContext?` (`RUNTIME_CONTEXT`): User-defined runtime context passed to lifecycle callbacks. Defaults to an empty object. Telemetry integrations only receive top-level properties explicitly included with telemetry.includeRuntimeContext.
- `telemetry?` (`TelemetryOptions<RUNTIME_CONTEXT>`): Telemetry configuration.
  - `TelemetryOptions`
    - `isEnabled?` (`boolean`): Enable or disable telemetry. Enabled by default. Set to \`false\` to opt out.
    - `recordInputs?` (`boolean`): Enable or disable input recording. Enabled by default.
    - `recordOutputs?` (`boolean`): Enable or disable output recording. Enabled by default.
    - `functionId?` (`string`): Identifier for this function. Used to group telemetry data by function.
    - `includeRuntimeContext?` (`{ [KEY in keyof RUNTIME_CONTEXT]?: boolean }`): Top-level runtime context properties to include in telemetry. Only properties set to true are included. All properties are excluded by default. User callbacks still receive the full context.
    - `integrations?` (`Telemetry | Telemetry[]`): Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call.
- `onStart?` (`(event: RerankStartEvent<RUNTIME_CONTEXT>) => void | Promise<void>`): Called when the rerank operation begins, before the reranking model is called. The event includes the full, unfiltered runtimeContext.
- `onEnd?` (`(event: RerankEndEvent<RUNTIME_CONTEXT>) => void | Promise<void>`): Called when the rerank operation completes, after the reranking model returns. The event includes the full, unfiltered runtimeContext.

### Returns

- `originalDocuments` (`Array<VALUE>`): The original documents array in their original order.
- `rerankedDocuments` (`Array<VALUE>`): The documents sorted by relevance score (descending).
- `ranking` (`Array<RankingItem<VALUE>>`): Array of ranking items with scores and indices.
  - `RankingItem<VALUE>`
    - `originalIndex` (`number`): The index of the document in the original documents array.
    - `score` (`number`): The relevance score for the document (typically 0-1, where higher is more relevant).
    - `document` (`VALUE`): The document itself.
- `response` (`Response`): Response data.
  - `Response`
    - `id?` (`string`): The response ID from the provider.
    - `timestamp` (`Date`): The timestamp of the response.
    - `modelId` (`string`): The model ID used for reranking.
    - `headers?` (`Record<string, string>`): Response headers.
    - `body?` (`unknown`): The raw response body.
- `providerMetadata?` (`ProviderMetadata | undefined`): Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.

## Examples

### String Documents

```ts
import { cohere } from '@ai-sdk/cohere';
import { rerank } from 'ai';

const { ranking, rerankedDocuments } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: [
    'sunny day at the beach',
    'rainy afternoon in the city',
    'snowy night in the mountains',
  ],
  query: 'talk about rain',
  topN: 2,
});

console.log(rerankedDocuments);
// ['rainy afternoon in the city', 'sunny day at the beach']

console.log(ranking);
// [
//   { originalIndex: 1, score: 0.9, document: 'rainy afternoon...' },
//   { originalIndex: 0, score: 0.3, document: 'sunny day...' }
// ]
```

### Object Documents

```ts
import { cohere } from '@ai-sdk/cohere';
import { rerank } from 'ai';

const documents = [
  {
    from: 'Paul Doe',
    subject: 'Follow-up',
    text: 'We are happy to give you a discount of 20%.',
  },
  {
    from: 'John McGill',
    subject: 'Missing Info',
    text: 'Here is the pricing from Oracle: $5000/month',
  },
];

const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents,
  query: 'Which pricing did we get from Oracle?',
  topN: 1,
});

console.log(ranking[0].document);
// { from: 'John McGill', subject: 'Missing Info', ... }
```

### With Provider Options

```ts
import { cohere } from '@ai-sdk/cohere';
import { rerank } from 'ai';

const { ranking } = await rerank({
  model: cohere.reranking('rerank-v4.0-pro'),
  documents: ['sunny day at the beach', 'rainy afternoon in the city'],
  query: 'talk about rain',
  providerOptions: {
    cohere: {
      maxTokensPerDoc: 1000,
    },
  },
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)