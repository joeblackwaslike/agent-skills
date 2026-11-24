---
title: PACKAGE_MANAGEMENT_NO_UNRESOLVED_IMPORTS
product: vercel
url: /docs/conformance/rules/PACKAGE_MANAGEMENT_NO_UNRESOLVED_IMPORTS
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_MANAGEMENT_NO_UNRESOLVED_IMPORTS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Import statements that can not be resolved to a local file or a package from package.json dependencies are not allowed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/package_management_no_unresolved_imports.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9b4ad5ff23ae2132af854ed17d76cce67ed98da03a35592ab3fc0d40a7c0fee3"
---

# PACKAGE_MANAGEMENT_NO_UNRESOLVED_IMPORTS

> Conformance is available on Enterprise plans

All imports must be able to be resolved to a file local to the workspace or a
package declared as a dependency within the `package.json` file. This ensures
that the workspace has not missed any dependencies and is not relying on
global dependencies.

## Example

```ts filename="component.ts"
import { useState } from 'react';
import { useRouter } from 'next/router';
```

The `package.json` is missing a dependency on the `next` package.

```json filename="package.json"
{
  "name": "shared-component-pkg",
  "dependencies": {
    "react": "19.0.0-beta-4508873393-20240430"
  }
}
```

## How to fix

If the workspace is missing a package dependency, add the appropriate one to
the `package.json` file of the workspace. In the example above, a dependency
on the `next` package should be added.

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
