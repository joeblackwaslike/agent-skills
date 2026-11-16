---
title: Security Review
product: vercel
url: /docs/agent/security-review
canonical_url: "https://vercel.com/docs/agent/security-review"
last_updated: 2026-10-30
type: conceptual
prerequisites:
  - /docs/agent
related:
  - /docs/agent
  - /docs/agent/security-review/usage
  - /docs/cli/security
  - /docs/agent/pricing
summary: Scan your code for security vulnerabilities and track findings in the Vulnerabilities dashboard
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/security-review.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4c9d01f64d83fe3bf5195fcc28440984d1d5e22267bb9ef4a2077431222feaf9"
---

# Security Review

> Vercel Security Review is available in Public Beta on Enterprise and Pro plans

Security Review is part of [Vercel Agent](/docs/agent). It scans your code for security vulnerabilities and reports what it finds in the [Vulnerabilities](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard.

It helps you find issues such as code injection, authorization bypass, and credential exposure before they reach your users.

## How to set up Security Review

Security Review reviews pushes to GitHub repositories. A repository doesn't need a Vercel project. Security Review covers two kinds of repositories:

- **Projects**: Repositories connected to one of your team's Vercel projects.
- **Repositories**: Other repositories in GitHub accounts you've connected to your team. They don't need a Vercel project.

To review only repositories connected to Vercel projects, skip to [Turn on Security Review](#turn-on-security-review).

### Connect a GitHub account

To review repositories that aren't linked to a Vercel project, first connect the GitHub account or organization that owns them to your team:

1. Navigate to your team's [**Git**](/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fgit\&title=Go+to+Git+settings) settings page.
2. Under **GitHub**, find the account or organization and click **Connect**. If it isn't listed, click **Install on another GitHub account** to install the Vercel GitHub App on it first.

Each GitHub account can be connected to one Vercel team. Security Review can review only the repositories the Vercel GitHub App can access in that account.

### Turn on Security Review

To enable Security Review, navigate to the [**Agent**](/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fagent\&title=Go+to+Agent+settings) settings page.

1. In the **Security Reviews** section, turn on **Review Changes Automatically**.
2. Under **Projects to Review**, choose which projects to review:
   - All projects (default)
   - Specific projects, up to 100
   - No projects
3. Under **Repositories to Review**, choose which repositories without a project in scope to review:
   - All repositories (default): Every repository the Vercel GitHub App can access in your connected GitHub accounts
   - Specific repositories: Whole connected accounts or individual repositories, up to 1,000 repositories
   - No repositories
4. Click **Save** to confirm your settings. You can't save with both **No projects** and **No repositories** selected.

Once you've enabled Security Review, it automatically reviews new code changes in the projects and repositories you selected, whether or not they come from a pull request.

> **💡 Note:** Every push to a project or repository you select starts a billed review. With
> **All repositories**, that includes every repository the Vercel GitHub App can
> access in your connected GitHub accounts. See [Pricing](#pricing).

> **💡 Note:** To fix findings with Vercel Agent, you also need **Enable Chat** turned on in
> the same settings page.

## Projects and repositories

Security Review reviews each push once. A push to a repository connected to a project in **Projects to Review** gets a project review. Any other push gets a repository review if **Repositories to Review** covers the repository.

Leaving a project out of **Projects to Review** doesn't stop reviews of its repository. To stop them, leave the repository out of **Repositories to Review** too.

Project reviews and repository reviews differ in these ways:

|                                  | Project review                                                             | Repository review                                              |
| -------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Requires**                     | A Vercel project connected to the GitHub repository                        | The repository's GitHub account connected to your team         |
| **Code reviewed**                | The project's root directory                                               | The whole repository                                           |
| **Security policies**            | Team and project policies                                                  | Team policy only                                               |
| **Where findings appear**        | Under the project, and on the project's Vulnerabilities page               | Under the repository, in your team's Vulnerabilities dashboard |
| **Who can see findings**         | Owner, Member, Developer, and Security; Contributors for assigned projects | Owner, Member, Developer, and Security                         |
| **GitHub check and PR comments** | Yes                                                                        | Yes                                                            |

## How it works

Security Review runs automatically when code is pushed to a connected GitHub repository.

Reviews start when code is pushed, and every project from a single push event is reviewed together. Because reviews start from push events rather than pull requests, Security Review also covers direct pushes and force pushes to your production branch.

Each review compares the source against a base, so it covers what changed rather than your whole code repository:

- **Deployment reviews**: The base is the previous deployment of the branch, falling back to the GitHub API when no previous deployment exists.
- **Pull request reviews without a deployment**: The finding is tracked against the branch and pull request rather than a deployment.
- **Repository reviews**: The base is the branch's previous review, falling back to the parent of the pushed commit.
- **Monorepos**: Project reviews are scoped to each project's root directory. Repository reviews cover the whole repository.

When no base exists, such as a project's first review, the review reads the full source.

Security Review reports its findings to the [Vulnerabilities](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard and adds its own GitHub check to each commit it reviews. On a private or internal repository, when the commit is on a branch with an open pull request, Security Review also posts its findings as comments on that pull request, each linking to the finding.

## Managing reviews

Check out [Managing Security Reviews](/docs/agent/security-review/usage) for details on triaging findings, fixing them with Vercel Agent, writing security policies, and the roles and permissions required.

To triage findings from your terminal or an agent, use [`vercel security vulnerabilities`](/docs/cli/security#vulnerabilities) to list, inspect, dismiss, and reopen them.

## Pricing

Security Review uses provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. Reviews run per Git push event rather than per pull request, so cost scales with how often you push and how much code changed.

Repository reviews and project reviews cost the same. To stop reviews of repositories without a project, select **No repositories** under **Repositories to Review**. To stop all reviews, turn off **Review Changes Automatically**.

See [Vercel Agent pricing](/docs/agent/pricing) for complete rates and cost-tracking information.

## Privacy

Findings show snippets of your source code, including any confidential, personal, or sensitive data those snippets contain.

In the [Vulnerabilities](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard, the Owner, Member, Developer, and Security roles see findings for every project and repository, a Contributor sees only the projects assigned to them and no repository findings, and the Billing and Viewer roles see none. When Security Review posts a finding to a private or internal repository's pull request, anyone with access to that repository can read it, which can be a wider audience than the dashboard. On a public repository, Security Review posts only its check, which names what it reviewed and links to the Vulnerabilities dashboard, so an unpatched vulnerability isn't disclosed publicly, and the findings stay in the dashboard.

## Limitations

Security Review analyzes your code, not your running application. It isn't a security audit, and it doesn't perform runtime or penetration testing. It helps you find vulnerabilities but doesn't guarantee your application is free of them.

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
