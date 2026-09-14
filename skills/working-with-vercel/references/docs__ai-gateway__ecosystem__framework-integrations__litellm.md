---
title: LiteLLM with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/litellm
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "64fad3fc553791c74521988cee5a747f53e5b2b2aee05a88aff02b303acd7f1b"
---

# LiteLLM with AI Gateway

[LiteLLM](https://www.litellm.ai/) is an open-source library that provides a unified interface to call LLMs.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with LiteLLM to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [LiteLLM server now supported on Vercel](https://vercel.com/changelog/litellm-server-now-supported-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flitellm&source_site=vercel-docs&relationship=related)
- [LlamaIndex with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flitellm&source_site=vercel-docs&relationship=related) — Learn how to integrate Vercel AI Gateway with LlamaIndex to access multiple AI models through a unified interface.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flitellm&source_site=vercel-docs&relationship=related) — Use Vercel Sandbox with the agent frameworks, model SDKs, and coding agents you already work with.
- [LangChain with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flitellm&source_site=vercel-docs&relationship=related) — Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface.
- [Vercel LMNT Integration](https://vercel.com/docs/agent-resources/integrations-for-models/lmnt?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flitellm&source_site=vercel-docs&relationship=related) — Learn how to add LMNT connectable account integration with Vercel.
- [Pydantic AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flitellm&source_site=vercel-docs&relationship=related) — Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/litellm.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/litellm.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem%2Fframework-integrations%2Flitellm&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Getting started

- ### Create a new project
  First, create a new directory for your project:
  ```bash filename="terminal"
  mkdir litellm-ai-gateway
  cd litellm-ai-gateway
  ```

- ### Install dependencies
  Install the required LiteLLM Python package:
  ```bash filename="terminal" package-manager="pip"
  pip install litellm python-dotenv
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

- ### Create your LiteLLM application
  Create a new file called `main.py` with the following code:
  ```python filename="main.py" {16}
  import os
  import litellm
  from dotenv import load_dotenv

  load_dotenv()

  os.environ["VERCEL_AI_GATEWAY_API_KEY"] = os.getenv("VERCEL_AI_GATEWAY_API_KEY")

  # Define messages
  messages = [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Tell me about the food scene in San Francisco."}
  ]

  response = litellm.completion(
      model="vercel_ai_gateway/openai/gpt-6-astra",
      messages=messages
  )

  print(response.choices[0].message.content)
  ```
  The following code:
  - Uses LiteLLM's `completion` function to make requests through Vercel AI Gateway
  - Specifies the model using the `vercel_ai_gateway/` prefix
  - Makes a chat completion request and prints the response

- ### Running the application
  Run your Python application:
  ```bash filename="terminal"
  python main.py
  ```
  You should see a response from the AI model in your console.


---

[View full sitemap](/docs/sitemap)
