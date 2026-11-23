---
title: Code Review
product: vercel
url: /docs/agent/pr-review
canonical_url: "https://vercel.com/docs/agent/pr-review"
last_updated: 2026-09-18
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/agent
  - /docs/sandbox
  - /docs/agent/chat
  - /docs/agent/chat/github
  - /docs/rbac/access-roles
summary: Get automatic AI-powered code reviews on your pull requests
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/pr-review.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "9514184c5ec3e315adc2a3e72b9288ce2ba640eae037bd3efc0f2ab40f060fee"
---

# Code Review

> Vercel Agent Code Review is available in Public Beta on Enterprise and Pro plans

Code Review is part of [Vercel Agent](/docs/agent). It reviews GitHub pull requests for bugs, security vulnerabilities, and performance issues.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [Vercel Agent code reviews now follow your code guidelines](https://vercel.com/changelog/vercel-agent-code-reviews-now-follow-your-code-guidelines)
- [How to keep your storefront running through Black Friday](https://vercel.com/kb/guide/black-friday-reliability) — Learn how to tune alerts, bot rules, and spend limits. Rehearse rollback so your team can recover quickly from checkout
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly) — A detailed guide to Vercel vs Fastly: full-stack application platform vs CDN infrastructure layer, covering framework su
- [Introducing Vercel Security Review](https://vercel.com/blog/vercel-security-review)
- [Vercel Security Review now in public beta](https://vercel.com/changelog/vercel-security-review-public-beta)
- [AI code reviews by Vercel Agent now in Public Beta](https://vercel.com/changelog/ai-code-reviews-by-vercel-agent-now-in-beta)
- [On-demand Vercel Agent code reviews](https://vercel.com/changelog/on-demand-vercel-agent-code-reviews)
- [Apply code suggestions from Vercel Agent with one click](https://vercel.com/changelog/apply-code-suggestions-from-vercel-agent-with-one-click)
- [Vercel CI](https://vercel.com/docs/ci) — Configure Vercel CI to run Turborepo tasks with custom CPU allocations and environment variables.

Full cross-link map for this page: [/docs/agent/pr-review.graph.md](/docs/agent/pr-review.graph.md)
<!-- /docsgraph:related -->

Vercel Agent inspects code and prepares suggested fixes in [secure sandboxes](/docs/sandbox). Review comments link to suggested fixes in the Vercel dashboard.

## How to set up Code Review

To enable code reviews for GitHub repositories connected to your Vercel projects:

1. Open your team's **Settings**, then select **Agent**.
2. Under **Code Reviews**, turn on **Review PRs and build failures automatically**.
3. Under **Repositories to Review**, choose which repositories to review:
   - **All repositories** (default)
   - **Public repositories only**
   - **Private repositories only**
4. Under **Include Draft PRs**, select whether to:
   - **Skip draft PRs** (default)
   - **Review draft PRs**
5. Click **Save** to confirm your settings.

Once you've set up Code Review, it automatically reviews eligible pull requests in connected GitHub repositories that match your settings.

## How it works

Code Review runs automatically when:

- You open or reopen a pull request
- You push commits to an open pull request
- You mark a draft pull request ready for review, if draft reviews are disabled

If you enable draft reviews, Code Review also reviews draft pull requests when you open them or push commits. Code Review skips pull requests authored by Dependabot and Renovate.

Code Review starts from the pull request diff and reads relevant surrounding code to understand the changes. Reviews can cover source code, tests, configuration, and documentation.

Vercel Agent can run focused tests and type checks in the sandbox to investigate issues and validate suggested fixes.

Findings appear as GitHub review comments with links to suggested fixes in the Vercel dashboard. Review the proposed changes before applying them.

## Using Vercel Agent in GitHub

To ask questions about a repository or request a code change, use [Vercel Agent Chat](/docs/agent/chat). See [GitHub Operations](/docs/agent/chat/github) for supported repository actions.

## Code guidelines

Code Review uses your repository's conventions as context when evaluating changes. The reviewer reads relevant contributor guidance, such as `AGENTS.md`, `CLAUDE.md`, and `CONTRIBUTING.md`, for areas affected by the diff.

Focus your guidelines on project-specific conventions:

- Code style preferences not enforced by linters
- Architecture patterns and design decisions
- Common pitfalls specific to your project
- Testing requirements and patterns

Guidelines are treated as context, not instructions. The reviewer's core behavior (identifying bugs, security issues, and performance problems) takes precedence over any conflicting guideline content.

## Roles and permissions

What you can do with Code Review suggestions in the Vercel dashboard depends on your [team role](/docs/rbac/access-roles).

| Action                      | Roles                                                 |
| --------------------------- | ----------------------------------------------------- |
| View suggestions            | Any team role with access to all projects in the team |
| Apply or ignore suggestions | Owner, Member, Developer                              |

For Contributors, viewing suggestions requires access to every project in the team.

## Managing reviews

Check out [Managing Reviews](/docs/agent/pr-review/usage) for details on how to customize which repositories get reviewed and monitor your review metrics and spending.

## Pricing

Code Review uses provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. The cost varies based on the complexity of the changes and the amount of code Vercel Agent analyzes.

See [Vercel Agent pricing](/docs/agent/pricing) for complete rates and cost-tracking information.

## Privacy

Code Review suggestions can include snippets of your source code, including any confidential, personal, or sensitive data those snippets contain.

In the Vercel dashboard, access to suggestions follows the [roles and permissions](#roles-and-permissions) above. Anyone with access to the GitHub repository can read review comments, which can be a wider audience than the dashboard. On public repositories, those comments are public.

Code Review never trains on customer code if your Vercel team's [data preferences setting](https://vercel.fyi/team-data-preferences) is "off" or you are on an [Enterprise plan](/docs/plans/enterprise).

## Limitations

Code Review can miss issues or suggest incorrect changes. Review suggested fixes before applying them, and test the changes before merging. Code Review complements human review and testing.

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
