---
title: Workflows with Python
product: workflows
url: /docs/workflows/python
canonical_url: "https://vercel.com/docs/workflows/python"
last_updated: 2026-04-16
type: conceptual
prerequisites:
  - /docs/workflows
related:
  []
summary: Build durable workflows and AI agents in Python with the Vercel SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/python.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "48641683cbb70841aa1b0e14ba0f7b851e8c7a055ea9fc81f36e4108555be503"
---

# Workflows with Python

You can build durable workflows in Python using the
[`vercel` Python SDK](https://pypi.org/project/vercel/). Your workflow code can
pause, resume, and maintain state, just like the JavaScript and TypeScript
Workflow SDK.

> **⚠️ Warning:** Workflow support in the Python SDK is currently in **beta**. APIs and behavior may change.

## Getting started

Install the `vercel` package:

```bash filename="Terminal"
pip install vercel
```

Configure `experimentalServices` in your `vercel.json`:

```json filename="vercel.json"
{
  "experimentalServices": {
    "ai_content_workflow": {
      "type": "worker",
      "entrypoint": "app/workflows/ai_content_workflow.py",
      "topics": ["__wkf_*"]
    }
  }
}
```

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
