---
title: Realtime Voice with AI Gateway
product: vercel
url: /docs/ai-gateway/modalities/realtime
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/realtime"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/ai-gateway/modalities
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/getting-started/realtime
  - /docs/ai-gateway/modalities/realtime/gpt-live
  - /docs/ai-gateway/modalities/speech-to-text
  - /docs/ai-gateway/modalities/text-to-speech
summary: Build low-latency, speech-to-speech voice agents with the AI SDK through Vercel AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/realtime.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "4a3950892fc377017e60fbd92b390a795d829cdc213f1de7fa4cc6c00b6ecc1e"
---

# Realtime Voice with AI Gateway

Build voice agents that listen and respond in real time. With the AI SDK, you stream microphone audio to a realtime model through AI Gateway and play back its spoken replies with low latency. The AI Gateway provider exposes `gateway.experimental_realtime`, which serves two roles: a server-side `getToken` helper that mints a connection, and a realtime model that acts as a codec, translating between normalized AI SDK events and the provider's wire format.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=related)
- [Grok Voice Think Fast 2.0 now available on AI Gateway](https://vercel.com/changelog/grok-voice-think-fast-2-0-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=related)
- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=related)
- [Realtime](https://ai-sdk.dev/docs/ai-sdk-core/realtime?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=related)
- [AI SDK 7](https://vercel.com/blog/ai-sdk-7?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=related)
- [GPT-Live 1 now available on AI Gateway](https://vercel.com/changelog/gpt-live-1-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=related)
- [xAI Grok audio models now available on Vercel AI Gateway](https://vercel.com/changelog/xai-grok-audio-models-now-available-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/ai-gateway/modalities/realtime.graph.md](/docs/ai-gateway/modalities/realtime.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For a step-by-step setup, see the [Realtime quickstart](/docs/ai-gateway/getting-started/realtime).

For `openai/gpt-live-1`, use the [GPT-Live guide](/docs/ai-gateway/modalities/realtime/gpt-live). GPT-Live uses a separate WebSocket endpoint, continuous audio, client-managed delegation, and duration-based billing. It does not use the `gateway.experimental_realtime` examples on this page. Changing their model slug is not enough to connect to GPT-Live.

Realtime is for live conversation. To transcribe recorded audio, see [Speech to Text](/docs/ai-gateway/modalities/speech-to-text); to generate spoken audio from text, see [Text to Speech](/docs/ai-gateway/modalities/text-to-speech).

> **💡 Note:** Realtime support ships in the stable AI SDK releases. Install it with `pnpm
>   add ai @ai-sdk/gateway @ai-sdk/react`.

These examples use `openai/gpt-realtime-2`, which supports realtime connections over WebSocket. Other realtime models include `google/gemini-3.8-live` (latency-optimized) and `google/gemini-3.8-live-extended-thinking` (background reasoning while streaming audio; requires exactly one of `thinkingLevel` or `thinkingBudget` in `providerOptions.google.thinkingConfig`, for example `{ thinkingLevel: 'LOW' }`). Before switching models, check that the model supports the realtime WebSocket endpoint. A successful token request does not guarantee that a model accepts a WebSocket connection.

## Browser voice agent

In the browser, the `useRealtime` hook from `@ai-sdk/react` manages the WebSocket connection, microphone capture, and audio playback. Add a server route that mints a short-lived token so your API key never reaches the client:

```typescript filename="app/api/realtime/token/route.ts"
import { gateway } from '@ai-sdk/gateway';

export async function POST() {
  const { token, url } = await gateway.experimental_realtime.getToken({
    model: 'openai/gpt-realtime-2',
  });

  return Response.json({ token, url, tools: [] });
}
```

Then connect from a client component. The hook fetches your token route, opens the session, and exposes connection and audio controls:

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

  const { status, connect, startAudioCapture } = useRealtime({
    model,
    api: { token: '/api/realtime/token' },
    sessionConfig: { voice: 'alloy', turnDetection: { type: 'server-vad' } },
  });

  // Call connect(), then startAudioCapture(stream) with a microphone MediaStream.
  // The hook also returns disconnect, stopAudioCapture, isCapturing, and messages.
}
```

> **💡 Note:** Keep `AI_GATEWAY_API_KEY` on the server. `getToken` exchanges it for a
> single-use, short-lived client secret that the browser uses to connect, so the
> key never reaches the client.

## Node.js

Outside the browser, use the realtime model as a codec to drive a WebSocket yourself. `getWebSocketConfig` builds the connection from the token, and `serializeClientEvent` and `parseServerEvent` translate events to and from the normalized format:

```typescript filename="realtime.ts"
import { gateway } from '@ai-sdk/gateway';
import WebSocket from 'ws';

const modelId = 'openai/gpt-realtime-2';

const { token, url } = await gateway.experimental_realtime.getToken({
  model: modelId,
});

const model = gateway.experimental_realtime(modelId);
const config = model.getWebSocketConfig({ token, url });
const ws = new WebSocket(config.url, config.protocols);

ws.on('open', async () => {
  ws.send(
    JSON.stringify(
      await model.serializeClientEvent({
        type: 'conversation-item-create',
        item: {
          type: 'text-message',
          role: 'user',
          text: 'Say hello in one sentence.',
        },
      }),
    ),
  );
  ws.send(
    JSON.stringify(
      await model.serializeClientEvent({ type: 'response-create' }),
    ),
  );
});

ws.on('message', (data) => {
  const parsed = model.parseServerEvent(JSON.parse(data.toString()));

  for (const event of Array.isArray(parsed) ? parsed : [parsed]) {
    if (event.type === 'audio-transcript-delta') {
      process.stdout.write(event.delta);
    }
    // event.type 'audio-delta' carries base64 PCM16 audio chunks
  }
});
```

The [Realtime quickstart](/docs/ai-gateway/getting-started/realtime) shows a complete version of this script that also collects the audio and saves it as a playable file.

## Session config

Pass a `sessionConfig` to set the voice, turn detection, and other session options. The AI SDK normalizes these and the Gateway maps them to the provider:

- `voice`: the voice the model speaks with, such as `alloy`.
- `turnDetection`: how the model decides you've finished speaking, such as `{ type: 'server-vad' }` for server-side voice activity detection.
- `instructions`: a system prompt for the session.
- `tools`: realtime tool definitions the model can call.

## Session limits

AI Gateway enforces these limits on the realtime sessions described on this page. For GPT-Live, see its [session lifecycle](/docs/ai-gateway/modalities/realtime/gpt-live#close-the-session):

| Limit                    | Value      | What happens when exceeded                                      |
| ------------------------ | ---------- | --------------------------------------------------------------- |
| Maximum session duration | 25 minutes | The session closes gracefully                                   |
| Idle timeout             | 5 minutes  | The session closes if nothing is sent or received               |
| First client message     | 30 seconds | The session closes if the client sends nothing after connecting |
| Maximum message size     | 256 KB     | The message is rejected                                         |

Teams also have a limit on concurrent realtime sessions. Additional connection attempts beyond the limit are rejected until a session ends.

## Limitations

- Image input is not supported in realtime sessions.
- Reconnecting does not resume a previous session. Start a new session and replay any context you need.


---

[View full sitemap](/docs/sitemap)
