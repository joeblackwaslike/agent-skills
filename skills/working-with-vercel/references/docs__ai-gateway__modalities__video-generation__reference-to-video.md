---
title: Reference-to-Video Generation
product: vercel
url: /docs/ai-gateway/modalities/video-generation/reference-to-video
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/reference-to-video"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/modalities/video-generation/image-to-video
  - /docs/vercel-blob
  - /docs/ai-gateway/modalities/video-generation/video-editing
  - /docs/ai-gateway/modalities/video-generation/video-extension
summary: Generate videos featuring characters from reference images or videos using Google Veo, KlingAI, Wan, Seedance, or Grok Imagine Video through AI...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/reference-to-video.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "71284abb18e611fe16291dfbd0c3bf3ac26d8dcd3faa9fb92564d25b1438c892"
---

# Reference-to-Video Generation

Generate a completely new video scene featuring characters from reference media.

This is different from [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video), which animates an existing image. With reference-to-video, the reference images only show the model what your characters look like. They don't become the video content. Instead, your prompt describes a completely new scene, and the model generates that scene from scratch with your characters in it.

For example, you could provide photos of a cat and a dog, then prompt "character1 and character2 have a conversation in a cafe." The model creates that cafe scene from scratch, using the reference images only to understand what the characters look like.

## Passing references

The provider-agnostic `inputReferences` field is the recommended way to pass references. It accepts an array of images or videos. Each entry is a URL, a base64-encoded string, or a `Buffer`, or an object that pairs the data with an explicit media type:

```typescript
inputReferences: [
  'https://example.com/cat.png',
  { data: 'https://example.com/scene.mp4', mediaType: 'video/mp4' },
];
```

Providers route each reference by its media type and treat untyped references as images. Use the object form with a `mediaType` (for example, `'video/mp4'`) to pass a video reference by URL, since providers can't infer the type from a bare URL. Providers that accept only image references ignore video references with a warning.

The syntax you use in the prompt to refer to each reference stays provider-specific:

| Provider | Prompt syntax | Reference types |
| -------- | ------------- | --------------- |
| Wan | `character1`, `character2`, … | Images and videos |
| Seedance 2.0 | `[Image 1]`, `[Video 1]`, … | Images and videos |
| Grok Imagine Video | `<IMAGE_1>`, `<IMAGE_2>`, … | Images only |
| KlingAI | None. Describe the scene directly in the prompt | Images only |
| Google Veo 3.1 | None. Describe how reference assets appear in the scene | Images only |

If you also pass `frameImages`, the model ignores `inputReferences` and emits a warning, since first and last frames take priority.

For Seedance multi-reference image generation on image-to-video models, see [Seedance multi-reference images](/docs/ai-gateway/modalities/video-generation/image-to-video#seedance-multi-reference-images).

## Google Veo

Veo 3.1 can incorporate reference images into a generated video. The references guide assets and style in the scene you describe in the prompt. They are not used as the first frame.

[Browse the latest Veo video models](/ai-gateway/models?capabilities=video-generation\&providers=vertex) on the AI Gateway Models page.

### Veo parameters

| Parameter                                 | Type          | Required | Description                                                                                    |
| ----------------------------------------- | ------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `prompt`                                  | `string`      | Yes      | Scene description for the generated video                                                      |
| `inputReferences`                         | `Array<image>` | No       | Reference images as base64-encoded strings or Buffers that guide assets and style in the scene. HTTPS URLs are not supported |
| `duration`                                | `4` | `6` | `8` | No   | Video length in seconds. Defaults to 8                                                         |
| `aspectRatio`                             | `string`      | No       | Aspect ratio (`'16:9'`, `'9:16'`). Defaults to `'16:9'`                                        |
| `resolution`                              | `string`      | No       | Resolution (`'720p'`, `'1080p'`). Defaults to `'720p'`                                         |
| `generateAudio`                           | `boolean`     | No       | Generate audio alongside the video                                                             |
| `providerOptions.vertex.referenceImages`  | `array`       | No       | Legacy alternative to `inputReferences`. Used when `inputReferences` is omitted                |
| `providerOptions.vertex.enhancePrompt`    | `boolean`     | No       | Use Gemini to enhance prompts. Defaults to `true`                                            |
| `providerOptions.vertex.negativePrompt`   | `string`      | No       | What to discourage in the generated video                                                      |
| `providerOptions.vertex.personGeneration` | `'dont_allow'` | `'allow_adult'` | `'allow_all'` | No | Whether to allow person generation. Defaults to `'allow_adult'` |
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

> **💡 Note:** Veo reference images must be base64-encoded strings or Buffers. An HTTPS URL
> reference is ignored with a warning.

If you omit `inputReferences`, you can still pass references through the legacy `providerOptions.vertex.referenceImages` key.

***

## KlingAI

KlingAI image-to-video models support reference-to-video when you pass `inputReferences`. The model combines the reference images into a new scene described by your prompt. Do not pass a separate start frame or `frameImages` alongside `inputReferences`.

[Browse the latest KlingAI video models](/ai-gateway/models?capabilities=video-generation\&providers=klingai) on the AI Gateway Models page.

### KlingAI parameters

| Parameter                                | Type               | Required | Description                                                                          |
| ---------------------------------------- | ------------------ | -------- | ------------------------------------------------------------------------------------ |
| `prompt`                                 | `string`           | Yes      | Scene description. Max 2500 characters.                                              |
| `inputReferences`                        | `Array<image>`     | No       | Reference images. URLs, base64 strings, or buffers. Passing them selects reference-to-video behavior. |
| `aspectRatio`                            | `string`           | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`). Defaults to `'16:9'`.                    |
| `duration`                               | `number`           | No       | Video length in seconds. 5 or 10 for v2.x, 3-15 for v3.0. Defaults to `5`.             |
| `providerOptions.klingai.mode`           | `'std'` | `'pro'` | No       | `'std'` for standard quality. `'pro'` for professional quality. Defaults to `'std'`. |
| `providerOptions.klingai.negativePrompt` | `string`           | No       | What to avoid in the video. Max 2500 characters.                                       |
| `providerOptions.klingai.cfgScale`       | `number`           | No       | Prompt adherence (0-1). Higher = stricter. Defaults to `0.5`. Not supported on v2.x. |
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
  model: 'klingai/kling-v2.6-i2v',
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

Wan's reference-to-video models can incorporate multiple characters from reference media into a generated video. References must be URLs (use [Vercel Blob](/docs/vercel-blob) for local files). Use `character1`, `character2`, etc. in your prompt to refer to each reference.

[Browse the latest Wan video models](/ai-gateway/models?capabilities=video-generation\&providers=alibaba) on the AI Gateway Models page.

### Wan parameters

| Parameter                                | Type                    | Required | Description                                                                                                                                                             |
| ---------------------------------------- | ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt`                                 | `string`                | Yes      | Scene description using `character1`, `character2`, etc. to reference each character                                                                                    |
| `inputReferences`                        | `Array<image \| video>` | No       | Reference images or videos. The first entry maps to `character1`, the second to `character2`, and so on. Supports 0-5 images and 0-3 videos, max 5 total                |
| `resolution`                             | `string`                | No       | `'1280x720'` or `'1920x1080'`                                                                                                                                           |
| `duration`                               | `number`                | No       | 2-10 seconds                                                                                                                                                            |
| `providerOptions.alibaba.referenceUrls`  | `string[]`              | No       | Legacy alternative to `inputReferences`. Array of reference URLs, used when `inputReferences` is omitted                                                                |
| `generateAudio`                          | `boolean`               | No       | Generate audio. Standard models default to `true`, flash models default to `false`                                                                                      |
| `providerOptions.alibaba.negativePrompt` | `string`                | No       | What to avoid in the video. Max 500 characters                                                                                                                          |
| `providerOptions.alibaba.shotType`       | `'single'` | `'multi'` | No       | `'single'` for continuous shot. `'multi'` for multiple camera angles                                                                                                    |
| `providerOptions.alibaba.watermark`      | `boolean`               | No       | Add watermark to the video. Defaults to `false`                                                                                                                         |
| `providerOptions.alibaba.pollIntervalMs` | `number`                | No       | How often to check task status. Defaults to `5000`                                                                                                                      |
| `providerOptions.alibaba.pollTimeoutMs`  | `number`                | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                                                                                                    |

### Wan example

```typescript filename="wan-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'alibaba/wan-v2.6-r2v',
  prompt: 'character1 and character2 have a friendly conversation in a cozy cafe',
  resolution: '1920x1080',
  duration: 4,
  // References can be images or videos
  inputReferences: [
    'https://example.com/cat.png',
    'https://example.com/dog.png',
  ],
  providerOptions: {
    alibaba: {
      shotType: 'single',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

If you omit `inputReferences`, you can still pass references through the legacy `providerOptions.alibaba.referenceUrls` key.

### Wan example with Vercel Blob

If you have local files, upload them to [Vercel Blob](/docs/vercel-blob) first:

```typescript filename="wan-reference-to-video-with-blob.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { put } from '@vercel/blob';
import fs from 'node:fs';

const catImage = fs.readFileSync('./cat.png');
const { url: catUrl } = await put('cat.png', catImage, { access: 'public' });

const dogImage = fs.readFileSync('./dog.png');
const { url: dogUrl } = await put('dog.png', dogImage, { access: 'public' });

const result = await generateVideo({
  model: 'alibaba/wan-v2.6-r2v',
  prompt: 'character1 and character2 play together in a sunny garden',
  resolution: '1280x720',
  duration: 4,
  inputReferences: [catUrl, dogUrl],
  providerOptions: {
    alibaba: {
      shotType: 'single',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## Grok Imagine Video

Grok Imagine Video can generate a new scene from reference images. The references guide visual elements in the output. They are not used as the first frame. Use `<IMAGE_1>`, `<IMAGE_2>`, and so on in your prompt to refer to each reference.

To edit or extend an existing video instead, see [Video editing](/docs/ai-gateway/modalities/video-generation/video-editing) and [Video extension](/docs/ai-gateway/modalities/video-generation/video-extension).

[Browse the latest Grok video models](/ai-gateway/models?capabilities=video-generation\&providers=xai) on the AI Gateway Models page.

> **💡 Note:** Reference-to-video requires `xai/grok-imagine-video`. Set
> `providerOptions.xai.mode: 'reference-to-video'`, or pass `inputReferences`
> alone to select reference-to-video mode automatically. Edit, extension, and
> reference-to-video modes are mutually exclusive.

### Grok parameters

| Parameter                                   | Type                      | Required | Description                                                                                       |
| ------------------------------------------- | ------------------------- | -------- | ------------------------------------------------------------------------------------------------- |
| `prompt`                                    | `string`                  | Yes      | Scene description. Use `<IMAGE_1>`, `<IMAGE_2>`, etc. to refer to each reference                    |
| `inputReferences`                           | `Array<image>`            | No       | Reference images. URLs or buffers. Passing them selects reference-to-video mode   |
| `duration`                                  | `number`                  | No       | Video length in seconds (1-15)                                                                      |
| `aspectRatio`                               | `string`                  | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`, and others)                                            |
| `providerOptions.xai.mode`                  | `'reference-to-video'`    | No       | Selects reference-to-video mode explicitly. Auto-selected when `inputReferences` is passed        |
| `providerOptions.xai.referenceImageUrls`    | `string[]`                | No       | Legacy alternative to `inputReferences`. Used when `inputReferences` is omitted                   |
| `providerOptions.xai.resolution`            | `'480p'` | `'720p'`      | No       | Video resolution. Defaults to `'480p'`                                                              |
| `providerOptions.xai.pollIntervalMs`        | `number`                  | No       | How often to check task status. Defaults to `5000`                                                  |
| `providerOptions.xai.pollTimeoutMs`         | `number`                  | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                              |

### Grok example

```typescript filename="grok-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'xai/grok-imagine-video',
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

Seedance 2.0 can generate a new scene from a mix of image and video references. Use `[Image 1]`, `[Image 2]`, and `[Video 1]`, `[Video 2]`, and so on in your prompt to refer to each reference, in the order you pass them.

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
| `providerOptions.bytedance.pollIntervalMs`  | `number`                | No       | How often to check task status. Defaults to `5000`                                                        |
| `providerOptions.bytedance.pollTimeoutMs`   | `number`                | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                                      |

### Seedance example

```typescript filename="seedance-reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-2.0',
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


---

[View full sitemap](/docs/sitemap)
