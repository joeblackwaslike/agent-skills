---
title: Streaming
description: Why use streaming for AI applications?
url: "https://ai-sdk.dev/docs/foundations/streaming"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/foundations/streaming.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "7becb4b620ac22d6e81f546cc916c59f7fd85ea094d92b7b362db56415a7b7c2"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

Streaming conversational text UIs (like ChatGPT) have gained massive popularity over the past few months. This section explores the benefits and drawbacks of streaming and blocking interfaces.

[Large language models (LLMs)](/docs/foundations/overview#large-language-models) are extremely powerful. However, when generating long outputs, they can be very slow compared to the latency you're likely used to. If you try to build a traditional blocking UI, your users might easily find themselves staring at loading spinners for 5, 10, even up to 40s waiting for the entire LLM response to be generated. This can lead to a poor user experience, especially in conversational applications like chatbots. Streaming UIs can help mitigate this issue by **displaying parts of the response as they become available**.

<div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-8">
  #### Blocking UI

  Blocking responses wait until the full response is available before displaying it.

  #### Streaming UI

  Streaming responses can transmit parts of the response as they become available.
</div>

## Real-world Examples

Here are 2 examples that illustrate how streaming UIs can improve user experiences in a real-world setting – the first uses a blocking UI, while the second uses a streaming UI.

### Blocking UI

### Streaming UI

As you can see, the streaming UI is able to start displaying the response much faster than the blocking UI. This is because the blocking UI has to wait for the entire response to be generated before it can display anything, while the streaming UI can display parts of the response as they become available.

While streaming interfaces can greatly enhance user experiences, especially with larger language models, they aren't always necessary or beneficial. If you can achieve your desired functionality using a smaller, faster model without resorting to streaming, this route can often lead to simpler and more manageable development processes.

However, regardless of the speed of your model, the AI SDK is designed to make implementing streaming UIs as simple as possible. In the example below, we stream text generation in under 10 lines of code using the SDK's [`streamText`](/docs/reference/ai-sdk-core/stream-text) function:

```ts
import { streamText } from 'ai';

const { textStream } = streamText({
  model: "anthropic/claude-sonnet-5.5",
  prompt: 'Write a poem about embedding models.',
});

for await (const textPart of textStream) {
  console.log(textPart);
}
```

For an introduction to streaming UIs and the AI SDK, check out our [Getting Started guides](/docs/getting-started).

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)