---
title: "Create Docs"
source: "https://docusaurus.io/docs/create-doc"
fetched_at: "2026-05-26T21:59:03.232Z"
sha256: "0bcce8c982766c327f4b598a579558f7326ff64bc668c21ccf47b3a84ca36288"
---

# Create Docs

Source: https://docusaurus.io/docs/create-doc

- GuidesDocsCreate a docVersion: 3.10.1On this page
# Create a doc

Create a Markdown file, `greeting.md`, and place it under the `docs` directory.


```
website # root directory of your site├── docs│   └── greeting.md├── src│   └── pages├── docusaurus.config.js├── ...
```


```
---description: Create a doc page with rich content.---# Hello from DocusaurusAre you ready to create the documentation site for your open source project?## Headerswill show up on the table of contents on the upper rightSo that your users will know what this page is all about without scrolling down or even without reading too much.## Only h2 and h3 will be in the TOC by default.You can configure the TOC heading levels either per-document or in the theme configuration.The headers are well-spaced so that the hierarchy is clear.- lists will help you- present the key points- that you want your users to remember  - and you may nest them    - multiple times
```

noteAll files prefixed with an underscore (`_`) under the `docs` directory are treated as "partial" pages and will be ignored by default.Read more about importing partial pages.

## Doc front matter​

The front matter is used to provide additional metadata for your doc page. Front matter is optional—Docusaurus will be able to infer all necessary metadata without the front matter. For example, the doc tags feature introduced below requires using front matter. For all possible fields, see the API documentation.

## Doc tags​

Tags are declared in the front matter and introduce another dimension of categorization in addition to the docs sidebar.

It is possible to define tags inline, or to reference predefined tags declared in a `tags file` (optional, usually `docs/tags.yml`).

In the following example:

`docusaurus` references a predefined tag key declared in `docs/tags.yml`

- `Releases` is an inline tag, because it does not exist in `docs/tags.yml`

docs/my-doc.md
```
---tags:  - Releases  - docusaurus---# TitleContent
```

docs/tags.yml
```
docusaurus:  label: 'Docusaurus'  permalink: '/docusaurus'  description: 'Docs related to the Docusaurus framework'
```

tipTags can also be declared with `tags: [Demo, Getting started]`.Read more about all the possible Yaml array syntaxes.

## Organizing folder structure​

How the Markdown files are arranged under the `docs` folder can have multiple impacts on Docusaurus content generation. However, most of them can be decoupled from the file structure.

### Document ID​

Every document has a unique `id`. By default, a document `id` is the name of the document (without the extension) relative to the root docs directory.

For example, the ID of `greeting.md` is `greeting`, and the ID of `guide/hello.md` is `guide/hello`.


```
website # Root directory of your site└── docs   ├── greeting.md   └── guide      └── hello.md
```

However, the **last part** of the `id` can be defined by the user in the front matter. For example, if `guide/hello.md`'s content is defined as below, its final `id` is `guide/part1`.


```
---id: part1---Lorem ipsum
```

The ID is used to refer to a document when hand-writing sidebars, or when using docs-related layout components or hooks.

### Doc URLs​

By default, the document's URL location is derived from the document `id`, which in turn is based on the document's file path.

If a file is named one of the following, the file name won't be included in the URL:

- Named as `index` (case-insensitive): `docs/Guides/index.md`

- Named as `README` (case-insensitive): `docs/Guides/README.mdx`

- Same name as parent folder: `docs/Guides/Guides.md`

In all cases, the default `slug` would only be `/Guides`, without the `/index`, `/README`, or duplicate `/Guides` segment.

noteThis convention is exactly the same as the category index convention. However, the `isCategoryIndex` configuration does _not_ affect the document URL.
Use the `slug` front matter to provide an explicit document URL and override the default one.

For example, suppose your site structure looks like this:


```
website # Root directory of your site└── docs    └── guide        └── hello.md
```

By default, `hello.md` will be available at `/docs/guide/hello`. You can change its URL location to `/docs/bonjour`:


```
---slug: /bonjour---Lorem ipsum
```

`slug` will be appended to the doc plugin's `routeBasePath`, which is `/docs` by default. See Docs-only mode for how to remove the `/docs` part from the URL.

noteIt is possible to use:

- absolute slugs: `slug: /mySlug`, `slug: /`...

- relative slugs: `slug: mySlug`, `slug: ./../mySlug`...

tipChanging a document's filename or `id`, will change its default URL. To prevent breaking permalinks when renaming files, we recommend setting an explicit `slug` to keep your URLs stable.

#### Making a document available at the root​

If you want a document to be available at the root, and have a path like `https://docusaurus.io/docs/`, you can use the slug front matter:


```
---id: my-home-docslug: /---Lorem ipsum
```


### Sidebars​

When using autogenerated sidebars, the file structure will determine the sidebar structure.

Our recommendation for file system organization is: make your file system mirror the sidebar structure (so you don't need to handwrite your `sidebars.js` file), and use the `slug` front matter to customize URLs of each document.Edit this pageLast updated on Apr 30, 2026 by Sébastien Lorber
