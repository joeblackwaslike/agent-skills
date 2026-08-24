---
title: Code Review
product: vercel
url: /docs/agent/pr-review
canonical_url: "https://vercel.com/docs/agent/pr-review"
last_updated: 2026-06-30
type: how-to
prerequisites:
  - /docs/agent
related:
  - /docs/agent
  - /docs/sandbox
  - /docs/git
  - /docs/agent/pr-review/usage
  - /docs/agent/pricing
summary: Get automatic AI-powered code reviews on your pull requests
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/pr-review.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "73375a0fcbde324fb410e61c2cad32073f45d447fd7348c554ecf9ab166c8439"
---

# Code Review

> **🔒 Permissions Required**: Vercel Agent Code Review


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review?from=related) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Installation](https://vercel.com/docs/agent/installation?from=related) — Let AI automatically install Web Analytics and Speed Insights in your app
- [Bitbucket](https://vercel.com/docs/git/vercel-for-bitbucket?from=related) — ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and
- [Vercel Plugin](https://vercel.com/docs/agent-resources/vercel-plugin?from=related) — Install the Vercel plugin to give supported AI coding tools Vercel context, skills, specialist agents, slash commands, a
- [Investigation](https://vercel.com/docs/agent/investigation?from=related) — Let AI investigate your error alerts to help you debug faster
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

Full cross-link map for this page: [/docs/agent/pr-review.graph.md](/docs/agent/pr-review.graph.md)
<!-- /docsgraph:related -->

Code Review is part of [Vercel Agent](/docs/agent). It provides Sandbox-validated suggestions on your pull requests as one capability within the broader Vercel Agent.

It generates patches and runs them in [secure sandboxes](/docs/sandbox) with your real builds, tests, and linters to validate fixes before suggesting them. Only validated suggestions that pass these checks appear in your PR, allowing you to apply specific code changes with one click.

## How to set up Code Review

To enable code reviews for your [repositories](/docs/git#supported-git-providers), navigate to the
[**Agent**](/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) of the dashboard.

1. Click **Enable** to turn on Vercel Agent.
2. Under **Repositories**, choose which repositories to review:
   - All repositories (default)
   - Public only
   - Private only
3. Under **Review Draft PRs**, select whether to:
   - Skip draft PRs (default)
   - Review draft PRs
4. Optionally, configure **Auto-Recharge** to keep your balance topped up automatically:
   - Set the threshold for **When Balance Falls Below**
   - Set the amount for **Recharge To Target Balance**
   - Optionally, add a **Monthly Spending Limit**
5. Click **Save** to confirm your settings.

Once you've set up Code Review, it will automatically review pull requests in repositories connected to your Vercel projects.

## How it works

Code Review runs automatically when:

- A pull request is created
- A batch of commits is pushed to an open PR
- A draft PR is created, if you've enabled draft reviews in your settings

When triggered, Code Review analyzes all human-readable files in your codebase, including:

- Source code files (JavaScript, TypeScript, Python, etc.)
- Test files
- Configuration files (`package.json`, YAML files, etc.)
- Documentation (markdown files, README files)
- Comments within code

The AI uses your entire codebase as context to understand how your changes fit into the larger system.

Code Review then generates patches, runs them in [secure sandboxes](/docs/sandbox), and executes your real builds, tests, and linters. Only validated suggestions that pass these checks appear in your PR.

## Using Vercel Agent in GitHub

Beyond automatic reviews, you can interact with Vercel Agent on demand by mentioning `@vercel` in any pull request comment. Vercel Agent will read your comment and either generate a suggested fix (which you can review and apply) or reply to your question in the same thread.

Comment `@vercel` followed by your request:

- `@vercel run a review` runs a full code review
- `@vercel fix the type errors` implements and commits a fix
- `@vercel why is this failing?` investigates the issue

Replies appear in the same comment thread.

## Code guidelines

Code Review automatically detects and applies coding guidelines from your repository. When guidelines are found, they're used during review to ensure feedback aligns with your project's conventions.

### Supported guideline files

Code Review looks for these files in priority order (highest to lowest):

| File                                     | Description                       |
| ---------------------------------------- | --------------------------------- |
| `AGENTS.md`                              | OpenAI Codex / universal standard |
| `CLAUDE.md`                              | Claude Code instructions          |
| `.github/copilot-instructions.md`        | GitHub Copilot                    |
| `.cursor/rules/*.mdc`                    | Cursor rules                      |
| `.cursorrules`                           | Cursor (legacy)                   |
| `.windsurfrules`                         | Windsurf                          |
| `.windsurf/rules/*.md`                   | Windsurf (directory)              |
| `.clinerules`                            | Cline                             |
| `.github/instructions/*.instructions.md` | GitHub Copilot workspace          |
| `.roo/rules/*.md`                        | Roo Code                          |
| `.aiassistant/rules/*.md`                | JetBrains AI Assistant            |
| `CONVENTIONS.md`                         | Aider                             |
| `.rules/*.md`                            | Generic rules                     |
| `agent.md`                               | Generic agent file                |

When multiple guideline files exist in the same directory, the highest-priority file is used.

### How guidelines are applied

- **Hierarchical**: Guidelines from parent directories are inherited. A `CLAUDE.md` at the root applies to all files, while a `src/components/CLAUDE.md` adds additional context for that directory.
- **Scoped**: Guidelines only affect files within their directory subtree. A guideline in `src/` won't apply to files in `lib/`.
- **Nested references**: Guidelines can reference other files using `@import "file.md"` or relative markdown links. Referenced files are automatically included as context.
- **Size limit**: Guidelines are capped at 50 KB total.

### Writing effective guidelines

Guidelines should focus on project-specific conventions that help the reviewer understand your codebase:

- Code style preferences not enforced by linters
- Architecture patterns and design decisions
- Common pitfalls specific to your project
- Testing requirements and patterns

Guidelines are treated as context, not instructions. The reviewer's core behavior (identifying bugs, security issues, and performance problems) takes precedence over any conflicting guideline content.

## Managing reviews

Check out [Managing Reviews](/docs/agent/pr-review/usage) for details on how to customize which repositories get reviewed and monitor your review metrics and spending.

## Pricing

Code Review uses provider inference at the underlying token rate with no markup, plus the Vercel Token Rate of $0.25 per million tokens. The cost varies based on the complexity of the changes and the amount of code Vercel Agent analyzes.

See [Vercel Agent pricing](/docs/agent/pricing) for complete rates and cost-tracking information.

## Privacy

Code Review never trains on customer code if your Vercel team's [data preferences setting](https://vercel.fyi/team-data-preferences) is "off" or you are on an [Enterprise plan](/docs/plans/enterprise).


---

[View full sitemap](/docs/sitemap)
