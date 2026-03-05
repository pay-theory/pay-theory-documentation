# Markdown Redirect Lambda@Edge

This Lambda@Edge handler runs on CloudFront `origin-request` and rewrites markdown-aware docs
requests to static markdown artifacts when a matching route is present in
`markdown-routes-manifest.json`.

## Expected Package Contents

- `index.js`
- `constants.js`
- `manifest.js`
- `markdown-routes-manifest.json` (copied from `build/llm-docs/`)

## Behavior

- Handles only `GET` and `HEAD`.
- Detects markdown requests via:
  - `Accept: text/markdown` or `text/x-markdown`
  - `x-accept-markdown`, `x-doc-format`, `x-format`, `x-response-format`, `x-return-format`
- Bypasses `/llm-docs/**`, `/llms.txt`, and static asset-like paths.
- Looks up exact route matches in manifest:
  - GraphQL routes under `/docs/api/**` and `/docs/lab/api/**`
  - Non-API routes exported to `/llm-docs/non-api/**`
- If no match exists, request is passed through unchanged (normal HTML rendering path).

## Notes

- The function is intentionally static-host friendly: no runtime source file access and no package
  dependency on `@lewl/graphql-doc`.
- Deploy logic is responsible for packaging manifest + handler files together and publishing a
  versioned Lambda in `us-east-1`.
