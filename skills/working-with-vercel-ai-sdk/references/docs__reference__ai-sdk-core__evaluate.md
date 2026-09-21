---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/evaluate.md"
fetched_at: "2026-09-21T09:43:58.833Z"
sha256: "3c0e96b254103f96dfe40e1de9935265957ac74e3870ca19a6375d10e6dce831"
---

# `experimental_evaluate()`

```ts
import { experimental_evaluate } from 'ai';
```

Evaluates a nonempty map of `choice`, `score`, and `boolean` questions against one
state. See [Evaluation](/docs/ai-sdk-core/evaluation) for examples and semantics.

## Parameters

| Parameter         | Type                                              | Description                                                                                                                                 |
| ----------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`           | `Experimental_EvaluationModel`                    | Required experimental v4 model instance or a string ID resolved by Gateway or an explicitly configured evaluation-capable default provider. |
| `state`           | `string \| object \| array`                       | Required JSON-compatible shared state.                                                                                                      |
| `questions`       | `Record<string, Experimental_EvaluationQuestion>` | Required nonempty question map.                                                                                                             |
| `maxRetries`      | `number`                                          | Nonnegative integer; defaults to 2.                                                                                                         |
| `abortSignal`     | `AbortSignal`                                     | Cancels evaluation.                                                                                                                         |
| `headers`         | `Record<string, string>`                          | Additional HTTP headers.                                                                                                                    |
| `providerOptions` | `ProviderOptions`                                 | Provider-specific options.                                                                                                                  |

## Result

Returns `Promise<Experimental_EvaluationResult<QUESTIONS>>`:

- `answers`: One typed answer per question ID, with literal Choice option inference.
- `usage`: `inputTokens`, `outputTokens`, and `totalTokens`, each possibly undefined.
- `warnings`: Provider warnings, also passed to the SDK warning logger.
- `rounding`: Optional provider-declared decimal precision for probabilities and scores.
- `providerMetadata`: Optional provider-specific metadata.
- `response`: Timestamp, model ID, and optional response ID, headers, and body.

## Provider specification

`Experimental_EvaluationModelV4` is exported from `@ai-sdk/provider` and declares
`specificationVersion: 'v4'`, `provider`, `modelId`, `supportedQuestionTypes`, and
`doEvaluate(options)`. Evaluation is isolated from stable `ProviderV4`.

The public core types are `Experimental_EvaluationModel`,
`Experimental_EvaluationQuestion`, `Experimental_EvaluationAnswer`, and
`Experimental_EvaluationResult`. All evaluation-specific classes use the
`Evaluation` prefix, with `Experimental_` aliases at package boundaries.

## Errors

Unsupported types throw `Experimental_EvaluationUnsupportedQuestionTypeError`
before provider I/O. Invalid inputs throw `InvalidArgumentError`; malformed
answers throw `InvalidResponseDataError`. Invalid answers are not retried.
Neither partial results nor missing probability synthesis are supported.

## Model resolution

Use `registry.evaluationModel('provider:model')` or
`customProvider({ evaluationModels: { alias: model } }).evaluationModel('alias')`
to resolve models. Strings passed directly to `experimental_evaluate` use
`globalThis.AI_SDK_DEFAULT_PROVIDER.evaluationModel(id)`, when available. Evaluation
never implicitly falls back to Gateway.

Resolution errors use the existing `NoSuchModelError` and `NoSuchProviderError`
classes with `modelType: 'evaluationModel'`. Model instances and resolved models
must implement v4; other versions throw `UnsupportedModelVersionError`.
See [model resolution examples](/docs/ai-sdk-core/evaluation#model-aliases-and-registries).


## Navigation

- [generateText](/docs/reference/ai-sdk-core/generate-text)
- [streamText](/docs/reference/ai-sdk-core/stream-text)
- [embed](/docs/reference/ai-sdk-core/embed)
- [embedMany](/docs/reference/ai-sdk-core/embed-many)
- [rerank](/docs/reference/ai-sdk-core/rerank)
- [generateImage](/docs/reference/ai-sdk-core/generate-image)
- [experimental_streamTranscribe](/docs/reference/ai-sdk-core/stream-transcribe)
- [experimental_streamTranslate](/docs/reference/ai-sdk-core/stream-translate)
- [transcribe](/docs/reference/ai-sdk-core/transcribe)
- [generateSpeech](/docs/reference/ai-sdk-core/generate-speech)
- [experimental_generateVideo](/docs/reference/ai-sdk-core/generate-video)
- [experimental_evaluate](/docs/reference/ai-sdk-core/evaluate)
- [uploadFile](/docs/reference/ai-sdk-core/upload-file)
- [uploadSkill](/docs/reference/ai-sdk-core/upload-skill)
- [Agent (Interface)](/docs/reference/ai-sdk-core/agent)
- [ToolLoopAgent](/docs/reference/ai-sdk-core/tool-loop-agent)
- [createAgentUIStream](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [createAgentUIStreamResponse](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [pipeAgentUIStreamToResponse](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)
- [experimental_startBatch](/docs/reference/ai-sdk-core/start-batch)
- [tool](/docs/reference/ai-sdk-core/tool)
- [experimental_getBatchStatus](/docs/reference/ai-sdk-core/get-batch-status)
- [dynamicTool](/docs/reference/ai-sdk-core/dynamic-tool)
- [experimental_getBatchResults](/docs/reference/ai-sdk-core/get-batch-results)
- [experimental_cancelBatch](/docs/reference/ai-sdk-core/cancel-batch)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)
- [experimental_getRealtimeToolDefinitions](/docs/reference/ai-sdk-core/get-realtime-tool-definitions)
- [toolSearch](/docs/reference/ai-sdk-core/tool-search)
- [experimental_listBatches](/docs/reference/ai-sdk-core/list-batches)
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
- [defaultInstructionsMiddleware](/docs/reference/ai-sdk-core/default-instructions-middleware)
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
