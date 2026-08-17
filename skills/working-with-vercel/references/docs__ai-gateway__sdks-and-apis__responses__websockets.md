---
title: Responses API over WebSocket
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses/websockets
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/websockets"
last_updated: 2026-07-22
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/security-and-compliance/zdr
summary: Keep a persistent connection open across turns with the OpenAI Responses API over WebSocket through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/websockets.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3d4f69a745844ab27f4c2a4edef2d8a90a406a44c549a3c3046a94d02f455614"
---

# Responses API over WebSocket

AI Gateway supports WebSocket mode for the [Responses API](/docs/ai-gateway/sdks-and-apis/responses). Instead of opening a new HTTP request for every turn, you open one WebSocket connection and send each turn as a frame. The connection to the model provider stays open between turns, which removes a connection handshake from every turn and cuts per-turn latency in agent loops that make many tool calls.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [OpenAI Responses API](https://ai-sdk.dev/cookbook/guides/openai-responses?from=related)
- [OpenResponses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses?from=related) — Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/streaming?from=related) — Stream responses token by token using the OpenResponses API.
- [Streaming](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/streaming?from=related) — Stream tokens as they are generated with the OpenAI Responses API.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related) — Generate text responses using the OpenResponses API.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses/websockets.graph.md](/docs/ai-gateway/sdks-and-apis/responses/websockets.graph.md)
<!-- /docsgraph:related -->

The wire protocol is OpenAI's Responses WebSocket protocol: you send `response.create` frames and receive the same `response.*` events the HTTP streaming API emits.

## Connecting

Open a WebSocket to the same path you'd POST to, and authenticate with your API key:

```
wss://ai-gateway.vercel.sh/v1/responses
Authorization: Bearer $AI_GATEWAY_API_KEY
```

Send a `response.create` frame for each turn:

```typescript filename="responses-websocket.ts"
import WebSocket from 'ws';

const ws = new WebSocket('wss://ai-gateway.vercel.sh/v1/responses', {
  headers: { Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}` },
});

ws.on('open', () => {
  ws.send(
    JSON.stringify({
      type: 'response.create',
      model: 'openai/gpt-5.6-sol',
      input: 'Why is the sky blue?',
      store: false,
    }),
  );
});

ws.on('message', (data) => {
  const event = JSON.parse(data.toString());
  if (event.type === 'response.output_text.delta') {
    process.stdout.write(event.delta);
  } else if (
    event.type === 'response.completed' ||
    event.type === 'response.failed' ||
    event.type === 'response.incomplete'
  ) {
    console.log();
    ws.close();
  } else if (event.type === 'error') {
    console.error(event.error.message);
    ws.close();
  }
});
```

The server streams the standard Responses event sequence for each turn: `response.created`, `response.in_progress`, output item and content part events, `response.output_text.delta` chunks, and a terminal `response.completed` (or `response.failed` / `response.incomplete`).

## Multiple turns on one connection

Send the next `response.create` frame on the same socket after the previous turn completes. Chain turns with `previous_response_id`:

```typescript filename="responses-websocket-turns.ts"
ws.send(
  JSON.stringify({
    type: 'response.create',
    model: 'openai/gpt-5.6-sol',
    input: 'Now explain it to a five-year-old.',
    store: false,
    previous_response_id: firstResponse.id, // from the previous response.completed event
  }),
);
```

One connection serves one model. Every frame must use the model the connection was opened with; a frame with a different model returns an error and closes the connection with code 1008.

## Using store: false

Set `store: false` to keep the provider from persisting your responses, including under [zero data retention](/docs/ai-gateway/security-and-compliance/zdr). With `store: false`:

- `previous_response_id` continuation works **within** a connection: the context lives on the open connection, so chained turns work without any server-side storage.
- A failed turn invalidates the chain. After a `response.failed`, a `previous_response_id` pointing at an earlier response in that chain returns `previous_response_not_found`, even on the same connection. Start a new chain.
- Continuation does **not** work across connections. After a reconnect, a `previous_response_id` from the old connection returns `previous_response_not_found`. Start a new chain, or resend the conversation context in `input`.

This is the combination agent loops typically want: persistent context across turns while the connection lives, nothing retained after it closes.

## Supported models

WebSocket mode is available for OpenAI text models, currently GPT-5.4 and later (including the GPT-5.6 series). Requests for any other model return an error frame and close the connection:

```json
{
  "type": "error",
  "status": 400,
  "error": {
    "code": null,
    "message": "Model anthropic/claude-sonnet-4.5 is not available over WebSocket",
    "param": "model",
    "type": "invalid_request_error"
  }
}
```

## Connection lifecycle

Connections are long-lived but not unbounded. Build clients to reconnect and start a new chain:

| Behavior | Value |
| --- | --- |
| Idle timeout | 5 minutes without frames, then close 1001. Ping/pong frames reset the timer, so keepalive pings hold an idle connection open. |
| Maximum connection duration | Approximately 13 minutes, then close 1001. Reconnect and start a new chain. |
| Maximum frame size | 4 MiB |

Close codes:

| Code | Meaning |
| --- | --- |
| 1001 | Idle timeout or maximum duration reached. Reconnect and continue. |
| 1008 | Invalid request (for example, an unsupported model or a mid-connection model switch) |
| 1011 | Upstream provider error |
| 4402 | Out of credits mid-session. Add credits and reconnect. |

## Error handling

Errors arrive as `error` frames with the same shape as HTTP error responses (`status`, `error.message`, `error.type`), followed by a close. Handle the `error` event type in your message handler rather than relying only on the close code.

For request parameters, tool calling, structured output, and reasoning configuration, the frames accept the same fields as the HTTP [Responses API](/docs/ai-gateway/sdks-and-apis/responses) — WebSocket mode changes the transport, not the API surface.


---

[View full sitemap](/docs/sitemap)
