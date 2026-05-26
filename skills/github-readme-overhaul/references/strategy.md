# README Strategy

## The Winning Shape

Strong GitHub READMEs usually act like compact product pages, but they win because they remain useful documentation. The best pattern is a mini case study:

```text
Pain -> Fix -> Proof -> Install -> First success -> Deeper docs
```

The opening should make the target reader feel recognized. The next visual should show that the project actually solves the problem. The install path should be obvious before the reader has to scroll through architecture.

## Above-the-Fold Requirements

The first screen should include:

- product name
- pain-point tagline
- trust badge row
- visual proof
- install or primary action
- three specific outcomes

Good value bullets are concrete:

- "Turns raw Claude Code logs into searchable weekly memory reports"
- "Adds a VS Code command that fixes watcher exclusions per workspace"
- "Runs extension tests in a disposable Extension Host"

Weak bullets are generic:

- "Fast and easy"
- "Modern developer experience"
- "Powerful and flexible"

## Adoption Without Begging

Do not tell people to share. Earn sharing by making the README:

- instantly understandable
- visually distinctive
- useful as a reference
- easy to quote
- easy to install
- credible through proof

If asking for a star, place it late and tie it to updates or roadmap visibility, not vanity.

## Proof Types

Use the strongest true proof available:

1. Real screenshot or demo GIF
2. Terminal before/after
3. Minimal reproducible example
4. Benchmark with methodology
5. Architecture diagram
6. User quote or adoption metric
7. Roadmap and constraints when early-stage

Do not invent proof. If proof is missing, add a clear TODO or create an asset brief.

## Section Ordering by Product Type

CLI:

```text
Pain tagline -> terminal proof -> install -> command examples -> config -> shell completions
```

Library:

```text
Pain tagline -> code sample -> install -> API example -> framework integrations -> reference
```

VS Code extension:

```text
Pain tagline -> screenshot/GIF -> marketplace install -> commands/features -> settings -> development
```

Agent skill or plugin:

```text
Pain tagline -> before/after agent behavior -> install -> invocation examples -> references -> compatibility
```

MCP server:

```text
Pain tagline -> tool list/proof -> install config -> client setup -> security -> examples
```
