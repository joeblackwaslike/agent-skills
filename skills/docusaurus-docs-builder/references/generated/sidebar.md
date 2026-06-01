---
title: "Sidebar"
source: "https://docusaurus.io/docs/sidebar"
fetched_at: "2026-06-01T05:42:26.403Z"
sha256: "5cb6b36773a7fbcf20a04a9140b551bdcfa37a570902fc762a67e83a3de3aea9"
---

# Sidebar

Source: https://docusaurus.io/docs/sidebar

- GuidesDocsSidebarVersion: 3.10.1On this page
# Sidebar

Creating a sidebar is useful to:

Group multiple **related documents** into an ordered tree

- **Display a common sidebar** on each of those documents

- Provide **paginated navigation**, with next/previous button

To use sidebars on your Docusaurus site:

- Define a sidebars file that exports a dictionary of sidebar objects.

- Pass its path to the `@docusaurus/plugin-docs` plugin directly or via `@docusaurus/preset-classic`.

docusaurus.config.js
```
export default {  presets: [    [      '@docusaurus/preset-classic',      {        docs: {          sidebarPath: './sidebars.js',        },      },    ],  ],};
```

Node.js runtimeThe sidebars file is run with Node.js. You can't use or import browsers APIs, React or JSX in it.
This section serves as an overview of miscellaneous features of the doc sidebar. In the following sections, we will more systematically introduce the following concepts:

## 📄️Sidebar items
The sidebar supports various item types:
