/* eslint-disable @typescript-eslint/no-require-imports */
// Generates agent-facing documentation artifacts from the markdown route manifest
// and Docusaurus metadata. Run automatically after `build-markdown-redirect-artifacts.js`
// via the `postbuild` npm script. Do not hand-edit build/** outputs.

const fs = require('node:fs');
const path = require('node:path');
const {
  LLM_DOCS_DIRNAME,
  MARKDOWN_ROUTES_MANIFEST_FILENAME,
} = require('../edge/markdown-redirect/constants');

const SITE_DIR = process.cwd();
const BUILD_DIR = path.join(SITE_DIR, 'build');
const LLM_DOCS_BUILD_DIR = path.join(BUILD_DIR, LLM_DOCS_DIRNAME);
const MANIFEST_PATH = path.join(
  LLM_DOCS_BUILD_DIR,
  MARKDOWN_ROUTES_MANIFEST_FILENAME,
);
const METADATA_DIR = path.join(
  SITE_DIR,
  '.docusaurus',
  'docusaurus-plugin-content-docs',
  'default',
);
const INDEXES_DIR = path.join(LLM_DOCS_BUILD_DIR, 'indexes');

const config = require('../agent-docs.config.js');

const readJsonFile = filePath => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const siteBuildPath = publicPath =>
  path.join(BUILD_DIR, ...publicPath.replace(/^\/+/, '').split('/'));

const isExcluded = route =>
  config.excludedRoutePatterns.some(
    p => route === p || route.startsWith(`${p}/`),
  );

// Build a map of permalink → {title, sidebarLabel, sourcePath} from Docusaurus metadata.
const buildDocMetadata = () => {
  const meta = {};
  if (!fs.existsSync(METADATA_DIR)) {
    return meta;
  }

  const files = fs.readdirSync(METADATA_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    let payload;
    try {
      payload = readJsonFile(path.join(METADATA_DIR, file));
    } catch {
      continue;
    }

    const permalink =
      typeof payload.permalink === 'string' ? payload.permalink : null;
    if (!permalink) {
      continue;
    }

    const route = permalink.replace(/\/+$/, '') || '/';
    meta[route] = {
      title: payload.title || null,
      sidebarLabel:
        payload.frontMatter?.sidebar_label ||
        payload.sidebar_label ||
        payload.sidebarLabel ||
        null,
      sourcePath: typeof payload.source === 'string' ? payload.source : null,
    };
  }

  return meta;
};

const isLabRoute = route =>
  route === '/docs/lab' || route.startsWith('/docs/lab/');

const isApiRoute = route =>
  route === '/docs/api' ||
  route.startsWith('/docs/api/') ||
  route === '/docs/lab/api' ||
  route.startsWith('/docs/lab/api/');

const inferSection = route => {
  for (const section of config.sections) {
    if (section.routeExact && route === section.routeExact) {
      return section.key;
    }
    if (section.routePrefix && route.startsWith(section.routePrefix)) {
      return section.key;
    }
  }
  return null;
};

// Build enriched catalog from manifest + Docusaurus metadata.
const buildAgentIndex = (manifest, docMeta) => {
  const catalog = [];

  for (const [route, markdownPath] of Object.entries(manifest.routes)) {
    if (isExcluded(route)) {
      continue;
    }

    const meta = docMeta[route] || {};
    const markdownUrl = `${config.siteUrl}${markdownPath}`;
    const htmlUrl = `${config.siteUrl}${route}`;

    catalog.push({
      route,
      htmlUrl,
      markdownUrl,
      markdownPath,
      title: meta.title || null,
      sidebarLabel: meta.sidebarLabel || null,
      version: isLabRoute(route) ? 'lab' : 'live',
      section: inferSection(route),
      sourceType: isApiRoute(route) ? 'api' : 'source',
      sourcePath: meta.sourcePath || null,
    });
  }

  catalog.sort((a, b) => a.route.localeCompare(b.route));
  return catalog;
};

const writeAgentIndex = catalog => {
  const outPath = path.join(LLM_DOCS_BUILD_DIR, 'agent-index.json');
  const output = {
    version: 1,
    generatedBy: 'scripts/build-agent-docs-artifacts.js',
    entries: catalog,
  };
  fs.mkdirSync(LLM_DOCS_BUILD_DIR, { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);
  return outPath;
};

const copyApiSkillPackages = () => {
  const copied = [];
  const missing = [];

  for (const skill of Object.values(config.apiSkills)) {
    if (!skill.zipSourcePath || !skill.zipPath) {
      continue;
    }

    const sourcePath = path.join(SITE_DIR, skill.zipSourcePath);
    const outputPath = siteBuildPath(skill.zipPath);

    if (!fs.existsSync(sourcePath)) {
      missing.push(skill.zipSourcePath);
      continue;
    }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.copyFileSync(sourcePath, outputPath);
    copied.push({
      label: skill.label,
      sourcePath,
      outputPath,
    });
  }

  for (const missingPath of missing) {
    console.warn(
      `[agent-docs] WARNING: API skill package missing at ${missingPath}; generated llms.txt will still include the configured link`,
    );
  }

  return copied;
};

// Build the concise llms.txt from config sections + manifest.
const buildLlmsTxt = manifest => {
  const lines = [
    '# Pay Theory Documentation',
    '',
    `For human-readable documentation visit: ${config.siteUrl}`,
    '',
    `> ${config.defaultVersionGuidance}`,
    '',
    '## Machine-Readable Resources',
    '',
    `- [Markdown Route Manifest](${config.siteUrl}${config.llmDocs.manifestPath}): JSON map of every docs route to its Markdown URL`,
    `- [Agent Index](${config.siteUrl}${config.llmDocs.agentIndexPath}): Enriched catalog with title, version, section, and source metadata`,
    `- [Full Markdown Index](${config.siteUrl}${config.llmDocs.llmsFullTxtPath}): All Markdown-accessible routes`,
    '',
    '## Markdown Negotiation',
    '',
    'Any `/docs/**` URL returns Markdown instead of HTML when the request includes:',
    '- `Accept: text/markdown`',
    '- `x-format: md` (or `x-accept-markdown: true`, `x-doc-format: markdown`, etc.)',
    '',
    '## API Skills',
    '',
  ];

  for (const skill of Object.values(config.apiSkills)) {
    lines.push(
      `- [${skill.label}](${config.siteUrl}${skill.docsRoute}): Downloadable agent skill package`,
    );
    if (skill.zipPath) {
      lines.push(`  - ZIP: ${config.siteUrl}${skill.zipPath}`);
    }
  }

  lines.push('');
  lines.push('## Documentation Sections');
  lines.push('');

  for (const section of config.sections) {
    const url = section.llmDocsPrefix
      ? `${config.siteUrl}${section.representativeRoute}`
      : `${config.siteUrl}${section.representativeRoute}`;
    lines.push(`### ${section.title}`);
    lines.push('');
    lines.push(section.description);
    lines.push('');
    lines.push(`- [${section.title}](${url})`);

    // For GraphQL API, emit all top-level llm-doc group links from manifest.
    if (section.llmDocsPrefix) {
      const apiRoutes = Object.entries(manifest.routes)
        .filter(
          ([r]) =>
            r.startsWith('/docs/api/') &&
            !r.startsWith('/docs/api/agent-skills') &&
            !isExcluded(r),
        )
        .slice(0, 20);

      for (const [, mdPath] of apiRoutes) {
        const name = mdPath
          .replace(/^\/llm-docs\//, '')
          .replace(/\.md$/, '')
          .replace(/\//g, ' › ');
        lines.push(`- [${name}](${config.siteUrl}${mdPath})`);
      }
    }

    lines.push('');
  }

  lines.push('## Topic Indexes');
  lines.push('');
  for (const idx of config.topicIndexes) {
    lines.push(
      `- [${idx.title}](${config.siteUrl}${config.llmDocs.indexesBasePath}${idx.filename})`,
    );
  }
  lines.push('');

  return lines.join('\n');
};

const buildLlmsFullTxt = (manifest, docMeta) => {
  const lines = [
    '# Pay Theory Documentation — Full Markdown Index',
    '',
    `Generated from: ${config.siteUrl}${config.llmDocs.manifestPath}`,
    '',
  ];

  const entries = Object.entries(manifest.routes).filter(
    ([r]) => !isExcluded(r),
  );

  lines.push(`${entries.length} routes total`, '');

  for (const [route, mdPath] of entries) {
    const meta = docMeta[route] || {};
    const label = meta.title || route;
    const version = isLabRoute(route) ? ' [lab]' : ' [live]';
    lines.push(
      `- [${label}](${config.siteUrl}${mdPath})${version} — ${config.siteUrl}${route}`,
    );
  }

  lines.push('');
  return lines.join('\n');
};

const buildTopicIndex = (
  title,
  filename,
  routePrefixes,
  excludePrefixes,
  manifest,
  docMeta,
) => {
  const lines = [
    `# Pay Theory Documentation — ${title}`,
    '',
    `Generated from: ${config.siteUrl}${config.llmDocs.manifestPath}`,
    '',
  ];

  const entries = Object.entries(manifest.routes).filter(([r]) => {
    if (isExcluded(r)) {
      return false;
    }
    if (excludePrefixes.some(p => r.startsWith(p))) {
      return false;
    }
    return routePrefixes.some(p => r.startsWith(p));
  });

  lines.push(`${entries.length} routes`, '');

  for (const [route, mdPath] of entries) {
    const meta = docMeta[route] || {};
    const label = meta.title || route;
    lines.push(
      `- [${label}](${config.siteUrl}${mdPath}) — ${config.siteUrl}${route}`,
    );
  }

  lines.push('');
  return { filename, content: lines.join('\n'), count: entries.length };
};

const main = () => {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(
      `[agent-docs] ERROR: Manifest not found at ${MANIFEST_PATH}. Run \`npm run build\` first.`,
    );
    process.exit(1);
  }

  const manifest = readJsonFile(MANIFEST_PATH);
  const docMeta = buildDocMetadata();

  // agent-index.json
  const catalog = buildAgentIndex(manifest, docMeta);
  const agentIndexPath = writeAgentIndex(catalog);
  const copiedApiSkills = copyApiSkillPackages();

  // llms.txt → build/llms.txt
  const llmsTxt = buildLlmsTxt(manifest);
  const llmsTxtPath = path.join(BUILD_DIR, 'llms.txt');
  fs.writeFileSync(llmsTxtPath, llmsTxt);
  const llmDocsLlmsTxtPath = path.join(LLM_DOCS_BUILD_DIR, 'llms.txt');
  fs.writeFileSync(llmDocsLlmsTxtPath, llmsTxt);

  // llms-full.txt → build/llms-full.txt
  const llmsFullTxt = buildLlmsFullTxt(manifest, docMeta);
  const llmsFullPath = path.join(BUILD_DIR, 'llms-full.txt');
  fs.writeFileSync(llmsFullPath, llmsFullTxt);

  // topic indexes → build/llm-docs/indexes/
  fs.mkdirSync(INDEXES_DIR, { recursive: true });
  let totalIndexRoutes = 0;
  for (const idx of config.topicIndexes) {
    const result = buildTopicIndex(
      idx.title,
      idx.filename,
      idx.routePrefixes,
      idx.excludePrefixes,
      manifest,
      docMeta,
    );
    fs.writeFileSync(path.join(INDEXES_DIR, result.filename), result.content);
    totalIndexRoutes += result.count;
  }

  console.log(
    [
      `[agent-docs] Wrote agent-index.json with ${catalog.length} entries → ${path.relative(SITE_DIR, agentIndexPath)}`,
      `[agent-docs] Wrote llms.txt → ${path.relative(SITE_DIR, llmsTxtPath)}`,
      `[agent-docs] Wrote llm-docs/llms.txt alias → ${path.relative(SITE_DIR, llmDocsLlmsTxtPath)}`,
      `[agent-docs] Copied ${copiedApiSkills.length} API skill package(s) → build/${LLM_DOCS_DIRNAME}/agent-skills/`,
      `[agent-docs] Wrote llms-full.txt with ${Object.keys(manifest.routes).length} routes → ${path.relative(SITE_DIR, llmsFullPath)}`,
      `[agent-docs] Wrote ${config.topicIndexes.length} topic indexes (${totalIndexRoutes} total route entries) → build/${LLM_DOCS_DIRNAME}/indexes/`,
    ].join('\n'),
  );
};

main();
