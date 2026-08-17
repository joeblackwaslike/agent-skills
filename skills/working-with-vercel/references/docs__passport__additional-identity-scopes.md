---
title: Configure additional identity scopes
product: vercel
url: /docs/passport/additional-identity-scopes
canonical_url: "https://vercel.com/docs/passport/additional-identity-scopes"
last_updated: 2026-07-20
type: how-to
prerequisites:
  - /docs/passport
related:
  - /docs/passport/read-identity
  - /docs/passport/verify-identity
summary: Request group membership and other provider-specific identity claims when using Passport.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/additional-identity-scopes.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a4ebc3975807a7345dd11d599b21937db09ee8f7e3b8f181ba99ea69c22d4589"
---

# Configure additional identity scopes

Passport requests identity information through the Connect application assigned to your project. An OAuth scope asks your identity provider for a category of information. A claim is the value the provider returns, such as a visitor's email address or group membership.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Passport](https://vercel.com/kb/guide/vercel-passport?from=related) — Vercel Passport protects deployments behind your own identity provider, such as Okta or Auth0. Learn how Passport works,
- [How to identify and authorize visitors with the Vercel Passport token in Next.js](https://vercel.com/kb/guide/vercel-passport-nextjs?from=related) — Read the Vercel Passport token server-side in a Next.js app to identify visitors with the external_sub claim and authori
- [Token Claims](https://vercel.com/docs/passport/token-claims?from=related) — Review the standard, deployment, and visitor identity claims in a Passport token.
- [Set Up Passport](https://vercel.com/docs/passport/set-up-identity-provider?from=related) — Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.
- [Forward Identity](https://vercel.com/docs/passport/forward-identity?from=related) — Forward a Passport visitor identity to another backend that you operate.
- [Scopes & Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions?from=related) — Learn how to manage scopes and permissions for Sign in with Vercel
- [OIDC Reference](https://vercel.com/docs/oidc/reference?from=related) — Review helper libraries to help you connect with your backend and understand the structure of an OIDC token.

Full cross-link map for this page: [/docs/passport/additional-identity-scopes.graph.md](/docs/passport/additional-identity-scopes.graph.md)
<!-- /docsgraph:related -->

Passport uses the standard OpenID Connect scopes, including `openid`, `profile`, and `email`. You can configure Connect to include additional claims, such as group membership, in the Passport token when your identity provider supports them.

## Add a scope to the Connect application

For example, configure the `groups` scope when your application needs to make authorization decisions based on group membership:

1. In the [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fpassport\&title=Project+Passport+Settings), open the Connect application that Passport uses.
2. Under **Grant Types**, enable **User Authorization**.
3. Add `groups` to the **User Authorization** scopes.
4. Under **Forwarded ID Token Claims**, add `groups`. This is the allowlist for additional identity claims that Connect can include in the Passport token.
5. Save the application.

The scope must also be enabled for the OAuth application in your identity provider. The exact setup varies by provider. Requesting a scope does not grant access by itself: your provider must authorize the scope and return the selected claim from its UserInfo endpoint before Connect can include it in the Passport token.

> **💡 Note:** Scope suggestions come from your provider's OAuth metadata and can include
> non-identity API permissions. Request only the scopes your application needs.
> For example, Okta's `okta.*` management scopes are not required to include a
> visitor's groups in a Passport token.

## Configure groups in Okta

Configure the group claim in the Okta authorization server that matches the issuer in your Connect application. Do not combine an issuer or endpoint from one authorization server with a group claim configured in another.

### Organization authorization server

An organization authorization server has an issuer without `/oauth2/{authorization_server_id}`, such as `https://your_okta_domain.okta.com`.

1. In Okta, go to **Applications** > **Applications**, then select your OpenID Connect application.
2. Open the **Sign On** tab.
3. Under **OpenID Connect ID Token**, click **Edit**.
4. In **Group Claims**, select **Filter**.
5. Set the claim name to `groups`.
6. Select **Matches regex** and enter `.*` to return all groups for the signed-in visitor.
7. Save the change. If Okta shows **Refresh Application Data** in the application menu, select it.

`Starts with .*` does not match every group. Okta treats that value as literal text. Use **Matches regex** with `.*` instead.

### Custom authorization server

A custom authorization server has an issuer such as `https://your_okta_domain.okta.com/oauth2/default`.

1. In Okta, go to **Security** > **API** > **Authorization Servers**, then select the authorization server.
2. Open **Claims** and add a `groups` claim.
3. Include the claim in the **ID Token**.
4. Select **Groups** as the value type.
5. Select **Matches regex** and enter `.*`.
6. Save the claim.

Assigning people or groups to an Okta application controls who can sign in. It does not automatically add group membership to an OAuth token. Configure the claim as described above as well.

## Confirm the claim is present

Start a new Passport session after changing your provider configuration. For example, use a private browser window, then inspect the verified Passport identity in server-side code:

```js filename="app/api/me/route.js"
import { getIdentity } from '@vercel/passport';

export async function GET() {
  const identity = await getIdentity();

  return Response.json({
    groups: identity?.payload.groups,
  });
}
```

When the provider does not return the requested claim, Passport omits it. Treat the claim as optional input and deny access when your authorization policy requires a missing or invalid claim.

## Use identity claims safely

Treat identity claims as input to application-level authorization, not as a replacement for Passport's deployment protection. Passport decides whether the visitor may enter the protected deployment. Your application can then use verified identity claims to decide whether the visitor may access a particular route or action.

Read identity only in server-side code and use the verified Passport token. See [Read Passport identity in your application](/docs/passport/read-identity) for the recommended helper and [Verify forwarded Passport tokens](/docs/passport/verify-identity) when another backend receives the token.

Do not assume a claim is always present or has the same shape for every provider. Check that it exists, validate its type, and deny access when your authorization policy requires a claim that is absent or invalid.


---

[View full sitemap](/docs/sitemap)
