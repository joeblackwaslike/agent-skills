---
title: createAgentUIStream
description: API Reference for the createAgentUIStream utility.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/create-agent-ui-stream"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/create-agent-ui-stream.md"
fetched_at: "2026-10-12T11:48:49.587Z"
sha256: "065cd503502aa014e8723deae1941c8ed86a3d8aa35f45a8d836adeccebfedc8"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `createAgentUIStream` function executes an [Agent](/docs/reference/ai-sdk-core/agent), consumes an array of UI messages, and streams the agent's output as UI message chunks via an async iterable. This enables real-time, incremental rendering of AI assistant output with full access to tool use, intermediate reasoning, and interactive UI features in your own runtime—perfect for building chat APIs, dashboards, or bots powered by agents.

## Import

```
import { createAgentUIStream } from "ai"
```

## Usage

```ts
import { ToolLoopAgent, createAgentUIStream } from 'ai';

const agent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  instructions: 'You are a helpful assistant.',
  tools: { weather: weatherTool, calculator: calculatorTool },
});

export async function* streamAgent(
  uiMessages: unknown[],
  abortSignal?: AbortSignal,
) {
  const stream = await createAgentUIStream({
    agent,
    uiMessages,
    abortSignal,
    // experimental_sandbox, // optional: pass an experimental sandbox through to tool execution
    // ...other options (see below)
  });

  for await (const chunk of stream) {
    yield chunk; // Each chunk is a UI message output from the agent.
  }
}
```

## Parameters

- `agent` (`Agent`): The agent to run. Must define its \`tools\` and implement \`.stream(\{ prompt, ... })\`.
- `uiMessages` (`unknown[]`): Array of input UI message objects (e.g., user/assistant/chat history). These will be validated and converted for the agent.
- `convertDataPart` (`(part: DataUIPart) => TextPart | FilePart | undefined`): Converts custom UI data parts into text or file parts for the model. Data parts are ignored when this callback is omitted or returns undefined.
- `abortSignal` (`AbortSignal`): Optional abort signal to cancel the stream early (for example, if the client disconnects).
- `timeout` (`number | { totalMs?: number }`): Timeout in milliseconds. Can be specified as a number or as an object with a totalMs property. The call will be aborted if it takes longer than the specified timeout. Can be used alongside abortSignal.
- `experimental_sandbox` (`Experimental_SandboxSession`): Optional experimental sandbox environment that is passed through to tool execution. Tools can access it from their execution context.
- `options` (`CALL_OPTIONS`): Optional agent call options, only needed if your agent expects extra configuration (see agent generic parameters).
- `experimental_transform` (`StreamTextTransform | StreamTextTransform[]`): Optional transformations to apply to the agent output stream (experimental).
- `onStepEnd` (`GenerateTextOnStepEndCallback`): Callback invoked after each agent step (LLM/tool call) completes. Useful for tracking token usage, per-step performance, or logging intermediate steps.
- `onStepFinish` (`GenerateTextOnStepFinishCallback`): Deprecated. Use \`onStepEnd\` instead. This alias is only used as a fallback when \`onStepEnd\` is not provided.
- `onUIMessageStepEnd` (`UIMessageStreamOnStepEndCallback`): Callback invoked after each UI message step is assembled. It receives \`messages\`, \`isContinuation\`, and the accumulated \`responseMessage\`, making it suitable for persisting intermediate UI message state.
- `...UIMessageStreamOptions` (`UIMessageStreamOptions`): Additional options to control the UI message stream, including message IDs, metadata, final callbacks, sources, and reasoning.

## Returns

A `Promise<AsyncIterableStream<UIMessageChunk>>`, where each yielded chunk is a UI message output from the agent (see [`UIMessage`](/docs/reference/ai-sdk-core/ui-message)). This can be consumed with any async iterator loop, or piped to a streaming HTTP response, socket, or any other sink.

## Example

```ts
import { createAgentUIStream } from 'ai';

const controller = new AbortController();

const stream = await createAgentUIStream({
  agent,
  uiMessages: [{ role: 'user', content: 'What is the weather in SF today?' }],
  abortSignal: controller.signal,
  // experimental_sandbox, // optional
  sendStart: true,
  // ...other UIMessageStreamOptions
});

for await (const chunk of stream) {
  // Each chunk is a UI message update — stream it to your client, dashboard, logs, etc.
  console.log(chunk);
}

// Call controller.abort() to cancel the agent operation early.
```

## Persisting the UI Message After Each Step

Use `onUIMessageStepEnd` when you need the accumulated [`UIMessage`](/docs/reference/ai-sdk-core/ui-message) after each agent step:

```ts
const stream = await createAgentUIStream({
  agent,
  uiMessages,
  generateMessageId: () => crypto.randomUUID(),
  onUIMessageStepEnd: async ({ messages, responseMessage, isContinuation }) => {
    await upsertConversation({
      messages,
      responseMessage,
      isContinuation,
    });
  },
  onEnd: async ({ responseMessage }) => {
    // Save final metadata and any partial message when the stream ends.
    await upsertMessage(responseMessage);
  },
});

for await (const chunk of stream) {
  // Consume or forward the stream so the callback can run.
}
```

`onStepEnd` and `onUIMessageStepEnd` serve different layers. `onStepEnd` receives the low-level generation step result, including usage, finish reason, and tool call details. `onUIMessageStepEnd` runs after that step has been converted to UI message parts and receives the response message accumulated so far.

The callback runs as the UI stream is consumed and is awaited before the `finish-step` chunk continues through the stream. This delays UI stream delivery; it does not guarantee that the next model call has not started. If it throws, the error is passed to `onError` and streaming continues. Use idempotent writes because each callback contains a growing snapshot of the same response message. UI messages can contain model output, reasoning, tool inputs, and tool outputs, so apply the same access controls and sensitive-data handling that you use for final conversation persistence.

## How It Works

1. **UI Message Validation:** The input `uiMessages` array is validated and normalized using the agent's `tools` definition. Any invalid messages cause an error.
2. **Conversion to Model Messages:** The validated UI messages are converted into model-specific message format, as required by the agent.
3. **Agent Streaming:** The agent's `.stream({ prompt, ... })` method is invoked with the converted model messages, optional call options, abort signal, experimental\_sandbox, and any experimental transforms.
4. **UI Message Stream Building:** The result stream is converted and exposed as a streaming async iterable of UI message chunks for you to consume.

## Notes

- The agent **must** implement the `.stream({ prompt, ... })` method and define its supported `tools` property.
- This utility returns an async iterable for maximal streaming flexibility. For HTTP responses, see [`createAgentUIStreamResponse`](/docs/reference/ai-sdk-core/create-agent-ui-stream-response) (Web) or [`pipeAgentUIStreamToResponse`](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response) (Node.js).
- The `uiMessages` parameter is named `uiMessages`, **not** just `messages`.
- You can provide advanced options via `UIMessageStreamOptions` (for example, to include sources or message metadata).
- Use `onUIMessageStepEnd` for per-step UI message persistence. Use `onStepEnd` for low-level generation telemetry and step details.
- To cancel the stream, pass an [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) via the `abortSignal` parameter.
- Pass `experimental_sandbox` when your agent tools need an experimental sandbox environment during execution.

## See Also

- [`Agent`](/docs/reference/ai-sdk-core/agent)
- [`ToolLoopAgent`](/docs/reference/ai-sdk-core/tool-loop-agent)
- [`UIMessage`](/docs/reference/ai-sdk-core/ui-message)
- [`createAgentUIStreamResponse`](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [`pipeAgentUIStreamToResponse`](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)