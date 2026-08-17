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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "60dd772cae3ff8690510ffc42c12178a0644e27940cda0763d75f7df8a2cb097"
---

# Vercel WAF

> **🔒 Permissions Required**: Vercel WAF


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Ensuring safe and effective infrastructure testing](https://vercel.com/kb/guide/ensuring-safe-and-effective-infrastructure-testing?from=related) — We conduct regular penetration testing through certified third-party assessors to secure the Vercel platform. This guide
- [How to conduct PCI scans on Vercel: A complete guide to IP safelisting](https://vercel.com/kb/guide/how-to-conduct-pci-scans-on-vercel-guide?from=related) — Scan and verify your Vercel deployments for secure, PCI-compliant payment processing.
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application?from=related) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime?from=related) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [How to protect your AI app from bots](https://vercel.com/kb/guide/how-to-protect-your-ai-app-from-bots?from=related) — Learn how to protect your AI app from bots, scrapers, and abuse using Firewall, BotID, and more.
- [Firewall API](https://vercel.com/docs/vercel-firewall/firewall-api?from=related) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.
- [Overview](https://vercel.com/docs/security?from=related) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [DDoS Mitigation](https://vercel.com/docs/vercel-firewall/ddos-mitigation?from=related) — Learn how the Vercel Firewall mitigates against DoS and DDoS attacks
- [Overview](https://vercel.com/docs/cdn?from=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf.graph.md](/docs/vercel-firewall/vercel-waf.graph.md)
<!-- /docsgraph:related -->

The Vercel WAF, part of the [Firewall](/docs/vercel-firewall), provides security controls to [monitor](/docs/vercel-firewall/firewall-observability#traffic) and [control](/docs/vercel-firewall/firewall-observability#traffic) the internet traffic to your site through logging, blocking and challenging. When you apply a configuration change to the firewall, it takes effect globally within 300ms and can be instantly [rolled back](#instant-rollback) to prior configurations.

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
