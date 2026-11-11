# CSS and styling

> Use when the diff: Adds or changes UI components, pages, styles, or standalone HTML files

*Leans on: KISS, high cohesion, least astonishment, explicit over implicit.*

- **Follow the system.** Colors, spacing, type and radii come from design tokens or the theme, not hard-coded hex values and pixel numbers. A new one-off value is a question.
- **Scope.** Styles are scoped to their component (CSS Modules, Tailwind utilities, CSS-in-JS) rather than global selectors that reach into other components. Changes to global CSS get extra scrutiny, because they touch every page.
- **Specificity.** No `!important` and no deep selector chains to win a specificity fight; fix the cascade instead, with cascade layers (`@layer`) where the codebase uses them.
- **Tailwind.** Class lists repeated across components become a component, not an `@apply` block. Conditional classes go through a helper (`clsx`, `cva`), and class names are written as complete strings so the build can find them.
- **Layout.** Flexbox and grid rather than absolute positioning and magic offsets. Responsive at the project's breakpoints and checked at narrow widths. Images and embeds reserve their space so the page doesn't shift as they load.
- **Themes.** Dark mode and other themes work through variables; no color that only works on one background.
- **Stacking.** `z-index` values come from a defined scale, not ever-escalating numbers.
- **Animation.** Animate `transform` and `opacity` rather than layout properties, and respect `prefers-reduced-motion`.
- **Dead styles.** Removed components take their styles with them.
