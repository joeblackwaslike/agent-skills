---
title: Deploying Bitbucket Projects with Vercel
product: vercel
url: /docs/git/vercel-for-bitbucket
canonical_url: "https://vercel.com/docs/git/vercel-for-bitbucket"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  - /docs/git
related:
  - /docs/deployments/environments
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/git
  - /docs/projects
  - /docs/environment-variables/system-environment-variables
summary: ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and automatic Custom Domain...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/git/vercel-for-bitbucket.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "09b3e069bd4adbd86ffdc742aeab02a8281a92e7682acbf5909c21f88abbe3c7"
---

# Deploying Bitbucket Projects with Vercel

Vercel for Bitbucket automatically deploys your Bitbucket projects with [Vercel](/), providing [Preview Deployment URLs](/docs/deployments/environments#preview-environment-pre-production#preview-urls), and automatic [Custom Domain](/docs/domains/working-with-domains/add-a-domain) updates.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy to Vercel with Self-Hosted Git Pipelines \\(GitLab & Bitbucket\\)](https://vercel.com/kb/guide/how-can-i-use-gitlab-pipelines-with-vercel) — Learn how to use GitLab Pipelines to deploy to Vercel including support for self-managed GitLab.
- [Vercel for Bitbucket](https://vercel.com/blog/bitbucket)
- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel) — Learn how to deploy based on tags/releases on Vercel.
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deploying from Azure DevOps with Vercel](https://vercel.com/docs/git/vercel-for-azure-pipelines) — ​Vercel for Azure DevOps allows you to deploy from Azure Pipelines to Vercel automatically.

Full cross-link map for this page: [/docs/git/vercel-for-bitbucket.graph.md](/docs/git/vercel-for-bitbucket.graph.md)
<!-- /docsgraph:related -->

## Supported Bitbucket Products

- [Bitbucket Free](https://www.atlassian.com/software/bitbucket/pricing)
- [Bitbucket Standard](https://www.atlassian.com/software/bitbucket/pricing)
- [Bitbucket Premium](https://www.atlassian.com/software/bitbucket/pricing)
- [Bitbucket Data Center (Self-Hosted)](#using-bitbucket-pipelines)

## Deploying a Bitbucket Repository

The [Deploying a Git repository](/docs/git#deploying-a-git-repository) guide outlines how to create a new Vercel Project from a Bitbucket repository, and enable automatic deployments on every branch push.

## Changing the Bitbucket Repository of a Project

If you'd like to connect your Vercel Project to a different Bitbucket repository or disconnect it, you can do so from the [Git section](/docs/projects#git) in the Project Settings.

### A Deployment for Each Push

Vercel for Bitbucket will **deploy each push by default**. This
includes pushes and pull requests made to branches. This allows those working
within the project to preview the changes made before they are pushed to
production.

With each new push, if Vercel is already building a previous commit on the same branch, the current build will complete and any commit pushed during this time will be queued. Once the first build completes, the most recent commit will begin deployment and the other queued builds will be cancelled. This ensures that you always have the latest changes deployed as quickly as possible.

### Updating the Production Domain

If [Custom Domains](/docs/domains/working-with-domains/add-a-domain) are set from a project domains dashboard, pushes and merges to the [Production Branch](/docs/git#production-branch) (commonly "main") will be made live to those domains with the latest deployment made with a push.

If you decide to revert a commit that has already been deployed to production, the previous [Production Deployment](/docs/deployments/environments#production-environment) from a commit will automatically be made available at the [Custom Domain](/docs/domains/working-with-domains/add-a-domain) instantly; providing you with instant rollbacks.

### Preview URLs for Each Pull Request

The latest push to any [pull request](https://www.atlassian.com/git/tutorials/making-a-pull-request) will automatically be made available at a unique preview URL based on the project name, branch, and team or username. These URLs will be given through a comment on each pull request.

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/git/bitbucket-comment.png)

*A preview URL created from a pull request.*

### System environment variables

You may want to use different workflows and APIs based on Git information. To support this, the following [System Environment Variables](/docs/environment-variables/system-environment-variables) are exposed to your Deployments:

<br />

### `VERCEL_GIT_PROVIDER`

The Git Provider the deployment is triggered from. In the case of Bitbucket, the value is always bitbucket.

### `VERCEL_GIT_REPO_SLUG`

The slug of the Bitbucket repository that was deployed.

```bash
VERCEL_GIT_REPO_SLUG=my-site
```

### `VERCEL_GIT_REPO_OWNER`

The Bitbucket user or team that the project belongs to.

```bash
VERCEL_GIT_REPO_OWNER=acme
```

### `VERCEL_GIT_REPO_ID`

The ID of the Bitbucket repository the deployment is triggered from.

```bash
VERCEL_GIT_REPO_ID=9e072df2-521e-4409-a01c-c984569fea20
```

### `VERCEL_GIT_COMMIT_REF`

The Bitbucket branch that the deployment was triggered by.

```bash
VERCEL_GIT_COMMIT_REF=improve-about-page
```

### `VERCEL_GIT_COMMIT_SHA`

The Bitbucket sha of the commit the deployment was triggered by.

```bash
VERCEL_GIT_COMMIT_SHA=fa1eade47b73733d6312d5abfad33ce9e4068081
```

### `VERCEL_GIT_COMMIT_MESSAGE`

The message accompanying the Bitbucket commit that was deployed. The message is truncated if it exceeds 2048 bytes.

```bash
VERCEL_GIT_COMMIT_MESSAGE=Add Timmy Triangle to about page
```

### `VERCEL_GIT_COMMIT_AUTHOR_LOGIN`

The name of the commit author on Bitbucket.

```bash
VERCEL_GIT_COMMIT_AUTHOR_LOGIN=Timmy Triangle
```

### `VERCEL_GIT_COMMIT_AUTHOR_NAME`

Bitbucket profile URL of the commit author.

```bash
VERCEL_GIT_COMMIT_AUTHOR_NAME=https://bitbucket.org/%7B45585b19-b616-401e-89d3-1a47fddb7033%7D/
```

### `VERCEL_GIT_PULL_REQUEST_ID`

The Bitbucket pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.

```bash
VERCEL_GIT_PULL_REQUEST_ID=23
```

We require some permissions through our Vercel for Bitbucket integration. Below are listed the permissions required and a description for what they are used for.

### Repository Permissions

Repository permissions allow us to interact with repositories belonging to or associated with (if permitted) the connected account.

| Permission      | Read | Write | Description                                                                                                                  |
| --------------- | ---- | ----- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Web Hooks`     | Y    | N     | Allows us to react to various Bitbucket events.                                                                              |
| `Issues`        | Y    | Y     | Allows us to interact with Pull Requests as with the `Pull Requests` permissions due to Bitbucket requiring both for access. |
| `Repository`    | N    | N     | Allows us to access admin features of a Bitbucket repository.                                                                |
| `Pull requests` | Y    | Y     | Allows us create deployments for each Pull Request (PR) and comment on those PR's with status updates.                       |

#### Organization Permissions

Organization permissions allow us to offer an enhanced experience through information about the connected organization.

| Permission | Read | Write | Description                                             |
| ---------- | ---- | ----- | ------------------------------------------------------- |
| `Team`     | Y    | N     | Allows us to offer a better team onboarding experience. |

#### User Permissions

User permissions allow us to offer an enhanced experience through information about the connected user.

| Permission | Read | Write | Description                                               |
| ---------- | ---- | ----- | --------------------------------------------------------- |
| `Account`  | Y    | N     | Allows us to associate an email with a Bitbucket account. |

> **💡 Note:** We use the permissions above to provide you with the best possible
> deployment experience. If you have any questions or concerns about any of the
> permission scopes, please [contact Vercel Support](/help#issues).

To sign up on Vercel with a different Bitbucket account, sign out of your current Bitbucket account. Then, restart the Vercel [signup process](/signup).

## Missing Git repository

When importing or connecting a Bitbucket repository, we require that you have **Admin** access to the corresponding repository, so that we can configure a webhook and automatically deploy pushed commits.

If a repository is missing when you try to import or connect it, make sure that you have [Admin access configured for the repository](https://support.atlassian.com/bitbucket-cloud/docs/grant-repository-access-to-users-and-groups/).

## Silence comments

By default, comments from the Vercel bot will appear on your pull requests and commits. You can silence these comments in your project's settings:

1. From the Vercel [dashboard](/dashboard), select your project
2. From the **Settings** tab, select **Git**
3. Under **Connected Git Repository**, toggle the switches to your preference

> **💡 Note:** It is currently not possible to prevent comments for specific branches.

## Using Bitbucket Pipelines

You can use Bitbucket Pipelines to build and deploy your Vercel Application.

`vercel build` allows you to build your project inside Bitbucket Pipelines, without exposing your source code to Vercel. Then, `vercel deploy --prebuilt` skips the build step on Vercel and uploads the previously generated `.vercel/output` folder to Vercel from the Bitbucket Pipeline.

[Learn more about how to configure Bitbucket Pipelines and Vercel](/kb/guide/how-can-i-use-bitbucket-pipelines-with-vercel) for custom CI/CD workflows.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
