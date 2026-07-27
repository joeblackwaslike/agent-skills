---
title: Read Identity
product: vercel
url: /docs/passport/read-identity
canonical_url: "https://vercel.com/docs/passport/read-identity"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/passport
related:
  - /docs/passport/token-claims
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/passport/additional-identity-scopes
summary: Learn about read identity on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/read-identity.md"
fetched_at: "2026-07-27T07:38:10.222Z"
sha256: "6c64b84498025cada97b0cc24e15277db2677a7dde8965a108b381b3ec1c2a62"
---

# Read Passport identity in your application

After Passport authenticates a visitor, Vercel stores a signed Passport session token in the `_vercel_passport` cookie. Vercel also forwards that token to your deployment in the `x-vercel-oidc-passport-token` request header.

The token is a Vercel-signed Passport identity token (JWT) that includes deployment context and Passport identity claims. Use its `sub` claim as the stable Passport principal for a visitor. It is scoped to the Vercel team and Connector application. If your application accepts Passport tokens from more than one issuer, use the `iss` and `sub` claims together as the visitor identifier. See the [Passport token claims reference](/docs/passport/token-claims) for the complete token schema.

Profile fields such as email or name are not guaranteed. They only appear if your identity provider returns them in the Passport user info response.

> **💡 Note:** Read `x-vercel-oidc-passport-token` from server-side code. Vercel strips
> incoming client-supplied values for this header and injects the verified token
> after Passport validates the session.

## Use the Passport helper

Use `@vercel/passport` to read the Passport identity from Vercel Functions. The helper reads Vercel's request context by default, verifies the Passport token, and returns identity fields for application code.

Install the package in your project:

```bash package-manager
pnpm add @vercel/passport
```

Then call `getIdentity()` from server-side code:

```js filename="app/api/me/route.js"
import { getIdentity } from '@vercel/passport';

export async function GET() {
  try {
    const identity = await getIdentity();

    if (!identity) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return Response.json({
      issuer: identity.payload.iss,
      subject: identity.subject,
      externalSubject: identity.externalSubject,
      email: identity.email,
      name: identity.name,
    });
  } catch {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
```

Use `identity.subject` as the visitor identifier for a single Passport issuer. If your application accepts tokens from more than one Passport team, persist `identity.payload.iss` with `identity.subject`. Do not parse the subject. `identity.externalSubject` identifies the visitor in the configured identity provider. A visitor who signs in through a different Connector application or has a different external subject has a different Passport subject. Treat `identity.email` and `identity.name` as optional because Passport only includes profile fields returned by your identity provider.

## Develop locally

Passport runs in Vercel's network before a request reaches your deployment. A local development server therefore does not receive the real `_vercel_passport` cookie or `x-vercel-oidc-passport-token` header.

When neither value is present, `getIdentity()` returns a Passport-shaped development identity by default and logs a warning the first time it does so. The default identity includes:

```txt
subject: owner:local:connector:local:principal:test-user
externalSubject: test-user
email: test-user@passport.local
name: Test User
```

The development identity has `verified: false` and does not contain a token. Use it as a local fixture for application logic, not as proof that the Passport sign-in flow succeeded.

### Customize the development identity

Set development identity fields in your local environment when your application expects particular owner, project, Connector, or visitor values:

```bash filename=".env.local"
VERCEL_PASSPORT_DEV_OWNER=acme
VERCEL_PASSPORT_DEV_OWNER_ID=team_123
VERCEL_PASSPORT_DEV_PROJECT=my-project
VERCEL_PASSPORT_DEV_PROJECT_ID=prj_123
VERCEL_PASSPORT_DEV_CONNECTOR_ID=scl_dev
VERCEL_PASSPORT_DEV_EXTERNAL_SUB=user_dev
VERCEL_PASSPORT_DEV_EXTERNAL_ISS=https://idp.example.com
```

You can also configure the fixture in code:

```js
const identity = await getIdentity(undefined, {
  development: {
    owner: 'acme',
    ownerId: 'team_123',
    project: 'my-project',
    projectId: 'prj_123',
    connectorId: 'scl_dev',
    externalSubject: 'user_dev',
  },
});
```

### Test an unauthenticated request

Disable the development identity when you need `getIdentity()` to return `null`:

```bash filename=".env.local"
VERCEL_PASSPORT_DEV=0
```

Or disable it for one call:

```js
const identity = await getIdentity(undefined, { development: false });
```

### Test the real Passport flow

Use a Passport-protected Vercel deployment to test the actual identity provider redirect, session cookie, injected request header, and verified claims. Preview and production deployments do not synthesize a development identity.

## Apply application-level authorization

Vercel evaluates Passport before deployment routes and Next.js proxy functions run. An unauthenticated browser request is redirected to the identity provider before it reaches your application.

Use the Passport identity in route handlers, server actions, or server components for **application-level authorization** after Passport has allowed the request. This is useful when your application needs to apply an additional policy, such as allowing only particular Passport subjects to access an admin area.

For policies shared by multiple routes, put the identity check in a shared server-side helper and call it from each protected route.

Do not use a Next.js proxy function to make a Passport-protected path public or to bypass Passport. It runs after Passport has made the sign-in decision. Also, `getIdentity()` verifies tokens against the Passport JWKS and may make a network request, which is not a good fit for a request proxy. To reach a Passport-protected webhook, cron endpoint, or other machine-to-machine route without a Passport session, the original request must include a [Protection Bypass for Automation secret](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation).

## Troubleshooting

### `getIdentity()` returns `null`

Confirm that the request reached a Passport-protected Vercel deployment and that `getIdentity()` runs in server-side code. A request that uses Protection Bypass for Automation without an existing Passport session does not have a Passport identity and can legitimately return `null`.

If your server runtime does not expose Vercel's request context, pass its request or headers to `getIdentity()` explicitly.

### Profile or group claims are missing

Profile and additional claims are optional. Confirm that the identity provider returns the claim and that the Connect application requests and forwards it. Then start a new Passport session. See [Configure additional identity scopes](/docs/passport/additional-identity-scopes).

### Token verification fails

Treat the request as unauthenticated. Confirm that application code reads the Vercel-injected `x-vercel-oidc-passport-token` header instead of a client-supplied value. Do not log the raw token while investigating the failure.


---

[View full sitemap](/docs/sitemap)
