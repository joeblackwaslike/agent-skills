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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "5db820e1d0971b4fa85f8d25ffb2a8eb2188448cb8075ed9da311e92cc217c13"
---

# Vercel Makeswift Integration

Makeswift is a no-code website builder designed for creating and managing React websites. It offers a drag-and-drop interface that allows users to design and build responsive web pages without writing code.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy a headless BigCommerce storefront with Vercel](https://vercel.com/kb/guide/deploy-headless-bigcommerce-storefront-with-vercel) — Deploy a headless BigCommerce storefront using Catalyst and Next.js on Vercel
- [Supercharge your Vercel Projects with Integrations](https://vercel.com/blog/integrations-marketplace)
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
  Once you've installed the Makeswift integration, you can pull in environment variables from Makeswift to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.


---

[View full sitemap](/docs/sitemap)
