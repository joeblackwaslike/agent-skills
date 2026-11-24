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
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5cbd4accee7d4d1f201817605251b965a474286e68b665a7bec0faa872a5c01c"
---

# Usage & Pricing for Vercel WAF

Vercel Firewall features available on all plans are free to use. This includes [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation), [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), and [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules). Vercel prices plan-specific WAF features such as [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) and [managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets) as described in [priced features](#priced-features-usage).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Priority Projects now in public beta](https://vercel.com/changelog/priority-projects-now-in-public-beta)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Firewall‑mitigated traffic is free on Vercel](https://vercel.com/changelog/web-application-firewall-mitigated-traffic-is-free-on-vercel)
- [WAF Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples) — Learn how to use Vercel WAF to protect your site in specific situations.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Washington D.C., USA \\(iad1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/iad1) — Vercel pricing for the Washington D.C., USA \\(iad1\\) region.
- [Portland, USA \\(pdx1\\) pricing](https://vercel.com/docs/pricing/regional-pricing/pdx1) — Vercel pricing for the Portland, USA \\(pdx1\\) region.
- [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines) — Learn how Vercel applies fair use guidelines across plans and usage-based resources.

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


### Priority projects pricing

[Priority projects](/docs/vercel-firewall/priority-projects) cost $200 per project per month on Pro and Enterprise plans. When you upgrade a project, you're charged right away for the rest of your billing cycle, prorated. The upgrade dialog shows the charge before you confirm.

When you downgrade, delete, or transfer a Priority project, its charge stops at the end of the current billing cycle. You aren't refunded for the rest of that cycle, and upgrading the project again during the same cycle doesn't charge you again.

Usage on Priority projects is billed separately:

| Item                                                      | Rate                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| OWASP core ruleset inspection                             | Per inspected request and per GB of inspected payload, at the [managed ruleset rates](#managed-ruleset-pricing) |
| [Page Integrity](/docs/vercel-firewall/page-integrity) views | $2.00 per 1,000 Page Integrity views                               |

To stop Priority project charges, [downgrade the project](/docs/vercel-firewall/priority-projects#downgrade-a-project).

## Firewall limits

Each project can have up to the following number of Firewall rules and IP entries:

| Limit           | Hobby                                      | Pro                                      | Pro with Priority | Enterprise                                      | Enterprise with Priority |
| --------------- | ------------------------------------------ | ---------------------------------------- | ----------------- | ----------------------------------------------- | ------------------------ |
| Custom rules    | 3       | 40       | 100               | 250       | 500                      |
| IP blocks       | 10        | 40        | 100               | 250        | 500                      |
| IP bypass rules | 0 | 10 | 30                | 75 | 200                      |

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
