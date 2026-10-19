---
title: Shared environment variables
product: vercel
url: /docs/environment-variables/shared-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/shared-environment-variables"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/environment-variables
related:
  - /docs/environment-variables
  - /docs/accounts
  - /docs/projects
summary: Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can link to multiple projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/shared-environment-variables.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4b47d709eea679fa5a2513c22593a616997e479d191b18935cff22e4f5603cc4"
---

# Shared environment variables

**Shared Environment Variables** are [environment variables](/docs/environment-variables "Environment variables") that you define at the team-level and can link to multiple projects. When a Shared Environment Variable is updated, the change is applied to all linked projects.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Private Dependencies](https://v0.app/docs/private-dependencies) — Install private npm packages in v0 by configuring NPM_TOKEN or NPM_RC as environment variables.
- [v0 now reads npm credentials from shared environment variables](https://vercel.com/changelog/v0-now-reads-npm-credentials-from-shared-environment-variables)
- [Vercel Agent now installs private packages from npm and custom registries](https://vercel.com/changelog/vercel-agent-now-installs-private-packages-from-npm-and-custom-registries)
- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Migrate a Python API from Render to Vercel](https://vercel.com/kb/guide/migrate-a-python-api-from-render-to-vercel) — Move a FastAPI, Flask, or Django API from Render to Vercel Functions. Translate render.yaml and replace persistent disks
- [Share environment variables across your Team and Projects](https://vercel.com/changelog/share-environment-variables-across-your-team-and-projects)
- [Environment Variables UI](https://vercel.com/blog/environment-variables-ui)
- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.
- [Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables) — Choose Config or Secret environment variables based on whether their values should remain readable after saving.
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Create one or more shared environment variables](https://vercel.com/docs/rest-api/environment/create-one-or-more-shared-environment-variables) — POST /v1/env — Creates shared environment variable\\(s\\) for a team.

Full cross-link map for this page: [/docs/environment-variables/shared-environment-variables.graph.md](/docs/environment-variables/shared-environment-variables.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** When a project-level and a Shared Environment Variable share the same key and
> environment, the project-level environment variable always overrides the
> Shared Environment Variable.

## Creating shared environment variables

Shared Environment Variables are created on the [Team Settings page](/docs/accounts#creating-a-team). To create a new Shared Environment Variable, follow these steps:

1. Go to the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and select your team from the team switcher. Click on the **Settings** section in the sidebar and then select **Environment Variables** from the left navigation.
2. Populate the form with your environment variable details or paste or import an `.env` file:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/shared-environment-variables/shared-envs-form.png)

- **Key**: Fill in the key of the environment variable.
- **Value**: Fill in the value of the environment variable.
- **Environment**: Select the [Environments](/docs/environment-variables#environments) where you want to include it. The environment(s) chosen for the Shared Environment Variable is used when linked to a project.
- **Link to Projects**: Select one or more [projects](/docs/projects) in succession to link the new Shared Environment Variable by using the searchable drop-down. You can keep this empty and [link to projects](#linking-to-projects) later.

3. Click **Save** to save your new Shared Environment Variable.

## Linking to projects

A Shared Environment Variable is activated once it is linked to at least one project.

You can link an existing Shared Environment Variable to a project either at the project-level or the team-level.

### Project level linking

For project-level linking:

1. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select the Project you would like to link the Shared Environment Variable to and click the **Settings** section in the sidebar.
2. Select **Environment Variables** from the list, and click on the **Link Shared Environment Variables** section in the sidebar.
3. Select one or more Shared Environment Variables using the search box:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/shared-environment-variables/shared-envs-project-search.png)

1. Click the **Link** button

### Team level linking

1. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), click the **Settings** section in the sidebar and go to **Environment Variables**.
2. Scroll down below the Shared Environment Variable creation form.
3. Find the variable you would like to link. You can use the **Search** box, the **Environments** drop-down filter and sort by **last updated date**, **name** or **type** to more easily find the variable.
4. Open the context menu for the specific Shared Environment Variable using the vertical ellipsis  icon on the right hand side of the row, and click **Edit**:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/shared-environment-variables/shared-envs-team-link.png)

1. From the Environment Variable form, you can link additional projects using the **Link to Projects** field
2. Click **Save** when you are done

## Removing shared environment variables

There are two ways to remove a Shared Environment Variable from a project:

- **Unlinking**: It is disassociated from the selected project(s) but continues to exist at the level of the team
- **Deleting**: It is **permanently** removed from the team and disconnected from all projects it was previously linked to.

### Unlinking at the project level

1. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), select the project you would like to unlink the Shared Environment Variable from and click the **Settings** section in the sidebar.
2. Select **Environment Variables**, and scroll down to the **Shared Environment Variables** section.
3. Open the context menu for the specific shared environment variable you would like to unlink using the vertical ellipsis  icon on the right hand side.
4. Click **Unlink from this Project**:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/shared-environment-variables/shared-envs-project-unlink.png)

### Unlinking at the team level

1. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), click the **Settings** section in the sidebar and go to **Environment Variables**.
2. Scroll down below the Environment Variable creation form.
3. Find the variable you would like to link. You can use the **Search** box, the **Environments** drop-down filter and sort by **last updated date**, **name** or **type** to more easily find the variable.
4. Open the context menu for the specific shared environment variable using the vertical ellipsis  icon on the right hand side of the row, and click **Edit**:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/shared-environment-variables/shared-envs-team-link.png)

1. From the Environment Variable form, click the minus  icon to unlink existing projects
2. When you are done, click the **Save** button.

### Deleting environment variables from a team

1. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), click the **Settings** section in the sidebar and go to **Environment Variables**.
2. Scroll down below the Environment Variable creation form
3. Use the context menu on the specific Shared Environment Variable by clicking the vertical ellipsis  icon on the right side of the row
4. Click the **Delete** button

> **⚠️ Warning:** This action will remove the Shared Environment Variable from the Vercel Team.
> It will also unlink the Environment Variable from **ALL** previously linked
> projects.

## Known limitations

[Branch-specific variables](/docs/environment-variables#preview-environment-variables) are not currently supported with Shared Environment Variables


---

[View full sitemap](/docs/sitemap)
