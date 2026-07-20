---
title: REACT_NO_STATIC_IMPORTS_IN_EVENT_HANDLERS
product: vercel
url: /docs/conformance/rules/REACT_NO_STATIC_IMPORTS_IN_EVENT_HANDLERS
canonical_url: "https://vercel.com/docs/conformance/rules/REACT_NO_STATIC_IMPORTS_IN_EVENT_HANDLERS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Prevent static imports that are referenced only in React event handlers from being eagerly loaded in React components.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/react_no_static_imports_in_event_handlers.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "c2cebe2ca1e61064b04391b4200bf328c917007ef10d7e69f818a35fee839840"
---

# REACT_NO_STATIC_IMPORTS_IN_EVENT_HANDLERS

> **🔒 Permissions Required**: Conformance

React event handlers are async, and as such, this means we can defer loading the
associated code until we interact with the UI, triggering that event handler. Specifically, this
means we can improve initial code size and the overhead of loading the code until it is actually needed.

## How to fix

Instead of using static imports at the top of your module, you can use dynamic imports as needed in your React event handlers.

Before:

```js
import foo from 'foo';

const onClick = () => {
  foo.doSomething();
};
```

After:

```js
const onClick = () => {
  import('foo').then((foo) => {
    foo.doSomething();
  });
};
```

Additionally, you can [configure](/docs/conformance/customize) the rule for only specific React event handlers:

```json
"REACT_NO_STATIC_IMPORTS_IN_EVENT_HANDLERS": {
  eventAllowList: ['onClick'],
}
```


---

[View full sitemap](/docs/sitemap)
