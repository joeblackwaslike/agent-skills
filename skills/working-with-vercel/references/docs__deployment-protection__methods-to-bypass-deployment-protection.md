---
title: Bypass Deployment Protection for testing, sharing, and automation
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/deployment-protection
related:
  - /docs/oidc
  - /docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Learn how to bypass Deployment Protection for specific domains, or for all deployments in a project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6eb788c663d6dd2fd79b4d7b96d984d78fd96fb6fe1859239b46907c29b5f284"
---

# Bypass Deployment Protection for testing, sharing, and automation

Deployment Protection secures your deployments, but sometimes you need to grant access for testing, sharing, or automation. You can bypass protection selectively while keeping your overall security intact.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments)
- [Protecting Deployments](https://vercel.com/blog/security-controls-protected-preview-deployments-passwords)
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote
- [Restrict access to deployments with Passport](https://vercel.com/docs/passport) — Learn how to protect deployments with Passport, read visitor identity, and verify Passport tokens in server-side code.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection.graph.md)
<!-- /docsgraph:related -->

- [**Trusted Sources**](#trusted-sources): Let other Vercel projects or external services reach this project's protected deployments by presenting an OIDC token

* [**Protection Bypass for Automation**](#protection-bypass-for-automation): Use a secret to bypass protection features for all deployments in a project, such as for end-to-end (E2E) testing
* [**OPTIONS Allowlist**](#options-allowlist): Specify paths to be unprotected for CORS preflight `OPTIONS` requests
* [**Deployment Protection Exceptions**](#deployment-protection-exceptions): Specify preview domains that should be exempt from deployment protection
* [**Shareable Links**](#shareable-links): Enable external users to access specific branch deployments by appending a secure query parameter to the URL

## Trusted Sources

> Trusted Sources are available on all plans

With Trusted Sources you can allow other Vercel projects or external services such as GitHub Actions to reach this project's protected deployments. Each caller authenticates by attaching a short-lived [OIDC token](/docs/oidc), so you don't need to share a secret or open the deployment to the public.

The setting groups callers as **Vercel Projects** (other projects in the same team, with this project pinned for self-access) and **External Services** (non-Vercel workloads that present a token from their own identity provider). By default, access is limited to matching environments. You can define custom access rules to expand or restrict this.

Learn more about [Trusted Sources](/docs/security/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources), and how to add and remove them.

## Protection Bypass for Automation

> Protection Bypass for Automation is available on all plans

For automated tasks like end-to-end (E2E) testing and third-party webhook integrations, you can use Protection Bypass for Automation. When enabled, it generates a secret that can be used as a System Environment Variable (`VERCEL_AUTOMATION_BYPASS_SECRET`) or as a query parameter in URLs to bypass protection features for all deployments in a project.

You can provide the bypass secret in two ways:

- **As an HTTP header** (recommended for testing tools): `x-vercel-protection-bypass: your-secret`
- **As a query parameter** (required for webhook URLs): `?x-vercel-protection-bypass=your-secret`

Common use cases for Protection Bypass for Automation include:

- E2E tests that run on protected deployments
- Slack bot webhook verification and events
- Third-party webhook services (Stripe, GitHub, etc.) that cannot set custom headers

Learn more about [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation), and how to enable and disable it.

## OPTIONS Allowlist

> OPTIONS Allowlist is available on all plans

With OPTIONS Allowlist you can specify paths to be unprotected for preflight OPTIONS requests. This can be used to enable [CORS preflight](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request) requests to your project's protected deployments, as browsers do not send authentication on preflight requests.

Vercel compares incoming request paths against the paths in the allowlist. If a request path **starts with** one of the specified paths and has the method `OPTIONS`, it bypasses Deployment Protection.

For example, if you specify `/api`, all requests to paths that start with `/api` (such as `/api/v1/users` and `/api/v2/projects`) will be unprotected for any `OPTIONS` request.

Learn more about [OPTIONS Allowlist](/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist).

## Deployment Protection Exceptions

> Deployment Protection Exceptions are available on all plans

With Deployment Protection Exceptions you can specify preview domains that should be exempt from deployment protection. Adding a domain to Deployment Protection Exceptions makes it publicly accessible, bypassing features like [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection), and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips).

For example, if you add **`preview-branch-name.vercel.app`** to Deployment Protection Exceptions, this domain becomes publicly accessible, bypassing the project's deployment protection settings. When removed, it reverts to the default protection settings.

Learn more about [Deployment Protection Exceptions](/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions), and how to add and remove domains.

## Shareable Links

> Shareable Links are available on all plans

Shareable Links allow external access to specific branch deployments through a secure query parameter. Users with this link can see the latest deployment and leave [comments](/docs/comments) (if enabled and logged in with their Vercel account).

For example, if you generate a Shareable Link for the `feature-new-ui` branch, users with this link can view the latest deployment and comment.

Learn more about [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links), and how to generate and revoke them.

## Related resources for Deployment Protection

- [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect)
- [Methods to protect deployments](/docs/deployment-protection/methods-to-protect-deployments)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
