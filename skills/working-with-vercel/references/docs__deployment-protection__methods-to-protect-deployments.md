---
title: Methods to Protect Deployments
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  - /docs/deployment-protection
related:
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/passport
  - /docs/deployment-protection/usage-and-pricing
summary: "Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Trusted IPs."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "701e853f474e2788eac8ec6a105e0fbd09377c1ab006dd7bd9e790302933f1e0"
---

# Methods to Protect Deployments

Vercel offers several methods for protecting your deployments. Depending on your use case, you can choose to protect a single environment, or multiple environments. See [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect) for more information.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Agents can now access protected deployments via Vercel’s MCP server](https://vercel.com/changelog/give-agents-access-to-protected-deployments-via-vercels-mcp-server)
- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Identify users and control access in Next.js with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nextjs) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Next.js, then personalize pages, restri
- [Personalize and lock down a Nuxt app with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nuxt) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Nuxt server routes, then personalize pa
- [Build user-aware TanStack Start apps with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-tanstack-start) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in TanStack Start server functions, then p
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments)
- [Protecting Deployments](https://vercel.com/blog/security-controls-protected-preview-deployments-passwords)
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments.graph.md](/docs/deployment-protection/methods-to-protect-deployments.graph.md)
<!-- /docsgraph:related -->

To see an overview of your projects' protections:

1. Open **Settings** in the sidebar of your [dashboard](/dashboard) and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings)

![View your project protections on the Dashboard > Settings > Deployment Protection page.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployments/deployment-protection-projects-view.png)

## Vercel Authentication

> Vercel Authentication is available on all plans

With Vercel Authentication you can restrict access to all deployments (including non-public deployments), meaning only team members with a Vercel account, or users you share a [Sharable Link](/docs/deployment-protection/methods-to-bypass-deployment-protection#sharable-links) with, can access non-public URLs, such as `my-project-1234-your-name.vercel.app`.

When a Vercel user visits your protected deployment but doesn't have permission to access it, they can [request access](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication#access-requests) for their Vercel account. This request triggers an email and Vercel notification to the branch authors.

Learn more about [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) and how to enable it.

## Passport

> Passport is available on Enterprise plans

Passport restricts access to visitors who authenticate through your identity provider. Use Passport when you want to protect deployments with an OpenID Connect compatible provider, such as Okta or Auth0.

Learn more about [Passport](/docs/passport) and how to enable it.

## Password Protection

> Password Protection is available on Enterprise and Pro plans

Password Protection costs $20 per month per protected project on Pro and is included at the team level on Enterprise. Password Protection is not available on Hobby. See [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing) for the full plan comparison.

Password Protection on Vercel lets you restrict access to both non-public, and public deployments depending on the type of [environment protection](/docs/deployment-protection#choose-which-urls-to-protect) you choose.

Learn more about [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) and how to enable it.

## Trusted IPs

> Trusted IPs are available on Enterprise plans

Trusted IPs restrict deployment access to specified IPv4 addresses and [CIDR ranges](https://www.ipaddressguide.com/cidr "What are CIDR ranges?"), returning a 404 for unauthorized IPs. This protection feature is suitable for limiting access through specific paths like VPNs or external proxies.

Learn more about [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips) and how to enable it.

## Related resources

- [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect)
- [Methods to bypass deployment protection](/docs/deployment-protection/methods-to-bypass-deployment-protection)
- [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
