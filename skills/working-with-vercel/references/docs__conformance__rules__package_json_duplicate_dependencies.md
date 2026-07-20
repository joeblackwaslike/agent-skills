---
title: PACKAGE_JSON_DUPLICATE_DEPENDENCIES
product: vercel
url: /docs/conformance/rules/PACKAGE_JSON_DUPLICATE_DEPENDENCIES
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_JSON_DUPLICATE_DEPENDENCIES"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Found duplicate dependencies between the list of dependencies and devDependencies or peerDependencies in a package.json file..
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/package_json_duplicate_dependencies.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b6a90a84e89f3503ea6941b5b00c69e9bcbb569e0dbf8196ba4dcbbe0f21664f"
---

# PACKAGE_JSON_DUPLICATE_DEPENDENCIES

> **🔒 Permissions Required**: Conformance

Packages that are listed in the `dependencies` section of `package.json` should
not be listed in `devDependencies` or `peerDependencies`. A package in the
`dependencies` section says that the package are required for the functionality
of your workspace, in which case there is no reason to also list it in
`devDependencies` or `peerDependencies`.

## Example

This `package.json` file would cause the check to fail:

```json filename="package.json"
{
  "name": "workspace",
  "dependencies": {
    "@next/mdx": "13.1.5"
  },
  "devDependencies": {
    "@next/mdx": "13.1.5"
  }
}
```

## How to fix

If the package is needed to use the package from your workspace, you can remove
the package from the `devDependencies` and `peerDependencies` sections. If the
package is only needed for development of your workspace or if the package is
only needed to express version compatibility requirements and it is not needed
for the functionality of your workspace when people use your package, then it
can be left in `devDependencies` or `peerDependencies` and be removed from
`dependencies`.


---

[View full sitemap](/docs/sitemap)
