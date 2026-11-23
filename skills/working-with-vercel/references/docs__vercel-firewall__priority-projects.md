---
title: Priority Projects
product: vercel
url: /docs/vercel-firewall/priority-projects
canonical_url: "https://vercel.com/docs/vercel-firewall/priority-projects"
last_updated: 2026-09-10
type: reference
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall
  - /docs/rbac/access-roles
  - /docs/cli/project
  - /docs/plans/pro-plan
  - /docs/bot-management
summary: Learn how Priority projects add bot intelligence, security observability, anomaly alerts, higher Firewall limits, and Page Integrity for Pro and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/priority-projects.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "1748d9681ebb790eef5ca789e315a2a8943569c8299282a2801f1d594500e143"
---

# Priority Projects

> Priority projects are available in Beta on Enterprise and Pro plans

**Priority projects** add advanced security to individual projects on Pro and Enterprise plans, on top of the [Vercel Firewall](/docs/vercel-firewall) protections that every project gets:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Priority Projects now in public beta](https://vercel.com/changelog/priority-projects-now-in-public-beta)
- [Vercel WAF](https://vercel.com/docs/vercel-firewall/vercel-waf) — Learn how to secure your website with the Vercel Web Application Firewall \\(WAF\\)
- [Read Firewall Actions by Project](https://vercel.com/docs/rest-api/security/read-firewall-actions-by-project) — GET /v1/security/firewall/events — Retrieve firewall actions for a project Rule names are resolved against the project's
- [vercel page-integrity](https://vercel.com/docs/cli/page-integrity) — Turn Page Integrity monitoring on and off, check its status, and review the scripts, headers, and connections your pages
- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby) — Learn about the Hobby plan and how it compares to the Pro plan.
- [Read Firewall Actions Summary by Project](https://vercel.com/docs/rest-api/security/read-firewall-actions-summary-by-project) — GET /v1/security/firewall/events/summary — Aggregate counts over the firewall actions matched by the same filters as \\`G

Full cross-link map for this page: [/docs/vercel-firewall/priority-projects.graph.md](/docs/vercel-firewall/priority-projects.graph.md)
<!-- /docsgraph:related -->

- [Advanced bot management](#advanced-bot-management)
- [Enhanced investigation and alerting](#enhanced-investigation-and-alerting)
- [Expanded firewall controls](#expanded-firewall-controls)
- [Page Integrity](#page-integrity)

You upgrade a project to Priority from the project's **Firewall** tab, its **Settings**, or your team's billing settings. To see what it unlocks, review [what Priority projects add](#features) or the [feature comparison](#feature-comparison).

## Getting started

[Team owners](/docs/rbac/access-roles#owner-role), members with the [Security role](/docs/rbac/access-roles#security-role), and members assigned the [Project Administrator](/docs/rbac/access-roles#project-administrators) role on the project can upgrade or downgrade a project. Upgrade a project on an existing Pro or Enterprise team from the dashboard or the Vercel CLI.

#### Dashboard

1. Go to your project's [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) tab.
2. Open the firewall menu and select **Upgrade to Priority**.
3. Review the charges shown in the dialog, and then confirm the upgrade.

You can also upgrade a project from **Settings > General > Project Tier** in the project, or from **Settings > Billing > Priority projects** for your team.

#### CLI

Run [`vercel project priority enable`](/docs/cli/project#priority). If you omit the name, the CLI upgrades the linked project:

```bash filename="terminal"
vercel project priority enable [name]
```

The upgrade adds a charge to your account, so the CLI asks you to confirm it. Run the command in an interactive terminal.

### Plan availability

Access to Priority projects depends on your plan:

- **Pro** and **Enterprise**: Upgrade any project using the steps above. Priority projects aren't available during a Pro trial or on some older Pro plans.
- **Hobby**: Upgrade to [Pro](/docs/plans/pro-plan) to use Priority projects.

## Features

Priority projects add security features on top of the [Vercel Firewall](/docs/vercel-firewall) features available to all teams.

### Advanced bot management

On all plans, you can see [verified bot](/docs/bot-management#verified-bots) traffic, such as Googlebot or Bingbot. Priority projects enrich requests from unknown bots:

- **Visibility into unverified bots**: See the bot name and category for bots that claim an identity but can't prove it, such as a client claiming to be Googlebot from a non-Google IP address.
- **Richer bot categories**: Classify unverified traffic into categories like `automated_browser`, `browser_impersonation`, `http_client`, and `scanner`.
- **Bot signals in firewall rules**: Match requests by `bot_name`, `bot_category`, `bot_status`, and `bot_protection` in the [WAF rule builder](/docs/vercel-firewall/vercel-waf/custom-rules).
- **Bot signals in middleware and functions**: Read the bot category, verification status, and verified or claimed bot name from [request headers](/docs/bot-management#bot-signals-in-middleware-and-functions) in your application code.

For the full list of categories, dashboard details, and rule conditions, see [Bot Management](/docs/bot-management).

### Enhanced investigation and alerting

#### Deeper security observability

Priority projects add deeper visibility into your firewall traffic:

- **Query builder fields**: Filter firewall events by the `botCategory` of unverified traffic in the [Firewall](/docs/vercel-firewall/firewall-observability) query builder. `botName` and `botVerified` are available on all plans for verified bots.
- **Log drains for security events**: Request logs in your [Log Drains](/docs/drains/using-drains) payloads include `botName`, `botCategory`, and `botStatus`, and the client's ASN, country, and region.
- **Firewall context in Logs**: On all plans, each request in [Logs](/docs/logs) shows the Firewall action. Priority projects add the rule that matched, the bot name, category, and verification status, and the client's ASN and country.

#### Anomaly alerts

[DDoS alerts](/docs/vercel-firewall/ddos-mitigation) are available to users on all plans. Priority projects can also send anomaly alerts when Firewall system rules, Firewall custom rules, bot traffic, or BotID checks spike.

To create a Firewall anomaly alert, open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team and add an alert with a Firewall trigger. For the full steps, see [Configure alerts](/docs/alerts/configure-alerts). Alerts also appear in the **Alerts** section of the project's **Firewall** tab.

> **💡 Note:** An alert that covers all projects only fires for Priority projects.

### Expanded firewall controls

#### OWASP managed ruleset

The [OWASP core ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-owasp-core-ruleset) protects against the OWASP Top 10 web application attacks. On Pro, you can turn it on for Priority projects. On Enterprise, it's available for every project. OWASP inspection is billed per inspected request and per GB of inspected payload. For rates, see [managed ruleset pricing](/docs/vercel-firewall/vercel-waf/usage-and-pricing#managed-ruleset-pricing).

#### Higher firewall limits

Priority projects raise the per-project limits for custom rules, IP blocks, and IP bypass rules. For the limits on each plan, see [Firewall limits](/docs/vercel-firewall/vercel-waf/usage-and-pricing#firewall-limits).

#### Rate limiting counting keys

On Pro, [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) rules in Priority projects can count requests by User Agent or by any request header, as well as by IP and JA4 Digest. On Enterprise, these keys are available for every project. The Token bucket counting algorithm requires the Enterprise plan.

#### Response conditions for rate limiting

[Rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting#response-conditions) rules in Priority projects can count a request only when its response matches a condition. You can match on the response status code or on a response header, in addition to the rule's request conditions. For example, a rule can count only the requests that return a 401 and rate limit a client that gets too many of them.

#### Traffic sources

Priority projects can identify requests from Tor, VPNs, open proxies, residential proxies, and networks on IP abuse block lists:

- **Traffic Sources Managed Ruleset**: Log, challenge, or deny requests from each traffic source with the [Traffic Sources Managed Ruleset](/docs/vercel-firewall/vercel-waf/managed-rulesets#configure-traffic-sources-managed-ruleset).
- **Traffic sources in firewall rules**: Match requests with the `traffic_source` condition in the [WAF rule builder](/docs/vercel-firewall/vercel-waf/custom-rules#traffic-source-conditions-with-priority-projects).
- **Traffic sources in middleware and functions**: Read the [`x-vercel-waf-source`](/docs/headers/request-headers#x-vercel-waf-source) header in your application code.

If you downgrade the project, Vercel turns off the Traffic Sources Managed Ruleset, rules that use the `traffic_source` condition become inactive, and Vercel stops sending the `x-vercel-waf-source` header.

### Page Integrity

[Page Integrity](/docs/vercel-firewall/page-integrity) inventories, monitors, and blocks the scripts that run on your pages. It uses browser-native CSP, so it adds no JavaScript to the page, and is designed to help you meet PCI DSS 4.0 requirements 6.4.3 (script management) and 11.6.1 (tamper detection). Page Integrity requires that a project be Priority before you can turn it on.

## Feature comparison

The following table compares the Vercel Firewall on all plans with the Firewall on a project upgraded to Priority:

| Feature                   | Firewall                                                       | Firewall with Priority                                                                                    |
| ------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Verified bot visibility   | Bot name and category for verified bots                        | Bot name and category for verified bots                                                                   |
| Unverified bot visibility | No access                                                      | Bot name and category revealed                                                                            |
| Bot categories            | Verified bots only                                             | Unverified bot categories such as `automated_browser`, `browser_impersonation`, `http_client`, `scanner` |
| Bot Management dashboard  | Verified bots only                                             | Full access under **Firewall > Bot Management**                                                           |
| Bot signals in rules      | No access                                                      | `bot_name`, `bot_category`, `bot_status`, `bot_protection` conditions                                     |
| Bot signals in code       | No access                                                      | `x-vercel-bot-*` headers in middleware and functions                                                      |
| Query builder fields      | Path, method, IP, country, action, rule name, status code, JA4, and `botName` and `botVerified` for verified bots | Adds `botCategory` for unverified traffic |
| Firewall context in Logs  | Firewall action                                                | Adds the matched rule, bot details, and client ASN and country                                            |
| Anomaly alerts            | DDoS alerts only                                               | Adds Firewall system rule, custom rule, bot traffic, and BotID anomaly alerts                             |
| Firewall limits           | Plan limits                                                    | [Higher limits](#higher-firewall-limits)                                                                  |
| Page Integrity            | No access                                                      | Available                                                                                                 |
| OWASP managed ruleset     | Enterprise only                                                | Pro and Enterprise, billed per inspected request and GB                                                   |
| Rate limiting keys        | IP and JA4 Digest; User Agent and header keys on Enterprise    | Adds User Agent and header keys on Pro                                                                    |
| Response conditions       | No access                                                      | Count only requests whose response matches a status code or header condition                                         |

## Downgrade a project

Downgrade a project from the dashboard or the Vercel CLI.

#### Dashboard

Open the firewall menu on the project's **Firewall** tab and select **Downgrade project**.

#### CLI

Run [`vercel project priority disable`](/docs/cli/project#priority). If you omit the name, the CLI downgrades the linked project:

```bash filename="terminal"
vercel project priority disable [name]
```

The CLI asks you to confirm the downgrade, so run the command in an interactive terminal.

When you downgrade a project:

- The Bot Management dashboard shows verified bots only, and unverified bot data is no longer revealed.
- Bot conditions and response conditions in Firewall rules are no longer available. Existing rules that use them stop running, and you can't edit them until you upgrade the project again.
- Bot headers are no longer sent to your middleware and functions.
- Bot and client fields are removed from Logs, Log Drains, and the Observability query builder.
- Page Integrity turns off for the project, and its alerts stop.
- Firewall and BotID anomaly alerts stop for the project.
- Firewall limits return to your plan's standard limits. Rules you already have stay active, but you can't add new rules until you're under the standard limit.
- On Pro, the OWASP core ruleset turns off.
- On Pro, you can't add User Agent or header counting keys to rate limiting rules. Rules that already use them keep working.

Upgrading the project again reactivates these features and rules, except the OWASP core ruleset and Page Integrity, which you turn on again yourself.

Transferring a project to another team also removes Priority. Upgrade the project again on the new team.

## Pricing

Each Priority project costs $200 per month on Pro and Enterprise plans. OWASP core ruleset inspection and Page Integrity views are billed separately on usage. For proration, usage rates, and when charges stop, see [Priority projects pricing](/docs/vercel-firewall/vercel-waf/usage-and-pricing#priority-projects-pricing).

## Related

**Bot Management**: Observe and control verified and unverified bot traffic. [Learn more →](/docs/bot-management)

**Firewall Observability**: Monitor firewall traffic and investigate security events. [Learn more →](/docs/vercel-firewall/firewall-observability)

**Page Integrity**: Inventory, monitor, and block the scripts that run on your pages. [Learn more →](/docs/vercel-firewall/page-integrity)

**WAF Managed Rulesets**: Enable the OWASP core ruleset and bot rulesets. [Learn more →](/docs/vercel-firewall/vercel-waf/managed-rulesets)

**Custom Rules**: Match bot signals and build fine-grained WAF rules. [Learn more →](/docs/vercel-firewall/vercel-waf/custom-rules)

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
