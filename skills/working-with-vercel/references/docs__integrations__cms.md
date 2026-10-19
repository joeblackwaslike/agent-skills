---
title: Vercel CMS Integrations
product: vercel
url: /docs/integrations/cms
canonical_url: "https://vercel.com/docs/integrations/cms"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/integrations
related:
  - /docs/integrations/cms/contentful
  - /docs/integrations/cms/sitecore
  - /docs/edit-mode
  - /docs/cli/env
  - /docs/cli
summary: Learn how to integrate Vercel with CMS platforms, including Contentful, Sanity, and Sitecore XM Cloud.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "10ba49cea40ce5db642fc22b260a82290acc2bae58a5eed972383d085942c67d"
---

# Vercel CMS Integrations

Vercel Content Management System (CMS) Integrations allow you to connect your projects with CMS platforms, including [Contentful](/docs/integrations/cms/contentful), [Sanity](/marketplace/sanity), [Sitecore XM Cloud](/docs/integrations/cms/sitecore) and [more](#featured-cms-integrations). These integrations provide a direct path to incorporating CMS into your applications, enabling you to build, deploy, and leverage CMS-powered features with minimal hassle.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Rendering strategies for retail: ISR vs SSR vs static](https://vercel.com/kb/guide/ssr-vs-ssg-vs-isr-vs-csr-for-ecommerce) — Choose between SSR, SSG, ISR, and CSR for each ecommerce surface. Compare rendering modes on freshness, personalization,
- [Introducing new developer tools in the Vercel Toolbar](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar)
- [Supercharge your Vercel Projects with Integrations](https://vercel.com/blog/integrations-marketplace)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Vercel Commerce and Payments Integrations](https://vercel.com/docs/integrations/ecommerce) — Learn how to integrate Vercel with payment processors and ecommerce platforms, including Stripe, Shopify, BigCommerce, a
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/integrations/cms.graph.md](/docs/integrations/cms.graph.md)
<!-- /docsgraph:related -->

You can use the following methods to integrate your CMS with Vercel:

- [**Environment variable import**](#environment-variable-import): Quickly setup your Vercel project with environment variables from your CMS
- [**Edit Mode through the Vercel Toolbar**](#edit-mode-with-the-vercel-toolbar): Visualize content from your CMS within a Vercel deployments and edit directly in your CMS
  - [**Content Link**](/docs/edit-mode#content-link): Lets you visualize content models from your CMS within a Vercel deployments and edit directly in your CMS
- [**Deploy changes from CMS**](#deploy-changes-from-cms): Connect and deploy content from your CMS to your Vercel site

## Environment variable import

The most common way to setup a CMS with Vercel is by installing an integration through the [Integrations Marketplace](https://vercel.com/integrations#cms). This method allows you to quickly setup your Vercel project with environment variables from your CMS.

Once a CMS has been installed, and a project linked you can pull in environment variables from the CMS to your Vercel project using the [Vercel CLI](/docs/cli/env).

- ### Install the Vercel CLI
  To pull in environment variables from your CMS to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:
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
  Navigate to the CMS integration you want to install into your project, and follow the steps to install the integration.

- ### Pull in environment variables
  Once you've installed the CMS integration, you can pull in environment variables from the CMS to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.

## Edit mode with the Vercel Toolbar

To access Edit Mode:

1. Ensure you're logged into the [Vercel Toolbar](/docs/vercel-toolbar) with your Vercel account.
2. Navigate to a page with editable content. The  **Edit Mode** option will only appear in the [Vercel Toolbar](/docs/vercel-toolbar) menu when there are elements on the page matched to fields in the CMS.
3. Select the  **Edit Mode** option in the toolbar menu. This will highlight the editable fields as [Content Links](/docs/edit-mode#content-link), which turn blue as you hover near them.

The following CMS integrations support Content Link:

- [Contentful](https://www.contentful.com/developers/docs/tools/vercel/content-source-maps-with-vercel/)
- [Sanity](https://www.sanity.io/docs/vercel-visual-editing)
- [Builder](https://www.builder.io/c/docs/vercel-visual-editing)
- [TinaCMS](https://tina.io/docs/contextual-editing/overview/)
- [DatoCMS](https://www.datocms.com/docs/visual-editing/how-to-use-visual-editing)
- [Payload](https://payloadcms.com/docs/integrations/vercel-content-link)
- [Uniform](https://www.uniform.dev/blogs/visual-editing-with-vercel-uniform)
- [Strapi](https://strapi.io/blog/announcing-visual-editing-for-strapi-powered-by-vercel)

See the [Edit Mode documentation](/docs/edit-mode) for information on setup and configuration.

## Draft mode through the Vercel Toolbar

Draft mode allows you to view unpublished content from your CMS within a Vercel preview, and works with Next.js and SvelteKit. See the [Draft Mode documentation](/docs/draft-mode) for information and setup and configuration.

## Deploy changes from CMS

This method is generally setup through webhooks or APIs that trigger a deployment when content is updated in the CMS. See your CMSs documentation for information on how to set this up.

## Featured CMS integrations

- [Agility CMS](/docs/integrations/cms/agility-cms)
- [DatoCMS](/docs/integrations/cms/dato-cms)
- [ButterCMS](/docs/integrations/cms/butter-cms)
- [Formspree](/docs/integrations/cms/formspree)
- [Makeswift](/docs/integrations/cms/makeswift)
- [Sanity](/docs/integrations/cms/sanity)
- [Contentful](/docs/integrations/cms/contentful)
- [Sitecore XM Cloud](/docs/integrations/cms/sitecore)


---

[View full sitemap](/docs/sitemap)
