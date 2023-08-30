// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

//const lightCodeTheme = require('./src/css/prismLight.js');

const lightCodeTheme = require('prism-react-renderer/themes/github');
//const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentation',
  tagline: 'Explore our quickstarts and guides.',

  favicon: 'img/favicon.jpg',

  // Set the production url of your site here
  // url: 'https://192.168.13.54:3000',
  url: 'https://your-docusaurus-test-site.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          //routeBasePath: '/',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          
        },
        blog: false,
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['theme/pay_theory_types.ts'],
        tsconfig: 'tsconfig.json',
      },
    ],
  ],
  //plugins: [require.resolve("@cmfcmf/docusaurus-search-local")],
  // plugins: [
  //   [
  //     require.resolve("@cmfcmf/docusaurus-search-local"),
  //     {
  //       indexDocSidebarParentCategories: 0,
  //       indexPages: false,
  //       language: "en",
  //       style: undefined,
  //       maxSearchResults: 8,
  //       lunr: 
  //       {
  //         tokenizerSeparator: /[\s\-]+/,
  //         b: 0.75,
  //         k1: 1.2,
  //         titleBoost: 5,
  //         contentBoost: 1,
  //         tagsBoost: 3,
  //         parentCategoriesBoost: 2,
  //       }
      
  //     },
  //   ],
  // ],
  // plugins: [
  //   // ...
  //   '@aldridged/docusaurus-plugin-lunr'
  // ],
    
  
  //themes: ['@docusaurus/theme-search-algolia'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    /** @type {import('@docusaurus/theme-search-algolia')} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      // Replace with your project's social card
      image: 'img/logo.svg',
      algolia: {
        apiKey: '4f4a7ac2f57b4a613b68903acdce60f5',
        indexName:'paytheory',
        ContextualSearch: true,
        placeholder:'search in Pay Theory website',
        appId:'750L2445EV',
        debug: false

      },
      
      navbar: {
        title: 'Docs',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
          href: 'docs/Main/Getting Started/Quickstart',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'homeSidebar',
            position: 'right',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            position: 'right',
            label: 'API',
          },
          {
            position: 'right',
            label: 'SDK',
            type: 'dropdown',
            items: [
            {
              type: 'docSidebar',
              docId: 'tutorial-extras/Android_SDK/FUNCTIONS',
              sidebarId: 'androidSidebar',
              label: 'Android SDK',
              docsPluginId: 'default',
            },
            {
              type: 'doc',
              docId: 'tutorial-extras/APPLE/MAIN',
              sidebarId: 'appleSidebar',
              label: 'Apple SDK',
              docsPluginId: 'default',
            },
            {
              type: 'docSidebar',
              docId: 'tutorial-extras/Android_SDK/FUNCTIONS',
              sidebarId: 'javascriptSidebar',
              label: 'JavaScript SDK',
              docsPluginId: 'default',
            },
          ]
        },
          

          // {
          //   href: 'https://start.merchant.dashboard.paytheory.com/settings',
          //   label: 'Dashboard',
          //   position: 'right',
          //   className: 'button button--secondary button--lg'
          // },
        ],
      },
      footer: {
        style: 'light',
        // links: [
        //   {
        //     title: 'Docs',
        //     items: [
        //       {
        //         label: 'Getting Started',
        //         to: '/docs/Main/OnlinePayments/Getting%20Started/Quickstart',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'Community',
        //     items: [
        //       {
        //         label: 'Stack Overflow',
        //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //       },
        //       {
        //         label: 'Discord',
        //         href: 'https://discordapp.com/invite/docusaurus',
        //       },
        //       {
        //         label: 'Twitter',
        //         href: 'https://twitter.com/docusaurus',
        //       },
        //     ],
        //   },
        //   {
        //     title: 'More',
        //     items: [
        //       // {
        //       //   label: 'Blog',
        //       //   to: '/blog',
        //       // },
        //       {
        //         label: 'GitHub',
        //         href: 'https://github.com/facebook/docusaurus',
        //       },
        //     ],
        //   },
        // ],
        copyright: `Copyright Pay Theory © ${new Date().getFullYear()}`,
      },
      prism: {
        theme: lightCodeTheme,
        //darkTheme: darkCodeTheme,
      },
    }),
    scripts: [
        {
            type: 'text/javascript',
            src: '/script/freshdesk.js',
            async: true,
            defer: true
        },
        {
            type: 'text/javascript',
            src: 'https://widget.freshworks.com/widgets/44000004239.js',
            async: true,
            defer: true
        },
        {
            type: 'text/javascript',
            src: '/script/hotjar.js',
            async: true,
            defer: true
        }
    ]
};

module.exports = config;
