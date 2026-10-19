---
title: Verify forwarded Passport tokens
product: vercel
url: /docs/passport/verify-identity
canonical_url: "https://vercel.com/docs/passport/verify-identity"
last_updated: 2026-07-20
type: how-to
prerequisites:
  - /docs/passport
related:
  - /docs/passport/token-claims
  - /docs/passport/additional-identity-scopes
summary: Verify a Passport token forwarded to your backend as a signed JWT.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/verify-identity.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "1f9380526c4f6d582ad1c30dd8607c2d101d26fedea4e35387fe892a363b044a"
---

# Verify forwarded Passport tokens

When a Passport-protected app forwards a token to another backend, the receiving backend must verify it before trusting its claims. The `verifyIdentity()` helper verifies the Passport JWT signature, validates its Passport-specific claims, and checks that it came from the expected source project and environment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Passport is now generally available](https://vercel.com/changelog/vercel-passport-generally-available)
- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Identify users and control access in Next.js with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nextjs) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Next.js, then personalize pages, restri
- [Personalize and lock down a Nuxt app with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nuxt) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Nuxt server routes, then personalize pa
- [Build user-aware TanStack Start apps with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-tanstack-start) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in TanStack Start server functions, then p
- [Use Vercel Passport with Node.js and Python backends](https://vercel.com/kb/guide/vercel-passport-backend-frameworks) — Secure internal apps and verify a visitor's identity with Vercel Passport in your backend, with examples for Express, Ho
- [Set up Passport with an identity provider](https://vercel.com/docs/passport/set-up-identity-provider) — Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.
- [OIDC Federation Reference](https://vercel.com/docs/oidc/reference) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.
- [Troubleshooting Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel/troubleshooting) — Learn how to troubleshoot common errors with Sign in with Vercel

Full cross-link map for this page: [/docs/passport/verify-identity.graph.md](/docs/passport/verify-identity.graph.md)
<!-- /docsgraph:related -->

Install `@vercel/passport` in the receiving service:

```bash package-manager
pnpm add @vercel/passport
```

`verifyIdentity()` is available in `@vercel/passport` version 0.1.3 and later.

Pass the owner ID, project ID, and environment from the Passport-protected deployment that minted the token. `verifyIdentity()` reads the bearer token directly from the request and always verifies it:

```js filename="app/api/do-stuff/route.js"
import { verifyIdentity } from '@vercel/passport';

const ownerId = 'team_your_team_id_here';
const projectId = 'prj_your_project_id_here';
const environment = 'production';

export async function POST(request) {
  try {
    const identity = await verifyIdentity(request, {
      ownerId,
      projectId,
      environment,
    });

    return Response.json({
      issuer: identity.payload.iss,
      subject: identity.subject,
      externalSubject: identity.externalSubject,
      email: identity.email,
    });
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

If the receiving backend runs in another Vercel project, keep validating the issuer and audience of the **source** Passport-protected deployment. Do not derive them from the receiving project.

## Verify tokens outside JavaScript

For non-JavaScript services, verify the Passport token as a signed JWT. The service should check:

- The signature with the Passport issuer's JSON Web Key Set (JWKS).
- The `iss` claim, such as `https://passport.vercel.com/your_team_slug_here`.
- The `aud` claim for the expected owner, project, and environment.
- The `exp` and `nbf` claims.
- The `typ` claim equals `passport`.
- The `iss` and `sub` claims together identify the Passport visitor.
- The `project_id`, `environment`, and optional `owner_id` claims.

Passport exposes OpenID Connect discovery at `https://passport.vercel.com/your_team_slug_here/.well-known/openid-configuration`. Its `jwks_uri` is `https://passport.vercel.com/.well-known/jwks.json`.

See the [Passport token claims reference](/docs/passport/token-claims) for the complete schema and guidance on choosing a visitor identifier.

## Troubleshooting

### The bearer token is missing

Confirm that the source application sends the Passport token unchanged in `Authorization: Bearer <token>`, then pass the receiving request to `verifyIdentity()`. Do not forward the decoded payload or the Passport session cookie value in another format.

### The source deployment does not match

Pass the owner ID, project ID, and environment of the Passport-protected **source deployment** that minted the token. A receiving backend in another project must not substitute its own project ID or environment.

### Signature verification fails

Confirm that `verifyIdentity()` receives the complete token and that the server can reach the Passport JWKS. Also confirm that the server clock is accurate so `exp` and `nbf` checks are reliable. Treat every verification failure as an unauthenticated request, and do not log the raw token.

### Expected identity claims are missing

Profile and additional claims are optional. Base the authorization decision on required, validated claims and deny access when a required claim is absent or has an unexpected type. See [Configure additional identity scopes](/docs/passport/additional-identity-scopes).


---

[View full sitemap](/docs/sitemap)
