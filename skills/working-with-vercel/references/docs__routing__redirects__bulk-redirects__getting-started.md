---
title: Getting Started
product: vercel
url: /docs/routing/redirects/bulk-redirects/getting-started
canonical_url: "https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started"
last_updated: 2026-09-08
type: how-to
prerequisites:
  - /docs/routing/redirects/bulk-redirects
  - /docs/routing/redirects
related:
  - /docs/project-configuration/vercel-json
  - /docs/cli/dev
  - /docs/cli/redirects
  - /docs/rest-api/bulk-redirects/gets-project-level-redirects
summary: Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "89b0c513e9118caa5e1e605bb1ee33f5ec4c82c55804fde4275b9368e2fc75d2"
---

# Getting Started

Bulk redirects can be specified either as part of a Vercel deployment or updated immediately through the UI, API, or CLI by settings redirects at the Project level without the need for a new deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to optimize Next.js and Sitecore Content SDK apps](https://vercel.com/kb/guide/how-to-optimize-next.js-sitecore-content-sdk) — Learn how to choose a rendering strategy, configure proxy middleware, and optimize costs for Next.js and Sitecore Conten
- [Bulk redirects UI, API, and CLI now generally available](https://vercel.com/changelog/bulk-redirects-ui-api-and-cli-now-generally-available)
- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [Bulk redirects are now generally available](https://vercel.com/changelog/bulk-redirects-are-now-generally-available)
- [Scaling redirects to infinity on Vercel](https://vercel.com/blog/scaling-redirects-to-infinity-on-vercel)
- [Managing redirects at scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [Edit a project-level redirect.](https://vercel.com/docs/rest-api/bulk-redirects/edit-a-project-level-redirect) — PATCH /v1/bulk-redirects — Edits a single redirect identified by its source path. Stages a new change with the modified
- [list_bulk_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_bulk_redirects) — Use list_bulk_redirects with Vercel MCP.
- [Configuration Redirects](https://vercel.com/docs/routing/redirects/configuration-redirects) — Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern
- [Stages new redirects for a project.](https://vercel.com/docs/rest-api/bulk-redirects/stages-new-redirects-for-a-project) — PUT /v1/bulk-redirects — Stages new redirects for a project and returns the new version.

Full cross-link map for this page: [/docs/routing/redirects/bulk-redirects/getting-started.graph.md](/docs/routing/redirects/bulk-redirects/getting-started.graph.md)
<!-- /docsgraph:related -->

- [Deployment-time redirects](#deployment-time-redirects)
- [Project-level redirects](#project-redirects)

**Agent prompt**

```text
Help me set up Bulk Redirects for this Vercel project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Run `vercel link` to connect the project. 2. Use `vercel redirects` to upload redirect rules for large-scale URL migrations without redeploying.
```

## Deployment-time redirects

Bulk redirects in deployments are specified in the `bulkRedirectsPath` field in `vercel.json`. `bulkRedirectsPath` can point to either a single file or a folder with up to 100 files. Vercel supports any combination of CSV, JSON, and JSONL files containing redirects, and they can be generated at build time.

Learn more about bulk redirects fields and file formats in the [project configuration documentation](/docs/project-configuration/vercel-json#bulkredirectspath).

- ### Create your redirect file
  You can create fixed files of redirects, or generate them at build time as long as they end up in the location specified by `bulkRedirectsPath` before the build completes.
  ```csv filename="redirects.csv"
  source,destination,permanent
  /old-blog,/blog,true
  /old-about,/about,false
  /legacy-contact,https://example.com/contact,true
  https://old-domain.com/blog,/blog,true
  ```
  ```json filename="redirects.json"
  [
    {
      "source": "/old-blog",
      "destination": "/blog",
      "permanent": true
    },
    {
      "source": "/old-about",
      "destination": "/about",
      "permanent": false
    },
    {
      "source": "/legacy-contact",
      "destination": "https://example.com/contact",
      "permanent": true
    },
    {
      "source": "https://old-domain.com/blog",
      "destination": "/blog",
      "permanent": true
    }
  ]
  ```
  ```jsonl filename="redirects.jsonl"
  {"source": "/old-blog", "destination": "/blog", "permanent": true}
  {"source": "/old-about", "destination": "/about", "permanent": false}
  {"source": "/legacy-contact", "destination": "https://example.com/contact", "permanent": true}
  {"source": "https://old-domain.com/blog", "destination": "/blog", "permanent": true}
  ```

- ### Configure bulkRedirectsPath
  Add the `bulkRedirectsPath` property to your `vercel.json` file, pointing to your redirect file. You can also point to a folder containing multiple redirect files if needed.
  ```json filename="vercel.json"
  {
    "bulkRedirectsPath": "redirects.csv"
  }
  ```

- ### Deploy
  Before deploying, you can test the bulk redirects configured through `bulkRedirectsPath` in `vercel.json` locally with [`vercel dev`](/docs/cli/dev).

  Deploy your project to Vercel. Your bulk redirects will be processed and applied automatically.
  ```bash
  vercel deploy
  ```
  Any errors processing the bulk redirects will appear in the build logs for the deployment.

## Project Redirects

Project-level redirects let you create and update bulk redirects without needing to redeploy. Redirects are staged when created and can be immediately published to production without a new deployment.

- ### Navigate to the Redirects tab
  From your [dashboard](/dashboard), select your project and click the [**Redirects**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fredirects\&title=Go+to+Redirects).

- ### Create a redirect
  Click **Create** and enter the following:
  - **Source**: The path or URL to redirect from (e.g., `/old-page` or `https://old-domain.com/page`)
  - **Destination**: The path or URL to redirect to (e.g., `/new-page`)
  - **Status code**: Select `307` (temporary) or `308` (permanent)
  You can also configure whether the redirect should be **case sensitive** (default `false`) or whether **query parameters should be preserved** (default `false`).

- ### Test your changes
  New redirects are staged until you publish them. From the review redirects dialog, click on the **source** path for each redirect to open a staging URL where the new redirects are applied.

- ### Publish your changes
  After testing your redirects, click **Publish** to make your changes live.

### Editing and deleting redirects

To edit or delete a redirect:

1. From the **Redirects** tab, find the redirect you want to modify.
2. Click the three dots menu on the right side of the redirect row.
3. Select **Edit** or **Delete**.
4. Click **Publish** to apply your changes.

### Bulk upload

You can upload multiple redirects at once:

1. From the **Redirects** tab, click the **Create** button and click **CSV**.
2. Select a CSV file containing your redirects.
3. Review the changes and click **Publish**.

### Using the CLI

You can manage redirects using the [Vercel CLI](/docs/cli/redirects). Make sure that you are using at least version `50.1.0` of the CLI for the full command set shown below, including `vercel redirects upload`.

```bash filename="terminal"
# List all redirects
vercel redirects ls

# List all redirects versions
vercel redirects ls-versions

# Add a redirect (use `--status 301` for permanent, `--status 308` to preserve the request method)
vercel redirects add /old-path /new-path --status 301

# Bulk upload CSV files
vercel redirects upload my-redirects.csv

# Remove a redirect
vercel redirects rm /old-path

# Promote staging redirects
vercel redirects promote 596558a5-24cd-4b94-b91a-d1f4171b7c3f
```

### Using the API

You can also manage redirects programmatically through the [Vercel REST API](/docs/rest-api/bulk-redirects/gets-project-level-redirects). This is useful for automating redirect management from webhook events, such as managing redirects in a CMS and instantly updating Vercel with changes.

```bash filename="terminal"
curl -X PUT "https://api.vercel.com/v1/bulk-redirects" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team_123",
    "projectId": "project_123",
    "redirects": [
      {
        "source": "/old-path",
        "destination": "/new-path",
        "permanent": true
      }
    ]
  }'
```


---

[View full sitemap](/docs/sitemap)
