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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f3d4c3403bea41d8b6c670790530d1c5efba91897a0a087ee7d819ac107000ae"
---

# PACKAGE_JSON_DUPLICATE_DEPENDENCIES

> Conformance is available on Enterprise plans

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
