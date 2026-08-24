---
title: "Docs Introduction"
source: "https://docusaurus.io/docs/docs-introduction"
fetched_at: "2026-08-24T04:43:10.282Z"
sha256: "679c1367ccc1f1191727f25eb790c70aaea4029f007520c3bea8030f7c94cca4"
---

# Docs Introduction

Source: https://docusaurus.io/docs/docs-introduction

- [](https://docusaurus.io/)[Guides](https://docusaurus.io/docs/category/guides)DocsVersion: 3.10.2On this page
# Docs Introduction

The docs feature provides users with a way to organize Markdown files in a hierarchical format.

infoCheck the [Docs Plugin API Reference documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs) for an exhaustive list of options.
Your site's documentation is organized by four levels, from lowest to highest:

Individual pages.

- Sidebars.

- Versions.

- Plugin instances.

The guide will introduce them in that order: starting from [how individual pages can be configured](https://docusaurus.io/docs/create-doc), to [how to create a sidebar or multiple ones](https://docusaurus.io/docs/sidebar), to [how to create and manage versions](https://docusaurus.io/docs/versioning), to [how to use multiple docs plugin instances](https://docusaurus.io/docs/docs-multi-instance).

## Docs-only mode[​](https://docusaurus.io/docs/docs-introduction#docs-only-mode)

A freshly initialized Docusaurus site has the following structure:


```
example.com/                                -> generated from `src/pages/index.js`example.com/docs/intro                      -> generated from `docs/intro.md`example.com/docs/tutorial-basics/...        -> generated from `docs/tutorial-basics/...`...example.com/blog/2021/08/26/welcome         -> generated from `blog/2021-08-26-welcome/index.md`example.com/blog/2021/08/01/mdx-blog-post   -> generated from `blog/2021-08-01-mdx-blog-post.mdx`...
```

All docs will be served under the subroute `docs/`. But what if **your site only has docs**, or you want to prioritize your docs by putting them at the root?

Assume that you have the following in your configuration:

docusaurus.config.js
```
export default {  // ...  presets: [    [      '@docusaurus/preset-classic',      {        docs: {          /* docs plugin options */        },        blog: {          /* blog plugin options */        },        // ...      },    ],  ],};
```

To enter docs-only mode, change it to like this:

docusaurus.config.js
```
export default {  // ...  presets: [    [      '@docusaurus/preset-classic',      {        docs: {          routeBasePath: '/', // Serve the docs at the site's root          /* other docs plugin options */        },        blog: false, // Optional: disable the blog plugin        // ...      },    ],  ],};
```

Note that you **don't necessarily have to give up on using the blog** or other plugins; all that `routeBasePath: '/'` does is that instead of serving the docs through `https://example.com/docs/some-doc`, they are now at the site root: `https://example.com/some-doc`. The blog, if enabled, can still be accessed through the `blog/` subroute.

Don't forget to put some page at the root (`https://example.com/`) through adding the front matter:

docs/intro.md
```
---slug: /---This page will be the home page when users visit https://example.com/.
```

warningIf you added `slug: /` to a doc to make it the homepage, you should delete the existing homepage at `./src/pages/index.js`, or else there will be two files mapping to the same route!
Now, the site's structure will be like the following:


```
example.com/                       -> generated from `docs/intro.md`example.com/tutorial-basics/...    -> generated from `docs/tutorial-basics/...`...
```

tipThere's also a "blog-only mode" for those who only want to use the blog feature of Docusaurus. You can use the same method detailed above. Follow the setup instructions on [Blog-only mode](https://docusaurus.io/docs/blog#blog-only-mode).[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/guides/docs/docs-introduction.mdx)Last updated on Jul 10, 2026 by Sébastien Lorber
