---
title: Vercel CI
product: vercel
url: /docs/ci
canonical_url: "https://vercel.com/docs/ci"
last_updated: 2026-10-28
type: how-to
prerequisites:
  []
related:
  - /docs/cli/ci
  - /docs/agent-resources/vercel-mcp
  - /docs/rest-api
  - /docs/ci/configuration
  - /docs/ci/environment-variables
summary: Configure Vercel CI to run Turborepo tasks with custom CPU allocations and environment variables.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ci.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "dfa82903c455c197ef9124b4ff2ffe5530c54db7fbf65a1ac3ba460ab9149b68"
---

# Vercel CI

Vercel CI intelligently schedules your tasks so that you do as little work as possible every time you or your agent pushes code.

- Your [Turborepo Task Graph](https://turborepo.dev/docs/core-concepts/package-and-task-graph#task-graph) is used to find the minimal set of tasks to run. If a task isn't affected by your code changes or has already been cached, it will be restored from cache or skipped.
- [Vercel Remote Cache](https://vercel.com/docs/monorepos/remote-caching#vercel-remote-cache) is enabled with zero-configuration.
- Each task is executed in its own isolated compute and given the right amount of compute for its needs. This substantially improves resource provisioning and makes task execution faster.

> **💡 Note:** Vercel CI is in Beta. Features and configuration may change.

## How it works

Vercel CI watches your repository for new code changes. On each `git push`:

1. Turborepo determines the set of tasks that are tagged with `"tags": ["ci"]` in `turbo.json`.
2. For those tasks, [Vercel Remote Cache](https://vercel.com/docs/monorepos/remote-caching#vercel-remote-cache) is checked to see which tasks have already been cached.
3. The remaining set of uncached, tagged tasks are marked for execution.
4. Each task is executed in dependency order, and in its own compute instance.
5. The status of your tasks are posted back to your source code forge. If one or more tasks fail, Vercel CI is marked as failed.

## Getting started

If your Turborepo checks run in GitHub Actions, follow [Migrate from GitHub Actions to Vercel CI](/kb/guide/github-actions-to-vercel-ci) to move your tasks and secrets, compare both pipelines, and switch your required status checks.

### Prerequisites

- Vercel CI requires Turborepo 2.11.7 or later.
- Vercel CLI 64.3.1 or later

### Set up with an agent

Use the Vercel CI setup Skill to have your coding agent select initial tasks, configure Vercel CI, and open a pull request. Open your repository in your agent, then copy and send this prompt:

**Agent prompt**

```text
Set up Vercel CI for this repository. Run `npx skills use vercel/ci@setup` and follow the skill's instructions to select initial tasks, configure Vercel CI, and open a pull request.
```

### Manual set up

#### Enable Vercel CI

You must explicitly enable Vercel CI for your repository before it can run tasks.

Connect your GitHub repository to a Vercel project on your team. Then, from a local clone of your repository, run:

```bash filename="terminal"
vercel ci enable
```

#### Run a task

Add the `ci` tag to each task that Vercel CI should run. Vercel CI uses the Turborepo task graph to run each affected `package#task` selector and its dependencies.

In the example below, the `test` task will run in Vercel CI.

```json filename="turbo.json" {4}
{
  "tasks": {
    "test": {
      "tags": ["ci"]
    }
  }
}
```

## Finding tasks and logs

In the dashboard, all of the CI runs for your team can be found in [the CI tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fci\&title=).

For programmatic and agentic access, Vercel CI is available in:

- [Vercel CLI](/docs/cli/ci) (version 64.3.1 or later)
- [Vercel MCP](/docs/agent-resources/vercel-mcp)
- [Our OpenAPI specification](/docs/rest-api)

Additionally, PRs have a link to your CI run available in the GitHub merge box, alongside all your other PR's checks.

## Communicating with your source forge

You can use [branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) to prevent Pull Requests from merging when failures in Vercel CI are present. This prevents you from merging unwanted code, and works the same way as blocking on a GitHub Action failure.

## Limitations

- Vercel CI currently only offers Linux for its base image.
- GitHub is currently the only supported source code forge.
- Public repositories are not currently supported.
- Pushing code to GitHub with `git push` is currently the only supported trigger.
- A repository must be connected to at least one Vercel project.
- A repository must not have projects connected to multiple Vercel teams.

## Learn more

- [Configuration](/docs/ci/configuration): Set task dependencies and configure resource sizes.
- [Environment variables](/docs/ci/environment-variables): Add secrets and constants for your CI runs.
- [Images](/docs/ci/image): Choose the operating system your tasks run on, and run Docker containers in your tasks.
- [Guides](/docs/ci/guides): Follow complete examples, like running end-to-end tests and commenting on pull requests.
- [Pricing](/docs/ci/pricing): Understand how Vercel CI usage is billed.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
