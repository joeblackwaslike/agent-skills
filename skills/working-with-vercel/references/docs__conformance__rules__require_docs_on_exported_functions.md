---
title: REQUIRE_DOCS_ON_EXPORTED_FUNCTIONS
product: vercel
url: /docs/conformance/rules/REQUIRE_DOCS_ON_EXPORTED_FUNCTIONS
canonical_url: "https://vercel.com/docs/conformance/rules/REQUIRE_DOCS_ON_EXPORTED_FUNCTIONS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that all exported functions have JSDoc comments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/require_docs_on_exported_functions.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "4cde7d4c1275f52b594d3eb5cea21f8362d93d90e3fe29691f09aaf13ebceea8"
---

# REQUIRE_DOCS_ON_EXPORTED_FUNCTIONS

> Conformance is available on Enterprise plans

> **💡 Note:** This rule is available from version 1.8.0.

Adding JSDoc to exported functions helps engineers to quickly understand the
purpose and application of those functions when reviewing or using them.

This is particularly important in packages where the source code may be
minified and/or obfuscated, and can save users time by avoiding the need to
find usage information in external documentation.

For more information on JSDoc, see [Getting started with JSDoc](https://jsdoc.app/about-getting-started).

Additionally, for non-TypeScript projects, JSDoc can be used to declare type
information for function parameters and return values. For packages, these
declarations can provide type information for both JavaScript and TypeScript
consumers.

## Examples

The below function is a minimal example of a function that would be caught by
this rule.

```ts
export function appendWorld(str: string): string {
  return str + ' world';
}
```

This rule will also catch references within the same file, and different ways
of declaring functions. For example:

```ts
const appendWorld = function (str: string): string {
  return str + ' world';
};

export default appendWorld;
```

This rule non-function exports and re-exports of functions.

## How to fix

To resolve this issue, add a JSDoc comment to the exported function.

```ts
/**
 * Modifies a string by appending `' world'` to it.
 */
export function appendWorld(str: string): string {
  return str + ' world';
}
```

You can add additional information to the JSDoc comment, such as descriptions
of the function's parameters and return value.

```ts
/**
 * Modifies a string by appending `' world'` to it.
 *
 * @param str - The string to modify.
 * @returns The modified string.
 */
export function appendWorld(str: string): string {
  return str + ' world';
}
```

The example above doesn't provide type information in the JSDoc comment, as
this information is already provided by the function signature. When working
without TypeScript, you can also provide this information using JSDoc.

```js
/**
 * Modifies a string by appending `' world'` to it.
 *
 * @param {string} str - The string to modify.
 * @returns {string} The modified string.
 */
export function appendWorld(str) {
  return str + ' world';
}
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
