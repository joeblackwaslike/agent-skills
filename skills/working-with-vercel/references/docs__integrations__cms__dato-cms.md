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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "2f5de233f6cc1af68574079271f7e2f1ffc57ee681be9410b3d5fcb58e3a5e47"
---

# Vercel DatoCMS Integration

DatoCMS is a headless content management system designed for creating and managing digital content with flexibility. It provides a powerful API and a customizable editing interface, allowing developers to build and integrate content into any platform or technology stack.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using a Headless CMS with Vercel](https://vercel.com/kb/guide/using-a-headless-cms-with-vercel?from=related) — Learn best practices for using databases in a serverless environment with Vercel
- [How to Deploy a Docusaurus Site with Vercel](https://vercel.com/kb/guide/deploying-docusaurus-with-vercel?from=related) — Create a Docusaurus documentation site and deploy it live with Vercel.
- [Integrate Vercel and Contentstack for your Headless CMS](https://vercel.com/kb/guide/integrate-vercel-and-contentstack?from=related) — Integrate Vercel with Contentstack, a headless CMS, to build and deploy dynamic, high-performance websites.
- [ButterCMS](https://vercel.com/docs/integrations/cms/butter-cms?from=related) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Agility CMS](https://vercel.com/docs/integrations/cms/agility-cms?from=related) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Sanity](https://vercel.com/docs/integrations/cms/sanity?from=related) — Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration
- [Contentful](https://vercel.com/docs/integrations/cms/contentful?from=related) — Integrate Vercel with Contentful to deploy your content.
- [Edit Mode](https://vercel.com/docs/edit-mode?from=related) — Discover how Vercel's Edit Mode enhances content management for headless CMSs, enabling real-time editing, and seamless

Full cross-link map for this page: [/docs/integrations/cms/dato-cms.graph.md](/docs/integrations/cms/dato-cms.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with DatoCMS on Vercel, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from  to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i vercel
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i vercel
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i vercel
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i vercel
      ```
    </Code>
  </CodeBlock>

- ### Install your CMS integration
  Navigate to the  and follow the steps to install the integration.

- ### Pull in environment variables
  Once you've installed the  integration, you can pull in environment variables from  to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.

### Content Link

> **🔒 Permissions Required**: Content Link

Content Link enables you to edit content on websites using headless CMSs by providing links on elements that match a content model in the CMS. This real-time content visualization allows collaborators to make changes without needing a developer's assistance.

You can enable Content Link on a preview deployment by selecting  **Edit Mode** in the [Vercel Toolbar](/docs/vercel-toolbar) menu.

The corresponding model in the CMS determines an editable field. You can hover over an element to display a link in the top-right corner of the element and then select the link to open the related CMS field for editing.

You don't need any additional configuration or code changes on the page to use this feature.


---

[View full sitemap](/docs/sitemap)
