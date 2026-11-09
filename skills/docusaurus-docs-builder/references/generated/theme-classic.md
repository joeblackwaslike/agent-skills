---
title: "Classic Theme"
source: "https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic"
fetched_at: "2026-11-09T12:33:24.119Z"
sha256: "b8d5a81f20c415ae09c96cb8c16ef9630c5f80bfa264e44678f76bba8d6aa8e3"
---

# Classic Theme

Source: https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic

[](https://docusaurus.io/)[Themes](https://docusaurus.io/docs/api/themes)📦 theme-classicVersion: 3.10.2On this page
# 📦 theme-classic

The classic theme for Docusaurus.

You can refer to the [theme configuration page](https://docusaurus.io/docs/api/themes/configuration) for more details on the configuration.

npmYarnpnpmBun
```
npm install --save @docusaurus/theme-classic
```

```
yarn add @docusaurus/theme-classic
```

```
pnpm add @docusaurus/theme-classic
```

```
bun add @docusaurus/theme-classic
```

tipIf you have installed `@docusaurus/preset-classic`, you don't need to install it as a dependency.

## Configuration[​](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic#configuration)

Accepted fields:

OptionTypeDefaultDescription`customCss``string[] | string``[]`Stylesheets to be imported globally as [client modules](https://docusaurus.io/docs/advanced/client#client-modules). Relative paths are resolved against the site directory.
noteMost configuration for the theme is done in `themeConfig`, which can be found in [theme configuration](https://docusaurus.io/docs/api/themes/configuration).

### Example configuration[​](https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic#ex-config)

You can configure this theme through preset options or plugin options.

tipMost Docusaurus users configure this plugin through the preset options.
Preset optionsPlugin optionsIf you use a preset, configure this plugin through the [preset options](https://docusaurus.io/docs/using-plugins#docusauruspreset-classic):docusaurus.config.js
```
module.exports = {  presets: [    [      '@docusaurus/preset-classic',      {        theme: {          customCss: './src/css/custom.css',        },      },    ],  ],};
```
If you are using a standalone plugin, provide options directly to the plugin:docusaurus.config.js
```
module.exports = {  plugins: [    [      '@docusaurus/theme-classic',      {        customCss: './src/css/custom.css',      },    ],  ],};
```
[Edit this page](https://github.com/meta/docusaurus/edit/main/website/docs/api/themes/theme-classic.mdx)Last updated on Jul 10, 2026 by Sébastien Lorber
