---
title: generateVideo
description: API Reference for durable video generation in workflows.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-workflow/generate-video"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-workflow/generate-video.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "9a104748fa90025eb3def5d611d4c52b90097e0727d82cd9f38a1128adc8a983"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Generates videos durably inside a workflow. The helper starts an asynchronous
video generation job with a Workflow webhook URL, suspends the workflow until
the provider sends a terminal notification, and then retrieves the completed
result with one status request.

Unlike [`experimental_generateVideo`](/docs/reference/ai-sdk-core/generate-video)
from `ai`, this helper does not download provider-hosted videos. URL results
remain URLs so your workflow can decide whether to persist, copy, or process
them in another step without serializing the video bytes through workflow step
boundaries.

```ts
import { experimental_generateVideo as generateVideo } from '@ai-sdk/workflow/video';

export async function videoWorkflow(prompt: string) {
  'use workflow';

  // The workflow suspends while the video renders, consuming no compute.
  const result = await generateVideo({
    model: 'klingai/kling-v3.0-t2v',
    prompt,
  });

  return result.videos;
}
```

The selected model must support asynchronous start and status operations and
provider webhooks. The helper must be called from a Workflow SDK workflow.

## Import

```
import { experimental_generateVideo as generateVideo } from "@ai-sdk/workflow/video"
```

## Parameters

The helper accepts the same parameters as `experimental_startVideo` from `ai`,
except `webhookUrl` and `abortSignal`. It creates and manages the webhook URL.

- `model` (`VideoModel`): The asynchronous video model to use. A string compatible with Vercel AI Gateway or a serializable provider model.
- `prompt` (`string | GenerateVideoPrompt`): The prompt or image prompt used to generate the video.
- `n?` (`number`): Number of videos to generate. Default: 1.
- `aspectRatio?` (`` `${number}:${number}` | "adaptive" ``): Aspect ratio of the generated videos.
- `resolution?` (`` `${number}x${number}` ``): Resolution of the generated videos.
- `duration?` (`number`): Duration of each generated video in seconds.
- `maxVideosPerCall?` (`number`): Maximum number of videos that may be started in one call.
- `fps?` (`number`): Frames per second for the generated videos.
- `seed?` (`number`): Seed used for deterministic generation when supported.
- `frameImages?` (`Array<{ image: DataContent; frameType: VideoModelV4FrameType }>`): Role-tagged first and last frame images.
- `inputReferences?` (`Array<DataContent | { data: DataContent; mediaType?: string }>`): Reference images or videos for the generation.
- `generateAudio?` (`boolean`): Whether to generate audio with the video.
- `providerOptions?` (`ProviderOptions`): Additional provider-specific options.
- `headers?` (`Record<string, string>`): Additional HTTP headers for start and status requests.
- `maxRetries?` (`number`): Maximum number of AI SDK retries for each start and status request. Default: 2.

## Returns

Returns the completed status result from the provider. `videos` contains raw
provider video data discriminated by `type`:

- `url`: A provider-hosted URL and media type
- `base64`: Base64-encoded video data and media type
- `binary`: A `Uint8Array` and media type

Hosted URLs can expire. Handle any video you need to retain in a separate
workflow step.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)