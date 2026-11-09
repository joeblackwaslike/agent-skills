---
title: Flue with Vercel Sandbox
product: vercel
url: /docs/sandbox/ecosystem/flue
canonical_url: "https://vercel.com/docs/sandbox/ecosystem/flue"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/sandbox/ecosystem
  - /docs/sandbox
related:
  - /docs/sandbox
  - /docs/frameworks/agents/flue
  - /docs/accounts
  - /docs/ai-gateway/authentication-and-byok/authentication
  - /docs/cli
summary: Give a Flue agent file and command tools backed by Vercel Sandbox using the Vercel adapter blueprint.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/ecosystem/flue.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "eccc26cca293fe1285197e6fc8f636f87a3078575d1df7daeb9fcfc77020624e"
---

# Flue with Vercel Sandbox

Attach [Vercel Sandbox](/docs/sandbox) to a [Flue](/docs/frameworks/agents/flue) agent with `useSandbox()`. The agent's file and command tools operate inside the microVM, while the Flue runtime runs in your application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building an agent with OpenAI Agents SDK and Vercel Sandbox](https://vercel.com/kb/guide/building-an-agent-with-openai-agents-sdk-and-vercel-sandbox) — Learn how to build an agent with with OpenAI Agents SDK and Vercel Sandbox
- [Run untrusted code with Vercel Sandbox, now generally available](https://vercel.com/blog/vercel-sandbox-is-now-generally-available)
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [How to build an on-demand voice agent with Vercel Sandbox](https://vercel.com/kb/guide/how-to-build-an-on-demand-voice-agent-with-vercel-sandbox) — Build a voice AI application that creates isolated LiveKit agent environments using Vercel Sandbox, enabling real-time c
- [How Vercel Sandbox duration and persistence work](https://vercel.com/kb/guide/vercel-sandbox-duration-and-persistence) — Session duration and persistence are two separate controls in Vercel Sandbox. The timeout option keeps a single run aliv
- [Running OpenClaw in Vercel Sandbox](https://vercel.com/kb/guide/running-openclaw-in-vercel-sandbox) — This guide walks you through setting up OpenClaw inside a Vercel Sandbox and configuring the WhatsApp channel.
- [Build a Software Factory with Flue](https://vercel.com/docs/agent-resources/software-factory/flue) — Use Flue with AI Gateway, Vercel Sandbox, and explicit GitHub tool adapters for investigated and reviewed code changes.
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Run isolated AI agents in one sandbox](https://vercel.com/docs/sandbox/concepts/multi-agent) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs

Full cross-link map for this page: [/docs/sandbox/ecosystem/flue.graph.md](/docs/sandbox/ecosystem/flue.graph.md)
<!-- /docsgraph:related -->

Flue's Vercel adapter wraps a Sandbox instance you create with `@vercel/sandbox`. Your application owns authentication, provisioning, and cleanup.

## Prerequisites

Start with an [existing Flue project](/docs/frameworks/agents/flue) with `@flue/runtime` and `@flue/cli` installed, Node.js 22.19 or later, and a [Vercel account](/docs/accounts). The example uses an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/authentication) for model requests.

## Add the Vercel adapter

From your Flue project, print the Vercel Sandbox blueprint:

```bash filename="terminal"
pnpm exec flue add sandbox vercel --print
```

The command prints implementation instructions; it doesn't write files or install packages. Have your coding agent apply the blueprint, or follow it manually. The blueprint creates a `sandboxes/vercel.ts` adapter in your source directory and adds `@vercel/sandbox` as a dependency.

The examples below assume the adapter is at `src/sandboxes/vercel.ts`. Adjust the import and agent paths if your project uses a different source directory.

## Configure authentication

Use the [Vercel CLI](/docs/cli) to link your project and pull a development token:

```bash filename="terminal"
vercel link
vercel env pull .env.local
```

The `.env.local` file contains a `VERCEL_OIDC_TOKEN` for Sandbox authentication. Add your AI Gateway key to that file:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key_here
```

The example uses Flue's built-in `vercel-ai-gateway` provider. See [Flue with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/flue) for model configuration and OIDC authentication. Model requests use `AI_GATEWAY_API_KEY` in your application process, separately from Sandbox authentication.

On Vercel, the Sandbox SDK uses the deployment's OIDC token automatically. Outside Vercel, you can supply `token`, `teamId`, and `projectId` to `Sandbox.create()` as described in [Sandbox authentication](/docs/sandbox/concepts/authentication#access-tokens).

## Attach Sandbox to your agent

Create an agent module with a lazy sandbox factory:

**src/agents/assistant.ts**

```ts filename="src/agents/assistant.ts" framework=all
'use agent';

import { useModel, useSandbox } from '@flue/runtime';
import { Sandbox } from '@vercel/sandbox';
import { vercel } from '../sandboxes/vercel.ts';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  useSandbox({
    async createSandbox(options) {
      const sandbox = await Sandbox.create({
        runtime: 'node24',
        timeout: 300_000,
      });
      console.error(`Sandbox name: ${sandbox.name}`);
      return vercel(sandbox).createSandbox(options);
    },
  });

  return 'Use the sandbox to run commands and inspect files. Report the results of your work.';
}
```

**src/agents/assistant.js**

```js filename="src/agents/assistant.js" framework=all
'use agent';

import { useModel, useSandbox } from '@flue/runtime';
import { Sandbox } from '@vercel/sandbox';
import { vercel } from '../sandboxes/vercel.ts';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  useSandbox({
    async createSandbox(options) {
      const sandbox = await Sandbox.create({
        runtime: 'node24',
        timeout: 300_000,
      });
      console.error(`Sandbox name: ${sandbox.name}`);
      return vercel(sandbox).createSandbox(options);
    },
  });

  return 'Use the sandbox to run commands and inspect files. Report the results of your work.';
}
```

Flue calls `createSandbox()` when it initializes the agent's harness, rather than on each agent re-render. This example creates a fresh sandbox on each initialization, with `/vercel/sandbox` as its working directory. The adapter enables Flue's `read`, `write`, `edit`, `bash`, `grep`, and `glob` tools.

## Run your agent

Run the TypeScript agent with the environment file loaded:

```bash filename="terminal"
pnpm exec flue run src/agents/assistant.ts --env .env.local --message "Use Node.js in the sandbox to calculate the sum of 1 through 100 and report the result."
```

For JavaScript, replace `src/agents/assistant.ts` with `src/agents/assistant.js`. The terminal prints the sandbox name and the agent's activity, followed by a reply containing `5050`. Save the sandbox name for cleanup.

## Manage the sandbox lifecycle

Flue doesn't delete provider sandboxes when an agent run ends. When you're finished, replace the placeholder with the name printed by the example and remove the sandbox with the [Sandbox CLI](/docs/sandbox/cli-reference#sandbox-remove):

```bash filename="terminal"
pnpm dlx sandbox@latest remove your_sandbox_name_here --delete-orphan-snapshots
```

This deletes the sandbox and its snapshots that no other sandbox uses. Save any files you need first. In application code, keep a reference to the SDK instance and call [`sandbox.delete()`](/docs/sandbox/sdk-reference#sandboxdelete) when the work is complete.

The example's five-minute timeout limits its running session; it doesn't replace cleanup. For a workspace that survives across runs, store a mapping from Flue's `createSandbox({ id })` agent instance ID to the Sandbox name and reconnect when that agent runs again. See [persistent sandboxes](/docs/sandbox/concepts/persistent-sandboxes). To keep files independently of a sandbox, [use a Drive-backed Flue workspace](/docs/frameworks/agents/flue#keep-a-workspace-across-runs).

## Next steps

- Read [Flue's Vercel Sandbox integration](https://flueframework.com/docs/ecosystem/sandboxes/vercel/) for the adapter blueprint.
- See the [Flue Sandbox Adapter API](https://flueframework.com/docs/reference/sandbox-api/) for factory and filesystem behavior.
- Configure [Sandbox runtimes](/docs/sandbox/concepts/runtimes) and [network access](/docs/sandbox/concepts/firewall) for your agent's tasks.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
