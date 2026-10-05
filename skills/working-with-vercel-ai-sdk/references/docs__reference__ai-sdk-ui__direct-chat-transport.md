---
title: DirectChatTransport
description: API Reference for the DirectChatTransport class.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/direct-chat-transport"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/direct-chat-transport.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "0f981e6e08438d386eb664d940da08735d00a6a30362bf6650340972083ad513"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

A transport that directly communicates with an [Agent](/docs/reference/ai-sdk-core/agent) in-process, without going through HTTP. This is useful for:

- Server-side rendering scenarios
- Testing without network
- Single-process applications

Unlike `DefaultChatTransport` which sends HTTP requests to an API endpoint, `DirectChatTransport` invokes the agent's `stream()` method directly and converts the result to a UI message stream.

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent } from 'ai';

const agent = new ToolLoopAgent({
  model: "anthropic/claude-sonnet-5.5",
  instructions: 'You are a helpful assistant.',
});

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DirectChatTransport({ agent }),
  });

  // ... render chat UI
}
```

## Import

```
import { DirectChatTransport } from "ai"
```

## Constructor

### Parameters

- `agent` (`Agent`): The Agent instance to use for generating responses. The agent will be called with \`stream()\` for each message.
- `options?` (`CALL_OPTIONS`): Options to pass to the agent when calling it. These are agent-specific options defined when creating the agent.
- `originalMessages?` (`UIMessage[]`): The original messages. If provided, persistence mode is assumed, and a message ID is provided for the response message (generated with \`generateMessageId\`, or reused from the last message when it is an assistant message).
- `generateMessageId?` (`IdGenerator`): Generate a message ID for the response message. If not provided, no message ID will be set for the response message (unless the original messages are provided and the last message is an assistant message).
- `messageMetadata?` (`(options: { part: TextStreamPart }) => METADATA | undefined`): Extracts message metadata that will be sent to the client. Called on \`start\` and \`finish\` events.
- `sendReasoning?` (`boolean`): Send reasoning parts to the client. Defaults to true.
- `sendSources?` (`boolean`): Send source parts to the client. Defaults to false.
- `sendFinish?` (`boolean`): Send the finish event to the client. Set to false if you are using additional streamText calls that send additional data. Defaults to true.
- `sendStart?` (`boolean`): Send the message start event to the client. Set to false if you are using additional streamText calls and the message start event has already been sent. Defaults to true.
- `onError?` (`(error: unknown) => string`): Process an error, e.g. to log it. Defaults to \`() => 'An error occurred.'\`. Return the error message to include in the data stream.

## Methods

### `sendMessages()`

Sends messages to the agent and returns a streaming response. This method validates and converts UI messages to model messages, calls the agent's `stream()` method, and returns the result as a UI message stream.

```ts
const stream = await transport.sendMessages({
  chatId: 'chat-123',
  trigger: 'submit-message',
  messages: [...],
  abortSignal: controller.signal,
});
```

- `chatId` (`string`): Unique identifier for the chat session.
- `trigger` (`'submit-message' | 'regenerate-message'`): The type of message submission - either new message or regeneration.
- `messageId` (`string | undefined`): ID of the message to regenerate, or undefined for new messages.
- `messages` (`UIMessage[]`): Array of UI messages representing the conversation history.
- `abortSignal` (`AbortSignal | undefined`): Signal to abort the request if needed.
- `headers?` (`Record<string, string> | Headers`): Additional headers (ignored by DirectChatTransport).
- `body?` (`object`): Additional body properties (ignored by DirectChatTransport).
- `metadata?` (`unknown`): Custom metadata (ignored by DirectChatTransport).

#### Returns

Returns a `Promise<ReadableStream<UIMessageChunk>>` - a stream of UI message chunks that can be processed by the chat UI.

### `reconnectToStream()`

Direct transport does not support reconnection since there is no persistent server-side stream to reconnect to.

#### Returns

Always returns `Promise<null>`.

## Examples

### Basic Usage

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent } from 'ai';
import { openai } from '@ai-sdk/openai';

const agent = new ToolLoopAgent({
  model: openai('gpt-6-astra'),
  instructions: 'You are a helpful assistant.',
});

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DirectChatTransport({ agent }),
  });

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          {message.role === 'user' ? 'User: ' : 'AI: '}
          {message.parts.map((part, index) =>
            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
          )}
        </div>
      ))}
      <button onClick={() => sendMessage({ text: 'Hello!' })}>Send</button>
    </div>
  );
}
```

### With Agent Tools

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const weatherTool = tool({
  description: 'Get the current weather',
  inputSchema: z.object({
    location: z.string().describe('The city and state'),
  }),
  execute: async ({ location }) => {
    return `The weather in ${location} is sunny and 72°F.`;
  },
});

const agent = new ToolLoopAgent({
  model: openai('gpt-6-astra'),
  instructions: 'You are a helpful assistant with access to weather data.',
  tools: { weather: weatherTool },
});

export default function Chat() {
  const { messages, sendMessage } = useChat({
    transport: new DirectChatTransport({ agent }),
  });

  // ... render chat UI with tool results
}
```

### With Custom Agent Options

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent } from 'ai';
import { openai } from '@ai-sdk/openai';

const agent = new ToolLoopAgent<{ userId: string }>({
  model: openai('gpt-6-astra'),
  prepareCall: ({ options, ...rest }) => ({
    ...rest,
    providerOptions: {
      openai: { user: options.userId },
    },
  }),
});

export default function Chat({ userId }: { userId: string }) {
  const { messages, sendMessage } = useChat({
    transport: new DirectChatTransport({
      agent,
      options: { userId },
    }),
  });

  // ... render chat UI
}
```

### With Reasoning

```tsx
import { useChat } from '@ai-sdk/react';
import { DirectChatTransport, ToolLoopAgent } from 'ai';
import { openai } from '@ai-sdk/openai';

const agent = new ToolLoopAgent({
  model: openai('o1-preview'),
});

export default function Chat() {
  const { messages, sendMessage } = useChat({
    transport: new DirectChatTransport({
      agent,
      sendReasoning: true,
    }),
  });

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          {message.parts.map((part, index) => {
            if (part.type === 'text') {
              return <p key={index}>{part.text}</p>;
            }
            if (part.type === 'reasoning') {
              return (
                <pre key={index} style={{ opacity: 0.6 }}>
                  {part.text}
                </pre>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)