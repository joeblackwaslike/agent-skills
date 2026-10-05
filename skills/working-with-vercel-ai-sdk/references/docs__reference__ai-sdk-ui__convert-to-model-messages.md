---
title: convertToModelMessages
description: Convert useChat messages to ModelMessages for AI functions (API Reference)
url: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/convert-to-model-messages"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-ui/convert-to-model-messages.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "718a75fc46798247a327e0f93fdc9a13f05b3d2682f24925b6526744b9d5e460"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `convertToModelMessages` function is used to transform an array of UI messages from the `useChat` hook into an array of `ModelMessage` objects. These `ModelMessage` objects are compatible with AI core functions like `streamText`.

```ts title="app/api/chat/route.ts"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
} from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-5.5",
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

## Import

```
import { convertToModelMessages } from "ai"
```

## API Signature

### Parameters

- `messages` (`Message[]`): An array of UI messages from the useChat hook to be converted
- `options` (`{ tools?: ToolSet, ignoreIncompleteToolCalls?: boolean, convertDataPart?: (part: DataUIPart) => TextPart | FilePart | undefined }`): Optional configuration object. Provide tools to enable multi-modal tool responses. Set ignoreIncompleteToolCalls to true to skip tool calls without results (default: false). Use convertDataPart to transform custom data parts into model-compatible content.

### Returns

A Promise that resolves to an array of [`ModelMessage`](/docs/reference/ai-sdk-core/model-message) objects.

- `Promise<ModelMessage[]>` (`Promise`): A Promise that resolves to an array of ModelMessage objects

## Deprecated `rawInput` field

Tool parts in the `output-error` state should store their tool arguments in
`input`. The legacy `rawInput` field remains supported for persisted messages,
but `convertToModelMessages` emits an AI SDK deprecation warning when it
encounters a defined value.

When both fields are present, `input` takes precedence when it is non-nullish.
For backward compatibility, `rawInput` remains the fallback when `input` is
`null` or `undefined`. Migrate stored messages to `input` before the next major
version, when `rawInput` will be removed.

## Tool Approval States

`convertToModelMessages` preserves tool approval state from UI messages when converting them back into `ModelMessage`s for a follow-up `generateText` or `streamText` call.

- Tool parts with approval metadata produce `tool-approval-request` content parts. `approval.requestReason` is forwarded as the request `reason` when present.
- Tool parts in `approval-responded` state also become `tool-approval-response` content parts. The separate response `reason` is forwarded when present.
- Automatic approval metadata is preserved by forwarding `approval.isAutomatic` to the `tool-approval-request` part.
- Denied tool approvals also produce a synthetic `tool-result` with `output: { type: 'execution-denied', reason?: string }`, so the model receives a complete tool lifecycle and can respond to the denial in the next step.

## Multi-modal Tool Responses

The `convertToModelMessages` function supports tools that can return multi-modal content. This is useful when tools need to return non-text content like images.

```ts
import { tool } from 'ai';
import { z } from 'zod';

const screenshotTool = tool({
  inputSchema: z.object({}),
  execute: async () => 'imgbase64',
  toModelOutput: ({ output }) => [
    { type: 'file-data', data: output, mediaType: 'image/png' },
  ],
});

const result = streamText({
  model: "anthropic/claude-sonnet-5.5",
  messages: await convertToModelMessages(messages, {
    tools: {
      screenshot: screenshotTool,
    },
  }),
});
```

Tools can implement the optional `toModelOutput` method to transform their results into multi-modal content. The content is an array of content parts, where each part has a `type` (e.g., 'text', 'image') and corresponding data.

## Custom Data Part Conversion

The `convertToModelMessages` function supports converting custom data parts attached to user messages. This is useful when users need to include additional context (URLs, code files, JSON configs) with their messages.

### Basic Usage

By default, data parts in user messages are filtered out during conversion. To include them, provide a `convertDataPart` callback that transforms data parts into text or file parts that the model can understand:

```ts title="app/api/chat/route.ts"
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai';

type CustomUIMessage = UIMessage<
  never,
  {
    url: { url: string; title: string; content: string };
    'code-file': { filename: string; code: string; language: string };
  }
>;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-5.5",
    messages: await convertToModelMessages<CustomUIMessage>(messages, {
      convertDataPart: part => {
        // Convert URL attachments to text
        if (part.type === 'data-url') {
          return {
            type: 'text',
            text: `[Reference: ${part.data.title}](${part.data.url})\n\n${part.data.content}`,
          };
        }

        // Convert code file attachments
        if (part.type === 'data-code-file') {
          return {
            type: 'text',
            text: `\`\`\`${part.data.language}\n// ${part.data.filename}\n${part.data.code}\n\`\`\``,
          };
        }

        // Other data parts are ignored
      },
    }),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
```

### Use Cases

**Attaching URL Content**
Allow users to attach URLs to their messages, with the content fetched and formatted for the model:

```ts
// Client side
sendMessage({
  parts: [
    { type: 'text', text: 'Analyze this article' },
    {
      type: 'data-url',
      data: {
        url: 'https://example.com/article',
        title: 'Important Article',
        content: '...',
      },
    },
  ],
});
```

**Including Code Files as Context**
Let users reference code files in their conversations:

```ts
convertDataPart: part => {
  if (part.type === 'data-code-file') {
    return {
      type: 'text',
      text: `\`\`\`${part.data.language}\n${part.data.code}\n\`\`\``,
    };
  }
};
```

**Selective Inclusion**
Only data parts for which you return a text or file model message part are included,
all other data parts are ignored.

```ts
const result = await convertToModelMessages<
  UIMessage<
    unknown,
    {
      url: { url: string; title: string };
      code: { code: string; language: string };
      note: { text: string };
    }
  >
>(messages, {
  convertDataPart: part => {
    if (part.type === 'data-url') {
      return {
        type: 'text',
        text: `[${part.data.title}](${part.data.url})`,
      };
    }

    // data-code and data-note are ignored
  },
});
```

### Type Safety

The generic parameter ensures full type safety for your custom data parts:

```ts
type MyUIMessage = UIMessage<
  unknown,
  {
    url: { url: string; content: string };
    config: { key: string; value: string };
  }
>;

// TypeScript knows the exact shape of part.data
convertToModelMessages<MyUIMessage>(messages, {
  convertDataPart: part => {
    if (part.type === 'data-url') {
      // part.data is typed as { url: string; content: string }
      return { type: 'text', text: part.data.url };
    }
    // Return undefined to skip this part
  },
});
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)