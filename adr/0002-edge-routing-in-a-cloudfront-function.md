# Edge routing lives in a CloudFront Function with a KeyValueStore route list

Supersedes [0001](0001-edge-routing-in-one-lambda-at-edge.md).

The Lambda@Edge router ran on every request, including cache hits and static assets, and each change shipped as a new numbered version that CloudFront had to replicate. Old versions couldn't be deleted for hours, which made every deploy wait on failed cleanup. We moved the same routing to one CloudFront Function on `viewer-request` and `viewer-response`, and moved the route list into a CloudFront KeyValueStore that the deploy syncs from the build manifest. Code changes publish in place under the same function ARN, and new pages are a key update, so neither redeploys the distribution.

## Considered Options

- **Keep Lambda@Edge and skip unchanged versions.** Fixed the slow deploys for content-only changes, but kept the per-request Lambda cost and latency, and new pages still published a version.
- **Lambda@Edge reading the route list from S3.** Fewer versions, but adds a network call and a failure point at the edge.

## Consequences

- The Markdown 404 is generated in `viewer-request` from a store miss. `viewer-response` doesn't run on 4xx origin responses, but the generated 404 sets `Vary` itself.
- `.graphql` files get `text/plain` at upload, since there's no `origin-response` hook to fix the content type.
- HTML requests never read the store. If the store fails, Markdown requests fall back to the HTML page.
- `shell/02_deploy.sh` uploads to S3 before syncing the store, and puts keys before deleting them, so the store never lists a route whose objects aren't there yet.
- The retired Lambda@Edge resources stay in `templates/distribution.yml` until a follow-up removes them, a few hours after the first deploy, once their replicas are gone.
