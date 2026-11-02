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
source: "https://vercel.com/docs/ci/guides/github-comments.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "a27e176fc3bacf3f70070bae9a814cd819e96042cae4787a6a1c0f09089bc33a"
---

# Commenting on Pull Requests from Vercel CI

In this tutorial, you'll add a Vercel CI task that comments on your pull request with the URL of the commit's Vercel deployment. On each new push, the task updates the same comment instead of adding a new one.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
