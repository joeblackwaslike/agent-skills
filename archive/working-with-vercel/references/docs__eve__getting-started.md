---
title: Getting started with eve
product: vercel
url: /docs/eve/getting-started
canonical_url: "https://vercel.com/docs/eve/getting-started"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/eve
related:
  - /docs/ai-gateway
  - /docs/eve/deploying
  - /docs/eve/concepts
  - /docs/eve
  - /docs/eve/authentication
summary: Create an eve agent, connect a model, and send your first message from the terminal.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/getting-started.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "dde62945040b320cad22c08d92e5e01248b5ffa7856ba75ee68c1164adf4125e"
---

# Getting started with eve

Create an eve agent and have your first conversation locally. You can change the agent's instructions as it runs, then deploy it to Vercel when you're ready to share it.

## Prerequisites

- Node.js 24 or later and npm
- A Vercel account with AI Gateway access, or credentials for another supported model provider

You don't need a Vercel project to run an agent locally. This walkthrough uses your Vercel account for model access through [AI Gateway](/docs/ai-gateway).

## Create and run an agent

- ### Initialize the project
  Run the eve command-line interface (CLI) to create a project:
  ```bash filename="Terminal"
  npx eve@latest init my-agent
  ```
  The CLI creates the project, installs dependencies, initializes Git, and opens an interactive terminal UI. Your agent's files live in the `agent/` directory.

  To add eve to an existing project instead, run the following from the directory containing its `package.json`, before creating any `agent/` files:
  ```bash filename="Terminal"
  npx eve@latest init .
  ```
  eve adds missing runtime dependencies and preserves files the project already owns. Follow the generated README for the project's development commands.

- ### Connect a model
  If eve finds an existing model connection, it reuses it. Otherwise, the terminal UI opens `/login`.

  Choose your Vercel account, finish signing in through the browser, and select a team. eve checks that team's AI Gateway access before returning to the conversation. You can also connect a ChatGPT subscription or an AI Gateway, OpenAI, or Anthropic API key through `/login`.

  A local model connection is separate from the credentials used by a deployed agent. On Vercel, model strings use [AI Gateway with OIDC](/docs/eve/deploying#configure-credentials-and-access).

- ### Send your first message
  Enter a message in the terminal UI, such as:
  ```text
  Explain what you can help me with in two sentences.
  ```
  The agent should return a response in the same conversation. If model access fails, open `/login` to check the account, team, or API key used by the connection.

  To return to a scaffolded project's terminal UI later, run:
  ```bash filename="Terminal"
  cd my-agent
  npm run dev
  ```

- ### Customize the agent's instructions
  Edit `agent/instructions.md` to describe how the agent should respond:
  ```md filename="agent/instructions.md"
  You help developers plan small software projects.
  Ask for missing requirements before suggesting an implementation.
  Keep answers concise and include a concrete next step.
  ```
  eve reloads changes during local development. Send another message, such as `Help me plan a personal reading list app`, and check that the response follows your instructions.

  Use `agent/agent.ts` to configure the model and other runtime options. See [Runtime config](/docs/eve/concepts#runtime-config) for an example, and [Add a tool](/docs/eve#add-a-tool) to give the agent an action it can call.

## Next steps

- [Deploy the agent to Vercel](/docs/eve/deploying).
- [Configure authentication](/docs/eve/authentication) before accepting production browser requests.
- [Connect channels and external services](/docs/connect/frameworks/eve).
- [Use eve with Chat SDK](/docs/chat-sdk/eve) to handle messages through Chat SDK adapters.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
