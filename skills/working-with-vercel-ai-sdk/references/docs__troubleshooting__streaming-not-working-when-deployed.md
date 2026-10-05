---
title: Streaming Not Working When Deployed
description: Troubleshooting streaming issues in deployed apps.
url: "https://ai-sdk.dev/docs/troubleshooting/streaming-not-working-when-deployed"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/streaming-not-working-when-deployed.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2d03c60ea7326e334b788f438b3232cb6694ed353f9091a0adecf1f22a4b35c8"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

## Issue

Streaming with the AI SDK works in my local development environment.
However, when deploying, streaming does not work in the deployed app.
Instead of streaming, only the full response is returned after a while.

## Cause

The causes of this issue are varied and depend on the deployment environment.

## Solution

You can try the following:

- add `'Transfer-Encoding': 'chunked'` and/or `Connection: 'keep-alive'` headers

  ```tsx
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
    headers: {
      'Transfer-Encoding': 'chunked',
      Connection: 'keep-alive',
    },
  });
  ```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)