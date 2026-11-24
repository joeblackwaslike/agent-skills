---
title: OpenAI SDK
product: vercel
url: /docs/sandbox/ecosystem/openai-sdk
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/openai-sdk"
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
summary: Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/ecosystem/openai-sdk.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "acdf24fe845c7696a6fdf6738ae9a41698e7fb92f82f86d4ecbde97f9ee6fd65"
---

# OpenAI SDK

The [OpenAI SDK](https://github.com/openai/openai-node) supports function
calling through the Responses API. This guide shows how to define a function
that executes code in [Vercel Sandbox](/docs/sandbox), so model-generated
code runs in an isolated microVM instead of on your host. Model requests
route through [AI Gateway](/docs/ai-gateway), and one set of Vercel
credentials covers both the model and the sandbox.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running OpenCode securely with the Vercel Sandbox](https://vercel.com/kb/guide/running-opencode-securely-with-the-vercel-sandbox) — Run OpenCode in an isolated Vercel Sandbox MicroVM with controlled egress, using the SDK to restrict network access so t
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [Add Python code execution to a TypeScript AI agent with Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your TypeScript AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Pytho
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Anthropic SDK](https://vercel.com/docs/sandbox/ecosystem/anthropic-sdk) — Use Anthropic tool use with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
- [Vercel Sandbox SDK](https://vercel.com/docs/sandbox/sdk) — Use the Vercel Sandbox SDK for JavaScript, TypeScript, and Python, or the Sandbox CLI, to create and manage isolated Lin
- [OpenAI Agents API](https://vercel.com/docs/sandbox/ecosystem/openai-agents-api) — Connect OpenAI Agents API sessions to Vercel Sandbox for isolated code execution and persistent workspace files.

Full cross-link map for this page: [/docs/sandbox/ecosystem/openai-sdk.graph.md](/docs/sandbox/ecosystem/openai-sdk.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You need a [Vercel account](https://vercel.com/signup), [Vercel
> CLI](/docs/cli), and Node.js 22 or later or Python 3.11 or later.

## Getting started

- ### Create a new project
  Create a new directory for your project and initialize it:

  **terminal**
  ```bash filename="terminal" language=ts
  mkdir openai-sandbox
  cd openai-sandbox
  npm init -y
  ```
  **terminal**
  ```bash filename="terminal" language=py
  mkdir openai-sandbox
  cd openai-sandbox
  uv init
  ```

- ### Install dependencies
  Install the OpenAI SDK and the Sandbox SDK:

  **terminal**
  ```bash filename="terminal" language=ts package-manager="npm"
  npm install openai @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="yarn"
  yarn add openai @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="pnpm"
  pnpm add openai @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=ts package-manager="bun"
  bun add openai @vercel/sandbox
  ```
  **terminal**
  ```bash filename="terminal" language=py
  uv add openai vercel-sandbox
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
  import OpenAI from 'openai';
  import { Sandbox } from '@vercel/sandbox';

  const openai = new OpenAI({
    apiKey: process.env.AI_GATEWAY_API_KEY ?? process.env.VERCEL_OIDC_TOKEN,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const sandbox = await Sandbox.create({ timeout: 300_000 });

  try {
    const tools = [
      {
        type: 'function' as const,
        name: 'run_code',
        description:
          'Run Node.js code in an isolated Vercel Sandbox and return its output.',
        parameters: {
          type: 'object',
          properties: {
            code: { type: 'string', description: 'Node.js code to execute' },
          },
          required: ['code'],
          additionalProperties: false,
        },
        strict: true,
      },
    ];

    const input: OpenAI.Responses.ResponseInput = [
      {
        role: 'user',
        content:
          "Compute the SHA-256 hex digest of the exact string 'vercel sandbox' with Node.js, then report the digest.",
      },
    ];

    let response = await openai.responses.create({
      model: 'openai/gpt-5.6-sol',
      tools,
      input,
    });

    while (response.output.some((item) => item.type === 'function_call')) {
      // Keep the model's output, including reasoning items, for the next call.
      input.push(...(response.output as OpenAI.Responses.ResponseInputItem[]));
      for (const item of response.output) {
        if (item.type !== 'function_call') continue;
        const { code } = JSON.parse(item.arguments);
        const result = await sandbox.runCommand('node', ['-e', code]);
        const output =
          result.exitCode === 0
            ? await result.stdout()
            : `Command failed: ${await result.stderr()}`;
        input.push({
          type: 'function_call_output',
          call_id: item.call_id,
          output,
        });
      }
      response = await openai.responses.create({
        model: 'openai/gpt-5.6-sol',
        tools,
        input,
      });
    }

    console.log(response.output_text);
  } finally {
    await sandbox.stop();
  }
  ```
  **main.py**
  ```py filename="main.py"
  import asyncio
  import json
  import os
  from datetime import timedelta
  from typing import Any

  from openai import AsyncOpenAI
  from openai.types.responses import FunctionToolParam
  from vercel import sandbox

  MODEL = "openai/gpt-5.6-sol"

  client = AsyncOpenAI(
      api_key=os.environ.get("AI_GATEWAY_API_KEY") or os.environ["VERCEL_OIDC_TOKEN"],
      base_url="https://ai-gateway.vercel.sh/v1",
  )

  tools: list[FunctionToolParam] = [
      {
          "type": "function",
          "name": "run_code",
          "description": (
              "Run Python code in an isolated Vercel Sandbox and return its output."
          ),
          "parameters": {
              "type": "object",
              "properties": {
                  "code": {"type": "string", "description": "Python code to execute"},
              },
              "required": ["code"],
              "additionalProperties": False,
          },
          "strict": True,
      },
  ]


  async def main() -> None:
      box = await sandbox.create_sandbox(execution_time_limit=timedelta(minutes=5))

      try:
          conversation: list[Any] = [
              {
                  "role": "user",
                  "content": (
                      "Compute the SHA-256 hex digest of the exact string "
                      "'vercel sandbox' with Python, then report the digest."
                  ),
              },
          ]

          response = await client.responses.create(
              model=MODEL,
              tools=tools,
              input=conversation,
          )

          while any(item.type == "function_call" for item in response.output):
              conversation += response.output
              for item in response.output:
                  if item.type != "function_call":
                      continue
                  code = json.loads(item.arguments)["code"]
                  result = await box.run_command(
                      "python", ["-c", code], capture_output=True
                  )
                  output = (
                      result.stdout.decode()
                      if result.returncode == 0
                      else f"Command failed: {result.stderr.decode()}"
                  )
                  conversation.append(
                      {
                          "type": "function_call_output",
                          "call_id": item.call_id,
                          "output": output,
                      }
                  )
              response = await client.responses.create(
                  model=MODEL,
                  tools=tools,
                  input=conversation,
              )

          print(response.output_text)
      finally:
          await box.stop()


  asyncio.run(main())
  ```
  The sandbox's timeout gives it up to five minutes to finish the function
  loop. The `finally` block stops it sooner when the loop finishes or throws.

  The following code:
  - Points the OpenAI SDK at AI Gateway, authenticated with your Vercel
    credentials
  - Creates a sandbox that is reused across function calls
  - Declares a `run_code` function the model can call
  - Executes each function call in the sandbox and returns the output as a
    `function_call_output` item
  - Sends the earlier turns again in `input` on each call, including the model's
    output and reasoning items, because AI Gateway doesn't accept its response
    IDs as `previous_response_id` over HTTP
  - Loops until the model responds without calling a function

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
  The model writes the code, the sandbox executes it, and the final
  response reports the digest.

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
