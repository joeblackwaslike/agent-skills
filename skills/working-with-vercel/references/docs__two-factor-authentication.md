---
title: Two-factor Authentication
product: vercel
url: /docs/two-factor-authentication
canonical_url: "https://vercel.com/docs/two-factor-authentication"
last_updated: 2026-06-16
type: how-to
prerequisites:
  []
related:
  - /docs/accounts
  - /docs/two-factor-enforcement
summary: Learn how to configure two-factor authentication for your Vercel account.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/two-factor-authentication.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "dee9a97e4f7d6429b08b7aa7f35f74f17592edfe6551c8f451cb08fde3c3a15f"
---

# Two-factor Authentication

To add an additional layer of security to your Vercel account, you can enable two-factor authentication (2FA).
This feature requires you to provide a second form of verification when logging in to your account. There are two
methods available for 2FA on Vercel:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Application Authentication on Vercel](https://vercel.com/kb/guide/application-authentication-on-vercel?from=related) — Learn best practices for application authentication Vercel
- [Why am I unable to login or signup to the Vercel platform?](https://vercel.com/kb/guide/why-can-i-not-signup?from=related) — Information on what to do if you are experiencing issues logging in or signing up to the Vercel platform.
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel?from=related) — Learn how to Sign in with Vercel
- [Manage from Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [SAML SSO](https://vercel.com/docs/saml?from=related) — Learn how to configure SAML SSO for your organization on Vercel.
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication?from=related) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.

Full cross-link map for this page: [/docs/two-factor-authentication.graph.md](/docs/two-factor-authentication.graph.md)
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
