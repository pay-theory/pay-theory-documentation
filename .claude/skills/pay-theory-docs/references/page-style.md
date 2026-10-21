# Page style

How guide, SDK and changelog pages are built. Wording rules are in [voice.md](voice.md). Sidebars, lab and generated API pages are in [repo-mechanics.md](repo-mechanics.md).

Before writing, read one or two sibling pages in the same directory. Conventions drift slightly between guides, SDK docs and API pages, and matching the neighbors matters more than any rule here.

## Files

- Lowercase with underscores for directories and files: `online_payments/custom_fees.mdx`.
- Guides and SDK docs are `.mdx`. Each docs directory has a `_category_.json`.

## Frontmatter

Single-quoted strings, the current standard (older files vary):

```yaml
---
sidebar_position: 8
sidebar_label: 'Custom fees'
title: 'Custom fees'
hide_table_of_contents: true  # optional, common on tabbed tutorials
---
```

Generated API pages use different frontmatter (`id`, `api: true`, `hide_title: true`). Don't author those by hand.

## Structure

- One H1, the page title.
- H2 for major sections, with a `***` rule on its own line before each H2 after the intro.
- H3 for subsections. H4 is rare. API parameter docs use it for "Required arguments" and "Optional arguments".
- Tutorials number their H2 steps: `## 1. Create a payment`.
- A concrete example follows each concept right away.

## Admonitions

Pick the callout by intent and give it a short sentence-case title:

```markdown
:::danger Before you start
Prerequisites the reader must handle first.
:::

:::note Capture times
Supporting detail.
:::

:::tip Recommended event listeners
A better way to do something.
:::

:::info Download the full code
Pointers and links.
:::
```

`:::note` is the default. `:::danger Before you start` is the standard prerequisites block. Use `:::danger` rather than `:::warning` for hard requirements.

## Tabs

When a task differs by platform, use Tabs with exactly these attributes. `groupId="current-os"` keeps the JS/Apple/Android choice in sync across pages.

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

When only the code differs and the prose around it is the same (an SDK call and the equivalent API mutation), stack the two code blocks with a one-line lead-in each instead. Remove the Tabs imports if nothing else on the page uses them.

## Code blocks

- Always tag the language and add a title: ` ```javascript title="javascript" `, ` ```graphql title="Example mutation" `, ` ```kotlin title="PaymentActivity.kt" `.
- GraphQL for API schemas, queries and mutations in guides. The SDK's own language for SDK snippets.
- 2-space indents. Comment only the lines a reader would get wrong.
- Use the sample data from [operation-examples.md](operation-examples.md#sample-data) in guide examples too.

## Tables

Parameter and schema tables use `Key | type | description`:

```markdown
| Key | type | description |
|-----|------|-------------|
| fee | Int | Fee to charge, in cents. |
| fee_mode | FeeMode | Defaults to `MERCHANT_FEE`. |
```

Keep each description to one line that adds a fact (unit, default, constraint).

## Page patterns

**API behavior in a guide.** Schema in a GraphQL block, a `Key | type | description` table, enums, then an example query or mutation, its arguments, what it returns, and any warnings.

**SDK function.** Signature, parameters table, return value, an example with async/await, then notes and error handling.

## Links, buttons and images

- Relative links within a section (`[Failure codes](after_payments/failed_transactions)`), and absolute `/docs/...` links in multi-platform quickstarts. Match the neighbors.
- Link text names the destination. Never "click here".
- Buttons: `<a href="../path/to/doc" class="button button--primary button--md">Button text</a>`.
- Sandbox requests open the support widget: `<a onClick={() => FreshworksWidget('open')} class="button button--primary button--md">Request a sandbox</a>`.
- Images go in `static/img/`, referenced as `![Alt text](/img/name.png)`, with alt text that says what the image shows.

## Changelog

```markdown
## October 21, 2026

#### Added to API
* `idempotencyLookup` returns the transaction or authorization created with an idempotency key.

#### Added to JS SDK
* …
```

One bullet per change. Say what the reader can now do, in the same voice as the rest of the docs.
