---
title: Build a Software Factory with eve
product: vercel
url: /docs/agent-resources/software-factory/eve
canonical_url: "https://vercel.com/docs/agent-resources/software-factory/eve"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-resources/software-factory
  - /docs/agent-resources
related:
  - /docs/frameworks/agents/eve
  - /docs/agent-runs
  - /docs/agent-harnesses/eve
summary: Customize an eve software factory on Vercel with GitHub access, sandbox execution, and reviewed draft pull requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/software-factory/eve.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0b535c59f8d1822c47b4f8727a85afcbb433240315d54e3c6d4573a8743b1ed3"
---

# Build a Software Factory with eve

Use [eve on Vercel](/docs/frameworks/agents/eve) to coordinate a software factory with durable sessions, isolated repository work, and a review stage. Start with Foreman, the eve software factory template, then adapt its instructions and GitHub access to your repository.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [GitHub tools are now an installable eve extension](https://vercel.com/changelog/github-tools-eve-extension)
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Give your eve agent GitHub tools](https://vercel.com/changelog/github-tools-eve)
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [Choosing between eve, AI SDK agents, and \\`WorkflowAgent\\`](https://vercel.com/kb/guide/eve-vs-ai-sdk-agents-vs-workflowagent) — Compare eve, \\`ToolLoopAgent\\`, and \\`WorkflowAgent\\` by durability, approvals, channels, and setup to choose an agent f
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Schedules, and project credentials.
- [Build a Software Factory with Flue](https://vercel.com/docs/agent-resources/software-factory/flue) — Use Flue with AI Gateway, Vercel Sandbox, and explicit GitHub tool adapters for investigated and reviewed code changes.

Full cross-link map for this page: [/docs/agent-resources/software-factory/eve.graph.md](/docs/agent-resources/software-factory/eve.graph.md)
<!-- /docsgraph:related -->

## Deploy the software factory template

Deploy the [eve software factory template](/templates/eve/eve-software-factory) and follow the [Foreman setup guide](/kb/guide/eve-software-factory) to configure credentials and work intake. Use a repository where you can review and discard the generated changes.

Foreman routes work through four agents:

| Agent | Responsibility |
| --- | --- |
| Classifier | Establish the request type and route the work. |
| Analyst | Investigate the repository and produce acceptance criteria. |
| Implementer | Make the change and collect results from checks. |
| Reviewer | Inspect the actual diff and evidence before handing off a draft PR. |

Keep the template's stage handoffs and customize the repository instructions. Define the commands that establish a clean baseline, reproduce a failure, and check a proposed fix. Require clarification when the issue doesn't define the expected behavior.

## Configure GitHub tools

Foreman mounts the [GitHub Tools eve extension](https://github-tools.com/integrations/eve) in `agent/extensions/github.ts`. The extension adds GitHub operations as tools named `github__<operation>`, requests short-lived tokens from the project's GitHub connector, and asks for approval before a write tool runs. To change what Foreman can do on GitHub, edit that file's `include` list and `requireApproval` policies rather than registering a second copy of the same tools.

For a custom eve factory, install the extension and Vercel Connect:

```bash filename="Terminal"
pnpm add @github-tools/eve-extension @vercel/connect
```

[Create a GitHub connector and link it to the Vercel project](https://github-tools.com/auth#vercel-connect). Then mount the extension. Replace `github/software-factory` below with the connector name and `your-org/your-repo` with your repository:

**agent/extensions/github.ts**

```typescript filename="agent/extensions/github.ts"
import githubExtension from '@github-tools/eve-extension';

export default githubExtension({
  connector: 'github/software-factory',
  context: { owner: 'your-org', repo: 'your-repo' },
  include: [
    'getIssueContext',
    'getFileContent',
    'searchCode',
    'listPullRequests',
    'createBranch',
    'createOrUpdateFile',
    'createPullRequest',
  ],
  guardrails: {
    repositories: ['your-org/your-repo'],
    branches: ['factory/*'],
  },
});
```

**agent/extensions/github.js**

```javascript filename="agent/extensions/github.js"
import githubExtension from '@github-tools/eve-extension';

export default githubExtension({
  connector: 'github/software-factory',
  context: { owner: 'your-org', repo: 'your-repo' },
  include: [
    'getIssueContext',
    'getFileContent',
    'searchCode',
    'listPullRequests',
    'createBranch',
    'createOrUpdateFile',
    'createPullRequest',
  ],
  guardrails: {
    repositories: ['your-org/your-repo'],
    branches: ['factory/*'],
  },
});
```

Each option limits the factory in a different way:

| Option | What it does |
| --- | --- |
| `connector` | Requests a short-lived token for each call, scoped to the selected tools. The agent stores no GitHub token. |
| `context` | Fills in `owner` and `repo` when the model leaves them out. It supplies defaults and doesn't restrict access. |
| `include` | Lists every tool the model can call. This list has no merge tools, so a person merges in GitHub. |
| `guardrails` | Rejects calls to any other repository, reads included, and limits branch creation and commits to branches that match `factory/*`. The factory can still open a pull request into any base branch. |

Guardrails apply to the extension's tools. They don't cover Git commands that run in a sandbox, or tools without a repository target, such as `searchCode`. Limit the GitHub App installation to the intended repositories as well.

Every write tool asks for approval by default, and eve pauses the session until someone answers. Set `requireApproval` to choose a policy for each tool. If you author a write tool yourself, gate it with [eve's `always()` approval policy](https://eve.dev/docs/human-in-the-loop), because a tool that calls a GitHub Tools executor directly doesn't get the extension's approval.

A scheduled run has no channel to ask in, so a tool that needs approval fails the session instead of waiting. For those runs, decide which writes can proceed without approval, such as a draft pull request, and keep approval on the rest. Instruct the agent to set `draft: true` when it calls `createPullRequest`.

To try a factory on a real repository before it can change anything, set `dryRun: true`. Reads run as usual, and each write returns a record of what the agent would have done instead of reaching GitHub. A dry-run write creates nothing, so a step that depends on an earlier write, such as a commit to a branch the agent created, can't run.

`guardrails` and `dryRun` require `@github-tools/eve-extension` 0.12.0 or later, which mounts on eve 1.0.0-rc.6 or later. Check the versions in the template's `package.json` before you add them to Foreman.

Keep repository edits in the implementer's sandbox, and give the agent only the GitHub operations its stages need. Link the project and load its environment for local calls, following [eve setup](/docs/frameworks/agents/eve#link-the-vercel-project).

The extension acts as the connector's GitHub App by default. For an internal factory operating on a team's repositories, restrict the GitHub installation and authenticate callers who can start work. Set [`actAs`](https://github-tools.com/integrations/eve#per-user-tokens) to `'user'` or `'caller'` if each signed-in caller should act through their own GitHub account.

## Run and review repository changes

[eve sandboxes](https://eve.dev/docs/sandbox) give the implementer a separate environment for repository commands. Keep one working branch per run and record the base commit before making changes. Persist files across sandbox replacement with the [Drives integration](/docs/frameworks/agents/eve#share-datasets-with-vercel-drives) when needed.

Give the reviewer the diff and command output, not just the implementer's summary. If the reviewer requests changes, return those findings to the implementer and rerun the affected checks. Foreman finishes with a reviewed draft pull request; a person decides when to mark it ready and merge it.

For UI changes, follow [Give your software factory a browser](/kb/guide/software-factory-browser). To investigate deployment failures, add [Vercel MCP access](/kb/guide/software-factory-vercel-mcp) for build logs, runtime errors, and deployment history.

## Verify a complete run

Start with a small issue that has an observable result. Confirm that the factory:

1. Reads the intended issue and identifies the repository and base commit.
2. Reproduces the problem or explains why it can't proceed.
3. Makes changes on a separate branch and records check results.
4. Gives the reviewer the actual diff and waits at the configured approval points.
5. Produces one draft PR with the issue, implementation, and verification evidence.

Inspect [Agent Runs](/docs/agent-runs) to follow tool calls and handoffs. Test a rejected approval as well as an accepted one. eve preserves sessions through [Vercel Workflows](/docs/agent-harnesses/eve), but an interrupted external write can run again. Check for an existing PR before retrying publication.

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
