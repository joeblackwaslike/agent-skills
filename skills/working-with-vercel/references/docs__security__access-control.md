---
title: Access Control
product: vercel
url: /docs/security/access-control
canonical_url: "https://vercel.com/docs/security/access-control"
last_updated: 2026-06-16
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d144062d02dabc0094809902ce0f8c589204200ddcde3737a78b3810112db227"
---

# Access Control

You can protect deployments with [Password protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) and [SSO protection](/docs/deployment-protection#advanced-deployment-protection). **Password protection is available for Enterprise teams, or Pro teams with the Advanced Deployment Protection add-on**, while **SSO protection is only available for Teams on the Enterprise plan**. Both methods protect [Preview](/docs/deployments/environments#preview-environment-pre-production) and [Production](/docs/deployments/environments#production-environment) deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [How do I add password protection to my Vercel deployment?](https://vercel.com/kb/guide/how-do-i-add-password-protection-to-my-vercel-deployment?from=related) — Enable Password Protection on a Vercel deployment, configure automation and CORS bypasses, and verify the gate before yo
- [Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Passport](https://vercel.com/docs/passport?from=related) — Learn how to protect deployments with Passport, read visitor identity, and verify Passport tokens in server-side code.
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.
- [RBAC](https://vercel.com/docs/rbac?from=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \(RBAC

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
