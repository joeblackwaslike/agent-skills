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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/vercel-waf.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "101cadbb120b3341820830352c026802ed90b89cbe80bfba44553ad1cb6f4760"
---

# Vercel WAF

> Vercel WAF is available on all plans
>
> Those with the member, viewer, developer, administrator and security roles can access this feature

The Vercel WAF, part of the [Firewall](/docs/vercel-firewall), provides security controls to [monitor](/docs/vercel-firewall/firewall-observability#traffic) and [control](/docs/vercel-firewall/firewall-observability#traffic) the internet traffic to your site through logging, blocking and challenging. When you apply a configuration change to the firewall, it takes effect globally within 300ms and can be instantly [rolled back](#instant-rollback) to prior configurations.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Vercel WAF upgrade brings persistent actions, rate limiting, and API control](https://vercel.com/blog/vercel-waf-upgrade-brings-persistent-actions-rate-limiting-and-api-control)
- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli)
- [Microfrontends Routing is now free for Firewall-mitigated traffic](https://vercel.com/changelog/microfrontends-routing-is-now-free-for-firewall-mitigated-traffic)
- [Vercel WAF for Blob is now generally available](https://vercel.com/changelog/vercel-waf-for-blob-is-now-generally-available)
- [Web Application Firewall control now available with vercel.json](https://vercel.com/changelog/web-application-firewall-control-now-available-with-vercel-json)
- [Add rate limiting with Vercel](https://vercel.com/kb/guide/add-rate-limiting-vercel) — Learn how to implement rate limiting with Vercel.
- [Using Cloudflare and other reverse proxies with Vercel](https://vercel.com/kb/guide/can-i-use-a-proxy-on-top-of-my-vercel-deployment) — General information about using an external proxy to serve a Vercel Deployment.
- [How to conduct PCI scans on Vercel: A complete guide to IP safelisting](https://vercel.com/kb/guide/how-to-conduct-pci-scans-on-vercel-guide) — Scan and verify your Vercel deployments for secure, PCI-compliant payment processing.
- [How to effectively load test your application on Vercel](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Backends on Vercel: Python, containers, and Daemons](https://vercel.com/blog/backends-on-vercel-python-containers-and-daemons)
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf.graph.md](/docs/vercel-firewall/vercel-waf.graph.md)
<!-- /docsgraph:related -->

For billing details, review [Usage & Pricing for Vercel WAF](/docs/vercel-firewall/vercel-waf/usage-and-pricing).

- [Configure your first Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules)
- [Add IP Blocks](/docs/vercel-firewall/vercel-waf/ip-blocking)
- [Explore WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets)

## Traffic control

You can control the internet traffic to your website in the following ways:

- **IP blocking**: Learn how to [configure IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking)
- **Custom rules**: Learn how to [configure custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) for your project
- **Managed rulesets**: Learn how to [enable managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets) for your project

## Instant rollback

You can quickly revert to a previous version of your firewall configuration. This can be useful in situations that require a quick recovery from unexpected behavior or rule creation.

To restore to a previous version:

1. From your [dashboard](/dashboard), select the project you'd like to configure, then open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar
2. Select the **View Audit Log** option by clicking on the ellipsis menu at the top right
3. Find the version that you would like to restore to by using the date and time selectors
4. Select **Restore** and then **Restore Configuration** on the confirmation modal

## Limits

These standard plan limits apply per project, except for account-level IP blocking.

| Feature | Hobby | Pro | Enterprise |
| ------- | ----- | --- | ---------- |
| [Project-level IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking#project-level-ip-blocking) | Up to 10 | Up to 40 | Up to 250 |
| [System Bypass Rules](/docs/vercel-firewall/vercel-waf/system-bypass-rules#limits) | N/A | Up to 10 | Up to 75 |
| [Account-level IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking#account-level-ip-blocking) | N/A | N/A | Custom |
| [Custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) | Up to 3 | Up to 40 | Up to 250 |
| [Custom rule parameters](/docs/vercel-firewall/vercel-waf/rule-configuration#parameters) | All | All | All |
| [OWASP core ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-owasp-core-ruleset) | N/A | N/A | Available |
| [Rate limiting counting algorithm](/docs/vercel-firewall/vercel-waf/rate-limiting#limits) | Fixed window | Fixed window | Fixed window or token bucket |

- For **Account-level IP blocking**, CIDR rules are limited to `/16` for IPv4 and `/48` for IPv6
- For **Custom rule parameters**, JA3 (Legacy) is available on Enterprise plans

## Related guides

- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall): Learn how to build a honeypot with Vercel Web Application Firewall (WAF) that catches bots ignoring your robots.txt. Capture offending IPs and block them automatically with Vercel WAF Custom Rules and Persistent Actions.
- [Vercel BotID vs Cloudflare Turnstile](https://vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile): Compare Vercel BotID and Cloudflare Turnstile for bot protection, including detection model, hosting requirements, checkBotId() vs Siteverify, framework support, and pricing.
- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid): Gate every request to your AI endpoints with Vercel BotID and checkBotId() so inference runs only for verified callers. Covers setup, Deep Analysis, and verified bots.
- [Vercel WAF vs Cloudflare WAF](https://vercel.com/kb/guide/vercel-waf-vs-cloudflare-waf): A detailed guide to Vercel WAF vs Cloudflare WAF: framework-aware rules, sub-300ms propagation, BotID bot detection, OWASP paranoia levels, leaked credential lookup, and when to choose each product for your web application.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
