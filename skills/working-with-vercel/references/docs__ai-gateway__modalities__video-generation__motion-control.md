---
title: Motion Control Video Generation
product: vercel
url: /docs/ai-gateway/modalities/video-generation/motion-control
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation/motion-control"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities
related:
  - /docs/vercel-blob
summary: Transfer motion from a reference video to a character image using KlingAI through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation/motion-control.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "2a1bad3b54574f075e6a23b2b472e95f0fbc20d8d8f17cd2b86281e67276f255"
---

# Motion Control Video Generation

Transfer motion from a reference video to a character in an image. The model analyzes the movements in your reference video and applies them to your character, creating a video where the character performs those same actions.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Kling AI](https://ai-sdk.dev/providers/ai-sdk-providers/klingai?from=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation?from=related)
- [Video / Async Video](https://vercel.com/docs/ai-gateway/getting-started/video?from=related) — Generate videos from text prompts, images, or video input using AI Gateway, either over a single request or as a backgro
- [Image-to-Video](https://vercel.com/docs/ai-gateway/modalities/video-generation/image-to-video?from=related) — Animate static images into videos using Google Veo, KlingAI, Wan, Grok Imagine Video, or ByteDance Seedance through AI G
- [Reference-to-Video](https://vercel.com/docs/ai-gateway/modalities/video-generation/reference-to-video?from=related) — Generate videos featuring characters from reference images or videos using Google Veo, KlingAI, Wan, Seedance, or Grok I
- [Text-to-Video](https://vercel.com/docs/ai-gateway/modalities/video-generation/text-to-video?from=related) — Generate videos from text prompts using Google Veo, KlingAI, Wan, Grok Imagine Video, or ByteDance Seedance through AI G
- [Video Editing](https://vercel.com/docs/ai-gateway/modalities/video-generation/video-editing?from=related) — Edit existing videos using text prompts with Grok Imagine Video through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation/motion-control.graph.md](/docs/ai-gateway/modalities/video-generation/motion-control.graph.md)
<!-- /docsgraph:related -->

## KlingAI

KlingAI's motion control models transfer motion from a reference video to a character image. The character image accepts buffers, URLs, or base64. The reference video must be a URL (use [Vercel Blob](/docs/vercel-blob) for local files).

[Browse the latest KlingAI video models](/ai-gateway/models?capabilities=video-generation\&providers=klingai) on the AI Gateway Models page.

### KlingAI parameters

| Parameter                                      | Type                   | Required | Description                                                                                         |
| ---------------------------------------------- | ---------------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `prompt.image`                                 | `string \| Buffer`     | Yes      | Character image (buffer, URL, or base64). See [image requirements](#klingai-image-requirements).    |
| `prompt.text`                                  | `string`               | No       | Text prompt for scene elements or camera movement. Max 2500 characters.                             |
| `providerOptions.klingai.videoUrl`             | `string`               | Yes      | URL to reference motion video. See [video requirements](#klingai-video-requirements).               |
| `providerOptions.klingai.characterOrientation` | `'image'` | `'video'` | Yes      | `'image'` matches image orientation (max 10s video). `'video'` matches video orientation (max 30s). |
| `providerOptions.klingai.mode`                 | `'std'` | `'pro'`     | Yes      | `'std'` for standard quality. `'pro'` for professional quality.                                     |
| `providerOptions.klingai.keepOriginalSound`    | `'yes'` | `'no'`      | No       | Keep audio from reference video. Defaults to `'yes'`.                                               |
| `providerOptions.klingai.watermarkInfo`        | `object`               | No       | Set `{ enabled: true }` to generate watermarked result.                                             |
| `providerOptions.klingai.pollIntervalMs`       | `number`               | No       | How often to check task status. Defaults to `5000`.                                                 |
| `providerOptions.klingai.pollTimeoutMs`        | `number`               | No       | Maximum wait time. Defaults to `600000` (10 minutes).                                               |

### KlingAI image requirements

The character image (`prompt.image`) must meet these requirements:

- **Formats**: `.jpg`, `.jpeg`, `.png`
- **File size**: 10MB or less
- **Dimensions**: 300px to 65536px
- **Aspect ratio**: Between 1:2.5 and 2.5:1

For best results:

- Character proportions should match the reference motion. Avoid driving half-body characters with full-body motions.
- Show clear upper body or full body including limbs and head. Avoid occlusion.
- Avoid extreme orientations (upside down, lying flat). Character should occupy sufficient screen area.
- Supports realistic and stylized characters, including humans, humanoid animals, some pure animals, and humanoid body proportion characters.

When using base64 encoding, submit only the raw base64 string without any prefix:

```ts
// Correct
const image = 'iVBORw0KGgoAAAANSUhEUgAAAAUA...';

// Incorrect - do not include data: prefix
const image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...';
```

### KlingAI video requirements

The reference video (`providerOptions.klingai.videoUrl`) must meet these requirements:

- **Formats**: `.mp4`, `.mov`
- **File size**: 100MB or less
- **Dimensions**: 340px to 3850px
- **Duration**: Minimum 3 seconds. Maximum depends on `characterOrientation`:
  - `'image'`: Maximum 10 seconds
  - `'video'`: Maximum 30 seconds

For best results:

- Character should show clear upper body or full body including all limbs and head. Avoid occlusion.
- Use single-person action video. For multiple people, actions are taken from the character with the largest screen proportion.
- Use real person actions. Some stylized characters with humanoid body proportions may work.
- Video should be a single continuous shot with character always visible. Avoid cuts or camera movements.
- Avoid overly fast actions. Relatively stable actions produce better results.

For complex or fast motions, results may be shorter than the uploaded video duration. The model can only extract valid motion segments and requires a minimum of 3 seconds of usable continuous motion.

### KlingAI example

```typescript filename="motion-control.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'klingai/kling-v3.0-motion-control',
  prompt: {
    image: fs.readFileSync('./character.png'),
  },
  providerOptions: {
    klingai: {
      videoUrl: 'https://example.com/dance-reference.mp4',
      characterOrientation: 'video',
      mode: 'std',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### KlingAI example with Vercel Blob

If you have a local video file, upload it to [Vercel Blob](/docs/vercel-blob) first:

```typescript filename="motion-control-with-blob.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { put } from '@vercel/blob';
import fs from 'node:fs';

const referenceVideo = fs.readFileSync('./dance.mp4');
const { url: videoUrl } = await put('dance.mp4', referenceVideo, {
  access: 'public',
});

const result = await generateVideo({
  model: 'klingai/kling-v3.0-motion-control',
  prompt: {
    image: fs.readFileSync('./character.png'),
  },
  providerOptions: {
    klingai: {
      videoUrl: videoUrl,
      characterOrientation: 'video',
      mode: 'std',
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
