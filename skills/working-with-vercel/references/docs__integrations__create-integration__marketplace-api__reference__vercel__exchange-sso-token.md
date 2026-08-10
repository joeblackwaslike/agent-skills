---
title: exchange-sso-token
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/exchange-sso-token
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/exchange-sso-token"
last_updated: 2026-08-10
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about exchange-sso-token on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/exchange-sso-token.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "aa83bdb5f8a1833f1af111f285e12cba35598b1579e01a3c87127b1d11640482"
---

# SSO Token Exchange

```http
POST /v1/integrations/sso/token
```

During the autorization process, Vercel sends the user to the provider [redirectLoginUrl](https://vercel.com/docs/integrations/create-integration/submit-integration#redirect-login-url), that includes the OAuth authorization `code` parameter. The provider then calls the SSO Token Exchange endpoint with the sent code and receives the OIDC token. They log the user in based on this token and redirects the user back to the Vercel account using deep-link parameters included the redirectLoginUrl. Providers should not persist the returned `id_token` in a database since the token will expire. See [**Authentication with SSO**](https://vercel.com/docs/integrations/create-integration/marketplace-api#authentication-with-sso) for more details.

## Request Body

**Content-Type**: `application/json`

"value"
## Responses

### 200

Success

**Content-Type**: `application/json`

"value"
### 400

One of the provided values in the request body is invalid.

### 403

Success

### 500

Success


---

## Related

- [Marketplace API Reference](/docs/integrations/create-integration/marketplace-api/reference)
- [Native Integration Concepts](/docs/integrations/create-integration/native-integration)


---

[View full sitemap](/docs/sitemap)
