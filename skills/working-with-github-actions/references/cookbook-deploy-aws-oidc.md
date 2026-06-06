# Deploy to AWS with OIDC (No Stored Credentials)

Use OpenID Connect (OIDC) federation to authenticate GitHub Actions with AWS. No
`AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` secrets needed — short-lived tokens are
minted per-run by AWS STS.

## Why OIDC over stored access keys

- **No long-lived secrets**: stored keys are a permanent breach surface. OIDC tokens expire
  after the run and can't be replayed.
- **No rotation burden**: no `secrets.AWS_SECRET_ACCESS_KEY` to rotate, audit, or leak in
  a log line.
- **Fine-grained trust**: the IAM trust policy can restrict which repo, branch, or
  environment may assume the role — not just "anyone who has the key".
- **Audit trail**: CloudTrail records show `github.com/your-org/your-repo` as the principal,
  not an opaque access key ID.

---

## One-time AWS setup

Run these commands once per AWS account. You need IAM admin permissions.

```bash
# 1. Create the OIDC provider for GitHub Actions (one per account)
aws iam create-open-id-connect-provider \
  --url https://token.actions.githubusercontent.com \
  --client-id-list sts.amazonaws.com \
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1

# 2. Create a trust policy document.
# Replace YOUR_ORG/YOUR_REPO and YOUR_BRANCH as needed.
cat > trust-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          // Scope to a specific repo + branch. Use wildcards carefully:
          //   repo:org/repo:ref:refs/heads/main       — main branch only
          //   repo:org/repo:environment:production    — named environment only
          //   repo:org/repo:*                         — any ref in the repo (wide open)
          "token.actions.githubusercontent.com:sub": "repo:YOUR_ORG/YOUR_REPO:ref:refs/heads/main"
        }
      }
    }
  ]
}
EOF

# 3. Create the IAM role
aws iam create-role \
  --role-name GitHubActions-Deploy \
  --assume-role-policy-document file://trust-policy.json

# 4. Attach a policy to the role (example: Lambda deploy + ECR push)
aws iam attach-role-policy \
  --role-name GitHubActions-Deploy \
  --policy-arn arn:aws:iam::aws:policy/AWSLambda_FullAccess

# 5. Note the role ARN — you'll put it in the workflow
aws iam get-role --role-name GitHubActions-Deploy \
  --query 'Role.Arn' --output text
```

Store the role ARN as a **non-secret** Actions variable (`vars.AWS_ROLE_ARN`) or inline in
the workflow — it contains no credentials.

---

## Workflow: Deploy Lambda function

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

# id-token: write is required for GitHub to mint an OIDC token for the run.
# contents: read is required for actions/checkout.
permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    name: Deploy to Lambda
    runs-on: ubuntu-latest
    # The "production" environment gates this job behind required reviewers
    # (configure in Settings → Environments → production).
    environment: production

    steps:
      - uses: actions/checkout@v4

      # This action exchanges the OIDC token for temporary AWS credentials
      # (access key + secret + session token) that expire after ~1 hour.
      # The credentials are exported as environment variables automatically.
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_ARN }}
          # Optional: name that appears in CloudTrail for this specific session.
          role-session-name: GitHubActions-${{ github.run_id }}
          aws-region: us-east-1

      # After configure-aws-credentials, normal AWS CLI / SDK calls just work.
      - name: Package Lambda
        run: |
          zip -r function.zip . -x "*.git*" "*.github*"

      - name: Deploy Lambda
        run: |
          aws lambda update-function-code \
            --function-name my-function \
            --zip-file fileb://function.zip

      - name: Wait for update to complete
        run: |
          aws lambda wait function-updated \
            --function-name my-function
```

---

## Workflow: Build and push to ECR

```yaml
# .github/workflows/ecr-push.yml
name: ECR Push

on:
  push:
    branches: [main]
    tags: ["v*"]

permissions:
  id-token: write
  contents: read

jobs:
  push:
    name: Push to ECR
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ vars.AWS_ROLE_ARN }}
          aws-region: us-east-1

      # Login to ECR using the temporary credentials from the previous step.
      - name: Log in to ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build and push
        env:
          REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          REPOSITORY: my-app
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $REGISTRY/$REPOSITORY:$IMAGE_TAG .
          docker push $REGISTRY/$REPOSITORY:$IMAGE_TAG
```

---

## Environment protection rules for prod

In the GitHub UI: **Settings → Environments → production**:

- **Required reviewers**: add team leads or a review team. The job pauses until approved.
- **Wait timer**: optional delay (e.g. 5 min) after approval before the job runs.
- **Deployment branches**: restrict to `main` only so feature branches can't deploy to prod.

Pair this with the `environment: production` key in the workflow job. If the OIDC trust
policy uses `environment:production` in the `sub` condition, the IAM role can only be
assumed from that environment — reviewers must approve before AWS grants any credentials.

```json
// Trust policy scoped to GitHub environment (strongest restriction)
"token.actions.githubusercontent.com:sub": "repo:YOUR_ORG/YOUR_REPO:environment:production"
```

---

## Trust policy condition cheat-sheet

| Scope | `sub` condition value |
|---|---|
| Any ref in repo | `repo:org/repo:*` |
| Specific branch | `repo:org/repo:ref:refs/heads/main` |
| Any tag | `repo:org/repo:ref:refs/tags/*` |
| Named environment | `repo:org/repo:environment:production` |
| Pull requests | `repo:org/repo:pull_request` |

Use `StringLike` for patterns with `*`, `StringEquals` for exact matches.

---

## Key decisions

| Decision | Rationale |
|---|---|
| `permissions: id-token: write` at workflow level | GitHub only mints the OIDC token if this permission is declared; omitting it silently breaks auth |
| `environment: production` on the job | Triggers required-reviewer gate AND can be used in IAM trust policy sub-claim for double verification |
| `role-session-name: GitHubActions-${{ github.run_id }}` | Makes CloudTrail entries linkable back to a specific Actions run |
| Variables (`vars.AWS_ROLE_ARN`) over hardcoded ARNs | Easier to update across branches without a code change; role ARN is not a secret |
