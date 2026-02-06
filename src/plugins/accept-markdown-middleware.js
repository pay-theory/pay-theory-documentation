const fs = require('node:fs');
const path = require('node:path');
const evalSourceMapModule = require('@docusaurus/core/lib/commands/utils/legacy/evalSourceMapMiddleware');
const evalSourceMapMiddleware = evalSourceMapModule.default || evalSourceMapModule;

const MARKDOWN_ACCEPT_TYPES = ['text/markdown', 'text/x-markdown'];

const acceptsMarkdown = (acceptHeader = '') =>
  MARKDOWN_ACCEPT_TYPES.some((contentType) => acceptHeader.includes(contentType));

const resolveGroupSlug = (requestPath = '') => {
  const pathname = requestPath.split('?')[0].split('#')[0];
  const segments = pathname.split('/').filter(Boolean);

  if (segments[0] !== 'docs') {
    return null;
  }

  const apiIndex = segments[1] === 'api' ? 1 : segments[2] === 'api' ? 2 : -1;
  if (apiIndex === -1) {
    return null;
  }

  return segments[apiIndex + 1] ?? 'index';
};

const sanitizeSlug = (value) => value.toLowerCase().replace(/[^a-z0-9-]/g, '');

module.exports = function acceptMarkdownMiddlewarePlugin() {
  return {
    name: 'accept-markdown-middleware',
    configureWebpack() {
      return {
        devServer: {
          setupMiddlewares: (middlewares, devServer) => {
            if (typeof evalSourceMapMiddleware === 'function') {
              middlewares.unshift(evalSourceMapMiddleware(devServer));
            }
            middlewares.unshift({
              name: 'accept-markdown-middleware',
              middleware: (req, res, next) => {
                if (!req || (req.method !== 'GET' && req.method !== 'HEAD')) {
                  next();
                  return;
                }

                const acceptHeader = `${req.headers?.accept || ''}`.toLowerCase();
                if (!acceptsMarkdown(acceptHeader)) {
                  next();
                  return;
                }

                const groupSlug = resolveGroupSlug(req.url || '');
                if (!groupSlug) {
                  next();
                  return;
                }

                const llmDocsDir = path.join(process.cwd(), 'static', 'llm-docs');
                const normalizedSlug = sanitizeSlug(groupSlug);
                const groupPath =
                  normalizedSlug.length > 0
                    ? path.join(llmDocsDir, `${normalizedSlug}.md`)
                    : path.join(llmDocsDir, 'index.md');
                const fallbackPath = path.join(llmDocsDir, 'index.md');
                const targetPath = fs.existsSync(groupPath) ? groupPath : fallbackPath;

                if (!fs.existsSync(targetPath)) {
                  next();
                  return;
                }

                res.setHeader('Vary', 'Accept');
                res.type('text/markdown; charset=utf-8');
                res.sendFile(targetPath);
              },
            });

            return middlewares;
          },
        },
      };
    },
  };
};
