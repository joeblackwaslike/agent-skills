---
title: Access Control
product: vercel
url: /docs/security/access-control
canonical_url: "https://vercel.com/docs/security/access-control"
last_updated: 2026-02-18
type: reference
prerequisites:
  - /docs/security
related:
  - /docs/security/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/security/deployment-protection
  - /docs/deployments/environments
  - /docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS mitigation, SOC 2 compliance and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/access-control.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "a9156520bd0f0dac10d3ae9de502c7e7f78c833bfe9ddc4e6ca5e3c199fe325d"
---

# Access Control

Deployments can be protected with [Password protection](/docs/security/deployment-protection/methods-to-protect-deployments/password-protection) and [SSO protection](/docs/security/deployment-protection#advanced-deployment-protection). **Password protection is available for Teams on Pro and Enterprise plans**, while **SSO protection is only available for Teams on the Enterprise plan**. Both methods can be used to protect [Preview](/docs/deployments/environments#preview-environment-pre-production) and [Production](/docs/deployments/environments#production-environment) deployments.

## Password protection

Password protection applies to Preview deployments and Production deployments. This feature can be enabled through the Teams Project dashboard. [Read more about it in the documentation here](/docs/security/deployment-protection/methods-to-protect-deployments/password-protection).

## Vercel Authentication

Vercel Authentication protection applies to Preview deployments and Production deployments. When enabled, a person with a Personal Account that is a member of a Team, can use their login credentials to access the deployment. This feature can be enabled through the Teams Project dashboard.

Both Password protection, and Vercel Authentication can be enabled at the same time. When this is the case, the person trying to access the deployment will be presented with an option to use either method to access the deployment.

[Read more about it in the documentation here](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication).


---

[View full sitemap](/docs/sitemap)
