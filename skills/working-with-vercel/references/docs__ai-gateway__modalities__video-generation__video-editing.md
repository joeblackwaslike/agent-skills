---
title: Video Editing
product: vercel
url: /docs/ai-gateway/modalities/video-generation/video-editing
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-editing"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  []
summary: Edit existing videos using text prompts with Grok Imagine Video through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-editing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9283a9b79bbed995fb0d65c5eb1d2b52162a6c954b08bfee8e4fdf118a15ccb9"
---

# Video Editing

Edit existing videos using text prompts. Describe the changes you want and the model modifies the video accordingly.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation?from=related)
- [Video Extension](https://vercel.com/docs/ai-gateway/modalities/video-generation/video-extension?from=related) — Extend existing videos from their last frame with Grok Imagine Video through AI Gateway.
- [Video / Async Video](https://vercel.com/docs/ai-gateway/getting-started/video?from=related) — Generate videos from text prompts, images, or video input using AI Gateway, either over a single request or as a backgro
- [Text-to-Video](https://vercel.com/docs/ai-gateway/modalities/video-generation/text-to-video?from=related) — Generate videos from text prompts using Google Veo, KlingAI, Wan, Grok Imagine Video, or ByteDance Seedance through AI G
- [Image Generation](https://vercel.com/docs/ai-gateway/modalities/image-generation?from=related) — Generate and edit images using AI models through Vercel AI Gateway with support for multiple providers and modalities.
- [Motion Control](https://vercel.com/docs/ai-gateway/modalities/video-generation/motion-control?from=related) — Transfer motion from a reference video to a character image using KlingAI through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/video-editing.graph.md](/docs/ai-gateway/modalities/video-generation/video-editing.graph.md)
<!-- /docsgraph:related -->

## Grok Imagine Video

Grok Imagine Video (by SpaceXAI) can edit existing videos using text prompts. Provide a source video URL and describe the desired edits.

[Browse the latest Grok video models](/ai-gateway/models?capabilities=video-generation\&providers=xai) on the AI Gateway Models page.

> **💡 Note:** Video editing output matches the input video's aspect ratio and resolution,
> capped at 720p. A 1080p input will be downsized to 720p. The `duration`,
> `aspectRatio`, and `resolution` parameters are not supported for editing.

### Grok parameters

| Parameter                            | Type     | Required | Description                                          |
| ------------------------------------ | -------- | -------- | ---------------------------------------------------- |
| `prompt`                             | `string` | Yes      | Description of the edits to apply to the video       |
| `providerOptions.xai.videoUrl`       | `string` | Yes      | URL of the source video to edit                      |
| `providerOptions.xai.pollIntervalMs` | `number` | No       | How often to check task status. Defaults to `5000`   |
| `providerOptions.xai.pollTimeoutMs`  | `number` | No       | Maximum wait time. Defaults to `600000` (10 minutes) |

### Grok example

```typescript filename="video-editing.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'xai/grok-imagine-video',
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


---

[View full sitemap](/docs/sitemap)
