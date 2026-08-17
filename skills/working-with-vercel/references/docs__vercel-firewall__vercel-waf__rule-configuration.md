---
title: Rule Configuration Reference
product: vercel
url: /docs/vercel-firewall/vercel-waf/rule-configuration
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration"
last_updated: 2025-04-21
type: reference
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  []
summary: List of configurable options with the Vercel WAF
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "34aafd85a569d88111fcce47b1546f0384efb29c4d06da7d6382634100c58fbf"
---

# Rule Configuration Reference

For each custom rule that you create, you can configure one or more conditions with [**parameters**](#parameters) from the incoming traffic that you compare with specific values using [**operators**](#operators). For each new condition, you can choose how you combine it with the previous condition using the **AND** (Both conditions need to be met) or the **OR** operator (One of the conditions need to be met).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules?from=related) — Learn how to add and manage custom rules to configure the Vercel Web Application Firewall \(WAF\).
- [WAF Managed Rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets?from=related) — Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall \(WAF\)
- [Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples?from=related) — Learn how to use Vercel WAF to protect your site in specific situations.
- [List rules](https://vercel.com/docs/rest-api/ai-gateway/list-rules?from=related)
- [Read Firewall Configuration](https://vercel.com/docs/rest-api/security/read-firewall-configuration?from=related)

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md](/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md)
<!-- /docsgraph:related -->

You also specify an [**action**](#actions) executed when all the conditions are met.

## Parameters

## Operators

All operators are case insensitive.

## Actions


---

[View full sitemap](/docs/sitemap)
