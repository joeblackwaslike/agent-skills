---
title: TanStack AI with Vercel Sandbox
product: vercel
url: /docs/sandbox/ecosystem/tanstack-ai
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/tanstack-ai"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/accounts
  - /docs/sandbox/concepts/authentication
  - /docs/connect/frameworks/tanstack-ai
  - /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
summary: Run TanStack AI coding agents in isolated Vercel Sandbox microVMs with the dedicated provider, workspace configuration, and policies.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/tanstack-ai.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "d913bdc4099d726f87fbbf7927112d7da3070b58fc23378fd25b38d61bb710ca"
---

# TanStack AI with Vercel Sandbox

Run [TanStack AI](https://tanstack.com/ai) coding agents in [Vercel Sandbox](/docs/sandbox) using the `@tanstack/ai-sandbox-vercel` provider. The provider manages the microVM, while a harness adapter selects the coding agent that runs inside it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Run Python code securely with AI SDK and Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Add an \\`executeCode\\` tool to your AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Python 3.13 insi
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [TanStack AI with MCP](https://vercel.com/docs/mcp/integrations/tanstack-ai?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Connect TanStack AI to a Model Context Protocol server on Vercel and call its tools with models served through AI Gatewa
- [Quickstart](https://vercel.com/docs/sandbox/quickstart?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Learn how to run your first code in a Vercel Sandbox.
- [OpenAI SDK](https://vercel.com/docs/sandbox/ecosystem/openai-sdk?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Use OpenAI function calling with AI Gateway to execute model-generated code in an isolated Vercel Sandbox.
- [TanStack Start on Vercel](https://vercel.com/docs/frameworks/full-stack/tanstack-start?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=related) — Deploy TanStack Start applications to Vercel with Nitro and configure Vercel Functions.

Full cross-link map for this page: [/docs/sandbox/ecosystem/tanstack-ai.graph.md](/docs/sandbox/ecosystem/tanstack-ai.graph.md?from=related&source_path=%2Fdocs%2Fsandbox%2Fecosystem%2Ftanstack-ai&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

Use a JavaScript or TypeScript project with Node.js 22 or later and a [Vercel account](/docs/accounts) with a team and project. This example uses the [Codex harness](https://tanstack.com/ai/latest/docs/adapters/codex), which requires an OpenAI API key.

## Install the packages

Install TanStack AI, the sandbox packages, and the Codex adapter:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @tanstack/ai @tanstack/ai-sandbox @tanstack/ai-sandbox-vercel @tanstack/ai-codex
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @tanstack/ai @tanstack/ai-sandbox @tanstack/ai-sandbox-vercel @tanstack/ai-codex
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @tanstack/ai @tanstack/ai-sandbox @tanstack/ai-sandbox-vercel @tanstack/ai-codex
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @tanstack/ai @tanstack/ai-sandbox @tanstack/ai-sandbox-vercel @tanstack/ai-codex
    ```
  </Code>
</CodeBlock>

## Configure authentication

Save your credentials in a `.env` file:

```bash filename=".env"
VERCEL_TOKEN=your_access_token_here
VERCEL_TEAM_ID=your_team_id_here
VERCEL_PROJECT_ID=your_project_id_here
CODEX_API_KEY=your_openai_api_key_here
```

Create a Vercel access token scoped to your team and find your team and project IDs using the [Sandbox authentication instructions](/docs/sandbox/concepts/authentication#access-tokens).

The provider uses the Vercel credentials to manage sandboxes. Pass the agent's `CODEX_API_KEY` as a workspace secret so the agent can authenticate inside the microVM.

## Run a coding agent

Create an entry file and replace `your_org/your_repo` with a public GitHub repository. The example clones that repository into the sandbox and asks Codex to list its files:

**index.mts**

```ts filename="index.mts" framework=all
import { chat } from '@tanstack/ai';
import { codexText } from '@tanstack/ai-codex';
import {
  createSecrets,
  defineSandbox,
  defineSandboxPolicy,
  defineWorkspace,
  githubRepo,
  withSandbox,
} from '@tanstack/ai-sandbox';
import { vercelSandbox } from '@tanstack/ai-sandbox-vercel';

const apiKey = process.env.CODEX_API_KEY;
if (!apiKey) {
  throw new Error('Set CODEX_API_KEY in your .env file.');
}

const sandbox = defineSandbox({
  id: 'vercel-agent',
  provider: vercelSandbox({ runtime: 'node24' }),
  workspace: defineWorkspace({
    source: githubRepo({ repo: 'your_org/your_repo' }),
    setup: [
      'sudo -n npm install -g @openai/codex --include=optional && codex --version',
    ],
    secrets: createSecrets({ CODEX_API_KEY: apiKey }),
  }),
  policy: defineSandboxPolicy({ default: 'allow' }),
});

const stream = chat({
  adapter: codexText('gpt-6-astra', {
    codexPathOverride: 'codex',
    sandboxMode: 'danger-full-access',
    approvalPolicy: 'never',
  }),
  messages: [{ role: 'user', content: 'List the project files.' }],
  middleware: [withSandbox(sandbox)],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

**index.mjs**

```js filename="index.mjs" framework=all
import { chat } from '@tanstack/ai';
import { codexText } from '@tanstack/ai-codex';
import {
  createSecrets,
  defineSandbox,
  defineSandboxPolicy,
  defineWorkspace,
  githubRepo,
  withSandbox,
} from '@tanstack/ai-sandbox';
import { vercelSandbox } from '@tanstack/ai-sandbox-vercel';

const apiKey = process.env.CODEX_API_KEY;
if (!apiKey) {
  throw new Error('Set CODEX_API_KEY in your .env file.');
}

const sandbox = defineSandbox({
  id: 'vercel-agent',
  provider: vercelSandbox({ runtime: 'node24' }),
  workspace: defineWorkspace({
    source: githubRepo({ repo: 'your_org/your_repo' }),
    setup: [
      'sudo -n npm install -g @openai/codex --include=optional && codex --version',
    ],
    secrets: createSecrets({ CODEX_API_KEY: apiKey }),
  }),
  policy: defineSandboxPolicy({ default: 'allow' }),
});

const stream = chat({
  adapter: codexText('gpt-6-astra', {
    codexPathOverride: 'codex',
    sandboxMode: 'danger-full-access',
    approvalPolicy: 'never',
  }),
  messages: [{ role: 'user', content: 'List the project files.' }],
  middleware: [withSandbox(sandbox)],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

The workspace setup installs the Codex CLI inside the microVM and checks that it runs before starting the agent. `--include=optional` includes its platform-specific binary. The adapter uses that executable through `codexPathOverride`. See [installing an agent CLI](https://tanstack.com/ai/latest/docs/sandbox/workspace#installing-an-agent-cli) for setup behavior.

The `danger-full-access` mode uses the Vercel microVM as the isolation boundary. Together with `approvalPolicy: 'never'` and the `default: 'allow'` policy, it lets Codex execute commands without approval prompts inside that microVM. See [TanStack AI policies](https://tanstack.com/ai/latest/docs/sandbox/policy) for harness-specific enforcement.

Run the TypeScript example with `tsx`, loading credentials from `.env`:

```bash filename="terminal"
pnpm dlx tsx --env-file=.env index.mts
```

For JavaScript, run `node --env-file=.env index.mjs`. Your terminal displays stream events with the agent's command activity and response listing the repository files.

## Next steps

- Authenticate OAuth-protected MCP tools with [TanStack AI and Vercel Connect](/docs/connect/frameworks/tanstack-ai).
- Follow the [Using TanStack AI with Vercel Sandbox](/kb/guide/tanstack-ai-vercel-sandbox) guide for setup commands, resuming sandboxes, preview ports, and limitations.
- Explore the [Vercel provider reference](https://tanstack.com/ai/latest/docs/sandbox/providers#vercel) and [workspace configuration](https://tanstack.com/ai/latest/docs/sandbox/workspace).
- Connect model requests to [TanStack AI with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai).


---

[View full sitemap](/docs/sitemap)
