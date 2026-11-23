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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "277d2b97b62ecbefe55848bc89a1ba74eb65ddf8a521c0d84b0b8e286b141997"
---

# Bypass Deployment Protection for testing, sharing, and automation

Deployment Protection secures your deployments, but sometimes you need to grant access for testing, sharing, or automation. You can bypass protection selectively while keeping your overall security intact.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to stop traffic to an old deployment on Vercel](https://vercel.com/kb/guide/how-to-stop-traffic-to-an-old-deployment-on-vercel) — Move production traffic to the new deployment, restrict access to the old deployment, and check remaining function activ
- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote
- [Usage & Pricing for Deployment Protection](https://vercel.com/docs/deployment-protection/usage-and-pricing) — Compare Deployment Protection feature availability and pricing across Hobby, Pro, and Enterprise plans.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and
- [Restrict access to production source maps](https://vercel.com/docs/deployment-protection/protected-source-maps) — Protected Source Maps gates requests for browser source maps behind Vercel Authentication, so only authorized users can
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection.graph.md)
<!-- /docsgraph:related -->

- [**Trusted Sources**](#trusted-sources): Let other Vercel projects or external services reach this project's protected deployments by presenting an OIDC token
- [**Protection Bypass for Automation**](#protection-bypass-for-automation): Use a secret to bypass protection features for all deployments in a project, such as for end-to-end (E2E) testing
- [**OPTIONS Allowlist**](#options-allowlist): Specify paths to be unprotected for CORS preflight `OPTIONS` requests
- [**Deployment Protection Exceptions**](#deployment-protection-exceptions): Specify preview domains that should be exempt from deployment protection
- [**Shareable Links**](#shareable-links): Enable external users to access specific branch deployments by appending a secure query parameter to the URL

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
