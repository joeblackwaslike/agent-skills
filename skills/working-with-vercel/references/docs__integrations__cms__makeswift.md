---
title: Vercel Makeswift Integration
product: vercel
url: /docs/integrations/cms/makeswift
canonical_url: "https://vercel.com/docs/integrations/cms/makeswift"
last_updated: 2025-03-04
type: how-to
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/cli
summary: Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing React websites. Follow our...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/makeswift.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "22b8109b3af0440fe4fdc85a4314f8a3d3e22ca3ac30cafe21bf9e5d2865d057"
---

# Vercel Makeswift Integration

Makeswift is a no-code website builder designed for creating and managing React websites. It offers a drag-and-drop interface that allows users to design and build responsive web pages without writing code.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Supercharge your Vercel Projects with Integrations](https://vercel.com/blog/integrations-marketplace)
- [Deploy a headless BigCommerce storefront with Vercel](https://vercel.com/kb/guide/deploy-headless-bigcommerce-storefront-with-vercel) — Deploy a headless BigCommerce storefront using Catalyst and Next.js on Vercel
- [Vercel Agility CMS Integration](https://vercel.com/docs/integrations/cms/agility-cms) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Vercel ButterCMS Integration](https://vercel.com/docs/integrations/cms/butter-cms) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Vercel Formspree Integration](https://vercel.com/docs/integrations/cms/formspree) — Learn how to integrate Formspree with Vercel. Follow our tutorial to set up Formspree and manage form submissions on you
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing

Full cross-link map for this page: [/docs/integrations/cms/makeswift.graph.md](/docs/integrations/cms/makeswift.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with the Makeswift on Vercel deploy the template below:

Or, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from Makeswift to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:

  **pnpm**
  ```bash
  pnpm i -g vercel@latest
  ```
  **yarn**
  ```bash
  yarn global add vercel@latest
  ```
  **npm**
  ```bash
  npm i -g vercel@latest
  ```
  **bun**
  ```bash
  bun add -g vercel@latest
  ```

- ### Install your CMS integration
  Navigate to the  integration and follow the steps to install the integration.

- ### Pull in environment variables
  Once you've installed the Makeswift integration, you can pull in environment variables from Makeswift to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
