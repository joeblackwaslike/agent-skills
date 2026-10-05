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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "51e50a27b29ed524014ee6d01f4d701a4cf6348f35df782b1e7c2f6898dd9559"
---

# NO_MIXED_ASYNC_MODULES

> **Availability**: Conformance is available on Enterprise plans

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
