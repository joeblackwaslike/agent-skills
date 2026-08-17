---
title: Set up Passport with an identity provider
product: vercel
url: /docs/passport/set-up-identity-provider
canonical_url: "https://vercel.com/docs/passport/set-up-identity-provider"
last_updated: 2026-07-20
type: tutorial
prerequisites:
  - /docs/passport
related:
  []
summary: Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/set-up-identity-provider.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d0368ba219f05fda5ec17a5231b911bd5b087c60c23c966e206c0695e5f67b7f"
---

# Set up Passport with an identity provider

> **🔒 Permissions Required**: Passport


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Passport](https://vercel.com/kb/guide/vercel-passport?from=related) — Vercel Passport protects deployments behind your own identity provider, such as Okta or Auth0. Learn how Passport works,
- [How to identify and authorize visitors with the Vercel Passport token in Next.js](https://vercel.com/kb/guide/vercel-passport-nextjs?from=related) — Read the Vercel Passport token server-side in a Next.js app to identify visitors with the external_sub claim and authori
- [Read Identity](https://vercel.com/docs/passport/read-identity?from=related) — Read verified Passport identity in server-side code and apply application-level authorization.
- [Additional Scopes](https://vercel.com/docs/passport/additional-identity-scopes?from=related) — Request group membership and other provider-specific identity claims when using Passport.
- [Verify Tokens](https://vercel.com/docs/passport/verify-identity?from=related) — Verify a Passport token forwarded to your backend as a signed JWT.
- [Token Claims](https://vercel.com/docs/passport/token-claims?from=related) — Review the standard, deployment, and visitor identity claims in a Passport token.
- [OIDC](https://vercel.com/docs/oidc?from=related) — Secure the access to your backend using OIDC Federation to enable auto-generated, short-lived, and non-persistent creden

Full cross-link map for this page: [/docs/passport/set-up-identity-provider.graph.md](/docs/passport/set-up-identity-provider.graph.md)
<!-- /docsgraph:related -->

This guide covers the common Passport setup flow for OpenID Connect providers, including Okta and Microsoft Entra ID.

## Before you begin

You need:

- A Vercel Enterprise team where you are an Owner. Only team Owners can manage Passport.
- An identity provider that supports OAuth 2.0 or OpenID Connect.
- An identity provider application. You can create it during Passport setup.
- The redirect URI registered in your identity provider's OAuth application:

```txt
https://connect.vercel.com/callback
```

For Okta, Microsoft Entra ID, Auth0, and similar providers, make sure the application uses a confidential client with a client secret.

## Create an identity provider application

### Okta

Create an Okta OpenID Connect web application, then add its credentials to a Vercel Connect application:

1. In the Okta Admin Console, go to **Applications** > **Applications** and select **Create App Integration**.

2. Choose **OIDC - OpenID Connect** and **Web Application**.

3. Keep the **Authorization Code** grant enabled, then add this **Sign-in redirect URI**:

   ```txt
   https://connect.vercel.com/callback
   ```

4. Save the application and assign the people or groups that should be able to access Passport-protected deployments.

5. Copy the Okta application's client ID and client secret. In **Security** > **API** > **Authorization Servers**, copy the issuer URI for the authorization server that should authenticate visitors.

6. In the Vercel dashboard, create a **Generic OAuth** Connect application. Enter the exact issuer URI and select **Discover**, then enter the Okta client ID and client secret.

For Okta's default custom authorization server, the issuer URI is similar to:

```txt
https://your_okta_domain.okta.com/oauth2/default
```

An Okta organization authorization server has an issuer URI without the `/oauth2/{authorization_server_id}` segment. Use the exact issuer URI that Okta displays. Do not combine an issuer, endpoints, or JWKS URI from different authorization servers.

The Connect application that Passport uses requests the `openid` scope. Make the `email` and `profile` scopes available in Okta when you want Passport to receive those optional profile claims.

### Microsoft Entra ID

Create a web application registration in the Microsoft Entra admin center. Add `https://connect.vercel.com/callback` as a web redirect URI, create a client secret, and assign users or groups when your tenant requires user assignment.

In the Vercel dashboard, create a **Generic OAuth** Connect application. Use the tenant-specific issuer URI, such as:

```txt
https://login.microsoftonline.com/your_tenant_id/v2.0
```

Select **Discover**, then enter the Microsoft Entra application client ID and client secret. Use a tenant-specific issuer rather than a multi-tenant endpoint so Passport can validate a stable issuer.

## Configure Passport for a project

- ### Open Passport settings
  From your Vercel dashboard, open [Project Passport Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fpassport\&title=Project+Passport+Settings).

- ### Enable Passport
  Use the **Passport** toggle to enable the feature.

- ### Select or create a Connect application
  Select an existing Connect application, or create a new one from the Passport setup flow.

  When you create an application, choose **Generic OAuth** for an OpenID Connect provider. If discovery works, enter your provider's server URL and click **Discover**. If discovery does not work, enter the OAuth endpoints manually.

  Your provider must allow this redirect URI:
  ```txt
  https://connect.vercel.com/callback
  ```

- ### Save your changes
  Click **Save**.

  New visits to protected deployment URLs will use Passport. Existing authenticated sessions can remain valid until they expire.

## Configure a team default

You can set a team default so new projects inherit Passport settings.

1. From your Vercel dashboard, open [Team Passport Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fpassport\&title=Team+Passport+Settings).
2. Enable Passport.
3. Select or create a Connect application.
4. Click **Save**.

Existing projects keep their current Passport settings. Use the project list on the team Passport page to assign Passport to existing projects.

## Assign Passport to existing projects

From [Team Passport Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fpassport\&title=Team+Passport+Settings), you can assign the same Connect application to multiple projects.

1. Select the projects you want to update.
2. Start the assignment flow.
3. Select the Connect application.
4. Confirm the assignment.

You can filter the project list to show all projects or only projects where Passport is disabled.

## Troubleshooting

### Discovery does not find OAuth metadata

Use the issuer URL for the authorization server, not only the domain of your identity provider.

For example, with Okta's default custom authorization server, use:

```txt
https://your_okta_domain.okta.com/oauth2/default
```

If discovery still fails, enter the authorization endpoint, token endpoint, issuer, JWKS URI, and userinfo endpoint manually.

### Connect application creation returns Not Found

Confirm that your team has access to Passport. If you are testing a preview deployment of the dashboard, confirm that the same team has the required feature flags enabled.

### Visitors cannot complete sign-in

Check the following settings in your identity provider:

- The redirect URI is `https://connect.vercel.com/callback`.
- The visitor is assigned to the application.
- The app supports the `authorization_code` grant.
- The scopes include `openid`.
- The issuer, authorization endpoint, token endpoint, and JWKS URI all belong to the same authorization server.


---

[View full sitemap](/docs/sitemap)
