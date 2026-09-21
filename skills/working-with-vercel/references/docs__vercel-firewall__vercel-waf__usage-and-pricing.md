---
title: Usage & Pricing for Vercel WAF
product: vercel
url: /docs/vercel-firewall/vercel-waf/usage-and-pricing
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing"
last_updated: 2026-06-16
type: reference
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/vercel-firewall/vercel-waf/ip-blocking
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/vercel-waf/rate-limiting
  - /docs/vercel-firewall/vercel-waf/managed-rulesets
summary: Learn how the Vercel WAF can affect your usage and how specific features are priced.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "4018a9df8553161b44ad9059d80fd41d121de0bffdfe55dc6f0ff3847354d265"
---

# Usage & Pricing for Vercel WAF

Vercel Firewall features available on all plans are free to use. This includes [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), and [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules). Vercel prices plan-specific WAF features such as [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) and [managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets) as described in [priced features](#priced-features-usage).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Firewall‑mitigated traffic is free on Vercel](https://vercel.com/changelog/web-application-firewall-mitigated-traffic-is-free-on-vercel?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related)
- [Vercel WAF rate limiting now generally available](https://vercel.com/changelog/vercel-waf-rate-limiting-now-generally-available?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related)
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [WAF Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn how to use Vercel WAF to protect your site in specific situations.
- [Washington D.C., USA \\(iad1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/iad1?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Washington D.C., USA \\(iad1\\) region.
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [Paris, France \\(cdg1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/cdg1?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Paris, France \\(cdg1\\) region.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/usage-and-pricing.graph.md](/docs/vercel-firewall/vercel-waf/usage-and-pricing.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Free features usage

WAF deny, challenge, or rate-limit mitigated traffic does not incur [CDN Requests](/docs/manage-cdn-usage#cdn-requests) or [Fast Data Transfer (FDT)](/docs/manage-cdn-usage#fast-data-transfer). Requests that pass a challenge and continue to your application count toward normal usage.

The same applies to [persistent actions](/docs/vercel-firewall/vercel-waf/custom-rules#persistent-actions), [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), [Attack Mode](/docs/vercel-firewall/attack-mode), and [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking).

## Priced features usage

Priced WAF features are billed as described below.

### Rate limiting pricing

| Resource | Price | Included (Pro) |
|----------|-------|----------------|
| [WAF Rate Limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) | Regional | Usage-based |


### Managed ruleset pricing

| Resource | Price | Included (Pro) |
|----------|-------|----------------|
| [OWASP CRS per request number](/docs/vercel-firewall/vercel-waf/managed-rulesets) | Regional | Usage-based |
| [OWASP CRS per request size](/docs/vercel-firewall/vercel-waf/managed-rulesets) | Regional | 4KB of each inspected request |


---

[View full sitemap](/docs/sitemap)
