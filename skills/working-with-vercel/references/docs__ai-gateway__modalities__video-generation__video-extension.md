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
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "45d51e41b09607822b14ceefad4d011d1f9df195ed1f7da07074f47b2cb7068d"
---

# Video Extension

Continue an existing video from its last frame. Describe what happens next and the model generates new footage that picks up where the source video left off.

## Grok Imagine Video

Grok Imagine Video (by xAI) can extend existing videos using text prompts. Provide a source video URL and describe the scene that continues from the last frame.

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
