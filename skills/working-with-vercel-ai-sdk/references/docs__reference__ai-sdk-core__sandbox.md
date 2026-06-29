---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/sandbox.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "c21746f4d433d3c40f446fb25ae9d909c44cbb3bb511af668d88ec53b6622177"
---

# `Experimental_SandboxSession`

The `Experimental_SandboxSession` interface describes an execution environment that
tools can use to run commands. Pass an experimental sandbox using the
`experimental_sandbox` option to `generateText`, `streamText`,
`ToolLoopAgent.generate`, `ToolLoopAgent.stream`, or agent UI stream helpers to
make it available to tool description functions and tool execution.

<Note type="warning">
  This API is experimental and can change in patch releases. Passing an
  experimental sandbox does not sandbox the tool itself. Tool code still runs in
  your application process unless the tool explicitly delegates work to the
  experimental sandbox.
</Note>

## Import

<Snippet
  text={`import type { Experimental_SandboxSession } from "ai"`}
  prompt={false}
/>

## Type Definition

```ts
type Experimental_SandboxSession = {
  readonly description: string;
  readonly run: (options: {
    command: string;
    workingDirectory?: string;
    env?: Record<string, string>;
    abortSignal?: AbortSignal;
  }) => PromiseLike<{
    exitCode: number;
    stdout: string;
    stderr: string;
  }>;
};
```

## Properties

<PropertiesTable
  content={[
    {
      name: 'description',
      type: 'string',
      description:
        'Description of the experimental sandbox environment. Include this in your prompt or instructions when the model needs to know details such as the root directory, exposed ports, public hostname, or other environment constraints. The AI SDK does not add it to the prompt automatically.',
    },
    {
      name: 'run',
      type: '(options: { command: string; workingDirectory?: string; env?: Record<string, string>; abortSignal?: AbortSignal }) => PromiseLike<{ exitCode: number; stdout: string; stderr: string }>',
      description:
        'Executes a command in the experimental sandbox and resolves with the command exit code, standard output, and standard error.',
      properties: [
        {
          type: 'options',
          parameters: [
            {
              name: 'command',
              type: 'string',
              description:
                'The command to execute in the experimental sandbox.',
            },
            {
              name: 'workingDirectory',
              type: 'string | undefined',
              description:
                'Optional working directory to execute the command in. If omitted, the experimental sandbox implementation uses its default working directory.',
            },
            {
              name: 'env',
              type: 'Record<string, string> | undefined',
              description:
                'Optional environment variables to set for the command. Merged with the experimental sandbox default environment, with these values taking precedence. Passing secrets here instead of inlining them into the command avoids leaking them in logs. Implementations that cannot set environment variables reject this option.',
            },
            {
              name: 'abortSignal',
              type: 'AbortSignal | undefined',
              description:
                'Optional abort signal that the experimental sandbox implementation can use to cancel the command.',
            },
          ],
        },
      ],
    },
  ]}
/>

## Example

```ts
const result = await generateText({
  model: __MODEL__,
  tools: { shell },
  experimental_sandbox,
  prompt: 'Run the test suite.',
});
```

Inside a tool, read the experimental sandbox from the second `execute` argument:

```ts
const shell = tool({
  inputSchema: z.object({
    command: z.string(),
    workingDirectory: z.string().optional(),
  }),
  execute: async (
    { command, workingDirectory },
    { abortSignal, experimental_sandbox },
  ) => {
    if (!experimental_sandbox) {
      throw new Error('Experimental sandbox is not available');
    }

    return experimental_sandbox.run({
      command,
      workingDirectory,
      abortSignal,
    });
  },
});
```

## See Also

- [Tool Calling: Experimental Sandbox](/docs/ai-sdk-core/tools-and-tool-calling#experimental-sandbox)
- [`generateText`](/docs/reference/ai-sdk-core/generate-text)
- [`streamText`](/docs/reference/ai-sdk-core/stream-text)
- [`ToolLoopAgent`](/docs/reference/ai-sdk-core/tool-loop-agent)


## Navigation

- [generateText](/docs/reference/ai-sdk-core/generate-text)
- [streamText](/docs/reference/ai-sdk-core/stream-text)
- [embed](/docs/reference/ai-sdk-core/embed)
- [embedMany](/docs/reference/ai-sdk-core/embed-many)
- [rerank](/docs/reference/ai-sdk-core/rerank)
- [generateImage](/docs/reference/ai-sdk-core/generate-image)
- [transcribe](/docs/reference/ai-sdk-core/transcribe)
- [generateSpeech](/docs/reference/ai-sdk-core/generate-speech)
- [experimental_generateVideo](/docs/reference/ai-sdk-core/generate-video)
- [uploadFile](/docs/reference/ai-sdk-core/upload-file)
- [uploadSkill](/docs/reference/ai-sdk-core/upload-skill)
- [Agent (Interface)](/docs/reference/ai-sdk-core/agent)
- [ToolLoopAgent](/docs/reference/ai-sdk-core/tool-loop-agent)
- [createAgentUIStream](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [createAgentUIStreamResponse](/docs/reference/ai-sdk-core/create-agent-ui-stream-response)
- [pipeAgentUIStreamToResponse](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)
- [tool](/docs/reference/ai-sdk-core/tool)
- [dynamicTool](/docs/reference/ai-sdk-core/dynamic-tool)
- [createMCPClient](/docs/reference/ai-sdk-core/create-mcp-client)
- [experimental_getRealtimeToolDefinitions](/docs/reference/ai-sdk-core/get-realtime-tool-definitions)
- [MCP Apps](/docs/reference/ai-sdk-core/mcp-apps)
- [Experimental_StdioMCPTransport](/docs/reference/ai-sdk-core/mcp-stdio-transport)
- [jsonSchema](/docs/reference/ai-sdk-core/json-schema)
- [zodSchema](/docs/reference/ai-sdk-core/zod-schema)
- [valibotSchema](/docs/reference/ai-sdk-core/valibot-schema)
- [Output](/docs/reference/ai-sdk-core/output)
- [filterActiveTools](/docs/reference/ai-sdk-core/filter-active-tools)
- [ModelMessage](/docs/reference/ai-sdk-core/model-message)
- [UIMessage](/docs/reference/ai-sdk-core/ui-message)
- [validateUIMessages](/docs/reference/ai-sdk-core/validate-ui-messages)
- [safeValidateUIMessages](/docs/reference/ai-sdk-core/safe-validate-ui-messages)
- [Experimental_SandboxSession](/docs/reference/ai-sdk-core/sandbox)
- [createProviderRegistry](/docs/reference/ai-sdk-core/provider-registry)
- [customProvider](/docs/reference/ai-sdk-core/custom-provider)
- [cosineSimilarity](/docs/reference/ai-sdk-core/cosine-similarity)
- [wrapLanguageModel](/docs/reference/ai-sdk-core/wrap-language-model)
- [wrapImageModel](/docs/reference/ai-sdk-core/wrap-image-model)
- [LanguageModelV4Middleware](/docs/reference/ai-sdk-core/language-model-v2-middleware)
- [extractReasoningMiddleware](/docs/reference/ai-sdk-core/extract-reasoning-middleware)
- [simulateStreamingMiddleware](/docs/reference/ai-sdk-core/simulate-streaming-middleware)
- [defaultSettingsMiddleware](/docs/reference/ai-sdk-core/default-settings-middleware)
- [addToolInputExamplesMiddleware](/docs/reference/ai-sdk-core/add-tool-input-examples-middleware)
- [extractJsonMiddleware](/docs/reference/ai-sdk-core/extract-json-middleware)
- [isStepCount](/docs/reference/ai-sdk-core/is-step-count)
- [hasToolCall](/docs/reference/ai-sdk-core/has-tool-call)
- [isLoopFinished](/docs/reference/ai-sdk-core/loop-finished)
- [simulateReadableStream](/docs/reference/ai-sdk-core/simulate-readable-stream)
- [smoothStream](/docs/reference/ai-sdk-core/smooth-stream)
- [generateId](/docs/reference/ai-sdk-core/generate-id)
- [createIdGenerator](/docs/reference/ai-sdk-core/create-id-generator)
- [DefaultGeneratedFile](/docs/reference/ai-sdk-core/default-generated-file)


[Full Sitemap](/sitemap.md)
