---
title: LiteLLM
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/litellm
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "07b26fd2106bca278619350fbc14a5249104f238d309c9d68c8ee14f0b909d86"
---

# LiteLLM

[LiteLLM](https://www.litellm.ai/) is an open-source library that provides a unified interface to call LLMs.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with LiteLLM to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [What is a Large Language Model \(LLM\)?](https://vercel.com/kb/guide/what-is-a-large-language-model?from=related) — Learn what Large Language Models \(LLMs\) are, how they work, and how you can use them to generate UI, debug code, and i
- [Deploying Chained OpenAI LLM Calls to Vercel with the Inngest SDK](https://vercel.com/kb/guide/chained-openai-llm-calls-vercel-inngest?from=related) — Discover how to deploy chained OpenAI LLMs \(GPT-4\) to Vercel using Inngest SDK for improved conversational AI, multi-t
- [LlamaIndex](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex?from=related) — Learn how to integrate Vercel AI Gateway with LlamaIndex to access multiple AI models through a unified interface
- [LangChain](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain?from=related) — Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface
- [LMNT](https://vercel.com/docs/agent-resources/integrations-for-models/lmnt?from=related) — Learn how to add LMNT connectable account integration with Vercel.
- [LangFuse](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse?from=related) — Learn how to integrate Vercel AI Gateway with LangFuse to access multiple AI models through a unified interface
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/litellm.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/litellm.graph.md)
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
      model="vercel_ai_gateway/openai/gpt-5.6-sol",
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
