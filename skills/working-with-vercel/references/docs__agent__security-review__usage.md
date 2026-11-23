---
title: Managing Security Reviews
product: vercel
url: /docs/agent/security-review/usage
canonical_url: "https://vercel.com/docs/agent/security-review/usage"
last_updated: 2026-10-30
type: how-to
prerequisites:
  - /docs/agent/security-review
  - /docs/agent
related:
  - /docs/agent/security-review
  - /docs/cli/security
  - /docs/agent
  - /docs/audit-log
  - /docs/drains/reference/audit-logs
summary: "Triage findings, fix them with Vercel Agent, and give reviews the context of your team's standards."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/security-review/usage.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "78a81cddee9c73ad754e18877c4d11246b813aa0c77e44490af7f40d5fa778d8"
---

# Managing Security Reviews

> Vercel Security Review is available in Public Beta on Enterprise and Pro plans

Once you've [set up Security Review](/docs/agent/security-review#how-to-set-up-security-review), every finding it reports appears in the [**Vulnerabilities**](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard. This is your central hub for triaging findings across your team and fixing them with Vercel Agent.

To shape what future reviews look for, write a [security policy](#set-a-security-policy) in your team's **Agent** settings or a project's **Security** settings.

## Triage findings

The list shows open findings by default. You can search it, and filter by status, severity, environment, and branch. Each project also has its own Vulnerabilities page. Findings from [repository reviews](/docs/agent/security-review#projects-and-repositories) appear under their repository in the team's dashboard. You can also list, inspect, close, and reopen findings from the terminal with [`vercel security vulnerabilities`](/docs/cli/security#vulnerabilities).

Click a finding to open its detail page, which shows the project, environment, branch, commit, and the deployments where the finding was first seen and closed. **Summary**, **Details**, and **Suggested Fix** explain the issue, and you can copy the whole finding as Markdown or JSON.

Severity is one of **Critical**, **High**, **Medium**, or **Low**. Severity ratings are AI-generated estimates rather than scores against a fixed rubric, so review each finding against your own application.

A finding is either open or closed:

- **Open**: Security Review reported the finding, and nobody has closed it.
- **Closed**: A team member closed the finding with a reason, or a later review no longer detects the issue and Vercel Security Review closed it. A closed finding's **Closed by** section shows who closed it, when, and why. When Vercel Security Review closes a finding, it doesn't confirm that the issue is fixed.

## Fix a finding with Vercel Agent

**Fix with Vercel Agent** opens [Vercel Agent](/docs/agent) in the sidebar with the finding already described, so you can ask about it before Vercel Agent proposes anything. The button appears only when **Enable Chat** is on in your team's **Agent** settings.

1. In the Vulnerabilities dashboard, click the finding.
2. Click **Fix with Vercel Agent**.
3. Work with Vercel Agent in the sidebar. It confirms the vulnerability is still present, applies the smallest fix it can, and runs your type checks, lint, and tests.
4. Review the pull request it opens, then merge it when you're satisfied with the fix.

Vercel Agent opens the pull request against the branch the finding is on, and nothing merges on its own. For a project with no connected Git repository, it creates a preview deployment instead and replies with a downloadable patch, so your project's source doesn't change until you apply it.

When the merged change deploys, the next review checks whether the issue still appears and closes the finding if it doesn't.

## Close or reopen a finding

Close a finding when you've fixed it, when it's a false positive, or when you accept the risk and won't fix it:

1. In the Vulnerabilities dashboard, click the finding.
2. Click **Close Vulnerability**.
3. Choose a **Reason**:
   - **Resolved**: You fixed the vulnerability.
   - **False Positive**: The finding is incorrect or doesn't apply to your code.
   - **Accepted Risk**: The finding is valid, but you're choosing not to fix it.
4. Optionally, add a comment of up to 500 characters, then click **Close Vulnerability**.

Closed findings stay in the dashboard so you can review them later. To reopen one, filter by **Closed**, click the finding, and click **Reopen Vulnerability**. You can reopen any closed finding, including one that Vercel Security Review closed. It returns to open, and the next review treats it like any other open finding.

## Track findings in your audit log

When Security Review reports a new vulnerability, Vercel records a `vercel-agent-security-finding-created` event in your team's [audit log](/docs/audit-log), naming the severity, the vulnerability class, and the project. Vercel also records an event each time a finding changes status:

- `vercel-agent-security-finding-closed`: a team member closed the finding as resolved, a false positive, or an accepted risk
- `vercel-agent-security-finding-reopened`: a team member reopened a closed finding
- `vercel-agent-security-finding-resolved`: Vercel closed the finding because a later review no longer detects the issue

Closing and reopening events name the team member who made the change. Enterprise teams can read these events in the audit log CSV export, or send them to a SIEM with an [Audit Log Drain](/docs/drains/reference/audit-logs). Finding events don't appear in your team's [Activity log](/docs/activity-log).

Vercel records Security Review policy changes as separate events. To learn more, see [Track policy changes](#track-policy-changes).

## Review findings in GitHub

Security Review adds its own GitHub check to each commit it reviews. On a private or internal repository, when that commit's branch has an open pull request, it also posts findings as comments on the pull request, each linking to the finding in the Vulnerabilities dashboard.

When you open or reopen a pull request, Security Review posts the findings already recorded for that branch.

Those comments can include the finding details, and anyone with access to the repository can read them. On a public repository, Security Review posts only its check, which names what it reviewed and links to the Vulnerabilities dashboard, so an unpatched vulnerability isn't disclosed publicly. Review those findings in the dashboard instead.

## Set a security policy

Policies are instructions that tell Security Review how to review your code. Write a policy to describe your threat model, point reviews at sensitive areas, or skip issues that don't apply to your application.

A policy is written in plain language, up to 32,000 characters. The more specific it is, the better Security Review understands what matters in your codebase:

- **Context about your application**: "This is an internal admin tool behind SSO. All routes under `/api/admin` require an authenticated employee."
- **Areas to focus on**: "Pay close attention to authorization checks in `app/api/billing`."
- **Issues to ignore**: "Don't report missing rate limiting on `/api/health`. Vercel Firewall rate limits this route."

Policies are treated as context, not as commands. Security Review's core behavior, identifying security vulnerabilities in your code, takes precedence over any conflicting policy content.

### Add a team policy

1. From your team, go to **Settings**, then open **Agent**.
2. In the **Security Reviews** section, find the **Policy** field. It appears once **Review Changes Automatically** is on.
3. Enter your policy and click **Save**.

### Add a project policy

1. From your [dashboard](/dashboard), select the project you'd like to configure, then open **Settings**.
2. Open **Security**.
3. Under **Security Review Policy**, enter your policy and click **Save**.

Security Review applies both policies, with the project policy adding context on top of what the team policy already says. A repository review has no project, so it applies only the team policy. Policy changes apply to reviews that start after you save them.

### Track policy changes

Vercel records each Security Review policy change in your team's [Activity log](/docs/activity-log), naming the team member who made it and, for a project policy, the project. Saving a policy records a `vercel-agent-security-review-policy-updated` event, and clearing one records a `vercel-agent-security-review-policy-deleted` event. Enterprise teams also get these events in the [audit log](/docs/audit-log) CSV export and [Audit Log Drains](/docs/drains/reference/audit-logs). The events don't include the policy text.

### Security is a shared responsibility

Security is a shared responsibility between Vercel and you. Security Review is a tool to help you find vulnerabilities, and it can miss issues. Policies change what reviews look for, so changing a policy can cause Security Review to miss vulnerabilities it would otherwise report, and you're responsible for that effect.

For more on how these responsibilities are divided, see the [shared responsibility model](/docs/security/shared-responsibility).

## Roles and permissions

What you can do with Security Review depends on your [team role](/docs/rbac/access-roles).

| Action                                                                        | Roles                                                                        |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| View findings                                                                 | Owner, Member, Developer, Security; Contributors for their assigned projects |
| Close or reopen a finding                                                     | Owner, Member, Developer, Security                                           |
| Fix a finding with Vercel Agent                                               | Any role that can use [Vercel Agent](/docs/agent) chat                       |
| Add or edit a team or project policy                                          | Owner, Member                                                                |
| Turn reviews on and set **Projects to Review** and **Repositories to Review** | Owner                                                                        |

Findings include source code and how to exploit it, so the Billing and Viewer roles can't see them. A Contributor sees findings only for the projects assigned to them, and doesn't see findings from repository reviews.

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
