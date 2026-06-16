---
title: OIDC
product: vercel
url: /docs/ai-gateway/authentication-and-byok/oidc
canonical_url: "https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc"
last_updated: 2026-05-30
type: how-to
prerequisites:
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway
related:
  - /docs/oidc
summary: Authenticate AI Gateway requests with Vercel OIDC tokens, with no API key to manage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "67de2cb88dcc46194b0e68cb77b93ed8b24114283d213e70acf4226143d2d6ed"
---

# OIDC

The [Vercel OIDC token](/docs/oidc) is a way to authenticate your requests to the AI Gateway without needing to manage an API key. Vercel automatically generates the OIDC token that it associates with your Vercel project.

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
      model: 'xai/grok-4.3',
      prompt: 'Why is the sky blue?',
    });
    return Response.json(result);
  }
  ```


---

[View full sitemap](/docs/sitemap)
