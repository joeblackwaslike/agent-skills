---
title: Configure alerts
product: vercel
url: /docs/alerts/configure-alerts
canonical_url: "https://vercel.com/docs/alerts/configure-alerts"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/alerts
related:
  - /docs/alerts
  - /docs/webhooks/webhooks-api
summary: Configure alert rules and notification destinations for Vercel Observability alerts.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/alerts/configure-alerts.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "f4a52790e3ab7b93be00fcd502a7fe4b9347f3ea096a4022a88274de5b511907"
---

# Configure alerts

> **🔒 Permissions Required**: Alerts

Use alert rules to notify your team when Vercel detects error or usage anomalies.

## Configure built-in alert rules

Built-in alert rules use Vercel-defined detections for Error anomaly and Usage anomaly alerts. Vercel-defined minimum activity thresholds reduce low-volume noise and are not configured in the alert rule form. For error anomaly threshold examples, see the [Error anomaly reference table](/docs/alerts#error-anomaly-reference-table).

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.
2. Click **Add Rule**.
3. Under **Triggers**, select the built-in alert type to configure:
   - **Error anomaly**: Trigger when a 5-minute error rate is more than four standard deviations above the 24-hour average and crosses Vercel's minimum activity threshold.
   - **Usage anomaly**: Trigger when 5-minute usage is more than four standard deviations above the 24-hour average and crosses Vercel's minimum activity threshold.
4. Configure the trigger filters:
   - For **Error anomaly**, choose the HTTP group to monitor. By default, error anomalies track **5xx** status codes. Select **4xx** to monitor client error detections.
   - For **Usage anomaly**, choose the usage metric to monitor, such as Function invocations, Function duration, Function CPU duration, Fast Data Transfer, or Edge Requests.
5. Click **Next**.
6. In **Configure alert rule**, enter a rule name. This name appears in the **Alert Rules** table and notifications.
7. Choose the project scope for the rule. You can apply the rule to all projects, specific projects, or all projects except selected projects.
8. Choose the severity level that should trigger the rule: **High**, **Medium**, or **Low**.
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
