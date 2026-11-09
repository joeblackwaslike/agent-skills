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
source: "https://vercel.com/docs/agent/security-review/usage.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "7cbe1294768383d4ddd0537372a414d89be0c63ba084b086ca39c3ab8ce39d84"
---

# Managing Security Reviews

> Vercel Security Review is available in Public Beta on Enterprise and Pro plans

Once you've [set up Security Review](/docs/agent/security-review#how-to-set-up-security-review), every finding it reports appears in the [**Vulnerabilities**](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard. This is your central hub for triaging findings across your team and fixing them with Vercel Agent.

To shape what future reviews look for, write a [security policy](#set-a-security-policy) in your team's **Agent** settings or a project's **Security** settings.

## Triage findings

The list shows open findings by default. You can search it, and filter by status, severity, environment, and branch. Each project also has its own Vulnerabilities page. You can also list, inspect, dismiss, and reopen findings from the terminal with [`vercel security vulnerabilities`](/docs/cli/security#vulnerabilities).

Click a finding to open its detail page, which shows the project, environment, branch, commit, and the deployments where the finding was first seen and closed. **Summary**, **Details**, and **Suggested Fix** explain the issue, and you can copy the whole finding as Markdown or JSON.

Severity is one of **Critical**, **High**, **Medium**, or **Low**. Severity ratings are AI-generated estimates rather than scores against a fixed rubric, so review each finding against your own application.

A finding stays open until you fix or dismiss it:

- **Open**: Security Review reported the finding, and nobody has fixed or dismissed it.
- **Dismissed**: You decided the finding doesn't need a fix.
- **Closed**: A later review no longer detects the issue. Vercel sets this itself, and it doesn't confirm that the issue is fixed.

## Fix a finding with Vercel Agent

**Fix with Vercel Agent** opens [Vercel Agent](/docs/agent) in the sidebar with the finding already described, so you can ask about it before Vercel Agent proposes anything. The button appears only when **Enable Chat** is on in your team's **Agent** settings.

1. In the Vulnerabilities dashboard, click the finding.
2. Click **Fix with Vercel Agent**.
3. Work with Vercel Agent in the sidebar. It confirms the vulnerability is still present, applies the smallest fix it can, and runs your type checks, lint, and tests.
4. Review the pull request it opens, then merge it when you're satisfied with the fix.

Vercel Agent opens the pull request against the branch the finding is on, and nothing merges on its own. For a project with no connected Git repository, it creates a preview deployment instead and replies with a downloadable patch, so your project's source doesn't change until you apply it.

When the merged change deploys, the next review checks whether the issue still appears and closes the finding if it doesn't.

## Dismiss or reopen a finding

Dismiss a finding when it isn't exploitable in your application, when it's an accepted risk, or when it's a false positive.

1. In the Vulnerabilities dashboard, click the finding.
2. Click **Dismiss Vulnerability**.
3. Confirm in the dialog.

Dismissed findings stay in the dashboard so you can review them later. To reopen one, filter by **Dismissed**, click the finding, and click **Reopen Vulnerability**. It returns to open, and the next review treats it like any other open finding.

## Track findings in your audit log

When Security Review reports a new vulnerability, Vercel records a `vercel-agent-security-finding-created` event in your team's [audit log](/docs/audit-log), naming the severity, the vulnerability class, and the project. Enterprise teams can read it in the audit log CSV export, or send it to a SIEM with an [Audit Log Drain](/docs/drains/reference/audit-logs). The event doesn't appear in your team's [Activity log](/docs/activity-log).

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
2. In the **Security Reviews** section, find the **Policy** field. It appears once **Review Deployments Automatically** is on.
3. Enter your policy and click **Save**.

### Add a project policy

1. From your [dashboard](/dashboard), select the project you'd like to configure, then open **Settings**.
2. Open **Security**.
3. Under **Security Review Policy**, enter your policy and click **Save**.

Security Review applies both policies, with the project policy adding context on top of what the team policy already says. Policy changes apply to reviews that start after you save them.

### Security is a shared responsibility

Security is a shared responsibility between Vercel and you. Security Review is a tool to help you find vulnerabilities, and it can miss issues. Policies change what reviews look for, so changing a policy can cause Security Review to miss vulnerabilities it would otherwise report, and you're responsible for that effect.

For more on how these responsibilities are divided, see the [shared responsibility model](/docs/security/shared-responsibility).

## Roles and permissions

What you can do with Security Review depends on your [team role](/docs/rbac/access-roles).

| Action                                         | Roles                                                                        |
| ---------------------------------------------- | ---------------------------------------------------------------------------- |
| View findings                                  | Owner, Member, Developer, Security; Contributors for their assigned projects |
| Dismiss or reopen a finding                    | Owner, Member, Developer, Security                                           |
| Fix a finding with Vercel Agent                | Any role that can use [Vercel Agent](/docs/agent) chat                       |
| Add or edit a team or project policy           | Owner, Member                                                                |
| Turn reviews on and set **Projects to Review** | Owner                                                                        |

Findings include source code and how to exploit it, so the Billing and Viewer roles can't see them, and a Contributor sees findings only for the projects assigned to them.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
