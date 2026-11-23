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
  - /docs/vercel-firewall/priority-projects
  - /docs/vercel-firewall/vercel-waf/usage-and-pricing
  - /docs/cli/firewall
  - /docs/bot-management
summary: Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall (WAF)
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "63dacb40de02c0670b2af5fd229dec84dd5a308fcb5e7333814cec91fe6ad904"
---

# WAF Managed Rulesets

WAF Managed Rulesets are collections of predefined WAF rules based on standards such as [Open Worldwide Application Security Project (OWASP) Top Ten](https://owasp.org/www-project-top-ten/) that you can enable and configure in your project's Firewall dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Control AI crawlers and assistants separately in Vercel Firewall](https://vercel.com/changelog/block-ai-crawlers-and-assistants-independently-with-managed-rules)
- [New firewall challenge metrics now available](https://vercel.com/changelog/new-firewall-challenge-metrics-now-available)
- [New one-click AI bot managed ruleset](https://vercel.com/changelog/new-one-click-ai-bot-managed-ruleset)
- [Priority Projects now in public beta](https://vercel.com/changelog/priority-projects-now-in-public-beta)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [How to effectively load test your application on Vercel](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Security through design: Creating the improved Firewall experience](https://vercel.com/blog/security-through-design-creating-the-improved-firewall-experience)
- [Returns activated WAF config](https://vercel.com/docs/rest-api/security/returns-activated-waf-config-2) — POST /v1/security/firewall/config/{configVersion}/activate — Promotes a draft WAF config to an active config
- [CDN security](https://vercel.com/docs/cdn-security) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/managed-rulesets.graph.md](/docs/vercel-firewall/vercel-waf/managed-rulesets.graph.md)
<!-- /docsgraph:related -->

The following ruleset(s) are currently available:

- [OWASP core ruleset](#configure-owasp-core-ruleset)
- [Bot Protection Managed Ruleset](#configure-bot-protection-managed-ruleset)
- [AI Bots Managed Ruleset](#configure-ai-bots-managed-ruleset)
- [Traffic Sources Managed Ruleset](#configure-traffic-sources-managed-ruleset)

## Access roles

- You need to be a [Developer](/docs/rbac/access-roles#developer-role) or viewer ([Viewer Pro](/docs/rbac/access-roles#pro-viewer-role) or [Viewer Enterprise](/docs/rbac/access-roles#enterprise-viewer-role)) in the team to view the Firewall overview page and list the rules
- You need to be a [Project administrator](/docs/rbac/access-roles#project-administrators), [Team member](/docs/rbac/access-roles#member-role), or [Security](/docs/rbac/access-roles#security-role) to configure, save and apply any rule and configuration

## Configure OWASP core ruleset

> OWASP core ruleset is available on Enterprise and Pro plans (on Pro, the project must be a [Priority project](/docs/vercel-firewall/priority-projects)). [Review pricing information here](/docs/vercel-firewall/vercel-waf/usage-and-pricing#managed-ruleset-pricing).

On Enterprise, the OWASP core ruleset is available on every project. On Pro, [upgrade the project to Priority](/docs/vercel-firewall/priority-projects#getting-started) to use it. OWASP inspection is billed per inspected request and per GB of inspected payload, at the same rates on both plans.

To enable and configure [OWASP Core Ruleset](https://owasp.org/www-project-top-ten/) for your project from the dashboard or the Vercel CLI.

#### Dashboard

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

#### CLI

Run [`vercel firewall managed-rulesets`](/docs/cli/firewall) to turn on the OWASP core ruleset and set an action for a rule group, then publish the changes:

```bash filename="terminal"
vercel firewall managed-rulesets enable owasp --yes
vercel firewall managed-rulesets update owasp --group sqli --action deny --yes
vercel firewall publish
```

This example turns on the OWASP core ruleset and denies SQL injection attempts. Run `vercel firewall managed-rulesets list` to see each rule group and its current action. [`vercel firewall publish`](/docs/cli/firewall#publish) shows the staged changes and asks you to confirm before they go live.

## Configure Bot Protection Managed Ruleset

> Bot Protection Managed Ruleset is available on all plans

The ruleset is **inactive by default**. In the dashboard this is labeled **Off**. Matching traffic is not evaluated and reaches your application.

To enable and configure [bot protection](/docs/bot-management#bot-protection-managed-ruleset) for your project from the dashboard or the Vercel CLI:

#### Dashboard

1. From your project's dashboard, open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Open+Firewall) in the sidebar.
2. Open **Rules** in the sidebar.
3. From the **Bot Management** section, select **Log** or **Challenge** on the **Bot Protection** rule to choose what action should be performed when an unwanted bot is identified.
   - When enabled in challenge mode, the Vercel WAF will serve a JavaScript challenge to traffic that is unlikely to be a browser.
4. You can then apply as follows:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment

#### CLI

Run [`vercel firewall managed-rulesets update`](/docs/cli/firewall#managed-rulesets-update) to set the Bot Protection action, then publish the changes:

```bash filename="terminal"
vercel firewall managed-rulesets update bot-protection --action challenge --yes
vercel firewall publish
```

The `--action` flag accepts `off`, `log`, or `challenge`. [`vercel firewall publish`](/docs/cli/firewall#publish) shows the staged changes and asks you to confirm before they go live.

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

Run [`vercel firewall managed-rulesets update`](/docs/cli/firewall#managed-rulesets-update) to set an action for each category, then publish the changes:

```bash filename="terminal"
vercel firewall managed-rulesets update ai-bots --group ai-crawlers --action deny --yes
vercel firewall managed-rulesets update ai-bots --group ai-assistants --action off --yes
vercel firewall publish
```

This example blocks AI Crawlers and allows AI Assistants. Each category accepts `off`, `log`, or `deny`, where `off` is **Allow** in the dashboard. [`vercel firewall publish`](/docs/cli/firewall#publish) shows the staged changes and asks you to confirm before they go live.

## Configure Traffic Sources Managed Ruleset

> Traffic Sources Managed Ruleset is available in Beta on Enterprise and Pro plans for [Priority projects](/docs/vercel-firewall/priority-projects).

The Traffic Sources Managed Ruleset allows you to enforce an action based on the originating source of a request, such as Tor or a commercial VPN. The ruleset is **inactive by default**, and each rule group starts with the **Log** action when you enable it.

The ruleset has the following rule groups:

| Rule group          | Matches requests from                                      |
| ------------------- | ---------------------------------------------------------- |
| Tor                 | A known Tor exit node.                                     |
| Proxies             | A known open or anonymizing proxy.                         |
| Residential Proxies | An IP address offered through a residential proxy network. |
| VPN                 | The egress IP address of a commercial VPN.                 |
| Abuse               | An IP address with a high-confidence history of abuse.     |

Each rule group can use the **Log**, **Challenge**, or **Deny** action. Any rule group can match legitimate traffic, so enable it with **Log** first and review the matched requests on the Firewall [**Traffic**](/docs/vercel-firewall/firewall-observability#traffic) page before you switch it to **Challenge** or **Deny**. To combine a traffic source with other conditions, such as a path or country, use the `traffic_source` condition in a [WAF Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules) instead.

To enable and configure the Traffic Sources Managed Ruleset for your project from the dashboard or the Vercel CLI:

#### Dashboard

1. From your project's dashboard, open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Open+Firewall) in the sidebar.
2. Open **Rules** in the sidebar.
3. From the **WAF Managed Rulesets** section, enable **Traffic Sources**. If the project isn't a Priority project, select **Upgrade to Priority** first.
4. Select the Configure icon on the **Traffic Sources** list item.
5. Enable the rule groups you want to act on, and select **Log**, **Challenge**, or **Deny** for each one.
6. You can then apply as follows:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment

#### CLI

Run [`vercel firewall managed-rulesets`](/docs/cli/firewall) to turn on the Traffic Sources Managed Ruleset and set an action for a rule group, then publish the changes:

```bash filename="terminal"
vercel firewall managed-rulesets enable traffic-sources --yes
vercel firewall managed-rulesets update traffic-sources --group traffic-source-vpn --action log --yes
vercel firewall publish
```

This example turns on the ruleset and logs requests from VPNs. The `--group` flag accepts `traffic-source-tor`, `traffic-source-proxies`, `traffic-source-res-proxies`, `traffic-source-vpn`, or `traffic-source-abuse`, and the `--action` flag accepts `log`, `challenge`, `deny`, or `off`. [`vercel firewall publish`](/docs/cli/firewall#publish) shows the staged changes and asks you to confirm before they go live.

If you downgrade the project off Priority, Vercel turns off the Traffic Sources Managed Ruleset for that project.

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
