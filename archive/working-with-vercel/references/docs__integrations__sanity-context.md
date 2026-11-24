---
title: Build Agents with Sanity Context
product: vercel
url: /docs/integrations/sanity-context
canonical_url: "https://vercel.com/docs/integrations/sanity-context"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/integrations
related:
  - /docs/frameworks/agents/eve
  - /docs/ai-sdk
  - /docs/integrations/cms/sanity
  - /docs/connect
  - /docs/environment-variables
summary: Connect an eve agent or an AI SDK application to Sanity Context, a read-only MCP server for content in Sanity datasets, websites, and files.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/sanity-context.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6b25f7675910d68b43dc391444ea18d17d47ab46c7a86836ff852361a848f9df"
---

# Build Agents with Sanity Context

[Sanity Context](https://www.sanity.io/docs/context/introduction) is a hosted, read-only MCP server that gives AI agents access to your content. That content can live in a Sanity dataset, on a website you don't manage in Sanity, or in files. You create an MCP endpoint in the Context app in the Sanity Dashboard, then connect an [eve](/docs/frameworks/agents/eve) agent or an [AI SDK](/docs/ai-sdk) application to it. The agent can read your content but can't change it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Draft documentation fixes from reader feedback with Sanity and eve](https://vercel.com/kb/guide/sanity-eve-agent) — Build an autonomous agent that drafts fixes in Sanity, stages them for human review, and calls the model through AI Gate
- [Add Python code execution to a TypeScript AI agent with Vercel Sandbox](https://vercel.com/kb/guide/python-ai-sdk-vercel-sandbox) — Add an \\`executeCode\\` tool to your TypeScript AI SDK agent with the \\`ai-sdk-tool-code-execution\\` package to run Pytho
- [Pass state to AI SDK tools and agents with context](https://vercel.com/kb/guide/ai-sdk-runtime-and-tool-context) — Use runtimeContext, toolsContext, and contextSchema in the AI SDK to pass tenant data, credentials, and other server-sid
- [Safely running AI generated code in your Next.js application](https://vercel.com/kb/guide/running-ai-generated-code-sandbox) — How to execute untrusted, AI‑generated code from a Next.js app using Vercel Sandbox, an isolated, ephemeral environment.
- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [eve with MCP](https://vercel.com/docs/mcp/integrations/eve) — Give eve agents access to MCP tools through filesystem connections and authorize requests with Vercel Connect.
- [Agent Resources](https://vercel.com/docs/agent-resources) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.

Full cross-link map for this page: [/docs/integrations/sanity-context.graph.md](/docs/integrations/sanity-context.graph.md)
<!-- /docsgraph:related -->

The sources you attach to an endpoint determine which tools it serves:

| Endpoint source                                                       | What the agent reads                                                              | Tools                                                 |
| --------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| A dataset                                                             | Live documents in a Sanity dataset, queried with GROQ                             | `groq_query`, `schema_explorer`, `array_field_reader` |
| [Knowledge Bases](https://www.sanity.io/docs/context/knowledge-bases) | An index that Sanity builds ahead of time from your datasets, websites, and files | `knowledge_base_search`, `knowledge_base_read`        |

An endpoint can have one dataset source and several Knowledge Base sources. With both source types, it serves both sets of tools.

Every endpoint also serves `initial_context`, which returns the dataset's schema overview, the outline of each Knowledge Base, or both, plus any instructions you set on the endpoint. The examples below fetch it once per conversation and add it to the agent's instructions, so the agent knows what content exists before its first lookup. See [Context MCP source types](https://www.sanity.io/docs/context/source-types) to choose a source type.

Sanity Context and the [eve Sanity Copilot](/docs/integrations/cms/sanity#manage-sanity-content-from-slack) connect to different Sanity servers:

| You want the agent to                                         | Use                                                                                         | Authentication                                                           |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Answer questions from your content, such as in a support chat | Sanity Context                                                                              | Organization API token with Context Viewer permissions                   |
| Query and edit content, deploy schemas, and manage releases   | [Sanity MCP server](https://www.sanity.io/docs/ai/mcp-server), as in the eve Sanity Copilot | [Vercel Connect](/docs/connect), with each user's own Sanity permissions |

## Set up a Sanity Context endpoint

A dataset source needs Sanity Studio 5.1.0 or later deployed for that project and dataset. An endpoint with only Knowledge Base sources doesn't need a Studio or a dataset.

1. In the Context app in the Sanity Dashboard, create an MCP endpoint, attach a dataset, Knowledge Bases, or both, and copy its MCP URL. See [Configure a Context MCP endpoint](https://www.sanity.io/docs/context/configure-mcp) for the steps, or create the endpoint from a terminal with the [`sanity context` CLI commands](https://www.sanity.io/docs/cli-reference/cli-context).
2. In [Manage](https://www.sanity.io/manage/org/api/tokens), create an API token at the organization level and give it **Context** with the **Viewer** role. Sanity Context refuses project tokens, whatever their permissions.
3. Add both values to your project's [environment variables](/docs/environment-variables) and to a local `.env.local` file:

```bash filename=".env.local"
SANITY_CONTEXT_MCP_URL=your_mcp_endpoint_url
SANITY_ORGANIZATION_TOKEN=your_organization_token
```

The organization token carries organization-level permissions. Use it only in server-side code, and never expose it to the browser.

## Connect an eve agent

Create an eve project with `pnpm dlx eve@latest init my-agent`, or use an existing one. See [eve on Vercel](/docs/frameworks/agents/eve) to create, link, and deploy an agent.

Add Sanity Context as an MCP connection. The connection blocks the `initial_context` tool because the agent's instructions already include its content:

**agent/connections/sanity.ts**

```typescript filename="agent/connections/sanity.ts"
import { defineMcpClientConnection } from 'eve/connections';

export default defineMcpClientConnection({
  url: process.env.SANITY_CONTEXT_MCP_URL!,
  // The model reads this to decide when to use the connection. Describe your own content.
  description:
    'Company content in Sanity: products, policies, and help articles. Look things up here before answering.',
  auth: {
    getToken: async () => ({ token: process.env.SANITY_ORGANIZATION_TOKEN! }),
  },
  tools: { block: ['initial_context'] },
});
```

**agent/connections/sanity.js**

```javascript filename="agent/connections/sanity.js"
import { defineMcpClientConnection } from 'eve/connections';

export default defineMcpClientConnection({
  url: process.env.SANITY_CONTEXT_MCP_URL,
  // The model reads this to decide when to use the connection. Describe your own content.
  description:
    'Company content in Sanity: products, policies, and help articles. Look things up here before answering.',
  auth: {
    getToken: async () => ({ token: process.env.SANITY_ORGANIZATION_TOKEN }),
  },
  tools: { block: ['initial_context'] },
});
```

Replace `agent/instructions.md` with dynamic instructions that fetch the initial context. eve resolves dynamic instructions before each model call, and `ctx.memo` keyed on the session ID fetches the initial context once per conversation. Delete `agent/instructions.md`, because eve fails the build when both instruction files exist:

**agent/instructions.ts**

```typescript filename="agent/instructions.ts"
import { defineDynamic, defineInstructions } from 'eve/instructions';

async function fetchInitialContext(): Promise<string> {
  // Append to the path so any query parameters on the endpoint URL survive
  const url = new URL(process.env.SANITY_CONTEXT_MCP_URL!);
  url.pathname = `${url.pathname.replace(/\/$/, '')}/initial-context`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_ORGANIZATION_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Sanity Context returned ${response.status}: ${await response.text()}`,
    );
  }
  return response.text();
}

export default defineDynamic(async (ctx) => {
  const initialContext = await ctx.memo(ctx.session.id, fetchInitialContext);

  return defineInstructions({
    content: [
      'Answer questions using the Sanity Context tools.',
      "Look up content before you answer, and don't make up facts.",
      '',
      '# Data reference',
      '',
      initialContext,
    ].join('\n'),
  });
});
```

**agent/instructions.js**

```javascript filename="agent/instructions.js"
import { defineDynamic, defineInstructions } from 'eve/instructions';

async function fetchInitialContext() {
  // Append to the path so any query parameters on the endpoint URL survive
  const url = new URL(process.env.SANITY_CONTEXT_MCP_URL);
  url.pathname = `${url.pathname.replace(/\/$/, '')}/initial-context`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.SANITY_ORGANIZATION_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Sanity Context returned ${response.status}: ${await response.text()}`,
    );
  }
  return response.text();
}

export default defineDynamic(async (ctx) => {
  const initialContext = await ctx.memo(ctx.session.id, fetchInitialContext);

  return defineInstructions({
    content: [
      'Answer questions using the Sanity Context tools.',
      "Look up content before you answer, and don't make up facts.",
      '',
      '# Data reference',
      '',
      initialContext,
    ].join('\n'),
  });
});
```

If Sanity Context rejects the token, the fetch throws and the turn fails instead of answering without your content.

To have the agent answer only from Sanity, turn off eve's default shell, file, and web tools in `agent/agent.ts`:

**agent/agent.ts**

```typescript filename="agent/agent.ts"
import { defineAgent } from 'eve';

export default defineAgent({
  model: 'anthropic/claude-sonnet-5',
  defaultTools: false,
});
```

**agent/agent.js**

```javascript filename="agent/agent.js"
import { defineAgent } from 'eve';

export default defineAgent({
  model: 'anthropic/claude-sonnet-5',
  defaultTools: false,
});
```

Run `pnpm dev` and ask a question your content covers. The model string routes requests through [AI Gateway](/docs/ai-gateway), so a deployed agent authenticates with the project's OIDC token and doesn't need a model provider key.

## Connect an AI SDK agent

Install the AI SDK and its MCP client:

```bash package-manager
npm i ai @ai-sdk/mcp
```

The following script fetches the initial context, connects to the endpoint with `createMCPClient`, and passes the endpoint's tools to `generateText`. Set `"type": "module"` in `package.json` so the script can use top-level `await`:

**agent.ts**

```typescript filename="agent.ts"
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText, isStepCount } from 'ai';

const mcpUrl = process.env.SANITY_CONTEXT_MCP_URL!;
const headers = {
  Authorization: `Bearer ${process.env.SANITY_ORGANIZATION_TOKEN}`,
};

// 1. Fetch the initial context: the schema overview, the Knowledge Base outline, or both
const initialContextUrl = new URL(mcpUrl);
initialContextUrl.pathname = `${initialContextUrl.pathname.replace(/\/$/, '')}/initial-context`;

const response = await fetch(initialContextUrl, { headers });
if (!response.ok) {
  throw new Error(
    `Sanity Context returned ${response.status}: ${await response.text()}`,
  );
}
const initialContext = await response.text();

// 2. Connect to the MCP endpoint
const mcpClient = await createMCPClient({
  transport: { type: 'http', url: mcpUrl, headers },
});

try {
  // The instructions already include the initial context, so drop that tool
  const { initial_context: _, ...tools } = await mcpClient.tools();

  // 3. Let the model call tools for up to 10 steps, then answer
  const { text } = await generateText({
    model: 'anthropic/claude-sonnet-5',
    instructions: [
      'Answer questions using the Sanity Context tools.',
      "Look up content before you answer, and don't make up facts.",
      '',
      '# Data reference',
      '',
      initialContext,
    ].join('\n'),
    tools,
    stopWhen: isStepCount(10),
    prompt: process.argv[2] ?? 'What content do you have access to?',
  });

  console.log(text);
} finally {
  await mcpClient.close();
}
```

**agent.js**

```javascript filename="agent.js"
import { createMCPClient } from '@ai-sdk/mcp';
import { generateText, isStepCount } from 'ai';

const mcpUrl = process.env.SANITY_CONTEXT_MCP_URL;
const headers = {
  Authorization: `Bearer ${process.env.SANITY_ORGANIZATION_TOKEN}`,
};

// 1. Fetch the initial context: the schema overview, the Knowledge Base outline, or both
const initialContextUrl = new URL(mcpUrl);
initialContextUrl.pathname = `${initialContextUrl.pathname.replace(/\/$/, '')}/initial-context`;

const response = await fetch(initialContextUrl, { headers });
if (!response.ok) {
  throw new Error(
    `Sanity Context returned ${response.status}: ${await response.text()}`,
  );
}
const initialContext = await response.text();

// 2. Connect to the MCP endpoint
const mcpClient = await createMCPClient({
  transport: { type: 'http', url: mcpUrl, headers },
});

try {
  // The instructions already include the initial context, so drop that tool
  const { initial_context: _, ...tools } = await mcpClient.tools();

  // 3. Let the model call tools for up to 10 steps, then answer
  const { text } = await generateText({
    model: 'anthropic/claude-sonnet-5',
    instructions: [
      'Answer questions using the Sanity Context tools.',
      "Look up content before you answer, and don't make up facts.",
      '',
      '# Data reference',
      '',
      initialContext,
    ].join('\n'),
    tools,
    stopWhen: isStepCount(10),
    prompt: process.argv[2] ?? 'What content do you have access to?',
  });

  console.log(text);
} finally {
  await mcpClient.close();
}
```

Without `stopWhen`, `generateText` stops after the first step and returns only the text before the tool call, which is often empty. In a request handler, keep the `finally` block so each request closes its MCP connection.

To run the script locally, add an `AI_GATEWAY_API_KEY` to `.env.local` alongside the Sanity values, then pass a question:

```bash filename="Terminal"
node --env-file=.env.local agent.ts "How long do I have to return something?"
```

Node.js 22.18 or later runs `.ts` files directly. For the JavaScript version, run `agent.js` instead. On Vercel, AI Gateway authenticates with the project's OIDC token instead of an API key. See [AI SDK with AI Gateway](/docs/ai-gateway/sdks-and-apis/ai-sdk#authentication).

## Troubleshoot Sanity Context

| Error                                                            | Cause and fix                                                                                                                                                                           |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `401`                                                            | The token is missing, invalid, or belongs to another organization. Check the token and the organization ID in the endpoint URL.                                                         |
| `403` with `contextGrantRequired` or `knowledgeBaseAccessDenied` | The token isn't an organization token with Context permissions, or it can't read a Knowledge Base the endpoint serves. Create an organization token with **Context** set to **Viewer**. |
| Empty answer from `generateText`                                 | `stopWhen` is missing, so `generateText` stopped after the first tool call. Add `stopWhen: isStepCount(10)`.                                                                            |
| `Found conflicting authored sources for "instructions"`          | Both `agent/instructions.md` and `agent/instructions.ts` exist. Delete `agent/instructions.md`.                                                                                         |

## Next steps

For production patterns such as public assistants, personalized assistants for signed-in users, and agents that use Sanity Context alongside other backends, see [Sanity Context patterns and best practices](https://www.sanity.io/docs/context/best-practices). To track what your agent's conversations ask and where answers fall short, see [Add insights to Sanity Context](https://www.sanity.io/docs/context/insights). Recording conversations needs a token with the Context **Editor** role, because a Viewer token can't save them.

Sanity's guides for [eve](https://www.sanity.io/docs/context/connect-vercel-eve) and [AI SDK](https://www.sanity.io/docs/context/connect-vercel-ai-sdk) build similar agents that call Anthropic with a provider API key instead of AI Gateway. They also keep the `initial_context` tool as a fallback for a failed initial context request.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
