---
title: Vercel Integrations
product: vercel
url: /docs/integrations
canonical_url: "https://vercel.com/docs/integrations"
last_updated: 2026-05-26
type: conceptual
prerequisites:
  []
related:
  - /docs/storage
  - /docs/agent-resources/integrations-for-models
  - /docs/integrations/install-an-integration/product-integration
  - /docs/cli/integration
  - /docs/agent-resources/integrations-for-models/adding-a-provider
summary: "Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless content, commerce, and more."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5cabdd796a157f7dcc70adcdf075fdc7713684fc043e7f7cd522e101d11ed0cd"
---

# Vercel Integrations

Integrations allow you to extend the capabilities of Vercel by connecting with third-party platforms or services to do things like:

- Work with [storage](/docs/storage) products from third-party solutions
- Connect with external [AI](/docs/agent-resources/integrations-for-models) services
- Send logs to services
- Integrate with testing tools
- Connect your CMS and ecommerce platform

To extend and automate your workflow, the [Vercel Marketplace](https://vercel.com/marketplace) page provides you with two types of integrations, depending on your needs:

- [Native integrations](/docs/integrations#native-integrations)
- [Connectable accounts](/docs/integrations#connectable-accounts)

## Native integrations

Native integrations allow a two-way connection between Vercel and third-parties Vercel has partnered with. These native integrations provide the option to subscribe to  through the Vercel dashboard.

Native integrations provide the following benefits:

- You **don't** have to create an account on the integration provider's site.
- For each available , you can choose the billing plan suitable for your needs through the Vercel dashboard.
- The billing is managed through your Vercel account.

### Get started with native integrations

As a Vercel customer:

- [**Extend your Vercel workflow**](/docs/integrations/install-an-integration/product-integration): You can install an integration from the marketplace and add the product that fits your need.
- [**Use the CLI**](/docs/cli/integration): Install integrations and provision resources from the command line with `vercel integration add`. Supports scripted usage for CI pipelines and AI agents.
- View the [list of available native integrations](#native-integrations-list).
- [**Add an AI provider**](/docs/agent-resources/integrations-for-models/adding-a-provider): You can add a provider to your Vercel workflow.
- [**Add an AI model**](/docs/agent-resources/integrations-for-models/adding-a-model): You can add a model to your Vercel workflow.

As a Vercel provider:

- [**Integrate with Vercel**](/docs/integrations/create-integration/native-integration): You can create an integration and make different products from your third-party service available for purchase to Vercel customers through the marketplace.

## Connectable accounts

These integrations allow you to connect Vercel with an existing account on a third-party platform or service and provide you with features and environment variables that enable seamless integration with the third party.

When you add a connectable account integration through the Vercel dashboard, you are prompted to log in to your account on the third-party platform.

### Get started with connectable account integrations

- [**Add a connectable account**](/docs/integrations/install-an-integration/add-a-connectable-account): As a Vercel customer, you can integrate various tools into your Vercel workflow.
- [**Integrate with Vercel**](/docs/integrations/create-integration): You can extend the Vercel platform through traditional integrations, guides, and templates that you can distribute privately, or host on the Vercel Marketplace
- View the [list of available connectable account integrations](#connectable-account-integrations-list).

## Native integrations list

## Connectable account integrations list

## Integrations guides

- [Contentful](/docs/integrations/cms/contentful)
- [Sanity](/docs/integrations/cms/sanity)
- [Sitecore XM Cloud](/docs/integrations/cms/sitecore)
- [Shopify](/docs/integrations/ecommerce/shopify)
- [Kubernetes](/docs/integrations/external-platforms/kubernetes)


---

[View full sitemap](/docs/sitemap)
