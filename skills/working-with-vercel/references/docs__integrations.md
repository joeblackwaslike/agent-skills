---
title: Vercel Integrations
product: vercel
url: /docs/integrations
canonical_url: "https://vercel.com/docs/integrations"
last_updated: 2026-09-17
type: conceptual
prerequisites:
  []
related:
  - /docs/storage
  - /docs/agent-resources/integrations-for-models
  - /docs/connect
  - /docs/integrations/install-an-integration/product-integration
  - /docs/marketplace-storage
summary: "Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless content, commerce, and more."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "88ab626d56bb748647c30125aad64a136998baf61e23228b5a404d99c5043ac7"
---

# Vercel Integrations

Integrations allow you to extend the capabilities of Vercel by connecting with third-party platforms or services to do things like:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [AI Integrations and playground in the Vercel Dashboard](https://vercel.com/changelog/ai-integration-and-playground-in-the-vercel-dashboard)
- [Install Marketplace Integrations from the Vercel CLI](https://vercel.com/changelog/install-marketplace-integrations-from-the-vercel-cli)
- [Integration Webhooks are now easier to configure](https://vercel.com/changelog/integration-webhooks-are-now-easier-to-configure)
- [Integrations can now be managed more efficiently](https://vercel.com/changelog/integrations-can-now-be-managed-more-efficiently)
- [Improvements and fixes](https://vercel.com/changelog/may-2022-papercuts)
- [Build a Claude Managed Agent with Vercel Workflow](https://vercel.com/kb/guide/claude-managed-agent-vercel) — Learn how to build a Claude Managed Agent on Vercel with auth, credential vaults, durable polling, and a chat UI.
- [Build Claude Managed Agents with Chat SDK](https://vercel.com/kb/guide/claude-managed-agents-chat-sdk) — Ship a Slack research bot built on Claude Managed Agents and Chat SDK. One persistent session per thread, streamed brief
- [Build Claude Managed Agents with Vercel Services](https://vercel.com/kb/guide/claude-managed-agents-vercel-services) — Deploy Claude Managed Agents with Vercel Services to run a streaming research analyst in a browser chat, using Anthropic
- [Debug and Troubleshoot Logs with Vercel and Sematext](https://vercel.com/kb/guide/debugging-and-troubleshooting-vercel-logs-with-sematext) — Automatically send all Vercel logs to Sematext to understand how your application is running.
- [Give your eve agent an email inbox with Resend](https://vercel.com/kb/guide/eve-agent-with-resend) — Connect an eve agent to email using the Chat SDK channel and the Resend adapter. Handle inbound email, threaded replies,
- [Expanding observability on Vercel](https://vercel.com/blog/expanding-observability-on-vercel)
- [Supercharge your Vercel Projects with Integrations](https://vercel.com/blog/integrations-marketplace)

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

Native integrations allow a two-way connection between Vercel and third-parties Vercel has partnered with. These native integrations provide the option to subscribe to products through the Vercel dashboard.

Native integrations provide the following benefits:

- You **don't** have to create an account on the integration provider's site.
- For each available product, you can choose the billing plan suitable for your needs through the Vercel dashboard.
- The billing is managed through your Vercel account.

### Get started with native integrations

As a Vercel customer:

- [**Extend your Vercel workflow**](/docs/integrations/install-an-integration/product-integration): You can install an integration from the marketplace and add the product that fits your need.
- [**Use a resource in a Custom Environment**](/docs/marketplace-storage#use-a-marketplace-resource-in-a-custom-environment): Connect a Native Marketplace resource to an exact Custom Environment and verify the variable scope.
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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
