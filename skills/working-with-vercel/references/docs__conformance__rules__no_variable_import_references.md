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
source: "https://vercel.com/docs/conformance/rules/no_variable_import_references.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "9ddd440304cc7676bd0fbb63400255091b78f8699f66639284766a5f182ff20f"
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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
