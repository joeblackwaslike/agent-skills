---
title: NO_EVAL
product: vercel
url: /docs/conformance/rules/NO_EVAL
canonical_url: "https://vercel.com/docs/conformance/rules/NO_EVAL"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent unsafe usage of eval() in your application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_eval.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "9c56451fd122bbe42b01faee96ab09c930b3f4071c872e316222dc57ec59e25e"
---

# NO_EVAL

> Conformance is available on Enterprise plans

JavaScript's `eval()` function is potentially dangerous, is often misused, and
might cause security issues. Using `eval()` on untrusted code can open an
application up to several different injection attacks.

This rule will also catch eval-like function usage (or *implied eval*), such as
passing a string as the first argument to `setTimeout`.

This is especially dangerous when working with data from external sources.

```ts
const dontDoThis = req.body;
setTimeout(dontDoThis, 1000);
```

For more information on why you should never use evaluation, see the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval#never_use_eval!).

## Example

The lines below (and variations of those) will all be caught by this rule.

```ts
eval('() => console.log("DROP TABLE")');

setTimeout('() => console.log("DROP TABLE")', 1000);

window.setInterval('() => console.log("DROP TABLE")', 1000);

new Function('() => console.log("DROP TABLE")');
```

### References

Conformance rules are not type-aware, but will follow variable references
within the current module (or file).

```ts
import { importedVar } from 'foo';

// No error reported, as this rule doesn't have access to the value.
setTimeout(importedVar, 100);

const localVar = 'bar';

// An error will be reported, as the variable was declared in this file.
setTimeout(localVar, 100);
```

## How to fix

Avoid usage of this type of evaluation entirely in your application. Instead,
you should write the same functionality as raw code (not within a string).

```ts
setTimeout(() => {
  console.log('Safe usage');
});
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
