---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-transcribe.md"
fetched_at: "2026-08-03T07:32:11.263Z"
sha256: "49be4a288a32ec5f098068a6ae0f0c4101e6aa3f1a7ccd837bbc55cb024c73a4"
---

# `experimental_streamTranscribe()`

<Note type="warning">
  `experimental_streamTranscribe` is an experimental feature.
</Note>

Streams a transcript from live raw audio using a transcription model with
streaming support.

```ts
import { experimental_streamTranscribe as streamTranscribe } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = streamTranscribe({
  model: openai.transcription('gpt-realtime-whisper'),
  audio: audioStream, // ReadableStream<Uint8Array | string>
  inputAudioFormat: { type: 'audio/pcm', rate: 24000 },
});

for await (const part of result.fullStream) {
  if (part.type === 'transcript-delta') {
    process.stdout.write(part.delta);
  }
}

console.log(await result.text);
```

## Import

<Snippet
  text={`import { experimental_streamTranscribe as streamTranscribe } from "ai"`}
  prompt={false}
/>

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'TranscriptionModelV4',
      description:
        "The transcription model to use. The model must support streaming (`doStream`). String model IDs resolve through the global provider (AI Gateway by default), which supports streaming transcription for supported models (e.g. `openai/gpt-realtime-whisper`, `xai/grok-stt`): `experimental_streamTranscribe({ model: 'openai/gpt-realtime-whisper', ... })`.",
    },
    {
      name: 'audio',
      type: 'ReadableStream<Uint8Array | string>',
      description:
        'Raw audio chunks to transcribe. `Uint8Array` chunks contain raw audio bytes; `string` chunks contain base64-encoded raw audio bytes.',
    },
    {
      name: 'inputAudioFormat',
      type: '{ type: string; rate?: number }',
      description:
        'The input audio format for the raw audio chunks, e.g. `{ type: "audio/pcm", rate: 24000 }`. Supported types are provider-specific (e.g. `audio/pcm`, `audio/pcmu`, `audio/pcma`).',
    },
    {
      name: 'providerOptions',
      type: 'Record<string, JSONObject>',
      isOptional: true,
      description: 'Additional provider-specific options.',
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
      description:
        'Additional HTTP/WebSocket headers, if supported by the provider.',
    },
    {
      name: 'includeRawChunks',
      type: 'boolean',
      isOptional: true,
      description:
        'When true, the provider includes raw provider chunks in the stream as `raw` parts.',
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'fullStream',
      type: 'AsyncIterableStream<TranscriptionStreamPart>',
      description:
        'A single-consumer live stream of transcription parts: `transcript-delta`, `transcript-partial`, `transcript-final`, `raw`, and `error`. Access it once, before any result promise, when both stream parts and final results are needed. Accessing a result promise first consumes the stream internally and makes `fullStream` unavailable.',
    },
    {
      name: 'text',
      type: 'Promise<string>',
      description: 'The complete transcribed text from the audio input.',
    },
    {
      name: 'segments',
      type: 'Promise<Array<{ text: string; startSecond: number; endSecond: number }>>',
      description:
        'Final transcript segments with timing information, if available.',
    },
    {
      name: 'language',
      type: 'Promise<string | undefined>',
      description:
        'The language of the transcript in ISO-639-1 format, if available.',
    },
    {
      name: 'durationInSeconds',
      type: 'Promise<number | undefined>',
      description: 'The duration of the transcript in seconds, if available.',
    },
    {
      name: 'warnings',
      type: 'Promise<Warning[]>',
      description:
        'Warnings for the call, e.g. unsupported settings. Resolves when the provider emits the stream start.',
    },
    {
      name: 'responses',
      type: 'Promise<Array<TranscriptionModelResponseMetadata>>',
      description: 'Response metadata (timestamp, model ID, headers).',
    },
    {
      name: 'providerMetadata',
      type: 'Promise<Record<string, JSONObject>>',
      description: 'Additional provider-specific metadata.',
    },
  ]}
/>

<Note>
  The result promises settle as the stream is consumed. If you stop consuming
  `fullStream` early (e.g. `break` out of the loop), the underlying provider
  connection is closed and pending result promises reject.
</Note>

## Wire format (experimental)

Streaming transcription over WebSocket is serialized with the experimental
transcription-stream envelope defined in `@ai-sdk/provider-utils`
(`experimental_parseTranscriptionStreamClientFrame`,
`experimental_serializeTranscriptionStreamPart`,
`experimental_parseTranscriptionStreamPart`): the client sends one
`transcription-stream.start` TEXT frame, audio as BINARY frames, and a
`transcription-stream.audio-done` TEXT frame; each server TEXT frame is one
JSON-serialized transcription stream part. AI Gateway implements the server
side of this envelope.


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
