---
title: Anthropic SDK
product: vercel
url: /docs/sandbox/ecosystem/anthropic-sdk
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/anthropic-sdk"
last_updated: 2026-08-07
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/ai-gateway
  - /docs/cli
  - /docs/ai-gateway/authentication-and-byok/authentication
  - /docs/sandbox/sdk-reference
summary: Use Anthropic tool use with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/anthropic-sdk.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "bcc554e1c6d76ecb5e4ebe4b4c4a4cefa742bf9da032314223dfb3fea6c71a93"
---

# Anthropic SDK

The [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript)
supports tool use through the Messages API. This guide shows how to define a
tool that executes code in [Vercel Sandbox](/docs/sandbox), so model-generated
code runs in an isolated microVM instead of on your host. Model requests
route through [AI Gateway](/docs/ai-gateway), and one set of Vercel
credentials covers both the model and the sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Run Python code securely with AI SDK and Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Python 3.13 insi
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Run untrusted code with Vercel Sandbox](https://vercel.com/changelog/run-untrusted-code-with-vercel-sandbox)
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [OpenAI SDK](https://vercel.com/docs/sandbox/ecosystem/openai-sdk) — Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.

Full cross-link map for this page: [/docs/sandbox/ecosystem/anthropic-sdk.graph.md](/docs/sandbox/ecosystem/anthropic-sdk.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You need a [Vercel account](https://vercel.com/signup), [Vercel
> CLI](/docs/cli), and Node.js 22 or later.

## Getting started

- ### Create a new project
  Create a new directory for your project and initialize it:
  ```bash filename="terminal"
  mkdir anthropic-sandbox
  cd anthropic-sandbox
  npm init -y
  ```

- ### Install dependencies
  Install the Anthropic SDK and the Sandbox SDK:

  **pnpm**
  ```bash
  pnpm i @anthropic-ai/sdk @vercel/sandbox
  ```
  **yarn**
  ```bash
  yarn add @anthropic-ai/sdk @vercel/sandbox
  ```
  **npm**
  ```bash
  npm i @anthropic-ai/sdk @vercel/sandbox
  ```
  **bun**
  ```bash
  bun add @anthropic-ai/sdk @vercel/sandbox
  ```

- ### Configure authentication
  Link the project to Vercel and pull your development environment. This
  creates a `.env.local` file with a `VERCEL_OIDC_TOKEN`, which authenticates
  both the Sandbox SDK and AI Gateway:
  ```bash filename="terminal"
  vercel link
  vercel env pull
  ```
  > **💡 Note:** You can also use an [AI Gateway API
  > key](/docs/ai-gateway/authentication-and-byok/authentication) by setting
  > `AI_GATEWAY_API_KEY`.
  > For other Sandbox authentication methods, see
  > [Authentication](/docs/sandbox/sdk-reference#authentication) in the SDK reference.

- ### Create your application
  Create a new file called `index.ts` with the following code:
  ```typescript filename="index.ts"
  import Anthropic from '@anthropic-ai/sdk';
  import { Sandbox } from '@vercel/sandbox';

  const gatewayApiKey = process.env.AI_GATEWAY_API_KEY;
  const anthropic = new Anthropic({
    ...(gatewayApiKey
      ? { apiKey: gatewayApiKey }
      : { authToken: process.env.VERCEL_OIDC_TOKEN }),
    baseURL: 'https://ai-gateway.vercel.sh',
  });

  const sandbox = await Sandbox.create({ timeout: 300_000 });

  try {
    const tools: Anthropic.Tool[] = [
      {
        name: 'run_code',
        description:
          'Run Node.js code in an isolated Vercel Sandbox and return its output.',
        input_schema: {
          type: 'object',
          properties: {
            code: { type: 'string', description: 'Node.js code to execute' },
          },
          required: ['code'],
        },
      },
    ];

    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user',
        content:
          "Compute the SHA-256 hex digest of the exact string 'vercel sandbox' with Node.js, then report the digest.",
      },
    ];

    let response = await anthropic.messages.create({
      model: 'anthropic/claude-opus-5',
      max_tokens: 16000,
      tools,
      messages,
    });

    while (response.stop_reason === 'tool_use') {
      messages.push({ role: 'assistant', content: response.content });
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== 'tool_use') continue;
        const { code } = block.input as { code: string };
        const result = await sandbox.runCommand('node', ['-e', code]);
        const output =
          result.exitCode === 0
            ? await result.stdout()
            : `Command failed: ${await result.stderr()}`;
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: output,
        });
      }
      messages.push({ role: 'user', content: toolResults });
      response = await anthropic.messages.create({
        model: 'anthropic/claude-opus-5',
        max_tokens: 16000,
        tools,
        messages,
      });
    }

    for (const block of response.content) {
      if (block.type === 'text') console.log(block.text);
    }
  } finally {
    await sandbox.stop();
  }
  ```
  The `timeout` value bounds each sandbox session to five minutes. Model calls run outside the VM, and a later `sandbox.runCommand()` can resume a new session after the previous one times out. The session timeout doesn't bound the overall agent loop.

  Use an application deadline and cancellation strategy to bound the full loop, including model requests and tool submissions. A command's `timeoutMs` (or Python `kill_after`) bounds that command separately. The `finally` block stops the current session when the loop finishes or throws; coordinate cancellation with in-flight tool calls before cleanup so they don't resume another session.

  The following code:
  - Points the Anthropic SDK at AI Gateway, authenticated with your Vercel
    credentials
  - Creates a sandbox that is reused across tool calls
  - Declares a `run_code` tool the model can call
  - Executes each tool call with
    [`sandbox.runCommand()`](/docs/sandbox/sdk-reference#sandboxruncommand)
    and returns the output as a `tool_result` block
  - Loops while `stop_reason` is `tool_use`, then prints the final answer

- ### Run the application
  Run your application with the environment variables from `.env.local`:
  ```bash filename="terminal"
  npx tsx --env-file=.env.local index.ts
  ```
  Claude writes Node.js code, the sandbox executes it, and the final response
  reports the digest.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
