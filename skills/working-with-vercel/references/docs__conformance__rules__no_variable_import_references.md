---
title: NO_VARIABLE_IMPORT_REFERENCES
product: vercel
url: /docs/conformance/rules/NO_VARIABLE_IMPORT_REFERENCES
canonical_url: "https://vercel.com/docs/conformance/rules/NO_VARIABLE_IMPORT_REFERENCES"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: import and require statements must be passed string literals to avoid arbitrary user access to code.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/no_variable_import_references.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e346eb5539c732244645d54956c3aaa105ef3bba6efd209283bfb2dc41c1ffd4"
---

# NO_VARIABLE_IMPORT_REFERENCES

> Conformance is available on Enterprise plans

`import` and `require` statements load code from another file. When the
location of the import is influenced by user input, the user may be able to
load code that would otherwise be inaccessible to them. Such imports should
protect against this by adding guards to make sure that arbitrary code can not
be loaded from the import statement.

## Example

The following code would be flagged by this rule:

```typescript
function loadDynamicCode(moduleName: string) {
  return import(moduleName);
}
```

In this example, it can not be guaranteed that the `moduleName` that is
provided would not be arbitrary input that could load unintended code.

## How to fix

Instances of this rule should be reviewed by a knowledgeable security person.
If user input is used to select which module is loaded, guards against arbitrary
strings should be added, such as only allowing access to a list of valid options.
If no user input is involved in the import, then this code could be allowlisted
after being reviewed by a security team member, but developers should be careful
to ensure that only the desired code can be loaded.

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
