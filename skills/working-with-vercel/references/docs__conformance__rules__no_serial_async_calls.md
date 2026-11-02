---
title: NO_SERIAL_ASYNC_CALLS
product: vercel
url: /docs/conformance/rules/NO_SERIAL_ASYNC_CALLS
canonical_url: "https://vercel.com/docs/conformance/rules/NO_SERIAL_ASYNC_CALLS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Prevent blocking serial async await calls in your applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/no_serial_async_calls.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "acfcf8a2d2ae6a35369d98ea569c7333d582359f843c86491d5f94735b9fec16"
---

# NO_SERIAL_ASYNC_CALLS

> Conformance is available on Enterprise plans

Sequential execution of async/await calls can significantly impact performance because
each await call prevents further execution until resolving its Promise. This rule aims to
refactor sequential async/await calls into parallel executions to enhance performance.

You should note that this rule might not flag some async/await usage patterns. For example:

- Patterns involving conditional statements
- Call expressions
- Patterns that await in a manner that suggests non-serial dependencies between calls

For instance, scenarios where async calls depend conditionally on each other or are part of
complex expressions are not flagged. This includes cases where one async call's outcome is
necessary for subsequent calls, requiring serial execution due to logical or dependency reasons.

The following example **will not** be flagged by this rule:

```ts
async function updateDatabase() {
  const result1 = await async1();
  const result2 = await async2();
  doSomething(result1, result2);
}
```

These patterns fall outside the scope of this rule because safely suggesting parallelization requires more context,
and the rule uses conservative heuristics to avoid false positives.

## How to fix

Instead, of executing async logic sequentially, opt to refactor the logic so it can be run parallel.

This can be fixed using `Promise.all`:

```js
export async function getStaticProps() {
  const firstThing = await getFirstThing();
  const secondThing = await getSecondThing();

  return {
    props: {
      firstThing,
      secondThing,
    },
  };
}
```

We can extract both `await` expressions into a single `Promise.all`, as follows:

```js
export async function getStaticProps() {
  const [firstThing, secondThing] = await Promise.all([
    getFirstThing(),
    getSecondThing(),
  ]);

  return {
    props: {
      firstThing,
      secondThing,
    },
  };
}
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
