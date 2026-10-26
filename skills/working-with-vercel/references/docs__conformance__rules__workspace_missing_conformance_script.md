---
title: WORKSPACE_MISSING_CONFORMANCE_SCRIPT
product: vercel
url: /docs/conformance/rules/WORKSPACE_MISSING_CONFORMANCE_SCRIPT
canonical_url: "https://vercel.com/docs/conformance/rules/WORKSPACE_MISSING_CONFORMANCE_SCRIPT"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: All packages must define a conformance script that invokes the Conformance package.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/rules/workspace_missing_conformance_script.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b6ada828252e3aaa59954c965ea323c735094ddb4f65a9f3e43a5987726e61ea"
---

# WORKSPACE_MISSING_CONFORMANCE_SCRIPT

> Conformance is available on Enterprise plans

Conformance requires a script to exist in every workspace in the
repository. This makes sure that Conformance rules are running on all code.
This test throws an error if a workspace does not define a `conformance` script
in the `package.json` file.

## Example

A workspace contains a `package.json` file that looks like:

```json filename="package.json"
{
  "name": "test-workspace",
  "scripts": {
    "build": "tsc -b"
  }
}
```

It does not contain a `conformance` script, so this check will fail.

## How to fix

Install the `@vercel-private/conformance` package in this workspace and define
a `conformance` script in the `package.json` file.

```json filename="package.json"
{
  "name": "test-workspace",
  "scripts": {
    "build": "tsc -b",
    "conformance": "vercel conformance"
  },
  "devDependencies": {
    "@vercel-private/conformance": "^1.0.0"
  }
}
```


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
