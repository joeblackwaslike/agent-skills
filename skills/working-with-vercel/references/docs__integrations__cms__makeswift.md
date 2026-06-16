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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3b127bb71f6c6b0a5b34ab03947ababce693572108bda53df76da210c3c68a99"
---

# Vercel Makeswift Integration

Makeswift is a no-code website builder designed for creating and managing React websites. It offers a drag-and-drop interface that allows users to design and build responsive web pages without writing code.

## Getting started

To get started with the Makeswift on Vercel deploy the template below:

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
