---
title: "Installation"
source: "https://docusaurus.io/docs/installation"
fetched_at: "2026-08-24T04:43:10.282Z"
sha256: "4580006ad756a50c87e5e80aee0252327f32ca164e377fd46efc505e3085cc7a"
---

# Installation

Source: https://docusaurus.io/docs/installation

- [](https://docusaurus.io/)[Getting Started](https://docusaurus.io/docs/category/getting-started)InstallationVersion: 3.10.2On this page
# Installation

Docusaurus consists of a set of npm [packages](https://github.com/facebook/docusaurus/tree/main/packages).

tipUse the **[Fast Track](https://docusaurus.io/docs#fast-track)** to understand Docusaurus in **5 minutes ⏱**!Use **[docusaurus.new](https://docusaurus.new)** to test Docusaurus immediately in your browser!

## Requirements[​](https://docusaurus.io/docs/installation#requirements)

[Node.js](https://nodejs.org/en/download/) version 20.0 or above (which can be checked by running `node -v`). You can use [nvm](https://github.com/nvm-sh/nvm) to manage multiple Node.js versions on a single machine.

When installing Node.js, it is recommended to check all checkboxes related to dependencies.

## Scaffold project website[​](https://docusaurus.io/docs/installation#scaffold-project-website)

The easiest way to install Docusaurus is to use the [create-docusaurus](https://docusaurus.io/docs/api/misc/create-docusaurus) command line tool that helps you scaffold a skeleton Docusaurus website. You can run this command anywhere in a new empty repository or within an existing repository, it will create a new directory containing the scaffolded files.


```
npx create-docusaurus@latest my-website classic
```

We recommend the `classic` template so that you can get started quickly, and it contains features found in Docusaurus 1. The `classic` template contains `@docusaurus/preset-classic` which includes standard documentation, a blog, custom pages, and a CSS framework (with dark mode support). You can get up and running extremely quickly with the classic template and customize things later on when you have gained more familiarity with Docusaurus.

You can also use the template's TypeScript variant by passing the `--typescript` flag. See [TypeScript support](https://docusaurus.io/docs/typescript-support) for more information.


```
npx create-docusaurus@latest my-website classic --typescript
```

Meta-OnlyIf you are setting up a new Docusaurus website for a Meta open source project, run this command inside an internal repository, which comes with some useful Meta-specific defaults:
```
scarf static-docs-bootstrap
```

Alternative installation commandsYou can also initialize a new project using your preferred project manager:
- npmYarnpnpmBun
```
npm init docusaurus
```

```
yarn create docusaurus
```

```
pnpm create docusaurus
```

```
bunx create-docusaurus
```

Run `npx create-docusaurus@latest --help`, or check out its [API docs](https://docusaurus.io/docs/api/misc/create-docusaurus) for more information about all available flags.

## Project structure[​](https://docusaurus.io/docs/installation#project-structure)

Assuming you chose the classic template and named your site `my-website`, you will see the following files generated under a new directory `my-website/`:


```
my-website├── blog│   ├── 2019-05-28-hola.md│   ├── 2019-05-29-hello-world.md│   └── 2020-05-30-welcome.md├── docs│   ├── doc1.md│   ├── doc2.md│   ├── doc3.md│   └── mdx.md├── src│   ├── css│   │   └── custom.css│   └── pages│       ├── styles.module.css│       └── index.js├── static│   └── img├── docusaurus.config.js├── package.json├── README.md├── sidebars.js└── yarn.lock
```


### Project structure rundown[​](https://docusaurus.io/docs/installation#project-structure-rundown)

`/blog/` - Contains the blog Markdown files. You can delete the directory if you've disabled the blog plugin, or you can change its name after setting the `path` option. More details can be found in the [blog guide](https://docusaurus.io/docs/blog)

- `/docs/` - Contains the Markdown files for the docs. Customize the order of the docs sidebar in `sidebars.js`. You can delete the directory if you've disabled the docs plugin, or you can change its name after setting the `path` option. More details can be found in the [docs guide](https://docusaurus.io/docs/docs-introduction)

- `/src/` - Non-documentation files like pages or custom React components. You don't have to strictly put your non-documentation files here, but putting them under a centralized directory makes it easier to specify in case you need to do some sort of linting/processing

`/src/pages` - Any JSX/TSX/MDX file within this directory will be converted into a website page. More details can be found in the [pages guide](https://docusaurus.io/docs/creating-pages)

- `/static/` - Static directory. Any contents inside here will be copied into the root of the final `build` directory

- `/docusaurus.config.js` - A config file containing the site configuration. This is the equivalent of `siteConfig.js` in Docusaurus v1

- `/package.json` - A Docusaurus website is a React app. You can install and use any npm packages you like in it.

- `/sidebars.js` - Used by the documentation to specify the order of documents in the sidebar

### Monorepos[​](https://docusaurus.io/docs/installation#monorepos)

If you are using Docusaurus for documentation of an existing project, a monorepo may be the solution for you. Monorepos allow you to share dependencies between similar projects. For example, your website may use your local packages to showcase latest features instead of depending on a released version. Then, your contributors can update the docs as they implement features. An example monorepo folder structure is below:


```
my-monorepo├── package-a # Another package, your actual project│   ├── src│   └── package.json # Package A's dependencies├── website   # Docusaurus root│   ├── docs│   ├── src│   └── package.json # Docusaurus' dependencies├── package.json # Monorepo's shared dependencies
```

In this case, you should run `npx create-docusaurus` within the `./my-monorepo` folder.

If you're using a hosting provider such as Netlify or Vercel, you will need to change the `Base directory` of the site to where your Docusaurus root is. In this case, that would be `./website`. Read more about configuring ignore commands in the [deployment docs](https://docusaurus.io/docs/deployment#deploying-to-netlify).

Read more about monorepos in the [Yarn documentation](https://yarnpkg.com/features/workspaces) (Yarn is not the only way to set up a monorepo, but it's a common solution), or check out [Docusaurus](https://github.com/facebook/docusaurus) and [Jest](https://github.com/facebook/jest) for some real-world examples.

## Running the development server[​](https://docusaurus.io/docs/installation#running-the-development-server)

To preview your changes as you edit the files, you can run a local development server that will serve your website and reflect the latest changes.

npmYarnpnpmBun
```
cd my-websitenpm run start
```

```
cd my-websiteyarn run start
```

```
cd my-websitepnpm run start
```

```
cd my-websitebun run start
```

By default, a browser window will open at [http://localhost:3000](http://localhost:3000).

Congratulations! You have just created your first Docusaurus site! Browse around the site to see what's available.

## Build[​](https://docusaurus.io/docs/installation#build)

Docusaurus is a modern static website generator, so we need to build the website into a directory of static contents and put it on a web server so that it can be viewed. To build the website:

npmYarnpnpmBun
```
npm run build
```

```
yarn build
```

```
pnpm run build
```

```
bun run build
```

and contents will be generated within the `/build` directory, which can be copied to any static file hosting service like [GitHub pages](https://pages.github.com/), [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/). Check out the docs on [deployment](https://docusaurus.io/docs/deployment) for more details.

## Updating your Docusaurus version[​](https://docusaurus.io/docs/installation#updating-your-docusaurus-version)

There are many ways to update your Docusaurus version. One guaranteed way is to manually change the version number in `package.json` to the desired version. Note that all `@docusaurus/`-namespaced packages should be using the same version.

package.json
```
{  "dependencies": {    "@docusaurus/core": "3.10.2",    "@docusaurus/preset-classic": "3.10.2",    // ...  }}
```

Then, in the directory containing `package.json`, run your package manager's install command:

npmYarnpnpmBun
```
npm install
```

```
yarn install
```

```
pnpm install
```

```
bun install
```

tip`npm install` may report several vulnerabilities and recommend running `npm audit` to address them. Typically, these reported vulnerabilities, such as RegExp DOS vulnerabilities, are harmless and can be safely ignored. Also read this article, which reflects our thinking: [npm audit: Broken by Design](https://overreacted.io/npm-audit-broken-by-design/).
To check that the update occurred successfully, run:


```
npx docusaurus --version
```

You should see the correct version as output.

Alternatively, if you are using Yarn, you can do:


```
yarn add @docusaurus/core @docusaurus/preset-classic
```

tipUse new unreleased features of Docusaurus with the [@canary npm dist tag](https://docusaurus.io/community/canary)

## Problems?[​](https://docusaurus.io/docs/installation#problems)

Ask for help on [Stack Overflow](https://stackoverflow.com/questions/tagged/docusaurus), on our [GitHub repository](https://github.com/facebook/docusaurus), our [Discord server](https://discordapp.com/invite/docusaurus), or [X](https://x.com/docusaurus).[Edit this page](https://github.com/facebook/docusaurus/edit/main/website/docs/installation.mdx)Last updated on Jul 10, 2026 by Sébastien Lorber
