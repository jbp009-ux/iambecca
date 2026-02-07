# IAMBecca Manual v1.0.1
## Multi-Agent Orchestration Framework for Multi-Tenant SaaS

**Version:** 1.0.1
**Date:** 2026-02-04
**Author:** Jose Brito
**Purpose:** Comprehensive reference for the IAMBecca orchestration framework

---

## Table of Contents

1. [Overview](#1-overview)
2. [Nuclear Invariant: Tenant Isolation](#2-nuclear-invariant-tenant-isolation)
3. [Identity Protocol: I AM](#3-identity-protocol-i-am)
4. [Role Hierarchy](#4-role-hierarchy)
5. [Chain Types](#5-chain-types)
6. [State Machine](#6-state-machine)
7. [Shared Modules](#7-shared-modules)
8. [Packet System](#8-packet-system)
9. [Evidence Requirements](#9-evidence-requirements)
10. [Error Handling & BECCA ABORT](#10-error-handling--becca-abort)
11. [Recovery Protocol](#11-recovery-protocol)
12. [Directory Structure](#12-directory-structure)
13. [Templates](#13-templates)
14. [Quick Reference](#14-quick-reference)

---

## 1. Overview

IAMBecca is a **multi-agent orchestration framework** designed to coordinate AI agents for building and maintaining multi-tenant SaaS applications at scale (100K+ clients). The framework ensures:

- **Deterministic execution** through disk-based state management
- **Crash recovery** via progress files and baton packets
- **Security** through tenant isolation doctrine
- **Quality** through evidence contracts and validation gates
- **Coordination** through chain-based handoffs

### Core Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   DISK IS TRUTH.                                                            │
│                                                                             │
│   • Every state change persists to disk                                     │
│   • Every handoff writes a baton packet                                     │
│   • Every claim requires verifiable evidence                                │
│   • If chat dies, recover from disk state                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Roles are disposable** | Agents can be reactivated from disk state |
| **Packets are truth** | Baton packets carry all context for handoffs |
| **Evidence over claims** | No output is valid without verifiable evidence |
| **Isolation is nuclear** | Tenant data separation is non-negotiable |
| **Recovery is automatic** | Chat crashes don't lose work |

---

## 2. Nuclear Invariant: Tenant Isolation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ⚫ TENANT ISOLATION IS THE #1 NON-NEGOTIABLE REQUIREMENT                  │
│                                                                             │
│   We are building multi-tenant SaaS for 100K clients.                       │
│   Every line of code, every query, every component must enforce isolation.  │
│                                                                             │
│   If a single client can see another client's data = catastrophic breach.   │
│                                                                             │
│   THIS IS NOT NEGOTIABLE. EVER.                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Canonical Tenant Key Law (FROZEN)

| Field | Status | Usage | Storage |
|-------|--------|-------|---------|
| `tenantId` | **CANONICAL** | All DB, rules, APIs, server-side | ✅ Stored in all collections |
| `wsId` | **UI ALIAS** | Frontend state/context only | ❌ Never stored as authority |
| `businessId` | **SECONDARY** | Business entity within tenant | ✅ Stored, but tenant-scoped |

**Key Rules:**
1. **Storage/DB/Rules/API**: MUST use `tenantId` as the tenant boundary key
2. **UI/Frontend**: May use `wsId` for display, but MUST translate to `tenantId` via auth token for server calls
3. **businessId**: Allowed only as a secondary entity WITHIN a tenant scope
4. **Auth Token**: `context.auth.token.tenantId` is the ONLY trusted tenant value

### The Three Isolation Pillars

#### Pillar 1: Query Scoping

**EVERY Firestore query MUST include tenant filter.**

```typescript
// ✅ CORRECT
const orders = await db.collection('orders')
  .where('tenantId', '==', tenantId)  // ✅ ALWAYS
  .get();

// ❌ WRONG — NEVER
const orders = await db.collection('orders').get();  // FULL TABLE SCAN = BREACH
```

#### Pillar 2: Component Isolation (useAuth Doctrine)

**NEVER accept tenant ID from props. ALWAYS use useAuth().**

```typescript
// ✅ CORRECT
export const OrderList: React.FC = () => {
  const { wsId } = useAuth();  // ✅ From auth context
  const { orders } = useOrders(wsId);
  return <div>...</div>;
};

// ❌ WRONG — SECURITY RISK
interface OrderListProps { wsId: string; }  // ❌ NEVER
export const OrderList: React.FC<OrderListProps> = ({ wsId }) => {...};
```

#### Pillar 3: Server-Side Enforcement

**Backend MUST validate tenant from auth token, NEVER from request body.**

```typescript
// ✅ CORRECT
export const getOrders = functions.https.onCall(async (data, context) => {
  const tenantId = context.auth?.token.tenantId;  // ✅ From auth token
  if (!tenantId) {
    throw new functions.https.HttpsError('permission-denied', 'No tenant context');
  }
});

// ❌ WRONG — NEVER TRUST REQUEST DATA
export const getOrders = functions.https.onCall(async (data) => {
  const tenantId = data.tenantId;  // ❌ CLIENT COULD SEND ANY TENANT ID
});
```

### BECCA ABORT Triggers (Isolation)

| Finding | Action |
|---------|--------|
| Query without tenantId filter on tenant data | BECCA ABORT |
| Component accepts wsId/tenantId as prop | BECCA ABORT |
| User sees another user's data | BECCA ABORT |
| Cross-tenant data in query results | BECCA ABORT |
| Missing tenant check in security rules | BECCA ABORT |
| API returns data for wrong tenant | BECCA ABORT |

---

## 3. Identity Protocol: I AM

Every role must assert its identity at activation. This creates an immutable contract for the conversation turn.

### Identity Assertion Format

```markdown
I_AM_STATE: <STATE_NAME>

ROLE: <DisplayName> (<RoleCode>)
TARGET: <target_name>
RUN_ID: <run_id>

I AM <DisplayName>. <Identity motto>.
```

### Example

```markdown
I_AM_STATE: IMPLEMENT

ROLE: Neo (ANT-CODER)
TARGET: IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE
RUN_ID: run_C023_fitness-vsl_2026-02-04_001

I AM Neo. I write surgical code, nothing more.
```

### Activation Phrases

| Role | Code | Activation Phrase |
|------|------|-------------------|
| Source (BECCA) | IM-01 | "BECCA activate" |
| Oracle | IM-02 | "Oracle activate" |
| Trinity | IM-03 | "Trinity activate" |
| Trainman | IM-04 | "Trainman activate" |
| Neo | IM-05 | "Neo activate" |
| Morpheus | IM-06 | "Morpheus activate" |
| Tank | IM-07 | "Tank activate" |
| Seraph | IM-08 | "Seraph activate" |
| Link | IM-09 | "Link activate" |
| Niobe | IM-10 | "Niobe activate" |
| Apoc | IM-11 | "Apoc activate" |
| Ghost Twins | IM-12 | "Ghost activate" |

### Chain Handoff Rules

1. **No handoff until output is written to disk**
2. **Baton packet must contain all context for next role**
3. **Activation phrase + baton packet = handoff complete**
4. **If context is lost, disk state enables recovery**

---

## 4. Role Hierarchy

IAMBecca defines **30 roles** across 5 chains.

### IM Chain (Core - 12 Roles)

| Code | Matrix Name | Old Name | Function |
|------|-------------|----------|----------|
| IM-01 | Source | BECCA | Supreme coordinator, all decisions route through |
| IM-02 | Oracle | MQ | Planner, creates implementation plans |
| IM-03 | Trinity | BQ | Executor, manages ant work |
| IM-04 | Trainman | DISTRIBUTOR | Distributes work packets to ants |
| IM-05 | Neo | ANT-CODER | Writes code |
| IM-06 | Morpheus | ANT-DEBUGGER | Diagnoses issues (NO code edits) |
| IM-07 | Tank | ANT-TEST | Writes and runs tests |
| IM-08 | Seraph | ANT-SECURITY | Security auditor |
| IM-09 | Link | ANT-INFRA | Firebase/infrastructure |
| IM-10 | Niobe | ANT-UI | UI/UX implementation |
| IM-11 | Apoc | ANT-DATA | Data transformations |
| IM-12 | Ghost Twins | ANT-REVIEW | Evidence validation gate |

### SA Chain (Security Audit - 5 Roles)

| Code | Name | Function |
|------|------|----------|
| SA-01 | Data Leaks | Scans for data exposure |
| SA-02 | Tenant Isolation | Verifies isolation |
| SA-03 | Auth Secrets | Checks auth/secrets |
| SA-04 | OWASP | OWASP top 10 scan |
| SA-05 | Verdict | Final security verdict |

### HM Chain (Horsemen/Sentinels - 5 Roles)

| Code | Name | Horseman | Function |
|------|------|----------|----------|
| HM-01 | Hallucination | First | Detects fabricated outputs |
| HM-02 | Amnesia | Second | Detects context loss |
| HM-03 | Drift | Third | Detects scope creep |
| HM-04 | Privilege | Fourth | Detects permission issues |
| HM-05 | Silent Failure | Fifth | Detects hidden failures |

### EXT Chain (External - 2 Roles)

| Code | Matrix Name | Function |
|------|-------------|----------|
| EXT-01 | Merovingian | External planner |
| EXT-02 | Keymaker | PM Inspector |

### PM Chain (Prompt Maker - 6 Roles)

| Code | Name | Function |
|------|------|----------|
| PM-00 | Prompt Architect | Designs prompts |
| PM-01 | Morpheus | Hallucination analysis |
| PM-02 | Architect | Amnesia analysis |
| PM-03 | Sentinel | Drift analysis |
| PM-04 | Keymaker | Privilege analysis |
| PM-05 | Analyst | Consolidator |

---

## 5. Chain Types

### CHAIN_SA (Security Audit)

```
SA-01 → SA-02 → SA-03 → SA-04 → SA-05 → BECCA
```

**Purpose:** Full security audit before releases

### CHAIN_HM (Horsemen)

```
HM-01 → HM-02 → HM-03 → HM-04 → HM-05 → BECCA
```

**Purpose:** Detect AI anti-patterns (escalation path when Ant+Debugger fails)

### CHAIN_PM (Prompt Maker)

```
Oracle → Trainman → Trinity → Ghost → Oracle (close)
```

**Purpose:** Standard work execution

### CHAIN_WORKER (Worker)

```
Trinity → [Ants] → Trinity → Ghost → Trinity (certificate)
```

**Purpose:** Batch task execution

---

## 6. State Machine

### States

| State | Description | Who |
|-------|-------------|-----|
| P0_INVENTORY | Initialize run | BECCA |
| ANALYZE | Plan work | Oracle |
| PROPOSE | Distribute tasks | Trainman |
| IMPLEMENT | Execute tasks | Trinity + Ants |
| VERIFY_BATCH | Validate batch | Ghost Twins |
| REVIEW | Final review | Ghost Twins |
| HEALTH_REPORT | Metrics + close | Oracle |
| COMPLETE | Run finished | BECCA |

### State Flow

```
P0_INVENTORY (BECCA)
       │
       ▼
   ANALYZE (Oracle)
       │
       ▼
   PROPOSE (Trainman)
       │
       ▼
   IMPLEMENT (Trinity + Ants)
       │
       ├──► HALT ───► Morpheus ───► REATTEMPT
       │                              │
       │                              ▼
       │                       HORSEMEN (if 2nd fail)
       │
       ▼
 VERIFY_BATCH (Ghost Twins)
       │
       ▼
   REVIEW (Ghost Twins)
       │
       ▼
HEALTH_REPORT (Oracle)
       │
       ▼
   COMPLETE (BECCA)
```

### Approval Tokens

| Token | Meaning |
|-------|---------|
| 🔑 APPROVED | Work accepted, proceed |
| 🔑 APPROVED WITH CHANGES | Minor fixes needed |
| 🔑 REJECTED | Work not accepted |
| 🔑 CERTIFIED | Batch passed all gates |

### Batch Closure Corridor (7-Step Quality Gate)

Every batch must pass through this corridor before Oracle handoff:

| Step | Artifact | Producer | Consumer |
|------|----------|----------|----------|
| 1 | Ant Reports (8-part) | Ants | Trinity |
| 2 | Ant Self-Evals | Ants | Ghost |
| 3 | BQ Per-Ant Verifications | Trinity | Ghost |
| 4 | BQ Batch Verification | Trinity | Ghost |
| 5 | Ghost Archive | Ghost | Trinity |
| 6 | Ghost Validation | Ghost | Trinity |
| 7 | Certificate | Trinity | Oracle |

---

## 7. Shared Modules

Every role loads these shared modules:

| Module | Purpose |
|--------|---------|
| IAMBECCA-IDENTITY.md | I AM protocol, chain handoff rules |
| IAMBECCA-ISOLATION.md | ⚫ Tenant isolation doctrine (CRITICAL) |
| IAMBECCA-CHAINS.md | Chain definitions |
| IAMBECCA-RECOVERY.md | Crash recovery protocol |
| IAMBECCA-ERRORS.md | Error categories and BECCA ABORT |
| IAMBECCA-EVIDENCE.md | Evidence contract |
| IAMBECCA-GATES.md | State machine, approval tokens |
| IAMBECCA-OUTPUTS.md | Output format contracts |

### Loading Order (Mandatory)

```
REQUIRED (in order):
├── shared/IAMBECCA-IDENTITY.md   ← "I AM" protocol (FIRST)
├── shared/IAMBECCA-ISOLATION.md  ← ⚫ TENANT ISOLATION (CRITICAL)
├── shared/IAMBECCA-CHAINS.md     ← Chain definitions
├── shared/IAMBECCA-RECOVERY.md   ← Recovery protocol
├── shared/IAMBECCA-ERRORS.md     ← Error escalation
├── shared/IAMBECCA-EVIDENCE.md   ← Evidence requirements
├── shared/IAMBECCA-GATES.md      ← State machine
└── shared/IAMBECCA-OUTPUTS.md    ← Output formats
```

---

## 8. Packet System

### Packet Types

| Kind | When Used | Required Fields |
|------|-----------|-----------------|
| TASK | Normal task assignment | tasks, expected_outputs |
| HALT | Ant cannot proceed | halt_reason, evidence |
| DEBUGGER_REQUEST | Trinity → Morpheus | parent_ant_id, halt_reason |
| REACTIVATE_ANT | After diagnosis → Ant | parent_ant_id, attempt_number, backup_ref |
| HORSEMEN_REQUEST | Failed reattempt → Sentinels | evidence from all prior steps |
| BACKUP_GATE | Before reattempt/horsemen | backup_ref, validation |
| EVALUATION | Any role → BECCA | self_checklist, evidence_links |
| BECCA_REVIEW_REQUEST | Trinity → BECCA | review_scope, evidence_links |

### Packet Naming Convention

```
PKT_<run_id>_<from>_to_<to>_<seq>.md

Examples:
PKT_RUN20260204_001_BQ_to_ANT-CODER_001.md
PKT_RUN20260204_001_ANT-CODER_to_BQ_HALT_001.md
PKT_RUN20260204_001_BQ_to_BECCA_001.md
```

### Packet Routing

| From | To | Destination |
|------|----|-------------|
| BECCA | Oracle | inbox/oracle/ |
| Oracle | Trainman | inbox/distributor/ |
| Trainman | Trinity | inbox/bq/ |
| Trinity | Ants | inbox/ants/ |
| Ants | Trinity | outbox/ants/ |
| Trinity | Morpheus | inbox/debugger/ |
| Morpheus | Trinity | outbox/debugger/ |
| Trinity | Ghost | inbox/ghost/ |
| Ghost | Trinity | outbox/ghost/ |
| Trinity | Sentinels | inbox/horsemen/ |
| Sentinels | Trinity | outbox/horsemen/ |
| Any | BECCA | inbox/becca/ |

### Isolation Context in Packets

Every packet that touches tenant data must include:

```markdown
## ⚫ ISOLATION REQUIREMENTS (from Oracle assessment)

touches_tenant_data: <YES|NO>
isolation_risk: <LOW|MEDIUM|HIGH>
isolation_requirements: <specific requirements | "N/A">
seraph_review_required: <true|false>
```

---

## 9. Evidence Requirements

### Core Evidence Doctrine

**No output is "real" unless evidence exists:**
- File paths
- Diffs (git diff output)
- Command outputs
- Test reports
- Logs
- Screenshots (for UI work)

### Required Fields per Finding

| Field | Required | Description |
|-------|----------|-------------|
| file_path | YES | Actual path (not placeholder) |
| line_number | YES (for code) | Specific line number |
| code_snippet | YES (for code) | Actual code |
| severity | YES | BLOCKER / HIGH / MEDIUM / LOW |
| fix_recommendation | YES | Specific fix (not generic) |
| verification | YES | How to verify the fix |

### Rejected Patterns (Invalid Evidence)

**Placeholder Paths:**
```
/project/root/...
path/to/...
<file_path>
[file_path]
your_project/...
example_/...
```

**Generic Recommendations:**
```
"fix this"
"update this"
"TODO"
"..."
```

### Evidence Validation

| Stage | Who Runs | On Failure |
|-------|----------|------------|
| Ant report submission | Ghost Twins | 🔑 REJECTED |
| Code inspection | Any Agent | 🔑 REJECTED |
| BECCA verification | Source | 🔑 REJECTED |

**Minimum Score:** 70% to pass validation

---

## 10. Error Handling & BECCA ABORT

### Error Categories

| Category | Definition | Action |
|----------|------------|--------|
| RECOVERABLE | Missing minor info | Request info, continue |
| BLOCKER | Missing required input | PAUSE, BECCA ABORT |
| CRITICAL | Security breach, data loss | ABORT immediately |

### BECCA ABORT (Frozen Phrase)

```
BECCA ABORT: <reason>
```

This phrase is **FROZEN**. Do not modify or create variations.

### Abort Response Format

```markdown
## 🛑 BECCA ABORT

**Reason:** <concise reason>
**Error Category:** BLOCKER | CRITICAL
**Error Log:** runtime/runs/<run_id>/errors/ERROR_<timestamp>_<role>.md

**Chain State:**
- chain_id: <chain_id>
- step: <X> of <Y>
- last_completed: <role>

**Recommended Action:**
<what BECCA should do>

---
**Say:** "BECCA activate" to return control to BECCA
```

### Retry Limit

**3 attempts maximum.** After 3 failures:
```
🔑 REJECTED: retry limit exceeded → BECCA ABORT
```

### Error Codes

| Code | Meaning |
|------|---------|
| E001 | Packet validation failed |
| E002 | Identity mismatch |
| E003 | Target mismatch |
| E004 | Chain position mismatch |
| E005 | Evidence file not found |
| E006 | Retry limit exceeded |
| E007 | Security critical finding |
| E008 | State file missing |
| E009 | Wrong role activated |
| E010 | Corrupted packet |

---

## 11. Recovery Protocol

### Recovery Principle

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   DISK IS TRUTH.                                                │
│                                                                 │
│   If chat dies, recover from:                                   │
│   1. runtime/runs/<run_id>/state/                               │
│   2. Most recent baton packet in inbox/                         │
│   3. RUNBOARD.md pointers                                       │
│                                                                 │
│   NEVER guess. ALWAYS read disk state first.                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Recovery Checklist

```
□ 1. Identify run_id (from RUNBOARD.md)
□ 2. Read CURRENT_ROLE.md
□ 3. Read CHAIN_POSITION.md
□ 4. Read LAST_HANDOFF.md
□ 5. Read EXPECTED_NEXT_ROLE.md
□ 6. Open last baton packet
□ 7. Confirm target_name matches
□ 8. Resume by activating expected next role
```

### Task Progress Files

Every Ant MUST create a progress file within 30 seconds:

```
runtime/runs/<run_id>/progress/TASK_<ant_id>_<task_id>.md
```

**Critical Rule:** Mark tasks DONE the INSTANT you finish. Do NOT batch completions.

### Recovery Activation

```
"recovery activate"
```

---

## 12. Directory Structure

```
projects/<client>/<type>/<slug>/
├── inbox/                          ← Incoming packets
│   ├── becca/
│   ├── oracle/
│   ├── distributor/
│   ├── bq/
│   ├── ants/
│   ├── debugger/
│   ├── ghost/
│   ├── horsemen/
│   └── security-audit/
│
├── outbox/                         ← Completed work
│   ├── ants/
│   │   └── ANT_REPORT_ANT-<NNN>.md
│   ├── debugger/
│   │   └── DBG-<parent_ant>-<seq>.md
│   ├── ghost/
│   │   └── ARCHIVE_BATCH-<NNN>.md
│   └── horsemen/
│       └── HORSEMEN_REPORT_<ant>_<seq>.md
│
├── audit/                          ← Quality artifacts
│   ├── evidence/
│   │   ├── P0_INVENTORY_*.txt
│   │   └── INDEX_BATCH-<NNN>.md
│   ├── reviews/
│   │   ├── BQ_VERIFY_ANT-<NNN>.md
│   │   ├── BQ_VERIFY_BATCH-<NNN>.md
│   │   └── CERT_BATCH-<NNN>_PASS.md
│   ├── self_evals/
│   │   └── SE_ANT-<NNN>.md
│   ├── becca_verifications/
│   │   └── BV_<ANT-ID>.md
│   ├── becca_scores/
│   │   └── BS_<ANT-ID>.md
│   ├── health_reports/
│   │   └── HEALTH_<run_id>.md
│   └── debugger_addendums/
│       └── DBG-<seq>.md
│
└── runtime/                        ← Run state
    └── runs/<run_id>/
        ├── RUNBOARD.md             ← Run state tracking
        ├── RUN_LOCK.json           ← Concurrency lock
        ├── BACKUP_GATE_<NNN>.md    ← Backup checkpoints
        ├── FINAL_STATUS.md         ← Completion status
        ├── state/
        │   ├── CURRENT_ROLE.md
        │   ├── CHAIN_POSITION.md
        │   ├── LAST_HANDOFF.md
        │   └── EXPECTED_NEXT_ROLE.md
        ├── progress/
        │   └── TASK_<ant>_<task>.md
        └── errors/
            └── ERROR_<timestamp>_<role>.md
```

---

## 13. Templates

All templates are stored in `templates/`:

| Template | Purpose |
|----------|---------|
| BATON_PACKET.template.md | Chain handoff packet |
| packet.task.md | Task assignment |
| packet.becca_review.md | BECCA review request |
| task_progress.md | Ant progress tracking |

### Task Progress Template (Key Fields)

```markdown
# TASK PROGRESS: <task_id>

ant_id: ANT-<NNN>
task_id: <task_id>
run_id: <run_id>
status: <STARTING|IN_PROGRESS|BLOCKED|HALTED|COMPLETED>

---

## QUICK RESUME (read this after crash)

**WHAT I WAS DOING:** <1 sentence>
**NEXT ACTION:** <exactly what to do next>
**BLOCKERS:** <none | description>

---

## CHECKPOINT LOG (append-only)

| Time | Phase | Action | Result | Next |
|------|-------|--------|--------|------|

---

## ⚫ ISOLATION CHECK (if task touches tenant data)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Queries tenant-scoped | ✅/❌/N/A | <file:line> |
| useAuth() used (not props) | ✅/❌/N/A | <file:line> |
| tenantId field preserved | ✅/❌/N/A | <evidence> |
| No cross-tenant access | ✅/❌/N/A | <evidence> |

isolation_verified: <true|false|N/A>
```

---

## 14. Quick Reference

### Role-Specific Isolation Duties

| Role | Code | Isolation Duty |
|------|------|----------------|
| Neo | IM-05 | Tenant Boundary Statement in ALL reports |
| Morpheus | IM-06 | Detect isolation bugs → BECCA ABORT |
| Tank | IM-07 | Write isolation tests |
| Seraph | IM-08 | 6-point verification checklist |
| Link | IM-09 | tenantId FIRST in schemas/indexes |
| Niobe | IM-10 | useAuth() for data fetching, no tenant authority from props |
| Apoc | IM-11 | Every query scoped |
| Ghost Twins | IM-12 | Isolation Review Gate |
| Sentinels | IM-13 | Isolation breaches = escalation blocker (FAIL_HALT) |

### Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ⚫ IAMBECCA QUICK REFERENCE                                               │
│                                                                             │
│   IDENTITY: Always assert I_AM_STATE + role at activation                   │
│                                                                             │
│   ISOLATION:                                                                │
│   • QUERY:     ALWAYS .where('tenantId', '==', tenantId)                    │
│   • COMPONENT: ALWAYS useAuth(), NEVER props.wsId                           │
│   • SERVER:    ALWAYS context.auth.token.tenantId, NEVER request.body       │
│   • RULES:     ALWAYS check tenantId on EVERY path                          │
│                                                                             │
│   EVIDENCE:                                                                 │
│   • Real paths (no placeholders)                                            │
│   • Specific recommendations (no "fix this")                                │
│   • Score >= 70% to pass                                                    │
│                                                                             │
│   ERRORS:                                                                   │
│   • RECOVERABLE → Handle locally                                            │
│   • BLOCKER → PAUSE + BECCA ABORT                                           │
│   • CRITICAL → HALT + BECCA ABORT                                           │
│                                                                             │
│   RECOVERY:                                                                 │
│   • "recovery activate" to restore from disk                                │
│   • Disk is truth, never guess                                              │
│                                                                             │
│   APPROVAL TOKENS:                                                          │
│   • 🔑 APPROVED → Proceed                                                   │
│   • 🔑 REJECTED → Do not proceed                                            │
│   • 🔑 CERTIFIED → Batch complete                                           │
│                                                                             │
│   IF UNSURE: Ask Seraph (IM-08)                                             │
│   IF BREACH: BECCA ABORT immediately                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.1] 2026-02-04 — Advisor Review Patches
- **Patch #1:** Added IM-13 Sentinels (HORSEMEN) role file
  - Unified role for escalation when Ant+Debugger lane fails
  - Advisory-only doctrine (no code edits)
  - 7 prerequisites before activation
  - HORSEMEN_REPORT output contract
- **Patch #2:** Froze canonical tenant key (tenantId) in IAMBECCA-ISOLATION.md
  - `tenantId` = CANONICAL for storage/DB/rules/API
  - `wsId` = UI ALIAS for frontend context only
  - `businessId` = SECONDARY for business entities within tenant scope
- **Patch #3:** Refined component isolation rule in Niobe (IM-10)
  - Clarified: MAY pass tenant-scoped DATA OBJECTS via props (display only)
  - BANNED: Using props.wsId/tenantId as AUTHORITY for data fetching
  - Updated checklist and code patterns
- **Patch #4:** Fixed packet routing + baton doctrine in IAMBECCA-OUTPUTS.md
  - Clarified TWO ARTIFACTS REQUIRED when Ant completes
  - Output Report (outbox) + Baton Packet (inbox) separation
  - Added baton packet template
- **Patch #5:** Renamed chains to eliminate collisions
  - CHAIN_CORE_EXEC = Oracle → Trainman → Trinity → Ghost → Oracle → BECCA
  - CHAIN_PM = Prompt improvement pipeline (PM-00 through PM-05)
  - CHAIN_WORKER_BATCH = Trinity → Ants → Trinity → Ghost → Trinity (certificate)
- **Patch #6:** Added Evidence Scoring Rubric in IAMBECCA-EVIDENCE.md
  - 100-point scoring system (Path Validity, Specificity, Completeness, Verification, No Placeholders)
  - Score thresholds: EXCELLENT (90+), PASS (70-89), MARGINAL (50-69), FAIL (<50)
  - BECCA Score Integration rubric for Neo/high-risk tasks
- **Patch #7:** Added Recovery procedure (RECOVERY_GATE) to BECCA (IM-01)
  - Formal state for disaster recovery
  - Resume/Rollback/Reset options
  - Recovery output contract
- **Patch #8:** Verified Namespace + Runtime State requirements (already in IAMBECCA-GATES.md Section 11)
- **Patch #9:** Verified Link role code (ANT-INFRA is intentional expansion from ANT-FIREBASE)
- **Patch #10:** Verified Selective BECCA Review + Scoring (already in IAMBECCA-OUTPUTS.md sections 2.4.3.1-2)

### [1.0.0] 2026-02-04
- Initial comprehensive manual
- Documented all 30 roles across 5 chains
- Documented tenant isolation doctrine
- Documented state machine and approval tokens
- Documented batch closure corridor
- Documented packet system
- Documented evidence requirements
- Documented error handling and BECCA ABORT
- Documented recovery protocol
- Documented directory structure
- Documented templates
- Added quick reference card
