---
title: useChat No Response
description: Troubleshooting errors related to the Use Chat Failed to Parse Stream error.
url: "https://ai-sdk.dev/docs/troubleshooting/use-chat-tools-no-response"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/use-chat-tools-no-response.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "d2258ac8fd36993f29fa8100013c0e2ba098fa87d3394cdcf3a6ce88b8ded5a4"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using [`useChat`](/docs/reference/ai-sdk-ui/use-chat).
When I log the incoming messages on the server, I can see the tool call and the tool result, but the model does not respond with anything.

## Solution

To resolve this issue, convert the incoming messages to the `ModelMessage` format using the [`convertToModelMessages`](/docs/reference/ai-sdk-ui/convert-to-model-messages) function.

```tsx {15}
import { openai } from '@ai-sdk/openai';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-5.5",
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)