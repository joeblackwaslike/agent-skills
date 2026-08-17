---
title: Managing Code Reviews
product: vercel
url: /docs/agent/pr-review/usage
canonical_url: "https://vercel.com/docs/agent/pr-review/usage"
last_updated: 2026-06-26
type: integration
prerequisites:
  - /docs/agent/pr-review
  - /docs/agent
related:
  - /docs/agent/pr-review
  - /docs/agent/pricing
summary: Customize which repositories get reviewed and track your review metrics and spending.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/pr-review/usage.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7359f3757721f59baf9969179aff14138b82831552d0d52595747559eb686f74"
---

# Managing Code Reviews

Once you've [set up Code Review](/docs/agent/pr-review#how-to-set-up-code-review), you can customize settings and monitor performance from the [Agent section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent) in your dashboard. This is your central hub for managing which repositories get reviewed, tracking costs, and analyzing how reviews are performing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review?from=related) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Ship a GitHub code review bot with Hono and Redis](https://vercel.com/kb/guide/ship-a-github-code-review-bot-with-hono-and-redis?from=related) — This guide walks through building a GitHub bot that reviews pull requests on demand. When a user @mentions the bot on a
- [Installation](https://vercel.com/docs/agent/installation?from=related) — Let AI automatically install Web Analytics and Speed Insights in your app
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Bitbucket](https://vercel.com/docs/git/vercel-for-bitbucket?from=related) — ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and
- [Observability and Spend](https://vercel.com/docs/ai-gateway/observability-and-spend?from=related) — Monitor AI Gateway requests and manage spend: observability, custom reporting, usage and billing APIs, and spending budg

Full cross-link map for this page: [/docs/agent/pr-review/usage.graph.md](/docs/agent/pr-review/usage.graph.md)
<!-- /docsgraph:related -->

## Choose which repositories to review

You might want to control which repositories receive automatic reviews, especially when you're testing Code Review for the first time or managing costs across a large organization.

To choose which repositories get reviewed:

1. Go to the [Agent section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent) in your dashboard.
2. Click the **…** button, and then select **Settings** to view the Vercel Agent settings.
3. Under **Repositories**, choose which repositories to review:
   - **All repositories** (default): Reviews every repository connected to your Vercel projects
   - **Public only**: Only reviews publicly accessible repositories
   - **Private only**: Only reviews private repositories
4. Click **Save** to apply your changes.

These settings help you start small with specific repos or focus on the repositories that matter most to your team.

## Allow reviews on draft PRs

By default, Code Review skips draft pull requests since they're often work-in-progress. You can enable draft reviews if you want early feedback even on unfinished code.

To enable reviews on draft PRs:

1. Go to the [Agent section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent) in your dashboard.
2. Click the **…** button, and then select **Settings** to view the Vercel Agent settings.
3. Under **Review Draft PRs**, select **Review draft PRs**.
4. Click **Save** to apply your changes.

Enabling this setting means you'll use credits on drafts, but you'll get feedback earlier in your development process.

## Track spending and costs

You can monitor your spending in real time to manage your budget. The Agent tab shows the cost of each review and your total spending over a given period.

For detailed information about tracking costs, viewing your credit balance, and understanding cost breakdowns, see the [cost tracking section in the pricing docs](/docs/agent/pricing#track-costs-and-spending).

## Track the suggestions

The Agent tab also shows you the total number of suggestions over a given period, as well as the number of suggestions for each individual review.

To view suggestions:

1. Go to the [Agent tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent).
2. Check the **Suggestions** column for each review.

A high number of suggestions might indicate complex changes or code that needs more attention. A low number might mean your code is already following best practices, or the changes are straightforward.

## Review agent efficiency

Understanding how Code Review performs helps you optimize your setup and get the most value from your credits.

The Agent tab provides several metrics for each review:

- **Repository**: Which repository was reviewed
- **PR**: The pull request identifier (click to view the PR)
- **Suggestions**: Number of code changes recommended
- **Review time**: How long the review took to complete
- **Files read**: Number of files the AI analyzed
- **Spend**: Total cost for that review
- **Time**: When the review occurred

Use this data to identify patterns:

- **Expensive reviews**: If certain repositories consistently have high costs, consider whether they need special handling or different review settings
- **Long review times**: Reviews taking longer than expected might indicate complex codebases or large PRs that could benefit from smaller, incremental changes
- **High file counts**: Repositories with many files analyzed might benefit from more focused review scopes

## Export review metrics

You can export all your review data to CSV for deeper analysis, reporting, or tracking trends over time.

To export your data:

1. Go to the [Agent tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent).
2. Click the **Export** button.
3. Save the CSV file to your computer.

The exported data includes all metrics from the dashboard, letting you:

- Create custom reports for your team or stakeholders
- Analyze trends across multiple repositories
- Calculate ROI by comparing review costs to time saved
- Track adoption and usage patterns over time

## Disable Vercel Agent

If you need to turn off Vercel Agent completely, you can disable it from the Agent tab. This stops all reviews across all repositories.

To disable Vercel Agent:

1. Go to the [Agent section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent\&title=Open+Vercel+Agent) in your dashboard.
2. Click the **…** button, and then select **Disable Vercel Agent**.
3. Confirm the action in the prompt that appears.

Once disabled, Code Review won't run on any new pull requests. You can re-enable Vercel Agent at any time from the same menu.


---

[View full sitemap](/docs/sitemap)
