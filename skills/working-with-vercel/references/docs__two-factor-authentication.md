---
title: Two-factor Authentication
product: vercel
url: /docs/two-factor-authentication
canonical_url: "https://vercel.com/docs/two-factor-authentication"
last_updated: 2026-08-28
type: how-to
prerequisites:
  []
related:
  - /docs/accounts
  - /docs/two-factor-enforcement
summary: Learn how to configure two-factor authentication for your Vercel account.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/two-factor-authentication.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "5ad1e28f9fce2a34f35fc8970bb289f83b2c18404f5e127c981a2370c4a2ebbb"
---

# Two-factor Authentication

To add an additional layer of security to your Vercel account, you can enable two-factor authentication (2FA).
This feature requires you to provide a second form of verification when logging in to your account. There are two
methods available for 2FA on Vercel:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Two-Factor Authentication (2FA) is now available](https://vercel.com/changelog/2fa-is-now-available?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related)
- [Two-factor authentication (2FA) team enforcement](https://vercel.com/changelog/2fa-team-enforcement?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related)
- [Why am I unable to login or signup to the Vercel platform?](https://vercel.com/kb/guide/why-can-i-not-signup?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related) — Information on what to do if you are experiencing issues logging in or signing up to the Vercel platform.
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related) — Learn how to Sign in with Vercel
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [SAML Single Sign-On](https://vercel.com/docs/saml?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related) — Learn how to configure SAML SSO for your organization on Vercel.
- [Access Control](https://vercel.com/docs/security/access-control?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Authentication](https://vercel.com/docs/rest-api/authentication?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=related) — Endpoints in the authentication group of the Vercel REST API Reference.

Full cross-link map for this page: [/docs/two-factor-authentication.graph.md](/docs/two-factor-authentication.graph.md?from=related&source_path=%2Fdocs%2Ftwo-factor-authentication&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Authenticator App**: Use an authenticator app like Google Authenticator to generate a time-based one-time password (TOTP).
- **Passkey**: Authenticate using any WebAuthN compatible device, such as a security key or biometric key.

## Enabling two-factor authentication

1. Navigate to your [account settings](https://vercel.com/account/settings/authentication#two-factor-authentication) on Vercel
2. Toggle the switch to enable 2FA
3. Set up your 2FA methods
4. Confirm your setup
5. Save your recovery codes

![Image](https://vercel.com/front/docs/two-factor/two-factor-settings.png)

### Configuring an authenticator app (TOTP)

Scan the QR code with your authenticator app or manually enter the provided key.
Once added, enter the generated 6-digit code to verify your setup.

![Image](https://vercel.com/front/docs/two-factor/totp.png)

### Configuring a passkey

See the [Login with passkeys](/docs/accounts#login-with-passkeys) for more information on setting up a security key or biometric key.

### Recovery codes

After setting up two-factor authentication (2FA), you will be prompted to save your recovery codes.
Store these codes in a safe place, as they can be used to access your account if you lose access to your 2FA methods.

Each recovery code can only be used once, and you can generate a new set of codes at any time.

![Image](https://vercel.com/front/docs/two-factor/recovery-codes.png)

## Enforcing two-factor authentication

Teams can enforce two-factor authentication (2FA) for all members. Once enabled, team members must configure 2FA before accessing team resources.
Visit the [Two-Factor Enforcement](/docs/two-factor-enforcement) documentation for more information on how to enforce 2FA for your team.


---

[View full sitemap](/docs/sitemap)
