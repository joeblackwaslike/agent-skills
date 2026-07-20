---
title: PACKAGE_MANAGEMENT_NO_CIRCULAR_IMPORTS
product: vercel
url: /docs/conformance/rules/PACKAGE_MANAGEMENT_NO_CIRCULAR_IMPORTS
canonical_url: "https://vercel.com/docs/conformance/rules/PACKAGE_MANAGEMENT_NO_CIRCULAR_IMPORTS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Circular imports between two files are not allowed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/package_management_no_circular_imports.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "ad059e56f329007ebadf4ea6900bafabc6ca01431e70a411ec6758b1fb01ca0d"
---

# PACKAGE_MANAGEMENT_NO_CIRCULAR_IMPORTS

> **🔒 Permissions Required**: Conformance

This check ensures that there is no path through import statements back to the
original file. This helps to keep dependencies between files clean, which aids
in dependency analysis and refactoring.

## Example

```ts filename="component-a.ts"
import Badge from './component-b';

export function withHigherOrderComponent({ children }) {
  return <div>{children}</div>;
}

export function Page() {
  return (
    <div>
      <Badge />
    </div>
  );
}
```

```ts filename="component-b.ts"
import { withHigherOrderComponent } from './component-a';

function Badge() {
  return <div>Badge</div>;
}

export default withHigherOrderComponent(Badge);
```

## How to fix

The exports in the file that has a circular import should be refactored so that
the circular import doesn't exist anymore. This might be fixed by moving some
of the exports in a file to a separate file so that the imports don't cause a
circular import. In some cases, it may be necessary to refactor the code to
avoid the circular import.


---

[View full sitemap](/docs/sitemap)
