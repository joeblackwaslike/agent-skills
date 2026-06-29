---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-speech.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "8adc5100b5004b662aee4dff60109ebb51964b15acb4f63cd96d0c07f43caa6f"
---

# `generateSpeech()`

Generates speech audio from text.

```ts
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const { audio } = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Hello from the AI SDK!',
  voice: 'alloy',
});

console.log(audio);
```

## Examples

### OpenAI

```ts
import { generateSpeech } from 'ai';
import { openai } from '@ai-sdk/openai';

const { audio } = await generateSpeech({
  model: openai.speech('tts-1'),
  text: 'Hello from the AI SDK!',
  voice: 'alloy',
});
```

### ElevenLabs

```ts
import { generateSpeech } from 'ai';
import { elevenLabs } from '@ai-sdk/elevenlabs';

const { audio } = await generateSpeech({
  model: elevenLabs.speech('eleven_multilingual_v2'),
  text: 'Hello from the AI SDK!',
  voice: 'your-voice-id', // Required: get this from your ElevenLabs account
});
```

## Import

<Snippet text={`import { generateSpeech } from "ai"`} prompt={false} />

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'SpeechModelV4',
      description: 'The speech model to use.',
    },
    {
      name: 'text',
      type: 'string',
      description: 'The text to generate the speech from.',
    },
    {
      name: 'voice',
      type: 'string',
      isOptional: true,
      description: 'The voice to use for the speech.',
    },
    {
      name: 'outputFormat',
      type: 'string',
      isOptional: true,
      description:
        'The output format to use for the speech e.g. "mp3", "wav", etc.',
    },
    {
      name: 'instructions',
      type: 'string',
      isOptional: true,
      description: 'Instructions for the speech generation.',
    },
    {
      name: 'speed',
      type: 'number',
      isOptional: true,
      description: 'The speed of the speech generation.',
    },
    {
      name: 'language',
      type: 'string',
      isOptional: true,
      description:
        'The language for speech generation. This should be an ISO 639-1 language code (e.g. "en", "es", "fr") or "auto" for automatic language detection. Provider support varies.',
    },
    {
      name: 'providerOptions',
      type: 'Record<string, JSONObject>',
      isOptional: true,
      description: 'Additional provider-specific options.',
    },
    {
      name: 'maxRetries',
      type: 'number',
      isOptional: true,
      description: 'Maximum number of retries. Default: 2.',
    },
    {
      name: 'abortSignal',
      type: 'AbortSignal',
      isOptional: true,
      description: 'An optional abort signal to cancel the call.',
    },
    {
      name: 'headers',
      type: 'Record<string, string>',
      isOptional: true,
      description: 'Additional HTTP headers for the request.',
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'audio',
      type: 'GeneratedAudioFile',
      description: 'The generated audio.',
      properties: [
        {
          type: 'GeneratedAudioFile',
          parameters: [
            {
              name: 'base64',
              type: 'string',
              description: 'Audio as a base64 encoded string.',
            },
            {
              name: 'uint8Array',
              type: 'Uint8Array',
              description: 'Audio as a Uint8Array.',
            },
            {
              name: 'mediaType',
              type: 'string',
              description: 'Media type of the audio (e.g. "audio/mpeg").',
            },
            {
              name: 'format',
              type: 'string',
              description: 'Format of the audio (e.g. "mp3").',
            },
          ],
        },
      ],
    },
    {
      name: 'warnings',
      type: 'Warning[]',
      description:
        'Warnings from the model provider (e.g. unsupported settings).',
    },
    {
      name: 'providerMetadata',
      type: 'Record<string, JSONObject>',
      isOptional: true,
      description:
        'Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. Details depend on the provider.',
    },
    {
      name: 'responses',
      type: 'Array<SpeechModelResponseMetadata>',
      description:
        'Response metadata from the provider. There may be multiple responses if we made multiple calls to the model.',
      properties: [
        {
          type: 'SpeechModelResponseMetadata',
          parameters: [
            {
              name: 'timestamp',
              type: 'Date',
              description: 'Timestamp for the start of the generated response.',
            },
            {
              name: 'modelId',
              type: 'string',
              description:
                'The ID of the response model that was used to generate the response.',
            },
            {
              name: 'body',
              isOptional: true,
              type: 'unknown',
              description: 'Optional response body.',
            },
            {
              name: 'headers',
              type: 'Record<string, string>',
              isOptional: true,
              description: 'Response headers.',
            },
          ],
        },
      ],
    },
  ]}
/>


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
