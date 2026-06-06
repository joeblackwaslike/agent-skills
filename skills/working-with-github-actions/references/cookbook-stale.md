# Stale Issue and PR Management

Automatically marks old issues and PRs as stale, then closes issues that have
no activity after a grace period. PRs are flagged but never auto-closed—a
human must merge or close them.

---

## Workflow: `.github/workflows/stale.yml`

```yaml
name: Stale

on:
  schedule:
    - cron: '0 0 * * *'
  workflow_dispatch:

permissions:
  issues: write
  pull-requests: write

jobs:
  stale:
    name: Mark stale
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v9
        with:
          days-before-issue-stale: 60
          days-before-issue-close: 7
          days-before-pr-stale: 30
          days-before-pr-close: -1
          stale-issue-message: >
            This issue has been automatically marked as stale due to 60 days of
            inactivity. It will be closed in 7 days unless there is new activity.
          close-issue-message: >
            Closing due to inactivity. Please reopen if this is still relevant.
          stale-pr-message: >
            This PR has been automatically marked as stale due to 30 days of
            inactivity. It will not be auto-closed — please ping when ready to resume.
          exempt-issue-labels: 'pinned,security,in-progress'
          exempt-pr-labels: 'pinned,security,in-progress'
```

---

## Design decisions

### Daily schedule (`cron: '0 0 * * *'`)

Runs at midnight UTC every day. A daily cadence means the stale window is
accurate to within 24 hours without being noisy. Weekly would let stale issues
pile up unnoticed; more frequent than daily wastes API calls with no benefit.

### `workflow_dispatch`

Adds the "Run workflow" button in the Actions tab. Useful for triaging a
backlog immediately without waiting for the next midnight run, or for testing
the config after editing it.

### Issue timeline: 60 days stale → 7 days to close

Issues go stale after 60 days of no comments, no label changes, no commit
references. The 7-day close grace gives maintainers and reporters a window to
comment and reset the clock. The two-step model (`stale-issue-message` first,
then `close-issue-message` on actual close) gives two notification events so
nothing is silently deleted.

### PR timeline: 30 days stale, `days-before-pr-close: -1`

PRs stale faster than issues (30 days) because an open PR represents pending
work, not just a discussion. The `-1` value for `days-before-pr-close`
disables auto-close entirely for PRs. Merging or closing a PR is a
consequential action—it destroys in-progress work or signals rejection. A bot
should never do that unilaterally.

The stale message for PRs explicitly says "will not be auto-closed" so authors
are not surprised when their PR stays open.

### `exempt-issue-labels` and `exempt-pr-labels`

`pinned` — long-lived tracking issues (roadmaps, meta-issues) that should
never be closed.

`security` — vulnerability reports that must stay open until resolved,
regardless of activity.

`in-progress` — work that is actively being done but has quiet periods between
commits. Prevents labeling something stale when a contributor is mid-sprint.

The value is a comma-separated string (not a YAML list). `actions/stale@v9`
accepts either format, but the string form avoids YAML list formatting
mistakes.

### `>` YAML block scalar for messages

The `>` (folded scalar) collapses newlines into spaces at runtime, making it
readable in the YAML file while producing a single-paragraph message on GitHub.
Use `|` (literal scalar) if you need line breaks in the final message.

---

## Adjusting the windows

| Setting | Default here | When to change |
|---|---|---|
| `days-before-issue-stale` | 60 | Lower to 30 for high-volume repos; raise to 90 for low-traffic community repos |
| `days-before-issue-close` | 7 | Raise to 14 if your maintainers are part-time |
| `days-before-pr-stale` | 30 | Lower to 14 if PRs should be reviewed quickly |
| `days-before-pr-close` | -1 (disabled) | Keep at -1; do not auto-close PRs |

---

## Interaction with other workflows

If a stale issue gets a comment, `actions/stale` removes the `stale` label
automatically and resets the clock—no workflow change needed.

If you use the `labeler.yml` setup from this cookbook, the `stale` label
should not be listed there (it is applied by the stale bot, not by file
paths). Make sure `stale` is pre-created as a label in the repo
(`Settings → Labels`).

---

## Exempting a specific issue or PR

Add one of the exempt labels (`pinned`, `security`, `in-progress`) to the
issue or PR. The stale action will skip it on every future run until the label
is removed.

Alternatively, add a `stale-exempt-label` parameter to exempt a custom label
you already use:

```yaml
- uses: actions/stale@v9
  with:
    # ... existing config ...
    exempt-issue-labels: 'pinned,security,in-progress,wontfix'
    exempt-pr-labels: 'pinned,security,in-progress,do-not-merge'
```
