---
title: Usage & Pricing for Deployment Protection
product: vercel
url: /docs/deployment-protection/usage-and-pricing
canonical_url: "https://vercel.com/docs/deployment-protection/usage-and-pricing"
last_updated: 2026-08-21
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
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "9e0dde4948a6a9ace1e134636eed4656ccd87c44efd7ef6ce60b035f3087e9b5"
---

# Usage & Pricing for Deployment Protection

Most Deployment Protection features are available on all plans at no additional cost. Password Protection has a separate per-project charge on Pro plans, while Passport and Trusted IPs require an Enterprise plan.

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

### Existing teams with Advanced Deployment Protection

Existing Pro teams that previously purchased Advanced Deployment Protection add-on keep their current billing model and functionality, including password protection for every project. The add-on will appear on invoices as Team-level Password Protection.

If you prefer to switch to project-level Password Protection, contact support.

## Related resources

- [Deployment Protection overview](/docs/deployment-protection)
- [Methods to protect deployments](/docs/deployment-protection/methods-to-protect-deployments)
- [Methods to bypass Deployment Protection](/docs/deployment-protection/methods-to-bypass-deployment-protection)


---

[View full sitemap](/docs/sitemap)
