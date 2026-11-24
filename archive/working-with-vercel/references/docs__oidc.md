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
  - /docs/oidc/access-other-services
  - /docs/monorepos/remote-caching/external-ci-cd
  - /docs/container-registry/github-actions
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources
  - /docs/oidc/policies
summary: Replace long-lived credentials with short-lived OpenID Connect (OIDC) tokens, both when your Vercel deployments access other services and when your...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/oidc.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "32e0d2656fc3f4d2cce9c1d5690b5da14e0e6b0941e0f5258573a11af04f0455"
---

# OpenID Connect (OIDC) Federation

Long-lived credentials, such as access keys and API tokens, are a security risk: if one leaks, anyone who has it can use it until you notice and rotate it. OpenID Connect (OIDC) federation replaces them with short-lived tokens that identify the workload itself, such as a deployment or a CI/CD job. This approach is also known as Workload Identity Federation (WIF).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Gateway](https://ai-sdk.dev/providers/ai-sdk-providers/ai-gateway) — Learn how to use the AI Gateway provider with the AI SDK.
- [Authentication](https://eve.dev/docs/guides/auth-and-route-protection) — Secure your agent's HTTP routes with an ordered auth walk, verifier helpers, and connection OAuth via Vercel Connect.
- [Sandbox Troubleshooting](https://eve.dev/docs/sandbox/troubleshooting) — Causes and fixes for common eve sandbox errors in the sandbox file, after a build, when a session resumes, and during ev
- [Sign JWTs from your Functions without managing private keys](https://vercel.com/changelog/sign-jwts-from-your-functions-without-managing-private-keys)
- [The skills.sh API is now available](https://vercel.com/changelog/the-skills-sh-api-is-now-available)
- [Trusted Sources for Deployment Protection](https://vercel.com/changelog/trusted-sources-for-deployment-protection)
- [Build a daily digest bot with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/daily-digest-bot-with-chat-sdk-and-workflow-sdk) — Build a daily digest bot that posts a daily digest of GitHub stats to Slack. Learn how to use Vercel Connect to set up S
- [Run recurring security reviews with deepsec on Vercel](https://vercel.com/kb/guide/deepsec-reviews-on-vercel) — Learn how to run periodic security scans on your code with deepsec. Set up deepsec to review GitHub repositories and del
- [ Run a Docker monolith with workers on Vercel](https://vercel.com/kb/guide/docker-monolith-workers-vercel) — Run a Dockerized monolith on Vercel with Container Images, move long-running workers to Vercel Queues and Vercel Workflo
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [Manage your Sanity project from Slack with eve](https://vercel.com/kb/guide/eve-sanity-copilot) — A Slack-based Sanity copilot built on eve. It queries and edits content with GROQ, shapes schemas, manages releases, and
- [Death to long-lived static credentials](https://vercel.com/blog/death-to-long-lived-static-credentials)

Full cross-link map for this page: [/docs/oidc.graph.md](/docs/oidc.graph.md)
<!-- /docsgraph:related -->

OIDC federation on Vercel works in two directions:

- **From Vercel to other services**: Vercel's OIDC Identity Provider (IdP) issues short-lived Vercel OIDC tokens to your builds and Vercel Functions. Cloud providers such as Amazon Web Services, Google Cloud Platform, and Microsoft Azure, and your own APIs, can trust these tokens and exchange them for short-lived credentials. See [Access Other Clouds and APIs](/docs/oidc/access-other-services).
- **From your workloads to Vercel**: Vercel can trust the OIDC tokens that your workloads receive, from providers such as GitHub Actions or from Vercel itself, so those workloads can access Vercel without a long-lived access token. See [Authenticate to Vercel with OIDC](#authenticate-to-vercel-with-oidc).

### Benefits

- **No persisted credentials**: You don't copy long-lived access tokens into environment variables or CI/CD secrets. Each workload exchanges a short-lived OIDC token for the access it needs, so there's nothing to leak or rotate.
- **Granular access control**: You decide which workloads get access, based on the claims in their tokens. For example, you can grant a cloud provider role only to production deployments of one project, or let only one GitHub repository and branch authenticate to Vercel.
- **Local development access**: You can give local development environments short-lived Vercel OIDC tokens too, so long-lived credentials don't need to be stored locally. See [In Local Development](/docs/oidc/access-other-services#in-local-development).

## Choose how to use OIDC

Pick what your workload needs to do:

**Access other clouds and APIs**: Exchange the Vercel OIDC token for credentials on AWS, Google Cloud Platform, Microsoft Azure, or your own API. [Learn more →](/docs/oidc/access-other-services)

**Use Turborepo Remote Cache**: Share build artifacts with your team from external CI/CD. [Learn more →](/docs/monorepos/remote-caching/external-ci-cd#openid-connect-oidc)

**Publish to Vercel Container Registry**: Push container images to VCR without storing registry credentials. [Learn more →](/docs/container-registry/github-actions)

**Reach protected deployments**: Let other Vercel projects and external services reach your protected deployments with Trusted Sources. [Learn more →](/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources)

## Authenticate to Vercel with OIDC

Any workload that has an OIDC token from an issuer you trust can authenticate to Vercel with that token, instead of a long-lived access token. This includes CI/CD jobs, such as GitHub Actions workflows, and Vercel deployments themselves. Vercel verifies each token's signature against the issuer's published keys and checks its claims against rules that you configure. Depending on what the workload needs, it authenticates as a built-in app or as a custom app.

### Built-in apps

Built-in apps are apps that Vercel provides, such as Turborepo CLI. You don't create or configure the app. Instead, you create an [OIDC policy](/docs/oidc/policies) that lets matching workloads exchange their OIDC tokens for a short-lived access token for the built-in app. Use a built-in app when it already does what your workload needs. See [OIDC Policies](/docs/oidc/policies#built-in-apps) for each built-in app and its guide.

### Custom apps (Sign in with Vercel)

Custom apps powering [Sign in with Vercel](/docs/sign-in-with-vercel) can authenticate to Vercel with an OIDC token instead of a client secret. You configure the issuers and claims to trust on the app itself, rather than with OIDC policies:

- [Configure OIDC-based authentication](/docs/sign-in-with-vercel/manage-from-dashboard#configure-oidc-based-authentication) for your app
- [Authenticate with an OIDC token](/docs/sign-in-with-vercel/authorization-server-api#authenticate-with-an-oidc-token) when you request a token

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
