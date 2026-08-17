---
title: Using the Rust Runtime with Vercel functions
product: vercel
url: /docs/functions/runtimes/rust
canonical_url: "https://vercel.com/docs/functions/runtimes/rust"
last_updated: 2025-12-08
type: reference
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/fluid-compute
summary: Build fast, memory-safe serverless functions with Rust on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/rust.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ee9b0c21b892eed3e0c9c0f2f54c5c2b16f2a45a0a0efc4e2318b93896f75107"
---

# Using the Rust Runtime with Vercel functions

> **🔒 Permissions Required**: The Rust runtime


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out?from=related) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker?from=related) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [Migrate a TanStack Start app from Cloudflare to Vercel](https://vercel.com/kb/guide/migrate-a-tanstack-start-app-from-cloudflare-to-vercel?from=related) — Move your TanStack Start app off Cloudflare Workers and onto Vercel Functions, where Fluid compute scales it automatical
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel?from=related) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel?from=related) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl
- [Go](https://vercel.com/docs/functions/runtimes/go?from=related) — Learn how to use the Go runtime to run Go APIs on Vercel.
- [Fastify](https://vercel.com/docs/frameworks/backend/fastify?from=related) — Deploy Fastify applications to Vercel with zero configuration.

Full cross-link map for this page: [/docs/functions/runtimes/rust.graph.md](/docs/functions/runtimes/rust.graph.md)
<!-- /docsgraph:related -->

Use Rust to build high-performance, memory-safe serverless functions. The Rust runtime runs on [Fluid compute](/docs/fluid-compute) for optimal performance and lower latency.

## Getting Started

1. [**Configure your project**](#cargo.toml-configuration) - Add a `Cargo.toml` file with required dependencies
2. [**Create your function**](#creating-api-handlers) - Write handlers in the `api/` directory
3. [**Deploy**](#deployment) - Push to GitHub or use the Vercel CLI

## Project setup

### Cargo.toml configuration

Create a `Cargo.toml` file in your project root:

```toml filename="Cargo.toml"
[package]
name = "rust-hello-world"
version = "0.1.0"
edition = "2024"

[dependencies]
tokio = { version = "1", features = ["full"] } # async runtime
vercel_runtime = { version = "2" } # handles communicating with Vercel's function bridge
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"

# Each handler has to be specified as [[bin]]
# Note that you need to provide unique names for each binary
[[bin]]
name = "hello"
path = "api/hello.rs"

# This section configures settings for the release profile, which optimizes the build for performance.
[profile.release]
codegen-units = 1
lto = "fat"
opt-level = 3
```

### Creating API handlers

Create Rust files in your `api/` directory. Each file becomes a serverless function:

```rust filename="api/hello.rs"
use serde_json::{Value, json};
use vercel_runtime::{Error, Request, run, service_fn};

#[tokio::main]
async fn main() -> Result<(), Error> {
    let service = service_fn(handler);
    run(service).await
}

async fn handler(_req: Request) -> Result<Value, Error> {
    Ok(json!({
        "message": "Hello, world!",
    }))
}
```

For more code examples, please refer to our templates:

- [Rust Hello World](https://vercel.com/templates/template/rust-hello-world)
- [Rust Axum](https://vercel.com/templates/template/rust-axum)

[vercel/examples](https://github.com/vercel/examples/tree/main/rust).

## Deployment

### Git deployment

Push your code to a connected GitHub repository for automatic deployments.

### CLI deployment

Deploy directly using the Vercel CLI:

```bash
vercel deploy
```

### Build optimization

For prebuilt deployments, optimize your `.vercelignore`:

```bash filename=".vercelignore"
# Ignore everything in the target directory except for release binaries
target/**
!target/release
!target/x86_64-unknown-linux-gnu/release/**
!target/aarch64-unknown-linux-gnu/release/**
```

## Feature support


---

[View full sitemap](/docs/sitemap)
