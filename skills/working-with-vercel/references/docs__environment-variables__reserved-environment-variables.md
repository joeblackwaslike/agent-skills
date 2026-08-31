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
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "fd9462e775019235804780ed2a3539d8468af43e3a737c3277d2f48873a70d9a"
---

# Reserved environment variables

The following [environment variable](/docs/environment-variables) names are [reserved](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime) and therefore unavailable for use:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=related) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Environment Variables](https://docs.vercel.shop/docs/reference/env-vars?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=related) — Required and optional environment variables for Vercel Shop.
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=related) — Learn how to create and manage environment variables for Vercel.
- [Sensitive environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=related) — Environment variables that cannot be decrypted once created.
- [Vercel Functions Limits](https://vercel.com/docs/functions/limitations?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=related) — Learn about the limits and restrictions of using Vercel Functions.
- [System environment variables](https://vercel.com/docs/environment-variables/system-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=related) — System environment variables are automatically populated by Vercel, such as the URL of the deployment or the name of the
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=related) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can

Full cross-link map for this page: [/docs/environment-variables/reserved-environment-variables.graph.md](/docs/environment-variables/reserved-environment-variables.graph.md?from=related&source_path=%2Fdocs%2Fenvironment-variables%2Freserved-environment-variables&source_site=vercel-docs&relationship=graph)
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
