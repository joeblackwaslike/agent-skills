---
title: Vercel Integrations
product: vercel
url: /docs/integrations
canonical_url: "https://vercel.com/docs/integrations"
last_updated: 2026-06-22
type: conceptual
prerequisites:
  []
related:
  - /docs/storage
  - /docs/agent-resources/integrations-for-models
  - /docs/connect
  - /docs/integrations/install-an-integration/product-integration
  - /docs/cli/integration
summary: "Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless content, commerce, and more."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "a245a2afcb02913ad876c4d22715a719991271f9e6e02e8f73bda7edecd4a36f"
---

# Vercel Integrations

Integrations allow you to extend the capabilities of Vercel by connecting with third-party platforms or services to do things like:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Give your agents secure access to third-party APIs](https://vercel.com/kb/guide/vercel-connect?from=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Discord, Notion, Figma, Snowflake, and Salesforce f
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Marketplace](https://vercel.com/docs/marketplace-storage?from=related) — Connect Postgres, Redis, NoSQL, and other storage solutions through the Vercel Marketplace. Run SQL queries, edit data,
- [Integrations for Agents](https://vercel.com/docs/agent-resources/integrations-for-agents?from=related) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Deep Infra](https://vercel.com/docs/agent-resources/integrations-for-models/deepinfra?from=related) — Learn how to add the Deep Infra native integration with Vercel.
- [Audit Logs](https://vercel.com/docs/audit-log?from=related) — Learn how to track and analyze your team members' activities.
- [Checks](https://vercel.com/docs/checks?from=related) — Vercel automatically keeps an eye on various aspects of your web application using the Checks API. Learn how to use Chec

Full cross-link map for this page: [/docs/integrations.graph.md](/docs/integrations.graph.md)
<!-- /docsgraph:related -->

- Work with [storage](/docs/storage) products from third-party solutions
- Connect with external [AI](/docs/agent-resources/integrations-for-models) services
- Send logs to services
- Integrate with testing tools
- Connect your CMS and ecommerce platform

If you need delegated, runtime credentials for agent workflows, see [Vercel Connect](/docs/connect).

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
- [Shopify](/kb/guide/deploy-headless-shopify-storefront-with-vercel)
- [Kubernetes](/docs/integrations/external-platforms/kubernetes)
- [Lovable](/docs/integrations/lovable)


---

[View full sitemap](/docs/sitemap)
