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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "2a9654acc4c8d6f6b351144f4dd7de217307a74031328f3cc2787005d788de51"
---

# Forward Passport identity to another backend

A Passport-protected Vercel app can call another backend with the Passport token. Forward the token in the `Authorization` header, then verify it at the receiving service before trusting any claims.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Passport is now generally available](https://vercel.com/changelog/vercel-passport-generally-available)
- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Identify users and control access in Next.js with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nextjs) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Next.js, then personalize pages, restri
- [Personalize and lock down a Nuxt app with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nuxt) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Nuxt server routes, then personalize pa
- [Build user-aware TanStack Start apps with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-tanstack-start) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in TanStack Start server functions, then p
- [Use Vercel Passport with Node.js and Python backends](https://vercel.com/kb/guide/vercel-passport-backend-frameworks) — Secure internal apps and verify a visitor's identity with Vercel Passport in your backend, with examples for Express, Ho
- [Vercel Passport is now in Public Beta](https://vercel.com/changelog/vercel-passport-is-now-in-public-beta)
- [Set up Passport with an identity provider](https://vercel.com/docs/passport/set-up-identity-provider) — Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
