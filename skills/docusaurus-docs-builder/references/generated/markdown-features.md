---
title: "Markdown Features"
source: "https://docusaurus.io/docs/markdown-features"
fetched_at: "2026-08-24T04:43:10.282Z"
sha256: "c331cd80e304e5b8d8b0c8f8460da4d70545bc4abd52890a8d49d716b3c73ff9"
---

# Markdown Features

Source: https://docusaurus.io/docs/markdown-features

- [](https://docusaurus.io/)[Guides](https://docusaurus.io/docs/category/guides)Markdown FeaturesVersion: 3.10.2On this page
# Markdown Features

Docusaurus uses **[Markdown](https://commonmark.org/)** as its main content authoring format.

Learn MarkdownYou can [learn Markdown in 10 minutes](https://commonmark.org/help/).
Docusaurus uses modern tooling to help you create **interactive documentation**.

The **[MDX](https://mdxjs.com/)** compiler transforms **Markdown files to React components**, and allows you to use JSX in your Markdown content. This enables you to easily interleave React components within your content, and create delightful learning experiences.

Use the MDX PlaygroundThe **[MDX playground](https://mdxjs.com/playground/)** is your new best friend!It is a very helpful debugging tool that shows how the MDX compiler transforms Markdown to React.**Options**: select the right format (MDX or CommonMark) and the following plugins Docusaurus uses: `remark-gfm`, `remark-directive`, `rehype-raw`.

## MDX vs. CommonMark[​](https://docusaurus.io/docs/markdown-features#mdx-vs-commonmark)

Docusaurus compiles both `.md` and `.mdx` files to React components using the MDX compiler, but **the syntax can be interpreted differently** depending on your settings.

The MDX compiler supports [2 formats](https://mdxjs.com/packages/mdx/#optionsformat):

The [MDX format](https://mdxjs.com/docs/what-is-mdx/): a powerful parser allowing the usage of JSX

- The [CommonMark format](https://commonmark.org/): a standard-compliant Markdown parser that does not allow the usage of JSX

By default, **Docusaurus v3 uses the MDX format for all files** (including `.md` files) for historical reasons.

It is possible to **opt-in for CommonMark** using the [siteConfig.markdown.format](https://docusaurus.io/docs/api/docusaurus-config#markdown) setting or the `mdx.format: md` front matter.

how to use CommonMarkIf you plan to use CommonMark, we recommend the [siteConfig.markdown.format: 'detect'](https://docusaurus.io/docs/api/docusaurus-config#markdown) setting. The appropriate format will be selected automatically, based on file extensions:

- `.md` files will use the CommonMark format

- `.mdx` files will use the MDX format

Experimental CommonMark supportThe CommonMark support is **experimental** and currently has a few [limitations](https://github.com/facebook/docusaurus/issues/9092).

## Standard features[​](https://docusaurus.io/docs/markdown-features#standard-features)

Markdown is a syntax that enables you to write formatted content in a readable syntax.


```
### My Doc SectionHello world message with some **bold** text, some _italic_ text, and a [link](/)![img alt](/img/docusaurus.png)
```

http://localhost:3000
### My Doc Section
Hello world message with some **bold** text, some _italic_ text and a [link](https://docusaurus.io/)
Markdown is declarativeSome may assume a 1-1 correlation between Markdown and HTML, e.g., `![Preview](/img/docusaurus.png)` will always become `<img src="/img/docusaurus.png" alt="Preview" />`, as-is. However, _that is not the case_.The Markdown syntax `![message](url)` only declaratively tells Docusaurus that an image needs to be inserted here, but we may do other things like transforming a [file path to URL path](https://docusaurus.io/docs/markdown-features/assets#images), so the generated markup may differ from the output of other Markdown renderers, or a naïve hand-transcription to the equivalent JSX/HTML code.In general, you should only assume the _semantics_ of the markup (````` fences become [code blocks](https://docusaurus.io/docs/markdown-features/code-blocks); `>` becomes [quotes](https://docusaurus.io/docs/markdown-features#quotes), etc.), but not the actual compiled output.

## Front matter[​](https://docusaurus.io/docs/markdown-features#front-matter)

Front matter is used to add metadata to your Markdown file. All content plugins have their own front matter schema, and use the front matter to enrich the default metadata inferred from the content or other configuration.

Front matter is provided at the very top of the file, enclosed by three dashes `---`. The content is parsed as [YAML](https://yaml.org/spec/1.2.2/).


```
---title: My Doc Titlemore_data:  - Can be provided  - as: objects    or: arrays---
```

infoThe API documentation of each official plugin lists the supported attributes:

- [Docs front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter)

- [Blog front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#markdown-front-matter)

- [Pages front matter](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-pages#markdown-front-matter)

enhance your front matterUse the [Markdown config parseFrontMatter function](https://docusaurus.io/docs/api/docusaurus-config#markdown) to provide your own front matter parser, or to enhance the default parser.It is possible to reuse the default parser to wrap it with your own custom proprietary logic. This makes it possible to implement convenient front matter transformations, shortcuts, or to integrate with external systems using front matter that Docusaurus plugins do not support.docusaurus.config.js
```
export default {  markdown: {    parseFrontMatter: async (params) => {      // Reuse the default parser      const result = await params.defaultParseFrontMatter(params);      // Process front matter description placeholders      result.frontMatter.description =        result.frontMatter.description?.replaceAll('{{MY_VAR}}', 'MY_VALUE');      // Create your own front matter shortcut      if (result.frontMatter.i_do_not_want_docs_pagination) {        result.frontMatter.pagination_prev = null;        result.frontMatter.pagination_next = null;      }      // Rename an unsupported front matter coming from another system      if (result.frontMatter.cms_seo_summary) {        result.frontMatter.description = result.frontMatter.cms_seo_summary;        delete result.frontMatter.cms_seo_summary;      }      return result;    },  },};
```


## Quotes[​](https://docusaurus.io/docs/markdown-features#quotes)

Markdown quotes are beautifully styled:


```
> Easy to maintain open source documentation websites.>> — Docusaurus
```

http://localhost:3000
Easy to maintain open source documentation websites.

— Docusaurus

## Details[​](https://docusaurus.io/docs/markdown-features#details)

Markdown can embed HTML elements, and [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) HTML elements are beautifully styled:


```
### Details element example<details>  <summary>Toggle me!</summary>  This is the detailed content  ```js  console.log("Markdown features including the code block are available");  ```  You can use Markdown here including **bold** and _italic_ text, and [inline link](https://docusaurus.io)  <details>    <summary>Nested toggle! Some surprise inside...</summary>    😲😲😲😲😲  </details></details>
```

http://localhost:3000
### Details element example
Toggle me!This is the detailed content
```
console.log("Markdown features including the code block are available");
```
You can use Markdown here including **bold** and _italic_ text, and [inline link](https://docusaurus.io)Nested toggle! Some surprise inside...😲😲😲😲😲
infoYou may want to keep your `<summary>` on a single line. Keep in mind that [MDX creates extra HTML <p> paragraphs for line breaks.](https://mdxjs.com/migrating/v2/#jsx). When in doubt, use the [MDX playground](https://mdxjs.com/playground/) to troubleshoot `<details>` rendering problems.[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/guides/markdown-features/markdown-features-intro.mdx)Last updated on Jul 10, 2026 by Sébastien Lorber
