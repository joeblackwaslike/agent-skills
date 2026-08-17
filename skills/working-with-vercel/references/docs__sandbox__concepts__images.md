---
title: Images
product: vercel
url: /docs/sandbox/concepts/images
canonical_url: "https://vercel.com/docs/sandbox/concepts/images"
last_updated: 2026-08-03
type: how-to
prerequisites:
  - /docs/sandbox/concepts
  - /docs/sandbox
related:
  - /docs/container-registry
  - /docs/container-registry/public-and-shared-repositories
  - /docs/container-registry/getting-started
summary: Start sandboxes from custom OCI images stored in Vercel Container Registry to ship your own system packages, tooling, and filesystem layout.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sandbox/concepts/images.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "c856ca40c8b0abf1f51506d971f35e7efce585224ba44189e22c4699dcdff104"
---

# Images

Custom images give you full control over the sandbox environment. Define the Linux distribution, system packages, language toolchains, and filesystem layout in a Dockerfile, and your sandboxes boot straight into that environment with nothing to install at runtime. Reuse an image you already build for CI or production, or build one specifically for your agents.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running Docker on Vercel](https://vercel.com/kb/guide/docker?from=related) — Learn how to run Docker on Vercel by deploying OCI container images as Vercel Functions, storing them in Vercel Containe
- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry?from=related) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr?from=related) — Migrate container images from GitHub Container Registry \(GHCR\) to Vercel Container Registry \(VCR\), including authent
- [How to test a container image in Vercel Sandbox before deploying](https://vercel.com/kb/guide/test-container-image-vercel-sandbox?from=related) — Validate a container image before deploying by booting it as a custom Sandbox image from Vercel Container Registry \(VCR
- [Examples](https://vercel.com/docs/sandbox/working-with-sandbox?from=related) — Task-oriented examples for common Vercel Sandbox operations in TypeScript and Python.
- [Run Commands in Vercel Sandbox](https://vercel.com/docs/sandbox/run-commands-in-sandbox?from=related) — Create isolated sandbox environments to run builds, tests, and commands safely.
- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes?from=related) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [vercel sandbox](https://vercel.com/docs/cli/sandbox?from=related) — Interact with Vercel Sandbox from the Vercel CLI: list, create, connect, exec, copy, stop, and snapshot sandboxes from y
- [Multi-Agent](https://vercel.com/docs/sandbox/concepts/multi-agent?from=related) — Give each AI agent an isolated Linux user in a Vercel Sandbox with the @vercel/sandbox createUser, createGroup, and asUs

Full cross-link map for this page: [/docs/sandbox/concepts/images.graph.md](/docs/sandbox/concepts/images.graph.md)
<!-- /docsgraph:related -->

Sandbox pulls images from [Vercel Container Registry (VCR)](/docs/container-registry), a project-scoped registry for OCI images. Pin environments with tags and digests, [share a repository](/docs/container-registry/public-and-shared-repositories#share-a-repository) to reuse one image across projects and teams, or [mark a repository public](/docs/container-registry/public-and-shared-repositories#public-repositories) to let any other team use your image.

## How images work

When you pass an `image` to `Sandbox.create()`, Vercel resolves the reference against VCR and boots the sandbox from that image's filesystem. Bare repository names resolve against the authenticated project, and [team-scoped references](#image-references) resolve against the referenced team and project.

You can use a [Vercel Managed Image (VMI)](#vercel-managed-images), your own [custom images](#custom-images), a custom image [shared with your team](#use-a-shared-image), or a [public image](#use-a-public-image) published by another team.

## Vercel Managed Images

Vercel maintains a set of managed images containing common tools and languages, published under the `vercel/sandbox` scope.

| Image                                                                                             | Base                    | Contents                                                  |
| ------------------------------------------------------------------------------------------------- | ----------------------- | --------------------------------------------------------- |
| [`vercel/sandbox/universal:latest`](https://github.com/vercel/sandbox/tree/main/images/universal) | `vercel/sandbox/ubuntu` | Node.js LTS (24), Python (3.14), coding agents, utilities |
| [`vercel/sandbox/node:22\|24\|26`](https://github.com/vercel/sandbox/tree/main/images/node)       | `vercel/sandbox/ubuntu` | Node.js (major pinned), pnpm                              |
| [`vercel/sandbox/python:3.14`](https://github.com/vercel/sandbox/tree/main/images/python)         | `vercel/sandbox/ubuntu` | Python 3.14 (pinned), pip, venv, uv                       |
| [`vercel/sandbox/arch:latest`](https://github.com/vercel/sandbox/tree/main/images/arch)           | `archlinux:latest`      | Arch Linux, yay (AUR), base-devel, git                    |
| [`vercel/sandbox/ubuntu:latest`](https://github.com/vercel/sandbox/tree/main/images/ubuntu)       | `ubuntu:26.04`          | Ubuntu + sudo                                             |

The `vercel/sandbox/universal:latest` image is the default for sandboxes that don't specify an image. You can pin to a specific tag or digest, or use any of the other available managed image:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  image: 'vercel/sandbox/universal@sha256:...', // Use a specific digest of the universal image
  // image: 'vercel/sandbox/node:24',           // Use the Node.js 24 image
  // image: 'vercel/sandbox/ubuntu',            // Use the latest Ubuntu image
});
```

### Release cadence

Every managed image gets a nightly release. Rolling tags (e.g. `universal:latest`) and the major-version tags (`node:26` or `python:3.14`) pick up operating system updates automatically, including security patches. New releases of Node.js, Python, preinstalled coding agents and other dependencies are picked up in nightly releases via an automated pipeline.

Images are open source, with their source code [available on GitHub](https://github.com/vercel/sandbox/tree/main/images). To propose changes, open a pull request.

## Custom images

To avoid repeated work in every sandbox, or if you require a specific set of tools, libraries, or system packages, you can build your own custom image and push it to VCR. Custom images can also be [shared with other teams](#use-a-shared-image) or [marked public](#use-a-public-image) for any team to use.

VCR only serves an image to Sandbox once it has prepared an optimized `linux/amd64` build. After you push an image, VCR reports a readiness state on the repository details page:

| Status        | Meaning                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| `Ready`       | VCR prepared the image and Sandbox can use it.                                             |
| `Preparing`   | VCR is preparing a `linux/amd64` image.                                                    |
| `Unoptimized` | The image is pullable from VCR, but it is not `linux/amd64` and cannot be used in Sandbox. |

If `Sandbox.create()` returns `image_not_ready`, retry after preparation finishes.

> **💡 Note:** Vercel Sandbox does not run Docker `ENTRYPOINT` or `CMD` for custom images.
> Start processes with `sandbox.runCommand()` after the sandbox is created.

If the Dockerfile defines `WORKDIR`, new commands start in that directory. Otherwise, commands start from `/`.

### Push an image to VCR

First, [push an OCI image to Vercel Container Registry (VCR)](/docs/container-registry/getting-started#push-an-image):

```bash filename="Terminal"
vercel vcr build docker . my-repository:latest --push
```

### Create a sandbox from a custom image

After the image is pushed, create the sandbox with the repository reference for the authenticated project:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  image: 'my-repository:latest',
});

try {
  const result = await sandbox.runCommand('pwd');
  console.log(await result.stdout());
} finally {
  await sandbox.stop();
}
```

### Use a shared image

A team can [share a VCR repository](/docs/container-registry/public-and-shared-repositories#share-a-repository) to give other teams read access to its images. Once a repository is shared with your team, create sandboxes from its images with a team-scoped reference:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  image: 'other-team/their-project/shared-repository:latest',
});
```

Sharing also works within a team. VCR repositories belong to a single project, so by default a sandbox can only use images from its own project. To use a repository's images from other projects in your team, share the repository with your own team:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

// Created in a different project of my-team
const sandbox = await Sandbox.create({
  image: 'my-team/other-project/my-repository:latest',
});
```

### Use a public image

A team can [mark a VCR repository as public](/docs/container-registry/public-and-shared-repositories#public-repositories) to give any other team read access to its images. Anyone on Vercel can then create sandboxes from the repository's images with a team-scoped reference:

```ts filename="index.ts"
import { Sandbox } from '@vercel/sandbox';

const sandbox = await Sandbox.create({
  image: 'other-team/their-project/public-repository:latest',
});
```

Vercel uses that approach to make [Vercel Managed Images (VMI)](#vercel-managed-images) accessible to any team.

## Image references

`image` accepts a repository name, tag, digest, or team-scoped reference:

| Reference                                                        | What it resolves                                        |
| ---------------------------------------------------------------- | ------------------------------------------------------- |
| `my-repository`                                                  | The `latest` tag in the authenticated project           |
| `my-repository:v1`                                               | A specific tag in the authenticated project             |
| `my-repository@sha256:...`                                       | A specific digest in the authenticated project          |
| `team-slug/project-slug/my-repository`                           | The `latest` tag in the referenced team and project     |
| `team-slug/project-slug/my-repository:v1`                        | A specific tag in the referenced team and project       |
| `team-slug/project-slug/my-repository@sha256:...`                | A specific digest in the referenced team and project    |
| `vcr.vercel.com/team-slug/project-slug/my-repository:v1`         | Same as the team-scoped reference, using the fully qualified registry URL |

The `vcr.vercel.com/` prefix is optional and works with any team-scoped form, including tags and digests.

A team-scoped reference resolves against the referenced team and project. It works when the reference points at the authenticated project, or at a repository that has been [shared with your team](/docs/container-registry/public-and-shared-repositories#share-a-repository) or [marked as public](/docs/container-registry/public-and-shared-repositories#public-repositories). If the repository doesn't exist or isn't shared with your team, `Sandbox.create()` returns `not_found`.


---

[View full sitemap](/docs/sitemap)
