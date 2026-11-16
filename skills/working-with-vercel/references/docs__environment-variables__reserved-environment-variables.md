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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/environment-variables/reserved-environment-variables.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "f3576f14a73c8f851cbfba26d779061d0bc79b67bb51d4a1d43b5baf14fda67d"
---

# Reserved environment variables

The following [environment variable](/docs/environment-variables) names are [reserved](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime) and therefore unavailable for use:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.
- [Config and Secret environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables) — Choose Config or Secret environment variables based on whether their values should remain readable after saving.
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Retrieve the decrypted value of a Shared Environment Variable by id.](https://vercel.com/docs/rest-api/environment/retrieve-the-decrypted-value-of-a-shared-environment-variable-by-id) — GET /v1/env/{id} — Retrieve the decrypted value of a Shared Environment Variable by id.

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
- `_HANDLER`
- `AWS_ACCESS_KEY`
- `PATH`
- `HOME`
- `TEMP`

## Allowed environment variables

The following [environment variable](/docs/environment-variables) names are [allowed](/kb/guide/how-can-i-use-aws-sdk-environment-variables-on-vercel) by Vercel Vercel Function runtimes:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_REGION`
- `AWS_DEFAULT_REGION`

> **💡 Note:** These variables may appear in your Vercel Functions even if you don't set them in your project explicitly. These values do not grant any AWS permissions and are not usable as AWS credentials. Configure your own AWS credentials using environment variables or set up [OIDC](/docs/oidc/aws).

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
