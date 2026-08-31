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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "7a0ba581963306e5d9375450c9070df8307a175c7027c3252554867f4492ee1f"
---

# Build Queues

Build queueing is when a build must wait for resources to become available before starting. This creates more time between when the code is committed and the deployment being ready.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Why are my Vercel builds queued?](https://vercel.com/kb/guide/why-are-my-vercel-builds-queued?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related) — Learn about why your Vercel builds may be getting queued and how to resolve this.
- [Pro customers can now deploy faster without build queues](https://vercel.com/changelog/pro-customers-can-now-deploy-faster-with-on-demand-concurrency-builds?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related)
- [No build queues: On-demand concurrent builds now on by default](https://vercel.com/changelog/no-build-queues-on-demand-concurrent-builds-now-on-by-default?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related)
- [Limit on-demand concurrent builds to one build per branch](https://vercel.com/changelog/limit-on-demand-concurrent-builds-to-one-build-per-branch?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related)
- [Commits to the same branch now build with no queues](https://vercel.com/changelog/build-commits-to-the-same-branch-without-waiting?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related)
- [Enterprise teams can now ship faster without build queues](https://vercel.com/changelog/enterprise-teams-can-now-ship-faster-without-build-queues?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related)
- [Deploying safely on Vercel without merge queues](https://vercel.com/blog/deploy-safely-on-vercel-without-merge-queues?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related)
- [Vercel Queues](https://vercel.com/docs/queues?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related) — Durable event streaming for serverless. Publish messages to topics and process them reliably with managed consumer group
- [Troubleshooting Build Errors](https://vercel.com/docs/deployments/troubleshoot-a-build?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related) — Learn how to resolve common scenarios you may encounter during the Build step, including build errors that cancel a depl
- [Queues concepts](https://vercel.com/docs/queues/concepts?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related) — Learn delivery, retries, visibility timeouts, and deployment isolation in Vercel Queues.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/builds/build-queues.graph.md](/docs/builds/build-queues.graph.md?from=related&source_path=%2Fdocs%2Fbuilds%2Fbuild-queues&source_site=vercel-docs&relationship=graph)
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

This queue manages how many builds can run in parallel based on the number of [concurrent build slots](/docs/builds/managing-builds#concurrent-builds) available to the team. If all concurrent build slots are in use, new builds are queued until a slot becomes available unless you have **On-Demand Concurrent Builds** [enabled at the project level](/docs/builds/managing-builds#project-level-on-demand-concurrent-builds).

### How concurrent build slots work

Concurrent build slots are the key factor in concurrent build queuing. They control how many builds can run at the same time and ensure efficient use of resources while prioritizing the latest changes.

Each account plan includes a number of build slots that apply only when On-Demand Concurrent Builds is disabled:

- Hobby accounts allow one build at a time.
- Pro accounts include 3 concurrent build slots by default. The first build slot is included, and standard build minutes within it are not billed.
- Enterprise accounts can have [custom limits](/docs/builds/managing-builds#on-demand-concurrent-builds) based on their plan.

## Git branch queue

Builds are handled sequentially. If new commits are pushed while a build is in progress:

1. The current build is completed first.
2. Queued builds for earlier commits are skipped.
3. The most recent commit is built and deployed.

This means that commits in between the current build and most recent commit will not produce builds.

> **💡 Note:** Enterprise users can use [Urgent On-Demand
> Concurrency](/docs/builds/managing-builds#urgent-on-demand-concurrent-builds)
> to skip the Git branch queue for specific builds.


---

[View full sitemap](/docs/sitemap)
