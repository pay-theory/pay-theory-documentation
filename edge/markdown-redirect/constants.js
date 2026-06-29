const MARKDOWN_ACCEPT_TYPES = ['text/markdown', 'text/x-markdown'];

const MARKDOWN_HEADER_NAMES = [
  'x-accept-markdown',
  'x-doc-format',
  'x-format',
  'x-response-format',
  'x-return-format',
];

const MARKDOWN_HEADER_VALUES = ['1', 'true', 'markdown', 'md', 'text/markdown'];

const DIRECT_MARKDOWN_PATHS = ['/llms.txt'];
const DIRECT_MARKDOWN_PREFIXES = ['/llm-docs/'];

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
  MARKDOWN_ACCEPT_TYPES,
  MARKDOWN_HEADER_NAMES,
  MARKDOWN_HEADER_VALUES,
  STATIC_ASSET_EXTENSIONS,
};
