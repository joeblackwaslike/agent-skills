---
title: streamText fails silently
description: Troubleshooting errors related to the streamText function not working.
url: "https://ai-sdk.dev/docs/troubleshooting/stream-text-not-working"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/stream-text-not-working.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2515902cd7fecd323c9f66fc7106413a38f311668d0e5297fa0f36d6dcada66e"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

I am using [`streamText`](/docs/reference/ai-sdk-core/stream-text) function, and it does not work.
It does not throw any errors and the stream is only containing error parts.

## Background

`streamText` immediately starts streaming to enable sending data without waiting for the model.
Errors become part of the stream and are not thrown to prevent e.g. servers from crashing.

## Solution

To log errors, you can provide an `onError` callback that is triggered when an error occurs.

```tsx {7-9}
import { streamText } from 'ai';

const result = streamText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Invent a new holiday and describe its traditions.',
  onError({ error }) {
    console.error(error); // your error logging logic here
  },
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)