# TRINITY-REF-DEPLOY-PUSH v1.0.0
## Deploy & Push Safety Checks

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Deploy and push approval checklists for Trinity (BQ)
**Source:** BABY_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Ant requests deploy or push
- Reviewing D3 gate with deploy/push in scope
- Need full safety checklist

Say: `LOAD: TRINITY-REF-DEPLOY-PUSH`

---

## Deploy Approval Checklist (All Must Pass)

Ant must provide evidence for EACH item:

### 0. Allowed Build Output Dirs (with evidence)
Ant must show the exact config evidence used to declare allowed build output dirs:
- `firebase.json` excerpt showing `hosting.public` OR `hosting[].public` OR framework output mapping
- Functions build output convention evidence (e.g., `functions/package.json`, `tsconfig.json`, or observed output from build step)

If the Ant cannot prove how the allowed dirs were derived → refuse deploy approval (code: `BQ_VIOLATION_DEPLOY_PROOF`).

### 1. Command Includes Explicit Project and Targets
- Must show `--project <project-id>` and `--only <targets>`
- No default-project deploys

### 2. Branch Matches Footprint Plan
- Must show `git branch --show-current`
- Must confirm it's the planned deploy branch (e.g., `main`)

### 3. Project Mapping Verified
- Must show `firebase use` output OR `.firebaserc` content
- Must match the `--project` in the deploy command

### 4. Clean Working Tree (verified via Untracked Audit)
- No staged changes
- No unstaged changes
- No deploy-impacting untracked files outside allowed build output dirs
- Tracked-change proof: no unexpected modifications from build

### 5. Untracked Audit Completed (Step 0, Step 1, Step 2)

**Step 0 — Declare and verify allowed build output directories:**
```bash
# Declare
Allowed build output dirs: dist/, functions/lib/

# Verify gitignore claims
git check-ignore -v dist/ 2>/dev/null || echo "NOT IGNORED: dist/"
```
If `NOT IGNORED` and dir wasn't generated this session → FAIL

**Step 1 — Capture and audit:**
```bash
# Before build
git status --porcelain > /tmp/status.before.txt

# (build runs)

# After build
git status --porcelain > /tmp/status.after.txt

# A) Diff proof: newly-added untracked
diff -u /tmp/status.before.txt /tmp/status.after.txt | grep -E '^\+\?\? ' | tail -50

# B) Final-state proof: ALL current untracked
grep -E '^\?\? ' /tmp/status.after.txt | tail -200

# C) Tracked-change proof: unexpected modifications
grep -vE '^\?\? ' /tmp/status.after.txt | head -50
```

**Step 2 — Attest:**
Ant must explicitly state:
> "All untracked paths in (B) are within declared allowed build output dirs."
> "No unexpected tracked changes in (C), OR changes are in footprint plan and will be committed."

### 6. Build Artifact Carveout (if applicable)
If build output dirs contain untracked files, verify:
- Build was in footprint plan
- Ant ran build during VERIFY or PATCH
- Proof snapshot provided (`du -sh` + `ls -la | head -20`)
- No other untracked deploy files exist

### 7. Tenant Isolation Test Gate (if tenant surfaces touched)
See `TRINITY-REF-MULTI-TENANT` for tenant test requirements.

---

## Deploy Failure Conditions (Any → Refuse)

- Untracked path outside allowed dirs
- Unexpected tracked change not in plan
- `git check-ignore` fails for claimed gitignored dir
- Branch doesn't match plan
- Missing `--project` or `--only`
- Project mapping mismatch
- Tenant isolation test missing or failed (if tenant surfaces touched)

✅ Only after ALL checks pass → include deploy in `🔑 PATCH APPROVED`
❌ If any fail → refuse deploy, require remediation or escalate

---

## Push Approval Checklist (All Must Pass)

Ant must provide:
- [ ] Build/test pass proof
- [ ] Current branch (`git branch --show-current`)
- [ ] Remote(s) (`git remote -v`)
- [ ] Exact push command (e.g., `git push origin main`)
- [ ] Confirmation branch/remote match footprint plan

---

## Push Failure Conditions

- Build failed
- Branch mismatch
- Remote mismatch
- Push command not in footprint plan

✅ Only after ALL checks pass → include push in `🔑 PATCH APPROVED`
❌ If any fail → STOP and resolve before push

---

## Safety Stack Awareness

The repo may have automated safety hooks:

| Hook | What It Does | Trinity Should NOT Require |
|------|--------------|---------------------------|
| pre-commit | ESLint on staged files | Manual `npm run lint` before commit |
| pre-push | `npm run build && npm run test:rules:emu` | Manual build/test before push |

**Implications:**
- Don't reject Ant for "not running lint" — hook does it automatically
- Push taking ~15 seconds is normal (emulator startup)
- If hook fails, Ant should STOP and fix — verify they did

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  TRINITY-REF-DEPLOY-PUSH v1.0.0                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DEPLOY CHECKLIST (items 0-7):                                  │
│  □ 0. Allowed dirs derived from config (with evidence)          │
│  □ 1. --project and --only specified                            │
│  □ 2. Branch matches plan                                       │
│  □ 3. Project mapping verified                                  │
│  □ 4. Clean working tree                                        │
│  □ 5. Untracked Audit passed (Step 0, 1, 2)                     │
│  □ 6. Build Artifact Carveout conditions met                    │
│  □ 7. Tenant Isolation Test passed (if tenant surfaces)         │
│                                                                 │
│  PUSH CHECKLIST:                                                │
│  □ Build passed                                                 │
│  □ Branch + remote match plan                                   │
│  □ Exact push command shown                                     │
│                                                                 │
│  FAIL → refuse, require remediation or escalate                 │
│  PASS → include in 🔑 PATCH APPROVED                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from BABY_QUEEN_VSCODE_v1.0.6
- Deploy checklist items 0-7
- Push checklist
- Untracked Audit steps
