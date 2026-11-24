---
title: Vercel Container Registry
product: vercel
url: /docs/container-registry
canonical_url: "https://vercel.com/docs/container-registry"
last_updated: 2026-09-04
type: how-to
prerequisites:
  []
related:
  - /docs/functions/container-images
  - /docs/sandbox/concepts/images
  - /docs/daemons
  - /docs/sandbox/cli-reference
  - /docs/cli
summary: Store and manage Docker container images on Vercel. Build and push images with the Vercel CLI, then run them on Vercel Functions or in Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/container-registry.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "955513b01470855eaceb635314808dd7e9f8e995d75c64de3342f0bcd76a9666"
---

# Vercel Container Registry

## Store and run container images

Build and push images to Vercel Container Registry (VCR) with Docker, Podman, or Buildah, then run them on Vercel Functions or start Vercel Sandboxes from them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Run Docker on Vercel for HTTP apps and background workers, store images in Vercel Container Registry, and test container
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [Bring your Dockerfile to Vercel Functions](https://vercel.com/changelog/bring-your-dockerfile-to-vercel-functions)
- [Introducing VCR: Vercel Container Registry](https://vercel.com/changelog/introducing-vcr-vercel-container-registry)
- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli)
- [Share Vercel Container Registry repositories across teams](https://vercel.com/changelog/share-vercel-container-registry-repositories-across-teams)
- [Push images to Vercel Container Registry from GitHub Actions](https://vercel.com/changelog/vcr-login-github-action)
- [Deploy Go apps on Vercel using Docker](https://vercel.com/kb/guide/deploy-go-using-docker-vercel) — Deploy an existing Dockerized Go app to Vercel using Memos as a real-world example, with Neon Postgres for durable data.
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Backends on Vercel: Python, containers, and Daemons](https://vercel.com/blog/backends-on-vercel-python-containers-and-daemons)
- [vercel vcr](https://vercel.com/docs/cli/vcr) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and

Full cross-link map for this page: [/docs/container-registry.graph.md](/docs/container-registry.graph.md)
<!-- /docsgraph:related -->

#### Push an image

```bash filename="terminal"
vercel link
vercel vcr login docker
vercel vcr build docker . my-api:1.2.3 --push
```

#### Pull an image

```bash filename="terminal"
vercel vcr tag inspect my-api 1.2.3
docker pull \
  vcr.vercel.com/my-team/my-site/my-api:1.2.3
```

#### Run in a sandbox

```bash filename="terminal"
npm i -g sandbox
sandbox login
sandbox run --image my-api:1.2.3 --rm -- ls /
```

Vercel Container Registry (VCR) is a Docker-compatible container registry built into Vercel. [Vercel Functions](/docs/functions/container-images) can run the images you store in it, and [Vercel Sandbox](/docs/sandbox/concepts/images) can start from them as custom images. When you deploy [Daemons](/docs/daemons), Vercel pushes each daemon's image to a repository named `daemon.<name>`.

The examples above push an image to a repository named `my-api` with the tag `1.2.3`, pull it back with Docker, and start a sandbox from it. In the pull example, replace `my-team` and `my-site` with the team slug and project name that `vercel vcr tag inspect` reports. The sandbox example uses the [Sandbox CLI](/docs/sandbox/cli-reference) in your linked project directory and lists the image's root directory. Sandbox can start from the image once its repository shows **Ready**, as described in [Verify an image before you use it](#verify-an-image-before-you-use-it).

With the [Vercel CLI](/docs/cli), `vercel vcr` authenticates your container tool and resolves the full image reference.

VCR also works without the Vercel CLI. It implements the Docker Registry HTTP API v2 with OCI media types, so you can point any OCI tooling such as Docker or Podman at `vcr.vercel.com` and authenticate, push, and pull yourself. See [Use your container tool directly](#use-your-container-tool-directly).

## Using the Vercel CLI

You need three things:

- **A Vercel project.** Every VCR repository belongs to one project, and every `vercel vcr` command targets one project. Run `vercel link` in your project directory to link it, or pass `--project <name-or-id>` to each command.
- **Docker, Podman, or Buildah installed and on your `PATH`.** `vercel vcr build` and `vercel vcr push` run your local container tool instead of replacing it, so the tool name is always required and its own flags still apply.
- **A Dockerfile or Containerfile** in the directory you build.

You don't need to create a repository first. VCR creates one on the first push, as long as your account has access to the project.

### Push an image

From your project directory, log in and then build and push in one step:

```bash filename="terminal"
vercel link
vercel vcr login docker
vercel vcr build docker . --push
```

`vercel vcr login` mints a short-lived, project-scoped OpenID Connect (OIDC) token and passes it to your container tool with the username `oidc`. The credentials are valid for 12 hours, so re-run the command to refresh them.

`vercel vcr build` tags the image for your project and `--push` uploads it. With Docker Buildx installed, the CLI builds and pushes in a single step with zstd compression, which is the recommended format for VCR images. Podman and Buildah build first, then push with zstd compression. Without Buildx, Docker builds and pushes without zstd compression, and the CLI warns you.

Replace `docker` with `podman` or `buildah` to use a different tool.

### What the CLI fills in for you

Without extra arguments, the commands above push `vcr.vercel.com/<team-slug>/<project-name>/<project-name>:latest`:

| Value         | Default            | How to override                          |
| ------------- | ------------------ | ---------------------------------------- |
| Build context | `.`                | `vercel vcr build docker ./app`          |
| Repository    | The project name   | `vercel vcr build docker . my-api`       |
| Tag           | `latest`           | `vercel vcr build docker . my-api:1.2.3` |
| Platform      | `linux/amd64`      | `--platform linux/arm64`                 |
| Project       | The linked project | `--project my-app`                       |

Pass only a repository name, optionally with a tag. The CLI adds the registry host, team, and project segments, and rejects a name containing `/`.

### Build and push as separate steps

Omit `--push` to build locally, then push when you're ready:

```bash filename="terminal"
vercel vcr build docker .
vercel vcr push docker
```

Both commands resolve the same defaults, so `push` finds the image that `build` produced. If you passed a `name[:tag]` to `build`, pass the same one to `push`.

### Pass flags to your container tool

Anything after `--` goes to the container tool unchanged:

```bash filename="terminal"
vercel vcr build docker . -- --no-cache --build-arg KEY=value
```

### Pull an image

The CLI doesn't wrap `pull`. Print the full reference for a tag, then pull that reference with your container tool. `tag inspect` reports the values to use in place of `team-slug` and `project-name`. With the default push, the repository is named after your project, so `project-name` appears twice in the reference. If you passed a `name[:tag]` when pushing, use that repository name in the `tag inspect` command and as the last segment of the reference instead:

```bash filename="terminal"
vercel vcr tag inspect project-name latest
docker pull vcr.vercel.com/team-slug/project-name/project-name:latest
```

## Image references and repository names

A full image reference includes the registry host, team slug, project name, repository name, and tag or digest:

```txt
vcr.vercel.com/team-slug/project-name/my-repository:latest
```

The `team-slug` segment is the slug in your dashboard URL, and `project-name` is the project the repository belongs to. `vercel vcr build` and `vercel vcr push` assemble both segments from the linked project, so you only type the repository and tag.

Repository names can include lowercase letters, numbers, periods, underscores, and dashes. The name can't start or end with a period, underscore, or dash.

Repositories are private by default, but you can [share them with specific Vercel teams or make them public](/docs/container-registry/public-and-shared-repositories).

## Create a repository

Pushing creates a repository automatically. To create an empty one from your project dashboard:

1. Open [**Images**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fimages\&title=Go+to+Images) in your project dashboard.
2. Click **Create Repository**.
3. Enter a repository name, such as `my-repository`.

You can also run `vercel vcr create my-repository`.

## Use your container tool directly

If you'd rather not use `vercel vcr build` and `vercel vcr push`, authenticate and push with your container tool yourself. You still need the team slug and project name for the image reference, and the account you authenticate with still needs access to that project.

To push from a GitHub Actions workflow, use the prebuilt Vercel login action instead. It authenticates with OIDC, so there are no long-lived tokens to manage. See [Push Images from GitHub Actions](/docs/container-registry/github-actions).

### Authenticate with a Vercel token

Create a token on the [Account Tokens page](/account/tokens) and set `VERCEL_TOKEN` to that value. The Docker username is the team ID that owns the project:

```bash filename="terminal"
printf '%s' "$VERCEL_TOKEN" | docker login vcr.vercel.com \
  --username "$VERCEL_TEAM_ID" \
  --password-stdin
```

Docker prints `Login Succeeded` when authentication succeeds.

You can also authenticate with `vercel vcr login docker` and then run your container tool directly, which avoids managing a long-lived token.

### Build and push with Docker Buildx

> **💡 Note:** Vercel recommends zstd compression for images pushed to VCR.

Docker only applies zstd compression through the Buildx `--output` exporter, which builds and pushes in one step. Replace `team-slug`, `project-name`, and `my-repository` with your own values, and leave the remaining settings as they are:

```bash filename="terminal"
docker buildx build \
  --platform linux/amd64 \
  --output "type=image,name=vcr.vercel.com/team-slug/project-name/my-repository:latest,push=true,oci-mediatypes=true,compression=zstd,compression-level=3,force-compression=true" \
  .
```

Without Buildx, build and push in two steps. This path doesn't set zstd compression:

```bash filename="terminal"
docker build \
  -t vcr.vercel.com/team-slug/project-name/my-repository:latest \
  .

docker push vcr.vercel.com/team-slug/project-name/my-repository:latest
```

## Verify an image before you use it

After you push, confirm that VCR has the image you expect before you deploy it or start sandboxes from it.

1. Pull the image back with the same platform you built for, and compare the digest Docker prints with the digest from your push:

   ```bash filename="terminal"
   docker pull --platform linux/amd64 \
     vcr.vercel.com/team-slug/project-name/my-repository:latest
   ```

   You can also compare tags and digests in your project's **Images** tab.

2. If you'll use the image in [Vercel Sandbox](/docs/sandbox/concepts/images), wait until the repository details page shows **Ready**. VCR prepares an optimized `linux/amd64` build after each push, and Sandbox can't use the image until that finishes. An **Unoptimized** status means the image isn't `linux/amd64`, so rebuild it with `--platform linux/amd64`.

3. Start a short-lived sandbox from the image and run a command that the image includes. This example uses the [Sandbox SDK](/docs/sandbox/sdk-reference) with credentials from `vercel env pull`:

   ```js filename="sandbox-check.mjs"
   import { Sandbox } from '@vercel/sandbox';

   const sandbox = await Sandbox.create({
     image: 'my-repository:latest',
     persistent: false,
   });

   try {
     const result = await sandbox.runCommand('pwd');
     console.log(await result.stdout());
   } finally {
     await sandbox.stop();
   }
   ```

   Run it with `node --env-file=.env.local sandbox-check.mjs`. The command prints the image's working directory, which is the Dockerfile's `WORKDIR` or `/`. Sandbox doesn't run the image's `ENTRYPOINT` or `CMD`, so start processes with `sandbox.runCommand()`. If `Sandbox.create()` returns `image_not_ready`, wait for **Ready** and try again.

## Tag and pin images

Give each production build a unique tag, such as its commit SHA, and don't reuse that tag for a different build. A tag such as `latest` can point to a new image after any push, so use it only for local iteration.

When you need the exact image contents, reference the image by digest instead of by tag. A digest identifies one specific image and never changes:

```txt
vcr.vercel.com/team-slug/project-name/my-repository@sha256:<digest>
```

Sandbox accepts the same [digest references](/docs/sandbox/concepts/images#image-references), such as `my-repository@sha256:<digest>`.

## Manage repositories from the CLI

Use the `vercel vcr` command group in the [Vercel CLI](/docs/cli) to list, inspect, create, and delete repositories, to manage their tags and images, and to manage repository sharing. For all commands, subcommands, and options, see the [Container Registry CLI Reference](/docs/container-registry/cli-reference).

## Resources

**Getting Started**: Authenticate, then push and pull your first image with the Vercel CLI. [Learn more →](/docs/container-registry/getting-started)

**Public and Shared Repositories**: Control which Vercel teams can pull images from a repository. [Learn more →](/docs/container-registry/public-and-shared-repositories)

**CLI Reference**: Manage repositories, tags, images, and permissions from the terminal. [Learn more →](/docs/container-registry/cli-reference)

**Limits & Pricing**: Review storage pricing, resource limits, and compatibility. [Learn more →](/docs/container-registry/limits-and-pricing)

**Sandbox Images**: Create Vercel Sandboxes from custom VCR images. [Learn more →](/docs/sandbox/concepts/images)

**Vercel Functions Container Images**: Run Vercel Functions from custom VCR images. [Learn more →](/docs/functions/container-images#usage)

## Related guides

- [How to choose between Functions, containers, and Daemons on Vercel](https://vercel.com/kb/guide/vercel-functions-containers-daemons): Choose Vercel Functions for HTTP requests, container images for custom runtimes, and Daemons for continuous background workers.
- [Run a Docker monolith with workers on Vercel](https://vercel.com/kb/guide/docker-monolith-workers-vercel): Run a Dockerized monolith on Vercel with Container Images, move long-running workers to Vercel Queues and Vercel Workflows, and keep previews for every PR.
- [Deploy Laravel on Vercel with Docker](https://vercel.com/kb/guide/laravel-php-with-docker): Build a Laravel application with FrankenPHP and Docker, then deploy it to Vercel with production configuration, external storage, and preview deployments.
- [Vercel vs Kubernetes](https://vercel.com/kb/guide/vercel-vs-kubernetes): Compare Vercel and Kubernetes on operational ownership, deployment workflow, scaling, and cost model to decide which platform fits your workload and team.

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
