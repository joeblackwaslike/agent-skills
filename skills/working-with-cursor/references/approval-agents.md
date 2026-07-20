---
source: "https://cursor.com/docs/approval-agents.md"
fetched_at: "2026-07-20T06:48:56.322Z"
sha256: "c911dee03fb3a9756306c6fb2627951f98948a15c4b51f1700b6b454f820ede2"
---

# Approval Agents

Approval Agents auto-approve pull requests and assigns reviewers.

## How it works

Approval agents run on top of your pull requests. They approve PRs when your criteria are met, or routes PRs to reviewers when more review is needed.

These agents do not replace a full code review. They use configured instructions, approval policy files, AI review agent findings, and risk thresholds to decide whether approval is safe.

Get started by configuring in the [Approval Agents dashboard](https://cursor.com/dashboard/approval-agents).

## Core capabilities

### Auto-approval

Approval Agents can auto-approve pull requests when your approval criteria are met.

Use approval criteria to describe the conditions a PR must meet before the agent approves it. The agent also considers applicable policy files, risk settings, AI reviewer findings, and the current review state.

### Reviewer assignment

Approval Agents can assign reviewers to pull requests when more review is needed.

Use reviewer assignment to describe the conditions a PR must meet before the agent assigns reviewers. The agent also considers applicable policy files, risk settings, AI reviewer findings, and the current review state.

## Core features

### AI reviewer awareness

Approval Agents can use findings from other Cursor review systems:

- **Bugbot Review Context** utilizes Bugbot findings in the approval decision.
- **Security Review Context** utilizes Security Agent findings in the approval decision.

When these contexts are enabled, the agent waits for the relevant agentic reviewer checks to finish and uses their findings as approval signals.

If Bugbot or Security Agents report findings that need human review, the Approval Agent will not approve the PR.

Security Agents require a team or enterprise plan.

### Risk scoring

Approval Agents can classify a PR by risk and enforce a maximum approval threshold.

- **Use Risk Score** enables risk classification which can be customized further with prompting.
- **Maximum Risk Threshold** sets the highest risk level the agent may approve.

If a PR exceeds the configured threshold, the agent will not approve it.

### Approval policy files

Approval Agents can discover repository policy files and apply them before deciding whether to approve.

For each changed file, the agent checks the file's directory and each ancestor directory for this exact filename:

```text
APPROVAL_POLICY.md
```

Only exact basename matches are trusted. Files such as `POLICY.md`, `approval_policy.md`, `APPROVAL_POLICY.md.bak`, and `team_APPROVAL_POLICY.md` are ignored during directory policy discovery.

The closest applicable `APPROVAL_POLICY.md` has the highest priority for files under that directory. Ancestor policies still apply unless they conflict with a more specific policy.

### Routing policies

Approval Agents also check for a top-level routing file:

```text
.cursor/approval-policies/ROUTING.md
```

`ROUTING.md` is a YAML list of product entries. Each entry contains:

- `product`: the product or area name.
- `boundary`: a semantic boundary or explicit repository-relative path or glob.
- `policies`: policy prompt pointers, either explicit file paths or semantic descriptions.

If `ROUTING.md` is missing, directory-based `APPROVAL_POLICY.md` discovery still runs. Missing routing does not weaken policy discovery.

### Policy precedence

Applicable approval policy prompts override generic approval criteria, risk thresholds, reviewer-selection guidance, custom approval instructions, and the default automated-review posture.

If policies conflict, the agent follows the most specific policy. If specificity is unclear, it follows the stricter instruction and avoids auto-approval.

If a PR changes an approval policy, routing file, routed policy file, or reviewer-specific policy file, the agent does not use the changed content to relax review requirements for that same PR. It uses the base-branch version when available, or requires human review when the base version cannot be determined.

## Setup

To configure Approval Agents, open the [Approval Agents Dashboard](https://cursor.com/dashboard/approval-agents) and create your first agent.

### Create an agent

Choose **New Agent**, or use the onboarding card to create a **Pull Request Approver**.

New agents start with default pull request triggers and approval behavior. You can then tune triggers, approval criteria, reviewer routing, AI context, and notification tools.

### Configure triggers

Triggers decide when the agent runs. Approval Agents support pull request events such as:

- **PR opened** runs the agent when a pull request is created.
- **PR pushed / updated** runs the agent when new commits are pushed to an existing PR.
- **PR commented** runs the agent when a comment matching a regex is posted on an existing PR.

Triggers can be scoped to repositories or organizations. For team-owned repositories, team admins can configure broader team scopes.

### Configure review signals

In **Configuration**, choose which signals the agent should use:

- **Use Bugbot Review Context**
- **Use Security Review Context**
- **Use Risk Score**
- **Maximum Risk for Approval**

Use these signals to decide whether the agent should rely on AI reviewer output, security findings, and risk thresholds before approving.

### Write a custom prompt

Use the **Custom Prompt** to add approval criteria for your team. You can describe local review expectations, examples of PRs that are safe to approve, or cases that require human review.

Policy files still take precedence over the custom prompt for applicable files.

If the custom prompt is not set, the agent will use the default Cursor managed criteria.

### Configure tools and MCPs

The agent must have at least one primary action enabled:

- **Approve PR**
- **Request Reviewers**

Optional integrations can include:

- Slack notifications.
- Microsoft Teams notifications.
- MCP servers for additional tool access.

Use the custom prompt to guide how the agent should use MCP tools.

### Save and enable

After configuring, save the agent. Existing agents can be enabled or disabled from the detail page.

Team members without admin permission can view Approval Agents but cannot edit them.


---

## Sitemap

[Overview of all docs pages](/llms.txt)
