---
title: Vercel DatoCMS Integration
product: vercel
url: /docs/integrations/cms/dato-cms
canonical_url: "https://vercel.com/docs/integrations/cms/dato-cms"
last_updated: 2025-03-04
type: how-to
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/cli
  - /docs/vercel-toolbar
summary: Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content seamlessly using DatoCMS API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/dato-cms.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "8167f53465b7e43514904d9066200750219251779cd5211648de18f5d5d28588"
---

# Vercel DatoCMS Integration

DatoCMS is a headless content management system designed for creating and managing digital content with flexibility. It provides a powerful API and a customizable editing interface, allowing developers to build and integrate content into any platform or technology stack.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Visual Editing can now be used with DatoCMS](https://vercel.com/changelog/visual-editing-can-now-be-used-with-datocms)
- [Supercharge your Vercel Projects with Integrations](https://vercel.com/blog/integrations-marketplace)
- [Vercel Agility CMS Integration](https://vercel.com/docs/integrations/cms/agility-cms) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Vercel ButterCMS Integration](https://vercel.com/docs/integrations/cms/butter-cms) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Edit Mode](https://vercel.com/docs/edit-mode) — Discover how Vercel's Edit Mode enhances content management for headless CMSs, enabling real-time editing, and seamless
- [Vercel and Contentful Integration](https://vercel.com/docs/integrations/cms/contentful) — Integrate Vercel with Contentful to deploy your content.
- [Vercel Makeswift Integration](https://vercel.com/docs/integrations/cms/makeswift) — Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing

Full cross-link map for this page: [/docs/integrations/cms/dato-cms.graph.md](/docs/integrations/cms/dato-cms.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with DatoCMS on Vercel, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from DatoCMS to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:

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
  Once you've installed the DatoCMS integration, you can pull in environment variables from DatoCMS to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.

### Content Link

> Content Link is available on Enterprise and Pro plans

Content Link enables you to edit content on websites using headless CMSs by providing links on elements that match a content model in the CMS. This real-time content visualization allows collaborators to make changes without needing a developer's assistance.

You can enable Content Link on a preview deployment by selecting  **Edit Mode** in the [Vercel Toolbar](/docs/vercel-toolbar) menu.

The corresponding model in the CMS determines an editable field. You can hover over an element to display a link in the top-right corner of the element and then select the link to open the related CMS field for editing.

You don't need any additional configuration or code changes on the page to use this feature.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
