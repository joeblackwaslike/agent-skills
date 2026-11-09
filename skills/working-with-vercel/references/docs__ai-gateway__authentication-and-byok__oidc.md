---
title: AI Gateway OIDC Authentication
product: vercel
url: /docs/ai-gateway/authentication-and-byok/oidc
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway
related:
  - /docs/oidc
summary: Authenticate AI Gateway requests from Vercel deployments with OIDC tokens. Configure the AI SDK or send bearer tokens directly to the API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "445d634c6c315930c646795858ebf62fc7dcf384172c5aee2e957d0c6bd1e8fb"
---

# AI Gateway OIDC Authentication

The [Vercel OIDC token](/docs/oidc) is a way to authenticate your requests to the AI Gateway without needing to manage an API key. Vercel automatically generates the OIDC token that it associates with your Vercel project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Run recurring security reviews with deepsec on Vercel](https://vercel.com/kb/guide/deepsec-reviews-on-vercel) — Learn how to run periodic security scans on your code with deepsec. Set up deepsec to review GitHub repositories and del
- [Route form submissions with Jev and AI SDK](https://vercel.com/kb/guide/jev-ai-sdk-form-router) — Route form submissions to the right team with the Jev x AI SDK Form Router template. Jev routes clear cases and a fallba
- [Enhancing security of backend connectivity with OpenID Connect](https://vercel.com/blog/enhancing-security-of-backend-connectivity-with-openid-connect)
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 400+ models.
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 400+ models.
- [Create a BYOK credential](https://vercel.com/docs/rest-api/ai-gateway/create-a-byok-credential) — POST /ai-gateway/byok-credentials — Create a new BYOK credential
- [Connect to Amazon Web Services \\(AWS\\)](https://vercel.com/docs/oidc/aws) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).

Full cross-link map for this page: [/docs/ai-gateway/authentication-and-byok/oidc.graph.md](/docs/ai-gateway/authentication-and-byok/oidc.graph.md)
<!-- /docsgraph:related -->

## How OIDC works on Vercel deployments

Vercel passes your project's OIDC token to every Vercel Function invocation in the `x-vercel-oidc-token` request header. AI Gateway accepts that token as a bearer credential in place of an API key. How your code gets the token depends on the client you use.

### With the AI SDK

The AI SDK finds and sends the OIDC token for you. Deployed code doesn't need an API key, an environment variable, or `vercel env pull`. The AI SDK picks a credential for each request in this order:

1. The `apiKey` option passed to `createGateway()`.
2. The `AI_GATEWAY_API_KEY` environment variable.
3. The Vercel OIDC token, which the AI SDK obtains for each request and refreshes for you.

A non-empty API key always takes priority over OIDC, even if the key is invalid. To use OIDC on a deployment, remove `AI_GATEWAY_API_KEY` from the project's environment variables. If no API key is set and no OIDC token is available, requests fail with a `GatewayAuthenticationError`.

### With the OpenAI SDK, Anthropic SDK, or HTTP requests

Chat Completions, Messages API, and Responses clients don't discover the OIDC token. Pass it yourself, as the client's `apiKey` or as a bearer token in the `Authorization` header. These clients have no precedence order or fallback, so AI Gateway authenticates with whatever credential you pass.

Nothing refreshes the token for these clients. Vercel reuses a Function's token for less than an hour before rotating it, so get the current token inside your request handler on every request, not once at startup. In Node.js, call `getVercelOidcToken()` from `@vercel/oidc`. On Vercel, it reads the current request's `x-vercel-oidc-token` header. Locally, it reads the `VERCEL_OIDC_TOKEN` value that `vercel env pull` writes:

```typescript filename="app/api/chat/route.ts" {6}
import OpenAI from 'openai';
import { getVercelOidcToken } from '@vercel/oidc';

export async function POST(request: Request) {
  const client = new OpenAI({
    apiKey: await getVercelOidcToken(),
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const { messages } = await request.json();
  const response = await client.chat.completions.create({
    model: "anthropic/claude-sonnet-5",
    messages,
  });

  return Response.json(response);
}
```

In Python, read the token from the `x-vercel-oidc-token` request header in a deployed function, or from `VERCEL_OIDC_TOKEN` in local development.

> **💡 Note:** Vercel OIDC tokens are only valid for 12 hours, so you will need to refresh
> them periodically during local development. You can do this by running `vercel
>   env pull` again.

## Setting up OIDC authentication

- #### Link to a Vercel project
  Before you can use the OIDC token during local development, ensure that you link your application to a Vercel project:
  ```bash filename="terminal"
  vercel link
  ```

- #### Pull environment variables
  Pull the environment variables from Vercel to get the OIDC token:
  ```bash filename="terminal"
  vercel env pull
  ```

- #### Use OIDC authentication in your code
  With OIDC authentication, you can directly use the gateway provider without needing to obtain an API key or set it in an environment variable:

  The AI SDK resolves OIDC automatically when `AI_GATEWAY_API_KEY` isn't set. For the Python beta, install the Vercel integration with `uv add "ai[vercel]"`. The TypeScript examples for Chat Completions, Messages API, and Responses are request handlers that call [`getVercelOidcToken()`](/docs/oidc) on every request, which works on Vercel deployments and locally. The Python and cURL examples read `VERCEL_OIDC_TOKEN`, which `vercel env pull` writes for local development. In a deployed function, use the `x-vercel-oidc-token` request header instead.
  #### AI SDK
  #### TypeScript
  See the [AI SDK OIDC reference](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway#oidc-authentication-vercel-deployments) for SDK configuration and usage.
  ```typescript filename="oidc.ts" {4}
  import { generateText } from 'ai';

  const { text } = await generateText({
    model: "anthropic/claude-sonnet-5",
    prompt: "Why is the sky blue?",
  });

  console.log(text);
  ```
  #### Python (beta)
  ```python filename="oidc_ai.py" {5}
  import asyncio
  import ai

  async def main():
      model = ai.get_model("anthropic/claude-sonnet-5")
      messages = [ai.user_message("Why is the sky blue?")]
      async with ai.stream(model, messages) as stream:
          async for event in stream:
              if isinstance(event, ai.events.TextDelta):
                  print(event.chunk, end="", flush=True)
      print()

  asyncio.run(main())
  ```
  #### Chat Completions
  #### TypeScript
  ```typescript filename="oidc-chat.ts" {6}
  import OpenAI from 'openai';
  import { getVercelOidcToken } from '@vercel/oidc';

  export async function POST() {
    const client = new OpenAI({
      apiKey: await getVercelOidcToken(),
      baseURL: 'https://ai-gateway.vercel.sh/v1',
    });

    const response = await client.chat.completions.create({
      model: "anthropic/claude-sonnet-5",
      messages: [{ "role": "user", "content": "Why is the sky blue?" }],
    });

    return Response.json({ text: response.choices[0]?.message.content });
  }
  ```
  #### Python
  ```python filename="oidc_chat.py" {5}
  import os
  from openai import OpenAI

  client = OpenAI(
      api_key=os.environ["VERCEL_OIDC_TOKEN"],
      base_url="https://ai-gateway.vercel.sh/v1",
  )

  response = client.chat.completions.create(
      model="anthropic/claude-sonnet-5",
      messages=[{"role": "user", "content": "Why is the sky blue?"}],
  )

  print(response.choices[0].message.content)
  ```
  #### cURL
  ```bash filename="oidc-chat.sh" {2}
  curl --fail-with-body https://ai-gateway.vercel.sh/v1/chat/completions \
    -H "Authorization: Bearer $VERCEL_OIDC_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
    "model": "anthropic/claude-sonnet-5",
    "messages": [
      {
        "role": "user",
        "content": "Why is the sky blue?"
      }
    ]
  }'
  ```
  #### Messages API
  #### TypeScript
  ```typescript filename="oidc-messages.ts" {6}
  import Anthropic from '@anthropic-ai/sdk';
  import { getVercelOidcToken } from '@vercel/oidc';

  export async function POST() {
    const client = new Anthropic({
      apiKey: await getVercelOidcToken(),
      baseURL: 'https://ai-gateway.vercel.sh',
    });

    const response = await client.messages.create({
      model: "anthropic/claude-sonnet-5",
      messages: [{ "role": "user", "content": "Why is the sky blue?" }],
      max_tokens: 1024,
    });

    const text = response.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('');
    return Response.json({ text });
  }
  ```
  #### Python
  ```python filename="oidc_messages.py" {5}
  import os
  from anthropic import Anthropic

  client = Anthropic(
      api_key=os.environ["VERCEL_OIDC_TOKEN"],
      base_url="https://ai-gateway.vercel.sh",
  )

  response = client.messages.create(
      model="anthropic/claude-sonnet-5",
      messages=[{"role": "user", "content": "Why is the sky blue?"}],
      max_tokens=1024,
  )

  for block in response.content:
      if block.type == "text":
          print(block.text)
  ```
  #### cURL
  ```bash filename="oidc-messages.sh" {2}
  curl --fail-with-body https://ai-gateway.vercel.sh/v1/messages \
    -H "Authorization: Bearer $VERCEL_OIDC_TOKEN" \
    -H "Content-Type: application/json" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
    "model": "anthropic/claude-sonnet-5",
    "messages": [
      {
        "role": "user",
        "content": "Why is the sky blue?"
      }
    ],
    "max_tokens": 1024
  }'
  ```
  #### Responses / OpenResponses
  #### TypeScript
  ```typescript filename="oidc-responses.ts" {6}
  import OpenAI from 'openai';
  import { getVercelOidcToken } from '@vercel/oidc';

  export async function POST() {
    const client = new OpenAI({
      apiKey: await getVercelOidcToken(),
      baseURL: 'https://ai-gateway.vercel.sh/v1',
    });

    const response = await client.responses.create({
      model: "anthropic/claude-sonnet-5",
      input: "Why is the sky blue?",
    });

    return Response.json({ text: response.output_text });
  }
  ```
  #### Python
  ```python filename="oidc_responses.py" {5}
  import os
  from openai import OpenAI

  client = OpenAI(
      api_key=os.environ["VERCEL_OIDC_TOKEN"],
      base_url="https://ai-gateway.vercel.sh/v1",
  )

  response = client.responses.create(
      model="anthropic/claude-sonnet-5",
      input="Why is the sky blue?",
  )

  print(response.output_text)
  ```
  #### cURL
  ```bash filename="oidc-responses.sh" {2}
  curl --fail-with-body https://ai-gateway.vercel.sh/v1/responses \
    -H "Authorization: Bearer $VERCEL_OIDC_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
    "model": "anthropic/claude-sonnet-5",
    "input": "Why is the sky blue?"
  }'
  ```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
