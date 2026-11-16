---
title: Commenting on Pull Requests from Vercel CI
product: vercel
url: /docs/ci/guides/github-comments
canonical_url: "https://vercel.com/docs/ci/guides/github-comments"
last_updated: 2026-10-28
type: tutorial
prerequisites:
  - /docs/ci/guides
  - /docs/ci
related:
  - /docs/ci
  - /docs/ci/environment-variables
  - /docs/ci/configuration
  - /docs/ci/guides/end-to-end-tests
summary: Post the deployment URL to the pull request for each commit from a Vercel CI task.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/ci/guides/github-comments.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "57e04711363d83c40fa16b052336d9893608f6b89255242709aaa4995ae4bea1"
---

# Commenting on Pull Requests from Vercel CI

In this tutorial, you'll add a Vercel CI task that comments on your pull request with the URL of the commit's Vercel deployment. On each new push, the task updates the same comment instead of adding a new one.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli)
- [Improved formatting for Pull Request comments](https://vercel.com/changelog/improved-formatting-for-pull-request-comments)
- [Integrations for Comments](https://vercel.com/docs/comments/integrations) — Learn how Comments integrates with Git providers like GitHub, GitLab, and Bitbucket, as well as the Vercel app for Slack
- [Managing Comments on Preview Deployments](https://vercel.com/docs/comments/managing-comments) — Learn how to manage Comments on your Preview Deployments from Team members and invited collaborators.
- [Using Comments with Preview Deployments](https://vercel.com/docs/comments/using-comments) — This guide will help you get started with using Comments with your Vercel Preview Deployments.
- [Comments Overview](https://vercel.com/docs/comments) — Comments allow teams and invited participants to give direct feedback on preview deployments. Learn more about Comments
- [Deploying from Azure DevOps with Vercel](https://vercel.com/docs/git/vercel-for-azure-pipelines) — ​Vercel for Azure DevOps allows you to deploy from Azure Pipelines to Vercel automatically.

Full cross-link map for this page: [/docs/ci/guides/github-comments.graph.md](/docs/ci/guides/github-comments.graph.md)
<!-- /docsgraph:related -->

You'll configure a task that:

1. Waits for your app's Vercel deployment.
2. Finds the open pull request for the commit with the GitHub API.
3. Creates or updates a comment with the deployment's URL.

## Prerequisites

- Vercel CI [enabled for your repository](/docs/ci#getting-started).
- An app in your monorepo at `apps/web`, with the package name `web`, and a Vercel project connected to your repository with its root directory set to `apps/web`.
- Permission to create a GitHub fine-grained personal access token for the repository.

## Set up the comment

- ### Create a GitHub token
  Vercel CI doesn't give your tasks a GitHub token, so you need to create one:
  1. In GitHub, create a [fine-grained personal access token](https://github.com/settings/personal-access-tokens/new).
  2. Under **Repository access**, select only your repository.
  3. Under **Permissions**, set **Pull requests** to **Read and write**.
  4. Copy the token.

- ### Store the token in Vercel CI
  Add the token as a [repository CI environment variable](/docs/ci/environment-variables#add-a-repository-ci-environment-variable) named `GITHUB_TOKEN`, and select **Secret**.

- ### Add the task
  Add a `comment` task to your app's `turbo.json`:
  ```json filename="apps/web/turbo.json"
  {
    "extends": ["//"],
    "tasks": {
      "comment": {
        "dependsOn": ["web#deployment"],
        "tags": ["ci", "ci:oidc:deployments"],
        "passThroughEnv": ["GITHUB_TOKEN", "VERCEL_DEPLOYMENT_URLS"],
        "cache": false
      }
    }
  }
  ```
  - `web#deployment` makes the task wait for the `web` deployment of the commit. Vercel CI only provides `VERCEL_DEPLOYMENT_URLS` to tasks with `ci:oidc:deployments` that depend on their package's deployment. To learn more, see [Testing against your deployments](/docs/ci/configuration#testing-against-your-deployments).
  - `passThroughEnv` lets the task read the token and the deployment URL.
  - `cache: false` makes the task run for every commit, so the comment always shows the latest deployment.
  To comment only after your tests pass, add your test task to `dependsOn`, for example `"web#e2e:ci"` from [Running end-to-end tests](/docs/ci/guides/end-to-end-tests).

- ### Write the comment script
  Create a script that finds the pull request and posts the comment. Replace `your-org/your-repo` with your repository:
  ```js filename="apps/web/scripts/comment.mjs"
  import { execFileSync } from 'node:child_process';

  const repository = 'your-org/your-repo';
  const marker = '<!-- vercel-ci-deployment -->';

  const token = process.env.GITHUB_TOKEN;
  const host = JSON.parse(process.env.VERCEL_DEPLOYMENT_URLS).web;
  const sha = execFileSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8',
  }).trim();

  async function github(path, init = {}) {
    const response = await fetch(`https://api.github.com${path}`, {
      ...init,
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2026-03-10',
        ...init.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status} for ${path}`);
    }
    return response.json();
  }

  const pulls = await github(`/repos/${repository}/commits/${sha}/pulls`);
  const pull = pulls.find((candidate) => candidate.state === 'open');
  if (!pull) {
    console.log(`No open pull request for ${sha}.`);
    process.exit(0);
  }

  const body = `${marker}\nDeployment for ${sha.slice(0, 7)}: https://${host}`;
  const comments = await github(
    `/repos/${repository}/issues/${pull.number}/comments?per_page=100`,
  );
  const existing = comments.find((comment) => comment.body?.startsWith(marker));

  if (existing) {
    await github(`/repos/${repository}/issues/comments/${existing.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ body }),
    });
  } else {
    await github(`/repos/${repository}/issues/${pull.number}/comments`, {
      method: 'POST',
      body: JSON.stringify({ body }),
    });
  }
  console.log(`Commented on #${pull.number}.`);
  ```
  - Vercel CI checks out your commit without Git remotes or branch information, so the script gets the commit with `git rev-parse HEAD` and sets the repository itself.
  - The hidden `marker` identifies the comment, so later runs update it instead of adding a new one.
  Add the script to your app's `package.json`:
  ```json filename="apps/web/package.json"
  {
    "scripts": {
      "comment": "node scripts/comment.mjs"
    }
  }
  ```

- ### Push your changes
  Commit the files, push them to a branch, and open a pull request. After the `web` deployment finishes, Vercel CI runs `web#comment`, and the comment appears on the pull request.

## Next steps

- [Run end-to-end tests against your deployment](/docs/ci/guides/end-to-end-tests)
- [Learn more about CI environment variables](/docs/ci/environment-variables)

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
