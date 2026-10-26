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
  - /docs/ai-sdk
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with Mastra to access multiple AI models through a unified interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/mastra.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b7ccd297b8112f372b1a0e42489403d561782f6f60a3cce8324279d92956dbc1"
---

# Mastra with AI Gateway

[Mastra](https://mastra.ai) is a framework for building and deploying AI-powered features
using a modern JavaScript stack powered by the [Vercel AI SDK](/docs/ai-sdk).
Integrating with AI Gateway provides unified model management and routing capabilities.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Pydantic AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai) — Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface.
- [Mistral Vibe with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/vibe) — Connect Mistral Vibe to AI Gateway with the Vercel CLI or a TOML provider and model shortlist.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/mastra.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/mastra.graph.md)
<!-- /docsgraph:related -->

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
  your [Vercel AI Gateway API key](/docs/ai-gateway#using-the-ai-gateway-with-an-api-key):
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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
