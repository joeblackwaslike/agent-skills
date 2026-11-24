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
  - /docs/environment-variables/managing-environment-variables
  - /docs/environment-variables/sensitive-environment-variables
  - /docs/functions/configuring-functions/region
summary: Reserved environment variables are reserved by Vercel Vercel Function runtimes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/environment-variables/reserved-environment-variables.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "a8d49a25f2c670a9df021f2131384811b8d854d9b959fe0699b919e827265dd1"
---

# Reserved environment variables

The following [environment variable](/docs/environment-variables) names are [reserved](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-runtime) and therefore unavailable for use:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create one or more shared environment variables](https://vercel.com/docs/rest-api/environment/create-one-or-more-shared-environment-variables) — POST /v1/env — Creates shared environment variable\\(s\\) for a team.
- [Environment Variables](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables) — Vercel MCP tools for environment variables.
- [Retrieve the decrypted value of a Shared Environment Variable by id.](https://vercel.com/docs/rest-api/environment/retrieve-the-decrypted-value-of-a-shared-environment-variable-by-id) — GET /v1/env/{id} — Retrieve the decrypted value of a Shared Environment Variable by id.
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
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
- `_HANDLER`
- `AWS_ACCESS_KEY`
- `PATH`
- `HOME`
- `TEMP`

## Allowed environment variables

The following [environment variable](/docs/environment-variables) names are allowed by Vercel Function runtimes, so you can [use them to configure the AWS SDK](#use-aws-credentials-with-the-aws-sdk):

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_REGION`
- `AWS_DEFAULT_REGION`

> **💡 Note:** These variables may appear in your Vercel Functions even if you don't set them in your project explicitly. These values do not grant any AWS permissions and are not usable as AWS credentials. Configure your own AWS credentials using environment variables or set up [OIDC](/docs/oidc/aws).

## Use AWS credentials with the AWS SDK

To connect a Vercel Function to AWS without storing long-lived credentials, use [OpenID Connect (OIDC) federation with AWS](/docs/oidc/aws), which exchanges a short-lived Vercel token for temporary AWS credentials.

If you use an access key instead, add it to your project with the allowed environment variable names. The AWS SDK reads its credentials and region from these variables, so you don't need to pass them to each client in your code. Add the variables in the [environment variables settings](/docs/environment-variables/managing-environment-variables), and mark the credentials as [sensitive](/docs/environment-variables/sensitive-environment-variables):

| Variable | Value |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The access key ID of an AWS Identity and Access Management (IAM) user |
| `AWS_SECRET_ACCESS_KEY` | The secret access key for that access key ID |
| `AWS_SESSION_TOKEN` | The session token for temporary credentials. Leave it unset when you use an IAM user's long-lived access key |
| `AWS_REGION` | The AWS region where your resources live, such as `us-east-1`. When you don't set it, Vercel sets `AWS_REGION` to the region where the function runs |

Set `AWS_REGION` explicitly when your AWS resources live in one region. The default value follows the function's execution region, so it can change when your functions run in more than one [region](/docs/functions/configuring-functions/region) or fail over. `AWS_DEFAULT_REGION` is also allowed for SDKs that read it, such as the AWS SDK for Python.

With the variables set, create a client without credentials in code. This example uploads a file to Amazon S3 with the AWS SDK for JavaScript:

```ts filename="app/api/upload/route.ts"
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

// The client reads its credentials and region from the environment
const s3 = new S3Client({});

export async function POST(request: Request) {
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: 'example.txt',
      Body: await request.text(),
    }),
  );

  return Response.json({ uploaded: true });
}
```

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
