# README Infographics

Use this when the user wants the README to feel visually compelling, like the top developer projects with branded diagrams, terminal demos, proof graphics, and minimal text.

## Target Pattern

The reference style is close to Joe's `mcp-exec` README:

- dark/light logo via `<picture>`
- tight badge row
- hero terminal demo GIF
- one large numeric claim
- before/after infographic
- architecture infographic
- savings/proof infographic
- scenario blocks with concrete examples
- install section after value is obvious

This is the target visual density. The improvement pass should usually sharpen wording and sequencing, not turn the README into a longer essay.

## Infographic Types

Use 2-4 of these for serious developer tools:

| Type | Job |
| --- | --- |
| Hero demo | Show the product doing the thing |
| Before/after | Make pain and payoff obvious |
| Architecture | Explain how it works without prose |
| Savings/proof chart | Quantify why it matters |
| Workflow strip | Show the user journey in 3-5 steps |
| Comparison matrix | Clarify tradeoffs vs alternatives |
| Supported surfaces grid | Show compatibility quickly |
| Output anatomy | Annotate generated files, CLI output, or UI |

## Visual Storyboard

Default README visual storyboard:

```text
Logo
Badge row
Hero demo: "watch it solve the pain"
Big claim: "old state -> new state"
Before/after infographic
Install CTA
How it works infographic
Concrete scenario or example
Proof chart / benchmark / compatibility grid
```

Do not put all visuals at the top if it delays install too long. The first screen gets the hero proof; deeper visuals support sections as the reader scrolls.

## Copy Under Infographics

Each graphic should have:

- descriptive alt text
- one short setup sentence before it, if needed
- one takeaway sentence after it, if needed

Avoid explaining the entire image in prose. If the image needs a paragraph to make sense, the image is not clear enough.

## Strong Claims

Use large claims only when true and backed by a nearby proof artifact:

```markdown
## 52,000 tokens -> 50 tokens.

Intermediate data never enters the context window; only the final result returns.
```

Keep claims:

- specific
- numeric when possible
- visually isolated
- immediately explained by proof

Avoid:

- "10x better" without measurement
- "production-ready" without evidence
- "enterprise-grade" without enterprise proof

## No Walls of Text

For every section over 150 words, ask:

- Can this become a diagram?
- Can this become a table?
- Can this become a terminal panel?
- Can this become a before/after?
- Can this move below the install path?
- Can this be deleted because the graphic already says it?

## Asset Brief Template

```text
Create a GitHub README infographic, not a website section.

Project:
Audience:
Main claim:
Visual type: <before/after | architecture | savings chart | workflow strip | supported surfaces grid | output anatomy>
Inputs to show:
Labels:
Tone: polished developer documentation, high contrast, readable at GitHub README width
Constraints: no nav bar, no fake buttons, no pricing cards, no stock illustration, no decorative blobs
Output path: assets/readme/<name>.svg or .png
```

## Rewriting an Already-Visual README

When the README already has strong visuals, preserve the visual structure and improve:

- headline specificity
- tagline pain point
- section ordering
- captions and alt text
- claim/proof pairing
- install CTA clarity
- scenario wording
- repeated phrases
- overlong paragraphs between graphics

Do not remove good visuals while "simplifying." The goal is sharper content inside the existing visual rhythm.
