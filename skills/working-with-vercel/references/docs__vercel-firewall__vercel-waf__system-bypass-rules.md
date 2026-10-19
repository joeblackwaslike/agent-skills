---
title: WAF System Bypass Rules
product: vercel
url: /docs/vercel-firewall/vercel-waf/system-bypass-rules
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/system-bypass-rules"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/vercel-waf/managed-rulesets
  - /docs/plans
  - /docs/plans/hobby
summary: Learn how to configure IP-based system bypass rules with the Vercel Web Application Firewall (WAF).
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/system-bypass-rules.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "44f50bfb6167b8d9d08cfc4bd9b4141e62ecc6bd8509dfda945938232aeff4f6"
---

# WAF System Bypass Rules

> **Availability**: WAF System Bypass Rules are available on Enterprise and Pro plans

While Vercel's system-level mitigations (such as [DDoS protection](/docs/vercel-firewall/ddos-mitigation)) safeguard your websites and applications, it can happen that they block traffic from legitimate sources like proxies or shared networks in situations where traffic from these sources was identified as malicious.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli)
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Protect Sensitive Routes with Vercel WAF: Challenge and Deny Rule Recipes](https://vercel.com/kb/guide/suspicious-traffic-in-specific-countries) — Use Vercel WAF custom rules to block or challenge unwanted traffic by country, ASN, IP address, user agent, path, or coo
- [Improvements to Vercel Firewall system bypass rules](https://vercel.com/changelog/improvements-to-vercel-firewall-system-bypass-rules)
- [Vercel Firewall now supports bypassing system mitigations for specific IPs](https://vercel.com/changelog/vercel-firewall-now-supports-bypassing-system-mitigations-for-specific-ips)
- [WAF IP Blocking](https://vercel.com/docs/vercel-firewall/vercel-waf/ip-blocking) — Learn how to customize the Vercel WAF to restrict access to certain IP addresses.
- [Create System Bypass Rule](https://vercel.com/docs/rest-api/security/create-system-bypass-rule) — POST /v1/security/firewall/bypass — Create new system bypass rules
- [Remove System Bypass Rule](https://vercel.com/docs/rest-api/security/remove-system-bypass-rule) — DELETE /v1/security/firewall/bypass — Remove system bypass rules
- [Create conditional firewall bypass](https://vercel.com/docs/rest-api/security/create-conditional-firewall-bypass) — POST /v1/security/firewall/bypass/rules — Create a conditional firewall bypass rule for a project domain.
- [vercel firewall](https://vercel.com/docs/cli/firewall) — Learn how to explore firewall traffic and manage your project's custom firewall rules, managed bot rules, IP blocks, sys

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/system-bypass-rules.graph.md](/docs/vercel-firewall/vercel-waf/system-bypass-rules.graph.md)
<!-- /docsgraph:related -->

You can ensure that specific IP addresses or CIDR ranges are never blocked by the Vercel Firewall's system mitigations with System Bypass Rules.

> **💡 Note:** If you need to allow requests blocked by your own [WAF Custom
> Rules](/docs/vercel-firewall/vercel-waf/custom-rules), use another [custom rule with a bypass
> action](/docs/vercel-firewall/vercel-waf/managed-rulesets#bypassing-custom-rules).

## Get started

To add an IP address that should bypass system mitigations, open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar of your project and follow these steps:

1. On the top right, click **Add New** and select **System Bypass**
2. Complete the following fields in the **Configure New System Bypass** modal:
   - IP Address Or CIDR (required)
   - Domain (required): The domain connected to the project or use `*` to specify all domains connected to a project
   - Note: For future reference
3. Select the **Create System Bypass** button

You'll see a success message on the bottom right confirming that the rule was added.

## Limits

System Bypass Rules have limits based on your [account plan](/docs/plans).

| Resource                                  | [Hobby](/docs/plans/hobby) | [Pro](/docs/plans/pro-plan) | [Enterprise](/docs/plans/enterprise) |
| ----------------------------------------- | -------------------------- | ---------------------- | ------------------------------------ |
| Number of system bypass rules per project | N/A                        | 25                     | 100                                  |


---

[View full sitemap](/docs/sitemap)
