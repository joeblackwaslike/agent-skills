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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "610612b61daab3892eaa885b4d8e989d6288f4df1538ae5cc3031b44c33df565"
---

# Using the Rust Runtime with Vercel functions

> The Rust runtime is available in Beta on all plans

Use Rust to build high-performance, memory-safe serverless functions. The Rust runtime runs on [Fluid compute](/docs/fluid-compute) for optimal performance and lower latency.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Rust runtime now in public beta for Vercel Functions](https://vercel.com/changelog/rust-runtime-now-in-public-beta-for-vercel-functions)
- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [Deploy Rust on Vercel with Docker](https://vercel.com/kb/guide/deploy-rust-on-vercel-with-docker) — Build a Rust application with Axum and Docker, then deploy it to Vercel Functions. Learn how to configure environment va
- [How to ship a Fastify app on Vercel](https://vercel.com/kb/guide/ship-a-fastify-app-on-vercel) — Deploy a Fastify app to Vercel with zero configuration, then add streaming, lifecycle hooks, cron jobs, and observabilit
- [How to ship an Elysia app on Vercel](https://vercel.com/kb/guide/ship-a-elysia-app-on-vercel) — Deploy a Elysia app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and co
- [How to ship a FastAPI app on Vercel](https://vercel.com/kb/guide/ship-a-fastapi-app-on-vercel) — Deploy a FastAPI app to Vercel with zero configuration. Learn how the Python runtime, Vercel Functions, streaming, middl

Full cross-link map for this page: [/docs/functions/runtimes/rust.graph.md](/docs/functions/runtimes/rust.graph.md)
<!-- /docsgraph:related -->

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
