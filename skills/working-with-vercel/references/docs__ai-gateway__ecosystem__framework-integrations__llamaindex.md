---
title: LlamaIndex
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/llamaindex
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with LlamaIndex to access multiple AI models through a unified interface
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "383897da56177071594cb5373b9fc88a91cc247fb37e8ab8197ae748c8dcd4ea"
---

# LlamaIndex

[LlamaIndex](https://www.llamaindex.ai/) makes it simple to
build knowledge assistants using LLMs connected to your enterprise data.
This guide demonstrates how to integrate [Vercel AI Gateway](/docs/ai-gateway)
with LlamaIndex to access various AI models and providers.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [LlamaGate](https://ai-sdk.dev/providers/community-providers/llamagate?from=related)
- [LlamaIndex](https://ai-sdk.dev/providers/adapters/llamaindex?from=related)
- [What is a Large Language Model \(LLM\)?](https://vercel.com/kb/guide/what-is-a-large-language-model?from=related) — Learn what Large Language Models \(LLMs\) are, how they work, and how you can use them to generate UI, debug code, and i
- [LiteLLM](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm?from=related) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface
- [LangChain](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain?from=related) — Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface
- [LangFuse](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse?from=related) — Learn how to integrate Vercel AI Gateway with LangFuse to access multiple AI models through a unified interface
- [Adding a Model](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-model?from=related) — Learn how to add a new AI model to your Vercel projects
- [LibreChat](https://vercel.com/docs/ai-gateway/chat-platforms/librechat?from=related) — Use LibreChat with the AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/llamaindex.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/llamaindex.graph.md)
<!-- /docsgraph:related -->

## Getting started

- ### Create a new project
  First, create a new directory for your project and initialize it:
  ```bash filename="terminal"
  mkdir llamaindex-ai-gateway
  cd llamaindex-ai-gateway
  ```

- ### Install dependencies
  Install the required LlamaIndex packages along with the `python-dotenv` package:
  ```bash filename="terminal"
  pip install llama-index-llms-vercel-ai-gateway llama-index python-dotenv
  ```

- ### Configure environment variables
  Create a `.env` file with your [Vercel AI Gateway API key](/docs/ai-gateway#using-the-ai-gateway-with-an-api-key):
  ```bash filename=".env"
  AI_GATEWAY_API_KEY=your-api-key-here
  ```
  > **💡 Note:** If you're using the [AI Gateway from within a Vercel
  > deployment](/docs/ai-gateway#using-the-ai-gateway-with-a-vercel-oidc-token),
  > you can also use the `VERCEL_OIDC_TOKEN` environment variable which will be
  > automatically provided.

- ### Create your LlamaIndex application
  Create a new file called `main.py` with the following code:
  ```python filename="main.py" {2, 8, 12}
  from dotenv import load_dotenv
  from llama_index.llms.vercel_ai_gateway import VercelAIGateway
  from llama_index.core.llms import ChatMessage
  import os

  load_dotenv()

  llm = VercelAIGateway(
      api_key=os.getenv("AI_GATEWAY_API_KEY"),
      max_tokens=200000,
      context_window=64000,
      model="anthropic/claude-opus-5",
  )

  message = ChatMessage(role="user", content="Tell me a story in 250 words")
  resp = llm.stream_chat([message])
  for r in resp:
      print(r.delta, end="")
  ```
  The following code:
  - Initializes a `VercelAIGateway` LLM instance with your API key
  - Configures the model to use Anthropic's Claude 4 Sonnet via the AI Gateway
  - Creates a chat message and streams the response

- ### Running the application
  Run your application using Python:
  ```bash filename="terminal"
  python main.py
  ```
  You should see a streaming response from the AI model.


---

[View full sitemap](/docs/sitemap)
