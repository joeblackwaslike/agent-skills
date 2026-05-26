# Patterns from Elite Documentation Sites

This captures attributes shared by high-performing developer documentation sites. It is not a ranked list; use it as a design checklist.

## What the Best Docs Have in Common

1. **Immediate orientation**: the homepage says what the product does, who it is for, and what to do first.
2. **Fast first success**: a quickstart gets users to a visible result before deep theory.
3. **Task-first navigation**: nav labels match user goals, not org charts or code structure.
4. **Layered depth**: overview -> guide -> concept -> reference -> troubleshooting.
5. **Copy-pastable examples**: commands and snippets work with minimal editing.
6. **Strong search**: search handles exact API names, error strings, and conceptual terms.
7. **Visual explanation**: architecture, flow, screenshots, and state diagrams reduce prose.
8. **Consistent page templates**: users know where prerequisites, steps, and next links live.
9. **Trustworthy claims**: performance, compatibility, security, and limitations are explicit.
10. **Good empty/error paths**: docs cover common failures, migration, and debugging.
11. **Version clarity**: users know which version they are reading.
12. **Reference precision**: API/config docs are complete, structured, and easy to scan.
13. **Examples that feel real**: examples use plausible project names, realistic data, and production constraints.
14. **Progressive disclosure**: advanced details are available but not blocking.
15. **Accessible design**: readable contrast, keyboard navigation, alt text, semantic headings.
16. **Mobile-readable**: no giant tables or tiny diagrams that collapse poorly.
17. **Clear update path**: migration guides and changelogs connect to docs.
18. **Community path**: contribution, support, and issue links are easy to find.
19. **SEO-aware structure**: page titles, descriptions, headings, and canonical URLs are intentional.
20. **Opinionated defaults**: docs recommend one best path before listing all options.

## Site Patterns to Borrow

Stripe-style:

- precise examples
- strong navigation
- API reference is deep but not blocking
- copy is concise and action-oriented

Vercel-style:

- fast path to deploy
- cards for product areas
- framework-specific tabs
- clear examples and templates

Supabase-style:

- task-first docs
- SQL/API examples near concepts
- strong product navigation
- reference and guides separated

Astro/Next/Docusaurus-style:

- friendly learning path
- strong sidebars
- conceptual docs plus recipes
- clear migration/versioning docs

Tailwind/shadcn-style:

- visual examples
- copy-pastable installation snippets
- component previews
- concise implementation guidance

Kubernetes/Rust-style:

- strong conceptual model
- explicit reference structure
- stable versioned docs
- production caveats and terminology

## Documentation Site Scorecard

Score each from 0-2:

| Area | 0 | 1 | 2 |
| --- | --- | --- | --- |
| First screen | vague | says what it is | promise + proof + CTA |
| Quickstart | missing | works eventually | first success fast |
| Navigation | file-tree | mostly grouped | task-first |
| Examples | toy | mixed | realistic and runnable |
| Visuals | decorative | occasional | explanatory |
| Reference | incomplete | scattered | structured and complete |
| Troubleshooting | absent | FAQ only | symptom -> cause -> fix |
| Search | absent | basic | tuned for docs jobs |
| Accessibility | unknown | mostly okay | checked and intentional |
| Versioning | unclear | mentioned | obvious and maintained |

Target at least 16/20 before calling a docs overhaul strong.

## Page Template: Guide

```md
# Configure webhooks

Use this guide when you want production webhooks with retries and signature verification.

## Prerequisites
## Step 1: Create the endpoint
## Step 2: Verify signatures
## Step 3: Test locally
## Step 4: Deploy
## Troubleshooting
## Next steps
```

## Page Template: Reference

```md
# CLI reference

## Commands
## Global flags
## Environment variables
## Exit codes
## Examples
## Related guides
```

## Page Template: Concept

```md
# How sync works

One-paragraph mental model.

<ArchitectureDiagram />

## Lifecycle
## Data model
## Consistency guarantees
## Limitations
## Related guides
```

## Anti-patterns

- Landing page polish with weak docs.
- Beautiful cards that hide missing examples.
- Sidebars that mirror directories.
- Reference pages that include tutorial prose.
- Tutorial pages that start with a config matrix.
- Architecture pages with no concrete example.
- Search added as an afterthought.
- AI-generated docs that say "simply" before a fragile setup step.
