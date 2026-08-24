---
title: Video Generation
product: vercel
url: /docs/ai-gateway/modalities/video-generation
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/video-generation"
last_updated: 2026-07-24
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/video-generation/text-to-video
  - /docs/ai-gateway/modalities/video-generation/image-to-video
  - /docs/ai-gateway/modalities/video-generation/reference-to-video
  - /docs/ai-gateway/modalities/video-generation/motion-control
  - /docs/ai-gateway/modalities/video-generation/video-editing
summary: Generate videos from text prompts, images, or video input using AI models through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/video-generation.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "798f94e06c28508501d23f6d43a8e8c29a7ae41561f0d872cc80f05b85b77f00"
---

# Video Generation

> **💡 Note:** Video generation requires **AI SDK 6 or later** and uses the `experimental_generateVideo` function. This API is experimental and subject to change in future releases.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation?from=related)
- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related)
- [Build a Claude Managed Agent with Vercel Sandbox](https://vercel.com/kb/guide/run-claude-managed-agent-tools-with-vercel-sandbox?from=related) — Build a Claude Managed Agent with Vercel Sandbox: each session runs in a fresh microVM with credential brokering and a w
- [Build a web research agent with Workflow SDK](https://vercel.com/kb/guide/durable-web-research-agent-with-workflow-sdk?from=related) — Build a web research agent that searches the web and returns a cited report. Powered by AI SDK and Workflow SDK, it jour
- [ByteDance](https://ai-sdk.dev/providers/ai-sdk-providers/bytedance?from=related)
- [Kling AI](https://ai-sdk.dev/providers/ai-sdk-providers/klingai?from=related)
- [sitemap.md](https://vercel.com/docs/sitemap.md?from=related) — Learn about sitemap.md on Vercel.

Full cross-link map for this page: [/docs/ai-gateway/modalities/video-generation.graph.md](/docs/ai-gateway/modalities/video-generation.graph.md)
<!-- /docsgraph:related -->

AI Gateway supports video generation, letting you create videos from text prompts, images, or video input. You can control resolution, duration, aspect ratio, and audio through a unified API across multiple providers.

To see all supported video models, use the **Video** filter at the [AI Gateway Models page](/ai-gateway/models?capabilities=video-generation).

## Capabilities

Some video models are tagged by capability in their model name. You can also see capability tags on the [AI Gateway Models page](/ai-gateway/models?capabilities=video-generation) or via the `/v1/models` endpoint, which is useful for models that support multiple capabilities:

| Tag              | Capability                                                                              | Description                                                         |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `t2v`            | [Text-to-video](/docs/ai-gateway/modalities/video-generation/text-to-video)           | Generate video from a text prompt                                   |
| `i2v`            | [Image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video)         | Animate a static image into a video                                 |
| `r2v`            | [Reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video) | Generate video featuring characters from reference images or videos |
| `motion-control` | [Motion control](/docs/ai-gateway/modalities/video-generation/motion-control)         | Transfer motion from a reference video onto a character image       |
| -                | [Video editing](/docs/ai-gateway/modalities/video-generation/video-editing)           | Edit existing videos using text prompts                             |
| -                | [Video extension](/docs/ai-gateway/modalities/video-generation/video-extension)       | Continue a video from its last frame                                |

For example, `klingai/kling-v2.6-t2v` is a text-to-video model, `alibaba/wan-v2.6-i2v` is an image-to-video model, and `bytedance/seedance-2.5` covers text-to-video, image-to-video, reference-to-video, editing, and extension.

## Common parameters

These parameters work across all video models, though support varies by provider.

| Parameter         | Type                                     | Description                                                                                                                                        |
| ----------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prompt`          | `string` or `{ image, text }`            | Text description of the video. For image-to-video, use object format with `image` and `text`                                                       |
| `duration`        | `number`                                 | Video length in seconds. Supported range varies by model                                                                                           |
| `aspectRatio`     | `string`                                 | Aspect ratio as `{width}:{height}` (e.g., `'16:9'`, `'9:16'`)                                                                                      |
| `resolution`      | `string`                                 | Resolution as `{width}x{height}` (e.g., `'1920x1080'`, `'1280x720'`)                                                                               |
| `generateAudio`   | `boolean`                                | Whether to generate audio alongside the video. Support varies by model                                                                             |
| `frameImages`     | `Array<{ image, frameType }>`            | Role-tagged start and end frames for [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video). Support varies by provider     |
| `inputReferences` | `Array<image \| video>`                  | Reference images or videos for [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video). Support varies by provider   |
| `poll`            | `{ intervalMs?, timeoutMs? }`            | Run the generation as an [asynchronous job](#asynchronous-generation) instead of one long-lived request                                            |

## Frame and reference images

`frameImages` and `inputReferences` are provider-agnostic, top-level fields for passing images and videos into video generation. Use them instead of learning each provider's own keys (like `providerOptions.klingai.imageTail` or `providerOptions.bytedance.referenceImages`). The exact behavior still varies by provider, so check the mode page for the model you use.

Use `frameImages` to control the start and end of an [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video) generation. Each entry pairs an image with a `frameType`:

```typescript
frameImages: [
  { image: 'https://example.com/start.png', frameType: 'first_frame' },
  { image: 'https://example.com/end.png', frameType: 'last_frame' },
];
```

The `image` accepts the same forms as `prompt.image`: a URL, a base64-encoded string, or a `Buffer`. Pass a single `first_frame` to animate from one image, or add a `last_frame` to transition between two. Veo, KlingAI, and Seedance honor `last_frame`; Grok Imagine Video and Wan ignore it with a warning. See the [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video) page for details.

Use `inputReferences` for [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video), where reference images or videos tell the model what your characters or objects look like while the prompt describes a new scene:

```typescript
inputReferences: [
  'https://example.com/character-1.png',
  'https://example.com/character-2.png',
];
```

Each entry is a URL, a base64-encoded string, or a `Buffer`. To pass a video reference by URL, use the object form with an explicit `mediaType`, since providers can't infer the type from a bare URL:

```typescript
inputReferences: [
  { data: 'https://example.com/scene.mp4', mediaType: 'video/mp4' },
];
```

Providers route each reference by its media type and treat untyped references as images. Wan and Seedance 2.0 accept video references; Veo, KlingAI, and Grok Imagine Video accept image references only and ignore video references with a warning.

The syntax you use in the prompt to refer to each reference stays provider-specific (for example, `character1` for Wan, `<IMAGE_1>` for Grok, or `[Image 1]` and `[Video 1]` for Seedance). KlingAI and Veo have no token syntax. Describe the scene directly. See the [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video) page for details.

Two precedence rules apply when fields overlap:

- A `first_frame` in `frameImages` takes priority over `prompt.image`.
- `frameImages` takes priority over `inputReferences`. If you pass both, the model ignores `inputReferences` and emits a warning.

Legacy `providerOptions` keys still work when you omit `frameImages` and `inputReferences`, so existing code keeps running unchanged.

## Saving videos

Video models return results in `result.videos`. Each video object contains:

- `uint8Array`: Raw video data as `Uint8Array`
- `base64`: Base64-encoded video data

```typescript filename="save-video.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import fs from 'node:fs';

const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: 'A serene mountain landscape at sunset',
  duration: 8,
});

fs.writeFileSync('output.mp4', result.videos[0].uint8Array);
```

## Asynchronous generation

By default, `experimental_generateVideo` holds one request to AI Gateway open until the video is ready. AI Gateway handles the provider side of that request, polling the provider's task API when the model is asynchronous. Pass a `poll` option to run the generation as an AI Gateway job instead: the SDK sends a start request, AI Gateway tracks the generation in the background, and the SDK checks its status until it finishes. Each network request stays short, so the flow suits serverless functions and anywhere else with request timeouts.

> **💡 Note:** Asynchronous video generation requires `ai@7.0.50` or later and
> `@ai-sdk/gateway@4.0.44` or later. Install or upgrade with
> `pnpm add ai@latest @ai-sdk/gateway@latest`.

```typescript filename="async-video.ts"
const result = await generateVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: 'A serene mountain landscape at sunset',
  duration: 8,
  poll: {
    intervalMs: 5000,
    timeoutMs: 600000,
  },
});
```

| Option | Type | Description |
| --- | --- | --- |
| `poll.intervalMs` | `number` | How often the SDK checks job status. Defaults to `5000` |
| `poll.timeoutMs` | `number` | How long to wait before throwing a timeout error. Defaults to `600000` (10 minutes) |
| `poll.delay` | `(delayInMs, options?: { abortSignal?: AbortSignal }) => PromiseLike<void>` | Replaces the timer the SDK waits on between status checks. Pass a durable workflow's sleep function so a long run doesn't hold a live timer, and honor the `abortSignal` from the second argument, or the wait won't cancel when `timeoutMs` fires. Defaults to a built-in timer |

Passing `poll` is what opts you in. Without it, gateway models keep using the single-request flow. Everything else works the same, so the parameters and modes documented on these pages apply to both flows. Every input style generates asynchronously: [text-to-video](/docs/ai-gateway/modalities/video-generation/text-to-video), [image-to-video](/docs/ai-gateway/modalities/video-generation/image-to-video), [reference-to-video](/docs/ai-gateway/modalities/video-generation/reference-to-video), [motion control](/docs/ai-gateway/modalities/video-generation/motion-control), [video editing](/docs/ai-gateway/modalities/video-generation/video-editing), and [video extension](/docs/ai-gateway/modalities/video-generation/video-extension).

One detail changes for the styles that take files. Pass images and videos as hosted URLs rather than inline base64:

```typescript filename="async-image-to-video.ts"
// A hosted URL keeps the start request small enough to persist.
const result = await generateVideo({
  model: 'klingai/kling-v2.6-i2v',
  prompt: {
    image: 'https://example.com/balloon.jpg',
    text: 'The camera pushes in as the balloon drifts upward',
  },
  duration: 5,
  poll: { intervalMs: 5000 },
});
```

> **💡 Note:** AI Gateway persists the start request so it can run the job in the background,
> and that persisted request is capped at 300 KiB, which includes an 8 KiB
> allowance for attribution fields. Inline base64 in `prompt.image`,
> `frameImages`, or `inputReferences` passes that ceiling quickly, and an
> oversized request fails with a 413 telling you to use hosted URLs. Text-to-video
> is unaffected.

> **💡 Note:** Top-level `poll` is not the same as the `providerOptions.<provider>.pollIntervalMs`
> and `pollTimeoutMs` options documented on the mode pages. Those control how a
> provider polls its own upstream task inside a single request. Top-level `poll`
> controls whether AI Gateway runs the generation as a background job at all.

Starting a generation costs money, so the SDK sends a stable `idempotency-key` header on the start request and AI Gateway deduplicates on it, which keeps its internal retries from billing a second generation. Pass your own key through `headers` to make your own retry loop deduplicate too.

### Start and status calls

`poll` still keeps one `experimental_generateVideo` call alive until the job finishes. To separate submitting from waiting, call the two halves yourself:

- `experimental_startVideo` sends the start request and returns as soon as AI Gateway accepts the job. It takes the same options as `experimental_generateVideo` — all optional — plus a `webhookUrl` for [webhook-driven completion](#webhook-driven-completion).
- `experimental_getVideoStatus` makes one status request and returns the job's current state, discriminated by `status`: `pending`, `completed` (with `videos`), or `error` (with a message).

> **💡 Note:** `experimental_startVideo` and `experimental_getVideoStatus` require
> `ai@7.0.76` or later and `@ai-sdk/gateway@4.0.61` or later. Install or
> upgrade with `pnpm add ai@latest @ai-sdk/gateway@latest`.

```typescript filename="start-and-status.ts"
import {
  experimental_getVideoStatus as getVideoStatus,
  experimental_startVideo as startVideo,
} from 'ai';

const model = 'google/veo-3.1-generate-001';

const { operation, providerMetadata } = await startVideo({
  model,
  prompt: 'A serene mountain landscape at sunset',
  duration: 8,
});

// The gateway job backing the operation:
console.log(providerMetadata.gateway.asyncJob.jobId); // 'job_ad81…'

// Later — from this process or another one:
const status = await getVideoStatus(model, { operation });
if (status.status === 'completed') {
  console.log(status.videos); // hosted URLs or inline bytes
}
```

The `operation` reference is a JSON-serializable value: persist it in a queue or database and check the job from any process, on any schedule. To fan out, call `startVideo` once per job and hold onto the operations — no promise stays parked while the generations run.

Two differences from `experimental_generateVideo`:

- `getVideoStatus` does not download hosted results. Each entry in `status.videos` is discriminated by `type`: a `url` entry carries a provider-hosted URL to fetch, and a `base64` or `binary` entry carries the bytes inline.
- There is no built-in timeout. You decide how long to keep checking.

The start call carries the same automatic `idempotency-key` as `generateVideo`, so its internal retries never bill a second generation; pass your own key through `headers` to deduplicate an outer retry loop.

For a runnable script, see [start now, check later](/docs/ai-gateway/getting-started/video#start-now-check-later) in the quickstart.

### How results come back

Providers differ in how they hand over a finished video. Some return a hosted URL, others return bytes inline. `experimental_generateVideo` hides that difference: when a provider returns a URL, the SDK downloads it for you, so `videos[0].uint8Array` works either way.

```typescript filename="url-provider.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { writeFile } from 'node:fs/promises';

const { videos, providerMetadata } = await generateVideo({
  // A 'creator/model' string is shorthand for gateway.videoModel('creator/model')
  model: 'alibaba/wan-v2.5-t2v-preview',
  prompt: 'A corgi surfing a tiny wave, golden hour',
  duration: 5,
  resolution: '832x480',
  poll: { intervalMs: 8000, timeoutMs: 600000 },
});

await writeFile('corgi.mp4', videos[0].uint8Array);
```

Swapping in a byte-serving model changes nothing about the call or the result:

```typescript filename="byte-provider.ts"
const { videos } = await generateVideo({
  model: 'google/veo-3.0-fast-generate-001',
  prompt: 'A corgi surfing a tiny wave, golden hour',
  duration: 4,
  generateAudio: false,
  poll: { intervalMs: 8000 },
});

videos[0].uint8Array; // inline bytes, no download step
```

Use the [`download`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-video) option to control the download, for example to raise or lower the default 2 GiB size limit.

AI Gateway reports the underlying job on `providerMetadata.gateway.asyncJob`, which carries the job ID, its status, and how the result was delivered. The job ID is the same one the [HTTP job APIs](#webhook-driven-completion) accept:

```typescript
console.log(providerMetadata.gateway.asyncJob);
// hosted result: { jobId: 'job_ad81…', status: 'completed', result: { expiresAt: 1785993425171 } }
// inline result: { jobId: 'job_9f02…', status: 'completed', result: { delivery: 'inline' } }
```

`result` takes at least these two shapes. A hosted result carries `expiresAt`, telling you how long AI Gateway expects the asset to stay reachable, so download anything you need to keep. An inline result reports `delivery: 'inline'` and carries no expiry, since the bytes already came back with the response. Other keys appear situationally. A hosted result served after its window closed reports `expiredAt` and `partial` instead of `expiresAt`, and counts such as `unretained` show up when they apply. Treat `result` as an open map and read `expiresAt` defensively, because it is absent on inline deliveries and on expired results.

### Webhook-driven completion

To be notified when a job finishes instead of checking its status, register a webhook URL with the job. At the terminal state, AI Gateway posts one of three events to it — `video.generation.completed`, `video.generation.failed`, or `video.generation.cancelled`. The payload carries terminal facts only, never video URLs or bytes, which keeps a retried delivery cheap and tells a mis-registered URL only that some job finished:

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

`data.jobId` identifies the job and `data.modelId` names the model that ran, so one endpoint can serve several models without hardcoding any of them. On `video.generation.failed`, `data.error.message` describes the failure.

There are two ways to register a webhook, matching the two asynchronous flows above:

- **`experimental_startVideo` with `webhookUrl`**: the submitter exits as soon as the job is accepted, and your receiver fetches the result with `experimental_getVideoStatus`. Use this when no process should wait.
- **`experimental_generateVideo` with a `webhook` factory**: the call stays alive and returns the videos itself once the delivery arrives. Use this to keep the single-call shape and save only the status requests.

#### Fire-and-forget with startVideo

Pass `webhookUrl` on the start call. The signing secret for the job's deliveries comes back directly on the start response, so store it where your receiver can find it — a token minted before the call and carried in the callback URL lets the receiver look the secret up before trusting anything in the payload:

```typescript filename="start-with-webhook.ts"
import { experimental_startVideo as startVideo } from 'ai';
import { randomUUID } from 'node:crypto';

// One token per job, minted before the call. The job ID cannot serve here:
// it does not exist until the start request comes back.
const token = randomUUID();

const { providerMetadata } = await startVideo({
  model: 'google/veo-3.1-generate-001',
  prompt: 'A paper plane looping over a city at dusk',
  webhookUrl: `https://example.com/api/video-webhook?token=${token}`,
});

const { jobId, webhookSigningSecret } = providerMetadata.gateway.asyncJob;
await db.saveSecret(token, webhookSigningSecret);
console.log(`Job ${jobId} accepted. The receiver takes it from here.`);
```

The receiver verifies the delivery (see [verifying the delivery](#verifying-the-delivery)) and pulls the result itself. The payload never carries URLs or bytes, but the verified `jobId` is enough to rebuild the operation reference:

```typescript filename="app/api/video-webhook/route.ts"
import { experimental_getVideoStatus as getVideoStatus } from 'ai';
import { verifySignature } from './verify-delivery';

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  const rawBody = await request.text();
  const signature = request.headers.get('x-ai-gateway-signature');
  const secret = token ? await db.loadSecret(token) : undefined;

  if (
    !signature ||
    !secret ||
    !verifySignature({ header: signature, rawBody, secret })
  ) {
    return new Response(null, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  if (event.data.status === 'completed') {
    const status = await getVideoStatus(event.data.modelId, {
      operation: { gatewayJobId: event.data.jobId },
    });
    if (status.status === 'completed') {
      await handleVideos(status.videos); // hosted URLs or inline bytes
    }
  }

  return new Response(null, { status: 204 });
}
```

AI Gateway expects a 2xx response within 10 seconds, so if fetching or processing the videos can run long, record the verified event and return immediately, then fetch out of band.

#### Waiting in the same call with generateVideo

> **💡 Note:** Upgrade before using the `webhook` option: `pnpm add ai@latest
>   @ai-sdk/gateway@latest`. On older releases the option is ignored, and the SDK
> adds a warning to `result.warnings` and polls instead.

Pass a `webhook` factory to `experimental_generateVideo` and the SDK registers your URL with the job rather than polling for it.

The factory returns the URL to register and a `received` promise. The SDK waits on that promise, so resolve it once your endpoint has the delivery in hand:

```typescript filename="generate-with-webhook.ts"
import { randomUUID } from 'node:crypto';

// One token per generation, minted before the call. The callback URL, the
// signing secret, and the wait all key off it. The job ID cannot serve here:
// it does not exist until the start request comes back.
const token = randomUUID();
const callbackUrl = `https://example.com/api/video-webhook?token=${token}`;

const result = await experimental_generateVideo({
  model: gatewayWithCapture(token).videoModel('google/veo-3.1-generate-001'),
  prompt: 'A paper plane looping over a city at dusk',
  n: 1,
  webhook: async () => ({
    url: callbackUrl,
    // Resolves once your receiver has verified a delivery for this token.
    received: waitForDelivery(token),
  }),
  poll: { timeoutMs: 10 * 60 * 1000 },
});

console.log(result.videos.length);
```

`poll.timeoutMs` doubles as the webhook timeout, so the call throws if no delivery arrives inside it.

#### Verifying the delivery

Every delivery is signed, and the secret that signs it is returned only on the job's start response. `experimental_startVideo` surfaces it directly as `providerMetadata.gateway.asyncJob.webhookSigningSecret`, but `experimental_generateVideo` does not, so the factory flow wraps the gateway's `fetch` to capture it:

```typescript filename="capture-secret.ts"
import { createGateway } from '@ai-sdk/gateway';

// Store the secret under the same token the callback URL carries, so the
// receiver can find it. A module-level variable would not survive the trip:
// the delivery arrives in a separate request.
export function gatewayWithCapture(token: string) {
  return createGateway({
    fetch: async (input, init) => {
      const response = await fetch(input, init);
      if (String(input).endsWith('/video-model/start')) {
        try {
          const body = await response.clone().json();
          const secret =
            body?.providerMetadata?.gateway?.asyncJob?.webhookSigningSecret;
          if (secret) await db.saveSecret(token, secret);
        } catch {
          // Leave the secret unset; the receiver rejects unverifiable deliveries.
        }
      }
      return response;
    },
  });
}
```

This reaches into the provider's wire format, so treat it as a stopgap for the factory flow. Either way, verify raw bytes before you trust a delivery:

```typescript filename="verify-delivery.ts"
import { createHmac, timingSafeEqual } from 'node:crypto';

const MAX_AGE_SECONDS = 5 * 60;

export function verifySignature(params: {
  header: string;
  rawBody: string;
  secret: string;
}): boolean {
  const timestamp = params.header.match(/(?:^|,)t=(\d+)/)?.[1];
  const digest = params.header.match(/(?:^|,)v1=([0-9a-f]+)/)?.[1];
  if (!timestamp || !digest) return false;

  const expected = createHmac('sha256', params.secret)
    .update(`${timestamp}.${params.rawBody}`, 'utf8')
    .digest('hex');
  const provided = Buffer.from(digest, 'hex');
  const computed = Buffer.from(expected, 'hex');
  if (provided.length !== computed.length) return false;
  if (!timingSafeEqual(provided, computed)) return false;

  return Math.abs(Date.now() / 1000 - Number(timestamp)) <= MAX_AGE_SECONDS;
}
```

The `x-ai-gateway-signature` header has the form `t=<unix seconds>,v1=<hex digest>`, where `v1` is the HMAC-SHA256 of `"<t>.<raw body>"`. Verify against the raw request bytes, not a re-serialized object, and reject timestamps more than five minutes old.

#### Reading the result

In the factory flow, `experimental_generateVideo` returns the videos itself once the webhook wakes it, so the delivery is only a signal. Your endpoint verifies the delivery and records it under the token from its query string. Because the `received` promise resolves in the process that called `experimental_generateVideo`, and the delivery lands in a separate request, the two have to meet in a store you own:

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

Then resolve `received` by watching for that record:

```typescript filename="wait-for-delivery.ts"
// Bridges the two processes: the route above writes the verified delivery, this
// reads it. Resolves to `{ headers, body }`, the shape the SDK expects. The SDK
// awaits the promise, so `poll.timeoutMs` bounds the wait.
export async function waitForDelivery(token: string) {
  for (;;) {
    const delivery = await db.loadDelivery(token);
    if (delivery) return delivery;
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
```

> **💡 Note:** The SDK waits on `received` inside the `experimental_generateVideo` call, so
> that invocation stays alive until the delivery arrives. Webhooks cut the status
> requests, not the wait. On a serverless platform, budget the function's maximum
> duration for the whole generation, and see [extending
> timeouts](#extending-timeouts-for-nodejs) below.

Delivery is best-effort with retries. AI Gateway expects a 2xx response within 10 seconds and does not follow redirects. Retries of the same terminal event carry the same `x-ai-gateway-idempotency-key` header (`<jobId>-<status>`), so deduplicate on it if processing twice would cause side effects.

For a walkthrough, see [asynchronous video generation](/docs/ai-gateway/getting-started/video#asynchronous-video-generation) in the quickstart.

## Extending timeouts for Node.js

Video generation can take several minutes. In Node.js, the default `fetch` implementation (via Undici) enforces a 5-minute timeout. This can cause requests to fail before the video finishes generating.

This section applies to the single-request flow. [Asynchronous generation](#asynchronous-generation) avoids the problem instead, since no single request stays open for the whole generation.

To extend these timeouts, create a custom gateway instance with a longer Undici `Agent` timeout:

```typescript filename="lib/gateway.ts"
import { createGateway } from 'ai';
import { Agent } from 'undici';

export const gateway = createGateway({
  fetch: (url, init) =>
    fetch(url, {
      ...init,
      dispatcher: new Agent({
        headersTimeout: 15 * 60 * 1000, // 15 minutes
        bodyTimeout: 15 * 60 * 1000,
      }),
    } as RequestInit),
});
```

Then use the custom gateway instance:

```typescript filename="generate.ts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { gateway } from './lib/gateway';

const { videos } = await generateVideo({
  model: gateway.video('google/veo-3.1-generate-001'),
  prompt: 'A timelapse of a flower blooming',
  duration: 8,
});
```

### Global default provider

To use plain string model IDs with extended timeouts, set your custom gateway as the [global default provider](/docs/ai-gateway/models-and-providers#globally-for-all-requests-in-your-application). In a Next.js app, add this to `instrumentation.ts`:

```typescript filename="instrumentation.ts"
import { createGateway } from 'ai';
import { Agent } from 'undici';

export async function register() {
  globalThis.AI_SDK_DEFAULT_PROVIDER = createGateway({
    fetch: (url, init) =>
      fetch(url, {
        ...init,
        dispatcher: new Agent({
          headersTimeout: 15 * 60 * 1000,
          bodyTimeout: 15 * 60 * 1000,
        }),
      } as RequestInit),
  });
}
```


---

[View full sitemap](/docs/sitemap)
