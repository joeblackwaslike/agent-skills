---
title: Unclosed Streams
description: Troubleshooting errors related to unclosed streams.
url: "https://ai-sdk.dev/docs/troubleshooting/unclosed-streams"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/troubleshooting/unclosed-streams.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "4dcd1ca500f1fd485622df63734f112bf2904a3c361962a6a64d82cb284aabc0"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Sometimes streams are not closed properly, which can lead to unexpected behavior. The following are some common issues that can occur when streams are not closed properly.

## Issue

The streamable UI has been slow to update.

## Solution

This happens when you create a streamable UI using [`createStreamableUI`](/docs/reference/ai-sdk-rsc/create-streamable-ui) and fail to close the stream.
In order to fix this, you must ensure you close the stream by calling the [`.done()`](/docs/reference/ai-sdk-rsc/create-streamable-ui#done) method.
This will ensure the stream is closed.

```tsx title='app/actions.tsx'
import { createStreamableUI } from '@ai-sdk/rsc';

const submitMessage = async () => {
  'use server';

  const stream = createStreamableUI('1');

  stream.update('2');
  stream.append('3');
  stream.done('4'); // [!code ++]

  return stream.value;
};
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)