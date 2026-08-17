---
title: Investigation
product: vercel
url: /docs/agent/investigation
canonical_url: "https://vercel.com/docs/agent/investigation"
last_updated: 2026-06-30
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/observability/observability-plus
  - /docs/agent/pricing
summary: Let AI investigate your error alerts to help you debug faster
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/investigation.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "e801a022d1e7174a07262b2923467050da43905777e5590d3360667e94b43fb7"
---

# Investigation

> **🔒 Permissions Required**: Agent Investigation


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts?from=related) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Installation](https://vercel.com/docs/agent/installation?from=related) — Let AI automatically install Web Analytics and Speed Insights in your app
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Code Review](https://vercel.com/docs/agent/pr-review?from=related) — Get automatic AI-powered code reviews on your pull requests
- [Managing Reviews](https://vercel.com/docs/agent/pr-review/usage?from=related) — Customize which repositories get reviewed and track your review metrics and spending.
- [Configure Alerts](https://vercel.com/docs/alerts/configure-alerts?from=related) — Configure alert rules and notification destinations for Vercel Observability alerts.

Full cross-link map for this page: [/docs/agent/investigation.graph.md](/docs/agent/investigation.graph.md)
<!-- /docsgraph:related -->

When you get an anomaly alert, Vercel Agent can investigate your logs and metrics to help you find the root cause. Vercel Agent displays anomaly highlights in the Vercel dashboard.

Vercel Agent starts investigations automatically when an alert fires. It checks patterns in your data, identifies what changed, and shows what might be causing the issue.

## Getting started with Agent Investigation

Before you use Agent Investigation, make sure your team has:

1. An [Observability Plus](/docs/observability/observability-plus) subscription. It includes 10 alert investigations per billing cycle by default
2. [Sufficient credits](/docs/agent/pricing) to cover investigations beyond the included investigations

To run investigations **automatically for every alert**, [enable Vercel Agent Investigations](#enable-agent-investigations) for your team.

You can [run an investigation manually](#run-an-investigation-manually) if you want to investigate an alert that has already fired.

> **💡 Note:** Agent Investigation does not start automatically if you previously enabled Vercel Agent only for code review. [Enable Agent Investigations](#enable-agent-investigations) separately.

### Enable Agent Investigations

To run investigations automatically for every alert, enable Vercel Agent Investigations in your team's settings:

1. Go to your team's [Settings](https://vercel.com/d?to=%2Fteams%2F%5Bteam%5D%2Fsettings\&title=Go+to+Settings\&personalTo=%2Faccount) page.
2. In the **General** section, find **Vercel Agent** and under **Investigations**, switch the toggle to **Enabled**.
3. Select **Save** to confirm your changes.

After you enable Agent Investigations, Vercel Agent runs an investigation automatically when an alert fires. Make sure your team has [enough credits](/docs/agent/pricing#adding-credits) to cover investigations beyond the included investigations.

## How to use Agent Investigation

When you [enable Agent Investigations](#enable-agent-investigations), Vercel Agent runs an investigation automatically when an alert fires. It queries your logs and metrics around the time of the alert, looks for patterns that might explain the issue, checks for related errors or anomalies, and summarizes what it found.

To view an investigation:

1. Go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Falerts\&title=Open+Alerts) and navigate to **Observability**, then **Alerts**.
2. Find the alert you want to review and click on it.
3. Review the investigation results alongside your alert details. If the investigation is still running, you can see the analysis stream in real time.

If you want to run the investigation again with fresh data, click the **Rerun** button.

### Run an investigation manually

If you do not have Agent Investigations enabled and running automatically, you can run an investigation manually from the alert details page.

1. Go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Falerts\&title=Open+Alerts) and navigate to **Observability**, then **Alerts**.
2. Find the alert you want to review and click on it.
3. Click the **Investigate** (or **Rerun**) button to run an investigation manually.

## Pricing

Agent Investigation includes 10 alert investigations per billing cycle with Observability Plus. After your team uses those included investigations, each additional investigation costs a fixed $0.30 USD plus token costs at the Agent's underlying AI provider rate, with no additional markup. The token cost varies based on how much log and metric data Vercel Agent analyzes.

You can [purchase credits and enable auto-reload](/docs/agent/pricing#adding-credits) in the Agent section in the sidebar of your dashboard. For complete pricing details, credit management, and cost tracking information, see [Vercel Agent Pricing](/docs/agent/pricing).

## Disable Agent Investigation

To disable Agent Investigation:

1. Go to your team's [Settings](https://vercel.com/d?to=%2Fteams%2F%5Bteam%5D%2Fsettings\&title=Go+to+Settings\&personalTo=%2Faccount) page.
2. In the **General** section, find **Vercel Agent** and under **Investigations**, switch the toggle to **Disabled**.
3. Select **Save** to confirm your changes.

Once disabled, Agent Investigation won't run automatically on any new alerts. You can re-enable Agent Investigation at any time from the same menu or [run an investigation manually](#run-an-investigation-manually) from the alert details page.


---

[View full sitemap](/docs/sitemap)
