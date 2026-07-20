# Repo Mechanics: Sidebars, Versioning, Categories, API Pages

Read this when a task touches navigation, the lab version, directory metadata, or the
auto-generated GraphQL API reference. For everyday prose/style, the SKILL.md is enough.

## Table of contents
1. Versioning model (current vs lab)
2. Sidebar files and entry format
3. `_category_.json` files
4. Auto-generated GraphQL API pages
5. The GraphQL sidebar merge helper in `sidebars.js`

***

## 1. Versioning model (current vs lab)

`versions.json` contains a single entry:

```json
["lab"]
```

Docusaurus treats the live `docs/` tree as the **current** version and
`versioned_docs/version-lab/` as the **lab** version. From `docusaurus.config.js`:

```js
versions: {
  current: { label: 'Live',          path: '',    banner: 'none' },
  lab:     { label: 'Lab (preview)', path: 'lab', banner: 'none' },
}
```

- Live docs serve at `/docs/*`; lab docs serve at `/docs/lab/*`.
- The two trees are **mostly mirrored but not identical** (~370+ files each). Lab can
  carry preview-only pages (e.g. features not yet live) and newer changelog entries.
- Because of that, mirroring is a deliberate choice — ask the user before syncing a
  change into lab, and don't overwrite a lab file that intentionally differs.

## 2. Sidebar files and entry format

Two files, two formats:

| Version | File | Format |
|---------|------|--------|
| Current | `sidebars.js` | CommonJS `module.exports`, single-quoted JS |
| Lab | `versioned_sidebars/version-lab-sidebars.json` | strict JSON, double-quoted |

The named sidebars are `homeSidebar`, `apiSidebar`, `javascriptSidebar`,
`appleSidebar`, `androidSidebar`.

A doc entry — the `id` is the path under `docs/` with **no** `docs/` prefix and **no**
file extension:

```js
// sidebars.js (current)
{
  type: 'doc',
  id: 'main/online_payments/custom_fees',
},
```

```json
// version-lab-sidebars.json (lab) — same entry, JSON syntax
{
  "type": "doc",
  "id": "main/online_payments/custom_fees"
}
```

Categories group docs:

```js
{
  type: 'category',
  label: 'Tokenizing Payments',
  items: [
    'main/online_payments/tokenizing/quickstart',
    'main/online_payments/tokenizing/recalling_payment_methods',
  ],
},
```

Place a new entry among its siblings in the same order it should appear (e.g.
`custom_fees` sits right after `split_transactions` and before the "Tokenizing
Payments" category in both files).

> `sidebars.js` is type-checked by the pre-commit `check-ts` step. It's plain JS, so
> annotate any helpers with JSDoc (`/** @param {any} x */`) rather than inline TS
> types, which won't parse.

## 3. `_category_.json` files

Each doc directory has a `_category_.json` that sets its sidebar label, order, and
index behavior. Mirrored between current and lab.

```json
{
  "label": "Javascript SDK",
  "position": 3,
  "link": {
    "type": "generated-index",
    "description": "Documentation for integrating Pay Theory's JavaScript SDK."
  }
}
```

Collapsible category variant:

```json
{
  "label": "Split",
  "collapsible": true,
  "collapsed": true,
  "position": 12
}
```

Fields: `label` (display name), `position` (sort order, lower = higher), optional
`link.type: "generated-index"` (auto index page) with optional `description`,
`collapsible`/`collapsed`. Create one whenever you add a new directory.

## 4. Auto-generated GraphQL API pages

Pages under `docs/api/` are **generated**, not hand-written. They use the
`OperationView` component and pull from JSON data files. Don't author these by hand;
regenerate them from the source pipeline. A representative page:

```jsx
import { OperationView } from '@lewl/graphql-doc/components';
import operationsByType from '../_data/operations.json';
import typesByName from '../_data/types.json';

export const operation = operationsByType["mutation"]["createTransaction"];

<OperationView operation={operation} typesByName={typesByName} headingLevel={1}
  defaultExpandedLevels={0} maxDepth={5} typeLinkBase="../types"
  llmDocsBasePath="/llm-docs" siteBasePath="/docs/api" />
```

Their frontmatter differs from guides: `id`, `hide_title: true`, `api: true`.

If you're documenting API behavior in a **guide** (not the generated reference), write
GraphQL examples by hand in ` ```graphql title="Example Mutation" ` blocks — that's the
normal pattern for guides like the Custom Fees doc.

## 5. The GraphQL sidebar merge helper in `sidebars.js`

The bottom of `sidebars.js` defines `__gqlDocsMerge(items, insert, opts)`, which
injects the generated GraphQL API sidebar items into a target sidebar
(`apiSidebar`) programmatically with modes `replace`/`append`/`prepend`/`before`.
You generally don't edit this by hand — it's driven by the API-doc generation step.
Just be aware it exists so you don't manually duplicate API operation entries.
