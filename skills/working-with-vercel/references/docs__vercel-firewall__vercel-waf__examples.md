---
title: WAF Examples
product: vercel
url: /docs/vercel-firewall/vercel-waf/examples
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/examples"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/routing/redirects
  - /docs/vercel-firewall/vercel-waf/rate-limiting
  - /docs/vercel-firewall/vercel-waf/managed-rulesets
  - /docs/vercel-firewall/vercel-waf/ip-blocking
summary: Learn how to use Vercel WAF to protect your site in specific situations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/examples.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "02a17b561e2f88e6fc41c35fe73522cdbabf4de3a1d7dbdde4505253846b241d"
---

# WAF Examples

| Example                                                                                                        | Category                                                         | Template                                  |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------- |
| [Suspicious traffic in specific countries](/kb/guide/suspicious-traffic-in-specific-countries)                 | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Emergency redirect](/docs/routing/redirects#firewall-redirects)                                               | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Limit abuse with rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting)                           | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Block AI bots](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-ai-bots-managed-ruleset)                           | [Managed Ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets)             |                                           |
| [Block `.php` requests](/kb/guide/suspicious-traffic-in-specific-countries)                                    | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Block traffic from a specific IP address](/kb/guide/traffic-spikes)                                           | [IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking)             |                                           |
| [Challenge `cURL` requests](/kb/guide/challenge-curl-requests)                                                 | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |
| [Challenge cookieless requests on a specific path](/kb/guide/challenge-cookieless-requests-on-a-specific-path) | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |
| [Deny non-browser traffic or blocklisted ASNs](/kb/guide/deny-non-browser-traffic-or-blocklisted-asns)         | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |
| [Deny traffic from a set of IP addresses](/kb/guide/deny-traffic-from-a-set-of-ip-addresses)                   | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |

<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)
- [Rule Configuration Reference](https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration) — List of configurable options with the Vercel WAF
- [Returns activated WAF config](https://vercel.com/docs/rest-api/security/returns-activated-waf-config-2) — POST /v1/security/firewall/config/{configVersion}/activate — Promotes a draft WAF config to an active config
- [Usage & Pricing for Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing) — Learn how the Vercel WAF can affect your usage and how specific features are priced.
- [Returns activated WAF config](https://vercel.com/docs/rest-api/security/returns-activated-waf-config) — GET /v1/security/firewall/config — Lists WAF configs for a project
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/examples.graph.md](/docs/vercel-firewall/vercel-waf/examples.graph.md)
<!-- /docsgraph:related -->

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
