---
title: Access Control
product: vercel
url: /docs/security/access-control
canonical_url: "https://vercel.com/docs/security/access-control"
last_updated: 2026-08-21
type: reference
prerequisites:
  - /docs/security
related:
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/deployment-protection
  - /docs/deployments/environments
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS mitigation, SOC 2 compliance and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/access-control.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7078b966fc0dffd5c6215665a5c8afbdd45cdf2509dcd089e7a89f8f8dd0ebb6"
---

# Access Control

You can protect deployments with [Password protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) and [SSO protection](/docs/deployment-protection#advanced-deployment-protection). **Password protection is available for Enterprise teams, or Pro teams with the Advanced Deployment Protection add-on**, while **SSO protection is only available for Teams on the Enterprise plan**. Both methods protect [Preview](/docs/deployments/environments#preview-environment-pre-production) and [Production](/docs/deployments/environments#production-environment) deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Protect who can see your deployments.
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related)
- [How do I add password protection to my Vercel deployment?](https://vercel.com/kb/guide/how-do-i-add-password-protection-to-my-vercel-deployment?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Enable Password Protection on a Vercel deployment, configure automation and CORS bypasses, and verify the gate before yo
- [Protecting Deployments](https://vercel.com/blog/security-controls-protected-preview-deployments-passwords?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related)
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Role-based access control \\(RBAC\\)](https://vercel.com/docs/rbac?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC
- [SAML Single Sign-On](https://vercel.com/docs/saml?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Learn how to configure SAML SSO for your organization on Vercel.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fsecurity%2Faccess-control&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

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
