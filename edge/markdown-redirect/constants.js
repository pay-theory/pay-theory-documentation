const MARKDOWN_ACCEPT_TYPES = ['text/markdown', 'text/x-markdown'];

const MARKDOWN_HEADER_NAMES = [
  'x-accept-markdown',
  'x-doc-format',
  'x-format',
  'x-response-format',
  'x-return-format',
];

const MARKDOWN_HEADER_VALUES = ['1', 'true', 'markdown', 'md', 'text/markdown'];

// Shared path contract between the build artifact generator, Lambda package,
// and CloudFront edge runtime. Keep these aligned with graphql-docs.config.js
// LLM output directories.
const LLM_DOCS_DIRNAME = 'llm-docs';
const SOURCE_DOCS_DIRNAME = 'source';
const MARKDOWN_ROUTES_MANIFEST_FILENAME = 'markdown-routes-manifest.json';
const LLM_DOCS_PUBLIC_PREFIX = `/${LLM_DOCS_DIRNAME}/`;
const SOURCE_DOCS_PUBLIC_PREFIX = `${LLM_DOCS_PUBLIC_PREFIX}${SOURCE_DOCS_DIRNAME}/`;
const MARKDOWN_ROUTES_MANIFEST_PUBLIC_PATH = `${LLM_DOCS_PUBLIC_PREFIX}${MARKDOWN_ROUTES_MANIFEST_FILENAME}`;
const MARKDOWN_ROUTES_MANIFEST_BUILD_PATH = `build/${LLM_DOCS_DIRNAME}/${MARKDOWN_ROUTES_MANIFEST_FILENAME}`;
const LLMS_TXT_PATH = '/llms.txt';
const HOMEPAGE_MARKDOWN_FILENAME = 'home.md';
const HOMEPAGE_MARKDOWN_PUBLIC_PATH = `${LLM_DOCS_PUBLIC_PREFIX}${HOMEPAGE_MARKDOWN_FILENAME}`;
const PUBLIC_SCHEMA_FILENAME = 'schema.graphql';
const PUBLIC_SCHEMA_PUBLIC_PATH = `${LLM_DOCS_PUBLIC_PREFIX}${PUBLIC_SCHEMA_FILENAME}`;

// Trust and portal paths agents probe before recommending a vendor. The docs
// site does not own these pages, so the edge answers with permanent redirects.
const REDIRECTS = {
  '/about': 'https://www.paytheory.com/about',
  '/contact': 'https://www.paytheory.com/contact',
  '/developers': '/docs/main/getting_started/quickstart',
  '/privacy': 'https://www.paytheory.com/privacy-policy',
};

const DIRECT_MARKDOWN_PATHS = [LLMS_TXT_PATH];
const DIRECT_MARKDOWN_PREFIXES = [LLM_DOCS_PUBLIC_PREFIX];

const STATIC_ASSET_EXTENSIONS = new Set([
  '.avif',
  '.css',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.js',
  '.json',
  '.map',
  '.pdf',
  '.png',
  '.svg',
  '.txt',
  '.webp',
  '.xml',
  '.zip',
]);

module.exports = {
  DIRECT_MARKDOWN_PATHS,
  DIRECT_MARKDOWN_PREFIXES,
  HOMEPAGE_MARKDOWN_FILENAME,
  HOMEPAGE_MARKDOWN_PUBLIC_PATH,
  LLM_DOCS_DIRNAME,
  LLM_DOCS_PUBLIC_PREFIX,
  LLMS_TXT_PATH,
  MARKDOWN_ACCEPT_TYPES,
  MARKDOWN_HEADER_NAMES,
  MARKDOWN_HEADER_VALUES,
  MARKDOWN_ROUTES_MANIFEST_BUILD_PATH,
  MARKDOWN_ROUTES_MANIFEST_FILENAME,
  MARKDOWN_ROUTES_MANIFEST_PUBLIC_PATH,
  PUBLIC_SCHEMA_FILENAME,
  PUBLIC_SCHEMA_PUBLIC_PATH,
  REDIRECTS,
  SOURCE_DOCS_DIRNAME,
  SOURCE_DOCS_PUBLIC_PREFIX,
  STATIC_ASSET_EXTENSIONS,
};
