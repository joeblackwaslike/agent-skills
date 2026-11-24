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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/ecosystem/anthropic-sdk.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5fa915544eca0dd9d3c5ff3d52238b86cf88b3e9b65e6d1baaba4de38e87de6f"
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
- [Add Python code execution to a TypeScript AI agent with Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your TypeScript AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Pytho
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [OpenAI SDK](https://vercel.com/docs/sandbox/ecosystem/openai-sdk) — Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
- [LangChain](https://vercel.com/docs/sandbox/ecosystem/langchain) — Give a LangChain agent a tool that executes model-generated code in an isolated Vercel Sandbox, with models served by AI
- [Understanding Sandboxes](https://vercel.com/docs/sandbox/concepts) — Learn how Vercel Sandboxes provide on-demand, isolated compute environments for running untrusted code, testing applicat

Full cross-link map for this page: [/docs/sandbox/ecosystem/anthropic-sdk.graph.md](/docs/sandbox/ecosystem/anthropic-sdk.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You need a [Vercel account](https://vercel.com/signup), [Vercel
> CLI](/docs/cli), and Node.js 22 or later or Python 3.11 or later.

## Getting started

- ### Create a new project
  Create a new directory for your project and initialize it:

  **terminal**
  ```bash filename="terminal" language=ts
  mkdir anthropic-sandbox
  cd anthropic-sandbox
  npm init -y
  ```
  **terminal**
  ```bash filename="terminal" language=py
  mkdir anthropic-sandbox
  cd anthropic-sandbox
  uv init
  ```

- ### Install dependencies
  Install the Anthropic SDK and the Sandbox SDK:

  **terminal**
  ```bash filename="terminal" language=ts package-manager="npm"
  npm install @anthropic-ai/sdk @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="yarn"
  yarn add @anthropic-ai/sdk @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="pnpm"
  pnpm add @anthropic-ai/sdk @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="bun"
  bun add @anthropic-ai/sdk @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=py
  uv add anthropic vercel-sandbox
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
  Create your application file with the following code:

  **index.ts**
  ```ts filename="index.ts"
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
  **main.py**
  ```py filename="main.py"
  import asyncio
  import os
  from datetime import timedelta
  from typing import cast

  from anthropic import AsyncAnthropic
  from anthropic.types import MessageParam, ToolParam, ToolResultBlockParam
  from vercel import sandbox

  MODEL = "anthropic/claude-opus-5"

  gateway_api_key = os.environ.get("AI_GATEWAY_API_KEY")
  client = AsyncAnthropic(
      api_key=gateway_api_key,
      auth_token=None if gateway_api_key else os.environ["VERCEL_OIDC_TOKEN"],
      base_url="https://ai-gateway.vercel.sh",
  )

  tools: list[ToolParam] = [
      {
          "name": "run_code",
          "description": (
              "Run Python code in an isolated Vercel Sandbox and return its output."
          ),
          "input_schema": {
              "type": "object",
              "properties": {
                  "code": {"type": "string", "description": "Python code to execute"},
              },
              "required": ["code"],
          },
      },
  ]


  async def main() -> None:
      box = await sandbox.create_sandbox(execution_time_limit=timedelta(minutes=5))

      try:
          messages: list[MessageParam] = [
              {
                  "role": "user",
                  "content": (
                      "Compute the SHA-256 hex digest of the exact string "
                      "'vercel sandbox' with Python, then report the digest."
                  ),
              },
          ]

          response = await client.messages.create(
              model=MODEL,
              max_tokens=16000,
              tools=tools,
              messages=messages,
          )

          while response.stop_reason == "tool_use":
              messages.append({"role": "assistant", "content": response.content})
              tool_results: list[ToolResultBlockParam] = []
              for block in response.content:
                  if block.type != "tool_use":
                      continue
                  code = cast(dict[str, str], block.input)["code"]
                  result = await box.run_command(
                      "python", ["-c", code], capture_output=True
                  )
                  output = (
                      result.stdout.decode()
                      if result.returncode == 0
                      else f"Command failed: {result.stderr.decode()}"
                  )
                  tool_results.append(
                      {
                          "type": "tool_result",
                          "tool_use_id": block.id,
                          "content": output,
                      }
                  )
              messages.append({"role": "user", "content": tool_results})
              response = await client.messages.create(
                  model=MODEL,
                  max_tokens=16000,
                  tools=tools,
                  messages=messages,
              )

          for block in response.content:
              if block.type == "text":
                  print(block.text)
      finally:
          await box.stop()


  asyncio.run(main())
  ```
  The sandbox's timeout bounds each session to five minutes. Model calls run outside the VM, and a later command can resume a new session after the previous one times out. The session timeout doesn't bound the overall agent loop.

  Use an application deadline and cancellation strategy to bound the full loop, including model requests and tool submissions. A time limit on a command bounds that command separately. The `finally` block stops the current session when the loop finishes or throws; coordinate cancellation with in-flight tool calls before cleanup so they don't resume another session.

  The following code:
  - Points the Anthropic SDK at AI Gateway, authenticated with your Vercel
    credentials
  - Creates a sandbox that is reused across tool calls
  - Declares a `run_code` tool the model can call
  - Executes each tool call in the sandbox and returns the output as a
    `tool_result` block
  - Loops while `stop_reason` is `tool_use`, then prints the final answer

- ### Run the application
  Run your application with the environment variables from `.env.local`:

  **terminal**
  ```bash filename="terminal" language=ts
  npx tsx --env-file=.env.local index.ts
  ```
  **terminal**
  ```bash filename="terminal" language=py
  uv run --env-file .env.local main.py
  ```
  Claude writes the code, the sandbox executes it, and the final response
  reports the digest.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
