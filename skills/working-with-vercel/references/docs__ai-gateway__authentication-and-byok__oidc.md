---
title: OIDC
product: vercel
url: /docs/ai-gateway/authentication-and-byok/oidc
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc"
last_updated: 2026-07-28
type: how-to
prerequisites:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway
related:
  - /docs/oidc
summary: Authenticate AI Gateway requests with Vercel OIDC tokens, with no API key to manage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "5b36f8000d9d9e15b26ffd349ad28e06cd4a45d16ce78ecc95ba73a466ff863a"
---

# OIDC

The [Vercel OIDC token](/docs/oidc) is a way to authenticate your requests to the AI Gateway without needing to manage an API key. Vercel automatically generates the OIDC token that it associates with your Vercel project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The complete guide to authentication on Vercel](https://vercel.com/kb/guide/complete-guide-authentication-vercel?from=related) — Learn how to implement authentication in your Vercel applications. Covers NextAuth/Auth.js setup, environment variable c
- [Connect your API](https://vercel.com/docs/oidc/api?from=related) — Learn how to configure your own API to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\)
- [Generate a project OIDC token](https://vercel.com/docs/rest-api/projects/generate-a-project-oidc-token?from=related)
- [Authentication](https://vercel.com/docs/sandbox/concepts/authentication?from=related) — Learn how to authenticate with Vercel Sandbox using OIDC tokens or access tokens.
- [Authentication](https://vercel.com/docs/kms/concepts/authentication?from=related) — How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel ac
- [Azure](https://vercel.com/docs/oidc/azure?from=related) — Learn how to configure your Microsoft Azure account to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).

Full cross-link map for this page: [/docs/ai-gateway/authentication-and-byok/oidc.graph.md](/docs/ai-gateway/authentication-and-byok/oidc.graph.md)
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


---

[View full sitemap](/docs/sitemap)
