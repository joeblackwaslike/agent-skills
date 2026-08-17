---
title: Methods to Protect Deployments
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments"
last_updated: 2026-07-30
type: conceptual
prerequisites:
  - /docs/deployment-protection
related:
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/passport
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
summary: "Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Trusted IPs."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4a5a6db58277fc59f458aa1e4977d145d17f260885e4de42cbde556e203700c8"
---

# Methods to Protect Deployments

Vercel offers several methods for protecting your deployments. Depending on your use case, you can choose to protect a single environment, or multiple environments. See [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect) for more information.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [The Complete Guide to Vercel Passport](https://vercel.com/kb/guide/vercel-passport?from=related) — Vercel Passport protects deployments behind your own identity provider, such as Okta or Auth0. Learn how Passport works,
- [How to identify and authorize visitors with the Vercel Passport token in Next.js](https://vercel.com/kb/guide/vercel-passport-nextjs?from=related) — Read the Vercel Passport token server-side in a Next.js app to identify visitors with the external_sub claim and authori
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.
- [Exceptions](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions?from=related) — Disable Deployment Protection for a list of preview domains.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access?from=related) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments.graph.md](/docs/deployment-protection/methods-to-protect-deployments.graph.md)
<!-- /docsgraph:related -->

To see an overview of your projects' protections:

1. Open **Settings** in the sidebar of your [dashboard](/dashboard) and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings)

![Image](`/docs-assets/static/docs/concepts/deployments/preview-deployments/deployment-protection-projects-view.png`)

## Vercel Authentication

> **🔒 Permissions Required**: Vercel Authentication

With Vercel Authentication you can restrict access to all deployments (including non-public deployments), meaning only team members with a Vercel account, or users you share a [Sharable Link](/docs/deployment-protection/methods-to-bypass-deployment-protection#sharable-links) with, can access non-public URLs, such as `my-project-1234-your-name.vercel.app`.

When a Vercel user visits your protected deployment but doesn't have permission to access it, they can [request access](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication#access-requests) for their Vercel account. This request triggers an email and Vercel notification to the branch authors.

Learn more about [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) and how to enable it.

## Passport

> **🔒 Permissions Required**: Passport

Passport restricts access to visitors who authenticate through your identity provider. Use Passport when you want to protect deployments with an OpenID Connect compatible provider, such as Okta or Auth0.

Learn more about [Passport](/docs/passport) and how to enable it.

## Password Protection

> **🔒 Permissions Required**: Password Protection

Password Protection on Vercel lets you restrict access to both non-public, and public deployments depending on the type of [environment protection](/docs/deployment-protection#choose-which-urls-to-protect) you choose.

Learn more about [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) and how to enable it.

## Trusted IPs

> **🔒 Permissions Required**: Trusted IPs

Trusted IPs restrict deployment access to specified IPv4 addresses and [CIDR ranges](https://www.ipaddressguide.com/cidr "What are CIDR ranges?"), returning a 404 for unauthorized IPs. This protection feature is suitable for limiting access through specific paths like VPNs or external proxies.

Learn more about [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips) and how to enable it.

## Related resources

- [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect)
- [Methods to bypass deployment protection](/docs/deployment-protection/methods-to-bypass-deployment-protection)


---

[View full sitemap](/docs/sitemap)
