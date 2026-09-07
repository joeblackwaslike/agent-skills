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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "99f6e7bcf518af661f093fff5f6e77c89e9239e6ec206f5621d4b2c5fbccac18"
---

# Rule Configuration Reference

For each custom rule that you create, you can configure one or more conditions with [**parameters**](#parameters) from the incoming traffic that you compare with specific values using [**operators**](#operators). For each new condition, you can choose how you combine it with the previous condition using the **AND** (Both conditions need to be met) or the **OR** operator (One of the conditions need to be met).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Next.js Server Actions in the Vercel Firewall](https://vercel.com/changelog/manage-next-js-server-actions-in-the-vercel-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Protect Sensitive Routes with Vercel WAF: Challenge and Deny Rule Recipes](https://vercel.com/kb/guide/suspicious-traffic-in-specific-countries?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Use Vercel WAF custom rules to block or challenge unwanted traffic by country, ASN, IP address, user agent, path, or coo
- [Deny non-browser traffic or blocklisted ASNs](https://vercel.com/kb/guide/deny-non-browser-traffic-or-blocklisted-asns?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to block traffic from known threats with the Vercel WAF API.
- [WAF Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to add and manage custom rules to configure the Vercel Web Application Firewall \\(WAF\\).
- [WAF Managed Rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall \\(WAF\\)
- [vercel firewall](https://vercel.com/docs/cli/firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Learn how to manage your project's custom firewall rules, IP blocks, system bypass rules, attack challenge mode, and sys
- [Routing Rules](https://vercel.com/docs/ai-gateway/models-and-providers/routing-rules?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Define team-wide rules that rewrite requests from one model to another or deny specific models in AI Gateway.
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=related) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md](/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Frule-configuration&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

You also specify an [**action**](#actions) executed when all the conditions are met.

## Parameters

## Operators

All operators are case insensitive.

## Actions

Name

Description

Note

Log

Tracks the matching of this rule without blocking traffic. Requests matching this rule are visible in the Firewall overview page.

- If another rule blocks the traffic **before** a log rule executes, the request is not considered a match for that log rule
- If another rule blocks the traffic **after** a log rule executes, the request is tagged to the rule that blocked the traffic and does not appear in the log rule

Challenge

Conditionally blocks traffic with

browser challenge

.

- If the client fails to solve the challenge, the rule continues to block the traffic
- Once the client solves the challenge, the rule is bypassed and remaining rules (if any) are evaluated. The request is allowed if none of the remaining rules block

Deny

Blocks the request and no further rules are evaluated.

Bypass

If matched, it bypasses any remaining custom rules.

WAF bypass rules

\*\*do not\*\*

bypass system-level mitigations such as

DDoS Mitigation

. To do so, you can use the

Bypass System-level Mitigations

feature.

Redirect

If matched, it redirects the client to the target path set in the

to

field.

- Redirects the request and no further rules are evaluated
- The target path in the to field can be absolute or relative to the project deployment's root
- It's a temporary redirect (307)


---

[View full sitemap](/docs/sitemap)
