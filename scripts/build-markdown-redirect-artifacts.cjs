#!/usr/bin/env node

/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const {
  DOCS_API_BASE,
  DOCS_LAB_API_BASE,
  LLM_DOCS_ROOT,
  LAB_LLM_DOCS_ROOT,
  NON_API_LLM_ROOT,
} = require('../edge/markdown-redirect/path-config.cjs');

const REPO_ROOT = path.resolve(__dirname, '..');
const BUILD_DIR = path.join(REPO_ROOT, 'build');
const BUILD_LLM_DIR = path.join(BUILD_DIR, LLM_DOCS_ROOT.replace(/^\/+/, ''));
const BUILD_LLM_LAB_DIR = path.join(BUILD_DIR, LAB_LLM_DOCS_ROOT.replace(/^\/+/, ''));
const NON_API_OUTPUT_ROOT = path.join(BUILD_DIR, NON_API_LLM_ROOT.replace(/^\/+/, ''));
const MANIFEST_PATH = path.join(BUILD_LLM_DIR, 'markdown-routes-manifest.json');
const METADATA_DIR = path.join(
  REPO_ROOT,
  '.docusaurus',
  'docusaurus-plugin-content-docs',
  'default',
);

const NON_API_DOCS_PREFIXES = ['/docs', '/docs/lab'];
const EXCLUDED_API_PREFIXES = ['/docs/api', '/docs/lab/api'];
const SOURCE_EXTENSIONS = new Set(['.md', '.mdx']);

/**
 * Normalize documentation route keys so matching remains stable between
 * runtime requests and generated metadata entries.
 */
function normalizeRoute(route) {
  if (!route || route === '/') {
    return '/';
  }
  const [pathname] = String(route).split('?');
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed || '/';
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolve docusaurus metadata source values such as `@site/docs/...` into
 * local filesystem paths.
 */
function resolveSourcePath(sourceValue) {
  if (sourceValue.startsWith('@site/')) {
    return path.join(REPO_ROOT, sourceValue.slice('@site/'.length));
  }
  if (path.isAbsolute(sourceValue)) {
    return sourceValue;
  }
  return path.resolve(REPO_ROOT, sourceValue);
}

function routeIsInPrefixes(route, prefixes) {
  return prefixes.some((prefix) => route === prefix || route.startsWith(`${prefix}/`));
}

function collectMetadataFiles() {
  if (!fs.existsSync(METADATA_DIR)) {
    throw new Error(`Docs metadata directory not found: ${METADATA_DIR}`);
  }

  return fs
    .readdirSync(METADATA_DIR)
    .filter((name) => name.endsWith('.json') && !name.startsWith('__'))
    .map((name) => path.join(METADATA_DIR, name))
    .sort((a, b) => a.localeCompare(b));
}

function toPosixRelativePath(root, filePath) {
  return path.relative(root, filePath).split(path.sep).join(path.posix.sep);
}

/**
 * Build exact route -> markdown target mapping for generated GraphQL docs.
 * This enables pass-through behavior when a markdown request does not have a
 * generated markdown target.
 */
function collectGraphqlRouteMap() {
  const routeMap = new Map();

  if (isFile(path.join(BUILD_LLM_DIR, 'index.md'))) {
    routeMap.set(DOCS_API_BASE, `${LLM_DOCS_ROOT}/index.md`);
  }
  if (isFile(path.join(BUILD_LLM_LAB_DIR, 'index.md'))) {
    routeMap.set(DOCS_LAB_API_BASE, `${LAB_LLM_DOCS_ROOT}/index.md`);
  }

  const addRoutesFromTree = (rootDir, docsPrefix, llmPrefix) => {
    if (!fs.existsSync(rootDir)) {
      return;
    }

    const walk = (currentDir) => {
      const entries = fs.readdirSync(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        const absolutePath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          if (
            rootDir === BUILD_LLM_DIR &&
            (entry.name === 'lab' || entry.name === 'non-api')
          ) {
            continue;
          }
          walk(absolutePath);
          continue;
        }
        if (!entry.isFile() || !entry.name.endsWith('.md')) {
          continue;
        }
        if (entry.name === 'index.md') {
          continue;
        }

        const relativePath = toPosixRelativePath(rootDir, absolutePath);
        const withoutExt = relativePath.slice(0, -'.md'.length);
        const segments = withoutExt.split('/').filter(Boolean);
        if (segments.length === 1) {
          const group = segments[0];
          routeMap.set(`${docsPrefix}/${group}`, `${llmPrefix}/${group}.md`);
          continue;
        }
        if (segments.length >= 2) {
          const [group] = segments;
          const operation = segments[segments.length - 1];
          routeMap.set(
            `${docsPrefix}/${group}/${operation}`,
            `${llmPrefix}/${group}/${operation}.md`,
          );
        }
      }
    };

    walk(rootDir);
  };

  addRoutesFromTree(BUILD_LLM_DIR, DOCS_API_BASE, LLM_DOCS_ROOT);
  addRoutesFromTree(BUILD_LLM_LAB_DIR, DOCS_LAB_API_BASE, LAB_LLM_DOCS_ROOT);

  return routeMap;
}

/**
 * Copy non-API markdown sources into deployable static output and build route
 * mapping for Lambda@Edge non-GraphQL markdown lookups.
 */
function collectAndCopyNonApiRoutes() {
  const routeMap = new Map();
  const metadataFiles = collectMetadataFiles();

  for (const metadataPath of metadataFiles) {
    const payload = readJson(metadataPath);
    const permalink =
      typeof payload.permalink === 'string' ? normalizeRoute(payload.permalink) : '';
    const sourceValue = typeof payload.source === 'string' ? payload.source : '';
    if (!permalink || !sourceValue) {
      continue;
    }

    if (!routeIsInPrefixes(permalink, NON_API_DOCS_PREFIXES)) {
      continue;
    }
    if (routeIsInPrefixes(permalink, EXCLUDED_API_PREFIXES)) {
      continue;
    }

    const sourcePath = resolveSourcePath(sourceValue);
    const extension = path.extname(sourcePath).toLowerCase();
    if (!SOURCE_EXTENSIONS.has(extension) || !isFile(sourcePath)) {
      continue;
    }

    const normalizedRoute = normalizeRoute(permalink);
    const routeWithoutSlash = normalizedRoute.slice(1);
    const targetRelative = path.posix.join(
      NON_API_LLM_ROOT.replace(/^\/+/, ''),
      `${routeWithoutSlash}${extension}`,
    );
    const targetAbsolute = path.join(BUILD_DIR, targetRelative);

    ensureDir(path.dirname(targetAbsolute));
    fs.copyFileSync(sourcePath, targetAbsolute);
    routeMap.set(normalizedRoute, `/${targetRelative}`);
  }

  return routeMap;
}

function sortMap(map) {
  return Object.fromEntries([...map.entries()].sort((a, b) => a[0].localeCompare(b[0])));
}

function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    throw new Error(`Build output not found: ${BUILD_DIR}. Run docusaurus build first.`);
  }
  if (!fs.existsSync(BUILD_LLM_DIR)) {
    throw new Error(`LLM docs output not found: ${BUILD_LLM_DIR}.`);
  }

  ensureDir(NON_API_OUTPUT_ROOT);
  const graphqlRoutes = collectGraphqlRouteMap();
  const nonApiRoutes = collectAndCopyNonApiRoutes();

  const manifest = {
    version: 1,
    graphqlRoutes: sortMap(graphqlRoutes),
    nonApiRoutes: sortMap(nonApiRoutes),
  };

  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  console.log(
    `[markdown-artifacts] wrote ${MANIFEST_PATH} (graphql: ${graphqlRoutes.size}, non-api: ${nonApiRoutes.size})`,
  );
}

try {
  main();
} catch (error) {
  console.error(
    `[markdown-artifacts] failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
}
