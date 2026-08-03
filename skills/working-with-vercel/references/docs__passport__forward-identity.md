---
title: Forward Passport identity to another backend
product: vercel
url: /docs/passport/forward-identity
canonical_url: "https://vercel.com/docs/passport/forward-identity"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/passport
related:
  - /docs/passport/verify-identity
summary: Forward a Passport visitor identity to another backend that you operate.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/forward-identity.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "1fe49f28a64ff1a8237b127202b2634a54d9c81f406dda279b426a18e6f118df"
---

# Forward Passport identity to another backend

A Passport-protected Vercel app can call another backend with the Passport token. Forward the token in the `Authorization` header, then verify it at the receiving service before trusting any claims.

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
