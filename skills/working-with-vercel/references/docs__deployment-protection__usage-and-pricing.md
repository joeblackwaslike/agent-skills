---
title: Usage & Pricing for Deployment Protection
product: vercel
url: /docs/deployment-protection/usage-and-pricing
canonical_url: "https://vercel.com/docs/deployment-protection/usage-and-pricing"
last_updated: 2026-09-15
type: reference
prerequisites:
  - /docs/deployment-protection
related:
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/passport
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
summary: Compare Deployment Protection feature availability and pricing across Hobby, Pro, and Enterprise plans.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/usage-and-pricing.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "9b949a6783a71a08dffa6eac39671775fc1fe78e3432f235099ece5cad9a518a"
---

# Usage & Pricing for Deployment Protection

Most Deployment Protection features are available on all plans at no additional cost. Password Protection has a separate per-project charge on Pro plans, while Passport and Trusted IPs require an Enterprise plan.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Password Protection is now available per project on Pro](https://vercel.com/changelog/password-protection-now-costs-20-per-project-per-month-on-pro?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related)
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related)
- [How do I add password protection to my Vercel deployment?](https://vercel.com/kb/guide/how-do-i-add-password-protection-to-my-vercel-deployment?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Enable Password Protection on a Vercel deployment, configure automation and CORS bypasses, and verify the gate before yo
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related)
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Protect who can see your deployments.
- [Deployment Protection is now enabled by default for new projects](https://vercel.com/changelog/deployment-protection-is-now-enabled-by-default-for-new-projects?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related)
- [Access Control](https://vercel.com/docs/security/access-control?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Vercel Pro Plan](https://vercel.com/docs/plans/pro-plan?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn about the Vercel Pro plan with credit-based billing, free viewer seats, and self-serve enterprise features for pro
- [Account Plans on Vercel](https://vercel.com/docs/plans?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn about the different plans available on Vercel.
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a

Full cross-link map for this page: [/docs/deployment-protection/usage-and-pricing.graph.md](/docs/deployment-protection/usage-and-pricing.graph.md?from=related&source_path=%2Fdocs%2Fdeployment-protection%2Fusage-and-pricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Feature availability and pricing

The following table lists fixed Deployment Protection charges. Usage from requests that reach your application follows your plan's normal usage and pricing.

| Feature | Hobby | Pro | Enterprise |
| --- | --- | --- | --- |
| [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) | Included | Included | Included |
| [Standard Protection](/docs/deployment-protection#standard-protection) | Included | Included | Included |
| [All Deployments](/docs/deployment-protection#all-deployments) | Included | Included | Included |
| [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) | Not available | $20 per month per protected project | Included for every project at the team level |
| [Passport](/docs/passport) | Not available | Not available | Included |
| [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips) | Not available | Not available | Included |
| [Only Production Deployments](/docs/deployment-protection#only-production-deployments) | Not available | Not available | Included with Trusted IPs |
| [Deployment Protection Exceptions](/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions) | Included | Included | Included |
| [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) | Included | Included | Included |
| [OPTIONS Allowlist](/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist) | Included | Included | Included |
| [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) | Included, limited to one link per account | Included | Included |
| [Protected Source Maps](/docs/deployment-protection/protected-source-maps) | Included | Included | Included |

"Included" means the feature does not add a separate Deployment Protection charge to your plan.

## Password Protection charges

For Pro teams with project-level pricing, Vercel adds a $20 monthly charge when you enable Password Protection for a project. Each protected project is charged separately. Disable Password Protection from the [project's settings](/docs/deployment-protection/methods-to-protect-deployments/password-protection#how-to-enable-and-manage-password-protection)

### Existing teams with the legacy Advanced Deployment Protection package

Existing Pro teams that purchased the legacy Advanced Deployment Protection package keep their current billing model and functionality, including Password Protection for every project. The package appears on invoices as Team Level Password Protection.

If you prefer to switch to project-level Password Protection, contact support.

## Related resources

- [Deployment Protection overview](/docs/deployment-protection)
- [Methods to protect deployments](/docs/deployment-protection/methods-to-protect-deployments)
- [Methods to bypass Deployment Protection](/docs/deployment-protection/methods-to-bypass-deployment-protection)


---

[View full sitemap](/docs/sitemap)
