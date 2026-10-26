---
title: Deploying GitLab Projects with Vercel
product: vercel
url: /docs/git/vercel-for-gitlab
canonical_url: "https://vercel.com/docs/git/vercel-for-gitlab"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  - /docs/git
related:
  - /docs/deployments/environments
  - /docs/domains/working-with-domains
  - /docs/git
  - /docs/projects
  - /docs/domains/working-with-domains/add-a-domain
summary: ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automatic Custom Domain updates.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/git/vercel-for-gitlab.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b0028d6db68a685a67404f702bb6ba163521fcddc675fd7354925d9b55028b72"
---

# Deploying GitLab Projects with Vercel

Vercel for GitLab automatically deploys your GitLab projects with [Vercel](/), providing [Preview Deployment URLs](/docs/deployments/environments#preview-environment-pre-production#preview-urls), and automatic [Custom Domain](/docs/domains/working-with-domains) updates.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing `vercel dev`: Serverless, on localhost](https://vercel.com/blog/vercel-dev)
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [Deploying Bitbucket Projects with Vercel](https://vercel.com/docs/git/vercel-for-bitbucket) — ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Git settings](https://vercel.com/docs/project-configuration/git-settings) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration) — Learn how to configure Git for your project through vercel.json or vercel.ts.

Full cross-link map for this page: [/docs/git/vercel-for-gitlab.graph.md](/docs/git/vercel-for-gitlab.graph.md)
<!-- /docsgraph:related -->

## Supported GitLab Products

- [GitLab Free](https://about.gitlab.com/pricing/)
- [GitLab Premium](https://about.gitlab.com/pricing/)
- [GitLab Ultimate](https://about.gitlab.com/pricing/)
- [GitLab Enterprise](https://about.gitlab.com/enterprise/)
- [Self-Managed GitLab](#using-gitlab-pipelines)

## Deploying a GitLab Repository

The [Deploying a Git repository](/docs/git#deploying-a-git-repository) guide outlines how to create a new Vercel Project from a GitLab repository, and enable automatic deployments on every branch push.

## Changing the GitLab Repository of a Project

If you'd like to connect your Vercel Project to a different GitLab repository or disconnect it, you can do so from the [Git section](/docs/projects#git) in the Project Settings.

### A Deployment for Each Push

Vercel for GitLab will **deploy each push by default**. This includes
pushes and pull requests made to branches. This allows those working within the
project to preview the changes made before they are pushed to production.

With each new push, if Vercel is already building a previous commit on the same branch, the current build will complete and any commit pushed during this time will be queued. Once the first build completes, the most recent commit will begin deployment and the other queued builds will be cancelled. This ensures that you always have the latest changes deployed as quickly as possible.

### Updating the Production Domain

If [Custom Domains](/docs/domains/working-with-domains/add-a-domain) are set from a project domains dashboard, pushes and merges to the [Production Branch](/docs/git#production-branch) (commonly "main") will be made live to those domains with the latest deployment made with a push.

If you decide to revert a commit that has already been deployed to production, the previous [Production Deployment](/docs/deployments/environments#production-environment) from a commit will automatically be made available at the [Custom Domain](/docs/domains/working-with-domains/add-a-domain) instantly; providing you with instant rollbacks.

### Preview URLs for Each Merge Request

The latest push to any [merge request](https://docs.gitlab.com/ee/user/project/merge_requests/) will automatically be made available at a unique preview URL based on the project name, branch, and team or username. These URLs will be provided through a comment on each merge request.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/guides/getting-started-with-vercel-for-gitlab/merge-request-alias.png)

*A preview URL created from a merge request.*

### System environment variables

You may want to use different workflows and APIs based on Git information. To support this, the following [System Environment Variables](/docs/environment-variables/system-environment-variables) are exposed to your Deployments:

<br />

### `VERCEL_GIT_PROVIDER`

The Git Provider the deployment is triggered from. In the case of GitLab, the value is always gitlab.

### `VERCEL_GIT_REPO_SLUG`

The GitLab name of the deployed project.

```bash
VERCEL_GIT_REPO_SLUG=my-site
```

### `VERCEL_GIT_REPO_OWNER`

The GitLab user, group, or sub-group that the project belongs to.

```bash
VERCEL_GIT_REPO_OWNER=acme
```

### `VERCEL_GIT_REPO_ID`

The GitLab ID of the deployed project.

```bash
VERCEL_GIT_REPO_ID=13343236
```

### `VERCEL_GIT_COMMIT_REF`

The GitLab branch that the deployment was triggered by.

```bash
VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VERCEL_GIT_COMMIT_SHA`

The GitLab sha of the commit the deployment was triggered by.

```bash
VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VERCEL_GIT_COMMIT_MESSAGE`

The message accompanying the GitLab commit that the deployment was triggered by. The message is truncated if it exceeds 2048 bytes.

```bash
VERCEL_GIT_COMMIT_MESSAGE=Add Timmy Triangle to about page
```

### `VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

The username belonging to the author of the commit that was deployed on GitLab.

```bash
VERCEL_GIT_COMMIT_AUTHOR_LOGIN=timmytriangle
```

### `VERCEL_GIT_COMMIT_AUTHOR_NAME`

The name belonging to the author of the commit that was deployed on GitLab.

```bash
VERCEL_GIT_COMMIT_AUTHOR_NAME=Timmy Triangle
```

### `VERCEL_GIT_PULL_REQUEST_ID`

The GitLab merge request id the deployment was triggered by. If a deployment is created on a branch before a merge request is made, this value will be an empty string.

```bash
VERCEL_GIT_PULL_REQUEST_ID=23
```

We require some permissions through our Vercel for GitLab integration. Below are listed the permissions required and a description for what they are used for.

| Permission | Read | Write | Description                                                                                                                                                                          |
| ---------- | ---- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `API`      | Y    | Y     | Allows us access to the API (including all groups and projects, the container registry, and the package registry) to clone repositories and add comments to pull requests and commits. |

> **💡 Note:** We use the permissions above to provide you with the best possible
> deployment experience. If you have any questions or concerns about any of the
> permission scopes, please [contact Vercel Support](/help#issues).

To sign up on Vercel with a different GitLab account, sign out of your current GitLab account.

Then, restart the Vercel [signup process](/signup).

## Missing Git repository

When importing or connecting a GitLab repository, we require that you have **Maintainer** access to the corresponding repository, so that we can configure a webhook and automatically deploy pushed commits. If your repository belongs to a [Gitlab group](https://docs.gitlab.com/ee/user/group/), you need to have **Maintainer** access to the group as well. You can use the [Group and project access requests API](https://docs.gitlab.com/ee/api/access_requests.html#valid-access-levels) to find the access levels for a group.

If a repository is missing when you try to import or connect it, make sure that you have [Maintainer access configured for the repository](https://docs.gitlab.com/ee/user/project/members/).

## Silence comments

By default, comments from the Vercel bot will appear on your pull requests and commits. You can silence these comments in your project's settings:

1. From the Vercel [dashboard](/dashboard), select your project
2. From the **Settings** tab, select **Git**
3. Under **Connected Git Repository**, toggle the switches to your preference

> **💡 Note:** It is currently not possible to prevent comments for specific branches.

## Using GitLab Pipelines

You can use GitLab Pipelines to build and deploy your Vercel Application.

`vercel build` allows you to build your project inside GitLab Pipelines, without exposing your source code to Vercel. Then, `vercel deploy --prebuilt` skips the build step on Vercel and uploads the previously generated `.vercel/output` folder to Vercel from the GitLab Pipeline.

[Learn more about how to configure GitLab Pipelines and Vercel](/kb/guide/how-can-i-use-gitlab-pipelines-with-vercel) for custom CI/CD workflows.

> **💡 Note:** In some cases, your GitLab merge pipeline can fail while your branch pipeline
> succeeds, allowing your merge requests to [merge with failing
> tests](https://gitlab.com/gitlab-org/gitlab/-/issues/384927#top). This is a
> GitLab issue. To avoid it, we recommend using [Vercel
> CLI](/docs/cli/deploying-from-cli) to deploy your projects.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
