---
title: Deployment integration actions
product: vercel
url: /docs/integrations/create-integration/deployment-integration-action
canonical_url: "https://vercel.com/docs/integrations/create-integration/deployment-integration-action"
last_updated: 2025-07-18
type: how-to
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  - /docs/integrations/create-integration/native-integration
  - /docs/checks
  - /docs/integrations/create-integration/marketplace-product
  - /docs/rest-api
  - /docs/rest-api/deployments/update-deployment-integration-action
summary: These actions allow integration providers to set up automated tasks with Vercel deployments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/deployment-integration-action.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "43ad511d150bafda107307b0931759928bc35a010757309009467e38fa40dbbe"
---

# Deployment integration actions

With deployment integration actions, integration providers can enable [integration resource](/docs/integrations/create-integration/native-integration#resources) tasks to be performed such as branching a database, setting environment variables, and running readiness checks. It then allows integration users to configure and trigger these actions automatically during a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel?from=related) — Learn how to deploy based on tags/releases on Vercel.
- [Actions](https://vercel.com/docs/platforms/platform-elements/actions?from=related) — Server actions you can install to run common platform tasks against the Vercel API.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Webhooks API Reference](https://vercel.com/docs/webhooks/webhooks-api?from=related) — Vercel Integrations allow you to subscribe to certain trigger-based events through webhooks. Learn about the supported w
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration?from=related) — Learn how you can add a product to your Vercel project through a native integration.

Full cross-link map for this page: [/docs/integrations/create-integration/deployment-integration-action.graph.md](/docs/integrations/create-integration/deployment-integration-action.graph.md)
<!-- /docsgraph:related -->

For example, you can use deployment integration actions with the checks API to [create integrations](/docs/checks#build-your-checks-integration) that provide testing functionality to deployments.

## How deployment actions work

1. Action declaration:
   - An integration [product](/docs/integrations/create-integration/native-integration#resources) declares deployment actions with an ID, name, and metadata.
   - Actions can specify configuration options that integration users can modify.
   - Actions can include suggestions for default actions to run such as "this action should be run on previews".

2. Project configuration:
   - When a resource is connected to a project, integration users select which actions should be triggered during deployments.
   - Integration users are also presented with suggestions on what actions to run if these were configured in the action declaration.

3. Deployment execution:
   - When a deployment is created, the configured actions are registered on the deployment.
   - The registered actions trigger the `deployment.integration.action.start` webhook.
   - If a deployment is canceled, the `deployment.integration.action.cancel` webhook is triggered.

4. Resource-side processing:
   - The integration provider processes the webhook, executing the necessary resource-side actions such as creating a database branch.
   - During the processing of these actions, the build is blocked and the deployment set in a provisioning state.
   - Once complete, the integration provider updates the action status.

5. Deployment unblock:
   - Vercel validates the completed action, updates environment variables, and unblocks the deployment.

## Creating deployment actions

As an integration provider, to allow your integration users to add deployment actions to an installed native integration, follow these steps:

- ### Declare deployment actions
  Declare the deployment actions for your native integration product.
  1. Open the Integration Console.
  2. Select your Marketplace integration and click **Manage**.
  3. Edit an existing product or create a new one.
  4. Go to **Deployment Actions** in the left-side menu.
  5. Create an action by assigning it a slug and a name.
  Next, handle webhook events and perform API actions in your [integration server](/docs/integrations/create-integration/marketplace-product#deploy-the-integration-server). Review the [example marketplace integration server](https://github.com/vercel/example-marketplace-integration) code repository.

- ### Handle the deployment start
  Handle the `deployment.integration.action.start` webhook. This webhook triggers when a deployment starts an action.

  This is a webhook payload example:
  ```json
  {
    "installationId": "icfg_1234567",
    "action": "branch",
    "resourceId": "abc-def-1334",
    "deployment": { "id": "dpl_568301234" }
  }
  ```
  This payload provides IDs for the installation, action, resource, and deployment.

- ### Use the Get Deployment API
  You can retrieve additional deployment details using the [Get a deployment by ID or URL](https://vercel.com/docs/rest-api#tag/deployments/get-a-deployment-by-id-or-url) endpoint:
  ```bash
  curl https://api.vercel.com/v13/deployments/dpl_568301234 \
    -H "Authorization: {access_token}"
  ```
  You can create your `access_token` from [Vercel's account settings](/docs/rest-api#creating-an-access-token).

  Review the [full code](https://github.com/vercel/example-marketplace-integration/blob/6d2372b8afdab36a0c7f42e1c5a4f0deb2c496c1/app/dashboard/webhook-events/actions.tsx) for handling the deployment start in the example marketplace integration server.

- ### Complete a deployment action
  Once an action is processed, update its status using the [Update Deployment Integration Action](/docs/rest-api/deployments/update-deployment-integration-action) REST API endpoint.

  Example request to this endpoint:
  ```bash
  PATCH https://api.vercel.com/v1/deployments/{deploymentId}/integrations/{installationId}/resources/{resourceId}/actions/{action}
  ```
  Example request body to send that includes the resulting updated resource secrets:
  ```json
  {
    "status": "succeeded",
    "outcomes": [
      {
        "kind": "resource-secrets",
        "secrets": [{ "name": "TOP_SECRET", "value": "****" }]
      }
    ]
  }
  ```

- ### Handle deployment cancellation
  When a deployment is canceled, the `deployment.integration.action.cancel` webhook is triggered. You should handle this action to clean up any partially completed actions.

  Use the `deployment.integration.action.cleanup` webhook to clean up any persistent state linked to the deployment. It's triggered when a deployment is removed from the system.


---

[View full sitemap](/docs/sitemap)
