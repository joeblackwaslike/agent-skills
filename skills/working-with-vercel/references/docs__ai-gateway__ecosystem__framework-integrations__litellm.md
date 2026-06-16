---
title: LiteLLM
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/litellm
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm"
last_updated: 2026-05-11
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "8d5413e408f7c2c0a8ba7c467b368c69bcfaae500af31acc1d3a6a8db804e2cb"
---

# LiteLLM

[LiteLLM](https://www.litellm.ai/) is an open-source library that provides a unified interface to call LLMs.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with LiteLLM to access various AI models and providers.

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
      model="vercel_ai_gateway/openai/gpt-5.5",
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
