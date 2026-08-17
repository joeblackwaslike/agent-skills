---
title: Vercel Container Registry
product: vercel
url: /docs/container-registry
canonical_url: "https://vercel.com/docs/container-registry"
last_updated: 2026-08-03
type: how-to
prerequisites:
  []
related:
  - /docs/functions/container-images
  - /docs/sandbox/concepts/images
  - /docs/cli
  - /docs/container-registry/public-and-shared-repositories
  - /docs/container-registry/cli-reference
summary: Store and manage Docker container images on Vercel. Push images built from a Dockerfile, then run them on Vercel Functions or in Vercel Sandbox.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1cfeb5a382a250ce534e780a040887c404684d0c85054f58cbc89e0366640c32"
---

# Vercel Container Registry

Vercel Container Registry (VCR) is a Docker-compatible container registry built into Vercel. Store the images you build from a Dockerfile or Containerfile, then run them on [Vercel Functions](/docs/functions/container-images) or use them as custom [Vercel Sandbox](/docs/sandbox/concepts/images) images.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel Container Registry](https://vercel.com/kb/guide/how-to-use-vercel-container-registry?from=related) — Push, store, and pull OCI container images with Vercel Container Registry, then deploy them to Vercel Functions and Verc
- [Deploy Go apps on Vercel using Docker](https://vercel.com/kb/guide/deploy-go-using-docker-vercel?from=related) — Deploy an existing Dockerized Go app to Vercel using Memos as a real-world example, with Neon Postgres for durable data.
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker?from=related) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy PHP on Vercel with Docker](https://vercel.com/kb/guide/deploy-php-on-vercel-with-docker?from=related) — Build a PHP application with FrankenPHP and Docker, then deploy it to Vercel Functions with managed configuration, stora
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [vercel vcr](https://vercel.com/docs/cli/vcr?from=related) — Manage Vercel Container Registry from the Vercel CLI: list, inspect, create, and delete repositories, browse tags, and m
- [Create a repository](https://vercel.com/docs/rest-api/vcr/create-a-repository?from=related)
- [List repository images](https://vercel.com/docs/rest-api/vcr/list-repository-images?from=related)
- [Products](https://vercel.com/docs/products?from=related) — Explore all Vercel products and capabilities.
- [Sandbox](https://vercel.com/docs/sandbox?from=related) — Vercel Sandbox allows you to run arbitrary code in isolated, ephemeral Linux VMs.

Full cross-link map for this page: [/docs/container-registry.graph.md](/docs/container-registry.graph.md)
<!-- /docsgraph:related -->

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

You can also run `vercel vcr add my-repository`.

## Use your container tool directly

If you'd rather not use `vercel vcr build` and `vercel vcr push`, authenticate and push with your container tool yourself. You still need the team slug and project name for the image reference, and the account you authenticate with still needs access to that project.

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

## Manage repositories from the CLI

Use the `vercel vcr` command group in the [Vercel CLI](/docs/cli) to list, inspect, create, and delete repositories, to manage their tags and images, and to manage repository sharing. For all commands, subcommands, and options, see the [Container Registry CLI Reference](/docs/container-registry/cli-reference).

## Resources

**Getting Started**: Authenticate, then push and pull your first image with the Vercel CLI. [Learn more →](/docs/container-registry/getting-started)

**Public and Shared Repositories**: Control which Vercel teams can pull images from a repository. [Learn more →](/docs/container-registry/public-and-shared-repositories)

**CLI Reference**: Manage repositories, tags, images, and permissions from the terminal. [Learn more →](/docs/container-registry/cli-reference)

**Limits & Pricing**: Review storage pricing, resource limits, and compatibility. [Learn more →](/docs/container-registry/limits-and-pricing)

**Sandbox Images**: Create Vercel Sandboxes from custom VCR images. [Learn more →](/docs/sandbox/concepts/images)

**Vercel Functions Container Images**: Run Vercel Functions from custom VCR images. [Learn more →](/docs/functions/container-images#usage)


---

[View full sitemap](/docs/sitemap)
