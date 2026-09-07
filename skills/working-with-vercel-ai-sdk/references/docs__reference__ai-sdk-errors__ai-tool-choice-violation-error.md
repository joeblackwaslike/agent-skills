---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-tool-choice-violation-error.md"
fetched_at: "2026-09-07T09:04:32.364Z"
sha256: "7dce04bb1beaa8f061f562a47b9e6ac70a71b4d871aa13722ba5c0fb2c023581"
---

# ToolChoiceViolationError

This error occurs when a `generateText` response does not satisfy an enforced
tool choice. It is thrown when `toolChoice` is set to `'required'` but the
response contains no structured tool call, or when a specifically selected tool
was not called.

The error does not automatically interpret text or reasoning as an executable
tool call. You can inspect `content` to implement opt-in recovery, including
schema validation before executing any recovered call.

## Properties

- `toolChoice`: The effective tool choice that the response did not satisfy
- `finishReason`: The reason why the model finished generating the response
- `provider`: The provider that returned the response
- `modelId`: The model that returned the response
- `content`: The normalized content returned by the model
- `message`: The error message

## Checking for this Error

You can check if an error is an instance of `ToolChoiceViolationError` using:

```typescript
import { ToolChoiceViolationError } from 'ai';

if (ToolChoiceViolationError.isInstance(error)) {
  const serializedCall = error.content.find(part => part.type === 'text')?.text;

  // Parse and validate serializedCall before treating it as a tool call.
}
```


## Navigation

- [AI_APICallError](/docs/reference/ai-sdk-errors/ai-api-call-error)
- [AI_DownloadError](/docs/reference/ai-sdk-errors/ai-download-error)
- [AI_EmptyResponseBodyError](/docs/reference/ai-sdk-errors/ai-empty-response-body-error)
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


[Full Sitemap](/sitemap.md)
