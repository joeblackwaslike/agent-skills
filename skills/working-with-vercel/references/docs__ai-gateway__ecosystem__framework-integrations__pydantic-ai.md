---
title: Pydantic AI with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "c0847b82b5708877a8b2e098bab45186cce838f01d4dcca991d61a3fa25c5f14"
---

# Pydantic AI with AI Gateway

Build Python agents with [Pydantic AI](https://ai.pydantic.dev/) and connect them to [AI Gateway](/docs/ai-gateway) for access to its model catalog and provider routing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fpydantic-ai&source_site=vercel-docs&relationship=related) — Use Vercel Sandbox with the agent frameworks, model SDKs, and coding agents you already work with.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fpydantic-ai&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fpydantic-ai&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Pi with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/pi?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fpydantic-ai&source_site=vercel-docs&relationship=related) — Connect Pi to AI Gateway with one CLI command, or configure it manually.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fpydantic-ai&source_site=vercel-docs&relationship=related) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Fpydantic-ai&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Getting started

- ### Create a new project
  First, create a new directory for your project and initialize it:
  ```bash filename="terminal"
  mkdir pydantic-ai-gateway
  cd pydantic-ai-gateway
  ```

- ### Install dependencies
  Install the required Pydantic AI packages along with the `python-dotenv` package:
  ```bash filename="terminal"
  pip install pydantic-ai python-dotenv
  ```

- ### Configure environment variables
  Create a `.env` file with your [Vercel AI Gateway API key](/docs/ai-gateway#using-the-ai-gateway-with-an-api-key):
  ```bash filename=".env"
  VERCEL_AI_GATEWAY_API_KEY=your-api-key-here
  ```
  > **💡 Note:** If you're using the [AI Gateway from within a Vercel
  > deployment](/docs/ai-gateway#using-the-ai-gateway-with-a-vercel-oidc-token),
  > you can also use the `VERCEL_OIDC_TOKEN` environment variable which will be
  > automatically provided.

- ### Create your Pydantic AI application
  Create a new file called `main.py` with the following code:
  ```python filename="main.py" {5, 16}
  from dotenv import load_dotenv
  from pydantic import BaseModel
  from pydantic_ai import Agent
  from pydantic_ai.models.openai import OpenAIModel
  from pydantic_ai.providers.vercel import VercelProvider

  load_dotenv()

  class CityInfo(BaseModel):
      city: str
      country: str
      population: int
      famous_for: str

  agent = Agent(
      OpenAIModel('anthropic/claude-opus-5', provider=VercelProvider()),
      output_type=CityInfo,
      system_prompt='Provide accurate city information.'
  )

  if __name__ == '__main__':
      cities = ["Tokyo", "Paris", "New York"]

      for city in cities:
          result = agent.run_sync(f'Tell me about {city}')
          info = result.output

          print(f"City: {info.city}")
          print(f"Country: {info.country}")
          print(f"Population: {info.population:,}")
          print(f"Famous for: {info.famous_for}")
          print("-" * 5)
  ```
  The following code:
  - Defines a `CityInfo` Pydantic model for structured output
  - Uses the `VercelProvider` to route requests through the AI Gateway
  - Handles the response data using Pydantic's type validation

- ### Running the application
  Run your application using Python:
  ```bash filename="terminal"
  python main.py
  ```
  You should see structured city information for Tokyo, Paris, and New York displayed in your console.


---

[View full sitemap](/docs/sitemap)
