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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/deployment-protection/usage-and-pricing.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "166b64f0ead78053ee5e62fea2378493d1202a02472a35a9501de6c6bc4d0448"
---

# Usage & Pricing for Deployment Protection

Most Deployment Protection features are available on all plans at no additional cost. Password Protection has a separate per-project charge on Pro plans, while Passport and Trusted IPs require an Enterprise plan.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Password Protection is now available per project on Pro](https://vercel.com/changelog/password-protection-now-costs-20-per-project-per-month-on-pro)
- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.
- [Account Plans on Vercel](https://vercel.com/docs/plans) — Learn about the different plans available on Vercel.
- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby) — Learn about the Hobby plan and how it compares to the Pro plan.

Full cross-link map for this page: [/docs/deployment-protection/usage-and-pricing.graph.md](/docs/deployment-protection/usage-and-pricing.graph.md)
<!-- /docsgraph:related -->

## Feature availability and pricing

The following table lists fixed Deployment Protection charges. Usage from requests that reach your application follows your plan's normal usage and pricing.

| Feature | Hobby | Pro | Enterprise |
| --- | --- | --- | --- |
| [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) | Included | Included | Included |
| [Standard Protection](/docs/deployment-protection#standard-protection) | Included | Included | Included |
| [All Deployments](/docs/deployment-protection#all-deployments) | Included | Included | Included |
| [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) | Not available | $20 per month per protected project | Included for every project at the team level |
| [Passport](/docs/passport) | Not available | Not available | Custom |
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
