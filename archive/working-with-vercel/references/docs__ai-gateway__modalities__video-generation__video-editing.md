---
title: AI Gateway Video Editing
product: vercel
url: /docs/ai-gateway/modalities/video-generation/video-editing
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-editing"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/modalities/video-generation
summary: Edit existing videos using text prompts with Grok Imagine Video or ByteDance Seedance, and enhance videos with Topaz, through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-editing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "cf4546ef5ef0facaede9d0bfb0c1885542f1fa42df782a9c8bac9a83f81e58ee"
---

# AI Gateway Video Editing

Edit existing videos using text prompts. Describe the changes you want and the model modifies the video accordingly. To upscale or restore a video without changing its content, see [Topaz](#topaz).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway)
- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway)
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation)
- [Grok Imagine Video 1.5 Lite on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-lite-on-ai-gateway)
- [AI Gateway Video Extension](https://vercel.com/docs/ai-gateway/modalities/video-generation/video-extension) — Extend existing videos from their last frame with Grok Imagine Video, FLUX 3, or ByteDance Seedance through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/video-editing.graph.md](/docs/ai-gateway/modalities/video-generation/video-editing.graph.md)
<!-- /docsgraph:related -->

Every model here also runs as a background job instead of one long-lived request. See [asynchronous generation](#asynchronous-generation) below.

## Grok Imagine Video

Grok Imagine Video (by SpaceXAI) can edit existing videos using text prompts. Provide a source video URL and describe the desired edits. Only `spacexai/grok-imagine-video` supports video editing. The 1.5 models do not.

[Browse the latest Grok video models](/ai-gateway/models?capabilities=video-generation\&providers=spacexai) on the AI Gateway Models page.

> **💡 Note:** Video editing output matches the input video's aspect ratio and resolution,
> capped at 720p. A 1080p input will be downsized to 720p. The `duration`,
> `aspectRatio`, and `resolution` parameters are not supported for editing.

### Grok parameters

| Parameter                                 | Type     | Required | Description                                          |
| ----------------------------------------- | -------- | -------- | ---------------------------------------------------- |
| `prompt`                                  | `string` | Yes      | Description of the edits to apply to the video       |
| `providerOptions.xai.videoUrl`            | `string` | Yes      | URL of the source video to edit                      |
| `providerOptions.xai.pollIntervalMs`      | `number` | No       | How often to check task status. Defaults to `5000`   |
| `providerOptions.xai.pollTimeoutMs`       | `number` | No       | Maximum wait time. Defaults to `600000` (10 minutes) |

### Grok example

```typescript filename="video-editing.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'spacexai/grok-imagine-video',
  prompt: 'Give the person sunglasses and a hat',
  providerOptions: {
    xai: {
      videoUrl: 'https://example.com/source-video.mp4',
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

> **💡 Note:** Video generation can take several minutes. Set `pollTimeoutMs` to at least 10
> minutes (600000ms) for reliable operation. Generated video URLs are ephemeral
> and should be downloaded promptly.

***

## ByteDance Seedance

Seedance 2.5 (`bytedance/seedance-2.5`) and its lower-cost variant, Seedance 2.5 Flash (`bytedance/seedance-2.5-flash`), can edit an existing video. Pass the source video as a video reference in `inputReferences` and describe the edit in your prompt, referring to the video as `[Video 1]`. To bring a new subject into the video, add image references and refer to them as `[Image 1]`, `[Image 2]`, and so on.

The source video must be an MP4 or MOV file at a URL, between 2 and 30 seconds long and no larger than 200 MB.

[Browse the latest Seedance video models](/ai-gateway/models?capabilities=video-generation\&providers=bytedance) on the AI Gateway Models page.

### Seedance parameters

| Parameter                                  | Type                                         | Required | Description                                                                                  |
| ------------------------------------------ | -------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| `prompt`                                   | `string`                                     | Yes      | Description of the edits. Use `[Video 1]`, `[Image 1]`, etc. to refer to each reference      |
| `inputReferences`                          | `Array<{ data: string; mediaType: string }>` | Yes      | The source video, plus any reference images. Tag each URL with an explicit `mediaType`       |
| `duration`                                 | `number`                                     | No       | Video length in seconds, from 4 to 30                                                        |
| `generateAudio`                            | `boolean`                                    | No       | Generate audio alongside the video                                                           |
| `providerOptions.bytedance.pollIntervalMs` | `number`                                     | No       | How often to check task status. Defaults to `3000`                                           |
| `providerOptions.bytedance.pollTimeoutMs`  | `number`                                     | No       | Maximum wait time. Defaults to `300000` (5 minutes)                                          |

### Seedance example

```typescript filename="seedance-video-editing.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-2.5',
  prompt:
    'Replace the cat in [Video 1] with the lion from [Image 1]. The lion lies down and gently interacts with the girl in a warm and tender way.',
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

***

## Topaz

Topaz Labs models enhance a video you already have. They upscale and restore the video, and they do not take a text prompt. Two models are available:

- `topaz/proteus`: Upscaling, denoising, and restoration that preserves the source's detail, with automatic adjustments or manual control over detail recovery, compression artifacts, noise, blur, and grain.
- `topaz/starlight-precise-2.6`: Generative upscaling and restoration that improves faces, textures, and fine details while keeping frames consistent over time.

Pass the input video through `inputReferences` with a video `mediaType`, and set the output size with `resolution`. Topaz models enhance the whole input video, so they ignore `prompt`, `duration`, `aspectRatio`, `generateAudio`, and `frameImages` with a warning. Pass an empty `prompt`. The output keeps the input's audio track unless you change `providerOptions.topaz.output.audioTransfer`.

[Browse the latest Topaz video models](/ai-gateway/models?capabilities=video-generation\&providers=topaz) on the AI Gateway Models page. For each model's tuning options, see the [Proteus](/ai-gateway/models/proteus) and [Starlight Precise 2.6](/ai-gateway/models/starlight-precise-2.6) model pages.

### Topaz parameters

| Parameter                       | Type                         | Required | Description                                                                                                                                                                                          |
| ------------------------------- | ---------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputReferences`               | `Array<{ data, mediaType }>` | Yes      | The video to enhance. Topaz uses the first video reference                                                                                                                                           |
| `resolution`                    | `string`                     | Yes      | Output size as `{width}x{height}` (for example, `'3840x2160'`). You can omit it when `providerOptions.topaz.source` or `providerOptions.topaz.output` sets the dimensions                             |
| `providerOptions.topaz.source`  | `object`                     | No       | Metadata about the input video: `width`, `height`, `duration` (seconds), and `frameRate`. Setting any of them requires all four. Required for `topaz/starlight-precise-2.6`                          |
| `providerOptions.topaz.output`  | `object`                     | No       | Output settings such as `width`, `height`, `frameRate`, `videoEncoder`, `container`, and `audioTransfer` (`'Copy'`, `'Convert'`, or `'None'`, defaults to `'Copy'`)                                   |

### Topaz example

```typescript filename="topaz-video-enhancement.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'topaz/proteus',
  prompt: '',
  inputReferences: [
    { data: 'https://example.com/source-video.mp4', mediaType: 'video/mp4' },
  ],
  resolution: '3840x2160',
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

`topaz/starlight-precise-2.6` also needs the input video's metadata:

```typescript filename="topaz-starlight.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'topaz/starlight-precise-2.6',
  prompt: '',
  inputReferences: [
    { data: 'https://example.com/source-video.mp4', mediaType: 'video/mp4' },
  ],
  resolution: '1920x1080',
  providerOptions: {
    topaz: {
      source: { width: 1280, height: 720, duration: 10, frameRate: 24 },
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

## Asynchronous generation

Pass a `webhook` factory and the SDK registers your URL with the job instead of polling for it. The factory returns that URL and a `received` promise it waits on, then it fetches the videos itself.

```typescript filename="async-video-editing.ts"
const result = await generateVideo({
  model: 'spacexai/grok-imagine-video',
  prompt: 'Give the person sunglasses and a hat',
  providerOptions: {
    xai: {
      // Already a hosted URL, which is what the asynchronous flow needs.
      videoUrl: 'https://example.com/source-video.mp4',
    },
  },
  webhook: async () => ({
    url: callbackUrl,
    received: waitForDelivery(token),
  }),
  poll: { timeoutMs: 10 * 60 * 1000 },
});
```

The start request AI Gateway persists is capped at 300 KiB, so pass your source video as a hosted URL on this flow rather than inline data.

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
