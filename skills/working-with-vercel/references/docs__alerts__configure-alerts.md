---
title: Configure alerts
product: vercel
url: /docs/alerts/configure-alerts
canonical_url: "https://vercel.com/docs/alerts/configure-alerts"
last_updated: 2026-07-03
type: how-to
prerequisites:
  - /docs/alerts
related:
  - /docs/alerts
  - /docs/webhooks/webhooks-api
summary: Configure alert rules and notification destinations for Vercel Observability alerts.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/alerts/configure-alerts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "361081d050ded7aeff41fb4eef2eee03450d7b989a0558492ee771abb9092b50"
---

# Configure alerts

> **🔒 Permissions Required**: Alerts


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts?from=related) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [Detect memory and OOM failures in Vercel Functions](https://vercel.com/kb/guide/detect-memory-and-oom-failures-in-serverless-functions?from=related) — Fix out-of-memory \(OOM\) errors and memory limit exceeded crashes in Vercel serverless functions. Debug 5xx errors, mon
- [vercel alerts](https://vercel.com/docs/cli/alerts?from=related) — List recent alerts for a linked project, a specific project, or an entire team with the Vercel CLI.
- [Notifications](https://vercel.com/docs/notifications?from=related) — Learn how to use Notifications to view and manage important alerts about your deployments, domains, integrations, accoun
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Webhooks](https://vercel.com/docs/webhooks?from=related) — Learn how to set up webhooks and use them with Vercel Integrations.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/alerts/configure-alerts.graph.md](/docs/alerts/configure-alerts.graph.md)
<!-- /docsgraph:related -->

Use alert rules to notify your team when Vercel detects error or usage anomalies.

## Configure built-in alert rules

Built-in alert rules use Vercel-defined detections for Error anomaly and Usage anomaly alerts. Vercel-defined minimum activity thresholds reduce low-volume noise and are not configured in the alert rule form. For details, see [How error anomaly alerts trigger](/docs/alerts#how-error-anomaly-alerts-trigger).

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.
2. Click **Add Rule**.
3. Under **Triggers**, select the built-in alert type to configure:
   - **Error anomaly**: Trigger when a route's five-minute error count is unusually high compared to its recent baseline and passes Vercel's minimum activity checks.
   - **Usage anomaly**: Trigger when 5-minute usage is more than four standard deviations above the 24-hour average and crosses Vercel's minimum activity threshold.
4. Configure the trigger filters:
   - For **Error anomaly**, choose the HTTP group to monitor. By default, error anomalies track **5xx** status codes. Select **4xx** to monitor client error detections.
   - For **Usage anomaly**, choose the usage metric to monitor, such as Function invocations, Function duration, Function CPU duration, Fast Data Transfer, or Edge Requests.
5. Click **Next**.
6. In **Configure alert rule**, enter a rule name. This name appears in the **Alert Rules** table and notifications.
7. Choose the project scope for the rule. You can apply the rule to all projects, specific projects, or all projects except selected projects.
8. Select one or more severity levels that should trigger notifications: **High**, **Medium**, or **Low**. Vercel calculates error anomaly severity automatically. **High** and **Medium** are selected by default; select **Low** to receive low-severity notifications.
9. Click **Create Alert Rule**.
10. In **Configure notifications**, choose the notification destinations for the rule.
11. Click **Done**.

### Configure 4xx error detections

Create a separate built-in alert rule when you want to monitor 4xx client error detections. This keeps your default 5xx rule in place while tuning a separate rule for client errors.

After you start creating a built-in alert rule, select **Error anomaly** under **Triggers**. In the HTTP group selector, select **4xx**. To detect only client errors, clear **5xx**. Then complete the remaining **Configure alert rule** and **Configure notifications** steps.

## Configure notification destinations

When you create an alert rule, use **Configure notifications** to choose where Vercel sends matching alerts. You can subscribe team owners, route alerts to Slack, configure personal subscriptions, or add a webhook destination.

- **Subscribe Team Owners**: Automatically include team owners.
- **Configure Slack Channels**: Route alerts to one or more Slack channels.
- **Your Notifications**: Set your own push, email, and Inbox subscriptions.
- **Add Webhook**: Forward alert events to a webhook destination from the Alerts settings page.

## Configure Slack for a rule

Configure Slack subscriptions per rule from the **Alert Rules** table.

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.

2. Create the rule, or select an existing rule.

3. In the **Slack** column, click **Configure**.

4. If the Vercel app for Slack is not installed for your team yet, install it first.

5. In Slack, open the channel that should receive alerts and invite the Vercel app:

   ```bash
   /invite @Vercel
   ```

6. In the same Slack channel, run the subscribe command shown in the modal. For a rule-specific subscription, Vercel includes the rule ID in the command:

   ```bash
   /vercel subscribe <team-id> alerts +rule:<rule-id>
   ```

7. Repeat this in any additional Slack channels you want to subscribe this rule to.

After a channel is subscribed, the rule shows the connected Slack channels in the **Slack** column.

## Configure webhooks

Webhooks work outside individual alert rules. On the [**Settings > Alerts** page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts), click **Add Webhook** to create a team webhook for alert events.

Webhook configuration applies at the team level. You can choose the endpoint URL and the projects that should send webhook events.

The webhook payload is documented in [Alerts triggered](/docs/webhooks/webhooks-api#alerts.triggered) in the Webhooks API Reference.


---

[View full sitemap](/docs/sitemap)
