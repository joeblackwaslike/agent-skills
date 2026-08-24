---
title: "Pages Plugin"
source: "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages"
fetched_at: "2026-08-24T04:43:10.282Z"
sha256: "389737f3cb52ecd035bc22653957f7b1a8618f86628765f4c21bfbae0046b756"
---

# Pages Plugin

Source: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages

- [](https://docusaurus.io/)[Plugins](https://docusaurus.io/docs/api/plugins)📦 plugin-content-pagesVersion: 3.10.2On this page
# 📦 plugin-content-pages

The default pages plugin for Docusaurus. The classic template ships with this plugin with default configurations. This plugin provides [creating pages](https://docusaurus.io/docs/creating-pages) functionality.

## Installation[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#installation)

npmYarnpnpmBun
```
npm install --save @docusaurus/plugin-content-pages
```

```
yarn add @docusaurus/plugin-content-pages
```

```
pnpm add @docusaurus/plugin-content-pages
```

```
bun add @docusaurus/plugin-content-pages
```

tipIf you use the preset `@docusaurus/preset-classic`, you don't need to install this plugin as a dependency.You can configure this plugin through the [preset options](https://docusaurus.io/docs/using-plugins#docusauruspreset-classic).

## Configuration[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#configuration)

Accepted fields:

NameTypeDefaultDescription`path``string``'src/pages'`Path to data on filesystem relative to site dir. Components in this directory will be automatically converted to pages.`editUrl``string | [EditUrlFn](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#EditUrlFn)``undefined`**Only for Markdown pages**. Base URL to edit your site. The final URL is computed by `editUrl + relativePostPath`. Using a function allows more nuanced control for each file. Omitting this variable entirely will disable edit links.`editLocalizedFiles``boolean``false`**Only for Markdown pages**. The edit URL will target the localized file, instead of the original unlocalized file. Ignored when `editUrl` is a function.`routeBasePath``string``'/'`URL route for the pages section of your site. **DO NOT** include a trailing slash.`include``string[]``['**/*.{js,jsx,ts,tsx,md,mdx}']`Matching files will be included and processed.`exclude``string[]`_See example configuration_No route will be created for matching files.`mdxPageComponent``string``'@theme/MDXPage'`Component used by each MDX page.`remarkPlugins``any[]``[]`Remark plugins passed to MDX.`rehypePlugins``any[]``[]`Rehype plugins passed to MDX.`recmaPlugins``any[]``[]`Recma plugins passed to MDX.`beforeDefaultRemarkPlugins``any[]``[]`Custom Remark plugins passed to MDX before the default Docusaurus Remark plugins.`beforeDefaultRehypePlugins``any[]``[]`Custom Rehype plugins passed to MDX before the default Docusaurus Rehype plugins.`showLastUpdateAuthor``boolean``false`**Only for Markdown pages**. Whether to display the author who last updated the page.`showLastUpdateTime``boolean``false`**Only for Markdown pages**. Whether to display the last date the page post was updated. This requires access to git history during the build, so will not work correctly with shallow clones (a common default for CI systems). With GitHub `actions/checkout`, use `fetch-depth: 0`. When deploying to Vercel, set the environment variable `VERCEL_DEEP_CLONE=true`.

### Types[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#types)

#### `EditUrlFn`[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#EditUrlFn)


```
type EditUrlFunction = (params: {  blogDirPath: string;  blogPath: string;  permalink: string;  locale: string;}) => string | undefined;
```


### Example configuration[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#ex-config)

You can configure this plugin through preset options or plugin options.

tipMost Docusaurus users configure this plugin through the preset options.

Preset optionsPlugin optionsIf you use a preset, configure this plugin through the [preset options](https://docusaurus.io/docs/using-plugins#docusauruspreset-classic):docusaurus.config.js
```
module.exports = {  presets: [    [      '@docusaurus/preset-classic',      {        pages: {          path: 'src/pages',          routeBasePath: '',          include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],          exclude: [            '**/_*.{js,jsx,ts,tsx,md,mdx}',            '**/_*/**',            '**/*.test.{js,jsx,ts,tsx}',            '**/__tests__/**',          ],          mdxPageComponent: '@theme/MDXPage',          remarkPlugins: [require('./my-remark-plugin')],          rehypePlugins: [],          beforeDefaultRemarkPlugins: [],          beforeDefaultRehypePlugins: [],        },      },    ],  ],};
```
If you are using a standalone plugin, provide options directly to the plugin:docusaurus.config.js
```
module.exports = {  plugins: [    [      '@docusaurus/plugin-content-pages',      {        path: 'src/pages',        routeBasePath: '',        include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],        exclude: [          '**/_*.{js,jsx,ts,tsx,md,mdx}',          '**/_*/**',          '**/*.test.{js,jsx,ts,tsx}',          '**/__tests__/**',        ],        mdxPageComponent: '@theme/MDXPage',        remarkPlugins: [require('./my-remark-plugin')],        rehypePlugins: [],        beforeDefaultRemarkPlugins: [],        beforeDefaultRehypePlugins: [],      },    ],  ],};
```


## Markdown front matter[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#markdown-front-matter)

Markdown pages can use the following Markdown [front matter](https://docusaurus.io/docs/markdown-features#front-matter) metadata fields, enclosed by a line `---` on either side.

Accepted fields:

NameTypeDefaultDescription`title``string`Markdown titleThe blog post title.`description``string`The first line of Markdown contentThe description of your page, which will become the `<meta name="description" content="..."/>` and `<meta property="og:description" content="..."/>` in `<head>`, used by search engines.`keywords``string[]``undefined`Keywords meta tag, which will become the `<meta name="keywords" content="keyword1,keyword2,..."/>` in `<head>`, used by search engines.`image``string``undefined`Cover or thumbnail image that will be used as the `<meta property="og:image" content="..."/>` in the `<head>`, enhancing link previews on social media and messaging platforms.`slug``string`File pathAllows to customize the page URL (`/<routeBasePath>/<slug>`). Support multiple patterns: `slug: my-page`, `slug: /my/page`, slug: `/`.`wrapperClassName``string`Class name to be added to the wrapper element to allow targeting specific page content.`hide_table_of_contents``boolean``false`Whether to hide the table of contents to the right.`draft``boolean``false`Draft pages will only be available during development.`unlisted``boolean``false`Unlisted pages will be available in both development and production. They will be "hidden" in production, not indexed, excluded from sitemaps, and can only be accessed by users having a direct link.
Example:


```
---title: Markdown Pagedescription: Markdown page SEO descriptionwrapperClassName: markdown-pagehide_table_of_contents: falsedraft: trueslug: /markdown-page---Markdown page content
```


## i18n[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#i18n)

Read the [i18n introduction](https://docusaurus.io/docs/i18n/introduction) first.

### Translation files location[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#translation-files-location)

**Base path**: `website/i18n/[locale]/docusaurus-plugin-content-pages`

- **Multi-instance path**: `website/i18n/[locale]/docusaurus-plugin-content-pages-[pluginId]`

- **JSON files**: extracted with [docusaurus write-translations](https://docusaurus.io/docs/cli#docusaurus-write-translations-sitedir)

- **Markdown files**: `website/i18n/[locale]/docusaurus-plugin-content-pages`

### Example file-system structure[​](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#example-file-system-structure)


```
website/i18n/[locale]/docusaurus-plugin-content-pages││ # translations for website/src/pages├── first-markdown-page.md└── second-markdown-page.md
```
[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/api/plugins/plugin-content-pages.mdx)Last updated on Jul 10, 2026 by Sébastien Lorber
