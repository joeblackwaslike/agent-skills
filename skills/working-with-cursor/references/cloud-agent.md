---
source: "https://cursor.com/docs/cloud-agent.md"
fetched_at: "2026-06-29T05:42:13.025Z"
sha256: "93d368e059e565c748c4bfe96bc6ac4f0508cdbca7519c5470bf524061ffe7dd"
---

# Cloud Agents

Cloud agents use the same [agent fundamentals](https://cursor.com/learn/agents.md) but run in isolated VMs in the cloud with full development environments instead of on your local machine. The development environment is similar to the setup on your laptop: cloned repos, installed dependencies, secrets, startup commands, and network access.

Effective development environments give agents full context on your codebase and organization, so they can test and verify their work.

## Why use Cloud Agents?

You can run as many agents as you want in parallel, and they do not require your local machine to be connected to the internet.

Because they have access to their own virtual machine, cloud agents can build, test, and interact with the changed software. They can also use computers to control the desktop and browser. Cloud agents support [MCP servers](https://cursor.com/docs/mcp.md), giving them access to external tools and data sources like databases, APIs, and third-party services.

Cloud agents can also run in multi-repo environments. Use one when a task spans separate frontend, backend, infrastructure, or shared-library repositories. The agent can inspect the full workspace, make coordinated changes, and open pull requests in the repos it changes.

## How to access

Before anyone can start a cloud agent from a repository, a Cursor account admin needs to connect source control for the account. Set up [GitHub (Cloud and Enterprise Server)](https://cursor.com/docs/integrations/github.md), [GitLab (Cloud and Self-Hosted)](https://cursor.com/docs/integrations/gitlab.md), [Bitbucket Cloud](https://cursor.com/docs/integrations/bitbucket.md), or [Azure DevOps](https://cursor.com/docs/integrations/azure-devops.md).

You can kick off cloud agents from wherever you work:

1. **Cursor Web**: Start and manage agents from [cursor.com/agents](https://cursor.com/agents) on any device
2. **Cursor Desktop**: Select **Cloud** in the dropdown under the agent input
3. **Slack**: Use the @cursor command to kick off an agent
4. **GitHub or Bitbucket**: Comment `@cursor` on a GitHub PR or issue, or on a Bitbucket PR, to kick off an agent
5. **Linear**: Use the @cursor command to kick off an agent
6. **API**: Use the API to kick off an agent

For a native-feeling mobile experience, install Cursor as a Progressive Web
App (PWA). On **iOS**, open [cursor.com/agents](https://cursor.com/agents) in
Safari, tap the share button, then "Add to Home Screen". On **Android**, open
the URL in Chrome, tap the menu, then "Install App".

### Use Cursor in Slack

Learn more about setting up and using the Slack integration, including
triggering agents and receiving notifications.

## How it works

### Repository provider connection

Cloud agents clone your repo from GitHub, GitLab, Azure DevOps Services, or Bitbucket Cloud and work on a separate branch, then push changes to your repo for handoff.

You need read-write privileges to your repo and any dependent repos or submodules.

### Environments

Agents are only as capable as the environments they run in. An agent that can write code but can't run tests, query services, or reach APIs cannot close the loop on its work.

Not setting up a development environment for your cloud agents is like not giving your engineers a computer. This is why environment setup is the most important step to improve the effectiveness of cloud agents. It lets cloud agents work like engineers do: write code, test and verify work, and ship software.

You can configure environments with agent-led setup, a saved snapshot, or a Dockerfile in `.cursor/environment.json`. See [Cloud agent setup](https://cursor.com/docs/cloud-agent/setup.md) to get started. Each cloud agent then starts from an environment selected for the repo or multi-repo group.

The Cloud Agents dashboard shows which environment an agent used, along with environment details and version history. On the agent page, hover over the repository name at the top of the page to inspect the environment used for that run. See [Cloud agent setup](https://cursor.com/docs/cloud-agent/setup.md) for configuration details.

### Managed and self-hosted runtimes

Cursor-managed Cloud Agents are the default path for most teams. You can add secrets, restrict outbound domains, connect to private networks with Tailscale or a similar client, and use private connectivity for supported source control paths.

Use [My Machines](https://cursor.com/docs/cloud-agent/my-machines.md) or [Self-Hosted Pool](https://cursor.com/docs/cloud-agent/self-hosted-pool.md) when you want to own the machine that executes terminal commands, file edits, browser actions, and other tool calls. In both modes, the agent loop still runs in Cursor's cloud.

See [Choose where Cloud Agents run](https://cursor.com/docs/cloud-agent/choose-runtime.md) for the [decision guide](https://cursor.com/docs/cloud-agent/choose-runtime.md#self-hosted-or-cursor-hosted-which-is-right-for-you) and full comparison.

## Models

Cloud Agents use a curated selection of models that always run in [Max Mode](https://cursor.com/docs/models-and-pricing.md#max-mode).

There is no toggle to turn Max Mode off for Cloud Agents.

## MCP support

Cloud agents can use [MCP (Model Context Protocol)](https://cursor.com/docs/mcp.md) servers configured for your team. Add and manage MCP servers through the MCP dropdown in [cursor.com/agents](https://cursor.com/agents).

Both HTTP and stdio transports are supported. OAuth is supported for MCP servers that need it. See [Cloud Agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md) for setup details.

## Hooks support

Cloud agents run command-based hooks from `.cursor/hooks.json` in your repository. On Enterprise plans, they also run team hooks and enterprise-managed hooks.

This keeps formatters, audit scripts, and policy checks active when work runs in the cloud. Hooks like `beforeShellExecution`, `afterFileEdit`, `preToolUse`, and `subagentStart` all work in cloud agents.

Some hooks are IDE-specific (Tab hooks, `workspaceOpen`) or depend on client-side wiring (`sessionStart`, `beforeSubmitPrompt`, prompt-based hooks) and don't run in cloud agents. User-level hooks from `~/.cursor/hooks.json` are also not available since cloud VMs don't have access to your local home directory.

See [Hooks: Cloud agent support](https://cursor.com/docs/hooks.md#cloud-agent-support) for the full support matrix and details.

## Artifacts and remote desktop control

Cloud agents produce merge-ready PRs with artifacts to demo their changes. You can also control the agent's remote desktop to use the modified software.

- **Artifacts**: Agents produce screenshots, videos, and logs so you can see exactly what changed and how the agent verified its work.
- **Remote desktop control**: Take control of the agent's desktop to test the software yourself in a full development environment without checking out the branch locally. Release control back to the agent for it to keep working.

See [Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md) for details on artifacts, computer use, and remote desktop control.

## Related pages

- Learn more about [Cloud agent capabilities](https://cursor.com/docs/cloud-agent/capabilities.md).
- Learn more about [Cloud agent setup](https://cursor.com/docs/cloud-agent/setup.md).
- Learn how to [choose where Cloud Agents run](https://cursor.com/docs/cloud-agent/choose-runtime.md).
- Learn more about [Cloud agent security](https://cursor.com/docs/cloud-agent/security-network.md).
- Learn more about [Cloud agent settings](https://cursor.com/docs/cloud-agent/settings.md).

## Billing

Cloud Agents are charged at API pricing for the selected [model](https://cursor.com/docs/models-and-pricing.md#model-pricing). You'll be asked to set a spend limit when you first start using them.

## Troubleshooting

### Agent runs are not starting

- Ensure you're logged in and have connected your GitHub, GitLab, Azure DevOps, or Bitbucket account.
- Check that you have the necessary repository permissions.
- You need to be on a paid Cursor plan.

### My secrets aren't available to the cloud agent

- Ensure you've added secrets in [cursor.com/dashboard/cloud-agents](https://cursor.com/dashboard/cloud-agents)
- Secrets are workspace/team-scoped; make sure you're using the correct account
- Try restarting the cloud agent after adding new secrets

### Can't find the Secrets tab

- If you don't see it, ensure you have the necessary permissions

### Do snapshots copy .env.local files?

Snapshots save your base environment configuration (installed packages, system dependencies, etc.).
If you include `.env.local` files during snapshot creation, they will be saved. However, using the Secrets tab
in Cursor Settings is the recommended approach for managing environment variables.

### Slack integration not working

Verify that your workspace admin has installed the Cursor Slack app and that
you have the proper permissions.

## Naming History

Cloud Agents were formerly called Background Agents.


---

## Sitemap

[Overview of all docs pages](/llms.txt)
