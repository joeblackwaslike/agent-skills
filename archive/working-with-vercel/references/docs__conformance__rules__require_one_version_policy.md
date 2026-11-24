---
title: REQUIRE_ONE_VERSION_POLICY
product: vercel
url: /docs/conformance/rules/REQUIRE_ONE_VERSION_POLICY
canonical_url: "https://vercel.com/docs/conformance/rules/REQUIRE_ONE_VERSION_POLICY"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/customize
summary: Requires all dependencies in a monorepo to have the same version policy.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/conformance/rules/require_one_version_policy.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "09a09614a99d8f9eb2a0507f9367bca0aeb847e24a70b6431f7d8e3c00e1cc77"
---

# REQUIRE_ONE_VERSION_POLICY

> Conformance is available on Enterprise plans

Dependency mismatch is a common and easily preventable problem. When there
are multiple versions of a single dependency, not only is there additional complexity
in maintaining different versions of that dependency, there are also code size complications
with bundling. Having multiple versions of a given dependency will likely result in bloated
code size as each dependency version will need to be bundled independently. Having multiple
versions might also leave developers confused and lead to possible security implications.

Additionally – keeping versions consistent reduces the possibility of type mismatches across
the monorepo.

By default, this rule is disabled. Enable it by [customizing Conformance](/docs/conformance/customize).

## How to fix

Ensure all `package.json` files in your monorepo that have a `dependency` are
aligned to all have the same version. Version ranges are not always reliable, so it's recommended that
you pin all versions to the same given version to ensure consistency.

## Exceptions

Sometimes it is useful to temporarily have two or more versions of a dependency whilst incrementally
migrating a monorepo to having the same version policy. In which case, it's acceptable to allowlist
this rule on specific parts of the codebase using by [customizing Conformance](/docs/conformance/customize)
until all packages have been successfully migrated.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
