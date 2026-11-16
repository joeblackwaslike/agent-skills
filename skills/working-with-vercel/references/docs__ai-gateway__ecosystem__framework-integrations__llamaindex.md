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
  - /docs/ai-gateway/authentication-and-byok
summary: Learn how to integrate Vercel AI Gateway with LlamaIndex to access multiple AI models through a unified interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "893873631c42719de500c45cbc509b778df3c1c8ce27e5fcc29780e0bff9e5a2"
---

# LlamaIndex with AI Gateway

[LlamaIndex](https://www.llamaindex.ai/) connects large language models (LLMs) to your enterprise data to build knowledge assistants. Connect LlamaIndex to [AI Gateway](/docs/ai-gateway) to use its model catalog and provider routing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [What is a Large Language Model \\(LLM\\)?](https://vercel.com/kb/guide/what-is-a-large-language-model) — Learn what Large Language Models \\(LLMs\\) are, how they work, and how you can use them to generate UI, debug code, and i
- [LiteLLM with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm) — Learn how to integrate Vercel AI Gateway with LiteLLM to access multiple AI models through a unified interface.
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Pydantic AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai) — Learn how to integrate Vercel AI Gateway with Pydantic AI to access multiple AI models through a unified interface.
- [LangChain with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain) — Learn how to integrate Vercel AI Gateway with LangChain to access multiple AI models through a unified interface.
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X

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
  Create a `.env` file with your [Vercel AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys):
  ```bash filename=".env"
  AI_GATEWAY_API_KEY=your-api-key-here
  ```
  > **💡 Note:** If you're using the [AI Gateway from within a Vercel
  > deployment](/docs/ai-gateway/authentication-and-byok#oidc-tokens),
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
