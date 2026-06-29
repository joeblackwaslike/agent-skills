---
title: Mastra
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/mastra
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/mastra"
last_updated: 2026-06-11
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-sdk
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with Mastra to access multiple AI models through a unified interface
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/mastra.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "e5c93f7336544d9179a0a68f0348313d49c2236b1afa84e9046a4e5047d16cd7"
---

# Mastra

[Mastra](https://mastra.ai) is a framework for building and deploying AI-powered features
using a modern JavaScript stack powered by the [Vercel AI SDK](/docs/ai-sdk).
Integrating with AI Gateway provides unified model management and routing capabilities.

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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @ai-sdk/gateway mastra @mastra/core @mastra/memory
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @ai-sdk/gateway mastra @mastra/core @mastra/memory
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @ai-sdk/gateway mastra @mastra/core @mastra/memory
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @ai-sdk/gateway mastra @mastra/core @mastra/memory
      ```
    </Code>
  </CodeBlock>

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
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i 
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i 
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i 
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i 
      ```
    </Code>
  </CodeBlock>
  Open the [Mastra API](https://mastra.ai/reference) to test your agents, workflows, and tools.


---

[View full sitemap](/docs/sitemap)
