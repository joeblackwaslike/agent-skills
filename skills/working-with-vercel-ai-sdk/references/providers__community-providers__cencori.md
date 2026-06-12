---
source: "https://ai-sdk.dev/providers/community-providers/cencori.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "d747b1a21767201d226cde2e3ddbf94de644b394722cad939f340b3df07bcd4e"
---

# Cencori

[Cencori](https://cencori.com) is the unified infrastructure layer for AI applications. It provides built-in security, observability, and multi-provider support through a single API.

With Cencori, you get:

- **Multi-Provider Gateway**: Access OpenAI, Anthropic, Google Gemini, Mistral, DeepSeek, and more through one API
- **Built-in Security**: Automatic PII detection, prompt injection protection, and content filtering
- **Full Observability**: Complete audit logs, analytics, and cost tracking for every request
- **Transparent Pricing**: Credits-based billing with real-time cost visibility

## Setup

The Cencori provider is available in the `cencori` module. You can install it with:

<Tabs items={['pnpm', 'npm', 'yarn']}>
  <Tab>```bash pnpm add cencori ```</Tab>
  <Tab>```bash npm install cencori ```</Tab>
  <Tab>```bash yarn add cencori ```</Tab>
</Tabs>

## Provider Instance

To create a Cencori provider instance, use the `createCencori` function:

```ts
import { createCencori } from 'cencori/vercel';

const cencori = createCencori({
  apiKey: 'YOUR_CENCORI_API_KEY',
});
```

You can obtain your Cencori API key from the [Cencori Dashboard](https://cencori.com/dashboard).

### Environment Variable

Alternatively, you can set the `CENCORI_API_KEY` environment variable and use the default provider:

```ts
import { cencori } from 'cencori/vercel';

// Uses CENCORI_API_KEY environment variable
const model = cencori('gpt-4o');
```

## Language Models

Cencori provides access to language models from multiple providers. Use the provider function directly to create a model:

```ts
// OpenAI models
const gpt4o = cencori('gpt-4o');
const gpt4oMini = cencori('gpt-4o-mini');

// Anthropic models
const claude = cencori('claude-3-5-sonnet');
const opus = cencori('claude-3-opus');

// Google Gemini models
const gemini = cencori('gemini-2.5-flash');
const geminiPro = cencori('gemini-3.1-pro-preview');

// Other providers
const mistral = cencori('mistral-large');
const deepseek = cencori('deepseek-v3.2');
const grok = cencori('grok-4');
const llama = cencori('llama-3-70b');
```

You can find the full list of available models in the [Cencori Documentation](https://cencori.com/docs).

## Examples

Here are examples of using Cencori with the AI SDK:

### generateText

```ts
import { cencori } from 'cencori/vercel';
import { generateText } from 'ai';

const { text } = await generateText({
  model: cencori('gpt-4o'),
  prompt: 'What is Cencori?',
});

console.log(text);
```

### streamText

```ts
import { cencori } from 'cencori/vercel';
import { streamText } from 'ai';

const result = streamText({
  model: cencori('claude-3-5-sonnet'),
  prompt: 'Write a short story about AI safety.',
});

for await (const chunk of result.textStream) {
  console.log(chunk);
}
```

### Tool Calling

Cencori supports tool calling with all compatible models:

```ts
import { cencori } from 'cencori/vercel';
import { generateText, tool } from 'ai';
import { z } from 'zod';

const { text, toolCalls } = await generateText({
  model: cencori('gpt-4o'),
  prompt: 'What is the weather in San Francisco?',
  tools: {
    getWeather: tool({
      description: 'Get the weather for a location',
      parameters: z.object({
        location: z.string().describe('The city and state'),
      }),
      execute: async ({ location }) => {
        return { temperature: 72, condition: 'sunny', location };
      },
    }),
  },
});

console.log(text, toolCalls);
```

### Next.js Route Handler

```ts
import { cencori } from 'cencori/vercel';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: cencori('gemini-2.5-flash'),
    messages,
  });

  return result.toDataStreamResponse();
}
```

### useChat Hook

```tsx
'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role}: {m.content}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

## Advanced Features

Cencori offers several advanced features to enhance your AI applications:

1. **Built-in Security**: Every request passes through automatic safety filters including PII detection, prompt injection protection, and harmful content filtering. Requests that violate safety policies are blocked before reaching the model.

2. **Multi-Provider Routing**: Switch between 15+ AI providers (OpenAI, Anthropic, Google, Mistral, DeepSeek, xAI, and more) without changing your code. Cencori handles the routing automatically.

3. **Cost Tracking**: Real-time cost tracking and analytics for every request. View detailed breakdowns by model, provider, and project in your dashboard.

4. **Complete Audit Logs**: Every request is logged with full payloads, token usage, costs, and safety scores for compliance and debugging.

5. **Bring Your Own Keys (BYOK)**: Use your own API keys for each provider while still benefiting from Cencori's security and observability layer.

6. **Provider Failover**: Automatic failover to backup providers if your primary provider is unavailable.

For more information about these features and advanced configuration options, visit the [Cencori Documentation](https://cencori.com/docs).

## Provider Options

You can customize the provider with additional options:

```ts
import { createCencori } from 'cencori/vercel';

const cencori = createCencori({
  apiKey: 'YOUR_CENCORI_API_KEY',
  baseUrl: 'https://cencori.com', // Custom base URL (optional)
  headers: {
    // Custom headers (optional)
    'X-Custom-Header': 'value',
  },
});
```

### Model-Specific Options

You can also pass model-specific options:

```ts
const model = cencori('gpt-4o', {
  userId: 'user-123', // Track usage by user
});
```

## Additional Resources

- [Cencori Provider Repository](https://github.com/cencori/cencori)
- [Cencori Documentation](https://cencori.com/docs)
- [Cencori Dashboard](https://cencori.com/dashboard/organizations)
- [NPM Package](https://www.npmjs.com/package/cencori)


## Navigation

- [Writing a Custom Provider](/providers/community-providers/custom-providers)
- [A2A](/providers/community-providers/a2a)
- [ACP (Agent Client Protocol)](/providers/community-providers/acp)
- [Aihubmix](/providers/community-providers/aihubmix)
- [AI/ML API](/providers/community-providers/aimlapi)
- [Anthropic Vertex](/providers/community-providers/anthropic-vertex-ai)
- [Automatic1111](/providers/community-providers/automatic1111)
- [Azure AI](/providers/community-providers/azure-ai)
- [Browser AI](/providers/community-providers/browser-ai)
- [Claude Code](/providers/community-providers/claude-code)
- [Cloudflare AI Gateway](/providers/community-providers/cloudflare-ai-gateway)
- [Cloudflare Workers AI](/providers/community-providers/cloudflare-workers-ai)
- [Codex CLI](/providers/community-providers/codex-cli)
- [Crosshatch](/providers/community-providers/crosshatch)
- [Dify](/providers/community-providers/dify)
- [Firemoon](/providers/community-providers/firemoon)
- [FriendliAI](/providers/community-providers/friendliai)
- [Gemini CLI](/providers/community-providers/gemini-cli)
- [Helicone](/providers/community-providers/helicone)
- [Inflection AI](/providers/community-providers/inflection-ai)
- [Jina AI](/providers/community-providers/jina-ai)
- [LangDB](/providers/community-providers/langdb)
- [Letta](/providers/community-providers/letta)
- [llama.cpp](/providers/community-providers/llama-cpp)
- [LlamaGate](/providers/community-providers/llamagate)
- [MCP Sampling AI Provider](/providers/community-providers/mcp-sampling)
- [Mem0](/providers/community-providers/mem0)
- [MiniMax](/providers/community-providers/minimax)
- [Mixedbread](/providers/community-providers/mixedbread)
- [Ollama](/providers/community-providers/ollama)
- [OpenCode](/providers/community-providers/opencode-sdk)
- [OpenRouter](/providers/community-providers/openrouter)
- [Portkey](/providers/community-providers/portkey)
- [Qwen](/providers/community-providers/qwen)
- [React Native Apple](/providers/community-providers/react-native-apple)
- [Requesty](/providers/community-providers/requesty)
- [Runpod](/providers/community-providers/runpod)
- [SambaNova](/providers/community-providers/sambanova)
- [SAP AI Core](/providers/community-providers/sap-ai)
- [Sarvam](/providers/community-providers/sarvam)
- [Soniox](/providers/community-providers/soniox)
- [Spark](/providers/community-providers/spark)
- [Supermemory](/providers/community-providers/supermemory)
- [Voyage AI](/providers/community-providers/voyage-ai)
- [Zhipu AI (Z.AI)](/providers/community-providers/zhipu)
- [vectorstores](/providers/community-providers/vectorstores)
- [Codex CLI (App Server)](/providers/community-providers/codex-app-server)
- [Apertis](/providers/community-providers/apertis)
- [OLLM](/providers/community-providers/ollm)
- [Cencori](/providers/community-providers/cencori)
- [Hindsight](/providers/community-providers/hindsight)
- [Nia](/providers/community-providers/nia)
- [ZeroEntropy](/providers/community-providers/zeroentropy)
- [Flowise](/providers/community-providers/flowise)


[Full Sitemap](/sitemap.md)
