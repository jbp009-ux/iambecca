# PMX-SHARED-SAFETY v1.0.0
## Safety Stack & Recovery

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Automated safety hooks and recovery procedures
**Scope:** Identical across all projects
**Source:** Extracted from CODER_ANT_VSCODE_v1.3.9

---

## Overview

Colony OS repos have automated safety hooks. Know what they do so you don't fight them.

---

## What Hooks Handle Automatically (Don't Duplicate)

| Hook | Trigger | What It Does | You Do NOT Need To |
|------|---------|--------------|-------------------|
| pre-commit | `git commit` | ESLint on staged files (auto-fixes if possible) | Manually run `npm run lint` before commit |
| pre-push | `git push` | `npm run build && npm run test:rules:emu` | Manually run build/test before push |

**Timing note:** Pre-push takes ~10-15 seconds (emulator startup). This is normal.

**If hooks fail:** Commit/push is **blocked**. Fix the error, retry the command. See Error Recovery below.

---

## Branch Protection (main is Guarded)

- Direct pushes to `main` blocked (or show "Bypassed" warning for owner)
- **Work on feature branches:** `git checkout -b feature/xyz`
- PRs are the standard path to main
- CI must pass before merge

---

## GitHub Actions CI (Server-Side Verification)

Even if local hooks pass, server CI runs on every PR:
1. `npm run lint`
2. `npm run build`
3. `npm run test:rules:emu`

**PRs cannot merge until CI is green.**

---

## Gitleaks (Secret Scanning)

Runs on every PR/push to main + daily scheduled scan.
- **NEVER commit `.env` files or hardcoded API keys**
- Use `.env.example` for documenting required keys (without values)
- If Gitleaks fails: remove secret, rotate it, recommit

---

## Truthy Diffs Protocol (MANDATORY Before Commits)

Every commit MUST follow this exact sequence. No exceptions.

### Step 1: See Everything
```bash
git status --short
```
Review ALL modified/untracked files. If ANY file is outside your footprint plan → STOP.

### Step 2: Review Unstaged Changes
```bash
git diff
```
Read the actual code changes. Verify they match your intent.

### Step 3: Stage Intentionally
```bash
git add <specific-file-1> <specific-file-2>
```
**NEVER use `git add .` or `git add -A` without explicit Guardian approval.**

### Step 4: Verify Staged Set
```bash
git diff --cached --stat
```
Confirm ONLY intended files are staged. If mismatch → `git restore --staged <file>`.

### Step 5: Final Diff Review
```bash
git diff --cached
```
Read the exact changes that will be committed. This is your last checkpoint.

### Step 6: Commit
Only after steps 1-5 pass:
```bash
git commit -m "..."
```

### STOP Conditions
- Staged files don't match footprint plan
- Unexpected files in `git status`
- Changes you don't recognize in `git diff`
- Any doubt about what's being committed

### Truthy Diff Checklist
```
Truthy Diff Verified:
- [ ] git status reviewed
- [ ] git diff reviewed
- [ ] Specific files staged (no git add .)
- [ ] git diff --cached matches footprint
```

---

## Error Recovery Cheat Sheet

| What Failed | What Happened | Fix |
|-------------|---------------|-----|
| Pre-commit (lint) | ESLint error in staged files | Fix lint error, re-commit |
| Pre-push (build) | Build failed | Fix build error, re-push |
| Pre-push (test) | Security rules test failed | Fix rules or test, re-push |
| CI | Server-side check failed | Check Actions logs, fix locally, push again |
| Gitleaks | Secret detected | Remove secret from code, rotate the credential, recommit |

---

## Git: Undo Local Mistakes

| Action | Command |
|--------|---------|
| Unstage a file | `git restore --staged <file>` |
| Discard local changes to a file | `git restore <file>` |
| Discard ALL local changes | `git restore .` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |

---

## Git: Undo a Bad Commit (Shared Branches)

| Action | Command |
|--------|---------|
| Revert a commit (creates undo commit) | `git revert <SHA>` |
| Abort in-progress rebase | `git rebase --abort` |
| View recent history | `git reflog` |
| Hard reset to reflog entry | `git reset --hard <reflog_sha>` ⚠️ Guardian approval only |

---

## Firebase: Rollback a Deploy

| Action | Command |
|--------|---------|
| List recent deploys | `firebase hosting:channel:list` |
| Rollback to previous version | Use Firebase Console → Hosting → Release History → Rollback |

---

## Emergency: Nuclear Options (Guardian Approval Required)

- `git push --force` — Rewrites remote history (DANGER)
- `git reset --hard origin/main` — Discards ALL local commits
- `firebase hosting:disable` — Takes site offline

---

## Standard Workflow (With Hooks)

```
1. git checkout -b feature/xyz     ← Create feature branch
2. (make changes)
3. git commit -m "message"         ← Hook: lint runs automatically
4. git push origin feature/xyz     ← Hook: build + test runs (~15s)
5. Open PR                         ← CI runs server-side
6. Merge when CI green             ← main updated
```

---

## Repo Hygiene + Commit Slicing Law

When the working tree contains multiple unrelated changes, the Ant MUST slice commits by capability.

### Mandatory Checks (Before Any Commit)
```bash
git status --short
git diff --stat
```

If changes span multiple capabilities:
**STOP and propose a commit slicing plan** (group by feature/instrument).

### Commit Slicing Rule
**One commit = one capability. No mega-commits.**

Allowed capability buckets include:
- Test runner / emulator automation
- ESLint configuration & ignores
- Tool runtime fixes (ESM/CJS)
- UI/component fixes
- Firebase config
- Documentation / runbooks
- Governance / prompts

### Safety Rule
If a file appears in the tree but is NOT in the current commit bucket:
- It must remain unstaged, OR
- Be reverted before committing

### Proof Required Per Commit
For each commit bucket, provide:
- `git diff --stat` (what files)
- Short "what changed / why"
- Verification commands relevant to that bucket

### Never Commit Junk
- `.firebase/` must be in `.gitignore`
- `nul` (Windows artifact) must NOT be committed
- `node_modules/` must be in `.gitignore`

---

## Untracked Audit (Required Before Deploy)

To prove "no unexpected files in deploy surfaces," the ant must:

### Step 0: Declare and verify allowed build output directories
```
Allowed build output dirs: dist/, functions/lib/
```

For each declared allowed dir, verify it's gitignored:
```bash
git check-ignore -v dist/ 2>/dev/null || echo "NOT IGNORED: dist/"
git check-ignore -v functions/lib/ 2>/dev/null || echo "NOT IGNORED: functions/lib/"
```

### Step 1: Capture and audit
```bash
# Before build
git status --porcelain > /tmp/status.before.txt

# Run build (e.g., npm run build)

# After build
git status --porcelain > /tmp/status.after.txt

# A) Diff proof: show only newly-added untracked files
diff -u /tmp/status.before.txt /tmp/status.after.txt | grep -E '^\+\?\? ' | tail -50

# B) Final-state proof: list ALL untracked files
grep -E '^\?\? ' /tmp/status.after.txt | tail -200

# C) Tracked-change proof: build must not modify tracked files unexpectedly
grep -vE '^\?\? ' /tmp/status.after.txt | head -50
```

### Step 2: Validate and attest
> "All current untracked paths shown in (B) are within the declared allowed build output directories. No deploy-impacting untracked files exist outside these directories."
>
> "No unexpected tracked file changes exist in (C), OR the tracked changes shown are explicitly allowed in the footprint plan."

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-SAFETY v1.0.0 — QUICK REFERENCE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  HOOKS:                                                         │
│  • pre-commit: ESLint auto-fix                                  │
│  • pre-push: build + test:rules:emu                             │
│                                                                 │
│  TRUTHY DIFFS (before commit):                                  │
│  1. git status --short                                          │
│  2. git diff                                                    │
│  3. git add <specific files> (NEVER git add .)                  │
│  4. git diff --cached --stat                                    │
│  5. git diff --cached                                           │
│  6. git commit                                                  │
│                                                                 │
│  COMMIT SLICING:                                                │
│  One commit = one capability. No mega-commits.                  │
│                                                                 │
│  UNDO:                                                          │
│  • Unstage: git restore --staged <file>                         │
│  • Discard: git restore <file>                                  │
│  • Undo commit: git reset --soft HEAD~1                         │
│                                                                 │
│  NUCLEAR (Guardian only):                                       │
│  • git push --force                                             │
│  • git reset --hard origin/main                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from CODER_ANT_VSCODE_v1.3.9
- Git hooks documentation
- Branch protection rules
- Truthy Diffs Protocol
- Error recovery cheat sheet
- Repo hygiene + commit slicing law
- Untracked audit procedure
