---
title: Advanced Configuration
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/models-and-providers/provider-filtering-and-ordering
  - /docs/ai-gateway/models-and-providers/provider-timeouts
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Configure provider options, model fallbacks, BYOK credentials, and prompt caching.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions/advanced.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "65c58446b564895fdb0e0ab74267464c9bbc7a773b6e90201ccb90e48fd90c21"
---

# Advanced Configuration

Control which providers serve your request, what happens when one fails, and how much of your prompt is cached between calls. For controlling how much a model thinks before answering, see [Reasoning](/docs/ai-gateway/sdks-and-apis/openai-chat-completions/reasoning).

## Provider options

The AI Gateway can route your requests across multiple AI providers for better reliability and performance. You can control which providers are used and in what order through the `providerOptions` parameter.

Example request

#### cURL

```bash filename="provider-options.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Tell me the history of the San Francisco Mission-style burrito in two paragraphs."
      }
    ],
    "stream": false,
    "providerOptions": {
      "gateway": {
        "order": [
          "vertex",
          "anthropic"
        ]
      }
    }
  }'
```

#### TypeScript

```typescript filename="provider-options.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content:
        'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.',
    },
  ],
  stream: false,
  // Provider options for gateway routing preferences
  providerOptions: {
    gateway: {
      order: ['vertex', 'anthropic'], // Try Vertex AI first, then Anthropic
    },
  },
});

console.log('Assistant:', completion.choices[0].message.content);
console.log('Tokens used:', completion.usage);
```

#### Python

```python filename="provider-options.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.'
        }
    ],
    stream=False,
    # Provider options for gateway routing preferences
    extra_body={
        'providerOptions': {
            'gateway': {
                'order': ['vertex', 'anthropic']  # Try Vertex AI first, then Anthropic
            }
        }
    }
)

print('Assistant:', completion.choices[0].message.content)
print('Tokens used:', completion.usage)
```

> **💡 Note:** **Provider routing:** In this example, the gateway will first attempt to use
> Vertex AI to serve the Claude model. If Vertex AI is unavailable or fails, it
> will fall back to Anthropic. Other providers are still available but will only
> be used after the specified providers.

## Model fallbacks

You can specify fallback models that will be tried in order if the primary model fails. There are two ways to do this:

### Option 1: Direct `models` field

The simplest way is to use the `models` field directly at the top level of your request:

#### cURL

```bash filename="model-fallbacks.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "models": [
      "anthropic/claude-opus-5",
      "google/gemini-3.6-flash"
    ],
    "messages": [
      {
        "role": "user",
        "content": "Write a haiku about TypeScript."
      }
    ],
    "stream": false
  }'
```

#### TypeScript

```typescript filename="model-fallbacks.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const completion = await openai.chat.completions.create({
  model: 'openai/gpt-5.6-sol', // Primary model
  // @ts-ignore - models is a gateway extension
  models: ['anthropic/claude-opus-5', 'google/gemini-3.6-flash'], // Fallback models
  messages: [
    {
      role: 'user',
      content: 'Write a haiku about TypeScript.',
    },
  ],
  stream: false,
});

console.log('Assistant:', completion.choices[0].message.content);

// Check which model was actually used
console.log('Model used:', completion.model);
```

#### Python

```python filename="model-fallbacks.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='openai/gpt-5.6-sol',  # Primary model
    messages=[
        {
            'role': 'user',
            'content': 'Write a haiku about TypeScript.'
        }
    ],
    stream=False,
    # models is a gateway extension for fallback models
    extra_body={
        'models': ['anthropic/claude-opus-5', 'google/gemini-3.6-flash']  # Fallback models
    }
)

print('Assistant:', completion.choices[0].message.content)

# Check which model was actually used
print('Model used:', completion.model)
```

### Option 2: Via provider options

Alternatively, you can specify model fallbacks through the `providerOptions.gateway.models` field:

#### cURL

```bash filename="model-fallbacks-provider-options.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "openai/gpt-5.6-sol",
    "messages": [
      {
        "role": "user",
        "content": "Write a haiku about TypeScript."
      }
    ],
    "stream": false,
    "providerOptions": {
      "gateway": {
        "models": [
          "anthropic/claude-opus-5",
          "google/gemini-3.6-flash"
        ]
      }
    }
  }'
```

#### TypeScript

```typescript filename="model-fallbacks-provider-options.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error
const completion = await openai.chat.completions.create({
  model: 'openai/gpt-5.6-sol', // Primary model
  messages: [
    {
      role: 'user',
      content: 'Write a haiku about TypeScript.',
    },
  ],
  stream: false,
  // Model fallbacks via provider options
  providerOptions: {
    gateway: {
      models: ['anthropic/claude-opus-5', 'google/gemini-3.6-flash'], // Fallback models
    },
  },
});

console.log('Assistant:', completion.choices[0].message.content);
console.log('Model used:', completion.model);
```

#### Python

```python filename="model-fallbacks-provider-options.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='openai/gpt-5.6-sol',  # Primary model
    messages=[
        {
            'role': 'user',
            'content': 'Write a haiku about TypeScript.'
        }
    ],
    stream=False,
    # Model fallbacks via provider options
    extra_body={
        'providerOptions': {
            'gateway': {
                'models': ['anthropic/claude-opus-5', 'google/gemini-3.6-flash']  # Fallback models
            }
        }
    }
)

print('Assistant:', completion.choices[0].message.content)
print('Model used:', completion.model)
```

> **💡 Note:** **Which approach to use:** Both methods achieve the same result. Use the
> direct `models` field (Option 1) for simplicity, or use `providerOptions`
> (Option 2) if you're already using provider options for other configurations.

Both configurations will:

1. Try the primary model (`openai/gpt-5.6-sol`) first
2. If it fails, try `anthropic/claude-opus-5`
3. If that also fails, try `google/gemini-3.6-flash`
4. Return the result from the first model that succeeds

## Streaming with provider options

Provider options work with streaming requests as well:

#### cURL

```bash filename="streaming-provider-options.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Tell me the history of the San Francisco Mission-style burrito in two paragraphs."
      }
    ],
    "stream": true,
    "providerOptions": {
      "gateway": {
        "order": [
          "vertex",
          "anthropic"
        ]
      }
    }
  }'
```

#### TypeScript

```typescript filename="streaming-provider-options.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error
const stream = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content:
        'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.',
    },
  ],
  stream: true,
  providerOptions: {
    gateway: {
      order: ['vertex', 'anthropic'],
    },
  },
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

#### Python

```python filename="streaming-provider-options.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.'
        }
    ],
    stream=True,
    extra_body={
        'providerOptions': {
            'gateway': {
                'order': ['vertex', 'anthropic']
            }
        }
    }
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end='', flush=True)
```

For more details about available providers and advanced provider configuration, see the [Provider Options documentation](/docs/ai-gateway/models-and-providers/provider-options).

## Provider sorting

Use the `sort` option to rank providers by cost, latency, or throughput. The gateway sorts the available providers by the chosen metric and tries them in that order.

| Value    | Description                                     | Direction            |
| -------- | ----------------------------------------------- | -------------------- |
| `'cost'` | Sort by estimated cost                          | Lowest cost first    |
| `'ttft'` | Sort by time to first token (median, in ms)     | Lowest latency first |
| `'tps'`  | Sort by tokens per second throughput (median)    | Highest first        |

You can pass `sort` through `providerOptions.gateway`:

#### cURL

```bash filename="sort-provider-options.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "messages": [
      {
        "role": "user",
        "content": "What is 2 + 2? Answer in one sentence."
      }
    ],
    "stream": false,
    "providerOptions": {
      "gateway": {
        "sort": "tps"
      }
    }
  }'
```

#### TypeScript

```typescript filename="sort-provider-options.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - providerOptions is a gateway extension
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'What is 2 + 2? Answer in one sentence.',
    },
  ],
  stream: false,
  providerOptions: {
    gateway: {
      sort: 'tps', // Use the highest throughput provider first
    },
  },
});

console.log('Assistant:', completion.choices[0].message.content);
```

#### Python

```python filename="sort-provider-options.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='anthropic/claude-sonnet-5',
    messages=[
        {
            'role': 'user',
            'content': 'What is 2 + 2? Answer in one sentence.'
        }
    ],
    stream=False,
    extra_body={
        'providerOptions': {
            'gateway': {
                'sort': 'tps'  # Use the highest throughput provider first
            }
        }
    }
)

print('Assistant:', completion.choices[0].message.content)
```

Or use the `provider` shorthand directly in the request body:

#### cURL

```bash filename="sort-provider-shorthand.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-5",
    "messages": [
      {
        "role": "user",
        "content": "What is 2 + 2? Answer in one sentence."
      }
    ],
    "stream": false,
    "provider": {
      "sort": "tps"
    }
  }'
```

#### TypeScript

```typescript filename="sort-provider-shorthand.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - provider is a gateway extension
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  messages: [
    {
      role: 'user',
      content: 'What is 2 + 2? Answer in one sentence.',
    },
  ],
  stream: false,
  provider: {
    sort: 'tps', // Use the highest throughput provider first
  },
});

console.log('Assistant:', completion.choices[0].message.content);
```

#### Python

```python filename="sort-provider-shorthand.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='anthropic/claude-sonnet-5',
    messages=[
        {
            'role': 'user',
            'content': 'What is 2 + 2? Answer in one sentence.'
        }
    ],
    stream=False,
    extra_body={
        'provider': {
            'sort': 'tps'  # Use the highest throughput provider first
        }
    }
)

print('Assistant:', completion.choices[0].message.content)
```

> **💡 Note:** The `provider` shorthand is equivalent to setting the same fields in `providerOptions.gateway`. If both are provided for the same option, they must resolve to the same value or the request will fail. For the full details on sorting behavior, metrics, and health interactions, see [Provider Filtering, Ordering & Sorting](/docs/ai-gateway/models-and-providers/provider-filtering-and-ordering#provider-sorting).

## Provider timeouts

You can set per-provider timeouts for BYOK credentials to trigger fast failover when a provider is slow to respond. Pass `providerTimeouts` in `providerOptions.gateway`:

```json
"providerOptions": {
  "gateway": {
    "providerTimeouts": {
      "byok": { "anthropic": 3000, "bedrock": 5000 }
    }
  }
}
```

For full details, limits, and response metadata, see [Provider Timeouts](/docs/ai-gateway/models-and-providers/provider-timeouts).

## Request-scoped BYOK (Bring Your Own Key)

You can pass your own provider credentials on a per-request basis using the `byok` option in `providerOptions.gateway`. This allows you to use your existing provider accounts and access private resources without configuring credentials in the gateway settings.

Example request

#### cURL

```bash filename="byok.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      { "role": "user", "content": "Hello, world!" }
    ],
    "providerOptions": {
      "gateway": {
        "byok": {
          "anthropic": [{ "apiKey": "'"$ANTHROPIC_API_KEY"'" }]
        }
      }
    }
  }'
```

#### TypeScript

```typescript filename="byok.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error - byok is a gateway extension
const completion = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'Hello, world!',
    },
  ],
  providerOptions: {
    gateway: {
      byok: {
        anthropic: [{ apiKey: process.env.ANTHROPIC_API_KEY }],
      },
    },
  },
});

console.log(completion.choices[0].message.content);
```

#### Python

```python filename="byok.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

completion = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'Hello, world!'
        }
    ],
    extra_body={
        'providerOptions': {
            'gateway': {
                'byok': {
                    'anthropic': [{'apiKey': os.getenv('ANTHROPIC_API_KEY')}]
                }
            }
        }
    }
)

print(completion.choices[0].message.content)
```

The `byok` option is a record where keys are provider slugs and values are arrays of credential objects. Each provider can have multiple credentials that are tried in order.

**Credential structure by provider:**

- **Anthropic**: `{ apiKey: string }`
- **OpenAI**: `{ apiKey: string }`
- **Google Vertex AI**: `{ project: string, location: string, googleCredentials: { privateKey: string, clientEmail: string } }`
- **Amazon Bedrock**: `{ accessKeyId: string, secretAccessKey: string, region?: string }`

For detailed credential parameters for each provider, see the [AI SDK providers documentation](https://ai-sdk.dev/providers/ai-sdk-providers).

**Multiple credentials example:**

```typescript
providerOptions: {
  gateway: {
    byok: {
      // Multiple credentials for the same provider (tried in order)
      vertex: [
        { project: 'proj-1', location: 'us-east5', googleCredentials: { privateKey: '...', clientEmail: '...' } },
        { project: 'proj-2', location: 'us-east5', googleCredentials: { privateKey: '...', clientEmail: '...' } },
      ],
      // Multiple providers
      anthropic: [{ apiKey: 'sk-ant-...' }],
    },
  },
},
```

> **💡 Note:** **Credential precedence:** When request-scoped BYOK credentials are provided,
> any cached BYOK credentials configured in the gateway settings are not
> considered. Requests may still fall back to system credentials if the provided
> credentials fail. For persistent BYOK configuration, see the [BYOK
> documentation](/docs/ai-gateway/authentication-and-byok/byok).

## Prompt caching

Anthropic Claude models support prompt caching, which can significantly reduce costs and latency for repeated prompts. You can enable caching automatically or manually.

### Automatic caching

Use `caching: 'auto'` in `providerOptions` to let AI Gateway automatically add cache markers for providers that require them (like Anthropic). For full details, supported providers, and examples, see [Automatic Caching](/docs/ai-gateway/models-and-providers/automatic-caching).

### Manual caching

For fine-grained control, you can manually mark content with `cache_control`:

#### cURL

```bash filename="manual-caching.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/chat/completions" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "messages": [
      {
        "role": "user",
        "content": "Analyze this document and summarize the key points.",
        "cache_control": {
          "type": "ephemeral"
        }
      }
    ]
  }'
```

#### TypeScript

```typescript filename="prompt-caching.ts"
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

const response = await openai.chat.completions.create({
  model: 'anthropic/claude-opus-5',
  messages: [
    {
      role: 'user',
      content: 'Analyze this document and summarize the key points.',
      cache_control: {
        type: 'ephemeral',
      },
    },
  ],
});

console.log(response.choices[0].message.content);
```

#### Python

```python filename="prompt-caching.py"
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'Analyze this document and summarize the key points.',
            'cache_control': {
                'type': 'ephemeral'
            }
        }
    ]
)

print(response.choices[0].message.content)
```

> **💡 Note:** **Cache control types:** The `ephemeral` cache type stores content for the
> duration of the session. This is useful for large system prompts, documents,
> or context that you want to reuse across multiple requests. Prompt caching
> works with Anthropic models across all supported providers (Anthropic, Vertex
> AI, and Bedrock). For more details, see [Anthropic's prompt caching
> documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).


---

[View full sitemap](/docs/sitemap)
