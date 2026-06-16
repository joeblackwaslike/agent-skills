---
title: Vercel WAF
product: vercel
url: /docs/vercel-firewall/vercel-waf
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf"
last_updated: 2026-06-01
type: how-to
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall
  - /docs/vercel-firewall/firewall-observability
  - /docs/vercel-firewall/vercel-waf/usage-and-pricing
  - /docs/security/vercel-waf/custom-rules
  - /docs/security/vercel-waf/ip-blocking
summary: Learn how to secure your website with the Vercel Web Application Firewall (WAF)
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "9377fe6e8e24a58fd52d3074447c9cf0325b56066fef18311b7c7ca8293b1a7e"
---

# Vercel WAF

> **🔒 Permissions Required**: Vercel WAF

The Vercel WAF, part of the [Firewall](/docs/vercel-firewall), provides security controls to [monitor](/docs/vercel-firewall/firewall-observability#traffic) and [control](/docs/vercel-firewall/firewall-observability#traffic) the internet traffic to your site through logging, blocking and challenging. When you apply a configuration change to the firewall, it takes effect globally within 300ms and can be instantly [rolled back](#instant-rollback) to prior configurations.

For billing details, review [Usage & Pricing for Vercel WAF](/docs/vercel-firewall/vercel-waf/usage-and-pricing).

- [Configure your first Custom Rule](/docs/security/vercel-waf/custom-rules)
- [Add IP Blocks](/docs/security/vercel-waf/ip-blocking)
- [Explore WAF Managed Rulesets](/docs/security/vercel-waf/managed-rulesets)

## Traffic control

You can control the internet traffic to your website in the following ways:

- **IP blocking**: Learn how to [configure IP blocking](/docs/security/vercel-waf/ip-blocking)
- **Custom rules**: Learn how to [configure custom rules](/docs/security/vercel-waf/custom-rules) for your project
- **Managed rulesets**: Learn how to [enable managed rulesets](/docs/security/vercel-waf/managed-rulesets) for your project (Enterprise plan)

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
| [Project level IP Blocking](/docs/security/vercel-waf/ip-blocking#project-level-ip-blocking) | Up to 10 | Up to 100 | Custom        |
| [Account-level IP Blocking](/docs/security/vercel-waf/ip-blocking#account-level-ip-blocking) | N/A      | N/A       | Custom        |
| [Custom Rules](/docs/security/vercel-waf/custom-rules)                                       | Up to 3  | Up to 40  | Up to 1000    |
| [Custom Rule Parameters](/docs/security/vercel-waf/rule-configuration#parameters)            | All      | All       | All           |
| [WAF Managed Rulesets](/docs/security/vercel-waf/managed-rulesets)                           | N/A      | N/A       | Contact sales |

- For **Account-level IP Blocking**, CIDR rules are limited to `/16` for IPv4 and `/48` for IPv6
- For **Custom Rule Parameters**, JA3 (Legacy) is available on Enterprise plans


---

[View full sitemap](/docs/sitemap)
