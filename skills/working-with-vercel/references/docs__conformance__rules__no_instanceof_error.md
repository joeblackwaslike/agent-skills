---
title: NO_INSTANCEOF_ERROR
product: vercel
url: /docs/conformance/rules/NO_INSTANCEOF_ERROR
canonical_url: "https://vercel.com/docs/conformance/rules/NO_INSTANCEOF_ERROR"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Disallows using `error instanceof Error` comparisons due to risk of false negatives.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_instanceof_error.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "efd6d6c6700a62fced23bae4934e87ddba2e81c817d6427eb709b73ed7555f19"
---

# NO_INSTANCEOF_ERROR

> **🔒 Permissions Required**: Conformance

A common pattern for checking if an object is an error is to use
`error instanceof Error`.

This pattern is problematic because errors can come from other [realms](https://tc39.es/ecma262/#realm).
Errors from other realms are instantiated from the realm's global `Error`
constructor, and are therefore not instances of the current realm's global
`Error` constructor and will not pass the `instanceof` check.

Some examples of where you might hit this include:

- In Node.js, errors from a workers are instances of `Error` from the worker's
  global environment.
- In browser environments, errors from `iframe` are instances of `Error` from
  the `iframe`'s global environment (i.e. `iframe.contentWindow.Error`).

By default, this rule is disabled. To enable it, refer to
[customizing Conformance](/docs/conformance/customize).

## Examples

In this example, an error is returned from a [`vm`](https://nodejs.org/api/vm.html) context. As this error was created in a different realm, `instanceof Error` returns false.

```tsx {6}
const vm = require('node:vm');

const context = vm.createContext({});
const error = vm.runInContext('new Error()', context);

if (error instanceof Error) {
  // Returns `false` because `error` is from a different realm.
}
```

## How to fix

### Node.js

You can use [`isNativeError`](https://nodejs.org/api/util.html#utiltypesisnativeerrorvalue)
in Node.js environments, which will return `true` for errors from other realms.

```tsx {7}
import { isNativeError } from 'node:util/types';
const vm = require('node:vm');

const context = vm.createContext({});
const error = vm.runInContext('new Error()', context);

if (isNativeError(error)) {
  // ...
}
```

### Browsers

Use a library like [`is-error`](https://www.npmjs.com/package/is-error) to
ensure you cover errors from other realms.

You can also use `Object.prototype.toString.call(error) === '[object Error]'`
in some cases. This method will not work for custom errors, and you'll need to
traverse the prototype chain (i.e. `Object.getPrototypeOf(error)`)to handle
those cases.

The following code is a simplified version of the code used in the `is-error`
library:

```ts
function isError(error) {
  if (typeof error !== 'object') {
    return false;
  }

  if (error instanceof Error) {
    return true;
  }

  let currentError = error;
  while (currentError) {
    if (Object.prototype.toString.call(currentError) === '[object Error]') {
      return true;
    }
    currentError = Object.getPrototypeOf(currentError);
  }

  return false;
}
```


---

[View full sitemap](/docs/sitemap)
