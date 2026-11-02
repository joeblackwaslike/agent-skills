---
title: TYPESCRIPT_ONLY
product: vercel
url: /docs/conformance/rules/TYPESCRIPT_ONLY
canonical_url: "https://vercel.com/docs/conformance/rules/TYPESCRIPT_ONLY"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that a workspace package may only contain TypeScript files and no JavaScript or JSX files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/typescript_only.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "c7bae665f55d05891d350ba963b87cb74c87a108770f87ad435a0f8f99c660af"
---

# TYPESCRIPT_ONLY

> Conformance is available on Enterprise plans

[TypeScript](https://typescriptlang.org) is a superset of JavaScript that adds optional static typing. Using TypeScript in your codebase provides the following benefits:

- Type Safety: TypeScript is a strongly-typed language, which means that it
  allows you to catch errors at compile-time rather than at runtime. This can
  help you catch bugs earlier in the development process, making your code more
  reliable and easier to maintain over time.
- Tooling: TypeScript has excellent tooling support, including autocompletion,
  type checking, and refactoring tools. This can help you write code faster
  and with fewer errors.
- JavaScript Compatibility: TypeScript is a superset of JavaScript, which
  means that any valid JavaScript code is also valid TypeScript code. This
  means that you can gradually introduce TypeScript into your project without
  having to rewrite your entire codebase.
- Scalability: TypeScript is designed to work well with large-scale
  applications. With features like interfaces and classes, it allows you to
  write code that is easier to read and maintain, even as your project grows
  in complexity.

## Example

```sh
Conformance errors found!

A Conformance error occurred in test "TYPESCRIPT_ONLY".

JavaScript files are not allowed. Please convert the file to TypeScript.

To find out more information and how to fix this error, visit
/docs/conformance/rules/TYPESCRIPT_ONLY.

If this violation should be ignored, add the following entry to
/apps/docs/.allowlists/TYPESCRIPT_ONLY.allowlist.json
and get approval from the appropriate person.

{
  "testName": "TYPESCRIPT_ONLY",
  "reason": "TODO: Add reason why this violation is allowed to be ignored.",
  "location": {
    "filePath": "apps/docs/src/add-numbers.js"
  }
}
```

## How To Fix

To fix this error, you must convert the JavaScript file to TypeScript.
You can do this by changing the file extension from `.js` to `.ts` or `.jsx` to `.tsx` and
adding the appropriate type annotations.

```sh filename="diff"
--- a/apps/docs/src/add-numbers.js
+++ b/apps/docs/src/add-numbers.ts
-export function addNumbers(a, b) {
+export function addNumbers(a: number, b: number): number {
  return a + b;
}
```

## Customization

The check supports custom file globs and ignore file globs that can be specified on `conformance.config.jsonc`.
The globs take effect from the root of the workspace package.

```json filename="conformance.config.jsonc"
{
  "rules": {
    "TYPESCRIPT_ONLY": {
      "files": ["**/*.js", "**/*.jsx"],
      "ignoreFiles": ["**/*.custom-config.js"]
    }
  }
}
```

The default configuration is:

```jsonc filename="conformance.config.jsonc"
{
  "rules": {
    "TYPESCRIPT_ONLY": {
      "files": ["**/*.{cjs,mjs,js,jsx}"],
      "ignoreFiles": [
        "dist/**",
        "node_modules/**",
        ".next/**", // Next.js output
        ".eslintrc.{cjs,js}", // Common ESLint config file name
        "*.config.{cjs,mjs,js}", // Common config file name
        "*.setup.{cjs,mjs,js}", // Common setup file name
      ],
    },
  },
}
```


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
