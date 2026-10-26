---
title: Reserved environment variables
product: vercel
url: /docs/environment-variables/reserved-environment-variables
canonical_url: "https://vercel.com/docs/environment-variables/reserved-environment-variables"
last_updated: 2025-12-10
type: reference
prerequisites:
  - /docs/environment-variables
related:
  - /docs/environment-variables
  - /docs/oidc/aws
summary: Reserved environment variables are reserved by Vercel Vercel Function runtimes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/environment-variables/reserved-environment-variables.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f7506c44aad317bf0a02af85f96b6417d3b7673c437b2aca3a2acd310eda7cbc"
---

# Reserved environment variables

The following [environment variable](/docs/environment-variables) names are [reserved](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime) and therefore unavailable for use:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.
- [Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables) — Choose Config or Secret environment variables based on whether their values should remain readable after saving.
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Edit an environment variable](https://vercel.com/docs/rest-api/projects/edit-an-environment-variable) — PATCH /v9/projects/{idOrName}/env/{id} — Edit a specific environment variable for a given project by passing the environ

Full cross-link map for this page: [/docs/environment-variables/reserved-environment-variables.graph.md](/docs/environment-variables/reserved-environment-variables.graph.md)
<!-- /docsgraph:related -->

- `AWS_SECRET_KEY`
- `AWS_EXECUTION_ENV`
- `AWS_LAMBDA_LOG_GROUP_NAME`
- `AWS_LAMBDA_LOG_STREAM_NAME`
- `AWS_LAMBDA_FUNCTION_NAME`
- `AWS_LAMBDA_FUNCTION_MEMORY_SIZE`
- `AWS_LAMBDA_FUNCTION_VERSION`
- `NOW_REGION`
- `TZ`
- `LAMBDA_TASK_ROOT`
- `LAMBDA_RUNTIME_DIR`

## Allowed environment variables

The following [environment variable](/docs/environment-variables) names are [allowed](/kb/guide/how-can-i-use-aws-sdk-environment-variables-on-vercel) by Vercel Vercel Function runtimes:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_REGION`
- `AWS_DEFAULT_REGION`

> **💡 Note:** These variables may appear in your Vercel Functions even if you don't set them in your project explicitly. These values do not grant any AWS permissions and are not usable as AWS credentials. Configure your own AWS credentials using environment variables or set up [OIDC](/docs/oidc/aws).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
