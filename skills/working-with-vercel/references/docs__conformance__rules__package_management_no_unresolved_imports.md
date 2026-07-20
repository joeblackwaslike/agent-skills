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
source: "https://vercel.com/docs/conformance/rules/package_management_no_unresolved_imports.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "5b137f0f0f1c5efbea9cd94a11d52a82848ee574f1b997dbfd07ce40050134c6"
---

# PACKAGE_MANAGEMENT_NO_UNRESOLVED_IMPORTS

> **🔒 Permissions Required**: Conformance

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


---

[View full sitemap](/docs/sitemap)
