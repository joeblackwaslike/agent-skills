---
title: TESTS_NO_ONLY
product: vercel
url: /docs/conformance/rules/TESTS_NO_ONLY
canonical_url: "https://vercel.com/docs/conformance/rules/TESTS_NO_ONLY"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that focused tests (i.e. it.only()) are unfocused.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/tests_no_only.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "d6cb9480d6643caa8684cb12fc78cb02a9f776ce9c3833ea7516323dd9d6a6de"
---

# TESTS_NO_ONLY

> **🔒 Permissions Required**: Conformance

Focusing tests can help to write and debug test suites, but focused tests
should be unfocused before committing changes.

This rule disallows focused tests so that they can't be committed without an
allowlist entry.

## Example

```ts filename="src/button/button.test.ts" {2}
describe('button', () => {
  it.only('should render', () => {
    // ...
  });
});
```

Note that the following patterns (and variants of these patterns) will be
reported as errors by this test. These should cover popular test frameworks and
runners, including:

- [`jest`](https://jestjs.io/)
- [`node:test`](https://nodejs.org/api/test.html#test-runner)
- [`vitest`](https://vitest.dev/)
- [`cypress`](https://www.cypress.io/)
- [`@playwright/test`](https://playwright.dev/docs/api/class-test)

```ts
// Most test frameworks and runners
describe.only(/* ... */);
it.concurrent.only(/* ... */);
test.only.each([])(/* ... */);
// Jest - supported in addition to the above
fdescribe(/* ... */);
fit.each([])(/* ... */);
ftest(/* ... */);
```

## How to fix

This error will be resolved when debugging is complete and the test has been
unfocused.

## Customization

The default pattern matches the default patterns for Jest and Vitest, however
you can provide your own patterns through the `paths` property.

The default configuration is:

```jsonc filename="conformance.config.jsonc" {3-5}
{
  "configuration": [
    "testPatterns": ["**/unit-tests/**/*.{js,jsx}"]
  ]
}
```


---

[View full sitemap](/docs/sitemap)
