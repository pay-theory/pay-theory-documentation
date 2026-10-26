# Edge routing lives in one Lambda@Edge function with a build-time route manifest

The docs site needs pretty-URL rewrites, real 404s, Markdown content negotiation with `Vary: Accept`, and a few redirects at the CloudFront edge. We already ran a Lambda@Edge `viewer-request` function for Markdown negotiation, and CloudFront does not allow a CloudFront Function on a viewer event alongside a Lambda@Edge viewer trigger. So we extended that one function rather than adding CloudFront Functions. It also handles `origin-response` (for `Vary`), dispatching on the event type. It decides which routes exist from the `htmlRoutes` list that the build writes into the packaged manifest.

## Considered Options

- **CloudFront Functions for rewrites and headers.** Cheaper per request, but blocked by the existing Lambda@Edge viewer trigger. Viewer-response functions also never run on 4xx origin responses, so they could not produce a Markdown 404.
- **CloudFront KeyValueStore route list.** Would let a CloudFront Function generate 404s, but needs a separate deploy-time sync and still conflicts with the Lambda@Edge viewer trigger.
- **HTML-only 404 via custom error responses.** No new code, but a `Accept: text/markdown` caller would get an HTML error page.

## Consequences

- The route list is frozen into each Lambda version. A page added without a redeploy of the Lambda returns 404, which cannot happen through the normal pipeline because `shell/02_deploy.sh` packages a new version on every build.
- `templates/formation.yml` only switches CloudFront's custom error responses from the SPA fallback to `/404.html` when the Lambda version ARN is present, because pretty URLs depend on the Lambda's `index.html` rewrite.
