---
title: CLI Reference
product: vercel
url: /docs/container-registry/cli-reference
canonical_url: "https://vercel.com/docs/container-registry/cli-reference"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/container-registry
related:
  - /docs/container-registry
  - /docs/cli
  - /docs/cli/link
summary: Learn about cli reference on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/container-registry/cli-reference.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "45e18120d037a02f66321eba6d33f96bb6f831fe0fd6bc7224a05fccca014080"
---

# Container Registry CLI Reference

The `vercel vcr` command group lets you manage [Vercel Container Registry](/docs/container-registry) (VCR) repositories, tags, and images from your terminal. Use it to list, inspect, create, and delete repositories, browse a repository's tags, and manage the images stored in each repository.

`vercel vcr` is part of the [Vercel CLI](/docs/cli). To push and pull images, use Docker-compatible tooling as described in the [Container Registry documentation](/docs/container-registry#push-an-image).

Each command operates on a single Vercel project. By default, the CLI uses the [linked project](/docs/cli/link). Pass `--project` to target a different project.

## Installation

Install the Vercel CLI globally to use the `vercel vcr` commands:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i vercel
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i vercel
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i vercel
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i vercel
    ```
  </Code>
</CodeBlock>

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
- [`inspect`](#vercel-vcr-inspect): Show details for a single repository. (alias: `get`)
- [`add`](#vercel-vcr-add): Create a container registry repository. (alias: `create`)
- [`rm`](#vercel-vcr-rm): Delete a container registry repository. (aliases: `remove`, `delete`)
- [`login`](#vercel-vcr-login): Authenticate a container tool with the Vercel Container Registry.
- [`tag`](#vercel-vcr-tag): List or inspect a repository's tags. (alias: `tags`)
- [`image`](#vercel-vcr-image): List, inspect, or delete images in a repository. (alias: `images`)

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
vercel vcr ls --project my-app --format json

# Page through results using the cursor reported by the previous page
vercel vcr ls --cursor <token>
```

### `vercel vcr ls` options

| Option                   | Short | Description                                                    |
| ------------------------ | ----- | ------------------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).          |
| `--limit <number>`       | -     | Number of results to return per page (default: 20, max: 100). |
| `--cursor <token>`       | `-c`  | Cursor from a previous page to continue listing from.         |
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                                |

### `vercel vcr ls` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
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
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                       |

### `vercel vcr inspect` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### `vercel vcr inspect` arguments

| Argument       | Description                                     |
| -------------- | ----------------------------------------------- |
| `<repository>` | The name or ID of the repository to inspect.    |

## `vercel vcr add`

Create a container registry repository.

```bash filename="terminal"
vercel vcr add [OPTIONS] <name>
```

### `vercel vcr add` example

```bash filename="terminal"
# Create a repository
vercel vcr add my-repository
```

> **💡 Note:** Repository names can include lowercase letters, numbers, periods,
> underscores, and dashes. The name can't start or end with a period,
> underscore, or dash.

### `vercel vcr add` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                       |

### `vercel vcr add` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### `vercel vcr add` arguments

| Argument | Description                        |
| -------- | ---------------------------------- |
| `<name>` | The name of the repository to create. |

## `vercel vcr rm`

Delete a container registry repository and all of its images.

```bash filename="terminal"
vercel vcr rm [OPTIONS] <repository>
```

> **💡 Note:** This action is permanent and cannot be undone.

### `vercel vcr rm` example

```bash filename="terminal"
# Delete a repository, with a confirmation prompt
vercel vcr rm my-repository

# Delete a repository without the confirmation prompt
vercel vcr rm my-repository --yes
```

### `vercel vcr rm` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                       |

### `vercel vcr rm` flags

| Flag     | Short | Description                          |
| -------- | ----- | ------------------------------------ |
| `--yes`  | `-y`  | Skip the confirmation prompt.        |
| `--help` | `-h`  | Display help information.            |

### `vercel vcr rm` arguments

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
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                       |

### `vercel vcr login` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### `vercel vcr login` arguments

| Argument   | Description                                             |
| ---------- | ------------------------------------------------------- |
| `<engine>` | The container tool to authenticate: `docker`, `podman`, or `buildah`. |

## `vercel vcr tag`

List or inspect a repository's tags.

```bash filename="terminal"
vercel vcr tag <subcommand> [OPTIONS]
```

### `vercel vcr tag` subcommands

- [`ls`](#vercel-vcr-tag-ls): List a repository's tags. (alias: `list`)
- [`inspect`](#vercel-vcr-tag-inspect): Show details for a single tag. (alias: `get`)

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
| `--limit <number>`       | -     | Number of results to return per page (default: 20, max: 100). |
| `--cursor <token>`       | `-c`  | Cursor from a previous page to continue listing from.         |
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                                |

### `vercel vcr tag ls` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
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
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                       |

### `vercel vcr tag inspect` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
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
- [`inspect`](#vercel-vcr-image-inspect): Show details for a single image, including its layer history. (alias: `get`)
- [`rm`](#vercel-vcr-image-rm): Delete an image from a repository. (aliases: `remove`, `delete`)

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
vercel vcr image ls my-app --untagged --format json
```

### `vercel vcr image ls` options

| Option                   | Short | Description                                                    |
| ------------------------ | ----- | ------------------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project).          |
| `--limit <number>`       | -     | Number of results to return per page (default: 20, max: 100). |
| `--cursor <token>`       | `-c`  | Cursor from a previous page to continue listing from.         |
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                                |

### `vercel vcr image ls` flags

| Flag         | Short | Description                        |
| ------------ | ----- | ---------------------------------- |
| `--untagged` | -     | Only list images that have no tags. |
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
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                       |

### `vercel vcr image inspect` flags

| Flag     | Short | Description               |
| -------- | ----- | ------------------------- |
| `--help` | `-h`  | Display help information. |

### `vercel vcr image inspect` arguments

| Argument       | Description                                    |
| -------------- | ---------------------------------------------- |
| `<repository>` | The name or ID of the repository the image belongs to. |
| `<image-id>`   | The ID of the image to inspect.                |

## `vercel vcr image rm`

Delete an image from a repository.

```bash filename="terminal"
vercel vcr image rm [OPTIONS] <repository> <image-id>
```

> **💡 Note:** This action is permanent and cannot be undone.

### `vercel vcr image rm` example

```bash filename="terminal"
# Delete an image by ID, with a confirmation prompt
vercel vcr image rm my-app image_Ml0PUBaNT8SRrYXDOOEiFedAsAEs

# Delete an image without the confirmation prompt
vercel vcr image rm my-app image_Ml0PUBaNT8SRrYXDOOEiFedAsAEs --yes
```

### `vercel vcr image rm` options

| Option                   | Short | Description                                          |
| ------------------------ | ----- | ---------------------------------------------------- |
| `--project <name-or-id>` | `-p`  | Project name or ID (defaults to the linked project). |
| `--format <format>`      | `-F`  | Output format. Accepts `json`.                       |

### `vercel vcr image rm` flags

| Flag     | Short | Description                   |
| -------- | ----- | ----------------------------- |
| `--yes`  | `-y`  | Skip the confirmation prompt. |
| `--help` | `-h`  | Display help information.     |

### `vercel vcr image rm` arguments

| Argument       | Description                                    |
| -------------- | ---------------------------------------------- |
| `<repository>` | The name or ID of the repository the image belongs to. |
| `<image-id>`   | The ID of the image to delete.                 |


---

[View full sitemap](/docs/sitemap)
