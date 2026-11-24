---
title: createStreamableValue
description: Reference for the createStreamableValue function from the AI SDK RSC
url: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-streamable-value"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-rsc/create-streamable-value.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3ccc42985df2e2c32f3f5c88c1e6e462eec18c4696eba672da30c8143caa4c06"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

AI SDK RSC is currently experimental. We recommend using [AI SDK
UI](/docs/ai-sdk-ui/overview) for production. For guidance on migrating from
RSC to UI, see our [migration guide](/docs/ai-sdk-rsc/migrating-to-ui).

Create a stream that sends values from the server to the client. The value can be any serializable data.

## Import

```
import { createStreamableValue } from "@ai-sdk/rsc"
```

## API Signature

### Parameters

- `value` (`any`): Any data that RSC supports. Example, JSON.

### Returns

- `value` (`StreamableValue`): The value of the streamable. This can be returned from a Server Action and received by the client. To read the streamed values, use the \`readStreamableValue\` or \`useStreamableValue\` APIs.

### Methods

- `update` (`(value: T) => StreamableValueWrapper`): Updates the current value with a new one.
- `append` (`(value: T) => StreamableValueWrapper`): Appends a delta string to the current value. It requires the current value of the streamable to be a string.
- `done` (`(value?: T) => StreamableValueWrapper`): Marks the value as finalized. You can either call it without any parameters or with a new value as the final state. Once called, the value cannot be updated or appended anymore. This method is always required to be called, otherwise the response will be stuck in a loading state.
- `error` (`(error: any) => StreamableValueWrapper`): Signals that there is an error in the value stream. It will be thrown on the client side when consumed via \`readStreamableValue\` or \`useStreamableValue\`.

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)