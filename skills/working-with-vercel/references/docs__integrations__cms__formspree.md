---
title: Vercel Formspree Integration
product: vercel
url: /docs/integrations/cms/formspree
canonical_url: "https://vercel.com/docs/integrations/cms/formspree"
last_updated: 2025-03-04
type: how-to
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/cli
summary: Learn how to integrate Formspree with Vercel. Follow our tutorial to set up Formspree and manage form submissions on your static website without...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/formspree.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "b59b0b3522f0b504f3bb8a6da86d0d6d0c4d33e5b774e698afa5c7cd1e59cd47"
---

# Vercel Formspree Integration

Formspree is a form backend platform that handles form submissions on static websites. It allows developers to collect and manage form data without needing a server.

## Getting started

To get started with Formspree on Vercel, follow the steps below to install the integration:

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
