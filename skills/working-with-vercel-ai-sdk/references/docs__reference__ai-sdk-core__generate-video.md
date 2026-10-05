---
title: experimental_generateVideo
description: API Reference for experimental_generateVideo.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-video"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-video.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "7550b98815c1883b21cac9851f008e06a0c1f4dd2c056cccf230547541fb52ee"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Video generation is an experimental feature. The API may change in future
versions.

Generates videos based on a given prompt using a video model.

It is ideal for use cases where you need to generate videos programmatically,
such as creating visual content, animations, or generating videos from images.

```ts
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: "google/veo-3.1-generate-001",
  prompt: 'A cat walking on a treadmill',
  aspectRatio: '16:9',
});

console.log(videos);
```

## Import

```
import { experimental_generateVideo } from "ai"
```

## API Signature

### Parameters

- `model` (`VideoModelV4`): The video model to use.
- `prompt` (`string | GenerateVideoPrompt`): The input prompt to generate the video from.
  - `object`
    - `image` (`DataContent`): Input image for image-to-video generation. Can be a URL string, base64-encoded string, a \`Uint8Array\`, an \`ArrayBuffer\`, or a \`Buffer\`.
    - `text` (`string`): The text prompt.
- `n?` (`number`): Number of videos to generate. Default: 1.
- `aspectRatio?` (`string`): Aspect ratio of the videos to generate. Format: \`\{width}:\{height}\`, or \`'adaptive'\` to inherit the ratio from the input media (e.g. a first-frame image or a source video). Support for \`'adaptive'\` is provider-specific.
- `resolution?` (`string`): Resolution of the videos to generate. Format: \`\{width}x\{height}\`.
- `duration?` (`number`): Duration of the video in seconds.
- `fps?` (`number`): Frames per second for the video.
- `seed?` (`number`): Seed for the video generation.
- `frameImages?` (`Array<{ image: DataContent; frameType: "first_frame" | "last_frame" }>`): Role-tagged image inputs for first-last-frame generation.
- `inputReferences?` (`Array<DataContent | { data: DataContent; mediaType?: string }>`): Reference image or video inputs for reference-to-video generation. Use the object form with an explicit mediaType for URL-based video references. Providers route each reference by its media type and warn when a reference kind is unsupported.
- `generateAudio?` (`boolean`): Whether the model should generate audio alongside the video.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options.
- `maxVideosPerCall?` (`number`): Maximum number of videos to generate per API call. When n exceeds this value, multiple API calls will be made.
- `maxRetries?` (`number`): Maximum number of retries. Default: 2.
- `abortSignal?` (`AbortSignal`): An optional abort signal to cancel the call.
- `headers?` (`Record<string, string>`): Additional HTTP headers for the request.
- `download?` (`(options: { url: URL; abortSignal?: AbortSignal }) => Promise<{ data: Uint8Array; mediaType: string | undefined }>`): Custom download function for fetching videos from URLs. Use \`createDownload()\` from \`ai\` to create a download function with custom size limits, e.g. \`createDownload(\{ maxBytes: 50 \* 1024 \* 1024 })\`. Default: built-in download with 2 GiB limit.
- `poll?` (`object`): Polling configuration for the asynchronous start/status flow.
  - `object`
    - `intervalMs?` (`number`): Interval between status checks in milliseconds. Default: 5000.
    - `timeoutMs?` (`number`): Maximum time to wait for completion in milliseconds, including while waiting for a webhook notification. Default: 600000 (10 minutes).
    - `delay?` (`(delayInMs: number, options?: { abortSignal?: AbortSignal }) => PromiseLike<void>`): Custom delay implementation for polling intervals and webhook timeouts. Useful for durable workflow sleep functions. Default: built-in timer-based delay.
- `webhook?` (`() => PromiseLike<{ url: string; received: PromiseLike<VideoModelV4OperationWebhook> }>`): Webhook factory for providers that support webhook notifications. When provided and the model supports webhooks, the SDK uses the webhook instead of polling. The factory should return a URL for the provider to notify and a \`received\` promise that resolves when the notification arrives. The \`poll\` option can also be provided to configure the webhook timeout and polling fallback.

### Returns

- `video` (`GeneratedFile`): The first video that was generated.
  - `GeneratedFile`
    - `base64` (`string`): Video as a base64 encoded string.
    - `uint8Array` (`Uint8Array`): Video as a Uint8Array.
    - `mediaType` (`string`): The IANA media type of the video (e.g., video/mp4).
- `videos` (`Array<GeneratedFile>`): All videos that were generated.
  - `GeneratedFile`
    - `base64` (`string`): Video as a base64 encoded string.
    - `uint8Array` (`Uint8Array`): Video as a Uint8Array.
    - `mediaType` (`string`): The IANA media type of the video (e.g., video/mp4).
- `warnings` (`Warning[]`): Warnings from the model provider (e.g. unsupported settings).
- `providerMetadata?` (`VideoModelProviderMetadata`): Optional metadata from the provider. The outer key is the provider name. The inner values are the metadata. A \`videos\` key is typically present in the metadata and is an array with the same length as the top level \`videos\` key. Details depend on the provider.
- `responses` (`Array<VideoModelResponseMetadata>`): Response metadata from the provider. There may be multiple responses if we made multiple calls to the model.
  - `VideoModelResponseMetadata`
    - `timestamp` (`Date`): Timestamp for the start of the generated response.
    - `modelId` (`string`): The ID of the response model that was used to generate the response.
    - `headers?` (`Record<string, string>`): Response headers.
    - `providerMetadata?` (`VideoModelProviderMetadata`): Provider-specific metadata for this individual API call. Useful for accessing per-call metadata when multiple calls are made.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)