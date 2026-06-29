---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-video.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "b245025f6b380c6d86255139b7a48747342fade52e9a1ea06b964dff97544c2e"
---

# `experimental_generateVideo()`

<Note>
  Video generation is an experimental feature. The API may change in future
  versions.
</Note>

Generates videos based on a given prompt using a video model.

It is ideal for use cases where you need to generate videos programmatically,
such as creating visual content, animations, or generating videos from images.

```ts
import { experimental_generateVideo as generateVideo } from 'ai';
__PROVIDER_IMPORT__;

const { videos } = await generateVideo({
  model: __VIDEO_MODEL__,
  prompt: 'A cat walking on a treadmill',
  aspectRatio: '16:9',
});

console.log(videos);
```

## Import

<Snippet
  text={`import { experimental_generateVideo } from "ai"`}
  prompt={false}
/>

## API Signature

### Parameters

<PropertiesTable
  content={[
    {
      name: 'model',
      type: 'VideoModelV4',
      description: 'The video model to use.',
    },
    {
      name: 'prompt',
      type: 'string | GenerateVideoPrompt',
      description: 'The input prompt to generate the video from.',
      properties: [
        {
          type: 'GenerateVideoPrompt',
          type: 'object',
          description:
            'A prompt object for video generation with optional input image',
          parameters: [
            {
              name: 'image',
              type: 'DataContent',
              description:
                'Input image for image-to-video generation. Can be a URL string, base64-encoded string, a `Uint8Array`, an `ArrayBuffer`, or a `Buffer`.',
            },
            {
              name: 'text',
              type: 'string',
              description: 'The text prompt.',
            },
          ],
        },
      ],
    },
    {
      name: 'n',
      type: 'number',
      isOptional: true,
      description: 'Number of videos to generate. Default: 1.',
    },
    {
      name: 'aspectRatio',
      type: 'string',
      isOptional: true,
      description:
        'Aspect ratio of the videos to generate. Format: `{width}:{height}`.',
    },
    {
      name: 'resolution',
      type: 'string',
      isOptional: true,
      description:
        'Resolution of the videos to generate. Format: `{width}x{height}`.',
    },
    {
      name: 'duration',
      type: 'number',
      isOptional: true,
      description: 'Duration of the video in seconds.',
    },
    {
      name: 'fps',
      type: 'number',
      isOptional: true,
      description: 'Frames per second for the video.',
    },
    {
      name: 'seed',
      type: 'number',
      isOptional: true,
      description: 'Seed for the video generation.',
    },
    {
      name: 'generateAudio',
      type: 'boolean',
      isOptional: true,
      description:
        'Whether the model should generate audio alongside the video.',
    },
    {
      name: 'providerOptions',
      type: 'ProviderOptions',
      isOptional: true,
      description: 'Additional provider-specific options.',
    },
    {
      name: 'maxVideosPerCall',
      type: 'number',
      isOptional: true,
      description:
        'Maximum number of videos to generate per API call. When n exceeds this value, multiple API calls will be made.',
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
    {
      name: 'download',
      type: '(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string | undefined }>',
      isOptional: true,
      description:
        'Custom download function for fetching videos from URLs. Use `createDownload()` from `ai` to create a download function with custom size limits, e.g. `createDownload({ maxBytes: 50 * 1024 * 1024 })`. Default: built-in download with 2 GiB limit.',
    },
  ]}
/>

### Returns

<PropertiesTable
  content={[
    {
      name: 'video',
      type: 'GeneratedFile',
      description: 'The first video that was generated.',
      properties: [
        {
          type: 'GeneratedFile',
          parameters: [
            {
              name: 'base64',
              type: 'string',
              description: 'Video as a base64 encoded string.',
            },
            {
              name: 'uint8Array',
              type: 'Uint8Array',
              description: 'Video as a Uint8Array.',
            },
            {
              name: 'mediaType',
              type: 'string',
              description:
                'The IANA media type of the video (e.g., video/mp4).',
            },
          ],
        },
      ],
    },
    {
      name: 'videos',
      type: 'Array<GeneratedFile>',
      description: 'All videos that were generated.',
      properties: [
        {
          type: 'GeneratedFile',
          parameters: [
            {
              name: 'base64',
              type: 'string',
              description: 'Video as a base64 encoded string.',
            },
            {
              name: 'uint8Array',
              type: 'Uint8Array',
              description: 'Video as a Uint8Array.',
            },
            {
              name: 'mediaType',
              type: 'string',
              description:
                'The IANA media type of the video (e.g., video/mp4).',
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
      type: 'VideoModelProviderMetadata',
      isOptional: true,
      description:
        'Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. A `videos` key is typically present in the metadata and is an array with the same length as the top level `videos` key. Details depend on the provider.',
    },
    {
      name: 'responses',
      type: 'Array<VideoModelResponseMetadata>',
      description:
        'Response metadata from the provider. There may be multiple responses if we made multiple calls to the model.',
      properties: [
        {
          type: 'VideoModelResponseMetadata',
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
              name: 'headers',
              type: 'Record<string, string>',
              isOptional: true,
              description: 'Response headers.',
            },
            {
              name: 'providerMetadata',
              type: 'VideoModelProviderMetadata',
              isOptional: true,
              description:
                'Provider-specific metadata for this individual API call. Useful for accessing per-call metadata when multiple calls are made.',
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
