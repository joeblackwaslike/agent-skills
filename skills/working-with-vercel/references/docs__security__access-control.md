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
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "51ede2c09fb75cc2bffe52640f0cc3f8f10381294d29a7dbc157d455aefa6c17"
---

# Access Control

You can protect preview and production deployments with [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) on all plans at no additional cost. [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) costs $20 per month per protected project on Pro and is included at the team level on Enterprise. Password Protection is not available on Hobby. See [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing) for the full plan comparison.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Protect who can see your deployments.
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related)
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related)
- [How do I add password protection to my Vercel deployment?](https://vercel.com/kb/guide/how-do-i-add-password-protection-to-my-vercel-deployment?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Enable Password Protection on a Vercel deployment, configure automation and CORS bypasses, and verify the gate before yo
- [Protecting Deployments](https://vercel.com/blog/security-controls-protected-preview-deployments-passwords?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related)
- [Deployment Protection on Vercel](https://vercel.com/docs/deployment-protection?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Role-based access control \\(RBAC\\)](https://vercel.com/docs/rbac?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC

Full cross-link map for this page: [/docs/security/access-control.graph.md](/docs/security/access-control.graph.md?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Password protection

Password protection applies to Preview deployments and Production deployments. Enable Password protection through the Teams Project dashboard. [Read more about Password protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection).

## Vercel Authentication

Vercel Authentication protection applies to Preview deployments and Production deployments. When enabled, a person with a Personal Account that belongs to a Team can use their login credentials to access the deployment. Enable Vercel Authentication through the Teams Project dashboard.

You can enable Password protection and Vercel Authentication at the same time. When both methods are enabled, the person trying to access the deployment can choose either method.

[Read more about Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication).


---

[View full sitemap](/docs/sitemap)
