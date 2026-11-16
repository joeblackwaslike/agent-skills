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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/sandbox/ecosystem/mastra.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "63aeb02faca4e0e3771231a3189093d94f4a2c68b662fc2aa9892f557d2fa004"
---

# Mastra with Vercel Sandbox

Give a [Mastra](/docs/frameworks/agents/mastra) agent a workspace that executes commands in [Vercel Sandbox](/docs/sandbox). The `VercelSandbox` adapter from `@mastra/vercel` runs commands in an isolated microVM, while your application runs the agent and calls models through [AI Gateway](/docs/ai-gateway).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [How to run Herdr coding agents in isolated Vercel Sandboxes](https://vercel.com/kb/guide/run-herdr-coding-agents-isolated-vercel-sandboxes) — Install the vercel.sandbox plugin for Herdr, approve an upload manifest, run each AI coding agent in its own isolated Ve
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto

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

## Prepare your agent for launch

Before you launch your Mastra agent, work through the [agent checklist](/docs/agent-checklist?framework=mastra). It lists the Sandbox settings to check, such as network policies, credentials brokering, and timeouts. Its Mastra items include the choice of sandbox adapter and workspace cleanup.

## Frequently asked questions

### What's the difference between VercelSandbox and VercelServerlessSandbox in Mastra?

`VercelSandbox` runs commands in a Vercel Sandbox microVM, a full Linux environment with its own filesystem, exposed ports, and background processes. `VercelServerlessSandbox` runs each command in a stateless Vercel Function. Only its `/tmp` directory is writable, and files there are ephemeral. A later invocation might still see them, so delete sensitive files explicitly when a command finishes. Use `VercelSandbox` when your agent needs to install packages, keep files between commands, or run a server.

### How does a Mastra agent authenticate with Vercel Sandbox?

The `VercelSandbox` adapter uses the Sandbox SDK, which authenticates with a Vercel OIDC token. For local development, run `vercel link` and `vercel env pull` to write `VERCEL_OIDC_TOKEN` to `.env.local`. When your application runs on Vercel, the SDK uses the deployment's token automatically. In other environments, set `VERCEL_TOKEN`, `VERCEL_TEAM_ID`, and `VERCEL_PROJECT_ID` together. Model requests use AI Gateway credentials in your application process, so you don't pass `AI_GATEWAY_API_KEY` into the sandbox.

### How long can a Mastra agent's sandbox run?

Set the `timeout` option on `VercelSandbox` in milliseconds. The default is five minutes. Each sandbox session can run for up to 45 minutes on Hobby and up to 24 hours on Pro and Enterprise. See [Sandbox runtime limits](/docs/sandbox/pricing#runtime-limits). Call `workspace.destroy()` when the session ends to delete the sandbox and its snapshots.

### How do I keep files between Mastra sandbox runs?

Vercel sandboxes are [persistent](/docs/sandbox/concepts/persistent-sandboxes) by default. When a sandbox stops, Vercel snapshots its filesystem and restores it on resume, so you can pass the same `sandboxName` to `VercelSandbox` to reuse those files. Calling `workspace.destroy()` deletes the sandbox and its snapshots. To keep files independently of any sandbox, including after you delete it, mount a [Vercel Drive](/docs/sandbox/concepts/drives). The `VercelSandbox` adapter doesn't accept a `mounts` option, so create a named, drive-mounted sandbox with `@vercel/sandbox` and pass its name to `VercelSandbox` with `sandboxName`. Follow [Keep workspace files on a drive](/docs/frameworks/agents/mastra#keep-workspace-files-on-a-drive) for the full steps.

### What else can a Mastra agent with a sandbox use on Vercel?

Vercel Sandbox runs the agent's commands. You can combine it with these Vercel products:

- [AI Gateway](/docs/ai-gateway) routes the agent's model requests. See [Mastra with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/mastra).
- [Vercel Functions](/docs/functions) run your Mastra server when you deploy with `VercelDeployer`. See [Mastra on Vercel](/docs/frameworks/agents/mastra).
- [Vercel Blob](/docs/vercel-blob) stores reports and other files the agent produces.
- [Vercel Workflows](/docs/workflows) coordinate multi-step tasks that call the agent.
- [Vercel Daemons](/docs/daemons) run Mastra's background workers.
- [Vercel Passport](/docs/passport) signs visitors in so you can scope agent memory to each user.
- [Chat SDK](/docs/chat-sdk) connects the agent to Slack, Discord, or Microsoft Teams.

## Next steps

- See [Mastra's Vercel Sandbox integration](https://mastra.ai/integrations/sandboxes/vercel#vercel-sandbox) for adapter options, exposed ports, and background processes.
- Read the [Mastra workspace reference](https://mastra.ai/reference/workspace/workspace-class) for workspace tools and lifecycle methods.
- Configure model access with [Mastra and AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/mastra).

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
