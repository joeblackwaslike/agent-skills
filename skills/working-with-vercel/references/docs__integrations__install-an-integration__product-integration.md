---
title: Add a Native Integration
product: vercel
url: /docs/integrations/install-an-integration/product-integration
canonical_url: "https://vercel.com/docs/integrations/install-an-integration/product-integration"
last_updated: 2026-05-05
type: how-to
prerequisites:
  - /docs/integrations/install-an-integration
  - /docs/integrations
related:
  - /docs/cli/integration
  - /docs/integrations/install-an-integration/secure-your-resource
  - /docs/integrations/create-integration/billing
  - /docs/rbac/access-roles
  - /docs/integrations/create-integration/deployment-integration-action
summary: Learn how you can add a product to your Vercel project through a native integration.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/install-an-integration/product-integration.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5cc923c09f6388f8a67e039a7808ff0d47506f7ed6b715a9eb0e835036b06f6c"
---

# Add a Native Integration

> **🔒 Permissions Required**: Native Integrations

## Add a product

1. From the [Vercel dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in the sidebar and then the **Browse Marketplace** button. You can also go directly to the [Integrations Marketplace](https://vercel.com/integrations).
2. Under the **Native Integrations** section, select an integration that you would like to install. You can see the details of the integration, the products available, and the pricing plans for each product.
3. From the integration's detail page, select **Install**.
4. Review the dialog showing the products available for this integration and a summary of the billing plans for each. Select **Install**.
5. Then, select a pricing plan option and select **Continue**. The specific options available in this step depend on the type of product and the integration provider. For example, for a storage database product, you may need to select a **Region** for your database deployment before you can select a plan. For an AI service, you may need to select a pre-payment billing plan.
6. Provide additional information in the next step like **Database Name**. Review the details and select **Create**. Once the integration has been installed, you are taken to the relevant integration page in the Vercel dashboard. For a storage product, this is **Storage** in the sidebar. You will see details about the database, pricing plan, and connection steps for your project.

### Using the CLI

You can install integrations and provision resources directly from the command line using [`vercel integration add`](/docs/cli/integration#vercel-integration-add). In the example command below, you install a [Neon integration](/marketplace/neon):

```bash filename="terminal"
vercel integration add neon
```

The CLI supports both interactive and non-interactive workflows. For non-interactive usage (useful for CI pipelines and AI agents), provide options as flags:

```bash filename="terminal"
vercel integration add neon --name my-database --plan pro -e production -e preview
```

Run `vercel integration add <integration-name> --help` to see integration-specific options like available metadata keys and billing plans.

See the [CLI reference](/docs/cli/integration#vercel-integration-add) for the full list of options.

## Manage native integrations

Once installed, you can manage the following aspect of the native integration:

- View the installed resources (instances of products) and then manage each resource.
- Connect project(s) to a provisioned resource. For products supporting Log Drains, you can enable them and configure which log sources to forward and the sampling rate.
- [Secure your resource](/docs/integrations/install-an-integration/secure-your-resource) by controlling allowed environments and protecting credentials.
- View the invoices and usage for each of your provisioned resources in that installation. See [Billing](/docs/integrations/create-integration/billing) for details on invoice lifecycle, pricing structures, and refunds.
- [Uninstall the integration](/docs/integrations/install-an-integration/product-integration#uninstall-an-integration)

### Manage products

To manage products inside the installed integration:

1. From your Vercel [dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in the sidebar.
2. Next to the integration, select the **Manage** button. Native integrations appear with a `billable` badge.
3. On the Integrations page, under **Installed Products**, select the card for the product you would like to update to be taken to the product's detail page.

#### Projects

By selecting the **Projects** link on the left navigation, you can:

- Connect a project to the product
- View a list of existing connections and manage them

#### Settings

By selecting the **Settings** link on the left navigation, you can update the following:

- Product name
- Manage funds: if you selected a prepaid plan for the product, you can **Add funds** and manage auto recharge settings
- Delete the product
- [Transfer a resource to another team](#transfer-a-resource-to-another-team): for integrations that support transfers, move a resource to a different team

#### Transfer a resource to another team

For native integrations that support resource transfers, you can move a resource to a different team without deleting and recreating it. The destination team becomes responsible for all future billing. This action is not reversible.

Before you start:

- You must be an Owner or Member on both the source and destination teams. See [access roles](/docs/rbac/access-roles) for details
- The destination team must already have the same integration installed
- Disconnect all projects from the resource using the [**Projects**](#projects) link in the left navigation

To transfer a resource:

1. Select the **Settings** link in the left navigation for the resource you want to transfer
2. Under **Transfer Database**, select **Transfer Database**
3. Select the destination team from the dropdown. Teams without the integration installed appear disabled
4. Type the values from the confirmation dialog: the resource name, the source team slug, and the destination team slug
5. Check the acknowledgment checkbox, then select **Transfer**

After the transfer completes, you'll see the resource under the destination team's integration. To start using it, [connect it to a project](#projects) on the destination team.

#### Getting Started

By selecting the **Getting Started** link on the left navigation, you can view quick steps with sample code on how to use the product in your project.

#### Usage

By selecting the **Usage** link on the left navigation, you can view a graph of the funds used over time by this product in all the projects where it was installed.

#### Resources

Under **Resources** on the left navigation, you can view a list of links which vary depending on the provider for support, guides and additional resources to help you use the product.

### Add more products

To add more products to this integration:

1. From your Vercel [dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in the sidebar.
2. Next to the integration, select the **Manage** button. Native integrations appear with a `billable` badge.
3. On the Integrations page, under **More Products**, select the **Install** button for any additional products in that integration that you want to use.

### Uninstall an integration

Uninstalling an integration automatically removes all associated products and their data.

1. From your Vercel [dashboard](/dashboard), open [**Integrations**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fintegrations\&title=Go+to+Integrations) in the sidebar.
2. Next to the integration, select the **Manage** button.
3. At the bottom of the integrations page, under **Uninstall**, select **Uninstall Integration** and follow the steps to uninstall.

## Set a custom environment variable prefix

When you connect a resource to a project, Vercel creates environment variables from the resource's credentials. By default, these variables use the names provided by the integration (for example, `PGHOST`, `PGPASSWORD`).

If you connect multiple resources of the same type to one project, or need to avoid naming conflicts, you can set a custom prefix:

1. From the resource's detail page, select the **Projects** tab.
2. Select **Connect Project** and choose the project.
3. In the **Custom Prefix** field, enter your prefix (for example, `DB1`).
4. Select **Connect**.

The prefix is prepended to each environment variable name with an underscore separator. For example, with a prefix of `DB1`:

| Original variable | Prefixed variable |
| ----------------- | ----------------- |
| `PGHOST`          | `DB1_PGHOST`      |
| `PGPASSWORD`      | `DB1_PGPASSWORD`  |

Prefixes must start with a letter and can only contain letters, numbers, and underscores. If an integration provider includes hyphens or spaces in a prefix, Vercel normalizes them to underscores.

This is useful when a project connects to two databases from the same provider. You can set `PRIMARY` as the prefix for one connection and `REPLICA` for the other so that each set of credentials has its own namespace.

## Use deployment integration actions

If available in the integration you want to install, [deployment integration actions](/docs/integrations/create-integration/deployment-integration-action) enable automatic task execution during deployment, such as branching a database or setting environment variables.

1. Navigate to the integration and use **Install Product** or use an existing provisioned resource.
2. Open the **Projects** section in the sidebar for the provisioned resource, click **Connect Project** and select the project for which to configure deployment actions.
3. When you create a deployment (with a Git pull request or the Vercel CLI), the configured actions will execute automatically.

## Best practices

- Plan your product strategy: Decide whether you need separate products for different projects or environments:
  - Single resource strategy: For example, a small startup can use a single storage instance for all their Vercel projects to simplify management.
  - Per-project resources strategy: For example, an enterprise with multiple product lines can use separate storage instances for each project for better performance and security.
  - Environment-specific resources strategy: For example, a company can use different storage instances for each environment to ensure data integrity.
- Monitor Usage: Take advantage of per-product usage tracking to optimize costs and performance by using the **Usage** and **Invoices** section in the sidebars of the [product's settings page](/docs/integrations/install-an-integration/product-integration#manage-products). Learn more about [billing](/docs/integrations/create-integration/billing) for native integrations.


---

[View full sitemap](/docs/sitemap)
