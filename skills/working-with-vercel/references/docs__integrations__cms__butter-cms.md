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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "128ffd20eae1ebcb4bb0782cf0fe3be41da16d1d3e5128767b0b8b541679a94d"
---

# Vercel ButterCMS Integration

ButterCMS is a headless content management system that enables developers to manage and deliver content through an API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Agility CMS Integration](https://vercel.com/docs/integrations/cms/agility-cms) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Integrating AWS Secrets Manager with Vercel Using Terraform](https://vercel.com/kb/guide/integrating_aws_secrets_manager_with_vercel_using_terraform) — Learn how to seamlessly integrate AWS Secrets Manager with Vercel for enhanced security and efficiency in your web deplo
- [Vercel Makeswift Integration](https://vercel.com/docs/integrations/cms/makeswift) — Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing
- [Vercel Formspree Integration](https://vercel.com/docs/integrations/cms/formspree) — Learn how to integrate Formspree with Vercel. Follow our tutorial to set up Formspree and manage form submissions on you
- [Vercel Sanity Integration](https://vercel.com/docs/integrations/cms/sanity) — Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration

Full cross-link map for this page: [/docs/integrations/cms/butter-cms.graph.md](/docs/integrations/cms/butter-cms.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with the ButterCMS on Vercel deploy the template below:

Or, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from ButterCMS to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:
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
  Once you've installed the ButterCMS integration, you can pull in environment variables from ButterCMS to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.


---

[View full sitemap](/docs/sitemap)
