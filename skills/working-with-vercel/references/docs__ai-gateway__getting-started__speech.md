---
title: Speech to Text and Text to Speech Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/speech
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/speech"
last_updated: 2026-06-20
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/modalities/text-to-speech
  - /docs/ai-gateway/modalities/speech-to-text
  - /docs/ai-gateway/getting-started/realtime
summary: Generate speech from text and transcribe audio back to text with AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/speech.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "709204e1d8372f7683c74fe7d4d44434782671eafb53867a4d2579d9713e0659"
---

# Speech to Text and Text to Speech Quickstart

Text to speech and speech to text are two halves of the same workflow: one turns text into spoken audio, the other turns audio back into text. They feed into each other, so this quickstart runs both as a round-trip. You generate speech from a sentence, then transcribe that audio and check the text comes back.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Text](https://vercel.com/docs/ai-gateway/getting-started/text?from=related) — Generate and stream text responses using AI Gateway.
- [Get started with GPT-5](https://ai-sdk.dev/cookbook/guides/gpt-5?from=related)
- [Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [Realtime](https://vercel.com/docs/ai-gateway/modalities/realtime?from=related) — Build low-latency, speech-to-speech voice agents with the AI SDK through Vercel AI Gateway.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI SDK](https://vercel.com/docs/ai-sdk?from=related) — TypeScript toolkit for building AI-powered applications with React, Next.js, Vue, Svelte and Node.js

Full cross-link map for this page: [/docs/ai-gateway/getting-started/speech.graph.md](/docs/ai-gateway/getting-started/speech.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Speech and transcription support ships in the stable AI SDK releases. Install
> them with `pnpm add ai @ai-sdk/gateway`.

- ### Set up your project
  Create a new directory and initialize a Node.js project:
  ```bash filename="Terminal"
  mkdir ai-speech-demo
  cd ai-speech-demo
  pnpm init
  ```

- ### Install dependencies
  Install the AI SDK, the AI Gateway provider, and development dependencies:
  #### npm
  ```bash filename="Terminal"
  npm install ai @ai-sdk/gateway dotenv @types/node tsx typescript
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add ai @ai-sdk/gateway dotenv @types/node tsx typescript
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add ai @ai-sdk/gateway dotenv @types/node tsx typescript
  ```
  #### bun
  ```bash filename="Terminal"
  bun add ai @ai-sdk/gateway dotenv @types/node tsx typescript
  ```

- ### Set up your API key
  Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) in your Vercel dashboard and click **Create key** to generate a new API key.

  Create a `.env.local` file and save your API key:
  ```bash filename=".env.local"
  AI_GATEWAY_API_KEY=your_ai_gateway_api_key
  ```
  > **💡 Note:** Instead of using an API key, you can use [OIDC
  > tokens](/docs/ai-gateway/authentication-and-byok#oidc-token-authentication) to
  > authenticate your requests.

- ### Run the round-trip
  Create an `index.ts` file. It generates speech from a sentence, saves the audio, then transcribes that same audio back to text:
  ```typescript filename="index.ts"
  import {
    experimental_generateSpeech as generateSpeech,
    experimental_transcribe as transcribe,
  } from 'ai';
  import { gateway } from '@ai-sdk/gateway';
  import { writeFile } from 'node:fs/promises';
  import 'dotenv/config';

  async function main() {
    const text = 'Thanks for trying out AI Gateway.';

    // Text to speech
    const speech = await generateSpeech({
      model: gateway.speechModel('openai/tts-1'),
      text,
      voice: 'alloy',
      outputFormat: 'mp3',
    });
    await writeFile('speech.mp3', speech.audio.uint8Array);
    console.log('Saved speech.mp3');

    // Speech to text: transcribe the audio we just generated
    const transcript = await transcribe({
      model: gateway.transcriptionModel('openai/whisper-1'),
      audio: speech.audio.uint8Array,
    });
    console.log('Transcript:', transcript.text);
  }

  main().catch(console.error);
  ```
  Run your script:
  ```bash filename="Terminal"
  pnpm tsx index.ts
  ```
  You get `speech.mp3` with the spoken sentence, and the transcript prints back the text you started with.

- ### Next steps
  - Read the [Text to Speech reference](/docs/ai-gateway/modalities/text-to-speech) for voices, formats, and the full list of request options
  - Read the [Speech to Text reference](/docs/ai-gateway/modalities/speech-to-text) for segments, timestamps, and provider options
  - For live, two-way voice conversations, follow the [Realtime quickstart](/docs/ai-gateway/getting-started/realtime)

## Use each on its own

The two calls are independent. Use `experimental_generateSpeech` alone to add voiceovers or spoken responses, and `experimental_transcribe` alone to transcribe recordings, voice notes, or call audio. You can also call the REST endpoints directly without the AI SDK; see the [Text to Speech](/docs/ai-gateway/modalities/text-to-speech#generate-speech-with-the-rest-api) and [Speech to Text](/docs/ai-gateway/modalities/speech-to-text#transcribe-with-the-rest-api) references.


---

[View full sitemap](/docs/sitemap)
