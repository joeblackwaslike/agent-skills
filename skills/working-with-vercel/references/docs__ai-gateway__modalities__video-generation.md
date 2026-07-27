---
title: Video Generation
product: vercel
url: /docs/ai-gateway/modalities/video-generation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/video-generation/text-to-video
  - /docs/ai-gateway/modalities/video-generation/image-to-video
  - /docs/ai-gateway/modalities/video-generation/reference-to-video
  - /docs/ai-gateway/modalities/video-generation/motion-control
  - /docs/ai-gateway/modalities/video-generation/video-editing
summary: Generate videos from text prompts, images, or video input using AI models through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation.md"
fetched_at: "2026-07-27T07:38:10.222Z"
sha256: "1bcd99e60a68654e9a2c7f4ae28d29a739dd0ce2798e250d2357f84e903ed194"
---

# Video Generation

> **💡 Note:** Video generation requires **AI SDK 6 or later** and uses the `experimental_generateVideo` function. This API is experimental and subject to change in future releases.

AI Gateway supports video generation, letting you create videos from text prompts, images, or video input. You can control resolution, duration, aspect ratio, and audio through a unified API across multiple providers.

To see all supported video models, use the **Video** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=video-generation).

## Capabilities

Some video models are tagged by capability in their model name. You can also see capability tags on the [AI Gateway Models page](/ai-gateway/models?capabilities=video-generation) or via the `/v1/models` endpoint, which is useful for models that support multiple capabilities:

| Tag              | Capability                                                                              | Description                                                         |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `t2v`            | [Text-to-video](/docs/ai-gateway/modalities/video-generation/text-to-video)           | Generate video from a text prompt                                   |
| `i2v`            | [Image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video)         | Animate a static image into a video                                 |
| `r2v`            | [Reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video) | Generate video featuring characters from reference images or videos |
| `motion-control` | [Motion control](/docs/ai-gateway/modalities/video-generation/motion-control)         | Transfer motion from a reference video onto a character image       |
| -                | [Video editing](/docs/ai-gateway/modalities/video-generation/video-editing)           | Edit existing videos using text prompts                             |
| -                | [Video extension](/docs/ai-gateway/modalities/video-generation/video-extension)       | Continue a video from its last frame                                |

For example, `klingai/kling-v2.6-t2v` is a text-to-video model, `alibaba/wan-v2.6-i2v` is an image-to-video model, and `bytedance/seedance-v1.5-pro` supports both text-to-video and image-to-video.

## Common parameters

These parameters work across all video models, though support varies by provider.

| Parameter         | Type                                     | Description                                                                                                                                        |
| ----------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt`          | `string` or `{ image, text }`            | Text description of the video. For image-to-video, use object format with `image` and `text`                                                       |
| `duration`        | `number`                                 | Video length in seconds. Supported range varies by model                                                                                           |
| `aspectRatio`     | `string`                                 | Aspect ratio as `{width}:{height}` (e.g., `'16:9'`, `'9:16'`)                                                                                      |
| `resolution`      | `string`                                 | Resolution as `{width}x{height}` (e.g., `'1920x1080'`, `'1280x720'`)                                                                               |
| `generateAudio`   | `boolean`                                | Whether to generate audio alongside the video. Support varies by model                                                                             |
| `frameImages`     | `Array<{ image, frameType }>`            | Role-tagged start and end frames for [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video). Support varies by provider     |
| `inputReferences` | `Array<image \| video>`                  | Reference images or videos for [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video). Support varies by provider   |

## Frame and reference images

`frameImages` and `inputReferences` are provider-agnostic, top-level fields for passing images and videos into video generation. Use them instead of learning each provider's own keys (like `providerOptions.klingai.imageTail` or `providerOptions.bytedance.referenceImages`). The exact behavior still varies by provider, so check the mode page for the model you use.

Use `frameImages` to control the start and end of an [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video) generation. Each entry pairs an image with a `frameType`:

```typescript
frameImages: [
  { image: 'https://example.com/start.png', frameType: 'first_frame' },
  { image: 'https://example.com/end.png', frameType: 'last_frame' },
];
```

The `image` accepts the same forms as `prompt.image`: a URL, a base64-encoded string, or a `Buffer`. Pass a single `first_frame` to animate from one image, or add a `last_frame` to transition between two. Veo, KlingAI, and Seedance honor `last_frame`; Grok Imagine Video and Wan ignore it with a warning. See the [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video) page for details.

Use `inputReferences` for [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video), where reference images or videos tell the model what your characters or objects look like while the prompt describes a new scene:

```typescript
inputReferences: [
  'https://example.com/character-1.png',
  'https://example.com/character-2.png',
];
```

Each entry is a URL, a base64-encoded string, or a `Buffer`. To pass a video reference by URL, use the object form with an explicit `mediaType`, since providers can't infer the type from a bare URL:

```typescript
inputReferences: [
  { data: 'https://example.com/scene.mp4', mediaType: 'video/mp4' },
];
```

Providers route each reference by its media type and treat untyped references as images. Wan and Seedance 2.0 accept video references; Veo, KlingAI, and Grok Imagine Video accept image references only and ignore video references with a warning.

The syntax you use in the prompt to refer to each reference stays provider-specific (for example, `character1` for Wan, `<IMAGE_1>` for Grok, or `[Image 1]` and `[Video 1]` for Seedance). KlingAI and Veo have no token syntax. Describe the scene directly. See the [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video) page for details.

Two precedence rules apply when fields overlap:

- A `first_frame` in `frameImages` takes priority over `prompt.image`.
- `frameImages` takes priority over `inputReferences`. If you pass both, the model ignores `inputReferences` and emits a warning.

Legacy `providerOptions` keys still work when you omit `frameImages` and `inputReferences`, so existing code keeps running unchanged.

## Saving videos

Video models return results in `result.videos`. Each video object contains:

- `uint8Array`: Raw video data as `Uint8Array`
- `base64`: Base64-encoded video data

```typescript filename="save-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: 'A serene mountain landscape at sunset',
  duration: 8,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

## Extending timeouts for Node.js

Video generation can take several minutes. In Node.js, the default `fetch` implementation (via Undici) enforces a 5-minute timeout. This can cause requests to fail before the video finishes generating.

To extend these timeouts, create a custom gateway instance with a longer Undici `Agent` timeout:

```typescript filename="lib/gateway.ts"
import { createGateway } from 'ai';
import { Agent } from 'undici';

export const gateway = createGateway({
  fetch: (url, init) =>
    fetch(url, {
      ...init,
      dispatcher: new Agent({
        headersTimeout: 15 * 60 * 1000, // 15 minutes
        bodyTimeout: 15 * 60 * 1000,
      }),
    } as RequestInit),
});
```

Then use the custom gateway instance:

```typescript filename="generate.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { gateway } from './lib/gateway';

const { videos } = await generateVideo({
  model: gateway.video('google/veo-3.1-generate-001'),
  prompt: 'A timelapse of a flower blooming',
  duration: 8,
});
```

### Global default provider

To use plain string model IDs with extended timeouts, set your custom gateway as the [global default provider](/docs/ai-gateway/models-and-providers#globally-for-all-requests-in-your-application). In a Next.js app, add this to `instrumentation.ts`:

```typescript filename="instrumentation.ts"
import { createGateway } from 'ai';
import { Agent } from 'undici';

export async function register() {
  globalThis.AI_SDK_DEFAULT_PROVIDER = createGateway({
    fetch: (url, init) =>
      fetch(url, {
        ...init,
        dispatcher: new Agent({
          headersTimeout: 15 * 60 * 1000,
          bodyTimeout: 15 * 60 * 1000,
        }),
      } as RequestInit),
  });
}
```


---

[View full sitemap](/docs/sitemap)
