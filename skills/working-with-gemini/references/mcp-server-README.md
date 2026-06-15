---
source: "https://raw.githubusercontent.com/google-gemini/gemini-cli/main/packages/cli/src/commands/extensions/examples/mcp-server/README.md"
fetched_at: "2026-06-15T05:55:14.234Z"
sha256: "25cc1a65ba305b04bfa9df29249cff8de4a4cabf78a70fbd77b54eadd105b022"
---

# MCP Server Example

This is a basic example of an MCP (Model Context Protocol) server used as a
Gemini CLI extension. It demonstrates how to expose tools and prompts to the
Gemini CLI.

## Description

The contents of this directory are a valid MCP server implementation using the
`@modelcontextprotocol/sdk`. It exposes:

- A tool `fetch_posts` that mock-fetches posts.
- A prompt `poem-writer`.

## Structure

- `example.js`: The main server entry point.
- `gemini-extension.json`: The configuration file that tells Gemini CLI how to
  use this extension.
- `package.json`: Helper for dependencies.

## How to Use

1.  Navigate to this directory:

    ```bash
    cd packages/cli/src/commands/extensions/examples/mcp-server
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

This example is typically used by `gemini extensions new`.
