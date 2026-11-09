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
source: "https://vercel.com/docs/agent/security-review.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "c5d2154b1f87ae21028d7d207ba51626cb7b436c3f9c9387d6d25eb9cf484f5e"
---

# Security Review

> Vercel Security Review is available in Public Beta on Enterprise and Pro plans

Security Review is part of [Vercel Agent](/docs/agent). It scans your code for security vulnerabilities and reports what it finds in the [Vulnerabilities](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard.

It helps you find issues such as code injection, authorization bypass, and credential exposure before they reach your users.

## How to set up Security Review

To enable Security Review, navigate to the [**Agent**](/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fagent\&title=Go+to+Agent+settings) settings page.

1. In the **Security Reviews** section, turn on **Review Deployments Automatically**.
2. Under **Projects to Review**, choose which projects to review:
   - All projects (default)
   - Specific projects, up to 100
3. Click **Save** to confirm your settings.

Once you've enabled Security Review, it automatically reviews new code changes in the projects you selected, whether or not they come from a pull request.

> **💡 Note:** To fix findings with Vercel Agent, you also need **Enable Chat** turned on in
> the same settings page.

## How it works

Security Review runs automatically when code is pushed to a connected GitHub repository.

Reviews start when code is pushed, and every project from a single push event is reviewed together. Because reviews start from push events rather than pull requests, Security Review also covers direct pushes and force pushes to your production branch.

Each review compares the source against a base, so it covers what changed rather than your whole code repository:

- **Deployment reviews**: The base is the previous deployment of the branch, falling back to the GitHub API when no previous deployment exists.
- **Pull request reviews without a deployment**: The finding is tracked against the branch and pull request rather than a deployment.
- **Monorepos**: Reviews are scoped to each project's root directory.

When no base exists, such as a project's first review, the review reads the full source.

Security Review reports its findings to the [Vulnerabilities](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard and adds its own GitHub check to each commit it reviews. On a private or internal repository, when the commit is on a branch with an open pull request, Security Review also posts its findings as comments on that pull request, each linking to the finding.

## Managing reviews

Check out [Managing Security Reviews](/docs/agent/security-review/usage) for details on triaging findings, fixing them with Vercel Agent, writing security policies, and the roles and permissions required.

To triage findings from your terminal or an agent, use [`vercel security vulnerabilities`](/docs/cli/security#vulnerabilities) to list, inspect, dismiss, and reopen them.

## Pricing

Security Review uses provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. Reviews run per Git push event rather than per pull request, so cost scales with how often you push and how much code changed.

See [Vercel Agent pricing](/docs/agent/pricing) for complete rates and cost-tracking information.

## Privacy

Findings show snippets of your source code, including any confidential, personal, or sensitive data those snippets contain.

In the [Vulnerabilities](/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity%2Fvulnerabilities\&title=Open+Vulnerabilities) dashboard, the Owner, Member, Developer, and Security roles see findings for every project, a Contributor sees only the projects assigned to them, and the Billing and Viewer roles see none. When Security Review posts a finding to a private or internal repository's pull request, anyone with access to that repository can read it, which can be a wider audience than the dashboard. On a public repository, Security Review posts only its check, which names what it reviewed and links to the Vulnerabilities dashboard, so an unpatched vulnerability isn't disclosed publicly, and the findings stay in the dashboard.

## Limitations

Security Review analyzes your code, not your running application. It isn't a security audit, and it doesn't perform runtime or penetration testing. It helps you find vulnerabilities but doesn't guarantee your application is free of them.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
