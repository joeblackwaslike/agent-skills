---
title: Vercel ButterCMS Integration
product: vercel
url: /docs/integrations/cms/butter-cms
canonical_url: "https://vercel.com/docs/integrations/cms/butter-cms"
last_updated: 2025-03-04
type: how-to
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/cli
summary: Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage content seamlessly using...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/butter-cms.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "17395b3b082a95a46e9bbeb5de2610ffb0f8ccbde5f6f869eae1419820fbfc97"
---

# Vercel ButterCMS Integration

ButterCMS is a headless content management system that enables developers to manage and deliver content through an API.

## Getting started

To get started with the ButterCMS on Vercel deploy the template below:

Or, follow the steps below to install the integration:

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


---

[View full sitemap](/docs/sitemap)
