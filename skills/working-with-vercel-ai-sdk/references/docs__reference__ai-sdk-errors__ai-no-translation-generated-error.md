---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-errors/ai-no-translation-generated-error.md"
fetched_at: "2026-09-07T09:04:32.364Z"
sha256: "afbf9ac3dbde4ec77afabaa53b651fb5a9962afaca99feeab3995517c8d31109"
---

# AI_NoTranslationGeneratedError

This error occurs when no translation could be generated from the input audio:
no `audio` part was emitted and the final output text is empty, or the stream
ended without a finish event.

## Properties

- `response`: Speech translation model response metadata (required in constructor)

## Checking for this Error

You can check if an error is an instance of `AI_NoTranslationGeneratedError` using:

```typescript
import { NoTranslationGeneratedError } from 'ai';

if (NoTranslationGeneratedError.isInstance(error)) {
  // Handle the error
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
