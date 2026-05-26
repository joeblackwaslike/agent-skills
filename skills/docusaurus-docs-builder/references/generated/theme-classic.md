---
title: "Classic Theme"
source: "https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic"
fetched_at: "2026-05-26T21:59:05.390Z"
sha256: "aad62145763d47c5ac176d84b4c003f821f7f8272955dd33fa760fdfca0e2c71"
---

# Classic Theme

Source: https://docusaurus.io/docs/api/themes/@docusaurus/theme-classic

Themes📦 theme-classicVersion: 3.10.1On this page
# 📦 theme-classic

The classic theme for Docusaurus.

You can refer to the theme configuration page for more details on the configuration.

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

## Configuration​

Accepted fields:

OptionTypeDefaultDescription`customCss``string[] | string``[]`Stylesheets to be imported globally as client modules. Relative paths are resolved against the site directory.
noteMost configuration for the theme is done in `themeConfig`, which can be found in theme configuration.

### Example configuration​

You can configure this theme through preset options or plugin options.

tipMost Docusaurus users configure this plugin through the preset options.

Preset optionsPlugin optionsIf you use a preset, configure this plugin through the preset options:docusaurus.config.js
```
module.exports = {  presets: [    [      '@docusaurus/preset-classic',      {        theme: {          customCss: './src/css/custom.css',        },      },    ],  ],};
```
If you are using a standalone plugin, provide options directly to the plugin:docusaurus.config.js
```
module.exports = {  plugins: [    [      '@docusaurus/theme-classic',      {        customCss: './src/css/custom.css',      },    ],  ],};
```
Edit this pageLast updated on Apr 30, 2026 by Sébastien Lorber
