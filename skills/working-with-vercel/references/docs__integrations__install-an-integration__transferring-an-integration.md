---
title: Transferring an Integration
product: vercel
url: /docs/integrations/install-an-integration/transferring-an-integration
canonical_url: "https://vercel.com/docs/integrations/install-an-integration/transferring-an-integration"
last_updated: 2026-05-05
type: how-to
prerequisites:
  - /docs/integrations/install-an-integration
  - /docs/integrations
related:
  - /docs/integrations/install-an-integration/product-integration
  - /docs/projects/transferring-projects
  - /docs/integrations/install-an-integration/add-a-connectable-account
  - /docs/integrations/install-an-integration/manage-integrations-reference
summary: Move your installation of a Native Integration from one Vercel team to another, including its resources and prepayment balances.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/install-an-integration/transferring-an-integration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "bfbd772df6866102bbd8ae40da627ec55c83d5e3a77e7cfe358dd6234c4b2bed"
---

# Transferring an Integration

You can transfer your installation of a [Native Integration](/docs/integrations/install-an-integration/product-integration) from one Vercel team to another. The transfer moves the installation, the resources it owns, and any prepayment balances and thresholds. Vercel also notifies the integration provider so they can update their own records.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How can I move a domain to a Vercel team?](https://vercel.com/kb/guide/how-can-i-move-a-domain-to-a-team?from=related) — Information on how to move domains between accounts on Vercel.
- [Transferring Domains to Vercel](https://vercel.com/kb/guide/transferring-domains-to-vercel?from=related) — How to transfer your domain to Vercel.
- [Native Integration Flows](https://vercel.com/docs/integrations/create-integration/marketplace-flows?from=related) — Learn how information flows between the integration user, Vercel, and the integration provider for Vercel native integra
- [Native integration concepts](https://vercel.com/docs/integrations/create-integration/native-integration?from=related) — As an integration provider, understanding how your service interacts with Vercel's platform will help you create and opt
- [Transferring Domains](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain?from=related) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t
- [Create an Integration](https://vercel.com/docs/integrations/create-integration?from=related) — Learn how to create and manage your own integration for internal or public use with Vercel.
- [Requirements for listing an Integration](https://vercel.com/docs/integrations/create-integration/submit-integration?from=related) — Learn about all the requirements and guidelines needed when creating your Integration.

Full cross-link map for this page: [/docs/integrations/install-an-integration/transferring-an-integration.graph.md](/docs/integrations/install-an-integration/transferring-an-integration.graph.md)
<!-- /docsgraph:related -->

This page covers transfers you start from the integration's Manage page. If you only need to move a single resource (for example, one database) instead of the whole installation, see [Transfer a resource to another team](/docs/integrations/install-an-integration/product-integration#transfer-a-resource-to-another-team). To move a project that depends on an integration, see [Transferring projects](/docs/projects/transferring-projects).

## Before you start

Make sure each of the following is true. If any check fails, you see an error and the transfer does not proceed.

| Check | Where to fix it |
| --- | --- |
| You are an Owner or Member of the **target** team | Ask a team Owner to add you |
| Your role on the **source** team allows you to remove this integration | Ask a team Owner to update your role |
| The integration is a Native Integration, not a [Connectable Account](/docs/integrations/install-an-integration/add-a-connectable-account) | Connectable accounts cannot use this flow |
| The integration supports transfer | Some integrations do not support transfer. Contact the integration provider |
| The target team does not already have this integration installed | Uninstall it on the target team first |
| No active project on the source team is connected to a resource owned by this integration | Disconnect each project from each resource before starting |
| The source team has no unpaid invoices for this integration | Pay or void any open invoices |
| No integration store on the source team has a name that conflicts with an existing resource on the target team | Rename the conflicting resource on the target team |
| For paid integrations, the target team has a payment method on file | Add a payment method in the target team's billing settings |

**If the Transfer Integration section does not appear** on the integration's Settings page, the integration does not support transfer.

**If the Transfer Integration button is disabled**, your role on the source team does not allow transferring this integration. Hover the button for the exact reason, then ask a team Owner to update your role.

**If the button works but you see "Feature not enabled for your team"** after confirming the transfer, the marketplace transfer feature is not enabled for your source team. Contact [Vercel Support](/help) to request access.

## What happens to your projects

Because the transfer requires you to disconnect every project from this integration's resources before starting, projects on the source team lose access to the integration as you disconnect them. Vercel removes the integration's environment variables from each disconnected project.

Existing production deployments keep running with whatever environment variables they were built with, but new deployments fail until you reconnect the projects to the integration on the target team.

After the transfer, reconnect each project to the integration on the target team to restore environment variables and resource access.

## Transfer the integration

1. From your Vercel [dashboard](/dashboard), select the source team in the team switcher.
2. Open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in the sidebar.
3. Next to the integration you want to transfer, select **Manage**.
4. Open **Settings** in the side navigation and scroll to the **Transfer Integration** section.
5. Select **Transfer Integration**.
6. In the dialog, choose the target team and select **Continue**.
7. If the dialog asks you to select a payment method, pick one on the target team and select **Continue**. Vercel uses this payment method for future charges on the transferred installation. Free or unbilled integrations skip this step.
8. To confirm, type the integration slug shown in the dialog, then type `transfer my integration`. Select **Continue**.
9. Wait for the transfer to complete. Vercel sends you back to the source team's Integrations list. Switch to the target team to see the moved installation.

## What does not move

| Item | What happens |
| --- | --- |
| Source-team project connections | The transfer is blocked while any project is still connected to a resource owned by this integration. After you disconnect every project and the transfer completes, no project connections remain. Reconnect your projects on the target team to continue using the resources |
| Source-team payment method | Stays on the source team. Vercel does not copy it to the target team |
| OpenTelemetry endpoints the integration provisioned | Vercel deletes them. The integration provider can recreate them on the target team |
| Historical usage data | Stays with the source team for billing reconciliation |
| Existing administrators on the integration | Reset to a single owner on the target team |

## Related

- [Add a Native Integration](/docs/integrations/install-an-integration/product-integration)
- [Transfer a resource to another team](/docs/integrations/install-an-integration/product-integration#transfer-a-resource-to-another-team)
- [Transferring projects](/docs/projects/transferring-projects)
- [Permissions and Access](/docs/integrations/install-an-integration/manage-integrations-reference)


---

[View full sitemap](/docs/sitemap)
