---
title: REQUIRE_NODE_VERSION_FILE
product: vercel
url: /docs/conformance/rules/REQUIRE_NODE_VERSION_FILE
canonical_url: "https://vercel.com/docs/conformance/rules/REQUIRE_NODE_VERSION_FILE"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Requires that workspaces have a valid Node.js version file (`.node-version` or `.nvmrc`) file defined.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/require_node_version_file.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "48227529f0584b2523b34c5ec916c264dee340f7aa3986455a26341c97985b40"
---

# REQUIRE_NODE_VERSION_FILE

> Conformance is available on Enterprise plans

> **💡 Note:** This rule is available from version 1.2.0.

Using a Node.js version file (`.node-version` or `.nvmrc`) ensures that all
developers and tooling (e.g., CI systems) use the same version of Node.js. This
practice helps to avoid inconsistencies between environments and can even
prevent bugs from being shipped to production.

As another benefit, committing a Node.js version file improves developer
experience, as many Node.js version management tools can automatically detect
and use the version defined in the file. This includes [GitHub Actions](https://docs.github.com/en/actions),
and popular Node.js version managers such as [`fnm`](https://github.com/Schniz/fnm)
and [`nvm`](https://github.com/nvm-sh/nvm).

This rule also validates to ensure that the version in the file is defined
in a way that is compatible with common tooling.

By default, this rule is disabled. To enable it, refer to
[customizing Conformance](/docs/conformance/customize).

## How to fix

If you hit this issue, you can resolve it by adding a Node.js version file at
the root of your workspace.

The example `.node-version` file below requires that Node.js `20.9` is used in
the workspace, allowing for any patch version (i.e. `20.9.1`). The level of
strictness can be adjusted based on your teams needs.

```text filename=".node-version"
v20.9
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
