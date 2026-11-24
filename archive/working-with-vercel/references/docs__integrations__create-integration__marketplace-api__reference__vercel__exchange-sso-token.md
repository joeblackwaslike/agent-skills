---
title: exchange-sso-token
product: vercel
url: /docs/integrations/create-integration/marketplace-api/reference/vercel/exchange-sso-token
canonical_url: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/exchange-sso-token"
last_updated: 2026-11-23
type: conceptual
prerequisites:
  []
related:
  - /docs/integrations/create-integration/marketplace-api/reference
  - /docs/integrations/create-integration/native-integration
summary: Learn about exchange-sso-token on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/exchange-sso-token.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "ec39f532894f4dcf242c4b318ec48bda9e537de550f9d7bad5f6db0533651d57"
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
