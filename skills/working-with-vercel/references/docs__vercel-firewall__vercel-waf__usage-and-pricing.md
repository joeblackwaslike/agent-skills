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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "2012175b434d5a058942908fe4c4c1c6bf87a2b86aaa63b9b5c24e3bbbf6474e"
---

# Usage & Pricing for Vercel WAF

Vercel Firewall features available on all plans are free to use. This includes [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), and [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules). Vercel prices plan-specific WAF features such as [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) and [managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets) as described in [priced features](#priced-features-usage).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Firewall‑mitigated traffic is free on Vercel](https://vercel.com/changelog/web-application-firewall-mitigated-traffic-is-free-on-vercel?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related)
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Washington D.C., USA \\(iad1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/iad1?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Washington D.C., USA \\(iad1\\) region.
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [WAF Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Learn how to use Vercel WAF to protect your site in specific situations.
- [Services Pricing and Limits](https://vercel.com/docs/services/pricing?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=related) — Understand how billing works for Vercel Services, what's charged, and which limits apply.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/usage-and-pricing.graph.md](/docs/vercel-firewall/vercel-waf/usage-and-pricing.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fusage-and-pricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Free features usage

WAF deny, challenge, or rate-limit mitigated traffic does not incur [CDN Requests](/docs/manage-cdn-usage#cdn-requests) or [Fast Data Transfer (FDT)](/docs/manage-cdn-usage#fast-data-transfer). Requests that pass a challenge and continue to your application count toward normal usage.

The same applies to [persistent actions](/docs/vercel-firewall/vercel-waf/custom-rules#persistent-actions), [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), [Attack Mode](/docs/vercel-firewall/attack-mode), and [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking).

## Priced features usage

Priced WAF features are billed as described below.

### Rate limiting pricing

### Managed ruleset pricing

| Resource | Price | Included (Pro) |
|----------|-------|----------------|
| [OWASP CRS per request size](/docs/vercel-firewall/vercel-waf/managed-rulesets) | Regional | 4KB of each inspected request |


---

[View full sitemap](/docs/sitemap)
