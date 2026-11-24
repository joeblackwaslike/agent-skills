---
title: Node.js HTTP Server
description: Learn how to use the AI SDK in a Node.js HTTP server
url: "https://ai-sdk.dev/cookbook/api-servers/node-http-server"
docs_index: /llms.txt
tags:
  - api servers
  - streaming
source: "https://ai-sdk.dev/cookbook/api-servers/node-http-server.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "022044dd1ca68258ab6661755f850282d8a8aec7629762fb208be80360f51929"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

You can use the AI SDK in a Node.js HTTP server to generate text and stream it to the client.

## Examples

The examples start a simple HTTP server that listens on port 8080. You can e.g. test it using `curl`:

```bash
curl -X POST http://localhost:8080
```

The examples use the Vercel AI Gateway. Ensure that your AI Gateway API key is
set in the `AI_GATEWAY_API_KEY` environment variable.

**Full example**: [github.com/vercel/ai/examples/node-http-server](https://github.com/vercel/ai/tree/main/examples/node-http-server)

### UI Message Stream

You can use the `pipeUIMessageStreamToResponse` helper to pipe the stream data to the server response.

```ts title='index.ts'
import {
  pipeUIMessageStreamToResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { createServer } from 'http';

createServer(async (req, res) => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  pipeUIMessageStreamToResponse({
    response: res,
    stream: toUIMessageStream({ stream: result.stream }),
  });
}).listen(8080);
```

### Sending Custom Data

`createUIMessageStream` and `pipeUIMessageStreamToResponse` can be used to send custom data to the client.
This example handles the `/stream-data` path, so test it with `curl -X POST http://localhost:8080/stream-data`.

```ts title='index.ts'
import {
  createUIMessageStream,
  pipeUIMessageStreamToResponse,
  streamText,
  toUIMessageStream,
} from 'ai';
import { createServer } from 'http';

createServer(async (req, res) => {
  switch (req.url) {
    case '/stream-data': {
      const stream = createUIMessageStream({
        execute: ({ writer }) => {
          // write some custom data
          writer.write({ type: 'start' });

          writer.write({
            type: 'data-custom',
            data: {
              custom: 'Hello, world!',
            },
          });

          const result = streamText({
            model: 'openai/gpt-6-astra',
            prompt: 'Invent a new holiday and describe its traditions.',
          });

          writer.merge(
            toUIMessageStream({
              stream: result.stream,
              sendStart: false,
              onError: error => {
                // Error messages are masked by default for security reasons.
                // If you want to expose the error message to the client, you can do so here:
                return error instanceof Error ? error.message : String(error);
              },
            }),
          );
        },
      });

      pipeUIMessageStreamToResponse({ stream, response: res });

      break;
    }
  }
}).listen(8080);
```

### Text Stream

You can send a text stream to the client using `pipeTextStreamToResponse`.

```ts title='index.ts'
import { pipeTextStreamToResponse, streamText, toTextStream } from 'ai';
import { createServer } from 'http';

createServer(async (req, res) => {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  pipeTextStreamToResponse({
    response: res,
    stream: toTextStream({ stream: result.stream }),
  });
}).listen(8080);
```

## Troubleshooting

- Streaming not working when [proxied](/docs/troubleshooting/streaming-not-working-when-proxied)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)