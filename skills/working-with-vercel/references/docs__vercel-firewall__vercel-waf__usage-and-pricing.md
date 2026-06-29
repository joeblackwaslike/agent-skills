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
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "de28189bef1ad5ae90c90a256d7d4dd8e1058e566810e604b0a14f3ce2bc110f"
---

# Usage & Pricing for Vercel WAF

Vercel Firewall features available on all plans are free to use. This includes [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), and [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules). Vercel prices plan-specific WAF features such as [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) and [managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets) as described in [priced features](#priced-features-usage).

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
