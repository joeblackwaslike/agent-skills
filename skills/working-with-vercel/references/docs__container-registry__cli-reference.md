---
title: Container Registry CLI Reference
product: vercel
url: /docs/container-registry/cli-reference
canonical_url: "https://vercel.com/docs/container-registry/cli-reference"
last_updated: 2026-09-04
type: reference
prerequisites:
  - /docs/container-registry
related:
  - /docs/container-registry
  - /docs/container-registry/public-and-shared-repositories
  - /docs/cli
  - /docs/cli/link
summary: Use the vercel vcr command group to manage Vercel Container Registry repositories, tags, and images from the command line.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/cli-reference.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "240d1ed325ab19f6b9519fb2058dd1e05e591047d7c44ed375141f84b801dc9e"
---

# Container Registry CLI Reference

The `vercel vcr` command group lets you manage [Vercel Container Registry](/docs/container-registry) (VCR) repositories, tags, and images from your terminal. Use it to list, inspect, create, and delete repositories, browse a repository's tags, manage the images stored in each repository, and control which teams a repository is [shared](/docs/container-registry/public-and-shared-repositories#share-a-repository) with.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to migrate from GHCR to Vercel Container Registry](https://vercel.com/kb/guide/migrate-ghcr-to-vcr) — Migrate container images from GitHub Container Registry \\(GHCR\\) to Vercel Container Registry \\(VCR\\), including authent
- [Manage Vercel Container Registry with Vercel CLI](https://vercel.com/changelog/manage-vercel-container-registry-with-vercel-cli)
- [Running Docker on Vercel](https://vercel.com/kb/guide/docker) — Run Docker on Vercel for HTTP apps and background workers, store images in Vercel Container Registry, and test container
- [Does Vercel support Docker deployments?](https://vercel.com/kb/guide/does-vercel-support-docker-deployments) — Vercel supports deploying OCI-compatible container images through Vercel Functions and Vercel Container Registry, with A
- [vercel vcr](https://vercel.com/docs/cli/vcr) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and
- [vercel blob](https://vercel.com/docs/cli/blob) — Learn how to interact with Vercel Blob storage using the vercel blob CLI command.
- [Get a repository image](https://vercel.com/docs/rest-api/vcr/get-a-repository-image) — GET /v1/vcr/repository/{idOrName}/images/{imageIdOrDigest} — Fetch an individual image from a repository, including its
- [vercel agent-runs](https://vercel.com/docs/cli/agent-runs) — Find projects with Agent Runs, list recent runs, and inspect run metadata and conversation traces from the command line.
- [vercel cache](https://vercel.com/docs/cli/cache) — Learn how to manage cache for your project using the vercel cache CLI command.

Full cross-link map for this page: [/docs/container-registry/cli-reference.graph.md](/docs/container-registry/cli-reference.graph.md)
<!-- /docsgraph:related -->

`vercel vcr` is part of the [Vercel CLI](/docs/cli). Use [`vercel vcr build`](#vercel-vcr-build) and [`vercel vcr push`](#vercel-vcr-push) to build and push images, and see the [Container Registry documentation](/docs/container-registry#push-an-image) for the end-to-end workflow. Both commands run your local container tool rather than replacing it, so the tool you choose must be installed and on your `PATH`.

Each command operates on a single Vercel project. By default, the CLI uses the [linked project](/docs/cli/link). Pass `--project` to target a different project.

## Installation

Install the Vercel CLI globally to use the `vercel vcr` commands:

**pnpm**

```bash
pnpm i -g vercel
```

**yarn**

```bash
yarn global add vercel
```

**npm**

```bash
npm i -g vercel
```

**bun**

```bash
bun add -g vercel
```

## Authentication

Log in to your Vercel account:

```bash filename="terminal"
vercel login
```

Then link the directory to a Vercel project so the commands default to it:

```bash filename="terminal"
vercel link
```

## `vercel vcr`

Manage Vercel Container Registry repositories and images.

```bash filename="terminal"
vercel vcr <subcommand> [OPTIONS]
```

**Available subcommands:**

- [`ls`](#vercel-vcr-ls): List container registry repositories for a project. (alias: `list`)
- [`inspect`](#vercel-vcr-inspect): Show details for a single repository.
- [`create`](#vercel-vcr-create): Create a container registry repository.
- [`delete`](#vercel-vcr-delete): Delete a container registry repository.
- [`login`](#vercel-vcr-login): Authenticate a container tool with the Vercel Container Registry.
- [`build`](#vercel-vcr-build): Build a container image tagged for the Vercel Container Registry.
- [`push`](#vercel-vcr-push): Push a container image to the Vercel Container Registry.
- [`tag`](#vercel-vcr-tag): List or inspect a repository's tags. (alias: `tags`)
- [`image`](#vercel-vcr-image): List, inspect, or delete images in a repository. (alias: `images`)
- [`permissions`](#vercel-vcr-permissions): Manage which teams can pull images from a repository. (alias: `permission`)
- [`update`](#vercel-vcr-update): Update a repository, such as its visibility.

For more help, try running `vercel vcr <subcommand> --help`.

## `vercel vcr ls`

List container registry repositories for a project.

```bash filename="terminal"
vercel vcr ls [OPTIONS]
```

### `vercel vcr ls` example

```bash filename="terminal"
# List repositories in the linked project
vercel vcr ls

# List repositories for a specific project as JSON
vercel vcr ls --project my-app --json

# Page through results using the cursor reported by the previous page
vercel vcr ls --next <token>
```

### `vercel vcr ls` options

| Option                   | Short | Description                                                    |
| ------------------------ | ----- | ------------------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).          |
| `--limit <number>`       | `-n`  | Number of results to return per page (max: 100).              |
| `--next <token>`         | -     | Cursor from a previous page to continue listing from.         |

### `vercel vcr ls` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` | -     | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

## `vercel vcr inspect`

Show details for a single repository.

```bash filename="terminal"
vercel vcr inspect [OPTIONS] <repository>
```

### `vercel vcr inspect` example

```bash filename="terminal"
# Inspect a repository by name
vercel vcr inspect my-repository

# Inspect a repository by ID
vercel vcr inspect repo_CVSY2AmyvugNN6WOTFKOF5VfeZ6r
```

### `vercel vcr inspect` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr inspect` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` |       | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr inspect` arguments

| Argument       | Description                                     |
| -------------- | ----------------------------------------------- |
| `<repository>` | The name or ID of the repository to inspect.    |

## `vercel vcr create`

Create a container registry repository.

```bash filename="terminal"
vercel vcr create [OPTIONS] <name>
```

### `vercel vcr create` example

```bash filename="terminal"
# Create a repository
vercel vcr create my-repository
```

> **💡 Note:** Repository names can include lowercase letters, numbers, periods,
> underscores, and dashes. The name can't start or end with a period,
> underscore, or dash.

### `vercel vcr create` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr create` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` |       | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr create` arguments

| Argument | Description                        |
| -------- | ---------------------------------- |
| `<name>` | The name of the repository to create. |

## `vercel vcr delete`

Delete a container registry repository and all of its images.

```bash filename="terminal"
vercel vcr delete [OPTIONS] <repository>
```

> **💡 Note:** This action is permanent and cannot be undone.

### `vercel vcr delete` example

```bash filename="terminal"
# Delete a repository, with a confirmation prompt
vercel vcr delete my-repository

# Delete a repository without the confirmation prompt
vercel vcr delete my-repository --yes
```

### `vercel vcr delete` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr delete` flags

| Flag     | Short | Description                          |
| -------- | ----- | ------------------------------------ |
| `--yes`  | `-y`  | Skip the confirmation prompt.        |
| `--json` |       | Output as JSON.                      |
| `--help` | `-h`  | Display help information.            |

### `vercel vcr delete` arguments

| Argument       | Description                              |
| -------------- | ---------------------------------------- |
| `<repository>` | The name or ID of the repository to delete. |

## `vercel vcr login`

Authenticate a container tool (Docker, Podman, or Buildah) with the Vercel Container Registry.

```bash filename="terminal"
vercel vcr login [OPTIONS] <engine>
```

Vercel mints a short-lived, project-scoped OpenID Connect (OIDC) token and passes it to the container tool with the username `oidc`. The credentials are valid for 12 hours. Re-run the command to refresh them.

The container tool must be installed and on your `PATH`. If it isn't, the command fails with an error like `` `docker` is not installed or not on your PATH. Install it and try again. ``

### `vercel vcr login` example

```bash filename="terminal"
# Log in with Docker
vercel vcr login docker

# Log in with Podman
vercel vcr login podman

# Log in with Buildah
vercel vcr login buildah

# Log in for a specific project
vercel vcr login docker --project my-app
```

### `vercel vcr login` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr login` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` |       | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr login` arguments

| Argument   | Description                                             |
| ---------- | ------------------------------------------------------- |
| `<engine>` | The container tool to authenticate: `docker`, `podman`, or `buildah`. |

## `vercel vcr build`

Build a container image tagged for the Vercel Container Registry by running your container tool (Docker, Podman, or Buildah).

```bash filename="terminal"
vercel vcr build [OPTIONS] <engine> [path] [name]
```

The build context defaults to the current directory, the repository to the project name, and the tag to `latest`, so `vercel vcr build docker` tags `vcr.vercel.com/<team-slug>/<project-name>/<project-name>:latest`. For the `[name]` argument, pass only a repository name, optionally with `:tag`. The CLI adds the registry, team, and project segments and rejects a name containing `/`.

`--push` uploads the image after building.

Anything after `--` is forwarded to the container tool unchanged.

### `vercel vcr build` example

```bash filename="terminal"
# Build the current directory into the linked project
vercel vcr build docker

# Build and push in one step
vercel vcr build docker --push

# Build a specific context path with a repository and tag
vercel vcr build docker ./app my-api:1.2.3

# Pass extra flags through to the container tool
vercel vcr build docker . -- --no-cache --build-arg KEY=value
```

### `vercel vcr build` options

| Option                   | Short | Description                                                |
| ------------------------ | ----- | ---------------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).       |
| `--platform <platform>`  |       | Target platform for the build (defaults to `linux/amd64`). |

### `vercel vcr build` flags

| Flag     | Short | Description                    |
| -------- | ----- | ------------------------------ |
| `--push` |       | Push the image after building. |
| `--help` | `-h`  | Display help information.      |

### `vercel vcr build` arguments

| Argument   | Description                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| `<engine>` | The container tool to build with: `docker`, `podman`, or `buildah`.                   |
| `[path]`   | Build context path (defaults to the current directory).                              |
| `[name]`   | Repository name, optionally with `:tag` (defaults to the project name and `latest`). |

## `vercel vcr push`

Push a container image to the Vercel Container Registry by running your container tool (Docker, Podman, or Buildah).

```bash filename="terminal"
vercel vcr push [OPTIONS] <engine> [name]
```

The image must already exist locally, built by [`vercel vcr build`](#vercel-vcr-build) or tagged for VCR yourself. `push` resolves the same defaults as `build`, so pass the same `name[:tag]` you built with. Podman and Buildah push with zstd compression. Docker can't compress on a plain push, so use `vercel vcr build docker --push` with Buildx for zstd.

Anything after `--` is forwarded to the container tool unchanged.

### `vercel vcr push` example

```bash filename="terminal"
# Push the linked project image
vercel vcr push docker

# Push a specific repository and tag
vercel vcr push docker my-api:1.2.3
```

### `vercel vcr push` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr push` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### `vercel vcr push` arguments

| Argument   | Description                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| `<engine>` | The container tool to push with: `docker`, `podman`, or `buildah`.                    |
| `[name]`   | Repository name, optionally with `:tag` (defaults to the project name and `latest`). |

## `vercel vcr tag`

List or inspect a repository's tags.

```bash filename="terminal"
vercel vcr tag <subcommand> [OPTIONS]
```

### `vercel vcr tag` subcommands

- [`ls`](#vercel-vcr-tag-ls): List a repository's tags. (alias: `list`)
- [`inspect`](#vercel-vcr-tag-inspect): Show details for a single tag.

## `vercel vcr tag ls`

List a repository's tags.

```bash filename="terminal"
vercel vcr tag ls [OPTIONS] <repository>
```

### `vercel vcr tag ls` example

```bash filename="terminal"
# List a repository's tags
vercel vcr tag ls my-app

# Sort by tag name in ascending order
vercel vcr tag ls my-app --sort-by tag --sort-order asc

# Return the first five tags
vercel vcr tag ls my-app --limit 5
```

### `vercel vcr tag ls` options

| Option                   | Short | Description                                                    |
| ------------------------ | ----- | ------------------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).          |
| `--sort-by <field>`      | -     | Field to sort tags by. `updatedAt` (default) or `tag`.        |
| `--sort-order <order>`   | -     | Sort direction. `asc` or `desc` (default).                    |
| `--limit <number>`       | `-n`  | Number of results to return per page (max: 100).              |
| `--next <token>`         | -     | Cursor from a previous page to continue listing from.         |

### `vercel vcr tag ls` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` | -     | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr tag ls` arguments

| Argument       | Description                                  |
| -------------- | -------------------------------------------- |
| `<repository>` | The name or ID of the repository to list tags for. |

## `vercel vcr tag inspect`

Show details for a single tag.

```bash filename="terminal"
vercel vcr tag inspect [OPTIONS] <repository> <tag>
```

### `vercel vcr tag inspect` example

```bash filename="terminal"
# Inspect a tag by name
vercel vcr tag inspect my-app latest
```

### `vercel vcr tag inspect` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr tag inspect` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` |       | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr tag inspect` arguments

| Argument       | Description                                  |
| -------------- | -------------------------------------------- |
| `<repository>` | The name or ID of the repository the tag belongs to. |
| `<tag>`        | The tag to inspect.                          |

## `vercel vcr image`

List, inspect, or delete images in a repository.

```bash filename="terminal"
vercel vcr image <subcommand> [OPTIONS]
```

### `vercel vcr image` subcommands

- [`ls`](#vercel-vcr-image-ls): List images in a container registry repository. (alias: `list`)
- [`inspect`](#vercel-vcr-image-inspect): Show details for a single image, including its layer history.
- [`delete`](#vercel-vcr-image-delete): Delete an image from a repository.

## `vercel vcr image ls`

List images in a container registry repository.

```bash filename="terminal"
vercel vcr image ls [OPTIONS] <repository>
```

### `vercel vcr image ls` example

```bash filename="terminal"
# List images in a repository
vercel vcr image ls my-app

# List only untagged images as JSON
vercel vcr image ls my-app --untagged --json
```

### `vercel vcr image ls` options

| Option                   | Short | Description                                                    |
| ------------------------ | ----- | ------------------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).          |
| `--limit <number>`       | `-n`  | Number of results to return per page (max: 100).              |
| `--next <token>`         | -     | Cursor from a previous page to continue listing from.         |

### `vercel vcr image ls` flags

| Flag         | Short | Description                        |
| ------------ | ----- | ---------------------------------- |
| `--untagged` | -     | Only list images that have no tags. |
| `--json`     | -     | Output as JSON.                    |
| `--help`     | `-h`  | Display help information.          |

### `vercel vcr image ls` arguments

| Argument       | Description                                    |
| -------------- | ---------------------------------------------- |
| `<repository>` | The name or ID of the repository to list images for. |

## `vercel vcr image inspect`

Show details for a single image, including its layer history.

```bash filename="terminal"
vercel vcr image inspect [OPTIONS] <repository> <image-id>
```

### `vercel vcr image inspect` example

```bash filename="terminal"
# Inspect an image by ID
vercel vcr image inspect my-app image_XTPv9FRCWob68TkdGMUHC9vCXIAz
```

### `vercel vcr image inspect` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr image inspect` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` |       | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr image inspect` arguments

| Argument       | Description                                    |
| -------------- | ---------------------------------------------- |
| `<repository>` | The name or ID of the repository the image belongs to. |
| `<image-id>`   | The ID of the image to inspect.                |

## `vercel vcr image delete`

Delete an image from a repository.

```bash filename="terminal"
vercel vcr image delete [OPTIONS] <repository> <image-id>
```

> **💡 Note:** This action is permanent and cannot be undone.

### `vercel vcr image delete` example

```bash filename="terminal"
# Delete an image by ID, with a confirmation prompt
vercel vcr image delete my-app image_Ml0PUBaNT8SRrYXDOOEiFedAsAEs

# Delete an image without the confirmation prompt
vercel vcr image delete my-app image_Ml0PUBaNT8SRrYXDOOEiFedAsAEs --yes
```

### `vercel vcr image delete` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr image delete` flags

| Flag     | Short | Description                   |
| -------- | ----- | ----------------------------- |
| `--yes`  | `-y`  | Skip the confirmation prompt. |
| `--json` |       | Output as JSON.               |
| `--help` | `-h`  | Display help information.     |

### `vercel vcr image delete` arguments

| Argument       | Description                                    |
| -------------- | ---------------------------------------------- |
| `<repository>` | The name or ID of the repository the image belongs to. |
| `<image-id>`   | The ID of the image to delete.                 |

## `vercel vcr permissions`

Manage which teams can pull images from a container registry repository. See [Share a repository](/docs/container-registry/public-and-shared-repositories#share-a-repository) for how sharing works.

```bash filename="terminal"
vercel vcr permissions <repository> <subcommand> [OPTIONS]
```

Unlike `vercel vcr tag` and `vercel vcr image`, the repository comes before the subcommand.

### `vercel vcr permissions` subcommands

- [`ls`](#vercel-vcr-permissions-ls): List teams with access to a repository. (alias: `list`)
- [`add`](#vercel-vcr-permissions-add): Give one or more teams access to pull images from a repository.
- [`remove`](#vercel-vcr-permissions-remove): Remove one or more teams' access to a repository.
- [`clear`](#vercel-vcr-permissions-clear): Remove access to a repository for every team.

## `vercel vcr permissions ls`

List the teams a repository is shared with, and when each team was added.

```bash filename="terminal"
vercel vcr permissions <repository> ls [OPTIONS]
```

### `vercel vcr permissions ls` example

```bash filename="terminal"
# List teams with access to a repository
vercel vcr permissions my-repository ls

# List teams with access as JSON
vercel vcr permissions my-repository ls --json
```

### `vercel vcr permissions ls` options

| Option                   | Short | Description                                            |
| ------------------------ | ----- | ------------------------------------------------------ |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).   |
| `--limit <number>`       | `-n`  | Number of results to return per page (max: 100).       |
| `--next <token>`         | -     | Cursor from a previous page to continue listing from.  |

### `vercel vcr permissions ls` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` | -     | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr permissions ls` arguments

| Argument       | Description                                          |
| -------------- | ---------------------------------------------------- |
| `<repository>` | The name or ID of the repository to list access for. |

## `vercel vcr permissions add`

Give one or more teams access to pull images from a repository.

```bash filename="terminal"
vercel vcr permissions <repository> add <team> [OPTIONS]
```

Teams that start with `team_` are treated as team IDs. Anything else is treated as a team slug.

### `vercel vcr permissions add` example

```bash filename="terminal"
# Share a repository with a team by ID
vercel vcr permissions my-repository add team_1a2b3c4d

# Share a repository with a team by slug
vercel vcr permissions my-repository add my-team

# Share a repository with multiple teams
vercel vcr permissions my-repository add team_1a2b3c4d,other-team
```

### `vercel vcr permissions add` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr permissions add` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` |       | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr permissions add` arguments

| Argument       | Description                                                                      |
| -------------- | -------------------------------------------------------------------------------- |
| `<repository>` | The name or ID of the repository to share.                                       |
| `<team>`       | One or more team IDs or slugs to grant access to, comma or space separated.      |

## `vercel vcr permissions remove`

Remove one or more teams' access to a repository.

```bash filename="terminal"
vercel vcr permissions <repository> remove <team> [OPTIONS]
```

### `vercel vcr permissions remove` example

```bash filename="terminal"
# Remove a team's access by ID
vercel vcr permissions my-repository remove team_1a2b3c4d

# Remove multiple teams' access
vercel vcr permissions my-repository remove team_1a2b3c4d,other-team
```

### `vercel vcr permissions remove` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr permissions remove` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--json` |       | Output as JSON.           |
| `--help` | `-h`  | Display help information. |

### `vercel vcr permissions remove` arguments

| Argument       | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| `<repository>` | The name or ID of the repository to remove access from.                        |
| `<team>`       | One or more team IDs or slugs to revoke access from, comma or space separated. |

## `vercel vcr permissions clear`

Remove access to a repository for every team.

```bash filename="terminal"
vercel vcr permissions <repository> clear [OPTIONS]
```

### `vercel vcr permissions clear` example

```bash filename="terminal"
# Clear all repository permissions, with a confirmation prompt
vercel vcr permissions my-repository clear

# Clear all repository permissions without the confirmation prompt
vercel vcr permissions my-repository clear --yes
```

### `vercel vcr permissions clear` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |

### `vercel vcr permissions clear` flags

| Flag     | Short | Description                   |
| -------- | ----- | ----------------------------- |
| `--yes`  | `-y`  | Skip the confirmation prompt. |
| `--json` |       | Output as JSON.               |
| `--help` | `-h`  | Display help information.     |

### `vercel vcr permissions clear` arguments

| Argument       | Description                                        |
| -------------- | -------------------------------------------------- |
| `<repository>` | The name or ID of the repository to clear access for. |

## `vercel vcr update`

Update a container registry repository, such as the repository's visibility. See [Public Repositories](/docs/container-registry/public-and-shared-repositories#public-repositories) for how visibility works.

```bash filename="terminal"
vercel vcr update <repository> [OPTIONS]
```

### `vercel vcr update` example

```bash filename="terminal"
# Make a repository public
vercel vcr update my-repository --public

# Make a repository private without revoking access for shared teams
vercel vcr update my-repository --no-public
```

### `vercel vcr update` options

| Option                   | Short | Description                                                   |
| ------------------------ | ----- | ------------------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).          |

### `vercel vcr update` flags

| Flag          | Short | Description                  |
| ------------- | ----- | ---------------------------- |
| `--public`    |       | Make the repository public.  |
| `--no-public` |       | Make the repository private. |
| `--json`      |       | Output as JSON.              |
| `--help`      | `-h`  | Display help information.    |

### `vercel vcr update` arguments

| Argument       | Description                                 |
| -------------- | ------------------------------------------- |
| `<repository>` | The name or ID of the repository to configure. |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
