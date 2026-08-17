---
title: DDoS Mitigation
product: vercel
url: /docs/vercel-firewall/ddos-mitigation
canonical_url: "https://vercel.com/docs/vercel-firewall/ddos-mitigation"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/attack-mode
  - /docs/vercel-firewall/firewall-concepts
  - /docs/vercel-firewall/vercel-waf/ip-blocking
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/spend-management
summary: Learn how the Vercel Firewall mitigates against DoS and DDoS attacks
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/ddos-mitigation.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f244570e006abb634ec001933e6acf59c542dfbce810e9f72dbafd86c9edfa2c"
---

# DDoS Mitigation

> **🔒 Permissions Required**: DDoS Mitigation


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI app from bots](https://vercel.com/kb/guide/how-to-protect-your-ai-app-from-bots?from=related) — Learn how to protect your AI app from bots, scrapers, and abuse using Firewall, BotID, and more.
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare?from=related) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Overview](https://vercel.com/docs/security?from=related) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [Web Application Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf?from=related) — Learn how to secure your website with the Vercel Web Application Firewall \(WAF\)
- [vercel firewall](https://vercel.com/docs/cli/firewall?from=related) — Learn how to manage your project's custom firewall rules, IP blocks, system bypass rules, attack challenge mode, and sys
- [Security](https://vercel.com/docs/cdn-security?from=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers

Full cross-link map for this page: [/docs/vercel-firewall/ddos-mitigation.graph.md](/docs/vercel-firewall/ddos-mitigation.graph.md)
<!-- /docsgraph:related -->

Vercel provides automatic DDoS mitigation for all deployments, regardless of your plan. We block incoming traffic if we identify abnormal or suspicious levels of incoming requests.

> **💡 Note:** Vercel does not charge customers for traffic that gets blocked with DDoS
> mitigation.

It works by:

- **Monitoring traffic:** Vercel Firewall continuously analyzes incoming traffic to detect signs of DDoS attacks. This helps to identify and mitigate threats in real-time
- **Blocking traffic:** Vercel Firewall filters out malicious traffic while allowing legitimate requests to pass through
- **Scaling resources:** During a DDoS attack, Vercel Firewall dynamically scales resources to absorb the increased traffic, preventing your applications or sites from being overwhelmed

If you need further control over incoming traffic, you can temporarily enable [Attack Mode](/docs/vercel-firewall/attack-mode) to challenge all traffic to your site, ensuring only legitimate users can access it.

Learn more about [DoS, DDoS and the Open System Interconnection model](/docs/vercel-firewall/firewall-concepts#understanding-ddos).

## Responding to DDoS attacks

Vercel mitigates against L3, L4, and L7 DDoS attacks regardless of the plan you are on. The Vercel Firewall uses hundreds of signals and detection factors to fingerprint request patterns, determining if they appear to be an attack, and challenging or blocking requests if they appear illegitimate.

However, there are other steps you can take to protect your site during DDoS attacks:

- Enable [Attack Mode](/docs/vercel-firewall/attack-mode) to challenge all visitors to your site. This is a temporary measure and provides another layer of security to ensure all traffic to your site is legitimate
- You can set up [IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking) to block specific IP addresses from accessing your projects. Enterprise teams can also receive dedicated DDoS support
- You can add [Custom Rules](/docs/vercel-firewall/vercel-waf/custom-rules) to deny or challenge specific traffic to your site based on the conditions of the rules
- You can also use Middleware to [block requests](https://github.com/vercel/examples/tree/main/edge-middleware/geolocation-country-block) based on specific criteria or to implement [rate limiting](/kb/guide/add-rate-limiting-vercel).

Pro teams can [set up Spend Management](/docs/spend-management#managing-your-spend-amount) to get notified or to automatically take action, such as [using a webhook](/docs/spend-management#configuring-a-webhook) or pausing your projects when your usage hits a set spend amount.

## Bypass System-level Mitigations

> **🔒 Permissions Required**: Bypass System-level Mitigations

While Vercel's system-level mitigations (such as [DDoS protection](/docs/vercel-firewall/ddos-mitigation)) safeguards your websites and applications, it can happen that they block traffic from trusted sources like proxies or shared networks in situations where traffic from these proxies or shared networks was identified as malicious. You can temporarily pause all automatic mitigations for a specific project. This can be useful on business-critical events such as Black Friday.

To temporarily pause all automatic mitigations for a specific project:

1. Click the menu button with the ellipsis icon  at the top right of the **Firewall** tab for your project.
2. Select **Pause System Mitigations**.
3. Review the warning in the **Pause System Mitigations** dialog and confirm that you would like to pause all automatic mitigations for that project for the next 24 hours.

To resume the automatic mitigations **before** the 24 hour period ends:

1. Click the menu button with the ellipsis icon  at the top right of the **Firewall** tab for your project.
2. Select **Resume System Mitigations**.
3. Select **Resume** from the **Resume System Mitigations** dialog.

> **💡 Note:** You are responsible for all usage fees incurred when using this feature,
> including illegitimate traffic that may otherwise have been blocked.

### System Bypass Rules

In situations where you need a more granular and permanent approach, you can use [System Bypass Rules](/docs/vercel-firewall/vercel-waf/system-bypass-rules) to ensure that essential traffic is never blocked by DDoS protection.

This feature is available for Pro and Enterprise customers. Learn how to [set up a System Bypass rule](/docs/vercel-firewall/vercel-waf/system-bypass-rules#get-started) for your project and [limits](/docs/vercel-firewall/vercel-waf/system-bypass-rules#limits) that apply based on your plan.

## Dedicated DDoS support for Enterprise teams

For larger, distributed attacks on Enterprise Teams, we collaborate with you to keep your site(s) online during an attack. Automated prevention and direct communication from your Vercel account representative will ensure your site remains resilient.

## DDoS and billing

[Vercel automatically mitigates against L3, L4, and L7 DDoS attacks](/docs/vercel-firewall/ddos-mitigation) at the platform level for all plans. Vercel does not charge customers for traffic that gets blocked by the Firewall.

Usage will be incurred for requests that are successfully served prior to us automatically mitigating the event. Usage will also be incurred for requests that are not recognized as a DDoS event, which may include bot and crawler traffic.

For an additional layer of security, we recommend that you enable [Attack Mode](/docs/vercel-firewall/attack-mode) when you are under attack, which is available for free on all plans. While some malicious traffic is automatically challenged, enabling Attack Mode will challenge all traffic, including legitimate traffic to ensure that only real users can access your site.

You can monitor usage in the [Vercel Dashboard](/dashboard) under the **Usage** section in the sidebar, although you will [receive notifications](/docs/notifications#on-demand-usage-notifications) when nearing your usage limits.


---

[View full sitemap](/docs/sitemap)
