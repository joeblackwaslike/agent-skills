---
title: Deploying eve to Vercel
product: vercel
url: /docs/eve/deploying
canonical_url: "https://vercel.com/docs/eve/deploying"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/eve
related:
  - /docs/workflows
  - /docs/sandbox
  - /docs/eve/agent-runs
  - /docs/eve/getting-started
  - /docs/cli
summary: Link an eve project, configure production access, deploy the agent, and verify its runs on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/deploying.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "9a81702b4d406166362967460c636f41033cf1d43be2cb6e985fdc7af48e4ffc"
---

# Deploying eve to Vercel

Deploy an eve agent to Vercel to run durable sessions with [Vercel Workflows](/docs/workflows), execute code in [Vercel Sandbox](/docs/sandbox), and inspect activity in [Agent Runs](/docs/eve/agent-runs).

## Before you start

- [Create an eve project](/docs/eve/getting-started) and confirm that it responds locally.
- Install the [Vercel CLI](/docs/cli) and use Node.js 24 or later.
- Choose the Vercel team and project that will own the deployment.

Run the commands below from the eve project root. For a workspace containing multiple agents, use the workspace root.

## Link the project

```bash filename="Terminal"
npx eve link
```

Follow the prompts to create or select a Vercel project. The command links the directory and pulls the project's environment variables.

For an automated setup, specify the project explicitly:

```bash filename="Terminal"
npx eve link --project your_project_name --non-interactive
```

Add `--team your_team_slug` when you need to select a team. The named project is created if it doesn't exist.

## Configure credentials and access

Model strings in `agent/agent.ts` route requests through [AI Gateway](/docs/ai-gateway). On Vercel, eve uses the project's [OpenID Connect (OIDC) identity](/docs/oidc), so this model-access path doesn't require a provider API key.

Add credentials for direct model providers, tools, and other integrations to your project's [environment variables](/docs/environment-variables). Configure [Vercel Connect](/docs/connect/frameworks/eve) for connections that use managed credentials.

Configure [route authentication](/docs/eve/authentication) for the callers that will use your agent. Before serving browser users, replace the generated `placeholderAuth()` with a policy that verifies their identity. Linking a project or enabling Deployment Protection does not replace the agent's authentication policy.

The default sandbox environment uses Vercel Sandbox on Vercel. If your agent prepares a sandbox or seeds files during the build, eve creates or reuses a snapshot. A sandbox prewarming failure stops the deployment; inspect the build logs before retrying.

## Choose how to build the project

For a standalone agent, use `eve build` as the build command. Hosted Vercel builds produce the deployment bundle in `.vercel/output`. Keep the scaffold's build configuration when deploying a generated project.

To deploy the agent alongside a frontend or backend, use [Vercel Services](/docs/services). The following example assumes an existing Next.js frontend in `apps/web/`, with dependencies installed from the project root, and an eve agent in `agent/`:

```ts filename="vercel.ts"
import { withEve } from 'eve/vercel';

export default await withEve({
  services: {
    web: {
      framework: 'nextjs',
      root: 'apps/web',
      buildCommand: 'node ../../node_modules/next/dist/bin/next build',
    },
  },
  routes: [
    {
      src: '^(.*)$',
      destination: { type: 'service', service: 'web' },
    },
  ],
});
```

Keep `eve` in the root package's dependencies. A project can use only one Vercel configuration source: move any existing settings into `vercel.ts` and remove `vercel.json` when adopting this configuration.

`withEve` adds the agent service and its transport routes before the frontend route. The frontend uses its ordinary Next.js configuration. A root agent is available at `/eve/v1/*`; named workspace agents use `/eve/<name>/v1/*`. Each agent and the frontend build separately and deploy together.

Custom channel endpoints outside those transport routes need an explicit route to their agent service. Use [service bindings](/docs/services/bindings) when services need to call a private backend.

## Deploy to production

```bash filename="Terminal"
npx eve deploy
```

This command deploys to **Production**. eve installs dependencies, runs the Vercel deployment with build logs, and pulls the project environment afterward. Wait for the deployment to finish and use the resulting URL to verify the agent.

You can also deploy through a [Git-connected Vercel project](/docs/git). For an automated production deployment, explicitly confirm the target:

```bash filename="Terminal"
npx eve deploy --project your_project_name --non-interactive --yes
```

When `eve deploy` creates a project, it configures trace sampling for Agent Runs. For an existing project, check [tracing setup](/docs/eve/agent-runs#configure-tracing-for-existing-deployments).

## Verify the deployment

For a root agent with the built-in HTTP channel, check its health endpoint:

```bash filename="Terminal"
curl --fail https://your_agent.vercel.app/eve/v1/health
```

A successful HTTP response confirms that the service is reachable. The health endpoint is public at the channel layer; it does not verify model access or permission to start sessions.

Connect the terminal UI to the deployed agent:

```bash filename="Terminal"
npx eve remote connect --url https://your_agent.vercel.app
```

Send a message using credentials accepted by your channel's authentication policy. For a bearer-token policy, pass the token as a request header:

```bash filename="Terminal"
npx eve remote connect --url https://your_agent.vercel.app \
  --header "Authorization: Bearer $AGENT_ACCESS_TOKEN"
```

Set `AGENT_ACCESS_TOKEN` locally to a token accepted by your verifier. For a named workspace agent, use its mount, such as `https://your_agent.vercel.app/eve/support`, and check `/eve/support/v1/health`.

If [Deployment Protection](/docs/deployment-protection) is enabled, configure a [protection bypass for automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation). Set `VERCEL_AUTOMATION_BYPASS_SECRET` locally for the remote terminal connection. A direct health request also needs the bypass header. The bypass does not grant access through eve's route authentication.

Open [Agent Runs](/docs/eve/agent-runs) in the project dashboard to inspect the message, tool calls, and token usage. If the agent doesn't respond, check [runtime logs](/docs/logs/runtime) and the [authentication troubleshooting guidance](/docs/eve/authentication#troubleshoot-access).

## Next steps

- [Configure observability](/docs/eve/observability) to control trace content and destinations.
- [Connect channels and external services](/docs/connect/frameworks/eve).
- [Review pricing and limits](/docs/eve/pricing) for the Vercel resources the agent uses.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
