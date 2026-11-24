---
title: LangChain
product: vercel
url: /docs/sandbox/ecosystem/langchain
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/langchain"
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
summary: Give a LangChain agent a tool that executes model-generated code in an isolated Vercel Sandbox, with models served by AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/ecosystem/langchain.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f28222840d6091c7cfa4d2d4bb177c04468662b0ce1f3b07a3af75c1b7524b46"
---

# LangChain

This guide shows how to give a [LangChain](https://js.langchain.com) agent a
tool that executes code in [Vercel Sandbox](/docs/sandbox), so model-generated
code runs in an isolated microVM instead of on your host. Model requests route
through [AI Gateway](/docs/ai-gateway).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add Python code execution to a TypeScript AI agent with Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your TypeScript AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Pytho
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [Anthropic SDK](https://vercel.com/docs/sandbox/ecosystem/anthropic-sdk) — Use Anthropic tool use with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
- [Security for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/security) — What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, an

Full cross-link map for this page: [/docs/sandbox/ecosystem/langchain.graph.md](/docs/sandbox/ecosystem/langchain.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You need a [Vercel account](https://vercel.com/signup), [Vercel
> CLI](/docs/cli), Node.js 22 or later or Python 3.11 or later, and an [AI Gateway API
> key](/docs/ai-gateway/authentication-and-byok/authentication).

## Getting started

- ### Create a new project
  Create a new directory for your project and initialize it:

  **terminal**
  ```bash filename="terminal" language=ts
  mkdir langchain-sandbox
  cd langchain-sandbox
  npm init -y
  ```
  **terminal**
  ```bash filename="terminal" language=py
  mkdir langchain-sandbox
  cd langchain-sandbox
  uv init
  ```

- ### Install dependencies
  Install LangChain, the Anthropic and OpenAI provider packages, and the
  Sandbox SDK:

  **terminal**
  ```bash filename="terminal" language=ts package-manager="npm"
  npm install langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="yarn"
  yarn add langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="pnpm"
  pnpm add langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="bun"
  bun add langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
  ```
  **terminal**
  ```bash filename="terminal" language=py
  uv add langchain langchain-anthropic langchain-openai vercel-sandbox
  ```

- ### Configure authentication
  Link the project to Vercel and pull your development environment. This creates
  a `.env.local` file with a `VERCEL_OIDC_TOKEN`, which authenticates the Sandbox
  SDK:
  ```bash filename="terminal"
  vercel link
  vercel env pull
  ```
  Create an AI Gateway API key, then add it to `.env.local`:
  ```bash filename=".env.local"
  AI_GATEWAY_API_KEY=your_ai_gateway_api_key
  ```
  > **💡 Note:** For other Sandbox authentication methods, see
  > [Authentication](/docs/sandbox/sdk-reference#authentication) in the SDK reference.

- ### Create your agent
  Create your agent file with the following code:

  **index.ts**
  ```ts filename="index.ts"
  import * as z from 'zod';
  import { createAgent, tool } from 'langchain';
  import { ChatAnthropic } from '@langchain/anthropic';
  import { Sandbox } from '@vercel/sandbox';

  const sandbox = await Sandbox.create({ timeout: 300_000 });

  try {
    const runCode = tool(
      async ({ code }) => {
        const result = await sandbox.runCommand('node', ['-e', code]);
        return result.exitCode === 0
          ? await result.stdout()
          : `Command failed: ${await result.stderr()}`;
      },
      {
        name: 'run_code',
        description:
          'Run Node.js code in an isolated Vercel Sandbox and return its output.',
        schema: z.object({
          code: z.string().describe('Node.js code to execute'),
        }),
      },
    );

    const model = new ChatAnthropic({
      model: 'anthropic/claude-opus-5',
      apiKey: process.env.AI_GATEWAY_API_KEY,
      anthropicApiUrl: 'https://ai-gateway.vercel.sh',
    });

    const agent = createAgent({ model, tools: [runCode] });

    const result = await agent.invoke({
      messages: [
        {
          role: 'user',
          content:
            "Compute the SHA-256 hex digest of the exact string 'vercel sandbox' with Node.js, then report the digest.",
        },
      ],
    });

    console.log(result.messages.at(-1)?.content);
  } finally {
    await sandbox.stop();
  }
  ```
  **main.py**
  ```py filename="main.py"
  import asyncio
  import os
  from datetime import timedelta

  from langchain.agents import create_agent
  from langchain.tools import tool
  from langchain_anthropic import ChatAnthropic
  from vercel import sandbox


  async def main() -> None:
      box = await sandbox.create_sandbox(execution_time_limit=timedelta(minutes=5))

      try:

          @tool
          async def run_code(code: str) -> str:
              """Run Python code in an isolated Vercel Sandbox and return its output."""
              result = await box.run_command(
                  "python", ["-c", code], capture_output=True
              )
              if result.returncode == 0:
                  return result.stdout.decode()
              return f"Command failed: {result.stderr.decode()}"

          model = ChatAnthropic(
              model="anthropic/claude-opus-5",
              api_key=os.environ["AI_GATEWAY_API_KEY"],
              base_url="https://ai-gateway.vercel.sh",
          )

          agent = create_agent(model, tools=[run_code])

          result = await agent.ainvoke(
              {
                  "messages": [
                      {
                          "role": "user",
                          "content": (
                              "Compute the SHA-256 hex digest of the exact string "
                              "'vercel sandbox' with Python, then report the digest."
                          ),
                      },
                  ],
              }
          )

          print(result["messages"][-1].content)
      finally:
          await box.stop()


  asyncio.run(main())
  ```
  The sandbox's timeout bounds each session to five minutes. Model calls run outside the VM, and a later command can resume a new session after the previous one times out. The session timeout doesn't bound the overall agent loop.

  Use an application deadline and cancellation strategy to bound the full loop, including model requests and tool submissions. A time limit on a command bounds that command separately. The `finally` block stops the current session when the loop finishes or throws; coordinate cancellation with in-flight tool calls before cleanup so they don't resume another session.

  The following code:
  - Creates a sandbox that the agent reuses across tool calls
  - Defines a `run_code` tool that executes code in the sandbox
  - Points the Anthropic chat model at AI Gateway, authenticated with your
    Vercel credentials
  - Passes the tool to the agent, which runs the tool-calling loop
  The example uses an Anthropic model. To use an OpenAI model instead, create
  an OpenAI chat model and point it at the same gateway:

  **index.ts**
  ```ts filename="index.ts"
  import { ChatOpenAI } from '@langchain/openai';

  const model = new ChatOpenAI({
    model: 'openai/gpt-5.6-sol',
    apiKey: process.env.AI_GATEWAY_API_KEY ?? process.env.VERCEL_OIDC_TOKEN,
    configuration: { baseURL: 'https://ai-gateway.vercel.sh/v1' },
  });
  ```
  **main.py**
  ```py filename="main.py"
  import os

  from langchain_openai import ChatOpenAI

  model = ChatOpenAI(
      model="openai/gpt-5.6-sol",
      api_key=os.environ.get("AI_GATEWAY_API_KEY") or os.environ["VERCEL_OIDC_TOKEN"],
      base_url="https://ai-gateway.vercel.sh/v1",
  )
  ```
  Any [AI Gateway model](/docs/ai-gateway/models-and-providers) works the same
  way.

- ### Run the agent
  Run your agent with the environment variables from `.env.local`:

  **terminal**
  ```bash filename="terminal" language=ts
  npx tsx --env-file=.env.local index.ts
  ```
  **terminal**
  ```bash filename="terminal" language=py
  uv run --env-file .env.local main.py
  ```
  The agent writes the code, executes it in the sandbox, and reports the
  digest.

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
