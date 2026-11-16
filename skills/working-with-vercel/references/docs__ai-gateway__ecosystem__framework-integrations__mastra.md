---
title: Mastra with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/mastra
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/mastra"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/frameworks/agents/mastra
  - /docs/ai-sdk
  - /docs/ai-gateway/authentication-and-byok
  - /docs/sandbox/ecosystem/mastra
  - /docs/chat-sdk
summary: Learn how to integrate Vercel AI Gateway with Mastra to access multiple AI models through a unified interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/mastra.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a6a2341c6d138e468ef51662d11c194789c8f89ba6ce4fe12db33907ddef5f12"
---

# Mastra with AI Gateway

[Mastra](/docs/frameworks/agents/mastra) is a framework for building and deploying AI-powered features
using a modern JavaScript stack powered by the [Vercel AI SDK](/docs/ai-sdk).
Integrating with AI Gateway provides unified model management and routing capabilities.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Muse Ember now available on AI Gateway](https://vercel.com/changelog/muse-ember-now-available-on-ai-gateway)
- [Build a Software Factory with Mastra](https://vercel.com/docs/agent-resources/software-factory/mastra) — Combine Mastra workflow stages with AI Gateway, Vercel Sandbox, and GitHub Tools to prepare reviewed changes.
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Agent Resources](https://vercel.com/docs/agent-resources) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/mastra.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/mastra.graph.md)
<!-- /docsgraph:related -->

For project setup, deployment, and storage options, see [Mastra on Vercel](/docs/frameworks/agents/mastra).

## Getting started

- ### Create a new Mastra project
  First, create a new Mastra project using the CLI:
  ```bash filename="terminal"
  pnpm dlx create-mastra@latest
  ```
  During the setup, the system prompts you to name your project, choose a default provider, and more.
  and more. Feel free to use the default settings.

- ### Install dependencies
  To use the AI Gateway provider, install the `@ai-sdk/gateway` package along with Mastra:

  **pnpm**
  ```bash
  pnpm i @ai-sdk/gateway mastra @mastra/core @mastra/memory
  ```
  **yarn**
  ```bash
  yarn add @ai-sdk/gateway mastra @mastra/core @mastra/memory
  ```
  **npm**
  ```bash
  npm i @ai-sdk/gateway mastra @mastra/core @mastra/memory
  ```
  **bun**
  ```bash
  bun add @ai-sdk/gateway mastra @mastra/core @mastra/memory
  ```

- ### Configure environment variables
  Create or update your `.env` file with
  your [Vercel AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys):
  ```bash filename=".env"
  AI_GATEWAY_API_KEY=your-api-key-here
  ```

- ### Configure your agent to use AI Gateway
  Now, swap out the `@ai-sdk/openai` package (or your existing model provider)
  for the `@ai-sdk/gateway` package.

  Update your agent configuration file, typically `src/mastra/agents/weather-agent.ts` to the following code:
  ```typescript filename="src/mastra/agents/weather-agent.ts" {2, 24}
  import 'dotenv/config';
  import { gateway } from '@ai-sdk/gateway';
  import { Agent } from '@mastra/core/agent';
  import { Memory } from '@mastra/memory';
  import { LibSQLStore } from '@mastra/libsql';
  import { weatherTool } from '../tools/weather-tool';

  export const weatherAgent = new Agent({
    name: 'Weather Agent',
    instructions: `
        You are a helpful weather assistant that provides accurate weather information and can help planning activities based on the weather.

        Your primary function is to help users get weather details for specific locations. When responding:
        - Always ask for a location if none is provided
        - If the location name isn't in English, please translate it
        - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
        - Include relevant details like humidity, wind conditions, and precipitation
        - Keep responses concise but informative
        - If the user asks for activities and provides the weather forecast, suggest activities based on the weather forecast.
        - If the user asks for activities, respond in the format they request.

        Use the weatherTool to fetch current weather data.
  `,
    model: gateway('google/gemini-3.1-pro-preview'),
    tools: { weatherTool },
    memory: new Memory({
      storage: new LibSQLStore({
        url: 'file:../mastra.db', // path is relative to the .mastra/output directory
      }),
    }),
  });

  (async () => {
    try {
      const response = await weatherAgent.generate(
        "What's the weather in San Francisco today?",
      );
      console.log('Weather Agent Response:', response.text);
    } catch (error) {
      console.error('Error invoking weather agent:', error);
    }
  })();
  ```

- ### Running the application
  Since your agent is now configured to use AI Gateway,
  run the Mastra development server:

  **pnpm**
  ```bash
  pnpm dev
  ```
  **yarn**
  ```bash
  yarn dev
  ```
  **npm**
  ```bash
  npm run dev
  ```
  **bun**
  ```bash
  bun run dev
  ```
  Open the [Mastra API](https://mastra.ai/reference) to test your agents, workflows, and tools.

## Run agent commands in Vercel Sandbox

To give your Mastra agent isolated command execution, add a workspace with the `VercelSandbox` adapter. Follow [Mastra with Vercel Sandbox](/docs/sandbox/ecosystem/mastra) to configure authentication, run an agent, and clean up its sandbox.

## Connect your agent on Vercel to chat platforms

Connect the Mastra agent you deploy on Vercel to Slack, Discord, or Microsoft Teams with [Chat SDK](/docs/chat-sdk). Users can send prompts in chat while AI Gateway routes the agent's model requests. Inspect those requests in [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability).

Mastra's channels integration accepts Chat SDK adapters through `channels.adapters` and registers their webhook routes. Point the platform's webhook URL to your deployed Mastra server. See [Mastra's channels guide](https://mastra.ai/docs/channels) for adapter credentials, webhook configuration, and persistent storage.

## Prepare your agent for launch

Before you launch your Mastra agent, work through the [agent checklist](/docs/agent-checklist?framework=mastra). It lists the AI Gateway settings to check, such as budgets, spend alerts, and model fallbacks. Its Mastra items include server authentication and storage.

## Frequently asked questions

### How do I connect a Mastra agent to AI Gateway?

Set the agent's `model` to a model from the `gateway` provider in `@ai-sdk/gateway`, such as `gateway('google/gemini-3.1-pro-preview')`. You can also pass a Mastra model router string that starts with `vercel/`, such as `'vercel/google/gemini-3.1-pro-preview'`. Both options send the agent's requests through AI Gateway and read `AI_GATEWAY_API_KEY`. Mastra's model router uses an OpenAI-compatible endpoint, so some provider-specific features may not be available through it. Use the `gateway` provider when you need those features.

### Do I need an AI Gateway API key to run Mastra on Vercel?

No. When your Mastra agent runs on Vercel, the `gateway` provider can authenticate with the deployment's [OIDC token](/docs/ai-gateway/authentication-and-byok/oidc), and an API key takes precedence when you set one. For local development, either add `AI_GATEWAY_API_KEY` to your `.env` file or run `vercel env pull` to write a `VERCEL_OIDC_TOKEN`. Pulled OIDC tokens are valid for 12 hours, so pull again when yours expires.

### How do I switch the model my Mastra agent uses?

Change the model ID in the agent's `model` setting, for example from `gateway('google/gemini-3.1-pro-preview')` to `gateway('anthropic/claude-sonnet-5')`. You don't need a different provider package or a separate provider API key. Browse available IDs in [models and providers](/docs/ai-gateway/models-and-providers). To use your own provider credentials instead of AI Gateway's, add them at the team level with [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok).

### Where can I see my Mastra agent's token usage and costs?

Open [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability) in your Vercel dashboard. Every model request your agent sends through AI Gateway appears there, with usage, spend, and a detailed request log at team and project level. You don't need to add instrumentation to your Mastra code to see these requests.

### What else can a Mastra agent use on Vercel?

AI Gateway handles model requests. You can add these Vercel products to the same agent:

- [Vercel Functions](/docs/functions) run your Mastra server when you deploy with `VercelDeployer`. See [Mastra on Vercel](/docs/frameworks/agents/mastra).
- [Vercel Sandbox](/docs/sandbox) runs agent commands in an isolated microVM, and [Vercel Drives](/docs/sandbox/concepts/drives) keep workspace files across sandbox runs.
- [Vercel Blob](/docs/vercel-blob) stores reports and other files the agent creates.
- [Vercel Workflows](/docs/workflows) coordinate multi-step tasks that call the agent.
- [Vercel Daemons](/docs/daemons) run Mastra's background workers.
- [Vercel Passport](/docs/passport) signs visitors in so you can scope agent memory to each user.
- [Chat SDK](/docs/chat-sdk) connects the agent to Slack, Discord, or Microsoft Teams.

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
