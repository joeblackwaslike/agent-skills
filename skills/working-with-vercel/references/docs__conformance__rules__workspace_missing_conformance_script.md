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
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "4bee588adbfc97639ac97ef1f87ab94568f7b72d8db066fbaabd58b25eac1a45"
---

# WORKSPACE_MISSING_CONFORMANCE_SCRIPT

> **🔒 Permissions Required**: Conformance

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
