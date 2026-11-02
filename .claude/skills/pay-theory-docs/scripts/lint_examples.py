#!/usr/bin/env python3
"""Lint GraphQL operation examples in graphql/examples/*.json.

Checks each example against the rules in references/operation-examples.md that
a script can check. It does not replace a human read: it cannot tell whether a
response was really captured or whether a behavior is confirmed.

Usage:
  python3 lint_examples.py [paths...]          # default: graphql/examples/*.json
  python3 lint_examples.py --json [paths...]   # machine-readable, used by build_review.py
  python3 lint_examples.py --ref origin/main   # lint the files as they are at a git ref
  python3 lint_examples.py --check-generated   # also confirm main and lab operations.json match the source

Exit code is 1 when any error-level finding exists.
"""
import argparse
import glob
import json
import os
import re
import subprocess
import sys

SAMPLE_MERCHANT_UIDS = {
    'e9f2387b-8727-450a-w3g2-fee9b49e42a1',  # the sample merchant
    '6b0c1e4d-2f7a-4c9e-z1y2-8d3f5a7b9c10',  # a second merchant, for cross-merchant errors
}
SAMPLE_EMAIL_DOMAIN = 'example.com'

# rule id -> (label shown to reviewers, severity)
RULES = {
    'placeholder':       ('Generated placeholder', 'low'),
    'no-desc':           ('No description', 'med'),
    'desc-repeats-name': ('Description repeats the name', 'low'),
    'name-sentence':     ('Name reads as a sentence', 'low'),
    'name-case':         ('Name not in sentence case', 'low'),
    'id-case':           ('Write "ID", not "id"', 'low'),
    'punctuation':       ('Em dash or semicolon', 'low'),
    'chained':           ('Depends on another example', 'med'),
    'internal-note':     ('Internal note', 'high'),
    'var-missing':       ('Required variable not sent', 'high'),
    'var-unsent':        ('Declared variable not sent', 'med'),
    'var-undeclared':    ('Variable sent but not declared', 'high'),
    'malformed':         ('Not a GraphQL response', 'high'),
    'locations':         ('Error has locations', 'low'),
    'no-error-type':     ('Error has no errorType', 'med'),
    'schema-error':      ('GraphQL schema error', 'high'),
    'lambda':            ('Lambda:Unhandled', 'med'),
    'leak':              ('Backend internals', 'high'),
    'crlf':              ('CRLF or tabs in query', 'low'),
    'test-data':         ('Test-run data', 'med'),
    'env-host':          ('Environment host', 'med'),
    'real-email':        ('Email outside example.com', 'low'),
    'real-id':           ('Merchant ID is not a sample ID', 'med'),
    'duplicate':         ('Same request as another example', 'low'),
}
SEVERITY_LEVEL = {'high': 'error', 'med': 'warn', 'low': 'warn'}

INTERNAL_WORDS = re.compile(
    r'\b(resolver|read model|intentionally|defect|harness|legacy|highlights? th|does not prove|'
    r'in every environment|e2e|test run|reaches the|separate \w+ query|valid field keys|not reliably)\b', re.I)
CHAIN_WORDS = re.compile(
    r'\b(the (create|update|delete|previous|above|below|next) example|example above|example below|'
    r'returned by the|used in the|afterward|read it back|call it back|after (create|update|delete|cancel)\w*)\b', re.I)
TEST_DATA = re.compile(
    r'<TEST_RUN_ID>|\be2e\b|\bp\d+ docs\b|\bdocs-[0-9a-f]{6,}\b|\b(?=[0-9a-f]*[a-f])(?=[0-9a-f]*\d)[0-9a-f]{8}\b(?=["\s])|([a-z])\1{9,}|Updated Street|"example"', re.I)
ENV_HOST = re.compile(r'https?://[^"\s]*(paytheorylab|paytheorystudy|ptbar\.codes|amazonaws\.com|innovate)[^"\s]*', re.I)
EMAIL = re.compile(r'[\w.+-]+@([\w-]+\.[\w.-]+)')
UUID = re.compile(r'\b[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}\b', re.I)
SCHEMA_ERROR = re.compile(r"^(Variable '|Validation error|Field '|Unknown type|Unknown argument|Argument '|Expected type)|coerced Null value|is not a valid|WrongType|FieldUndefined|NonNull", re.I)
SMALL_WORDS = {'a', 'an', 'the', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'by', 'with', 'is', 'not', 'no'}


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


def declared_vars(query):
    head = query[:query.find('{')] if '{' in query else query
    return re.findall(r'\$(\w+)\s*:\s*([\w\[\]!]+)', head)


def words(s):
    return [w for w in re.findall(r"[a-z0-9_']+", s.lower()) if w not in SMALL_WORDS]


def lint_example(file, op, ex, seen_requests):
    out = []
    add = lambda rule, detail: out.append({'rule': rule, 'detail': detail})
    name = ex.get('name', '')
    desc = (ex.get('description') or '').strip()
    query = ex.get('query', '')
    variables = ex.get('variables') or {}
    resp = ex.get('response') or {}
    body = resp.get('body') or {}
    blob = json.dumps(ex, ensure_ascii=False)

    if name.startswith('Example ') or '"example"' in json.dumps(variables):
        add('placeholder', 'Generated placeholder example still in place.')
    if not desc:
        add('no-desc', 'Add one sentence with a fact the name does not give.')
    elif set(words(desc)) <= set(words(name)) | {'lists', 'list', 'returns', 'gets', 'creates', 'merchant', 'a'}:
        add('desc-repeats-name', f'"{desc}" says what the name already says.')
    if len(name.split()) > 8 or name.endswith('.') or re.match(r'^(A|The)\s', name):
        add('name-sentence', f'"{name}" is long or reads as a sentence. Name the action or the problem.')
    caps = [w for w in name.split()[1:] if w[:1].isupper() and not w.isupper() and '_' not in w and w not in ('Pay', 'Theory', 'Apple', 'Google', 'Pay')]
    if caps:
        add('name-case', f'"{name}": use sentence case ({", ".join(caps)}).')
    if re.search(r'\bid\b', name):
        add('id-case', f'"{name}": write "ID".')
    if re.search(r'—|;', name + ' ' + desc) or '—' in json.dumps(variables, ensure_ascii=False):
        add('punctuation', 'Split the sentence instead of using an em dash or semicolon.')
    if CHAIN_WORDS.search(desc):
        add('chained', f'Description points at another example: "{CHAIN_WORDS.search(desc).group(0)}". Make it self-contained.')
    m = INTERNAL_WORDS.search(desc)
    if m:
        add('internal-note', f'"{m.group(0)}" reads as a note for us. Write it from the reader\'s side.')

    decl = declared_vars(query)
    names = {n for n, _ in decl}
    for n, t in decl:
        if n not in variables:
            if t.endswith('!'):
                add('var-missing', f'${n} is required ({t}) but not in variables. The request fails as written.')
            else:
                add('var-unsent', f'${n} ({t}) is declared but never sent. Remove it from the query or send a value.')
    for k in variables:
        if k not in names:
            add('var-undeclared', f'"{k}" is in variables but not declared in the query.')
    if '\r' in query or '\t' in query:
        add('crlf', 'Use LF line endings and 2-space indents.')

    kind = resp.get('type')
    errors = body.get('errors') if isinstance(body, dict) else None
    if kind == 'error':
        if not isinstance(errors, list) or not errors:
            add('malformed', 'Error body has no errors array. Recapture through the GraphQL endpoint.')
        else:
            for e in errors:
                msg = e.get('message') or ''
                if SCHEMA_ERROR.search(msg) or (e.get('path') is None and not e.get('errorType')):
                    add('schema-error', f'"{msg}" comes from GraphQL validation, not Pay Theory. Drop it and document backend errors only.')
                    continue
                if 'locations' in e:
                    add('locations', 'Strip "locations"; it points at the capture query, not this one.')
                if not e.get('errorType'):
                    add('no-error-type', f'Error "{e.get("message")}" has no errorType. Confirm the API returns it that way.')
                if e.get('errorType') == 'Lambda:Unhandled':
                    add('lambda', f'"{e.get("message")}" comes back as Lambda:Unhandled. File it, or hold the example.')
                info = json.dumps(e.get('errorInfo') or {})
                if 'upstream_service' in info or "{'" in (e.get('message') or ''):
                    add('leak', 'Error exposes backend internals (upstream_service or a Python dict).')
    elif kind == 'success' and not (isinstance(body, dict) and 'data' in body):
        add('malformed', 'Success body has no data key.')

    m = TEST_DATA.search(json.dumps({k: v for k, v in ex.items() if k != 'response'}, ensure_ascii=False) + json.dumps(body, ensure_ascii=False))
    if m and not name.startswith('Example '):
        add('test-data', f'"{m.group(0)}" looks like test-run or placeholder data.')
    m = ENV_HOST.search(blob)
    if m:
        add('env-host', f'{m.group(0)} names an environment or partner. Use a neutral host.')
    bad_emails = sorted({d for d in EMAIL.findall(blob) if d.lower() != SAMPLE_EMAIL_DOMAIN})
    if bad_emails:
        add('real-email', f'Emails use {", ".join(bad_emails)}. Use @{SAMPLE_EMAIL_DOMAIN}.')
    uids = set()
    for k, v in re.findall(r'"(merchant_uid|parent_merchant_uid)"\s*:\s*"([^"]+)"', blob):
        if UUID.fullmatch(v) and v not in SAMPLE_MERCHANT_UIDS:
            uids.add(v)
    if uids:
        add('real-id', f'merchant_uid {", ".join(sorted(uids))} is not one of the sample IDs.')

    req = (op, query.strip(), json.dumps(variables, sort_keys=True))
    if req in seen_requests:
        add('duplicate', f'Same query and variables as "{seen_requests[req]}". Fine for a retry example; otherwise merge them.')
    else:
        seen_requests[req] = name
    return out


def load_files(paths, ref):
    if ref:
        listing = subprocess.run(['git', 'ls-tree', '--name-only', ref, 'graphql/examples/'], capture_output=True, text=True, check=True).stdout.split()
        for p in listing:
            if p.endswith('.json'):
                yield p, json.loads(subprocess.run(['git', 'show', f'{ref}:{p}'], capture_output=True, text=True, check=True).stdout)
        return
    for p in paths or sorted(glob.glob('graphql/examples/*.json')):
        with open(p, encoding='utf-8') as fh:
            yield p, json.load(fh)


def lint(paths=None, ref=None):
    results = []
    for path, data in load_files(paths, ref):
        file = os.path.splitext(os.path.basename(path))[0]
        for o in data:
            op = o.get('operation')
            seen = {}
            exs = o.get('examples') or []
            if not exs:
                results.append({'file': file, 'operation': op, 'type': o.get('operationType'), 'example': None, 'key': None,
                                'findings': [{'rule': 'placeholder', 'detail': 'Operation has no examples.'}]})
            for ex in exs:
                results.append({'file': file, 'operation': op, 'type': o.get('operationType'), 'example': ex.get('name'),
                                'key': f"{file}:{op}:{slug(ex.get('name', ''))}", 'findings': lint_example(file, op, ex, seen)})
    return results


GENERATED = {'main': 'docs/api/_data/operations.json', 'lab': 'versioned_docs/version-lab/api/_data/operations.json'}


def check_generated(ref):
    """Operations whose examples in a generated operations.json differ from graphql/examples."""
    source = {o['operation']: o.get('examples') or [] for _, data in load_files(None, ref) for o in data}
    out = {}
    for target, path in GENERATED.items():
        try:
            raw = subprocess.run(['git', 'show', f'{ref}:{path}'], capture_output=True, text=True, check=True).stdout if ref \
                else open(path, encoding='utf-8').read()
        except (subprocess.CalledProcessError, FileNotFoundError):
            out[target] = ['(file missing)']
            continue
        gen = json.loads(raw)
        stale = []
        for kind in gen.values():
            for op in (kind.values() if isinstance(kind, dict) else kind):
                name = op.get('name')
                if name in source and (op.get('examples') or []) != source[name]:
                    stale.append(name)
        out[target] = sorted(stale)
    return out


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('paths', nargs='*')
    ap.add_argument('--json', action='store_true')
    ap.add_argument('--ref')
    ap.add_argument('--skip-placeholders', action='store_true', help='hide examples that are still generated placeholders')
    ap.add_argument('--check-generated', action='store_true', help='compare generated operations.json (main and lab) with the source')
    a = ap.parse_args()
    if a.check_generated:
        stale = check_generated(a.ref)
        for target, ops in stale.items():
            print(f'{target}: ' + ('in sync with graphql/examples' if not ops else f'{len(ops)} operations out of sync: ' + ', '.join(ops)))
        if any(stale.values()):
            print('Run `npm run graphql:generate:all` and commit both files.')
            return 1
        return 0
    results = lint(a.paths, a.ref)
    if a.skip_placeholders:
        results = [r for r in results if not any(f['rule'] == 'placeholder' for f in r['findings'])]
    if a.json:
        json.dump({'rules': {k: {'label': v[0], 'sev': v[1]} for k, v in RULES.items()}, 'results': results}, sys.stdout, indent=1)
        return 0
    errors = warns = 0
    cur = None
    for r in results:
        if not r['findings']:
            continue
        head = f"{r['file']}.json  {r['operation']}"
        if head != cur:
            print(f'\n{head}')
            cur = head
        print(f"  {r['example'] or '(operation)'}")
        for f in r['findings']:
            lvl = SEVERITY_LEVEL[RULES[f['rule']][1]]
            errors += lvl == 'error'
            warns += lvl == 'warn'
            print(f"    {lvl:5} {f['rule']}: {f['detail']}")
    print(f'\n{errors} errors, {warns} warnings across {len(results)} examples')
    return 1 if errors else 0


if __name__ == '__main__':
    sys.exit(main())
