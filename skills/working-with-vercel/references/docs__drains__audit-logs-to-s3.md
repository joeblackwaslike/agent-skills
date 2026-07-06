---
title: Drain Audit Logs to S3
product: vercel
url: /docs/drains/audit-logs-to-s3
canonical_url: "https://vercel.com/docs/drains/audit-logs-to-s3"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/drains
related:
  - /docs/accounts
  - /docs/drains/reference/audit-logs
  - /docs/drains/using-drains
  - /docs/audit-log
summary: Learn how to configure AWS IAM and Amazon S3 so Vercel can write Audit Log Drain events to your S3 bucket.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/audit-logs-to-s3.md"
fetched_at: "2026-07-06T05:40:24.878Z"
sha256: "b262d7dada604c0659e7ef1e0aa5785271e2fdfc25c73d0403160fa873c38dcb"
---

# Drain Audit Logs to S3

> **🔒 Permissions Required**: Audit Log Drains

Audit Log Drains can write team activity events directly to your Amazon S3 bucket. Use this setup when you want audit logs stored in your AWS account for security archives, compliance retention, or downstream analysis.

Vercel writes to S3 by assuming an AWS Identity and Access Management (IAM) role in your AWS account with [AWS Security Token Service (AWS STS)](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html). You keep ownership of the bucket and grant Vercel write access only to the bucket path you configure.

Follow the steps below to create the IAM role, attach write permissions, configure the drain, and run a test delivery. After setup, use [Configuration reference](#configuration-reference) for field values, [File structure](#file-structure) for S3 object paths, and [Advanced options](#advanced-options) for encryption and object ACL settings.

## Getting started with Audit Logs to S3

Before you configure the drain, make sure you have:

- Access to create or update an S3 bucket, IAM role, and IAM policy
- Access to view the S3 bucket default encryption and Object Ownership settings
- Access to update the AWS Key Management Service (AWS KMS) key policy if your bucket uses a customer managed AWS KMS key
- An S3 bucket and optional prefix for audit log objects
- The AWS region where the bucket is located
- Your [Vercel team ID](/docs/accounts#find-your-team-id)
- The Vercel S3 drain writer role ARN: `arn:aws:iam::977805900156:role/vercel-drains-s3-writer`

The S3 bucket and IAM role must be in the same AWS account.

- ### Create an IAM role
  Create an IAM role in the same AWS account as the bucket. In AWS IAM, select **Custom trust policy** as the trusted entity type.

  Use this IAM role ARN as the `roleArn` value in Vercel. Attach the permissions for your S3 encryption mode to the same IAM role.

  The IAM role trust policy must allow the Vercel S3 drain writer role to call `sts:AssumeRole` and must require the external ID for your Vercel team.

  Replace:
  - `<your-team-id>` with your Vercel team ID, for example `team_123`
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "AWS": "arn:aws:iam::977805900156:role/vercel-drains-s3-writer"
        },
        "Action": "sts:AssumeRole",
        "Condition": {
          "StringEquals": {
            "sts:ExternalId": "vercel-team:<your-team-id>"
          }
        }
      }
    ]
  }
  ```
  The external ID ties the role to one Vercel team and helps prevent the [confused deputy problem](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html). Use the **exact** `vercel-team:<your-team-id>` value. **Do not use wildcard values** such as `vercel-team:*`, because they can allow other Vercel teams to use the role ARN.

  The setup uses two IAM role ARNs:

  | Role                         | Owner            | Where to use it                                                                 |
  | ---------------------------- | ---------------- | ------------------------------------------------------------------------------- |
  | Vercel S3 drain writer role  | Vercel           | Principal in your IAM role trust policy                                         |
  | Your IAM role                | Your AWS account | `roleArn` in Vercel and identity-based permissions                              |

- ### Attach write permissions
  Attach an identity-based IAM permissions policy to your IAM role. Choose the policy that matches your bucket encryption setup.

  Both permission options use the following S3 resource mapping. Scope the S3 resource to the exact bucket or prefix in the `endpoint`.

  | Vercel `endpoint`            | IAM policy `Resource`                    |
  | ---------------------------- | ---------------------------------------- |
  | `s3://<bucket-name>`           | `arn:aws:s3:::<bucket-name>/*`             |
  | `s3://<bucket-name>/audit-logs` | `arn:aws:s3:::<bucket-name>/audit-logs/*`  |

  Test deliveries write objects under `test/`. If the `endpoint` is `s3://<bucket-name>`, your IAM role must allow `s3:PutObject` on `arn:aws:s3:::<bucket-name>/*` so test and production objects can be written.

  If you set **Object ACL** in Vercel, add `s3:PutObjectAcl` to the same S3 statement. Amazon S3 requires `s3:PutObjectAcl` when a `PutObject` request includes an ACL header.
  #### \['S3 or AWS managed key'
  Use this option when the bucket uses SSE-S3, or SSE-KMS with the AWS managed `aws/s3` key.

  The following example allows writes to `s3://<bucket-name>/audit-logs`:
  ```jsonc
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowS3Writes",
        "Effect": "Allow",
        "Action": [
          "s3:PutObject",
          // Include when Object ACL is set in the drain configuration.
          "s3:PutObjectAcl"
        ],
        "Resource": "arn:aws:s3:::<bucket-name>/audit-logs/*"
      }
    ]
  }
  ```
  #### 'Customer managed KMS key']
  Use this option when the bucket uses SSE-KMS or DSSE-KMS with an AWS KMS key that you manage. This includes buckets whose default encryption uses a customer managed AWS KMS key.

  The identity-based IAM policy must allow `s3:PutObject` on the destination path and `kms:GenerateDataKey` for the customer managed key through S3 in the bucket region.

  The following example allows writes to `s3://<bucket-name>/audit-logs` with a customer managed AWS KMS key in `<aws-region>`:
  ```jsonc
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowS3Writes",
        "Effect": "Allow",
        "Action": [
          "s3:PutObject",
          // Include when Object ACL is set in the drain configuration.
          "s3:PutObjectAcl"
        ],
        "Resource": "arn:aws:s3:::<bucket-name>/audit-logs/*"
      },
      {
        "Sid": "AllowKmsForS3Writes",
        "Effect": "Allow",
        "Action": "kms:GenerateDataKey",
        "Resource": "arn:aws:kms:<aws-region>:<your-aws-account-id>:key/<your-kms-key-id>",
        "Condition": {
          "StringEquals": {
            "kms:CallerAccount": "<your-aws-account-id>",
            "kms:ViaService": "s3.<aws-region>.amazonaws.com"
          }
        }
      }
    ]
  }
  ```
  The AWS KMS key policy must also allow the same IAM role that you use as `roleArn` in Vercel. Add this statement to the AWS KMS key policy and keep your existing key administration statements:
  ```json
  {
    "Sid": "AllowVercelDrainRoleToUseKeyViaS3",
    "Effect": "Allow",
    "Principal": {
      "AWS": "<your-iam-role-arn>"
    },
    "Action": "kms:GenerateDataKey",
    "Resource": "*",
    "Condition": {
      "StringEquals": {
        "kms:CallerAccount": "<your-aws-account-id>",
        "kms:ViaService": "s3.<aws-region>.amazonaws.com"
      }
    }
  }
  ```
  Unless you set **Object ACL**, Vercel does not need `s3:PutObjectAcl`, `s3:GetObject`, `s3:ListBucket`, `s3:DeleteObject`, or `s3:GetBucketLocation`.

- ### Configure the drain in Vercel
  In Vercel, create an Audit Log drain and choose **S3 Bucket** as the destination.

  Enter `endpoint`, `encoding`, `roleArn`, and `region`. Leave **Advanced Options** off unless your bucket configuration requires extra S3 headers. Set **Encryption** only when the bucket default encryption is SSE-KMS or DSSE-KMS. Set **Object ACL** only when the bucket requires a canned ACL for object uploads. See [Advanced options](#advanced-options).

- ### Test the drain
  Run a test delivery from the Drains page to verify the IAM role, external ID, region, and object write permissions.

  If a test delivery fails, Vercel shows the complete AWS response, including the AWS request ID when AWS returns one. Use the request ID and test timestamp to find the failed request in AWS CloudTrail and debug permission errors.

> **💡 Note:** Vercel does not manage lifecycle policies for your S3 bucket. Configure S3
> lifecycle rules, retention, and storage class transitions in AWS based on your
> compliance and cost requirements.

## Configuration reference

The S3 destination setup accepts the following values. Advanced options are optional.

| Field                  | Description                                      | Example                                                       |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------------------- |
| `endpoint`             | S3 bucket path where Vercel writes audit logs    | `s3://<bucket-name>/audit-logs`                               |
| `encoding`             | Object body format                               | `json` or `ndjson`                                            |
| `roleArn`              | IAM role ARN Vercel assumes to write objects     | `arn:aws:iam::<your-aws-account-id>:role/vercel-drain-writer` |
| `region`               | AWS region where the S3 bucket is located        | `<aws-region>`                                                |
| `serverSideEncryption` | Advanced option for SSE-KMS or DSSE-KMS buckets  | `aws:kms` or `aws:kms:dsse`                                   |
| `objectAcl`            | Advanced option for buckets that require an ACL  | `bucket-owner-full-control`                                   |

### Endpoint and region

Create or choose an S3 bucket in AWS, then decide whether Audit Log Drain objects should be written at the bucket root or under a prefix.

Use one of these `endpoint` formats:

```txt
s3://<bucket-name>
s3://<bucket-name>/audit-logs
```

Set `region` to the AWS region where the bucket is located. Vercel writes all Audit Log Drain objects to that bucket.

### Encoding

Choose `json` to write each audit log event as a JSON object. Choose `ndjson` to write each audit log event as a newline-delimited JSON object.

## File structure

S3 object bodies use the [Audit Log Drains schema](/docs/drains/reference/audit-logs#audit-log-schema).

For `encoding` set to `json`, Vercel writes compact JSON. For `encoding` set to `ndjson`, Vercel writes newline-delimited JSON.

Vercel uses Hive-style partition paths so analytics and archive tools can query audit logs by schema, version, and event date.

With the endpoint `s3://<bucket-name>/audit-logs`, normal objects use this key shape:

```txt
audit-logs/schema=audit_log/version=v1/year=YYYY/month=MM/day=DD/{timestamp}_{id}.json
```

Test objects use this key shape:

```txt
audit-logs/test/schema=audit_log/version=v1/year=YYYY/month=MM/day=DD/{timestamp}_{id}.json
```

Test deliveries use a separate `test/` directory so validation files stay separate from delivered audit log events. You can identify and delete test files without changing the production `endpoint` or IAM permissions.

`year`, `month`, `day`, and `{timestamp}` are UTC values from the event timestamp. `{id}` is the audit log event ID. NDJSON objects use the `.jsonl` extension.

## Advanced options

Advanced options map to optional Amazon S3 `PutObject` headers. Leave them unset unless your bucket configuration requires Vercel to send those headers.

### Server-side encryption

Amazon S3 encrypts new objects with SSE-S3 by default. For more information, see [Amazon S3 default encryption](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html).

For buckets that use the default SSE-S3 encryption, don't set **Encryption**. Set **Encryption** only when the bucket uses SSE-KMS or DSSE-KMS.

Choose the `serverSideEncryption` value that matches the bucket default encryption:

| S3 bucket default encryption                              | Vercel `serverSideEncryption` |
| --------------------------------------------------------- | ----------------------------- |
| Server-side encryption with Amazon S3 managed keys (SSE-S3) | `AES256`                    |
| Server-side encryption with AWS KMS keys (SSE-KMS)        | `aws:kms`                     |
| Dual-layer server-side encryption with AWS KMS keys (DSSE-KMS) | `aws:kms:dsse`             |

For SSE-KMS and DSSE-KMS, Vercel does not ask for an AWS KMS key ID. Configure the AWS KMS key as the bucket default encryption key in AWS, then choose the matching `serverSideEncryption` value in Vercel. Add AWS KMS permissions only when the bucket uses a customer managed AWS KMS key.

S3 Bucket Keys are not supported for DSSE-KMS. DSSE-KMS can also increase AWS KMS request costs compared to SSE-KMS.

### Object ACL

For buckets that use the default Object Ownership setting, leave **Object ACL** set to **None**. Amazon S3 disables ACLs by default for new buckets and uses policies for access control. For more information, see [Amazon S3 Object Ownership](https://docs.aws.amazon.com/AmazonS3/latest/userguide/about-object-ownership.html).

Set **Object ACL** only when your bucket configuration requires a canned ACL on object uploads. If you set **Object ACL**, add `s3:PutObjectAcl` to the IAM permissions policy for the same S3 resource.

## Troubleshooting

If the drain test fails with an STS error, check that your IAM role trust policy uses the Vercel S3 drain writer role ARN `arn:aws:iam::977805900156:role/vercel-drains-s3-writer` and the `sts:ExternalId` value `vercel-team:<your-team-id>`.

If the drain test fails with an S3 `AccessDenied` error that says no identity-based policy allows `s3:PutObject`, check that the S3 permissions policy is attached to the same IAM role used as `roleArn` in Vercel. Also check that the policy resource matches the configured `endpoint`.

If the drain test fails for an `endpoint` without a prefix, such as `s3://<bucket-name>`, check that the S3 permissions policy allows `arn:aws:s3:::<bucket-name>/*`. Test deliveries write under `test/`, so policies scoped only to another prefix won't match test objects.

If the drain test fails with an AWS KMS error for a customer managed AWS KMS key, check both the IAM role policy and the AWS KMS key policy. Both policies must allow your IAM role to use `kms:GenerateDataKey` through S3 in the bucket region.

## More resources

- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Configure Drains](/docs/drains/using-drains)
- [Audit Logs](/docs/audit-log)


---

[View full sitemap](/docs/sitemap)
