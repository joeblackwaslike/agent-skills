---
title: Build Queues
product: vercel
url: /docs/builds/build-queues
canonical_url: "https://vercel.com/docs/builds/build-queues"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  - /docs/builds
related:
  - /docs/builds/managing-builds
  - /docs/pricing
summary: Understand how concurrency and same branch build queues manage multiple simultaneous deployments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/builds/build-queues.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "3e1b824dcbf3496e9c3ead38b497d2dd68dd2a583b077c3147edca6e2a8b1638"
---

# Build Queues

Build queueing is when a build must wait for resources to become available before starting. This creates more time between when the code is committed and the deployment being ready.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to reduce build costs on Vercel](https://vercel.com/kb/guide/how-reduce-build-costs) — Find which projects drive your Build CPU Minutes, then lower them by skipping unneeded builds, shortening each build, an
- [Limit on-demand concurrent builds to one build per branch](https://vercel.com/changelog/limit-on-demand-concurrent-builds-to-one-build-per-branch)
- [Commits to the same branch now build with no queues](https://vercel.com/changelog/build-commits-to-the-same-branch-without-waiting)
- [Pro customers can now deploy faster without build queues](https://vercel.com/changelog/pro-customers-can-now-deploy-faster-with-on-demand-concurrency-builds)
- [No build queues: On-demand concurrent builds now on by default](https://vercel.com/changelog/no-build-queues-on-demand-concurrent-builds-now-on-by-default)
- [Bulk enable on-demand concurrent builds across projects ](https://vercel.com/changelog/bulk-enable-on-demand-concurrent-builds-across-projects)
- [Deploying safely on Vercel without merge queues](https://vercel.com/blog/deploy-safely-on-vercel-without-merge-queues)
- [Conditional Build Commands: Environment, Branch, and Custom Workflows](https://vercel.com/kb/guide/dynamic-build-commands) — Run a different Vercel build command for each environment or Git branch using a shell script, vercel.json, or vercel.ts,
- [Vercel Queues](https://vercel.com/docs/queues) — Publish agent events and background work to durable topics with independent consumers, automatic retries, and at-least-o
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Queues Observability](https://vercel.com/docs/queues/observability) — Monitor queue throughput, message age, retries, and consumer performance to optimize your queue-based workflows.

Full cross-link map for this page: [/docs/builds/build-queues.graph.md](/docs/builds/build-queues.graph.md)
<!-- /docsgraph:related -->

- [With On-Demand Concurrent Builds](#with-on-demand-concurrent-builds), builds will never queue.
- [Without On-Demand Concurrent Builds](#without-on-demand-concurrent-builds), builds can queue under the conditions specified below.

## With On-Demand Concurrent Builds

[On-Demand Concurrent Builds](/docs/builds/managing-builds#on-demand-concurrent-builds) prevent build queueing so your team can build faster. Vercel dynamically scales the amount of builds that can run simultaneously.

You can choose between two modes:

- **Run all builds immediately**: All builds proceed in parallel without waiting. Your builds will never be queued.
- **Run up to one build per branch**: Limit to one active build per branch. New deployments to the same branch won't be processed while there is an ongoing build, but builds to different branches proceed immediately.

To configure on-demand concurrent builds, see [Project-level on-demand concurrent builds](/docs/builds/managing-builds#project-level-on-demand-concurrent-builds).

**If you're experiencing build queues, we strongly recommend [enabling On-Demand Concurrent Builds](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%23on-demand-concurrent-builds\&title=Enable+On-Demand+Concurrent+Builds)**. For billing information, see [Pricing](/docs/pricing#builds).

## Without On-Demand Concurrent Builds

When multiple deployments are started concurrently from code changes, Vercel's build system places deployments into one of the following queues:

- [Concurrency queue](#concurrency-queue): The basics of build resource management
- [Git branch queue](#git-branch-queue): How builds to the same branch are managed

## Concurrency queue

This queue manages how many builds can run in parallel based on the number of [concurrent build slots](/docs/builds/managing-builds#on-demand-concurrent-builds) available to the team. If all concurrent build slots are in use, new builds are queued until a slot becomes available unless you have **On-Demand Concurrent Builds** [enabled at the project level](/docs/builds/managing-builds#project-level-on-demand-concurrent-builds).

### How concurrent build slots work

Concurrent build slots are the key factor in concurrent build queuing. They control how many builds can run at the same time and ensure efficient use of resources while prioritizing the latest changes.

When On-Demand Concurrent Builds is disabled, builds use the team's concurrency limit:

- Hobby teams can run one build at a time by default.
- Pro and Enterprise teams use their team's configured [concurrency limit](/docs/builds/managing-builds#on-demand-concurrent-builds).

## Git branch queue

Builds are handled sequentially. If new commits are pushed while a build is in progress:

1. The current build is completed first.
2. Queued builds for earlier commits are skipped.
3. The most recent commit is built and deployed.

This means that commits in between the current build and most recent commit will not produce builds.

> **💡 Note:** Pro and Enterprise teams can [force an on-demand
> build](/docs/builds/managing-builds#force-an-on-demand-build)
> to skip the Git branch queue for specific builds.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
