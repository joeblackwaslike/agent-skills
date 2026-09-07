---
title: Investigation
product: vercel
url: /docs/agent/investigation
canonical_url: "https://vercel.com/docs/agent/investigation"
last_updated: 2026-08-19
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/observability/observability-plus
  - /docs/agent/pricing
summary: Let AI investigate your error alerts to help you debug faster
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/investigation.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "87e57ed6d0cb541d5197d9f40666acceb444832e505d8bfbc2a4ad8ed09b13fe"
---

# Investigation

> **🔒 Permissions Required**: Vercel Agent Investigation

When you get an anomaly alert, Vercel Agent can investigate your logs and metrics to help you find the root cause. Vercel Agent displays anomaly highlights in the Vercel dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Anomaly alerts are now generally available](https://vercel.com/changelog/anomaly-alerts-ga?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related)
- [Vercel Agent investigations now available in Slack](https://vercel.com/changelog/vercel-agent-investigations-now-available-in-slack?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related)
- [Vercel Agent Investigations now in Public Beta](https://vercel.com/changelog/vercel-agent-investigations-now-in-public-beta?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related)
- [Vercel Agent investigations now included in Observability Plus](https://vercel.com/changelog/vercel-agent-investigations-now-included-in-observability-plus?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related)
- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Installation](https://vercel.com/docs/agent/installation?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — Let AI automatically install Web Analytics and Speed Insights in your app
- [Observability](https://vercel.com/docs/observability?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Managing Code Reviews](https://vercel.com/docs/agent/pr-review/usage?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=related) — Customize which repositories get reviewed and track your review metrics and spending.

Full cross-link map for this page: [/docs/agent/investigation.graph.md](/docs/agent/investigation.graph.md?from=related&source_path=%2Fdocs%2Fagent%2Finvestigation&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Vercel Agent starts investigations automatically when an alert fires. It checks patterns in your data, identifies what changed, and shows what might be causing the issue.

## Getting started with Vercel Agent Investigation

Before you use Vercel Agent Investigation, make sure your team has:

1. An [Observability Plus](/docs/observability/observability-plus) subscription. It includes 10 alert investigations per billing cycle by default
2. Vercel Agent billing enabled for investigations beyond the included usage

To run investigations **automatically for every alert**, [enable Vercel Agent Investigations](#enable-vercel-agent-investigations) for your team.

You can [run an investigation manually](#run-an-investigation-manually) if you want to investigate an alert that has already fired.

> **💡 Note:** Code Review and Vercel Agent Investigations are enabled separately. [Enable Vercel Agent Investigations separately](#enable-vercel-agent-investigations).

### Enable Vercel Agent Investigations

To run investigations automatically for every alert, enable Vercel Agent Investigations in your team's settings:

1. Go to your team's [Settings](https://vercel.com/d?to=%2Fteams%2F%5Bteam%5D%2Fsettings\&title=Go+to+Settings\&personalTo=%2Faccount) page.
2. In the **General** section, find **Vercel Agent** and under **Investigations**, switch the toggle to **Enabled**.
3. Select **Save** to confirm your changes.

After you enable Vercel Agent Investigations, Vercel Agent runs an investigation automatically when an alert fires. Make sure your team has Vercel Agent billing enabled for investigations beyond the included usage.

## How to use Vercel Agent Investigation

When you [enable Vercel Agent Investigations](#enable-vercel-agent-investigations), Vercel Agent runs an investigation automatically when an alert fires. It queries your logs and metrics around the time of the alert, looks for patterns that might explain the issue, checks for related errors or anomalies, and summarizes what it found.

To view an investigation:

1. Go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Falerts\&title=Open+Alerts) and navigate to **Observability**, then **Alerts**.
2. Find the alert you want to review and click on it.
3. Review the investigation results alongside your alert details. If the investigation is still running, you can see the analysis stream in real time.

If you want to run the investigation again with fresh data, click the **Rerun** button.

### Run an investigation manually

If you do not have Vercel Agent Investigations enabled and running automatically, you can run an investigation manually from the alert details page.

1. Go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Falerts\&title=Open+Alerts) and navigate to **Observability**, then **Alerts**.
2. Find the alert you want to review and click on it.
3. Click the **Investigate** (or **Rerun**) button to run an investigation manually.

## Pricing

Observability Plus includes 10 investigations per billing cycle. Additional investigations use provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. The cost varies based on how much log and metric data Vercel Agent analyzes.

See [Vercel Agent pricing](/docs/agent/pricing) for complete rates and cost-tracking information.

## Disable Vercel Agent Investigation

To disable Vercel Agent Investigation:

1. Go to your team's [Settings](https://vercel.com/d?to=%2Fteams%2F%5Bteam%5D%2Fsettings\&title=Go+to+Settings\&personalTo=%2Faccount) page.
2. In the **General** section, find **Vercel Agent** and under **Investigations**, switch the toggle to **Disabled**.
3. Select **Save** to confirm your changes.

Once disabled, Vercel Agent Investigation won't run automatically on any new alerts. You can re-enable Vercel Agent Investigation at any time from the same menu or [run an investigation manually](#run-an-investigation-manually) from the alert details page.


---

[View full sitemap](/docs/sitemap)
