---
title: Error Handling
description: Learn how to handle errors with the AI SDK.
url: "https://ai-sdk.dev/docs/ai-sdk-rsc/error-handling"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/ai-sdk-rsc/error-handling.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "827f73631115ec62f7a5510c2b79e48c6d8fedc6c32bc0164577dc88db310f0b"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

Two categories of errors can occur when working with the RSC API: errors while streaming user interfaces and errors while streaming other values.

## Handling UI Errors

To handle errors while generating UI, the [`streamableUI`](/docs/reference/ai-sdk-rsc/create-streamable-ui) object exposes an `error()` method.

```tsx title='app/actions.tsx'
'use server';

import { createStreamableUI } from '@ai-sdk/rsc';

export async function getStreamedUI() {
  const ui = createStreamableUI();

  (async () => {
    ui.update(<div>loading</div>);
    const data = await fetchData();
    ui.done(<div>{data}</div>);
  })().catch(e => {
    ui.error(<div>Error: {e.message}</div>);
  });

  return ui.value;
}
```

With this method, you can catch any error with the stream, and return relevant UI. On the client, you can also use a [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) to wrap the streamed component and catch any additional errors.

```tsx title='app/page.tsx'
'use client';

import { getStreamedUI } from '@/actions';
import { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

export default function Page() {
  const [streamedUI, setStreamedUI] = useState(null);

  return (
    <div>
      <button
        onClick={async () => {
          const newUI = await getStreamedUI();
          setStreamedUI(newUI);
        }}
      >
        What does the new UI look like?
      </button>
      <ErrorBoundary>{streamedUI}</ErrorBoundary>
    </div>
  );
}
```

## Handling Other Errors

To handle other errors while streaming, you can return an error object that the receiver can use to determine why the failure occurred.

```tsx title='app/actions.tsx'
'use server';

import { createStreamableValue } from '@ai-sdk/rsc';
import { fetchData, emptyData } from '../utils/data';

export const getStreamedData = async () => {
  const streamableData = createStreamableValue<string>(emptyData);

  (async () => {
    const data1 = await fetchData();
    streamableData.update(data1);

    const data2 = await fetchData();
    streamableData.update(data2);

    const data3 = await fetchData();
    streamableData.done(data3);
  })().catch(e => {
    streamableData.error(e);
  });

  return { data: streamableData.value };
};
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)