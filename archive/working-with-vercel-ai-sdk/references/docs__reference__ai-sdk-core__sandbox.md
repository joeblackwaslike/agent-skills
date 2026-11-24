---
title: Experimental_SandboxSession
description: API Reference for the Experimental_SandboxSession interface.
url: "https://ai-sdk.dev/docs/reference/ai-sdk-core/sandbox"
docs_index: /llms.txt
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/sandbox.md"
fetched_at: "2026-11-02T12:06:29.726Z"
sha256: "c8851e72fb235905a57dfba86e209019e25b2e201d8adc4eed5aa34b7d7c05dc"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

The `Experimental_SandboxSession` interface describes an execution environment that
tools can use to run commands and access files. Pass an experimental sandbox using the
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
  }) => PromiseLike<{ exitCode: number; stdout: string; stderr: string }>;
  readonly spawn: (options: {
    command: string;
    workingDirectory?: string;
    env?: Record<string, string>;
    abortSignal?: AbortSignal;
    stdin?: boolean;
  }) => PromiseLike<Experimental_SandboxProcess>;

  readonly readFile: (options: {
    path: string;
    abortSignal?: AbortSignal;
  }) => PromiseLike<ReadableStream<Uint8Array> | null>;
  readonly readBinaryFile: (options: {
    path: string;
    abortSignal?: AbortSignal;
  }) => PromiseLike<Uint8Array | null>;
  readonly readTextFile: (options: {
    path: string;
    encoding?: string;
    startLine?: number;
    endLine?: number;
    abortSignal?: AbortSignal;
  }) => PromiseLike<string | null>;

  readonly writeFile: (options: {
    path: string;
    content: ReadableStream<Uint8Array>;
    abortSignal?: AbortSignal;
  }) => PromiseLike<void>;
  readonly writeBinaryFile: (options: {
    path: string;
    content: Uint8Array;
    abortSignal?: AbortSignal;
  }) => PromiseLike<void>;
  readonly writeTextFile: (options: {
    path: string;
    content: string;
    encoding?: string;
    abortSignal?: AbortSignal;
  }) => PromiseLike<void>;

  readonly stat: (options: {
    path: string;
    abortSignal?: AbortSignal;
  }) => PromiseLike<Experimental_SandboxFileStat | null>;
  readonly listDirectory: (options: {
    path: string;
    abortSignal?: AbortSignal;
  }) => PromiseLike<Array<Experimental_SandboxDirectoryEntry> | null>;
  readonly deleteFile: (options: {
    path: string;
    abortSignal?: AbortSignal;
  }) => PromiseLike<boolean>;
};

type Experimental_SandboxFileStat = {
  type: 'file' | 'directory' | 'other';
  size: number;
};

type Experimental_SandboxDirectoryEntry = {
  name: string;
  type: 'file' | 'directory' | 'symlink' | 'other';
};
```

## Paths

Relative paths in every method, including the `workingDirectory` option of `run`
and `spawn`, resolve against the same base directory: the directory that `run`
and `spawn` start in when no `workingDirectory` is given. The base directory does
not change for the lifetime of the session. Changing the directory inside a
command, for example with `cd`, only affects that command. Absolute paths are
used as is.

This lets tools combine methods. For example, a path that a `grep` command run
with `run` prints can be passed to `readTextFile`.

## Properties

- `description` (`string`): Description of the experimental sandbox environment. Include this in your prompt or instructions when the model needs to know details such as the root directory, exposed ports, public hostname, or other environment constraints. The AI SDK does not add it to the prompt automatically.
- `run` (`(options: { command: string; workingDirectory?: string; env?: Record<string, string>; abortSignal?: AbortSignal }) => PromiseLike<{ exitCode: number; stdout: string; stderr: string }>`): Executes a command in the experimental sandbox and resolves with the command exit code, standard output, and standard error.
  - `options`
    - `command` (`string`): The command to execute in the experimental sandbox.
    - `workingDirectory` (`string | undefined`): Optional working directory to execute the command in. If omitted, the experimental sandbox implementation uses its default working directory.
    - `env` (`Record<string, string> | undefined`): Optional environment variables to set for the command. Merged with the experimental sandbox default environment, with these values taking precedence. Passing secrets here instead of inlining them into the command avoids leaking them in logs. Implementations that cannot set environment variables reject this option.
    - `abortSignal` (`AbortSignal | undefined`): Optional abort signal that the experimental sandbox implementation can use to cancel the command.
- `spawn` (`(options: { command: string; workingDirectory?: string; env?: Record<string, string>; abortSignal?: AbortSignal; stdin?: boolean }) => PromiseLike<Experimental_SandboxProcess>`): Starts a long-running process and returns immediately with a handle that streams standard output and standard error, can be waited on, and can be killed. With \`stdin: true\`, standard input stays open and the handle also has a writable \`stdin\` stream; implementations that do not support this reject before starting the command.
- `readFile / readBinaryFile / readTextFile` (`(options: { path: string; abortSignal?: AbortSignal }) => PromiseLike<ReadableStream<Uint8Array> | Uint8Array | string | null>`): Reads one file as a stream of bytes, raw bytes, or decoded text. Resolves to \`null\` when the file does not exist. \`readTextFile\` accepts an \`encoding\` (default \`utf-8\`) and 1-based inclusive \`startLine\` and \`endLine\`.
- `writeFile / writeBinaryFile / writeTextFile` (`(options: { path: string; content: ReadableStream<Uint8Array> | Uint8Array | string; abortSignal?: AbortSignal }) => PromiseLike<void>`): Writes one file from a stream of bytes, raw bytes, or a string. Creates parent directories and overwrites an existing file. Rejects when the path is a directory.
- `stat` (`(options: { path: string; abortSignal?: AbortSignal }) => PromiseLike<Experimental_SandboxFileStat | null>`): Returns the type (\`file\`, \`directory\`, or \`other\`) and size in bytes of a path. The size of a directory is implementation-defined. Symbolic links are followed. Resolves to \`null\` when the path does not exist.
- `listDirectory` (`(options: { path: string; abortSignal?: AbortSignal }) => PromiseLike<Array<Experimental_SandboxDirectoryEntry> | null>`): Lists the entries of one directory, without descending into subdirectories. Each entry has a \`name\` and a \`type\` (\`file\`, \`directory\`, \`symlink\`, or \`other\`); symbolic links are not followed. The order is unspecified. Resolves to \`null\` when the directory does not exist and rejects when the path is not a directory.
- `deleteFile` (`(options: { path: string; abortSignal?: AbortSignal }) => PromiseLike<boolean>`): Deletes one file. A symbolic link is deleted itself, not its target. Resolves to \`true\` when the file was deleted and \`false\` when it does not exist. Rejects when the path is a directory.

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