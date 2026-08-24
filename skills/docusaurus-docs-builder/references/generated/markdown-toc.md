---
title: "Markdown Table of Contents"
source: "https://docusaurus.io/docs/markdown-features/toc"
fetched_at: "2026-08-24T04:43:10.282Z"
sha256: "16bad1836964486a1fd2d003d5a108a1dcb1d47ed1ed8ea26992ac8258f009ac"
---

# Markdown Table of Contents

Source: https://docusaurus.io/docs/markdown-features/toc

- [](https://docusaurus.io/)[Guides](https://docusaurus.io/docs/category/guides)[Markdown Features](https://docusaurus.io/docs/markdown-features)Headings and Table of contentsVersion: 3.10.2On this page
# Headings and Table of contents

## Markdown headings[​](https://docusaurus.io/docs/markdown-features/toc#markdown-headings)

You can use regular Markdown headings.


```
## Level 2 title### Level 3 title#### Level 4 title
```

Each Markdown heading will appear as a table of contents entry.

### Heading IDs[​](https://docusaurus.io/docs/markdown-features/toc#heading-ids)

Each heading has an ID that can be automatically generated or explicitly specified. Heading IDs allow you to link to a specific document heading in Markdown or JSX:


```
[link](#heading-id)
```


```
<Link to="#heading-id">link</Link>
```

By default, Docusaurus will generate heading IDs for you, based on the heading text. For example, `### Hello World` will have ID `hello-world`.

Generated IDs have **some limitations**:

The ID might not look good

- You might want to **change or translate** the text without updating the existing ID to avoid breaking links

A special syntax lets you set an **explicit heading id**.

- MDXCommonMark
```
### Hello World {/* #my-explicit-id */}### Hello World {#my-explicit-id}
```

```
### Hello World <!-- #my-explicit-id -->### Hello World {#my-explicit-id}
```

The heading id comment must start with `#`, be placed at the **end** of the heading and will be stripped from the rendered output.

tipUse the **[write-heading-ids](https://docusaurus.io/docs/cli#docusaurus-write-heading-ids-sitedir)** CLI command to add explicit IDs to all your Markdown documents.The `--syntax` option lets you choose which syntax you prefer:
The `classic` syntax for `{#headingId}`

- The `mdx-comment` syntax for `{/* #headingId */}`

Avoid the classic `{#id}` syntax for MDX filesFor MDX files, the `{#id}` syntax should be avoided. Since Docusaurus v3 and MDX v2, it is **not valid MDX syntax anymore**. It can break external tools that support MDX (IDEs and linters). It is only supported in Docusaurus for backward compatibility, thanks to the `markdown.mdx1Compat.headingIds` config option. The comment-based syntax should be preferred for MDX documents.
Avoid colliding IDsGenerated heading IDs will be guaranteed to be unique on each page, but if you use custom IDs, make sure each one appears exactly once on each page, or there will be two DOM elements with the same ID, which is invalid HTML semantics, and will lead to one heading being unlinkable.

## Table of contents heading level[​](https://docusaurus.io/docs/markdown-features/toc#table-of-contents-heading-level)

Each Markdown document displays a table of contents on the top-right corner. By default, this table only shows h2 and h3 headings, which should be sufficient for an overview of the page structure. In case you need to change the range of headings displayed, you can customize the minimum and maximum heading level — either per page or globally.

To set the heading level for a particular page, use the `toc_min_heading_level` and `toc_max_heading_level` front matter.

myDoc.md
```
---# Display h2 to h5 headingstoc_min_heading_level: 2toc_max_heading_level: 5---
```

To set the heading level for _all_ pages, use the [themeConfig.tableOfContents](https://docusaurus.io/docs/api/themes/configuration#table-of-contents) option.

docusaurus.config.js
```
export default {  themeConfig: {    tableOfContents: {      minHeadingLevel: 2,      maxHeadingLevel: 5,    },  },};
```

If you've set the options globally, you can still override them locally via front matter.

noteThe `themeConfig` option would apply to all TOC on the site, including [inline TOC](https://docusaurus.io/docs/markdown-features/toc#inline-table-of-contents), but front matter options only affect the top-right TOC. You need to use the `minHeadingLevel` and `maxHeadingLevel` props to customize each `<TOCInline />` component.

## Inline table of contents[​](https://docusaurus.io/docs/markdown-features/toc#inline-table-of-contents)

It is also possible to display an inline table of contents directly inside a Markdown document, thanks to MDX.

The `toc` variable is available in any MDX document and contains all the headings of an MDX document. By default, only `h2` and `h3` headings are displayed in the TOC. You can change which heading levels are visible by setting `minHeadingLevel` or `maxHeadingLevel` for individual `TOCInline` components.


```
import TOCInline from '@theme/TOCInline';<TOCInline toc={toc} />
```


http://localhost:3000[Markdown headings](https://docusaurus.io/docs/markdown-features/toc#markdown-headings)[Heading IDs](https://docusaurus.io/docs/markdown-features/toc#heading-ids)[Table of contents heading level](https://docusaurus.io/docs/markdown-features/toc#table-of-contents-heading-level)[Inline table of contents](https://docusaurus.io/docs/markdown-features/toc#inline-table-of-contents)[Customizing table of contents generation](https://docusaurus.io/docs/markdown-features/toc#customizing-table-of-contents-generation)[Example Section 1](https://docusaurus.io/docs/markdown-features/toc#example-section-1)[Example Subsection 1 a](https://docusaurus.io/docs/markdown-features/toc#example-subsection-1-a)[Example Subsection 1 b](https://docusaurus.io/docs/markdown-features/toc#example-subsection-1-b)[Example Subsection 1 c](https://docusaurus.io/docs/markdown-features/toc#example-subsection-1-c)[Example Section 2](https://docusaurus.io/docs/markdown-features/toc#example-section-2)[Example Subsection 2 a](https://docusaurus.io/docs/markdown-features/toc#example-subsection-2-a)[Example Subsection 2 b](https://docusaurus.io/docs/markdown-features/toc#example-subsection-2-b)[Example Subsection 2 c](https://docusaurus.io/docs/markdown-features/toc#example-subsection-2-c)[Example Section 3](https://docusaurus.io/docs/markdown-features/toc#example-section-3)[Example Subsection 3 a](https://docusaurus.io/docs/markdown-features/toc#example-subsection-3-a)[Example Subsection 3 b](https://docusaurus.io/docs/markdown-features/toc#example-subsection-3-b)[Example Subsection 3 c](https://docusaurus.io/docs/markdown-features/toc#example-subsection-3-c)
The `toc` global is just a list of heading items:


```
declare const toc: {  value: string;  id: string;  level: number;}[];
```

Note that the `toc` global is a flat array, so you can easily cut out unwanted nodes or insert extra nodes, and create a new TOC tree.


```
import TOCInline from '@theme/TOCInline';<TOCInline  // Only show h2 and h4 headings  toc={toc.filter((node) => node.level === 2 || node.level === 4)}  minHeadingLevel={2}  // Show h4 headings in addition to the default h2 and h3 headings  maxHeadingLevel={4}/>
```

http://localhost:3000[Markdown headings](https://docusaurus.io/docs/markdown-features/toc#markdown-headings)[Table of contents heading level](https://docusaurus.io/docs/markdown-features/toc#table-of-contents-heading-level)[Inline table of contents](https://docusaurus.io/docs/markdown-features/toc#inline-table-of-contents)[Customizing table of contents generation](https://docusaurus.io/docs/markdown-features/toc#customizing-table-of-contents-generation)[Example Section 1](https://docusaurus.io/docs/markdown-features/toc#example-section-1)[Example subsubsection 1 a I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-a-i)[Example subsubsection 1 a II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-a-ii)[Example subsubsection 1 a III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-a-iii)[Example subsubsection 1 b I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-b-i)[Example subsubsection 1 b II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-b-ii)[Example subsubsection 1 b III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-b-iii)[Example subsubsection 1 c I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-c-i)[Example subsubsection 1 c II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-c-ii)[Example subsubsection 1 c III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-c-iii)[Example Section 2](https://docusaurus.io/docs/markdown-features/toc#example-section-2)[Example subsubsection 2 a I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-a-i)[Example subsubsection 2 a II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-a-ii)[Example subsubsection 2 a III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-a-iii)[Example subsubsection 2 b I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-b-i)[Example subsubsection 2 b II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-b-ii)[Example subsubsection 2 b III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-b-iii)[Example subsubsection 2 c I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-c-i)[Example subsubsection 2 c II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-c-ii)[Example subsubsection 2 c III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-c-iii)[Example Section 3](https://docusaurus.io/docs/markdown-features/toc#example-section-3)[Example subsubsection 3 a I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-a-i)[Example subsubsection 3 a II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-a-ii)[Example subsubsection 3 a III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-a-iii)[Example subsubsection 3 b I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-b-i)[Example subsubsection 3 b II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-b-ii)[Example subsubsection 3 b III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-b-iii)[Example subsubsection 3 c I](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-c-i)[Example subsubsection 3 c II](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-c-ii)[Example subsubsection 3 c III](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-c-iii)

## Customizing table of contents generation[​](https://docusaurus.io/docs/markdown-features/toc#customizing-table-of-contents-generation)

The table-of-contents is generated by parsing the Markdown source with a [Remark plugin](https://docusaurus.io/docs/markdown-features/plugins). There are known edge-cases where it generates false-positives and false-negatives.

Markdown headings within hideable areas will still show up in the TOC. For example, headings within [Tabs](https://docusaurus.io/docs/markdown-features/tabs) and [details](https://docusaurus.io/docs/markdown-features#details) will not be excluded.

Non-Markdown headings will not show up in the TOC. This can be used to your advantage to tackle the aforementioned issue.


```
<details><summary>Some details containing headings</summary><h2 id="#heading-id">I'm a heading that will not show up in the TOC</h2>Some content...</details>
```

The ability to ergonomically insert extra headings or ignore certain headings is a work-in-progress. If this feature is important to you, please report your use-case in [this issue](https://github.com/facebook/docusaurus/issues/6201).

warningBelow is just some dummy content to have more table of contents items available on the current page.

## Example Section 1[​](https://docusaurus.io/docs/markdown-features/toc#example-section-1)

Lorem ipsum

### Example Subsection 1 a[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-1-a)

Lorem ipsum

#### Example subsubsection 1 a I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-a-i)

#### Example subsubsection 1 a II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-a-ii)

#### Example subsubsection 1 a III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-a-iii)

### Example Subsection 1 b[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-1-b)

Lorem ipsum

#### Example subsubsection 1 b I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-b-i)

#### Example subsubsection 1 b II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-b-ii)

#### Example subsubsection 1 b III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-b-iii)

### Example Subsection 1 c[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-1-c)

Lorem ipsum

#### Example subsubsection 1 c I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-c-i)

#### Example subsubsection 1 c II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-c-ii)

#### Example subsubsection 1 c III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-1-c-iii)

## Example Section 2[​](https://docusaurus.io/docs/markdown-features/toc#example-section-2)

Lorem ipsum

### Example Subsection 2 a[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-2-a)

Lorem ipsum

#### Example subsubsection 2 a I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-a-i)

#### Example subsubsection 2 a II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-a-ii)

#### Example subsubsection 2 a III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-a-iii)

### Example Subsection 2 b[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-2-b)

Lorem ipsum

#### Example subsubsection 2 b I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-b-i)

#### Example subsubsection 2 b II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-b-ii)

#### Example subsubsection 2 b III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-b-iii)

### Example Subsection 2 c[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-2-c)

Lorem ipsum

#### Example subsubsection 2 c I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-c-i)

#### Example subsubsection 2 c II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-c-ii)

#### Example subsubsection 2 c III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-2-c-iii)

## Example Section 3[​](https://docusaurus.io/docs/markdown-features/toc#example-section-3)

Lorem ipsum

### Example Subsection 3 a[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-3-a)

Lorem ipsum

#### Example subsubsection 3 a I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-a-i)

#### Example subsubsection 3 a II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-a-ii)

#### Example subsubsection 3 a III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-a-iii)

### Example Subsection 3 b[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-3-b)

Lorem ipsum

#### Example subsubsection 3 b I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-b-i)

#### Example subsubsection 3 b II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-b-ii)

#### Example subsubsection 3 b III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-b-iii)

### Example Subsection 3 c[​](https://docusaurus.io/docs/markdown-features/toc#example-subsection-3-c)

Lorem ipsum

#### Example subsubsection 3 c I[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-c-i)

#### Example subsubsection 3 c II[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-c-ii)

#### Example subsubsection 3 c III[​](https://docusaurus.io/docs/markdown-features/toc#example-subsubsection-3-c-iii)
[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/guides/markdown-features/markdown-features-toc.mdx)Last updated on Jul 10, 2026 by Sébastien Lorber
