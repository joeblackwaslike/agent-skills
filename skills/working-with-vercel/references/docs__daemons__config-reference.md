---
title: Daemon Configuration Reference
product: vercel
url: /docs/daemons/config-reference
canonical_url: "https://vercel.com/docs/daemons/config-reference"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/daemons
related:
  - /docs/services
  - /docs/regions
  - /docs/daemons/managing-daemons
  - /docs/daemons
summary: Every field you can set on a daemon in the daemons key of vercel.json.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/daemons/config-reference.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ecaf6bd66d4692dc543135f914322ee4cdc4d8a973973097af5e413e8c5dba69"
---

# Daemon Configuration Reference

You declare daemons with the top-level `daemons` key in `vercel.json`. The key is an object that maps each daemon name to its configuration:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons) — Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns,
- [Daemons](https://vercel.com/docs/build-output-api/daemons) — Learn how Vercel Daemons are represented in the Build Output API.
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Daemons Limits](https://vercel.com/docs/daemons/limits) — Limits on the configuration, size, and capabilities of Vercel Daemons during the beta.
- [Service configuration reference](https://vercel.com/docs/services/config-reference) — Options available for service configuration.
- [Project Configuration](https://vercel.com/docs/project-configuration) — Learn how to configure your Vercel projects using vercel.json, vercel.toml, vercel.ts, or the dashboard to control build
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/daemons/config-reference.graph.md](/docs/daemons/config-reference.graph.md)
<!-- /docsgraph:related -->

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "command": ["node", "worker.js"],
      "instances": { "iad1": 2 },
      "resources": { "requests": { "memory": "2Gi" } }
    }
  }
}
```

A daemon configuration object supports the following fields:

| Field                                                             | Type                     | Required |
| ----------------------------------------------------------------- | ------------------------ | -------- |
| [`root`](#root)                                                   | `string`                 | Yes      |
| [`entrypoint`](#entrypoint)                                       | `string`                 | Yes      |
| [`instances`](#instances)                                         | `Record<string, number>` | Yes      |
| [`command`](#command)                                             | `string[]`               | No       |
| [`resources`](#resources)                                         | `object`                 | No       |
| [`terminationGracePeriodSeconds`](#terminationgraceperiodseconds) | `number`                 | No       |

Vercel rejects any other field, including service fields such as `framework`, `runtime`, `buildCommand`, and `bindings`.

## Daemon names

The keys of the `daemons` object are daemon names. A daemon name:

- Contains only lowercase letters, separated by a single `_`, a double `__`, or one or more `-`. For example, `worker`, `email_sender`, and `celery-beat` are valid, and `Worker`, `worker1`, and `_worker` aren't.
- Is 64 characters or fewer.

Vercel pushes each daemon's image to a repository named `daemon.<name>`, with repeated hyphens collapsed into one. Two names that collapse to the same repository, such as `a-b` and `a--b`, fail the build.

Daemon names and [service](/docs/services) names don't conflict. A project can have a service and a daemon with the same name.

## root

**Type:** `string`

Required. The path to the daemon's source directory, relative to `vercel.json`. The path must stay inside the project.

Vercel doesn't publish files under a daemon's `root` as static assets of your deployment. If the project's output directory is the same directory as a daemon's `root`, the build fails. Choose a separate output directory.

## entrypoint

**Type:** `string`

Required. The path to the `Dockerfile` or `Containerfile` to build, relative to `root`. Name the file `Dockerfile` or `Containerfile`. The directory that contains the file is the build context.

Vercel passes your deployment's environment variables to the build as build arguments, and builds the image for the Linux `amd64` architecture.

## instances

**Type:** `Record<string, number>`

Required. The number of instances to run in each region, keyed by [region ID](/docs/regions). Each count is an integer from `0` to `100`.

```json filename="vercel.json"
{
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 2, "cdg1": 1 }
    }
  }
}
```

Vercel runs instances only in the regions listed. Set every count to `0` to stop the daemon without removing it. See [Scaling a daemon](/docs/daemons/managing-daemons#scaling-a-daemon).

## command

**Type:** `string[]`

The command and arguments to run in the container, as an array of strings. `command` replaces the image's `ENTRYPOINT` and `CMD`. When you don't set `command`, Vercel runs the image's `ENTRYPOINT` and `CMD`. The build fails if the image defines neither and `command` isn't set.

```json filename="vercel.json"
{
  "daemons": {
    "celery": {
      "root": "backend/",
      "entrypoint": "Dockerfile",
      "command": ["celery", "-A", "app", "worker", "--loglevel=info"],
      "instances": { "iad1": 1 }
    }
  }
}
```

The array can contain up to 128 items, and each item can be up to 4,096 characters. Vercel doesn't run `command` through a shell. To use shell features such as environment variable expansion, run a shell explicitly, for example `["sh", "-c", "exec node worker.js --id $WORKER_ID"]`.

## resources

**Type:** `object`

The compute resources for each instance. `resources.requests.memory` sets the memory, and Vercel allocates CPU based on the memory you choose:

| `resources.requests.memory` | Memory | vCPUs |
| --------------------------- | ------ | ----- |
| `"1Gi"`                     | 1 GiB  | 1     |
| `"2Gi"` (default)           | 2 GiB  | 1     |
| `"4Gi"`                     | 4 GiB  | 2     |
| `"8Gi"`                     | 8 GiB  | 4     |

```json filename="vercel.json"
{
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "resources": { "requests": { "memory": "4Gi" } }
    }
  }
}
```

When you set `resources`, `requests` and `memory` are required.

## terminationGracePeriodSeconds

**Type:** `number`

The number of seconds Vercel waits after sending `SIGTERM` before it terminates the instance. The value is an integer from `0` to `3600`. The default is `10`.

```json filename="vercel.json"
{
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "terminationGracePeriodSeconds": 50
    }
  }
}
```

Raise the value when your process needs more time to finish work after `SIGTERM`. See [Graceful shutdown](/docs/daemons#graceful-shutdown).


---

[View full sitemap](/docs/sitemap)
