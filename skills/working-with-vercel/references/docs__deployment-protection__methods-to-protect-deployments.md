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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "8a65ea8358dd1e4e0eeaae374579305ce98b2c3d812633803ee7b429b59060e1"
---

# Methods to Protect Deployments

Vercel offers several methods for protecting your deployments. Depending on your use case, you can choose to protect a single environment, or multiple environments. See [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect) for more information.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [Agents can now access protected deployments via Vercel’s MCP server](https://vercel.com/changelog/give-agents-access-to-protected-deployments-via-vercels-mcp-server)
- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Identify users and control access in Next.js with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nextjs) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Next.js, then personalize pages, restri
- [Personalize and lock down a Nuxt app with Vercel Passport](https://vercel.com/kb/guide/vercel-passport-nuxt) — Use \\`getIdentity\\(\\)\\` to read a visitor’s verified Vercel Passport identity in Nuxt server routes, then personalize pa
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments.graph.md](/docs/deployment-protection/methods-to-protect-deployments.graph.md)
<!-- /docsgraph:related -->

To see an overview of your projects' protections:

1. Open **Settings** in the sidebar of your [dashboard](/dashboard) and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings)

![View your project protections on the Dashboard > Settings > Deployment Protection page.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployments/deployment-protection-projects-view.png)

## Vercel Authentication

> Vercel Authentication is available on all plans

With Vercel Authentication you can restrict access to all deployments (including non-public deployments), meaning only team members with a Vercel account, or users you share a [Sharable Link](/docs/deployment-protection/methods-to-bypass-deployment-protection#shareable-links) with, can access non-public URLs, such as `my-project-1234-your-name.vercel.app`.

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
