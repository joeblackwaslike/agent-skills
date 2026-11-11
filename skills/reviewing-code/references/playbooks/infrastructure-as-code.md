# Infrastructure as code

*Leans on: least privilege, Gall's Law, Chesterton's Fence, Hyrum's Law, explicit over implicit.*

Terraform or OpenTofu, Kubernetes manifests, Helm charts and Compose files change production directly. Review the plan, not only the diff.

- **Read the plan.** The PR includes the `terraform plan` output (or `helm diff`, `kubectl diff`). Any destroy or replace of a stateful resource (databases, volumes, buckets, DNS records) is a blocker until explained. A one-line attribute change can force a replacement.
- **Blast radius.** One environment at a time, production last. Shared modules change carefully, because every consumer picks up the change. State is split so that one mistake can't touch everything.
- **Pinned versions.** Providers, modules, charts and images pinned, with `.terraform.lock.hcl` committed.
- **Least privilege.** No `*` actions or resources in IAM policies, no `0.0.0.0/0` on non-public ports, buckets private by default, and encryption at rest and in transit.
- **Secrets.** Not in variable files or committed plans; read from a secret manager. Reading from a secret manager doesn't keep a value out of state: anything passed to an ordinary resource argument is stored in state and saved plans in plain text, and `sensitive` only redacts it from displayed output. So state and saved plans need encryption at rest and restricted access. Where a secret must not persist at all, use an ephemeral value or a write-only argument if the provider supports one.
- **Kubernetes workloads.** Resource requests and limits, readiness and liveness probes, a non-root security context, a PodDisruptionBudget for anything with replicas, and pinned image tags.
- **Protection for stateful resources.** Production databases and buckets have deletion protection or `prevent_destroy`.
- **Drift.** Resources changed by hand in a console are imported or reverted, and every `ignore_changes` has a reason.
- **Policy and lint in CI.** `terraform validate`, `tflint`, and a policy scanner (Checkov, Trivy's misconfiguration scan, or OPA).
- **Tags and naming.** Resources follow the existing naming convention and carry owner, environment and cost tags.
- **Compose files.** Pinned images, no secrets in committed `environment:` blocks, health checks on dependencies, and named volumes for data that must survive a restart.
