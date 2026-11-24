---
title: Install an Integration
product: vercel
url: /docs/integrations/install-an-integration
canonical_url: "https://vercel.com/docs/integrations/install-an-integration"
last_updated: 2026-09-11
type: conceptual
prerequisites:
  - /docs/integrations
related:
  - /docs/integrations/install-an-integration/add-a-connectable-account
  - /docs/integrations/install-an-integration/product-integration
  - /docs/cli/integration
  - /docs/integrations/install-an-integration/agent-tools
  - /docs/integrations/install-an-integration/manage-integrations-reference
summary: "Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing tools, connect to your CMS,..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/install-an-integration.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "d34b7a7c572a090797aa3807dd2a594f29fb51c7464411f38352c837224cf1c0"
---

# Install an Integration

## Installing an integration

Using Vercel doesn't stop at the products and features that we provide. Through integrations, you can use third-party platforms or services to extend the capabilities of Vercel by:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Integrations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations) — Vercel MCP tools for integrations.
- [vercel install](https://vercel.com/docs/cli/install) — Learn how to install marketplace native integrations and provision resources with the vercel install CLI command.
- [Native integration concepts](https://vercel.com/docs/integrations/create-integration/native-integration) — As an integration provider, understanding how your service interacts with Vercel's platform will help you create and opt
- [Create a Native Integration](https://vercel.com/docs/integrations/create-integration/marketplace-product) — Learn how to create a product for your Vercel native integration
- [Integration Approval Checklist](https://vercel.com/docs/integrations/create-integration/approval-checklist) — Review this checklist before submitting your native or connectable account integration for approval on the Vercel Market

Full cross-link map for this page: [/docs/integrations/install-an-integration.graph.md](/docs/integrations/install-an-integration.graph.md)
<!-- /docsgraph:related -->

- Connecting your Vercel account and project with a third-party service. See [Add a connectable account](/docs/integrations/install-an-integration/add-a-connectable-account) to learn more.
- Buying or subscribing to a product with a third-party service that you will use with your Vercel project. See [Add a Native Integration](/docs/integrations/install-an-integration/product-integration) to learn more.
- Installing and provisioning resources from the command line. See [`vercel integration add`](/docs/cli/integration#vercel-integration-add) to learn more.
- Interacting with your installed integrations through a chat interface. See [Agent Tools](/docs/integrations/install-an-integration/agent-tools) to learn more.

## Find integrations

You can extend the Vercel platform through the [Marketplace](#marketplace), [templates](#templates), or [third-party site](#third-party-site).

### Marketplace

The [Integrations Marketplace](https://vercel.com/integrations) is the best way to find suitable integrations that fit into a variety of workflows including [monitoring](/integrations#monitoring), [databases](https://vercel.com/integrations#databases), [CMS](https://vercel.com/integrations#cms), [DevTools](https://vercel.com/integrations#dev-tools), [Testing with the checks API](/marketplace/category/testing), and more.

> Install the [Vercel plugin](/docs/agent-resources/vercel-plugin?from=docs-callout\&source_path=%2Fdocs%2Fintegrations%2Finstall-an-integration) to discover and install Marketplace integrations with your coding agent.
>
> ```bash
> npx plugins add vercel/vercel-plugin
> ```

You have access to two types of integrations:

- **Native integrations** that include products that you can buy and use in your Vercel project after you installed the integration
- **Connectable accounts** that allow you to connect third-party services to your Vercel project

Once installed, you can interact with native integrations through [Agent Tools](/docs/integrations/install-an-integration/agent-tools).

- [Permissions and Access](/docs/integrations/install-an-integration/manage-integrations-reference)
- [Add a Native Integration](/docs/integrations/install-an-integration/product-integration)
- [Secure Your Resource](/docs/integrations/install-an-integration/secure-your-resource)
- [Transferring an Integration](/docs/integrations/install-an-integration/transferring-an-integration)
- [Billing](/docs/integrations/create-integration/billing)
- [Agent Tools](/docs/integrations/install-an-integration/agent-tools)

### Templates

You can use one of our verified and pre-built [templates](/templates) to learn more about integrating your favorite tools and get a quickstart on development. When you deploy a template using the [Deploy Button](/docs/deploy-button), the deployment may prompt you to install related integrations to connect with a third-party service.

### Third-party site

Integration creators can prompt you to install their Vercel Integration through their app or website.

When installing or using an integration, your data may be collected or
disclosed to Vercel. Your information may also be sent to the integration
creator per our [Privacy Notice](/legal/privacy-policy). Third party
integrations are available "as is" and not operated or controlled by Vercel.
We suggest reviewing the terms and policies for the integration and/or
contacting the integration creator directly for further information on their
privacy practices.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
