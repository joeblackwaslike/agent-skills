---
title: WORKSPACE_MISSING_PACKAGE_JSON
product: vercel
url: /docs/conformance/rules/WORKSPACE_MISSING_PACKAGE_JSON
canonical_url: "https://vercel.com/docs/conformance/rules/WORKSPACE_MISSING_PACKAGE_JSON"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: All directories that match a workspace glob must include a package.json file.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/workspace_missing_package_json.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "bb11cb2e7e3481fcd6a4ba9ae584e1763bb0079af0f0043d058a1711d921a8f6"
---

# WORKSPACE_MISSING_PACKAGE_JSON

> **🔒 Permissions Required**: Conformance

All directories that match a glob used to configure package manager workspaces
must be defined as a package and contain a `package.json` file. This check
prevents confusion where a new directory may be placed within a directory that
is configured to be a workspace but the new directory is not actually a
workspace.

## Example

The repository configures pnpm workspaces in this file:

```yaml filename="pnpm-workspace.yaml"
packages:
  - 'apps/*'
  - 'packages/*'
```

If a directory is defined in `packages/not-a-package`, then this test will fail
saying that the `not-a-package` directory must contain a `package.json` file.

## How to fix

Directories that match a workspace glob but do not have a `package.json` file
should either be converted to a package, be moved to a different directory, or
be excluded in the workspaces configuration.


---

[View full sitemap](/docs/sitemap)
