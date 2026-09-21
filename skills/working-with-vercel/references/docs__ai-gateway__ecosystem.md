---
title: AI Gateway Ecosystem and Integrations
product: vercel
url: /docs/ai-gateway/ecosystem
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/ecosystem/framework-integrations/langchain
  - /docs/ai-gateway/ecosystem/framework-integrations/llamaindex
  - /docs/ai-gateway/ecosystem/framework-integrations/mastra
  - /docs/ai-gateway/ecosystem/framework-integrations/pydantic-ai
  - /docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai
summary: Connect frameworks, coding tools, and billing integrations to AI Gateway. Configure app attribution and explore integrations for your AI applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "2ac63ee9924f3fe8d58fbe565635bc22224b69a6024209f8bd000f5e33901e77"
---

# AI Gateway Ecosystem and Integrations

AI Gateway integrates with the AI development ecosystem you use. Whether you're building with LangChain, LlamaIndex, or other popular frameworks, connect through compatible APIs and get unified billing, observability, and model access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using TanStack AI with Vercel AI Gateway](https://vercel.com/kb/guide/tanstack-ai-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Connect TanStack AI to Vercel AI Gateway with the @tanstack/ai-vercel-gateway adapter to stream chat, route across provi
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [Build with AI on Vercel](https://vercel.com/docs/agent-resources/integrations-for-models?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Integrate powerful AI services and models seamlessly into your Vercel projects.
- [Python with AI Gateway: OpenAI and Anthropic SDKs](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Use AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fecosystem&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.

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
| [TanStack AI](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) | TypeScript/JS | Native adapter | Chat, embeddings, image generation |
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

### TanStack AI

Install `@tanstack/ai` and `@tanstack/ai-vercel-gateway`, then set `AI_GATEWAY_API_KEY` in your server environment. Use the native adapter to stream a chat response:

```ts filename="index.mts" framework=all
import { chat } from '@tanstack/ai';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';

const stream = chat({
  adapter: vercelGatewayText('anthropic/claude-opus-5'),
  messages: [{ role: 'user', content: 'Explain RAG in one sentence.' }],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

```js filename="index.mjs" framework=all
import { chat } from '@tanstack/ai';
import { vercelGatewayText } from '@tanstack/ai-vercel-gateway';

const stream = chat({
  adapter: vercelGatewayText('anthropic/claude-opus-5'),
  messages: [{ role: 'user', content: 'Explain RAG in one sentence.' }],
});

for await (const chunk of stream) {
  console.log(chunk);
}
```

The example logs stream events containing the model's response. Follow [TanStack AI with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) for installation, authentication, and run commands.

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

[App Attribution](/docs/ai-gateway/ecosystem/app-attribution) lets you identify your application in requests. When you include attribution headers, Vercel can feature your app, increasing visibility for your project.

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

Attribution is optional. Your requests work normally without these headers.

## Next steps

- [Set up LangChain](/docs/ai-gateway/ecosystem/framework-integrations/langchain)
- [Install the LlamaIndex package](/docs/ai-gateway/ecosystem/framework-integrations/llamaindex) for knowledge apps
- [Add app attribution](/docs/ai-gateway/ecosystem/app-attribution) to showcase your project
- [Set up Stripe billing](/docs/ai-gateway/ecosystem/stripe-billing) for usage-based pricing


---

[View full sitemap](/docs/sitemap)
