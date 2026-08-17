---
title: Attack Mode
product: vercel
url: /docs/vercel-firewall/attack-mode
canonical_url: "https://vercel.com/docs/vercel-firewall/attack-mode"
last_updated: 2026-05-08
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "cafd08403a53c0aec0080ea88f3db3f5af26fd703d62cf5c2049a288ab701821"
---

# Attack Mode

> **🔒 Permissions Required**: Attack Mode


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [How to protect your AI app from bots](https://vercel.com/kb/guide/how-to-protect-your-ai-app-from-bots?from=related) — Learn how to protect your AI app from bots, scrapers, and abuse using Firewall, BotID, and more.
- [How to block bots from OpenAI GPTBot](https://vercel.com/kb/guide/how-to-block-bots-openai-gptbot?from=related) — Learn how to use the Vercel WAF to block, rate limit, or challenge traffic from OpenAI GPTBot.
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Web Application Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf?from=related) — Learn how to secure your website with the Vercel Web Application Firewall \(WAF\)
- [vercel firewall](https://vercel.com/docs/cli/firewall?from=related) — Learn how to manage your project's custom firewall rules, IP blocks, system bypass rules, attack challenge mode, and sys
- [Overview](https://vercel.com/docs/security?from=related) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.

Full cross-link map for this page: [/docs/vercel-firewall/attack-mode.graph.md](/docs/vercel-firewall/attack-mode.graph.md)
<!-- /docsgraph:related -->

Attack Mode is a security feature that protects your site during DDoS attacks. When enabled, visitors must complete a [security challenge](/docs/vercel-firewall/firewall-concepts#challenge) before accessing your site, while known bots (like search engines and webhook providers) are automatically allowed through.

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

While Vercel's Firewall [automatically monitors for and mitigates attacks](/docs/vercel-firewall/ddos-mitigation#what-to-do-in-case-of-a-ddos-attack), you can enable Attack Mode during targeted attacks for additional security.

To enable:

1. Select your project from the [Dashboard](/dashboard).
2. Open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar.
3. Click **Bot Management**.
4. Under **Attack Mode**, select **Enable**.

All traffic initiated by web browsers, including API traffic, is supported. For example, a Next.js frontend calling a Next.js API in the same project will work properly.

> **💡 Note:** Standalone APIs, other backend frameworks, and non-recognized automated
> services may not be able to pass challenges and could be blocked. If you need
> more control over what traffic is challenged, consider using [Custom Rules
> with the Vercel WAF](/docs/vercel-firewall/vercel-waf/custom-rules).

## How long to keep it enabled

Attack Mode can be safely used for extended periods without affecting search engine indexing or webhook functionality. However, since Vercel's Firewall already provides automatic DDoS protection, we recommend using it primarily when facing highly targeted attacks rather than as a permanent setting.

## Disabling Attack Mode

When you no longer need the additional protection:

1. Select your project from the [Dashboard](/dashboard)
2. Open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar.
3. Click **Bot Management**.
4. Under **Attack Mode**, select **Disable**.

## Challenging with custom rules

For more granular control, define a [Custom Rule with the Vercel WAF](/docs/vercel-firewall/vercel-waf/custom-rules) to challenge specific web traffic.

## Search indexing

Search engine crawlers like Googlebot are automatically allowed through Attack Mode without being challenged. This means enabling Attack Mode will not negatively impact your site's SEO or search engine indexing, even when used for extended periods.

## Pricing

Attack Mode is available for free on all plans.

All mitigations by Attack Mode are free and unlimited, and there are zero costs associated with traffic blocked by Attack Mode.


---

[View full sitemap](/docs/sitemap)
