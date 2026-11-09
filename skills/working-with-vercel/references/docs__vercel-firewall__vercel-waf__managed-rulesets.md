---
title: WAF Managed Rulesets
product: vercel
url: /docs/vercel-firewall/vercel-waf/managed-rulesets
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets"
last_updated: 2026-09-10
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/rbac/access-roles
  - /docs/vercel-firewall/vercel-waf/usage-and-pricing
  - /docs/bot-management
  - /docs/cli/firewall
  - /docs/vercel-firewall/firewall-concepts
summary: Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall (WAF)
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "e9d1e2fb2ddec87708f786b7060fcf47906c7e62796d9f5bd9d8dca7e100fdec"
---

# WAF Managed Rulesets

WAF Managed Rulesets are collections of predefined WAF rules based on standards such as [Open Worldwide Application Security Project (OWASP) Top Ten](https://owasp.org/www-project-top-ten/) that you can enable and configure in your project's Firewall dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Control AI crawlers and assistants separately in Vercel Firewall](https://vercel.com/changelog/block-ai-crawlers-and-assistants-independently-with-managed-rules)
- [New firewall challenge metrics now available](https://vercel.com/changelog/new-firewall-challenge-metrics-now-available)
- [New one-click AI bot managed ruleset](https://vercel.com/changelog/new-one-click-ai-bot-managed-ruleset)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Security through design: Creating the improved Firewall experience](https://vercel.com/blog/security-through-design-creating-the-improved-firewall-experience)
- [How to use Vercel’s Bot Management features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)
- [CDN security](https://vercel.com/docs/cdn-security) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Managing microfrontends security](https://vercel.com/docs/microfrontends/managing-microfrontends/security) — Learn how to manage your Deployment Protection and Firewall for your microfrontend on Vercel.

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

> OWASP core ruleset is available on Enterprise plans . [Review pricing information here](/docs/vercel-firewall/vercel-waf/usage-and-pricing#managed-ruleset-pricing).

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

> Bot Protection Managed Ruleset is available on all plans

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

> AI Bots Managed Ruleset is available on all plans

The ruleset is **inactive by default**. In the dashboard this is labeled **Allow**. Matching traffic is not evaluated and reaches your application.

The AI Bots Managed Ruleset allows you to block AI Crawlers or AI Assistants categories independently.

- **AI Crawlers**: Bots that crawl and collect content for training.
- **AI Assistants**: Bots that retrieve pages in response to user actions or use for search queries.

See https://bots.fyi for the full catalog of bots that are classified into each category.

To enable and configure AI bots:

#### Dashboard

1. From your project's dashboard, open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Open+Firewall) in the sidebar.
2. Open **Rules** in the sidebar.
3. From the **Bot Management** section, click on the Configure icon.
4. Independently configure actions for each AI Crawlers and AI Assistants categories:
   - **Log**: This action records AI bot traffic without blocking it. This is useful for monitoring before deciding whether to block.
   - **Deny**: This action blocks all traffic identified as coming from AI bots for that category.
5. You can then apply as follows:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment

#### CLI

Run [`vercel firewall rules`](/docs/cli/firewall#custom-rules) to set an action for each category, then publish the changes:

```bash filename="terminal"
vercel firewall rules update ai-bots --category ai-crawlers --action deny --yes
vercel firewall rules update ai-bots --category ai-assistants --action allow --yes
vercel firewall publish
```

This example blocks AI Crawlers and allows AI Assistants. Each category accepts `allow`, `log`, or `deny`. [`vercel firewall publish`](/docs/cli/firewall#publish) shows the staged changes and asks you to confirm before they go live.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
