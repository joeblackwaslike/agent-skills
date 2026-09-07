---
title: Upgrade an Integration
product: vercel
url: /docs/integrations/create-integration/upgrade-integration
canonical_url: "https://vercel.com/docs/integrations/create-integration/upgrade-integration"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  - /docs/integrations/create-integration/submit-integration
  - /docs/webhooks/webhooks-api
  - /docs/integrations/create-integration
  - /docs/deploy-button
  - /docs/integrations/create-integration/marketplace-product
summary: Lean more about when you may need to upgrade your Integration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/upgrade-integration.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "bb1f0a20873a299726a188ea9b94888aa980b13d913f6e4106a6a77334e6975a"
---

# Upgrade an Integration

You should upgrade your integration if you are using any of the following scenarios.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Integration Webhooks are now easier to configure](https://vercel.com/changelog/integration-webhooks-are-now-easier-to-configure?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related)
- [Integrations can now be managed more efficiently](https://vercel.com/changelog/integrations-can-now-be-managed-more-efficiently?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related)
- [July 2020](https://vercel.com/blog/changelog-july-2020?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related)
- [Integration Approval Checklist](https://vercel.com/docs/integrations/create-integration/approval-checklist?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related) — Review this checklist before submitting your native or connectable account integration for approval on the Vercel Market
- [Permissions and Access](https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related) — Learn how to manage project access and added products for your integrations.
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related) — Learn how you can add a product to your Vercel project through a native integration.
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Native integration concepts](https://vercel.com/docs/integrations/create-integration/native-integration?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=related) — As an integration provider, understanding how your service interacts with Vercel's platform will help you create and opt

Full cross-link map for this page: [/docs/integrations/create-integration/upgrade-integration.graph.md](/docs/integrations/create-integration/upgrade-integration.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Fcreate-integration%2Fupgrade-integration&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Upgrading your Integration

If your Integration is using outdated features on the Vercel Platform, [follow these guidelines](/docs/integrations/create-integration/upgrade-integration#upgrading-your-integration) to upgrade your Integration and use the latest features.

Once ready, make sure to [submit your Integration](/docs/integrations/create-integration/submit-integration) for review after you upgraded it.

## Use generic Webhooks

You can now specify a generic Webhook URL in your Integration settings. Use generic Webhooks instead of Webhooks APIs and Delete Hooks.

The Vercel REST API to list, create, and delete Webhooks [has been removed](https://vercel.com/changelog/sunsetting-ui-hooks-and-legacy-webhooks). There's also no support for Delete Hooks which are notified on Integration Configuration removal. If you have been using either or both features, you need to update your Integration.

### Using Webhooks APIs but not a Delete Hook

Check your code to see if you are listing, creating, or deleting Webhooks through the Vercel REST API. These Webhooks APIs [have removed on August 20th, 2021](https://vercel.com/changelog/sunsetting-ui-hooks-and-legacy-webhooks).

If you were creating a Webhook by sending a `POST` request to `/v1/integrations/webhooks`, these requests should be removed:

1. Copy the Webhook URL that was specified through the Webhooks API and set it as the Webhook URL in your Integration settings.
2. Turn on checkboxes corresponding to the event types that were previously specified through the API (Deployment Created, Deployment Ready, or Deployment Error).

You should also remove `GET` and `DELETE` requests to `/v1/integrations/webhooks` as well.

### Using a Delete Hook but not Webhooks APIs

Check your Integration settings. If a Delete Hook URL was set, it is now set as a generic Webhook URL, and "Integration Removed" is turned on.

`DELETE` requests are no longer sent since August 20th, 2021.

To update, modify your existing Delete Hook endpoint such that:

- It accepts a `POST` request instead of a `DELETE` request. If it receives a `DELETE` request, it should be ignored.
- It accepts a request body that has the [Webhook Event JSON](/docs/webhooks/webhooks-api#supported-event-types) format, which is of type [`integration-configuration.removed`](/docs/webhooks/webhooks-api#integration-configuration.removed) and contains a `payload` key containing a `configuration` object as explained in our [integration configuration](/docs/webhooks/webhooks-api#integration-configuration.removed) documentation.

### Using both Webhook APIs and a Delete Hook

You need to consolidate both endpoints (a Webhook URL and a Delete Hook URL) into a single Webhook URL that can handle both types of events (deployment related events and [`integration-configuration.removed`](/docs/webhooks/webhooks-api#integration-configuration.removed) events.

## Use External Flow

If your Integration is using the OAuth2 installation flow, you should use the [External installation flow](/docs/integrations/create-integration/submit-integration#external-installation-flow) instead. By using the External flow, users will be able to choose which Vercel scope (Personal Account or Team) to install your Integration to.

Replace the OAuth2 entrypoint:

```javascript
https://vercel.com/oauth/authorize?client_id=…&state=…
```

With this URL, using your Integration slug:

```javascript
https://vercel.com/integrations/:slug/new?state=…
```

## Use your own UI

UI Hooks is a deprecated feature that allowed you to create custom configuration UI for your Integration inside the Vercel dashboard. If your Integration is using UI Hooks, you should build your own UI instead.

### Remove UI Hooks code

If you are using UI Hooks, you’d have installed the `@vercel/integration-utils` package. Remove this package and all the code referencing it.

### Build your own UI

Build your own UI by following [our guide](/docs/integrations/create-integration) and [our example Integration](https://github.com/vercel/example-integration).

Once that's done, specify the [Redirect URL](/docs/integrations/create-integration/submit-integration#redirect-url) and remove the UI Hooks URL in your Integration settings.

> **💡 Note:** Once you remove the UI Hooks URL, you won’t be able to add it back again. The
> UI Hooks URL field will no longer be visible.

## Legacy Integrations

Integration that use UI Hooks are now [fully deprecated](https://vercel.com/changelog/sunsetting-ui-hooks-and-legacy-webhooks). Users are not able to install them anymore.

If you are using a Legacy Integrations, it's recommended finding an updated Integration on the [Integrations Marketplace](https://vercel.com/integrations).
If adequate replacement is not available, contact the integration developer for more information.

## `currentProjectId` in Deploy Button

If your Integration is not using `currentProjectId` to determine the target project for the Deploy Button flow, please use it. [Here’s the documentation](/docs/deploy-button).

## Single installation per scope

If your Integration assumes that it can be installed multiple times in a Vercel scope (Hobby team or team), read the following so that it can support single installation per scope for each flow:

- [Marketplace flow](/docs/integrations/create-integration/marketplace-product)
- [External flow](/docs/integrations/create-integration/submit-integration#external-installation-flow)
- [Deploy Button flow](/docs/deploy-button)

## Latest API for Environment Variables

If your Integration is setting Environment Variables, please make sure to use `type=encrypted` with the latest version (v7) of the API when [creating Environment Variables for a Project](/docs/rest-api/projects/create-one-or-more-environment-variables).

> **💡 Note:** Creating project secrets is not required anymore and will be deprecated in the
> near future.


---

[View full sitemap](/docs/sitemap)
