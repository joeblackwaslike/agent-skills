---
title: Access Other Clouds and APIs
product: vercel
url: /docs/oidc/access-other-services
canonical_url: "https://vercel.com/docs/oidc/access-other-services"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/oidc
related:
  - /docs/oidc
  - /docs/oidc/aws
  - /docs/oidc/gcp
  - /docs/oidc/azure
  - /docs/oidc/api
summary: Use the short-lived OpenID Connect (OIDC) tokens that Vercel issues to your builds and functions to access AWS, Google Cloud Platform, Microsoft...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/oidc/access-other-services.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "3862c204b90075fa5af8c52c5c17091986f5c6141533054eb2bd9166eb5b09cf"
---

# Access Other Clouds and APIs

> Secure backend access with OIDC federation is available on all plans

When you create long-lived, persistent credentials in your backend to allow access from your web applications, you increase the security risk of these credentials being leaked and hacked. You can mitigate this risk with [OpenID Connect (OIDC) federation](/docs/oidc), which issues short-lived, non-persistent tokens that are signed by Vercel's OIDC Identity Provider (IdP).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Enhancing security of backend connectivity with OpenID Connect](https://vercel.com/blog/enhancing-security-of-backend-connectivity-with-openid-connect)
- [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)
- [OpenID Connect (OIDC) Federation now generally available](https://vercel.com/changelog/openid-connect-federation-now-generally-available)
- [AI Gateway OIDC Authentication](https://vercel.com/docs/ai-gateway/authentication-and-byok/oidc) — Authenticate AI Gateway requests from Vercel deployments with OIDC tokens. Configure the AI SDK or send bearer tokens di
- [AI Gateway Authentication and BYOK](https://vercel.com/docs/ai-gateway/authentication-and-byok) — Authenticate AI Gateway requests with API keys or OIDC tokens, and configure bring your own key \\(BYOK\\) credentials for
- [Authentication in Vercel Connect](https://vercel.com/docs/connect/concepts/authentication) — Every Vercel Connect token request has two legs that both have to authenticate: the caller calling Vercel Connect, and V
- [Vercel KMS Authentication](https://vercel.com/docs/kms/concepts/authentication) — How Vercel KMS authorizes signing requests with a deployment OIDC token, authorizes management requests with a Vercel ac
- [Access tokens](https://vercel.com/docs/accounts/access-tokens) — Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate A

Full cross-link map for this page: [/docs/oidc/access-other-services.graph.md](/docs/oidc/access-other-services.graph.md)
<!-- /docsgraph:related -->

Cloud providers such as Amazon Web Services, Google Cloud Platform, and Microsoft Azure can trust these Vercel OIDC tokens and exchange them for short-lived credentials. This way, you can avoid storing long-lived credentials as Vercel environment variables.

## Getting started

To securely connect your deployment with your backend, configure your backend to trust Vercel's OIDC Identity Provider and connect to it from your Vercel deployment:

**Amazon Web Services (AWS)**: Assume an IAM role with the Vercel OIDC token. [Learn more →](/docs/oidc/aws)

**Google Cloud Platform (GCP)**: Impersonate a service account through Workload Identity Federation. [Learn more →](/docs/oidc/gcp)

**Microsoft Azure**: Authenticate to Microsoft Entra ID with a federated credential. [Learn more →](/docs/oidc/azure)

**Your own API**: Validate Vercel OIDC tokens in your own backend. [Learn more →](/docs/oidc/api)

To reach another Vercel project's protected deployments, see [Trusted Sources](/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources).

## Issuer mode

There are two options available to configure the token's issuer URL (`iss`):

1. **Team** *(Recommended)*: The issuer URL is bespoke to your team e.g. `https://oidc.vercel.com/acme`.
2. **Global**: The issuer URL is generic e.g. `https://oidc.vercel.com`

To change the issuer mode:

- Open your project from the Vercel dashboard
- Select the Settings tab
- Navigate to Security
- From **Secure backend access with OIDC federation** section, toggle between **Team** or **Global** and click "Save".

## How OIDC token federation works

### In Builds

When you run a build, Vercel automatically generates a new token and assigns it to the `VERCEL_OIDC_TOKEN`
environment variable. You can then exchange the token for short-lived access tokens with your cloud provider.

### In Vercel Functions

When your application invokes a Vercel Function, the OIDC token is set to the `x-vercel-oidc-token` header
on the Function's `Request` object.

Vercel does not generate a fresh OIDC token for each execution. Function tokens have a Time to Live (TTL) of two hours. Vercel reuses a token for the first part of that time, and then issues a new one. The token that your Function receives stays valid throughout the Function's [maximum execution duration](/docs/functions/configuring-functions/duration).

### In Local Development

You can download the `VERCEL_OIDC_TOKEN` straight to your local development environment using the CLI command
`vercel env pull`. Link your project first if you haven't already; `vercel env pull` requires a linked project (or `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to be set).

```bash filename="terminal"
vercel link
vercel env pull
```

This writes the `VERCEL_OIDC_TOKEN` environment variable and other environment variables targeted
to `development` to the `.env.local` file of your project folder. See the [CLI docs](/docs/cli/env) for more information.

### Reading a rotated token file

If your environment supplies a rotating token file, set `VERCEL_OIDC_TOKEN_FILE` to its path. In Node.js, call [`getVercelOidcToken()`](/docs/oidc/reference#other-cloud-providers) when you need the current token. In `@vercel/oidc` 4.0.0 and later, the helper checks these token sources in order:

1. The `x-vercel-oidc-token` header in the request context.
2. The file named by `VERCEL_OIDC_TOKEN_FILE`, when set.
3. The `VERCEL_OIDC_TOKEN` environment variable.

When the request context has no token, the SDK reads the configured file on each call. Changes to the file take effect without restarting your process. An unreadable or empty configured file causes an error rather than a fallback to `VERCEL_OIDC_TOKEN`. Don't cache the helper's result.

## Related

**Helper libraries** [→](/docs/oidc/reference#helper-libraries)

Review libraries to help you connect to your backend with OIDC.

**OIDC token anatomy** [→](/docs/oidc/reference#oidc-token-anatomy)

Understand the structure of an OIDC token.

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
