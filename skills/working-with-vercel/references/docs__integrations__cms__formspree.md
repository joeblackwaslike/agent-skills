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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "3d3fd3d1a532c8dc4242a427a8a0ff44ae642764ebecf09bb98296a0a94fd16d"
---

# Vercel Formspree Integration

Formspree is a form backend platform that handles form submissions on static websites. It allows developers to collect and manage form data without needing a server.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploying React Forms Using Formspree with Vercel](https://vercel.com/kb/guide/deploying-react-forms-using-formspree-with-vercel?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fformspree&source_site=vercel-docs&relationship=related) — Create and deploy a React form with the help of Formspree and Vercel.
- [Vercel Agility CMS Integration](https://vercel.com/docs/integrations/cms/agility-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fformspree&source_site=vercel-docs&relationship=related) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Vercel ButterCMS Integration](https://vercel.com/docs/integrations/cms/butter-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fformspree&source_site=vercel-docs&relationship=related) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Vercel Makeswift Integration](https://vercel.com/docs/integrations/cms/makeswift?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fformspree&source_site=vercel-docs&relationship=related) — Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing
- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fformspree&source_site=vercel-docs&relationship=related) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fformspree&source_site=vercel-docs&relationship=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing

Full cross-link map for this page: [/docs/integrations/cms/formspree.graph.md](/docs/integrations/cms/formspree.graph.md?from=related&source_path=%2Fdocs%2Fintegrations%2Fcms%2Fformspree&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Getting started

To get started with Formspree on Vercel, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from Formspree to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:
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
  Navigate to the [ integration](`/integrations/${props.cms.toLowerCase\(\).split\(/[.\s]+/\).join\('-'\)}`) and follow the steps to install the integration.

- ### Pull in environment variables
  Once you've installed the Formspree integration, you can pull in environment variables from Formspree to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.


---

[View full sitemap](/docs/sitemap)
