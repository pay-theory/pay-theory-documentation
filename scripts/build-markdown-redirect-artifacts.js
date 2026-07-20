/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const {
  LLM_DOCS_DIRNAME,
  LLM_DOCS_PUBLIC_PREFIX,
  LLMS_TXT_PATH,
  MARKDOWN_ROUTES_MANIFEST_FILENAME,
  SOURCE_DOCS_DIRNAME,
  SOURCE_DOCS_PUBLIC_PREFIX,
} = require('../edge/markdown-redirect/constants');

const SITE_DIR = process.cwd();
const BUILD_DIR = path.join(SITE_DIR, 'build');
const LLM_DOCS_DIR = path.join(BUILD_DIR, LLM_DOCS_DIRNAME);
const SOURCE_DOCS_DIR = path.join(LLM_DOCS_DIR, SOURCE_DOCS_DIRNAME);
const METADATA_DIR = path.join(
  SITE_DIR,
  '.docusaurus',
  'docusaurus-plugin-content-docs',
  'default',
);
const MANIFEST_PATH = path.join(
  LLM_DOCS_DIR,
  MARKDOWN_ROUTES_MANIFEST_FILENAME,
);
const SIDEBARS_PATH = path.join(SITE_DIR, 'sidebars.js');
const MARKDOWN_SOURCE_EXTENSIONS = new Set(['.md', '.mdx']);

const withLeadingSlash = value => (value.startsWith('/') ? value : `/${value}`);
const stripTrailingSlash = value => value.replace(/\/+$/, '');
const normalizeRoute = value =>
  stripTrailingSlash(withLeadingSlash(value)) || '/';
const toPosixPath = value => value.split(path.sep).join('/');

const resolveSitePath = value => {
  if (value.startsWith('@site/')) {
    return path.join(SITE_DIR, value.slice('@site/'.length));
  }
  if (path.isAbsolute(value)) {
    return value;
  }
  return path.resolve(SITE_DIR, value);
};

const readJsonFile = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));

const listFiles = (dir, predicate) => {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const results = [];
  const stack = [dir];
  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.isFile() && predicate(fullPath)) {
        results.push(fullPath);
      }
    }
  }

  return results.sort((a, b) => a.localeCompare(b));
};

const isApiRoute = route =>
  route === '/docs/api' ||
  route.startsWith('/docs/api/') ||
  route === '/docs/lab/api' ||
  route.startsWith('/docs/lab/api/');

const isFenceBoundary = line => /^\s*(```|~~~)/.test(line);
const isTopLevelImport = line => /^\s*import(?:\s|['"]).*/.test(line);
const isTopLevelExport = line => /^\s*export\s+/.test(line);

const extractAttributeValue = (attrs, name) => {
  const pattern = new RegExp(`${name}=(["'])(.*?)\\1`);
  const match = attrs.match(pattern);
  return match ? match[2] : null;
};

// Conservative MDX normalizer: removes frontmatter and MDX imports/exports
// outside code fences, and converts Tabs/TabItem JSX boundaries to Markdown
// headings. Falls back to raw content on any uncaught error and emits a warning
// instead of failing the build.
const normalizeMdxSource = (content, sourcePath) => {
  try {
    let text = content;

    // Strip YAML frontmatter block at file start
    text = text.replace(/^---\n[\s\S]*?\n---\n?/, '');

    const output = [];
    let inFence = false;
    let skippingTabsOpenTag = false;

    for (const line of text.split('\n')) {
      if (isFenceBoundary(line)) {
        inFence = !inFence;
        output.push(line);
        continue;
      }

      if (inFence) {
        output.push(line);
        continue;
      }

      if (skippingTabsOpenTag) {
        if (line.includes('>')) {
          skippingTabsOpenTag = false;
        }
        continue;
      }

      if (isTopLevelImport(line) || isTopLevelExport(line)) {
        continue;
      }

      if (/<Tabs\b/.test(line)) {
        if (!line.includes('>')) {
          skippingTabsOpenTag = true;
        }
        continue;
      }

      if (/<\/Tabs>/.test(line) || /<\/TabItem>/.test(line)) {
        continue;
      }

      const tabItemMatch = line.match(/<TabItem\b([^>]*)>/);
      if (tabItemMatch) {
        const attrs = tabItemMatch[1];
        const heading =
          extractAttributeValue(attrs, 'label') ||
          extractAttributeValue(attrs, 'value') ||
          'Tab';
        output.push(`### ${heading}`);
        continue;
      }

      output.push(line);
    }

    text = output.join('\n');

    // Collapse runs of 3+ blank lines to 2
    text = text.replace(/\n{3,}/g, '\n\n');

    return `${text.trim()}\n`;
  } catch (err) {
    console.warn(
      `[markdown-artifacts] WARNING: normalization failed for ${path.relative(
        process.cwd(),
        sourcePath,
      )}: ${err.message} — using raw source`,
    );
    return content;
  }
};

const buildApiRoutes = () => {
  const routes = {};
  const markdownFiles = listFiles(
    LLM_DOCS_DIR,
    filePath =>
      path.extname(filePath).toLowerCase() === '.md' &&
      !filePath.startsWith(SOURCE_DOCS_DIR),
  );

  for (const filePath of markdownFiles) {
    const relativePath = toPosixPath(path.relative(LLM_DOCS_DIR, filePath));
    if (
      relativePath === LLMS_TXT_PATH.slice(1) ||
      relativePath.startsWith(`${SOURCE_DOCS_DIRNAME}/`)
    ) {
      continue;
    }

    const withoutExtension = relativePath.replace(/\.md$/, '');
    if (withoutExtension === 'index') {
      routes['/docs/api'] = `${LLM_DOCS_PUBLIC_PREFIX}index.md`;
      continue;
    }
    if (withoutExtension === 'lab/index') {
      routes['/docs/lab/api'] = `${LLM_DOCS_PUBLIC_PREFIX}lab/index.md`;
      continue;
    }
    if (withoutExtension.startsWith('lab/')) {
      const routePath = withoutExtension.slice('lab/'.length);
      routes[`/docs/lab/api/${routePath}`] =
        `${LLM_DOCS_PUBLIC_PREFIX}${relativePath}`;
      continue;
    }

    routes[`/docs/api/${withoutExtension}`] =
      `${LLM_DOCS_PUBLIC_PREFIX}${relativePath}`;
  }

  return routes;
};

const buildSourceDocRoutes = () => {
  const routes = {};
  const metadataFiles = listFiles(
    METADATA_DIR,
    filePath => path.extname(filePath).toLowerCase() === '.json',
  );

  fs.rmSync(SOURCE_DOCS_DIR, { recursive: true, force: true });

  for (const filePath of metadataFiles) {
    let payload;
    try {
      payload = readJsonFile(filePath);
    } catch {
      continue;
    }

    if (
      typeof payload.permalink !== 'string' ||
      typeof payload.source !== 'string'
    ) {
      continue;
    }

    const route = normalizeRoute(payload.permalink);
    if (!route.startsWith('/docs') || isApiRoute(route)) {
      continue;
    }

    const sourcePath = resolveSitePath(payload.source);
    const extension = path.extname(sourcePath).toLowerCase();
    if (
      !MARKDOWN_SOURCE_EXTENSIONS.has(extension) ||
      !fs.existsSync(sourcePath)
    ) {
      continue;
    }

    const outputRelativePath = `${route.replace(/^\/+/, '')}.md`;
    const outputPath = path.join(SOURCE_DOCS_DIR, outputRelativePath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    const rawContent = fs.readFileSync(sourcePath, 'utf8');
    const normalizedContent = normalizeMdxSource(rawContent, sourcePath);
    fs.writeFileSync(outputPath, normalizedContent);
    routes[route] = `${SOURCE_DOCS_PUBLIC_PREFIX}${toPosixPath(
      outputRelativePath,
    )}`;
  }

  return routes;
};

const writeManifest = routes => {
  fs.mkdirSync(LLM_DOCS_DIR, { recursive: true });
  const sortedRoutes = Object.fromEntries(
    Object.entries(routes).sort(([left], [right]) => left.localeCompare(right)),
  );
  const manifest = {
    version: 1,
    generatedBy: 'scripts/build-markdown-redirect-artifacts.js',
    routes: sortedRoutes,
  };
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  return Object.keys(sortedRoutes).length;
};

const patchGeneratedSidebarTypes = () => {
  if (!fs.existsSync(SIDEBARS_PATH)) {
    return false;
  }

  const content = fs.readFileSync(SIDEBARS_PATH, 'utf8');
  let patched = content.replace(
    /(const __gqlDocsTargetKey = ['"]apiSidebar['"];\n)(?:\/\*\*[\s\S]*?\*\/\n)?const __gqlDocsMerge = \(items, insert, opts\) => \{/,
    `$1/**
 * @param {any} items
 * @param {any} insert
 * @param {any} [opts]
 * @returns {any}
 */
const __gqlDocsMerge = (items, insert, opts) => {`,
  );
  patched = patched.replace(
    /(\n\s+)(?!\/\*\* @param \{any\} item \*\/\n\s+)const findIndex = (?:\((item)\)|(item)) => \{/,
    (match, indent) =>
      `${indent}/** @param {any} item */${indent}const findIndex = item => {`,
  );

  if (patched === content) {
    return false;
  }

  fs.writeFileSync(SIDEBARS_PATH, patched);
  return true;
};

const formatGeneratedSidebar = () => {
  if (!fs.existsSync(SIDEBARS_PATH)) {
    return;
  }

  // graphql-doc writes the sidebar block as raw JSON. Keep the checked-in
  // generated file stable so required builds do not leave a dirty worktree.
  const npxBin = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  execFileSync(
    npxBin,
    [
      'prettier',
      '--single-quote',
      '--trailing-comma',
      'all',
      '--write',
      'sidebars.js',
    ],
    { cwd: SITE_DIR, stdio: 'ignore' },
  );
};

const apiRoutes = buildApiRoutes();
const sourceDocRoutes = buildSourceDocRoutes();
const routeCount = writeManifest({ ...apiRoutes, ...sourceDocRoutes });
const sidebarPatched = patchGeneratedSidebarTypes();
formatGeneratedSidebar();

console.log(
  [
    `[markdown-artifacts] Wrote ${routeCount} markdown routes to ${toPosixPath(
      path.relative(SITE_DIR, MANIFEST_PATH),
    )}`,
    `[markdown-artifacts] API routes: ${Object.keys(apiRoutes).length}`,
    `[markdown-artifacts] Source doc routes: ${Object.keys(sourceDocRoutes).length}`,
    sidebarPatched
      ? '[markdown-artifacts] Restored generated sidebar JSDoc annotations'
      : '[markdown-artifacts] Generated sidebar JSDoc annotations already present',
    '[markdown-artifacts] Formatted generated sidebar',
  ].join('\n'),
);
