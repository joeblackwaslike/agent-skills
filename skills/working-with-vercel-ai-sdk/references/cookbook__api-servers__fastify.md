---
title: Fastify
description: Learn how to use the AI SDK in a Fastify server
url: "https://ai-sdk.dev/cookbook/api-servers/fastify"
docs_index: /llms.txt
tags:
  - api servers
  - streaming
source: "https://ai-sdk.dev/cookbook/api-servers/fastify.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "5beab6cc68f8f0eaa73d5da8bde78f9fa17589979dc803de685d8b57aec98887"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

You can use the AI SDK in a [Fastify](https://fastify.dev/) server to generate and stream text and objects to the client.

## Examples

The examples start a simple HTTP server that listens on port 8080. You can e.g. test it using `curl`:

```bash
curl -X POST http://localhost:8080
```

The examples use the Vercel AI Gateway. Ensure that your AI Gateway API key is
set in the `AI_GATEWAY_API_KEY` environment variable.

**Full example**: [github.com/vercel/ai/examples/fastify](https://github.com/vercel/ai/tree/main/examples/fastify)

### UI Message Stream

You can use the `toUIMessageStream` helper to convert the result stream to a UI message stream and then send it in the response.

```ts title='index.ts'
import { streamText, toUIMessageStream } from 'ai';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.post('/', async function (request, reply) {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(toUIMessageStream({ stream: result.stream }));
});

fastify.listen({ port: 8080 });
```

### Sending Custom Data

`createUIMessageStream` can be used to send custom data to the client.

```ts title='index.ts' {12-17}
import { createUIMessageStream, streamText, toUIMessageStream } from 'ai';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.post('/stream-data', async function (request, reply) {
  // immediately start streaming the response
  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      writer.write({ type: 'start' });

      writer.write({
        type: 'data-custom',
        data: {
          custom: 'initialized call',
        },
      });

      const result = streamText({
        model: 'openai/gpt-6-astra',
        prompt: 'Invent a new holiday and describe its traditions.',
      });

      writer.merge(
        toUIMessageStream({ stream: result.stream, sendStart: false }),
      );
    },
    onError: error => {
      // Error messages are masked by default for security reasons.
      // If you want to expose the error message to the client, you can do so here:
      return error instanceof Error ? error.message : String(error);
    },
  });

  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(stream);
});

fastify.listen({ port: 8080 });
```

### Text Stream

You can use the `textStream` property to get a text stream from the result and then pipe it to the response.

```ts title='index.ts' {14}
import { streamText } from 'ai';
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.post('/', async function (request, reply) {
  const result = streamText({
    model: 'openai/gpt-6-astra',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  reply.header('Content-Type', 'text/plain; charset=utf-8');

  return reply.send(result.textStream);
});

fastify.listen({ port: 8080 });
```

## Troubleshooting

- Streaming not working when [proxied](/docs/troubleshooting/streaming-not-working-when-proxied)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)