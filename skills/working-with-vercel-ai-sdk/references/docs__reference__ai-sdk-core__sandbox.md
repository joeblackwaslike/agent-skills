---
title: Experimental_SandboxSession
description: API Reference for the Experimental_SandboxSession interface.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/sandbox"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/sandbox.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "c0e782d106b63476c30dddaa545f1b5035d8879fb533b253b9c4c52eb8da9ac7"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `Experimental_SandboxSession` interface describes an execution environment that
tools can use to run commands. Pass an experimental sandbox using the
`experimental_sandbox` option to `generateText`, `streamText`,
`ToolLoopAgent.generate`, `ToolLoopAgent.stream`, or agent UI stream helpers to
make it available to tool description functions and tool execution.

This API is experimental and can change in patch releases. Passing an
experimental sandbox does not sandbox the tool itself. Tool code still runs in
your application process unless the tool explicitly delegates work to the
experimental sandbox.

## Import

```
import type { Experimental_SandboxSession } from "ai"
```

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

- `description` (`string`): Description of the experimental sandbox environment. Include this in your prompt or instructions when the model needs to know details such as the root directory, exposed ports, public hostname, or other environment constraints. The AI SDK does not add it to the prompt automatically.
- `run` (`(options: { command: string; workingDirectory?: string; env?: Record<string, string>; abortSignal?: AbortSignal }) => PromiseLike<{ exitCode: number; stdout: string; stderr: string }>`): Executes a command in the experimental sandbox and resolves with the command exit code, standard output, and standard error.
  - `options`
    - `command` (`string`): The command to execute in the experimental sandbox.
    - `workingDirectory` (`string | undefined`): Optional working directory to execute the command in. If omitted, the experimental sandbox implementation uses its default working directory.
    - `env` (`Record<string, string> | undefined`): Optional environment variables to set for the command. Merged with the experimental sandbox default environment, with these values taking precedence. Passing secrets here instead of inlining them into the command avoids leaking them in logs. Implementations that cannot set environment variables reject this option.
    - `abortSignal` (`AbortSignal | undefined`): Optional abort signal that the experimental sandbox implementation can use to cancel the command.

## Example

```ts
const result = await generateText({
  model: "anthropic/claude-sonnet-5.5",
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

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)