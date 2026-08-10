---
title: LangChain
product: vercel
url: /docs/sandbox/ecosystem/langchain
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/langchain"
last_updated: 2026-08-04
type: tutorial
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/ai-gateway
  - /docs/cli
  - /docs/ai-gateway/authentication-and-byok/authentication
  - /docs/sandbox/concepts/authentication
summary: Give a LangChain agent a tool that executes model-generated code in an isolated Vercel Sandbox, with models served by AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/langchain.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "b432a47e627253fe1bbc1f2eab97540c28fbc22c1300db29d030bb8c9c860a7d"
---

# LangChain

This guide shows how to give a [LangChain](https://js.langchain.com) agent a
tool that executes code in [Vercel Sandbox](/docs/sandbox), so model-generated
code runs in an isolated microVM instead of on your host. Model requests route
through [AI Gateway](/docs/ai-gateway).

> **💡 Note:** You need a [Vercel account](https://vercel.com/signup), [Vercel
> CLI](/docs/cli), Node.js 22 or later, and an [AI Gateway API
> key](/docs/ai-gateway/authentication-and-byok/authentication).

## Getting started

- ### Create a new project
  Create a new directory for your project and initialize it:
  ```bash filename="terminal"
  mkdir langchain-sandbox
  cd langchain-sandbox
  npm init -y
  ```

- ### Install dependencies
  Install LangChain, the Anthropic and OpenAI provider packages, and the
  Sandbox SDK:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i langchain @langchain/core @langchain/anthropic @langchain/openai @vercel/sandbox zod
      ```
    </Code>
  </CodeBlock>

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
  > **💡 Note:** Outside Vercel and local development, authenticate the Sandbox SDK with an
  > [access token](/docs/sandbox/concepts/authentication#access-tokens) by setting
  > `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, and `VERCEL_PROJECT_ID`.

- ### Create your agent
  Create a new file called `index.ts` with the following code:
  ```typescript filename="index.ts"
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
  The `timeout` value gives the sandbox up to five minutes to finish the agent
  loop. The `finally` block stops it sooner when the loop finishes or throws.

  The following code:
  - Creates a sandbox that the agent reuses across tool calls
  - Defines a `run_code` tool that executes code with
    [`sandbox.runCommand()`](/docs/sandbox/sdk-reference#sandboxruncommand)
  - Points the Anthropic chat model at AI Gateway, authenticated with your
    Vercel credentials
  - Passes the tool to `createAgent`, which runs the tool-calling loop
  The example uses an Anthropic model. To use an OpenAI model instead, import
  `ChatOpenAI` from `@langchain/openai` and point it at the same gateway:
  ```typescript filename="index.ts"
  import { ChatOpenAI } from '@langchain/openai';

  const model = new ChatOpenAI({
    model: 'openai/gpt-5.6-sol',
    apiKey: process.env.AI_GATEWAY_API_KEY ?? process.env.VERCEL_OIDC_TOKEN,
    configuration: { baseURL: 'https://ai-gateway.vercel.sh/v1' },
  });
  ```
  Any [AI Gateway model](/docs/ai-gateway/models-and-providers) works the same
  way.

- ### Run the agent
  Run your agent with the environment variables from `.env.local`:
  ```bash filename="terminal"
  npx tsx --env-file=.env.local index.ts
  ```
  The agent writes Node.js code, executes it in the sandbox, and reports the
  digest.


---

[View full sitemap](/docs/sitemap)
