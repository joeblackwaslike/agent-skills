---
title: "useChat/useCompletion stream output contains 0:... instead of text"
description: How to fix strange stream output in the UI
url: "https://ai-sdk.dev/docs/troubleshooting/strange-stream-output"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/strange-stream-output.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "e96f698f25c137eb66411b07204aa9481d4c9460d89cc4f42dfb26713c74285e"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using custom client code to process a server response that is sent using `StreamingTextResponse`. I am using version `3.0.20` or newer of the AI SDK. When I send a query, the UI streams text such as `0: "Je"`, `0: " suis"`, `0: "des"...` instead of the text that I’m looking for.

## Background

The AI SDK has switched to the stream data protocol in version `3.0.20`. It sends different stream parts to support data, tool calls, etc. What you see is the raw stream data protocol response.

## Solution

You have several options:

1. Use the AI Core [`streamText`](/docs/reference/ai-sdk-core/stream-text) function to send a raw text stream:

   ```tsx
   export async function POST(req: Request) {
     const { prompt } = await req.json();

     const result = streamText({
       model: openai.completion('gpt-3.5-turbo-instruct'),
       maxOutputTokens: 2000,
       prompt,
     });

     return createTextStreamResponse({
       stream: toTextStream({ stream: result.stream }),
     });
   }
   ```

2. Pin the AI SDK version to `3.0.19` . This will keep the raw text stream.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)