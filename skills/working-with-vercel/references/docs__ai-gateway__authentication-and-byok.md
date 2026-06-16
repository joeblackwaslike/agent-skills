---
title: Authentication & BYOK
product: vercel
url: /docs/ai-gateway/authentication-and-byok
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok"
last_updated: 2026-05-30
type: conceptual
prerequisites:
  - /docs/ai-gateway
related:
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/ai-gateway/authentication-and-byok/oidc
  - /docs/ai-gateway/authentication-and-byok/byok
summary: Learn how to authenticate with the AI Gateway and configure your own provider keys.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5eaead57f79ea6c08ea618630edba1b11dabe09110053220b9a9b5fc6a29e3d5"
---

# Authentication & BYOK

Every request to AI Gateway requires authentication. Vercel provides two methods: API keys and OIDC tokens. You can also bring your own provider credentials to use existing agreements or access private features.

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

API keys work anywhere, whether it's local development, external servers, or CI pipelines. They never expire unless you revoke them. To create, view, edit, or delete keys (and set spending budgets), see [API keys](/docs/ai-gateway/authentication-and-byok/api-keys).

> **⚠️ Warning:** When a team member leaves your team, Vercel deactivates any API keys
> they created. If you need authentication that isn't tied to a
> specific person, use [OIDC tokens](/docs/ai-gateway/authentication-and-byok/oidc)
> on Vercel deployments.

When you specify a model id as a plain string, the AI SDK automatically uses the Vercel AI Gateway provider and reads the API key from the `AI_GATEWAY_API_KEY` environment variable:

```typescript filename="app/api/chat/route.ts" {5}
import { generateText } from 'ai';

export async function GET() {
  const result = await generateText({
    model: 'xai/grok-4.3',
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
