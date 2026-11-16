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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/package_json_duplicate_dependencies.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "96dc46a10bf5e28d13a68ed212adf070cfae3f18614c13b5f16330e5d7ee5269"
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
