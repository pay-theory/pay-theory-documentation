#!/usr/bin/env python3
"""Build the card-by-card review page for operation examples changed in one or more PRs.

Run from the repo root. Each --pr is "<git ref>:<PR number>", oldest first when PRs
are stacked. Only examples that differ from --base are included, and each one is
tagged with the PR that last changed it. Lint findings become flags on the cards.

  python3 .claude/skills/pay-theory-docs/scripts/build_review.py \
    --base origin/docs/examples-for-operations \
    --pr origin/docs/p2-operation-examples:148 \
    --pr origin/docs/p3-p4-operation-examples:149 \
    --title "Tier 2–4 Examples Review" \
    --notes review-notes.json --out review.html

--notes is optional. It is the reviewer's layer, shaped like:
  {
    "examples": {"<file>:<operation>:<slug>": {"note": "...", "flags": ["mismatch"],
                  "rw": {"name": "...", "desc": "...", "why": "..."}}},
    "ops":      {"<operation>": "Heads-up shown above the operation"},
    "flags":    {"mismatch": {"label": "Data doesn't line up", "sev": "med"}},
    "findings": [{"id": "...", "sev": "high", "prs": [148], "flag": "mismatch",
                  "title": "...", "body": "...", "fix": "..."}]
  }
Run with --dump-keys first to get the example keys to annotate.
"""
import argparse
import difflib
import html
import json
import os
import subprocess
import sys

sys.dont_write_bytecode = True
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lint_examples as lint  # noqa: E402

REPO_URL = 'https://github.com/pay-theory/pay-theory-documentation'
TEMPLATE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'review-page.html')


def git(*args):
    return subprocess.run(['git', *args], capture_output=True, text=True, check=True).stdout


def examples_at(ref):
    """{file: [operation objects]} for graphql/examples at a ref."""
    out = {}
    for p in git('ls-tree', '--name-only', ref, 'graphql/examples/').split():
        if p.endswith('.json'):
            out[os.path.splitext(os.path.basename(p))[0]] = json.loads(git('show', f'{ref}:{p}'))
    return out


def index(files):
    return {(f, o['operation']): {e['name']: e for e in o.get('examples') or []} for f, ops in files.items() for o in ops}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--base', required=True, help='ref whose examples were already reviewed')
    ap.add_argument('--pr', action='append', required=True, help='<ref>:<PR number>, oldest first')
    ap.add_argument('--title', default='Operation Examples Review')
    ap.add_argument('--notes')
    ap.add_argument('--out', default='review.html')
    ap.add_argument('--dump-keys', action='store_true', help='print example keys and exit')
    a = ap.parse_args()

    prs = []
    for spec in a.pr:
        ref, _, num = spec.rpartition(':')
        prs.append({'ref': ref, 'number': int(num), 'url': f'{REPO_URL}/pull/{num}'})
    base = index(examples_at(a.base))
    stages = [index(examples_at(p['ref'])) for p in prs]
    head_files = examples_at(prs[-1]['ref'])
    notes = json.load(open(a.notes)) if a.notes else {}
    ex_notes, op_notes = notes.get('examples', {}), notes.get('ops', {})

    ops, seen_keys = [], set()
    for file, op_list in head_files.items():
        for o in op_list:
            op = o['operation']
            before = base.get((file, op), {})
            seen_requests = {}
            cards = []
            for e in o.get('examples') or []:
                n = e['name']
                if n.startswith('Example ') or before.get(n) == e:
                    continue
                # the PR that last changed this example: the first stage whose version equals the final one
                pr = next(p['number'] for p, st in zip(prs, stages) if st.get((file, op), {}).get(n) == e)
                key = f'{file}:{op}:{lint.slug(n)}'
                assert key not in seen_keys, f'duplicate example key {key}'
                seen_keys.add(key)
                diff = []
                if n in before:
                    old = json.dumps(before[n], indent=1).splitlines()
                    new = json.dumps(e, indent=1).splitlines()
                    diff = [l[0] + ' ' + l[1:].strip() for l in difflib.unified_diff(old, new, lineterm='', n=0)
                            if not l.startswith(('---', '+++', '@@'))][:16]
                r = e.get('response') or {}
                body = r.get('body') or {}
                errs = body.get('errors') or []
                extra = ex_notes.get(key, {})
                flags = list(dict.fromkeys([f['rule'] for f in lint.lint_example(file, op, e, seen_requests)] + extra.get('flags', [])))
                cards.append({
                    'key': key, 'name': n, 'desc': e.get('description'), 'kind': r.get('type', 'success'),
                    'http': r.get('httpStatus', 200),
                    'errorType': errs[0].get('errorType') if errs else body.get('errorType'),
                    'message': errs[0].get('message') if errs else body.get('message'),
                    'query': e.get('query', ''), 'variables': e.get('variables'), 'response': body,
                    'flags': flags, 'note': extra.get('note'), 'rw': extra.get('rw'),
                    'pr': pr, 'status': 'changed' if n in before else 'new', 'diff': diff})
            removed = [n for n in before if n not in {e['name'] for e in o.get('examples') or []}]
            if cards or removed:
                ops.append({'file': file, 'op': op, 'type': o.get('operationType'), 'examples': cards, 'removed': removed,
                            'opnote': op_notes.get(op), 'prs': sorted({c['pr'] for c in cards})})

    if a.dump_keys:
        for o in ops:
            for c in o['examples']:
                print(c['key'], '|', ', '.join(c['flags']))
        return 0

    flag_meta = {k: {'label': v[0], 'sev': v[1]} for k, v in lint.RULES.items()}
    flag_meta.update(notes.get('flags', {}))
    unknown = {f for o in ops for c in o['examples'] for f in c['flags']} - set(flag_meta)
    assert not unknown, f'flags without a label in notes["flags"]: {sorted(unknown)}'
    placeholders = [{'file': f, 'op': o['operation']} for f, ol in head_files.items() for o in ol
                    if o.get('examples') and all(e['name'].startswith('Example ') for e in o['examples'])]
    data = {'ops': ops, 'placeholders': placeholders,
            'meta': {'flags': flag_meta, 'findings': notes.get('findings', []),
                     'prs': [{'number': p['number'], 'url': p['url']} for p in prs]}}

    page = open(TEMPLATE, encoding='utf-8').read()
    page = page.replace('__TITLE__', html.escape(a.title)).replace(
        '__DATA__', json.dumps(data, separators=(',', ':'), ensure_ascii=False).replace('</', '<\\/'))
    with open(a.out, 'w', encoding='utf-8') as fh:
        fh.write(page)
    n = sum(len(o['examples']) for o in ops)
    print(f'{a.out}: {len(ops)} operations, {n} examples, {len(placeholders)} placeholder operations left')
    return 0


if __name__ == '__main__':
    sys.exit(main())
