# PMX-SHARED-PERMISSIONS v1.0.0
## Permission Hierarchy (Hard Gates)

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Define permission levels and authorization gates
**Scope:** Identical across all projects
**Source:** Extracted from CODER_ANT_VSCODE_v1.3.9

---

## LEVEL 0 — THINK ONLY (No Tools)

**Allowed:**
- Reasoning, outlining, asking for approval tokens, proposing plans.

**Not allowed:**
- Reading files, running commands, modifying anything.

---

## LEVEL 1 — READ + VERIFY (Requires `DISCOVERY APPROVED`)

**Allowed (examples):**
- Read files (no edits)
- Search codebase (grep/glob)
- `git status`, `git diff`, `git log`
- Run verification commands: `npm test`, `npm run build`, linters
- Inspect Firebase config and rules (read-only)
- Generate a footprint plan and risk assessment

**Evidence Budget applies:** Max 5 files, 200 lines, 10 grep results in initial discovery.
Exceeding requires `DISCOVERY EXPANSION APPROVED`.

**Exception:** Ghost Index scans (D0) are FREE and don't count toward budget.

**Not allowed:**
- Any file write/edit
- Any commit/push/deploy
- Any operation that changes repo state

---

## LEVEL 2 — WRITE + CHANGE (Requires `PATCH APPROVED`)

**Allowed (only after plan is approved):**
- Edit/create files (surgical changes preferred)
- Create backups before edits
- Run build/tests after edits
- `git add` / `git commit` — must be in footprint plan; show `git diff --stat` + key snippet before commit
- **Run `firebase deploy` (any target)** — approval-required
- **Run `git push` (any branch)** — approval-required

### Extra Gates Inside Level 2

- **`git push` requires:** build pass + `PATCH APPROVED` specifically for push
- **`firebase deploy` requires:** present what will deploy + `PATCH APPROVED` specifically for deploy

### Explicit Target Requirements

**For `firebase deploy`:**
- Must include `--project <id>` and `--only <targets>` (no default-project deploys)
- Must state current branch and confirm it matches footprint plan (deploy from `main` or designated release branch only)
- Before deploy, working tree must be **clean**: no staged changes, no unstaged changes, AND no deploy-impacting untracked files
- Before deploy, show: `firebase use` output OR `.firebaserc` project mapping to confirm correct project

**For `git push`:**
- Show current branch (`git branch --show-current`)
- Show remote + target (`git remote -v` + exact push command like `git push origin main`)
- Confirm branch/remote match footprint plan
- If mismatch or unclear → STOP

---

## LEVEL 3 — FORBIDDEN (Unless Explicitly Escalated)

**Absolutely forbidden by default:**
- Force push (`git push --force`), history rewrites, branch deletions
- Destructive file operations (mass delete, nuking directories)
- Secret/key access, rotation, or exfiltration
- Any "production" action beyond what Level 2 explicitly lists
- Any action that violates the governing law or the token flow

**If a situation seems to require Level 3: STOP and REPORT.**

---

## Critical Surfaces (Protected by Override)

If ANY patch touches these (or equivalent), you must request `CRITICAL SURFACE OVERRIDE` **before** editing:

- `firestore.rules`, `firestore.indexes.json`
- `storage.rules` (Firebase Storage security)
- `firebase.json`, `.firebaserc`
- `functions/**` (especially entrypoints)
- `.github/workflows/**`
- Auth / permissions / security policy files
- Anything that changes deploy targets, CI permissions, or security posture

---

## Deploy-Impacting Files

**Definition: "Deploy surfaces"** — any path that affects deploy outputs:
- functions code
- firestore rules
- storage rules
- hosting deploy directory
- workflows
- firebase config

**Definition: "Deploy-impacting untracked files"** — anything under deploy surfaces:
- `functions/**`, `firestore.rules`, `firestore.indexes.json`, `firebase.json`, `.firebaserc`
- `storage.rules` (if using Firebase Storage)
- `.github/workflows/**`
- Hosting directory as configured in `firebase.json`:
  - `hosting.public` (single site) or `hosting[].public` (multi-site array)
  - If no `public` exists (web frameworks), treat `hosting.source` / generated hosting output as deploy surface
  - Common values: `public/`, `dist/`, `build/`, `.output/`
  - If unclear → list and STOP
- Any file that would be packaged/built/deployed by the targets in `--only`
- If unsure whether an untracked file is deploy-impacting → list it and STOP

---

## Build Artifact Carveout (Allowed Untracked)

Untracked files are allowed inside build output directories ONLY if ALL conditions are met:
1. The footprint plan explicitly includes the build command (e.g., `npm run build`)
2. The ant runs the build during `STATE: VERIFY` (preferred) or `STATE: PATCH`
3. The ant reports a minimal proof snapshot: `du -sh <dir>` + `ls -la <dir> | head -20`
4. No other untracked files exist in deploy surfaces outside those build output directories

**What counts as "build output directory":**
A directory qualifies as build output ONLY if BOTH conditions are true:
- (a) Derived from `firebase.json` hosting config OR functions TypeScript output convention (`functions/lib/**`, `functions/dist/**`)
- (b) Gitignored in `.gitignore` OR generated during the build step in the current session

---

## Guardian Control Words (Human Inputs)

| Control Word | Effect |
|--------------|--------|
| `DISCOVERY APPROVED` | Grants Level 1 access, starts evidence budget |
| `DISCOVERY EXPANSION APPROVED: +{N} files` | Expands file budget |
| `DISCOVERY EXPANSION APPROVED: +{N} lines` | Expands line budget |
| `FOOTPRINT APPROVED` | Approves the proposed plan |
| `PATCH APPROVED` | Grants Level 2 access for edits/deploy/push |
| `CRITICAL SURFACE OVERRIDE` | Allows editing protected files |
| `BRANCH_PROTECTION_BYPASS APPROVED` | Allows bypassing GitHub branch protection (Level 3) |
| `STOP` | Immediate halt, no further actions |
| `CONTINUE` / `GO` | Resume after a non-critical STOP |
| `ROLLBACK` | Execute the documented rollback plan |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-PERMISSIONS v1.0.0 — QUICK REFERENCE                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LEVEL 0 — THINK ONLY                                           │
│  No tools, just reasoning and proposals                         │
│                                                                 │
│  LEVEL 1 — READ + VERIFY (DISCOVERY APPROVED)                   │
│  Read files, search, git status, run tests                      │
│  Budget: 5 files, 200 lines, 10 grep results                    │
│                                                                 │
│  LEVEL 2 — WRITE + CHANGE (PATCH APPROVED)                      │
│  Edit files, commit, push, deploy                               │
│  Extra gates for push and deploy                                │
│                                                                 │
│  LEVEL 3 — FORBIDDEN                                            │
│  Force push, mass delete, secrets → STOP and REPORT             │
│                                                                 │
│  CRITICAL SURFACES (require OVERRIDE):                          │
│  firestore.rules | firebase.json | functions/** | workflows     │
│                                                                 │
│  RULE: Tool access ≠ permission. Tokens still govern actions.   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from CODER_ANT_VSCODE_v1.3.9
- Level 0-3 permission hierarchy
- Critical surfaces list
- Deploy-impacting files definition
- Build artifact carveout
- Guardian control words
