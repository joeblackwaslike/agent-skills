---
title: LlamaIndex with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/llamaindex
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/ai-gateway
summary: Learn how to integrate Vercel AI Gateway with LlamaIndex to access multiple AI models through a unified interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "3b2f666ab7c9cda6af5a114fbe16586b078dfff7969487f1122cc5790675a331"
---

# LlamaIndex with AI Gateway

[LlamaIndex](https://www.llamaindex.ai/) connects large language models (LLMs) to your enterprise data to build knowledge assistants. Connect LlamaIndex to [AI Gateway](/docs/ai-gateway) to use its model catalog and provider routing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [LlamaGate](https://ai-sdk.dev/providers/community-providers/llamagate) — LlamaGate Provider for the AI SDK
- [LlamaIndex](https://ai-sdk.dev/providers/adapters/llamaindex) — Learn how to use LlamaIndex with the AI SDK.
- [What is a Large Language Model \\(LLM\\)?](https://vercel.com/kb/guide/what-is-a-large-language-model) — Learn what Large Language Models \\(LLMs\\) are, how they work, and how you can use them to generate UI, debug code, and i
- [AI models](https://v0.app/docs/ai-models) — Add AI functionality to your v0 projects by integrating AI models and platforms.
- [LiteLLM with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X
- [Vercel Deep Infra Integration](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra) — Learn how to add the Deep Infra native integration with Vercel.
- [Vercel xAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/xai) — Learn how to add the xAI native integration with Vercel.

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
  - Configures the model to use Anthropic's Claude Opus 5 (`anthropic/claude-opus-5`) through AI Gateway
  - Creates a chat message and streams the response

- ### Running the application
  Run your application using Python:
  ```bash filename="terminal"
  python main.py
  ```
  You should see a streaming response from the AI model.


---

[View full sitemap](/docs/sitemap)
