---
title: Authentication & BYOK
product: vercel
url: /docs/ai-gateway/authentication-and-byok
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok"
last_updated: 2026-07-31
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/observability-and-spend/budgets
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Learn how to authenticate with the AI Gateway and configure your own provider keys.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "697fece4df7d5f8c578ca93597697e6e8751a8c54e2292b8fc8e17027f6b610a"
---

# Authentication & BYOK

Every request to AI Gateway requires Vercel authentication. Use an AI Gateway API key or OpenID Connect (OIDC) token. Bring Your Own Key (BYOK) provider credentials control how AI Gateway authenticates to a model provider, but they don't replace request authentication.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk?from=related) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [How to build your own AI model router](https://vercel.com/kb/guide/how-to-build-your-own-ai-model-router?from=related) — Build an AI model router with Vercel AI Gateway. Keep routing, key, and retention decisions in your code while the gatew
- [The complete guide to authentication on Vercel](https://vercel.com/kb/guide/complete-guide-authentication-vercel?from=related) — Learn how to implement authentication in your Vercel applications. Covers NextAuth/Auth.js setup, environment variable c
- [Pricing](https://vercel.com/docs/ai-gateway/pricing?from=related) — Learn about pricing for AI Gateway.
- [OIDC](https://vercel.com/docs/oidc?from=related) — Secure the access to your backend using OIDC Federation to enable auto-generated, short-lived, and non-persistent creden
- [AI SDK for Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [OpenAI](https://vercel.com/docs/agent-resources/integrations-for-models/openai?from=related) — Integrate your Vercel project with OpenAI's powerful suite of models.
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel?from=related) — Learn how to Sign in with Vercel

Full cross-link map for this page: [/docs/ai-gateway/authentication-and-byok.graph.md](/docs/ai-gateway/authentication-and-byok.graph.md)
<!-- /docsgraph:related -->

## Quick start

Get authenticated in under a minute:

1. Go to the [AI Gateway API Keys page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai-gateway%2Fapi-keys\&title=AI+Gateway+API+Keys) in your Vercel dashboard
2. Click **Create key** and follow the steps to generate a new API key.
3. Copy the API key and add it to your environment:

```bash
export AI_GATEWAY_API_KEY="your_api_key_here"
```

The [AI SDK](https://ai-sdk.dev/) automatically uses this environment variable for authentication.
If you are using a different SDK, you may need to pass the API key manually.

## Authentication methods

### API keys

API keys work anywhere, whether it's local development, external servers, or CI pipelines. They never expire unless you revoke them. To create, view, or delete keys, see [API keys](/docs/ai-gateway/authentication-and-byok/api-keys). To cap how much a key can spend, see [Budgets](/docs/ai-gateway/observability-and-spend/budgets#api-key-budgets).

> **💡 Note:** When a team member leaves your team, Vercel deactivates any API keys
> they created. If you need authentication that isn't tied to a
> specific person, use [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc)
> on Vercel deployments.

When you specify a model id as a plain string, the AI SDK automatically uses the Vercel AI Gateway provider and reads the API key from the `AI_GATEWAY_API_KEY` environment variable:

```typescript filename="app/api/chat/route.ts" {5}
import { generateText } from 'ai';

export async function GET() {
  const result = await generateText({
    model: 'xai/grok-4.5',
    prompt: 'Why is the sky blue?',
  });
  return Response.json(result);
}
```

### OIDC tokens

For applications deployed on Vercel, OIDC tokens are automatically available as `VERCEL_OIDC_TOKEN`. No secrets to manage, no keys to rotate. It just works. See [OIDC](/docs/ai-gateway/authentication-and-byok/oidc) for setup.

```typescript
// Automatically uses OIDC on Vercel, falls back to API key locally
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;
```

## Bring Your Own Key (BYOK)

BYOK lets you use your own provider credentials. This is useful when you:

- **Have existing agreements**: Use enterprise pricing or credits from providers
- **Need zero markup**: BYOK requests have no additional fee
- **Require private access**: Access provider features that need your own credentials
- **Want automatic fallback**: If your credentials fail, requests can retry with system credentials

BYOK credentials are configured at the team level and work across all projects. See the [BYOK documentation](/docs/ai-gateway/authentication-and-byok/byok) for setup instructions.

## Next steps

- [Create an API key](/docs/ai-gateway/authentication-and-byok/api-keys#create-a-key) in the dashboard
- [Set up OIDC](/docs/ai-gateway/authentication-and-byok/oidc) for zero-configuration authentication on Vercel
- [Set up BYOK](/docs/ai-gateway/authentication-and-byok/byok) to use your provider credentials


---

[View full sitemap](/docs/sitemap)
