---
title: TYPESCRIPT_CONFIGURATION
product: vercel
url: /docs/conformance/rules/TYPESCRIPT_CONFIGURATION
canonical_url: "https://vercel.com/docs/conformance/rules/TYPESCRIPT_CONFIGURATION"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: Requires that a workspace package that uses TypeScript files has configured TypeScript correctly for that workspace.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/typescript_configuration.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "dcc996bbb9eec0efac33d402a3ebfb5f96b5cf1a13785c0312c6c311e7af8894"
---

# TYPESCRIPT_CONFIGURATION

> Conformance is available on Enterprise plans

Using TypeScript in a workspace requires a few items to be set up correctly:

- There should be a `tsconfig.json` file at the root of the workspace.
- The `tsconfig.json` should extend from the repo's shared `tsconfig.json`
  file.
- The `tsconfig.json` file should specify a `tsBuildInfoFile` to speed up
  incremental compilation.
- The `tsconfig.json` file should have certain compiler options set for
  improved type safety.
- The workspace should have a `type-check` command that runs the TypeScript
  compiler to check for type issues.

These changes will ensure that the TypeScript compiler picks up the right
compiler settings for the project and that the TypeScript type checking
will run when the `type-check` command is run for the entire repository.

## Example

```sh
Conformance errors found!

A Conformance error occurred in test "TYPESCRIPT_CONFIGURATION".

package.json in "docs" should have a "type-check" script that runs TypeScript type checking.

To find out more information and how to fix this error, visit
/docs/conformance/rules/TYPESCRIPT_CONFIGURATION.

If this violation should be ignored, add the following entry to
/apps/docs/.allowlists/TYPESCRIPT_CONFIGURATION.allowlist.json
and get approval from the appropriate person.

{
  "testName": "TYPESCRIPT_CONFIGURATION",
  "reason": "TODO: Add reason why this violation is allowed to be ignored.",
  "location": {
    "workspace": "docs"
  }
}
```

## How To Fix

The shared `tsconfig.json` should have at least the following defined:

```json filename="tsconfig.json"
{
  "compilerOptions": {
    "incremental": true,
    "noUncheckedIndexedAccess": true,
    "strict": true
  }
}
```

For other configuration issues, the project's `tsconfig.json` may need to be
updated. Most files that don't require customization should look like:

```json filename="tsconfig.json"
{
  "extends": "your_shared_tsconfig/base.json",
  "exclude": ["dist", "node_modules"],
  "compilerOptions": {
    "tsBuildInfoFile": "node_modules/.cache/tsbuildinfo.json"
  }
}
```

Additionally, the project's `package.json` file may need to be updated. A
`type-check` command needs to be added to the `scripts` section:

```json filename="package.json"
{
  "scripts": {
    ...,
    "type-check": "tsc -p tsconfig.json --noEmit"
  }
}
```

The dependency on the repository's shared TypeScript must also exist:

```json
{
  "devDependencies": {
    "your_shared_tsconfig": "workspace:*"
  }
}
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
