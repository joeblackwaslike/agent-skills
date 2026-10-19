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
  - /docs/vercel-firewall/vercel-waf/managed-rulesets
  - /docs/vercel-firewall/vercel-waf/ip-blocking
  - /docs/rest-api/security/update-attack-challenge-mode
summary: Learn how to use Vercel WAF to protect your site in specific situations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/examples.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a49c55e674247e13d3eb10998fcd182976918fafd29c59d6d3cdd096b1ca5e15"
---

# WAF Examples

| Example                                                                                                        | Category                                                         | Template                                  |
| -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------- |
| [Suspicious traffic in specific countries](/kb/guide/suspicious-traffic-in-specific-countries)                 | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Emergency redirect](/kb/guide/emergency-redirect)                                                             | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Limit abuse with rate limiting](/kb/guide/limit-abuse-with-rate-limiting)                                     | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Block AI bots](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-ai-bots-managed-ruleset)                           | [Managed Ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets)             |                                           |
| [Block `.php` requests](/kb/guide/block-php-requests)                                                          | [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)            |  |
| [Block traffic from a specific IP address](/kb/guide/traffic-spikes)                                           | [IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking)             |                                           |
| [Challenge `cURL` requests](/kb/guide/challenge-curl-requests)                                                 | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |
| [Challenge cookieless requests on a specific path](/kb/guide/challenge-cookieless-requests-on-a-specific-path) | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |
| [Deny non-browser traffic or blocklisted ASNs](/kb/guide/deny-non-browser-traffic-or-blocklisted-asns)         | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |
| [Deny traffic from a set of IP addresses](/kb/guide/deny-traffic-from-a-set-of-ip-addresses)                   | [Firewall REST API](/docs/rest-api/security/update-attack-challenge-mode) |                                           |

<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [How to block bots from OpenAI GPTBot](https://vercel.com/kb/guide/how-to-block-bots-openai-gptbot) — Learn how to use the Vercel WAF to block, rate limit, or challenge traffic from OpenAI GPTBot.
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [Rule Configuration Reference](https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration) — List of configurable options with the Vercel WAF
- [WAF Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting) — Learn how to configure custom rate limiting rules with the Vercel Web Application Firewall \\(WAF\\).
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Bot Management](https://vercel.com/docs/bot-management) — Learn how to manage bot traffic to your site.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/examples.graph.md](/docs/vercel-firewall/vercel-waf/examples.graph.md)
<!-- /docsgraph:related -->



---

[View full sitemap](/docs/sitemap)
