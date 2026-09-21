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
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "896a5b1bd97caa9c0584cf8264f4cd4e0da72d80ab25f1da1c7a7ac9ad80e029"
---

# AI Gateway OIDC Authentication

The [Vercel OIDC token](/docs/oidc) is a way to authenticate your requests to the AI Gateway without needing to manage an API key. Vercel automatically generates the OIDC token that it associates with your Vercel project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Run recurring security reviews with deepsec on Vercel](https://vercel.com/kb/guide/deepsec-reviews-on-vercel?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Learn how to run periodic security scans on your code with deepsec. Set up deepsec to review GitHub repositories and del
- [How to classify, route, and score with Jev and AI SDK](https://vercel.com/kb/guide/typesafe-jev-and-ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Use Jev from TypeSafe AI with AI SDK's experimental \\`evaluate\\` API to classify, route, score, and verify inside your a
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [AI SDK with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Build AI-powered TypeScript applications using the AI SDK with AI Gateway for unified access to 200+ models.
- [AI SDK for Python with AI Gateway](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [Vercel & OpenAI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [Connect to Amazon Web Services \\(AWS\\)](https://vercel.com/docs/oidc/aws?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=related) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).

Full cross-link map for this page: [/docs/ai-gateway/authentication-and-byok/oidc.graph.md](/docs/ai-gateway/authentication-and-byok/oidc.graph.md?from=related&source_path=%2Fdocs%2Fai-gateway%2Fauthentication-and-byok%2Foidc&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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

  The AI SDK resolves OIDC automatically when `AI_GATEWAY_API_KEY` isn't set. For the Python beta, install the Vercel integration with `uv add "ai[vercel]"`. The HTTP client examples below read `VERCEL_OIDC_TOKEN` from the environment. For long-running Node.js processes on Vercel, use [`getVercelOidcToken()`](/docs/oidc) from `@vercel/oidc` at request time to obtain the current token.
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
  ```typescript filename="oidc-chat.ts" {4}
  import OpenAI from 'openai';

  const client = new OpenAI({
    apiKey: process.env.VERCEL_OIDC_TOKEN,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const response = await client.chat.completions.create({
    model: "anthropic/claude-sonnet-5",
    messages: [{ "role": "user", "content": "Why is the sky blue?" }],
  });

  console.log(response.choices[0]?.message.content);
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
  ```typescript filename="oidc-messages.ts" {4}
  import Anthropic from '@anthropic-ai/sdk';

  const client = new Anthropic({
    apiKey: process.env.VERCEL_OIDC_TOKEN,
    baseURL: 'https://ai-gateway.vercel.sh',
  });

  const response = await client.messages.create({
    model: "anthropic/claude-sonnet-5",
    messages: [{ "role": "user", "content": "Why is the sky blue?" }],
    max_tokens: 1024,
  });

  for (const block of response.content) {
    if (block.type === 'text') console.log(block.text);
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
  ```typescript filename="oidc-responses.ts" {4}
  import OpenAI from 'openai';

  const client = new OpenAI({
    apiKey: process.env.VERCEL_OIDC_TOKEN,
    baseURL: 'https://ai-gateway.vercel.sh/v1',
  });

  const response = await client.responses.create({
    model: "anthropic/claude-sonnet-5",
    input: "Why is the sky blue?",
  });

  console.log(response.output_text);
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
