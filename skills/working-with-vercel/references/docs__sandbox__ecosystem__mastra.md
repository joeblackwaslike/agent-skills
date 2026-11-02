---
title: Mastra with Vercel Sandbox
product: vercel
url: /docs/sandbox/ecosystem/mastra
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/mastra"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/frameworks/agents/mastra
  - /docs/sandbox
  - /docs/ai-gateway
  - /docs/accounts
  - /docs/cli
summary: Give a Mastra agent an isolated workspace for running commands with the Vercel Sandbox adapter and AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/mastra.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "5057d3b4618c6835b90442fab86824f75eebc09fd790cf64072fafaa3d534d58"
---

# Mastra with Vercel Sandbox

Give a [Mastra](/docs/frameworks/agents/mastra) agent a workspace that executes commands in [Vercel Sandbox](/docs/sandbox). The `VercelSandbox` adapter from `@mastra/vercel` runs commands in an isolated microVM, while your application runs the agent and calls models through [AI Gateway](/docs/ai-gateway).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [How to build an on-demand voice agent with Vercel Sandbox](https://vercel.com/kb/guide/how-to-build-an-on-demand-voice-agent-with-vercel-sandbox) — Build a voice AI application that creates isolated LiveKit agent environments using Vercel Sandbox, enabling real-time c
- [Build a Software Factory with Mastra](https://vercel.com/docs/agent-resources/software-factory/mastra) — Combine Mastra workflow stages with AI Gateway, Vercel Sandbox, and GitHub Tools to prepare reviewed changes.
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs

Full cross-link map for this page: [/docs/sandbox/ecosystem/mastra.graph.md](/docs/sandbox/ecosystem/mastra.graph.md)
<!-- /docsgraph:related -->

Use `VercelSandbox` for this integration. Mastra also exports `VercelServerlessSandbox`, which uses Vercel Functions and has a different execution model.

## Prerequisites

Use a JavaScript or TypeScript project with Node.js 22.13 or later, a [Vercel account](/docs/accounts), and the [Vercel CLI](/docs/cli). You'll also need an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/authentication).

For project setup, deployment, and persistent workspaces with Drives, see [Mastra on Vercel](/docs/frameworks/agents/mastra).

## Install the packages

Install Mastra and its Vercel adapter:

**pnpm**

```bash
pnpm i @mastra/core @mastra/vercel
```

**yarn**

```bash
yarn add @mastra/core @mastra/vercel
```

**npm**

```bash
npm i @mastra/core @mastra/vercel
```

**bun**

```bash
bun add @mastra/core @mastra/vercel
```

## Configure authentication

From your project directory, link the project to Vercel and pull its development environment:

```bash filename="terminal"
vercel link
vercel env pull
```

This creates a `.env.local` file with a `VERCEL_OIDC_TOKEN` that authenticates the Sandbox SDK. Add your AI Gateway key to the same file:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

Sandbox authentication uses the deployment's OIDC token automatically when your application runs on Vercel. For an environment without OIDC, set `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, and `VERCEL_PROJECT_ID` together, following the [access token instructions](/docs/sandbox/concepts/authentication#access-tokens).

Mastra's `vercel/` model prefix routes requests through AI Gateway using `AI_GATEWAY_API_KEY`. The agent uses this key in your application process, so you don't need to pass it into the sandbox.

## Run an agent with a sandbox workspace

Create an entry file with the following code. The workspace gives the agent a command execution tool backed by Vercel Sandbox:

**index.mts**

```ts filename="index.mts" framework=all
import { Agent } from '@mastra/core/agent';
import { Workspace } from '@mastra/core/workspace';
import { VercelSandbox } from '@mastra/vercel';

const workspace = new Workspace({
  sandbox: new VercelSandbox({
    runtime: 'node24',
    timeout: 300_000,
  }),
});

const agent = new Agent({
  id: 'sandbox-agent',
  name: 'Sandbox Agent',
  instructions:
    'Use the workspace command tool to run calculations in the sandbox. Report the command output.',
  model: 'vercel/openai/gpt-6.1-terra',
  workspace,
});

try {
  await workspace.init();
  const response = await agent.generate(
    'Use Node.js in the sandbox to calculate the sum of 1 through 100 and report the result.',
    { maxSteps: 5 },
  );
  console.log(response.text);
} finally {
  await workspace.destroy();
}
```

**index.mjs**

```js filename="index.mjs" framework=all
import { Agent } from '@mastra/core/agent';
import { Workspace } from '@mastra/core/workspace';
import { VercelSandbox } from '@mastra/vercel';

const workspace = new Workspace({
  sandbox: new VercelSandbox({
    runtime: 'node24',
    timeout: 300_000,
  }),
});

const agent = new Agent({
  id: 'sandbox-agent',
  name: 'Sandbox Agent',
  instructions:
    'Use the workspace command tool to run calculations in the sandbox. Report the command output.',
  model: 'vercel/openai/gpt-6.1-terra',
  workspace,
});

try {
  await workspace.init();
  const response = await agent.generate(
    'Use Node.js in the sandbox to calculate the sum of 1 through 100 and report the result.',
    { maxSteps: 5 },
  );
  console.log(response.text);
} finally {
  await workspace.destroy();
}
```

Run the TypeScript example with your environment variables loaded:

```bash filename="terminal"
pnpm dlx tsx --env-file=.env.local index.mts
```

For JavaScript, run `node --env-file=.env.local index.mjs`. The agent runs a Node.js calculation in the sandbox and prints a response containing `5050`. The wording can vary between runs.

## Clean up the workspace

The `finally` block calls `workspace.destroy()` after the response or an error to delete the sandbox and its snapshots. Keep the workspace alive while your application needs it, then destroy it when the session ends. Save any files you need before cleanup.

## Connect your agent on Vercel to chat platforms

Use [Chat SDK](/docs/chat-sdk) to let people interact with your Mastra agent on Vercel from Slack, Discord, or Microsoft Teams. Chat SDK handles platform messages and replies, while Vercel Sandbox isolates the commands your agent runs. Keep workspace creation and cleanup tied to your application's session lifecycle.

Mastra's channels integration accepts Chat SDK adapters through `channels.adapters` and registers their webhook routes. Point the platform's webhook URL to your deployed Mastra server. See [Mastra's channels guide](https://mastra.ai/docs/channels) for adapter credentials, webhook configuration, and persistent storage.

## Next steps

- See [Mastra's Vercel Sandbox integration](https://mastra.ai/integrations/sandboxes/vercel#vercel-sandbox) for adapter options, exposed ports, and background processes.
- Read the [Mastra workspace reference](https://mastra.ai/reference/workspace/workspace-class) for workspace tools and lifecycle methods.
- Configure model access with [Mastra and AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/mastra).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
