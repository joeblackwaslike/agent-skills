---
title: Video Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/video
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/video"
last_updated: 2026-09-02
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities/video-generation/image-to-video
  - /docs/ai-gateway/modalities/video-generation/motion-control
  - /docs/vercel-blob
summary: Generate videos from text prompts, images, or video input using AI Gateway, either over a single request or as a background job.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/video.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "57fda042a43b5c57c18bf8c3f3195daee28f6ed95c8e5b77d239ac64b79c0e9c"
---

# Video Generation Quickstart

This quickstart walks you through generating your first video with AI Gateway. Supported models include Veo, Kling, Wan, Grok Imagine Video, and Seedance.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Kling video models on AI Gateway](https://vercel.com/changelog/kling-video-models-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Veo video models on AI Gateway](https://vercel.com/changelog/veo-video-models-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Wan models on AI Gateway](https://vercel.com/changelog/wan-models-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [ByteDance](https://ai-sdk.dev/providers/ai-sdk-providers/bytedance?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Kling AI](https://ai-sdk.dev/providers/ai-sdk-providers/klingai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Reference-to-Video Generation](https://vercel.com/docs/ai-gateway/modalities/video-generation/reference-to-video?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related) — Generate videos featuring characters from reference images or videos using Google Veo, KlingAI, Wan, Seedance, or Grok I
- [Text-to-Video Generation](https://vercel.com/docs/ai-gateway/modalities/video-generation/text-to-video?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related) — Generate videos from text prompts using Google Veo, KlingAI, Wan, Grok Imagine Video, or ByteDance Seedance through AI G

Full cross-link map for this page: [/docs/ai-gateway/getting-started/video.graph.md](/docs/ai-gateway/getting-started/video.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Generations can take minutes. The quickstart below holds one request to AI Gateway open for the whole generation, which is fine for scripts and long-lived servers. If you run somewhere with request timeouts, use [asynchronous video generation](#asynchronous-video-generation) instead and let AI Gateway run the generation as a background job.

> **💡 Note:** Video generation requires AI SDK 6 or later. Check your `ai` package version with `npm list ai`.

## Prerequisites

Before you begin, you need:

- A Vercel account with a valid payment method to unlock free AI Gateway Credits
- Node.js 22 or later
- An AI Gateway API key or a Vercel OIDC token

### Set up your API key

Open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys) in the Vercel dashboard, enter a name, and create the key.

After you create your project in the next section, add a `.env.local` file to the project root and save your API key:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

> **💡 Note:** Instead of using an API key, you can use [OIDC
> tokens](/docs/ai-gateway/authentication-and-byok/oidc) to authenticate your
> requests.

## Generate your first video

Install Vercel's focused AI Gateway skill before delegating this setup:

```bash filename="Terminal"
npx skills add vercel/vercel-plugin --skill ai-gateway
```

**Agent prompt**

```text
Use the AI Gateway skill to add video generation to this project. Read AI_GATEWAY_API_KEY from the environment or .env.local, and stop and tell me to create a key if it is not set anywhere. Choose a current video model such as google/veo-3.1-fast-generate-001 from the live AI Gateway model list, save the generated video to a file, run the result, and run the project's type checker. Report the files changed and command output.
```

- ### Set up your project
  Create a new directory and initialize a Node.js project:
  ```bash filename="Terminal"
  mkdir ai-video-demo
  cd ai-video-demo
  pnpm init
  pnpm pkg set type=module
  ```
  Setting the project to ESM lets the examples below use top-level `await`.

- ### Install dependencies
  Install the AI SDK and development dependencies:
  #### npm
  ```bash filename="Terminal"
  npm install ai@latest dotenv @types/node tsx typescript
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add ai@latest dotenv @types/node tsx typescript
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add ai@latest dotenv @types/node tsx typescript
  ```
  #### bun
  ```bash filename="Terminal"
  bun add ai@latest dotenv @types/node tsx typescript
  ```
  If you already have AI SDK installed, upgrade to the latest version of AI SDK v6:
  ```bash filename="Terminal"
  pnpm update ai@latest
  ```
  The `@latest` forces an upgrade even if your package.json has an older version like `^5.0.0`.

- ### Generate a video
  Create an `index.ts` file:
  ```typescript filename="index.ts"
  import { experimental_generateVideo as generateVideo } from 'ai';
  import fs from 'node:fs';
  import { config } from 'dotenv';

  config({ path: '.env.local' });

  async function main() {
    const result = await generateVideo({
      model: 'google/veo-3.1-fast-generate-001',
      prompt: 'A serene mountain landscape at sunset with clouds drifting by',
      aspectRatio: '16:9',
      duration: 8,
    });

    // Save the generated video
    fs.writeFileSync('output.mp4', result.videos[0].uint8Array);

    console.log('Video saved to output.mp4');
  }

  main().catch(console.error);
  ```
  Run your script:
  ```bash filename="Terminal"
  pnpm tsx index.ts
  ```
  > **💡 Note:** Video generation can take several minutes.
  > If you hit timeout issues, see [extending timeouts for Node.js](/docs/ai-gateway/modalities/video-generation#extending-timeouts-for-nodejs), or switch to [asynchronous video generation](#asynchronous-video-generation) so no single request stays open.
  The generated video will be saved as `output.mp4` in your project directory.

## Next steps

- See [supported video generation models](/ai-gateway/models?capabilities=video-generation)
- Learn about [image-to-video generation](/docs/ai-gateway/modalities/video-generation/image-to-video) to animate images
- Explore [KlingAI motion control](/docs/ai-gateway/modalities/video-generation/motion-control) for character animation
- Run generations as background jobs with [asynchronous video generation](#asynchronous-video-generation)

## Asynchronous video generation

The quickstart above holds one HTTP request to AI Gateway open for the whole generation. The asynchronous flow splits that into a start call and a series of status checks: AI Gateway tracks the generation as a background job, and the AI SDK polls it to completion for you. Your process can disconnect or retry, and the generation keeps running either way.

> **💡 Note:** Asynchronous video generation requires `ai@7.0.50` or later and
> `@ai-sdk/gateway@4.0.44` or later. Install or upgrade with
> `pnpm add ai@latest @ai-sdk/gateway@latest`.

### Generate a video asynchronously

Passing the `poll` option is what opts you into the asynchronous flow. The same `experimental_generateVideo` call otherwise behaves like the quickstart above:

```typescript filename="async-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

async function main() {
  const result = await generateVideo({
    model: 'google/veo-3.1-generate-001',
    prompt: 'A serene mountain landscape at sunset with clouds drifting by',
    aspectRatio: '16:9',
    duration: 8,
    // Run as an asynchronous AI Gateway job: start the generation, then
    // poll its status until it completes.
    poll: {
      intervalMs: 5000, // time between status checks (default: 5000)
      timeoutMs: 600000, // give up after 10 minutes (default: 600000)
    },
  });

  // Save the generated video
  fs.writeFileSync('output.mp4', result.videos[0].uint8Array);

  console.log('Video saved to output.mp4');
}

main().catch(console.error);
```

Behind the scenes, the SDK sends one start request, AI Gateway accepts the generation as a job, and each status check is a short request of its own, so no single connection stays open for the full generation. Raise `timeoutMs` for models or settings that take longer than 10 minutes.

`poll` also takes a `delay` function, which replaces the timer the SDK waits on between status checks. Pass your workflow's own sleep to keep a durable run from holding a live timer for the whole generation. See [asynchronous generation](/docs/ai-gateway/modalities/video-generation#asynchronous-generation) for the full option list.

Every input style in [More ways to generate video](#more-ways-to-generate-video) works with `poll` as well — use hosted URLs for image/video inputs; inline file data on the asynchronous flow is limited to ~300KB.

Some providers return a hosted URL and others return bytes inline. Either way you get `result.videos[0].uint8Array`, because the SDK downloads hosted results for you. AI Gateway reports the underlying job on `result.providerMetadata.gateway.asyncJob`. Its `result` field takes at least two shapes: a hosted result carries `expiresAt`, while an inline one reports `delivery: 'inline'` and no expiry at all, so read `expiresAt` defensively. See [how results come back](/docs/ai-gateway/modalities/video-generation#how-results-come-back).

To be notified when a job finishes instead of polling for it, pass a `webhook` factory. See [webhook-driven completion](#webhook-driven-completion) below.

### When to use the asynchronous flow

Both flows produce the same result. Choose based on how your code runs:

- **Use `poll`** when you run in serverless functions or other environments with request timeouts, when generations run long (higher resolutions, longer durations), or when you want each network request to be short and retryable.
- **Skip `poll`** for scripts and long-lived servers where holding one request open for a few minutes is fine.

### Start now, check later

Even with `poll`, one `generateVideo` call stays alive until the job finishes. When the process that submits the job should not wait at all — fanning out many jobs at once, or enqueuing from a function that needs to return immediately — split the flow yourself with `experimental_startVideo` and `experimental_getVideoStatus`. They take the same options as `generateVideo`, all optional:

> **💡 Note:** `experimental_startVideo` and `experimental_getVideoStatus` require
> `ai@7.0.76` or later and `@ai-sdk/gateway@4.0.61` or later. Install or
> upgrade with `pnpm add ai@latest @ai-sdk/gateway@latest`.

```typescript filename="start-video.ts"
import {
  experimental_getVideoStatus as getVideoStatus,
  experimental_startVideo as startVideo,
} from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const model = 'google/veo-3.1-generate-001';

async function main() {
  // Returns as soon as AI Gateway accepts the job.
  const { operation } = await startVideo({
    model,
    prompt: 'A serene mountain landscape at sunset with clouds drifting by',
  });

  // `operation` is JSON-serializable: persist it and check from any process,
  // on any schedule. Each call is one status request — no polling loop inside.
  let status = await getVideoStatus(model, { operation });
  while (status.status === 'pending') {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    status = await getVideoStatus(model, { operation });
  }

  if (status.status === 'error') {
    throw new Error(`Video generation failed: ${status.error}`);
  }

  // Unlike generateVideo, the status result is not auto-downloaded: each
  // video is a hosted URL or inline bytes, depending on the provider.
  const [video] = status.videos;
  if (video.type === 'url') {
    const response = await fetch(video.url);
    fs.writeFileSync(
      'output.mp4',
      new Uint8Array(await response.arrayBuffer()),
    );
  } else if (video.type === 'binary') {
    fs.writeFileSync('output.mp4', video.data);
  }

  console.log('Video saved to output.mp4');
}

main().catch(console.error);
```

`startVideo` also accepts a `webhookUrl`, so the submitter can exit immediately and let a webhook receiver fetch the result — no status checks at all. See [webhook-driven completion without waiting](/docs/ai-gateway/modalities/video-generation#webhook-driven-completion) on the capabilities page.

### Safe retries

Starting a video generation costs money, so the SDK makes the start call idempotent. It sends an `idempotency-key` header that stays stable across its internal retries, and AI Gateway deduplicates on it, so a retried start never creates or bills a second generation. If you build your own retry loop around `generateVideo`, pass your own key so your retries deduplicate too:

```typescript filename="retry.ts"
const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: 'A serene mountain landscape at sunset',
  headers: { 'idempotency-key': 'order-1234-video' },
  poll: {},
});
```

### Webhook-driven completion

Polling keeps a process alive until the job finishes. To be notified instead, pass a `webhook` factory and the SDK registers your URL with the job. To try it without deploying anything, point the URL at a request inspector like [webhook.site](https://webhook.site).

> **💡 Note:** Upgrade before using the `webhook` option: `pnpm add ai@latest
>   @ai-sdk/gateway@latest`. On older releases the option is ignored, and the SDK
> adds a warning to `result.warnings` and polls instead.

The factory returns the URL to register and a `received` promise. Mint a token first and put it in the callback URL, so the signing secret and the wait key off the same value:

```typescript filename="generate-with-webhook.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { randomUUID } from 'node:crypto';
import { gatewayWithCapture } from './capture-secret';
import { waitForDelivery } from './wait-for-delivery';

// One token per generation. The job ID cannot serve here, since it does not
// exist until the start request comes back.
const token = randomUUID();
const callbackUrl = `https://example.com/api/video-webhook?token=${token}`;

const result = await generateVideo({
  model: gatewayWithCapture(token).videoModel('google/veo-3.1-generate-001'),
  prompt: 'A paper plane looping over a city at dusk',
  n: 1,
  webhook: async () => ({
    url: callbackUrl,
    // Resolves once your endpoint has a verified delivery for this token.
    received: waitForDelivery(token),
  }),
  poll: { timeoutMs: 10 * 60 * 1000 },
});

console.log(result.videos[0].uint8Array);
```

`poll.timeoutMs` doubles as the webhook timeout, so the call throws if nothing arrives inside it. The invocation stays alive while it waits, so webhooks save you the status requests rather than the wait itself.

When the job finishes, AI Gateway posts one of three event types to your endpoint: `video.generation.completed`, `video.generation.failed`, or `video.generation.cancelled`. The payload carries terminal facts only, so it never includes video URLs or bytes:

```json filename="delivery payload"
{
  "type": "video.generation.completed",
  "data": {
    "jobId": "job_01M0BR9PFAW07NGK9813RGPJJ2",
    "modelId": "alibaba/wan-v2.6-t2v",
    "status": "completed",
    "createdAt": 1787100977641,
    "completedAt": 1787101050089
  }
}
```

`data.jobId` identifies the job and `data.modelId` names the model that ran, so one endpoint can serve several models without hardcoding any of them. Your endpoint verifies the delivery and records it, and the waiting call picks it up:

```typescript filename="app/api/video-webhook/route.ts"
import { verifySignature } from './verify-delivery';

export async function POST(request: Request) {
  // The token comes from the callback URL, so the secret is in hand before the
  // body is parsed. Nothing here trusts the payload until the digest passes.
  const token = new URL(request.url).searchParams.get('token');
  const rawBody = await request.text();
  const signature = request.headers.get('x-ai-gateway-signature');
  const secret = token ? await db.loadSecret(token) : undefined;

  if (
    !token ||
    !signature ||
    !secret ||
    !verifySignature({ header: signature, rawBody, secret })
  ) {
    return new Response(null, { status: 401 });
  }

  // Store headers alongside the body: the SDK's `received` promise resolves to
  // `{ headers, body }`. The waiting `experimental_generateVideo` call takes it
  // from here and fetches the videos itself, so this handler never reads them.
  await db.saveDelivery(token, {
    headers: Object.fromEntries(request.headers),
    body: JSON.parse(rawBody),
  });

  return new Response(null, { status: 204 });
}
```

Deliveries are signed. The `x-ai-gateway-signature` header carries a timestamp and an HMAC-SHA256 digest of `"<timestamp>.<raw body>"`, so verify both against the raw bytes before trusting the payload. The signing secret is returned only on the job's start response, which `generateVideo` does not surface, so `gatewayWithCapture` above wraps `fetch` to store it under the token. See [verifying the delivery](/docs/ai-gateway/modalities/video-generation#verifying-the-delivery) for both helpers.

Delivery is best-effort with retries. AI Gateway expects a 2xx response within 10 seconds and does not follow redirects. Every retry of the same terminal event carries the same `x-ai-gateway-idempotency-key` header (`<jobId>-<status>`), so deduplicate on it if processing a result twice would cause side effects.

The `webhook` factory keeps the `generateVideo` call alive so it can return the videos itself. If the submitter should not wait at all, pass `webhookUrl` to [`experimental_startVideo`](#start-now-check-later) instead and let the receiver fetch the result — see [webhook-driven completion](/docs/ai-gateway/modalities/video-generation#webhook-driven-completion) on the capabilities page.

> **💡 Note:** Video models vary in their input formats and required parameters. Some accept buffers while others require URLs. Always check the [Video Generation docs](/docs/ai-gateway/modalities/video-generation) for model-specific requirements.

## More ways to generate video

### Image-to-video

Transform a single image into a video by adding motion. The image becomes the video content itself.

```typescript filename="image-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const result = await generateVideo({
  model: 'alibaba/wan-v2.6-i2v',
  prompt: 'The scene slowly comes to life with gentle movement',
  frameImages: [
    { image: 'https://example.com/your-image.png', frameType: 'first_frame' },
  ],
  duration: 5,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### First and last frame

Generate a video that transitions between a starting and ending image. The model interpolates the motion between them.

```typescript filename="first-last-frame.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const firstFrame = fs.readFileSync('start.png');
const lastFrame = fs.readFileSync('end.png');

const result = await generateVideo({
  model: 'klingai/kling-v3.0-i2v',
  prompt: {
    image: firstFrame,
    text: 'Smooth transition between the two scenes',
  },
  providerOptions: {
    klingai: {
      imageTail: lastFrame,
      mode: 'pro',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

### Motion control

Transfer motion from a reference video onto a character image. The character performs the movements from the reference video.

```typescript filename="motion-control.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

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

### Reference-to-video

Generate a new video scene featuring characters or content from reference media. References can be images or videos that show the model what your characters look like.

```typescript filename="reference-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const result = await generateVideo({
  model: 'alibaba/wan-v2.6-r2v',
  prompt: 'character1 and character2 have a friendly conversation in a cozy cafe',
  resolution: '1920x1080',
  duration: 4,
  // References can be images or videos
  inputReferences: [
    'https://example.com/cat.png',
    'https://example.com/dog.png',
  ],
  providerOptions: {
    alibaba: {
      shotType: 'single',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

## Using URLs for input media

Some video models require URLs instead of raw file data for image or video inputs. You can use [Vercel Blob](/docs/vercel-blob) to host your media files.

### Set up Vercel Blob

1. Go to the [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project (or create one)
3. Click **Storage** in the top navigation
4. Click **Create Database** and select **Blob**
5. Follow the prompts to create your blob store
6. Copy the `BLOB_READ_WRITE_TOKEN` to your `.env.local` file

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
BLOB_READ_WRITE_TOKEN=your_blob_token
```

Install the Vercel Blob package:

```bash filename="Terminal"
pnpm add @vercel/blob
```

### Upload and use media URLs

```typescript filename="url-input.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { put } from '@vercel/blob';
import fs from 'node:fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

// Upload image to Vercel Blob
const imageBuffer = fs.readFileSync('input.png');
const { url: imageUrl } = await put('input.png', imageBuffer, {
  access: 'public',
});

const result = await generateVideo({
  model: 'klingai/kling-v3.0-i2v',
  prompt: {
    image: imageUrl, // Pass URL instead of buffer
    text: 'The scene slowly comes to life with gentle movement',
  },
  providerOptions: {
    klingai: {
      mode: 'std',
    },
  },
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

See the [Vercel Blob docs](/docs/vercel-blob) for more details on uploading and managing files.

For more details, see the [Video Generation Capabilities docs](/docs/ai-gateway/modalities/video-generation).


---

[View full sitemap](/docs/sitemap)
