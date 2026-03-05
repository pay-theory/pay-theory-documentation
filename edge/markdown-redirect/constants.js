'use strict';

/**
 * Header names recognized as markdown format toggles.
 * These mirror the existing graphql-doc dev middleware semantics.
 */
const MARKDOWN_HEADER_NAMES = [
  'x-accept-markdown',
  'x-doc-format',
  'x-format',
  'x-response-format',
  'x-return-format',
];

/**
 * Accepted markdown signal values for custom format headers.
 */
const MARKDOWN_HEADER_VALUES = new Set([
  '1',
  'true',
  'markdown',
  'md',
  'text/markdown',
]);

/**
 * Accepted markdown MIME types in the HTTP Accept header.
 */
const MARKDOWN_ACCEPT_TYPES = ['text/markdown', 'text/x-markdown'];

/**
 * Paths that should never be rewritten by markdown negotiation.
 */
const BYPASS_PATH_PREFIXES = ['/llm-docs', '/assets', '/img'];

module.exports = {
  MARKDOWN_ACCEPT_TYPES,
  MARKDOWN_HEADER_NAMES,
  MARKDOWN_HEADER_VALUES,
  BYPASS_PATH_PREFIXES,
};
