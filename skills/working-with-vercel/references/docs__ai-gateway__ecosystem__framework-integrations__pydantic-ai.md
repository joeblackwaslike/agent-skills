---
title: Pydantic AI
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4c2bb89f10eb7a424541a5b426ff810d0ac6d2d0a265ce91487c8252c43585c9"
---

# Pydantic AI

[Pydantic AI](https://ai.pydantic.dev/) is a Python agent framework
designed to make it easy to build production grade applications with AI.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with Pydantic AI to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [AI SDK for Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [Integrations for Models](https://vercel.com/docs/agent-resources/integrations-for-models?from=related) — Integrate powerful AI services and models seamlessly into your Vercel projects.
- [Adding a Model](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-model?from=related) — Learn how to add a new AI model to your Vercel projects
- [Integrations for Agents](https://vercel.com/docs/agent-resources/integrations-for-agents?from=related) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai.graph.md)
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
