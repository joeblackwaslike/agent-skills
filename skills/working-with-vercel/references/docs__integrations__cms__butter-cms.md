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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/cms/butter-cms.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c02d3c07850f33de88e1f4758c168cdd7293454072a9a1cc07e2c251520d231f"
---

# Vercel ButterCMS Integration

ButterCMS is a headless content management system that enables developers to manage and deliver content through an API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Vercel Agility CMS Integration](https://vercel.com/docs/integrations/cms/agility-cms) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Vercel Makeswift Integration](https://vercel.com/docs/integrations/cms/makeswift) — Learn how to integrate Makeswift with Vercel. Makeswift is a no-code website builder designed for creating and managing
- [Vercel Formspree Integration](https://vercel.com/docs/integrations/cms/formspree) — Learn how to integrate Formspree with Vercel. Follow our tutorial to set up Formspree and manage form submissions on you
- [Vercel and Contentful Integration](https://vercel.com/docs/integrations/cms/contentful) — Integrate Vercel with Contentful to deploy your content.

Full cross-link map for this page: [/docs/integrations/cms/butter-cms.graph.md](/docs/integrations/cms/butter-cms.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with the ButterCMS on Vercel deploy the template below:

Or, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from ButterCMS to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:

  **pnpm**
  ```bash
  pnpm i -g vercel@latest
  ```
  **yarn**
  ```bash
  yarn global add vercel@latest
  ```
  **npm**
  ```bash
  npm i -g vercel@latest
  ```
  **bun**
  ```bash
  bun add -g vercel@latest
  ```

- ### Install your CMS integration
  Navigate to the  integration and follow the steps to install the integration.

- ### Pull in environment variables
  Once you've installed the ButterCMS integration, you can pull in environment variables from ButterCMS to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
