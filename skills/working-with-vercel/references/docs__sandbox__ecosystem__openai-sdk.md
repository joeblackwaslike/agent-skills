---
title: OpenAI SDK
product: vercel
url: /docs/sandbox/ecosystem/openai-sdk
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/openai-sdk"
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
summary: Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/openai-sdk.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "38124e83e0f31ad084f9dd750569f2f180a5cffd733df263a434adf0a03b3c15"
---

# OpenAI SDK

The [OpenAI SDK](https://github.com/openai/openai-node) supports function
calling through the Responses API. This guide shows how to define a function
that executes code in [Vercel Sandbox](/docs/sandbox), so model-generated
code runs in an isolated microVM instead of on your host. Model requests
route through [AI Gateway](/docs/ai-gateway), and one set of Vercel
credentials covers both the model and the sandbox.

> **💡 Note:** You need a [Vercel account](https://vercel.com/signup), [Vercel
> CLI](/docs/cli), and Node.js 22 or later.

## Getting started

- ### Create a new project
  Create a new directory for your project and initialize it:
  ```bash filename="terminal"
  mkdir openai-sandbox
  cd openai-sandbox
  npm init -y
  ```

- ### Install dependencies
  Install the OpenAI SDK and the Sandbox SDK:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i openai @vercel/sandbox
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i openai @vercel/sandbox
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i openai @vercel/sandbox
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i openai @vercel/sandbox
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
      const toolOutputs: OpenAI.Responses.ResponseInput = [];
      for (const item of response.output) {
        if (item.type !== 'function_call') continue;
        const { code } = JSON.parse(item.arguments);
        const result = await sandbox.runCommand('node', ['-e', code]);
        const output =
          result.exitCode === 0
            ? await result.stdout()
            : `Command failed: ${await result.stderr()}`;
        toolOutputs.push({
          type: 'function_call_output',
          call_id: item.call_id,
          output,
        });
      }
      response = await openai.responses.create({
        model: 'openai/gpt-5.6-sol',
        tools,
        previous_response_id: response.id,
        input: toolOutputs,
      });
    }

    console.log(response.output_text);
  } finally {
    await sandbox.stop();
  }
  ```
  The `timeout` value gives the sandbox up to five minutes to finish the function
  loop. The `finally` block stops it sooner when the loop finishes or throws.

  The following code:
  - Points the OpenAI SDK at AI Gateway, authenticated with your Vercel
    credentials
  - Creates a sandbox that is reused across function calls
  - Declares a `run_code` function the model can call
  - Executes each function call with
    [`sandbox.runCommand()`](/docs/sandbox/sdk-reference#sandboxruncommand)
    and returns the output as a `function_call_output` item
  - Uses `previous_response_id` to preserve the full response, including reasoning
    items, before the next call
  - Loops until the model responds without calling a function

- ### Run the application
  Run your application with the environment variables from `.env.local`:
  ```bash filename="terminal"
  npx tsx --env-file=.env.local index.ts
  ```
  The model writes Node.js code, the sandbox executes it, and the final
  response reports the digest.


---

[View full sitemap](/docs/sitemap)
