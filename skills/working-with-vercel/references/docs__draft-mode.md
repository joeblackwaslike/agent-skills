---
title: Draft Mode
product: vercel
url: /docs/draft-mode
canonical_url: "https://vercel.com/docs/draft-mode"
last_updated: 2026-06-26
type: how-to
prerequisites:
  []
related:
  - /docs/frameworks/full-stack/nextjs
  - /docs/frameworks/full-stack/sveltekit
  - /docs/build-output-api
  - /docs/build-output-api/primitives
  - /docs/deployments/environments
summary: "Vercel's Draft Mode enables you to view your unpublished headless CMS content on your site before publishing it."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/draft-mode.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1152c71aea031daa59dc0e20beb8097064cc869d0408ff924be5b882c5b06506"
---

# Draft Mode

Draft Mode lets you view your unpublished headless CMS content on your website rendered with all the normal styling and layout that you would see once published.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Northflank](https://vercel.com/kb/guide/vercel-vs-northflank?from=related) — A detailed guide to Vercel vs Northflank: Fluid compute, CDN and caching, security defaults, AI infrastructure, GPU comp
- [Vercel vs Railway](https://vercel.com/kb/guide/vercel-vs-railway?from=related) — A detailed guide to Vercel vs Railway: serverless vs always-on containers, container images via Dockerfile.vercel, frame
- [draftMode](https://nextjs.org/docs/app/api-reference/functions/draft-mode?from=related) — API Reference for the draftMode function.
- [Preview Mode](https://nextjs.org/docs/pages/guides/preview-mode?from=related) — Next.js has the preview mode for statically generated pages. You can learn how it works here.
- [Drafts](https://vercel.com/docs/flags/vercel-flags/dashboard/drafts?from=related) — Learn how draft flags work and how to promote them to Vercel Flags.
- [Features](https://vercel.com/docs/build-output-api/features?from=related) — Learn how to implement common Vercel platform features through the Build Output API.
- [Edit Mode](https://vercel.com/docs/edit-mode?from=related) — Discover how Vercel's Edit Mode enhances content management for headless CMSs, enabling real-time editing, and seamless
- [Vite](https://vercel.com/docs/frameworks/frontend/vite?from=related) — Learn how to use Vercel's features with Vite.
- [Partial Prerendering](https://vercel.com/docs/partial-prerendering?from=related) — Partial Prerendering serves a cached static shell instantly, then renders and streams the dynamic parts of a page per re

Full cross-link map for this page: [/docs/draft-mode.graph.md](/docs/draft-mode.graph.md)
<!-- /docsgraph:related -->

Both [Next.js](/docs/frameworks/full-stack/nextjs#draft-mode) and [SvelteKit](/docs/frameworks/full-stack/sveltekit#draft-mode) support Draft Mode. Any framework that uses the [Build Output API](/docs/build-output-api) can support Draft Mode by adding the `bypassToken` option to [prerender configuration](/docs/build-output-api/primitives#prerender-functions).

> **💡 Note:** Draft Mode was called Preview Mode before the release of Next.js
> [13.4](https://nextjs.org/blog/next-13-4). The name was changed to avoid
> confusion with [preview
> deployments](/docs/deployments/environments#preview-environment-pre-production),
> which is a different product.

You can use Draft Mode if you:

1. Use [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration) to fetch and render data from a headless CMS
2. Want to view your unpublished headless CMS content on your site without rebuilding your pages when you make changes
3. Want to protect your unpublished content from being viewed publicly

## How Draft Mode works

Draft Mode allows you to bypass [ISR](/docs/incremental-static-regeneration) caching to fetch the latest CMS content at request time. This is useful for seeing your draft content on your website without waiting for the cache to refresh, or manually revalidating the page.

The process works like this:

1. Each ISR route has a `bypassToken` configuration option, which is assigned a generated, cryptographically-secure value at build time
2. When someone visits an ISR route with a `bypassToken` configured, the page will check for a `__prerender_bypass` cookie
3. If the `__prerender_bypass` cookie exists and has the same value as the `bypassToken` your project is using, the visitor will view the page in Draft Mode

> **💡 Note:** Only team members will be able to view pages in Draft Mode.

## Getting started

> For \['nextjs-app', 'nextjs']:

To use Draft Mode with Next.js on Vercel, you must:

1. [Enable ISR](/docs/incremental-static-regeneration) on pages that fetch content. Using ISR is required on pages that you want to view in Draft Mode
2. Add code to your ISR pages to detect when Draft Mode is enabled and render the draft content
3. Toggle Draft Mode in the Vercel Toolbar by selecting Draft Mode in [the toolbar menu](/docs/vercel-toolbar#using-the-toolbar-menu) to view your draft content. Once toggled, the toolbar will turn purple, indicating that Draft Mode is enabled

   ```tsx filename="app/page.tsx" framework=nextjs-app
   import { draftMode } from 'next/headers';

   async function getContent() {
     const { isEnabled } = await draftMode();

     const contentUrl = isEnabled
       ? 'https://draft.example.com'
       : 'https://production.example.com';

     // This line enables ISR, required for draft mode
     const res = await fetch(contentUrl, { next: { revalidate: 120 } });

     return res.json();
   }

   export default async function Page() {
     const { title, desc } = await getContent();

     return (
       <main>
         <h1>{title}</h1>
         <p>{desc}</p>
       </main>
     );
   }
   ```

   ```jsx filename="app/page.jsx" framework=nextjs-app
   import { draftMode } from 'next/headers';

   async function getContent() {
     const { isEnabled } = await draftMode();

     const contentUrl = isEnabled
       ? 'https://draft.example.com'
       : 'https://production.example.com';

     // This line enables ISR, required for draft mode
     const res = await fetch(contentUrl, { next: { revalidate: 120 } });

     return res.json();
   }

   export default async function Page() {
     const { title, desc } = await getContent();

     return (
       <main>
         <h1>{title}</h1>
         <p>{desc}</p>
       </main>
     );
   }
   ```

   ```tsx filename="pages/example.tsx" framework=nextjs
   export async function getStaticProps(context) {
     const url = context.draftMode
       ? 'https://draft.example.com'
       : 'https://production.example.com';
     const res = await fetch(url);
     return {
       props: {
         posts: await res.json(),
       },
       revalidate: 120,
     };
   }
   ```

   ```jsx filename="pages/example.jsx" framework=nextjs
   export async function getStaticProps(context) {
     const url = context.draftMode
       ? 'https://draft.example.com'
       : 'https://production.example.com';
     const res = await fetch(url);
     return {
       props: {
         posts: await res.json(),
       },
       revalidate: 120,
     };
   }
   ```

See the Next.js docs to learn how to use Draft Mode with self-hosted Next.js projects:

- [App Router](https://nextjs.org/docs/app/guides/draft-mode)
- [Pages Router](https://nextjs.org/docs/pages/guides/draft-mode)

> For \['sveltekit']:

To use a SvelteKit route in Draft Mode, you must:

1. Export a `config` object [that enables Incremental Static Regeneration](https://kit.svelte.dev/docs/adapter-vercel#incremental-static-regeneration) from the route's `+page.server` file:

```ts filename="blog/[slug]/+page.server.ts" framework=sveltekit
import { BYPASS_TOKEN } from '$env/static/private';

export const config = {
  isr: {
    // Random token that can be provided to bypass the cached version of the page with a __prerender_bypass=<token> cookie. Allows rendering content at request time for this route.
    bypassToken: BYPASS_TOKEN,

    // Expiration time (in seconds) before the cached asset will be re-generated by invoking the Vercel Function.
    // Setting the value to `false` means it will never expire.
    expiration: 60,
  },
};
```

```js filename="blog/[slug]/+page.server.js" framework=sveltekit
import { BYPASS_TOKEN } from '$env/static/private';

export const config = {
  isr: {
    // Random token that can be provided to bypass the cached version of the page with a __prerender_bypass=<token> cookie. Allows rendering content at request time for this route.
    bypassToken: BYPASS_TOKEN,

    // Expiration time (in seconds) before the cached asset will be re-generated by invoking the Vercel Function.
    // Setting the value to `false` means it will never expire.
    expiration: 60,
  },
};
```

2. Send a `__prerender_bypass` cookie with the same value as `bypassToken` in your config.

To render the draft content, SvelteKit will check for `__prerender_bypass`. If its value matches the value of `bypassToken`, it will render content fetched at request time rather than prebuilt content.

Once implemented, team members can access Draft Mode from the Vercel Toolbar by selecting the eye icon . Once selected, the toolbar will turn purple to indicate that Draft Mode is enabled.

## Sharing drafts

To share a draft URL, it must have the `?__vercel_draft=1` query parameter. For example:

```bash
https://my-site.com/blog/post-01?__vercel_draft=1
```

Viewers outside your Vercel team cannot enable Draft Mode or see your draft content, even with a draft URL.


---

[View full sitemap](/docs/sitemap)
