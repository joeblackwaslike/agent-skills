---
title: OpenID Connect (OIDC) Federation
product: vercel
url: /docs/oidc
canonical_url: "https://vercel.com/docs/oidc"
last_updated: 2026-08-04
type: conceptual
prerequisites:
  []
related:
  - /docs/oidc/aws
  - /docs/oidc/gcp
  - /docs/oidc/azure
  - /docs/oidc/api
  - /docs/cli/env
summary: Secure the access to your backend using OIDC Federation to enable auto-generated, short-lived, and non-persistent credentials.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/oidc.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5d398ef39efbf662093bddf3f88d126eca818bea7331035a71b7dff94d0f2486"
---

# OpenID Connect (OIDC) Federation

> **🔒 Permissions Required**: Secure backend access with OIDC federation


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway?from=related)
- [Authentication](https://eve.dev/docs/guides/auth-and-route-protection?from=related) — Secure your agent's HTTP routes with an ordered auth walk, verifier helpers, and connection OAuth via Vercel Connect.
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Cost-aware model routing through AI Gateway](https://vercel.com/kb/guide/cost-aware-model-routing-with-ai-gateway?from=related) — Route easy requests to a cheap model and escalate only hard ones to a frontier model through one AI Gateway endpoint, wi
- [Build a daily digest bot with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/daily-digest-bot-with-chat-sdk-and-workflow-sdk?from=related) — Build a daily digest bot that posts a daily digest of GitHub stats to Slack. Learn how to use Vercel Connect to set up S
- [Build a web research agent with Workflow SDK](https://vercel.com/kb/guide/durable-web-research-agent-with-workflow-sdk?from=related) — Build a web research agent that searches the web and returns a cited report. Powered by AI SDK and Workflow SDK, it jour
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent?from=related) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [Sign in with Vercel](https://vercel.com/docs/sign-in-with-vercel?from=related) — Learn how to Sign in with Vercel
- [SAML SSO](https://vercel.com/docs/saml?from=related) — Learn how to configure SAML SSO for your organization on Vercel.
- [SDK Reference](https://vercel.com/docs/connect/ts-sdk-reference?from=related) — API reference for @vercel/connect, the TypeScript SDK for requesting runtime tokens from Vercel Connect.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Passport](https://vercel.com/docs/passport?from=related) — Learn how to protect deployments with Passport, read visitor identity, and verify Passport tokens in server-side code.

Full cross-link map for this page: [/docs/oidc.graph.md](/docs/oidc.graph.md)
<!-- /docsgraph:related -->

When you create long-lived, persistent credentials in your backend to allow access from your web applications, you increase the security risk of these credentials being leaked and hacked. You can mitigate this risk with OpenID Connect (OIDC) federation which issues short-lived, non-persistent tokens that are signed by Vercel's OIDC Identity Provider (IdP).

Cloud providers such as Amazon Web Services, Google Cloud Platform, and Microsoft Azure can trust these tokens and exchange them for short-lived credentials. This way, you can avoid storing long-lived credentials as Vercel environment variables.

### Benefits

- **No persisted credentials**: There is no need to copy and paste long-lived access tokens
  from your cloud provider into your Vercel environment variables. Instead, you can exchange the OIDC token for short-lived
  access tokens with your trusted cloud provider
- **Granular access control**: You can configure your cloud providers to grant different permissions depending
  on project or environment. For instance, you can separate your development, preview and production environments on your cloud provider and
  only grant Vercel issued OIDC tokens access to the necessary environment(s)
- **Local development access**: You can configure your cloud provider to trust local development environments so that long-lived credentials do not need to be stored locally

## Getting started

To securely connect your deployment with your backend, configure your backend to trust Vercel's OIDC Identity Provider and connect to it from your Vercel deployment:

- [Connect to Amazon Web Services (AWS)](/docs/oidc/aws)
- [Connect to Google Cloud Platform (GCP)](/docs/oidc/gcp)
- [Connect to Microsoft Azure](/docs/oidc/azure)
- [Connect to your own API](/docs/oidc/api)

## Issuer mode

There are two options available configure the token's issuer URL (`iss`):

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

Vercel does not generate a fresh OIDC token for each execution. It reuses a token for up to 90 minutes. Function tokens have a Time to Live (TTL) of two hours. The remaining 30 minutes ensures the token stays valid throughout a Function's maximum execution duration.

### In Local Development

You can download the `VERCEL_OIDC_TOKEN` straight to your local development environment using the CLI command
`vercel env pull`. Link your project first if you haven't already; `vercel env pull` requires a linked project (or `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to be set).

```bash filename="terminal"
vercel link
vercel env pull
```

This writes the `VERCEL_OIDC_TOKEN` environment variable and other environment variables targeted
to `development` to the `.env.local` file of your project folder. See the [CLI docs](/docs/cli/env) for more information.

## Related


---

[View full sitemap](/docs/sitemap)
