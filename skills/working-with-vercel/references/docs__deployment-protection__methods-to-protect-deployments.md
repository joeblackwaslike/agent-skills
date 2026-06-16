---
title: Methods to Protect Deployments
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments"
last_updated: 2026-03-23
type: conceptual
prerequisites:
  - /docs/deployment-protection
related:
  - /docs/security/deployment-protection
  - /docs/security/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/passport
  - /docs/security/deployment-protection/methods-to-protect-deployments/password-protection
summary: "Vercel offers three methods to protect your deployments: Vercel Authentication, Password Protection, and Trusted IPs."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "2c566cd8413a97763e6700291476788ca395caf0fa92ce9cb97accc04bcc7ea9"
---

# Methods to Protect Deployments

Vercel offers several methods for protecting your deployments. Depending on your use case, you can choose to protect a single environment, or multiple environments. See [Understanding Deployment Protection by environment](/docs/security/deployment-protection#understanding-deployment-protection-by-environment) for more information.

To see an overview of your projects' protections:

1. Open **Settings** in the sidebar of your [dashboard](/dashboard) and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings)

![Image](`/docs-assets/static/docs/concepts/deployments/preview-deployments/deployment-protection-projects-view.png`)

## Vercel Authentication

> **🔒 Permissions Required**: Vercel Authentication

With Vercel Authentication you can restrict access to all deployments (including non-public deployments), meaning only team members with a Vercel account, or users you share a [Sharable Link](/docs/security/deployment-protection/methods-to-bypass-deployment-protection#sharable-links) with, can access non-public URLs, such as `my-project-1234-your-name.vercel.app`.

When a Vercel user visits your protected deployment but doesn't have permission to access it, they can [request access](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication#access-requests) for their Vercel account. This request triggers an email and Vercel notification to the branch authors.

Learn more about [Vercel Authentication](/docs/security/deployment-protection/methods-to-protect-deployments/vercel-authentication) and how to enable it.

## Passport

Passport restricts access to visitors who authenticate through your identity provider. Use Passport when you want to protect deployments with an OpenID Connect compatible provider, such as Okta or Auth0.

Learn more about [Passport](/docs/passport) and how to enable it.

## Password Protection

> **🔒 Permissions Required**: Password Protection

Password Protection on Vercel lets you restrict access to both non-public, and public deployments depending on the type of [environment protection](/docs/security/deployment-protection#understanding-deployment-protection-by-environment) you choose.

Learn more about [Password Protection](/docs/security/deployment-protection/methods-to-protect-deployments/password-protection) and how to enable it.

## Trusted IPs

> **🔒 Permissions Required**: Trusted IPs

Trusted IPs restrict deployment access to specified IPv4 addresses and [CIDR ranges](https://www.ipaddressguide.com/cidr "What are CIDR ranges?"), returning a 404 for unauthorized IPs. This protection feature is suitable for limiting access through specific paths like VPNs or external proxies.

Learn more about [Trusted IPs](/docs/security/deployment-protection/methods-to-protect-deployments/trusted-ips) and how to enable it.

## Related resources

- [Understanding Deployment Protection by environment](/docs/deployment-protection#understanding-deployment-protection-by-environment)
- [Methods to bypass deployment protection](/docs/deployment-protection/methods-to-bypass-deployment-protection)


---

[View full sitemap](/docs/sitemap)
