---
title: AI Gateway Reference-to-Video Generation
product: vercel
url: /docs/ai-gateway/modalities/video-generation/reference-to-video
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/reference-to-video"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/modalities/video-generation/image-to-video
  - /docs/vercel-blob
  - /docs/ai-gateway/modalities/video-generation/video-editing
  - /docs/ai-gateway/modalities/video-generation/video-extension
  - /docs/ai-gateway/modalities/video-generation
summary: Generate videos featuring characters from reference images or videos using Google Veo, KlingAI, Wan, Seedance, Grok Imagine Video, MiniMax H3, or...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/reference-to-video.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "212439900d77a5639108d349b79d317678e12d3668abf1cbc77082019c853152"
---

# AI Gateway Reference-to-Video Generation

Generate a completely new video scene featuring characters from reference media.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway)
- [Alibaba](https://ai-sdk.dev/providers/ai-sdk-providers/alibaba) — Learn how to use Alibaba with AI Gateway and the direct provider.
- [Wan models on AI Gateway](https://vercel.com/changelog/wan-models-on-ai-gateway)
- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway)
- [AI Gateway Text-to-Video Generation](https://vercel.com/docs/ai-gateway/modalities/video-generation/text-to-video) — Generate videos from text prompts using Google Veo, KlingAI, Wan, Grok Imagine Video, ByteDance Seedance, MiniMax H3, FL
- [Kling AI](https://ai-sdk.dev/providers/ai-sdk-providers/klingai) — Learn how to use Kling AI with AI Gateway and the direct provider.
- [Tencent Cloud](https://ai-sdk.dev/providers/ai-sdk-providers/tencent) — Learn how to use Tencent Cloud TokenHub and VOD models with the AI SDK.
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation) — Learn how to generate videos with the AI SDK.
- [Grok Imagine Video 1.5 on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-on-ai-gateway)
- [Kling video models on AI Gateway](https://vercel.com/changelog/kling-video-models-on-ai-gateway)

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/reference-to-video.graph.md](/docs/ai-gateway/modalities/video-generation/reference-to-video.graph.md)
<!-- /docsgraph:related -->

Every model here also runs as a background job instead of one long-lived request. See [asynchronous generation](#asynchronous-generation) below.

This is different from [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video), which animates an existing image. With reference-to-video, the reference images only show the model what your characters look like. They don't become the video content. Instead, your prompt describes a completely new scene, and the model generates that scene from scratch with your characters in it.

For example, you could provide photos of a cat and a dog, then prompt "Image 1 and Image 2 have a conversation in a cafe." The model creates that cafe scene from scratch, using the reference images only to understand what the characters look like.

## Passing references

The provider-agnostic `inputReferences` field is the recommended way to pass references. It accepts an array of images or videos. Each entry is a URL, a base64-encoded string, or a `Buffer`, or an object that pairs the data with an explicit media type:

```typescript
inputReferences: [
  'https://example.com/cat.png',
  { data: 'https://example.com/scene.mp4', mediaType: 'video/mp4' },
];
```

Most providers route each reference by its media type and treat untyped references as images. Use the object form with a `mediaType` (for example, `'video/mp4'`) to pass a video reference by URL, since providers can't infer the type from a bare URL. Providers that accept only image references ignore video references with a warning.

The syntax you use in the prompt to refer to each reference stays provider-specific:

| Provider | Prompt syntax | Reference types |
| -------- | ------------- | --------------- |
| Wan 3.0 and Wan 2.7 | `Image 1`, `Video 1`, … | Images and videos |
| Wan 2.6 | `character1`, `character2`, … | Images and videos |
| Seedance 2.x series | `[Image 1]`, `[Video 1]`, … | Images and videos |
| MiniMax H3 | `Image 1`, `Video 1`, … | Images and videos |
| Grok Imagine Video | `<IMAGE_1>`, `<IMAGE_2>`, … | Images only |
| KlingAI | None. Describe the scene directly in the prompt | Images only |
| Google Veo 3.1 | None. Describe how reference assets appear in the scene | Images only |

If you also pass `frameImages`, the model ignores `inputReferences` and emits a warning, since first and last frames take priority. Wan 3.0 and HeyGen Video reject the request instead.

For Seedance multi-reference image generation on image-to-video models, see [Seedance multi-reference images](/docs/ai-gateway/modalities/video-generation/image-to-video#seedance-multi-reference-images).

## Google Veo

Veo 3.1 can incorporate up to three reference images into a generated video. Use `google/veo-3.1-generate-001` or `google/veo-3.1-fast-generate-001`. The references guide assets and style in the scene you describe in the prompt. They are not used as the first frame.

[Browse the latest Veo video models](/ai-gateway/models?capabilities=video-generation\&providers=vertex) on the AI Gateway Models page.

### Veo parameters

| Parameter                                 | Type          | Required | Description                                                                                    |
| ----------------------------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `prompt`                                  | `string`      | Yes      | Scene description for the generated video                                                      |
| `inputReferences`                         | `Array<image>` | No       | Reference images as HTTPS URLs, base64-encoded strings, or Buffers that guide assets and style in the scene |
| `duration`                                | `4` \| `6` \| `8` | No   | Video length in seconds. Defaults to 8                                                         |
| `aspectRatio`                             | `string`      | No       | Aspect ratio (`'16:9'`, `'9:16'`). Defaults to `'16:9'`                                        |
| `resolution`                              | `string`      | No       | Resolution (`'1280x720'` for 720p, `'1920x1080'` for 1080p, `'3840x2160'` for 4K). Defaults to 720p                   |
| `generateAudio`                           | `boolean`     | No       | Generate audio alongside the video                                                             |
| `providerOptions.vertex.referenceImages`  | `array`       | No       | Legacy alternative to `inputReferences`. Used when `inputReferences` is omitted                |
| `providerOptions.vertex.enhancePrompt`    | `boolean`     | No       | Use Gemini to enhance prompts. Defaults to `true`                                            |
| `providerOptions.vertex.negativePrompt`   | `string`      | No       | What to discourage in the generated video                                                      |
| `providerOptions.vertex.personGeneration` | `'dont_allow'` \| `'allow_adult'` \| `'allow_all'` | No | Whether to allow person generation. Defaults to `'allow_adult'` |
| `providerOptions.vertex.pollIntervalMs`   | `number`      | No       | How often to check task status. Defaults to `5000`                                             |
| `providerOptions.vertex.pollTimeoutMs`    | `number`      | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                           |

### Veo example

```typescript filename="veo-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt:
    'The video opens with a medium shot of a woman in a high-fashion flamingo dress walking through a lagoon',
  inputReferences: [
    fs.readFileSync('dress.png'),
    fs.readFileSync('glasses.png'),
    fs.readFileSync('woman.png'),
  ],
  duration: 8,
  aspectRatio: '16:9',
  generateAudio: true,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

> **💡 Note:** Veo reference images can be HTTPS URLs, base64-encoded strings, or Buffers.
> AI Gateway downloads each URL reference before it sends the request to Veo,
> so make sure the URL is publicly reachable over HTTPS. URLs that start with `https://storage.googleapis.com/` are the exception: AI Gateway does not download them, and Veo ignores them with a warning. Pass those images as base64-encoded strings or Buffers.

If you omit `inputReferences`, you can still pass references through the legacy `providerOptions.vertex.referenceImages` key.

***

## KlingAI

`klingai/kling-v3.0-i2v` supports reference-to-video when you pass `inputReferences`. The model combines the reference images into a new scene described by your prompt. Do not pass a separate start frame or `frameImages` alongside `inputReferences`.

[Browse the latest KlingAI video models](/ai-gateway/models?capabilities=video-generation\&providers=klingai) on the AI Gateway Models page.

### KlingAI parameters

| Parameter                                | Type               | Required | Description                                                                          |
| ---------------------------------------- | ------------------ | -------- | ------------------------------------------------------------------------------------ |
| `prompt`                                 | `string`           | Yes      | Scene description. Max 2500 characters.                                              |
| `inputReferences`                        | `Array<image>`     | No       | Reference images. URLs, base64 strings, or buffers. Passing them selects reference-to-video behavior. |
| `aspectRatio`                            | `string`           | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`). Defaults to `'16:9'`.                    |
| `duration`                               | `number`           | No       | Video length in seconds, from 3 to 15. Defaults to `5`.                                |
| `providerOptions.klingai.mode`           | `'std'` \| `'pro'` | No       | `'std'` for standard quality. `'pro'` for professional quality. Defaults to `'std'`. |
| `providerOptions.klingai.negativePrompt` | `string`           | No       | What to avoid in the video. Max 2500 characters.                                       |
| `providerOptions.klingai.cfgScale`       | `number`           | No       | Prompt adherence (0-1). Higher = stricter. Defaults to `0.5`.                        |
| `providerOptions.klingai.pollIntervalMs` | `number`           | No       | How often to check task status. Defaults to `5000`.                                    |
| `providerOptions.klingai.pollTimeoutMs`  | `number`           | No       | Maximum wait time. Defaults to `600000` (10 minutes).                                  |

> **💡 Note:** Reference-to-video on KlingAI does not support `prompt.image`, `frameImages`,
> or `providerOptions.klingai.imageTail`. Pass all guidance images through
> `inputReferences` instead.

### KlingAI example

```typescript filename="klingai-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v3.0-i2v',
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
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## Wan

Wan (by Alibaba) can incorporate multiple characters from reference images and videos into a generated video. The current models are `alibaba/wan-v3.0-video` and `alibaba/wan-v3.0-video-prime`. A Wan 3.0 model runs reference-to-video when you pass `inputReferences`. The earlier reference-to-video models are `alibaba/wan-v2.7-r2v`, `alibaba/wan-v2.6-r2v`, and `alibaba/wan-v2.6-r2v-flash`.

Reference handling differs by version:

- **Wan 3.0**: Accepts up to 10 reference images and 5 reference videos, and generates 2 to 30 seconds. Refer to each reference as `Image 1`, `Video 1`, and so on, counted separately for images and videos in the order you pass them.
- **Wan 2.7**: Accepts up to 5 references in total, with at most 3 videos. Uses the same `Image 1` and `Video 1` prompt syntax as Wan 3.0.
- **Wan 2.6**: Accepts up to 5 references in total, with at most 3 videos. Refer to each reference as `character1`, `character2`, and so on. Wan 2.6 takes `resolution` only and ignores `aspectRatio` with a warning.

Wan 3.0 and Wan 2.7 accept reference images as URLs, base64 strings, or Buffers. Wan 2.6 requires URLs for every reference, and every Wan model requires URLs for video references (use [Vercel Blob](/docs/vercel-blob) for local files). Wan 3.0 and Wan 2.7 treat a URL reference as a video when the URL ends in `.mp4` or `.mov`.

[Browse the latest Wan video models](/ai-gateway/models?capabilities=video-generation\&providers=alibaba) on the AI Gateway Models page.

### Wan parameters

| Parameter                                | Type                    | Required | Description                                                                                                                                                             |
| ---------------------------------------- | ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt`                                 | `string`                | Yes      | Scene description that refers to each reference (`Image 1` and `Video 1` on Wan 3.0 and Wan 2.7, `character1` on Wan 2.6)                                               |
| `inputReferences`                        | `Array<image \| video>` | No       | Reference images or videos, in the order your prompt refers to them                                                                                                     |
| `aspectRatio`                            | `string`                | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`, `'4:3'`, `'3:4'`). Wan 3.0 and Wan 2.7 only                                                                                  |
| `resolution`                             | `string`                | No       | `'1280x720'` or `'1920x1080'`. Wan 3.0 also supports `'832x480'`                                                                                                        |
| `duration`                               | `number`                | No       | Wan 3.0: 2 to 30 seconds. Wan 2.7 and Wan 2.6: 2 to 10 seconds                                                                                                          |
| `providerOptions.alibaba.referenceUrls`  | `string[]`              | No       | Legacy alternative to `inputReferences` on Wan 2.6. Array of reference URLs, used when `inputReferences` is omitted                                                     |
| `generateAudio`                          | `boolean`               | No       | Generate audio. Wan 3.0 and standard Wan 2.6 models default to `true`, flash models default to `false`. Wan 2.7 always generates audio and ignores this option with a warning |
| `providerOptions.alibaba.negativePrompt` | `string`                | No       | What to avoid in the video. Max 500 characters                                                                                                                          |
| `providerOptions.alibaba.shotType`       | `'single'` \| `'multi'` | No       | `'single'` for continuous shot. `'multi'` for multiple camera angles. Wan 2.6 only                                                                                      |
| `providerOptions.alibaba.watermark`      | `boolean`               | No       | Add watermark to the video. Defaults to `false`                                                                                                                         |
| `providerOptions.alibaba.pollIntervalMs` | `number`                | No       | How often to check task status. Defaults to `5000`                                                                                                                      |
| `providerOptions.alibaba.pollTimeoutMs`  | `number`                | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                                                                                                    |

### Wan example

```typescript filename="wan-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'alibaba/wan-v3.0-video',
  prompt: 'Image 1 and Image 2 have a friendly conversation in a cozy cafe',
  aspectRatio: '16:9',
  resolution: '1920x1080',
  duration: 4,
  // References can be images or videos
  inputReferences: [
    'https://example.com/cat.png',
    'https://example.com/dog.png',
  ],
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

On Wan 2.6, if you omit `inputReferences`, you can still pass references through the legacy `providerOptions.alibaba.referenceUrls` key.

### Wan example with Vercel Blob

Wan 2.6 requires a URL for every reference, and every Wan model requires a URL for video references. If you have local files, upload them to [Vercel Blob](/docs/vercel-blob) first:

```typescript filename="wan-reference-to-video-with-blob.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { put } from '@vercel/blob';
import fs from 'node:fs';

const catImage = fs.readFileSync('./cat.png');
const { url: catUrl } = await put('cat.png', catImage, { access: 'public' });

const dogImage = fs.readFileSync('./dog.png');
const { url: dogUrl } = await put('dog.png', dogImage, { access: 'public' });

const result = await generateVideo({
  model: 'alibaba/wan-v3.0-video',
  prompt: 'Image 1 and Image 2 play together in a sunny garden',
  resolution: '1280x720',
  duration: 4,
  inputReferences: [catUrl, dogUrl],
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## Grok Imagine Video

Grok Imagine Video can generate a new scene from reference images. The references guide visual elements in the output. They are not used as the first frame. Use `<IMAGE_1>`, `<IMAGE_2>`, and so on in your prompt to refer to each reference.

To edit or extend an existing video instead, see [Video editing](/docs/ai-gateway/modalities/video-generation/video-editing) and [Video extension](/docs/ai-gateway/modalities/video-generation/video-extension).

[Browse the latest Grok video models](/ai-gateway/models?capabilities=video-generation\&providers=spacexai) on the AI Gateway Models page.

The model ID starts with `spacexai/`, but the provider options key is `xai`. Set Grok video options under `providerOptions.xai`.

> **💡 Note:** Reference-to-video requires `spacexai/grok-imagine-video-1.5` or
> `spacexai/grok-imagine-video`. Set `providerOptions.xai.mode:
>   'reference-to-video'`, or pass `inputReferences` alone to select
> reference-to-video mode automatically. Edit, extension, and
> reference-to-video modes are mutually exclusive.

### Grok parameters

| Parameter                                     | Type                   | Required | Description                                                                                |
| --------------------------------------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------ |
| `prompt`                                      | `string`               | Yes      | Scene description. Use `<IMAGE_1>`, `<IMAGE_2>`, etc. to refer to each reference           |
| `inputReferences`                             | `Array<image>`         | No       | Reference images. URLs or buffers. Passing them selects reference-to-video mode            |
| `duration`                                    | `number`               | No       | Video length in seconds (1-15)                                                             |
| `aspectRatio`                                 | `string`               | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`, and others)                                     |
| `providerOptions.xai.mode`                    | `'reference-to-video'` | No       | Selects reference-to-video mode explicitly. Auto-selected when `inputReferences` is passed |
| `providerOptions.xai.referenceImageUrls`      | `string[]`             | No       | Legacy alternative to `inputReferences`. Used when `inputReferences` is omitted            |
| `providerOptions.xai.resolution`              | `'480p'` \| `'720p'`   | No       | Video resolution. Defaults to `'480p'`. Reference-to-video is limited to 720p, so a `'1080p'` request is downgraded with a warning |
| `providerOptions.xai.pollIntervalMs`          | `number`               | No       | How often to check task status. Defaults to `5000`                                         |
| `providerOptions.xai.pollTimeoutMs`           | `number`               | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                       |

### Grok example

```typescript filename="grok-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'spacexai/grok-imagine-video-1.5',
  prompt:
    'The comic cat from <IMAGE_1> and the comic dog from <IMAGE_2> ' +
    'are having a playful chase through a sunlit park. ' +
    'Cinematic slow-motion, warm afternoon light.',
  inputReferences: [
    'https://example.com/comic-cat.png',
    'https://example.com/comic-dog.png',
  ],
  duration: 8,
  aspectRatio: '16:9',
  providerOptions: {
    xai: {
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

If you omit `inputReferences`, you can still pass references through `providerOptions.xai.referenceImageUrls` with `providerOptions.xai.mode: 'reference-to-video'`.

> **💡 Note:** Video generation can take several minutes. Set `pollTimeoutMs` to at least 10
> minutes (600000ms) for reliable operation.

***

## ByteDance Seedance

The Seedance 2.x series can generate a new scene from a mix of image and video references. Use `[Image 1]`, `[Image 2]`, and `[Video 1]`, `[Video 2]`, and so on in your prompt to refer to each reference, in the order you pass them. Pass references as URLs.

Reference limits differ by model:

- **Seedance 2.5** (`bytedance/seedance-2.5`): Up to 30 images and 10 videos.
- **Seedance 2.5 Flash** (`bytedance/seedance-2.5-flash`): Up to 10 images and 5 videos.
- **Seedance 2.0 family** (`bytedance/seedance-2.0`, `bytedance/seedance-2.0-fast`, and `bytedance/seedance-2.0-mini`): Up to 9 images and 3 videos.

Seedance 2.5 and Seedance 2.5 Flash also use video references for [video editing](/docs/ai-gateway/modalities/video-generation/video-editing#bytedance-seedance) and [video extension](/docs/ai-gateway/modalities/video-generation/video-extension#bytedance-seedance).

[Browse the latest Seedance video models](/ai-gateway/models?capabilities=video-generation\&providers=bytedance) on the AI Gateway Models page.

> **💡 Note:** Seedance requires an explicit `mediaType` on URL references to route them as
> images or videos. An untyped URL reference is treated as an image and emits a
> warning.

### Seedance parameters

| Parameter                                   | Type                    | Required | Description                                                                                              |
| ------------------------------------------- | ----------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `prompt`                                    | `string`                | Yes      | Scene description. Use `[Image 1]`, `[Video 1]`, etc. to refer to each reference                          |
| `inputReferences`                           | `Array<image \| video>` | No       | Reference images and videos. Tag each URL reference with an explicit `mediaType`                          |
| `aspectRatio`                               | `string`                | No       | Aspect ratio (e.g., `'16:9'`, `'9:16'`)                                                                   |
| `duration`                                  | `number`                | No       | Video length in seconds                                                                                    |
| `generateAudio`                             | `boolean`               | No       | Generate audio alongside the video                                                                         |
| `providerOptions.bytedance.referenceImages` | `string[]`              | No       | Legacy alternative to `inputReferences` for image reference URLs. Used when `inputReferences` is omitted   |
| `providerOptions.bytedance.referenceVideos` | `string[]`              | No       | Legacy alternative to `inputReferences` for video reference URLs. Used when `inputReferences` is omitted   |
| `providerOptions.bytedance.pollIntervalMs`  | `number`                | No       | How often to check task status. Defaults to `3000`                                                        |
| `providerOptions.bytedance.pollTimeoutMs`   | `number`                | No       | Maximum wait time. Defaults to `300000` (5 minutes)                                                       |

### Seedance example

```typescript filename="seedance-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-2.5',
  prompt:
    'Replace the cat in [Video 1] with the lion from [Image 1]. The lion lies down and gently interacts with the girl in a warm and tender way.',
  aspectRatio: '16:9',
  duration: 12,
  inputReferences: [
    { data: 'https://example.com/lion.jpg', mediaType: 'image/jpeg' },
    { data: 'https://example.com/cat-video.mp4', mediaType: 'video/mp4' },
  ],
  generateAudio: true,
  providerOptions: {
    bytedance: {
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

If you omit `inputReferences`, you can still pass references through the legacy `providerOptions.bytedance.referenceImages` and `providerOptions.bytedance.referenceVideos` keys.

***

## MiniMax

`minimax/minimax-h3` can generate a new scene from up to 9 reference images and 3 reference videos. Refer to each reference by type and order in your prompt: `Image 1`, `Image 2`, `Video 1`, and so on. `minimax/minimax-h3-max` does not support references and ignores them with a warning.

[Browse the latest MiniMax video models](/ai-gateway/models?capabilities=video-generation\&providers=minimax) on the AI Gateway Models page.

> **💡 Note:** MiniMax H3 requires an explicit `mediaType` on URL references to route them
> as images or videos. An untyped URL reference is treated as an image and
> emits a warning.

### MiniMax parameters

| Parameter                                   | Type                           | Required | Description                                                                                                                 |
| ------------------------------------------- | ------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `prompt`                                    | `string`                       | Yes      | Scene description. Use `Image 1`, `Video 1`, etc. to refer to each reference                                                |
| `inputReferences`                           | `Array<image \| video>`        | No       | Reference images and videos. Tag each URL reference with an explicit `mediaType`                                            |
| `aspectRatio`                               | `string`                       | No       | Aspect ratio (`'21:9'`, `'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`)                                                      |
| `duration`                                  | `number`                       | No       | Video length in whole seconds, from 4 to 15. Defaults to 5                                                                  |
| `providerOptions.minimax.referenceAudioUrls` | `string[]`                    | No       | Up to 3 reference audio URLs. Requires at least one reference image or video                                                |
| `providerOptions.minimax.resolution`        | `'768P'` \| `'2K'`             | No       | Resolution tier. Defaults to `'2K'`                                                                                         |
| `providerOptions.minimax.pollIntervalMs`    | `number`                       | No       | How often to check task status. Defaults to `10000`                                                                         |
| `providerOptions.minimax.pollTimeoutMs`     | `number`                       | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                                                        |

### MiniMax example

```typescript filename="minimax-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'minimax/minimax-h3',
  prompt:
    'Image 1 and Image 2 chase each other through a sunlit park. ' +
    'Follow the camera motion of Video 1.',
  inputReferences: [
    { data: 'https://example.com/cat.png', mediaType: 'image/png' },
    { data: 'https://example.com/dog.png', mediaType: 'image/png' },
    { data: 'https://example.com/camera-move.mp4', mediaType: 'video/mp4' },
  ],
  aspectRatio: '16:9',
  duration: 5,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## HeyGen

HeyGen Video (`heygen/heygen-video-1`) can generate a new scene from reference images, videos, and audio. A request accepts up to 9 images, 3 videos, and 3 audio references, with a maximum of 12 references in total and at least one image or video.

[Browse the latest HeyGen video models](/ai-gateway/models?capabilities=video-generation\&providers=heygen) on the AI Gateway Models page.

> **💡 Note:** HeyGen Video requires an image, video, or audio `mediaType` on every
> reference. A request with an untyped reference fails with an error.

### HeyGen parameters

| Parameter                           | Type                                        | Required | Description                                                                                               |
| ----------------------------------- | ------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `prompt`                            | `string`                                    | Yes      | Scene description. 1 to 32,000 characters                                                                 |
| `inputReferences`                   | `Array<{ data, mediaType }>`                | Yes      | Reference images, videos, and audio. URL references must use HTTPS                                        |
| `aspectRatio`                       | `string`                                    | No       | Aspect ratio (`'21:9'`, `'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`)                                    |
| `duration`                          | `number`                                    | No       | Video length in whole seconds, from 5 to 15. Defaults to 5                                                |
| `providerOptions.heygen.resolution` | `'480p'` \| `'768p'` \| `'1080p'` \| `'2k'` | No       | Output size class. Defaults to `'768p'`. `'1080p'` and `'2k'` require a `'16:9'` or `'9:16'` aspect ratio |

### HeyGen example

```typescript filename="heygen-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'heygen/heygen-video-1',
  prompt: 'The two characters share a pot of tea in a cozy cafe',
  inputReferences: [
    { data: 'https://example.com/cat.png', mediaType: 'image/png' },
    { data: 'https://example.com/dog.png', mediaType: 'image/png' },
  ],
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    heygen: {
      resolution: '768p',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

## Asynchronous generation

Pass a `webhook` factory and the SDK registers your URL with the job instead of polling for it. The factory returns that URL and a `received` promise it waits on, then it fetches the videos itself.

```typescript filename="async-reference-to-video.ts"
const result = await generateVideo({
  model: 'alibaba/wan-v3.0-video',
  prompt: 'Image 1 and Image 2 have a friendly conversation in a cozy cafe',
  duration: 4,
  // Hosted URLs, not inline bytes: the start request is capped at 300 KiB.
  inputReferences: [
    'https://example.com/cat.png',
    'https://example.com/dog.png',
  ],
  webhook: async () => ({
    url: callbackUrl,
    received: waitForDelivery(token),
  }),
  poll: { timeoutMs: 10 * 60 * 1000 },
});
```

The start request AI Gateway persists is capped at 300 KiB, so pass your references as a hosted URL on this flow rather than inline data.

`token`, `callbackUrl`, and `waitForDelivery` come from [webhook-driven completion](/docs/ai-gateway/modalities/video-generation#webhook-driven-completion), which also covers the receiver, signature verification, and the payload shape.

***

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
