---
title: Using WebAssembly (Wasm)
product: vercel
url: /docs/functions/runtimes/wasm
canonical_url: "https://vercel.com/docs/functions/runtimes/wasm"
last_updated: 2025-12-08
type: how-to
prerequisites:
  - /docs/functions/runtimes
  - /docs/functions
related:
  - /docs/functions
  - /docs/routing-middleware
  - /docs/functions/runtimes/edge
  - /docs/functions/runtimes/node-js
  - /docs/functions/runtimes/bun
summary: Learn how to use WebAssembly (Wasm) to enable low-level languages to run on Vercel Functions and Routing Middleware.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/runtimes/wasm.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "7010a4fc59dae113bb363c51b9e21c78da512debc3e355bccc65b473c3cf2e08"
---

# Using WebAssembly (Wasm)

[WebAssembly](https://webassembly.org), or Wasm, is a portable, low-level, assembly-like language that can be used as a compilation target for languages like C, Go, and Rust. Wasm was built to run more efficiently on the web and *alongside* JavaScript, so that it runs in most JavaScript virtual machines.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to stop Vercel Functions from timing out](https://vercel.com/kb/guide/what-can-i-do-about-vercel-serverless-functions-timing-out) — Vercel Functions that time out usually trace back to a few causes. Learn how Fluid Compute fixes most of them and how to
- [Introducing support for WebAssembly at the Edge](https://vercel.com/blog/introducing-support-for-webassembly-at-the-edge)
- [How can I use files in Vercel Functions?](https://vercel.com/kb/guide/how-can-i-use-files-in-serverless-functions) — Learn how to import files inside Serverless Functions on Vercel.
- [Using the Rust Runtime with Vercel functions](https://vercel.com/docs/functions/runtimes/rust) — Build fast, memory-safe serverless functions with Rust on Vercel.
- [Getting started with Vercel Functions](https://vercel.com/docs/functions/quickstart) — Build your first Vercel Function in a few steps.
- [Using the Ruby Runtime with Vercel Functions](https://vercel.com/docs/functions/runtimes/ruby) — Learn how to use the Ruby runtime to compile Ruby Vercel Functions on Vercel.
- [Frameworks on Vercel](https://vercel.com/docs/frameworks) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w
- [Vercel Primitives](https://vercel.com/docs/build-output-api/primitives) — Learn about the Vercel platform primitives and how they work together to create a Vercel Deployment.

Full cross-link map for this page: [/docs/functions/runtimes/wasm.graph.md](/docs/functions/runtimes/wasm.graph.md)
<!-- /docsgraph:related -->

With Vercel, you can use Wasm in [Vercel Functions](/docs/functions) or [Routing Middleware](/docs/routing-middleware) when the runtime is set to [`edge`](/docs/functions/runtimes/edge), [`nodejs`](/docs/functions/runtimes/node-js), or [`bun`](/docs/functions/runtimes/bun#configuring-the-runtime).

Pre-compiled WebAssembly can be imported with the `?module` suffix. This will provide an array of the Wasm data that can be instantiated using `WebAssembly.instantiate()`.

> **💡 Note:** While `WebAssembly.instantiate` is supported in Edge Runtime, it requires the
> Wasm source code to be provided using the import statement. This means you
> cannot use a buffer or byte array to dynamically compile the module at
> runtime.

## Using a Wasm file

You can use Wasm in your production deployment or locally, using [`vercel dev`](/docs/cli/dev).

- ### Get your Wasm file ready
  - Compile your existing C, Go, and Rust project to create a binary `.wasm` file. For this example, we use a [rust](https://github.com/vercel/next.js/blob/canary/examples/with-webassembly/src/add.rs) function that adds one to any number.
  - Copy the compiled file (in our example, [`add.wasm`](https://github.com/vercel/next.js/blob/canary/examples/with-webassembly/add.wasm)) to the root of your Next.js project. If you're using Typescript, add a `ts` definition for the function such as [add.wasm.d.ts](https://github.com/vercel/next.js/blob/canary/examples/with-webassembly/add.wasm.d.ts).

- ### Create an API route for calling the Wasm file
  With `nodejs` runtime that uses [Fluid compute](/docs/fluid-compute) by default:
  ```ts filename="api/wasm/route.ts"
  import path from 'node:path';
  import fs from 'node:fs';
  import type * as addWasmModule from '../../../add.wasm'; // import type definitions at the root of your project

  const wasmBuffer = fs.readFileSync(path.resolve(process.cwd(), './add.wasm')); // path from root
  const wasmPromise = WebAssembly.instantiate(wasmBuffer);

  export async function GET(request: Request) {
    const url = new URL(request.url);
    const num = Number(url.searchParams.get('number') || 10);
    const { add_one: addOne } = (await wasmPromise).instance
      .exports as typeof addWasmModule;

    return new Response(`got: ${addOne(num)}`);
  }
  ```

- ### Call the Wasm endpoint
  - Run the project locally with `vercel dev`
  - Browse to `http://localhost:3000/api/wasm?number=12` which should return `got: 13`


---

[View full sitemap](/docs/sitemap)
