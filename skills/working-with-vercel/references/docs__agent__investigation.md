---
title: Investigation
product: vercel
url: /docs/agent/investigation
canonical_url: "https://vercel.com/docs/agent/investigation"
last_updated: 2026-02-27
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/observability/observability-plus
  - /docs/agent/pricing
summary: Let AI investigate your error alerts to help you debug faster
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/investigation.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "c96a1aa3560e01ceb0c712365ade4fce27642bfd0363601a7e58da512c84f7ae"
---

# Investigation

> **🔒 Permissions Required**: Agent Investigation

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
