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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/workspace_missing_package_json.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0d9b44ed7b375a2ca953f65f49a51eae06cae860ca84b1f552247fbb5a87d368"
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
