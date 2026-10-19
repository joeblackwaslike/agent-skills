---
title: Daemons
product: vercel
url: /docs/build-output-api/daemons
canonical_url: "https://vercel.com/docs/build-output-api/daemons"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/build-output-api
related:
  - /docs/daemons
  - /docs/build-output-api/configuration
  - /docs/container-registry
  - /docs/daemons/config-reference
summary: Learn how Vercel Daemons are represented in the Build Output API.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/build-output-api/daemons.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4dc453070dfd247f0fb77dec2f709ed29ebb00587981917b726e78fa2ace9126"
---

# Daemons

A deployment can declare [daemons](/docs/daemons), which are long-running containers that don't receive traffic. In the Build Output API, the top-level `config.json` lists the deployment's daemons, and each daemon has a descriptor under `.vercel/output/daemons/<name>` that points to a prebuilt container image. To configure daemons in your project, see [Daemons](/docs/daemons).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Daemons](https://vercel.com/kb/guide/vercel-daemons) — Run background workers with Vercel Daemons. Learn how to deploy container images, configure resources, handle shutdowns,
- [Vercel Daemons is now in public beta](https://vercel.com/changelog/vercel-daemons-is-now-in-public-beta)
- [Managing Daemons](https://vercel.com/docs/daemons/managing-daemons) — Deploy, scale, stop, and monitor Vercel Daemons with vercel.json and the dashboard.
- [How to choose between Functions, containers, and Daemons on Vercel](https://vercel.com/kb/guide/vercel-functions-containers-daemons) — Choose Vercel Functions for HTTP requests, container images for custom runtimes, and Daemons for continuous background w
- [How Docker Compose concepts map to Vercel](https://vercel.com/kb/guide/docker-compose-concepts-on-vercel) — Translate your Docker Compose file to Vercel: Compose services become Vercel Services, networks become bindings, and vol
- [Daemons Limits](https://vercel.com/docs/daemons/limits) — Limits on the configuration, size, and capabilities of Vercel Daemons during the beta.
- [Services](https://vercel.com/docs/build-output-api/services) — Learn how a deployment with multiple services is structured in the Build Output API.
- [Builds](https://vercel.com/docs/builds) — Understand how the build step works when creating a Vercel Deployment.
- [Projects overview](https://vercel.com/docs/projects) — A project is where you deploy and operate frontend apps, APIs, backends, containers, and agent workloads on Vercel.

Full cross-link map for this page: [/docs/build-output-api/daemons.graph.md](/docs/build-output-api/daemons.graph.md)
<!-- /docsgraph:related -->

## Declaring daemons

**Build Output Configuration File**: `.vercel/output/config.json`

<br />

List the deployment's daemons in the top-level `config.json` through a [`daemons`](/docs/build-output-api/configuration#daemons) object. Each key is a daemon name, and each value is an empty object:

```json
{
  "version": 3,
  "daemons": {
    "worker": {},
    "scheduler": {}
  }
}
```

The `daemons` object is the complete set of daemons for the deployment. When the deployment becomes the production deployment, Vercel stops every daemon that an earlier deployment declared and this object doesn't list. A `config.json` with an empty `daemons` object, or with no `daemons` property, declares no daemons, so Vercel stops all of them.

## Daemon descriptor

**Daemon Configuration File**: `.vercel/output/daemons/<name>/.vc-config.json`

<br />

Every daemon listed in `config.json` needs a descriptor at `.vercel/output/daemons/<name>/.vc-config.json`. The descriptor references an image that's already pushed to [Vercel Container Registry](/docs/container-registry). Vercel doesn't build images from the Build Output API.

```ts
type DaemonDescriptor = {
  runtime: 'container';
  image: string;
  command?: string[];
  instances: Record<string, number>;
  resources?: {
    requests: {
      memory: '1Gi' | '2Gi' | '4Gi' | '8Gi';
    };
  };
  terminationGracePeriodSeconds?: number;
};
```

| Key           | Type                     | Required | Description                                                                                                                                       |
| ------------- | ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **runtime**   | `"container"`            | Yes      | The daemon runtime. Must be `"container"`.                                                                                                        |
| **image**     | `string`                 | Yes      | The image reference in Vercel Container Registry, such as `vcr.vercel.com/my-team/my-project/daemon.worker@sha256:<digest>`.                     |
| **command**   | `string[]`               | No       | The command and arguments to run. Defaults to the image's `ENTRYPOINT` and `CMD`.                                                                 |
| **instances** | `Record<string, number>` | Yes      | The number of instances to run in each region, keyed by region ID. Each count is an integer from `0` to `100`.                                    |
| **resources** | `object`                 | No       | The memory for each instance. See [`resources`](/docs/daemons/config-reference#resources).                                                         |
| **terminationGracePeriodSeconds** | `number` | No | The number of seconds Vercel waits after `SIGTERM` before terminating the instance. An integer from `0` to `3600`. Defaults to `10`. See [`terminationGracePeriodSeconds`](/docs/daemons/config-reference#terminationgraceperiodseconds). |

```json filename=".vercel/output/daemons/worker/.vc-config.json"
{
  "runtime": "container",
  "image": "vcr.vercel.com/my-team/my-project/daemon.worker@sha256:3f1b...",
  "command": ["node", "worker.js"],
  "instances": { "iad1": 2 },
  "resources": { "requests": { "memory": "2Gi" } }
}
```

## Directory structure

**Daemons Directory**: `.vercel/output/daemons`

<br />

The `worker` and `scheduler` daemons above produce the following output, next to the rest of the deployment's build output:

- `.vercel/`
  - `output/`
    - `config.json`
    - `daemons/`
      - `worker/`
        - `.vc-config.json`
      - `scheduler/`
        - `.vc-config.json`
    - `static/`
      - `index.html`

<br />

When you use `vercel build`, the CLI builds each daemon's `Dockerfile`, pushes the image to Vercel Container Registry, and writes these files for you.

## Constraints

- Daemon names contain only lowercase letters separated by `_`, `__`, or `-`, and are limited to 64 characters. See [Daemon names](/docs/daemons/config-reference#daemon-names).
- Each daemon listed in `config.json` must have a descriptor. A missing descriptor fails the deployment.
- The `image` must be in Vercel Container Registry.
- Routes can't target a daemon, because daemons don't receive traffic.


---

[View full sitemap](/docs/sitemap)
