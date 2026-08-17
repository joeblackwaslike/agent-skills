---
title: WAF Managed Rulesets
product: vercel
url: /docs/vercel-firewall/vercel-waf/managed-rulesets
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets"
last_updated: 2026-07-17
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/rbac/access-roles
  - /docs/bot-management
  - /docs/vercel-firewall/firewall-concepts
  - /docs/vercel-firewall/vercel-waf/rule-configuration
  - /docs/vercel-firewall/vercel-waf/custom-rules
summary: Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall (WAF)
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c26aabbccb8bba563029cab78da7299d6ed9c6fe95da51500293670746e06588"
---

# WAF Managed Rulesets

WAF Managed Rulesets are collections of predefined WAF rules based on standards such as [Open Worldwide Application Security Project (OWASP) Top Ten](https://owasp.org/www-project-top-ten/) that you can enable and configure in your project's Firewall dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime?from=related) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf?from=related) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Deny non-browser traffic or blocklisted ASNs](https://vercel.com/kb/guide/deny-non-browser-traffic-or-blocklisted-asns?from=related) — Learn how to block traffic from known threats with the Vercel WAF API.
- [System Bypass Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/system-bypass-rules?from=related) — Learn how to configure IP-based system bypass rules with the Vercel Web Application Firewall \(WAF\).
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.
- [Read Firewall Configuration](https://vercel.com/docs/rest-api/security/read-firewall-configuration?from=related)
- [Security](https://vercel.com/docs/cdn-security?from=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/managed-rulesets.graph.md](/docs/vercel-firewall/vercel-waf/managed-rulesets.graph.md)
<!-- /docsgraph:related -->

The following ruleset(s) are currently available:

- [OWASP core ruleset](#configure-owasp-core-ruleset)
- [Bot Protection Managed Ruleset](#configure-bot-protection-managed-ruleset)
- [AI Bots Managed Ruleset](#configure-ai-bots-managed-ruleset)

## Access roles

- You need to be a [Developer](/docs/rbac/access-roles#developer-role) or viewer ([Viewer Pro](/docs/rbac/access-roles#pro-viewer-role) or [Viewer Enterprise](/docs/rbac/access-roles#enterprise-viewer-role)) in the team to view the Firewall overview page and list the rules
- You need to be a [Project administrator](/docs/rbac/access-roles#project-administrators), [Team member](/docs/rbac/access-roles#member-role), or [Security](/docs/rbac/access-roles#security-role) to configure, save and apply any rule and configuration

## Configure OWASP core ruleset

> **🔒 Permissions Required**: OWASP core ruleset

To enable and configure [OWASP Core Ruleset](https://owasp.org/www-project-top-ten/) for your project, follow these steps:

1. From your project's [dashboard](/dashboard), open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar
2. Open **Rules** in the sidebar
3. From the **WAF Managed Rulesets** section, enable **OWASP Core Ruleset**
4. You can apply the changes with the OWASP rules enabled by default:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment
5. Or select what OWASP rules to enable first by selecting **Configure** from the **OWASP Core Ruleset** list item
6. For the **OWASP Core Ruleset** configuration page, enable or disable the rule that you would like to apply
7. For each enabled rule, select **Log** or **Deny** from the action drop-down
   - Use **Log** first and monitor the live traffic on the **Firewall** overview page to check that the rule has the desired effect when applied
8. Apply the changes
9. Monitor the live traffic on the **Firewall** overview page

## Configure Bot Protection Managed Ruleset

> **🔒 Permissions Required**: Bot Protection Managed Ruleset

The ruleset is **inactive by default**. In the dashboard this is labeled **Off**. Matching traffic is not evaluated and reaches your application.

To enable and configure [bot protection](/docs/bot-management#bot-protection-managed-ruleset) for your project, follow these steps:

1. From your project's dashboard, open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Open+Firewall) in the sidebar.
2. Open **Rules** in the sidebar.
3. From the **Bot Management** section, select **Log** or **Challenge** on the **Bot Protection** rule to choose what action should be performed when an unwanted bot is identified.
   - When enabled in challenge mode, the Vercel WAF will serve a JavaScript challenge to traffic that is unlikely to be a browser.
4. You can then apply as follows:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment

## Configure AI Bots Managed Ruleset

> **🔒 Permissions Required**: AI Bots Managed Ruleset

The ruleset is **inactive by default**. In the dashboard this is labeled **Allow**. Matching traffic is not evaluated and reaches your application.

To manage AI bots for your project, follow these steps:

1. From your project's dashboard, open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Open+Firewall) in the sidebar.
2. Open **Rules** in the sidebar.
3. From the **Bot Management** section, select **Log** or **Deny** on the **AI Bots Ruleset** rule to choose what action should be performed when an AI bot is identified.
   - **Log**: This action records AI bot traffic without blocking it. It's useful for monitoring.
   - **Deny**: This action blocks all traffic identified as coming from AI bots.
4. You can then apply as follows:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment

## Bypassing rulesets

Sometimes, you may need to allow specific requests that a WAF Managed Ruleset is blocking. For example, [Bot Protection](/docs/bot-management#bot-protection-managed-ruleset) could be blocking a custom user agent that you are using.
In this case, use the [bypass](/docs/vercel-firewall/firewall-concepts#bypass) [action](/docs/vercel-firewall/vercel-waf/rule-configuration#actions) in a [WAF Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules) to target the traffic you want to allow.
In the case of the custom user agent, you would use the "User Agent" parameter with a value of the user agent name in the custom rule.

### Bypassing custom rules

If you need to allow requests being blocked by your own custom rule set up in your project, you can add another custom rule with a bypass action targeting the blocked requests. Make sure that the bypass rule executes before the blocking custom rule by placing it higher in the custom rules section of the [**Firewall rules** page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Frules\&title=Go+to+the+Firewall+Rules) of your project dashboard.

### Rules execution order

The Vercel WAF executes rules on incoming traffic in the following order:

1. Custom rules set up in the project
2. WAF Managed Rulesets configured in the project


---

[View full sitemap](/docs/sitemap)
