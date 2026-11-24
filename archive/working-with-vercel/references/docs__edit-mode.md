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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/edit-mode.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "b9b2ae4094224fba0fd4b941ad627259e189cba9e6b2e776446542de90d9906f"
---

# Edit Mode

> Edit Mode is available on Enterprise and Pro plans

Content editing in CMSs usually occurs separately from the website's layout and design. This separation makes it hard for authors to visualize their changes. Edit Mode allows authors to edit content within the website's context, offering a clearer understanding of the impact on design and user experience. The ability to jump from content to the editing interface further enhances this experience.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly) — A detailed guide to Vercel vs Fastly: full-stack application platform vs CDN infrastructure layer, covering framework su
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, container image functions, security defaults,
- [Vercel vs Railway](https://vercel.com/kb/guide/vercel-vs-railway) — A detailed guide to Vercel vs Railway: serverless vs always-on containers, container images from a Dockerfile, framework
- [Enhanced content management for your headless CMS](https://vercel.com/blog/enhanced-content-management-for-headless-cmses)
- [Visual Editing: Click-to-edit content for headless CMSes](https://vercel.com/blog/visual-editing)
- [Content Link can now be used with Contentful ](https://vercel.com/changelog/content-link-can-now-be-used-with-contentful)
- [Visual Editing can now be used with DatoCMS](https://vercel.com/changelog/visual-editing-can-now-be-used-with-datocms)
- [Visual Editing can now be used with TinaCMS](https://vercel.com/changelog/visual-editing-can-now-be-used-with-tinacms)
- [Visual Editing can now be used with Builder.io ](https://vercel.com/changelog/visual-editing-can-now-be-used-with-builder-io)
- [Vercel and Contentful Integration](https://vercel.com/docs/integrations/cms/contentful) — Integrate Vercel with Contentful to deploy your content.

Full cross-link map for this page: [/docs/edit-mode.graph.md](/docs/edit-mode.graph.md)
<!-- /docsgraph:related -->

## Accessing Edit Mode

To access Edit Mode:

1. Ensure you're logged into the [Vercel Toolbar](/docs/vercel-toolbar) with your Vercel account.
2. Navigate to a page with editable content. The  **Edit Mode** option will only appear in the [Vercel Toolbar](/docs/vercel-toolbar) menu when there are elements on the page matched to fields in the CMS.
3. Select the  **Edit Mode** option in the toolbar menu. This will highlight the editable fields as [Content Links](/docs/edit-mode#content-link), which turn blue as you hover near them.

## Content Link

> Content Link is available on Enterprise and Pro plans

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

## Troubleshooting Content Link

CMS integrations that support Content Link add invisible, encoded characters to the text fields they return. Vercel reads that encoded data to connect each element on the page to its field in the CMS. The encoded characters can change how text is laid out, break code that parses the text, or attach the edit link to the wrong element.

The fixes below use the [`@vercel/stega`](https://www.npmjs.com/package/@vercel/stega) package, which separates the encoded data from the original text. Install it in your project:

```bash filename="terminal"
npm i @vercel/stega
```

### Editable text breaks out of its container

Text that contains encoded data can overflow or wrap incorrectly when the element sets `letter-spacing` in CSS or renders inside a `<ReactWrapBalancer>` component.

To fix the layout, split the field with `vercelStegaSplit`. Render the `cleaned` text as the visible content, and put the `encoded` data in a hidden element so Content Link can still find it. Add the `data-vercel-edit-target` attribute to the element that Content Link should highlight:

```tsx filename="components/heading.tsx"
import { vercelStegaSplit } from '@vercel/stega';

export function Heading({ text }: { text: string }) {
  const { cleaned, encoded } = vercelStegaSplit(text);

  return (
    <h1 data-vercel-edit-target>
      {cleaned}
      <span style={{ display: 'none' }}>{encoded}</span>
    </h1>
  );
}
```

### Formatting a date throws an error

Code that parses a CMS field, such as `new Date(value)`, can fail or return `Invalid Date` when the value contains encoded data.

To fix the error, parse the `cleaned` value, then append the `encoded` data to the formatted result so the date stays editable:

```ts filename="lib/format-date.ts"
import { vercelStegaSplit } from '@vercel/stega';

export function formatDate(value: string) {
  const { cleaned, encoded } = vercelStegaSplit(value);
  const formatted = new Date(cleaned).toLocaleDateString('en-US', {
    dateStyle: 'long',
  });

  return `${formatted}${encoded}`;
}
```

### The wrong element is highlighted

By default, Content Link highlights the element that contains the encoded text. To highlight a different element, such as a parent that wraps the text, add the `data-vercel-edit-target` attribute to that element.

In this example, Content Link highlights the whole `<section>` instead of the `<h1>`:

```tsx filename="components/hero.tsx"
export function Hero({ title }: { title: string }) {
  return (
    <section data-vercel-edit-target>
      <h1>{title}</h1>
      <p>Build and deploy on Vercel.</p>
    </section>
  );
}
```

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
