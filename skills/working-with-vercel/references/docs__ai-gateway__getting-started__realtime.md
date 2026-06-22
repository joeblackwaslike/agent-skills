---
title: Realtime
product: vercel
url: /docs/ai-gateway/getting-started/realtime
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/realtime"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/modalities/realtime
summary: Learn about realtime on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/realtime.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "ee3351f39b140dd1f267ff8f40588de884c78e3889ee8fbd62f3b6c3001d2a82"
---

# Realtime Quickstart

This quickstart gets you to a working realtime session two ways with the AI SDK: a Node.js script you can run right away, or a browser voice agent for live, two-way conversations.

> **💡 Note:** Realtime support in the AI Gateway provider is available on the canary
> releases of the AI SDK. Install them with `pnpm add @ai-sdk/gateway@canary`.

The script below uses `xai/grok-voice-think-fast-1.0` and the browser agent uses `openai/gpt-realtime-2`. Both are realtime speech-to-speech models, so swap the model ID to switch between them. `xai/grok-voice-think-fast-1.0` supports speech-to-speech only, so it does not handle transcription or translation.

## Run a script

The fastest way to try realtime is a Node.js script, no framework and no browser. It uses the AI Gateway provider's realtime model as a codec: the model builds the WebSocket connection and translates between the normalized AI SDK events you send and the provider's wire format. The script sends a text prompt, prints the spoken reply's transcript as it streams, and saves the audio to a file.

- ### Set up your project
  Create a new directory and initialize a Node.js project:
  ```bash filename="Terminal"
  mkdir ai-realtime-demo
  cd ai-realtime-demo
  pnpm init
  ```

- ### Install dependencies
  Install the canary AI Gateway provider, a WebSocket client, and development dependencies:
  #### npm
  ```bash filename="Terminal"
  npm install @ai-sdk/gateway@canary ws dotenv tsx typescript @types/ws @types/node
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add @ai-sdk/gateway@canary ws dotenv tsx typescript @types/ws @types/node
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add @ai-sdk/gateway@canary ws dotenv tsx typescript @types/ws @types/node
  ```
  #### bun
  ```bash filename="Terminal"
  bun add @ai-sdk/gateway@canary ws dotenv tsx typescript @types/ws @types/node
  ```

- ### Set up your API key
  Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) in your Vercel dashboard and click **Create key** to generate a new API key.

  Create a `.env.local` file and save your API key:
  ```bash filename=".env.local"
  AI_GATEWAY_API_KEY=your_ai_gateway_api_key
  ```

- ### Create and run the script
  Create a `realtime.ts` file:
  ```typescript filename="realtime.ts"
  import { gateway } from '@ai-sdk/gateway';
  import WebSocket from 'ws';
  import { writeFileSync } from 'node:fs';
  import 'dotenv/config';

  const modelId = 'xai/grok-voice-think-fast-1.0';

  async function main() {
    // getToken runs on the server, where your API key lives. It returns a token
    // and the WebSocket URL to connect with.
    const { token, url } = await gateway.experimental_realtime.getToken({
      model: modelId,
    });

    // The realtime model is a codec: it builds the WebSocket config and
    // translates between normalized AI SDK events and the provider wire format.
    const model = gateway.experimental_realtime(modelId);
    const config = model.getWebSocketConfig({ token, url });

    const ws = new WebSocket(config.url, config.protocols);
    const audioChunks: Buffer[] = [];

    const send = async (event: Parameters<typeof model.serializeClientEvent>[0]) =>
      ws.send(JSON.stringify(await model.serializeClientEvent(event)));

    ws.on('open', async () => {
      await send({
        type: 'conversation-item-create',
        item: {
          type: 'text-message',
          role: 'user',
          text: 'Say hello in one sentence.',
        },
      });
      await send({ type: 'response-create' });
    });

    ws.on('message', (data) => {
      const parsed = model.parseServerEvent(JSON.parse(data.toString()));

      for (const event of Array.isArray(parsed) ? parsed : [parsed]) {
        switch (event.type) {
          case 'audio-transcript-delta':
            process.stdout.write(event.delta);
            break;
          case 'audio-delta':
            audioChunks.push(Buffer.from(event.delta, 'base64'));
            break;
          case 'response-done':
            writeFileSync('reply.wav', toWav(Buffer.concat(audioChunks), 24000));
            console.log('\nSaved reply.wav');
            ws.close();
            break;
          case 'error':
            console.error(event.message);
            ws.close();
            break;
        }
      }
    });
  }

  main().catch(console.error);

  // Wrap raw PCM16 mono audio in a minimal WAV header so the file is playable
  function toWav(pcm: Buffer, sampleRate: number): Buffer {
    const header = Buffer.alloc(44);
    header.write('RIFF', 0);
    header.writeUInt32LE(36 + pcm.length, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(1, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(sampleRate * 2, 28);
    header.writeUInt16LE(2, 32);
    header.writeUInt16LE(16, 34);
    header.write('data', 36);
    header.writeUInt32LE(pcm.length, 40);
    return Buffer.concat([header, pcm]);
  }
  ```
  Run your script:
  ```bash filename="Terminal"
  pnpm tsx realtime.ts
  ```
  The transcript streams to your terminal and the spoken reply is saved as `reply.wav`.

> **💡 Note:** `getToken` runs on the server, where your API key lives, so the key never
> reaches the browser. Realtime audio streams as PCM16 at 24 kHz, so the script
> adds a WAV header to make `reply.wav` playable.

## Build a browser voice agent with the AI SDK

For a live, two-way voice agent, use the AI SDK in a browser app. Your server mints a short-lived token, and the `useRealtime` hook handles the microphone, playback, and WebSocket connection.

> **💡 Note:** The browser voice agent also needs the canary React bindings. Install them
> with `pnpm add ai@canary @ai-sdk/gateway@canary @ai-sdk/react@canary`.

- ### Set up a Next.js app
  Realtime needs both a server (to mint a token) and a browser (to capture and play audio). Create a new app:
  ```bash filename="Terminal"
  pnpm create next-app@latest ai-realtime-agent
  cd ai-realtime-agent
  ```
  Then install the canary AI SDK, the AI Gateway provider, and the React bindings:
  ```bash filename="Terminal"
  pnpm add ai@canary @ai-sdk/gateway@canary @ai-sdk/react@canary
  ```

- ### Set up your API key
  Save your AI Gateway API key in `.env.local`. It stays on the server:
  ```bash filename=".env.local"
  AI_GATEWAY_API_KEY=your_ai_gateway_api_key
  ```

- ### Add a token endpoint
  Create a route handler that mints a client secret for the browser. `getToken` runs on the server, where your API key lives, and returns a short-lived token plus the WebSocket URL:
  ```typescript filename="app/api/realtime/token/route.ts"
  import { gateway } from '@ai-sdk/gateway';

  export async function POST() {
    const { token, url } = await gateway.experimental_realtime.getToken({
      model: 'openai/gpt-realtime-2',
    });

    return Response.json({ token, url, tools: [] });
  }
  ```
  > **⚠️ Warning:** Keep `AI_GATEWAY_API_KEY` on the server. The browser never sees it. Your token
  > route exchanges it for a single-use, short-lived client secret that the
  > browser uses to connect.

- ### Add the voice UI
  Create a client component that connects through your token endpoint and streams microphone audio. The `useRealtime` hook manages the WebSocket connection, audio capture, and playback:
  ```tsx filename="app/page.tsx"
  'use client';

  import { experimental_useRealtime as useRealtime } from '@ai-sdk/react';
  import { gateway } from '@ai-sdk/gateway';
  import { useMemo } from 'react';

  export default function Page() {
    const model = useMemo(
      () => gateway.experimental_realtime('openai/gpt-realtime-2'),
      [],
    );

    const {
      status,
      isCapturing,
      connect,
      disconnect,
      startAudioCapture,
      stopAudioCapture,
    } = useRealtime({
      model,
      api: { token: '/api/realtime/token' },
      sessionConfig: {
        voice: 'alloy',
        turnDetection: { type: 'server-vad' },
      },
    });

    const toggleMic = async () => {
      if (isCapturing) {
        stopAudioCapture();
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startAudioCapture(stream);
    };

    return (
      <main style={{ padding: 24 }}>
        <p>Status: {status}</p>
        <button onClick={status === 'connected' ? disconnect : connect}>
          {status === 'connected' ? 'Disconnect' : 'Connect'}
        </button>
        {status === 'connected' && (
          <button onClick={toggleMic}>
            {isCapturing ? 'Stop mic' : 'Start mic'}
          </button>
        )}
      </main>
    );
  }
  ```
  Start the dev server:
  ```bash filename="Terminal"
  pnpm dev
  ```
  Open <http://localhost:3000>, click **Connect**, then **Start mic** and allow microphone access. Speak, and the model responds out loud.

## Next steps

- Read the [Realtime reference](/docs/ai-gateway/modalities/realtime) for session config, session limits, and limitations
- See [supported realtime models](https://vercel.com/ai-gateway/models)


---

[View full sitemap](/docs/sitemap)
