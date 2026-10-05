---
title: Vercel Sanity Integration
product: vercel
url: /docs/integrations/cms/sanity
canonical_url: "https://vercel.com/docs/integrations/cms/sanity"
last_updated: 2025-03-04
type: how-to
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/cli
  - /docs/vercel-toolbar
summary: Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration for real-time collaboration...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/sanity.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "bf8932806f0d563153de445e63f0d0762c705537995e502fe910082148d3e939"
---

# Vercel Sanity Integration

Sanity is a headless content management system that provides real-time collaboration and structured content management. It offers a highly customizable content studio and a powerful API, allowing developers to integrate and manage content across various platforms and devices.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sanity is now available on the Vercel Marketplace](https://vercel.com/changelog/sanity-vercel-marketplace?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related)
- [Vercel + Sanity: Innovating on a faster, more collaborative Web](https://vercel.com/blog/vercel-sanity-innovating-on-a-faster-collaborative-web?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related)
- [Using a Headless CMS with Vercel](https://vercel.com/kb/guide/using-a-headless-cms-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related) — Learn best practices for using databases in a serverless environment with Vercel
- [Visual Editing: Click-to-edit content for headless CMSes](https://vercel.com/blog/visual-editing?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related)
- [Integrating Next.js and Contentful for your Headless CMS](https://vercel.com/kb/guide/integrating-next-js-and-contentful-for-your-headless-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related) — Next.js with Contentful gives you the power to quickly build scalable dynamic static websites with improved search engin
- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Vercel Agility CMS Integration](https://vercel.com/docs/integrations/cms/agility-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Vercel and Contentful Integration](https://vercel.com/docs/integrations/cms/contentful?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related) — Integrate Vercel with Contentful to deploy your content.
- [Vercel ButterCMS Integration](https://vercel.com/docs/integrations/cms/butter-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Vercel Makeswift Integration](https://vercel.com/docs/integrations/cms/makeswift?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=related) — Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing

Full cross-link map for this page: [/docs/integrations/cms/sanity.graph.md](/docs/integrations/cms/sanity.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fsanity&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Getting started

To get started with the Sanity on Vercel deploy the template below:

Or, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from Sanity to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i -g vercel@latest
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn global add vercel@latest
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i -g vercel@latest
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun add -g vercel@latest
      ```
    </Code>
  </CodeBlock>

- ### Install your CMS integration
  Navigate to the [ integration](`/integrations/${props.cms.toLowerCase\(\).split\(/[.\s]+/\).join\('-'\)}`) and follow the steps to install the integration.

- ### Pull in environment variables
  Once you've installed the Sanity integration, you can pull in environment variables from Sanity to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.

### Content Link

> **Availability**: Content Link is available on Enterprise and Pro plans

Content Link enables you to edit content on websites using headless CMSs by providing links on elements that match a content model in the CMS. This real-time content visualization allows collaborators to make changes without needing a developer's assistance.

You can enable Content Link on a preview deployment by selecting  **Edit Mode** in the [Vercel Toolbar](/docs/vercel-toolbar) menu.

The corresponding model in the CMS determines an editable field. You can hover over an element to display a link in the top-right corner of the element and then select the link to open the related CMS field for editing.

You don't need any additional configuration or code changes on the page to use this feature.


---

[View full sitemap](/docs/sitemap)
