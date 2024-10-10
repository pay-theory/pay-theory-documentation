// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

//const lightCodeTheme = require('./src/css/prismLight.js');

import { themes as prismThemes } from 'prism-react-renderer';
//const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Documentation',
  tagline: 'Explore our quickstarts and guides.',

  favicon: 'img/favicon.jpg',

  // Set the production url of your site here
  // url: 'https://192.168.13.54:3000',
  url: 'https://docs.paytheory.com/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

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
          lastVersion: 'current',
          versions: {
            current: {
              label: '2.23.0',
              path: '',
            },
          },
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
    // [
    //   'docusaurus-plugin-typedoc',
    //
    //   // Plugin / TypeDoc options
    //   {
    //     entryPoints: ['theme/pay_theory_types.ts'],
    //     tsconfig: 'tsconfig.json',
    //   },
    // ],
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
        apiKey: 'fa68347e5d228c27e710aa15ccda53de',
        indexName: 'paytheory',
        ContextualSearch: true,
        placeholder: 'search in Pay Theory website',
        appId: '750L2445EV',
        insights: true,
        debug: false,
      },

      navbar: {
        title: 'Docs',
        logo: {
          alt: 'Pay Theory Logo',
          src: 'img/logo.svg',
          href: '/',
        },
        items: [
          // {
          //   type: 'docsVersionDropdown',
          //   position: 'left',
          //   dropdownActiveClassDisabled: true,
          // },
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
                docId: 'sdk/javascript/main',
                sidebarId: 'javascriptSidebar',
                label: 'JavaScript SDK',
                docsPluginId: 'default',
              },
              {
                type: 'doc',
                docId: 'sdk/apple/main',
                sidebarId: 'appleSidebar',
                label: 'Apple SDK',
                docsPluginId: 'default',
              },
              {
                type: 'docSidebar',
                docId: 'sdk/android/functions',
                sidebarId: 'androidSidebar',
                label: 'Android SDK',
                docsPluginId: 'default',
              },
            ],
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
        theme: prismThemes.github,
        //darkTheme: darkCodeTheme,
      },
    }),
  scripts: [
    // Need to run this script first to ensure that the widget_id is set before the widget is initialized
    {
      type: 'text/javascript',
      src: '/script/freshdesk.js',
      async: false,
      defer: false,
    },
    {
      type: 'text/javascript',
      src: 'https://widget.freshworks.com/widgets/44000004239.js',
      async: true,
      defer: true,
    },
    {
      type: 'text/javascript',
      src: '/script/hotjar.js',
      async: true,
      defer: true,
    },
  ],
};

module.exports = config;
