---
title: Restrict access to deployments with Passport
product: vercel
url: /docs/passport
canonical_url: "https://vercel.com/docs/passport"
last_updated: 2026-09-21
type: how-to
prerequisites:
  []
related:
  - /docs/passport/set-up-identity-provider
  - /docs/microfrontends/routing
  - /docs/deployment-protection/methods-to-protect-deployments
  - /docs/microfrontends/managing-microfrontends/security
  - /docs/passport/additional-identity-scopes
summary: Learn how to protect deployments with Passport, read visitor identity, and verify Passport tokens in server-side code.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "bf1d60aa1e375301823c875b7a5429b789d422bbc814fd44678a3744435ca3b4"
---

# Restrict access to deployments with Passport

> **Availability**: Passport is available on Enterprise plans

Passport lets you protect deployments with your own identity provider. Visitors authenticate with your identity provider before they can view a protected deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Vercel Passport is now generally available](https://vercel.com/changelog/vercel-passport-generally-available)
- [Vercel Passport is now in Public Beta](https://vercel.com/changelog/vercel-passport-is-now-in-public-beta)
- [Using Vercel Passport with Microsoft Entra ID](https://vercel.com/kb/guide/vercel-passport-microsoft-entra-id) — Configure Microsoft Entra ID and Vercel Passport to protect a Next.js app, limit access to assigned users, and read veri
- [Vercel for Enterprise](https://vercel.com/blog/vercel-for-enterprise)
- [Vercel Pricing](https://vercel.com/pricing) — Choose a Vercel plan and compare features and usage pricing.
- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Auth.js with Vercel Connect](https://vercel.com/docs/connect/frameworks/authjs) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.

Full cross-link map for this page: [/docs/passport.graph.md](/docs/passport.graph.md)
<!-- /docsgraph:related -->

Use Passport when you want visitors to sign in with an external identity provider, such as Microsoft Entra ID, Okta, or another OpenID Connect compatible provider. Vercel Connect stores the OAuth application configuration that talks to your identity provider.

## How Passport works

Passport has two parts:

- **Vercel Connect application**: The OAuth or OpenID Connect configuration that stores your identity provider's issuer, endpoints, client ID, and client secret.
- **Project or team setting**: The Passport configuration that selects the Connect application and controls whether Passport is enabled.

When a visitor opens a protected deployment, Vercel redirects them to your identity provider. After the identity provider authenticates the visitor, Vercel validates the response and sets a session cookie for the protected deployment.

New to Passport? [Set up Passport with an identity provider](/docs/passport/set-up-identity-provider) first, then return to the other guides when you need to use identity in application code.

## Use Passport with microfrontends

For a URL that uses [microfrontends routing](/docs/microfrontends/routing), the default application's Passport configuration protects every path, including paths served by child applications. Configure Passport on the default application to protect the composed microfrontend experience.

Passport completes authentication at `/.well-known/vercel/passport/callback` on the requested hostname. Vercel handles this callback before routing to your application, so you do not need to create the path in the default or child application.

For URLs with microfrontends routing, child paths use the default application's Passport configuration. Child applications cannot have an independent Passport connection while they belong to the group.

The default application's Passport configuration does not protect a child application's direct domains. Protect those domains with another [Deployment Protection method](/docs/deployment-protection/methods-to-protect-deployments). To configure Passport on the child project, remove it from the group first.

Learn more about [Deployment Protection and microfrontends](/docs/microfrontends/managing-microfrontends/security#deployment-protection-and-microfrontends).

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
