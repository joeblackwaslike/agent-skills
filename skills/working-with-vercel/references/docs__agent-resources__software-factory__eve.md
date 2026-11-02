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
source: "https://vercel.com/docs/agent-resources/software-factory/eve.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "bfeb61b152596a7c944d865fc0748ece6388977fac058ac111a4eb8dea3170ce"
---

# Build a Software Factory with eve

Use [eve on Vercel](/docs/frameworks/agents/eve) to coordinate a software factory with durable sessions, isolated repository work, and a review stage. Start with Foreman, the eve software factory template, then adapt its instructions and GitHub access to your repository.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Building a software factory for AI SDK](https://vercel.com/blog/building-a-software-factory-for-ai-sdk)
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [How to build a browser agent that works behind a login](https://vercel.com/kb/guide/build-a-browser-agent) — Build a browser agent with eve, Vercel Connect, and KERNEL managed auth that signs a user in through a human-in-the-loop
- [Give your eve agent GitHub tools](https://vercel.com/changelog/github-tools-eve)
- [Draft documentation fixes from reader feedback with Sanity and eve](https://vercel.com/kb/guide/sanity-eve-agent) — Build an autonomous agent that drafts fixes in Sanity, stages them for human review, and calls the model through AI Gate
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t

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

## Configure GitHub tools for each stage

For a custom eve factory or a stage that needs additional GitHub operations, install GitHub Tools and Vercel Connect:

```bash filename="Terminal"
pnpm add @github-tools/sdk @vercel/connect ai zod
```

[Create and attach a GitHub connector](https://github-tools.com/guide/vercel-connect) to the Vercel project. Replace `github/software-factory` below with its connector name and `your-org/your-repo` with your repository. Add an authored eve tool for reading the issue:

**agent/tools/read\_factory\_issue.ts**

```typescript filename="agent/tools/read_factory_issue.ts"
import { getIssue } from '@github-tools/sdk';
import { connectGithubToken } from '@github-tools/sdk/connect';
import { defineTool } from 'eve/tools';
import { z } from 'zod';

export default defineTool({
  description: 'Read an issue from the factory repository.',
  inputSchema: z.object({ issueNumber: z.number().int().positive() }),
  async execute({ issueNumber }) {
    const token = connectGithubToken('github/software-factory', {
      include: ['getIssue'],
    });
    const execute = getIssue(token).execute;
    if (!execute) throw new Error('GitHub issue tool has no executor');
    return execute(
      { owner: 'your-org', repo: 'your-repo', issueNumber, detail: 'full' },
      { toolCallId: `issue-${issueNumber}`, messages: [], context: {} },
    );
  },
});
```

**agent/tools/read\_factory\_issue.js**

```javascript filename="agent/tools/read_factory_issue.js"
import { getIssue } from '@github-tools/sdk';
import { connectGithubToken } from '@github-tools/sdk/connect';
import { defineTool } from 'eve/tools';
import { z } from 'zod';

export default defineTool({
  description: 'Read an issue from the factory repository.',
  inputSchema: z.object({ issueNumber: z.number().int().positive() }),
  async execute({ issueNumber }) {
    const token = connectGithubToken('github/software-factory', {
      include: ['getIssue'],
    });
    const execute = getIssue(token).execute;
    if (!execute) throw new Error('GitHub issue tool has no executor');
    return execute(
      { owner: 'your-org', repo: 'your-repo', issueNumber, detail: 'full' },
      { toolCallId: `issue-${issueNumber}`, messages: [], context: {} },
    );
  },
});
```

The tool constructs its token provider inside `execute`, so credentials resolve when the tool runs. Connect scopes follow the selected `getIssue` operation. The repository stays fixed in server-side code, and the model supplies only an issue number. Link the project and load its environment for local calls, following [eve setup](/docs/frameworks/agents/eve#link-the-vercel-project).

Keep repository edits in the implementer's sandbox. Give the publishing stage only the additional operations it needs, such as `createBranch`, `createOrUpdateFile`, and `createPullRequest`. Gate authored write tools with [eve's `always()` approval policy](https://eve.dev/docs/human-in-the-loop), and set `draft: true` when creating the PR. Calling a GitHub Tools executor directly doesn't apply its AI SDK approval metadata. Do not expose merge operations to the factory.

If Foreman already provides a GitHub integration for a stage, update that integration rather than registering a second copy of the same tools. Connect uses an app identity by default. For an internal factory operating on a team's repositories, restrict the GitHub installation and authenticate callers who can start work. Use a verified per-user Connect subject if each caller should act through their own GitHub account.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
