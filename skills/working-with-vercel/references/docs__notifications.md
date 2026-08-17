---
title: Notifications
product: vercel
url: /docs/notifications
canonical_url: "https://vercel.com/docs/notifications"
last_updated: 2026-07-29
type: reference
prerequisites:
  []
related:
  - /docs/deployments
  - /docs/domains
  - /docs/integrations
  - /docs/accounts
  - /docs/pricing/manage-and-optimize-usage
summary: Learn how to use Notifications to view and manage important alerts about your deployments, domains, integrations, account, and usage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/notifications.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "28129933ad8ed65c8a1d6166487bc78637b1fb425aba536da0b767456daeca16"
---

# Notifications

> **🔒 Permissions Required**: Notifications


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I disable Git Notifications from Deployments?](https://vercel.com/kb/guide/how-do-i-disable-git-notifications-from-deployments?from=related) — If your project is connected via a Git account to your deployment, you will receive email notifications whenever the dep
- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts?from=related) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [Configure Alerts](https://vercel.com/docs/alerts/configure-alerts?from=related) — Configure alert rules and notification destinations for Vercel Observability alerts.
- [GitHub](https://vercel.com/docs/git/vercel-for-github?from=related) — Vercel for GitHub automatically deploys your GitHub projects with Vercel, providing Preview Deployment URLs, and automat
- [Billing FAQ](https://vercel.com/docs/plans/pro-plan/billing?from=related) — This page covers frequently asked questions around payments, invoices, and billing on the Pro plan.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Audit Logs](https://vercel.com/docs/audit-log?from=related) — Learn how to track and analyze your team members' activities.

Full cross-link map for this page: [/docs/notifications.graph.md](/docs/notifications.graph.md)
<!-- /docsgraph:related -->

Vercel sends configurable notifications to you through the [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and email. These notifications enable you to view and manage important alerts about your [deployments](/docs/deployments), [domains](/docs/domains), [integrations](/docs/integrations), [account](/docs/accounts), and [usage](/docs/pricing/manage-and-optimize-usage).

## Receiving notifications

There are a number of places where you can receive notifications:

- **Web**: The Vercel dashboard displays a popover, which contains all relevant notifications
- **Email**: You'll receive an email when any of the alerts that you set on your team have been triggered
- **Push**: You'll receive a push notification when any of the alerts that you set on your team have been triggered
- **SMS**: SMS notifications can only be configured on a per-user basis for [Spend Management](/docs/spend-management#managing-alert-threshold-notifications) notifications.

By default, you will receive both web and email notifications for all [types of alerts](#types-of-notifications). Push notifications are opt-in per device and are available on desktop and mobile web. You can [manage these notifications](#managing-notifications) from the **Settings** section in the sidebar, but any changes you make will only affect *your* notifications.

## Basic capabilities

There are two main ways to interact with web notifications:

- **Read**: Unread notifications are displayed with a counter on the bell icon. When you view a notification on the web, it will be marked as read once you close the popover. Because of this, we also will not send an email if you have already read it on the web.
- **Archive**: You can manage the list of notifications by archiving them. You can view these archived notifications in the archive tab, where they will be visible for 365 days.

## Managing notifications

You can manage **your own** notifications by using the following steps:

1. Select your team from the team switcher.
2. Open **Settings** in the sidebar and under **Account**, select [**My Notifications**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fnotifications\&title=Go+to+Notifications+settings).
3. From here, you can toggle [where](#receiving-notifications) *you* would like to receive notifications for each different [type of notification](#types-of-notifications).

Any changes you make will only be reflected for your notifications and not for any other members of the team. You cannot configure notifications for other users.

### Notifications for Comments

You can receive feedback on your deployments with the Comments feature. When someone leaves a comment, you'll receive a notification on Vercel. You can see all new comments in the **Comments** section in your notifications sidebar.

[Learn more in the Comments docs](/docs/comments/managing-comments#notifications).

### On-demand usage notifications

> **🔒 Permissions Required**: Customizing on-demand usage notifications

You'll receive notifications as you accrue usage past the [included amounts](/docs/limits#usage-summary) for products like Vercel Functions, Image Optimization, and more.

**Team owners** on the **Pro** plan can customize which usage categories they want to receive notifications for based on percentage thresholds or absolute dollar values.

Emails are sent out at specific usage thresholds which vary based on the feature and plan you are on.

> **💡 Note:** If you choose to disable notifications, you won't receive alerts for any
> excessive charges within that category. This may result in unexpected
> additional costs on your bill. It is recommended that you carefully consider
> the implications of turning off notifications for any usage thresholds before
> making changes to your notification settings.

## Types of notifications

The types of notifications available for you to manage depend on the [role](/docs/rbac/access-roles/team-level-roles) you are assigned within your team. For example, someone with a [Developer](/docs/rbac/access-roles#developer-role) role will only be able to be notified of Deployment failures and Integration updates.

### Critical notifications

It is *not* possible to disable all notifications for alerts that are critical to your Vercel workflow. You **can** opt-out of [one specific channel](#receiving-notifications), like email, but not both email and web notifications. This is because of the importance of these notifications for using the Vercel platform. The list below provides information on which alerts are critical.

### Notification details

| Notification group   | Type of notification                                             | Explanation                                                                                                                                                                                                                                                                                            | [Critical notification?](#critical-notifications)                |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| **Account**          |                                                                  |                                                                                                                                                                                                                                                                                                        |                                                                  |
|                      | Team members added automatically                                 | Team owners will be notified when a new committer is automatically added to their team through auto approval.                                                                                                                                                                                          |  |
|                      | Team join requests                                               | Team owners will be notified when a new committer is pending review because manual approval is enabled. They can follow a link from the notification to approve or decline the membership request.                                                                                                     |  |
| **Alerts**           |                                                                  |                                                                                                                                                                                                                                                                                                        |                                                                  |
|                      | Usage Anomalies                                                  | Triggered when the usage of your project exceeds a certain threshold                                                                                                                                                                                                                                   |                                                                  |
|                      | Error Anomalies                                                  | Triggered when a high rate of failed function invocations (those with a status code of 5xx) in your project exceeds a certain threshold                                                                                                                                                                |                                                                  |
| **Deployment**       |                                                                  |                                                                                                                                                                                                                                                                                                        |                                                                  |
|                      | Deployment Failures                                              | Deployment owners will be notified about any deployment failures that occur for any Project on your team.                                                                                                                                                                                              |                                                                  |
|                      | Deployment Promotions                                            | Deployment owners will be notified about any deployment promotions that occur for any Project on your team.                                                                                                                                                                                            |                                                                  |
| **Domain**           |                                                                  |                                                                                                                                                                                                                                                                                                        |                                                                  |
|                      | Configuration - Certificate renewal failed                       | Team owners will be notified if the SSL Certification renewal for any of their team's domains has failed. For more information, see [When is the SSL Certificate on my Vercel Domain renewed?](/kb/guide/renewal-of-ssl-certificates-with-a-vercel-domain).                                            |                                                                  |
|                      | Configuration - Domain Configured                                | Team owners will be notified of any domains that have been added to a project. For more information, see [Add a domain](/docs/domains/working-with-domains/add-a-domain).                                                                                                                                                   |                                                                  |
|                      | Configuration - Domain Misconfigured                             | Team owners will be notified of any domains that have been added to a project and are misconfigured. These notifications will be batched. For more information, see [Add a domain](/docs/domains/working-with-domains/add-a-domain).                                                                                        |                                                                  |
|                      | Configuration - Domain no payment source or payment failure      | Team owners will be notified if there were any payment issues while [Adding a domain](/docs/domains/working-with-domains/add-a-domain). Ensure a valid payment option is adding to **Settings > Billing**                                                                                                                   |                                                                  |
|                      | Renewals - Domain renewals                                       | Team owners will be notified 17 days and 7 days before [renewal attempts](/docs/domains/working-with-domains/renew-a-domain#auto-renewal-on).                                                                                                                                                                               |                                                                  |
|                      | Renewals - Domain expiration                                     | Team owners will be notified 24 and 14 days before a domain is set to expire about, if [auto-renewal is off](/docs/domains/working-with-domains/renew-a-domain#auto-renewal-off). A final email will notify you when the Domain expires.                                                                                    |                                                                  |
|                      | Transfers - Domain moves requested or completed                  | Team owners will be notified when a domain has requested to move or successfully moved in or out of their team. For more information see, [Transfer a domain to another Vercel user or team](/docs/domains/working-with-domains/transfer-your-domain#transfer-a-domain-to-another-vercel-user-or-team) |                                                                  |
|                      | Transfers - Domain transfers initiated, cancelled, and completed | Team owners will be notified about any information regarding any [domain transfers](/docs/domains/working-with-domains/transfer-your-domain) in or out of your team.                                                                                                                                   |                                                                  |
|                      | Transfers - Domain transfers pending approval                    | Team owners will be notified when a domain is being [transferred into Vercel](/docs/domains/working-with-domains/transfer-your-domain#transfer-a-domain-to-vercel), but the approval is required from the original registrar.                                                                          |                                                                  |
| **Integrations**     |                                                                  |                                                                                                                                                                                                                                                                                                        |                                                                  |
|                      | Integration configuration disabled                               | Everyone will be notified about integration updates such as a [disabled Integration](/docs/integrations/install-an-integration/manage-integrations-reference#disabled-integrations).                                                                                                                   |  |
|                      | Integration scope changed                                        | Team owners will be notified if any of the Integrations used on their team have updated their [scope](/docs/integrations/create-integration/vercel-api-integrations#scopes).                                                                                                                                                  |  |
| **Usage**            |                                                                  |                                                                                                                                                                                                                                                                                                        |                                                                  |
|                      | Usage increased                                                  | Team owners will be notified about all [usage alerts](/docs/limits) regarding billing, and other usage warnings.                                                                                                                                                                                       |  |
|                      | Usage limit reached                                              | Users will be notified when they reach the limits outlined in the [Fair Usage Policy](/docs/limits/fair-use-guidelines).                                                                                                                                                                               |  |
| **Non-configurable** |                                                                  |                                                                                                                                                                                                                                                                                                        |                                                                  |
|                      | Email changed confirmation                                       | You will be notified when you have successfully updated the email connected to your Hobby team                                                                                                                                                                                                         |                                                                  |
|                      | Email changed verification                                       | You will be notified when you have updated the email connected to your Hobby team. You will need to verify this email to confirm.                                                                                                                                                                      |                                                                  |
|                      | User invited                                                     | You will be sent this when you have been invited to join a new team.                                                                                                                                                                                                                                   |                                                                  |
|                      | Invoice payment failed                                           | Users who can manage billing settings will be notified when they have an [outstanding invoice](/docs/plans/enterprise/billing#why-am-i-overdue).                                                                                                                                                       |                                                                  |
|                      | Project role changed                                             | You will be sent this when your [role](/docs/rbac/access-roles) has changed                                                                                                                                                                                                                            |                                                                  |
|                      | User deleted                                                     | You will be sent this when you have chosen to delete their account. This notification is sent by email only.                                                                                                                                                                                           |                                                                  |
| **Global Config**      | Size Limit Alerts                                                | Members will be notified when Global Config size exceeds its limits for the current plan                                                                                                                                                                                                                 |                                                                  |
|                      | Schema Validation Errors                                         | Members will be notified (at most once per hour) if API updates are rejected by [schema protection](/docs/global-config/global-config-dashboard#schema-validation)                                                                                                                                         |                                                                  |


---

[View full sitemap](/docs/sitemap)
