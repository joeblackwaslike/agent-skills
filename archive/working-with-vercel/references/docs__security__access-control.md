---
title: Access Control
product: vercel
url: /docs/security/access-control
canonical_url: "https://vercel.com/docs/security/access-control"
last_updated: 2026-09-15
type: reference
prerequisites:
  - /docs/security
related:
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/deployment-protection/usage-and-pricing
summary: Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS mitigation, SOC 2 compliance and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/security/access-control.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "304168558d417f4dc57a3b4c7ada5f9836d4ce25b22f9415066da60ab3d949f1"
---

# Access Control

You can protect preview and production deployments with [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) on all plans at no additional cost. [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) costs $20 per month per protected project on Pro and is included at the team level on Enterprise. Password Protection is not available on Hobby. See [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing) for the full plan comparison.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)
- [Deployment Protection on Vercel](https://vercel.com/docs/deployment-protection) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and
- [Bypass Deployment Protection for testing, sharing, and automation](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection) — Learn how to bypass Deployment Protection for specific domains, or for all deployments in a project.
- [Access Groups](https://vercel.com/docs/rbac/access-groups) — Learn how to configure access groups for team members on a Vercel account.

Full cross-link map for this page: [/docs/security/access-control.graph.md](/docs/security/access-control.graph.md)
<!-- /docsgraph:related -->

## Password protection

Password protection applies to Preview deployments and Production deployments. Enable Password protection through the Teams Project dashboard. [Read more about Password protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection).

## Vercel Authentication

Vercel Authentication protection applies to Preview deployments and Production deployments. When enabled, a person with a Personal Account that belongs to a Team can use their login credentials to access the deployment. Enable Vercel Authentication through the Teams Project dashboard.

You can enable Password protection and Vercel Authentication at the same time. When both methods are enabled, the person trying to access the deployment can choose either method.

[Read more about Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication).

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
