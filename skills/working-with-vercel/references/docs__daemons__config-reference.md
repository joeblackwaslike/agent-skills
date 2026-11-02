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
  - /docs/services/bindings
summary: Every field you can set on a daemon in the daemons key of vercel.json.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/daemons/config-reference.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "f94e97cc6e643f2cd58c05f16c04d07c6adbb3f0b58ff887ae6445e5b8c99cd8"
---

# Daemon Configuration Reference

You declare daemons with the top-level `daemons` key in `vercel.json`. The key is an object that maps each daemon name to its configuration:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Migrate from Google Cloud Run to Vercel](https://vercel.com/kb/guide/migrate-cloud-run-to-vercel) — Move a Cloud Run service or worker to Vercel. Compare runtimes, preserve Google Cloud access, and plan jobs, validation,
- [Migrate Fly.io worker processes to Vercel Daemons](https://vercel.com/kb/guide/migrate-fly-io-workers-to-vercel-daemons) — Migrate Fly.io workers to Vercel Daemons with your existing Dockerfile. Map process settings, preserve queue state, and
- [Migrate Railway workers to Vercel Daemons](https://vercel.com/kb/guide/migrate-railway-workers-to-vercel-daemons) — Move Railway workers to Vercel Daemons with Docker configuration, broker migration, shutdown testing, a gradual queue ha
- [Migrate from Render to Vercel](https://vercel.com/kb/guide/migrate-render-to-vercel) — Migrate from Render to Vercel: map web services, cron jobs, and containers to their equivalents, and handle what doesn't
- [Migrate Render background workers to Vercel Daemons](https://vercel.com/kb/guide/migrate-render-workers-to-vercel-daemons) — Migrate Render workers to Vercel Daemons. Translate render.yaml, package Celery in Docker, prepare the broker, and verif
- [Vercel Daemons can now call services with bindings](https://vercel.com/changelog/vercel-daemons-can-now-call-services-with-bindings)
- [Daemons](https://vercel.com/docs/build-output-api/daemons) — Learn how Vercel Daemons are represented in the Build Output API.
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Add liveness checks to your Daemons](https://vercel.com/changelog/add-liveness-checks-to-your-daemons)
- [Service configuration reference](https://vercel.com/docs/services/config-reference) — Options available for service configuration.
- [Get project daemons](https://vercel.com/docs/rest-api/daemons/get-project-daemons) — GET /v1/projects/{idOrName}/daemons — List the daemons of a project.
- [Services](https://vercel.com/docs/build-output-api/services) — Learn how a deployment with multiple services is structured in the Build Output API.

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
| [`livenessProbe`](#livenessprobe)                                 | `LivenessProbe`          | No       |
| [`terminationGracePeriodSeconds`](#terminationgraceperiodseconds) | `number`                 | No       |
| [`bindings`](#bindings)                                           | `ServiceBinding[]`       | No       |

Vercel rejects any other field, including service fields such as `framework`, `runtime`, and `buildCommand`.

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

Required. The path to the `Dockerfile` or `Containerfile` to build, relative to `root`. Name the file `Dockerfile` or `Containerfile`, optionally with a suffix, such as `Dockerfile.worker`. The name is case-insensitive. The directory that contains the file is the build context.

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

## livenessProbe

**Type:** `LivenessProbe`

An HTTP `GET` health check that Vercel requests periodically to check that the instance is still healthy. A response with an HTTP status from `200` to `399` counts as a success. Read more in [Health checks and restarts](/docs/daemons#health-checks-and-restarts).

A changed `livenessProbe` applies to instances started after it deploys; already-running instances keep the probe they started with.

A `LivenessProbe` object has the following fields:

| Field                 | Type              | Default | Description                                                                                                                                                     |
| --------------------- | ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `httpGet`             | `LivenessHttpGet` | None    | Required. The HTTP request Vercel sends.                                                                                                                        |
| `initialDelaySeconds` | `number`          | `0`     | Seconds to wait after the container starts before the first probe. An integer from `0` to `86400`.                                                              |
| `periodSeconds`       | `number`          | `10`    | Seconds between probes, measured start to start. An integer from `1` to `86400`.                                                                                |
| `timeoutSeconds`      | `number`          | `1`     | Seconds to wait for a response before the probe counts as a failure. An integer from `1` to `86400`.                                                            |
| `failureThreshold`    | `number`          | `3`     | Consecutive failures before Vercel restarts the container. An integer from `1` to `10`.                                                                         |
| `successThreshold`    | `number`          | `1`     | Accepted by the schema, but the current controller behaves as if the value is 1, so one successful check resets the failure count. An integer from `1` to `10`. |

A `LivenessHttpGet` object has the following fields:

| Field         | Type                   | Default   | Description                                                                                                                                             |
| ------------- | ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `port`        | `number`               | None      | Required. The port Vercel connects to. An integer from `1` to `65535`. The process must listen on this port inside the container.                       |
| `path`        | `string`               | `"/"`     | The request path. Must start with `/`.                                                                                                                  |
| `host`        | `string`               | localhost | The host to connect to. The probe runs from inside the instance, so it defaults to localhost.                                                           |
| `scheme`      | `"HTTP"` \| `"HTTPS"`  | `"HTTP"`  | The scheme Vercel uses for the request.                                                                                                                 |
| `httpHeaders` | `LivenessHttpHeader[]` | None      | Headers to add to the request. Each `LivenessHttpHeader` is an object with string `name` and `value` fields. A `Host` header sets the request's `Host`. |

```json filename="vercel.json"
{
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "livenessProbe": {
        "httpGet": { "port": 1234, "path": "/health" },
        "initialDelaySeconds": 5
      }
    }
  }
}
```

## terminationGracePeriodSeconds

**Type:** `number`

The number of seconds Vercel waits after sending `SIGTERM` before it terminates the instance. The value is an integer from `0` to `3600`. The default is `30`. A changed value applies to instances started after it deploys; already-running instances keep the grace period they started with.

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

## bindings

**Type:** [`ServiceBinding[]`](/docs/services/bindings#binding-fields)

[Service bindings](/docs/services/bindings) that let the daemon call [services](/docs/services) in the same deployment. Each binding has the same fields as a service binding: `type` is `"service"`, `service` names a service in `services`, `format` is `"url"`, and `env` is the environment variable that receives the service's URL.

```json filename="vercel.json"
{
  "services": {
    "api": { "root": "api/", "entrypoint": "main:app" }
  },
  "daemons": {
    "worker": {
      "root": "worker/",
      "entrypoint": "Dockerfile",
      "instances": { "iad1": 1 },
      "bindings": [
        { "type": "service", "service": "api", "format": "url", "env": "API_URL" }
      ]
    }
  }
}
```

A binding can only target a service. Daemons don't receive traffic, so services can't bind to daemons, and a daemon can't bind to another daemon. Each binding in a daemon must use a different `env`.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
