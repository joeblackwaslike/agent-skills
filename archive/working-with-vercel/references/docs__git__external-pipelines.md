---
title: Deploying from an External CI/CD Pipeline
product: vercel
url: /docs/git/external-pipelines
canonical_url: "https://vercel.com/docs/git/external-pipelines"
last_updated: 2026-11-17
type: how-to
prerequisites:
  - /docs/git
related:
  - /docs/cli
  - /docs/git
  - /docs/ci
  - /docs/cli/pull
  - /docs/cli/build
summary: Build your project in GitHub Actions, CircleCI, Bitbucket Pipelines, or another CI/CD provider, then deploy the build output to Vercel with Vercel...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/git/external-pipelines.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "d1faacaa2415316642a53dc23c424824d40ce05ac364c51552d14b653f677bda"
---

# Deploying from an External CI/CD Pipeline

You can build your project in a continuous integration and continuous delivery (CI/CD) pipeline that runs outside Vercel, then upload the build output to Vercel with [Vercel CLI](/docs/cli). The pipeline decides when a deployment happens, so you can deploy on a Git tag, after your tests pass, or from a Git server that Vercel can't reach.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy to Vercel with Self-Hosted Git Pipelines \\(GitLab & Bitbucket\\)](https://vercel.com/kb/guide/how-can-i-use-gitlab-pipelines-with-vercel) — Learn how to use GitLab Pipelines to deploy to Vercel including support for self-managed GitLab.
- [Conditional Build Commands: Environment, Branch, and Custom Workflows](https://vercel.com/kb/guide/dynamic-build-commands) — Run a different Vercel build command for each environment or Git branch using a shell script, vercel.json, or vercel.ts,
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [Deploying to Vercel](https://vercel.com/docs/deployments) — Create, verify, and manage preview and production deployments on Vercel from Git, Vercel CLI, or the REST API.
- [Deploying Bitbucket Projects with Vercel](https://vercel.com/docs/git/vercel-for-bitbucket) — ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Builds](https://vercel.com/docs/builds) — Understand how the build step works when creating a Vercel Deployment.

Full cross-link map for this page: [/docs/git/external-pipelines.graph.md](/docs/git/external-pipelines.graph.md)
<!-- /docsgraph:related -->

Use an external pipeline when:

- **You need a trigger the Git integrations don't have**: For example, deploy to production when you push a Git tag or publish a release
- **Checks must pass before a deployment exists**: Run tests, scans, or approval steps in the pipeline, then deploy
- **Your Git server is self-hosted**: The pipeline runs inside your network and authenticates to Vercel with an access token
- **Your source code must stay on your infrastructure**: The pipeline uploads the build output, not the source

If none of these apply, connect your repository with a [Git integration](/docs/git) instead. Vercel then builds every push, comments on pull requests, and updates your domains without a pipeline to maintain.

> **💡 Note:** This page covers pipelines that run on another provider's infrastructure. To
> run your CI tasks on Vercel, see [Vercel CI](/docs/ci).

## How an external pipeline deploys to Vercel

Every provider runs the same three Vercel CLI commands:

| Command | What it does |
| --- | --- |
| [`vercel pull`](/docs/cli/pull) | Downloads the project's settings and environment variables for one environment into the `.vercel` directory |
| [`vercel build`](/docs/cli/build) | Builds the project on the pipeline's runner and writes the result to `.vercel/output` in the [Build Output API](/docs/build-output-api) format |
| [`vercel deploy --prebuilt`](/docs/cli/deploy#prebuilt) | Uploads `.vercel/output` and creates a deployment without building on Vercel |

The environment you pass to each command decides whether the pipeline creates a preview or a production deployment:

```bash filename="terminal"
# Preview deployment
vercel pull --yes --environment=preview
vercel build
vercel deploy --prebuilt

# Production deployment
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

To add tests or an approval step, run them before `vercel deploy`. The deployment doesn't exist until that command runs.

## Set up credentials

Vercel CLI reads three environment variables in a pipeline, so you don't run `vercel login` or `vercel link` on the runner:

| Variable | Value |
| --- | --- |
| `VERCEL_TOKEN` | A Vercel access token that authenticates the CLI |
| `VERCEL_ORG_ID` | The ID of the team or account that owns the project |
| `VERCEL_PROJECT_ID` | The ID of the project to deploy |

To collect the values:

1. Create an access token on the [Account Tokens page](/account/tokens), or run [`vercel tokens create`](/docs/cli/tokens#create-a-token-for-ci/cd). To limit what a leaked token can do, [scope the token to one project](/docs/cli/tokens#scope-a-token-to-a-single-project).
2. On your computer, run [`vercel link`](/docs/cli/link) in the project directory to connect it to a Vercel project.
3. Open the `.vercel/project.json` file that `vercel link` created, and copy the `orgId` and `projectId` values.
4. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as secrets or protected variables in your CI/CD provider.

Set the token with the `VERCEL_TOKEN` environment variable instead of the `--token` option. Command-line arguments can appear in process lists and logs.

## Turn off automatic Git deployments

If the project is also connected to a repository through a Git integration, Vercel and your pipeline both deploy each push. To let the pipeline create every deployment, set [`git.deploymentEnabled`](/docs/project-configuration/git-configuration#git.deploymentenabled) to `false` in `vercel.json`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": false
  }
}
```

To turn off automatic deployments for some branches only, set `git.deploymentEnabled` to an object of branch names instead. See [Git configuration](/docs/project-configuration/git-configuration#git.deploymentenabled).

## GitHub Actions

For preview deployments on every branch and production deployments from `main`, see [Using GitHub Actions](/docs/git/vercel-for-github#using-github-actions). The workflows in this section cover release-based deployments.

### Deploy to production on a Git tag

With trunk-based development, you can merge to `main` many times a day and deploy to production only when you tag a release. This workflow runs when you push a tag that starts with `v`, such as `v1.4.0`:

```yaml filename=".github/workflows/production-tag.yml"
name: Production tag deployment
env:
  VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    tags:
      - 'v*'
jobs:
  deploy-production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel environment information
        run: vercel pull --yes --environment=production
      - name: Build project artifacts
        run: vercel build --prod
      - name: Deploy project artifacts to Vercel
        run: vercel deploy --prebuilt --prod
```

The workflow pins `actions/checkout` to a full commit SHA, so a change to the action's version tag can't alter a job that has access to your deployment credentials.

To set it up:

1. Add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as [GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions) in your repository.

2. [Turn off automatic Git deployments](#turn-off-automatic-git-deployments) so that a push to `main` doesn't deploy to production.

3. Commit the workflow file, then create and push a tag:

   ```bash filename="terminal"
   git tag v1.4.0
   git push origin v1.4.0
   ```

4. Open the workflow run in the **Actions** tab of your repository. The last step prints the URL of the production deployment.

To deploy when you publish a GitHub release instead of when you push a tag, replace the `push` trigger with the [`release` event](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#release):

```yaml filename=".github/workflows/production-tag.yml"
on:
  release:
    types: [published]
```

### Deploy a hotfix without a release

To ship an urgent fix without tagging a release, add a second workflow that deploys to production from a dedicated branch. Copy the tag workflow to a new file, and change its name and trigger:

```yaml filename=".github/workflows/hotfix.yml"
name: Hotfix deployment
on:
  push:
    branches:
      - hotfix
```

Keep the `env` and `jobs` sections the same. Each push to the `hotfix` branch then creates a production deployment. Merge the fix back into `main` so the next tagged release includes it.

## CircleCI

This configuration creates a preview deployment for every branch except `main`, and a production deployment when you push to `main`:

```yaml filename=".circleci/config.yml"
version: 2.1

jobs:
  deploy-preview:
    docker:
      - image: cimg/node:lts
    steps:
      - checkout
      - run:
          name: Install Vercel CLI
          command: sudo npm install --global vercel@latest
      - run:
          name: Pull Vercel environment information
          command: vercel pull --yes --environment=preview
      - run:
          name: Build project artifacts
          command: vercel build
      - run:
          name: Deploy project artifacts to Vercel
          command: vercel deploy --prebuilt

  deploy-production:
    docker:
      - image: cimg/node:lts
    steps:
      - checkout
      - run:
          name: Install Vercel CLI
          command: sudo npm install --global vercel@latest
      - run:
          name: Pull Vercel environment information
          command: vercel pull --yes --environment=production
      - run:
          name: Build project artifacts
          command: vercel build --prod
      - run:
          name: Deploy project artifacts to Vercel
          command: vercel deploy --prebuilt --prod

workflows:
  deploy:
    jobs:
      - deploy-preview:
          filters:
            branches:
              ignore: main
      - deploy-production:
          filters:
            branches:
              only: main
```

To set it up:

1. In your CircleCI project settings, add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` as [environment variables](https://circleci.com/docs/guides/security/set-environment-variable/). CircleCI passes project environment variables to every job.
2. Commit `.circleci/config.yml` and push a branch. CircleCI runs `deploy-preview`, and the last step prints the URL of the preview deployment.
3. Merge the branch into `main`. CircleCI runs `deploy-production` and deploys to your production domains.

The `cimg/node:lts` image tracks the latest Node.js LTS release. To build with the same major version that your project uses on Vercel, pin the image to that version, such as `cimg/node:24.11`. See the [Node.js versions that Vercel supports](/docs/functions/runtimes/node-js/node-js-versions).

## Bitbucket Pipelines

This configuration creates a preview deployment for every branch except `main`, and a production deployment when you push to `main`:

```yaml filename="bitbucket-pipelines.yml"
image: node:24

pipelines:
  default:
    - step:
        name: Deploy preview to Vercel
        script:
          - npm install --global vercel@latest
          - vercel pull --yes --environment=preview --git-branch="$BITBUCKET_BRANCH"
          - vercel build
          - vercel deploy --prebuilt --meta bitbucketDeployment=1 --meta bitbucketCommitRef="$BITBUCKET_BRANCH"
  branches:
    main:
      - step:
          name: Deploy production to Vercel
          script:
            - npm install --global vercel@latest
            - vercel pull --yes --environment=production
            - vercel build --prod
            - vercel deploy --prebuilt --prod
```

The `default` pipeline runs for every branch that has no entry under `branches`. In the preview step, `--git-branch` downloads the environment variables assigned to that branch, and the two `--meta` values attach the branch name to the deployment so that [branch domains](/docs/domains/working-with-domains/assign-domain-to-a-git-branch) apply.

To set it up:

1. In Bitbucket, open **Repository settings**, then **Repository variables**, and add `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`. Select **Secured** for the token so that Bitbucket masks its value in logs. See [Variables and secrets](https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/) in the Bitbucket documentation.
2. Commit `bitbucket-pipelines.yml` and push a branch. Bitbucket runs the `default` pipeline, and the last command prints the URL of the preview deployment.
3. Merge the branch into `main`. Bitbucket runs the production step and deploys to your production domains.

Set `image` to the Node.js major version that your project uses on Vercel.

## Other providers

The same commands work on any provider that can run a shell script, including a CI server inside your own network. Store the three [credentials](#set-up-credentials) as secrets, install Vercel CLI, and run the preview or production commands from [How an external pipeline deploys to Vercel](#how-an-external-pipeline-deploys-to-vercel).

Some providers have their own setup:

- **GitLab CI/CD**: See [Using GitLab Pipelines](/docs/git/vercel-for-gitlab#using-gitlab-pipelines)
- **Azure Pipelines**: Use the [Vercel Deployment Extension](/docs/git/vercel-for-azure-pipelines)

## What changes when your pipeline builds the project

A prebuilt deployment runs on the same infrastructure as a deployment that Vercel builds, and features such as [Instant Rollback](/docs/instant-rollback) work the same way. The differences come from where the build runs:

| Area | What changes | What to do |
| --- | --- | --- |
| System environment variables | [System environment variables](/docs/environment-variables/system-environment-variables), such as `VERCEL_URL`, are missing at build time | Set the values your framework reads during the build in the pipeline. See [When not to use `--prebuilt`](/docs/cli/deploy#when-not-to-use---prebuilt) |
| Branch-specific settings | A deployment created without Git metadata isn't associated with a branch, so branch-specific preview variables and domains don't apply | Pass the branch with `--git-branch` and `--meta`. See [Associate a CLI deployment with a Git branch](/docs/cli/deploy#associate-a-cli-deployment-with-a-git-branch) |
| Skew Protection | Next.js projects need a custom deployment ID | See [Custom deployment ID](/docs/skew-protection#custom-deployment-id) |
| Upload size | A build output with thousands of files can reach the [files limit](/docs/limits#files) | Add [`--archive=tgz`](/docs/cli/deploy#archive) to `vercel deploy` |
| Deployment Policies | A [deployment policy](/docs/deployments/deployment-policy) can block deployments from Vercel CLI for an environment | Confirm that the policy allows the CLI for the environment the pipeline deploys to |

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
