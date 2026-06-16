---
title: Using Integrations with the Deploy Button
product: vercel
url: /docs/deploy-button/integrations
canonical_url: "https://vercel.com/docs/deploy-button/integrations"
last_updated: 2026-02-27
type: reference
prerequisites:
  []
related:
  []
summary: Learn how to use Integrations with the Vercel Deploy Button.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deploy-button/integrations.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "a140459c6a8b1d39c066317506f941b5cda89a0717906311c24c03684129c982"
---

# Using Integrations with the Deploy Button

## Required Integrations

| Parameter         | Type       | Value                                                                                                             |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `integration-ids` | `string[]` | A comma-separated list of required Integrations IDs: `oac_4mkAfc68cuDV4suZRlgkn3R9, oac_JI9dt8xHo7UXmVV6mZTygMNZ` |

This parameter allows you to specify a list of Integration IDs. When specified, the corresponding Integrations will be required to be added before the Project can be imported. You can add up to 3 Integrations per Project.

You can find the IDs of your Integrations in the [Integrations Console](/dashboard/integrations/console).

The example below shows how to use the `integration-ids` parameter in a Deploy Button source URL:

```bash filename="integration id"
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&integration-ids=oac_1mkAfc68cuDV4suZRlgkn3Re
```

## Skippable Integrations

| Parameter                | Type     | Value                                              |
| ------------------------ | -------- | -------------------------------------------------- |
| `skippable-integrations` | `number` | Mark the list of provided Integrations as optional |

If this parameter is present, the user will be able to add one of the provided Integrations or skip them entirely, instead of being forced to add all of them.

Because the user will only be able to select one (not multiple) of the optional Integrations, they should all serve the same purpose. For example, if the purpose is error tracking, the Integrations [Sentry](/marketplace/sentry) and [Datadog](/marketplace/datadog) could be defined here.

To use this parameter, you also need to specify at least one Integration.

The example below shows how to use the `skippable-integrations` parameter in a Deploy Button source URL:

```bash filename="skippable integrations"
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&integration-ids=oac_1mkAfc68cuDV4suZRlgkn3Re&skippable-integrations=1
```


---

[View full sitemap](/docs/sitemap)
