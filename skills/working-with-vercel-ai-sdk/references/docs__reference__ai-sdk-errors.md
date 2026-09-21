---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors.md"
fetched_at: "2026-09-21T09:43:58.833Z"
sha256: "6e40c987062539be9f5fe366c8c0c1d803c64067ce723989d18730fa28fd71e5"
---

# AI SDK Errors

The AI SDK exposes typed errors so applications can handle expected failure
modes without matching error message strings.

## Importing Errors

The application package is named `ai`, not `@ai-sdk/ai`. It re-exports common
provider-level errors from `@ai-sdk/provider` together with the higher-level
errors raised by AI SDK Core:

```typescript
import { APICallError, NoObjectGeneratedError } from 'ai';
```

Provider implementations that depend directly on `@ai-sdk/provider` can import
its provider-level errors from that package instead:

```typescript
import { APICallError, InvalidResponseDataError } from '@ai-sdk/provider';
```

## Migrating to Typed Error Handling

Replace message matching or an unconditionally generic `catch` block with the
most specific static `isInstance` guard available. Check `AISDKError` last when
you need a fallback for any AI SDK error:

```typescript
import { AISDKError, APICallError, generateText } from 'ai';

try {
  await generateText({
    model,
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
} catch (error) {
  if (APICallError.isInstance(error)) {
    console.error('Provider request failed:', error.statusCode);
    return;
  }

  if (AISDKError.isInstance(error)) {
    console.error('AI SDK error:', error.name);
    return;
  }

  throw error;
}
```

Prefer `ErrorClass.isInstance(error)` over `error instanceof ErrorClass` when
the class provides it. The static guard also works when multiple AI SDK package
versions are loaded.

## Common Failure Modes

| Failure mode                                                                           | Error to check                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A provider request fails because of a network error or non-success response            | [`APICallError`](/docs/reference/ai-sdk-errors/ai-api-call-error)                                                                                                                                                                                                                           |
| Automatic retries are exhausted                                                        | [`RetryError`](/docs/reference/ai-sdk-errors/ai-retry-error)                                                                                                                                                                                                                                |
| A provider reports an error after a response stream has started                        | [`StreamProviderError`](/docs/reference/ai-sdk-errors/ai-stream-provider-error)                                                                                                                                                                                                             |
| A structured output cannot be parsed or validated                                      | [`NoObjectGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-object-generated-error); inspect its `cause` for [`JSONParseError`](/docs/reference/ai-sdk-errors/ai-json-parse-error) or [`TypeValidationError`](/docs/reference/ai-sdk-errors/ai-type-validation-error)                    |
| A generation call returns no usable output                                             | [`NoOutputGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-output-generated-error) or the modality-specific `No*GeneratedError`                                                                                                                                                         |
| A model calls a missing tool or supplies invalid tool input                            | [`NoSuchToolError`](/docs/reference/ai-sdk-errors/ai-no-such-tool-error) or [`InvalidToolInputError`](/docs/reference/ai-sdk-errors/ai-invalid-tool-input-error)                                                                                                                            |
| Tool-call repair fails                                                                 | [`ToolCallRepairError`](/docs/reference/ai-sdk-errors/ai-tool-call-repair-error)                                                                                                                                                                                                            |
| A response violates an enforced `toolChoice`                                           | [`ToolChoiceViolationError`](/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error)                                                                                                                                                                                                  |
| Message history contains unresolved tool calls or invalid approvals                    | [`MissingToolResultsError`](/docs/troubleshooting/missing-tool-results-error), [`InvalidToolApprovalError`](/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-error), or [`InvalidToolApprovalSignatureError`](/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-signature-error) |
| A provider or model cannot be resolved                                                 | [`NoSuchProviderError`](/docs/reference/ai-sdk-errors/ai-no-such-provider-error), [`NoSuchModelError`](/docs/reference/ai-sdk-errors/ai-no-such-model-error), or [`NoSuchProviderReferenceError`](/docs/reference/ai-sdk-errors/ai-no-such-provider-reference-error)                        |
| A provider response is empty, malformed, or invalid                                    | [`EmptyResponseBodyError`](/docs/reference/ai-sdk-errors/ai-empty-response-body-error), [`JSONParseError`](/docs/reference/ai-sdk-errors/ai-json-parse-error), or [`InvalidResponseDataError`](/docs/reference/ai-sdk-errors/ai-invalid-response-data-error)                                |
| The requested model or provider does not support a capability or specification version | [`UnsupportedFunctionalityError`](/docs/reference/ai-sdk-errors/ai-unsupported-functionality-error) or [`UnsupportedModelVersionError`](/docs/troubleshooting/unsupported-model-version)                                                                                                    |
| UI messages cannot be converted or a UI message stream is invalid                      | [`MessageConversionError`](/docs/reference/ai-sdk-errors/ai-message-conversion-error) or [`UIMessageStreamError`](/docs/reference/ai-sdk-errors/ai-ui-message-stream-error)                                                                                                                 |

## Error Reference

### Base Error

- `AISDKError`: Base class and broad type guard for AI SDK errors.

### Provider Requests and Responses

- [`APICallError`](/docs/reference/ai-sdk-errors/ai-api-call-error)
- [`DownloadError`](/docs/reference/ai-sdk-errors/ai-download-error)
- [`EmptyResponseBodyError`](/docs/reference/ai-sdk-errors/ai-empty-response-body-error)
- [`InvalidPromptError`](/docs/reference/ai-sdk-errors/ai-invalid-prompt-error)
- [`InvalidResponseDataError`](/docs/reference/ai-sdk-errors/ai-invalid-response-data-error)
- [`JSONParseError`](/docs/reference/ai-sdk-errors/ai-json-parse-error)
- [`LoadAPIKeyError`](/docs/reference/ai-sdk-errors/ai-load-api-key-error)
- [`LoadSettingError`](/docs/reference/ai-sdk-errors/ai-load-setting-error)
- [`NoContentGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-content-generated-error)
- [`NoSuchModelError`](/docs/reference/ai-sdk-errors/ai-no-such-model-error)
- [`NoSuchProviderReferenceError`](/docs/reference/ai-sdk-errors/ai-no-such-provider-reference-error)
- [`RetryError`](/docs/reference/ai-sdk-errors/ai-retry-error)
- [`StreamProviderError`](/docs/reference/ai-sdk-errors/ai-stream-provider-error)
- [`TooManyEmbeddingValuesForCallError`](/docs/reference/ai-sdk-errors/ai-too-many-embedding-values-for-call-error)
- [`TypeValidationError`](/docs/reference/ai-sdk-errors/ai-type-validation-error)
- [`UnsupportedFunctionalityError`](/docs/reference/ai-sdk-errors/ai-unsupported-functionality-error)

### Inputs and Message Streams

- [`InvalidArgumentError`](/docs/reference/ai-sdk-errors/ai-invalid-argument-error)
- [`InvalidDataContentError`](/docs/reference/ai-sdk-errors/ai-invalid-data-content-error)
- [`InvalidMessageRoleError`](/docs/reference/ai-sdk-errors/ai-invalid-message-role-error)
- `InvalidStreamPartError`
- [`MessageConversionError`](/docs/reference/ai-sdk-errors/ai-message-conversion-error)
- [`UIMessageStreamError`](/docs/reference/ai-sdk-errors/ai-ui-message-stream-error)

### Generated Output

- [`NoImageGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-image-generated-error)
- [`NoObjectGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-object-generated-error)
- [`NoOutputGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-output-generated-error)
- [`NoSpeechGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-speech-generated-error)
- [`NoTranscriptGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-transcript-generated-error)
- [`NoTranslationGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-translation-generated-error)
- [`NoVideoGeneratedError`](/docs/reference/ai-sdk-errors/ai-no-video-generated-error)

### Providers and Model Compatibility

- [`NoSuchProviderError`](/docs/reference/ai-sdk-errors/ai-no-such-provider-error)
- [`UnsupportedModelVersionError`](/docs/troubleshooting/unsupported-model-version)

### Tools and Approvals

- [`InvalidToolApprovalError`](/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-error)
- [`InvalidToolApprovalSignatureError`](/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-signature-error)
- [`InvalidToolInputError`](/docs/reference/ai-sdk-errors/ai-invalid-tool-input-error)
- [`MissingToolResultsError`](/docs/troubleshooting/missing-tool-results-error)
- [`NoSuchToolError`](/docs/reference/ai-sdk-errors/ai-no-such-tool-error)
- [`ToolCallNotFoundForApprovalError`](/docs/reference/ai-sdk-errors/ai-tool-call-not-found-for-approval-error)
- [`ToolCallRepairError`](/docs/reference/ai-sdk-errors/ai-tool-call-repair-error)
- [`ToolChoiceViolationError`](/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error)


## Navigation

- [AI SDK Core](/docs/reference/ai-sdk-core)
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
- [AI SDK UI](/docs/reference/ai-sdk-ui)
  - [useChat](/docs/reference/ai-sdk-ui/use-chat)
  - [useCompletion](/docs/reference/ai-sdk-ui/use-completion)
  - [useObject](/docs/reference/ai-sdk-ui/use-object)
  - [experimental_useRealtime](/docs/reference/ai-sdk-ui/use-realtime)
  - [convertToModelMessages](/docs/reference/ai-sdk-ui/convert-to-model-messages)
  - [pruneMessages](/docs/reference/ai-sdk-ui/prune-messages)
  - [createUIMessageStream](/docs/reference/ai-sdk-ui/create-ui-message-stream)
  - [createUIMessageStreamResponse](/docs/reference/ai-sdk-ui/create-ui-message-stream-response)
  - [pipeUIMessageStreamToResponse](/docs/reference/ai-sdk-ui/pipe-ui-message-stream-to-response)
  - [readUIMessageStream](/docs/reference/ai-sdk-ui/read-ui-message-stream)
  - [InferUITools](/docs/reference/ai-sdk-ui/infer-ui-tools)
  - [InferUITool](/docs/reference/ai-sdk-ui/infer-ui-tool)
  - [experimental_MCPAppRenderer](/docs/reference/ai-sdk-ui/mcp-app-renderer)
  - [DirectChatTransport](/docs/reference/ai-sdk-ui/direct-chat-transport)
- [AI SDK RSC](/docs/reference/ai-sdk-rsc)
  - [streamUI](/docs/reference/ai-sdk-rsc/stream-ui)
  - [createAI](/docs/reference/ai-sdk-rsc/create-ai)
  - [createStreamableUI](/docs/reference/ai-sdk-rsc/create-streamable-ui)
  - [createStreamableValue](/docs/reference/ai-sdk-rsc/create-streamable-value)
  - [readStreamableValue](/docs/reference/ai-sdk-rsc/read-streamable-value)
  - [getAIState](/docs/reference/ai-sdk-rsc/get-ai-state)
  - [getMutableAIState](/docs/reference/ai-sdk-rsc/get-mutable-ai-state)
  - [useAIState](/docs/reference/ai-sdk-rsc/use-ai-state)
  - [useActions](/docs/reference/ai-sdk-rsc/use-actions)
  - [useUIState](/docs/reference/ai-sdk-rsc/use-ui-state)
  - [useStreamableValue](/docs/reference/ai-sdk-rsc/use-streamable-value)
  - [render (Removed)](/docs/reference/ai-sdk-rsc/render)
- [AI SDK Workflow](/docs/reference/ai-sdk-workflow)
  - [WorkflowAgent](/docs/reference/ai-sdk-workflow/workflow-agent)
  - [WorkflowChatTransport](/docs/reference/ai-sdk-workflow/workflow-chat-transport)
  - [generateVideo](/docs/reference/ai-sdk-workflow/generate-video)
- [AI SDK Errors](/docs/reference/ai-sdk-errors)
  - [AI_APICallError](/docs/reference/ai-sdk-errors/ai-api-call-error)
  - [AI_DownloadError](/docs/reference/ai-sdk-errors/ai-download-error)
  - [AI_EmptyResponseBodyError](/docs/reference/ai-sdk-errors/ai-empty-response-body-error)
  - [AI_EvaluationUnsupportedQuestionTypeError](/docs/reference/ai-sdk-errors/ai-evaluation-unsupported-question-type-error)
  - [AI_InvalidArgumentError](/docs/reference/ai-sdk-errors/ai-invalid-argument-error)
  - [AI_InvalidDataContentError](/docs/reference/ai-sdk-errors/ai-invalid-data-content-error)
  - [AI_InvalidMessageRoleError](/docs/reference/ai-sdk-errors/ai-invalid-message-role-error)
  - [AI_InvalidPromptError](/docs/reference/ai-sdk-errors/ai-invalid-prompt-error)
  - [AI_InvalidResponseDataError](/docs/reference/ai-sdk-errors/ai-invalid-response-data-error)
  - [AI_InvalidToolApprovalError](/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-error)
  - [AI_InvalidToolApprovalSignatureError](/docs/reference/ai-sdk-errors/ai-invalid-tool-approval-signature-error)
  - [AI_InvalidToolInputError](/docs/reference/ai-sdk-errors/ai-invalid-tool-input-error)
  - [AI_JSONParseError](/docs/reference/ai-sdk-errors/ai-json-parse-error)
  - [AI_LoadAPIKeyError](/docs/reference/ai-sdk-errors/ai-load-api-key-error)
  - [AI_LoadSettingError](/docs/reference/ai-sdk-errors/ai-load-setting-error)
  - [AI_MessageConversionError](/docs/reference/ai-sdk-errors/ai-message-conversion-error)
  - [AI_NoContentGeneratedError](/docs/reference/ai-sdk-errors/ai-no-content-generated-error)
  - [AI_NoImageGeneratedError](/docs/reference/ai-sdk-errors/ai-no-image-generated-error)
  - [AI_NoObjectGeneratedError](/docs/reference/ai-sdk-errors/ai-no-object-generated-error)
  - [AI_NoOutputGeneratedError](/docs/reference/ai-sdk-errors/ai-no-output-generated-error)
  - [AI_NoSpeechGeneratedError](/docs/reference/ai-sdk-errors/ai-no-speech-generated-error)
  - [AI_NoSuchModelError](/docs/reference/ai-sdk-errors/ai-no-such-model-error)
  - [AI_NoSuchProviderError](/docs/reference/ai-sdk-errors/ai-no-such-provider-error)
  - [AI_NoSuchProviderReferenceError](/docs/reference/ai-sdk-errors/ai-no-such-provider-reference-error)
  - [AI_NoSuchToolError](/docs/reference/ai-sdk-errors/ai-no-such-tool-error)
  - [AI_NoTranscriptGeneratedError](/docs/reference/ai-sdk-errors/ai-no-transcript-generated-error)
  - [AI_NoTranslationGeneratedError](/docs/reference/ai-sdk-errors/ai-no-translation-generated-error)
  - [AI_NoVideoGeneratedError](/docs/reference/ai-sdk-errors/ai-no-video-generated-error)
  - [AI_RetryError](/docs/reference/ai-sdk-errors/ai-retry-error)
  - [AI_StreamProviderError](/docs/reference/ai-sdk-errors/ai-stream-provider-error)
  - [AI_TooManyEmbeddingValuesForCallError](/docs/reference/ai-sdk-errors/ai-too-many-embedding-values-for-call-error)
  - [AI_ToolCallNotFoundForApprovalError](/docs/reference/ai-sdk-errors/ai-tool-call-not-found-for-approval-error)
  - [ToolCallRepairError](/docs/reference/ai-sdk-errors/ai-tool-call-repair-error)
  - [ToolChoiceViolationError](/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error)
  - [AI_TypeValidationError](/docs/reference/ai-sdk-errors/ai-type-validation-error)
  - [AI_UIMessageStreamError](/docs/reference/ai-sdk-errors/ai-ui-message-stream-error)
  - [AI_UnsupportedFunctionalityError](/docs/reference/ai-sdk-errors/ai-unsupported-functionality-error)
- [AI SDK TUI](/docs/reference/ai-sdk-tui)
  - [runAgentTUI](/docs/reference/ai-sdk-tui/run-agent-tui)


[Full Sitemap](/sitemap.md)
