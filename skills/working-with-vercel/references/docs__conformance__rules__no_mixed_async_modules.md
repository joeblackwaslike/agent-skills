---
title: NO_MIXED_ASYNC_MODULES
product: vercel
url: /docs/conformance/rules/NO_MIXED_ASYNC_MODULES
canonical_url: "https://vercel.com/docs/conformance/rules/NO_MIXED_ASYNC_MODULES"
last_updated: 2025-07-18
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent imports to modules that contain top-level awaits in your applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_mixed_async_modules.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "81131160fc3e74e6486ddc913dca9b17e96c98c28f28bbe1f05b058733086c14"
---

# NO_MIXED_ASYNC_MODULES

> **🔒 Permissions Required**: Conformance

Top-level await expressions in modules that are imported by other modules in sync
prevent possible lazy module optimizations from being deployed on the module containing
the top-level await.

One such optimization this prevents is inline lazy imports. Inline lazy imports allow
for modules to be lazily evaluated and executed when they're used, rather than at
initialization time of the module that uses them, improving initialization performance.

This is particularly impactful for modules that might only be used conditionally or
given a user's interaction which might happen much latter in an application. Without this optimization, the module initialization times, such as for cold boots on Vercel Functions, could be slowed down for every request.

## How to fix

Consider refactoring the import to a dynamic import instead, or removing the top-level await
in favor of standard import.

If a top-level await is important, then it's important that any other modules importing the
module with the top-level await do so dynamically, as to avoid affecting initialization performance.

For example, this can be refactored:

```js
// Contains a top-level await
import { asyncConfig } from 'someModule';

function doSomething(data) {
  processData(data, asyncConfig);
}
```

To this:

```js
function doSomething(data) {
  import('someModule').then(({ asyncConfig }) => {
    processData(data, asyncConfig);
  });
}
```

Or this:

```js
import { asyncConfig } from 'someModule';

// Note the async keyword on the function
async function doSomething(data) {
  processData(data, asyncConfig);
}
```


---

[View full sitemap](/docs/sitemap)
