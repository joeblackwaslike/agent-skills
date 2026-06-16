---
title: Release Phases for Vercel
product: vercel
url: /docs/release-phases
canonical_url: "https://vercel.com/docs/release-phases"
last_updated: 2025-09-24
type: conceptual
prerequisites:
  []
related:
  - /docs/release-phases/public-beta-agreement
summary: Learn about the different phases of the Vercel Product release cycle and the requirements that a Product must meet before being assigned to a...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/release-phases.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "cf94816e2dd7666bef07ae18c5f8c922a8f7761c44bd3aa37444f936f481e575"
---

# Release Phases for Vercel

This page outlines the different phases of the Vercel product release cycle. Each phase has a different set of requirements that a product must meet before being assigned to a phase.

Although a product doesn't have to pass through each stage in sequential order, there is a default flow to how products are released:

- Alpha
- Beta
- General Availability (GA).

## Alpha

The Alpha phase is the first phase of the release cycle. A product in the Alpha phase lacks the essential features that are required to be ready for GA.
The product is considered to still be under development, and is being built to be ready for Beta phase.

> **💡 Note:** The product is under development.

## Beta

A Beta state generally means that the feature does **not** yet meet our quality standards for GA or limited availability.
An example of this is when there is a need for more information or feedback from external customers to validate that this feature solves a specific pain point.

Releases in the Beta state have a committed timeline for getting to GA and are actively worked on.

> **⚠️ Warning:** Products in a Beta state, are  covered under the [Service
> Level Agreement](https://vercel.com/legal/sla) (SLA) for Enterprise plans.
> Vercel  recommend using Beta products in a full
> production environment.

### Private Beta

When a product is in Private Beta, it is still considered to be under development.
While some customers may have access, this access sometimes includes a Non-disclosure agreement (NDA)

> **💡 Note:** The product is under active development with limited customer access - may
> include an NDA.

### Limited Beta

A Limited Beta is still under active development, but has been publicly announced, and is potentially available to a limited number of customers.

This phase is generally used when there is a need to control adoption of a feature.
For example, when underlying capacity is limited, if there are known severe caveats then additional guidance may be required.

> **💡 Note:** The product is under active development, and has been publicly announced.
> Limited customer access - may include an NDA.

### Public Beta

Once a product has been publicly announced, optionally tested in the field by selected customers, and meets Vercel's quality standards, it is considered to be in the Public Beta phase.

Public Beta is the final phase of the release cycle before a product goes GA. At this stage the product can be used by a wider audience for load testing, and onboarding.

For a product to move from Public Beta to GA, the following requirements must be met. Note that these are general requirements, and that each feature may have it's own set of requirements to meet:

- Fully load tested
- All bugs resolved
- Security analysis completed
- At least 10 customers have been on-boarded

> **💡 Note:** The product is under active development, and has been publicly announced.
> Available to the public without special invitation.

See the [Public Beta Agreement](/docs/release-phases/public-beta-agreement) for detailed information.

## General Availability

When the product reaches the General Availability (GA) phase, it is considered to be battle tested, and ready for use by the community.

> **💡 Note:** Publicly available with full support and guaranteed uptime.

## Deprecated and Sunset

A Deprecated state means that the product team is in the process of removing a product or feature.
Deprecated states are accompanied by documentation instructing existing users of remediation next steps, and information on when to expect the feature to be in a Sunset state.

The ultimate state after Deprecation is Sunset. Sunset implies that there should be no customers using the Product and any artifacts within, but not limited to, code, documentation, and marketing have been removed.


---

[View full sitemap](/docs/sitemap)
