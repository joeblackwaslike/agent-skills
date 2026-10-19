---
title: OpenResponses API with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/openresponses
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses"
last_updated: 2026-09-08
type: reference
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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ae7ac540618e70601b89dd9aadd664002d0851bce48951a8271fc91e906f11b3"
---

# OpenResponses API with AI Gateway

AI Gateway supports the [OpenResponses API](https://openresponses.org) specification, an open standard for AI model interactions. OpenResponses provides a unified interface across providers with built-in support for streaming, tool calling, reasoning, and multi-modal inputs.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Service tiers now available on AI Gateway](https://vercel.com/changelog/service-tiers-now-available-on-ai-gateway)
- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway)
- [OpenResponses API now supported on Vercel AI Gateway](https://vercel.com/changelog/openresponses-api-now-supported-on-vercel-ai-gateway)
- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api)
- [OpenAI Responses API with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses) — Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported
- [OpenAI Responses Text Generation with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [AI Gateway Video Input](https://vercel.com/docs/ai-gateway/inputs-and-tools/video-input) — Analyze video clips with AI Gateway using AI SDK 7, Python, Chat Completions, and Responses / OpenResponses.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/openresponses.graph.md](/docs/ai-gateway/sdks-and-apis/openresponses.graph.md)
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

Generate a text response:

#### TypeScript

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
const message = result.output.find((item: { type: string }) => item.type === 'message');
for (const block of message.content) {
  if (block.type === 'output_text') console.log(block.text);
}
```

#### Python

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
for block in message.content:
    if block.type == "output_text":
        print(block.text)
```

#### cURL

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

## Parameters

### Required parameters

- `model` (string): The model ID in `provider/model` format (e.g., `openai/gpt-6-astra`, `anthropic/claude-opus-5`)
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
        models: ['anthropic/claude-opus-5', 'openai/gpt-6-astra'], // fallbacks
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
