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
  - /docs/ai-gateway/modalities/video-generation/reference-to-video
  - /docs/ai-gateway/modalities/video-generation
summary: Extend existing videos from their last frame with Grok Imagine Video, FLUX 3, or ByteDance Seedance through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/video-extension.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6a481de7fd923cd3b1c4cc2130d62b2950720271ece3fcc0c3f56eb44424acba"
---

# AI Gateway Video Extension

Continue an existing video from its last frame. Describe what happens next and the model generates new footage that picks up where the source video left off.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway)
- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation)
- [Grok Imagine Video 1.5 Lite on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-lite-on-ai-gateway)
- [Kling video models on AI Gateway](https://vercel.com/changelog/kling-video-models-on-ai-gateway)
- [Seedance 2.5 Flash now available on AI Gateway](https://vercel.com/changelog/seedance-2-5-flash-now-available-on-ai-gateway)

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/video-extension.graph.md](/docs/ai-gateway/modalities/video-generation/video-extension.graph.md)
<!-- /docsgraph:related -->

Every model here also runs as a background job instead of one long-lived request. See [asynchronous generation](#asynchronous-generation) below.

## Grok Imagine Video

Grok Imagine Video (by SpaceXAI) can extend existing videos using text prompts. Provide a source video URL and describe the scene that continues from the last frame.

To edit an existing video instead of extending it, see [Video editing](/docs/ai-gateway/modalities/video-generation/video-editing).

[Browse the latest Grok video models](/ai-gateway/models?providers=spacexai\&capabilities=video-generation) on the AI Gateway Models page.

Among the Grok Imagine Video models, only `spacexai/grok-imagine-video` supports extension. The `spacexai/grok-imagine-video-1.5` and `spacexai/grok-imagine-video-1.5-lite` models do not.

> **💡 Note:** Extension requires `providerOptions.xai.mode: 'extend-video'`. Setting `videoUrl`
> alone triggers [video editing](/docs/ai-gateway/modalities/video-generation/video-editing)
> mode, not extension.

### Grok parameters

| Parameter                                 | Type             | Required | Description                                                                             |
| ----------------------------------------- | ---------------- | -------- | --------------------------------------------------------------------------------------- |
| `prompt`                                  | `string`         | Yes      | Prompt describing what should happen next in the video                                  |
| `duration`                                | `number`         | No       | Length of the extension segment only, not total output (1 to 10 seconds). Defaults to 6 |
| `providerOptions.xai.mode`                | `'extend-video'` | Yes      | Routes the request to video extension instead of editing                                |
| `providerOptions.xai.videoUrl`            | `string`         | Yes      | URL of the source video to extend                                                       |
| `providerOptions.xai.pollIntervalMs`      | `number`         | No       | How often to check task status. Defaults to `5000`                                      |
| `providerOptions.xai.pollTimeoutMs`       | `number`         | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                    |

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
    xai: { pollTimeoutMs: 600000 },
  },
});

const sourceUrl = source.providerMetadata?.xai?.videoUrl as string;

// Step 2: Extend from last frame
const extended = await generateVideo({
  model: 'spacexai/grok-imagine-video',
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
  model: 'spacexai/grok-imagine-video',
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

## Black Forest Labs FLUX 3

FLUX 3 (by Black Forest Labs) can continue an existing video. Use the `bfl/flux-3-video` model, pass the video to continue through `inputReferences` with a video `mediaType`, and describe what happens next in the prompt. FLUX 3 accepts one MP4 video, as a URL or a base64 string.

[Browse the latest Black Forest Labs video models](/ai-gateway/models?capabilities=video-generation\&providers=bfl) on the AI Gateway Models page.

> **💡 Note:** FLUX 3 can't combine a video to continue with frame images. If you pass
> `prompt.image`, `frameImages`, or `providerOptions.blackForestLabs.keyframes`
> in the same request, FLUX 3 ignores the video with a warning.

### FLUX 3 parameters

| Parameter                                    | Type                         | Required | Description                                                                                             |
| -------------------------------------------- | ---------------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `prompt`                                     | `string`                     | Yes      | Prompt describing what should happen next in the video                                                  |
| `inputReferences`                            | `Array<{ data, mediaType }>` | Yes      | The video to continue. FLUX 3 uses the first video reference and ignores image references with a warning |
| `duration`                                   | `number`                     | No       | Video length in whole seconds, from 5 to 20                                                             |
| `aspectRatio`                                | `string`                     | No       | Aspect ratio (`'21:9'`, `'2:1'`, `'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`)                         |
| `providerOptions.blackForestLabs.resolution` | `'hd'` \| `'fhd'`            | No       | Resolution tier                                                                                         |

### FLUX 3 example

```typescript filename="flux-3-video-extension.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bfl/flux-3-video',
  prompt:
    'The cat continues walking slowly through the dandelions as the breeze picks up.',
  aspectRatio: '16:9',
  duration: 5,
  inputReferences: [
    { data: 'https://example.com/source-video.mp4', mediaType: 'video/mp4' },
  ],
  providerOptions: {
    blackForestLabs: {
      resolution: 'hd',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## ByteDance Seedance

Seedance 2.5 (`bytedance/seedance-2.5`) and Seedance 2.5 Flash (`bytedance/seedance-2.5-flash`) support video extension. Pass the source video as a video reference in `inputReferences`, tagged with an explicit `mediaType`, and describe what happens next in the prompt. The request takes the same `duration`, `generateAudio`, and polling parameters as [Seedance reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video#bytedance-seedance). Leave out `aspectRatio` when you extend a video.

The source video must be an MP4 or MOV file at a URL, between 2 and 30 seconds long and no larger than 200 MB. Both models generate 4 to 30 seconds. Seedance 2.5 renders up to 1080p, and Seedance 2.5 Flash renders up to 720p.

For exact limits, see the [Seedance 2.5](/ai-gateway/models/seedance-2.5) and [Seedance 2.5 Flash](/ai-gateway/models/seedance-2.5-flash) model pages, or [browse the latest Seedance video models](/ai-gateway/models?capabilities=video-generation\&providers=bytedance) on the AI Gateway Models page.

## Asynchronous generation

Pass a `webhook` factory and the SDK registers your URL with the job instead of polling for it. The factory returns that URL and a `received` promise it waits on, then it fetches the videos itself.

```typescript filename="async-video-extension.ts"
const result = await generateVideo({
  model: 'spacexai/grok-imagine-video',
  prompt: 'The cat turns its head, notices a butterfly, and leaps off.',
  duration: 6,
  providerOptions: {
    xai: {
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
