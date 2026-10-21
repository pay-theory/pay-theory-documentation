# Reviewing a docs PR

Use this when asked to review a PR in this repo, or to check whether an earlier review's feedback was addressed. The deliverable is a verdict on every changed example (or section) and a PR comment the reviewer approves before it's posted.

The rules you review against live in [operation-examples.md](operation-examples.md) and [voice.md](voice.md). Cite them in the comment instead of restating them.

## 1. Pin down the diff

- `gh pr view <n> --json headRefName,baseRefName,commits` for each PR. Fetch the branches.
- For stacked PRs, the base for each PR is the head of the PR below it, so you review only what that PR adds. For a re-review, the base is the commit you reviewed last time.
- Done when you can name the base ref and every head ref, oldest first.

## 2. Run the checks a script can do

From the repo root, at the last head ref:

```bash
python3 .claude/skills/pay-theory-docs/scripts/lint_examples.py --ref <head> --skip-placeholders
python3 .claude/skills/pay-theory-docs/scripts/lint_examples.py --ref <head> --check-generated
```

The first covers names, descriptions, variables, error shape, sample data and chained examples. The second shows any operation whose generated `operations.json` (main or lab) no longer matches the source.

## 3. Read every changed example

`build_review.py ... --dump-keys` lists each new or changed example with its lint flags. Read all of them in full: query, variables and response. For each, look for what lint can't see:

- **Captured or written?** Filler values (dates of 2025-01-01, amounts of 123), every object sharing one URL, a created object returning an existing ID, error `data` filled with values the request never sent.
- **Does the data agree?** The filter matches the rows, the created object matches the input, and the read matches the write.
- **Is the behavior confirmed?** Anything that looks like a bug, or that you'd want backend to sign off on, goes in the comment as a question.
- **Stands alone, common path first, one idea each.**
- **Wording.** Run each name and description through voice.md and write a suggested rewrite where it falls short.

Done when every changed example has either a note or a deliberate "nothing to add".

## 4. Write the notes file

Put your per-example notes, extra flags, suggested rewrites and cross-cutting findings in a notes JSON (shape in the `build_review.py` docstring). A finding names the pattern, counts the examples, and says the fix. Group repeats into one finding instead of repeating a note on every card.

Also check for these, which have come up before:

- An operation whose only examples are errors, or whose placeholder was removed with nothing added.
- Feedback from an earlier review that the PR was meant to address. List what was and wasn't done.
- Fixes that belong in a lower PR in the stack (call out which PR).

## 5. Build the review page

```bash
python3 .claude/skills/pay-theory-docs/scripts/build_review.py \
  --base <base> --pr <ref>:<n> [--pr <ref>:<n> ...] \
  --title "<name> Review" --notes notes.json --out review.html
```

The page shows one example at a time with the query, variables and response always visible, your note, the lint flags and the suggested wording. The reviewer marks Looks good, Needs change or Drop, can take the suggested wording in one click, and adds notes. The Finish screen builds the PR comment for each PR.

In Claude Code, publish `review.html` as an Artifact with `capabilities: {db: {}, user: {}}` so verdicts save to the page and you can read them back (`ArtifactData` list on the `reviews` collection). Opened as a local file, the page saves to that browser only.

Rebuilding keeps saved verdicts as long as the example names don't change, because each card's key is `<file>:<operation>:<slugified name>`.

## 6. Turn verdicts into the comment

- Read the verdicts back and summarize the counts and the themes across the reviewer's notes. Point out any accepted rewrite you marked unverified, and any drop that leaves an operation with no examples.
- Put an "Overall themes" section first, then per-operation items.
- Show the reviewer the comment. Post with `gh pr comment <n> --body-file <file>` only after they approve, because it's visible to the team.
