---
title: Edit Mode
product: vercel
url: /docs/edit-mode
canonical_url: "https://vercel.com/docs/edit-mode"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/vercel-toolbar
  - /docs/integrations/cms
summary: "Discover how Vercel's Edit Mode enhances content management for headless CMSs, enabling real-time editing, and seamless collaboration."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/edit-mode.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1867219cf1c89df28eff1f375ed40dc4c573d01178a60e3a4e2b3325dc2bb4ba"
---

# Edit Mode

> **🔒 Permissions Required**: Edit Mode


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank?from=related) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, security defaults, AI infrastructure, GPU comp
- [Vercel vs Railway](https://vercel.com/kb/guide/vercel-vs-railway?from=related) — A detailed guide to Vercel vs Railway: serverless vs always-on containers, container images via Dockerfile.vercel, frame
- [DatoCMS](https://vercel.com/docs/integrations/cms/dato-cms?from=related) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Contentful](https://vercel.com/docs/integrations/cms/contentful?from=related) — Integrate Vercel with Contentful to deploy your content.
- [Sanity](https://vercel.com/docs/integrations/cms/sanity?from=related) — Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration
- [ButterCMS](https://vercel.com/docs/integrations/cms/butter-cms?from=related) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Agility CMS](https://vercel.com/docs/integrations/cms/agility-cms?from=related) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in

Full cross-link map for this page: [/docs/edit-mode.graph.md](/docs/edit-mode.graph.md)
<!-- /docsgraph:related -->

Content editing in CMSs usually occurs separately from the website's layout and design. This separation makes it hard for authors to visualize their changes. Edit Mode allows authors to edit content within the website's context, offering a clearer understanding of the impact on design and user experience. The ability to jump from content to the editing interface further enhances this experience.

## Accessing Edit Mode

To access Edit Mode:

1. Ensure you're logged into the [Vercel Toolbar](/docs/vercel-toolbar) with your Vercel account.
2. Navigate to a page with editable content. The  **Edit Mode** option will only appear in the [Vercel Toolbar](/docs/vercel-toolbar) menu when there are elements on the page matched to fields in the CMS.
3. Select the  **Edit Mode** option in the toolbar menu. This will highlight the editable fields as [Content Links](/docs/edit-mode#content-link), which turn blue as you hover near them.

## Content Link

> **🔒 Permissions Required**: Content Link

Content Link enables you to edit content on websites using headless CMSs by providing links on elements that match a content model in the CMS. This real-time content visualization allows collaborators to make changes without needing a developer's assistance.

You can enable Content Link on a preview deployment by selecting  **Edit Mode** in the [Vercel Toolbar](/docs/vercel-toolbar) menu.

The corresponding model in the CMS determines an editable field. You can hover over an element to display a link in the top-right corner of the element and then select the link to open the related CMS field for editing.

You don't need any additional configuration or code changes on the page to use this feature.

The following CMS integrations support Content Link:

- [Contentful](https://www.contentful.com/developers/docs/tools/vercel/content-source-maps-with-vercel/)
- [Sanity](https://www.sanity.io/docs/vercel-visual-editing)
- [Builder](https://www.builder.io/c/docs/vercel-visual-editing)
- [TinaCMS](https://tina.io/docs/contextual-editing/overview/)
- [DatoCMS](https://www.datocms.com/docs/visual-editing/how-to-use-visual-editing)
- [Payload](https://payloadcms.com/docs/integrations/vercel-visual-editing)
- [Uniform](https://www.uniform.dev/blogs/visual-editing-with-vercel-uniform)
- [Strapi](https://strapi.io/blog/announcing-visual-editing-for-strapi-powered-by-vercel)

See the [CMS integration documentation](/docs/integrations/cms) for information on how to use Content Link with your chosen CMS.


---

[View full sitemap](/docs/sitemap)
