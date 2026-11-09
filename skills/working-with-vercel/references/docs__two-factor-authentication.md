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
  - /docs/two-factor-enforcement
  - /docs/accounts
summary: Set up two-factor authentication with an authenticator app, save recovery codes, and add a passkey.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/two-factor-authentication.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "89af1eb414dcbf3e717db3c51ac0a49963a17dc816e040455b6569ba55f878f0"
---

# Two-factor Authentication

Two-factor authentication (2FA) adds a verification step when you sign in to Vercel. Set up an authenticator app for 2FA. You can also add a passkey for phishing-resistant sign-in.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Two-Factor Authentication (2FA) is now available](https://vercel.com/changelog/2fa-is-now-available)
- [Two-factor authentication (2FA) team enforcement](https://vercel.com/changelog/2fa-team-enforcement)
- [The complete guide to authentication on Vercel](https://vercel.com/kb/guide/complete-guide-authentication-vercel) — Learn how to implement authentication in your Vercel applications. Covers NextAuth/Auth.js setup, environment variable c
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel) — Learn how to Sign in with Vercel
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard) — Learn how to manage Sign in with Vercel from the Dashboard
- [Troubleshooting Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel/troubleshooting) — Learn how to troubleshoot common errors with Sign in with Vercel
- [SAML Single Sign-On](https://vercel.com/docs/saml) — Learn how to configure SAML SSO for your organization on Vercel.
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.

Full cross-link map for this page: [/docs/two-factor-authentication.graph.md](/docs/two-factor-authentication.graph.md)
<!-- /docsgraph:related -->

## Authenticator app requirements

All Vercel users must [set up an authenticator app](#configuring-an-authenticator-app-totp) by **January 20, 2027**. If you already use a passkey, keep it and add an authenticator app.

Existing [team 2FA requirements](/docs/two-factor-enforcement) still apply. If your team already requires 2FA, you must have 2FA enabled to access its resources.

## Enabling two-factor authentication

Use an authenticator app such as Google Authenticator, Microsoft Authenticator, or a password manager that supports time-based one-time passwords (TOTP).

### Configuring an authenticator app (TOTP)

1. [Open authenticator setup](https://vercel.com/account/settings/authentication?setup=authenticator). Sign in and verify your identity if prompted.
2. In your authenticator app, add an account and scan the QR code that Vercel displays. If you can't scan the code, copy the setup key into your app.
3. Enter the six-digit code from your Vercel entry in the authenticator app.
4. Complete the setup prompts, selecting **Enable** if prompted.
5. Download or copy your recovery codes to a secure location, then confirm that you've saved them.
6. Return to your [authentication settings](https://vercel.com/account/settings/authentication#two-factor-authentication). Confirm that 2FA shows **Active** or **Enabled** and **Authenticator App (TOTP)** shows **Enrolled** or **Added**.

![Authenticator app setup.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/two-factor/totp.png)

### Configuring a passkey

After setting up your authenticator app, you can add a passkey to sign in with a fingerprint, face recognition, or device PIN. You can save a passkey on a compatible device, in a password manager, or on a hardware security key.

Passkeys protect against phishing by checking the site's identity. Keep your authenticator app and recovery codes in case you lose access to your passkey.

1. Open your [authentication settings](https://vercel.com/account/settings/authentication).
2. Under **Sign-in Methods**, select **Add** next to **Passkeys**, then **Continue**.
3. Choose where to save the passkey and follow your browser or device prompts.
4. Confirm that the passkey appears in your list of login methods.

For device options, see [Login with passkeys](/docs/accounts#login-with-passkeys).

### Recovery codes

Recovery codes let you sign in if you lose access to your authenticator app or passkey. When Vercel prompts you during setup, save the codes in a password manager or another secure location you can access without your device.

Each code works once. You can generate a new set in your authentication settings.

![Save your recovery codes during setup.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/two-factor/recovery-codes.png)

## Troubleshooting setup and sign-in

- **Authenticator code rejected**: Check that you're using the correct Vercel account entry. Enter a fresh code before it changes. If codes still fail, set your device's date and time automatically.
- **Setup no longer valid**: Follow Vercel's prompt to get a new QR code. Replace the previous setup entry in your app, then verify the new code.
- **Lost access to your authenticator**: Use an enrolled passkey or a saved recovery code when signing in. If neither is available, follow the recovery options on the sign-in screen or [start account recovery](https://vercel.com/accountrecovery?userType=existing\&problemType=lost-2fa).

## Enforcing two-factor authentication

Team owners can require members to enable 2FA before accessing team resources. Enabling personal 2FA doesn't enable this team setting.

See [two-factor enforcement](/docs/two-factor-enforcement) to prepare members, review automation, and enable enforcement.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
