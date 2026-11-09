---
title: Attack Mode
product: vercel
url: /docs/vercel-firewall/attack-mode
canonical_url: "https://vercel.com/docs/vercel-firewall/attack-mode"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/firewall-concepts
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/plans
  - /docs/bot-management
  - /docs/vercel-firewall/vercel-waf/custom-rules
summary: "Learn how to use Attack Mode to help control who has access to your site when it's under attack."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/attack-mode.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "3869b696f2070d4e8ca6e1cf73623a31b30c01b0c1a2ec55f88cc75b9c422c4a"
---

# Attack Mode

> Attack Mode is available on all plans
>
> Those with the member role can access this feature

Attack Mode is a security feature that protects your site during DDoS attacks. When enabled, visitors must complete a [security challenge](/docs/vercel-firewall/firewall-concepts#challenge) before accessing your site, while known bots (like search engines and webhook providers) are automatically allowed through.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli)
- [Prevent malicious traffic with Attack Challenge Mode for the Vercel Firewall](https://vercel.com/changelog/prevent-malicious-traffic-with-attack-challenge-mode-for-vercel-firewall)
- [Preventing infrastructure abuse with Vercel Firewall](https://vercel.com/blog/preventing-infrastructure-abuse-with-vercel-firewall)
- [Attack Challenge Mode now allows verified bots and Vercel cron jobs](https://vercel.com/changelog/attack-challenge-mode-now-allows-verified-bots-and-vercel-cron-jobs)
- [Mitigating Denial of Wallet risks with Vercel](https://vercel.com/blog/mitigating-denial-of-wallet-risks-with-vercel)
- [Vercel security roundup: improved bot defenses, DoS mitigations, and insights](https://vercel.com/blog/vercel-security-roundup-improved-bot-defenses-dos-mitigations-and-insights)
- [How to use Vercel’s Bot Management features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Vercel WAF upgrade brings persistent actions, rate limiting, and API control](https://vercel.com/blog/vercel-waf-upgrade-brings-persistent-actions-rate-limiting-and-api-control)
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Update Attack Challenge mode](https://vercel.com/docs/rest-api/security/update-attack-challenge-mode) — POST /v1/security/attack-mode — Update the setting for determining if the project has Attack Challenge mode enabled.
- [Firewall and Security](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall) — Vercel MCP tools for firewall and security.
- [Managing microfrontends security](https://vercel.com/docs/microfrontends/managing-microfrontends/security) — Learn how to manage your Deployment Protection and Firewall for your microfrontend on Vercel.

Full cross-link map for this page: [/docs/vercel-firewall/attack-mode.graph.md](/docs/vercel-firewall/attack-mode.graph.md)
<!-- /docsgraph:related -->

The Vercel Firewall automatically [mitigates against DDoS attacks](/docs/vercel-firewall/ddos-mitigation), but Attack Mode provides an extra layer of protection for highly targeted attacks.

Attack Mode is available for [free](#pricing) on all [plans](/docs/plans) and requests blocked by Attack Mode do not count towards your usage limits.

## Known bots support

Vercel maintains and continuously updates a comprehensive directory of known legitimate bots from across the internet. Attack Mode automatically recognizes and allows these bots to pass through without being challenged.

Review [Verified bots](/docs/bot-management#verified-bots) for examples of bot categories and services that are automatically allowed. [Internal Requests](#internal-requests) are also allowed through.

Vercel's bot directory is regularly updated to include new legitimate services as they emerge, ensuring your SEO, analytics, integrations, and essential services continue to function even with Attack Mode enabled.

> **💡 Note:** To block specific known bots instead of allowing them through, you can create
> a [Custom Rule](/docs/vercel-firewall/vercel-waf/custom-rules) that matches their
> User Agent.

## Internal requests

When Attack Mode is enabled, requests from your own [Functions](/docs/functions) and [Cron Jobs](/docs/cron-jobs) are automatically allowed through without being challenged. This means your application's internal operations will continue to work normally.

For example, if you have multiple projects in your Vercel account:

- Your projects can communicate with each other without being challenged
- Only requests from outside your account will be challenged
- Each Vercel account has its own secure boundary

Other Vercel accounts cannot bypass Attack Mode on your projects. The security is strictly enforced per account, ensuring that only your own projects can communicate without challenges.

## Enabling Attack Mode

While Vercel's Firewall [automatically monitors for and mitigates attacks](/docs/vercel-firewall/ddos-mitigation#responding-to-ddos-attacks), you can enable Attack Mode during targeted attacks for additional security.

To enable:

1. Select your project from the [Dashboard](/dashboard).
2. Open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar.
3. Select the **⋯** menu on the top right of the Firewall overview page.
4. Select **Enable Attack Mode**.
5. In the dialog, select **Enable for 1 Hour**. To keep Attack Mode on for longer, open the menu next to this button and select **Enable for 6 Hours** or **Enable for 24 Hours**.

All traffic initiated by web browsers, including API traffic, is supported. For example, a Next.js frontend calling a Next.js API in the same project will work properly.

> **💡 Note:** Standalone APIs, other backend frameworks, and non-recognized automated
> services may not be able to pass challenges and could be blocked. If you need
> more control over what traffic is challenged, consider using [Custom Rules
> with the Vercel WAF](/docs/vercel-firewall/vercel-waf/custom-rules).

## How long to keep it enabled

When you enable Attack Mode from the dashboard or the CLI, you choose how long it stays on: 1 hour, 6 hours, or 24 hours. Attack Mode turns off automatically when this period ends. If the attack continues, you can enable Attack Mode again. Attack Mode does not affect search engine indexing or webhook functionality. Because Vercel's Firewall already provides automatic DDoS protection, use Attack Mode primarily when you face highly targeted attacks.

## Disabling Attack Mode

When you no longer need the additional protection:

1. Select your project from the [Dashboard](/dashboard)
2. Open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar.
3. Select the **⋯** menu on the top right of the Firewall overview page.
4. Select **Disable Attack Mode**, then confirm in the dialog.

## Challenging with custom rules

For more granular control, define a [Custom Rule with the Vercel WAF](/docs/vercel-firewall/vercel-waf/custom-rules) to challenge specific web traffic.

## Search indexing

Search engine crawlers like Googlebot are automatically allowed through Attack Mode without being challenged. This means enabling Attack Mode will not negatively impact your site's SEO or search engine indexing, even when used for extended periods.

## Pricing

Attack Mode is available for free on all plans.

All mitigations by Attack Mode are free and unlimited, and there are zero costs associated with traffic blocked by Attack Mode.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
