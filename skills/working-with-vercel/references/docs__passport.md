---
title: Restrict access to deployments with Passport
product: vercel
url: /docs/passport
canonical_url: "https://vercel.com/docs/passport"
last_updated: 2026-07-30
type: how-to
prerequisites:
  []
related:
  - /docs/passport/set-up-identity-provider
  - /docs/passport/additional-identity-scopes
  - /docs/passport/read-identity
  - /docs/passport/token-claims
  - /docs/passport/verify-identity
summary: Learn how to protect deployments with Passport, read visitor identity, and verify Passport tokens in server-side code.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b709a15fbc9499deedee3f7df29f7bc00732ecfc2b2d286769d3f08a2a20afa2"
---

# Restrict access to deployments with Passport

> **🔒 Permissions Required**: Passport


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Passport](https://vercel.com/kb/guide/vercel-passport?from=related) — Vercel Passport protects deployments behind your own identity provider, such as Okta or Auth0. Learn how Passport works,
- [How to identify and authorize visitors with the Vercel Passport token in Next.js](https://vercel.com/kb/guide/vercel-passport-nextjs?from=related) — Read the Vercel Passport token server-side in a Next.js app to identify visitors with the external_sub claim and authori
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Password Protection](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection?from=related) — Require visitors to enter a password before they can view your deployments.
- [Bypass Deployment Protection](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection?from=related) — Learn how to bypass Deployment Protection for specific domains, or for all deployments in a project.

Full cross-link map for this page: [/docs/passport.graph.md](/docs/passport.graph.md)
<!-- /docsgraph:related -->

Passport lets you protect deployments with your own identity provider. Visitors authenticate with your identity provider before they can view a protected deployment.

Use Passport when you want visitors to sign in with an external identity provider, such as Microsoft Entra ID, Okta, or another OpenID Connect compatible provider. Vercel Connect stores the OAuth application configuration that talks to your identity provider.

## How Passport works

Passport has two parts:

- **Vercel Connect application**: The OAuth or OpenID Connect configuration that stores your identity provider's issuer, endpoints, client ID, and client secret.
- **Project or team setting**: The Passport configuration that selects the Connect application and controls whether Passport is enabled.

When a visitor opens a protected deployment, Vercel redirects them to your identity provider. After the identity provider authenticates the visitor, Vercel validates the response and sets a session cookie for the protected deployment.

New to Passport? [Set up Passport with an identity provider](/docs/passport/set-up-identity-provider) first, then return to the other guides when you need to use identity in application code.

## Guides

**Set up Passport with an identity provider**: Configure Passport for Okta, Microsoft Entra ID, and other OIDC providers. [Learn more →](/docs/passport/set-up-identity-provider)

**Configure additional identity scopes**: Request group membership and other provider-specific identity claims. [Learn more →](/docs/passport/additional-identity-scopes)

**Read Passport identity in your application**: Read a verified visitor identity from route handlers, server actions, and server components. [Learn more →](/docs/passport/read-identity)

**Passport token claims**: Review the standard, deployment, and visitor identity claims in a Passport token. [Learn more →](/docs/passport/token-claims)

**Verify forwarded Passport tokens**: Verify a forwarded token as a signed JWT. [Learn more →](/docs/passport/verify-identity)

**Forward Passport identity to another backend**: Pass a Passport token to a backend you operate over HTTPS. [Learn more →](/docs/passport/forward-identity)

## Monitor Passport access

When a visitor successfully authenticates to a Passport-protected project, Vercel records a `passport-access-granted` event in both the [Activity Log](/dashboard/activity?types=passport-access-granted) and [Audit Logs](/docs/audit-log). The event identifies the visitor and records the protected hostname and project context.

In the Activity Log, select **Filter by Event**, then select **passport-access-granted** to view Passport access events.

## Pricing

Passport is available as an Enterprise feature. Contact your Vercel account team for pricing.

## Related resources

- [Deployment Protection](/docs/deployment-protection)
- [Methods to protect deployments](/docs/deployment-protection/methods-to-protect-deployments)
- [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)
- [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation): Access a Passport-protected deployment without an identity provider session. Send the bypass secret with the original request because Passport runs before deployment routes and Next.js proxy functions.


---

[View full sitemap](/docs/sitemap)
