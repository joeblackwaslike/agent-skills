---
title: Agent Checklist for Launch
product: vercel
url: /docs/agent-checklist
canonical_url: "https://vercel.com/docs/agent-checklist"
last_updated: 2026-11-12
type: reference
prerequisites:
  []
related:
  - /docs/frameworks/agents/eve
  - /docs/frameworks/agents/mastra
  - /docs/frameworks/agents/flue
  - /docs/production-checklist
  - /docs/deployment-protection
summary: Prepare an eve, Mastra, or Flue agent for launch on Vercel. Check who can call the agent, what its tools can change, how it recovers from...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-checklist.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0bd64429048a0166eac922227bcc858537401921cd995203a5542748345f221e"
---

# Agent Checklist for Launch

**Agent prompt**


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Choosing between eve, AI SDK agents, and \\`WorkflowAgent\\`](https://vercel.com/kb/guide/eve-vs-ai-sdk-agents-vs-workflowagent) — Compare eve, \\`ToolLoopAgent\\`, and \\`WorkflowAgent\\` by durability, approvals, channels, and setup to choose an agent f
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Build your first Slack agent with eve](https://vercel.com/kb/guide/eve-slack-agent-starter) — Deploy the eve Slack agent template: a starter Slack bot built on the eve framework with an example tool and skill.
- [How to use subagents with eve](https://vercel.com/kb/guide/how-to-use-eve-subagents) — Learn how to use subagents with eve, including the built-in agent tool, declared specialist subagents, the isolation bou
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Schedules, and project credentials.
- [Agent Frameworks on Vercel](https://vercel.com/docs/frameworks/agents) — Build AI agents with eve, Mastra, Flue, and Vercel. Learn how each framework connects to Vercel compute, models, and sto
- [Build a Software Factory with Flue](https://vercel.com/docs/agent-resources/software-factory/flue) — Use Flue with AI Gateway, Vercel Sandbox, and explicit GitHub tool adapters for investigated and reviewed code changes.
- [Running eve Agents Durably on Vercel](https://vercel.com/docs/agent-harnesses/eve) — eve agents are durable out of the box on Vercel, with no extra configuration.
- [Agent Resources](https://vercel.com/docs/agent-resources) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and

Full cross-link map for this page: [/docs/agent-checklist.graph.md](/docs/agent-checklist.graph.md)
<!-- /docsgraph:related -->

```text
I'm preparing an AI agent for launch on Vercel with the checklist at https://vercel.com/docs/agent-checklist.md.

First, identify which agent framework this project uses: eve, Mastra, or Flue. If you have access to my project, review it against the checklist items for every agent and the items for that framework. If you don't have access to my project, ask me for the codebase.

Work through each section:

1. Access and security
2. Tools and code execution
3. Reliability and state
4. Observability and evaluation
5. Cost control

For each item, report whether it's done, missing, or not applicable, and name the file or setting you checked. Don't change code or settings until I confirm.
```

Before you launch an agent on Vercel, check who can call it, what its tools can change, how it recovers from interruptions, and how much it can spend. Each section lists items for every agent, followed by items for the framework you select: [eve](/docs/frameworks/agents/eve), [Mastra](/docs/frameworks/agents/mastra), or [Flue](/docs/frameworks/agents/flue).

- [Access and security](#access-and-security)
- [Tools and code execution](#tools-and-code-execution)
- [Reliability and state](#reliability-and-state)
- [Observability and evaluation](#observability-and-evaluation)
- [Cost control](#cost-control)

Use this checklist with the [production checklist](/docs/production-checklist), which covers your Vercel project's deployments, domains, and firewall.

## Access and security

Check these access and security items for every agent:

- Confirm that [Deployment Protection](/docs/deployment-protection) restricts access to your project's preview deployments.
- Store API keys, signing secrets, and database credentials as [Secret environment variables](/docs/environment-variables/sensitive-environment-variables), and keep them out of instructions, tool results, and sandboxes.
- Use [Vercel Connect](/docs/connect) to give the agent short-lived access to third-party APIs such as Slack and GitHub, so that you don't store provider secrets.
- Add [rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) with the Vercel Web Application Firewall (WAF) to the routes that start agent work, because each request can spend model tokens.
- For an internal agent with a browser interface, sign visitors in through your identity provider with [Vercel Passport](/docs/passport). Passport requires an [Enterprise](/docs/plans/enterprise) plan.

> For \['eve']:

Check these access and security items for an eve agent:

- Replace the scaffold's `placeholderAuth()` in `agent/channels/eve.ts` before browsers or other services call the agent in production. Add an [authenticator for your callers](https://eve.dev/docs/guides/auth-and-route-protection#replace-placeholderauth-before-production), such as a custom `AuthFn` for your application's users or `vercelOidc()` with `subjects` for other Vercel projects.
- Send an unauthenticated `POST` request to `/eve/v1/session` on the production deployment and confirm that the deployment rejects it. eve responds with `401`. A deployment behind Passport or Deployment Protection returns a sign-in redirect before the request reaches eve. The `/eve/v1/health` route skips eve's [route authentication](/docs/frameworks/agents/eve#configure-who-can-call-the-agent), so a health check doesn't test it.
- For each chat channel, such as Slack, confirm that eve verifies inbound webhooks. Connect the platform through [Vercel Connect](/docs/connect/frameworks/eve), or set the platform's signing secret in the project's environment variables.

> For \['mastra']:

Check these access and security items for a Mastra agent:

- Configure an auth provider in `server.auth` before you deploy. Without [Mastra auth](https://mastra.ai/docs/auth/overview), every Mastra API route is publicly accessible, including `/api/agents/*`.
- Set the memory resource ID on the server from the authenticated user, for example with `mapUserToResourceId`, so that one user can't read another user's threads. See Mastra's [reserved request context keys](https://mastra.ai/docs/server/request-context#reserved-keys).
- Leave Mastra Studio out of the production deployment unless you've configured auth for it. `VercelDeployer` deploys Studio only when you set `studio: true`.
- To keep a long-lived key out of production, leave `AI_GATEWAY_API_KEY` unset there. On Vercel, the `gateway` provider from `@ai-sdk/gateway` then authenticates with the deployment's [OpenID Connect (OIDC) token](/docs/ai-gateway/authentication-and-byok/oidc).

> For \['flue']:

Check these access and security items for a Flue agent:

- Protect every agent mount in `app.ts` with middleware that authenticates the caller and checks that the caller owns the conversation ID. A mounted Flue agent has [no built-in authentication](https://flueframework.com/docs/guide/routing/#protecting-your-agents).
- Derive each conversation ID on the server from the authenticated user instead of accepting an ID that the caller chooses.
- Provide `AI_GATEWAY_API_KEY` to the Flue host from its secret store, or [authenticate with a Vercel OpenID Connect (OIDC) token](/docs/ai-gateway/ecosystem/framework-integrations/flue#use-vercel-oidc-authentication) through a custom provider.
- If a Passport-protected Vercel app calls your Flue service, [verify the forwarded Passport token](/docs/frameworks/agents/flue#authenticate-visitors-with-passport) at the Flue service before the agent router handles the request.

## Tools and code execution

Check these tool and code execution items for every agent:

- Give the agent only the tools and connections that its task needs, and use read-only access where the task allows it.
- Treat tool arguments as untrusted input, because the model writes them. Validate each argument, and authorize the action from the authenticated session instead of from an argument such as a user ID.
- Run commands and code that the model generates in [Vercel Sandbox](/docs/sandbox), not in the Vercel Function that serves agent requests.
- Restrict sandbox network access. A sandbox allows all outbound traffic by default, so set a `deny-all` [network policy](/docs/sandbox/concepts/firewall#network-policies) or allow only the domains the agent needs.
- When sandbox code calls an authenticated API, use [credentials brokering](/docs/sandbox/concepts/firewall#credentials-brokering) so that the secret never enters the sandbox.

> For \['eve']:

Check these tool and code execution items for an eve agent:

- Set an `approval` policy on every tool that sends, deletes, publishes, or spends, with `always()`, `once()`, or `auto()` from `eve/tools/approval`. eve runs a tool call [without approval](https://eve.dev/docs/human-in-the-loop) unless you set a policy.
- Pass a `networkPolicy` to `environment.open()` in `agent/sandbox.ts` to set the [sandbox's network policy](https://eve.dev/docs/sandbox/vercel#network-policy) for each session.
- Read secrets from `process.env` inside tools and connections, which run in eve's app runtime. Don't pass secrets to the sandbox as environment variables. See eve's [security model](https://eve.dev/docs/concepts/security-model).

> For \['mastra']:

Check these tool and code execution items for a Mastra agent:

- Set `requireApproval: true` on tools with irreversible effects. Configure a storage provider too, because Mastra stores a snapshot to resume a call that waits for [approval](https://mastra.ai/docs/agents/human-in-the-loop).
- For command execution, use the `VercelSandbox` adapter from `@mastra/vercel`. `VercelServerlessSandbox` runs each command in a stateless Vercel Function instead of an isolated microVM. See [Mastra with Vercel Sandbox](/docs/sandbox/ecosystem/mastra).

> For \['flue']:

Check these tool and code execution items for a Flue agent:

- For agents that handle untrusted input, attach the [Vercel Sandbox adapter](/docs/sandbox/ecosystem/flue) with `useSandbox()`. Flue's `local()` sandbox gives the agent direct access to the host's filesystem and shell.
- Mount tools with irreversible effects only after your application records an approval, for example by gating `useTool()` on persistent state. See Flue's [conditional tools](https://flueframework.com/docs/guide/tools/#conditional-tools).

## Reliability and state

Check these reliability and state items for every agent:

- Make tools that send email, create records, or charge customers idempotent, because a retry after an interruption can run the same tool call again.
- Decide what the agent does when its model is unavailable. With [model fallbacks](/docs/ai-gateway/models-and-providers/model-fallbacks), AI Gateway tries backup models in order when the primary model fails.
- Check which AI Gateway tier your team uses. The free tier applies a lower [rate limit](/docs/ai-gateway/rate-limits) per model, and the paid tier leaves only the upstream provider's limits.

> For \['eve']:

Check these reliability and state items for an eve agent:

- If the agent uses `fileMemory()`, confirm that memory persists in production. During `eve dev`, file memory uses in-process storage that a restart clears. On Vercel, it needs a private [Vercel Blob store](/docs/vercel-blob#store-eve-agent-memory).
- Send a message to the production deployment as one of its real callers, because a successful `/eve/v1/health` response doesn't check model access or session permissions. For service callers, run `eve remote connect --url` with the deployment's URL. For a Passport setup, sign in through the browser and use your browser interface. See [Verify the deployment](/docs/frameworks/agents/eve#verify-the-deployment) for the steps that Deployment Protection adds.
- Start a task that waits for approval, redeploy, and confirm that the session resumes. On Vercel, each eve session runs on [Vercel Workflows](/docs/frameworks/agents/eve#run-durable-sessions-with-vercel-workflows), which resumes pending work after an interruption.

> For \['mastra']:

Check these reliability and state items for a Mastra agent:

- Route the agent's model requests through AI Gateway, because the fallbacks, observability, and budgets in this checklist cover only those requests. Set the agent's `model` with the `gateway` provider from `@ai-sdk/gateway`, or with a Mastra model router string that starts with `vercel/`. See [Mastra with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/mastra).
- Configure a remote [Mastra storage adapter](https://mastra.ai/docs/storage), such as PostgreSQL, for memory and workflow state. Vercel Functions don't share process memory or keep local files across deployments, and `VercelDeployer` stops the build when the project depends on `@mastra/libsql`.
- For requests that run longer than 180 seconds, raise `maxDuration` in `VercelDeployer` and `server.timeout` together. Mastra's `server.timeout` defaults to 180 seconds and answers slower requests with `504`, whatever `maxDuration` allows. See Mastra's [request timeouts](https://mastra.ai/reference/deployer/vercel#request-timeouts) and the [maximum duration](/docs/functions/configuring-functions/duration) of Vercel Functions.
- For work that outlasts one request, coordinate its steps with [Vercel Workflows](/docs/frameworks/agents/mastra#orchestrate-agent-tasks-with-vercel-workflows) or run Mastra's workers on [Vercel Daemons](/docs/frameworks/agents/mastra#run-background-workers-with-vercel-daemons).

> For \['flue']:

Check these reliability and state items for a Flue agent:

- Send the agent's model requests to AI Gateway, because the fallbacks, observability, and budgets in this checklist cover only those requests. Call `useModel()` with a specifier that starts with `vercel-ai-gateway/`, and add `'vercel-ai-gateway'` to the `providers` list if your Flue configuration has one. See [Flue with AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/flue).
- Host the Flue runtime on a server or container where one live process owns each conversation. Don't deploy Flue's durable HTTP router as a Vercel Function, because requests for the same conversation can reach different instances. See [Hosting considerations](/docs/frameworks/agents/flue#hosting-considerations).
- Add a `db.ts` file with a durable [database adapter](https://flueframework.com/docs/guide/database/), such as Postgres. Without `db.ts`, the Flue server keeps conversations in in-memory SQLite and loses them on restart.
- When Vercel Workflows orchestrates a hosted Flue agent, send the message in one step and read the reply in a separate step, so that a retry reattaches to the recorded submission. See [Orchestrate hosted agents with Workflows](/docs/frameworks/agents/flue#orchestrate-hosted-agents-with-workflows).

## Observability and evaluation

Check these observability and evaluation items for every agent:

- Name an owner who reviews the agent's runs and responds when the agent fails.
- Send a test request, then open [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability) for the project and confirm that it shows the agent's requests, token usage, and spend.
- Decide which prompt and response content your traces and logs can record, especially if the agent processes personal or regulated data.
- Add a [Drain](/docs/drains) to forward logs and traces to your own observability tool. Drains are available on [Pro](/docs/plans/pro-plan) and [Enterprise](/docs/plans/enterprise) plans.
- Build a set of evaluation cases from real requests, and run it before each release that changes the agent's instructions, tools, or model.

> For \['eve']:

Check these observability and evaluation items for an eve agent:

- Open [Agent Runs](/docs/agent-runs) in the project dashboard and confirm that sessions appear. If `eve deploy` didn't create the Vercel project, [add a tracing sampling rule](/docs/agent-runs#configure-tracing-for-existing-deployments) first.
- If the agent handles personal, sensitive, or regulated data, limit what traces capture with `otel({ tracePolicy })`, and narrow what Agent Runs receives with `agentRuns({ exportPolicy })`. See [Configure Agent Runs trace content](/docs/agent-runs#configure-agent-runs-trace-content).
- Add [eve evals](https://eve.dev/docs/evals) under `evals/` and run `eve eval` in your continuous integration (CI) pipeline. Pass `--url` to run the evals against a deployment.

> For \['mastra']:

Check these observability and evaluation items for a Mastra agent:

- Configure [Mastra observability](https://mastra.ai/docs/observability/overview) with an exporter that stores traces outside the function, and call `await mastra.observability.flush()` before the runtime pauses or exits.
- Request `/api/agents` on the deployment to confirm that it lists your agent, then send a test request to the agent's `generate` endpoint.
- Add scorers from `@mastra/evals` and run them in your continuous integration (CI) pipeline. See [Mastra evals](https://mastra.ai/docs/evals/overview).

> For \['flue']:

Check these observability and evaluation items for a Flue agent:

- Subscribe to Flue's runtime events with `observe()` in `app.ts` and export them to your observability tool. Flue documents exporters for OpenTelemetry, Sentry, and Braintrust. See [Flue observability](https://flueframework.com/docs/guide/observability/).
- Keep [Flue evals](https://flueframework.com/docs/guide/evals/) in a separate Vitest suite, and run the suite in your continuous integration (CI) pipeline.

## Cost control

Check these cost control items for every agent:

- Set an [AI Gateway budget](/docs/ai-gateway/observability-and-spend/budgets) for the agent's project. Without a budget, AI Gateway spend is unlimited. After spend reaches the limit, AI Gateway rejects requests with a `402` response until the budget resets or you raise it.
- Turn on [spend alerts](/docs/ai-gateway/observability-and-spend/budgets#spend-alerts) for that budget, because they're off by default.
- Configure [Spend Management](/docs/spend-management) for your team's metered Vercel resources. A spend amount doesn't stop usage on its own. **Pause Production Deployments** pauses the production deployment of every project on the team, which can take several minutes after spend reaches the amount. Pausing doesn't stop AI Gateway API key usage or storage charges, so set an AI Gateway budget and delete resources you no longer need. Spend Management is available on [Pro](/docs/plans/pro-plan) plans and on [Enterprise](/docs/plans/enterprise) plans with [Flexible Commitment](/docs/pricing/flex-commit).
- Set the shortest sandbox `timeout` that fits the task, and stop each sandbox when its work ends. The default timeout is 5 minutes. See [Managing costs](/docs/sandbox/pricing#managing-costs).
- Send routine steps to a lower-cost model and reserve a frontier model for complex ones. See [Cost-aware model routing with AI Gateway](/kb/guide/cost-aware-model-routing-with-ai-gateway).

> For \['eve']:

Check these cost control items for an eve agent:

- Set `limits.sessionUsage` in `agent/agent.ts` to pause a session at a token or cost threshold that fits your agent. By default, eve asks before continuing only after a session uses 40 million new input tokens. See eve's [runtime limits](https://eve.dev/docs/agent-config#runtime-limits).
- Estimate the cost of Agent Runs at your sampling rate. During the beta, Vercel bills Agent Runs usage at [Tracing rates](/docs/tracing/configure-tracing#usage-and-pricing).

> For \['mastra']:

Check these cost control items for a Mastra agent:

- If the agent authenticates with `AI_GATEWAY_API_KEY`, set an [API key budget](/docs/ai-gateway/observability-and-spend/budgets#api-key-budgets). A project budget counts an API key's spend only when you scope the key to that project.
- Call `workspace.destroy()` when a session ends to delete its sandbox and snapshots. See [Clean up the workspace](/docs/sandbox/ecosystem/mastra#clean-up-the-workspace).

> For \['flue']:

Check these cost control items for a Flue agent:

- Set an [API key budget](/docs/ai-gateway/observability-and-spend/budgets#api-key-budgets) on the `AI_GATEWAY_API_KEY` that the Flue host uses. A project budget counts an API key's spend only when you scope the key to that project.
- Stop or delete each sandbox when its run settles, because Flue leaves sandbox cleanup to your application. Drive storage persists until you delete the drive. See [Keep a workspace across runs](/docs/frameworks/agents/flue#keep-a-workspace-across-runs).

## Enterprise support

For help with your agent's production rollout, [contact our sales team](/contact/sales).

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
