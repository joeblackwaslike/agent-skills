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
  - /docs/cli/monitors
  - /docs/alerts
  - /docs/observability/observability-plus
  - /docs/webhooks/webhooks-api
summary: Configure alert rules and notification destinations for Vercel Observability alerts.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/alerts/configure-alerts.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "42bb5d5277437250e1cb0542c629253cfe707a82273bb18e4aea094cd22ca458"
---

# Configure alerts

> Alerts are available on Enterprise and Pro plans with Observability Plus

Use monitors to notify your team when Vercel detects error or usage anomalies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create custom monitors in Vercel Observability](https://vercel.com/changelog/create-custom-monitors-in-vercel-observability)
- [Vercel Agent can now validate alerts before paging](https://vercel.com/changelog/vercel-agent-can-now-validate-alerts-before-paging-you)
- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Observability Insights](https://vercel.com/docs/observability/insights) — List of available data sources that you can view and monitor with Observability on Vercel.
- [Monitoring](https://vercel.com/docs/query/monitoring) — Query and visualize your Vercel usage, traffic, and more with Monitoring.

Full cross-link map for this page: [/docs/alerts/configure-alerts.graph.md](/docs/alerts/configure-alerts.graph.md)
<!-- /docsgraph:related -->

To manage monitors from the terminal, use the [`vercel monitors`](/docs/cli/monitors) command. To manage them as code, use the [`vercel_monitor`](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/monitor) and [`vercel_custom_monitor`](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/custom_monitor) resources in the [Vercel Terraform provider](https://registry.terraform.io/providers/vercel/vercel/latest).

Vercel monitors common error and usage signals for you. With [custom monitors](#configure-custom-rules), you can define project-specific signals.

## Configure built-in monitors

Built-in monitors use Vercel-defined detections for Error anomaly and Usage anomaly alerts. Vercel-defined minimum activity thresholds reduce low-volume noise and are not configured in the monitor form. For details, see [How error anomaly alerts trigger](/docs/alerts#how-error-anomaly-alerts-trigger).

Create a built-in monitor from the dashboard or the Vercel CLI.

#### Dashboard

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.
2. Click **Add Monitor**.
3. Under **Triggers**, select the built-in alert type to configure:
   - **Error anomaly**: Trigger when a route's five-minute error count is unusually high compared to its recent baseline and passes Vercel's minimum activity checks.
   - **Usage anomaly**: Trigger when 5-minute usage is more than four standard deviations above the 24-hour average and crosses Vercel's minimum activity threshold.
4. Configure the trigger filters:
   - For **Error anomaly**, choose the HTTP group to monitor. By default, error anomalies track **5xx** status codes. Select **4xx** to monitor client error detections.
   - For **Usage anomaly**, choose the usage metric to monitor, such as Function invocations, Function duration, Function CPU duration, Fast Data Transfer, or CDN Requests.
5. Click **Next**.
6. In **Configure monitor**, enter a monitor name. This name appears in the **Monitors** table and notifications.
7. Choose the project scope for the monitor. You can apply the monitor to all projects, specific projects, or all projects except selected projects.
8. Click **Create Monitor**.

9) In **Configure notifications**, under **Notification Severity**, select the least-severe of Low, Medium, or High that should trigger notifications. Vercel always includes Critical alerts in addition to your selection.

10. In **Configure notifications**, choose the notification destinations for the rule.
11. Click **Done**.

#### CLI

Define the monitor in a JSON file with `type` set to `built-in`. This example alerts on unusual 5xx errors on API routes, at high severity and above:

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

Then run [`vercel monitors add`](/docs/cli/monitors#add). The `--project` flag sets the monitor's scope, so the file doesn't include `ruleScope`. Use `--all` instead to apply the monitor to every project:

```bash filename="terminal"
vercel monitors add --project <project> --body ./rule.json
```

Run `vercel monitors schema --type built-in` to see every field, including usage anomaly triggers and notification settings.

### Severity levels

Vercel calculates alert severity automatically from multiple signals, for example z-score and error-rate impact.

- **Low**: Minor or controlled impact.
- **Medium**: Service degradation or meaningful failures.
- **High**: Significant impact requiring prompt attention.
- **Critical**: Agent-assessed impact requiring escalation. Vercel Agent investigates eligible detections before notification delivery.

> **💡 Note:** Critical isn't a selectable **Notification Severity** option. Every monitor
> automatically includes Critical alerts and delivers them to every
> destination by default. Select **Critical Only** on a destination under
> [Configure notification destinations](#configure-notification-destinations)
> to limit that destination to just Critical alerts. Critical alert triaging
> requires Vercel Agent credits. Observability Plus includes 10
> investigations per billing cycle.

### Configure 4xx error detections

Create a separate built-in monitor when you want to detect 4xx client errors. This keeps your default 5xx monitor in place while tuning a separate monitor for client errors.

After you start creating a built-in monitor, select **Error anomaly** under **Triggers**. In the HTTP group selector, select **4xx**. To detect only client errors, clear **5xx**. Then complete the remaining **Configure monitor** and **Configure notifications** steps.

## Configure custom monitors

Custom monitors let you define project-scoped alert detection logic with Observability queries. A custom monitor can evaluate a metric or ratio, then trigger when the value crosses a threshold or becomes anomalous for the selected alert window.

Custom monitors are available only with [Observability Plus](/docs/observability/observability-plus). You can create up to 50 custom monitors per team.

Use a custom monitor when you need to track a specific signal, such as:

- A route, status code, cache state, region, or other query dimension that matters to your application.
- A threshold guardrail for web vitals or application behavior, such as a performance metric crossing your target over a selected alert window.
- A ratio, such as error rate, calculated from separate numerator and denominator queries.
- An anomaly condition, such as a metric or ratio rising above or falling below its baseline by a selected number of standard deviations.

Vercel doesn't evaluate a custom monitor while its alert window includes a period when Observability Plus was disabled. The monitor resumes automatically once Observability Plus has been active for the full window. Vercel doesn't disable or change the monitor.

### Create a custom monitor

Create a custom monitor from the dashboard or the Vercel CLI.

#### Dashboard

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.
2. Click **Add Monitor**.
3. In **Choose alert source**, select **Custom**.
4. Select the **Project** to monitor. The wizard opens **Configure monitor** after you choose a project.
5. In **Configure monitor**, enter a monitor name. This name appears in the **Monitors** table and notifications.
6. Choose the value source:
   - **Metric**: Alert on a single Observability metric.
   - **Ratio**: Alert on a percentage calculated from a numerator and denominator. Both queries use the same event, but each query can have its own metric, aggregation, and filters.
7. In **Measure**, select the metric, aggregation, and filters that narrow the traffic, usage, or events you want the monitor to evaluate. For ratios, configure the **Numerator** and **Denominator** separately.
8. In **Slice**, optionally define up to one **Group by** dimension, such as route, path, status code, cache status, or region. Vercel evaluates the metric or ratio separately for each group.

> **💡 Note:** Group by values are evaluated independently, so one monitor can alert on the
> specific route, path, status code, cache status, or region that crosses the
> condition. Each matching value can trigger separately, so choose a dimension
> with notification volume in mind.

9. In **Alert when**, configure the condition:
   - Select **is above** to trigger when the metric or ratio is above a fixed value. Enter the threshold value, then select the **5 min**, **1h**, or **1d** alert window.
   - Select **is below** to trigger when the metric or ratio is below a fixed value. Enter the threshold value, then select the alert window. Below conditions wait 10 minutes for data to finish ingesting, then evaluate the latest complete alert window. This delay prevents false alerts from windows that are still filling in. Above conditions evaluate without this delay.
   - Select **is anomalously high** to trigger when the metric or ratio rises above its baseline by more than the configured number of standard deviations. Select **is anomalously low** to trigger when it falls below its baseline by more than that number. Like below conditions, **is anomalously low** waits 10 minutes for data to finish ingesting, then evaluates the latest complete alert window. Enter the number of standard deviations, then select the alert window. The **5 min** alert window uses a 24-hour baseline. The **1h** and **1d** alert windows use a 7-day baseline.
   - Vercel runs detection based on the selected alert window. **5 min** monitors run every 5 minutes, **1h** monitors run every 30 minutes, and **1d** monitors run every 2 hours.
   - Set **Only if metric >=** or **Only if numerator >=** to require a minimum sample size before the monitor triggers. This option appears for anomaly alerts and ratio threshold alerts. For **is anomalously low**, the option reads **Only alert when the baseline average is at least** (or **the numerator baseline average** for ratios), because Vercel compares the minimum with the baseline average instead of the current value.
10. Review the preview chart to confirm the query and condition match the behavior you expect. The chart date range controls the preview only. The saved monitor uses the selected alert window.
11. Click **Create Monitor**.
12. In **Configure notifications**, choose the notification destinations for the monitor.
13. Click **Done**.

#### CLI

Define the monitor in a JSON file with `type` set to `custom`. This example alerts when the project returns more than 20 server errors in a 5-minute window:

```json filename="rule.json"
{
  "type": "custom",
  "name": "Checkout server errors",
  "severity": "high",
  "evaluation": {
    "window": "5m",
    "query": {
      "metrics": {
        "errors": {
          "metric": "vercel.request.count",
          "aggregation": "count",
          "filter": "httpStatus >= 500"
        }
      },
      "outputs": ["errors"]
    }
  },
  "trigger": {
    "type": "threshold",
    "output": "errors",
    "operator": "gt",
    "threshold": 20
  }
}
```

Then run [`vercel monitors add`](/docs/cli/monitors#add). Custom monitors apply to exactly one project, which `--project` sets, so the file doesn't include `ruleScope`:

```bash filename="terminal"
vercel monitors add --project <project> --body ./rule.json
```

Run `vercel monitors schema --type custom` to see every field, including anomaly and ratio triggers. To find metric IDs and filter fields, run `vercel metrics schema <metric>`.

When the query condition matches, Vercel shows alerts in **Observability > Alerts**, where you can filter by monitor.

## Configure notification destinations

When you create a monitor, use **Configure notifications** to choose the destinations that receive matching alerts, and, for built-in monitors, the alert severity under **Notification Severity**. Each of the following is its own destination:

- **Vercel Notifications**: Web, email, and push notifications. Turn on **Subscribe Team Owners** to automatically include team owners.
- **Slack channels**: Route alerts to one or more Slack channels with **Set up Slack**.
- **incident.io**: Link an incident.io alert source with **Set up incident.io**.
- **Webhooks**: Create and link a webhook with **New webhook**, or reuse one from **Connect a destination**.

Manage these under **Destinations** in the monitor's notification settings.

Every destination otherwise follows the monitor's **Notification Severity**. Select **Critical Only** on Vercel Notifications, a Slack channel, or a webhook to limit that destination to Critical alerts only. Vercel Agent still assesses each alert as Critical before Vercel delivers it.

## Configure Slack for a monitor

Configure Slack subscriptions per monitor from the **Monitors** table or the Vercel CLI.

#### Dashboard

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.

2. Create the monitor, or select an existing monitor, and open **Notifications**.

3. Under **Destinations**, click **Set up Slack**. If the Vercel app for Slack is not installed for your team yet, install it first.

4. To subscribe a channel already connected to Vercel, select it from **Available Channels** in the panel, or from the **Connect a destination** shortcuts. To subscribe a new channel, continue:

5. In Slack, open the channel that should receive alerts and invite the Vercel app:

   ```bash
   /invite @Vercel
   ```

6. In the same Slack channel, run the subscribe command shown in the panel. For a monitor-specific subscription, Vercel includes the monitor ID in the command:

   ```bash
   /vercel subscribe <team-id> alerts +rule:<rule-id>
   ```

7. Repeat this in any additional Slack channels you want to subscribe this monitor to.

#### CLI

Install the Vercel app for Slack and invite it to the channel first, then run [`vercel monitors notifications link`](/docs/cli/monitors) with the Slack channel ID:

```bash filename="terminal"
vercel monitors notifications link <monitor-id> --slack-channel <channel-id>
```

After a channel is subscribed, it appears under **Connected Destinations** in the monitor's notification settings.

## Configure webhooks

Webhook destinations use the scope of the monitors linked to them. An endpoint receives an `alerts.triggered` event when an alert matches a linked monitor, including its trigger conditions and project scope. You can link the same endpoint to multiple monitors.

To configure a webhook for a monitor:

1. Open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts) for your team.
2. Create a monitor, or select an existing monitor and open **Notifications**.
3. Under **Destinations**, choose how to link the destination:
   - To add a new destination, click **New webhook**, enter its URL, then click **Create and Link**.
   - To reuse a destination, select it under **Connect a destination**.
4. If you created a webhook, save its signing secret before closing the confirmation. Vercel displays the signing secret only once. Use it to [verify requests from Vercel](/docs/webhooks/webhooks-api#securing-webhooks).
5. To send only Critical alerts to a linked webhook, select **Critical Only** next to it. Vercel Agent still assesses each alert as Critical before delivery, so this can delay notifications relative to the monitor's overall severity threshold.

You can review every destination and its linked monitors from [**Settings > Webhooks**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fwebhooks). A webhook that isn't linked to any monitors doesn't receive alert events.

Existing account-wide alert webhooks continue to receive all alert events. If you link an account-wide webhook to a monitor, Vercel limits future alert delivery to the monitors linked to that endpoint.

The webhook payload is documented in [Alerts triggered](/docs/webhooks/webhooks-api#alerts.triggered) in the Webhooks API Reference.

### Configure incident.io

Create a Vercel alert source in incident.io, then link its endpoint to a monitor. The **Set up incident.io** panel also links directly to creating the alert source:

1. In incident.io, open **Alerts**, select the **Sources** tab, and click **New alert source**.
2. Search for **Vercel**, select it, and customize the source name if needed. Click **Continue** to create the source.
3. Copy the alert source's **endpoint URL** shown by incident.io.
4. In Vercel, open [**Settings > Alerts**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Falerts), then create a monitor or select an existing monitor.
5. Open **Notifications** and, under **Destinations**, click **Set up incident.io**.
6. Paste the endpoint URL of your incident.io Vercel alert source.
7. Click **Create and Link**.
8. Optionally, to also receive lower-severity alerts, clear **Critical Only** next to the destination under **Connected Destinations** (Vercel pre-selects it for incident.io destinations).
9. Click **Test Notification**, select **incident.io**, and confirm that the test event appears in incident.io.

After a matching alert fires, confirm that it appears in incident.io. You can then include the Vercel alert source in an incident.io alert route to page responders or create incidents.

#### Route alerts to incident.io with tags

Optionally, add tags to a monitor: select it, open **Configure**, and click **Edit** next to **Tags**. Vercel includes these tags in the alerts it sends to incident.io. In incident.io, use the tags as routing keys in your alert routes. This lets you send alerts from different monitors to different teams or escalation paths.

#### Map alert severity in incident.io

Vercel includes each alert's [severity](#severity-levels) in the alerts it sends to incident.io. Optionally, map the severity to incident.io priorities in your alert routes, so alerts page responders with the right urgency.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
