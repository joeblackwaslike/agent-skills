---
title: Video Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/video
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/video"
last_updated: 2026-09-08
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/modalities/video-generation
  - /docs/ai-gateway/modalities/video-generation/image-to-video
  - /docs/ai-gateway/modalities/video-generation/motion-control
  - /docs/ai-gateway/modalities/video-generation/reference-to-video
summary: Generate a video from a text prompt using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/video.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "c3e6e3f38c7c4b6f9c83d148303ca3a0000ad118a834ea3443e81901b319dbf2"
---

# Video Generation Quickstart

Generate a video through AI Gateway and save it to a file. Video generation can take several minutes.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Grok Imagine Video on AI Gateway](https://vercel.com/changelog/grok-imagine-video-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Kling video models on AI Gateway](https://vercel.com/changelog/kling-video-models-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Veo video models on AI Gateway](https://vercel.com/changelog/veo-video-models-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Wan models on AI Gateway](https://vercel.com/changelog/wan-models-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Video Generation with AI Gateway](https://vercel.com/blog/video-generation-with-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)
- [Generate videos with AI SDK](https://vercel.com/kb/guide/ai-sdk-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related) — Use experimental_generateVideo in the AI SDK to generate videos from a text prompt or an image, set aspect ratio, resolu
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/ai-gateway/getting-started/video.graph.md](/docs/ai-gateway/getting-started/video.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fvideo&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Generate your first video

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add video generation through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's language, framework, and package manager when they support AI Gateway video generation. Otherwise, add the smallest supported TypeScript entry point and explain why. Add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use google/veo-3.1-fast-generate-001, save the first video to a file, run the result, and report the output.
```

### Run the Node.js example

Use [Node.js 22.18 or later](https://nodejs.org/) and a team with available [AI Gateway Credits](/docs/ai-gateway/pricing). Export `AI_GATEWAY_API_KEY` in your current shell. If you need a key, open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys).

```bash filename="Terminal"
export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
```

Install the AI SDK:

```bash filename="Terminal"
pnpm add ai@latest
```

Create `index.mts`:

```typescript filename="index.mts"
import { experimental_generateVideo as generateVideo } from 'ai';
import { writeFile } from 'node:fs/promises';

const { videos } = await generateVideo({
  model: 'google/veo-3.1-fast-generate-001',
  prompt: 'A lighthouse above crashing waves at golden hour.',
  aspectRatio: '16:9',
  duration: 8,
});

await writeFile('output.mp4', videos[0].uint8Array);
console.log('Saved output.mp4');
```

Run the script:

```bash filename="Terminal"
node index.mts
```

## Next steps

- Run long generations with [asynchronous generation, status checks, safe retries, or webhooks](/docs/ai-gateway/modalities/video-generation#asynchronous-generation)

* Generate video from [images](/docs/ai-gateway/modalities/video-generation/image-to-video), [first and last frames](/docs/ai-gateway/modalities/video-generation#frame-and-reference-images), [motion controls](/docs/ai-gateway/modalities/video-generation/motion-control), or [reference media](/docs/ai-gateway/modalities/video-generation/reference-to-video)

- Host input media with [Vercel Blob](/docs/vercel-blob) when a model requires URLs
- Browse [video generation models](/ai-gateway/models?capabilities=video-generation)


---

[View full sitemap](/docs/sitemap)
