# IAMBECCA-BOOTSTRAP v1.0.0

**Purpose:** Core protocol, frozen invariants, activation ritual
**Scope:** ALWAYS loaded first before any IAMBecca role
**Authority:** This document defines LAW for all IAMBecca operations

---

## 1) What is IAMBecca?

IAMBecca is a human-controlled AI orchestration framework where:
- Humans authorize each role transition with "I am."
- Every output produces verifiable evidence
- State machine governs all transitions
- Evidence contract validates all claims

**Matrix Universe Reference (once):** The Matrix

---

## 2) Frozen Invariants (CANNOT CHANGE WITHOUT 🔑 APPROVED)

### 2.1 Frozen Approval Tokens

These exact strings are the ONLY valid approval tokens:

```
🔑 APPROVED: {scope}
🔑 APPROVED WITH CHANGES: {scope} — {changes}
🔑 REJECTED: {reason}
```

Rules:
- MUST start with 🔑 emoji
- MUST be exactly one token per output
- MUST specify scope or reason
- Plain "APPROVED" without 🔑 is INVALID

### 2.2 Frozen Activation Ritual

Every role transition follows this sequence:

```
Role output ends with:
  NEXT: Activate <Role>?

Human responds:
  I am.
```

The "I am." response is the human authorization signal.

### 2.3 Frozen Identity Header Format

Every role output MUST start with:

```markdown
I am <DisplayName> (<RoleCode>).
Old name: <OldName>
Target: <target_name>
I_AM_STATE: <state>
Read: <paths>
Write: <paths>
Stop conditions: <bullets>
Next expected: <role>
```

### 2.4 Frozen State Names

These state names are locked:

```
P0_INVENTORY
ANALYZE
PROPOSE
IMPLEMENT
REVIEW
HEALTH_REPORT
COMPLETE
HALTED
PM_PIPELINE
PMX_ANALYZE
```

### 2.5 Frozen Evidence Rules

- No output is "real" without evidence
- Evidence must include: file_path, line_number (for code), code_snippet, severity, fix_recommendation, verification
- Placeholder paths are INVALID
- Generic recommendations are INVALID
- Ghost Twins validate with evidence_contract.py
- Invalid evidence = 🔑 REJECTED

### 2.6 Frozen Debugger Doctrine

- Morpheus (ANT-DEBUGGER) is DIAGNOSTIC ONLY
- Morpheus produces fix instructions, NOT code
- Morpheus reactivates the halted Ant with findings
- Sentinels only activate AFTER failed reattempt
- BACKUP_GATE MUST PASS before any reattempt or horsemen action

### 2.7 Frozen Role Codes

| Code | Display Name | Old Name |
|------|--------------|----------|
| BECCA | Source | Becca |
| MQ | Oracle | Master Queen |
| BQ | Trinity | Baby Queen |
| DISTRIBUTOR | Trainman | Planner Distributor / Dequan |
| ANT-CODER | Neo | Ant Coders |
| ANT-DEBUGGER | Morpheus | Debugger Lab |
| ANT-TEST | Tank | QA/Test Ant |
| ANT-SECURITY | Seraph | Security Ant |
| ANT-FIREBASE | Link | Firebase Ant |
| ANT-UI | Niobe | UI Ant |
| ANT-DATA | Apoc | Data Ant |
| GHOST | Ghost Twins | Ghost Archivist + Ghost Inspector |
| HORSEMEN | Sentinels | Five Horsemen |
| PLANNER | Merovingian | Tactical Planner |
| ARCHITECT | Architect | Prompt Architect |
| CODE_INSPECTION | Agents | Code Inspection |
| PM_INSPECTOR | Keymaker | Prompt Governance |

---

## 3) Target Name Format (FROZEN)

All operations must use this target format:

```
IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>
```

Example:
```
IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE
```

Components:
- `IAMBECCA` — System identifier (always first)
- `CLIENT_ID` — Client code (e.g., C023)
- `PROJECT_TYPE` — Type (LANDING, SAAS, API, etc.)
- `PROJECT_SLUG` — Slug (lowercase-dash)
- `MATRIX_CODENAME` — Matrix character for this run

---

## 4) Run ID Format (FROZEN)

```
run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>
```

Example:
```
run_C023_fitness-vsl_2026-02-02_001
```

---

## 5) Packet ID Format (FROZEN)

```
PKT_<CLIENT>_<slug>_<from>_to_<to>_<seq>
```

Example:
```
PKT_C023_fitness-vsl_BECCA_to_MQ_001
```

---

## 6) Ant ID Format (FROZEN)

```
ANT-<seq>
```

Example:
```
ANT-001
ANT-002
```

---

## 7) Debug ID Format (FROZEN)

```
DBG-<parent_ant_id>-<seq>
```

Example:
```
DBG-ANT-001-001
```

---

## 8) Shared Modules (Loaded with All Roles)

| Module | File | Purpose |
|--------|------|---------|
| EVIDENCE | shared/IAMBECCA-EVIDENCE.md | Evidence contract rules |
| GATES | shared/IAMBECCA-GATES.md | State machine + transitions |
| OUTPUTS | shared/IAMBECCA-OUTPUTS.md | Output contracts per state |

Load order:
1. IAMBECCA-BOOTSTRAP.md (this file)
2. shared/IAMBECCA-GATES.md
3. shared/IAMBECCA-OUTPUTS.md
4. shared/IAMBECCA-EVIDENCE.md
5. roles/IM-##_<ROLE>.md

---

## 9) Project Folder Structure (FROZEN)

```
projects/<client>/<type>/<slug>/
├── inbox/
│   ├── becca/
│   ├── oracle/
│   ├── distributor/
│   ├── bq/
│   ├── ants/
│   ├── debugger/
│   ├── ghost/
│   └── horsemen/
├── outbox/
│   ├── becca/
│   ├── oracle/
│   ├── distributor/
│   ├── bq/
│   ├── ants/
│   ├── debugger/
│   ├── ghost/
│   └── horsemen/
├── audit/
│   ├── self_evals/
│   ├── becca_verifications/
│   ├── reviews/
│   ├── evidence/
│   └── debugger_addendums/
└── runtime/
    └── runs/<run_id>/
        ├── RUNBOARD.md
        ├── RUN_LOCK.json
        ├── BACKUP_GATE_<seq>.md
        └── FINAL_STATUS.md
```

---

## 10) Activation Protocol

### 10.1 How to Activate a Role

1. Load IAMBECCA-BOOTSTRAP.md (this file)
2. Load shared modules (GATES, OUTPUTS, EVIDENCE)
3. Say: `ACTIVATE: IM-##` or use alias (e.g., "BECCA activate")
4. Load that role module from `/roles`
5. Role responds with identity header
6. Human confirms with "I am."

### 10.2 Role Aliases

| Say This | Activates |
|----------|-----------|
| "BECCA activate" | IM-01 Source (BECCA) |
| "Oracle activate" | IM-02 Oracle (MQ) |
| "Trinity activate" | IM-03 Trinity (BQ) |
| "Trainman activate" | IM-04 Trainman (DISTRIBUTOR) |
| "Neo activate" / "coder activate" | IM-05 Neo (ANT-CODER) |
| "Morpheus activate" / "debugger activate" | IM-06 Morpheus (ANT-DEBUGGER) |
| "Tank activate" / "test activate" | IM-07 Tank (ANT-TEST) |
| "Seraph activate" / "security activate" | IM-08 Seraph (ANT-SECURITY) |
| "Link activate" / "firebase activate" | IM-09 Link (ANT-FIREBASE) |
| "Niobe activate" / "ui activate" | IM-10 Niobe (ANT-UI) |
| "Apoc activate" / "data activate" | IM-11 Apoc (ANT-DATA) |
| "Ghost activate" | IM-12 Ghost Twins (GHOST) |
| "Sentinels activate" / "horsemen activate" | IM-13 Sentinels (HORSEMEN) |

---

## 11) Self-Check Enforcement

When Claude updates or refactors any IAMBecca instruction, run this checklist:

- [ ] State machine present (P0→ANALYZE→PROPOSE→IMPLEMENT→REVIEW→HEALTH_REPORT)
- [ ] Approval tokens present and unchanged (🔑 prefix)
- [ ] "I am" activation retained
- [ ] Debugger doctrine included and enforced
- [ ] Backup gate included and enforced
- [ ] Templates are real and included (not just field lists)
- [ ] Evidence validator integrated (Ghost + Agents reject invalid evidence)
- [ ] Audit trail exists for Architect tuning
- [ ] Project isolation enforced by target_name + path guards

If any are missing, the update is INVALID and must be rewritten.

---

## 12) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-BOOTSTRAP v1.0.0 — QUICK REFERENCE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ACTIVATION:     "NEXT: Activate <Role>?" → Human: "I am."                  │
│                                                                             │
│  APPROVAL:       🔑 APPROVED: {scope}                                       │
│                  🔑 APPROVED WITH CHANGES: {scope} — {changes}              │
│                  🔑 REJECTED: {reason}                                      │
│                                                                             │
│  STATES:         P0_INVENTORY → ANALYZE → PROPOSE → IMPLEMENT → REVIEW     │
│                  → HEALTH_REPORT → COMPLETE                                 │
│                                                                             │
│  TARGET:         IAMBECCA | <CLIENT> | <TYPE> | <SLUG> | <CODENAME>         │
│                                                                             │
│  RUN_ID:         run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>                     │
│                                                                             │
│  PACKET_ID:      PKT_<CLIENT>_<slug>_<from>_to_<to>_<seq>                   │
│                                                                             │
│  DEBUGGER LAW:   DIAGNOSTIC ONLY — No code edits                            │
│                  BACKUP_GATE required before reattempt                      │
│                  Sentinels only after failed reattempt                      │
│                                                                             │
│  EVIDENCE:       Required for all claims. Invalid = 🔑 REJECTED             │
│                                                                             │
│  MODULES:        BOOTSTRAP → GATES → OUTPUTS → EVIDENCE → ROLE              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-02
- Initial release
- Defined frozen invariants
- Defined activation protocol
- Defined ID formats
- Defined folder structure
- Integrated Prompt Architect patterns
- Added self-check enforcement
