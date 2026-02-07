# IAMBECCA-MEMORY v1.0.0
## Cross-Run Memory — Persistent Learning Across Sessions

**Purpose:** Pheromone registry, ant index, file ownership — memory that persists between runs
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Extracted from Colony OS governance/index/ patterns

---

## 1) Core Doctrine (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   MEMORY IS SURVIVAL.                                                       │
│                                                                             │
│   Without cross-run memory, every run starts blind.                         │
│   Ants repeat mistakes. Pheromones warn about landmines.                    │
│   The index tracks who did what. The map tracks who owns what.              │
│                                                                             │
│   READ memory BEFORE starting work. WRITE memory AFTER completing work.     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) Three Memory Systems

### 2.1 Pheromone Registry — "Warnings From the Past"

**What:** Warnings left by completed work to inform future work. Like sticky notes on landmines.

**Location:** `governance/index/PHEROMONE_REGISTRY.md`

**Severity Levels:**

| Level | Emoji | Meaning | Action Required |
|-------|-------|---------|-----------------|
| CRITICAL | 🔴 | Will break production if touched wrong | MUST read before touching target |
| HIGH_RISK | 🟠 | Likely to cause issues | SHOULD read before touching target |
| MEDIUM | 🟡 | Good to know | Read if touching related area |
| INFO | 🟢 | FYI | Optional reading |

**Entry Format:**

```markdown
### 🔴 CRITICAL

| Target | Category | Source ANT | Message |
|--------|----------|------------|---------|
| firestore.rules | Security | ANT-001 | Rules have custom functions — don't flatten |
| auth/useAuth.ts | Isolation | ANT-015 | wsId→tenantId migration in progress — don't add new wsId refs |

### 🟠 HIGH_RISK

| Target | Category | Source ANT | Message |
|--------|----------|------------|---------|
| functions/src/index.ts | Performance | ANT-042 | Cold start >3s — avoid adding imports |
```

**Write Rules:**
- Any Ant that discovers a landmine MUST add a pheromone entry
- Ghost Twins extract pheromones from Ant reports during archival
- BECCA may add pheromones from security audit findings
- Pheromones are NEVER deleted — only downgraded in severity

**Read Rules (D0 Gate):**
- Before starting ANY task, scan pheromone registry for entries matching your target files
- If 🔴 CRITICAL pheromone exists for your target: MUST acknowledge in report
- If 🟠 HIGH_RISK pheromone exists: SHOULD acknowledge in report

---

### 2.2 Master Ant Index — "Who Did What"

**What:** Complete ledger of all Ant executions across all runs. Tracks every task, its status, pheromone count, and report location.

**Location:** `governance/index/MASTER_ANT_INDEX.md`

**Entry Format:**

```markdown
| ANT ID | Type | Phase | Surface | Pheromones | Status | Report |
|--------|------|-------|---------|------------|--------|--------|
| ANT-001 | 🛠️ Carpenter | PH0 | firestore.rules | 🔴1 🟠2 | ✅ | → REPORTS_001_025.md |
| ANT-002 | 🔥 Fire | PH1 | auth/ | 🟡1 | ✅ | → REPORTS_001_025.md |
| ANT-003 | 🧹 Cleaner | PH1 | src/components/ | — | ❌ HALTED | → REPORTS_001_025.md |
```

**Sharding Rule:** 100 ANTs per index file. When MASTER_ANT_INDEX.md reaches 100 entries, Ghost Twins create a new shard:
```
governance/index/ANT_INDEX_001_100.md
governance/index/ANT_INDEX_101_200.md
governance/index/MASTER_ANT_INDEX.md  ← always has latest 100
```

**Status Values:**
| Symbol | Meaning |
|--------|---------|
| ✅ | Completed successfully |
| ❌ HALTED | Failed, did not complete |
| 🔄 | In progress |
| ⏸️ | Paused, waiting |

---

### 2.3 File Ownership Map — "Who Owns What"

**What:** Tracks which Ant last touched which file and when. Prevents conflicting edits and enables targeted reviews.

**Location:** `governance/index/FILE_OWNERSHIP_MAP.md`

**Entry Format:**

```markdown
| File Path | Last ANT | Run ID | Action | Date |
|-----------|----------|--------|--------|------|
| firestore.rules | ANT-001 | run_C023_001 | MODIFIED | 2026-02-05 |
| src/components/OrderList.tsx | ANT-015 | run_C023_002 | CREATED | 2026-02-05 |
| functions/src/auth.ts | ANT-042 | run_C023_003 | MODIFIED | 2026-02-05 |
```

**Update Rules:**
- Every Ant report's "Files Changed" section feeds this map
- Ghost Twins update during archival
- If two Ants touch the same file in the same batch: 🟠 HIGH_RISK pheromone

---

## 3) Memory Gate Protocol (D0)

**BEFORE starting any task, every Ant MUST:**

```
D0 MEMORY GATE:
├── 1. Read governance/index/PHEROMONE_REGISTRY.md
│   └── Filter for entries matching your target files/area
├── 2. Read governance/index/FILE_OWNERSHIP_MAP.md
│   └── Check who last touched your target files
├── 3. Acknowledge in report Section 0:
│   └── "PHEROMONE SCAN: [count] relevant entries found. [list if 🔴/🟠]"
└── 4. If 🔴 CRITICAL pheromone found:
    └── MUST explain how you'll handle it (or request BECCA guidance)
```

**Failure to scan:** `🔑 REJECTED: D0 memory gate not executed — no pheromone acknowledgment`

---

## 4) Memory Write Protocol (Post-Completion)

**AFTER completing any task, Ghost Twins MUST:**

```
MEMORY WRITE:
├── 1. Extract pheromones from Ant report
│   ├── Any warnings, gotchas, or landmines discovered
│   └── Assign severity: 🔴/🟠/🟡/🟢
├── 2. Update MASTER_ANT_INDEX.md
│   └── Add entry with ANT ID, type, phase, surface, pheromone count, status, report link
├── 3. Update FILE_OWNERSHIP_MAP.md
│   └── Add/update entries for all files touched
└── 4. Update PHEROMONE_REGISTRY.md
    └── Add new pheromone entries (if any)
```

---

## 5) Role-Specific Memory Duties

| Role | Memory Read | Memory Write |
|------|------------|--------------|
| **BECCA** (IM-01) | Reads all indexes before routing | Adds pheromones from security findings |
| **Oracle** (IM-02) | Reads pheromone registry for risk assessment | No direct writes |
| **Trinity** (IM-03) | Reads file ownership to avoid conflicts | No direct writes |
| **Trainman** (IM-04) | Reads file ownership for distribution | No direct writes |
| **Neo** (IM-05) | D0 gate scan before coding | Reports pheromones in ANT_REPORT |
| **Morpheus** (IM-06) | Reads pheromones for root cause context | Reports pheromones in DIAGNOSTIC |
| **Tank** (IM-07) | D0 gate scan before testing | Reports pheromones in ANT_REPORT |
| **Seraph** (IM-08) | Reads all indexes for security context | Reports CRITICAL pheromones |
| **Link** (IM-09) | D0 gate scan before infra changes | Reports pheromones in ANT_REPORT |
| **Niobe** (IM-10) | D0 gate scan before UI changes | Reports pheromones in ANT_REPORT |
| **Apoc** (IM-11) | D0 gate scan before data changes | Reports CRITICAL pheromones on data |
| **Ghost Twins** (IM-12) | Reads all for archival context | **PRIMARY WRITER** — updates all 3 indexes |
| **Sentinels** (IM-13) | Reads all for verification context | Reports CRITICAL pheromones |

---

## 6) Quarantine Protocol

When a report fails Ghost validation or contains suspicious data:

```
governance/index/QUARANTINED_REPORTS.md
```

**Entry Format:**

```markdown
| Report | ANT | Reason | Date | Resolution |
|--------|-----|--------|------|------------|
| ANT_REPORT_ANT-003.md | ANT-003 | Evidence invalid | 2026-02-05 | Pending resubmission |
```

---

## 7) Recent Unindexed Reports

Tracks reports that have been submitted but not yet processed by Ghost Twins:

```
governance/index/RECENT_UNINDEXED_REPORTS.md
```

**Entry Format:**

```markdown
| Report | ANT | Run | Submitted | Indexed? |
|--------|-----|-----|-----------|----------|
| ANT_REPORT_ANT-050.md | ANT-050 | run_C023_005 | 2026-02-05 | ⬜ Pending |
```

---

## 8) Required Directory Structure

When deploying IAMBecca to a new project, these directories MUST exist:

```
governance/
├── index/
│   ├── MASTER_ANT_INDEX.md        ← Who did what
│   ├── PHEROMONE_REGISTRY.md      ← Warnings from the past
│   ├── FILE_OWNERSHIP_MAP.md      ← Who owns what
│   ├── HORSEMEN_OUTCOMES.md       ← Verification results
│   ├── RECENT_UNINDEXED_REPORTS.md ← Pending processing
│   └── QUARANTINED_REPORTS.md     ← Failed reports
├── raw-reports/
│   ├── inbox/                     ← Incoming reports
│   ├── processed/                 ← Completed reports
│   └── quarantine/                ← Failed reports
└── reports/
    └── (sharded batch files)
```

---

## 9) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-MEMORY v1.0.0 — QUICK REFERENCE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  THREE MEMORY SYSTEMS:                                                      │
│  1. PHEROMONE REGISTRY — Warnings from past work (🔴🟠🟡🟢)                │
│  2. MASTER ANT INDEX — Who did what, when, how it went                      │
│  3. FILE OWNERSHIP MAP — Who owns which files                               │
│                                                                             │
│  D0 MEMORY GATE (BEFORE work):                                              │
│  • Read PHEROMONE_REGISTRY for target file warnings                         │
│  • Read FILE_OWNERSHIP_MAP for last owner                                   │
│  • Acknowledge in report (Section 0: PHEROMONE SCAN)                        │
│                                                                             │
│  POST-COMPLETION (Ghost Twins):                                             │
│  • Extract pheromones from Ant reports                                      │
│  • Update all 3 indexes                                                     │
│  • Shard at 100 entries per file                                            │
│                                                                             │
│  MEMORY IS SURVIVAL. Read before work. Write after work.                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-05
- Initial release
- Extracted from Colony OS governance/index/ patterns
- Pheromone Registry with 4 severity levels
- Master Ant Index with sharding at 100 entries
- File Ownership Map
- D0 Memory Gate protocol (pre-task scan)
- Memory Write protocol (post-completion)
- Role-specific memory duties for all 13 IM roles
- Quarantine and unindexed tracking
- Required directory structure
