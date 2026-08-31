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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "43d57d00a3f355f3552117feedce8b29f74799d80efed0494caa979266d900a3"
---

# WAF System Bypass Rules

> **🔒 Permissions Required**: WAF System Bypass Rules


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related)
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Improvements to Vercel Firewall system bypass rules](https://vercel.com/changelog/improvements-to-vercel-firewall-system-bypass-rules?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related)
- [Vercel Firewall now supports bypassing system mitigations for specific IPs](https://vercel.com/changelog/vercel-firewall-now-supports-bypassing-system-mitigations-for-specific-ips?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related)
- [Deny traffic from a set of IP addresses](https://vercel.com/kb/guide/deny-traffic-from-a-set-of-ip-addresses?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related) — Learn how to block specific IP addresses with the Vercel WAF API.
- [Deny non-browser traffic or blocklisted ASNs](https://vercel.com/kb/guide/deny-non-browser-traffic-or-blocklisted-asns?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related) — Learn how to block traffic from known threats with the Vercel WAF API.
- [Create System Bypass Rule](https://vercel.com/docs/rest-api/security/create-system-bypass-rule?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related) — POST /v1/security/firewall/bypass — Create new system bypass rules
- [vercel firewall](https://vercel.com/docs/cli/firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related) — Learn how to manage your project's custom firewall rules, IP blocks, system bypass rules, attack challenge mode, and sys
- [Remove System Bypass Rule](https://vercel.com/docs/rest-api/security/remove-system-bypass-rule?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related) — DELETE /v1/security/firewall/bypass — Remove system bypass rules
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/system-bypass-rules.graph.md](/docs/vercel-firewall/vercel-waf/system-bypass-rules.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fsystem-bypass-rules&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

While Vercel's system-level mitigations (such as [DDoS protection](/docs/vercel-firewall/ddos-mitigation)) safeguard your websites and applications, it can happen that they block traffic from legitimate sources like proxies or shared networks in situations where traffic from these sources was identified as malicious.

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
