---
title: Optimize Deployment Storage
product: vercel
url: /docs/deployment-storage/optimize
canonical_url: "https://vercel.com/docs/deployment-storage/optimize"
last_updated: 2026-08-21
type: how-to
prerequisites:
  - /docs/deployment-storage
related:
  - /docs/functions/configuring-functions/region
  - /docs/deployment-retention
  - /docs/builds/configure-a-build
  - /docs/build-output-api
  - /docs/vercel-blob
summary: Set retention periods, review remaining usage, and reduce deployment output size.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-storage/optimize.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "87054b0a5f270f402a0c83cef9ff4eeb79808af00061cb310ff7ff4d9e0c1454"
---

# Optimize Deployment Storage

Start with deployment retention. It controls how long Vercel keeps deployment output and can reduce storage without an application-code change.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deployment Storage keeps your deployments rollback-ready](https://vercel.com/changelog/deployment-storage-keeps-your-deployments-rollback-ready?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related)
- [How do I delete an individual deployment?](https://vercel.com/kb/guide/how-do-i-delete-an-individual-deployment?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Information on deleting an individual deployment.
- [Migrate a Next.js app from Webflow Cloud to Vercel](https://vercel.com/kb/guide/migrate-a-next-js-app-from-webflow-cloud-to-vercel?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Move your Next.js app from Webflow Cloud to Vercel: remove the OpenNext Cloudflare adapter, drop the base path, map stor
- [Full-stack previews on Vercel](https://vercel.com/kb/guide/full-stack-preview-deployments-on-vercel?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Learn how to use full-stack previews for your Vercel projects. Deploy Next.js, FastAPI, and a containerized Go service t
- [Updated defaults for deployment retention](https://vercel.com/changelog/updated-defaults-for-deployment-retention?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related)
- [Migrate a TanStack Start app from Netlify to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-netlify-to-vercel?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Move your TanStack Start app off Netlify and onto Vercel Functions, where Fluid compute scales it automatically. Swap to
- [Troubleshooting Build Error: "Serverless Function has exceeded the unzipped maximum size of 250 MB"](https://vercel.com/kb/guide/troubleshooting-function-250mb-limit?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Learn how to troubleshoot builds failing due to exceeding the maximum function size limit on Vercel.
- [Troubleshooting Build Errors](https://vercel.com/docs/deployments/troubleshoot-a-build?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Learn how to resolve common scenarios you may encounter during the Build step, including build errors that cancel a depl
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Deploying to Vercel](https://vercel.com/docs/deployments?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Vercel Storage overview](https://vercel.com/docs/storage?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/deployment-storage/optimize.graph.md](/docs/deployment-storage/optimize.graph.md?from=related&source_path=%2Fdocs%2Fdeployment-storage%2Foptimize&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Set the retention periods that preserve the history your team needs for review, recovery, and audits. After the policy takes effect, investigate projects that still have high usage and reduce their output size.

## 1. Set the retention periods you need

Confirm how long each application needs its Pre-Production and Production deployments before you shorten a period.

### Set the team default

To set the default for new projects:

1. Open **Team Settings**.
2. Select **Security & Privacy**.
3. Find **Deployment Retention Policy**.
4. Set the periods for Canceled, Errored, Pre-Production, and Production deployments.
5. Clear **Apply this policy to all existing projects** unless you intend to update every existing project.
6. Select **Save**.

The team policy applies to new projects. Selecting **Apply this policy to all existing projects** also replaces the retention policy for every existing project in the team.

### Set retention for one project

To change one project:

1. Open the project.
2. Select **Settings**, then **Security**.
3. Find **Deployment Retention Policy**.
4. Set the periods for this project.
5. Select **Save**.

This change applies only to this project. It does not change the team default or another project's policy.

Set each period from how your team uses the deployment:

| Deployment state | Keep long enough for |
| --- | --- |
| Pre-Production | Code review, quality assurance, external approvals, and regression investigation |
| Production | Incident recovery, rollback, and release audits |
| Canceled and Errored | Build debugging |

## 2. Check the effect of retention

Use the same team and date range for each comparison:

1. Open **Usage** for the correct team and select **Deployment Storage**.
2. Set the date range to the last 30 days.
3. Record the team total for **Deployment Storage** and **Functions Storage**.
4. For both metrics, select **Projects** and record the projects with the most storage.
5. After **Usage** refreshes, compare the same team, metrics, projects, and date range.

## 3. Review remaining usage

If storage remains high after the retention policy takes effect, find the projects and output types that use the most storage:

1. Open **Usage** for the correct team.
2. Select **Deployment Storage**.
3. Open **Deployment Storage** and select **Projects**.
4. Repeat the review for **Functions Storage**.
5. Use the same date range for both metrics.
6. Open the largest project and review its deployment history and output.

The **Usage** page shows Deployment Storage by project. It does not identify the deployment, file, or Function bundle that caused the total. Use **Usage** to find the projects to investigate. Then use the project's **Deployments** page and the deployment **Resources** view to inspect deployment age, static-file sizes, and Function sizes.

Use the following table to select the next action:

| What you find | Where to check next | Next action |
| --- | --- | --- |
| A project has high Deployment Storage | Open a representative deployment and review **Resources**, then **Static Assets** | Remove unneeded static output and large packaged files. |
| A project has high Functions Storage | Open a representative deployment and review **Resources**, then **Functions** | Inspect large bundles and confirm that each [configured region](/docs/functions/configuring-functions/region) is required. |
| A project has many old Preview deployments | Review the project's **Deployments** page and Pre-Production retention policy | Shorten Pre-Production retention after the project owner confirms the required review period. |
| A project has many old Production deployments | Review the project's **Deployments** page and Production retention policy | Confirm the rollback and audit window before you shorten retention. |
| Storage remains high after a retention change | Review [retention policy exceptions](/docs/deployment-retention#exceptions-to-the-retention-policy), including active aliases and the latest Preview deployment for each active Git branch | Confirm that each exception is still needed. Remove stale custom aliases, and merge or close stale pull requests through your normal repository process. |
| Deployment volume increases unexpectedly | Compare deployments with Git commits, deploy hooks, webhooks, continuous integration jobs, and coding-agent activity | Fix duplicate triggers or runaway automation while preserving intended deployments. |

## 4. Reduce output size

Create a Preview deployment from a representative commit. Open the deployment, then open **Resources** in the sidebar. This view lists static files and their sizes. It also lists each Function's type, runtime, size, and regions.

Record the largest static files and Functions. Change one dependency, import, output rule, or large file, then create another Preview deployment from the same type of change. Compare the new **Resources** view with the baseline deployment.

### Check the output directory

Keep only the files required to serve the application. Do not set an entire repository or a broad build workspace as the Output Directory.

For a custom framework, write only the required files to `.vercel/output`. See [Configuring a Build](/docs/builds/configure-a-build#output-directory) and the [Build Output API](/docs/build-output-api).

### Move application data out of the deployment

Do not package large videos, archives, or changing data exports into each deployment when the application can load them from separate storage.

Use a product such as [Vercel Blob](/docs/vercel-blob) for files that your application uploads, changes, or deletes independently. Confirm the access, delivery, and retention requirements before you move data.

### Reduce Function bundles

Remove dependencies and files that a function does not use. Check generated code, native binaries, development data, and repeated packages.

Variable-path imports can cause file tracing to include an entire directory. Large files imported by server-side code also become part of the Function bundle.

For Vercel Functions outside Next.js, use `includeFiles` and `excludeFiles` when automatic tracing includes the wrong files. For Next.js, use `outputFileTracingIncludes` and `outputFileTracingExcludes`.

Test every changed function. Excluding a required file can cause a runtime error even when the build succeeds. See the [`functions` configuration](/docs/project-configuration/vercel-json#functions).

## 5. Verify the output change

Verify one change at a time:

1. Create one Preview deployment after each build-output change.
2. Open the Preview URL and test the main application paths.
3. Test each changed Vercel Function.
4. Confirm that static files and runtime data load.
5. Compare the new deployment **Resources** view with the baseline deployment.
6. After **Usage** refreshes, compare the same project, metrics, and 30-day date range.

| Change | Expected result | When to check |
| --- | --- | --- |
| Smaller static output | Lower Deployment Storage per new deployment | After the changed Preview deployment appears in Usage |
| Smaller Function bundles | Lower Functions Storage per new deployment | After the changed Preview deployment appears in Usage |

Retention changes affect stored history over time. Output changes affect new deployments. Compare them separately.

For product details, see [Deployment Storage](/docs/deployment-storage).


---

[View full sitemap](/docs/sitemap)
