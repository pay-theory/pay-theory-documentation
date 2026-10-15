---
name: pay-theory-docs
description: >-
  Style, naming, and workflow conventions for the Pay Theory Docusaurus
  documentation repo. Use this skill whenever you are writing, editing, adding,
  restructuring, or reviewing any documentation in this repo — guides, SDK docs
  (JavaScript/Apple/Android), GraphQL API reference, the changelog, .mdx/.md
  content, frontmatter, sidebars, or _category_.json — even if the user doesn't
  say "style guide." It covers voice and formatting, MDX components (admonitions,
  Tabs, code blocks, tables), frontmatter rules, sidebar registration, lab-version
  mirroring, and the commit message format. Prefer this skill over guessing
  conventions; consult it before creating a new doc or wiring up navigation.
---

# Pay Theory Documentation Conventions

This skill captures how documentation is written and wired up in this repo so new
and edited docs feel like they were written by the same hand. The CLAUDE.md at the
repo root has the long-form style guide; this skill is the opinionated, current
working version of it — where they ever disagree, follow this skill, because it
reflects the most recent decisions.

The repo is **Docusaurus 3**. Docs are MDX/Markdown under `docs/`, navigation lives
in `sidebars.js`, and there is a parallel **lab** version under
`versioned_docs/version-lab/`. The mechanical details of sidebars, the lab version,
`_category_.json`, and auto-generated API pages live in
`references/repo-mechanics.md` — read it whenever your task touches navigation,
versioning, or API reference pages.

***

## Workflow for any doc change

Work through these in order. Not every step applies to every change (a typo fix
skips most of them), but use this as the checklist so nothing is missed.

1. **Find the right file and read its neighbors first.** Before writing, read 1–2
   sibling docs in the same directory. Matching the local pattern matters more than
   any rule here — conventions drift slightly by section (guides vs SDK vs API).
2. **Write or edit the content** following the style and component conventions below.
3. **Register it in navigation** if it's a new file — see Sidebar registration below.
4. **Decide on lab mirroring** — see Lab version below. Ask the user before mirroring.
5. **Verify it builds** when you've done structural work (new files, sidebar edits,
   component changes): `npm run build` catches broken MDX, bad links, and sidebar
   references to missing docs. For prose-only edits this is optional.
6. **Commit** using the repo's format (see Commit conventions).

***

## Voice and writing style

Write the way the existing docs do: direct, instructional, and scannable. The reader
is an engineer integrating Pay Theory and wants to get unblocked, not read prose.

- Address the reader as **"you."** Use present tense and active voice ("Pass your
  calculated fee," not "The fee should be passed").
- Keep paragraphs short — 2–3 sentences. Lead with the actionable point, then explain.
- Use numbered H2 steps for tutorials (`## 1. Create a payment`), bullets for options.
- Put a concrete example immediately after a concept. Every claim about request/response
  shape should be backed by a code block.
- Explain the *why* when behavior is surprising; don't just state the rule.

### Terminology (be consistent)

- "Pay Theory" — two words, never "PayTheory" in prose.
- "payment method token" — not "payment token."
- "SDK", "API Key" — capitalized as shown.
- Function and field names in backticks: `transact`, `fee_mode`, `tokenizePaymentMethod`.
- **Keep API/transaction behavior agnostic to where the request originates.** The same
  behavior usually applies whether a transaction is initiated from the SDK or the API,
  so prefer "when you submit the request" / "the request is processed" over "at the API
  layer." Only call out API-vs-SDK specifics when they genuinely differ.

***

## Frontmatter

Every guide/SDK doc starts with YAML frontmatter. **Use single quotes** for string
values (this is the current standard, even though older files vary):

```yaml
---
sidebar_position: 8
sidebar_label: 'Custom Fees'
title: 'Custom Fees'
hide_table_of_contents: true  # optional — common on tabbed tutorial pages
---
```

- `sidebar_position` (number) and `sidebar_label` (short nav name) order and label the
  page in the sidebar. `title` is the full page title.
- `hide_table_of_contents: true` is used on tutorial/quickstart pages where tabbed
  content reads better without a TOC.
- Auto-generated **API reference pages** use a different frontmatter (`id`, `api: true`,
  `hide_title: true`) — don't hand-author these; see `references/repo-mechanics.md`.

***

## Structure and headings

- **H1 (`#`)** — page title, once, at the top.
- **H2 (`##`)** — major sections. Put a `***` horizontal rule on its own line before
  each H2 section (after the intro) to separate them. This is a strong, consistent
  convention in this repo.
- **H3 (`###`)** — subsections. **H4** is rare; API parameter docs use it for
  `#### Required Arguments` / `#### Optional Arguments`.

***

## MDX components

### Admonitions

Use the callout that matches intent, with a short Title-Case label:

```markdown
:::note Details on Capture Times
Content here.
:::

:::tip Recommended event listeners
Content here.
:::

:::danger Before you start
Prerequisites the reader must handle first.
:::

:::info Download full code
Supplementary pointers and links.
:::
```

`:::note` is the workhorse. `:::danger Before you start` is the standard prerequisites
block. Prefer `:::danger` over `:::warning` for hard requirements.

### Tabs (multi-platform content)

When the same task differs by platform, use Tabs. The import and attributes are
consistent across the repo — match them exactly so tab state syncs site-wide
(`groupId="current-os"` is what keeps the JS/Apple/Android selection in sync between
pages):

```jsx
import Tabs from '@site/components/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="javascript"
  groupId="current-os"
  queryString
  values={[
    {label: 'Javascript', value: 'javascript'},
    {label: 'Apple', value: 'apple'},
    {label: 'Android', value: 'android'},
  ]}>
  <TabItem value="javascript">
    // content
  </TabItem>
</Tabs>
```

**Don't reach for Tabs when the surrounding prose is identical.** If the only
difference between two examples is the code block itself (e.g. an SDK snippet and the
equivalent API mutation, with the same explanation around each), just stack the two
code blocks one after another with a short lead-in sentence for each. Tabs add
interaction cost and hide one option behind a click; stacking shows both at once and
reads better when everything else is the same. Remove the `Tabs`/`TabItem` imports if
nothing else on the page uses them.

### Code blocks

- Always tag the language and add a `title`: ` ```javascript title="javascript" `,
  ` ```graphql title="Example Mutation" `, ` ```kotlin title="PaymentActivity.kt" `.
- Use **GraphQL** for API schema/queries/mutations. Use the SDK's language for SDK
  examples (`javascript`/`jsx`, `swift`, `kotlin`).
- 2-space indentation; include brief comments for non-obvious lines.

### Tables

Parameter and schema tables use the `Key | type | description` columns:

```markdown
| Key | type | description |
|-----|------|-------------|
| fee | Int | Fee to charge in cents. |
| feeMode | String | Defaults to `MERCHANT_FEE`. |
```

***

## Links and buttons

- **Internal links:** relative paths for same-section references
  (`[Failure Codes](after_payments/failed_transactions)`); absolute `/docs/...` paths
  are used in multi-platform quickstarts. Match what nearby files do.
- **Button links** use Docusaurus button classes:
  ```html
  <a href="../path/to/doc" class="button button--primary button--md">Button Text</a>
  ```
- **Sandbox request / support** uses the Freshworks widget:
  ```html
  <a onClick={() => FreshworksWidget('open')} class="button button--primary button--md">Request a Sandbox</a>
  ```
- Use descriptive link text — never "click here."

***

## Sidebar registration

A new doc only appears in navigation once it's registered. Navigation lives in **two**
places and the formats differ:

- **Current version:** `sidebars.js` — a CommonJS module, **single-quoted** JS object.
- **Lab version:** `versioned_sidebars/version-lab-sidebars.json` — strict **JSON**,
  double-quoted.

Add a `{ type: 'doc', id: 'main/online_payments/custom_fees' }` entry (note: the `id`
is the doc path **without** the `docs/` prefix or file extension) in the correct
category, mirroring the file's position among its siblings. See
`references/repo-mechanics.md` for the category structure, the lab-sidebar format, and
the `_category_.json` files that label/order directories.

> Gotcha: `sidebars.js` is type-checked by the pre-commit hook. It's a `.js` file, so
> you cannot use inline TypeScript annotations — if you must add a typed helper, use
> JSDoc (`/** @param {any} x */`), not `(x: any)`.

***

## Lab version mirroring

The repo keeps a parallel **lab (preview)** copy of most docs under
`versioned_docs/version-lab/` with its own sidebar. Lab sometimes carries
preview-only content that doesn't exist in the live docs, so the two are not always
identical.

**Ask the user before mirroring a change to lab.** When they confirm, mirror both:

1. Copy/edit the doc under `versioned_docs/version-lab/<same path>`.
2. Add the matching entry to `versioned_sidebars/version-lab-sidebars.json`.

Don't blindly overwrite a lab file without checking whether it intentionally differs
from the live version.

***

## Commit conventions

Commits use **emoji + conventional type + scope**:

```
📝 docs(online-payments): replace custom fees quick start with full guide

<optional body explaining what changed and why, as bullet points>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

- Docs work is almost always `📝 docs(<scope>): …`. New features can be `✨ feat(docs): …`.
- Scopes are feature-based: `online-payments`, `js-sdk`, `apple-pay`, `google-pay`,
  `wallet`, `changelog`, `api`. Broad updates may omit the scope (`📝 docs: …`).
- A pre-commit hook runs `prettier:fix`, `lint:fix`, and `check-ts`. Let it run; if it
  reformats files (e.g. normalizing `sidebars.js`), that's expected.
- Don't stage unrelated local artifacts (e.g. a `.plans/` directory).

***

## Quick reference: what touching a new guide doc involves

1. `docs/<section>/<name>.mdx` — single-quoted frontmatter, H1, `***`-separated H2s.
2. Entry in `sidebars.js` (`type: 'doc'`, `id` without `docs/` prefix or extension).
3. New directory? Add a `_category_.json` (see references).
4. Ask the user about mirroring to lab (`versioned_docs/version-lab/...` + lab sidebar JSON).
5. `npm run build` to verify, then commit with `📝 docs(<scope>): …`.
