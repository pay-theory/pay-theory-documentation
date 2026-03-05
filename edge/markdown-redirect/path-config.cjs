'use strict';

/**
 * Canonical path constants shared by static artifact generation and the
 * Lambda@Edge markdown redirect runtime.
 */
const DOCS_API_BASE = '/docs/api';
const DOCS_LAB_API_BASE = '/docs/lab/api';
const LLM_DOCS_ROOT = '/llm-docs';
const LAB_LLM_DOCS_ROOT = '/llm-docs/lab';
const NON_API_LLM_ROOT = '/llm-docs/non-api';

module.exports = {
  DOCS_API_BASE,
  DOCS_LAB_API_BASE,
  LLM_DOCS_ROOT,
  LAB_LLM_DOCS_ROOT,
  NON_API_LLM_ROOT,
};
