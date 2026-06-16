---
title: Conformance Allowlists
product: vercel
url: /docs/conformance/allowlist
canonical_url: "https://vercel.com/docs/conformance/allowlist"
last_updated: 2025-11-21
type: conceptual
prerequisites:
  []
related:
  - /docs/code-owners
summary: Learn how to use allowlists to bypass your Conformance rules to merge changes into your codebase.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/allowlist.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "32bcd571c2145bb04d1fc07e8db99ff7948c868690443af2ddc8dab4d6f97b1f"
---

# Conformance Allowlists

> **🔒 Permissions Required**: Conformance

Conformance allowlists enable developers to integrate code into the codebase, bypassing specific Conformance rules when necessary. This helps with collaboration, ensures gradual rule implementation, and serves as a systematic checklist for addressing issues.

## Anatomy of an allowlist entry

An allowlist entry looks like the following:

```json filename="my-site/.allowlists"
{
  "testName": "NEXTJS_MISSING_SECURITY_HEADERS",
  "entries": [
    {
      "testName": "NEXTJS_MISSING_SECURITY_HEADERS",
      "reason": "TODO: This existed before the Conformance test was added but should be fixed.",
      "location": {
        "workspace": "dashboard",
        "filePath": "next.config.js"
      },
      "details": {
        "missingField": "headers"
      }
    }
  ]
}
```

The allowlist entry contains the following fields:

- `testName`: The name of the triggered test
- `needsResolution`: Whether the allowlist entry needs to be resolved
- `reason`: Why this code instance is allowed despite Conformance catching it
- `location`: The file path containing the error
- `details` (optionally): Details about the Conformance error

An allowlist entry will match an existing one when the `testName`, `location`,
and `details` fields all match. The `reason` is only used for documentation
purposes.

## The `needsResolution` field

This field is used by the CLI and our metrics to assess if an allowlisted issue
is something that needs to be resolved. The default value is `true`. When set
to `false`, this issue is considered to be "accepted" by the team and will not
show up in future metrics.

As this field was added after the release of Conformance, the value of this
field is considered `true` when the field is missing from an allowlist entry.

## Allowlists location

In a monorepo, Conformance allowlists are located in an `.allowlists/` directory
in the root directory of each workspace. For repository-wide rules, place allowlist entries in the top-level `.allowlists/` directory.

## Allowlisting all errors

The Conformance CLI can add an allowlist entry for all the active errors. This
can be useful when adding a new entry to the allowlist for review, or when a
new check is being added to the codebase. To add an allowlist entry for all
active errors in a package:

From the package directory:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i 
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i 
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i 
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i 
    ```
  </Code>
</CodeBlock>

From the root of a monorepo:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i 
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i 
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i 
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i 
    ```
  </Code>
</CodeBlock>

## Configuring Code Owners for Allowlists

You can use [Code Owners](/docs/code-owners) with allowlists for specific team reviews on updates. For instance, have the security team review security-related entries.

To configure Code Owners for all tests at the top level for the entire repository:

```text copy filename=".vercel.approvers"
**/*.allowlist.json @org/team:required
**/NO_CORS_HEADERS.* @org/security-team:required
```

For a specific workspace, add a `.vercel.approvers` file in the `.allowlists` sub-directory:

```text copy filename="apps/docs/.allowlists/.vercel.approvers"
NO_EXTERNAL_CSS_AT_IMPORTS.* @org/performance-team:required
```

The `:required` check ensures any modifications need the specified owners' review.


---

[View full sitemap](/docs/sitemap)
