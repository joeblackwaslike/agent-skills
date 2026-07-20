---
title: REQUIRE_CARET_DEPENDENCIES
product: vercel
url: /docs/conformance/rules/REQUIRE_CARET_DEPENDENCIES
canonical_url: "https://vercel.com/docs/conformance/rules/REQUIRE_CARET_DEPENDENCIES"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: "Prevent the use of dependencies without a caret (\"^\") as a prefix."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/require_caret_dependencies.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "b34817a1359179e2a66101369250586a627f3cb4f0c7e344e3f4ef44ba3db835"
---

# REQUIRE_CARET_DEPENDENCIES

> **🔒 Permissions Required**: Conformance

Using a caret ("^") as a prefix in the version of your dependencies is recommended. [Caret Ranges](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) allows patch and minor updates for versions 1.0.0 and above, patch updates for versions 0.X >=0.1.0, and no updates for versions 0.0.X. This rule is applicable to `"dependencies"` and `"devDependencies"`, and it helps maintain the security and health of your codebase.

By default, this rule is disabled. To enable it, refer to
[customizing Conformance](/docs/conformance/customize).

## Examples

This rule will catch any `package.json` files:

- Using `~` or `*` as a prefix of the version, like `~1.0.0`.
- Version without a prefix, such as `1.0.0`.

```JSX filename="package.json" {3-4} {7}
{
  "dependencies": {
    "chalk": "~5.3.0",
    "ms": "*2.1.3",
  },
  "devDependencies": {
    "semver": "7.6.0"
  },
}
```

## How to fix

If you hit this issue, you can resolve it by adding a `"^"` to the version of your dependency. If you want to keep using a pinned version, or another prefix, you can include the dependency in the [Allowlist](https://vercel.com/docs/conformance/allowlist).

```JSX filename="package.json" {3}
{
  "dependencies": {
    "semver": "^7.6.0"
  },
}
```


---

[View full sitemap](/docs/sitemap)
