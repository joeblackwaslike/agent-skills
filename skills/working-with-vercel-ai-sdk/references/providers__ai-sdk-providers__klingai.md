---
title: Kling AI
description: Learn how to use Kling AI with AI Gateway and the direct provider.
url: "https://ai-sdk.dev/providers/ai-sdk-providers/klingai"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/ai-sdk-providers/klingai.md"
fetched_at: "2026-11-09T12:39:36.677Z"
sha256: "41a474e5421aa450e4a90490e7f43b7c7c55d9a4bec96271ee757468dc38db6f"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The [Kling AI](https://klingai.com/) provider contains support for Kling AI's video generation models, including text-to-video, image-to-video, motion control, and multi-shot video generation.
You can use Kling AI models through [AI Gateway](/providers/ai-sdk-providers/ai-gateway) (recommended) or connect directly with `@ai-sdk/klingai`.

```ts provider="klingai" model="klingai/kling-v3.0-t2v"
import { experimental_generateVideo as generateVideo } from 'ai';
import { writeFile } from 'node:fs/promises';

const { video } = await generateVideo({
  model: "klingai/kling-v3.0-t2v",
  prompt: 'A paper boat drifting across a calm lake at sunrise.',
  duration: 5,
  aspectRatio: '16:9',
});

await writeFile('video.mp4', video.uint8Array);
```

## Using AI Gateway

The AI SDK uses AI Gateway by default for model strings. Gateway provides access to models across providers through a single API key, with usage and cost tracking. Install `ai`:

```bash
pnpm add ai
```

Set an [AI Gateway API key](https://vercel.com/docs/ai-gateway/getting-started) in your environment:

```bash
export AI_GATEWAY_API_KEY=your_api_key_here
```

Vercel deployments can also use [OIDC authentication](/providers/ai-sdk-providers/ai-gateway#oidc-authentication-vercel-deployments).
See the [AI Gateway provider documentation](/providers/ai-sdk-providers/ai-gateway) for configuration and the [model catalog](https://vercel.com/ai-gateway/models) for available models.

Gateway feature and provider-option support depends on the model and the provider serving the request. See [Gateway provider options](https://vercel.com/docs/ai-gateway/models-and-providers/provider-options).

## Using `@ai-sdk/klingai`

For direct access to Kling AI, install `ai` and `@ai-sdk/klingai`:

```bash
pnpm add ai @ai-sdk/klingai
```

Set your Kling AI API key:

```bash
export KLINGAI_API_KEY=your_api_key_here
```

Legacy access-key and secret-key authentication is documented in [Provider Instance](#provider-instance).

AI Gateway does not expose every API in `@ai-sdk/klingai`. Use the direct provider for provider-specific APIs or custom connection settings.

The following sections document the direct `@ai-sdk/klingai` provider,
including its model factories and settings. Gateway model and feature
availability can differ.

## Provider Instance

You can import the default provider instance `klingai` from `@ai-sdk/klingai`:

```ts
import { klingai } from '@ai-sdk/klingai';
```

If you need a customized setup, you can import `createKlingAI` from `@ai-sdk/klingai` and create a provider instance with your settings:

```ts
import { createKlingAI } from '@ai-sdk/klingai';

const klingai = createKlingAI({
  apiKey: 'your-api-key',
});
```

You can use the following optional settings to customize the Kling AI provider instance:

- **apiKey** *string | PromiseLike\<string> | (() => string | PromiseLike\<string>)*

  Pass a function to resolve credentials before each request, including when keys
  rotate. The function can return a string or a promise. Credential caching and
  refresh are managed by the function.

  Kling AI API key. Defaults to the `KLINGAI_API_KEY` environment variable.
  Create one in the [Kling AI developer console](https://kling.ai/dev/api-key).

- **accessKey** *string*

  Kling AI access key. Defaults to the `KLINGAI_ACCESS_KEY` environment variable.
  Legacy authentication — prefer `apiKey`.

- **secretKey** *string*

  Kling AI secret key. Defaults to the `KLINGAI_SECRET_KEY` environment variable.
  Legacy authentication — prefer `apiKey`.

- **baseURL** *string*

  Use a different URL prefix for API calls, e.g. to use proxy servers.
  The default prefix is `https://api-singapore.klingai.com`.

- **headers** *Record\<string,string>*

  Custom headers to include in the requests.

- **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Authentication

Kling AI supports two authentication schemes:

- **API key** (recommended). A single key that is sent as a bearer token. Create
  one in the [Kling AI developer console](https://kling.ai/dev/api-key) and set
  it as `KLINGAI_API_KEY`, or pass it via the `apiKey` setting.
- **Access key / secret key** (legacy). A key pair that the provider uses to
  sign a short-lived JWT for each request. Set `KLINGAI_ACCESS_KEY` and
  `KLINGAI_SECRET_KEY`, or pass the `accessKey` and `secretKey` settings.

Credentials are resolved in this order, with explicit settings taking
precedence over environment variables:

1. The `apiKey` setting
2. The `accessKey` and `secretKey` settings
3. The `KLINGAI_API_KEY` environment variable
4. The `KLINGAI_ACCESS_KEY` and `KLINGAI_SECRET_KEY` environment variables

## Video Models

You can create Kling AI video models using the `.video()` factory method.
For more on video generation with the AI SDK see [generateVideo()](/docs/reference/ai-sdk-core/generate-video).

This provider currently supports four video generation modes: text-to-video, image-to-video, reference-to-video (multi-image), and motion control.

Not all options are supported by every model version and mode combination. See
the [KlingAI Capability
Map](https://app.klingai.com/global/dev/document-api/apiReference/model/skillsMap)
for detailed compatibility across models.

### Text-to-Video

Generate videos from text prompts:

```ts
import { klingai, type KlingAIVideoModelOptions } from '@ai-sdk/klingai';
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: klingai.video('kling-v3.0-t2v'),
  prompt: 'A chicken flying into the sunset in the style of 90s anime.',
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    klingai: {
      mode: 'std',
    } satisfies KlingAIVideoModelOptions,
  },
});
```

### Image-to-Video

Generate videos from a start frame image with an optional text prompt. The popular start+end frame feature is available via the `imageTail` option:

```ts
import { klingai, type KlingAIVideoModelOptions } from '@ai-sdk/klingai';
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: klingai.video('kling-v3.0-i2v'),
  prompt: {
    image: 'https://example.com/start-frame.png',
    text: 'The cat slowly turns its head and blinks',
  },
  duration: 5,
  providerOptions: {
    klingai: {
      // Pro mode required for start+end frame control
      mode: 'pro',
      // Optional: end frame image
      imageTail: 'https://example.com/end-frame.png',
    } satisfies KlingAIVideoModelOptions,
  },
});
```

### Multi-Shot Video Generation

Generate videos with multiple storyboard shots, each with its own prompt and duration (Kling v3.0+):

```ts
import { klingai, type KlingAIVideoModelOptions } from '@ai-sdk/klingai';
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: klingai.video('kling-v3.0-t2v'),
  prompt: '',
  aspectRatio: '16:9',
  duration: 10,
  providerOptions: {
    klingai: {
      mode: 'pro',
      multiShot: true,
      shotType: 'customize',
      multiPrompt: [
        {
          index: 1,
          prompt: 'A sunrise over a calm ocean, warm golden light.',
          duration: '4',
        },
        {
          index: 2,
          prompt: 'A flock of seagulls take flight from the beach.',
          duration: '3',
        },
        {
          index: 3,
          prompt: 'Waves crash against rocky cliffs at sunset.',
          duration: '3',
        },
      ],
      sound: 'on',
    } satisfies KlingAIVideoModelOptions,
  },
});
```

Multi-shot also works with image-to-video by combining a start frame image with per-shot prompts.

### Reference-to-Video (Multi-Image)

Generate a video that combines reference images using the top-level `inputReferences` option.

```ts
import { klingai, type KlingAIVideoModelOptions } from '@ai-sdk/klingai';
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: klingai.video('kling-v1.6-i2v'),
  prompt: 'The two characters meet and walk together through a sunny park',
  inputReferences: [
    'https://example.com/character-1.png',
    'https://example.com/character-2.png',
  ],
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    klingai: {
      mode: 'std',
    } satisfies KlingAIVideoModelOptions,
  },
});
```

### Motion Control

Generate video by transferring motion from a reference video to a character image:

```ts
import { klingai, type KlingAIVideoModelOptions } from '@ai-sdk/klingai';
import { experimental_generateVideo as generateVideo } from 'ai';

const { videos } = await generateVideo({
  model: klingai.video('kling-v3.0-motion-control'),
  prompt: {
    image: 'https://example.com/character.png',
    text: 'The character performs a smooth dance move',
  },
  providerOptions: {
    klingai: {
      videoUrl: 'https://example.com/reference-motion.mp4',
      characterOrientation: 'image',
      mode: 'std',
      // Optional: reference element from element library (v3.0+, max 1)
      elementList: [{ element_id: 829836802793406551 }],
    } satisfies KlingAIVideoModelOptions,
  },
});
```

### Caller-Managed Callbacks

For text-to-video, image-to-video, multi-image-to-video, and motion control,
use `experimental_startVideo({ model, prompt, webhookUrl })` to register an
application-owned callback receiver. The SDK forwards `webhookUrl` as
`callback_url`, taking precedence over `providerOptions.klingai.callback_url`.
When `webhookUrl` is omitted, a raw `callback_url` is passed through unchanged.

KlingAI sends progress notifications (`task_status: 'submitted'` or
`'processing'`) as well as terminal notifications (`'succeed'` or `'failed'`).
Your receiver must filter progress notifications and correlate callbacks with
the task. Use `experimental_getVideoStatus(model, { operation })` with the
operation returned by `experimental_startVideo` to check status and retrieve
the result after a terminal notification.

These models deliberately do not expose `handleWebhookOption` because their
callback protocol requires a progress-aware receiver. Core
[`generateVideo({ webhook })`](/docs/reference/ai-sdk-core/generate-video)
falls back to polling without calling the webhook factory. Plain
`generateVideo()` also polls. Workflow's existing native webhook capability
check rejects these direct provider models for webhook-based generation;
use the explicit start/status flow for caller-managed callbacks.

### Video Provider Options

The following provider options are available via `providerOptions.klingai`. Options vary by mode — see the
[KlingAI Capability Map](https://app.klingai.com/global/dev/document-api/apiReference/model/skillsMap) for per-model support.

#### Common Options

- **mode** *'std' | 'pro'*

  Video generation mode. `'std'` is cost-effective. `'pro'` produces higher quality
  but takes longer.

- **pollIntervalMs** *number*

  Polling interval in milliseconds for checking task status. Defaults to 5000.

- **pollTimeoutMs** *number*

  Maximum wait time in milliseconds for video generation. Defaults to 600000 (10 minutes).

- **watermarkEnabled** *boolean*

  Whether to generate watermarked results simultaneously.

#### Text-to-Video and Image-to-Video Options

- **negativePrompt** *string*

  A description of what to avoid in the generated video (max 2500 characters).

- **sound** *'on' | 'off'*

  Whether to generate audio simultaneously. Only V2.6 and subsequent models support this, and requires `mode: 'pro'`.

- **cfgScale** *number*

  Flexibility in video generation. Higher values mean stronger prompt adherence. Range: \[0, 1]. Not supported by V2.x models.

- **cameraControl** *object*

  Camera movement control with a `type` preset (`'simple'`, `'down_back'`, `'forward_up'`, `'right_turn_forward'`, `'left_turn_forward'`) and optional `config` with `horizontal`, `vertical`, `pan`, `tilt`, `roll`, `zoom` values (range: \[-10, 10]).

- **multiShot** *boolean*

  Enable multi-shot video generation (Kling v3.0+). When true, the video is split into up to 6 storyboard shots with individual prompts and durations.

- **shotType** *'customize' | 'intelligence'*

  Storyboard method for multi-shot generation. `'customize'` uses `multiPrompt` for user-defined shots. `'intelligence'` lets the model auto-segment based on the main prompt. Required when `multiShot` is true.

- **multiPrompt** *Array\<\{index, prompt, duration}>*

  Per-shot details for multi-shot generation. Each shot has an `index` (number), `prompt` (string, max 512 characters), and `duration` (string, in seconds). Shot durations must sum to the total duration. Required when `multiShot` is true and `shotType` is `'customize'`.

- **voiceList** *Array\<\{voice\_id: string}>*

  Voice references for voice control (Kling v3.0+). Up to 2 voices. Reference via `<<<voice_1>>>` template syntax in the prompt. Requires `sound: 'on'`. Cannot coexist with `elementList` on the I2V endpoint.

#### Image-to-Video Only Options

- **imageTail** *string*

  End frame image for start+end frame control. Accepts an image URL or raw base64-encoded data. Requires `mode: 'pro'` for most models.

- **staticMask** *string*

  Static brush mask image for motion brush. Accepts an image URL or raw base64-encoded data.

- **dynamicMasks** *Array*

  Dynamic brush configurations for motion brush. Up to 6 groups, each with a `mask` (image URL or base64) and `trajectories` (array of `{x, y}` coordinates).

#### Image-to-Video and Motion Control Options

- **elementList** *Array\<\{element\_id: number}>*

  Reference elements for element control (Kling v3.0+). Supports video character elements and multi-image elements. Up to 3 elements for I2V (cannot coexist with `voiceList`). Up to 1 element for motion control.

#### Motion Control Only Options

- **videoUrl** *string* (required)

  URL of the reference motion video. Supports .mp4/.mov, max 100MB, duration 3–30 seconds.

- **characterOrientation** *'image' | 'video'* (required)

  Orientation of the characters in the generated video.
  `'image'` matches the reference image orientation (max 10s video).
  `'video'` matches the reference video orientation (max 30s video).

- **keepOriginalSound** *'yes' | 'no'*

  Whether to keep the original sound from the reference video. Defaults to `'yes'`.

Video generation is an asynchronous process that can take several minutes.
Consider setting `pollTimeoutMs` to at least 10 minutes (600000ms) for
reliable operation. Status polls trust the configured Kling AI API origin for
the first request and validate every redirect to another origin before
following it.

### Video Model Capabilities

#### Text-to-Video

| Model                   | Description                                           | Image Input | First Frame | Last Frame | Reference Images | Reference Video | Audio                                                     | Aspect Ratio | Resolution | Duration | FPS | Seed |
| ----------------------- | ----------------------------------------------------- | ----------- | ----------- | ---------- | ---------------- | --------------- | --------------------------------------------------------- | ------------ | ---------- | -------- | --- | ---- |
| `kling-v1-t2v`          | Original V1 model, supports camera control (std)      | ✗           | ✗           | ✗          | ✗                | ✗               | Conditional: Requires a sound-capable model and API mode. | ✓            | ✗          | ✓        | ✗   | ✗    |
| `kling-v1.6-t2v`        | V1.6 generation, std and pro                          | ✗           | ✗           | ✗          | ✗                | ✗               | Conditional: Requires a sound-capable model and API mode. | ✓            | ✗          | ✓        | ✗   | ✗    |
| `kling-v2-master-t2v`   | Master-quality generation                             | ✗           | ✗           | ✗          | ✗                | ✗               | Conditional: Requires a sound-capable model and API mode. | ✓            | ✗          | ✓        | ✗   | ✗    |
| `kling-v2.1-master-t2v` | High-quality generation, pro only                     | ✗           | ✗           | ✗          | ✗                | ✗               | Conditional: Requires a sound-capable model and API mode. | ✓            | ✗          | ✓        | ✗   | ✗    |
| `kling-v2.5-turbo-t2v`  | Optimized for speed, std and pro                      | ✗           | ✗           | ✗          | ✗                | ✗               | Conditional: Requires a sound-capable model and API mode. | ✓            | ✗          | ✓        | ✗   | ✗    |
| `kling-v2.6-t2v`        | V2.6, sound in pro mode                               | ✗           | ✗           | ✗          | ✗                | ✗               | Conditional: Requires a sound-capable model and API mode. | ✓            | ✗          | ✓        | ✗   | ✗    |
| `kling-v3.0-t2v`        | Latest v3.0, multi-shot, voice control, sound (3-15s) | ✗           | ✗           | ✗          | ✗                | ✗               | Conditional: Requires a sound-capable model and API mode. | ✓            | ✗          | ✓        | ✗   | ✗    |

#### Image-to-Video

| Model                   | Description                                                   | Image Input | First Frame | Last Frame                                                     | Reference Images | Reference Video | Audio                                                     | Aspect Ratio                                              | Resolution | Duration | FPS | Seed |
| ----------------------- | ------------------------------------------------------------- | ----------- | ----------- | -------------------------------------------------------------- | ---------------- | --------------- | --------------------------------------------------------- | --------------------------------------------------------- | ---------- | -------- | --- | ---- |
| `kling-v1-i2v`          | Original V1 model, end-frame and motion brush in std/pro      | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v1.5-i2v`        | V1.5 generation, end-frame and motion brush in pro            | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v1.6-i2v`        | V1.6 generation, end-frame in pro                             | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v2-master-i2v`   | Master-quality generation                                     | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v2.1-i2v`        | V2.1 generation, end-frame in pro                             | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v2.1-master-i2v` | High-quality generation, pro only                             | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v2.5-turbo-i2v`  | Optimized for speed, end-frame in pro                         | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v2.6-i2v`        | V2.6, sound and end-frame in pro mode                         | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |
| `kling-v3.0-i2v`        | Latest v3.0, multi-shot, element/voice control, sound (3-15s) | ✓           | ✓           | Conditional: Requires an end-frame-capable model and API mode. | ✓                | ✗               | Conditional: Requires a sound-capable model and API mode. | Conditional: Supported for multi-image-to-video requests. | ✗          | ✓        | ✗   | ✗    |

#### Motion Control

| Model                       | Description                                                  | Image Input | First Frame | Last Frame | Reference Images | Reference Video | Audio | Aspect Ratio | Resolution | Duration | FPS | Seed |
| --------------------------- | ------------------------------------------------------------ | ----------- | ----------- | ---------- | ---------------- | --------------- | ----- | ------------ | ---------- | -------- | --- | ---- |
| `kling-v2.6-motion-control` | Transfers motion from a reference video to a character image | ✓           | ✗           | ✗          | ✗                | ✗               | ✗     | ✗            | ✗          | ✗        | ✗   | ✗    |
| `kling-v3.0-motion-control` | Latest v3.0, enhanced facial consistency via element binding | ✓           | ✗           | ✗          | ✗                | ✗               | ✗     | ✗            | ✗          | ✗        | ✗   | ✗    |

You can also pass any available provider model ID as a string if needed.

## Provider Option Reference

The following option definitions are generated from the provider catalog.

| Operation | Option                 | Description                                                                                                                                                                                                                                                                                                                                              |
| --------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| video     | `mode`                 | Video generation mode. - `'std'`: Standard mode — cost-effective. - `'pro'`: Professional mode — higher quality but longer generation time.                                                                                                                                                                                                              |
| video     | `pollIntervalMs`       | Polling interval in milliseconds for checking task status. Default: 5000 (5 seconds).                                                                                                                                                                                                                                                                    |
| video     | `pollTimeoutMs`        | Maximum time in milliseconds to wait for video generation. Default: 600000 (10 minutes).                                                                                                                                                                                                                                                                 |
| video     | `negativePrompt`       | Negative text prompt to specify what to avoid. Cannot exceed 2500 characters.                                                                                                                                                                                                                                                                            |
| video     | `sound`                | Whether to generate sound simultaneously when generating videos. Only V2.6 and subsequent versions support this parameter, and requires `mode: 'pro'`.                                                                                                                                                                                                   |
| video     | `cfgScale`             | Flexibility in video generation. The higher the value, the lower the model's flexibility, and the stronger the relevance to the user's prompt. Value range: \[0, 1]. Kling-v2.x models do not support this parameter.                                                                                                                                    |
| video     | `cameraControl`        | Camera movement control. If not specified, the model will intelligently match based on the input text/images.                                                                                                                                                                                                                                            |
| video     | `imageTail`            | End frame image for I2V start+end frame control. Supports image URL or raw base64-encoded image data. Requires `mode: 'pro'` for most models.                                                                                                                                                                                                            |
| video     | `staticMask`           | Static brush mask image for I2V motion brush. Supports image URL or raw base64-encoded image data.                                                                                                                                                                                                                                                       |
| video     | `dynamicMasks`         | Dynamic brush configurations for I2V motion brush. Up to 6 groups, each with a mask and motion trajectories.                                                                                                                                                                                                                                             |
| video     | `multiShot`            | Enable multi-shot video generation (Kling v3.0+). When true, the video is split into up to 6 storyboard shots with individual prompts and durations. When multiShot is true with shotType 'customize', multiPrompt is required. When multiShot is true, the main prompt parameter is ignored by the API.                                                 |
| video     | `shotType`             | Storyboard method for multi-shot video generation (Kling v3.0+). Required when multiShot is true. - `'customize'`: User-defined shots via multiPrompt. - `'intelligence'`: Model auto-segments based on the main prompt.                                                                                                                                 |
| video     | `multiPrompt`          | Per-shot details for multi-shot video generation (Kling v3.0+). Required when multiShot is true and shotType is 'customize'. Up to 6 shots. Each shot has an index, prompt (max 512 chars), and duration in seconds. Shot durations must sum to the total duration.                                                                                      |
| video     | `elementList`          | Reference elements for element control (Kling v3.0+). Supports video character elements and multi-image elements. - I2V: Up to 3 reference elements. Cannot coexist with voiceList. - Motion Control: Currently only 1 element supported. When referencing an element, the generated video can only refer to the orientation of the person in the video. |
| video     | `voiceList`            | Voice references for voice control (Kling v3.0+). Up to 2 voice references. Referenced via `<<<voice_1>>>` template syntax in the prompt. When voiceList is used and the prompt references voice IDs, sound must be set to 'on'. Cannot coexist with elementList on the I2V endpoint.                                                                    |
| video     | `watermarkEnabled`     | Whether to generate watermarked results simultaneously.                                                                                                                                                                                                                                                                                                  |
| video     | `videoUrl`             | URL of the reference video. The character actions in the generated video are consistent with the reference video. Supports .mp4/.mov, max 100MB, side lengths 340px–3850px, duration 3–30 seconds (depends on `characterOrientation`).                                                                                                                   |
| video     | `characterOrientation` | Orientation of the characters in the generated video. - `'image'`: Same orientation as the person in the image. Reference video duration max 10 seconds. - `'video'`: Same orientation as the person in the video. Reference video duration max 30 seconds.                                                                                              |
| video     | `keepOriginalSound`    | Whether to keep the original sound of the reference video. Default: `'yes'`.                                                                                                                                                                                                                                                                             |

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)