---
title: Adding a Provider
product: vercel
url: /docs/agent-resources/integrations-for-models/adding-a-provider
canonical_url: "https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-provider"
last_updated: 2026-02-26
type: how-to
prerequisites:
  - /docs/agent-resources/integrations-for-models
  - /docs/agent-resources
related:
  - /docs/integrations/install-an-integration/product-integration
  - /docs/agent-resources/integrations-for-models/xai
  - /docs/agent-resources/integrations-for-models/groq
  - /docs/agent-resources/integrations-for-models/fal
  - /docs/agent-resources/integrations-for-models/deepinfra
summary: Learn how to add a new AI provider to your Vercel projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-provider.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "304d0fc4a1eeef0de16b11d6949f1ae79208849139368558b8f03d336f65d41c"
---

# Adding a Provider

You add AI providers from the Vercel Marketplace. To view your installed AI integrations, open **Integrations** in the sidebar of your Vercel [dashboard](/dashboard).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Groq, fal, and DeepInfra join the Vercel Marketplace ](https://vercel.com/changelog/groq-fal-and-deepinfra-join-the-vercel-marketplace)
- [Introducing AI Integrations on Vercel](https://vercel.com/blog/ai-integrations)
- [Adding a Model](https://vercel.com/docs/agent-resources/integrations-for-models/adding-a-model) — Learn how to add a new AI model to your Vercel projects
- [Vercel Integrations](https://vercel.com/docs/integrations) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte
- [Build with AI agents on Vercel](https://vercel.com/docs/agent-resources/integrations-for-agents) — Install AI agents and services through the Vercel Marketplace to automate workflows and build custom AI systems.
- [Vercel Together AI Integration](https://vercel.com/docs/agent-resources/integrations-for-models/togetherai) — Learn how to add Together AI connectable account integration with Vercel.
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing

Full cross-link map for this page: [/docs/agent-resources/integrations-for-models/adding-a-provider.graph.md](/docs/agent-resources/integrations-for-models/adding-a-provider.graph.md)
<!-- /docsgraph:related -->

## Adding a native integration provider

1. From the [Vercel dashboard](/dashboard), open **Integrations** in the sidebar and select **Browse Marketplace**.
2. From the list of Marketplace AI Providers, select the provider that you would like to install and click **Continue**.
3. Select a plan from the list of available plans that can include both prepaid and post-paid plans.
   - For prepaid plans, once you select your plan and click Continue:
     - You are taken to a **Manage Funds** screen where you can set up an initial balance for the prepayment.
     - You can also enable auto recharge with a maximum monthly spend. Auto recharge can also be configured at a later stage.
4. Click **Continue**, provide a name for your installation and click **Install**.
5. Once the installation is complete, you are taken to the installation's detail page where you can:
   - Link a project by clicking **Connect Project**
   - Follow a quickstart in different languages to test your installation
   - View the list of all connected projects
   - View the usage of the service

For more information on managing native integration providers, review [Manage native integrations](/docs/integrations/install-an-integration/product-integration#manage-native-integrations).

## Adding a connectable account provider

If no integrations are installed, browse the list of available providers and click on the provider you would like to add.

1. Select the **Add** button next to the provider you want to integrate
2. Review the provider card which displays the models available, along with a description of the provider and links to their website, pricing, and documentation
3. Select the **Add Provider** button
4. You can now select which projects the provider will have access to. You can choose from **All Projects** or **Specific Projects**
   - If you select **Specific Projects**, you'll be prompted to select the projects you want to connect to the provider. The list will display projects associated with your scoped team
   - Multiple projects can be selected during this step
5. Select the **Connect to Project** button
6. You'll be redirected to the provider's website to complete the connection process
7. Once the connection is complete, you'll be redirected back to the Vercel dashboard, and the provider integration dashboard page. From here you can manage your provider settings, view usage, and more

Once you add a provider, **Integrations** in the sidebar lists the providers you have installed or connected to. To add more providers:

1. Open **Integrations** in the sidebar and select **Browse Marketplace**.
2. Browse down to the list of connectable accounts.
3. Select the provider that you would like to connect to and click **Continue** and follow the instructions from step 4 above.

## Featured AI integrations

**xAI** (Marketplace native integration): An AI service with an efficient text model and a wide context image understanding model. [Learn more →](/docs/agent-resources/integrations-for-models/xai)

**Groq** (Marketplace native integration): A high-performance AI inference service with an ultra-fast Language Processing Unit (LPU) architecture. [Learn more →](/docs/agent-resources/integrations-for-models/groq)

**fal** (Marketplace native integration): A serverless AI inferencing platform for creative processes. [Learn more →](/docs/agent-resources/integrations-for-models/fal)

**DeepInfra** (Marketplace native integration): A platform with access to a vast library of open-source models. [Learn more →](/docs/agent-resources/integrations-for-models/deepinfra)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
