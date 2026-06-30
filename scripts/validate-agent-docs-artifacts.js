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

const llmsTxtPath = buildPath('llms.txt');
if (fs.existsSync(llmsTxtPath)) {
  const llmsTxtContent = fs.readFileSync(llmsTxtPath, 'utf8');
  const requiredSections = [
    'Getting Started',
    'Online Payments',
    'GraphQL API',
    'JavaScript SDK',
  ];
  for (const section of requiredSections) {
    if (llmsTxtContent.includes(section)) {
      pass(`llms.txt contains section: ${section}`);
    } else {
      fail(
        `llms.txt is missing section: "${section}"`,
        'Check agent-docs.config.js sections and re-run npm run build',
      );
    }
  }

  if (!llmsTxtContent.includes('GraphQL API only')) {
    pass('llms.txt does not claim API-only coverage');
  } else {
    warn(
      'llms.txt may still claim API-only coverage — check the generated content',
    );
  }
}

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
