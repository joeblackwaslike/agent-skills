---
title: ESLINT_NEXT_RULES_REQUIRED
product: vercel
url: /docs/conformance/rules/ESLINT_NEXT_RULES_REQUIRED
canonical_url: "https://vercel.com/docs/conformance/rules/ESLINT_NEXT_RULES_REQUIRED"
last_updated: 2025-04-23
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that a workspace package is configured with required Next.js plugins and rules
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/eslint_next_rules_required.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c5059bf08561d1a5216c89edb99ac37db4bc9bf25892ce60f58fc43f077b704e"
---

# ESLINT_NEXT_RULES_REQUIRED

> **Availability**: Conformance is available on Enterprise plans

This Conformance check requires that ESLint plugins for Next.js are configured
correctly in your application, including:

- [@next/next](https://nextjs.org/docs/basic-features/eslint#eslint-plugin)

These plugins help to catch common Next.js issues, including performance.

## Example

```sh
A Conformance error occurred in test "ESLINT_NEXT_RULES_REQUIRED".

These ESLint plugins must have rules configured to run: @next/next

To find out more information and how to fix this error, visit
https://vercel.com/docs/conformance/rules/ESLINT_NEXT_RULES_REQUIRED.

If this violation should be ignored, add the following entry to
/apps/dashboard/.allowlists/ESLINT_NEXT_RULES_REQUIRED.allowlist.json and
get approval from the appropriate person.

{
  "testName": "ESLINT_NEXT_RULES_REQUIRED",
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
  Missing plugins: @next/next
  Registered plugins: import and @typescript-eslint
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
