---
source: "https://ai-sdk.dev/docs/reference/ai-sdk-core/agent.md"
fetched_at: "2026-06-29T05:45:09.899Z"
sha256: "beb5138b7f180daf7d8ab0fb418235fafd642a4a37223d968dd84db62619537d"
---

# `Agent` (interface)

The `Agent` interface defines a contract for agents that can generate or stream AI-generated responses in response to prompts. Agents may encapsulate advanced logic such as tool usage, multi-step workflows, or prompt handling, enabling both simple and autonomous AI agents.

Implementations of the `Agent` interface—such as `ToolLoopAgent`—fulfill the same contract and integrate seamlessly with all SDK APIs and utilities that expect an agent. This design allows users to supply custom agent classes or wrappers for third-party chains, while maximizing compatibility with AI SDK features.

## Interface Definition

```ts
import {
  ModelMessage,
  Experimental_SandboxSession,
} from '@ai-sdk/provider-utils';
import { ToolSet } from '../generate-text/tool-set';
import { Output } from '../generate-text/output';
import { GenerateTextResult } from '../generate-text/generate-text-result';
import { StreamTextResult } from '../generate-text/stream-text-result';

export type AgentCallParameters<CALL_OPTIONS, TOOLS extends ToolSet = {}> = ([
  CALL_OPTIONS,
] extends [never]
  ? { options?: never }
  : { options: CALL_OPTIONS }) &
  (
    | {
        /**
         * A prompt. It can be either a text prompt or a list of messages.
         *
         * You can either use `prompt` or `messages` but not both.
         */
        prompt: string | Array<ModelMessage>;

        /**
         * A list of messages.
         *
         * You can either use `prompt` or `messages` but not both.
         */
        messages?: never;
      }
    | {
        /**
         * A list of messages.
         *
         * You can either use `prompt` or `messages` but not both.
         */
        messages: Array<ModelMessage>;

        /**
         * A prompt. It can be either a text prompt or a list of messages.
         *
         * You can either use `prompt` or `messages` but not both.
         */
        prompt?: never;
      }
  ) & {
    /**
     * Abort signal.
     */
    abortSignal?: AbortSignal;
    /**
     * Timeout in milliseconds. Can be specified as a number or as an object with a totalMs property.
     * The call will be aborted if it takes longer than the specified timeout.
     * Can be used alongside abortSignal.
     */
    timeout?: number | { totalMs?: number };
    /**
     * Experimental sandbox environment that is passed through to tool execution.
     */
    experimental_sandbox?: Experimental_SandboxSession;
    /**
     * Callback that is called when the agent operation begins, before any LLM calls.
     */
    onStart?: GenerateTextOnStartCallback<TOOLS>;
    /**
     * Callback that is called when a step (LLM call) begins, before the provider is called.
     */
    onStepStart?: GenerateTextOnStepStartCallback<TOOLS>;
    /**
     * Callback that is called before each tool execution begins.
     */
    onToolExecutionStart?: OnToolExecutionStartCallback<TOOLS>;
    /**
     * Callback that is called after each tool execution completes.
     */
    onToolExecutionEnd?: OnToolExecutionEndCallback<TOOLS>;
    /**
     * Callback that is called when each step (LLM call) ends, including intermediate steps.
     */
    onStepEnd?: GenerateTextOnStepEndCallback<TOOLS>;
    /**
     * Callback that is called when each step (LLM call) ends, including intermediate steps.
     *
     * @deprecated Use `onStepEnd` instead.
     */
    onStepFinish?: GenerateTextOnStepFinishCallback<TOOLS>;
    /**
     * Callback that is called when all steps are finished and the response is complete.
     */
    onEnd?: GenerateTextOnEndCallback<TOOLS>;
    /**
     * Callback that is called when all steps are finished and the response is complete.
     *
     * @deprecated Use `onEnd` instead.
     */
    onFinish?: GenerateTextOnEndCallback<TOOLS>;
  };

/**
 * An Agent receives a prompt (text or messages) and generates or streams an output
 * that consists of steps, tool calls, data parts, etc.
 *
 * You can implement your own Agent by implementing the `Agent` interface,
 * or use the `ToolLoopAgent` class.
 */
export interface Agent<
  CALL_OPTIONS = never,
  TOOLS extends ToolSet = {},
  OUTPUT extends Output = never,
> {
  /**
   * The specification version of the agent interface. This will enable
   * us to evolve the agent interface and retain backwards compatibility.
   */
  readonly version: 'agent-v1';

  /**
   * The id of the agent.
   */
  readonly id: string | undefined;

  /**
   * The tools that the agent can use.
   */
  readonly tools: TOOLS;

  /**
   * Generates an output from the agent (non-streaming).
   */
  generate(
    options: AgentCallParameters<CALL_OPTIONS, TOOLS>,
  ): PromiseLike<GenerateTextResult<TOOLS, OUTPUT>>;

  /**
   * Streams an output from the agent (streaming).
   */
  stream(
    options: AgentStreamParameters<CALL_OPTIONS, TOOLS>,
  ): PromiseLike<StreamTextResult<TOOLS, OUTPUT>>;
}
```

## Core Properties & Methods

| Name         | Type                                             | Description                                                         |
| ------------ | ------------------------------------------------ | ------------------------------------------------------------------- |
| `version`    | `'agent-v1'`                                     | Interface version for compatibility.                                |
| `id`         | `string \| undefined`                            | Optional agent identifier.                                          |
| `tools`      | `ToolSet`                                        | The set of tools available to this agent.                           |
| `generate()` | `PromiseLike<GenerateTextResult<TOOLS, OUTPUT>>` | Generates full, non-streaming output for a text prompt or messages. |
| `stream()`   | `PromiseLike<StreamTextResult<TOOLS, OUTPUT>>`   | Streams output (chunks or steps) for a text prompt or messages.     |

## Generic Parameters

| Parameter      | Default | Description                                                                |
| -------------- | ------- | -------------------------------------------------------------------------- |
| `CALL_OPTIONS` | `never` | Optional type for additional call options that can be passed to the agent. |
| `TOOLS`        | `{}`    | The type of the tool set available to this agent.                          |
| `OUTPUT`       | `never` | The type of additional output data that the agent can produce.             |

## Method Parameters

Both `generate()` and `stream()` accept an `AgentCallParameters<CALL_OPTIONS, TOOLS>` object with:

- `prompt` (optional): A string prompt or array of `ModelMessage` objects
- `messages` (optional): An array of `ModelMessage` objects (mutually exclusive with `prompt`)
- `options` (optional): Additional call options when `CALL_OPTIONS` is not `never`
- `abortSignal` (optional): An `AbortSignal` to cancel the operation
- `timeout` (optional): A timeout in milliseconds. Can be specified as a number or as an object with a `totalMs` property. The call will be aborted if it takes longer than the specified timeout. Can be used alongside `abortSignal`.
- `experimental_sandbox` (optional): An experimental sandbox environment forwarded to tool execution.
- `onStart` (optional): Callback invoked when the agent operation begins, before any LLM calls.
- `onStepStart` (optional): Callback invoked when a step (LLM call) begins, before the provider is called.
- `onToolExecutionStart` (optional): Callback invoked right before a tool's execute function runs.
- `onToolExecutionEnd` (optional): Callback invoked right after a tool's execute function completes or errors.
- `onStepEnd` (optional): A callback invoked after each agent step (LLM/tool call) completes. Useful for tracking token usage, per-step performance, or logging.
- `onStepFinish` (optional): Deprecated alias for `onStepEnd`.
- `onEnd` (optional): A callback invoked when all steps are finished and the response is complete.
- `onFinish` (optional): Deprecated alias for `onEnd`.

## Example: Custom Agent Implementation

Here's how you might implement your own Agent:

```ts
import { Agent, GenerateTextResult, StreamTextResult } from 'ai';
import type { ModelMessage } from '@ai-sdk/provider-utils';

class MyEchoAgent implements Agent {
  version = 'agent-v1' as const;
  id = 'echo';
  tools = {};

  async generate({ prompt, messages, abortSignal }) {
    const text = prompt ?? JSON.stringify(messages);
    return { text, steps: [] };
  }

  async stream({ prompt, messages, abortSignal }) {
    const text = prompt ?? JSON.stringify(messages);
    return {
      textStream: (async function* () {
        yield text;
      })(),
    };
  }
}
```

## Usage: Interacting with Agents

All SDK utilities that accept an agent—including [`createAgentUIStream`](/docs/reference/ai-sdk-core/create-agent-ui-stream), [`createAgentUIStreamResponse`](/docs/reference/ai-sdk-core/create-agent-ui-stream-response), and [`pipeAgentUIStreamToResponse`](/docs/reference/ai-sdk-core/pipe-agent-ui-stream-to-response)—expect an object adhering to the `Agent` interface.

You can use the official [`ToolLoopAgent`](/docs/reference/ai-sdk-core/tool-loop-agent) (recommended for multi-step AI workflows with tool use), or supply your own implementation:

```ts
import { ToolLoopAgent, createAgentUIStream } from "ai";

const agent = new ToolLoopAgent({ ... });

const stream = await createAgentUIStream({
  agent,
  messages: [{ role: "user", content: "What is the weather in NYC?" }]
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

## See Also

- [`ToolLoopAgent`](/docs/reference/ai-sdk-core/tool-loop-agent) &mdash; Official multi-step agent implementation
- [`createAgentUIStream`](/docs/reference/ai-sdk-core/create-agent-ui-stream)
- [`GenerateTextResult`](/docs/reference/ai-sdk-core/generate-text)
- [`StreamTextResult`](/docs/reference/ai-sdk-core/stream-text)

## Notes

- Agents should define their `tools` property, even if empty (`{}`), for compatibility with SDK utilities.
- The interface accepts both plain prompts and message arrays as input, but only one at a time.
- The `CALL_OPTIONS` generic parameter allows agents to accept additional call-specific options when needed.
- The `abortSignal` parameter enables cancellation of agent operations.
- This design is extensible for both complex autonomous agents and simple LLM wrappers.


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
