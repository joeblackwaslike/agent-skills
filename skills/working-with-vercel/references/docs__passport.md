---
title: Passport
product: vercel
url: /docs/passport
canonical_url: "https://vercel.com/docs/passport"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Learn about passport on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/passport.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "c350cb238da15b94ff4917e5b2465ce94229bc2c0cbc967dc1c6b2953fd3f0dd"
---

# Restrict access to deployments with Passport

> **🔒 Permissions Required**: Passport

Passport lets you protect deployments with your own identity provider. Visitors authenticate with your identity provider before they can view a protected deployment.

Use Passport when you want visitors to sign in with an external identity provider, such as Okta, Auth0, or another OpenID Connect compatible provider. Passport stores the OAuth application configuration that talks to your identity provider.

## How Passport works

Passport has two parts:

- **Identity provider application**: The OAuth or OpenID Connect application that stores your identity provider's issuer, authorization endpoint, token endpoint, client ID, and client secret.
- **Project or team setting**: The Passport configuration that points to the identity provider application and controls whether Passport is enabled.

When a visitor opens a protected deployment, Vercel redirects them to your identity provider. After the identity provider authenticates the visitor, Vercel validates the response and sets a session cookie for the protected deployment.

## Access visitor identity

After Passport authenticates a visitor, Vercel stores a signed Passport session token in the `_vercel_passport` cookie. Vercel also forwards that token to your deployment in the `x-vercel-oidc-passport-token` request header.

The token is a Vercel-signed JWT. It includes deployment context and Passport identity claims. The reliable user identifier is the `external_sub` claim, which comes from the external subject returned by your identity provider. The `sub` and `scope` claims include the owner, `connector_id`, and `external_sub` in a stable Vercel format.

Profile fields such as email or name are not guaranteed. They only appear if your identity provider returns them in the Passport user info response.

> **💡 Note:** Read `x-vercel-oidc-passport-token` from server-side code. Vercel strips
> incoming client-supplied values for this header and injects the verified token
> after Passport validates the session.

## Before you begin

You need:

- A Vercel Enterprise team with permission to manage Deployment Protection settings.
- An identity provider that supports OAuth 2.0 or OpenID Connect.
- An identity provider application. You can create it during Passport setup.
- The redirect URI registered in your identity provider's OAuth application:

```txt
https://connect.vercel.com/callback
```

For Okta, Auth0, and similar providers, make sure the application uses a confidential client with a client secret.

## Pricing

Passport is available as an Enterprise feature. Contact your Vercel account team for pricing.

## Configure Passport for a project

- ### Open Passport settings
  From your Vercel dashboard, open [Project Passport Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fpassport\&title=Project+Passport+Settings).

- ### Enable Passport
  Use the **Passport** toggle to enable the feature.

- ### Select or create an identity provider application
  Select an existing identity provider application, or create a new one from the Passport setup flow.

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
3. Select or create an identity provider application.
4. Click **Save**.

Existing projects keep their current Passport settings. Use the project list on the team Passport page to assign Passport to existing projects.

## Assign Passport to existing projects

From [Team Passport Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fpassport\&title=Team+Passport+Settings), you can assign the same identity provider application to multiple projects.

1. Select the projects you want to update.
2. Start the assignment flow.
3. Select the identity provider application.
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

### Identity provider application creation returns Not Found

Confirm that your team has access to Passport. If you are testing a preview deployment of the dashboard, confirm that the same team has the required feature flags enabled.

### Visitors cannot complete sign-in

Check the following settings in your identity provider:

- The redirect URI is `https://connect.vercel.com/callback`.
- The visitor is assigned to the application.
- The app supports the `authorization_code` grant.
- The scopes include `openid`.
- The issuer, authorization endpoint, token endpoint, and JWKS URI all belong to the same authorization server.

## Related resources

- [Deployment Protection](/docs/deployment-protection)
- [Methods to protect deployments](/docs/deployment-protection/methods-to-protect-deployments)
- [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)


---

[View full sitemap](/docs/sitemap)
