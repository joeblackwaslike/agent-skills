---
source: "https://cursor.com/docs/agent/agent-review.md"
fetched_at: "2026-06-15T05:54:54.284Z"
sha256: "ca27ca033c0d14178c5d8cc091e7c0efb1a6aa7d697307183a35adf6edaec048"
---

# Agent Review

Agent Review runs a dedicated code review on your local changes from inside Cursor.

## Setup

To configure Agent Review:

1. Open **Cursor Settings**
2. Go to **Agents**
3. Find **Agent Review** and configure your preferences

Agent Review also reads repository rules from `BUGBOT.md` files. To set up these rule files, see [BugBot docs](https://cursor.com/docs/bugbot.md).

You can set it to run automatically after every agent task, or leave it manual and trigger it yourself.

## Running a review

There are three ways to start a review:

- **Automatic**: When enabled in settings, Agent Review runs after every commit is made.
- **Slash command**: Type `/agent-review` in the agent window input to trigger a review on demand.
- **Source Control tab**: Open the Source Control tab and run Agent Review to compare all local changes against your main branch. This catches issues across your full set of changes, not only the latest edit.

[Media](https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/changelog/changelog-2-1-1.mp4)

## Review depth

Agent Review supports two depth levels. Choose based on the thoroughness of review you need.

| Depth     | Speed | Cost | Best for                                                   |
| :-------- | :---- | :--- | :--------------------------------------------------------- |
| **Quick** | Fast  | Low  | Small diffs, formatting changes, or a fast sanity check    |
| **Deep**  | Slow  | High | Complex logic, security-sensitive code, or large refactors |


---

## Sitemap

[Overview of all docs pages](/llms.txt)
