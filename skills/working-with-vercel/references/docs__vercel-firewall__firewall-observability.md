---
title: Firewall Observability
product: vercel
url: /docs/vercel-firewall/firewall-observability
canonical_url: "https://vercel.com/docs/vercel-firewall/firewall-observability"
last_updated: 2026-07-17
type: how-to
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall
  - /docs/vercel-firewall/firewall-concepts
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/webhooks
  - /docs/comments/integrations
summary: Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/firewall-observability.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "0e8ce6c5f0b4d60b9e2c898b9d0c6f2c8ca4832bccf6fe42339bcc5e1da18442"
---

# Firewall Observability

The project **Firewall** page of your Vercel dashboard provides a consolidated view of traffic and event analysis across Vercel's [platform-wide firewall](/docs/vercel-firewall#platform-wide-firewall) (including DDoS mitigations), Web Application Firewall, and Bot Management.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Web Application Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf?from=related) — Learn how to secure your website with the Vercel Web Application Firewall \(WAF\)
- [Overview](https://vercel.com/docs/security?from=related) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [Attack Mode](https://vercel.com/docs/vercel-firewall/attack-mode?from=related) — Learn how to use Attack Mode to help control who has access to your site when it's under attack.
- [WAF Managed Rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets?from=related) — Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall \(WAF\)
- [Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples?from=related) — Learn how to use Vercel WAF to protect your site in specific situations.

Full cross-link map for this page: [/docs/vercel-firewall/firewall-observability.graph.md](/docs/vercel-firewall/firewall-observability.graph.md)
<!-- /docsgraph:related -->

## Overview

The **Overview** page provides a summary of active rules with associated events and mitigations that apply to your project. This page displays a line graph showing total incoming web traffic over a specific period for your production deployment.

The default time period for the traffic view is the past hour. From a drop-down on the top left, you can adjust this time period to show the last 24 hours or a **live** 10-minute window.

![Image](`/docs-assets/static/docs/security/vercel-waf-overview-tab-light.png`)

The **Alerts** section displays recent firewall alerts such as detected attacks against your project. When large volume attacks are detected, active or recent alerts appear here.

The **Rules** section breaks down incoming traffic by the rule that applied. This gives you a quick view of which rules are protecting your project and how traffic is being handled.

The **Events** section provides insight into actions Vercel's platform-wide firewall has applied to your project. Selected events can be expanded to explore requests made by the affected client.

![Image](`/docs-assets/static/docs/security/vercel-waf-event-sheet-light.png`)

The **Denied IPs** section shows the most commonly blocked malicious sources.

Discrete events and alerts can be inspected from the Overview page to view request and time data from malicious sources.

## Traffic

The **Traffic** page lets you drill down into top traffic sources and signals. You can view all traffic or have the following ways to filter:

- By a specific rule with the drop down above the graph
- By an action using the action tab within the graph to see only the traffic that matched this filter

You can also review incoming requests grouped by the following dimensions:

- **Client IP Addresses**: View traffic grouped by source IP address
- **User Agents**: Inspect clients by user agent strings
- **Request Paths**: Monitor traffic patterns across different URL paths
- **ASNs (Autonomous System Numbers)**: Track traffic by source network provider
- **JA4 (TLS Fingerprints)**: Identify clients by their [JA4](/docs/vercel-firewall/firewall-concepts#ja4) TLS fingerprints
- **Country**: Geographic distribution of traffic by country

![Image](`/docs-assets/static/docs/security/vercel-waf-traffic-tab-light.png`)

## Firewall Alerts

> **🔒 Permissions Required**: Firewall Alerts

### How alerts work

To help protect your site effectively, you can configure alerts to be notified of potential security threats and firewall actions. To do so, you can either create a webhook and subscribe to the listener URL or subscribe to the event through the Vercel app.

### DDoS attack alerts

When Vercel's [DDoS Mitigation](/docs/vercel-firewall/ddos-mitigation) detects malicious traffic on your site that exceeds 100,000 requests over a 10-minute period, an alert is generated.

To receive notifications from these alerts, you can use one of the following methods:

- Create a [webhook](/docs/webhooks) and subscribe to the URL to receive notifications
  1. Follow the [configure a webhook](/docs/webhooks#configure-a-webhook) guide to create a webhook with the **Attack Detected Firewall Event** checked and the specific project(s) you would like to be notified about
  2. Subscribe to the created webhook URL
- Use the [Vercel app for Slack](https://vercel.com/marketplace/slack) to enable notifications for Attack Detected Firewall Events
  1. Add the Vercel app to your team by following the [Use the Vercel app for Slack](/docs/comments/integrations#use-the-vercel-app-for-slack) guide
  2. Subscribe your team to DDoS attack alerts using your [`team_id`](/docs/accounts#find-your-team-id)
     - Use the command `/vercel subscribe {team_id} firewall_attack`
  3. Review the [command reference](/docs/comments/integrations#vercel-app-for-slack-command-reference) for additional options.


---

[View full sitemap](/docs/sitemap)
