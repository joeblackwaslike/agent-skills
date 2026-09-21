---
title: GPT-Live
product: vercel
url: /docs/ai-gateway/modalities/realtime/gpt-live
canonical_url: "https://vercel.com/docs/ai-gateway/modalities/realtime/gpt-live"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/ai-gateway/modalities/realtime
  - /docs/ai-gateway/modalities
related:
  - /docs/ai-gateway/getting-started/realtime
  - /docs/ai-gateway/pricing
  - /docs/ai-gateway/security-and-compliance/zdr
summary: Connect GPT-Live through AI Gateway to stream voice, handle client delegation, and track session duration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/modalities/realtime/gpt-live.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "75ca477ad2d7ea542379118106ceb36378e39f3fbc66daa3784d5ab90a44d685"
---

# GPT-Live

Build a voice conversation with `openai/gpt-live-1` through AI Gateway. GPT-Live can listen and speak at the same time, also called **full-duplex audio**. Your application can supply context or run delegated work while the conversation continues.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [GPT-Live 1 now available on AI Gateway](https://vercel.com/changelog/gpt-live-1-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=related)
- [Build realtime voice agents on AI Gateway](https://vercel.com/blog/realtime-voice-agents-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=related)
- [Realtime](https://ai-sdk.dev/docs/ai-sdk-core/realtime?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=related)
- [experimental_useRealtime](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-realtime?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=related)
- [Realtime voice, speech, and transcription now supported on AI Gateway](https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=related)
- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [AI SDK 7](https://vercel.com/blog/ai-sdk-7?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/ai-gateway/modalities/realtime/gpt-live.graph.md](/docs/ai-gateway/modalities/realtime/gpt-live.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fmodalities%2Frealtime%2Fgpt-live&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

AI Gateway supports GPT-Live over WebSocket with **client delegation**. You choose whether to use application code, a service, an agent, or another model for delegated work. Starting a Live session does not automatically start a backend model.

## Choose the Live protocol

GPT-Live uses a different protocol from the [Realtime quickstart](/docs/ai-gateway/getting-started/realtime):

| Connection | Endpoint | First event |
| --- | --- | --- |
| Native GPT-Live | `wss://ai-gateway.vercel.sh/v1/live/sessions` | `session.start` with `session.model` |
| Normalized Live events | `wss://ai-gateway.vercel.sh/v4/ai/live-model` | `session-start` with `modelId` and `config` |

Use the native endpoint for the examples below. Send JSON text frames containing base64 audio, and wait for `session.started` before sending audio or context.

In `@ai-sdk/gateway@4.0.82`, there is no Live factory or Live-aware `getToken` helper. Use the native WebSocket API and mint browser tokens through the HTTP endpoint below. Changing the slug in a `gateway.experimental_realtime` example does not select Live.

The published `@ai-sdk/openai@4.0.67` supports a native Live codec through `openai.experimental_realtime('gpt-live-1', { api: 'live' })`. Its `getToken` helper does not support Live. If you use that codec with AI Gateway, supply the AI Gateway connection URL and authentication yourself. The normalized endpoint uses its own event format; do not send the codec's native events there.

## Stream a recording from Node.js

This example reads a short voice recording, sends it at playback speed, and writes the returned audio to a file. It supplies fixed demo museum hours when GPT-Live requests a delegation, without calling another model.

1. Use [Node.js 24](https://nodejs.org/), [FFmpeg](https://ffmpeg.org/), and a team with [AI Gateway credits](/docs/ai-gateway/pricing). Set `AI_GATEWAY_API_KEY` in your shell, then install the WebSocket client and TypeScript types:

   ```bash filename="Terminal"
   pnpm add ws
   pnpm add -D @types/ws @types/node
   export AI_GATEWAY_API_KEY="your_ai_gateway_api_key"
   ```

2. Record a question such as “What time does the museum open?” in `question.wav`. Convert up to 30 seconds to raw **pulse-code modulation (PCM)** audio: 24 kHz, mono, signed 16-bit little-endian, without a WAV header:

   ```bash filename="Terminal"
   ffmpeg -i question.wav -t 30 -ar 24000 -ac 1 -f s16le input.pcm
   ```

3. Create `live.mts`. Each 960-byte chunk represents 20 milliseconds of audio. After the recording, the script sends 10 seconds of silence to allow a spoken reply, then requests a graceful close:

```typescript filename="live.mts"
import { closeSync, openSync, readFileSync, writeSync } from 'node:fs';
import WebSocket from 'ws';

const apiKey = process.env.AI_GATEWAY_API_KEY;
if (!apiKey) throw new Error('Set AI_GATEWAY_API_KEY');
const input = readFileSync('input.pcm');
if (!input.length || input.length % 2 || input.length > 24_000 * 2 * 30) {
  throw new Error('Use nonempty PCM16 audio, at most 30 seconds');
}
const output = openSync('output.pcm', 'w');
const ws = new WebSocket('wss://ai-gateway.vercel.sh/v1/live/sessions', {
  headers: { Authorization: `Bearer ${apiKey}` },
  handshakeTimeout: 10_000,
});
let started = false;
let closing = false;
let confirmed = false;
let offset = 0;
let silenceFrames = 0;
let closeTimeout: ReturnType<typeof setTimeout> | undefined;
const send = (event: object) => ws.send(JSON.stringify(event));
function stop() {
  if (closing) return;
  closing = true;
  clearInterval(pump);
  if (!started || ws.readyState !== WebSocket.OPEN) return ws.terminate();
  send({ type: 'session.close' });
  closeTimeout = setTimeout(() => ws.terminate(), 5_000);
}
function fail(error: unknown) {
  console.error(error);
  process.exitCode = 1;
  stop();
}
const watchdog = setTimeout(
  () => fail(new Error('Session timed out')),
  45_000,
);
const pump = setInterval(() => {
  if (!started || closing) return;
  if (offset >= input.length && silenceFrames++ >= 500) return stop();
  const chunk = Buffer.alloc(960);
  input.copy(chunk, 0, offset, Math.min(offset + 960, input.length));
  offset = Math.min(offset + 960, input.length);
  send({ type: 'session.input_audio.append', audio: chunk.toString('base64') });
}, 20);
ws.on('open', () =>
  send({
    type: 'session.start',
    session: {
      model: 'openai/gpt-live-1',
      store: false,
      delegation: { type: 'client' },
      audio: { format: { type: 'audio/pcm', rate: 24000 } },
      instructions: 'Ask for museum facts when needed. Keep replies brief.',
    },
  }),
);
ws.on('message', (data) => {
  try {
    const event = JSON.parse(data.toString());
    if (event.type === 'session.started') started = true;
    if (event.type === 'session.output_audio.delta') {
      writeSync(output, Buffer.from(event.delta, 'base64'));
    }
    if (event.type === 'session.output_transcript.delta') {
      process.stdout.write(event.delta);
    }
    if (event.type === 'session.delegation.created' && !closing) {
      send({
        type: 'session.commentary.append',
        delegation_id: event.delegation.id,
        content: 'Demo museum hours: open daily from 10 AM to 6 PM.',
      });
    }
    if (event.type === 'error') throw new Error(event.error.message);
    if (event.type === 'session.closed') {
      confirmed = true;
      closing = true;
      clearInterval(pump);
      console.log(`\nFinal voice usage: ${event.usage.seconds} seconds`);
      ws.close();
    }
  } catch (error) {
    fail(error);
  }
});
ws.on('error', fail);
ws.on('close', () => {
  clearInterval(pump);
  clearTimeout(watchdog);
  clearTimeout(closeTimeout);
  closeSync(output);
  if (!confirmed) {
    console.error('Closed without session.closed; final usage is unconfirmed');
    process.exitCode = 1;
  }
  console.log('Saved audio to output.pcm');
});
process.on('SIGINT', stop);
```

For JavaScript, save the same script as `live.mjs`. Remove the type annotations from `closeTimeout`, `send`, and the `fail` parameter. Their JavaScript equivalents are:

```javascript filename="live.mjs"
let closeTimeout;
const send = (event) => ws.send(JSON.stringify(event));
function fail(error) {
  console.error(error);
  process.exitCode = 1;
  stop();
}
```

4. Run the script, then play the returned PCM audio. Use `node live.mjs` for the JavaScript version:

   ```bash filename="Terminal"
   node live.mts
   ffplay -autoexit -f s16le -ar 24000 -ac 1 output.pcm
   ```

Listen to the recording to verify the spoken reply. A `session.started` event confirms startup, not successful audio output. The fixed 10-second reply window can truncate a longer answer. Press **Ctrl+C** to close early. Silence in this example still counts toward [voice session charges](#usage-and-pricing).

## Connect from a browser

Keep your AI Gateway API key on the server. Mint a short-lived client secret by calling `POST https://ai-gateway.vercel.sh/v1/realtime/client-secrets` with `routeKind: 'live'` and the same model you will send in `session.start`.

Add a server route to your application. Authenticate callers and apply your application's usage limits before minting tokens. For Next.js, use `app/api/live/token/route.ts`, or `route.js` for JavaScript; this source works in both:

```typescript filename="app/api/live/token/route.ts"
export async function POST() {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) return new Response('Missing server API key', { status: 500 });

  const response = await fetch(
    'https://ai-gateway.vercel.sh/v1/realtime/client-secrets',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: 'openai/gpt-live-1', routeKind: 'live' }),
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!response.ok) {
    return new Response('Could not create Live token', { status: 502 });
  }
  const { token, expiresAt } = await response.json();
  return Response.json(
    { token, expiresAt },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
```

The response contains `{ token, expiresAt }`, **not a WebSocket URL**. `expiresAt` uses Unix epoch seconds. The token is single-use and binds to the model and Live route. Mint a new token for each connection attempt.

In your browser audio client, fetch the token and supply it through WebSocket subprotocols. Use `ai-gateway-realtime.v1` and `ai-gateway-auth.<token>` even for Live. The following connection setup works in JavaScript or TypeScript:

```javascript filename="live-client.js"
const response = await fetch('/api/live/token', { method: 'POST' });
if (!response.ok) throw new Error('Could not create Live token');
const { token, expiresAt } = await response.json();
if (Date.now() >= expiresAt * 1000) throw new Error('Live token expired');

const ws = new WebSocket('wss://ai-gateway.vercel.sh/v1/live/sessions', [
  'ai-gateway-realtime.v1',
  `ai-gateway-auth.${token}`,
]);
ws.addEventListener('open', () => {
  ws.send(JSON.stringify({
    type: 'session.start',
    session: {
      model: 'openai/gpt-live-1',
      store: false,
      delegation: { type: 'client' },
      audio: { format: { type: 'audio/pcm', rate: 24000 } },
    },
  }));
});
```

Attach message, error, and close handlers as in the Node.js example. After `session.started`, capture and resample microphone audio to 24 kHz mono PCM16. Send paced base64 chunks with `session.input_audio.append`. Decode `session.output_audio.delta` for playback at the same sample rate. Do not send compressed `MediaRecorder` output as PCM.

Use the [graceful close sequence](#close-the-session) when the user ends the conversation. This example covers browser authentication and startup; your audio client owns microphone capture, playback, and session cleanup.

If you implement a normalized client, connect to `/v4/ai/live-model` with the same Live token and subprotocols. Its first event must use `modelId` at the top level:

```json
{
  "type": "session-start",
  "modelId": "openai/gpt-live-1",
  "config": {
    "inputAudioFormat": { "type": "audio/pcm", "rate": 24000 },
    "outputAudioFormat": { "type": "audio/pcm", "rate": 24000 },
    "providerOptions": {
      "openai": { "store": false, "delegation": { "type": "client" } }
    }
  }
}
```

## Add context and handle delegation

The Node.js example returns fixed demo facts. In your application, handle `session.delegation.created` by running your own code, service, agent, or model, then returning the result.

The delegation event contains an ID and metadata, not a task description. Collect `session.input_transcript.delta` and `session.output_transcript.delta`, including their `start_ms` and `end_ms` timestamps. Combine those fragments with application state to prepare delegated work. Preserve `event.delegation.id` and return it as `delegation_id` for updates about that task.

Use these native events to send concise plain-text updates:

| Event | Use |
| --- | --- |
| `session.thinking.append` | Add facts or progress for the model to use without asking it to speak immediately |
| `session.commentary.append` | Return a result for the model to say aloud |
| `session.instructions.append` | Steer the live conversation's behavior |

For example, after `session.started`, send UI state without starting a backend model. Add this to an existing connected client's code; it works in JavaScript or TypeScript:

```javascript filename="live-client.js"
ws.send(JSON.stringify({
  type: 'session.thinking.append',
  delegation_id: null,
  content: 'The user is viewing the museum hours page. No tickets are selected.',
}));
```

Use `delegation_id: null` for session-wide context. For delegated work, use the original ID, as the Node.js example does. Keep each append within the provider's 500-token limit. An `*.appended` acknowledgment confirms context injection, not that the user heard the result. A spoken interruption does not cancel your application's work; handle cancellation and late results in your own task state.

## Close the session

To stop the conversation and collect final usage:

1. Stop audio input and new delegated work.
2. Send one `{ "type": "session.close" }` event.
3. Continue reading audio and usage events until `session.closed` arrives, allowing up to five seconds for finalization.
4. Read `session.closed.usage.seconds`, finish writing or playing queued audio, and close the WebSocket.

The Node.js example follows this sequence and enforces a 45-second overall timeout. If the transport fails or the final event never arrives, treat final usage as unconfirmed. Muting the microphone or pausing audio input does not end the session.

## Usage and pricing

GPT-Live voice sessions cost **$3 per hour**, equivalent to **$0.05 per minute**, at the [current provider list price](https://developers.openai.com/api/docs/models/gpt-live-1#pricing). Billing uses seconds, without rounding up to a whole minute. For example, 90 seconds costs $0.075 at that rate.

| Usage | How charges work |
| --- | --- |
| Voice session | Provider-reported duration, including silence, microphone mute, and time waiting for backend work |
| Separate model or tool calls | Their own pricing, in addition to voice session charges |

`session.usage.updated.usage.seconds` and `session.closed.usage.seconds` are **cumulative totals**. Do not sum successive snapshots or substitute a local wall-clock timer for provider usage. Check [AI Gateway pricing](/docs/ai-gateway/pricing) for credits and billing details. [Close the session](#close-the-session) to stop further voice session charges.

## Compatibility and availability

- AI Gateway supports client delegation only. It does not support hosted Responses delegation, `response.create`, or backend Responses events on the Live socket.
- Use WebSocket. AI Gateway does not expose GPT-Live WebRTC or sideband connections.
- Send startup settings once. Use context appends and audio mute or unmute events during the session, rather than `session.update`.
- AI Gateway sends explicit `store: false` upstream. This setting alone does not establish [zero data retention](/docs/ai-gateway/security-and-compliance/zdr); model and credential policies still apply.
- Live requires an available model entry and duration pricing in the AI Gateway model catalog. There is no preview fallback for a missing entry. A minted token alone does not confirm model availability.


---

[View full sitemap](/docs/sitemap)
