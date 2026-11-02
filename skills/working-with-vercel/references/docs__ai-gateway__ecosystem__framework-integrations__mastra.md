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
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/mastra.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "c2d6d19af61b81a98380a75afbc1329a17e3e8dd9a63fc653d306d904490b0f5"
---

# Mastra with AI Gateway

[Mastra](/docs/frameworks/agents/mastra) is a framework for building and deploying AI-powered features
using a modern JavaScript stack powered by the [Vercel AI SDK](/docs/ai-sdk).
Integrating with AI Gateway provides unified model management and routing capabilities.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Build a Software Factory with Mastra](https://vercel.com/docs/agent-resources/software-factory/mastra) — Combine Mastra workflow stages with AI Gateway, Vercel Sandbox, and GitHub Tools to prepare reviewed changes.
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
