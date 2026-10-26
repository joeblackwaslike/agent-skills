---
title: submit_feedback
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/documentation/submit_feedback
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/submit_feedback"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/documentation
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/cli/feedback
summary: Send feedback about Vercel or its MCP tools.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/submit_feedback.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f7d758e068a132d7ffe3c436c59f483294f916424210febf0a4b5d8fabe0c8d0"
---

# submit_feedback

Send feedback to Vercel when you want to report a problem or suggest an improvement. This tool requires sign-in and is available on root and project-specific connections when enabled for your account. The documentation-only and CLI-only connections don't expose it.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Send feedback from the Vercel MCP](https://vercel.com/changelog/send-feedback-from-vercel-mcp)
- [Send feedback from the Vercel CLI](https://vercel.com/changelog/send-feedback-from-vercel-cli)
- [vercel comments](https://vercel.com/docs/cli/comments) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.
- [Integrations for Comments](https://vercel.com/docs/comments/integrations) — Learn how Comments integrates with Git providers like GitHub, GitLab, and Bitbucket, as well as the Vercel app for Slack
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Support Center](https://vercel.com/docs/support-center) — Learn how to communicate securely with the Vercel support team
- [Form Submissions](https://vercel.com/docs/botid/form-submissions) — How to properly handle form submissions with BotID protection

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/documentation/submit_feedback.graph.md](/docs/agent-resources/vercel-mcp/tools/documentation/submit_feedback.graph.md)
<!-- /docsgraph:related -->

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
