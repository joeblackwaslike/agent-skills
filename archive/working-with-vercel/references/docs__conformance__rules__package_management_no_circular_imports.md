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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/package_management_no_circular_imports.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "937e8ae7b430a1915a82f7a971e1a045a25e75b6701efc77e604504344b169e7"
---

# PACKAGE_MANAGEMENT_NO_CIRCULAR_IMPORTS

> Conformance is available on Enterprise plans

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
