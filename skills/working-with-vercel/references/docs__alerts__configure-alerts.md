---
title: Configure alerts
product: vercel
url: /docs/alerts/configure-alerts
canonical_url: "https://vercel.com/docs/alerts/configure-alerts"
last_updated: 2026-09-16
type: how-to
prerequisites:
  - /docs/alerts
related:
  - /docs/cli/alerts
  - /docs/alerts
  - /docs/webhooks/webhooks-api
summary: Configure alert rules and notification destinations for Vercel Observability alerts.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/alerts/configure-alerts.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "bee97071524bdc9c98a8afa069c3f4a20fded829faef3492937704857b33b361"
---

# Configure alerts

> **Availability**: Alerts are available on Enterprise and Pro plans with Observability Plus

Use alert rules to notify your team when Vercel detects error or usage anomalies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [Anomaly alert configuration now available](https://vercel.com/changelog/anomaly-alert-configuration-now-available)
- [Detect memory and OOM failures in Vercel Functions](https://vercel.com/kb/guide/detect-memory-and-oom-failures-in-serverless-functions) — Fix out-of-memory \\(OOM\\) errors and memory limit exceeded crashes in Vercel serverless functions. Debug 5xx errors, mon
- [Notifications](https://vercel.com/docs/notifications) — Learn how to use Notifications to view and manage important alerts about your deployments, domains, integrations, accoun
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [vercel webhooks](https://vercel.com/docs/cli/webhooks) — Learn how to manage webhooks for your Vercel account using the vercel webhooks CLI command.

Full cross-link map for this page: [/docs/alerts/configure-alerts.graph.md](/docs/alerts/configure-alerts.graph.md)
<!-- /docsgraph:related -->

To manage alert rules from the terminal, use the [`vercel alerts rules`](/docs/cli/alerts#rules) command.

## Configure built-in alert rules

Built-in alert rules use Vercel-defined detections for Error anomaly and Usage anomaly alerts. Vercel-defined minimum activity thresholds reduce low-volume noise and are not configured in the alert rule form. For details, see [How error anomaly alerts trigger](/docs/alerts#how-error-anomaly-alerts-trigger).

Create a built-in alert rule from the dashboard or the Vercel CLI.

#### Dashboard

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.
2. Click **Add Alert Rule**.
3. Under **Triggers**, select the built-in alert type to configure:
   - **Error anomaly**: Trigger when a route's five-minute error count is unusually high compared to its recent baseline and passes Vercel's minimum activity checks.
   - **Usage anomaly**: Trigger when 5-minute usage is more than four standard deviations above the 24-hour average and crosses Vercel's minimum activity threshold.
4. Configure the trigger filters:
   - For **Error anomaly**, choose the HTTP group to monitor. By default, error anomalies track **5xx** status codes. Select **4xx** to monitor client error detections.
   - For **Usage anomaly**, choose the usage metric to monitor, such as Function invocations, Function duration, Function CPU duration, Fast Data Transfer, or CDN Requests.
5. Click **Next**.
6. In **Configure alert rule**, enter an alert rule name. This name appears in the **Alert Rules** table and notifications.
7. Choose the project scope for the alert rule. You can apply the alert rule to all projects, specific projects, or all projects except selected projects.
8. Click **Create Alert Rule**.

9) In **Configure notifications**, select one or more severity levels that should trigger notifications.

10. In **Configure notifications**, choose the notification destinations for the rule.
11. Click **Done**.

#### CLI

Define the alert rule in a JSON file with `type` set to `built-in`. This example alerts on unusual 5xx errors on API routes, at high severity and above:

```json filename="rule.json"
{
  "type": "built-in",
  "name": "Production server errors",
  "triggers": {
    "mode": "selected",
    "items": [
      {
        "type": "error_anomaly",
        "filter": "statusGroup:5xx AND route:/api/*"
      }
    ]
  },
  "matchMinimumSeverityLevel": "high"
}
```

Then run [`vercel alerts rules add`](/docs/cli/alerts). The `--project` flag sets the rule's scope, so the file doesn't include `ruleScope`. Use `--all` instead to apply the rule to every project:

```bash filename="terminal"
vercel alerts rules add --project <project> --body ./rule.json
```

Run `vercel alerts rules schema --type built-in` to see every field, including usage anomaly triggers and notification settings.

### Severity levels

Vercel calculates alert severity automatically from multiple signals, for example z-score and error-rate impact.

### Configure 4xx error detections

Create a separate built-in alert rule when you want to detect 4xx client errors. This keeps your default 5xx alert rule in place while tuning a separate alert rule for client errors.

After you start creating a built-in alert rule, select **Error anomaly** under **Triggers**. In the HTTP group selector, select **4xx**. To detect only client errors, clear **5xx**. Then complete the remaining **Configure alert rule** and **Configure notifications** steps.

## Configure notification destinations

When you create an alert rule, use **Configure notifications** to choose the destinations that receive matching alerts, and, for built-in alert rules, the alert severity under **Notification Severity**. Each of the following is its own destination:

- **Subscribe Team Owners**: Automatically include team owners in Vercel Notifications.
- **Configure Slack Channels**: Route alerts to one or more Slack channels.
- **Your Notifications**: Set your own push, email, and Inbox subscriptions.
- **Add Webhook**: Forward alert events to a webhook destination from the Alerts settings page.

## Configure Slack for a rule

Configure Slack subscriptions per alert rule from the **Alert Rules** table or the Vercel CLI.

#### Dashboard

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.

2. Create the alert rule, or select an existing alert rule.

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

7. Repeat this in any additional Slack channels you want to subscribe this alert rule to.

#### CLI

Install the Vercel app for Slack and invite it to the channel first, then run [`vercel alerts rules notifications link`](/docs/cli/alerts) with the Slack channel ID:

```bash filename="terminal"
vercel alerts rules notifications link <rule-id> --slack-channel <channel-id>
```

After a channel is subscribed, the alert rule shows the connected Slack channels in the **Slack** column.

## Configure webhooks

Webhooks work outside individual alert rules. On the [**Settings > Alerts** page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts), click **Add Webhook** to create a team webhook for alert events.

Webhook configuration applies at the team level. You can choose the endpoint URL and the projects that should send webhook events.

The webhook payload is documented in [Alerts triggered](/docs/webhooks/webhooks-api#alerts.triggered) in the Webhooks API Reference.


---

[View full sitemap](/docs/sitemap)
