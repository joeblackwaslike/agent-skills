---
title: Video Extension
product: vercel
url: /docs/ai-gateway/modalities/video-generation/video-extension
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-extension"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/modalities/video-generation/video-editing
summary: Extend existing videos from their last frame with Grok Imagine Video through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-extension.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "89d068b9a63f59d2f9944f7e56216c4015c4ec3dfe4fb84c6189eac9e53c109a"
---

# Video Extension

Continue an existing video from its last frame. Describe what happens next and the model generates new footage that picks up where the source video left off.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation?from=related)
- [ByteDance](https://ai-sdk.dev/providers/ai-sdk-providers/bytedance?from=related)
- [Black Forest Labs](https://ai-sdk.dev/providers/ai-sdk-providers/black-forest-labs?from=related)
- [experimental_generateVideo](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-video?from=related)
- [Kling AI](https://ai-sdk.dev/providers/ai-sdk-providers/klingai?from=related)
- [Video / Async Video](https://vercel.com/docs/ai-gateway/getting-started/video?from=related) — Generate videos from text prompts, images, or video input using AI Gateway, either over a single request or as a backgro
- [Text-to-Video](https://vercel.com/docs/ai-gateway/modalities/video-generation/text-to-video?from=related) — Generate videos from text prompts using Google Veo, KlingAI, Wan, Grok Imagine Video, or ByteDance Seedance through AI G
- [Reference-to-Video](https://vercel.com/docs/ai-gateway/modalities/video-generation/reference-to-video?from=related) — Generate videos featuring characters from reference images or videos using Google Veo, KlingAI, Wan, Seedance, or Grok I
- [Image-to-Video](https://vercel.com/docs/ai-gateway/modalities/video-generation/image-to-video?from=related) — Animate static images into videos using Google Veo, KlingAI, Wan, Grok Imagine Video, or ByteDance Seedance through AI G
- [Motion Control](https://vercel.com/docs/ai-gateway/modalities/video-generation/motion-control?from=related) — Transfer motion from a reference video to a character image using KlingAI through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/video-extension.graph.md](/docs/ai-gateway/modalities/video-generation/video-extension.graph.md)
<!-- /docsgraph:related -->

## Grok Imagine Video

Grok Imagine Video (by SpaceXAI) can extend existing videos using text prompts. Provide a source video URL and describe the scene that continues from the last frame.

To edit an existing video instead of extending it, see [Video editing](/docs/ai-gateway/modalities/video-generation/video-editing).

[Browse the latest Grok video models](/ai-gateway/models?providers=xai\&capabilities=video-generation) on the AI Gateway Models page.

Only `xai/grok-imagine-video` supports extension. The `xai/grok-imagine-video-1.5` and `xai/grok-imagine-video-1.5-preview` models support image-to-video only.

> **💡 Note:** Extension requires `providerOptions.xai.mode: 'extend-video'`. Setting `videoUrl`
> alone triggers [video editing](/docs/ai-gateway/modalities/video-generation/video-editing)
> mode, not extension.

### Grok parameters

| Parameter                            | Type               | Required | Description                                                                          |
| ------------------------------------ | ------------------ | -------- | ------------------------------------------------------------------------------------ |
| `prompt`                             | `string`           | Yes      | Prompt describing what should happen next in the video                               |
| `duration`                           | `number`           | No       | Length of the extension segment only, not total output (1 to 10 seconds). Defaults to 6 |
| `providerOptions.xai.mode`           | `'extend-video'`   | Yes      | Routes the request to video extension instead of editing                             |
| `providerOptions.xai.videoUrl`       | `string`           | Yes      | URL of the source video to extend                                                    |
| `providerOptions.xai.pollIntervalMs` | `number`           | No       | How often to check task status. Defaults to `5000`                                   |
| `providerOptions.xai.pollTimeoutMs`  | `number`           | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                 |

### Two-step example

Generate a source video, then extend it using the ephemeral URL from provider metadata:

```typescript filename="video-extension-two-step.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

// Step 1: Generate source video
const source = await generateVideo({
  model: 'xai/grok-imagine-video',
  prompt: 'A cat sitting on a sunlit windowsill, tail gently swishing.',
  duration: 5,
  aspectRatio: '16:9',
  providerOptions: {
    xai: { pollTimeoutMs: 600000 },
  },
});

const sourceUrl = source.providerMetadata?.xai?.videoUrl as string;

// Step 2: Extend from last frame
const extended = await generateVideo({
  model: 'xai/grok-imagine-video',
  prompt: 'The cat turns its head, notices a butterfly, and leaps off.',
  duration: 6,
  providerOptions: {
    xai: {
      mode: 'extend-video',
      videoUrl: sourceUrl,
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('extended.mp4', extended.videos[0].uint8Array);
```

### Grok example

Extend from a fixed source URL:

```typescript filename="video-extension.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'xai/grok-imagine-video',
  prompt:
    'The cat continues walking slowly through the dandelions as the breeze picks up.',
  duration: 5,
  providerOptions: {
    xai: {
      mode: 'extend-video',
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


---

[View full sitemap](/docs/sitemap)
