---
title: Connecting an AWS Account for BYOC
product: vercel
url: /docs/networking/bring-your-own-cloud/connect-aws-account
canonical_url: "https://vercel.com/docs/networking/bring-your-own-cloud/connect-aws-account"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/networking/bring-your-own-cloud
  - /docs/networking
related:
  - /docs/networking/bring-your-own-cloud
  - /docs/networking/bring-your-own-cloud/deploy-with-cli
  - /docs/networking/bring-your-own-cloud/provisioning-reference
summary: Connect an AWS account to your Vercel team so Bring Your Own Cloud (BYOC) can invoke Lambda functions in your account.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/bring-your-own-cloud/connect-aws-account.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "204c64c67adfb4cc689eb71694f8d6de24d08e5f7e0bbf1818c388ae441c819e"
---

# Connecting an AWS Account for BYOC

> Bring Your Own Cloud is available on Enterprise plans and is set up through your Vercel account team. Contact your account team to request access.

Connect an AWS account to your Vercel team so [Bring Your Own Cloud (BYOC)](/docs/networking/bring-your-own-cloud) can invoke the Lambda functions you provision there. You connect each AWS account once per team, and every BYOC project on the team can reuse the connection.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Bring Your Own Cloud](https://vercel.com/kb/guide/byoc) — Use Bring Your Own Cloud \\(BYOC\\) to run Vercel Functions as AWS Lambda functions in your own AWS account, from setup to
- [Bring Your Own Cloud on AWS is now generally available](https://vercel.com/changelog/bring-your-own-cloud-on-aws-is-now-generally-available)
- [Operating BYOC Deployments](https://vercel.com/docs/networking/bring-your-own-cloud/operations) — Retry failed Bring Your Own Cloud \\(BYOC\\) deployments, clean up AWS resources, monitor logs, and rotate credentials.
- [Deploying with BYOC from GitHub Actions](https://vercel.com/docs/networking/bring-your-own-cloud/deploy-with-github-actions) — Keep the Vercel Git integration and use GitHub Actions to build, provision, and complete Bring Your Own Cloud \\(BYOC\\) d
- [Connect to Amazon Web Services \\(AWS\\)](https://vercel.com/docs/oidc/aws) — Learn how to configure your AWS account to trust Vercel's OpenID Connect \\(OIDC\\) Identity Provider \\(IdP\\).
- [OpenID Connect \\(OIDC\\) Federation](https://vercel.com/docs/oidc) — Secure the access to your backend using OIDC Federation to enable auto-generated, short-lived, and non-persistent creden
- [Using Vercel with Microsoft Azure](https://vercel.com/docs/integrations/external-platforms/azure) — Run your frontend on Vercel alongside backends hosted in Microsoft Azure, with private network connectivity, keyless aut

Full cross-link map for this page: [/docs/networking/bring-your-own-cloud/connect-aws-account.graph.md](/docs/networking/bring-your-own-cloud/connect-aws-account.graph.md)
<!-- /docsgraph:related -->

The Vercel dashboard lists BYOC account connections in the **Vercel Private Cloud** section of your team's **Networking** settings.

## Prerequisites

- An Enterprise team with BYOC enabled. Your Vercel account team enables BYOC for you.
- Permission to manage your team's **Networking** settings. If you see the message "You need additional permissions to view Private Cloud accounts", ask a team Owner for access.
- Permission in your AWS account to create IAM roles and attach policies to them.
- The [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) v2, if you follow the command examples. You can also use the AWS Console or an infrastructure-as-code tool such as Terraform.

## The two IAM roles BYOC uses

BYOC uses two separate IAM roles in your AWS account:

| Role                 | Assumed by              | Purpose                                                                            |
| -------------------- | ----------------------- | ---------------------------------------------------------------------------------- |
| Invocation role      | Vercel                  | Lets Vercel call `lambda:InvokeFunction` on your BYOC functions                    |
| Lambda execution role | AWS Lambda (`lambda.amazonaws.com`) | Grants your functions logging access and any AWS permissions your application needs |

You register the invocation role with Vercel on this page. You pass the execution role to your provisioning tool when you [deploy](/docs/networking/bring-your-own-cloud/deploy-with-cli).

## Connect your AWS account

- ### Open the Add AWS Account dialog
  1. Go to your team's **Settings** → [**Networking**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fnetworking\&title=Networking).
  2. In the **Vercel Private Cloud** section, click **Add Account**.
  The **Add AWS Account** dialog shows the **External ID** for your team, the **IAM Trust Policy**, and the **IAM Permissions Policy** for the invocation role. The external ID is your Vercel team ID. Keep the dialog open while you create the role.

- ### Create the invocation role with its trust policy
  The trust policy lets Vercel assume the invocation role. Copy the **IAM Trust Policy** from the dialog, without changes, into a file named `trust-policy.json`. The policy uses your Vercel team ID as its external ID.

  Create the role with the two settings Vercel requires:
  - The tag `VercelFunction` with the value `true`
  - A maximum session duration of 12 hours (43,200 seconds)
  ```bash filename="Terminal"
  aws iam create-role \
    --role-name VercelPrivateCloudRole \
    --assume-role-policy-document file://trust-policy.json \
    --max-session-duration 43200 \
    --tags Key=VercelFunction,Value=true
  ```
  The role can have any valid name. This example uses `VercelPrivateCloudRole`, the name the dashboard suggests.
  > **💡 Note:** Registration fails if the role is missing the `VercelFunction` tag or has a
  > maximum session duration shorter than 12 hours.

- ### Grant permission to invoke your functions
  The permissions policy lets the invocation role call your Lambda functions. Copy the **IAM Permissions Policy** from the dialog into a file named `invoke-policy.json`, replacing `<AWS_ACCOUNT_ID>` with your 12-digit AWS account ID:
  ```json filename="invoke-policy.json"
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "InvokeFunctionsInAccount",
        "Effect": "Allow",
        "Action": "lambda:InvokeFunction",
        "Resource": "arn:aws:lambda:*:<AWS_ACCOUNT_ID>:function:*"
      }
    ]
  }
  ```
  Attach it to the invocation role as an inline policy:
  ```bash filename="Terminal"
  aws iam put-role-policy \
    --role-name VercelPrivateCloudRole \
    --policy-name VercelInvokeFunctions \
    --policy-document file://invoke-policy.json
  ```
  This policy allows Vercel to invoke current and future functions, versions, and aliases in your account across all AWS regions. It doesn't grant permission to create, change, or delete functions. The `VercelFunction` tag belongs on the IAM role only. Your Lambda functions don't need it.

  If you narrow the `Resource` pattern to specific function ARNs, update the policy before each deployment so it covers every function in that deployment's descriptor. See the [AWS Lambda permissions reference](https://docs.aws.amazon.com/lambda/latest/dg/lambda-api-permissions-ref.html) for resource formats.

- ### Register the account in Vercel
  In the **Add AWS Account** dialog:
  1. Enter your 12-digit **AWS Account ID**.
  2. Enter the **IAM Role Name** of the invocation role, such as `VercelPrivateCloudRole`.
  3. Click **Add Account**.
  Vercel checks that it can assume the role with the required session duration and shows **Account Registered** when the check passes. Registration doesn't check the Lambda invocation permissions or whether any functions exist.

- ### Refresh credentials and wait for Active
  A newly registered account shows the **No Credentials** status. Click **Refresh Credentials** on the account row to request the first set of credentials, then wait until the status changes to **Active**.

  After the first refresh, Vercel refreshes the credentials automatically. Keep the role's trust policy, permissions policy, tag, and session duration in place so automatic refreshes keep working.

  **Active** means Vercel has valid credentials for the role. It doesn't confirm that your functions can be invoked. Missing invocation permissions or **Expired** credentials cause BYOC requests and deployments to fail.

## Create the Lambda execution role

Your BYOC functions run as a Lambda execution role, which is separate from the invocation role. One execution role can serve all functions in an application. Create it with a trust policy for the Lambda service and the AWS managed policy for CloudWatch logging:

```bash filename="Terminal"
aws iam create-role \
  --role-name byoc-lambda-execution \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}'

aws iam attach-role-policy \
  --role-name byoc-lambda-execution \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

Add any other permissions your application needs, such as access to Amazon S3 or Amazon DynamoDB, to this role. Save the role ARN, for example `arn:aws:iam::<AWS_ACCOUNT_ID>:role/byoc-lambda-execution`, for your provisioning tool.

The identity that runs your provisioning tool needs `iam:PassRole` on the execution role. For the full list of permissions, see [Provisioning identity permissions](/docs/networking/bring-your-own-cloud/provisioning-reference#provisioning-identity-permissions).

## Account statuses

| Status             | Meaning                                                                                       | Action                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **No Credentials** | The account is registered, but Vercel hasn't obtained credentials yet                        | Click **Refresh Credentials**                                                                  |
| **Active**         | Vercel has valid credentials for the invocation role and refreshes them automatically        | None                                                                                           |
| **Expired**        | Vercel's credentials have expired and automatic refresh hasn't succeeded                     | Check the role's trust policy, tag, and session duration, then select **Refresh Credentials** from the account's menu |

## Disconnect an AWS account

Before you disconnect an account, replace or remove any deployments that depend on it. Deployments that use a disconnected account can't invoke their functions.

1. Go to your team's **Settings** → [**Networking**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fnetworking\&title=Networking).
2. In the **Vercel Private Cloud** section, open the menu on the account row.
3. Select **Disconnect** and confirm.

Disconnecting removes the registration and stored credentials from Vercel and stops automatic credential refresh. It doesn't delete the IAM roles, Lambda functions, or any other resources in your AWS account.

Credentials that Vercel obtained before you disconnected stay valid until they expire, for up to 12 hours. To revoke them immediately, [revoke the role's active sessions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html) in AWS.

## Next steps

- [Deploy with BYOC using the Vercel CLI](/docs/networking/bring-your-own-cloud/deploy-with-cli)
- [Review the BYOC provisioning reference](/docs/networking/bring-your-own-cloud/provisioning-reference)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
