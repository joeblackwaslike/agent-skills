---
title: Using the Go Runtime with Vercel Functions
product: vercel
url: /docs/functions/runtimes/go
canonical_url: "https://vercel.com/docs/functions/runtimes/go"
last_updated: 2026-06-08
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/deployments/configure-a-build
  - /docs/project-configuration
  - /docs/services
  - /docs/environment-variables
summary: Learn how to use the Go runtime to run Go APIs on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/go.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "fcab84744c8b7c98c4c08a490f245711b87d9e3548d3a03c8368ca0328202b05"
---

# Using the Go Runtime with Vercel Functions

> **🔒 Permissions Required**: The Go runtime

Use the Go runtime to deploy a Go HTTP server on Vercel. The Go Framework
Preset works with standard `net/http` servers and frameworks such as `chi` or
`gin`.

## Deploy a Go API

The Go [Framework Preset](/docs/deployments/configure-a-build#framework-preset)
detects a root `go.mod` file and one of these entrypoints: `main.go`,
`cmd/api/main.go`, or `cmd/server/main.go`. Your server must listen on the
`PORT` environment variable.

Running a Go server requires the
[`framework`](/docs/project-configuration#framework) preset to be set to `go`.

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
[`buildCommand`](/docs/project-configuration#buildcommand) in `vercel.json`.
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
