---
title: PAI Agent Skill
sidebar_label: PAI Agent Skill
---

import skillPackageUrl from "@site/graphql/intro_docs/pai-agent-skill.zip";

# PAI Agent Skill

Penny is an AI integration helper for developers adding Pay Theory to their platform. It helps explain docs, plan SDK/JavaScript setup, debug integration issues, and prepare teams for go-live.

<p><a className="button button--primary button--lg" href={skillPackageUrl} download>Download PAI skill package (.zip)</a></p>

---

## Platform Setup

- Run: `npx skills add https://docs.paytheory.com --skill penny -g -a claude-code -a codex`
- If the installer asks **Symlink or Copy**, choose **Symlink**. It keeps one shared copy for Codex and Claude, making updates simpler. If it never asks, just continue.
- Start a new Claude or Codex session and call Penny with `/penny`.
- To update later, run: `npx skills update penny -g`

---

## What's Included

- **`SKILL.md`** - Skill definition and Penny workflow instructions
- **`references/`** - Pay Theory integration, hosted fields, API, security, and evidence guides
- **`tools/`** - Helpers for hosted fields debugging, code evidence, and security scans
