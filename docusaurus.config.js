// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

//const lightCodeTheme = require('./src/css/prismLight.js');

import { themes as prismThemes } from 'prism-react-renderer';
//const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// Identity data for agents and search engines. Mirrors the Organization
// published on www.paytheory.com so both sites resolve to one entity.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.paytheory.com/#organization',
      name: 'Pay Theory',
      url: 'https://www.paytheory.com',
      logo: 'https://cdn.prod.website-files.com/63612c14cec8f7a33524ce09/6a5e1fd96f2e023763d57ca6_Pay%20Theory%20Primary%20Logo%20-%20Purple%20(1).png',
      description:
        'Pay Theory is a payment processor that lets software platforms accept card, ACH, cash, and digital wallet payments.',
      sameAs: [
        'https://www.linkedin.com/company/paytheory/',
        'https://twitter.com/paytheory',
        'https://www.crunchbase.com/organization/pay-theory',
        'http://www.wikidata.org/entity/Q140757395',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          telephone: '+1-513-207-9431',
          email: 'support@paytheory.com',
          areaServed: 'US',
          availableLanguage: 'English',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'technical support',
          email: 'developer@paytheory.com',
          areaServed: 'US',
          availableLanguage: 'English',
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://docs.paytheory.com/#website',
      name: 'Pay Theory Docs',
      url: 'https://docs.paytheory.com/',
      description:
        'Developer documentation for Pay Theory: the GraphQL API, JavaScript, Apple iOS, and Android SDKs, and guides for online payments, invoicing, and recurring billing.',
      inLanguage: 'en',
      publisher: { '@id': 'https://www.paytheory.com/#organization' },
    },
  ],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Pay Theory Docs',
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
              label: 'Live',
              path: '',
              banner: 'none',
            },
            lab: {
              label: 'Lab (preview)',
              path: 'lab',
              banner: 'none',
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

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  plugins: [
    [
      require.resolve('@lewl/graphql-doc/docusaurus-plugin'),
      {
        configPath: './graphql-docs.config.js',
        allTargets: true,
        // prebuild/prestart already clean and regenerate the output. Emptying it
        // again here races the docs plugin, which loads in parallel.
        cleanOutput: false,
        markdownRedirect: {
          enabled: true,
          docsBasePath: '/docs/api',
          llmDocsPath: '/llm-docs',
          docsSourceFallback: {
            enabled: true,
            docsBasePaths: ['/docs'],
            metadataBaseDir: '.docusaurus/docusaurus-plugin-content-docs',
            docsPluginIds: ['default'],
            cacheTtlMs: 2000,
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/docs/sdk/javascript/failed_transactions',
            to: '/docs/main/after_payments/failed_transactions',
          },
          {
            from: '/docs/lab/sdk/javascript/failed_transactions',
            to: '/docs/lab/main/after_payments/failed_transactions',
          },
        ],
      },
    ],
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
      image: 'img/social-card.png',
      metadata: [{ property: 'og:type', content: 'website' }],
      mermaid: {
        theme: { light: 'default', dark: 'dark' },
        options: {
          maxTextSize: 50000,
          fontFamily:
            'halyard-text, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          flowchart: {
            htmlLabels: true,
            curve: 'basis',
            rankSpacing: 60,
            nodeSpacing: 30,
            padding: 15,
          },
        },
      },
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
          {
            type: 'docsVersionDropdown',
            position: 'left',
            dropdownActiveClassDisabled: true,
          },
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
  headTags: [
    {
      tagName: 'script',
      attributes: { type: 'application/ld+json' },
      innerHTML: JSON.stringify(structuredData),
    },
  ],

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
