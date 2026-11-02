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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "694f4b4ad058f9dde8d298c146df23c8d5415a89a7a613e7290aba41c5afcaf0"
---

# WORKSPACE_MISSING_PACKAGE_JSON

> Conformance is available on Enterprise plans

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
