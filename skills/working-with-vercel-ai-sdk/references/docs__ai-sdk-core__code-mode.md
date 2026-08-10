---
source: "https://ai-sdk.dev/docs/ai-sdk-core/code-mode.md"
fetched_at: "2026-08-10T05:31:58.738Z"
sha256: "d8665d5a63dc4217c2a92c64b37a2683c763e0acc283f5c25a8ea0d0a37f9c26"
---

# Code Mode

Code mode lets a model write JavaScript or TypeScript that calls your AI SDK
tools. The generated code runs in an isolated QuickJS sandbox and returns a JSON-serializable result.

Instead of calling tools one at a time, a model can use code mode to:

- call independent tools concurrently
- transform and combine tool results
- filter large tool responses before returning them to the model
- use JavaScript control flow for multi-step operations

Code mode is provided by the `@ai-sdk/code-mode` package.

<Note type="warning">
  Code mode is experimental and its APIs may change in future releases. It
  requires Node.js 22 or newer and is not available in browser or edge runtimes.
</Note>

## Installation

```bash
pnpm add ai @ai-sdk/code-mode zod
```

## Using Code Mode with `generateText`

Define your tools in one tool set and use `experimental_toolCallers` to select
which tools code mode can call:

```ts
import {
  DIRECT_TOOL_CALL,
  experimental_codeModeTool as codeModeTool,
} from '@ai-sdk/code-mode';
import { generateText, isStepCount, tool } from 'ai';
import { z } from 'zod';

const getInventory = tool({
  description: 'Get available inventory for a product.',
  inputSchema: z.object({
    productId: z.string(),
  }),
  outputSchema: z.object({
    productId: z.string(),
    availableUnits: z.number(),
  }),
  execute: async ({ productId }) => ({
    productId,
    availableUnits: 42,
  }),
});

const getDemand = tool({
  description: 'Get requested units for a product.',
  inputSchema: z.object({
    productId: z.string(),
  }),
  outputSchema: z.object({
    productId: z.string(),
    requestedUnits: z.number(),
  }),
  execute: async ({ productId }) => ({
    productId,
    requestedUnits: 31,
  }),
});

const tools = {
  code_mode: codeModeTool({
    executionPolicy: {
      timeoutMs: 30_000,
    },
  }),
  getInventory,
  getDemand,
} as const;

const result = await generateText({
  model: __MODEL__,
  tools,
  experimental_toolCallers: {
    getInventory: ['code_mode'],
    getDemand: ['code_mode'],
  },
  stopWhen: isStepCount(10),
  prompt: 'Compare inventory and demand for product sku_123.',
});
```

The keys in `experimental_toolCallers` are the tools being governed.
The values identify their allowed callers. In this example, `getInventory` and
`getDemand` are available through `code_mode`, but they are not exposed to the
model as directly callable tools. Include `DIRECT_TOOL_CALL` when a tool should
also be callable directly:

```ts
experimental_toolCallers: {
  getInventory: ['code_mode', DIRECT_TOOL_CALL],
};
```

Tools without an `experimental_toolCallers` entry keep their existing direct
tool-calling behavior.

The code mode tool description includes TypeScript signatures generated from
the input and output schemas of its allowed tools. Descriptions,
`inputExamples`, and precise schemas help the model write correct code.

For the example above, the model can generate a program like:

```ts
const [inventory, demand] = await Promise.all([
  tools.getInventory({ productId: 'sku_123' }),
  tools.getDemand({ productId: 'sku_123' }),
]);

return {
  sufficient: inventory.availableUnits >= demand.requestedUnits,
  remaining: inventory.availableUnits - demand.requestedUnits,
};
```

Each provided tool is available through the global `tools` object. Tool names
that are not valid JavaScript identifiers use bracket notation:

```ts
const user = await tools['lookup-user']({ userId: 'user_123' });
return { id: user.id, plan: user.plan };
```

## Writing Code Mode Programs

Generated programs support:

- JavaScript and type-stripped TypeScript
- top-level `await` and `return`
- standard JavaScript control flow and data transformations
- `Promise.all` for concurrent tool calls
- `JSON.parse` and `JSON.stringify`
- `console.log`, `console.info`, `console.debug`, and `console.error`

Every tool call is asynchronous and must be awaited or otherwise observed.
Returning while tool calls are still detached fails the invocation and aborts
the outstanding work.

Programs and tool inputs and outputs cross the sandbox boundary as JSON. Return
only JSON-serializable values. TypeScript support is limited to removing type
syntax; code mode does not perform type checking or provide a full TypeScript
compiler.

## Direct Execution

Use `experimental_runCodeMode` when you want to execute a program directly
instead of exposing code mode to a model:

```ts
import { experimental_runCodeMode as runCodeMode } from '@ai-sdk/code-mode';

const result = await runCodeMode({
  js: `
    const inventory = await tools.getInventory({
      productId: 'sku_123',
    });

    return {
      productId: inventory.productId,
      available: inventory.availableUnits > 0,
    };
  `,
  tools: { getInventory },
});
```

`runCodeMode` returns the value returned by the program. It uses the same
sandbox and execution limits as the AI SDK tool.

## Execution Limits

Every invocation has limits for runtime, memory, source size, results, tool
payloads, console output, and tool calls. Override them with
`executionPolicy`:

```ts
const codeMode = codeModeTool({
  executionPolicy: {
    timeoutMs: 30_000,
    memoryLimitBytes: 64 * 1024 * 1024,
    maxResultBytes: 1024 * 1024,
    maxBridgeRequests: 100,
    maxInFlightBridgeRequests: 10,
  },
});
```

The available limits are:

- `timeoutMs`: total execution time
- `memoryLimitBytes`: QuickJS memory
- `maxStackSizeBytes`: QuickJS stack
- `maxSourceBytes`: generated source code
- `maxResultBytes`: returned result
- `maxConsoleOutputBytes`: combined console output
- `maxToolInputBytes`: input for each tool call
- `maxToolOutputBytes`: output from each tool call
- `maxBridgeRequests`: total tool calls
- `maxInFlightBridgeRequests`: concurrent tool calls

Use `experimental_setMaxWorkers` to set a process-wide cap on concurrent code
mode workers:

```ts
import { experimental_setMaxWorkers as setMaxWorkers } from '@ai-sdk/code-mode';

setMaxWorkers(4);
```

Without an explicit cap, code mode chooses one based on available memory, up to
32 workers.

## Isolation and Tool Access

Each invocation receives a fresh QuickJS context. Sandboxed code cannot access:

- Node.js globals such as `process`, `require`, or `module`
- the host file system or module loader
- `fetch`, WebCrypto, or performance APIs
- `eval` or dynamic `Function` construction

Network or system access must be implemented in a tool and explicitly provided
to code mode.

<Note type="warning">
  Treat the sandbox as defense in depth. Generated code and tool arguments are
  untrusted. Tools execute in your host application, outside the QuickJS
  sandbox, and every capability exposed by a provided tool is available to the
  generated program. Enforce authorization and validate inputs inside each tool.
</Note>

Tool input schemas are validated before their `execute` functions run. Abort
signals and AI SDK tool execution context are forwarded to nested tool calls.

Code mode does not currently support approval flows for nested tool calls.
Tools that require approval are rejected instead of being executed.


## Navigation

- [Overview](/docs/ai-sdk-core/overview)
- [Generating Text](/docs/ai-sdk-core/generating-text)
- [Generating Structured Data](/docs/ai-sdk-core/generating-structured-data)
- [Tool Calling](/docs/ai-sdk-core/tools-and-tool-calling)
- [Model Context Protocol (MCP)](/docs/ai-sdk-core/mcp-tools)
- [MCP Apps](/docs/ai-sdk-core/mcp-apps)
- [Runtime and Tool Context](/docs/ai-sdk-core/runtime-and-tool-context)
- [Code Mode](/docs/ai-sdk-core/code-mode)
- [Prompt Engineering](/docs/ai-sdk-core/prompt-engineering)
- [Settings](/docs/ai-sdk-core/settings)
- [Reasoning](/docs/ai-sdk-core/reasoning)
- [Embeddings](/docs/ai-sdk-core/embeddings)
- [Reranking](/docs/ai-sdk-core/reranking)
- [Image Generation](/docs/ai-sdk-core/image-generation)
- [Realtime](/docs/ai-sdk-core/realtime)
- [Transcription](/docs/ai-sdk-core/transcription)
- [Translation](/docs/ai-sdk-core/translation)
- [Speech](/docs/ai-sdk-core/speech)
- [Video Generation](/docs/ai-sdk-core/video-generation)
- [File Uploads](/docs/ai-sdk-core/file-uploads)
- [Language Model Middleware](/docs/ai-sdk-core/middleware)
- [Skill Uploads](/docs/ai-sdk-core/skill-uploads)
- [Provider & Model Management](/docs/ai-sdk-core/provider-management)
- [Error Handling](/docs/ai-sdk-core/error-handling)
- [Testing](/docs/ai-sdk-core/testing)
- [Telemetry](/docs/ai-sdk-core/telemetry)
- [DevTools](/docs/ai-sdk-core/devtools)
- [Lifecycle Callbacks](/docs/ai-sdk-core/lifecycle-callbacks)


[Full Sitemap](/sitemap.md)
