---
title: Anthropic Messages API with AI Gateway
product: vercel
url: /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
canonical_url: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api"
last_updated: 2026-09-18
type: reference
prerequisites:
  - /docs/ai-gateway/sdks-and-apis
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/coding-agents/claude-code
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning
summary: Use the Anthropic Messages API with AI Gateway. Configure authentication and send requests with streaming, tools, images, and extended thinking.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-messages-api.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "7d9c9c13d606faef4744bf46f48d644c02858bf473e856699283bc7b8d31f0b2"
---

# Anthropic Messages API with AI Gateway

AI Gateway provides Anthropic Messages API endpoints, so you can use the Anthropic SDK and tools like [Claude Code](https://www.claude.com/product/claude-code) through a unified gateway with only a URL change.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Cat Jam is now available in stealth for free on AI Gateway](https://vercel.com/changelog/cat-jam-is-now-available-in-stealth-for-free-on-ai-gateway)
- [Claude Sonnet 5.5 now available on AI Gateway](https://vercel.com/changelog/claude-sonnet-5-5-now-available-on-ai-gateway)
- [Fast mode for Opus 4.7 available on AI Gateway](https://vercel.com/changelog/fast-mode-for-opus-4-7-available-on-ai-gateway)
- [Gemini 4 Argon now available on AI Gateway](https://vercel.com/changelog/gemini-4-argon-now-available-on-ai-gateway)
- [Kimi K3.1 Pro and Kimi K3.1 Pro Highspeed are available now in AI Gateway](https://vercel.com/changelog/kimi-k3-1-pro-and-kimi-k3-1-pro-highspeed-are-available-now-in-ai-gateway)
- [Anthropic](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic) — Learn how to use Anthropic with AI Gateway and the direct provider.
- [Dynamic Prompt Caching](https://ai-sdk.dev/cookbook/node/dynamic-prompt-caching) — Learn how to reduce API costs by implementing dynamic prompt caching for Anthropic models using cache control directives
- [Build Claude Managed Agents with Chat SDK](https://vercel.com/kb/guide/claude-managed-agents-chat-sdk) — Ship a Slack research bot built on Claude Managed Agents and Chat SDK. One persistent session per thread, streamed brief
- [Claude Platform on AWS](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic-aws) — Learn how to use Claude Platform on AWS with AI Gateway and the direct provider.
- [Build Claude Managed Agents with Vercel Services](https://vercel.com/kb/guide/claude-managed-agents-vercel-services) — Deploy Claude Managed Agents with Vercel Services to run a streaming research analyst in a browser chat, using Anthropic
- [AI Gateway Anthropic Reasoning](https://vercel.com/docs/ai-gateway/models-and-providers/reasoning/anthropic) — Configure adaptive and extended thinking for Anthropic Claude models with the AI SDK and AI Gateway.
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.

Full cross-link map for this page: [/docs/ai-gateway/sdks-and-apis/anthropic-messages-api.graph.md](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api.graph.md)
<!-- /docsgraph:related -->

The Anthropic Messages API implements the same specification as the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages).

For more on using AI Gateway with Claude Code, see the [Claude Code instructions](/docs/ai-gateway/coding-agents/claude-code).

## Base URL

The Anthropic Messages API is available at the following base URL:

```
https://ai-gateway.vercel.sh
```

## Authentication

The Anthropic Messages API supports the same authentication methods as the main AI Gateway:

- **API key**: Use your AI Gateway API key with the `x-api-key` header or `Authorization: Bearer <token>` header
- **OIDC token**: Use your Vercel OIDC token with the `Authorization: Bearer <token>` header

You only need to use one of these forms of authentication. If an API key is specified it will take precedence over any OIDC token, even if the API key is invalid.

## Supported endpoints

The AI Gateway supports the following Anthropic Messages API endpoints:

- [`POST /v1/messages`](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/messages) - Create messages, with support for [streaming](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/streaming), [tool calling](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/tool-calling), [extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning), [structured outputs](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs), and [images](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/images)
- `POST /v1/messages/count_tokens` - [Count tokens](https://docs.anthropic.com/en/docs/build-with-claude/token-counting) in a message before sending it to Claude, for managing context windows and costs

* [`POST /v1/messages/batches`](#message-batches) - Create a message batch
* [`GET /v1/messages/batches`](#message-batches) - List message batches
* [`GET /v1/messages/batches/{batch_id}`](#message-batches) - Retrieve a message batch
* [`GET /v1/messages/batches/{batch_id}/results`](#message-batches) - Read message batch results

For advanced features, see:

- [Extended thinking](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/reasoning) - Configure how much Claude thinks before answering
- [Advanced features](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/advanced) - Web search, provider timeouts, and automatic caching
- [Structured outputs](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api/structured-outputs) - JSON Schema-constrained responses

## Configuring Claude Code

[Claude Code](https://code.claude.com/docs) is Anthropic's agentic coding tool. You can configure it to use Vercel AI Gateway, enabling you to:

- Route requests through multiple AI providers
- Monitor traffic and spend in your AI Gateway Overview
- View detailed traces in Vercel Observability under AI
- Use any model available through the gateway

- ### Configure environment variables
  Configure Claude Code to use the AI Gateway by setting these [environment variables](https://code.claude.com/docs/en/settings#environment-variables):

  | Variable               | Value                          |
  | ---------------------- | ------------------------------ |
  | `ANTHROPIC_BASE_URL`   | `https://ai-gateway.vercel.sh` |
  | `ANTHROPIC_AUTH_TOKEN` | Your AI Gateway API key        |
  | `ANTHROPIC_API_KEY`    | `""` (empty string)            |
  > **💡 Note:** Setting `ANTHROPIC_API_KEY` to an empty string is important. Claude Code
  > checks this variable first, and if it's set to a non-empty value, it will use
  > that instead of `ANTHROPIC_AUTH_TOKEN`.
  #### Option 1: Shell alias (simplest)
  Add this alias to your `~/.zshrc` (or `~/.bashrc`):
  ```bash
  alias claude-vercel='ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh" ANTHROPIC_AUTH_TOKEN="your-api-key-here" ANTHROPIC_API_KEY="" claude'
  ```
  Then reload your shell. If you added the alias to `~/.bashrc`, run `source ~/.bashrc` instead:
  ```bash
  source ~/.zshrc
  ```
  #### Option 2: Wrapper script
  For more flexibility (e.g., adding additional logic), create a wrapper script at `~/bin/claude-vercel`:
  ```bash filename="claude-vercel"
  #!/usr/bin/env bash
  # Routes Claude Code through Vercel AI Gateway

  ANTHROPIC_BASE_URL="https://ai-gateway.vercel.sh" \
  ANTHROPIC_AUTH_TOKEN="your-api-key-here" \
  ANTHROPIC_API_KEY="" \
  claude "$@"
  ```
  Make it executable and ensure `~/bin` is in your PATH:
  ```bash
  mkdir -p ~/bin
  chmod +x ~/bin/claude-vercel
  echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
  source ~/.zshrc
  ```

- ### Run Claude Code
  Run `claude-vercel` to start Claude Code with AI Gateway:
  ```bash
  claude-vercel
  ```
  Your requests will now be routed through Vercel AI Gateway.

## Integration with Anthropic SDK

You can use the AI Gateway's Anthropic Messages API with the official [Anthropic SDK](https://docs.anthropic.com/en/api/client-sdks). Point your client to the AI Gateway's base URL and use your AI Gateway [API key](/docs/ai-gateway/authentication-and-byok#api-key) or [OIDC token](/docs/ai-gateway/authentication-and-byok#oidc-token) for authentication.

> **💡 Note:** The examples and content in this section are not comprehensive. For complete
> documentation on available parameters, response formats, and advanced
> features, refer to the [Anthropic Messages
> API](https://docs.anthropic.com/en/api/messages) documentation.

#### TypeScript

```typescript filename="client.ts"
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, world!' }],
});
```

#### Python

```python filename="client.py"
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    messages=[
        {'role': 'user', 'content': 'Hello, world!'}
    ]
)
```

#### cURL

```bash filename="client.sh"
curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user",
        "content": "Hello, world!"
      }
    ]
  }'
```

## Message batches

Use the Anthropic SDK's `client.messages.batches` methods to submit requests for asynchronous processing, poll for completion, and read results.

> **💡 Note:** Message batches are in early access. Your team must have access enabled before
> you can submit a batch through AI Gateway.

### Submit a batch and read results

Install `@anthropic-ai/sdk` for TypeScript or JavaScript, or `anthropic` for Python. Set `AI_GATEWAY_API_KEY` to your AI Gateway API key. Use `https://ai-gateway.vercel.sh` as the SDK base URL, without `/v1`.

Set `AI_GATEWAY_BATCH_IDEMPOTENCY_KEY` to a value you persist for this batch, such as `sentiment-eval-2026-09-17`. Reuse that value and the identical payload when retrying submission. AI Gateway returns the existing batch for a matching retry. A new key creates a new batch; reusing a key with a different payload returns an error.

The example prints the batch ID, checks status up to 20 times at 30-second intervals, and reads results when processing ends:

#### TypeScript

```typescript filename="batch.ts"
import Anthropic from '@anthropic-ai/sdk';
import { setTimeout } from 'node:timers/promises';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});
const key = process.env.AI_GATEWAY_BATCH_IDEMPOTENCY_KEY;
if (!key) throw new Error('Set AI_GATEWAY_BATCH_IDEMPOTENCY_KEY');

let batch = await client.messages.batches.create(
  {
    requests: [{
      custom_id: 'review-1',
      params: {
        model: 'anthropic/claude-haiku-4.5',
        max_tokens: 64,
        messages: [{ role: 'user', content: 'Classify as positive or negative: I love this app.' }],
      },
    }],
  },
  { headers: { 'Idempotency-Key': key } },
);
console.log('Batch ID:', batch.id);

for (let attempt = 0; attempt < 20 && batch.processing_status !== 'ended'; attempt++) {
  await setTimeout(30_000);
  batch = await client.messages.batches.retrieve(batch.id);
}
if (batch.processing_status !== 'ended') {
  throw new Error(`Still processing. Resume polling batch ${batch.id} later.`);
}
if (!batch.results_url) {
  throw new Error(`No downloadable results for batch ${batch.id}.`);
}

const results = await client.messages.batches.results(batch.id);
for await (const item of results) {
  if (item.result.type === 'succeeded') {
    console.log(item.custom_id, item.result.message.content);
  } else {
    console.error(item.custom_id, item.result);
  }
}
```

#### JavaScript

```javascript filename="batch.mjs"
import Anthropic from '@anthropic-ai/sdk';
import { setTimeout } from 'node:timers/promises';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});
const key = process.env.AI_GATEWAY_BATCH_IDEMPOTENCY_KEY;
if (!key) throw new Error('Set AI_GATEWAY_BATCH_IDEMPOTENCY_KEY');

let batch = await client.messages.batches.create(
  {
    requests: [{
      custom_id: 'review-1',
      params: {
        model: 'anthropic/claude-haiku-4.5',
        max_tokens: 64,
        messages: [{ role: 'user', content: 'Classify as positive or negative: I love this app.' }],
      },
    }],
  },
  { headers: { 'Idempotency-Key': key } },
);
console.log('Batch ID:', batch.id);

for (let attempt = 0; attempt < 20 && batch.processing_status !== 'ended'; attempt++) {
  await setTimeout(30_000);
  batch = await client.messages.batches.retrieve(batch.id);
}
if (batch.processing_status !== 'ended') {
  throw new Error(`Still processing. Resume polling batch ${batch.id} later.`);
}
if (!batch.results_url) {
  throw new Error(`No downloadable results for batch ${batch.id}.`);
}

const results = await client.messages.batches.results(batch.id);
for await (const item of results) {
  if (item.result.type === 'succeeded') {
    console.log(item.custom_id, item.result.message.content);
  } else {
    console.error(item.custom_id, item.result);
  }
}
```

#### Python

```python filename="batch.py"
import os
import time
import anthropic

client = anthropic.Anthropic(
    api_key=os.environ['AI_GATEWAY_API_KEY'],
    base_url='https://ai-gateway.vercel.sh',
)
batch = client.messages.batches.create(
    requests=[{
        'custom_id': 'review-1',
        'params': {
            'model': 'anthropic/claude-haiku-4.5',
            'max_tokens': 64,
            'messages': [{'role': 'user', 'content': 'Classify as positive or negative: I love this app.'}],
        },
    }],
    extra_headers={'Idempotency-Key': os.environ['AI_GATEWAY_BATCH_IDEMPOTENCY_KEY']},
)
print('Batch ID:', batch.id, flush=True)

for _ in range(20):
    if batch.processing_status == 'ended':
        break
    time.sleep(30)
    batch = client.messages.batches.retrieve(batch.id)
if batch.processing_status != 'ended':
    raise RuntimeError(f'Still processing. Resume polling batch {batch.id} later.')
if not batch.results_url:
    raise RuntimeError(f'No downloadable results for batch {batch.id}.')

for item in client.messages.batches.results(batch.id):
    if item.result.type == 'succeeded':
        print(item.custom_id, item.result.message.content)
    else:
        print(item.custom_id, item.result)
```

Save the printed batch ID to resume polling with `client.messages.batches.retrieve` later. The batch keeps processing after the example stops waiting.

When processing ends, a non-null `results_url` indicates that results are available. The SDK uses this URL when you call `results`. Individual requests can still fail. Match each result to its request by `custom_id`, regardless of result order. Successful results include `result.message`; other results report `errored`, `canceled`, or `expired`.

### List batches

Use `await client.messages.batches.list({ limit: 20 })` in TypeScript or JavaScript, or `client.messages.batches.list(limit=20)` in Python. The default page size is 20, with a maximum of 100. Pass either `after_id` or `before_id` to paginate, never both.

### Batch requirements

- Submit up to 1,000 requests per batch, all using the same model.
- Give each request a unique `custom_id` of 1–64 characters using letters, numbers, underscores, or hyphens (`[A-Za-z0-9_-]`).
- Batch requests don't support streaming, provider-executed tools, or Model Context Protocol (MCP) servers.
- Batch cancellation and deletion aren't supported through AI Gateway.
- You can use [Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok) credentials saved to your team. Request-scoped raw provider keys aren't supported.
- [Zero Data Retention (ZDR)](/docs/ai-gateway/security-and-compliance/zdr) isn't available for batches.

## Parameters

The messages endpoint supports the following parameters:

### Required parameters

- `model` (string): The model to use (e.g., `anthropic/claude-opus-5`)
- `max_tokens` (integer): Maximum number of tokens to generate
- `messages` (array): Array of message objects with `role` and `content` fields

### Optional parameters

- `stream` (boolean): Whether to stream the response. Defaults to `false`
- `temperature` (number): Controls randomness in the output. Range: 0-1
- `top_p` (number): Nucleus sampling parameter. Range: 0-1
- `top_k` (integer): Top-k sampling parameter
- `stop_sequences` (array): Stop sequences for the generation
- `tools` (array): Array of tool definitions for function calling
- `tool_choice` (object): Controls which tools are called
- `thinking` (object): Extended thinking configuration
- `system` (string or array): System prompt

## Prompt caching

The gateway passes through the `cache_control` parameter to Anthropic's [prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) feature. This is explicit caching: you specify cache breakpoints, and Anthropic handles storing and reusing cached content automatically.

> **💡 Note:** The `cache_control` parameter is passed through to **Anthropic**, **Vertex AI Anthropic**, and **Amazon Bedrock Anthropic** models for explicit caching. Other providers or models with implicit caching work automatically without any configuration.

Example request

#### TypeScript

```typescript filename="caching.ts"
import fs from 'node:fs';
import Anthropic from '@anthropic-ai/sdk';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const anthropic = new Anthropic({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh',
});

// Caching only pays off above a provider minimum, currently 1024 tokens for
// most Claude models. A short string is silently not cached.
const longDocumentContent = fs.readFileSync('./contract.txt', 'utf8');

const message = await anthropic.messages.create({
  model: 'anthropic/claude-opus-5',
  max_tokens: 1024,
  system: [
    {
      type: 'text',
      text: 'You are a helpful assistant that analyzes documents.',
    },
    {
      type: 'text',
      text: longDocumentContent,
      cache_control: { type: 'ephemeral' },
    },
  ],
  messages: [
    {
      role: 'user',
      content: 'Summarize the key points from this document.',
    },
  ],
});

console.log(message.usage);
// {
//   input_tokens: 50,
//   output_tokens: 200,
//   cache_creation_input_tokens: 10000,  // Tokens written to cache
//   cache_read_input_tokens: 0           // Tokens read from cache
// }
```

#### Python

```python filename="caching.py"
import os
import anthropic

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = anthropic.Anthropic(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh'
)

# Caching only pays off above a provider minimum, currently 1024 tokens for
# most Claude models. A short string is silently not cached.
with open('contract.txt') as f:
    long_document_content = f.read()

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=1024,
    system=[
        {
            'type': 'text',
            'text': 'You are a helpful assistant that analyzes documents.',
        },
        {
            'type': 'text',
            'text': long_document_content,  # Large content to cache
            'cache_control': {'type': 'ephemeral'},
        },
    ],
    messages=[
        {
            'role': 'user',
            'content': 'Summarize the key points from this document.'
        }
    ],
)

print(message.usage)
# {
#   'input_tokens': 50,
#   'output_tokens': 200,
#   'cache_creation_input_tokens': 10000,  # Tokens written to cache
#   'cache_read_input_tokens': 0           # Tokens read from cache
# }
```

#### cURL

```bash filename="prompt-caching.sh"
CONTRACT=$(sed 's/"/\\"/g' contract.txt | tr '\n' ' ')

curl -X POST "https://ai-gateway.vercel.sh/v1/messages" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "max_tokens": 1024,
    "system": [
      { "type": "text", "text": "You are a helpful assistant that analyzes documents." },
      {
        "type": "text",
        "text": "'"$CONTRACT"'",
        "cache_control": { "type": "ephemeral" }
      }
    ],
    "messages": [
      { "role": "user", "content": "Summarize the key points from this document." }
    ]
  }'
```

### Where to place cache breakpoints

Add `cache_control: { type: 'ephemeral' }` to mark content that should be cached. You can place cache breakpoints on system messages, user message content, tool definitions, tool results, and assistant message content. Anthropic also supports automatic caching, where a single top-level `cache_control` field automatically applies to the last cacheable block.

For the full list of cacheable locations and automatic caching details, see the [Anthropic prompt caching docs](https://platform.claude.com/docs/en/build-with-claude/prompt-caching).

### Cache behavior

- **First request**: Content up to the breakpoint is cached (`cache_creation_input_tokens`)
- **Subsequent requests**: Matching prefixes are read from cache (`cache_read_input_tokens`)
- **TTL**: Cached content expires after 5 minutes, refreshed on each cache hit

## Configuring the Claude Agent SDK

The [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) (`@anthropic-ai/claude-agent-sdk`) lets you build agents with the same tools and agentic loop that power Claude Code. Because the SDK spawns Claude Code as a subprocess, it inherits the same `ANTHROPIC_*` environment variables described above, so your agent code needs no gateway-specific configuration:

```ts filename="agent.ts"
import { query } from '@anthropic-ai/claude-agent-sdk';

for await (const message of query({
  prompt: 'Find and fix the bug in auth.ts',
  options: { allowedTools: ['Read', 'Edit', 'Bash'] },
})) {
  console.log(message);
}
```

Refer to the [Claude Agent SDK documentation](https://code.claude.com/docs/en/agent-sdk/quickstart) for more details.

### Passing AI Gateway options

The Agent SDK respects any [environment variable the Claude Code CLI reads](https://code.claude.com/docs/en/env-vars), including these two for working with AI Gateway:

| Variable                                 | Purpose                                                                                                                                                                                                                                                                                       |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS` | Strips Anthropic-specific `anthropic-beta` headers and beta tool-schema fields from requests. Set to `1` when routing through providers like Bedrock or Vertex AI that reject those fields.                                                                                                   |
| `CLAUDE_CODE_EXTRA_BODY`                 | Merges a JSON object into the top level of every request body. Use it to pass [`providerOptions`](/docs/ai-gateway/models-and-providers/provider-options) like [`order`, `only`, and `sort`](/docs/ai-gateway/models-and-providers/provider-options#provider-filtering-ordering-and-sorting). |

For example, to restrict requests to Amazon Bedrock only, set these alongside the `ANTHROPIC_*` variables in your environment:

```bash
CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS=1
CLAUDE_CODE_EXTRA_BODY='{"providerOptions":{"gateway":{"only":["bedrock"]}}}'
```

## Error handling

The API returns standard HTTP status codes and error responses:

### Common error codes

- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Invalid or missing authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Model or endpoint not found
- `429 Too Many Requests`: Rate limit exceeded
- `500 Internal Server Error`: Server error

### Error response format

```json
{
  "type": "error",
  "error": {
    "type": "invalid_request_error",
    "message": "Invalid request: missing required parameter 'max_tokens'"
  }
}
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
