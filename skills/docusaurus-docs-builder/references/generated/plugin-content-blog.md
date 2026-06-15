---
title: "Blog Plugin"
source: "https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog"
fetched_at: "2026-06-15T05:52:48.352Z"
sha256: "bb4555e75550357ffd2129386e138453d692510744860fbbe85fd135b84f6e01"
---

# Blog Plugin

Source: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog

- Plugins📦 plugin-content-blogVersion: 3.10.1On this page
# 📦 plugin-content-blog

Provides the Blog feature and is the default blog plugin for Docusaurus.

some features production onlyThe feed feature works by extracting the build output, and is **only active in production**.

## Installation​

npmYarnpnpmBun
```
npm install --save @docusaurus/plugin-content-blog
```

```
yarn add @docusaurus/plugin-content-blog
```

```
pnpm add @docusaurus/plugin-content-blog
```

```
bun add @docusaurus/plugin-content-blog
```

tipIf you use the preset `@docusaurus/preset-classic`, you don't need to install this plugin as a dependency.You can configure this plugin through the preset options.

## Configuration​

Accepted fields:

NameTypeDefaultDescription`path``string``'blog'`Path to the blog content directory on the file system, relative to site dir.`editUrl``string | EditUrlFn``undefined`Base URL to edit your site. The final URL is computed by `editUrl + relativePostPath`. Using a function allows more nuanced control for each file. Omitting this variable entirely will disable edit links.`editLocalizedFiles``boolean``false`The edit URL will target the localized file, instead of the original unlocalized file. Ignored when `editUrl` is a function.`blogTitle``string``'Blog'`Blog page title for better SEO.`blogDescription``string``'Blog'`Blog page meta description for better SEO.`blogSidebarCount``number | 'ALL'``5`Number of blog post elements to show in the blog sidebar. `'ALL'` to show all blog posts; `0` to disable.`blogSidebarTitle``string``'Recent posts'`Title of the blog sidebar.`routeBasePath``string``'blog'`URL route for the blog section of your site. **DO NOT** include a trailing slash. Use `/` to put the blog at root path.`tagsBasePath``string``'tags'`URL route for the tags section of your blog. Will be appended to `routeBasePath`.`pageBasePath``string``'page'`URL route for the pages section of your blog. Will be appended to `routeBasePath`.`archiveBasePath``string | null``'archive'`URL route for the archive section of your blog. Will be appended to `routeBasePath`. **DO NOT** include a trailing slash. Use `null` to disable generation of archive.`authorsBasePath``string``'authors'`URL route for the authors pages of your blog. Will be appended to `path`.`include``string[]``['**/*.{md,mdx}']`Array of glob patterns matching Markdown files to be built, relative to the content path.`exclude``string[]`_See example configuration_Array of glob patterns matching Markdown files to be excluded. Serves as refinement based on the `include` option.`postsPerPage``number | 'ALL'``10`Number of posts to show per page in the listing page. Use `'ALL'` to display all posts on one listing page.`blogListComponent``string``'@theme/BlogListPage'`Root component of the blog listing page.`blogPostComponent``string``'@theme/BlogPostPage'`Root component of each blog post page.`blogTagsListComponent``string``'@theme/BlogTagsListPage'`Root component of the tags list page.`blogTagsPostsComponent``string``'@theme/BlogTagsPostsPage'`Root component of the "posts containing tag" page.`blogArchiveComponent``string``'@theme/BlogArchivePage'`Root component of the blog archive page.`blogAuthorsPostsComponent``string``'@theme/Blog/Pages/BlogAuthorsPostsPage'`Root component of the blog author page.`blogAuthorsListComponent``string``'@theme/Blog/Pages/BlogAuthorsListPage'`Root component of the blog authors page index.`remarkPlugins``any[]``[]`Remark plugins passed to MDX.`rehypePlugins``any[]``[]`Rehype plugins passed to MDX.`recmaPlugins``any[]``[]`Recma plugins passed to MDX.`beforeDefaultRemarkPlugins``any[]``[]`Custom Remark plugins passed to MDX before the default Docusaurus Remark plugins.`beforeDefaultRehypePlugins``any[]``[]`Custom Rehype plugins passed to MDX before the default Docusaurus Rehype plugins.`truncateMarker``RegExp``/<!--\s*truncate\s*-->/` | `\{\/\*\s*truncate\s*\*\/\}/`Truncate marker marking where the summary ends.`showReadingTime``boolean``true`Show estimated reading time for the blog post.`readingTime``ReadingTimeFn`The default reading timeA callback to customize the reading time number displayed.`authorsMapPath``string``'authors.yml'`Path to the authors map file, relative to the blog content directory.`feedOptions`_See below_`{type: ['rss', 'atom']}`Blog feed.`feedOptions.type``FeedType | FeedType[] | 'all' | null`**Required**Type of feed to be generated. Use `null` to disable generation.`feedOptions.createFeedItems``CreateFeedItemsFn | undefined``undefined`An optional function which can be used to transform and / or filter the items in the feed.`feedOptions.limit``number | null | false``20`Limits the feed to the specified number of posts, `false` or `null` for all entries. Defaults to `20`.`feedOptions.title``string``siteConfig.title`Title of the feed.`feedOptions.description``string```${siteConfig.title} Blog``Description of the feed.`feedOptions.copyright``string``undefined`Copyright message.`feedOptions.xslt``boolean | FeedXSLTOptions``undefined`Permits to style the blog XML feeds with XSLT so that browsers render them nicely.`feedOptions.language``string` (See documentation for possible values)`undefined`Language metadata of the feed.`sortPosts``'descending' | 'ascending'``'descending'`Governs the direction of blog post sorting.`processBlogPosts``ProcessBlogPostsFn``undefined`An optional function which can be used to transform blog posts (filter, modify, delete, etc...).`showLastUpdateAuthor``boolean``false`Whether to display the author who last updated the blog post.`showLastUpdateTime``boolean``false`Whether to display the last date the blog post was updated. This requires access to git history during the build, so will not work correctly with shallow clones (a common default for CI systems). With GitHub `actions/checkout`, use `fetch-depth: 0`. When deploying to Vercel, set the environment variable `VERCEL_DEEP_CLONE=true`.`tags``string | false | null | undefined``tags.yml`Path to the YAML tags file listing pre-defined tags. Relative to the blog content directory.`onInlineTags``'ignore' | 'log' | 'warn' | 'throw'``warn`The plugin behavior when blog posts contain inline tags (not appearing in the list of pre-defined tags, usually `tags.yml`).`onUntruncatedBlogPosts``'ignore' | 'log' | 'warn' | 'throw'``warn`The plugin behavior when blog posts do not contain a truncate marker.

### Types​

#### `EditUrlFn`​


```
type EditUrlFunction = (params: {  blogDirPath: string;  blogPath: string;  permalink: string;  locale: string;}) => string | undefined;
```


#### `ReadingTimeFn`​


```
type ReadingTimeOptions = {  wordsPerMinute: number;};type ReadingTimeCalculator = (params: {  content: string;  locale: string;  frontMatter?: BlogPostFrontMatter & Record<string, unknown>;  options?: ReadingTimeOptions;}) => number;type ReadingTimeFn = (params: {  content: string;  locale: string;  frontMatter: BlogPostFrontMatter & Record<string, unknown>;  defaultReadingTime: ReadingTimeCalculator;}) => number | undefined;
```


#### `FeedType`​


```
type FeedType = 'rss' | 'atom' | 'json';
```


#### `FeedXSLTOptions`​

Permits to style the blog XML feeds so that browsers render them nicely with XSLT.

Use `true` to let the blog use its built-in `.xsl` and `.css` files to style the blog feed

- Use a falsy value (`undefined | null | false`) to disable the feature

- Use a `string` to provide a file path to a custom `.xsl` file relative to the blog content folder. By convention, you must provide a `.css` file with the exact same name.


```
type FeedXSLTOptions =  | boolean  | undefined  | null  | {      rss?: string | boolean | null | undefined;      atom?: string | boolean | null | undefined;    };
```


#### `CreateFeedItemsFn`​


```
type CreateFeedItemsFn = (params: {  blogPosts: BlogPost[];  siteConfig: DocusaurusConfig;  outDir: string;  defaultCreateFeedItemsFn: CreateFeedItemsFn;}) => Promise<BlogFeedItem[]>;
```


#### `ProcessBlogPostsFn`​


```
type ProcessBlogPostsFn = (params: {  blogPosts: BlogPost[];}) => Promise<void | BlogPost[]>;
```


### Example configuration​

You can configure this plugin through preset options or plugin options.

tipMost Docusaurus users configure this plugin through the preset options.

- Preset optionsPlugin optionsIf you use a preset, configure this plugin through the preset options:docusaurus.config.js
```
module.exports = {  presets: [    [      '@docusaurus/preset-classic',      {        blog: {          path: 'blog',          // Simple use-case: string editUrl          // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',          // Advanced use-case: functional editUrl          editUrl: ({locale, blogDirPath, blogPath, permalink}) =>            `https://github.com/facebook/docusaurus/edit/main/website/${blogDirPath}/${blogPath}`,          editLocalizedFiles: false,          blogTitle: 'Blog title',          blogDescription: 'Blog',          blogSidebarCount: 5,          blogSidebarTitle: 'All our posts',          routeBasePath: 'blog',          include: ['**/*.{md,mdx}'],          exclude: [            '**/_*.{js,jsx,ts,tsx,md,mdx}',            '**/_*/**',            '**/*.test.{js,jsx,ts,tsx}',            '**/__tests__/**',          ],          postsPerPage: 10,          blogListComponent: '@theme/BlogListPage',          blogPostComponent: '@theme/BlogPostPage',          blogTagsListComponent: '@theme/BlogTagsListPage',          blogTagsPostsComponent: '@theme/BlogTagsPostsPage',          remarkPlugins: [require('./my-remark-plugin')],          rehypePlugins: [],          beforeDefaultRemarkPlugins: [],          beforeDefaultRehypePlugins: [],          truncateMarker: /<!--\s*(truncate)\s*-->/,          showReadingTime: true,          feedOptions: {            type: '',            title: '',            description: '',            copyright: '',            language: undefined,            createFeedItems: async (params) => {              const {blogPosts, defaultCreateFeedItems, ...rest} = params;              return defaultCreateFeedItems({                // keep only the 10 most recent blog posts in the feed                blogPosts: blogPosts.filter((item, index) => index < 10),                ...rest,              });            },          },        },      },    ],  ],};
```
If you are using a standalone plugin, provide options directly to the plugin:docusaurus.config.js
```
module.exports = {  plugins: [    [      '@docusaurus/plugin-content-blog',      {        path: 'blog',        // Simple use-case: string editUrl        // editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',        // Advanced use-case: functional editUrl        editUrl: ({locale, blogDirPath, blogPath, permalink}) =>          `https://github.com/facebook/docusaurus/edit/main/website/${blogDirPath}/${blogPath}`,        editLocalizedFiles: false,        blogTitle: 'Blog title',        blogDescription: 'Blog',        blogSidebarCount: 5,        blogSidebarTitle: 'All our posts',        routeBasePath: 'blog',        include: ['**/*.{md,mdx}'],        exclude: [          '**/_*.{js,jsx,ts,tsx,md,mdx}',          '**/_*/**',          '**/*.test.{js,jsx,ts,tsx}',          '**/__tests__/**',        ],        postsPerPage: 10,        blogListComponent: '@theme/BlogListPage',        blogPostComponent: '@theme/BlogPostPage',        blogTagsListComponent: '@theme/BlogTagsListPage',        blogTagsPostsComponent: '@theme/BlogTagsPostsPage',        remarkPlugins: [require('./my-remark-plugin')],        rehypePlugins: [],        beforeDefaultRemarkPlugins: [],        beforeDefaultRehypePlugins: [],        truncateMarker: /<!--\s*(truncate)\s*-->/,        showReadingTime: true,        feedOptions: {          type: '',          title: '',          description: '',          copyright: '',          language: undefined,          createFeedItems: async (params) => {            const {blogPosts, defaultCreateFeedItems, ...rest} = params;            return defaultCreateFeedItems({              // keep only the 10 most recent blog posts in the feed              blogPosts: blogPosts.filter((item, index) => index < 10),              ...rest,            });          },        },      },    ],  ],};
```


## Markdown front matter​

Markdown documents can use the following Markdown front matter metadata fields, enclosed by a line `---` on either side.

Accepted fields:

NameTypeDefaultDescription`authors``Authors``undefined`List of blog post authors (or unique author). Read the `authors` guide for more explanations. Prefer `authors` over the `author_*` front matter fields, even for single author blog posts.`author``string``undefined`⚠️ Prefer using `authors`. The blog post author's name.`author_url``string``undefined`⚠️ Prefer using `authors`. The URL that the author's name will be linked to. This could be a GitHub, X, Facebook profile URL, etc.`author_image_url``string``undefined`⚠️ Prefer using `authors`. The URL to the author's thumbnail image.`author_title``string``undefined`⚠️ Prefer using `authors`. A description of the author.`title``string`Markdown titleThe blog post title.`title_meta``string``frontMatter.title`The blog post SEO metadata title, used in `<head>` for `<title>` and `og:title`. Permits to override `title` when the displayed title and SEO title should be different.`sidebar_label``string``title`A custom label for the blog sidebar, replacing the default one (`title`).`date``string`File name or file creation timeThe blog post creation date. If not specified, this can be extracted from the file or folder name, e.g, `2021-04-15-blog-post.mdx`, `2021-04-15-blog-post/index.mdx`, `2021/04/15/blog-post.mdx`. Otherwise, it is the Markdown file creation time.`tags``Tag[]``undefined`A list of strings or objects of two string fields `label` and `permalink` to tag to your post. Strings can be a reference to keys of a tags file (usually `tags.yml`)`draft``boolean``false`Draft blog posts will only be available during development.`unlisted``boolean``false`Unlisted blog posts will be available in both development and production. They will be "hidden" in production, not indexed, excluded from sitemaps, and can only be accessed by users having a direct link.`hide_table_of_contents``boolean``false`Whether to hide the table of contents to the right.`toc_min_heading_level``number``2`The minimum heading level shown in the table of contents. Must be between 2 and 6 and lower or equal to the max value.`toc_max_heading_level``number``3`The max heading level shown in the table of contents. Must be between 2 and 6.`keywords``string[]``undefined`Keywords meta tag, which will become the `<meta name="keywords" content="keyword1,keyword2,..."/>` in `<head>`, used by search engines.`description``string`The first line of Markdown contentThe description of your document, which will become the `<meta name="description" content="..."/>` and `<meta property="og:description" content="..."/>` in `<head>`, used by search engines.`image``string``undefined`Cover or thumbnail image that will be used as the `<meta property="og:image" content="..."/>` in the `<head>`, enhancing link previews on social media and messaging platforms.`slug``string`File pathAllows to customize the blog post URL (`/<routeBasePath>/<slug>`). Support multiple patterns: `slug: my-blog-post`, `slug: /my/path/to/blog/post`, slug: `/`.`last_update``FrontMatterLastUpdate``undefined`Allows overriding the last update author/date. Date can be any parsable date string.

```
type FrontMatterLastUpdate = {date?: string; author?: string};type Tag = string | {label: string; permalink: string};// An author key references an author from the global plugin authors.yml filetype AuthorKey = string;// Social platform name -> Social platform link// Example: {MyPlatform: 'https://myplatform.com/myusername'}// Pre-defined platforms// ("x", "github", "twitter", "linkedin", "stackoverflow", "instagram", "bluesky", "mastodon", "threads", "twitch", "youtube", "email") accept handles:// Example: {github: 'slorber'}type AuthorSocials = Record<string, string>;type Author = {  key?: AuthorKey;  name: string;  title?: string;  url?: string;  image_url?: string;  socials?: AuthorSocials;};// The front matter authors field allows various possible shapestype Authors = AuthorKey | Author | (AuthorKey | Author)[];
```

Example:


```
---title: Welcome Docusaurusauthors:  - slorber  - yangshun  - name: Joel Marcey    title: Co-creator of Docusaurus 1    url: https://github.com/JoelMarcey    image_url: https://github.com/JoelMarcey.png    socials:      x: joelmarcey      github: JoelMarceytags: [docusaurus]description: This is my first post on Docusaurus.image: https://i.imgur.com/mErPwqL.pnghide_table_of_contents: false---A Markdown blog post
```


## Tags File​

Use the `tags` plugin option to configure the path of a YAML tags file.

By convention, the plugin will look for a `tags.yml` file at the root of your content folder(s).

This file can contain a list of predefined tags. You can reference these tags by their keys in Markdown files thanks to the `tags` front matter.

Keeping tags consistentUsing a tags file, you can ensure that your tags usage is consistent across your plugin content set. Use the `onInlineTags: 'throw'` plugin option to enforce this consistency and prevent usage of inline tags declared on the fly.

### Types​

The YAML content of the provided tags file should respect the following shape:


```
type Tag = {  label?: string; // Tag display label  permalink?: string; // Tag URL pathname segment  description?: string; // Tag description displayed in the tag page};type TagsFileInput = Record<string, Partial<Tag> | null>;
```


### Example​

tags.yml
```
releases:  label: 'Product releases'  permalink: '/product-releases'  description: 'Content related to product releases.'# A partial tag definition is also validannouncements:  label: 'Announcements'# An empty tag definition is also valid# Other attributes will be inferred from the keyemptyTag:
```

content.md
```
---tags: [releases, announcements, emptyTag]---# TitleContent
```


## Authors File​

Use the `authors` plugin option to configure the path of a YAML authors file.

By convention, the plugin will look for a `authors.yml` file at the root of your blog content folder(s).

This file can contain a list of predefined global blog authors. You can reference these authors by their keys in Markdown files thanks to the `authors` front matter.

### Types​

The YAML content of the provided authors file should respect the following shape:


```
type AuthorsMapInput = {  [authorKey: string]: AuthorInput;};type AuthorInput = {  name?: string;  title?: string;  description?: string;  imageURL?: string;  url?: string;  email?: string;  page?: boolean | {permalink: string};  socials?: Record<string, string>;  [customAuthorAttribute: string]: unknown;};
```


### Example​

tags.yml
```
slorber:  name: Sébastien Lorber  title: Docusaurus maintainer  url: https://sebastienlorber.com  image_url: https://github.com/slorber.png  page: true  socials:    x: sebastienlorber    github: slorber    email: [email&#160;protected]jmarcey:  name: Joel Marcey  title: Co-creator of Docusaurus 1  url: https://github.com/JoelMarcey  image_url: https://github.com/JoelMarcey.png  email: [email&#160;protected]  page:    permalink: '/joel-marcey'  socials:    x: joelmarcey    github: JoelMarcey
```

blog/my-blog-post.md
```
---authors: [slorber, jmarcey]---# My Blog PostContent
```


## i18n​

Read the i18n introduction first.

### Translation files location​

**Base path**: `website/i18n/[locale]/docusaurus-plugin-content-blog`

- **Multi-instance path**: `website/i18n/[locale]/docusaurus-plugin-content-blog-[pluginId]`

- **JSON files**: extracted with `docusaurus write-translations`

- **Markdown files**: `website/i18n/[locale]/docusaurus-plugin-content-blog`

### Example file-system structure​


```
website/i18n/[locale]/docusaurus-plugin-content-blog││ # translations for website/blog├── authors.yml├── first-blog-post.md├── second-blog-post.md││ # translations for the plugin options that will be rendered└── options.json
```
Edit this pageLast updated on Apr 30, 2026 by Sébastien Lorber
