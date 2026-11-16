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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9eadc97d8790c9ad9a6753b9bf71644b6dade8292af421db465169a260dba597"
---

# Usage & Pricing for Vercel WAF

Vercel Firewall features available on all plans are free to use. This includes [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), and [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules). Vercel prices plan-specific WAF features such as [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) and [managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets) as described in [priced features](#priced-features-usage).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Firewall‑mitigated traffic is free on Vercel](https://vercel.com/changelog/web-application-firewall-mitigated-traffic-is-free-on-vercel)
- [Add rate limiting with Vercel](https://vercel.com/kb/guide/add-rate-limiting-vercel) — Learn how to implement rate limiting with Vercel.
- [WAF Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples) — Learn how to use Vercel WAF to protect your site in specific situations.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Washington D.C., USA \\(iad1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/iad1) — Vercel pricing for the Washington D.C., USA \\(iad1\\) region.
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [Montréal, Canada \\(yul1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/yul1) — Vercel pricing for the Montréal, Canada \\(yul1\\) region.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/usage-and-pricing.graph.md](/docs/vercel-firewall/vercel-waf/usage-and-pricing.graph.md)
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
| [OWASP CRS per request number](/docs/vercel-firewall/vercel-waf/managed-rulesets) | Regional | N/A |
| [OWASP CRS per request size](/docs/vercel-firewall/vercel-waf/managed-rulesets) | Regional | N/A |

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
