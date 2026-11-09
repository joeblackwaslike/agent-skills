---
title: OpenAI Responses API with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/responses
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses/text-generation
  - /docs/ai-gateway/sdks-and-apis/responses/streaming
  - /docs/ai-gateway/sdks-and-apis/responses/tool-calling
  - /docs/ai-gateway/sdks-and-apis/responses/structured-outputs
summary: Use the OpenAI Responses API with AI Gateway to generate text, call tools, stream tokens, and more across any supported provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/responses.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "2f704060bab3cc7dd7747ded2570c6168c9f74a485f3f5088eac9c61ba15e131"
---

# OpenAI Responses API with AI Gateway

The [OpenAI Responses API](https://developers.openai.com/api/reference/responses/overview) is a modern alternative to the [Chat Completions API](/docs/ai-gateway/sdks-and-apis/openai-chat-completions). Point your OpenAI SDK to AI Gateway's base URL and use `provider/model` identifiers to route requests to OpenAI, Anthropic, Google, and more.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway supports OpenAI's Responses API](https://vercel.com/changelog/ai-gateway-supports-openais-responses-api)
- [Cat Jam is now available in stealth for free on AI Gateway](https://vercel.com/changelog/cat-jam-is-now-available-in-stealth-for-free-on-ai-gateway)
- [Claude Sonnet 5.5 now available on AI Gateway](https://vercel.com/changelog/claude-sonnet-5-5-now-available-on-ai-gateway)
- [Gemini 4 Argon now available on AI Gateway](https://vercel.com/changelog/gemini-4-argon-now-available-on-ai-gateway)
- [Glyph Cluster is now available in stealth for free on AI Gateway](https://vercel.com/changelog/glyph-cluster-is-now-available-in-stealth-for-free-on-ai-gateway)
- [Zero Data Retention on AI Gateway](https://vercel.com/blog/zdr-on-ai-gateway)
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [OpenAI Codex with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents/openai-codex) — Connect OpenAI Codex to AI Gateway with one CLI command, or configure it manually.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/responses.graph.md](/docs/ai-gateway/sdks-and-apis/responses.graph.md)
<!-- /docsgraph:related -->

## Base URL

```
https://ai-gateway.vercel.sh/v1
```

## Authentication

The Responses API supports the same authentication methods as the main AI Gateway:

- **API key**: Use your AI Gateway API key with the `Authorization: Bearer <token>` header
- **OIDC token**: Use your Vercel OIDC token with the `Authorization: Bearer <token>` header

You only need to use one of these forms of authentication. If an API key is specified it will take precedence over any OIDC token, even if the API key is invalid.

## Getting started

Set your SDK's base URL to AI Gateway and use your API key for authentication. See [Text generation](/docs/ai-gateway/sdks-and-apis/responses/text-generation) for a complete first request.

## Supported features

- [Text generation](/docs/ai-gateway/sdks-and-apis/responses/text-generation) - Generate text responses from prompts
- [Streaming](/docs/ai-gateway/sdks-and-apis/responses/streaming) - Stream tokens as they're generated
- [Tool calling](/docs/ai-gateway/sdks-and-apis/responses/tool-calling) - Define tools the model can call
- [Structured outputs](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs) - Constrain the response to a JSON schema
- [Reasoning](/docs/ai-gateway/sdks-and-apis/responses/reasoning) - Control how much a model thinks before answering
- [Images](/docs/ai-gateway/sdks-and-apis/responses/images) - Send images for analysis
- [Compaction](/docs/ai-gateway/sdks-and-apis/responses/compaction) - Compress a long conversation into a single item you carry forward

## Streaming

Set `stream: true` to receive tokens as they're generated. See [Streaming](/docs/ai-gateway/sdks-and-apis/responses/streaming).

### WebSocket mode

For agent loops that make many requests in a row, you can hold one connection open and send each turn as a frame instead of opening a new HTTP request per turn. See [Responses API over WebSocket](/docs/ai-gateway/sdks-and-apis/responses/websockets).

## Tool calling

Define tools in `tools` and the model returns `function_call` items you execute. See [Tool calling](/docs/ai-gateway/sdks-and-apis/responses/tool-calling).

## Structured output

Constrain the response to a JSON schema with `text.format`. See [Structured outputs](/docs/ai-gateway/sdks-and-apis/responses/structured-outputs).

## Reasoning

Set `reasoning.effort` to control how much the model thinks before answering. See [Reasoning](/docs/ai-gateway/sdks-and-apis/responses/reasoning).

## Compaction

`POST /v1/responses/compact` compresses a long conversation into a single `compaction` item for OpenAI models. Coding agents such as Codex call it automatically. See [Compaction](/docs/ai-gateway/sdks-and-apis/responses/compaction).

## Parameters

### Required

| Parameter | Type            | Description                                                                                 |
| --------- | --------------- | ------------------------------------------------------------------------------------------- |
| `model`   | string          | Model ID in `provider/model` format (e.g., `openai/gpt-6-astra`, `anthropic/claude-sonnet-5`) |
| `input`   | string or array | A text string or array of input items (messages, function calls, function call outputs)     |

### Optional

| Parameter              | Type             | Description                                                                                                                                                                                                   |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stream`               | boolean          | Stream tokens via server-sent events. Defaults to `false`                                                                                                                                                     |
| `max_output_tokens`    | integer          | Maximum number of tokens to generate                                                                                                                                                                          |
| `temperature`          | number           | Controls randomness (0-2). Lower values are more deterministic                                                                                                                                                |
| `top_p`                | number           | Nucleus sampling (0-1)                                                                                                                                                                                        |
| `presence_penalty`     | number           | Penalizes tokens that already appear in the text so far                                                                                                                                                       |
| `frequency_penalty`    | number           | Penalizes tokens based on their frequency in the text so far                                                                                                                                                  |
| `instructions`         | string           | System-level instructions for the model                                                                                                                                                                       |
| `tools`                | array            | Tool definitions for function calling                                                                                                                                                                         |
| `tool_choice`          | string or object | Tool selection: `auto`, `required`, `none`, or a specific function                                                                                                                                            |
| `parallel_tool_calls`  | boolean          | Allows the model to call multiple tools in a single turn                                                                                                                                                      |
| `allowed_tools`        | array            | Subset of tool names the model can use for this request                                                                                                                                                       |
| `reasoning`            | object           | Reasoning config with `effort` (`none`, `minimal`, `low`, `medium`, `high`, `xhigh`, `max`). OpenAI models also support `summary` (`detailed`, `auto`, `concise`) to receive a text summary of the model's reasoning |
| `text`                 | object           | Output format config, including `json_schema` and `json_object` for structured output                                                                                                                         |
| `truncation`           | string           | Truncation strategy for long inputs: `auto` or `disabled`                                                                                                                                                     |
| `previous_response_id` | string           | Continues a multi-turn conversation from a previous response. In [WebSocket mode](/docs/ai-gateway/sdks-and-apis/responses/websockets#multiple-turns-on-one-connection), pass the `response.id` from the previous turn's `response.completed` event on the same connection. Over HTTP, send the earlier turns in `input` instead. An HTTP response `id` that starts with `gen_` is an AI Gateway [generation ID](/docs/ai-gateway/sdks-and-apis/rest-api#look-up-a-generation), not the provider's response ID, so don't pass it as `previous_response_id` |
| `store`                | boolean          | Asks the provider to store the response. This takes effect only when the request uses [your own provider credentials](/docs/ai-gateway/authentication-and-byok/byok) and you haven't marked that key as [ZDR-compliant](/docs/ai-gateway/security-and-compliance/zdr#byok). When AI Gateway uses its own credentials for the provider, it sets `store` to `false` and the response reports `store: false`. AI Gateway has no endpoint to retrieve a stored response |
| `metadata`             | object           | Up to 16 key-value pairs for tracking (keys max 64 chars, values max 512 chars)                                                                                                                               |
| `caching`              | string           | Enables [automatic prompt caching](/docs/ai-gateway/models-and-providers/automatic-caching). Only `auto` is supported                                                                                          |
| `cache_anchor_items`   | integer          | Declares how many leading input items stay unchanged so automatic caching can add a stable-prefix [cache anchor](/docs/ai-gateway/models-and-providers/automatic-caching#cache-anchor)                           |
| `cache_ttl`            | string           | Sets the automatic [cache lifetime](/docs/ai-gateway/models-and-providers/automatic-caching#cache-lifetime). Accepts `5m` (five minutes) or `1h` (one hour) and requires `caching: 'auto'`                        |
| `prompt_cache_key`     | string           | Key to identify cached prompts (max 64 characters)                                                                                                                                                            |

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
    "type": "invalid_request_error",
    "message": "At least one user message is required in the input"
  }
}
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
