---
title: "Markdown Links"
source: "https://docusaurus.io/docs/markdown-features/links"
fetched_at: "2026-08-24T04:43:10.282Z"
sha256: "c80c10bed559f4dabcf112368a662a10693f0c2679ff2d6db562e3a000de25d1"
---

# Markdown Links

Source: https://docusaurus.io/docs/markdown-features/links

- [](https://docusaurus.io/)[Guides](https://docusaurus.io/docs/category/guides)[Markdown Features](https://docusaurus.io/docs/markdown-features)Markdown linksVersion: 3.10.2
# Markdown links

There are two ways of adding a link to another page: through a **URL path** and a **file path**.


```
- [URL path to another document](./installation)- [file path to another document](./installation.mdx)
```

URL paths are unprocessed by Docusaurus, and you can see them as directly rendering to `<a href="./installation">`, i.e. it will be resolved according to the page's URL location, rather than its file-system location.

If you want to reference another Markdown file **included by the same plugin**, you could use the relative path of the document you want to link to. Docusaurus' Markdown loader will convert the file path to the target file's URL path (and hence remove the `.md` extension).

For example, if you are in `docs/folder/doc1.md` and you want to reference `docs/folder/doc2.md`, `docs/folder/subfolder/doc3.md` and `docs/otherFolder/doc4.md`:

docs/folder/doc1.md
```
I am referencing a [document](doc2.mdx).Reference to another [document in a subfolder](subfolder/doc3.mdx).[Relative document](../otherFolder/doc4.mdx) referencing works as well.
```

Relative file paths are resolved against the current file's directory. Absolute file paths, on the other hand, are resolved relative to the **content root**, usually `docs/`, `blog/`, or [localized ones](https://docusaurus.io/docs/i18n/tutorial) like `i18n/zh-Hans/plugin-content-docs/current`.

Here are some examples of file path links and how they get resolved, assuming the current file is `website/docs/category/source.mdx`:

`[link](./target.mdx)` is resolved from the current file's directory `website/docs/category`.

- `[link](../target.mdx)` is resolved from the parent file's directory `website/docs`.

- `[link](/target.mdx)` is resolved from the docs content root `website/docs`, using in priority the localized docs.

- `[link](target.mdx)` is resolved from the current directory `website/docs/category`, then from the docs content roots, then from the site root.

Absolute file paths can also be relative to the site directory. However, beware that links that begin with `/docs/`, `/blog/` or `@site/` are **not portable** as you would need to manually update them if you create new doc versions or localize them:

- `[link](/docs/target.mdx)` is resolved from the site root `website` (⚠️ less portable).

- `[link](@site/docs/target.mdx)` is relative to the site root `website` (⚠️ less portable).

Using relative _file_ paths (with `.md` extensions) instead of relative _URL_ links provides the following benefits:

- Links will keep working on the GitHub interface and many Markdown editors

- You can customize the files' slugs without having to update all the links

- Moving files around the folders can be tracked by your editor, and some editors may automatically update file links

- A [versioned doc](https://docusaurus.io/docs/versioning) will link to another doc of the exact same version

- Relative URL links are very likely to break if you update the [trailingSlash config](https://docusaurus.io/docs/api/docusaurus-config#trailingSlash)

warningMarkdown file references only work when the source and target files are processed by the same plugin instance. This is a technical limitation of our Markdown processing architecture and will be fixed in the future. If you are linking files between plugins (e.g. linking to a doc page from a blog post), you have to use URL links.[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/guides/markdown-features/markdown-features-links.mdx)Last updated on Jul 10, 2026 by Sébastien Lorber
