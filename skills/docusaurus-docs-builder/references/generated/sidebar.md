---
title: "Sidebar"
source: "https://docusaurus.io/docs/sidebar"
fetched_at: "2026-06-15T05:52:48.352Z"
sha256: "0b935f91485739595e5651ed9f4cd5f3f65db7ce845b4ca503b2f6d3384d203d"
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
