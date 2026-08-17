---
title: Video Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/video
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/video"
last_updated: 2026-07-24
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities/video-generation/image-to-video
  - /docs/ai-gateway/modalities/video-generation/motion-control
  - /docs/vercel-blob
summary: Generate videos from text prompts, images, or video input using AI Gateway, either over a single request or as a background job.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/video.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "92c1f216e3eebc9bc3f673a61a07bb11f94dd040ed69e52fcf9d030b89b8f3bf"
---

# Video Generation Quickstart

This quickstart walks you through generating your first video with AI Gateway. Supported models include Veo, Kling, Wan, Grok Imagine Video, and Seedance.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation?from=related)
- [Image](https://vercel.com/docs/ai-gateway/getting-started/image?from=related) — Generate images from text prompts using AI Gateway.
- [Text](https://vercel.com/docs/ai-gateway/getting-started/text?from=related) — Generate and stream text responses using AI Gateway.
- [Using Chat Completions API](https://vercel.com/docs/ai-gateway/modalities/image-generation/openai?from=related) — Generate and edit images using AI models through Vercel AI Gateway with the Chat Completions API.
- [Using AI SDK](https://vercel.com/docs/ai-gateway/modalities/image-generation/ai-sdk?from=related) — Generate and edit images using AI models through Vercel AI Gateway with the AI SDK.
- [Video Editing](https://vercel.com/docs/ai-gateway/modalities/video-generation/video-editing?from=related) — Edit existing videos using text prompts with Grok Imagine Video through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/video.graph.md](/docs/ai-gateway/getting-started/video.graph.md)
<!-- /docsgraph:related -->

Generations can take minutes. The quickstart below holds one request to AI Gateway open for the whole generation, which is fine for scripts and long-lived servers. If you run somewhere with request timeouts, use [asynchronous video generation](#asynchronous-video-generation) instead and let AI Gateway run the generation as a background job.

> **💡 Note:** Video generation requires the latest version of AI SDK v6. Check your `ai` package version with `npm list ai`.

- ### Set up your project
  Create a new directory and initialize a Node.js project:
  ```bash filename="Terminal"
  mkdir ai-video-demo
  cd ai-video-demo
  pnpm init
  ```

- ### Install dependencies
  Install AI SDK v6 and development dependencies:
  #### npm
  ```bash filename="Terminal"
  npm install ai dotenv @types/node tsx typescript
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add ai dotenv @types/node tsx typescript
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add ai dotenv @types/node tsx typescript
  ```
  #### bun
  ```bash filename="Terminal"
  bun add ai dotenv @types/node tsx typescript
  ```
  If you already have AI SDK installed, upgrade to the latest version of AI SDK v6:
  ```bash filename="Terminal"
  pnpm update ai@latest
  ```
  The `@latest` forces an upgrade even if your package.json has an older version like `^5.0.0`.

- ### Set up your API key
  Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) in your Vercel dashboard and click **Create key** to generate a new API key.

  Create a `.env.local` file and save your API key:
  ```bash filename=".env.local"
  AI_GATEWAY_API_KEY=your_ai_gateway_api_key
  ```

- ### Generate a video
  Create an `index.ts` file:
  ```typescript filename="index.ts"
  import { experimental_generateVideo as generateVideo } from 'ai';
  import fs from 'node:fs';
  import 'dotenv/config';

  async function main() {
    const result = await generateVideo({
      model: 'google/veo-3.1-generate-001',
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
  > If you hit timeout issues, see [extending timeouts for Node.js](/docs/ai-gateway/modalities/video-generation#extending-timeouts-for-node.js), or switch to [asynchronous video generation](#asynchronous-video-generation) so no single request stays open.
  The generated video will be saved as `output.mp4` in your project directory.

- ### Next steps
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
import 'dotenv/config';

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

Some providers return a hosted URL and others return bytes inline. Either way you get `result.videos[0].uint8Array`, because the SDK downloads hosted results for you. AI Gateway reports the underlying job on `result.providerMetadata.gateway.asyncJob`, including how long a hosted result stays reachable. See [how results come back](/docs/ai-gateway/modalities/video-generation#how-results-come-back).

To start a job in one process and read it in another, call `doStart` and `doStatus` yourself instead of passing `poll`. See [start now, fetch later](/docs/ai-gateway/modalities/video-generation#start-now-fetch-later).

### When to use the asynchronous flow

Both flows produce the same result. Choose based on how your code runs:

- **Use `poll`** when you run in serverless functions or other environments with request timeouts, when generations run long (higher resolutions, longer durations), or when you want each network request to be short and retryable.
- **Skip `poll`** for scripts and long-lived servers where holding one request open for a few minutes is fine.

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

Polling keeps a process alive until the job finishes. To have the result pushed to you instead, start the job with a `webhookUrl` and let AI Gateway call you back. To try it without deploying anything, point `webhookUrl` at a request inspector like [webhook.site](https://webhook.site).

> **💡 Note:** Requires `ai@7.0.50` or later and `@ai-sdk/gateway@4.0.44` or later. This flow
> calls the video model's `doStart` and `doStatus` methods directly instead of
> `experimental_generateVideo`. The top-level `webhook` option of
> `experimental_generateVideo` does not deliver webhooks with AI Gateway models;
> the SDK warns and falls back to polling instead.

Start the job and store the operation it returns. You need it later to read the result:

```typescript filename="start-job.ts"
import { gateway } from '@ai-sdk/gateway';

const model = gateway.videoModel('google/veo-3.1-generate-001');

const started = await model.doStart({
  prompt: 'A paper plane looping over a city at dusk',
  duration: 5,
  webhookUrl: 'https://example.com/api/video-webhook',
});

// Store the operation keyed by its job ID so the webhook can look it up later.
const { jobId, webhookSigningSecret } =
  started.providerMetadata.gateway.asyncJob;
await saveOperation(jobId, started.operation);
await saveSigningSecret(webhookSigningSecret);
```

When the job finishes, AI Gateway posts one of three event types to your endpoint: `video.generation.completed`, `video.generation.failed`, or `video.generation.cancelled`. The payload carries only terminal facts: the job ID, status, and timestamps. The `data.jobId` is the same job ID the start response returned in `asyncJob` — the key the handler uses to find the stored operation. The payload never carries video URLs or bytes, so fetch the result with `doStatus`:

```typescript filename="app/api/video-webhook/route.ts"
import { createHmac, timingSafeEqual } from 'node:crypto';
import { gateway } from '@ai-sdk/gateway';

const model = gateway.videoModel('google/veo-3.1-generate-001');

// Deliveries are signed: v1 is the HMAC-SHA256 of "<t>.<raw body>" under your
// signing secret. Check the digest and reject old timestamps.
function verifySignature(header: string, rawBody: string, secret: string) {
  const timestamp = header.match(/(?:^|,)t=(\d+)/)?.[1];
  const digest = header.match(/(?:^|,)v1=([0-9a-f]+)/)?.[1];
  if (!timestamp || !digest) return false;

  const expected = createHmac('sha256', secret)
    .update(`${timestamp}.${rawBody}`, 'utf8')
    .digest('hex');
  const provided = Buffer.from(digest, 'hex');
  const computed = Buffer.from(expected, 'hex');
  if (
    provided.length !== computed.length ||
    !timingSafeEqual(provided, computed)
  ) {
    return false;
  }

  // Reject deliveries older than five minutes.
  return Math.abs(Date.now() / 1000 - Number(timestamp)) <= 5 * 60;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-ai-gateway-signature');
  const secret = await loadSigningSecret();

  if (!signature || !verifySignature(signature, rawBody, secret)) {
    return new Response(null, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.type === 'video.generation.completed') {
    // Look up the operation you stored at start time by its job ID.
    const status = await model.doStatus({
      operation: await loadOperation(event.data.jobId),
    });

    if (status.status === 'completed') {
      const [video] = status.videos;
      console.log(video.type === 'url' ? video.url : video.mediaType);
    } else {
      console.log(`Job ended as ${status.status}`);
    }
  } else {
    console.log(`Job ${event.data.jobId}: ${event.type}`);
  }

  return new Response(null, { status: 204 });
}
```

`doStatus` resolves to `pending`, `completed`, or `error`. On `completed`, each entry in `videos` is a URL (`{ type: 'url', url, mediaType }`), inline base64, or raw bytes. Most providers return a URL. On `error`, read `status.error`.

This is the same `doStatus` call a polling loop makes, so switching to webhooks doesn't change how you read results. For the full option list, see [webhook-driven completion](/docs/ai-gateway/modalities/video-generation#webhook-driven-completion).

Deliveries are signed with the secret from the start call. The `x-ai-gateway-signature` header carries a timestamp and an HMAC-SHA256 digest of `"<timestamp>.<raw body>"` — verify both before trusting the payload, as in the snippet above.

Delivery is best-effort with retries. AI Gateway expects a 2xx response within 10 seconds and does not follow redirects. Every retry of the same terminal event carries the same `x-ai-gateway-idempotency-key` header (`<jobId>-<status>`), so deduplicate on it if processing a result twice would cause side effects. A lost delivery never changes the job's state — the result stays available through `doStatus`.

> **💡 Note:** Video models vary in their input formats and required parameters. Some accept buffers while others require URLs. Always check the [Video Generation docs](/docs/ai-gateway/modalities/video-generation) for model-specific requirements.

## More ways to generate video

### Image-to-video

Transform a single image into a video by adding motion. The image becomes the video content itself.

```typescript filename="image-to-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';
import 'dotenv/config';

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
import 'dotenv/config';

const firstFrame = fs.readFileSync('start.png');
const lastFrame = fs.readFileSync('end.png');

const result = await generateVideo({
  model: 'klingai/kling-v2.6-i2v',
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
import 'dotenv/config';

const result = await generateVideo({
  model: 'klingai/kling-v2.6-motion-control',
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
import 'dotenv/config';

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
import 'dotenv/config';

// Upload image to Vercel Blob
const imageBuffer = fs.readFileSync('input.png');
const { url: imageUrl } = await put('input.png', imageBuffer, {
  access: 'public',
});

const result = await generateVideo({
  model: 'klingai/kling-v2.6-i2v',
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
