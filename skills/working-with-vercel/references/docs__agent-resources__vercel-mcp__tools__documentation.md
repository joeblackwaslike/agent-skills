---
title: Documentation, CLI, and Feedback
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/documentation
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/cli/feedback
summary: Find documentation, use the CLI, and share feedback with Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c9cadb1ca4093de5cb13d28b77853af9e070a2c46b9340d4a68929247ab03b3c"
---

# Documentation, CLI, and Feedback

Find Vercel documentation for a task and get guidance on the Vercel CLI commands to use. These tools help you configure or deploy your projects and share feedback with Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Send feedback from the Vercel MCP](https://vercel.com/changelog/send-feedback-from-vercel-mcp)
- [Send feedback from the Vercel CLI](https://vercel.com/changelog/send-feedback-from-vercel-cli)
- [vercel comments](https://vercel.com/docs/cli/comments) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Integrations for Comments](https://vercel.com/docs/comments/integrations) — Learn how Comments integrates with Git providers like GitHub, GitLab, and Bitbucket, as well as the Vercel app for Slack
- [vercel security](https://vercel.com/docs/cli/security) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and scope t

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation.graph.md)
<!-- /docsgraph:related -->

## `search_vercel_documentation`

Search Vercel documentation for specific topics and information.

| Parameter | Type   | Required | Default | Description                                                                    |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------ |
| `topic`   | string | Yes      | -       | Topic to focus the documentation search on (e.g., 'routing', 'data-fetching'). |
| `tokens`  | number | No       | `2500`  | Maximum number of tokens to include in the result.                             |

**Sample prompt:** "How do I configure custom domains in Vercel?"

## `use_vercel_cli`

This tool is available through the `https://mcp.vercel.com/cli/mcp` connection.

Instructs the LLM to use Vercel CLI commands with --help flag for information.

| Parameter | Type   | Required | Default | Description                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------- |
| `command` | string | No       | -       | Specific Vercel CLI command to run.         |
| `action`  | string | Yes      | -       | What you want to accomplish with Vercel CLI |

**Sample prompt:** "Help me deploy this project using Vercel CLI"

## `submit_feedback`

Send feedback to Vercel when you want to report a problem or suggest an improvement. This tool requires sign-in and is available on root and project-specific connections when enabled for your account. The documentation-only and CLI-only connections don't expose it.

| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `message` | string | Yes | - | Your feedback. Must contain non-whitespace text. |
| `context` | object | No | - | Relevant details, such as the affected tool and expected behavior. |

**Sample prompt:** "Send Vercel feedback that the deployment error should explain which environment variable is missing."

For example, call `submit_feedback` with:

```json
{
  "message": "Please name the missing environment variable in deployment errors.",
  "context": {
    "tool": "deploy_to_vercel",
    "expected": "An error that identifies the missing variable."
  }
}
```

The tool returns:

```json
{
  "success": true,
  "message": "Vercel accepted the feedback."
}
```

Acceptance confirms that the feedback endpoint accepted the submission. It doesn't guarantee delivery to every internal destination or a response from Vercel.

## Privacy and limits

Send feedback only when you intend to share it with Vercel. Include relevant details, and leave out credentials, secrets, and full conversations. Vercel applies automatic redaction before forwarding feedback internally.

The tool attaches the MCP server version and your OAuth client ID, plus your user ID when available. It also includes the team and project IDs when you use a project-specific connection. Vercel records the source as `MCP`. Your complete submission must be smaller than 1 MiB.

If authentication fails before anything is sent, the error includes a CLI fallback. Use [`vercel feedback`](/docs/cli/feedback) with Vercel CLI 64.5.0 or newer to send the same message. To preserve optional context, pass it as a JSON string with `--field 'context={...}'`. CLI submissions use the `CLI` source and CLI metadata.

If the error says the feedback service is unavailable and nothing was submitted, try again later. The tool doesn't offer a CLI fallback for this service failure.

If a request times out or returns an uncertain outcome, it may already have reached Vercel. The error won't offer a CLI fallback. Submitting again, including through `vercel feedback`, can create a duplicate. Decide whether to send another copy. If you reach a rate limit, wait before trying again.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
