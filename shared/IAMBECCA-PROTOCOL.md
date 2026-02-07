# IAMBECCA-PROTOCOL v1.0.0
## Governance Token Protocol — The Hivemind Enforcement Backbone

**Version:** 1.0.0
**Date:** 2026-02-07
**Purpose:** Gate progression, permission levels, truthy diffs, backup law, report-to-index contract, token authenticity
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Ported from ColonyOS Ant Operating Protocol v2.3.8 + PMX-SHARED-PERMISSIONS v1.0.0 + IAMBecca adaptations

---

## WHY THIS EXISTS (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   THE HIVEMIND LOOP                                                         │
│                                                                             │
│   We are building multi-tenant SaaS at 100K scale.                          │
│   100,000 Ants will touch this codebase.                                    │
│   Without coordination, they will destroy each other's work.                │
│                                                                             │
│   This protocol is the CLOSED LOOP that prevents that:                      │
│                                                                             │
│   ANT D0 SCAN ←── GHOST INDEX ←── GHOST ARCHIVIST ←── COMPLETION REPORT   │
│        │                                                        ↑           │
│        └──────── GATE PROGRESSION ──────────────────────────────┘           │
│                                                                             │
│   Gates FORCE complete reports.                                             │
│   Reports FEED the Ghost Index.                                             │
│   Ghost Index FEEDS the next Ant's D0.                                      │
│   Break ANY link = blind hivemind = SaaS breaks at scale.                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1) Gate Progression (HARD GATES)

Every Ant task MUST traverse these gates in order. No skipping. Each arrow = **STOP and wait for token before proceeding.**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   D0 (FREE)                                                                 │
│   Ghost Index Pre-Discovery — scan pheromones, ownership, prior work        │
│       │                                                                     │
│       ▼                                                                     │
│   ⏳ Request: 🔑 DISCOVERY APPROVED from Trinity                            │
│       │                                                                     │
│       ▼                                                                     │
│   D1 — DISCOVERY (Level 1 access)                                           │
│   Read target files, understand current behavior, collect evidence           │
│   Budget: 5 files, 200 lines, 10 grep results                              │
│   Exceeding requires: 🔑 DISCOVERY EXPANSION APPROVED: +{N} files/lines    │
│       │                                                                     │
│       ▼                                                                     │
│   D2 — FOOTPRINT                                                            │
│   Propose smallest change, list all files, estimate risk, rollback plan     │
│   ⏳ Request: 🔑 FOOTPRINT APPROVED from Trinity                            │
│       │                                                                     │
│       ▼                                                                     │
│   D3 — PATCH (Level 2 access)                                               │
│   ⏳ Request: 🔑 PATCH APPROVED from Trinity                                │
│   Apply changes, show diffs, document what changed                          │
│       │                                                                     │
│       ▼                                                                     │
│   D4 — VERIFY                                                               │
│   Run tests, check regressions, verify behavior, capture evidence           │
│       │                                                                     │
│       ▼                                                                     │
│   REPORT — Completion Report                                                │
│   8-section ANT_REPORT → Ghost Archivist → Ghost Index → next Ant's D0     │
│   ⏳ Request: 🔑 REPORT APPROVED from Trinity                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Gate Rules (FROZEN)

| Rule | Enforcement |
|------|-------------|
| ONE GATE PER MESSAGE | Cannot combine multiple gates in one message |
| STOP MEANS STOP | No "acknowledge violation and continue" |
| READ-ONLY TASKS STILL REQUIRE GATES | Gates apply regardless of read/write mode — only Level 2 tokens are skipped |
| TOKEN REQUIRED | Cannot cross a gate without receiving the approval token |
| D0 IS FREE | Ghost Index scan does NOT count toward evidence budget |

### Gate-to-State Mapping

| Gate | IAMBecca State | Permission Level |
|------|---------------|-----------------|
| D0 | IMPLEMENT (pre-scan) | Level 0 (Think Only) |
| D1 | DISCOVERY | Level 1 (Read + Verify) |
| D2 | FOOTPRINT | Level 1 (Read + Verify) |
| D3 | PATCH | Level 2 (Write + Change) |
| D4 | VERIFY | Level 2 (Write + Change) |
| REPORT | IMPLEMENT (wrap-up) | Level 1 (report writing) |

---

## 2) Permission Levels (HARD GATES)

### Relationship to IAMBECCA-TOOLS.md

> **These are TWO AXES, not one:**
> - **IAMBECCA-TOOLS.md** defines *which tools* each role can use (static, per-role)
> - **IAMBECCA-PROTOCOL.md** defines *when* an Ant can use them during IMPLEMENT (dynamic, token-gated)
>
> An Ant needs BOTH: the tool must be ✅ in TOOLS for their role, AND they must have
> the right gate token from PROTOCOL. Trinity issues tokens but doesn't run tools herself.

### LEVEL 0 — THINK ONLY (No Tools)

**Allowed:**
- Reasoning, outlining, asking for approval tokens, proposing plans

**Not allowed:**
- Reading files, running commands, modifying anything

**Exception:** D0 Ghost Index scan is FREE (see Section 1)

---

### LEVEL 1 — READ + VERIFY (Requires `🔑 DISCOVERY APPROVED`)

**Allowed:**
- Read files (no edits)
- Search codebase (Glob/Grep)
- `git status`, `git diff`, `git log`
- Run verification commands: `npm test`, `npm run build`, linters
- Inspect Firebase config and rules (read-only)
- Generate a footprint plan and risk assessment

**Evidence Budget applies:** Max 5 files, 200 lines, 10 grep results in initial discovery.
Exceeding requires `🔑 DISCOVERY EXPANSION APPROVED: +{N} files` or `+{N} lines`.

**Exception:** D0 Ghost Index scans are FREE and don't count toward budget.

**Not allowed:**
- Any file write/edit
- Any commit/push/deploy
- Any operation that changes repo state

---

### LEVEL 2 — WRITE + CHANGE (Requires `🔑 PATCH APPROVED`)

**Allowed (only after footprint is approved):**
- Edit/create files (surgical changes preferred)
- Create backups before edits (see Section 4 — Backup Law)
- Run build/tests after edits
- `git add` / `git commit` — must be in footprint plan; Truthy Diffs required (see Section 3)

**Extra gates inside Level 2:**
- **`git push` requires:** build pass + `🔑 PATCH APPROVED` specifically for push
- **`firebase deploy` requires:** present what will deploy + `🔑 PATCH APPROVED` specifically for deploy

**For `firebase deploy`:**
- Must include `--project <id>` and `--only <targets>` (no default-project deploys)
- Must state current branch and confirm it matches footprint plan
- Before deploy, working tree must be **clean**
- Before deploy, show: `firebase use` output OR `.firebaserc` project mapping

**For `git push`:**
- Show current branch (`git branch --show-current`)
- Show remote + target (`git remote -v` + exact push command)
- Confirm branch/remote match footprint plan
- If mismatch or unclear → STOP

---

### LEVEL 3 — FORBIDDEN (Unless Explicitly Escalated)

**Absolutely forbidden by default:**
- Force push (`git push --force`), history rewrites, branch deletions
- Destructive file operations (mass delete, nuking directories)
- Secret/key access, rotation, or exfiltration
- Any "production" action beyond what Level 2 explicitly lists
- Any action that violates the governing law or the token flow

**If a situation seems to require Level 3: STOP and escalate to BECCA.**

---

### Critical Surfaces (Protected by Override)

If ANY patch touches these (or equivalent), you MUST request `CRITICAL SURFACE OVERRIDE` **before** editing:

- `firestore.rules`, `firestore.indexes.json`
- `storage.rules` (Firebase Storage security)
- `firebase.json`, `.firebaserc`
- `functions/**` (especially entrypoints)
- `.github/workflows/**`
- Auth / permissions / security policy files
- Anything that changes deploy targets, CI permissions, or security posture

**Override issued by:** Oracle (IM-02) with Guardian approval, or BECCA (IM-01) directly.

---

## 3) Truthy Diffs Protocol (MANDATORY Before Commits)

Every commit MUST follow this exact sequence. No exceptions.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   TRUTHY DIFFS — 7-Step Commit Safety Protocol                              │
│                                                                             │
│   Purpose: Prevent garbage commits from poisoning the codebase.             │
│   A bad commit at scale = 100,000 Ants building on broken foundations.      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

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
**NEVER use `git add .` or `git add -A`** without explicit Guardian/BECCA approval.

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

### Step 7: Re-Review After Auto-Fix (If Pre-Commit Hook Ran)
If pre-commit hook modified files (e.g., ESLint auto-fix), you MUST re-review:
```bash
git diff --cached
```
The auto-fix may have changed staged content after your Step 5 review.

### STOP Conditions
- Staged files don't match footprint plan
- Unexpected files in `git status`
- Changes you don't recognize in `git diff`
- Any doubt about what's being committed

### Truthy Diff Checklist (Include in ANT_REPORT)
```
Truthy Diff Verified:
- [ ] git status reviewed
- [ ] git diff reviewed
- [ ] Specific files staged (no git add .)
- [ ] git diff --cached matches footprint
- [ ] Post-hook re-review (if applicable)
```

---

## 4) Backup Law (UNIVERSAL — Before ANY File Modification)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   BACKUP LAW — Two-Layer Mandatory Backup                                   │
│                                                                             │
│   Purpose: At 100K scale, a single bad patch without rollback =             │
│   cascading failures across dependent Ants.                                 │
│   Both layers REQUIRED. Verification REQUIRED.                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Two-Layer Backup (Both Required)

| Layer | Purpose | When |
|-------|---------|------|
| **Git Checkpoint** | Version control rollback | Before ANY file modification |
| **Desktop Backup** | Filesystem fallback (outside repo) | Before ANY file modification |

### Standard Backup Procedure

**Pre-checkpoint check:** If unrelated changes exist in working tree, slice or revert them BEFORE creating checkpoint commit. Checkpoint commits may only stage the **target files** of the approved footprint plan.

**PowerShell version (Windows):**
```powershell
# 1. Git checkpoint (always first — stays on current branch)
git status
git add <target-files>   # Stage only files you're about to modify
git commit -m "CHECKPOINT: before ANT-XXX changes"
# Optional: create backup pointer (does NOT switch branches)
$ts = Get-Date -Format 'yyyyMMdd-HHmmss'
git branch "ant-XXX-backup-$ts"

# 2. Desktop backup (outside repo)
$backupDir = "$env:USERPROFILE\Desktop\colony-backups\ANT-XXX-$ts"
New-Item -ItemType Directory -Force -Path $backupDir
Copy-Item -Recurse -Path "src\path\to\target" -Destination $backupDir

# 3. Verify backup contains expected files
Get-ChildItem $backupDir
# Must show expected files/folders, NOT empty
```

**Bash version (Unix/WSL):**
```bash
# 1. Git checkpoint
git status
git add <target-files>
git commit -m "CHECKPOINT: before ANT-XXX changes"
git branch ant-XXX-backup-$(date +%Y%m%d-%H%M%S)

# 2. Desktop backup
BACKUP_DIR="$HOME/Desktop/colony-backups/ANT-XXX-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r src/path/to/target "$BACKUP_DIR/"

# 3. Verify
ls -la "$BACKUP_DIR/"
```

Replace `ANT-XXX` with your Ant ID. Replace `src/path/to/target` with actual target.

### Backup Verification (Required)

After creating backup, verify it's not empty. **If empty → STOP.**

### Dual Restore Commands

| Option | Command | When |
|--------|---------|------|
| Git restore (preferred) | `git reset --hard HEAD~1` or checkout backup branch | Patch failed, need clean slate |
| Desktop restore | Copy from `~/Desktop/colony-backups/ANT-XXX-*/` | Git state corrupted |

### STOP Conditions (Backup-Related)

| Condition | Action |
|-----------|--------|
| Git checkpoint fails | STOP. Resolve git state before proceeding. |
| Desktop backup directory creation fails | STOP. Check disk space and permissions. |
| Backup is empty after verification | STOP. Re-run backup with correct path. |
| Backup path is inside the repo | STOP. Use `~/Desktop/colony-backups/` instead. |

---

## 5) Report-to-Index Contract (THE HIVEMIND GLUE)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   REPORT-TO-INDEX CONTRACT                                                  │
│                                                                             │
│   Every Ant's completion report feeds the Ghost Index.                      │
│   The Ghost Index feeds the NEXT Ant's D0 scan.                             │
│   This contract defines exactly HOW report sections map to index files.     │
│                                                                             │
│   If your report is incomplete, the index gets stale,                       │
│   and the next 100,000 Ants are flying blind.                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.1 Report Section → Index File Mapping

| ANT_REPORT Section | Feeds Into | Ghost Index File |
|---|---|---|
| **Files Changed** (Section 3) | FILE_OWNERSHIP_MAP | `governance/index/FILE_OWNERSHIP_MAP.md` |
| **Pheromones Emitted** (Section 6) | PHEROMONE_REGISTRY | `governance/index/PHEROMONE_REGISTRY.md` |
| **Full Report** (all sections) | MASTER_ANT_INDEX | `governance/index/MASTER_ANT_INDEX.md` |
| **Task ID + Status** | RECENT_UNINDEXED | `governance/index/RECENT_UNINDEXED_REPORTS.md` |
| **Failed/Quarantined** | QUARANTINED_REPORTS | `governance/index/QUARANTINED_REPORTS.md` |

### 5.2 What Ghost Twins Extract From Your Report

When Ghost Twins archive your report, they extract:

| Data | From Section | Into Index |
|------|-------------|------------|
| ANT ID, Type, Phase, Status | Header | MASTER_ANT_INDEX (one-line entry) |
| Files modified/created | Section 3 (Work Performed) | FILE_OWNERSHIP_MAP |
| Pheromone warnings | Section 6 (Risks/Unknowns) | PHEROMONE_REGISTRY (with severity) |
| Report path | Filing location | MASTER_ANT_INDEX (report backlink) |
| Pheromone count | Extracted count | MASTER_ANT_INDEX (pheromone summary) |

### 5.3 Mandatory Report Fields for Index Feeding

**Your ANT_REPORT MUST include these for the hivemind to work:**

| Field | Why | Index Impact |
|-------|-----|-------------|
| ANT_ID | Unique identifier | MASTER_ANT_INDEX key |
| Files Changed (with paths) | Ownership tracking | FILE_OWNERSHIP_MAP entries |
| Pheromones (if any) | Warnings for future Ants | PHEROMONE_REGISTRY entries |
| Status (COMPLETE/HALTED) | Run health tracking | MASTER_ANT_INDEX status |
| Approval token | Proof of gate compliance | Ghost validation gate |

### 5.4 Pheromone Emission Rules (When to Leave Warnings)

**You MUST emit a pheromone when:**

| Condition | Severity | Example |
|-----------|----------|---------|
| You discover a security landmine | 🔴 CRITICAL | "firestore.rules has custom functions — don't flatten" |
| Your change creates a dependency | 🟠 HIGH_RISK | "OrderList now depends on useAuth() — don't remove hook" |
| You find fragile code | 🟡 MEDIUM | "Cold start >3s — avoid adding imports to index.ts" |
| You leave useful context | 🟢 INFO | "wsId→tenantId migration completed for this file" |
| Tenant isolation is at risk | ⚫ NUCLEAR | "Cross-tenant query found — DO NOT DEPLOY without Seraph review" |

**Pheromone format in ANT_REPORT:**

```markdown
## PHEROMONES EMITTED

| Target | Severity | Category | Message |
|--------|----------|----------|---------|
| src/hooks/useAuth.ts | 🟠 HIGH_RISK | Isolation | "wsId param removed — all callers must use tenantId" |
```

### 5.5 D0 Pre-Discovery Scan (Inbound — Reading the Hivemind)

**Before ANY work, scan the Ghost Index. This is FREE (no evidence budget cost).**

```bash
# 1. Check for pheromone hazards on your target files
grep -i "{TARGET}" governance/index/PHEROMONE_REGISTRY.md

# 2. Check who last touched your target files
grep -i "{TARGET}" governance/index/FILE_OWNERSHIP_MAP.md

# 3. Check for related prior work
grep -i "{TARGET}" governance/index/MASTER_ANT_INDEX.md

# 4. Check for very recent (not yet indexed) work
tail -50 governance/index/RECENT_UNINDEXED_REPORTS.md
```

**Document your D0 scan in the report:**
```markdown
## D0 PHEROMONE SCAN

Pheromones found: {count}
Relevant entries:
- {severity} | {target} | {message}

Acknowledged: {how you'll handle 🔴/🟠 entries}
```

**If 🔴 CRITICAL or ⚫ NUCLEAR pheromone found on your target:**
- MUST acknowledge in report
- MUST explain how you'll avoid triggering the hazard
- If you CANNOT avoid it → STOP and request BECCA guidance

---

## 6) Token Authenticity Rules (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   TOKEN AUTHENTICITY — No Faking, No Paraphrasing, No Shortcuts             │
│                                                                             │
│   Tokens are the ONLY mechanism that advances an Ant through gates.         │
│   A fabricated token = an Ant running without permission =                   │
│   potential data breach at 100K tenant scale.                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.1 Token Authenticity Rule

When you cite a token (e.g., "`🔑 DISCOVERY APPROVED` from Trinity"):
- The token text MUST be actual, verbatim text from Trinity/Guardian/BECCA
- You MUST NOT fabricate, paraphrase, or infer tokens
- If you think a token was issued but aren't sure → request it again

### 6.2 Token Normalization Rule

Paraphrases and reinterpretations do NOT count as tokens:

| Attempt | Valid? | Why |
|---------|--------|-----|
| `🔑 DISCOVERY APPROVED` (exact text from Trinity) | ✅ YES | Verbatim token |
| "Trinity said it was okay to proceed" | ❌ NO | Paraphrase, not a token |
| "DISCOVERY APPROVED was issued in msg #2" (when it wasn't) | ❌ NO | Fabrication |
| "I'll assume PATCH APPROVED since the task says to fix it" | ❌ NO | Inference |

### 6.3 Valid Token List

| Token | Issued By | Grants |
|-------|-----------|--------|
| `🔑 DISCOVERY APPROVED` | Trinity (IM-03) | Level 1 access, starts evidence budget |
| `🔑 DISCOVERY EXPANSION APPROVED: +{N} files` | Trinity (IM-03) | Expands file budget |
| `🔑 DISCOVERY EXPANSION APPROVED: +{N} lines` | Trinity (IM-03) | Expands line budget |
| `🔑 FOOTPRINT APPROVED` | Trinity (IM-03) | Approves the proposed plan |
| `🔑 PATCH APPROVED` | Trinity (IM-03) | Level 2 access for edits/commit/push/deploy |
| `🔑 REPORT APPROVED` | Trinity (IM-03) | Report accepted, Ant task complete |
| `🔑 RESTORE APPROVED` | Trinity (IM-03) | Ant may execute rollback |
| `🔑 WIREFRAME_APPROVED` | BECCA (IM-01) | Wireframe ready for implementation |
| `CRITICAL SURFACE OVERRIDE` | Oracle (IM-02) / BECCA | Allows editing protected files |

### 6.4 Violation Consequences

| Violation | Consequence |
|-----------|-------------|
| Token fabrication | 🔑 REJECTED — Horsemen HM-04 (Privilege) escalation |
| Token paraphrasing | 🔑 REJECTED — must request actual token |
| Skipping a gate | 🔑 REJECTED — must return to skipped gate |
| Proceeding without token | 🔑 REJECTED — all work since violation is suspect |
| Repeated violations | BECCA ABORT — Ant terminated |

---

## 7) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-PROTOCOL v1.0.0 — QUICK REFERENCE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GATE PROGRESSION:                                                          │
│    D0 (FREE) → D1 (🔑 DISCOVERY APPROVED) → D2 (FOOTPRINT)                 │
│    → D3 (🔑 PATCH APPROVED) → D4 (VERIFY) → REPORT (🔑 REPORT APPROVED)   │
│                                                                             │
│  PERMISSION LEVELS:                                                         │
│    Level 0 — THINK ONLY (no tools)                                          │
│    Level 1 — READ + VERIFY (🔑 DISCOVERY APPROVED)                          │
│    Level 2 — WRITE + CHANGE (🔑 PATCH APPROVED)                             │
│    Level 3 — FORBIDDEN (BECCA escalation only)                              │
│                                                                             │
│  BEFORE EVERY COMMIT — TRUTHY DIFFS:                                        │
│    1. git status --short                                                    │
│    2. git diff                                                              │
│    3. git add <specific-files> (NEVER git add .)                            │
│    4. git diff --cached --stat                                              │
│    5. git diff --cached                                                     │
│    6. git commit                                                            │
│    7. Re-review if pre-commit hook modified files                           │
│                                                                             │
│  BEFORE EVERY FILE EDIT — BACKUP LAW:                                       │
│    Layer 1: Git checkpoint (git add + commit + backup branch)               │
│    Layer 2: Desktop backup (~/Desktop/colony-backups/ANT-XXX-*/             │
│    Layer 3: Verify backup is NOT empty                                      │
│                                                                             │
│  REPORT → INDEX (HIVEMIND GLUE):                                            │
│    Files Changed     → FILE_OWNERSHIP_MAP                                   │
│    Pheromones Emitted → PHEROMONE_REGISTRY                                  │
│    Full Report       → MASTER_ANT_INDEX                                     │
│    Task Status       → RECENT_UNINDEXED_REPORTS                             │
│                                                                             │
│  TOKENS — AUTHENTICITY RULES:                                               │
│    Must be VERBATIM from Trinity/BECCA/Oracle                               │
│    No fabrication, no paraphrasing, no inference                            │
│    Violation = Horsemen HM-04 escalation                                    │
│                                                                             │
│  CRITICAL SURFACES (require OVERRIDE):                                      │
│    firestore.rules | firebase.json | functions/** | workflows/**            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-07
- Initial release
- Section 1: Gate Progression — D0→D1→D2→D3→D4→REPORT with token gates
- Section 2: Permission Levels — Level 0-3 hierarchy (ported from PMX-SHARED-PERMISSIONS v1.0.0)
- Section 3: Truthy Diffs Protocol — 7-step mandatory commit safety (ported from ColonyOS v2.3.8)
- Section 4: Backup Law — Two-layer mandatory backup with verification (ported from ColonyOS v2.3.8)
- Section 5: Report-to-Index Contract — Hivemind glue mapping report sections to Ghost Index files
- Section 6: Token Authenticity Rules — No fabrication, no paraphrasing, violation consequences
- Section 7: Quick Reference
