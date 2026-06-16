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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "86ad1e15b3a88241e6a29b8e2e7178116ab3b7259a20e0bfc53450286434e4c1"
---

# Vercel DatoCMS Integration

DatoCMS is a headless content management system designed for creating and managing digital content with flexibility. It provides a powerful API and a customizable editing interface, allowing developers to build and integrate content into any platform or technology stack.

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
