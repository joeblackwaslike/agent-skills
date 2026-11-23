---
title: AI Gateway Text-to-Video Generation
product: vercel
url: /docs/ai-gateway/modalities/video-generation/text-to-video
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/text-to-video"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/modalities/video-generation
summary: Generate videos from text prompts using Google Veo, KlingAI, Wan, Grok Imagine Video, ByteDance Seedance, MiniMax H3, FLUX 3, or HeyGen Video through...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/text-to-video.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "76b19e198dc4f29938a7a7b6069f217bf344a352a73847550c74e4fb5f97bdf4"
---

# AI Gateway Text-to-Video Generation

Generate videos from text prompts. Describe what you want to see and the model creates a video matching your description.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway)
- [Alibaba](https://ai-sdk.dev/providers/ai-sdk-providers/alibaba) — Learn how to use Alibaba with AI Gateway and the direct provider.
- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway)
- [Wan models on AI Gateway](https://vercel.com/changelog/wan-models-on-ai-gateway)
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation) — Learn how to generate videos with the AI SDK.
- [Kling AI](https://ai-sdk.dev/providers/ai-sdk-providers/klingai) — Learn how to use Kling AI with AI Gateway and the direct provider.
- [Kling video models on AI Gateway](https://vercel.com/changelog/kling-video-models-on-ai-gateway)
- [Tencent Cloud](https://ai-sdk.dev/providers/ai-sdk-providers/tencent) — Learn how to use Tencent Cloud TokenHub and VOD models with the AI SDK.
- [Grok Imagine Video 1.5 Lite on AI Gateway](https://vercel.com/changelog/grok-imagine-video-1-5-lite-on-ai-gateway)

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/text-to-video.graph.md](/docs/ai-gateway/modalities/video-generation/text-to-video.graph.md)
<!-- /docsgraph:related -->

Every model here also runs as a background job instead of one long-lived request. See [asynchronous generation](#asynchronous-generation) below.

## Google Veo

Google's Veo models generate high-quality videos with optional audio. Three Veo 3.1 models support text-to-video:

- `google/veo-3.1-generate-001`
- `google/veo-3.1-fast-generate-001`
- `google/veo-3.1-lite-generate-001`, which supports text-to-video only and renders up to 1080p

[Browse the latest Veo video models](/ai-gateway/models?capabilities=video-generation\&providers=vertex) on the AI Gateway Models page.

### Veo parameters

| Parameter                                   | Type                                               | Required | Description                                                     |
| ------------------------------------------- | -------------------------------------------------- | -------- | --------------------------------------------------------------- |
| `prompt`                                    | `string`                                           | Yes      | Text description of the video to generate                       |
| `aspectRatio`                               | `string`                                           | No       | Aspect ratio (`'16:9'`, `'9:16'`). Defaults to `'16:9'`         |
| `duration`                                  | `4` \| `6` \| `8`                                  | No       | Video length in seconds. Defaults to 8                          |
| `resolution`                                | `string`                                           | No       | Resolution (`'1280x720'` for 720p, `'1920x1080'` for 1080p). Veo 3.1 and Veo 3.1 Fast also accept `'3840x2160'` for 4K. Defaults to 720p |
| `generateAudio`                             | `boolean`                                          | No       | Generate audio alongside the video.                             |
| `providerOptions.vertex.enhancePrompt`      | `boolean`                                          | No       | Use Gemini to enhance prompts. Defaults to `true`               |
| `providerOptions.vertex.negativePrompt`     | `string`                                           | No       | What to discourage in the generated video                       |
| `providerOptions.vertex.personGeneration`   | `'dont_allow'` \| `'allow_adult'` \| `'allow_all'` | No       | Whether to allow person generation. Defaults to `'allow_adult'` |
| `providerOptions.vertex.compressionQuality` | `'optimized'` \| `'lossless'`                      | No       | Compression quality. Defaults to `'optimized'`                  |
| `providerOptions.vertex.sampleCount`        | `number`                                           | No       | Number of output videos (1-4)                                   |
| `providerOptions.vertex.seed`               | `number`                                           | No       | Seed for deterministic generation (0-4,294,967,295)             |
| `providerOptions.vertex.gcsOutputDirectory` | `string`                                           | No       | Cloud Storage URI to store the generated videos                 |
| `providerOptions.vertex.referenceImages`    | `array`                                            | No       | Reference images for style or asset guidance                    |
| `providerOptions.vertex.pollIntervalMs`     | `number`                                           | No       | How often to check task status. Defaults to `5000`              |
| `providerOptions.vertex.pollTimeoutMs`      | `number`                                           | No       | Maximum wait time. Defaults to `600000` (10 minutes)            |

### Veo example

```typescript filename="veo-text-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: 'A pangolin curled on a mossy stone in a glowing bioluminescent forest',
  aspectRatio: '16:9',
  resolution: '1920x1080',
  generateAudio: true,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## KlingAI

KlingAI offers text-to-video with standard and professional quality modes. Three models support text-to-video: `klingai/kling-v3.0-t2v`, `klingai/kling-v2.6-t2v`, and `klingai/kling-v2.5-turbo-t2v`. Audio generation requires v2.6+ models. Duration is 5 or 10 seconds for v2.x models and 3 to 15 seconds for v3.0 models.

[Browse the latest KlingAI video models](/ai-gateway/models?capabilities=video-generation\&providers=klingai) on the AI Gateway Models page.

### KlingAI parameters

| Parameter                                | Type               | Required | Description                                                                                  |
| ---------------------------------------- | ------------------ | -------- | -------------------------------------------------------------------------------------------- |
| `prompt`                                 | `string`           | Yes      | Text description of the video to generate. Max 2500 characters.                              |
| `aspectRatio`                            | `string`           | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`). Defaults to `'16:9'`.                            |
| `duration`                               | `number`           | No       | Video length in seconds. 5 or 10 for v2.x, 3-15 for v3.0. Defaults to `5`.                   |
| `providerOptions.klingai.mode`           | `'std'` \| `'pro'` | No       | `'std'` for standard quality. `'pro'` for professional quality. Defaults to `'std'`.         |
| `providerOptions.klingai.negativePrompt` | `string`           | No       | What to avoid in the video. Max 2500 characters.                                             |
| `generateAudio`                          | `boolean`          | No       | Generate audio. Defaults to `false`. Requires v2.6+.                                         |
| `providerOptions.klingai.cfgScale`       | `number`           | No       | Prompt adherence (0-1). Higher = stricter. Defaults to `0.5`. Not supported on v2.x.         |
| `providerOptions.klingai.voiceList`      | `array`            | No       | Voice IDs for speech. Max 2 voices. Requires v3.0+ with `generateAudio: true`.               |
| `providerOptions.klingai.multiShot`      | `boolean`          | No       | Enable multi-shot generation. Requires v3.0+. See [KlingAI multi-shot](#klingai-multi-shot). |
| `providerOptions.klingai.watermarkEnabled` | `boolean`          | No       | Set to `true` to generate a watermarked result.                                      |
| `providerOptions.klingai.pollIntervalMs` | `number`           | No       | How often to check task status. Defaults to `5000`.                                          |
| `providerOptions.klingai.pollTimeoutMs`  | `number`           | No       | Maximum wait time. Defaults to `600000` (10 minutes).                                        |

### KlingAI example

```typescript filename="klingai-text-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v3.0-t2v',
  prompt: 'A chicken flying into the sunset in the style of 90s anime',
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

### KlingAI camera control

Control camera movement during video generation.

| Parameter                                      | Type     | Required | Description                                                 |
| ---------------------------------------------- | -------- | -------- | ----------------------------------------------------------- |
| `providerOptions.klingai.cameraControl.type`   | `string` | Yes      | Camera movement type. See options below.                    |
| `providerOptions.klingai.cameraControl.config` | `object` | No       | Movement configuration. Required when `type` is `'simple'`. |

**Camera movement types:**

| Type                   | Description                        | Config required |
| ---------------------- | ---------------------------------- | --------------- |
| `'simple'`             | Basic movement with one axis       | Yes             |
| `'down_back'`          | Camera descends and moves backward | No              |
| `'forward_up'`         | Camera moves forward and tilts up  | No              |
| `'right_turn_forward'` | Rotate right then move forward     | No              |
| `'left_turn_forward'`  | Rotate left then move forward      | No              |

**`simple` camera configuration options** (use only one, set others to 0):

| Config       | Range     | Description                                                  |
| ------------ | --------- | ------------------------------------------------------------ |
| `horizontal` | \[-10, 10] | Camera translation along x-axis. Negative = left.            |
| `vertical`   | \[-10, 10] | Camera translation along y-axis. Negative = down.            |
| `pan`        | \[-10, 10] | Camera rotation around y-axis. Negative = left.              |
| `tilt`       | \[-10, 10] | Camera rotation around x-axis. Negative = down.              |
| `roll`       | \[-10, 10] | Camera rotation around z-axis. Negative = counter-clockwise. |
| `zoom`       | \[-10, 10] | Focal length change. Negative = narrower FOV.                |

```typescript filename="camera-control.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v3.0-t2v',
  prompt: 'A serene mountain landscape at sunset',
  aspectRatio: '16:9',
  providerOptions: {
    klingai: {
      mode: 'std',
      cameraControl: {
        type: 'simple',
        config: {
          zoom: 5,
          horizontal: 0,
          vertical: 0,
          pan: 0,
          tilt: 0,
          roll: 0,
        },
      },
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### KlingAI multi-shot

Generate videos with multiple storyboard shots, each with its own prompt and duration. Requires Kling v3.0+ models.

| Parameter                                        | Type      | Required | Description                                    |
| ------------------------------------------------ | --------- | -------- | ---------------------------------------------- |
| `providerOptions.klingai.multiShot`              | `boolean` | Yes      | Set to `true` to enable multi-shot generation  |
| `providerOptions.klingai.shotType`               | `string`  | No       | Set to `'customize'` for custom shot durations |
| `providerOptions.klingai.multiPrompt`            | `array`   | Yes      | Array of shot configurations                   |
| `providerOptions.klingai.multiPrompt[].index`    | `number`  | Yes      | Shot order (starting from 1)                   |
| `providerOptions.klingai.multiPrompt[].prompt`   | `string`  | Yes      | Text description for this shot                 |
| `providerOptions.klingai.multiPrompt[].duration` | `string`  | Yes      | Duration in seconds for this shot              |

```typescript filename="multi-shot.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v3.0-t2v',
  prompt: '',
  aspectRatio: '16:9',
  duration: 10,
  generateAudio: true,
  providerOptions: {
    klingai: {
      mode: 'pro',
      multiShot: true,
      shotType: 'customize',
      multiPrompt: [
        {
          index: 1,
          prompt: 'A sunrise over a calm ocean, warm golden light.',
          duration: '4',
        },
        {
          index: 2,
          prompt: 'A flock of seagulls take flight from the beach.',
          duration: '3',
        },
        {
          index: 3,
          prompt: 'Waves crash against rocky cliffs at sunset.',
          duration: '3',
        },
      ],
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## Wan

Wan (by Alibaba) offers text-to-video with native audio generation and prompt enhancement. The current models are `alibaba/wan-v3.0-video` and `alibaba/wan-v3.0-video-prime`. A Wan 3.0 model ID covers text-to-video, image-to-video, and reference-to-video, and the inputs you pass decide which one runs. A request with only a prompt runs text-to-video.

The earlier text-to-video models are `alibaba/wan-v2.7-t2v`, `alibaba/wan-v2.6-t2v`, and `alibaba/wan-v2.5-t2v-preview`.

Parameter support differs by version:

- **Wan 3.0**: Accepts `aspectRatio` and `resolution` (480p, 720p, or 1080p) and generates 2 to 30 seconds.
- **Wan 2.7**: Accepts `aspectRatio` and `resolution` (720p or 1080p) and generates 2 to 15 seconds. Wan 2.7 always generates audio.
- **Wan 2.6 and 2.5**: Use `resolution` (for example, `'1280x720'`), not `aspectRatio`. These models ignore `aspectRatio` with a warning.

[Browse the latest Wan video models](/ai-gateway/models?capabilities=video-generation\&providers=alibaba) on the AI Gateway Models page.

### Wan parameters

| Parameter                                | Type                    | Required | Description                                                                  |
| ---------------------------------------- | ----------------------- | -------- | ---------------------------------------------------------------------------- |
| `prompt`                                 | `string`                | Yes      | Text description of the video to generate                                    |
| `aspectRatio`                            | `string`                | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`, `'4:3'`, `'3:4'`). Wan 3.0 and Wan 2.7 only |
| `resolution`                             | `string`                | No       | `'1280x720'` or `'1920x1080'`. Wan 3.0 and Wan 2.5 also support `'832x480'` |
| `duration`                               | `number`                | No       | Wan 3.0: 2 to 30 seconds. Wan 2.7 and 2.6: 2 to 15 seconds. Wan 2.5: 5 or 10 seconds only |
| `generateAudio`                          | `boolean`               | No       | Generate audio. Wan 3.0 and `wan-v2.6-t2v` default to `true`. Wan 2.7 always generates audio and ignores this option with a warning |
| `providerOptions.alibaba.promptExtend`   | `boolean`               | No       | Enhance prompt for better quality. Defaults to `true`                        |
| `providerOptions.alibaba.negativePrompt` | `string`                | No       | What to avoid in the video. Max 500 characters                               |
| `providerOptions.alibaba.audioUrl`       | `string`                | No       | URL to audio file for audio-video sync (WAV/MP3, 3-30s, max 15MB) |
| `providerOptions.alibaba.shotType`       | `'single'` \| `'multi'` | No       | `'multi'` enables multi-shot cinematic narrative. Wan 2.6 only. Wan 2.7 and Wan 3.0 ignore it with a warning, so describe the shot structure in the prompt |
| `providerOptions.alibaba.watermark`      | `boolean`               | No       | Add watermark to the video. Defaults to `false`                              |
| `providerOptions.alibaba.pollIntervalMs` | `number`                | No       | How often to check task status. Defaults to `5000`                           |
| `providerOptions.alibaba.pollTimeoutMs`  | `number`                | No       | Maximum wait time. Defaults to `600000` (10 minutes)                         |

### Wan example

```typescript filename="wan-text-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'alibaba/wan-v3.0-video',
  prompt: 'A chicken flying into the sunset in the style of 90s anime',
  aspectRatio: '16:9',
  resolution: '1280x720',
  duration: 5,
  providerOptions: {
    alibaba: {
      promptExtend: true,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## Grok Imagine Video

Grok Imagine Video (by SpaceXAI) generates videos from text prompts with support for multiple aspect ratios and resolutions. Duration ranges from 1-15 seconds. Three models support text-to-video: `spacexai/grok-imagine-video-1.5`, `spacexai/grok-imagine-video-1.5-lite`, and `spacexai/grok-imagine-video`. The 1.5 models add 1080p output.

[Browse the latest Grok video models](/ai-gateway/models?capabilities=video-generation\&providers=spacexai) on the AI Gateway Models page.

### Grok parameters

| Parameter                                 | Type                 | Required | Description                                                                                          |
| ----------------------------------------- | -------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `prompt`                                  | `string`             | Yes      | Text description of the video to generate                                                            |
| `aspectRatio`                             | `string`             | No       | Aspect ratio (`'16:9'`, `'9:16'`, `'1:1'`, `'4:3'`, `'3:4'`, `'3:2'`, `'2:3'`). Defaults to `'16:9'` |
| `duration`                                | `number`             | No       | Video length in seconds (1-15)                                                                       |
| `resolution`                              | `string`             | No       | Resolution (`'854x480'` for 480p, `'1280x720'` for 720p, `'1920x1080'` for 1080p). 1080p requires a 1.5 model. Defaults to 480p |
| `providerOptions.xai.resolution`          | `'480p'` \| `'720p'` \| `'1080p'` | No       | Native resolution format. Alternative to standard `resolution` parameter                             |
| `providerOptions.xai.pollIntervalMs`      | `number`             | No       | How often to check task status. Defaults to `5000`                                                   |
| `providerOptions.xai.pollTimeoutMs`       | `number`             | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                                 |

### Grok example

```typescript filename="grok-imagine-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'spacexai/grok-imagine-video-1.5',
  prompt: 'A chicken flying into the sunset in the style of 90s anime',
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    xai: {
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

ByteDance's Seedance models generate high-quality videos from text prompts, and the Seedance 2.x series adds optional synchronized audio. All models output MP4 at 24fps.

The current models are `bytedance/seedance-2.5` and `bytedance/seedance-2.5-flash`, which generate up to 30 seconds. Seedance 2.5 Flash is the lower-cost variant and renders up to 720p. Earlier models generate shorter clips:

- **Seedance 2.0 family**: `bytedance/seedance-2.0`, `bytedance/seedance-2.0-fast`, and `bytedance/seedance-2.0-mini` generate 4 to 15 seconds. Seedance 2.0 Fast and Seedance 2.0 Mini render up to 720p.
- **Seedance v1.0**: `bytedance/seedance-v1.0-pro` and `bytedance/seedance-v1.0-pro-fast` generate 2 to 12 seconds without audio.

[Browse the latest Seedance video models](/ai-gateway/models?capabilities=video-generation\&providers=bytedance) on the AI Gateway Models page.

### Seedance parameters

| Parameter                                  | Type                    | Required | Description                                                                        |
| ------------------------------------------ | ----------------------- | -------- | ---------------------------------------------------------------------------------- |
| `prompt`                                   | `string`                | Yes      | Text description of the video to generate                                          |
| `aspectRatio`                              | `string`                | No       | Aspect ratio (`'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`, `'21:9'`)             |
| `resolution`                               | `string`                | No       | Resolution (`'864x480'`, `'1280x720'`, `'1920x1080'`). Seedance 2.5 Flash, 2.0 Fast, and 2.0 Mini support up to `'1280x720'` |
| `duration`                                 | `number`                | No       | Video length in seconds. Seedance 2.5 and 2.5 Flash: 4 to 30 seconds. Seedance 2.0 family: 4 to 15 seconds. v1.0: 2 to 12 seconds |
| `providerOptions.bytedance.watermark`      | `boolean`               | No       | Add a watermark to the video                                                       |
| `generateAudio`                            | `boolean`               | No       | Generate audio. Seedance 2.x series only                                           |
| `providerOptions.bytedance.cameraFixed`    | `boolean`               | No       | Fix the camera position during generation                                          |
| `providerOptions.bytedance.pollIntervalMs` | `number`                | No       | How often to check task status. Defaults to `3000`                                 |
| `providerOptions.bytedance.pollTimeoutMs`  | `number`                | No       | Maximum wait time. Defaults to `300000` (5 minutes)                                |

### Seedance example

```typescript filename="seedance-text-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-2.5',
  prompt: 'A chicken flying into the sunset in the style of 90s anime',
  resolution: '1280x720',
  duration: 5,
  providerOptions: {
    bytedance: {
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### Seedance text-to-video with audio

Generate video with synchronized audio. Requires a Seedance 2.x model.

```typescript filename="seedance-text-to-video-audio.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-2.5',
  prompt:
    'A thunderstorm rolling over a vast wheat field, lightning illuminating the clouds, rain beginning to fall',
  resolution: '1280x720',
  duration: 5,
  generateAudio: true,
  providerOptions: {
    bytedance: {
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

> **💡 Note:** Video generation can take several minutes. Set `pollTimeoutMs` to at least 10
> minutes (600000ms) for reliable operation.

***

## MiniMax

MiniMax H3 models generate video from text prompts. `minimax/minimax-h3` renders at 768p or 2K and generates 4 to 15 seconds. `minimax/minimax-h3-max` renders at 480p or 768p and generates 5 to 15 seconds.

[Browse the latest MiniMax video models](/ai-gateway/models?capabilities=video-generation\&providers=minimax) on the AI Gateway Models page.

### MiniMax parameters

| Parameter                               | Type                           | Required | Description                                                                                                                                                 |
| --------------------------------------- | ------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt`                                | `string`                       | Yes      | Text description of the video to generate                                                                                                                   |
| `aspectRatio`                           | `string`                       | No       | Aspect ratio (`'21:9'`, `'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`). Defaults to `'16:9'`                                                                |
| `duration`                              | `number`                       | No       | Video length in whole seconds. 4 to 15 for MiniMax H3, 5 to 15 for MiniMax H3 Max. Defaults to 5. Out-of-range values are clamped with a warning            |
| `resolution`                            | `string`                       | No       | A frame size that maps to a resolution tier, such as `'1366x768'` for 768p or `'2560x1440'` for 2K. An unrecognized size is ignored with a warning          |
| `providerOptions.minimax.resolution`    | `'480P'` \| `'768P'` \| `'2K'` | No       | Resolution tier. Takes priority over `resolution`. MiniMax H3 supports `'768P'` and `'2K'` (default). MiniMax H3 Max supports `'480P'` and `'768P'` (default) |
| `providerOptions.minimax.aigcWatermark` | `boolean`                      | No       | Embed an AI-generated content watermark in the output. Defaults to `false`                                                                                  |
| `providerOptions.minimax.pollIntervalMs` | `number`                      | No       | How often to check task status. Defaults to `10000`                                                                                                         |
| `providerOptions.minimax.pollTimeoutMs` | `number`                       | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                                                                                        |

The MiniMax API has no audio parameter, so MiniMax H3 models ignore `generateAudio` with a warning.

### MiniMax example

```typescript filename="minimax-text-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'minimax/minimax-h3',
  prompt: 'A chicken flying into the sunset in the style of 90s anime',
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    minimax: {
      resolution: '768P',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## Black Forest Labs FLUX 3

FLUX 3 (by Black Forest Labs) generates 5 to 20 second videos with audio from text prompts. Use the `bfl/flux-3-video` model. Set FLUX 3 options under `providerOptions.blackForestLabs`.

[Browse the latest Black Forest Labs video models](/ai-gateway/models?capabilities=video-generation\&providers=bfl) on the AI Gateway Models page.

### FLUX 3 parameters

| Parameter                                         | Type              | Required | Description                                                                                                                             |
| ------------------------------------------------- | ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt`                                          | `string`          | Yes      | Text description of the video to generate                                                                                               |
| `aspectRatio`                                     | `string`          | No       | Aspect ratio (`'21:9'`, `'2:1'`, `'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`). When you omit it, FLUX 3 infers a ratio from the prompt |
| `duration`                                        | `number`          | No       | Video length in whole seconds, from 5 to 20. Out-of-range values are clamped with a warning. When you omit it, FLUX 3 picks a length    |
| `resolution`                                      | `string`          | No       | Resolution (`'1280x720'` for the `hd` tier, `'1920x1080'` for the `fhd` tier)                                                           |
| `generateAudio`                                   | `boolean`         | No       | Generate audio alongside the video                                                                                                      |
| `providerOptions.blackForestLabs.resolution`      | `'hd'` \| `'fhd'` | No       | Resolution tier. Takes priority over `resolution`                                                                                       |
| `providerOptions.blackForestLabs.safetyTolerance` | `number`          | No       | Moderation strictness from 0 (strictest) to 4. Defaults to `2`                                                                          |
| `providerOptions.blackForestLabs.draft`           | `boolean`         | No       | Render a fast, lower-quality preview instead of the finished video. Defaults to `false`                                                 |

### FLUX 3 example

```typescript filename="flux-3-text-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bfl/flux-3-video',
  prompt:
    'A white kitten chases a butterfly across a sunlit garden, gentle camera tracking',
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    blackForestLabs: {
      resolution: 'hd',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## HeyGen

HeyGen Video generates 5 to 15 second videos from text prompts. Use the `heygen/heygen-video-1` model. HeyGen Video always generates audio, so `generateAudio: false` is ignored with a warning.

[Browse the latest HeyGen video models](/ai-gateway/models?capabilities=video-generation\&providers=heygen) on the AI Gateway Models page.

### HeyGen parameters

| Parameter                                 | Type                                                         | Required | Description                                                                                                       |
| ----------------------------------------- | ------------------------------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `prompt`                                  | `string`                                                     | Yes      | Text description of the video to generate. 1 to 32,000 characters                                                 |
| `aspectRatio`                             | `string`                                                     | No       | Aspect ratio (`'21:9'`, `'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`). Defaults to `'16:9'`                      |
| `duration`                                | `number`                                                     | No       | Video length in whole seconds, from 5 to 15. Defaults to 5                                                        |
| `providerOptions.heygen.resolution`       | `'480p'` \| `'768p'` \| `'1080p'` \| `'2k'`                  | No       | Output size class. Defaults to `'768p'`. `'1080p'` and `'2k'` require a `'16:9'` or `'9:16'` aspect ratio         |
| `providerOptions.heygen.promptEnhancement` | `'turbo'` \| `'quality'` \| `'ultraquality'` \| `'disabled'` | No       | How HeyGen rewrites your prompt. Defaults to `'quality'`. Use `'disabled'` to keep the prompt as you wrote it     |

### HeyGen example

```typescript filename="heygen-text-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'heygen/heygen-video-1',
  prompt:
    'A paper boat drifts across a quiet pond, with gentle ripples and birdsong',
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

```typescript filename="async-text-to-video.ts"
const result = await generateVideo({
  model: 'klingai/kling-v3.0-t2v',
  prompt: 'A chicken flying into the sunset in the style of 90s anime',
  aspectRatio: '16:9',
  duration: 5,
  webhook: async () => ({
    url: callbackUrl,
    received: waitForDelivery(token),
  }),
  poll: { timeoutMs: 10 * 60 * 1000 },
});
```

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
