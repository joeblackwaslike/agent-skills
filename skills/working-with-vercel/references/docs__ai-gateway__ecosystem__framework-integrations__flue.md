---
title: Flue with AI Gateway
product: vercel
url: /docs/ai-gateway/ecosystem/framework-integrations/flue
canonical_url: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/flue"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/ai-gateway/ecosystem/framework-integrations
  - /docs/ai-gateway/ecosystem
related:
  - /docs/frameworks/agents/flue
  - /docs/accounts
  - /docs/ai-gateway/authentication-and-byok/authentication
  - /docs/environment-variables
  - /docs/ai-gateway/observability-and-spend/observability
summary: Route Flue agent requests through Vercel AI Gateway with the built-in provider, using an API key or Vercel OIDC authentication.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/flue.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "18f8b200f879f40b2bf30051f41b42010cd716f7206016f47efd511cf3db694b"
---

# Flue with AI Gateway

[Flue](/docs/frameworks/agents/flue) agents can use AI Gateway through the built-in `vercel-ai-gateway` provider. Choose a model with `useModel()` to route requests through AI Gateway and track usage in your Vercel dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build an agent with Vercel and Flue](https://vercel.com/kb/guide/build-an-agent-with-vercel-and-flue) — Build and deploy an agent with Flue, Vercel Sandbox, and AI Gateway
- [Ecosystem](https://vercel.com/docs/sandbox/ecosystem) — Use Vercel Sandbox with the agent frameworks, model SDKs, and agents you already work with.
- [Build a Software Factory with Flue](https://vercel.com/docs/agent-resources/software-factory/flue) — Use Flue with AI Gateway, Vercel Sandbox, and explicit GitHub tool adapters for investigated and reviewed code changes.
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Getting Started with AI Gateway](https://vercel.com/docs/ai-gateway/getting-started) — Set up AI Gateway with a coding agent, route the agent through AI Gateway, or make your first request with cURL, TypeScr
- [Xcode with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/xcode) — Connect Xcode's AI chat to AI Gateway through the Chat Completions API. Configure the provider, API key, and models in X

Full cross-link map for this page: [/docs/ai-gateway/ecosystem/framework-integrations/flue.graph.md](/docs/ai-gateway/ecosystem/framework-integrations/flue.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Start with an [existing Flue project](/docs/frameworks/agents/flue) with `@flue/runtime` and `@flue/cli` installed, Node.js 22.19 or later, and a [Vercel account](/docs/accounts).

## Configure authentication

Create an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/authentication) and add it to `.env.local`:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your-api-key-here
```

For deployed applications, set `AI_GATEWAY_API_KEY` in your project's [environment variables](/docs/environment-variables). To authenticate with a Vercel OpenID Connect (OIDC) token instead, use the [OIDC configuration below](#use-vercel-oidc-authentication).

## Configure your agent

Create or update your agent module:

**src/agents/assistant.ts**

```ts filename="src/agents/assistant.ts" framework=all
'use agent';

import { useModel } from '@flue/runtime';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  return 'Answer questions clearly and concisely.';
}
```

**src/agents/assistant.js**

```js filename="src/agents/assistant.js" framework=all
'use agent';

import { useModel } from '@flue/runtime';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  return 'Answer questions clearly and concisely.';
}
```

The first part of the model specifier, `vercel-ai-gateway`, selects Flue's provider. The remaining `openai/gpt-6.1-sol` is the AI Gateway model ID. To use another model, choose one from the provider's model catalog.

Flue includes all built-in providers by default. If your Flue configuration has a `providers` list, include `'vercel-ai-gateway'` in that list for server builds. See [Flue's provider configuration](https://flueframework.com/docs/reference/provider-api/#the-providers-config).

## Run your agent

Load `.env.local` and send a prompt with the Flue CLI:

```bash filename="terminal"
pnpm exec flue run src/agents/assistant.ts --env .env.local --message "Explain AI Gateway in one sentence."
```

For the JavaScript example, use `src/agents/assistant.js`. After the response, check your request in [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability).

## Use Vercel OIDC authentication

Flue's built-in AI Gateway provider reads `AI_GATEWAY_API_KEY`. To use a Vercel OIDC token, register a provider with a request-time authentication resolver. This sends the token in the `Authorization` header to AI Gateway's [Anthropic-compatible Messages API](/docs/ai-gateway/sdks-and-apis/anthropic-messages-api).

Install the provider and OIDC packages:

**pnpm**

```bash
pnpm i @earendil-works/pi-ai @vercel/oidc
```

**yarn**

```bash
yarn add @earendil-works/pi-ai @vercel/oidc
```

**npm**

```bash
npm i @earendil-works/pi-ai @vercel/oidc
```

**bun**

```bash
bun add @earendil-works/pi-ai @vercel/oidc
```

For local development, link your project and pull a token:

```bash filename="terminal"
vercel link
vercel env pull .env.local
```

Replace the agent module with the following configuration. Keep the registration in the agent module so it also applies to `flue run`, which doesn't load `app.ts`:

**src/agents/assistant.ts**

```ts filename="src/agents/assistant.ts" framework=all
'use agent';

import { createProvider } from '@earendil-works/pi-ai';
import { anthropicMessagesApi } from '@earendil-works/pi-ai/api/anthropic-messages.lazy';
import { vercelAIGatewayProvider } from '@earendil-works/pi-ai/providers/vercel-ai-gateway';
import { setProvider, useModel } from '@flue/runtime';
import { getVercelOidcToken } from '@vercel/oidc';

setProvider(
  createProvider({
    id: 'vercel-ai-gateway',
    baseUrl: 'https://ai-gateway.vercel.sh',
    models: vercelAIGatewayProvider().getModels(),
    api: anthropicMessagesApi(),
    auth: {
      apiKey: {
        name: 'Vercel OIDC',
        resolve: async () => ({
          auth: {
            headers: {
              Authorization: `Bearer ${await getVercelOidcToken()}`,
            },
          },
        }),
      },
    },
  }),
);

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  return 'Answer questions clearly and concisely.';
}
```

**src/agents/assistant.js**

```js filename="src/agents/assistant.js" framework=all
'use agent';

import { createProvider } from '@earendil-works/pi-ai';
import { anthropicMessagesApi } from '@earendil-works/pi-ai/api/anthropic-messages.lazy';
import { vercelAIGatewayProvider } from '@earendil-works/pi-ai/providers/vercel-ai-gateway';
import { setProvider, useModel } from '@flue/runtime';
import { getVercelOidcToken } from '@vercel/oidc';

setProvider(
  createProvider({
    id: 'vercel-ai-gateway',
    baseUrl: 'https://ai-gateway.vercel.sh',
    models: vercelAIGatewayProvider().getModels(),
    api: anthropicMessagesApi(),
    auth: {
      apiKey: {
        name: 'Vercel OIDC',
        resolve: async () => ({
          auth: {
            headers: {
              Authorization: `Bearer ${await getVercelOidcToken()}`,
            },
          },
        }),
      },
    },
  }),
);

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  return 'Answer questions clearly and concisely.';
}
```

The registration replaces the built-in provider's authentication for chat requests while retaining its model catalog. It uses OIDC even if `AI_GATEWAY_API_KEY` is set. `getVercelOidcToken()` resolves the current token when authentication runs, rather than capturing it when the module loads.

On Vercel, your deployment supplies the [OIDC token](/docs/oidc). For local development, rerun `vercel env pull .env.local` when the token expires. See [AI Gateway OIDC authentication](/docs/ai-gateway/authentication-and-byok/oidc) for details. Run the agent with the same CLI command above.

## Run agent commands in Vercel Sandbox

To give your agent isolated file and command tools, follow [Flue with Vercel Sandbox](/docs/sandbox/ecosystem/flue). Model requests continue to use AI Gateway from your application process.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
