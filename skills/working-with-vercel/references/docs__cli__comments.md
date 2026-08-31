---
title: vercel comments
product: vercel
url: /docs/cli/comments
canonical_url: "https://vercel.com/docs/cli/comments"
last_updated: 2026-08-19
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/comments
  - /docs/vercel-toolbar
  - /docs/comments/using-comments
  - /docs/cli
summary: Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/comments.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "a81aedcc35d194ba4161989374d8d53c6cb7c4843131bcfe61a18f10cc9d6f1e"
---

# vercel comments

> **🔒 Permissions Required**: The vercel comments command


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli?from=related&source_path=%2Fdocs%2Fcli%2Fcomments&source_site=vercel-docs&relationship=related)
- [Integrations for Comments](https://vercel.com/docs/comments/integrations?from=related&source_path=%2Fdocs%2Fcli%2Fcomments&source_site=vercel-docs&relationship=related) — Learn how Comments integrates with Git providers like GitHub, GitLab, and BitBucket, as well as the Vercel app for Slack
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fcomments&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Managing Comments on Preview Deployments](https://vercel.com/docs/comments/managing-comments?from=related&source_path=%2Fdocs%2Fcli%2Fcomments&source_site=vercel-docs&relationship=related) — Learn how to manage Comments on your Preview Deployments from Team members and invited collaborators.
- [Enabling and Disabling Comments](https://vercel.com/docs/comments/how-comments-work?from=related&source_path=%2Fdocs%2Fcli%2Fcomments&source_site=vercel-docs&relationship=related) — Learn when and where Comments are available, and how to enable and disable Comments at the account, project, and session
- [vercel connect](https://vercel.com/docs/cli/connect?from=related&source_path=%2Fdocs%2Fcli%2Fcomments&source_site=vercel-docs&relationship=related) — Learn how to manage Vercel Connect connectors using the vercel connect CLI command.

Full cross-link map for this page: [/docs/cli/comments.graph.md](/docs/cli/comments.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fcomments&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The `vercel comments` command lets you review and manage existing [Vercel Toolbar Comments](/docs/comments) from the terminal. You can list, inspect, reply to, resolve, reopen, and open threads, as well as edit or delete their messages. Use the [Vercel Toolbar](/docs/vercel-toolbar) to create new comment threads.

## Usage

```bash filename="terminal"
vercel comments [subcommand]
```

*Manage comments for a project. Without a subcommand, \`vercel comments\` runs
\`list\`.*

## Scope and thread identifiers

The `list` command uses the linked project and filters by the current Git branch when it can infer one. Pass `--project` to select another project. Branch inference applies only when that project matches the current checkout. Use `--branch` or `--all-branches` to set the branch scope explicitly.

Commands that act on a thread accept its ID or full `vercel.com` comment URL. The URL's team is used unless you pass `--scope` or `--project`.

## Common options

These options apply across the `vercel comments` command:

| Option                       | Type    | Description                                                                   |
| ---------------------------- | ------- | ----------------------------------------------------------------------------- |
| `-p, --project <NAME_OR_ID>` | String  | Select project and team context by project name or ID.                        |
| `-F, --format <FORMAT>`      | String  | Set the output format to `json`. Available on every subcommand except `open`. |
| `--json`                     | Boolean | Output JSON. Available on every subcommand except `open`.                     |

## Commands

### list (ls)

`vercel comments list` lists unresolved comments by default. Because `list` is the default subcommand, you can omit it. The `ls` alias is also supported.

```bash filename="terminal"
vercel comments
vercel comments --all-branches --status all
vercel comments --scope my-team --project my-project --branch main
```

*Vercel CLI prints each thread's ID, age, author, page path, excerpt, and reply
summary.*

#### Options

| Option                | Type    | Default                      | Description                                                                                                                             |
| --------------------- | ------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `--branch <BRANCH>`   | String  | Current branch when inferred | Filter by a Git branch. Repeat for multiple branches.                                                                                   |
| `--all-branches`      | Boolean | `false`                      | Include every branch. You can't combine this option with `--branch`.                                                                    |
| `--status <STATUS>`   | String  | `unresolved`                 | Filter by `unresolved`, `resolved`, or `all`.                                                                                           |
| `--page <PATH>`       | String  | None                         | Filter by a recorded page path or glob. Repeat for multiple paths. Rewrites can cause the recorded path to differ from the browser URL. |
| `--author <USER>`     | String  | None                         | Filter by a user ID or `me`. Repeat for multiple authors. `me` requires user authentication, and usernames are not supported.           |
| `--content-id <ID>`   | String  | None                         | Filter by a content management system (CMS) content ID. Repeat for multiple IDs.                                                        |
| `--search <TEXT>`     | String  | None                         | Search comment content.                                                                                                                 |
| `--limit <NUMBER>`    | Number  | `20`                         | Return 1 to 100 threads per page.                                                                                                       |
| `-N, --next <CURSOR>` | String  | None                         | Show the next page using the cursor from the previous output.                                                                           |

When another page is available, text output includes the `--next` command with the next cursor. JSON output returns the cursor as `pagination.nextCursor`.

### inspect (get)

`vercel comments inspect` shows every message in a thread and its message ID. Pass the message ID to `edit` or `delete`.

```bash filename="terminal"
vercel comments inspect [thread]
vercel comments inspect <thread> --context
```

If you omit `[thread]` in an interactive terminal, Vercel CLI lets you choose from unresolved comments for the linked project, filtered by the current branch when it can infer one. Pass `--context` to include framework and device details.

### open

`vercel comments open` opens a comment thread on `vercel.com` in your default browser.

```bash filename="terminal"
vercel comments open <thread>
```

### reply

`vercel comments reply` adds a Markdown reply to an existing thread. Provide the reply with `--message`, `--file`, or standard input.

```bash filename="terminal"
vercel comments reply <thread> -m 'Fixed in **main**.'
vercel comments reply <thread> --file ./reply.md
git log -1 --format=%s | vercel comments reply <thread>
```

*A successful reply prints a confirmation with the thread ID. JSON output
returns the created message object.*

#### Options

| Option                 | Type   | Description                                                                                                    |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------------------------- |
| `-m, --message <TEXT>` | String | Add Markdown message content.                                                                                  |
| `--file <PATH>`        | String | Read Markdown content from a file. Use `-` for standard input. You can't combine this option with `--message`. |
| `--attach <URL>`       | String | Attach a file by HTTPS URL. Repeat to attach up to 10 files. Local file uploads are not supported.             |

When an interactive terminal receives no content options or piped input, Vercel CLI prompts for a one-line message. Attachments can form a reply without message text.

### resolve and reopen

`vercel comments resolve` resolves threads, while `vercel comments reopen` marks resolved threads as unresolved. Both subcommands accept one or more thread IDs or URLs.

```bash filename="terminal"
# Resolve one thread
vercel comments resolve <thread>

# Add a closing reply, then resolve the thread
vercel comments resolve <thread> -m 'Fixed in the latest deployment.'

# Reopen multiple threads without a confirmation prompt
vercel comments reopen <thread-1> <thread-2> --yes
```

For multiple threads, Vercel CLI asks for confirmation in an interactive terminal. Pass `--yes` in non-interactive or JSON mode. You can add a closing reply with `--message` only when resolving one thread.

#### Options

| Option                 | Type    | Applies to | Description                                                                                     |
| ---------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------- |
| `-m, --message <TEXT>` | String  | `resolve`  | Add a closing reply before resolving one thread. This option does not support multiple threads. |
| `-y, --yes`            | Boolean | Both       | Skip the confirmation prompt for multiple threads.                                              |

Bulk operations continue after an individual thread fails and exit with a nonzero status if any operation fails.

### edit

`vercel comments edit` replaces the Markdown content of a message. Run `vercel comments inspect <thread>` to find message IDs.

```bash filename="terminal"
vercel comments edit <thread> <message-id> -m 'Updated wording'
vercel comments edit <thread> <message-id> --file ./updated-reply.md
```

Pass the new Markdown content with `--message` or `--file`. You can't combine these options. Editing message content preserves existing attachments.

### delete

`vercel comments delete` removes a message from a thread. Run `vercel comments inspect <thread>` to find message IDs.

```bash filename="terminal"
vercel comments delete <thread> <message-id>
vercel comments delete <thread> <message-id> --yes
```

Deletion cannot be undone. The command asks for confirmation by default. Pass `--yes` in non-interactive or JSON mode.

## JSON output

Use `--json` or `--format json` with any subcommand except `open`. JSON output does not prompt for missing input or confirmation.

```bash filename="terminal"
vercel comments --json | jq '.threads[].id'
vercel comments inspect <thread> --format json
```

JSON responses use the following shapes:

| Command                                      | Output                                                                  |
| -------------------------------------------- | ----------------------------------------------------------------------- |
| `list`                                       | An object with `scope`, `filters`, `pagination`, and `threads`.         |
| `inspect`                                    | The thread object with the complete `messages` array.                   |
| `reply` and `edit`                           | The created or updated message object.                                  |
| `resolve` and `reopen` with one thread       | An object with `thread` and `replied`.                                  |
| `resolve` and `reopen` with multiple threads | An object with a `results` array containing the result for each thread. |
| `delete`                                     | An object containing the deleted message `id`.                          |

Validation and API errors in JSON mode return an `error` object with `code` and `message` fields and a nonzero exit status.

## Related

- [Comments overview](/docs/comments)
- [Using Comments](/docs/comments/using-comments)
- [Vercel CLI overview](/docs/cli)


---

[View full sitemap](/docs/sitemap)
