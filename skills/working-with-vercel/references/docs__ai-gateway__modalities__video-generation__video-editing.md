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
summary: Edit existing videos using text prompts with Grok Imagine Video through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-editing.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "fcdcf7c3c006b52add7c6d06d479589013f6a6b0ea92b0e55578d9062dfc977a"
---

# AI Gateway Video Editing

Edit existing videos using text prompts. Describe the changes you want and the model modifies the video accordingly.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway)
- [Grok Imagine Video 1.5 Lite on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-lite-on-ai-gateway)
- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway)
- [Grok Imagine Video 1.5 on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-on-ai-gateway)
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Veo video models on AI Gateway](https://vercel.com/changelog/veo-video-models-on-ai-gateway)

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/video-editing.graph.md](/docs/ai-gateway/modalities/video-generation/video-editing.graph.md)
<!-- /docsgraph:related -->

Every model here also runs as a background job instead of one long-lived request. See [asynchronous generation](#asynchronous-generation) below.

## Grok Imagine Video

Grok Imagine Video (by SpaceXAI) can edit existing videos using text prompts. Provide a source video URL and describe the desired edits.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
