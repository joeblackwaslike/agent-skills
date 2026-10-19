---
title: Using the Go Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/go
canonical_url: "https://vercel.com/docs/functions/runtimes/go"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/builds/configure-a-build
  - /docs/project-configuration/vercel-json
  - /docs/services
  - /docs/environment-variables
summary: Learn how to use the Go runtime to run Go APIs on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/go.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "487d070cd2616f9d1c1145b7b4f2ed6d495daf96396fabad6e6b99382bd9bcec"
---

# Using the Go Runtime with Vercel Functions

> **Availability**: The Go runtime (Beta) is available on all plans

Use the Go runtime to deploy a Go HTTP server on Vercel. The Go Framework
Preset works with standard `net/http` servers and frameworks such as `chi` or
`gin`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy Go apps on Vercel using Docker](https://vercel.com/kb/guide/deploy-go-using-docker-vercel) — Deploy an existing Dockerized Go app to Vercel using Memos as a real-world example, with Neon Postgres for durable data.
- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [Deploy a Node.js Fastify app on Vercel with Docker](https://vercel.com/kb/guide/deploy-nodejs-on-vercel-with-docker) — Build a Node.js application with Fastify and Docker, then deploy it to Vercel Functions. Learn how to configure environm
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [Using the Rust Runtime with Vercel functions](https://vercel.com/docs/functions/runtimes/rust) — Build fast, memory-safe serverless functions with Rust on Vercel.
- [Configuring the Runtime for Vercel Functions](https://vercel.com/docs/functions/configuring-functions/runtime) — Learn how to configure the runtime for Vercel Functions.
- [Frameworks on Vercel](https://vercel.com/docs/frameworks) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.

Full cross-link map for this page: [/docs/functions/runtimes/go.graph.md](/docs/functions/runtimes/go.graph.md)
<!-- /docsgraph:related -->

## Deploy a Go API

The Go [Framework Preset](/docs/builds/configure-a-build#framework-preset)
detects a root `go.mod` file and one of these entrypoints: `main.go`,
`cmd/api/main.go`, or `cmd/server/main.go`. Your server must listen on the
`PORT` environment variable.

Running a Go server requires the
[`framework`](/docs/project-configuration/vercel-json#framework) preset to be set to `go`.

```go filename="main.go"
package main

import (
  "fmt"
  "log"
  "net/http"
  "os"
)

func main() {
  mux := http.NewServeMux()
  mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "Hello from Go on Vercel")
  })

  port := os.Getenv("PORT")
  if port == "" {
    port = "3000"
  }

  log.Fatal(http.ListenAndServe(":"+port, mux))
}
```

*A minimal Go server that Vercel can run from \`main.go\`.*

To deploy a Go server alongside a frontend such as a Next.js app within the
same project, use [Services](/docs/services).

## Go version

Vercel reads the Go version from the `go` directive in `go.mod`. If a
`toolchain` directive is also present, Vercel uses that version instead.

`go.mod` must be at the project root.

If `go.mod` does not declare a version, Vercel uses the latest supported Go
version.

The first time Vercel uses a Go version, it downloads and caches that
toolchain. Later deployments using the same version reuse the cached toolchain.

## Go dependencies

Define dependencies in `go.mod`, and commit `go.sum` when it exists.

Vendored dependencies are supported. If your project contains a `vendor`
directory with a `modules.txt` file, Vercel passes `-mod=vendor` to `go build`
automatically.

## Go build configuration

### Custom build flags

Customize flags for the default `go build` step with the `GO_BUILD_FLAGS`
[Environment Variable](/docs/environment-variables).

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "build": {
    "env": {
      "GO_BUILD_FLAGS": "-ldflags '-s -w'"
    }
  }
}
```

*An example \`-ldflags\` flag with \`-s -w\`. This removes debug information
from the output binary and is the default when \`GO\_BUILD\_FLAGS\` is not set.*

### Custom build command

Override the default `go build` step entirely with
[`buildCommand`](/docs/project-configuration/vercel-json#buildcommand) in `vercel.json`.
The command runs with the selected Go toolchain on `PATH`, and `GOOS=linux`
already set.

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "go build -o server ./cmd/api"
}
```

*Build a Go server from \`cmd/api\` and output the binary as \`server\`.*

After the command finishes, Vercel looks for the compiled binary in the
project root and in a `bin/` subdirectory. If the binary can't be found
automatically, write it to the path in the `VERCEL_OUTPUT_FILE` environment
variable:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "make build && cp out/myapp $VERCEL_OUTPUT_FILE"
}
```

## Go serverless functions

You can also place `.go` files inside an `/api` directory. Each file that
exports an `http.HandlerFunc` becomes a separate Vercel Function. The Go runtime
will automatically detect the `go.mod` file at the root of your Project to
install dependencies.

```go filename="/api/index.go"
package handler

import (
  "fmt"
  "net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "<h1>Hello from Go!</h1>")
}
```

The function name can be any exported Go identifier as long as it matches the
[`http.HandlerFunc`](https://pkg.go.dev/net/http#HandlerFunc) signature.

## Private packages

To install private packages with `go get`, add an
[Environment Variable](/docs/environment-variables) named `GIT_CREDENTIALS`.

The value should be the URL to the Git repo including credentials, such as
`https://username:token@github.com`.

All major Git providers are supported, including GitHub, GitLab, Bitbucket,
and self-hosted Git servers.

With GitHub, you need to [create a personal token](https://github.com/settings/tokens)
with permission to access your private repository.


---

[View full sitemap](/docs/sitemap)
