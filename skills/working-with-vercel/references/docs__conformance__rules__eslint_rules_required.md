---
title: ESLINT_RULES_REQUIRED
product: vercel
url: /docs/conformance/rules/ESLINT_RULES_REQUIRED
canonical_url: "https://vercel.com/docs/conformance/rules/ESLINT_RULES_REQUIRED"
last_updated: 2025-04-23
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that a workspace package is configured with required ESLint plugins and rules
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/eslint_rules_required.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "bc7c0400a544c92fadec739f8d0072500e5f93e06c0c0a650c07c9744be66450"
---

# ESLINT_RULES_REQUIRED

> **🔒 Permissions Required**: Conformance

This Conformance check requires that ESLint plugins are configured correctly
in your application, including:

- [@typescript-eslint](https://typescript-eslint.io/)
- [eslint-comments](https://mysticatea.github.io/eslint-plugin-eslint-comments/)
- [import](https://github.com/import-js/eslint-plugin-import)

These plugins help to catch common issues, and ensure that ESLint is set
up to work with TypeScript where applicable.

## Example

```sh
A Conformance error occurred in test "ESLINT_RULES_REQUIRED".

These ESLint plugins must have rules configured to run: @typescript-eslint and import

To find out more information and how to fix this error, visit
https://vercel.com/docs/conformance/rules/ESLINT_RULES_REQUIRED.

If this violation should be ignored, add the following entry to
/apps/dashboard/.allowlists/ESLINT_RULES_REQUIRED.allowlist.json and
get approval from the appropriate person.

{
  "testName": "ESLINT_RULES_REQUIRED",
  "reason": "TODO: Add reason why this violation is allowed to be ignored.",
  "location": {
    "workspace": "dashboard"
  },
}
```

This check requires that certain ESLint plugins are installed and rules within
those plugins are configured to be errors. If you are missing required plugins,
you will receive an error such as:

```sh
ESLint configuration is missing required security plugins:
  Missing plugins: eslint-comments
  Registered plugins: import and @typescript-eslint
```

If all the required plugins are installed but some rules are not configured to
run or configured to be errors, you will receive an error such as:

```sh
`eslint-comments/no-unlimited-disable` must be specified as an error in the ESLint configuration, but is specified as off.
```

As a part of this test, some rules are forbidden from being disabled. If you
disable those rules, you will receive an error such as:

```sh
Disabling these ESLint rules is not allowed.
Please see the ESLint documentation for each rule for how to fix.
eslint-comments/disable-enable-pair
eslint-comments/no-restricted-disable
```

For more information on ESLint plugins and rules, see [plugins](https://eslint.org/docs/latest/user-guide/configuring/plugins) and [rules](https://eslint.org/docs/latest/user-guide/configuring/rules).

## How To Fix

The recommended approach for configuring ESLint in a monorepo is to have a
shared ESLint config in an internal package. See the [Turbo docs on ESLint](https://turborepo.com/docs/handbook/linting/eslint) to get started.

Once your monorepo has a shared ESLint config, you can add a `.eslintrc.cjs`
file to the root folder of your workspace with the contents:

```js copy filename=".eslintrc.cjs"
module.exports = {
  root: true,
  extends: ['eslint-config-custom/base'],
};
```

You should also add `"eslint-config-custom": "workspace:*"` to your
`devDependencies`.


---

[View full sitemap](/docs/sitemap)
