---
title: xmcp on Vercel
product: vercel
url: /docs/frameworks/backend/xmcp
canonical_url: "https://vercel.com/docs/frameworks/backend/xmcp"
last_updated: 2025-11-19
type: how-to
prerequisites:
  - /docs/frameworks/backend
  - /docs/frameworks
related:
  - /docs/cli
  - /docs/cli/init
  - /docs/routing-middleware
  - /docs/functions
  - /docs/fluid-compute
summary: Build MCP-compatible backends with xmcp and deploy to Vercel. Learn the project structure, tool format, middleware, and how to run locally and in...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/backend/xmcp.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6e56e0a0dcd6cf3fd578c77a1a690b130d3ae1357834dcbe4e8f3ce4f2d02df9"
---

# xmcp on Vercel

`xmcp` is a TypeScript-first framework for building MCP-compatible backends. It provides an opinionated project structure, automatic tool discovery, and a streamlined middleware layer for request/response processing. You can deploy an xmcp app to Vercel with zero configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to create a contentful asset on Vercel](https://vercel.com/kb/guide/how-to-create-a-contentful-asset-on-vercel?from=related) — This is my wonderful
- [Build an MCP Server with Weather tools using Express and Vercel](https://vercel.com/kb/guide/mcp-server-with-weather-tool-express?from=related) — Make your Express weather API accessible to AI assistants through the Model Context Protocol.
- [Deploy MCP servers](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel?from=related) — Learn how to deploy Model Context Protocol \(MCP\) servers on Vercel with OAuth authentication and efficient scaling.
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [vercel mcp](https://vercel.com/docs/cli/mcp?from=related) — Set up Model Context Protocol \(MCP\) usage with a Vercel project using the vercel mcp CLI command.
- [Express](https://vercel.com/docs/frameworks/backend/express?from=related) — Deploy Express applications to Vercel with zero configuration. Learn about middleware and Vercel Functions.
- [Sitecore](https://vercel.com/docs/integrations/cms/sitecore?from=related) — Integrate Vercel with Sitecore XM Cloud to deploy your content.

Full cross-link map for this page: [/docs/frameworks/backend/xmcp.graph.md](/docs/frameworks/backend/xmcp.graph.md)
<!-- /docsgraph:related -->

## Get started with xmcp on Vercel

Start with xmcp on Vercel by creating a new xmcp project:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i 
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i 
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i 
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i 
    ```
  </Code>
</CodeBlock>

This scaffolds a project with a `src/tools/` directory for tools, optional `src/middleware.ts`, and an `xmcp.config.ts` file.

To deploy, [connect your Git repository](/new) or [use Vercel CLI](/docs/cli):

```bash filename="terminal"
vc deploy
```

### Get started with Vercel CLI

Get started by initializing a new Xmcp project using [Vercel CLI init command](/docs/cli/init):

```bash filename="terminal"
vc init xmcp
```

This will clone the [Xmcp example repository](https://github.com/vercel/vercel/tree/main/examples/xmcp) in a directory called `xmcp`.

## Local development

To run your xmcp application locally, you can use [Vercel CLI](https://vercel.com/docs/cli/dev):

```bash filename="terminal"
vc dev
```

Alternatively, use your project's dev script:

```bash filename="terminal"
npm run dev
yarn dev
pnpm run dev
```

## Middleware

### xmcp Middleware

In xmcp, an optional `middleware.ts` lets you run code before and after tool execution. This is commonly used for logging, auth, or request shaping:

```ts filename="src/middleware.ts" framework="xmcp"
import { type Middleware } from 'xmcp';

const middleware: Middleware = async (req, res, next) => {
  // Custom processing
  next();
};

export default middleware;
```

### Vercel Routing Middleware

In Vercel, [Routing Middleware](/docs/routing-middleware) executes before a request is processed by your application. Use it for rewrites, redirects, headers, or personalization, and combine it with xmcp's own middleware as needed.

## Vercel Functions

When you deploy an xmcp app to Vercel, your server endpoints automatically run as [Vercel Functions](/docs/functions) and use [Fluid compute](/docs/fluid-compute) by default.

## More resources

- [xmcp documentation](https://xmcp.dev/docs)
- [Using xmcp with Next.js](/kb/guide/using-xmcp-with-nextjs)
- [Backend templates on Vercel](https://vercel.com/templates?type=backend)


---

[View full sitemap](/docs/sitemap)
