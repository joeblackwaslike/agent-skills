---
title: "AI Gateway Speech Quickstart: Transcription and TTS"
product: vercel
url: /docs/ai-gateway/getting-started/speech
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/speech"
last_updated: 2026-09-08
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/modalities/text-to-speech
  - /docs/ai-gateway/modalities/speech-to-text
  - /docs/ai-gateway/getting-started/realtime
summary: Generate speech and transcribe it using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/speech.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "cd39e2f5ef7ec9a2e366239ae8493fb31e3f389f56b744d9dee73d977e3bcc60"
---

# AI Gateway Speech Quickstart: Transcription and TTS

Generate speech from text through AI Gateway, save the audio, and transcribe it back to text.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Fish Audio models now available on Vercel AI Gateway for free](https://vercel.com/changelog/fish-audio-models-now-available-on-ai-gateway-for-free?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related)
- [Gemini 3.5 Transcribe now available on AI Gateway](https://vercel.com/changelog/gemini-3-5-transcribe-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related)
- [xAI Grok audio models now available on Vercel AI Gateway](https://vercel.com/changelog/xai-grok-audio-models-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related)
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related)
- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related)
- [AI Gateway Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Video Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/video?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related) — Generate a video from a text prompt using AI Gateway.
- [Realtime Voice with AI Gateway](https://vercel.com/docs/ai-gateway/modalities/realtime?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=related) — Build low-latency, speech-to-speech voice agents with the AI SDK through Vercel AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/speech.graph.md](/docs/ai-gateway/getting-started/speech.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Fspeech&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Generate and transcribe speech

### Use a coding agent

Paste this prompt into a coding agent with terminal access:

**Agent prompt**

```text
Add a text-to-speech and speech-to-text round trip through AI Gateway in the current environment. Use the AI Gateway skill for this task. If it is unavailable, run npx skills add vercel/vercel-plugin --skill ai-gateway, then find and read its SKILL.md before continuing. Reuse the environment's language, framework, package manager, and AI client when possible, choose AI Gateway SDKs or APIs that support speech generation and transcription, and add only required dependencies. Read AI_GATEWAY_API_KEY from the environment. If it is missing, run npx vercel@latest whoami and pause for login if needed. Determine the team, then run npx vercel@latest --scope <team-slug> ai-gateway api-keys create --name <descriptive-name>. Capture stdout directly into AI_GATEWAY_API_KEY for the request or existing ignored secret storage, and never expose the value. Use openai/tts-1 and openai/whisper-1, save the audio, print the transcript, run the result, and report the output.
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
import {
  experimental_generateSpeech as generateSpeech,
  experimental_transcribe as transcribe,
} from 'ai';
import { writeFile } from 'node:fs/promises';

const text = 'Thanks for trying AI Gateway.';
const speech = await generateSpeech({
  model: 'openai/tts-1',
  text,
  voice: 'alloy',
  outputFormat: 'mp3',
});

await writeFile('speech.mp3', speech.audio.uint8Array);

const transcript = await transcribe({
  model: 'openai/whisper-1',
  audio: speech.audio.uint8Array,
});

console.log(transcript.text);
```

Run the script:

```bash filename="Terminal"
node index.mts
```

## Next steps

- Generate speech with the [Text to Speech guide](/docs/ai-gateway/modalities/text-to-speech)
- Transcribe recorded or streaming audio with the [Speech to Text guide](/docs/ai-gateway/modalities/speech-to-text)
- Build live, two-way voice conversations with the [Realtime quickstart](/docs/ai-gateway/getting-started/realtime)


---

[View full sitemap](/docs/sitemap)
