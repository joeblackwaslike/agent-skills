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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "7a99c1d1e2bea277e85d4e8217f7c1c6941899224a6986bb53b1e51674a04be0"
---

# Vercel Agility CMS Integration

Agility CMS is a headless content management system designed for flexibility and scalability. It allows developers to create and manage digital content independently from the presentation layer, enabling seamless integration with various front-end frameworks and technologies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using a Headless CMS with Vercel](https://vercel.com/kb/guide/using-a-headless-cms-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=related) — Learn best practices for using databases in a serverless environment with Vercel
- [Integrate Vercel and Contentstack for your Headless CMS](https://vercel.com/kb/guide/integrate-vercel-and-contentstack?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=related) — Integrate Vercel with Contentstack, a headless CMS, to build and deploy dynamic, high-performance websites.
- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=related) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Vercel ButterCMS Integration](https://vercel.com/docs/integrations/cms/butter-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=related) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Vercel Sanity Integration](https://vercel.com/docs/integrations/cms/sanity?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=related) — Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration
- [Vercel Makeswift Integration](https://vercel.com/docs/integrations/cms/makeswift?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=related) — Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing
- [Vercel Formspree Integration](https://vercel.com/docs/integrations/cms/formspree?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=related) — Learn how to integrate Formspree with Vercel. Follow our tutorial to set up Formspree and manage form submissions on you

Full cross-link map for this page: [/docs/integrations/cms/agility-cms.graph.md](/docs/integrations/cms/agility-cms.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fagility-cms&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Getting started

To get started with the Agility CMS on Vercel deploy the template below:

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
