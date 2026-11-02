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
  - /docs/conformance/changelog
  - /docs/conformance/customize
summary: Prevent static imports that are referenced only in React event handlers from being eagerly loaded in React components.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/react_no_static_imports_in_event_handlers.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "26b2bfb0b1d92b498a1074a4763697c0a3fe55b8fe5306ce8bba632b79f045bf"
---

# REACT_NO_STATIC_IMPORTS_IN_EVENT_HANDLERS

> Conformance is available on Enterprise plans

> **💡 Note:** This rule has been deprecated as of version [1.8.0](/docs/conformance/changelog#1.8.0) and will be removed in 2.0.0.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
