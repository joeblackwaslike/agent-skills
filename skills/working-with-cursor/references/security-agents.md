# Security Agents

Security Agents scan your code for security bugs, risky patterns, and vulnerabilities.

This feature is available only for Teams and Enterprise plans.

## How it works

Security Agents include two Cursor-managed agent types:

- **Security Reviewer** checks pull requests before they merge. Use it to catch vulnerabilities during code review.
- **Vulnerability Scanner** scans your codebase at rest. Use it to find pre-existing vulnerabilities, long-standing issues, and problems missed during PR review.

Both agent types run on the Automations platform and require Cloud Agents.

## Setup

To configure Security Agents, open the [Security Agents Dashboard](https://cursor.com/dashboard/security-agents) and create your first agent.

### Triggers

**Security Reviewer agents** support Git-based Automations triggers, including pull request and merge request events. Use these triggers to run security checks when code changes.

![Security Reviewer Git-based trigger configuration](/docs-static/images/security-review/triggers.png)

**Vulnerability Scanner agents** support cron-based triggers. Use these triggers to scan your codebase on a recurring schedule, independent of pull request activity.

![Vulnerability Scanner cron trigger configuration](/docs-static/images/security-review/vulnerability-scanner-triggers.png)

### Security Checks

Both agent types include built-in security checks. Enable or disable individual checks based on what you want each agent to review.

### Custom instructions

Use custom instructions to give each agent more context. You can describe the types of issues to prioritize, explain project-specific security expectations, or define how the agent should behave.

### Tools and MCPs

Both agent types support tools and MCPs. Each agent needs at least one tool or MCP to run.

Use tools and MCPs to connect Security Agents to the systems where your team tracks security work.

- Send vulnerabilities to a Slack channel, issue tracker, or another connected system.
- Add custom instructions that explain when and how the agent should use each MCP.
- Give the agent extra context from tools or MCPs before it reports a finding.

### Environment Setup

Security Agents run on Cloud Agents.

You can use Cursor's cloud with no additional setup, or configure [self-hosted Cloud Agents](https://cursor.com/docs/cloud-agent/self-hosted-pool.md) to run reviews in your own environment.

## Billing

Security Agents are billed at the team usage level:

- Usage is charged to the team's usage pool.
- Agents run under a shared team service account, so they don't affect any individual user's usage.

## Analytics

Security Agents track three key metrics across agent runs:

- **Vulnerabilities found**: the number of security findings reported by agents.
- **Issues fixed**: the number of findings that were resolved after they were reported.
- **Resolution rate**: the percentage of reported findings that were fixed.

To determine whether an issue was fixed, Cursor uses LLMs to review incremental diffs and assess whether the flagged issue was resolved.

## Viewing Runs

Every agent run is tracked in the dashboard. Use the run history to see when an agent ran, which tools it used, its final status, and how long it took.

Open a run to inspect the underlying Cloud Agent for more detail about what the agent did.

![Security Agents recent runs dashboard](/docs-static/images/security-review/recent-runs.png)


---

## Sitemap

[Overview of all docs pages](/llms.txt)
