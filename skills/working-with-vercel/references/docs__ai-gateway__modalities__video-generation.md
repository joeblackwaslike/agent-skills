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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "379619b96e0ee6e32d372a4270d2d222e63551f8d0859ae31da2cb99424baaf8"
---

# Video Generation

> **💡 Note:** Video generation requires **AI SDK 6 or later** and uses the `experimental_generateVideo` function. This API is experimental and subject to change in future releases.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [Video Generation](https://ai-sdk.dev/docs/ai-sdk-core/video-generation?from=related)
- [ByteDance](https://ai-sdk.dev/providers/ai-sdk-providers/bytedance?from=related)
- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related)
- [Black Forest Labs](https://ai-sdk.dev/providers/ai-sdk-providers/black-forest-labs?from=related)
- [Kling AI](https://ai-sdk.dev/providers/ai-sdk-providers/klingai?from=related)

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

For example, `klingai/kling-v2.6-t2v` is a text-to-video model, `alibaba/wan-v2.6-i2v` is an image-to-video model, and `bytedance/seedance-v1.5-pro` supports both text-to-video and image-to-video.

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
| `poll.delay` | `(delayInMs, { abortSignal }) => PromiseLike<void>` | Replaces the timer the SDK waits on between status checks. Pass a durable workflow's sleep function so a long run doesn't hold a live timer. Defaults to a built-in timer |

Passing `poll` is what opts you in. Without it, gateway models keep using the single-request flow. Everything else works the same, so the parameters and modes documented on these pages apply to both flows.

> **💡 Note:** Top-level `poll` is not the same as the `providerOptions.<provider>.pollIntervalMs`
> and `pollTimeoutMs` options documented on the mode pages. Those control how a
> provider polls its own upstream task inside a single request. Top-level `poll`
> controls whether AI Gateway runs the generation as a background job at all.

Starting a generation costs money, so the SDK sends a stable `idempotency-key` header on the start request and AI Gateway deduplicates on it, which keeps its internal retries from billing a second generation. Pass your own key through `headers` to make your own retry loop deduplicate too.

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
// { jobId: 'job_ad81…', status: 'completed', result: { expiresAt: 1785993425171 } }
```

Provider-hosted URLs expire, so `result.expiresAt` tells you how long AI Gateway expects the asset to stay reachable. Download anything you need to keep.

### Start now, fetch later

`poll` keeps the SDK waiting for the whole generation. When the process that starts a job isn't the one that reads the result, call `doStart` and `doStatus` yourself and hold the operation in between.

```typescript filename="detached.ts"
const model = gateway.videoModel('alibaba/wan-v2.5-t2v-preview');

// Returns as soon as the job is accepted.
const { operation } = await model.doStart({
  prompt: 'A corgi surfing a tiny wave, golden hour',
  duration: 5,
});

await db.saveOperation(operation); // JSON-serializable, for example { gatewayJobId: 'job_…' }
```

Later, from a cron job, a queue worker, or another request:

```typescript filename="resume.ts"
const status = await model.doStatus({ operation: await db.loadOperation() });

if (status.status === 'completed') {
  const [video] = status.videos;
}
```

Nothing holds a connection open between the two calls, and you poll on whatever cadence you want. To skip polling entirely, add a [`webhookUrl`](#webhook-driven-completion) to the `doStart` call and read the result when the callback arrives.

The SDK-orchestrated flow is polling-first. AI Gateway does not deliver completion notifications back to the SDK, so the top-level `webhook` option of `experimental_generateVideo` only falls back to polling with AI Gateway models. To have AI Gateway call an endpoint you own instead, use the flow below.

### Webhook-driven completion

> **💡 Note:** Requires `ai@7.0.50` or later and `@ai-sdk/gateway@4.0.44` or later. This flow
> calls the video model's `doStart` and `doStatus` methods directly rather than
> going through `experimental_generateVideo`.

Pass a `webhookUrl` when you start the job and AI Gateway posts one of three terminal events to that URL — `video.generation.completed`, `video.generation.failed`, or `video.generation.cancelled`:

```typescript filename="start-job.ts"
import { gateway } from '@ai-sdk/gateway';

const model = gateway.videoModel('google/veo-3.1-generate-001');

const started = await model.doStart({
  prompt: 'A paper plane looping over a city at dusk',
  duration: 5,
  aspectRatio: '16:9',
  webhookUrl: 'https://example.com/api/video-webhook',
});

// Store the operation keyed by its job ID so the webhook can look it up later.
const { jobId, webhookSigningSecret } =
  started.providerMetadata.gateway.asyncJob;
await saveOperation(jobId, started.operation);
await saveSigningSecret(webhookSigningSecret);
```

`doStart` returns `{ operation, warnings, providerMetadata, response }`. The operation is an opaque, JSON-serializable handle, so persist it as-is rather than parsing it. When you pass `webhookUrl`, the response also carries the secret that signs deliveries at `providerMetadata.gateway.asyncJob.webhookSigningSecret`.

#### Start options

`doStart` takes the same generation options as `experimental_generateVideo`, plus `webhookUrl`. Anything you leave out falls back to the provider's default.

| Option            | Type                                          | Description                                                                        |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| `webhookUrl`      | `string`                                      | URL AI Gateway posts to when the job reaches a terminal state                      |
| `prompt`          | `string`                                      | Text prompt for the generation                                                     |
| `n`               | `number`                                      | Number of videos. Most models only support `1`                                     |
| `aspectRatio`     | `` `${number}:${number}` `` or `'adaptive'`   | Use `'adaptive'` to inherit the ratio from the input media                         |
| `resolution`      | `` `${number}x${number}` ``                   | For example `1280x720`                                                             |
| `duration`        | `number`                                      | Length in seconds. Typically three to 10 seconds                                   |
| `fps`             | `number`                                      | Frames per second. Commonly 24, 30, or 60                                          |
| `seed`            | `number`                                      | Seed for deterministic generation. Defaults to random                              |
| `image`           | `VideoModelV4File`                            | Starting frame for image-to-video                                                  |
| `frameImages`     | `Array<VideoModelV4FrameImage>`               | Role-tagged `first_frame` and `last_frame` inputs                                  |
| `inputReferences` | `Array<VideoModelV4File>`                     | Reference images or videos for reference-to-video                                  |
| `generateAudio`   | `boolean`                                     | Whether to generate audio alongside the video                                      |
| `providerOptions` | `SharedV4ProviderOptions`                     | Provider-specific body parameters                                                  |
| `abortSignal`     | `AbortSignal`                                 | Cancels the start request                                                          |
| `headers`         | `Record<string, string \| undefined>`         | Additional HTTP headers                                                            |

> **💡 Note:** `doStart` is the provider-level interface, where every generation option is a
> required key that accepts `undefined`. In TypeScript, pass the options you
> don't set as `undefined` explicitly, or spread a fully-formed options object.

### Reading the result

The webhook payload is deliberately thin. It carries terminal facts such as the job ID, status, and timestamps, and never video URLs or bytes, so a retried delivery stays cheap and a mis-registered URL learns only that a job finished, not its content. The `data.jobId` is the same job ID the start response returned in `asyncJob`, so a store keyed by it finds the right operation. On `video.generation.failed`, `data.error.message` describes the failure.

Every delivery is signed with the `webhookSigningSecret` returned on the start response. The `x-ai-gateway-signature` header has the form `t=<unix seconds>,v1=<hex digest>`, where `v1` is the HMAC-SHA256 of `"<t>.<raw body>"`. Verify the digest against the raw request bytes and reject timestamps more than five minutes old before trusting the body. The quickstart shows [a reference receiver](/docs/ai-gateway/getting-started/video#webhook-driven-completion).

Delivery is best-effort with retries. AI Gateway expects a 2xx response within 10 seconds and does not follow redirects. Retries of the same terminal event carry the same `x-ai-gateway-idempotency-key` header (`<jobId>-<status>`), so deduplicate on it if processing twice would cause side effects. A lost delivery never changes the job's state — the result stays available through `doStatus`.

Fetch the video itself with `doStatus`, passing the operation you stored:

```typescript filename="read-result.ts"
const status = await model.doStatus({ operation });

if (status.status === 'completed') {
  for (const video of status.videos) {
    if (video.type === 'url') {
      console.log(video.url, video.mediaType);
    }
  }
}
```

`doStatus` resolves to one of three states:

| `status`    | What it carries                                                                                                                        |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `pending`   | Still running. Nothing to read yet.                                                                                                     |
| `completed` | `videos`, where each entry is `{ type: 'url', url, mediaType }`, `{ type: 'base64', data, mediaType }`, or `{ type: 'binary', data, mediaType }` |
| `error`     | `error`, a human-readable message describing the failure                                                                                |

Most video providers return `type: 'url'`, passed through directly. Inline `base64` appears when the provider returned bytes instead.

The same `doStatus` call is what a polling loop uses, so the two surfaces read results identically. The webhook only changes what tells you when to call it.

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
