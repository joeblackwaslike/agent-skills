---
title: Set up Passport with an identity provider
product: vercel
url: /docs/passport/set-up-identity-provider
canonical_url: "https://vercel.com/docs/passport/set-up-identity-provider"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/passport
related:
  []
summary: Configure Passport with Okta, Microsoft Entra ID, or another OpenID Connect provider.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport/set-up-identity-provider.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "45f1cc712dd4b1b5c50655841751da6bf7aa82bb30cb8ebc26bfefd4233680b7"
---

# Set up Passport with an identity provider

> **🔒 Permissions Required**: Passport

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
