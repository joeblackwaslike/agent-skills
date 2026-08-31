---
title: OpenResponses API
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/sdks-and-apis/openresponses/text-generation
  - /docs/ai-gateway/sdks-and-apis/openresponses/streaming
  - /docs/ai-gateway/sdks-and-apis/openresponses/tool-calling
  - /docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs
summary: Use the OpenResponses API specification with AI Gateway for a unified, provider-agnostic interface.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "a52378c2c88ad1ea987aaaf996b0b72f96a4bfca182481dc783bd76ff2e05a67"
---

# OpenResponses API

AI Gateway supports the [OpenResponses API](https://openresponses.org) specification, an open standard for AI model interactions. OpenResponses provides a unified interface across providers with built-in support for streaming, tool calling, reasoning, and multi-modal inputs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Service tiers now available on AI Gateway](https://vercel.com/changelog/service-tiers-now-available-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related)
- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related)
- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related)
- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related)
- [OpenAI Responses API](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [OpenAI Chat Completions API](https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-chat-completions?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related) — Use the OpenAI Chat Completions API with AI Gateway for seamless integration with existing tools and libraries.
- [Text Generation Quickstart](https://vercel.com/docs/ai-gateway/getting-started/text?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related) — Generate and stream text responses using AI Gateway.
- [Responses API over WebSocket](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/websockets?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related) — Keep a persistent connection open across turns with the OpenAI Responses API over WebSocket through AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fsdks-and-apis%2Fopenresponses&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Base URL

The OpenResponses-compatible API is available at:

```
https://ai-gateway.vercel.sh/v1
```

## Authentication

The OpenResponses API supports the same [authentication methods](/docs/ai-gateway/authentication-and-byok) as the main AI Gateway:

- **API key**: Use your AI Gateway API key with the `Authorization: Bearer <token>` header
- **OIDC token**: Use your Vercel OIDC token with the `Authorization: Bearer <token>` header

You only need to use one of these forms of authentication. If an API key is specified it will take precedence over any OIDC token, even if the API key is invalid.

## Supported features

The OpenResponses API supports the following features:

- [Text generation](/docs/ai-gateway/sdks-and-apis/openresponses/text-generation) - Generate text responses from prompts
- [Streaming](/docs/ai-gateway/sdks-and-apis/openresponses/streaming) - Stream tokens as they're generated
- [Tool calling](/docs/ai-gateway/sdks-and-apis/openresponses/tool-calling) - Define tools the model can call
- [Structured outputs](/docs/ai-gateway/sdks-and-apis/openresponses/structured-outputs) - Constrain the response to a JSON schema
- [Reasoning](/docs/ai-gateway/sdks-and-apis/openresponses/reasoning) - Control how much a model thinks before answering
- [Images](/docs/ai-gateway/sdks-and-apis/openresponses/images) - Send images for analysis
- [Advanced](/docs/ai-gateway/sdks-and-apis/openresponses/advanced) - Configure model fallbacks and provider-specific settings

## Getting started

Here's a simple example to generate a text response:

#### \['cURL'

```bash filename="quickstart.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "What is the capital of France?"
      }
    ]
  }'
```

#### 'TypeScript'

```typescript filename="quickstart.ts"
const apiKey = process.env.AI_GATEWAY_API_KEY;

const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-opus-5',
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'What is the capital of France?',
      },
    ],
  }),
});

const result = await response.json();
const message = result.output.find((item) => item.type === 'message');
console.log(message.content[0].text);
```

#### 'Python']

```python filename="quickstart.py"
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.responses.create(
    model='anthropic/claude-opus-5',
    input=[
        {
            'type': 'message',
            'role': 'user',
            'content': 'What is the capital of France?',
        },
    ],
)

message = next(item for item in response.output if item.type == 'message')
print(message.content[0].text)
```

## Parameters

### Required parameters

- `model` (string): The model ID in `provider/model` format (e.g., `openai/gpt-5.6-sol`, `anthropic/claude-opus-5`)
- `input` (array): Array of message objects containing `type`, `role`, and `content` fields

### Optional parameters

- `stream` (boolean): Stream the response. Defaults to `false`
- `temperature` (number): Controls randomness. Range: 0-2
- `top_p` (number): Nucleus sampling. Range: 0-1
- `max_output_tokens` (integer): Maximum tokens to generate
- `tools` (array): Tool definitions for function calling
- `tool_choice` (string): Tool selection mode: `auto`, `required`, or `none`
- `reasoning` (object): Reasoning configuration with `effort` level
- `providerOptions` (object): Provider-specific options for gateway configuration

### Example with parameters

This example shows how to combine multiple parameters to control the model's behavior, set up fallbacks, and enable reasoning.

```typescript filename="parameters-example.ts"
const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'anthropic/claude-opus-5', // provider/model format
    input: [
      {
        type: 'message',
        role: 'user',
        content: 'Explain neural networks.',
      },
    ],
    stream: true, // stream tokens as generated
    max_output_tokens: 500, // limit response length
    reasoning: {
      effort: 'medium', // reasoning depth
    },
    providerOptions: {
      gateway: {
        models: ['anthropic/claude-opus-5', 'openai/gpt-5.6-sol'], // fallbacks
      },
    },
  }),
});
```

## Error handling

The API returns standard HTTP status codes and error responses.

### Common error codes

- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Invalid or missing authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Model or endpoint not found
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

### Error response format

When an error occurs, the API returns a JSON object with details about what went wrong.

```json
{
  "error": {
    "message": "Invalid request: missing required parameter 'model'",
    "type": "invalid_request_error",
    "param": "model",
    "code": "missing_parameter"
  }
}
```


---

[View full sitemap](/docs/sitemap)
