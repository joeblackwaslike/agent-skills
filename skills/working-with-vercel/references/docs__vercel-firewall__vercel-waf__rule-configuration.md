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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "a03e22629ca96b264ec26fc0124946f6a9164c5bb82941682e54ec34680ab10b"
---

# Rule Configuration Reference

For each custom rule that you create, you can configure one or more conditions with [**parameters**](#parameters) from the incoming traffic that you compare with specific values using [**operators**](#operators). For each new condition, you can choose how you combine it with the previous condition using the **AND** (Both conditions need to be met) or the **OR** operator (One of the conditions need to be met).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Next.js Server Actions in the Vercel Firewall](https://vercel.com/changelog/manage-next-js-server-actions-in-the-vercel-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Vercel Firewall rule builder now supports `OR` for rule condition groups](https://vercel.com/changelog/vercel-firewall-rule-builder-now-supports-or-for-rule-condition-groups?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related)
- [WAF Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to add and manage custom rules to configure the Vercel Web Application Firewall \\(WAF\\).
- [WAF Managed Rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall \\(WAF\\)
- [WAF Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to use Vercel WAF to protect your site in specific situations.
- [Create rule](https://vercel.com/docs/rest-api/ai-gateway/create-rule?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — POST /v1/ai-gateway/rules — Create a routing rule
- [List rules](https://vercel.com/docs/rest-api/ai-gateway/list-rules?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — GET /v1/ai-gateway/rules — List the authenticated team's routing rules

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md](/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

You also specify an [**action**](#actions) executed when all the conditions are met.

## Parameters

## Operators

All operators are case insensitive.

## Actions


---

[View full sitemap](/docs/sitemap)
