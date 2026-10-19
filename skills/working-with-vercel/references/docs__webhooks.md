---
title: Setting Up Webhooks
product: vercel
url: /docs/webhooks
canonical_url: "https://vercel.com/docs/webhooks"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  []
related:
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/vercel-firewall
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/headers/request-headers
summary: Learn how to set up webhooks and use them with Vercel Integrations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/webhooks.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a23763707503bf8b676693580e52b5f5ae6f6d34fa7174fabc5a04523e57df40"
---

# Setting Up Webhooks

A webhook is a trigger-based HTTP endpoint configured to receive HTTP POST requests through events. When an event happens, a webhook is sent to another third-party app, which can then take appropriate action.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I run end-to-end tests after my Vercel Preview Deployment?](https://vercel.com/kb/guide/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment) — Learn how to use the Vercel CLI in combination with your CI/CD provider to run end-to-end tests for every code change.
- [Webhooks are now generally available](https://vercel.com/changelog/webhooks-are-now-generally-available)
- [Integration Webhooks are now easier to configure](https://vercel.com/changelog/integration-webhooks-are-now-easier-to-configure)
- [Configurable webhooks ](https://vercel.com/changelog/configurable-webhooks)
- [Creates a webhook](https://vercel.com/docs/rest-api/webhooks/creates-a-webhook) — POST /v1/webhooks — Creates a webhook
- [Get a webhook](https://vercel.com/docs/rest-api/webhooks/get-a-webhook) — GET /v1/webhooks/{id} — Get a webhook
- [Get a list of webhooks](https://vercel.com/docs/rest-api/webhooks/get-a-list-of-webhooks) — GET /v1/webhooks — Get a list of webhooks
- [vercel webhooks](https://vercel.com/docs/cli/webhooks) — Learn how to manage webhooks for your Vercel account using the vercel webhooks CLI command.
- [get_webhooks](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_webhooks) — Use get_webhooks with Vercel MCP.

Full cross-link map for this page: [/docs/webhooks.graph.md](/docs/webhooks.graph.md)
<!-- /docsgraph:related -->

Webhooks configured with Vercel can trigger a deployment when a specific event occurs. Vercel integrations receive platform events through webhooks.

## Account Webhooks

> **Availability**: Account Webhooks are available on Enterprise and Pro plans

Vercel allows you to add a [generic](# "What is a generic webhook?") endpoint for events from your dashboard. [Pro](/docs/plans/pro-plan) and [Enterprise](/docs/plans/enterprise) teams will be able to configure these webhooks at the account level.

### Configure a webhook

- ### Go to your team settings
  Choose your team scope on the dashboard, and go to **Settings ➞ Webhooks**.

- ### Select the events to listen to
  ![Select events for your webhooks to listen.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/webhooks/webhooks-add-events-light.png)

  The configured webhook listens to one or more events before it triggers the function request. Vercel supports event selections from the following categories:
  #### Deployment Events
  Configurable webhooks listen to the following deployment-based events:
  - **Deployment Created**: Listens for when any new deployment is initiated
  - **Deployment Succeeded**: Listens for a successful deployment
  - **Deployment Promoted**: Listens for when a deployment is successfully promoted, either manually or automatically, does not include rollbacks
  - **Deployment Rollback**: Listens for when Vercel accepts an instant rollback request
  - **Deployment Error**: Listens for any failed deployment
  - **Deployment Cancelled**: Listens for a canceled deployment due to any failure
  #### Project Events
  > **💡 Note:** Project events are only available when "All Team Projects" is selected as the
  > [project scope](#choose-your-target-projects).
  Configurable webhooks listen to the following project-based events:
  - **Project Created**: Listens whenever a new project is created
  - **Project Removed**: Listens whenever any project is deleted from the team account
  - **Project Renamed**: Listens whenever a project is renamed
  - **Project Environment Variable Created**: Listens whenever a project environment variable is created
  - **Project Environment Variable Updated**: Listens whenever a project environment variable is updated
  - **Project Environment Variable Deleted**: Listens whenever a project environment variable is deleted
  #### Feature Flag Events
  Configurable webhooks listen to the following feature flag events:
  - **Flag Created**: Listens whenever a feature flag is created
  - **Flag Updated**: Listens whenever a feature flag is updated
  - **Flag Deleted**: Listens whenever a feature flag is deleted
  - **Flag Segment Created**: Listens whenever a flag segment is created
  - **Flag Segment Updated**: Listens whenever a flag segment is updated
  - **Flag Segment Deleted**: Listens whenever a flag segment is deleted
  #### Firewall events
  Configurable webhooks listen to the following firewall-based events:
  - **Attack Detected**: Listens for when the [Vercel Firewall](/docs/vercel-firewall) detects and mitigates a [DDoS attack](/docs/vercel-firewall/ddos-mitigation)
  The events you select should depend on your use case and the workflow you want to implement.

- ### Choose your target projects
  ![Choose the scope of project(s) for webhooks.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/webhooks/project-scope.png)

  After selecting the event types, choose the scope of team projects for which webhooks will listen for events.

- ### Enter your endpoint URL
  The endpoint URL is the destination that triggers the events. All events are forwarded to this URL as a POST request. In case of an event, your webhook initiates an HTTP callback to this endpoint that you must configure to receive data. To be accessible, make sure these endpoint URLs are public.

  ![Define the endpoint URL for the webhooks to listen.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/webhooks/enter-endpoint-light.png)

  Once you have configured your webhook, click the **Create Webhook** button.

  The **Webhook Created** dialog will display a secret key, which won't be shown again. You should secure your webhooks by comparing the [`x-vercel-signature`](/docs/headers/request-headers#x-vercel-signature) header of an incoming request with this secret. For integration webhooks, use your Integration Secret (also called Client Secret) from the [Integration Console](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations%2Fconsole\&title=Go+to+Integrations+Console) instead. See [Securing webhooks](/docs/webhooks/webhooks-api#securing-webhooks) to learn how to do this.

  ![Confirmation to create the webhook.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/webhooks/webhook-created-light.png)

  Once complete, click **Done**.

  To view all your new and existing webhooks, go to the **Webhooks** section of your team's dashboard. To remove any webhook, click the cross icon next to the webhook. You can create and use up to 20 custom webhooks per team.

## Integration Webhooks

Webhooks can also be created through [Integrations](/docs/integrations). When [creating a new integration](/docs/integrations/create-integration), you can add webhooks using the [Integration Console](/dashboard/integrations/create). Inside your Integration's settings page locate the text field for setting the webhook URL. This is where you should add the HTTP endpoint to listen for events. Next, you can select one or more of these checkboxes to specify which events to listen to.

![Specifying the webhook URL and events to listen to.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/webhooks/webhooks-url-integrations-light.png)

For native integrations, you can also receive billing-related webhook events such as invoice creation, payment, and refunds. Learn more about [working with billing events through webhooks](/docs/integrations/create-integration/marketplace-api#working-with-billing-events-through-webhooks).

## Events

The webhook URL receives an HTTP POST request with a JSON payload for each event. All the events have the following format:

```json filename="webhook-payload"
{
  "id": "<eventId>",
  "type": "<event-type>",
  "createdAt": 1700000000000,
  "payload": {},
  "region": "<RegionId>"
}
```

`createdAt` is a JavaScript timestamp (milliseconds since epoch), and `payload` is an object whose fields depend on the event type.

Here's a [list of supported event types](/docs/webhooks/webhooks-api#supported-event-types) and their [`payload`](/docs/webhooks/webhooks-api#payload).


---

[View full sitemap](/docs/sitemap)
