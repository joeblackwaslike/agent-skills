---
title: Usage & Pricing for Vercel WAF
product: vercel
url: /docs/vercel-firewall/vercel-waf/usage-and-pricing
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing"
last_updated: 2026-06-01
type: reference
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/security/ddos-mitigation
  - /docs/security/vercel-waf/ip-blocking
  - /docs/security/vercel-waf/custom-rules
  - /docs/security/vercel-waf/rate-limiting
  - /docs/security/vercel-waf/managed-rulesets
summary: Learn how the Vercel WAF can affect your usage and how specific features are priced.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "f0927c2c62a8393056481684b192a600417507cb4a6f41963caea778169a1930"
---

# Usage & Pricing for Vercel WAF

Vercel Firewall features that are available under all plans, are free to use. This includes [DDoS mitigation](/docs/security/ddos-mitigation), [IP blocking](/docs/security/vercel-waf/ip-blocking), and [custom rules](/docs/security/vercel-waf/custom-rules). Vercel WAF plan-specific features such as [rate limiting](/docs/security/vercel-waf/rate-limiting) and [managed rulesets](/docs/security/vercel-waf/managed-rulesets) are priced as described in [priced features](#priced-features-usage).

## Free features usage

WAF deny, challenge, or rate-limit mitigated traffic does not incur [CDN Requests](/docs/manage-cdn-usage#cdn-requests) or [Fast Data Transfer (FDT)](/docs/manage-cdn-usage#fast-data-transfer). Requests that pass a challenge and continue to your application count toward normal usage.

The same applies to [persistent actions](/docs/security/vercel-waf/custom-rules#persistent-actions), [DDoS mitigation](/docs/security/ddos-mitigation), [Attack Mode](/docs/attack-mode), and [IP blocking](/docs/security/vercel-waf/ip-blocking).

## Priced features usage

Priced WAF features are billed as described below.

### Rate limiting pricing

### Managed ruleset pricing

| Resource | Price | Included (Pro) |
|----------|-------|----------------|
| [OWASP CRS per request size](/docs/vercel-firewall/vercel-waf/managed-rulesets) | Regional | 4KB of each inspected request |


---

[View full sitemap](/docs/sitemap)
