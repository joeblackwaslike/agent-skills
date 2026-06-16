---
title: Conformance Custom Rules
product: vercel
url: /docs/conformance/custom-rules
canonical_url: "https://vercel.com/docs/conformance/custom-rules"
last_updated: 2026-02-18
type: conceptual
prerequisites:
  []
related:
  - /docs/conformance/custom-rules/forbidden-code
  - /docs/conformance/custom-rules/forbidden-properties
  - /docs/conformance/custom-rules/forbidden-dependencies
  - /docs/conformance/custom-rules/forbidden-imports
  - /docs/conformance/custom-rules/forbidden-packages
summary: Learn how Conformance improves collaboration, productivity, and software quality at scale.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/custom-rules.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "01913ce1946907c303d33689d00816c04d53b2a090a6e6d01d8c4dfcb33e6b58"
---

# Conformance Custom Rules

> **🔒 Permissions Required**: Conformance

Vercel's built-in Conformance rules are crafted from extensive experience in developing large-scale codebases and high-quality web applications. Recognizing the unique needs of different companies, teams, and products, Vercel offers configurable, no-code custom rules. These allow for tailored solutions to specific challenges.

Custom rules in Vercel feature unique error names and messages, providing deeper context and actionable resolution guidance. For example, they may include:

- Links to internal documentation
- Alternative methods for logging issues
- Information on who to contact for help

You can use custom rules to proactively prevent future issues, to reactively
prevent issues from reoccurring, and/or as a mitigation tool.

## Available custom rule types

We support the following custom rules types:

| Type                                                                              | Description                                                                     |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`forbidden-code`](/docs/conformance/custom-rules/forbidden-code)                 | Disallows code and code patterns through string and regular expression matches. |
| [`forbidden-properties`](/docs/conformance/custom-rules/forbidden-properties)     | Disallows properties from being read, written, and/or called.                   |
| [`forbidden-dependencies`](/docs/conformance/custom-rules/forbidden-dependencies) | Disallows one or more files from depending on one or more predefined modules.   |
| [`forbidden-imports`](/docs/conformance/custom-rules/forbidden-imports)           | Disallows one or more files from importing one or more predefined modules.      |
| [`forbidden-packages`](/docs/conformance/custom-rules/forbidden-packages)         | Disallows packages from being listed as dependencies in `package.json` files.   |

## Getting started

The no-code custom rules are defined and [configured](/docs/conformance/customize) in `conformance.config.jsonc`.

In this example, you will set up a custom rule with the [`forbidden-imports`](/docs/conformance/custom-rules/forbidden-imports) type. This rule disallows importing a package
called `api-utils`, and suggests to users that they should instead use a newer
version of that package.

- ### Create your config file
  At the root of your directory, create a file named `conformance.config.jsonc`. If one already exists, skip to the next step.

- ### Define a custom rule
  First, define a new custom rule in `conformance.customRules`.

  All custom rules require the properties:
  - `ruleType`
  - `ruleName`
  - `errorMessage`
  Other required and optional configuration depends on the custom
  rule type. In this example, we're using the `forbidden-imports`
  type, which requires an `moduleNames` property.
  ```jsonc copy filename="conformance.config.jsonc" {4-11}
  {
    "customRules": [
      {
        "ruleType": "forbidden-imports",
        "ruleName": "NO_API_UTILS",
        "categories": ["code-health"],
        "errorMessage": "The `api-utils` package has been deprecated. Please use 'api-utils-v2' instead, which includes more features.",
        "errorLink": "https://vercel.com/docs",
        "description": "Don't allow importing the deprecated `api-utils` package.",
        "severity": "major",
        "moduleNames": ["my-utils"],
      },
    ],
  }
  ```

- ### Enable the custom rule
  As all custom rules are disabled by default, you'll need to [enable rules](/docs/conformance/customize#managing-a-conformance-rule)
  in `conformance.overrides`. Refer to the documentation for each custom rule
  type for more information.

  Rule names must be prefixed with `"CUSTOM"` when enabled, and any allowlist
  files and entries will also be prefixed with `"CUSTOM"`. This prefix is added
  to ensure that the names of custom rules don't conflict with built-in rules.

  In the example below, we're enabling the rule for the entire project by
  providing it with the required configuration (targeting all files in `src`).
  ```jsonc copy filename="conformance.config.jsonc" {4-6}
  {
    "overrides": [
      {
        "rules": {
          "CUSTOM.NO_API_UTILS": {
            "paths": ["src"],
          },
        },
      },
    ],
    "customRules": [
      // ...
    ],
  }
  ```
  In this example, we've used the same configuration as above, but have also
  restricted the rule and configuration to the `api-teams` workspace.
  ```jsonc copy filename="conformance.config.jsonc" {4-9}
  {
    "overrides": [
      {
        "restrictTo": {
          "workspaces": ["api-teams"],
        },
        "rules": {
          "CUSTOM.NO_API_UTILS": {
            "paths": ["src", "!src/**/*.test.ts"],
          },
        },
      },
    ],
    "customRules": [
      // ...
    ],
  }
  ```

- ### Restrict the rule to a workspace
  In this example used the same configuration as above, but have also
  restricted the rule and configuration to the `api-teams` workspace:
  ```jsonc copy filename="conformance.config.jsonc" {4-9}
  {
    "overrides": [
      {
        "restrictTo": {
          "workspaces": ["api-teams"],
        },
        "rules": {
          "CUSTOM.NO_API_UTILS": {
            "paths": ["src", "!src/**/*.test.ts"],
          },
        },
      },
    ],
    "customRules": [
      // ...
    ],
  }
  ```


---

[View full sitemap](/docs/sitemap)
