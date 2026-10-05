---
title: forbidden-properties
product: vercel
url: /docs/conformance/custom-rules/forbidden-properties
canonical_url: "https://vercel.com/docs/conformance/custom-rules/forbidden-properties"
last_updated: 2025-03-04
type: conceptual
prerequisites:
  []
related:
  []
summary: "Learn how to set custom rules to disallow reading from, writing to, and/or calling one or more properties"
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/conformance/custom-rules/forbidden-properties.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "380b78fdd11712f1f54ba4846f994c00215479af9cc1a69c4f5e71decff883f7"
---

# forbidden-properties

> **Availability**: Conformance is available on Enterprise plans

The `forbidden-properties` rule type enables you to disallow reading from,
writing to, and/or calling one or more properties.

## When to use this rule type

- **Disallowing use of global properties**
  - You want to disallow calling `document.write`
  - You want to disallow using browser-only APIs in a component library that
    may be server-rendered
  - You want to disallow calls to usage of `window.location` in favor of another solution.
- **Disallowing use of deprecated features**
  - You want to disallow using `event.keyCode`
  - You want to disallow specific strings from being used within code

## Configuring this rule type

To create a custom `forbidden-properties` rule, you'll need to configure the below
required properties:

| Property              | Type                                        | Description                                                                                           |
| --------------------- | ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `ruleType`            | `"forbidden-properties"`                    | The custom rule's type.                                                                               |
| `ruleName`            | `string`                                    | The custom rule's name.                                                                               |
| `errorMessage`        | `string`                                    | The error message, which is shown to users when they encounter this rule.                             |
| `errorLink`           | `string` (optional)                         | An optional link to show alongside the error message.                                                 |
| `description`         | `string` (optional)                         | The rule description, which is shown in the Vercel Compass dashboard and included in allowlist files. |
| `severity`            | `"major" \| "minor"` (optional)             | The rule severity added to the allowlists and used to calculate a project's conformance score.        |
| `forbiddenProperties` | [`ForbiddenProperty[]`](#forbiddenproperty) | One or more properties and their forbidden operations.                                                |

### `ForbiddenProperty`

| Property     | Type                                                  | Description                                                     |
| ------------ | ----------------------------------------------------- | --------------------------------------------------------------- |
| `property`   | `string`                                              | The property to target.                                         |
| `operations` | `{ call?: boolean, read?: boolean, write?: boolean }` | The operation(s) to target. At least one operation is required. |

### Example configuration

The example below configures a rule named `NO_DOCUMENT_WRITE_CALLS` that
disallows calling `document.write`.

```jsonc copy filename="conformance.config.jsonc" {4-14}
{
  "customRules": [
    {
      "ruleType": "forbidden-properties",
      "ruleName": "NO_DOCUMENT_WRITE_CALLS",
      "errorMessage": "Calling 'document.write' is not allowed.",
      "description": "Disallows calls to `document.write`.",
      "severity": "major",
      "forbiddenProperties": [
        {
          "property": "document.write",
          "operations": {
            "call": true,
          },
        },
      ],
    },
  ],
}
```

### Property assignments

Note that a property's assignments are tracked by this custom rule type.

Using our example `NO_DOCUMENT_WRITE_CALLS` rule (above), the following calls
will both result in errors.

```ts {1,4}
document.write();

const writer = document.write;
writer();
```

## Enabling this rule type

The example below enables the `NO_DOCUMENT_WRITE_CALLS` custom rule. In this
example, the custom rule is also restricted to the `dashboard` and
`marketing-site` workspaces, which is optional.

```jsonc copy filename="conformance.config.jsonc" {4-9}
{
  "overrides": [
    {
      "restrictTo": {
        "workspaces": ["dashboard", "marketing-site"],
      },
      "rules": {
        "CUSTOM.NO_DOCUMENT_WRITE_CALLS": true,
      },
    },
  ],
  "customRules": [
    // ...
  ],
}
```

;


---

[View full sitemap](/docs/sitemap)
