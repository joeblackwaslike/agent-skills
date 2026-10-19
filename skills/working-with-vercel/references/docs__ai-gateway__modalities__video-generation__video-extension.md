---
title: AI Gateway Video Extension
product: vercel
url: /docs/ai-gateway/modalities/video-generation/video-extension
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-extension"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/modalities/video-generation/video-editing
  - /docs/ai-gateway/modalities/video-generation
summary: Extend existing videos from their last frame with Grok Imagine Video through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-extension.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "3f0c87b3deefe5e0278e0dfa20360856d581113bde5ca2bea7da6aa6cf7b412e"
---

# AI Gateway Video Extension

Continue an existing video from its last frame. Describe what happens next and the model generates new footage that picks up where the source video left off.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway)
- [Grok Imagine Video 1.5 Lite on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-lite-on-ai-gateway)
- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway)
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation) — Learn how to generate videos with the AI SDK.
- [Grok Imagine Video 1.5 on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-on-ai-gateway)
- [generateVideo](https://ai-sdk.dev/docs/reference/ai-sdk-workflow/generate-video) — API Reference for durable video generation in workflows.

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/video-extension.graph.md](/docs/ai-gateway/modalities/video-generation/video-extension.graph.md)
<!-- /docsgraph:related -->

Every model here also runs as a background job instead of one long-lived request. See [asynchronous generation](#asynchronous-generation) below.

## Grok Imagine Video

Grok Imagine Video (by SpaceXAI) can extend existing videos using text prompts. Provide a source video URL and describe the scene that continues from the last frame.

To edit an existing video instead of extending it, see [Video editing](/docs/ai-gateway/modalities/video-generation/video-editing).

[Browse the latest Grok video models](/ai-gateway/models?providers=spacexai\&capabilities=video-generation) on the AI Gateway Models page.

Only `spacexai/grok-imagine-video` supports extension. The `spacexai/grok-imagine-video-1.5` and `spacexai/grok-imagine-video-1.5-preview` models support image-to-video only.

> **💡 Note:** Extension requires `providerOptions.spacexai.mode: 'extend-video'`. Setting `videoUrl`
> alone triggers [video editing](/docs/ai-gateway/modalities/video-generation/video-editing)
> mode, not extension.

### Grok parameters

| Parameter                                 | Type             | Required | Description                                                                             |
| ----------------------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------- |
| `prompt`                                  | `string`         | Yes      | Prompt describing what should happen next in the video                                  |
| `duration`                                | `number`         | No       | Length of the extension segment only, not total output (1 to 10 seconds). Defaults to 6 |
| `providerOptions.spacexai.mode`           | `'extend-video'` | Yes      | Routes the request to video extension instead of editing                                |
| `providerOptions.spacexai.videoUrl`       | `string`         | Yes      | URL of the source video to extend                                                       |
| `providerOptions.spacexai.pollIntervalMs` | `number`         | No       | How often to check task status. Defaults to `5000`                                      |
| `providerOptions.spacexai.pollTimeoutMs`  | `number`         | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                    |

### Two-step example

Generate a source video, then extend it using the ephemeral URL from provider metadata:

```typescript filename="video-extension-two-step.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

// Step 1: Generate source video
const source = await generateVideo({
  model: 'spacexai/grok-imagine-video',
  prompt: 'A cat sitting on a sunlit windowsill, tail gently swishing.',
  duration: 5,
  aspectRatio: '16:9',
  providerOptions: {
    spacexai: { pollTimeoutMs: 600000 },
  },
});

const sourceUrl = source.providerMetadata?.spacexai?.videoUrl as string;

// Step 2: Extend from last frame
const extended = await generateVideo({
  model: 'spacexai/grok-imagine-video',
  prompt: 'The cat turns its head, notices a butterfly, and leaps off.',
  duration: 6,
  providerOptions: {
    spacexai: {
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
  model: 'spacexai/grok-imagine-video',
  prompt:
    'The cat continues walking slowly through the dandelions as the breeze picks up.',
  duration: 5,
  providerOptions: {
    spacexai: {
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

## Asynchronous generation

Pass a `webhook` factory and the SDK registers your URL with the job instead of polling for it. The factory returns that URL and a `received` promise it waits on, then it fetches the videos itself.

```typescript filename="async-video-extension.ts"
const result = await generateVideo({
  model: gateway.videoModel('spacexai/grok-imagine-video'),
  prompt: 'The cat turns its head, notices a butterfly, and leaps off.',
  duration: 6,
  providerOptions: {
    spacexai: {
      mode: 'extend-video',
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
