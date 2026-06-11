---
title: "Pages Plugin"
source: "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages"
fetched_at: "2026-06-08T05:39:47.809Z"
sha256: "da9884c0a578f128442149c643ae76cfa865cdc3c7f287c4681df45a69fc650a"
---

# Pages Plugin

Source: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages

- Plugins📦 plugin-content-pagesVersion: 3.10.1On this page
# 📦 plugin-content-pages

The default pages plugin for Docusaurus. The classic template ships with this plugin with default configurations. This plugin provides creating pages functionality.

## Installation​

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

tipIf you use the preset `@docusaurus/preset-classic`, you don't need to install this plugin as a dependency.You can configure this plugin through the preset options.

## Configuration​

Accepted fields:

NameTypeDefaultDescription`path``string``'src/pages'`Path to data on filesystem relative to site dir. Components in this directory will be automatically converted to pages.`editUrl``string | EditUrlFn``undefined`**Only for Markdown pages**. Base URL to edit your site. The final URL is computed by `editUrl + relativePostPath`. Using a function allows more nuanced control for each file. Omitting this variable entirely will disable edit links.`editLocalizedFiles``boolean``false`**Only for Markdown pages**. The edit URL will target the localized file, instead of the original unlocalized file. Ignored when `editUrl` is a function.`routeBasePath``string``'/'`URL route for the pages section of your site. **DO NOT** include a trailing slash.`include``string[]``['**/*.{js,jsx,ts,tsx,md,mdx}']`Matching files will be included and processed.`exclude``string[]`_See example configuration_No route will be created for matching files.`mdxPageComponent``string``'@theme/MDXPage'`Component used by each MDX page.`remarkPlugins``any[]``[]`Remark plugins passed to MDX.`rehypePlugins``any[]``[]`Rehype plugins passed to MDX.`recmaPlugins``any[]``[]`Recma plugins passed to MDX.`beforeDefaultRemarkPlugins``any[]``[]`Custom Remark plugins passed to MDX before the default Docusaurus Remark plugins.`beforeDefaultRehypePlugins``any[]``[]`Custom Rehype plugins passed to MDX before the default Docusaurus Rehype plugins.`showLastUpdateAuthor``boolean``false`**Only for Markdown pages**. Whether to display the author who last updated the page.`showLastUpdateTime``boolean``false`**Only for Markdown pages**. Whether to display the last date the page post was updated. This requires access to git history during the build, so will not work correctly with shallow clones (a common default for CI systems). With GitHub `actions/checkout`, use `fetch-depth: 0`. When deploying to Vercel, set the environment variable `VERCEL_DEEP_CLONE=true`.

### Types​

#### `EditUrlFn`​


```
type EditUrlFunction = (params: {  blogDirPath: string;  blogPath: string;  permalink: string;  locale: string;}) => string | undefined;
```


### Example configuration​

You can configure this plugin through preset options or plugin options.

tipMost Docusaurus users configure this plugin through the preset options.

Preset optionsPlugin optionsIf you use a preset, configure this plugin through the preset options:docusaurus.config.js
```
module.exports = {  presets: [    [      '@docusaurus/preset-classic',      {        pages: {          path: 'src/pages',          routeBasePath: '',          include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],          exclude: [            '**/_*.{js,jsx,ts,tsx,md,mdx}',            '**/_*/**',            '**/*.test.{js,jsx,ts,tsx}',            '**/__tests__/**',          ],          mdxPageComponent: '@theme/MDXPage',          remarkPlugins: [require('./my-remark-plugin')],          rehypePlugins: [],          beforeDefaultRemarkPlugins: [],          beforeDefaultRehypePlugins: [],        },      },    ],  ],};
```
If you are using a standalone plugin, provide options directly to the plugin:docusaurus.config.js
```
module.exports = {  plugins: [    [      '@docusaurus/plugin-content-pages',      {        path: 'src/pages',        routeBasePath: '',        include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],        exclude: [          '**/_*.{js,jsx,ts,tsx,md,mdx}',          '**/_*/**',          '**/*.test.{js,jsx,ts,tsx}',          '**/__tests__/**',        ],        mdxPageComponent: '@theme/MDXPage',        remarkPlugins: [require('./my-remark-plugin')],        rehypePlugins: [],        beforeDefaultRemarkPlugins: [],        beforeDefaultRehypePlugins: [],      },    ],  ],};
```


## Markdown front matter​

Markdown pages can use the following Markdown front matter metadata fields, enclosed by a line `---` on either side.

Accepted fields:

NameTypeDefaultDescription`title``string`Markdown titleThe blog post title.`description``string`The first line of Markdown contentThe description of your page, which will become the `<meta name="description" content="..."/>` and `<meta property="og:description" content="..."/>` in `<head>`, used by search engines.`keywords``string[]``undefined`Keywords meta tag, which will become the `<meta name="keywords" content="keyword1,keyword2,..."/>` in `<head>`, used by search engines.`image``string``undefined`Cover or thumbnail image that will be used as the `<meta property="og:image" content="..."/>` in the `<head>`, enhancing link previews on social media and messaging platforms.`slug``string`File pathAllows to customize the page URL (`/<routeBasePath>/<slug>`). Support multiple patterns: `slug: my-page`, `slug: /my/page`, slug: `/`.`wrapperClassName``string`Class name to be added to the wrapper element to allow targeting specific page content.`hide_table_of_contents``boolean``false`Whether to hide the table of contents to the right.`draft``boolean``false`Draft pages will only be available during development.`unlisted``boolean``false`Unlisted pages will be available in both development and production. They will be "hidden" in production, not indexed, excluded from sitemaps, and can only be accessed by users having a direct link.
Example:


```
---title: Markdown Pagedescription: Markdown page SEO descriptionwrapperClassName: markdown-pagehide_table_of_contents: falsedraft: trueslug: /markdown-page---Markdown page content
```


## i18n​

Read the i18n introduction first.

### Translation files location​

**Base path**: `website/i18n/[locale]/docusaurus-plugin-content-pages`

- **Multi-instance path**: `website/i18n/[locale]/docusaurus-plugin-content-pages-[pluginId]`

- **JSON files**: extracted with `docusaurus write-translations`

- **Markdown files**: `website/i18n/[locale]/docusaurus-plugin-content-pages`

### Example file-system structure​


```
website/i18n/[locale]/docusaurus-plugin-content-pages││ # translations for website/src/pages├── first-markdown-page.md└── second-markdown-page.md
```
Edit this pageLast updated on Apr 30, 2026 by Sébastien Lorber
