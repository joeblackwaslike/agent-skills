---
title: Vercel Agility CMS Integration
product: vercel
url: /docs/integrations/cms/agility-cms
canonical_url: "https://vercel.com/docs/integrations/cms/agility-cms"
last_updated: 2025-03-04
type: how-to
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/cli
summary: Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the integration for flexible and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/agility-cms.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "9a55e9feec61a07df5206d5680a44b6e4b8f0dfca487ba3cf0f8aeaca654486e"
---

# Vercel Agility CMS Integration

Agility CMS is a headless content management system designed for flexibility and scalability. It allows developers to create and manage digital content independently from the presentation layer, enabling seamless integration with various front-end frameworks and technologies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Vercel ButterCMS Integration](https://vercel.com/docs/integrations/cms/butter-cms) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Vercel Makeswift Integration](https://vercel.com/docs/integrations/cms/makeswift) — Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing
- [Vercel Sanity Integration](https://vercel.com/docs/integrations/cms/sanity) — Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration
- [Vercel Formspree Integration](https://vercel.com/docs/integrations/cms/formspree) — Learn how to integrate Formspree with Vercel. Follow our tutorial to set up Formspree and manage form submissions on you

Full cross-link map for this page: [/docs/integrations/cms/agility-cms.graph.md](/docs/integrations/cms/agility-cms.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with the Agility CMS on Vercel deploy the template below:

Or, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from Agility CMS to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:

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
  Once you've installed the Agility CMS integration, you can pull in environment variables from Agility CMS to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
