---
title: Anthropic SDK
product: vercel
url: /docs/sandbox/ecosystem/anthropic-sdk
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/anthropic-sdk"
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
summary: Use Anthropic tool use with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/anthropic-sdk.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "8a42dd0b85bf896fd55112657082a16cf94f1651690df20d311ab0c0debc255c"
---

# Anthropic SDK

The [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-typescript)
supports tool use through the Messages API. This guide shows how to define a
tool that executes code in [Vercel Sandbox](/docs/sandbox), so model-generated
code runs in an isolated microVM instead of on your host. Model requests
route through [AI Gateway](/docs/ai-gateway), and one set of Vercel
credentials covers both the model and the sandbox.

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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @anthropic-ai/sdk @vercel/sandbox
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @anthropic-ai/sdk @vercel/sandbox
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @anthropic-ai/sdk @vercel/sandbox
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @anthropic-ai/sdk @vercel/sandbox
      ```
    </Code>
  </CodeBlock>

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
  > `AI_GATEWAY_API_KEY`. Outside Vercel and local development, authenticate the
  > Sandbox SDK with an [access
  > token](/docs/sandbox/concepts/authentication#access-tokens) by setting
  > `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, and `VERCEL_PROJECT_ID`.

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
  The `timeout` value gives the sandbox up to five minutes to finish the tool
  loop. The `finally` block stops it sooner when the loop finishes or throws.

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
