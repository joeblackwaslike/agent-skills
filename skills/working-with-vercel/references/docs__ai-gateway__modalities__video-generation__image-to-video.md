---
title: Image-to-Video Generation
product: vercel
url: /docs/ai-gateway/modalities/video-generation/image-to-video
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/image-to-video"
last_updated: 2026-06-30
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/modalities/video-generation/reference-to-video
  - /docs/vercel-blob
  - /docs/ai-gateway/modalities/video-generation/video-extension
summary: Animate static images into videos using Google Veo, KlingAI, Wan, Grok Imagine Video, or ByteDance Seedance through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/image-to-video.md"
fetched_at: "2026-07-27T07:38:10.222Z"
sha256: "bb285d0622cb915262d89501ea26ad5b9d309a09e41f2680a9344663a92dc4c2"
---

# Image-to-Video Generation

Animate a static image into a video. The image you provide becomes the video content itself - you're adding motion to that exact scene.

This is different from [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video), where reference images show the model what characters look like, but the video is a completely new scene.

## Passing frames

The provider-agnostic `frameImages` field is the recommended way to pass frames. Each entry pairs an image with a `frameType`:

- One `first_frame` entry animates from that image. This is equivalent to `prompt.image`, and a `first_frame` takes priority if you pass both.
- Adding a `last_frame` entry transitions between the two frames. Veo, KlingAI, and Seedance honor `last_frame`; Grok Imagine Video and Wan ignore it with a warning.

```typescript
frameImages: [
  { image: 'https://example.com/start.png', frameType: 'first_frame' },
  { image: 'https://example.com/end.png', frameType: 'last_frame' },
];
```

Each provider below also documents its own `providerOptions` keys (like `imageTail` or `lastFrameImage`). Those still work when you omit `frameImages`.

## Google Veo

Google's Veo models support image-to-video generation, animating a starting image into a video.

[Browse the latest Veo video models](/ai-gateway/models?capabilities=video-generation\&providers=vertex) on the AI Gateway Models page.

### Veo parameters

| Parameter                                 | Type                                               | Required | Description                                                          |
| ----------------------------------------- | -------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| `prompt.image`                            | `string`                                           | Yes      | URL or base64-encoded image to animate                               |
| `prompt.text`                             | `string`                                           | No       | Description of the motion or animation                               |
| `duration`                                | `4` | `6` | `8`                                  | No       | Video length in seconds. Defaults to 8                               |
| `resolution`                              | `string`                                           | No       | Resolution (`'720p'`, `'1080p'`). Defaults to `'720p'`               |
| `generateAudio`                           | `boolean`                                          | No       | Generate audio alongside the video                                   |
| `providerOptions.vertex.resizeMode`       | `'pad'` | `'crop'`                                | No       | How to resize the image to fit video dimensions. Defaults to `'pad'` |
| `providerOptions.vertex.enhancePrompt`    | `boolean`                                          | No       | Use Gemini to enhance prompts. Defaults to `true`                    |
| `providerOptions.vertex.negativePrompt`   | `string`                                           | No       | What to discourage in the generated video                            |
| `providerOptions.vertex.personGeneration` | `'dont_allow'` | `'allow_adult'` | `'allow_all'` | No       | Whether to allow person generation. Defaults to `'allow_adult'`      |
| `providerOptions.vertex.pollIntervalMs`   | `number`                                           | No       | How often to check task status. Defaults to `5000`                   |
| `providerOptions.vertex.pollTimeoutMs`    | `number`                                           | No       | Maximum wait time. Defaults to `600000` (10 minutes)                 |

### Veo example

```typescript filename="veo-image-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: {
    image: 'https://example.com/landscape.png',
    text: 'Camera slowly pans across the scene as clouds drift by',
  },
  resolution: '1080p',
  generateAudio: true,
  providerOptions: {
    vertex: {
      resizeMode: 'crop',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### Veo first and last frame

Veo can transition between a starting and ending image. Pass both frames through `frameImages`, tagging one `first_frame` and one `last_frame`. Veo animates from the first frame toward the last.

```typescript filename="veo-first-last-frame.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: '360 pan from the first frame to the last frame',
  frameImages: [
    { image: 'https://example.com/start.png', frameType: 'first_frame' },
    { image: 'https://example.com/end.png', frameType: 'last_frame' },
  ],
  aspectRatio: '16:9',
  resolution: '720p',
  duration: 8,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

***

## KlingAI

KlingAI's image-to-video models animate images with standard or professional quality modes.

[Browse the latest KlingAI video models](/ai-gateway/models?capabilities=video-generation\&providers=klingai) on the AI Gateway Models page.

### KlingAI parameters

| Parameter                                | Type               | Required | Description                                                                                                                                          |
| ---------------------------------------- | ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt.image`                           | `string \| Buffer` | Yes      | The image to animate. See [image requirements](#image-requirements) below.                                                                           |
| `prompt.text`                            | `string`           | No       | Description of the motion. Max 2500 characters.                                                                                                      |
| `duration`                               | `number`           | No       | Video length in seconds. 5 or 10 for v2.x, 3-15 for v3.0. Defaults to `5`.                                                                           |
| `providerOptions.klingai.mode`           | `'std'` | `'pro'` | No       | `'std'` for standard quality. `'pro'` for professional quality. Defaults to `'std'`.                                                                 |
| `providerOptions.klingai.negativePrompt` | `string`           | No       | What to avoid in the video. Max 2500 characters.                                                                                                     |
| `providerOptions.klingai.cfgScale`       | `number`           | No       | Prompt adherence (0-1). Higher = stricter. Defaults to `0.5`. Not supported on v2.x.                                                                 |
| `generateAudio`                          | `boolean`          | No       | Generate audio. Defaults to `false`. Requires v2.6+.                                                                                                 |
| `providerOptions.klingai.voiceList`      | `array`            | No       | Voice IDs for speech. Max 2 voices. Requires v3.0+ with `generateAudio: true`. Cannot coexist with `elementList`. See [voice generation](#voice-generation). |
| `providerOptions.klingai.multiShot`      | `boolean`          | No       | Enable multi-shot generation. Requires v3.0+. See [multi-shot](#multi-shot).                                                                         |
| `providerOptions.klingai.elementList`    | `array`            | No       | Reference elements for element control. Up to 3 elements. Requires v3.0+. Cannot coexist with `voiceList`.                                           |
| `providerOptions.klingai.watermarkInfo`  | `object`           | No       | Set `{ enabled: true }` to generate watermarked result.                                                                                              |
| `providerOptions.klingai.pollIntervalMs` | `number`           | No       | How often to check task status. Defaults to `5000`.                                                                                                  |
| `providerOptions.klingai.pollTimeoutMs`  | `number`           | No       | Maximum wait time. Defaults to `600000` (10 minutes).                                                                                                |

### KlingAI image requirements

The input image (`prompt.image`) must meet these requirements:

- **Formats**: `.jpg`, `.jpeg`, `.png`
- **File size**: 10MB or less
- **Dimensions**: Minimum 300px
- **Aspect ratio**: Between 1:2.5 and 2.5:1

When using base64 encoding, submit only the raw base64 string without any prefix:

```ts
// Correct
const image = 'iVBORw0KGgoAAAANSUhEUgAAAAUA...';

// Incorrect - do not include data: prefix
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...';
```

### KlingAI example

```typescript filename="klingai-image-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v2.6-i2v',
  prompt: {
    image: 'https://example.com/cat.png',
    text: 'The cat slowly turns its head and blinks',
  },
  duration: 5,
  providerOptions: {
    klingai: {
      mode: 'std',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### KlingAI first and last frame

Generate a video that transitions between a starting and ending image. The model interpolates the motion between the two frames. Pass both frames through `frameImages`, tagging one `first_frame` and one `last_frame`.

```typescript filename="first-last-frame.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const firstFrame = fs.readFileSync('start.png');
const lastFrame = fs.readFileSync('end.png');

const result = await generateVideo({
  model: 'klingai/kling-v2.6-i2v',
  prompt: 'Smooth transition between the two scenes',
  frameImages: [
    { image: firstFrame, frameType: 'first_frame' },
    { image: lastFrame, frameType: 'last_frame' },
  ],
  providerOptions: {
    klingai: {
      mode: 'pro',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

First and last frame is mutually exclusive with these features, which cannot be combined with it:

- Motion brush (`dynamicMasks` / `staticMask`)
- Camera control (`cameraControl`)

If you omit `frameImages`, you can still set the last frame through the legacy `providerOptions.klingai.imageTail` key (a `string` or `Buffer` with the same format requirements as the first frame), with `prompt.image` as the first frame.

### KlingAI voice generation

Add speech to your video using voice IDs. Requires v2.6+ models with `generateAudio: true`.

Reference voices in your prompt using `<<<voice_1>>>` syntax, where the number matches the order in `voiceList`:

```typescript filename="voice-generation.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v2.6-i2v',
  prompt: {
    image: 'https://example.com/person.png',
    text: 'The person<<<voice_1>>> says: "Hello, welcome to my channel"',
  },
  generateAudio: true,
  providerOptions: {
    klingai: {
      mode: 'std',
      voiceList: [{ voiceId: 'your_voice_id' }],
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

You can use up to 2 voices per video. Voice IDs come from KlingAI's voice customization API or system preset voices.

### KlingAI camera control

Control camera movement during video generation. This is mutually exclusive with first/last frame and motion brush features.

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

**Simple camera config options** (use only one, set others to 0):

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
  model: 'klingai/kling-v2.6-i2v',
  prompt: {
    image: 'https://example.com/landscape.png',
    text: 'A serene mountain landscape',
  },
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

### KlingAI motion brush

Control which parts of the image move and how using mask images. This is mutually exclusive with first/last frame and camera control features.

| Parameter                                             | Type     | Required | Description                                        |
| ----------------------------------------------------- | -------- | -------- | -------------------------------------------------- |
| `providerOptions.klingai.staticMask`                  | `string` | No       | Mask image for areas that should remain static.    |
| `providerOptions.klingai.dynamicMasks`                | `array`  | No       | Array of dynamic mask configurations (up to 6).    |
| `providerOptions.klingai.dynamicMasks[].mask`         | `string` | Yes      | Mask image for areas that should move.             |
| `providerOptions.klingai.dynamicMasks[].trajectories` | `array`  | Yes      | Motion path coordinates. 2-77 points for 5s video. |

Mask requirements:

- Same format as input image (`.jpg`, `.jpeg`, `.png`)
- Aspect ratio must match the input image
- All masks (`staticMask` and `dynamicMasks[].mask`) must have identical resolution

Trajectory coordinates use the bottom-left corner of the image as origin. More points create more accurate paths.

```typescript filename="motion-brush.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v2.6-i2v',
  prompt: {
    image: 'https://example.com/scene.png',
    text: 'A ball bouncing across the scene',
  },
  providerOptions: {
    klingai: {
      mode: 'std',
      dynamicMasks: [
        {
          mask: 'https://example.com/ball-mask.png',
          trajectories: [
            { x: 100, y: 200 },
            { x: 200, y: 300 },
            { x: 300, y: 200 },
            { x: 400, y: 300 },
          ],
        },
      ],
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### KlingAI multi-shot

Generate videos with multiple storyboard shots, combining a start frame image with per-shot prompts. Requires Kling v3.0+ models.

| Parameter                                        | Type      | Required | Description                                    |
| ------------------------------------------------ | --------- | -------- | ---------------------------------------------- |
| `providerOptions.klingai.multiShot`              | `boolean` | Yes      | Set to `true` to enable multi-shot generation  |
| `providerOptions.klingai.shotType`               | `string`  | No       | Set to `'customize'` for custom shot durations |
| `providerOptions.klingai.multiPrompt`            | `array`   | Yes      | Array of shot configurations                   |
| `providerOptions.klingai.multiPrompt[].index`    | `number`  | Yes      | Shot order (starting from 1)                   |
| `providerOptions.klingai.multiPrompt[].prompt`   | `string`  | Yes      | Text description for this shot                 |
| `providerOptions.klingai.multiPrompt[].duration` | `string`  | Yes      | Duration in seconds for this shot              |

```typescript filename="multi-shot-i2v.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v3.0-i2v',
  prompt: {
    image: 'https://example.com/start-frame.png',
    text: '',
  },
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
          prompt: 'The character looks up at the sky.',
          duration: '4',
        },
        {
          index: 2,
          prompt: 'A bird flies across the frame.',
          duration: '3',
        },
        {
          index: 3,
          prompt: 'The character smiles and waves.',
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

Wan offers image-to-video with standard and flash variants. Both support audio generation. Wan requires image URLs (not buffers). Use [Vercel Blob](/docs/vercel-blob) to host local images.

[Browse the latest Wan video models](/ai-gateway/models?capabilities=video-generation\&providers=alibaba) on the AI Gateway Models page.

> **💡 Note:** Wan does not support first-last-frame interpolation. A `last_frame` entry in
> `frameImages` is ignored with a warning.

### Wan parameters

| Parameter                                | Type                          | Required | Description                                                                        |
| ---------------------------------------- | ----------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `prompt`                                 | `string` or `{ image, text }` | Yes      | Text description of the motion or animation                                        |
| `frameImages`                            | `Array<{ image, frameType }>` | No       | Pass a `first_frame` entry to animate from an image. URLs only. Takes priority over `prompt.image` |
| `prompt.image`                           | `string`                      | No       | URL of the image to animate (URLs only, not buffers). Used when `frameImages` is omitted |
| `resolution`                             | `string`                      | No       | `'1280x720'` or `'1920x1080'`                                                      |
| `duration`                               | `number`                      | No       | 2-15 seconds                                                                       |
| `generateAudio`                          | `boolean`                     | No       | Generate audio. Standard models default to `true`, flash models default to `false` |
| `providerOptions.alibaba.negativePrompt` | `string`                      | No       | What to avoid in the video. Max 500 characters                                     |
| `providerOptions.alibaba.audioUrl`       | `string`                      | No       | URL to audio file for audio-video sync (WAV/MP3, 3-30s, max 15MB)                  |
| `providerOptions.alibaba.watermark`      | `boolean`                     | No       | Add watermark to the video. Defaults to `false`                                    |
| `providerOptions.alibaba.pollIntervalMs` | `number`                      | No       | How often to check task status. Defaults to `5000`                                 |
| `providerOptions.alibaba.pollTimeoutMs`  | `number`                      | No       | Maximum wait time. Defaults to `600000` (10 minutes)                               |

### Wan example

```typescript filename="wan-image-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'alibaba/wan-v2.6-i2v-flash',
  prompt: 'The cat waves hello and smiles',
  frameImages: [
    { image: 'https://example.com/cat.png', frameType: 'first_frame' },
  ],
  duration: 5,
  generateAudio: true,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

If you omit `frameImages`, you can still pass the first frame through `prompt.image` with `prompt.text`.

***

## Grok Imagine Video

Grok Imagine Video (by xAI) can animate images into videos. The output defaults to the input image's aspect ratio. If you specify `aspectRatio`, it will override this and stretch the image to the desired ratio.

[Browse the latest Grok video models](/ai-gateway/models?capabilities=video-generation\&providers=xai) on the AI Gateway Models page.

> **💡 Note:** Grok Imagine Video does not support first-last-frame interpolation. A
> `last_frame` entry in `frameImages` is ignored with a warning. To continue
> from a video's last frame, use [video extension](/docs/ai-gateway/modalities/video-generation/video-extension)
> mode instead.

### Grok parameters

| Parameter                            | Type                          | Required | Description                                                                                   |
| ------------------------------------ | ----------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| `prompt`                             | `string` or `{ image, text }` | Yes      | Text description of the motion or animation                                                   |
| `frameImages`                        | `Array<{ image, frameType }>` | No       | Pass a `first_frame` entry to animate from an image. Takes priority over `prompt.image`       |
| `prompt.image`                       | `string`                      | No       | URL of the image to animate. Used when `frameImages` is omitted                               |
| `duration`                           | `number`                      | No       | Video length in seconds (1-15)                                                                |
| `aspectRatio`                        | `string`                      | No       | Override the input image's aspect ratio (stretches the image)                                 |
| `providerOptions.xai.resolution`     | `'480p'` | `'720p'`          | No       | Video resolution. Defaults to 480p                                                            |
| `providerOptions.xai.pollIntervalMs` | `number`                      | No       | How often to check task status. Defaults to `5000`                                            |
| `providerOptions.xai.pollTimeoutMs`  | `number`                      | No       | Maximum wait time. Defaults to `600000` (10 minutes)                                          |

### Grok example

```typescript filename="grok-image-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'xai/grok-imagine-video',
  prompt: 'The cat slowly turns its head and blinks',
  frameImages: [
    { image: 'https://example.com/cat.png', frameType: 'first_frame' },
  ],
  duration: 5,
  providerOptions: {
    xai: {
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

If you omit `frameImages`, you can still pass the first frame through `prompt.image` with optional `prompt.text`.

***

## ByteDance Seedance

ByteDance's Seedance models animate images into videos with support for first-and-last-frame control, multi-reference images, and optional audio generation. All models output MP4 at 24fps. Seedance requires image URLs (not buffers). Use [Vercel Blob](/docs/vercel-blob) to host local images.

[Browse the latest Seedance video models](/ai-gateway/models?capabilities=video-generation\&providers=bytedance) on the AI Gateway Models page.

### Seedance parameters

| Parameter                                   | Type                    | Required | Description                                                                                                                            |
| ------------------------------------------- | ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt.image`                              | `string`                | Yes      | URL of the image to animate (first frame)                                                                                              |
| `prompt.text`                               | `string`                | No       | Description of the motion or animation                                                                                                 |
| `aspectRatio`                               | `string`                | No       | Aspect ratio (`'16:9'`, `'4:3'`, `'1:1'`, `'3:4'`, `'9:16'`, `'21:9'`, `'adaptive'`). `'adaptive'` uses the input image's aspect ratio |
| `resolution`                                | `string`                | No       | Resolution (`'854x480'`, `'1280x720'`, `'1920x1080'`). Lite I2V supports up to 720p                                                    |
| `duration`                                  | `number`                | No       | Video length in seconds. v1.5: 4-12s. v1.0: 2-12s                                                                                      |
| `providerOptions.bytedance.lastFrameImage`  | `string`                | No       | URL of the last frame image. Enables first+last frame mode. See [first and last frame](#seedance-first-and-last-frame)                 |
| `providerOptions.bytedance.referenceImages` | `string[]`              | No       | 1-4 reference image URLs. Lite I2V only. See [multi-reference images](#seedance-multi-reference-images)                                |
| `generateAudio`                             | `boolean`               | No       | Generate synchronized audio. Seedance v1.5 Pro and Seedance 2.0 series only                                                                                    |
| `providerOptions.bytedance.watermark`       | `boolean`               | No       | Add a watermark to the video                                                                                                           |
| `providerOptions.bytedance.cameraFixed`     | `boolean`               | No       | Fix the camera position during generation                                                                                              |
| `providerOptions.bytedance.returnLastFrame` | `boolean`               | No       | Return the last frame of the generated video. Useful for chaining consecutive videos                                                   |
| `providerOptions.bytedance.serviceTier`     | `'default'` | `'flex'` | No       | `'default'` for online inference. `'flex'` for offline at 50% cost, higher latency                                                     |
| `providerOptions.bytedance.pollIntervalMs`  | `number`                | No       | How often to check task status. Defaults to `3000`                                                                                     |
| `providerOptions.bytedance.pollTimeoutMs`   | `number`                | No       | Maximum wait time. Defaults to `300000` (5 minutes)                                                                                    |

### Seedance example

```typescript filename="seedance-image-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-v1.5-pro',
  prompt: {
    image: 'https://example.com/cat.png',
    text: 'The cat slowly turns its head and blinks',
  },
  duration: 5,
  providerOptions: {
    bytedance: {
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### Seedance first and last frame

Generate a video that transitions smoothly between a starting and ending image. Pass both frames through `frameImages`, tagging one `first_frame` and one `last_frame`. Seedance requires image URLs (not buffers), so host local images on [Vercel Blob](/docs/vercel-blob) first.

```typescript filename="seedance-first-last-frame.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-v1.5-pro',
  prompt: 'Create a 360-degree orbiting camera shot based on this photo',
  frameImages: [
    {
      image: 'https://example.com/first-frame.jpg',
      frameType: 'first_frame',
    },
    { image: 'https://example.com/last-frame.jpg', frameType: 'last_frame' },
  ],
  duration: 5,
  generateAudio: true,
  providerOptions: {
    bytedance: {
      watermark: false,
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

If you omit `frameImages`, you can still set the first frame via `prompt.image` and the last frame via the legacy `providerOptions.bytedance.lastFrameImage` key.

### Seedance multi-reference images

Provide 1-4 reference images that the model uses to faithfully reproduce object shapes, colors, and textures. Use `[Image 1]`, `[Image 2]`, etc. in your prompt to reference each image. Requires the `seedance-v1.0-lite-i2v` model.

You can pass these through the provider-agnostic `inputReferences` field, or the legacy `providerOptions.bytedance.referenceImages` key shown below. Either way, refer to each image with `[Image 1]`, `[Image 2]`, and so on in your prompt. When using `inputReferences` with URLs, tag each entry with an explicit media type (for example, `{ data: url, mediaType: 'image/png' }`). Seedance treats untyped URL references as images and emits a warning.

For reference-to-video generation with Seedance 2.0, including video references, see [Seedance reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video#bytedance-seedance).

| Parameter                                   | Type       | Required | Description                       |
| ------------------------------------------- | ---------- | -------- | --------------------------------- |
| `providerOptions.bytedance.referenceImages` | `string[]` | Yes      | Array of 1-4 reference image URLs |

```typescript filename="seedance-multi-reference.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'bytedance/seedance-v1.0-lite-i2v',
  prompt:
    'A boy wearing glasses and a blue T-shirt from [Image 1] and a corgi dog from [Image 2], sitting on the lawn from [Image 3], in 3D cartoon style',
  aspectRatio: '16:9',
  duration: 5,
  providerOptions: {
    bytedance: {
      referenceImages: [
        'https://example.com/boy.png',
        'https://example.com/corgi.png',
        'https://example.com/lawn.png',
      ],
      watermark: false,
      pollTimeoutMs: 600000,
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

> **💡 Note:** Video generation can take several minutes. Set `pollTimeoutMs` to at least 10
> minutes (600000ms) for reliable operation.

***


---

[View full sitemap](/docs/sitemap)
