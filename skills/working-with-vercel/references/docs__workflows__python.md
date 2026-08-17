---
title: Workflows with Python
product: workflows
url: /docs/workflows/python
canonical_url: "https://vercel.com/docs/workflows/python"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  - /docs/workflows
related:
  []
summary: Build durable workflows and AI agents in Python with the Vercel SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/python.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "4d2bf3d08ad412551093b0ccf90df084cf168a3f17d10bea793ea3b6c5f4faad"
---

# Workflows with Python

You can build durable workflows in Python using the
[`vercel` Python SDK](https://pypi.org/project/vercel/). Your workflow code can
pause, resume, and maintain state, just like the JavaScript and TypeScript
Workflow SDK.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python](https://workflow-sdk.dev/docs/getting-started/python?from=related) — Set up the Workflow Python SDK in your Python application.
- [Building stateful Slack bots with Vercel Workflow](https://vercel.com/kb/guide/stateful-slack-bots-with-vercel-workflow?from=related) — Learn how to build Slack bots that maintain state and handle long-running processes without managing queues, databases,
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel?from=related) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [Human-in-the-Loop with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk?from=related) — Combine Chat SDK and Workflow SDK to suspend workflows on approval cards in a chat platform, then resume on click via cr
- [Vite](https://workflow-sdk.dev/docs/getting-started/vite?from=related) — Set up Workflow SDK in a Vite app.
- [Workflows and Steps](https://workflow-sdk.dev/docs/foundations/workflows-and-steps?from=related) — Understand the two function types that make up a workflow.
- [Building Durable AI Agents](https://workflow-sdk.dev/docs/ai?from=related) — Convert a basic AI chat app into a durable, resumable agent using Workflow SDK.
- [Next.js](https://workflow-sdk.dev/docs/getting-started/next?from=related) — Set up Workflow SDK in a Next.js app.
- [Concepts](https://vercel.com/docs/workflows/concepts?from=related) — Learn how workflows, steps, sleeps, and hooks work together to build durable applications.
- [CLI Workflows](https://vercel.com/docs/agent-resources/workflows?from=related) — End-to-end workflows that show how to compose Vercel CLI commands into complete debugging, deployment, and recovery sess
- [AI SDK for Python](https://vercel.com/docs/ai-gateway/sdks-and-apis/ai-sdk-python?from=related) — Build AI-powered Python applications using the AI SDK for Python with AI Gateway for unified access to 200+ models.
- [Python](https://vercel.com/docs/functions/runtimes/python?from=related) — Learn how to use the Python runtime to run Python applications on Vercel.

Full cross-link map for this page: [/docs/workflows/python.graph.md](/docs/workflows/python.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Workflow support in the Python SDK is currently in **beta**. APIs and behavior may change.

## Getting started

Add the `vercel` package and workflow entrypoint to `pyproject.toml`:

```toml filename="pyproject.toml"
[project]
requires-python = ">=3.12"
dependencies = ["vercel"]

[[tool.vercel.workflows]]
entrypoint = "app.workflows:wf"
```

The workflow `entrypoint` uses the `module:object` format and points to the
exported `Workflows` registry.

## Workflows

A workflow is a stateful function that coordinates multi-step logic over time.
Create a `Workflows` instance and use the `@wf.workflow` decorator to mark a
function as durable:

```python filename="app/workflow.py" {3}
from vercel import workflow

wf = workflow.Workflows()
```

```python filename="app/workflows/ai_content_workflow.py" {3}
from app.workflow import wf

@wf.workflow
async def ai_content_workflow(*, topic: str):
    draft = await generate_draft(topic=topic)
    summary = await summarize_draft(draft=draft)

    return {
        "draft": draft,
        "summary": summary,
    }
```

Export the registry from the workflow package and import the module containing
your workflow so its definitions are registered:

```python filename="app/workflows/__init__.py"
from app.workflow import wf
from app.workflows import ai_content_workflow

__all__ = ["ai_content_workflow", "wf"]
```

## Steps

A step is a stateless function that runs a unit of durable work inside a
workflow. Use `@wf.step` to mark a function as a step:

```python filename="app/steps/generate_draft.py" {4,8}
import random
from app.workflow import wf

@wf.step
async def generate_draft(*, topic: str):
    return await ai_generate(prompt=f"Write a blog post about {topic}")

@wf.step
async def summarize_draft(*, draft: str):
    summary = await ai_summarize(text=draft)

    # Simulate a transient error. The step automatically retries.
    if random.random() < 0.3:
        raise Exception("Transient AI provider error")

    return summary
```

Each step compiles into an isolated route. While the step executes, the workflow
suspends without consuming resources. When the step completes, the workflow
resumes automatically where it left off.

## Sleep

Sleep pauses a workflow for a specified duration without consuming compute
resources:

```python filename="app/workflows/ai_refine.py" {8}
from vercel import workflow
from app.workflow import wf

@wf.workflow
async def ai_refine_workflow(*, draft_id: str):
    draft = await fetch_draft(draft_id)

    await workflow.sleep("7 days")  # Wait 7 days to gather more signals.

    refined = await refine_draft(draft)

    return {
        "draft_id": draft_id,
        "refined": refined,
    }
```

## Hooks

A hook lets a workflow wait for external events such as user actions, webhooks,
or third-party API responses.

Define a hook model with Pydantic and `workflow.BaseHook`:

```python filename="app/workflows/approval.py" {5,16}
import typing, pydantic
from vercel import workflow
from app.workflow import wf

class Approval(pydantic.BaseModel, workflow.BaseHook):
    """Human approval for AI-generated drafts"""

    decision: typing.Literal["approved", "changes"]
    notes: str | None = None

@wf.workflow
async def ai_approval_workflow(*, topic: str):
    draft = await generate_draft(topic=topic)

    # Wait for human approval events
    async for event in Approval.wait(token="draft-123"):
        if event.decision == "approved":
            await publish_draft(draft)
            break

        revised = await refine_draft(draft, event.notes)
        await publish_draft(revised)
```

Resume the workflow when data arrives:

```python filename="app/api/resume.py" {4,7}
from app.workflows.approval import Approval

@app.post("/api/resume")
async def resume(approval: Approval):
    """Resume the workflow when an approval is received"""

    await approval.resume("draft-123")
    return {"ok": True}
```


---

[View full sitemap](/docs/sitemap)
