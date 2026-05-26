# Information Architecture

Great Docusaurus docs are organized around user jobs, not the repo's file layout.

## Core Map

Use this map for developer-product docs:

```text
/
  Homepage: promise, proof, CTA
/docs
  Overview: what this is, who it is for, where to start
  Getting started
    Install
    Quickstart
    First success
  Guides
    Outcome-oriented workflows
  Concepts
    Mental models and architecture
  Reference
    API, CLI, config, schemas
  Examples
    Realistic scenarios
  Troubleshooting
    Symptoms -> causes -> fixes
```

## Sidebar Rules

- Sidebars are reading paths, not directory mirrors.
- Keep the first category short and high-value.
- Use category landing pages for major concepts.
- Put quickstart before configuration.
- Put concepts before deep reference only when concepts are required for first use.
- Group by task: "Deploy to Vercel", "Deploy to Cloudflare", "Deploy with Docker".

## Page Types

| Page | Job |
| --- | --- |
| Homepage | Make the right user want to try it |
| Overview | Orient and route |
| Quickstart | Get first success fast |
| Guide | Complete one workflow |
| Concept | Explain the mental model |
| Reference | Answer exact API/config questions |
| Example | Show a realistic scenario |
| Troubleshooting | Recover from failure |

## Anti-patterns

- "Introduction", "Advanced", "Misc" as main navigation.
- Every markdown file in one flat sidebar.
- Homepage that says nothing beyond "modern docs".
- Getting started page that starts with architecture.
- Config reference before install.

## Migration from README

Do not paste the README into Docusaurus. Split it:

- README hero -> homepage hero
- README install -> quickstart
- README feature list -> overview/cards
- README diagrams -> concepts
- README examples -> guides/examples
- README options -> reference
- README FAQ -> troubleshooting
