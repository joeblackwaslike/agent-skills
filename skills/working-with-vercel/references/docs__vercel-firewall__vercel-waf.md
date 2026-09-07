---
title: Vercel WAF
product: vercel
url: /docs/vercel-firewall/vercel-waf
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf"
last_updated: 2026-07-29
type: how-to
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall
  - /docs/vercel-firewall/firewall-observability
  - /docs/vercel-firewall/vercel-waf/usage-and-pricing
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/vercel-waf/ip-blocking
summary: Learn how to secure your website with the Vercel Web Application Firewall (WAF)
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "998b8f3c9e064e31de77919a96b28993ffc1bbb0848e07427159e1e3d9db9b1d"
---

# Vercel WAF

> **🔒 Permissions Required**: Vercel WAF

The Vercel WAF, part of the [Firewall](/docs/vercel-firewall), provides security controls to [monitor](/docs/vercel-firewall/firewall-observability#traffic) and [control](/docs/vercel-firewall/firewall-observability#traffic) the internet traffic to your site through logging, blocking and challenging. When you apply a configuration change to the firewall, it takes effect globally within 300ms and can be instantly [rolled back](#instant-rollback) to prior configurations.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related)
- [Vercel WAF for Blob is now generally available](https://vercel.com/changelog/vercel-waf-for-blob-is-now-generally-available?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related)
- [Web Application Firewall control now available with vercel.json](https://vercel.com/changelog/web-application-firewall-control-now-available-with-vercel-json?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related)
- [Ensuring safe and effective infrastructure testing](https://vercel.com/kb/guide/ensuring-safe-and-effective-infrastructure-testing?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related) — We conduct regular penetration testing through certified third-party assessors to secure the Vercel platform. This guide
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [How to conduct PCI scans on Vercel: A complete guide to IP safelisting](https://vercel.com/kb/guide/how-to-conduct-pci-scans-on-vercel-guide?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related) — Scan and verify your Vercel deployments for secure, PCI-compliant payment processing.
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [Block, rate limit, and challenge traffic with the Vercel Firewall](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related)
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related)
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [Vercel CDN overview](https://vercel.com/docs/cdn?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf.graph.md](/docs/vercel-firewall/vercel-waf.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For billing details, review [Usage & Pricing for Vercel WAF](/docs/vercel-firewall/vercel-waf/usage-and-pricing).

- [Configure your first Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)
- [Add IP Blocks](/docs/vercel-firewall/vercel-waf/ip-blocking)
- [Explore WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets)

## Traffic control

You can control the internet traffic to your website in the following ways:

- **IP blocking**: Learn how to [configure IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking)
- **Custom rules**: Learn how to [configure custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) for your project
- **Managed rulesets**: Learn how to [enable managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets) for your project (Enterprise plan)

## Instant rollback

You can quickly revert to a previous version of your firewall configuration. This can be useful in situations that require a quick recovery from unexpected behavior or rule creation.

To restore to a previous version:

1. From your [dashboard](/dashboard), select the project you'd like to configure, then open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar
2. Select the **View Audit Log** option by clicking on the ellipsis menu at the top right
3. Find the version that you would like to restore to by using the date and time selectors
4. Select **Restore** and then **Restore Configuration** on the confirmation modal

## Limits

Depending on your plan, there are limits for each Vercel WAF feature.

| Feature                                                                                      | Hobby    | Pro       | Enterprise    |
| -------------------------------------------------------------------------------------------- | -------- | --------- | ------------- |
| [Project level IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking#project-level-ip-blocking) | Up to 3  | Up to 100 | Up to 1000    |
| [Account-level IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking#account-level-ip-blocking) | N/A      | N/A       | Custom        |
| [Custom Rules](/docs/vercel-firewall/vercel-waf/custom-rules)                                       | Up to 3  | Up to 40  | Up to 1000    |
| [Custom Rule Parameters](/docs/vercel-firewall/vercel-waf/rule-configuration#parameters)            | All      | All       | All           |
| [WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets)                           | N/A      | N/A       | Contact sales |

- For **Account-level IP Blocking**, CIDR rules are limited to `/16` for IPv4 and `/48` for IPv6
- For **Custom Rule Parameters**, JA3 (Legacy) is available on Enterprise plans


---

[View full sitemap](/docs/sitemap)
