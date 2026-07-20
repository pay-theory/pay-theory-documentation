/* eslint-disable @typescript-eslint/no-require-imports */
// Validates agent-facing documentation artifacts after a full build.
// Run via `npm run agent-docs:check` locally or in CI.
// Exits with a non-zero code and identifies which file is stale or missing
// along with the command to fix it.

const fs = require('node:fs');
const path = require('node:path');

const SITE_DIR = process.cwd();
const BUILD_DIR = path.join(SITE_DIR, 'build');

const config = require('../agent-docs.config.js');

let errors = 0;
let warnings = 0;

const fail = (msg, fix) => {
  console.error(`[agent-docs:check] FAIL: ${msg}`);
  if (fix) {
    console.error(`  → Fix: ${fix}`);
  }
  errors++;
};

const warn = msg => {
  console.warn(`[agent-docs:check] WARN: ${msg}`);
  warnings++;
};

const pass = msg => {
  console.log(`[agent-docs:check] ok  : ${msg}`);
};

const buildPath = (...segments) => path.join(BUILD_DIR, ...segments);
const siteOrigin = new URL(config.siteUrl).origin;

const toPublicPathSegments = publicPath =>
  decodeURIComponent(publicPath).replace(/^\/+/, '').split('/').filter(Boolean);

const publicPathExistsInBuild = publicPath => {
  const segments = toPublicPathSegments(publicPath);
  const directPath = buildPath(...segments);
  if (fs.existsSync(directPath)) {
    return true;
  }

  if (path.extname(publicPath)) {
    return false;
  }

  return fs.existsSync(buildPath(...segments, 'index.html'));
};

const readManifestRoutes = () => {
  const manifestPath = buildPath('llm-docs', 'markdown-routes-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return new Set();
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    return new Set(Object.keys(manifest.routes || {}));
  } catch {
    return new Set();
  }
};

const sameSiteUrlResolves = (urlValue, manifestRoutes) => {
  let parsed;
  try {
    parsed = new URL(urlValue);
  } catch {
    return true;
  }

  if (parsed.origin !== siteOrigin) {
    return true;
  }

  const route = parsed.pathname.replace(/\/+$/, '') || '/';
  return manifestRoutes.has(route) || publicPathExistsInBuild(parsed.pathname);
};

const extractUrls = content => {
  const urls = new Set();
  const markdownLinkRegex = /\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g;
  const plainUrlRegex = /https?:\/\/[^\s)]+/g;

  for (const match of content.matchAll(markdownLinkRegex)) {
    urls.add(match[1].replace(/[.,;]+$/, ''));
  }
  for (const match of content.matchAll(plainUrlRegex)) {
    urls.add(match[0].replace(/[.,;]+$/, ''));
  }

  return [...urls];
};

// ── 1. Required build artifacts exist ─────────────────────────────────────

const requiredFiles = [
  {
    rel: 'sitemap.xml',
    label: 'Docusaurus sitemap',
    fix: 'npm run build',
  },
  {
    rel: 'robots.txt',
    label: 'robots.txt',
    fix: 'npm run build (copies static/robots.txt)',
  },
  {
    rel: 'llms.txt',
    label: 'llms.txt',
    fix: 'npm run build (postbuild generates build/llms.txt)',
  },
  {
    rel: 'llms-full.txt',
    label: 'llms-full.txt',
    fix: 'npm run build',
  },
  {
    rel: path.join('llm-docs', 'llms.txt'),
    label: 'llm-docs/llms.txt',
    fix: 'npm run build',
  },
  {
    rel: path.join('llm-docs', 'markdown-routes-manifest.json'),
    label: 'markdown-routes-manifest.json',
    fix: 'npm run build',
  },
  {
    rel: path.join('llm-docs', 'agent-index.json'),
    label: 'agent-index.json',
    fix: 'npm run build (or npm run agent-docs:build after a prior build)',
  },
];

for (const { rel, label, fix } of requiredFiles) {
  const full = buildPath(rel);
  if (fs.existsSync(full)) {
    pass(`${label} exists`);
  } else {
    fail(`${label} is missing at build/${rel}`, fix);
  }
}

for (const skill of Object.values(config.apiSkills)) {
  if (!skill.zipPath) {
    continue;
  }

  const full = buildPath(...toPublicPathSegments(skill.zipPath));
  if (fs.existsSync(full)) {
    pass(`${skill.label} ZIP exists`);
  } else {
    fail(
      `${skill.label} ZIP is missing at build${skill.zipPath}`,
      'npm run build (postbuild copies generated API skill packages)',
    );
  }
}

// ── 2. robots.txt contains the sitemap URL ─────────────────────────────────

const robotsPath = buildPath('robots.txt');
if (fs.existsSync(robotsPath)) {
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  const expectedSitemapLine = `Sitemap: ${config.siteUrl}/sitemap.xml`;
  if (robotsContent.includes(expectedSitemapLine)) {
    pass('robots.txt contains correct Sitemap URL');
  } else {
    fail(
      `robots.txt is missing "Sitemap: ${config.siteUrl}/sitemap.xml"`,
      'Check static/robots.txt — it should contain a Sitemap: directive pointing to the sitemap',
    );
  }
}

// ── 3. sitemap.xml contains at least one live /docs/ URL ──────────────────

const sitemapPath = buildPath('sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const hasDocsUrl = sitemapContent.includes(`<loc>${config.siteUrl}/docs/`);
  if (hasDocsUrl) {
    pass('sitemap.xml contains /docs/ URLs');
  } else {
    fail(
      'sitemap.xml does not contain any /docs/ URLs — the Docusaurus build may not have run',
      'npm run build',
    );
  }
}

// ── 4. llms.txt covers non-API sections ───────────────────────────────────

const validateLlmsContent = (relPath, label) => {
  const llmsTxtPath = buildPath(...relPath.split('/'));
  if (!fs.existsSync(llmsTxtPath)) {
    return;
  }

  const llmsTxtContent = fs.readFileSync(llmsTxtPath, 'utf8');
  const requiredSections = [
    'Getting Started',
    'Online Payments',
    'GraphQL API',
    'JavaScript SDK',
  ];
  for (const section of requiredSections) {
    if (llmsTxtContent.includes(section)) {
      pass(`${label} contains section: ${section}`);
    } else {
      fail(
        `${label} is missing section: "${section}"`,
        'Check agent-docs.config.js sections and re-run npm run build',
      );
    }
  }

  if (!llmsTxtContent.includes('GraphQL API only')) {
    pass(`${label} does not claim API-only coverage`);
  } else {
    warn(
      `${label} may still claim API-only coverage — check the generated content`,
    );
  }
};

validateLlmsContent('llms.txt', 'llms.txt');
validateLlmsContent(path.join('llm-docs', 'llms.txt'), 'llm-docs/llms.txt');

// ── 5. agent-index.json entries have existing Markdown targets ─────────────

const agentIndexPath = buildPath('llm-docs', 'agent-index.json');
if (fs.existsSync(agentIndexPath)) {
  let agentIndex;
  try {
    agentIndex = JSON.parse(fs.readFileSync(agentIndexPath, 'utf8'));
  } catch (e) {
    fail(`agent-index.json is not valid JSON: ${e.message}`, 'npm run build');
  }

  if (agentIndex && Array.isArray(agentIndex.entries)) {
    let missingTargets = 0;
    let checkedTargets = 0;

    for (const entry of agentIndex.entries) {
      if (typeof entry.markdownPath !== 'string') {
        continue;
      }
      const localPath = buildPath(
        ...entry.markdownPath.replace(/^\//, '').split('/'),
      );
      checkedTargets++;
      if (!fs.existsSync(localPath)) {
        if (missingTargets < 5) {
          warn(
            `agent-index.json entry "${entry.route}" → "${entry.markdownPath}" does not exist on disk`,
          );
        }
        missingTargets++;
      }
    }

    if (missingTargets > 5) {
      warn(
        `...and ${missingTargets - 5} more missing targets (run npm run build to regenerate)`,
      );
    }

    if (missingTargets === 0) {
      pass(
        `All ${checkedTargets} agent-index.json Markdown targets exist on disk`,
      );
    } else {
      fail(
        `${missingTargets} of ${checkedTargets} agent-index.json targets are missing from build/`,
        'npm run build to regenerate artifacts',
      );
    }
  }
}

// ── 6. manifest route targets exist ───────────────────────────────────────

const manifestPath = buildPath('llm-docs', 'markdown-routes-manifest.json');
if (fs.existsSync(manifestPath)) {
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    fail(
      `markdown-routes-manifest.json is not valid JSON: ${e.message}`,
      'npm run build',
    );
  }

  if (manifest && typeof manifest.routes === 'object') {
    let missing = 0;
    let total = 0;
    for (const mdPath of Object.values(manifest.routes)) {
      total++;
      const localPath = buildPath(...mdPath.replace(/^\//, '').split('/'));
      if (!fs.existsSync(localPath)) {
        missing++;
        if (missing <= 3) {
          warn(`manifest target missing: ${mdPath}`);
        }
      }
    }
    if (missing === 0) {
      pass(`All ${total} manifest route targets exist`);
    } else {
      fail(
        `${missing} of ${total} manifest targets missing from build/`,
        'npm run build',
      );
    }
  }
}

// ── 7. Topic indexes exist ─────────────────────────────────────────────────

for (const idx of config.topicIndexes) {
  const idxPath = buildPath('llm-docs', 'indexes', idx.filename);
  if (fs.existsSync(idxPath)) {
    pass(`Topic index exists: ${idx.filename}`);
  } else {
    fail(
      `Topic index missing: build/llm-docs/indexes/${idx.filename}`,
      'npm run build',
    );
  }
}

// ── 8. No duplicate routes in topic indexes ────────────────────────────────

if (fs.existsSync(manifestPath)) {
  const seenInIndexes = {};
  for (const idx of config.topicIndexes) {
    const idxPath = buildPath('llm-docs', 'indexes', idx.filename);
    if (!fs.existsSync(idxPath)) {
      continue;
    }
    const content = fs.readFileSync(idxPath, 'utf8');
    // Extract routes from lines like "- [Title](markdownUrl) — htmlUrl"
    const routeMatches = [...content.matchAll(/— (https?:\/\/[^\s)]+)/g)];
    const routes = routeMatches.map(m => m[1]);
    const seen = new Set();
    let dupes = 0;
    for (const r of routes) {
      if (seen.has(r)) {
        dupes++;
      }
      seen.add(r);
    }
    if (dupes === 0) {
      pass(`${idx.filename}: no duplicate routes`);
    } else {
      warn(`${idx.filename}: ${dupes} duplicate route(s) found`);
    }
    seenInIndexes[idx.key] = routes.length;
  }
}

// ── 9. Same-site links in generated indexes resolve ─────────────────────────

const manifestRoutes = readManifestRoutes();
const linkFiles = [
  'llms.txt',
  'llms-full.txt',
  path.join('llm-docs', 'llms.txt'),
  ...config.topicIndexes.map(idx =>
    path.join('llm-docs', 'indexes', idx.filename),
  ),
];

for (const relPath of linkFiles) {
  const fullPath = buildPath(...relPath.split('/'));
  if (!fs.existsSync(fullPath)) {
    continue;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const urls = extractUrls(content);
  const unresolved = urls.filter(
    url => !sameSiteUrlResolves(url, manifestRoutes),
  );

  if (unresolved.length === 0) {
    pass(`${relPath}: all same-site links resolve`);
  } else {
    for (const url of unresolved.slice(0, 5)) {
      warn(`${relPath}: unresolved same-site link ${url}`);
    }
    fail(
      `${relPath} has ${unresolved.length} unresolved same-site link(s)`,
      'Check agent-docs.config.js and re-run npm run build',
    );
  }
}

// ── Summary ───────────────────────────────────────────────────────────────

console.log('');
if (errors === 0 && warnings === 0) {
  console.log('[agent-docs:check] All checks passed.');
} else if (errors === 0) {
  console.log(
    `[agent-docs:check] Passed with ${warnings} warning(s). Review warnings above.`,
  );
} else {
  console.error(
    `[agent-docs:check] ${errors} check(s) failed, ${warnings} warning(s). See above for fix commands.`,
  );
  process.exit(1);
}
