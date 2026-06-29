---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/rerank.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "a955a68e42f07f03a0b9a4585757a094782832252820de3ef26ca34483c8616d"
---

# `rerank()`

Rerank a set of documents based on their relevance to a query using a reranking model.

This is ideal for improving search relevance by reordering documents, emails, or other content based on semantic understanding of the query and documents.

```ts
import { cohere } from '@ai-sdk/cohere';
import { rerank } from 'ai';

const { ranking } = await rerank({
  model: cohere.reranking('rerank-v3.5'),
  documents: ['sunny day at the beach', 'rainy afternoon in the city'],
  query: 'talk about rain',
});
```

## Import

<Snippet text={`import { rerank } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'RerankingModel',
      description:
        "The reranking model to use. Example: cohere.reranking('rerank-v3.5')",
    },
    {
      name: 'documents',
      type: 'Array<VALUE>',
      description:
        'The documents to rerank. Can be an array of strings or JSON objects.',
    },
    {
      name: 'query',
      type: 'string',
      description: 'The search query to rank documents against.',
    },
    {
      name: 'topN',
      type: 'number',
      isOptional: true,
      description:
        'Maximum number of top documents to return. If not specified, all documents are returned.',
    },
    {
      name: 'maxRetries',
      type: 'number',
      isOptional: true,
      description:
        'Maximum number of retries. Set to 0 to disable retries. Default: 2.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description:
        'An optional abort signal that can be used to cancel the call.',
    },
    {
      name: 'headers',
      type: 'Record<string, string>',
      isOptional: true,
      description:
        'Additional HTTP headers to be sent with the request. Only applicable for HTTP-based providers.',
    },
    {
      name: 'providerOptions',
      type: 'ProviderOptions',
      isOptional: true,
      description: 'Provider-specific options for the reranking request.',
    },
    {
      name: 'telemetry',
      type: 'TelemetryOptions',
      isOptional: true,
      description: 'Telemetry configuration.',
      properties: [
        {
          type: 'TelemetryOptions',
          parameters: [
            {
              name: 'isEnabled',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable telemetry. Enabled by default. Set to `false` to opt out.',
            },
            {
              name: 'recordInputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable input recording. Enabled by default.',
            },
            {
              name: 'recordOutputs',
              type: 'boolean',
              isOptional: true,
              description:
                'Enable or disable output recording. Enabled by default.',
            },
            {
              name: 'functionId',
              type: 'string',
              isOptional: true,
              description:
                'Identifier for this function. Used to group telemetry data by function.',
            },
            {
              name: 'integrations',
              isOptional: true,
              type: 'Telemetry | Telemetry[]',
              description:
                'Per-call telemetry integrations that receive lifecycle events. When provided, these replace any globally registered integrations for this call.',
            },
          ],
        },
      ],
    },
    {
      name: 'onStart',
      type: '(event: RerankStartEvent) => void | Promise<void>',
      isOptional: true,
      description:
        'Called when the rerank operation begins, before the reranking model is called.',
    },
    {
      name: 'onEnd',
      type: '(event: RerankEndEvent) => void | Promise<void>',
      isOptional: true,
      description:
        'Called when the rerank operation completes, after the reranking model returns.',
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'originalDocuments',
      type: 'Array<VALUE>',
      description: 'The original documents array in their original order.',
    },
    {
      name: 'rerankedDocuments',
      type: 'Array<VALUE>',
      description: 'The documents sorted by relevance score (descending).',
    },
    {
      name: 'ranking',
      type: 'Array<RankingItem<VALUE>>',
      description: 'Array of ranking items with scores and indices.',
      properties: [
        {
          type: 'RankingItem<VALUE>',
          parameters: [
            {
              name: 'originalIndex',
              type: 'number',
              description:
                'The index of the document in the original documents array.',
            },
            {
              name: 'score',
              type: 'number',
              description:
                'The relevance score for the document (typically 0-1, where higher is more relevant).',
            },
            {
              name: 'document',
              type: 'VALUE',
              description: 'The document itself.',
            },
          ],
        },
      ],
    },
    {
      name: 'response',
      type: 'Response',
      description: 'Response data.',
      properties: [
        {
          type: 'Response',
          parameters: [
            {
              name: 'id',
              isOptional: true,
              type: 'string',
              description: 'The response ID from the provider.',
            },
            {
              name: 'timestamp',
              type: 'Date',
              description: 'The timestamp of the response.',
            },
            {
              name: 'modelId',
              type: 'string',
              description: 'The model ID used for reranking.',
            },
            {
              name: 'headers',
              isOptional: true,
              type: 'Record<string, string>',
              description: 'Response headers.',
            },
            {
              name: 'body',
              type: 'unknown',
              isOptional: true,
              description: 'The raw response body.',
            },
          ],
        },
      ],
    },
    {
      name: 'providerMetadata',
      type: 'ProviderMetadata | undefined',
      isOptional: true,
      description:
        'Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.',
    },
  ]}
/>

## Examples

### String Documents

```ts
import { cohere } from '@ai-sdk/cohere';
import { rerank } from 'ai';

const { ranking, rerankedDocuments } = await rerank({
  model: cohere.reranking('rerank-v3.5'),
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
  model: cohere.reranking('rerank-v3.5'),
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
  model: cohere.reranking('rerank-v3.5'),
  documents: ['sunny day at the beach', 'rainy afternoon in the city'],
  query: 'talk about rain',
  providerOptions: {
    cohere: {
      maxTokensPerDoc: 1000,
    },
  },
});
```


## Navigation

- [generateText](/docs/reference/ai-sdk-core/generate-text)
- [streamText](/docs/reference/ai-sdk-core/stream-text)
- [embed](/docs/reference/ai-sdk-core/embed)
- [embedMany](/docs/reference/ai-sdk-core/embed-many)
- [rerank](/docs/reference/ai-sdk-core/rerank)
- [generateImage](/docs/reference/ai-sdk-core/generate-image)
- [transcribe](/docs/reference/ai-sdk-core/transcribe)
- [generateSpeech](/docs/reference/ai-sdk-core/generate-speech)
- [experimental_generateVideo](/docs/reference/ai-sdk-core/generate-video)
- [uploadFile](/docs/reference/ai-sdk-core/upload-file)
- [uploadSkill](/docs/reference/ai-sdk-core/upload-skill)
- [Agent (Interface)](/docs/reference/ai-sdk-core/agent)
- [ToolLoopAgent](/docs/reference/ai-sdk-core/tool-loop-agent)
- [createAgentUIStream](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [createAgentUIStreamResponse](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [pipeAgentUIStreamToResponse](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)
- [tool](/docs/reference/ai-sdk-core/tool)
- [dynamicTool](/docs/reference/ai-sdk-core/dynamic-tool)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)
- [experimental_getRealtimeToolDefinitions](/docs/reference/ai-sdk-core/get-realtime-tool-definitions)
- [MCP Apps](/docs/reference/ai-sdk-core/mcp-apps)
- [Experimental_StdioMCPTransport](/docs/reference/ai-sdk-core/mcp-stdio-transport)
- [jsonSchema](/docs/reference/ai-sdk-core/json-schema)
- [zodSchema](/docs/reference/ai-sdk-core/zod-schema)
- [valibotSchema](/docs/reference/ai-sdk-core/valibot-schema)
- [Output](/docs/reference/ai-sdk-core/output)
- [filterActiveTools](/docs/reference/ai-sdk-core/filter-active-tools)
- [ModelMessage](/docs/reference/ai-sdk-core/model-message)
- [UIMessage](/docs/reference/ai-sdk-core/ui-message)
- [validateUIMessages](/docs/reference/ai-sdk-core/validate-ui-messages)
- [safeValidateUIMessages](/docs/reference/ai-sdk-core/safe-validate-ui-messages)
- [Experimental_SandboxSession](/docs/reference/ai-sdk-core/sandbox)
- [createProviderRegistry](/docs/reference/ai-sdk-core/provider-registry)
- [customProvider](/docs/reference/ai-sdk-core/custom-provider)
- [cosineSimilarity](/docs/reference/ai-sdk-core/cosine-similarity)
- [wrapLanguageModel](/docs/reference/ai-sdk-core/wrap-language-model)
- [wrapImageModel](/docs/reference/ai-sdk-core/wrap-image-model)
- [LanguageModelV4Middleware](/docs/reference/ai-sdk-core/language-model-v2-middleware)
- [extractReasoningMiddleware](/docs/reference/ai-sdk-core/extract-reasoning-middleware)
- [simulateStreamingMiddleware](/docs/reference/ai-sdk-core/simulate-streaming-middleware)
- [defaultSettingsMiddleware](/docs/reference/ai-sdk-core/default-settings-middleware)
- [addToolInputExamplesMiddleware](/docs/reference/ai-sdk-core/add-tool-input-examples-middleware)
- [extractJsonMiddleware](/docs/reference/ai-sdk-core/extract-json-middleware)
- [isStepCount](/docs/reference/ai-sdk-core/is-step-count)
- [hasToolCall](/docs/reference/ai-sdk-core/has-tool-call)
- [isLoopFinished](/docs/reference/ai-sdk-core/loop-finished)
- [simulateReadableStream](/docs/reference/ai-sdk-core/simulate-readable-stream)
- [smoothStream](/docs/reference/ai-sdk-core/smooth-stream)
- [generateId](/docs/reference/ai-sdk-core/generate-id)
- [createIdGenerator](/docs/reference/ai-sdk-core/create-id-generator)
- [DefaultGeneratedFile](/docs/reference/ai-sdk-core/default-generated-file)


[Full Sitemap](/sitemap.md)
