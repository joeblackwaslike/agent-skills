---
title: TESTS_NO_CONDITIONAL_ASSERTIONS
product: vercel
url: /docs/conformance/rules/TESTS_NO_CONDITIONAL_ASSERTIONS
canonical_url: "https://vercel.com/docs/conformance/rules/TESTS_NO_CONDITIONAL_ASSERTIONS"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/allowlist
  - /docs/conformance/customize
summary: Requires that assertions are not conditional, or that expect.assertions is used.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/tests_no_conditional_assertions.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "fb71037b2336ca6c67382a40def1392e9df5ec567cfa32b84552ce87b988b0ab"
---

# TESTS_NO_CONDITIONAL_ASSERTIONS

> **🔒 Permissions Required**: Conformance

When possible, conditional test assertions should be avoided as they can lead
to false test passes if and when conditions are not evaluated as expected.

If you can't avoid using a condition in your test, you can satisfy this rule by
using an `expect.assertions` statement.

## Example

In this abstract example, there are two potential points of failure:

1. The button could throw a ButtonError during `render(Button)`, causing the
   first (`try`) assertion to be skipped.
2. The `throwError()` function could fail to throw, causing the second
   (`catch`) assertion to be skipped.

```ts filename="src/button/button.test.ts" {5,8}
describe('button', () => {
  it('should render', () => {
    try {
      const button = render(Button);
      expect(button).not.toBe(null);
      button.throwAnError();
    } catch (error) {
      expect(error).toBeInstanceOf(ButtonError);
    }
  });
});
```

## How to fix

There are two ways to resolve this error:

1. Refactor the test code to ensure that assertions are no longer conditional.
2. Use `expect.assertions` to inform the test runner that it should fail if the
   required number of assertions were not called during the test.

Taking our previous example, we can apply the second fix:

```ts filename="src/button/button.test.ts" {10}
describe('button', () => {
  it('should render', () => {
    try {
      const button = render(Button);
      expect(button).not.toBe(null);
      button.throwAnError();
    } catch (error) {
      expect(error).toBeInstanceOf(ButtonError);
    }
    expect.assertions(2);
  });
});
```

### Using `expect.assertions`

Most test frameworks and runners support `expect.assertions`, and this is the
preferred approach to resolving this error if you can't refactor your test
code.

To satisfy this rule, the test must not conditionally call `expect.assertions`.
This rule doesn't count or report on the number of assertions.

### What to do when you can't use `expect.assertions`

There may be cases where you can't use `expect.assertions` (i.e. your test
framework or runner doesn't support it), and refactoring the test code is not
a viable solution. In those cases, you have the following options:

1. You can use allowlists to allow individual violations (see: [Conformance
   Allowlists](/docs/conformance/allowlist)).
2. You can disable this test (see: [Customizing Conformance](/docs/conformance/customize)).

## Customization

The default pattern matches the default patterns for Jest and Vitest, however
you can provide your own patterns through the `paths` property.

The default configuration is:

```jsonc filename="conformance.config.jsonc" {2-4}
{
  "configuration": [
    "testPatterns": ["**/unit-tests/**/*.{js,jsx}"]
  ]
}
```


---

[View full sitemap](/docs/sitemap)
