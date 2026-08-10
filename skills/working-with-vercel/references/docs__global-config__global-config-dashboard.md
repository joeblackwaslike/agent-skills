---
title: Managing Global Configs with the Dashboard
product: vercel
url: /docs/global-config/global-config-dashboard
canonical_url: "https://vercel.com/docs/global-config/global-config-dashboard"
last_updated: 2026-07-29
type: how-to
prerequisites:
  - /docs/global-config
related:
  - /docs/global-config
  - /docs/accounts
  - /docs/projects/overview
  - /docs/global-config/using-global-config
  - /docs/global-config/global-config-limits
summary: Learn how to create, view and update your Global Configs and the data inside them in your Vercel Dashboard at the Hobby team, team, and project...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/global-config-dashboard.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "84e007fcf952fbbc1f739f2b8e6269053dd89a5433ffe85c981577d98e08e3cb"
---

# Managing Global Configs with the Dashboard

You can create, view and update your [Global Configs](/docs/global-config), and the data inside them, in your Vercel Dashboard at both the [account level](/docs/accounts) and the [project level](/docs/projects/overview).

## Creating a Global Config

### At the account level

To add a Global Config at the Hobby team or team level, follow these steps:

1. Make sure that you are in the correct account or team in your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard)

2. Click on the **Storage** section in the sidebar

3. Click the **Create Store** button

4. Type a name for your Global Config in the dialog and click **Create**. The name shouldn't exceed 32 characters and can only contain alphanumeric letters, "\_", and "-".

5. On creation, you are taken to the `my_global_config_id` config page. By default, a key-value pair of `"greeting": "hello world"` is created. On the detail page of the newly created Global Config you can:
   - View and manage stored items
   - Connect projects to and disconnect projects from this Global Config
   - Generate, copy, and delete tokens associated with this Global Config

Your Global Config is now ready to be used. You can also [create a Global Config at the project level](/docs/global-config/global-config-dashboard#at-the-project-level).

> **💡 Note:** If you're creating a project at the account-level, we won't automatically
> create a token, connection string, and environment variable until a project
> has been connected.

### At the project level

1. Navigate to your [project](/docs/projects/overview) page and click on the **Global Config** section in the sidebar

2. Click **Create Project Store** and type a name slug for your Global Config in the dialog that opens. The name shouldn't exceed 32 characters and can only contain alphanumeric letters, "\_", and "-".

3. Click **Create**.

4. Once created, you can click on the Global Config to [manage it](#managing-global-configs). The following items are automatically created:
   - An environment variable `GLOBAL_CONFIG` that holds a [connection string](/docs/global-config/using-global-config#using-a-connection-string). If you go to your project's **Settings > Environment Variables**, you'll see the newly created environment variable.
   - A [read access token](/docs/global-config/using-global-config#creating-a-read-access-token). This token, along with your **GLOBAL CONFIG ID** is used to create a [connection string](/docs/global-config/using-global-config#using-a-connection-string). This connection string is saved as the value of your `GLOBAL_CONFIG` environment variable. Using this enables you to use the SDK in your project to read the contents of the store.

## Managing Global Configs

To view a list of all Global Configs available in your account or team, go to [**Storage**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores\&title=Go+to+Storage) then select **Global Config** from the drop-down.

![Image](https://vercel.com/docs-assets/static/docs/storage/global-config/global-config-view-all-configs-light.png)

*List of Global Configs in a team account*

In the **Used by** column, you can see in which project(s) the Global Config is used. The right column shows the size of the data contained in the config. To manage the Global Config, its store and tokens, click on the Global Config's row to open the detail page.

![Image](https://vercel.com/docs-assets/static/docs/storage/global-config/config-details-light.png)

*Global Config detail page*

To rename the Global Config, select the **Settings** item in the sidebar, update the Global Config Name, and select **Save**.

To delete the Global Config, select the **Settings** item in the sidebar, then select **Delete Global Config**.

## Managing items in the store

The default view of the Global Config's detail page shows the list of all items in the store. You will see an open accordion titled **Learn how to use this in code** if the Global Config is connected to at least one project. This accordion provides the steps with a code example on how to read your store items.

To add, edit or delete any item in your store, edit the `json` object in the right panel and click **Save Items**.

### Restoring Global Config backups

Backups of your Global Config are automatically created when you make changes, and are stored for a [length of time](/docs/global-config/global-config-limits#backup-retention) determined by your plan. To restore one:

1. From your [dashboard](/dashboard), open [**Storage**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores\&title=Go+to+Storage) in the sidebar and then select your Global Config
2. From the left section, open **Backups** in the sidebar
3. From the list, select the backup that you would like to view. You'll be taken to the **Items** section in the sidebar to view a comparison of the backup version and current version
4. To restore the backup, select the **Restore** button and confirm the action

To learn more about backups, see [Global Config backups](/docs/global-config/using-global-config#global-config-backups).

> **💡 Note:** When protected by a JSON schema, the backup must pass schema validation to be
> restored.

## Schema validation

You can protect your Global Config by adding a JSON schema to it. Vercel uses this schema to validate the data that is added to the store and prevent updates that fail validation. To add a schema:

1. From your [dashboard](/dashboard), open [**Storage**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores\&title=Go+to+Storage) in the sidebar and then select your Global Config
2. Toggle the **Schema** button to open the schema editing tab
3. Enter your [JSON schema](https://json-schema.org/) into the editor. Vercel will use the schema to validate your data in real-time
4. Click **Save**. This will save changes to both the schema and data

The following snippet is an example of a schema that allows you to set boolean flags and a list of redirects.

```json filename="schema.json"
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "type": "object",
  "additionalProperties": false,
  "required": ["flags", "redirects"],
  "properties": {
    "flags": {
      "type": "object",
      "patternProperties": {
        "^.*$": {
          "type": "boolean"
        }
      }
    },
    "redirects": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "from": { "type": "string" },
          "to": { "type": "string" }
        }
      }
    }
  }
}
```

## Managing connected projects

![Image](https://vercel.com/docs-assets/static/docs/storage/global-config/global-config-projects-light.png)

*List of connected projects*

Click on **Projects** in the left panel of the Global Config detail page to open a view that shows the projects connected with this Global Config.

To delete a connection, click on the vertical ellipsis  icon on the right hand side of the row and click **Delete environment variable** and confirm by clicking **Delete connection** in the dialog.

Deleting a connection does not delete the underlying token used by that Connection String. To learn how to delete tokens, review [Managing read access tokens](#managing-read-access-tokens).

To connect the Global Config with another project, click **Connect Project**, find the project from the drop-down in the dialog and click **Connect**. If you receive a warning that this project already has a `GLOBAL_CONFIG` environment variable, open the **Advanced Options** and change the environment variable name in the corresponding field to a name other than `GLOBAL_CONFIG`. The **Connect** button will be enabled once the new environment variable does not already exist in the project.

## Managing read access tokens

To generate a new token, click the **Generate Token** button, type a name slug in the dialog that opens, and click **Create**. The confirmation dialog then shows:

- The full plaintext token, which you can copy with one click.
- The full connection string (`https://global-config.vercel.com/<globalConfigId>?token=<token>`), ready to paste into a `GLOBAL_CONFIG` environment variable.

Copy whichever value you need before closing the dialog. After you click **Done**, the tokens list only shows a truncated preview, and you can't retrieve the full token or connection string from the dashboard again.

> **💡 Note:** Vercel shows the full token and connection string only once, right after
> creation. Copy them immediately and store them somewhere safe. If you lose
> the token, delete it and create a new one.

To delete a token, click the vertical ellipsis  icon on the right of the token's row, click **Delete Token**, and confirm by clicking **Delete Token** in the dialog. You can also select multiple tokens in the table and delete them in bulk.

If you no longer have the connection string for a token that was already created, open the connected project's **Settings > Environment Variables** and copy the `GLOBAL_CONFIG` variable. You can also run [`vercel env pull`](/docs/cli/env) in a linked project to sync it locally. If neither is available, delete the token and create a new one.

## Up Next


---

[View full sitemap](/docs/sitemap)
