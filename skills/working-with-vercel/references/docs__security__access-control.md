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
source: "https://vercel.com/docs/security/access-control.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "1912cc42872df6f5121e1d5beae37909e7d3bc30b5fdf6aa9f6c8d2c13e31e67"
---

# Access Control

You can protect preview and production deployments with [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) on all plans at no additional cost. [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) costs $20 per month per protected project on Pro and is included at the team level on Enterprise. Password Protection is not available on Hobby. See [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing) for the full plan comparison.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments)
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)
- [Password Protection is now available per project on Pro](https://vercel.com/changelog/password-protection-now-costs-20-per-project-per-month-on-pro)
- [Deployment Protection on Vercel](https://vercel.com/docs/deployment-protection) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and
- [Role-based access control \\(RBAC\\)](https://vercel.com/docs/rbac) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC
- [Access Groups](https://vercel.com/docs/rbac/access-groups) — Learn how to configure access groups for team members on a Vercel account.

Full cross-link map for this page: [/docs/security/access-control.graph.md](/docs/security/access-control.graph.md)
<!-- /docsgraph:related -->

## Password protection

Password protection applies to Preview deployments and Production deployments. Enable Password protection through the Teams Project dashboard. [Read more about Password protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection).

## Vercel Authentication

Vercel Authentication protection applies to Preview deployments and Production deployments. When enabled, a person with a Personal Account that belongs to a Team can use their login credentials to access the deployment. Enable Vercel Authentication through the Teams Project dashboard.

You can enable Password protection and Vercel Authentication at the same time. When both methods are enabled, the person trying to access the deployment can choose either method.

[Read more about Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
