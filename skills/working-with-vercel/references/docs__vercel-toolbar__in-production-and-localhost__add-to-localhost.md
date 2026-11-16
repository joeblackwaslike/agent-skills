---
title: Add the Vercel Toolbar to your local environment
product: vercel
url: /docs/vercel-toolbar/in-production-and-localhost/add-to-localhost
canonical_url: "https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-localhost"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/vercel-toolbar/in-production-and-localhost
  - /docs/vercel-toolbar
related:
  - /docs/cli/link
  - /docs/cli
  - /docs/project-configuration/general-settings
  - /docs/accounts
summary: Learn how to use the Vercel Toolbar in your local environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-localhost.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "cf85a0df4aec58f6585b81aca5b2cc2cff92db04174db24cbebd8c80b92db148"
---

# Add the Vercel Toolbar to your local environment

To enable the toolbar in your local environment, add it to your project using the [`@vercel/toolbar`](https://www.npmjs.com/package/@vercel/toolbar) package, or with an injection script.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Easier toolbar setup for SvelteKit and other Vite-based frameworks](https://vercel.com/changelog/easier-toolbar-setup-for-sveltekit-and-other-vite-based-frameworks)
- [Add the Vercel Toolbar to your production environment](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production) — Learn how to add the Vercel Toolbar to your production environment and how your team members can use tooling to access t
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Getting started with Vercel Web Analytics](https://vercel.com/docs/analytics/quickstart) — Vercel Web Analytics provides you detailed insights into your website's visitors. This quickstart guide will help you ge
- [Getting started with microfrontends](https://vercel.com/docs/microfrontends/quickstart) — Learn how to get started with microfrontends on Vercel.
- [Supported Frameworks on Vercel](https://vercel.com/docs/frameworks/more-frameworks) — Learn about the frameworks that can be deployed to Vercel.

Full cross-link map for this page: [/docs/vercel-toolbar/in-production-and-localhost/add-to-localhost.graph.md](/docs/vercel-toolbar/in-production-and-localhost/add-to-localhost.graph.md)
<!-- /docsgraph:related -->

- ### Install the `@vercel/toolbar` package and link your project
  Install the package using the following command:

  **pnpm**
  ```bash
  pnpm i @vercel/toolbar
  ```
  **yarn**
  ```bash
  yarn add @vercel/toolbar
  ```
  **npm**
  ```bash
  npm i @vercel/toolbar
  ```
  **bun**
  ```bash
  bun add @vercel/toolbar
  ```
  Then link your local project to your Vercel project with the [`vercel link`](/docs/cli/link) command using [Vercel CLI](/docs/cli).
  ```bash filename="terminal"
  vercel link --cwd [path-to-directory]
  ```

- ### Add the toolbar to your project
  > For \['nextjs', 'nextjs-app']:
  To use the Vercel Toolbar locally in a Next.js project, define `withVercelToolbar` in your `next.config.js` file and export it, as shown below:
  > For \['sveltekit']:
  To use the Vercel Toolbar locally in a SvelteKit project, add the `vercelToolbar` plugin to your `vite.config.js` file, as shown below:
  > For \['nuxt']:
  To use the Vercel Toolbar locally in a Nuxt project, install the Nuxt module:

  **pnpm**
  ```bash
  pnpm dlx nuxt module add @vercel/toolbar
  ```
  **yarn**
  ```bash
  yarn dlx nuxt module add @vercel/toolbar
  ```
  **npm**
  ```bash
  npx nuxt module add @vercel/toolbar
  ```
  **bun**
  ```bash
  bunx nuxt module add @vercel/toolbar
  ```
  > For \['other']:
  The toolbar works locally out of the box with Next.js. To use it with a framework other than Next.js, you can add the following script tag, filling in the relevant info where required:
  ```js filename="next.config.js" framework=nextjs-app
  /** @type {import('next').NextConfig} */
  const createWithVercelToolbar = require('@vercel/toolbar/plugins/next');
  const nextConfig = {
    // Config options here
  };

  const withVercelToolbar = createWithVercelToolbar();
  // Instead of module.exports = nextConfig, do this:
  module.exports = withVercelToolbar(nextConfig);
  ```
  ```ts filename="next.config.ts" framework=nextjs-app
  import type { NextConfig } from 'next';
  import createWithVercelToolbar from '@vercel/toolbar/plugins/next';

  const nextConfig: NextConfig = {
    // Config options here
  };

  const withVercelToolbar = createWithVercelToolbar();
  // Instead of export default nextConfig, do this:
  export default withVercelToolbar(nextConfig);
  ```
  ```js filename="next.config.js" framework=nextjs
  /** @type {import('next').NextConfig} */
  const createWithVercelToolbar = require('@vercel/toolbar/plugins/next');
  const nextConfig = {
    // Config options here
  };

  const withVercelToolbar = createWithVercelToolbar();
  // Instead of module.exports = nextConfig, do this:
  module.exports = withVercelToolbar(nextConfig);
  ```
  ```ts filename="next.config.ts" framework=nextjs
  import type { NextConfig } from 'next';
  import createWithVercelToolbar from '@vercel/toolbar/plugins/next';

  const nextConfig: NextConfig = {
    // Config options here
  };

  const withVercelToolbar = createWithVercelToolbar();
  // Instead of export default nextConfig, do this:
  export default withVercelToolbar(nextConfig);
  ```
  ```js filename="vite.config.js" framework=sveltekit
  import { sveltekit } from '@sveltejs/kit/vite';
  import { vercelToolbar } from '@vercel/toolbar/plugins/vite';
  import { defineConfig } from 'vite';

  export default defineConfig({
    plugins: [sveltekit(), vercelToolbar()],
  });
  ```
  ```ts filename="vite.config.ts" framework=sveltekit
  import { sveltekit } from '@sveltejs/kit/vite';
  import { vercelToolbar } from '@vercel/toolbar/plugins/vite';
  import { defineConfig } from 'vite';

  export default defineConfig({
    plugins: [sveltekit(), vercelToolbar()],
  });
  ```
  ```tsx filename="index.ts" framework=other
  <script
    src="https://vercel.live/_next-live/feedback/feedback.js"
    data-explicit-opt-in="true"
    data-owner-id="user-id-or-team-id-here"
    data-project-id="project-id-here"
    data-branch="branch-name-here"
  ></script>
  ```
  ```jsx filename="index.js" framework=other
  <script
    src="https://vercel.live/_next-live/feedback/feedback.js"
    data-explicit-opt-in="true"
    data-owner-id="user-id-or-team-id-here"
    data-project-id="project-id-here"
    data-branch="branch-name-here"
  ></script>
  ```
  > For \['other']:
  To find your project ID, see [project ID](/docs/project-configuration/general-settings#project-id). To find your user or team ID, see [Find your Team ID](/docs/accounts#find-your-team-id).
  > **💡 Note:** If there are changes to your branch, you must refresh the page to see the
  > latest comments in localhost.
  <br />
  > **💡 Note:** For frameworks using Vite, follow the SvelteKit setup steps: configure
  > `vite.config.ts` and call `mountVercelToolbar` in your client's entry point.
  > For \['nextjs-app']:
  Then add the following code to your `layout.tsx` or `layout.jsx` file:
  ```tsx filename="app/layout.tsx" framework=nextjs-app
  import { VercelToolbar } from '@vercel/toolbar/next';

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const shouldInjectToolbar = process.env.NODE_ENV === 'development';
    return (
      <html lang="en">
        <body>
          {children}
          {shouldInjectToolbar && <VercelToolbar />}
        </body>
      </html>
    );
  }
  ```
  ```jsx filename="app/layout.jsx" framework=nextjs-app
  import { VercelToolbar } from '@vercel/toolbar/next';

  export default function RootLayout({ children }) {
    const shouldInjectToolbar = process.env.NODE_ENV === 'development';
    return (
      <html lang="en">
        <body>
          {children}
          {shouldInjectToolbar && <VercelToolbar />}
        </body>
      </html>
    );
  }
  ```
  > For \['nextjs']:
  Then add the following code to your `_app.tsx` or `_app.jsx` file:
  ```ts filename="pages/_app.tsx" framework=nextjs
  import { VercelToolbar } from '@vercel/toolbar/next';
  import type { AppProps } from 'next/app';

  export default function MyApp({ Component, pageProps }: AppProps) {
    const shouldInjectToolbar = process.env.NODE_ENV === 'development'
    return (
      <>
        <Component {...pageProps} />
        {shouldInjectToolbar && <VercelToolbar />}
      </>
    );
  }
  ```
  ```js filename="pages/_app.jsx" framework=nextjs
  import { VercelToolbar } from '@vercel/toolbar/next';

  export default function MyApp({ Component, pageProps }) {
    const shouldInjectToolbar = process.env.NODE_ENV === 'development';
    return (
      <>
        <Component {...pageProps} />
        {shouldInjectToolbar && <VercelToolbar />}
      </>
    );
  }
  ```
  > For \['sveltekit']:
  Then add the following code to your root `+layout.svelte` file:
  ```ts filename="src/routes/+layout.svelte" framework=sveltekit
  <script lang="ts">
    import { mountVercelToolbar } from '@vercel/toolbar/vite';
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';

    if (dev) {
      onMount(() => mountVercelToolbar());
    }
  </script>
  ```
  ```js filename="src/routes/+layout.svelte" framework=sveltekit
  <script>
    import { mountVercelToolbar } from '@vercel/toolbar/vite';
    import { onMount } from 'svelte';
    import { dev } from '$app/environment';

    if (dev) {
      onMount(() => mountVercelToolbar());
    }
  </script>
  ```
  > For \['nuxt']:
  This will automatically add the `@vercel/toolbar` module to your Nuxt configuration file.
  ```js filename="nuxt.config.js" framework=nuxt
  export default defineNuxtConfig({
    modules: ['@vercel/toolbar'],
  });
  ```
  ```ts filename="nuxt.config.ts" framework=nuxt
  export default defineNuxtConfig({
    modules: ['@vercel/toolbar'],
  });
  ```
  You do not need to configure anything else.

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
