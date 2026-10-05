---
title: dynamicTool
description: Helper function for creating dynamic tools with unknown types
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/dynamic-tool"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/dynamic-tool.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "000837246420964f533df7560ef700076219358eb970eb13680ed36666f68a34"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `dynamicTool` function creates tools where the input and output types are not known at compile time. This is useful for scenarios such as:

- MCP (Model Context Protocol) tools without schemas
- User-defined functions loaded at runtime
- Tools loaded from external sources or databases
- Dynamic tool generation based on user input

Unlike the regular `tool` function, `dynamicTool` accepts and returns `unknown` types, allowing you to work with tools that have runtime-determined schemas.

```ts {1,4,9,11}
import { dynamicTool } from 'ai';
import { z } from 'zod';

export const customTool = dynamicTool({
  description: 'Execute a custom user-defined function',
  inputSchema: z.object({ action: z.string(), parameters: z.unknown() }),
  // input is typed as 'unknown'
  execute: async input => {
    const { action, parameters } = input as any;

    // Execute your dynamic logic
    return {
      result: `Executed ${action} with ${JSON.stringify(parameters)}`,
    };
  },
});
```

## Import

```
import { dynamicTool } from "ai"
```

## API Signature

### Parameters

- `tool` (`Object`): The dynamic tool definition.
  - `Object`
    - `description?` (`string | ((options: { context: Context; experimental_sandbox?: Experimental_SandboxSession }) => string)`): Information about the purpose of the tool including details on how and when it can be used by the model. Provide a string for a fixed description, or a function to derive the description from the tool-specific context and optional experimental sandbox before each model call.
    - `deferLoading?` (`boolean`): Keep this tool out of the model context until toolSearch discovers it. Supports direct calling or code mode with toolDiscovery: 'conversation'. Discovered tools become available on the next model step. Defaults to false.
    - `title?` (`string`): Deprecated. Use \`providerMetadata\` for source-specific tool display metadata.
    - `needsApproval?` (`boolean | ((input: unknown, options: { toolCallId: string; messages: ModelMessage[]; context: Context }) => boolean | Promise<boolean>)`): Deprecated. For \`generateText\`, \`streamText\`, and \`ToolLoopAgent\`, configure approval with \`toolApproval\` instead. Existing \`needsApproval\` usages still work as a compatibility fallback. When used, it can be a boolean or a function that receives the tool input plus execution metadata.
    - `inputSchema` (`FlexibleSchema<unknown>`): The schema of the input that the tool expects. While the type is unknown, a schema is still required for validation. You can use Zod schemas with z.unknown() or z.any() for fully dynamic inputs.
    - `execute` (`ToolExecuteFunction<unknown, unknown, Context>`): An async function that is called with the arguments from the tool call. The input is typed as unknown and must be validated/cast at runtime.
      - `ToolExecutionOptions<Context>`
        - `toolCallId` (`string`): The ID of the tool call.
        - `messages` (`ModelMessage[]`): Messages that were sent to the language model.
        - `abortSignal?` (`AbortSignal`): An optional abort signal.
        - `context` (`Context`): Tool-specific context passed into tool execution. This value comes from the matching entry in \`toolsContext\`.
    - `outputSchema?` (`Zod Schema | JSON Schema`): The schema of the output that the tool produces. Used for validation and type inference.
    - `toModelOutput?` (`({toolCallId: string; input: unknown; output: unknown}) => ToolResultOutput | PromiseLike<ToolResultOutput>`): Optional conversion function that maps the tool result to an output that can be used by the language model.
    - `onInputStart?` (`(options: ToolExecutionOptions<Context>) => void | PromiseLike<void>`): Optional function that is called when the model starts generating the tool input. In non-streaming contexts, it is called immediately before onInputAvailable.
    - `onInputDelta?` (`(options: { inputTextDelta: string } & ToolExecutionOptions<Context>) => void | PromiseLike<void>`): Optional function that is called when an argument streaming delta is available. Only called when the tool is used in a streaming context.
    - `onInputAvailable?` (`(options: { input: unknown } & ToolExecutionOptions<Context>) => void | PromiseLike<void>`): Optional function that is called when a tool call can be started, even if the execute function is not provided.
    - `providerOptions?` (`ProviderOptions`): Additional provider-specific metadata.
    - `metadata?` (`JSONObject`): Optional metadata about the tool itself (e.g. its source). It is propagated onto the resulting tool call's toolMetadata so consumers can read it from tool call/result parts and UI message parts. Useful for sources of dynamic tools (e.g. an MCP server) to identify themselves.

### Returns

A `Tool<unknown, unknown>` with `type: 'dynamic'` that can be used with `generateText`, `streamText`, and other AI SDK functions.

## Type-Safe Usage

When using dynamic tools alongside static tools, you need to check the `dynamic` flag for proper type narrowing:

```ts
const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
  tools: {
    // Static tool with known types
    weather: weatherTool,
    // Dynamic tool with unknown types
    custom: dynamicTool({
      /* ... */
    }),
  },
  onStepEnd: ({ toolCalls, toolResults }) => {
    for (const toolCall of toolCalls) {
      if (toolCall.dynamic) {
        // Dynamic tool: input/output are 'unknown'
        console.log('Dynamic tool:', toolCall.toolName);
        console.log('Input:', toolCall.input);
        continue;
      }

      // Static tools have full type inference
      switch (toolCall.toolName) {
        case 'weather':
          // TypeScript knows the exact types
          console.log(toolCall.input.location); // string
          break;
      }
    }
  },
});
```

## Usage with `useChat`

When used with useChat (`UIMessage` format), dynamic tools appear as `dynamic-tool` parts:

```tsx
{
  message.parts.map(part => {
    switch (part.type) {
      case 'dynamic-tool':
        return (
          <div>
            <h4>Tool: {part.toolName}</h4>
            <pre>{JSON.stringify(part.input, null, 2)}</pre>
          </div>
        );
      // ... handle other part types
    }
  });
}
```

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)