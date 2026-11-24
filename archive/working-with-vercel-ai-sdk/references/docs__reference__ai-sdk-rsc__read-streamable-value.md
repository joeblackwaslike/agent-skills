---
title: readStreamableValue
description: Reference for the readStreamableValue function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/read-streamable-value"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/read-streamable-value.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "2093eb15ec4a9964a87d2712f97c0a53a06e031f65efbf27ae82f0ad365b0351"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

It is a function that helps you read the streamable value from the client that was originally created using [`createStreamableValue`](/docs/reference/ai-sdk-rsc/create-streamable-value) on the server.

## Import

```
import { readStreamableValue } from "@ai-sdk/rsc"
```

## Example

```ts title="app/actions.ts"
async function generate() {
  'use server';
  const streamable = createStreamableValue('');

  streamable.append('Hello');
  streamable.append(' ');
  streamable.append('World');
  streamable.done();

  return streamable.value;
}
```

```tsx title="app/page.tsx" {12}
import { readStreamableValue } from '@ai-sdk/rsc';

export default function Page() {
  const [generation, setGeneration] = useState('');

  return (
    <div>
      <button
        onClick={async () => {
          const stream = await generate();

          for await (const value of readStreamableValue(stream)) {
            setGeneration(value);
          }
        }}
      >
        Generate
      </button>
    </div>
  );
}
```

## API Signature

### Parameters

- `stream` (`StreamableValue`): The streamable value to read from.

### Returns

It returns an async iterator that contains the values emitted by the streamable value.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)