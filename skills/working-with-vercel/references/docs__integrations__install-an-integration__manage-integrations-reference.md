---
title: Permissions and Access
product: vercel
url: /docs/integrations/install-an-integration/manage-integrations-reference
canonical_url: "https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference"
last_updated: 2026-09-17
type: how-to
prerequisites:
  - /docs/integrations/install-an-integration
  - /docs/integrations
related:
  - /docs/notifications
  - /docs/integrations/install-an-integration/secure-your-resource
  - /docs/integrations/create-integration/vercel-api-integrations
  - /docs/integrations/create-integration/billing
summary: Learn how to manage project access and added products for your integrations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "49db867fc883389cc4e5e56d4cae2428b57126e087189c4a427b762e0998a618"
---

# Permissions and Access

## View an integration's permissions

To view an integration's permissions:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration) — Learn how you can add a product to your Vercel project through a native integration.
- [Scopes and Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions) — Learn how to manage scopes and permissions for Sign in with Vercel
- [Native integration concepts](https://vercel.com/docs/integrations/create-integration/native-integration) — As an integration provider, understanding how your service interacts with Vercel's platform will help you create and opt
- [Extended permissions](https://vercel.com/docs/rbac/access-roles/extended-permissions) — Learn about extended permissions in Vercel's RBAC system. Understand how to combine roles and permissions for precise ac
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/integrations/install-an-integration/manage-integrations-reference.graph.md](/docs/integrations/install-an-integration/manage-integrations-reference.graph.md)
<!-- /docsgraph:related -->

1. From your Vercel [dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in the sidebar.
2. Next to the integration, select the **Manage** button.
3. On the Integrations detail page, scroll to **Permissions** section at the bottom of the page.

## Permission Types

Integration permissions restrict how much of the API the integration is allowed to access. When you install an integration, you will see an overview of what permissions the integration requires to work.

| **Permission Type**                      | **Read Access**                                                                                                                                        | **Write Access**                                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Installation**                         | Reads whether the integration is installed for the hobby or team account                                                                               | Removes the installation for the hobby or team account                                                        |
| **Deployment**                           | Retrieves deployments for the hobby or team account. Includes build logs, a list of files and builds, and the file structure for a specific deployment | Creates, updates, and deletes deployments for the hobby or team account                                       |
| **Deployment Checks**                    | N/A                                                                                                                                                    | Retrieves, creates, and updates tests/assertions that trigger after deployments for the hobby or team account |
| **Project**                              | Retrieves projects for the hobby or team account. Also includes retrieving all domains for an individual project                                       | Creates, updates, and deletes projects for the hobby or team account                                          |
| **Project Environment Variables**        | N/A                                                                                                                                                    | Reads, creates, and updates integration-owned environment variables for the hobby or team account             |
| **Global Project Environment Variables** | N/A                                                                                                                                                    | Reads, creates, and updates all environment variables for the hobby or team account                           |
| **Team**                                 | Accesses team details for the account. Includes listing team members                                                                                   | N/A                                                                                                           |
| **Current User**                         | Accesses information about the Hobby team on which the integration is installed                                                                        | N/A                                                                                                           |
| **Log Drains** (deprecated)              | N/A                                                                                                                                                    | Reads, creates, and updates log drains for the Pro or Enterprise accounts. Replaced by the **Drains** permission |
| **Drains**                               | N/A                                                                                                                                                    | Reads, creates, and updates drains for the Pro or Enterprise accounts                                         |
| **Domain**                               | Retrieves all domains for the hobby or team account. Includes reading its status and configuration                                                     | Removes a previously registered domain name from Vercel for the hobby or team account                         |

## Confirming Permission Changes

Integrations can request more permissions over time.
Individual users and team owners are [notified](/docs/notifications#notification-details) by Vercel when an integration installation has pending permission changes. You'll also be alerted to any new permissions on the [dashboard](/dashboard/marketplace). The permission request contains information on which permissions are changing and the reasoning behind the changes.

![Changed Permissions on Integration.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/dashboard/action-required-for-changed-permissions-light.png)

## Manage project access

To manage which projects the installed integration has access to:

1. From your Vercel [dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in the sidebar.
2. Next to the integration, select the **Manage** button.
3. On the Integrations page, under **Access**, select the **Manage Access** button.
4. From the dialog, select the option to manage which projects have access.

For native integration resources, you can also [secure your resource](/docs/integrations/install-an-integration/secure-your-resource) from a resource's **Settings** page by configuring **Allowed Environments** and enforcing Production-only usage.

For each Native Marketplace resource connection, you can select Production, Preview, Development, and individual Custom Environments. Production-only mode treats Preview, Development, and every Custom Environment as non-production.

### Disabled integrations

Every integration installed for a team creates an access token that is associated with the developer who originally installed it. If the developer loses access to the team, the integration will become disabled to prevent unauthorized access. We will [notify](/docs/notifications#notification-details) team owners when an installation becomes disabled.

When an integration is disabled, team owners must take action by clicking **Manage** and either changing ownership or removing the integration.

> **💡 Note:** If a disabled integration is not re-enabled, it will be automatically removed
> after 30 days. Any environment variables that were created by that integration
> will also be removed - this may prevent new deployments from working.

When an integration is `disabled`:

- The integration will no longer have API access to your team or account
- If the integration has set up log drains, then logs will cease to flow
- The integration will no longer receive the majority of webhooks, other than those essential to its operation (`project.created`, `project.removed` and `integration-configuration.removed`)

If you are an integrator, see the [disabled integration configurations](/docs/integrations/create-integration/vercel-api-integrations#disabled-integration-configurations) documentation to make sure your integration can handle `disabled` state.

## Invoice access

Only users with **Owner** or **Billing** roles can view invoices for native integrations. See [Billing](/docs/integrations/create-integration/billing) for more details on invoice lifecycle, pricing, and refunds.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
