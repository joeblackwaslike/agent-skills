---
title: Managing Code Reviews
product: vercel
url: /docs/agent/pr-review/usage
canonical_url: "https://vercel.com/docs/agent/pr-review/usage"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/agent/pr-review
  - /docs/agent
related:
  - /docs/agent/pr-review
  - /docs/agent/pricing
summary: Customize which repositories get reviewed and track your review metrics and spending.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent/pr-review/usage.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "894e9a4d6ef1cd1b3ab4385f06a81898c78ce01740544e6753b29d49aa6589b0"
---

# Managing Code Reviews

Once you've [set up Code Review](/docs/agent/pr-review#how-to-set-up-code-review), you can customize settings and monitor performance on the [**Agent** page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent%2Ftasks\&title=Open+Vercel+Agent) in the dashboard. This is your central hub for managing which repositories get reviewed, tracking costs, and analyzing how reviews are performing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [On-demand Vercel Agent code reviews](https://vercel.com/changelog/on-demand-vercel-agent-code-reviews)
- [Introducing Vercel Security Review](https://vercel.com/blog/vercel-security-review)
- [Apply code suggestions from Vercel Agent with one click](https://vercel.com/changelog/apply-code-suggestions-from-vercel-agent-with-one-click)
- [AI code reviews by Vercel Agent now in Public Beta](https://vercel.com/changelog/ai-code-reviews-by-vercel-agent-now-in-beta)
- [Vercel Security Review now in public beta](https://vercel.com/changelog/vercel-security-review-public-beta)
- [Automatic build fix suggestions with Vercel Agent](https://vercel.com/changelog/automatic-build-fix-suggestions-with-vercel-agent)
- [Vercel CI](https://vercel.com/docs/ci) — Configure Vercel CI to run Turborepo tasks with custom CPU allocations and environment variables.
- [Deploying Git Repositories with Vercel](https://vercel.com/docs/git) — Vercel automatically deploys supported Git repositories on every branch push and when changes merge into the production
- [Enable or disable Vercel CI for a connected repository](https://vercel.com/docs/rest-api/vercel-ci/enable-or-disable-vercel-ci-for-a-connected-repository) — PATCH /v1/vercel-ci/repository-settings — Update Repository Settings
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/agent/pr-review/usage.graph.md](/docs/agent/pr-review/usage.graph.md)
<!-- /docsgraph:related -->

## Choose which repositories to review

You might want to control which repositories receive automatic reviews, especially when you're testing Code Review for the first time or managing costs across a large organization.

To choose which GitHub repositories get reviewed:

1. Open your team's **Settings**, then select **Agent**.
2. Under **Code Reviews**, find **Repositories to Review** and choose:
   - **All repositories** (default): Reviews every GitHub repository connected to your Vercel projects
   - **Public repositories only**: Only reviews public GitHub repositories
   - **Private repositories only**: Only reviews private GitHub repositories
3. Click **Save** to apply your changes.

These settings filter repositories by visibility, not by individual repository.

## Allow reviews on draft PRs

By default, Code Review skips draft pull requests since they're often work-in-progress. You can enable draft reviews if you want early feedback even on unfinished code.

To enable reviews on draft PRs:

1. Open your team's **Settings**, then select **Agent**.
2. Under **Code Reviews**, find **Include Draft PRs** and select **Review draft PRs**.
3. Click **Save** to apply your changes.

Draft reviews contribute to your Vercel Agent usage, but provide feedback earlier in your development process.

## Track spending and costs

Open **Agent**, then **Usage**, and find **Code Reviews** to view review costs for the selected date range. Recent reviews may take time to appear.

For detailed information about tracking usage and understanding cost breakdowns, see [Track costs and usage](/docs/agent/pricing#track-costs-and-usage).

## Track the suggestions

The **Code Reviews** section on **Agent** > **Usage** shows suggestion totals for the selected period and a **Suggestions** column for each review.

To view suggestion counts:

1. Select **Agent** in the dashboard, then open **Usage**.
2. Select a date range.
3. Under **Code Reviews**, check the **Suggestions** column for each review.

## Review Vercel Agent efficiency

Understanding how Code Review performs helps you optimize your setup and control usage.

The **Code Reviews** usage table shows:

| Column          | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| **Review**      | Repository, pull request number, and commit SHA, linked to the pull request |
| **Suggestions** | Number of suggestions for the review                                        |
| **Review Time** | How long the review took to complete                                        |
| **Cost**        | Total cost for the review                                                   |
| **Time**        | When the review occurred                                                    |

Use costs and review times to identify repositories or large pull requests that may benefit from different review settings or smaller, incremental changes.

## Export review metrics

You can export review usage for the selected period to CSV for analysis or reporting.

To export your data:

1. Select **Agent** in the dashboard, then open **Usage**.
2. Select a date range.
3. Under **Code Reviews**, click **Export CSV**.
4. Save the CSV file to your computer.

The CSV includes the time, repository, pull request, commit SHA, suggestions, cost, and review time in milliseconds. If the export reports too many reviews, select a shorter date range and try again.

## Turn off automatic Code Reviews

You can stop automatic reviews from the **Agent** page.

To turn off automatic Code Reviews:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent%2Ftasks\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Click the **…** button, and then select **Turn off automatic Code Reviews…**.
3. Confirm the action in the prompt that appears.

Once disabled, Code Review won't run automatically on new pull requests or new commits. To re-enable automatic reviews, open your team's **Settings** > **Agent**, turn on **Review PRs and build failures automatically**, and click **Save**.

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
