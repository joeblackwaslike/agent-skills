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
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "eb2042fdd7b38c74c7d54d340b2b193b136bd78cd9d7e82329d5b5bba11448e6"
---

# Access Control

You can protect deployments with [Password protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) and [SSO protection](/docs/deployment-protection#advanced-deployment-protection). **Password protection is available for Enterprise teams, or Pro teams with the Advanced Deployment Protection add-on**, while **SSO protection is only available for Teams on the Enterprise plan**. Both methods protect [Preview](/docs/deployments/environments#preview-environment-pre-production) and [Production](/docs/deployments/environments#production-environment) deployments.

## Password protection

Password protection applies to Preview deployments and Production deployments. Enable Password protection through the Teams Project dashboard. [Read more about Password protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection).

## Vercel Authentication

Vercel Authentication protection applies to Preview deployments and Production deployments. When enabled, a person with a Personal Account that belongs to a Team can use their login credentials to access the deployment. Enable Vercel Authentication through the Teams Project dashboard.

You can enable Password protection and Vercel Authentication at the same time. When both methods are enabled, the person trying to access the deployment can choose either method.

[Read more about Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication).


---

[View full sitemap](/docs/sitemap)
