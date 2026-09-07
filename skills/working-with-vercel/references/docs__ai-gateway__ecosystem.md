---
title: Ecosystem
product: vercel
url: /docs/ai-gateway/ecosystem
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/ecosystem/framework-integrations/langchain
  - /docs/ai-gateway/ecosystem/framework-integrations/llamaindex
  - /docs/ai-gateway/ecosystem/framework-integrations/mastra
  - /docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai
  - /docs/ai-gateway/ecosystem/framework-integrations/litellm
summary: Explore community framework integrations and ecosystem features for the AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "28a173270777fa94ebe35fcbe1bb53eb551359b42f0f0df952e2d506521db15b"
---

# Ecosystem

AI Gateway integrates with the AI development ecosystem you use. Whether you're building with LangChain, LlamaIndex, or other popular frameworks, connect through compatible APIs and get unified billing, observability, and model access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Create an AI Gateway API key, make your first request with TypeScript, Python, or cURL, and verify how the request was r
- [Build with AI on Vercel](https://vercel.com/docs/agent-resources/integrations-for-models?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Integrate powerful AI services and models seamlessly into your Vercel projects.
- [Chat Platforms](https://vercel.com/docs/ai-gateway/chat-platforms?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Configure AI chat platforms to use the AI Gateway for unified model access and spend monitoring.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [Vercel & OpenAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Integrate your Vercel project with OpenAI's powerful suite of models.

Full cross-link map for this page: [/docs/ai-gateway/ecosystem.graph.md](/docs/ai-gateway/ecosystem.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Framework integrations

These popular frameworks work through Chat Completions endpoints or native integrations:

| Framework                                                                    | Language   | Integration type | Use case                             |
| ---------------------------------------------------------------------------- | ---------- | ---------------- | ------------------------------------ |
| [LangChain](/docs/ai-gateway/ecosystem/framework-integrations/langchain)     | Python/JS  | Chat Completions | Chains, agents, RAG pipelines        |
| [LlamaIndex](/docs/ai-gateway/ecosystem/framework-integrations/llamaindex)   | Python     | Native package   | Knowledge assistants, document Q\&A   |
| [Mastra](/docs/ai-gateway/ecosystem/framework-integrations/mastra)           | TypeScript | Native           | AI workflows and agents              |
| [Pydantic AI](/docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai) | Python     | Native           | Type-safe agents, structured outputs |
| [LiteLLM](/docs/ai-gateway/ecosystem/framework-integrations/litellm)         | Python     | Native prefix    | Unified LLM interface                |
| [Langfuse](/docs/ai-gateway/ecosystem/framework-integrations/langfuse)       | Any        | Observability    | LLM analytics and tracing            |

### LangChain

Connect LangChain through the Chat Completions endpoint:

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="anthropic/claude-opus-5",
    api_key=os.getenv("AI_GATEWAY_API_KEY"),
    base_url="https://ai-gateway.vercel.sh/v1"
)

response = llm.invoke("Explain RAG in one sentence")
```

### LlamaIndex

Use the dedicated `llama-index-llms-vercel-ai-gateway` package:

```bash
pip install llama-index-llms-vercel-ai-gateway
```

```python
from llama_index.llms.vercel_ai_gateway import VercelAIGateway

llm = VercelAIGateway(
    model="anthropic/claude-opus-5",
    api_key=os.getenv("AI_GATEWAY_API_KEY")
)
```

### Pydantic AI

Pydantic AI has a native `VercelProvider` for type-safe AI agents:

```python
from pydantic_ai import Agent
from pydantic_ai.providers.vercel import VercelProvider

agent = Agent(
    VercelProvider(model="anthropic/claude-opus-5"),
    system_prompt="You are a helpful assistant"
)

result = agent.run_sync("What is the capital of France?")
```

See the [Framework Integrations documentation](/docs/ai-gateway/ecosystem/framework-integrations) for complete setup guides.

## Stripe billing

[Stripe Billing](/docs/ai-gateway/ecosystem/stripe-billing) integrates Stripe's metered billing with AI Gateway. Add two headers to your requests and the gateway automatically emits meter events for input and output tokens on every successful response.

```typescript
const gateway = createGateway({
  headers: {
    'stripe-customer-id': process.env.STRIPE_CUSTOMER_ID,
    'stripe-restricted-access-key': process.env.STRIPE_RESTRICTED_ACCESS_KEY,
  },
});
```

Works with the AI SDK, OpenAI Chat Completions API, and Anthropic Messages API. See the [Stripe Billing guide](/docs/ai-gateway/ecosystem/stripe-billing) for full setup instructions.

## App attribution

[App Attribution](/docs/ai-gateway/ecosystem/app-attribution) lets you identify your application in requests. When you include attribution headers, Vercel can feature your app—increasing visibility for your project.

Add attribution to your requests:

```typescript
const response = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'X-Vercel-AI-App-Name': 'My AI App',
    'X-Vercel-AI-App-Url': 'https://myaiapp.com',
  },
  // ... request body
});
```

Attribution is optional—your requests work normally without these headers.

## Next steps

- [Set up LangChain](/docs/ai-gateway/ecosystem/framework-integrations/langchain)
- [Install the LlamaIndex package](/docs/ai-gateway/ecosystem/framework-integrations/llamaindex) for knowledge apps
- [Add app attribution](/docs/ai-gateway/ecosystem/app-attribution) to showcase your project
- [Set up Stripe billing](/docs/ai-gateway/ecosystem/stripe-billing) for usage-based pricing


---

[View full sitemap](/docs/sitemap)
