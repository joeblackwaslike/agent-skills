---
title: Forward Passport identity to another backend
product: vercel
url: /docs/passport/forward-identity
canonical_url: "https://vercel.com/docs/passport/forward-identity"
last_updated: 2026-07-20
type: how-to
prerequisites:
  - /docs/passport
related:
  - /docs/passport/verify-identity
summary: Forward a Passport visitor identity to another backend that you operate.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/forward-identity.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ab0130f63f2421b81d8550866b128f51056c52cda00494b74ecfb549f86633e5"
---

# Forward Passport identity to another backend

A Passport-protected Vercel app can call another backend with the Passport token. Forward the token in the `Authorization` header, then verify it at the receiving service before trusting any claims.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Passport](https://vercel.com/kb/guide/vercel-passport?from=related) — Vercel Passport protects deployments behind your own identity provider, such as Okta or Auth0. Learn how Passport works,
- [How to identify and authorize visitors with the Vercel Passport token in Next.js](https://vercel.com/kb/guide/vercel-passport-nextjs?from=related) — Read the Vercel Passport token server-side in a Next.js app to identify visitors with the external_sub claim and authori
- [Read Identity](https://vercel.com/docs/passport/read-identity?from=related) — Read verified Passport identity in server-side code and apply application-level authorization.
- [Set Up Passport](https://vercel.com/docs/passport/set-up-identity-provider?from=related) — Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.
- [Additional Scopes](https://vercel.com/docs/passport/additional-identity-scopes?from=related) — Request group membership and other provider-specific identity claims when using Passport.
- [Token Claims](https://vercel.com/docs/passport/token-claims?from=related) — Review the standard, deployment, and visitor identity claims in a Passport token.
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel?from=related) — Learn how to Sign in with Vercel

Full cross-link map for this page: [/docs/passport/forward-identity.graph.md](/docs/passport/forward-identity.graph.md)
<!-- /docsgraph:related -->

```js filename="app/api/report/route.js"
import { getIdentity } from '@vercel/passport';

export async function POST() {
  let identity;

  try {
    identity = await getIdentity();
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!identity?.token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch('https://api.example.com/do-stuff', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${identity.token}`,
    },
  });

  return Response.json(await response.json(), { status: response.status });
}
```

Only forward Passport tokens over HTTPS to backends that you operate. A Passport token authenticates the visitor to your backend. It is not an access token for your identity provider or a downstream service. If the backend needs to exchange or store credentials for another service, use Vercel Connect for that credential flow. If the backend only needs to know who the Passport visitor is, it can use `verifyIdentity()` to [verify the Passport token](/docs/passport/verify-identity) directly.


---

[View full sitemap](/docs/sitemap)
