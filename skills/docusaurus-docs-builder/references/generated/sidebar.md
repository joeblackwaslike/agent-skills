---
title: "Sidebar"
source: "https://docusaurus.io/docs/sidebar"
fetched_at: "2026-08-24T04:43:10.282Z"
sha256: "8ff3ba2158df96f4fe9ec05c4225602755f262ec04ce510c708336d8491913ef"
---

# Sidebar

Source: https://docusaurus.io/docs/sidebar

- [](https://docusaurus.io/)[Guides](https://docusaurus.io/docs/category/guides)[Docs](https://docusaurus.io/docs/docs-introduction)SidebarVersion: 3.10.2On this page
# Sidebar

Creating a sidebar is useful to:

Group multiple **related documents** into an ordered tree

- **Display a common sidebar** on each of those documents

- Provide **paginated navigation**, with next/previous button

To use sidebars on your Docusaurus site:

- Define a sidebars file that exports a dictionary of [sidebar objects](https://docusaurus.io/docs/sidebar#sidebar-object).

- Pass its path to the `@docusaurus/plugin-docs` plugin directly or via `@docusaurus/preset-classic`.

docusaurus.config.js
```
export default {  presets: [    [      '@docusaurus/preset-classic',      {        docs: {          sidebarPath: './sidebars.js',        },      },    ],  ],};
```

Node.js runtimeThe sidebars file is run with Node.js. You can't use or import browsers APIs, React or JSX in it.
This section serves as an overview of miscellaneous features of the doc sidebar. In the following sections, we will more systematically introduce the following concepts:

[## 📄️Sidebar items
The sidebar supports various item types:](https://docusaurus.io/docs/sidebar/items)
