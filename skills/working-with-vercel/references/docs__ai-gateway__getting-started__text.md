---
title: Text Generation Quickstart
product: vercel
url: /docs/ai-gateway/getting-started/text
canonical_url: "https://vercel.com/docs/ai-gateway/getting-started/text"
last_updated: 2026-09-02
type: tutorial
prerequisites:
  - /docs/ai-gateway/getting-started
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/models-and-providers/provider-options
  - /docs/ai-gateway/sdks-and-apis/openai-chat-completions
  - /docs/ai-gateway/sdks-and-apis/responses
  - /docs/ai-gateway/sdks-and-apis/anthropic-messages-api
summary: Generate and stream text responses using AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/getting-started/text.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "95924d3e5fd4dc98657b5f775bffaef45f1a53c0c62c826f9e0071886bc3d5ff"
---

# Text Generation Quickstart

Generate and stream a text response through AI Gateway, then inspect the token usage and finish reason.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get started with GPT-5](https://ai-sdk.dev/cookbook/guides/gpt-5?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related)
- [Text Generation](https://vercel.com/docs/ai-gateway/modalities/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate and stream text from hundreds of models through AI Gateway, with tool calling and structured output.
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/responses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate text responses with the OpenAI Responses API through AI Gateway.
- [Text Generation](https://vercel.com/docs/ai-gateway/sdks-and-apis/openresponses/text-generation?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Generate text responses using the OpenResponses API.
- [AI SDK](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=related) — Use the AI Gateway with Python through OpenAI or Anthropic SDKs with full streaming, tool calling, and async support.

Full cross-link map for this page: [/docs/ai-gateway/getting-started/text.graph.md](/docs/ai-gateway/getting-started/text.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fgetting-started%2Ftext&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, you need:

- A Vercel account with a valid payment method to unlock free AI Gateway Credits
- Node.js 22 or later
- An AI Gateway API key or a Vercel OIDC token

### Set up your API key

Open the [Create API Key dialog](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys%3FshowCreateKeyModal%3Dtrue\&title=AI+Gateway+API+Keys) in the Vercel dashboard, enter a name, and create the key.

After you create your project in the next section, add a `.env.local` file to the project root and save your API key:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

> **💡 Note:** Instead of using an API key, you can use [OIDC
> tokens](/docs/ai-gateway/authentication-and-byok/oidc) to authenticate your
> requests.

## Generate your first text response

Install Vercel's focused AI Gateway skill before delegating this setup:

```bash filename="Terminal"
npx skills add vercel/vercel-plugin --skill ai-gateway
```

**Agent prompt**

```text
Use the AI Gateway skill to add streaming text generation to this project. Read AI_GATEWAY_API_KEY from the environment or .env.local, and stop and tell me to create a key if it is not set anywhere. Choose a current text model such as openai/gpt-5.6-sol from the live AI Gateway model list, stream the response, print token usage and the finish reason, run the result, and run the project's type checker. Report the files changed and command output.
```

- ### Set up your project
  Create a new directory and initialize a Node.js project:
  ```bash filename="Terminal"
  mkdir ai-text-demo
  cd ai-text-demo
  pnpm init
  pnpm pkg set type=module
  ```

- ### Install dependencies
  Install the AI SDK and development dependencies:
  #### npm
  ```bash filename="Terminal"
  npm install ai@latest dotenv @types/node tsx typescript
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add ai@latest dotenv @types/node tsx typescript
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add ai@latest dotenv @types/node tsx typescript
  ```
  #### bun
  ```bash filename="Terminal"
  bun add ai@latest dotenv @types/node tsx typescript
  ```

- ### Create and run your script
  Create an `index.ts` file:
  ```typescript filename="index.ts"
  import { streamText } from 'ai';
  import { config } from 'dotenv';

  config({ path: '.env.local' });

  async function main() {
    const result = streamText({
      model: 'openai/gpt-5.6-sol',
      prompt: 'Invent a new holiday and describe its traditions.',
    });

    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }

    console.log();
    console.log('Token usage:', await result.usage);
    console.log('Finish reason:', await result.finishReason);
  }

  main().catch(console.error);
  ```
  Run your script:
  ```bash filename="Terminal"
  pnpm tsx index.ts
  ```
  You should see the AI model's response stream to your terminal.

## Next steps

- Learn about [provider and model routing with fallbacks](/docs/ai-gateway/models-and-providers/provider-options)
- Explore the [AI SDK documentation](https://ai-sdk.dev/getting-started) for more configuration options
- Try other APIs: [OpenAI Chat Completions](/docs/ai-gateway/sdks-and-apis/openai-chat-completions), [OpenAI Responses](/docs/ai-gateway/sdks-and-apis/responses), [Anthropic Messages](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api), or [OpenResponses](/docs/ai-gateway/sdks-and-apis/openresponses)

## Compatible APIs

The model slug is independent of the API you call. These examples run `anthropic/claude-opus-5` through OpenAI-shaped, Anthropic-shaped, and OpenResponses requests, so you can change models without rewriting your client.

### OpenAI Chat Completions API

Use any OpenAI SDK or HTTP client with AI Gateway:

#### TypeScript

```typescript filename="index.ts"
import OpenAI from 'openai';
import { config } from 'dotenv';

config({ path: '.env.local' });

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'anthropic/claude-opus-5',
    messages: [
      {
        role: 'user',
        content: 'Invent a new holiday and describe its traditions.',
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main().catch(console.error);
```

#### Python

```python filename="main.py"
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv('.env.local')

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.chat.completions.create(
    model='anthropic/claude-opus-5',
    messages=[
        {
            'role': 'user',
            'content': 'Invent a new holiday and describe its traditions.',
        },
    ],
)

print(response.choices[0].message.content)
```

Learn more in the [OpenAI Chat Completions API docs](/docs/ai-gateway/sdks-and-apis/openai-chat-completions).

### Anthropic Messages API

Use any Anthropic SDK or HTTP client with AI Gateway:

#### TypeScript

```typescript filename="index.ts"
import Anthropic from '@anthropic-ai/sdk';
import { config } from 'dotenv';

config({ path: '.env.local' });

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

async function main() {
  const message = await client.messages.create({
    model: 'anthropic/claude-opus-5',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: 'Invent a new holiday and describe its traditions.',
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === 'text');
  console.log(textBlock?.text);
}

main().catch(console.error);
```

Thinking models return `thinking` blocks before the text, and thinking tokens count toward `max_tokens`. Give the request room for both, and select the first `text` block rather than indexing into position 0.

#### Python

```python filename="main.py"
import os
import anthropic
from dotenv import load_dotenv

load_dotenv('.env.local')

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh',
)

message = client.messages.create(
    model='anthropic/claude-opus-5',
    max_tokens=4096,
    messages=[
        {
            'role': 'user',
            'content': 'Invent a new holiday and describe its traditions.',
        },
    ],
)

text_block = next(block for block in message.content if block.type == 'text')
print(text_block.text)
```

Learn more in the [Anthropic Messages API docs](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api).

### OpenResponses API

Use the [OpenResponses API](https://openresponses.org), an open standard for AI model interactions:

#### TypeScript

```typescript filename="index.ts"
import { config } from 'dotenv';

config({ path: '.env.local' });

async function main() {
  const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'anthropic/claude-opus-5',
      input: [
        {
          type: 'message',
          role: 'user',
          content: 'Invent a new holiday and describe its traditions.',
        },
      ],
    }),
  });

  const result = await response.json();
  const message = result.output.find((item) => item.type === 'message');
  console.log(message?.content.find((part) => part.type === 'output_text')?.text);
}

main().catch(console.error);
```

A reasoning model's `output` array can start with a `reasoning` item, so find the `message` item rather than indexing into position 0.

#### Python

```python filename="main.py"
import os
import requests
from dotenv import load_dotenv

load_dotenv('.env.local')

response = requests.post(
    'https://ai-gateway.vercel.sh/v1/responses',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {os.getenv("AI_GATEWAY_API_KEY")}',
    },
    json={
        'model': 'anthropic/claude-opus-5',
        'input': [
            {
                'type': 'message',
                'role': 'user',
                'content': 'Invent a new holiday and describe its traditions.',
            },
        ],
    },
)

result = response.json()
message = next(item for item in result['output'] if item['type'] == 'message')
print(next(part['text'] for part in message['content'] if part['type'] == 'output_text'))
```

#### cURL

```bash filename="Terminal"
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-opus-5",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "Invent a new holiday and describe its traditions."
      }
    ]
  }'
```

Learn more in the [OpenResponses API docs](/docs/ai-gateway/sdks-and-apis/openresponses).


---

[View full sitemap](/docs/sitemap)
