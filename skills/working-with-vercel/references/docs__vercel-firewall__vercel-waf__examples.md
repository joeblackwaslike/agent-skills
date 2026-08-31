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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "e0bc78160e58d893006009acea66b940cec289cd6c29e825d7c88f342bcc834c"
---

# WAF Examples
<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Redirecting Domains](https://vercel.com/blog/redirecting-domains?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=related)
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=related)
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=related) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [WAF Rate Limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=related) — Learn how to configure custom rate limiting rules with the Vercel Web Application Firewall \\(WAF\\).
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [WAF System Bypass Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/system-bypass-rules?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=related) — Learn how to configure IP-based system bypass rules with the Vercel Web Application Firewall \\(WAF\\).
- [Bot Management](https://vercel.com/docs/bot-management?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=related) — Learn how to manage bot traffic to your site.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/examples.graph.md](/docs/vercel-firewall/vercel-waf/examples.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fexamples&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

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


---

[View full sitemap](/docs/sitemap)
