# BECCA-REF-HORSEMEN v2.0.0
## Five Horsemen Audit Protocol — Complete Reference

**Version:** 2.0.0
**Date:** 2026-02-04
**Source:** Chat-based HM chain (replaces API-based H1-H5)

---

## The Five Horsemen (Who They Are)

| # | Horseman | Code | Role | Motto | File |
|---|----------|------|------|-------|------|
| 1 | HALLUCINATION | HM-01 | The Lie Detector | "No proof, no truth." | `roles/horsemen/HM-01_HALLUCINATION.md` |
| 2 | AMNESIA | HM-02 | The Historian | "Those who forget history..." | `roles/horsemen/HM-02_AMNESIA.md` |
| 3 | DRIFT | HM-03 | The Boundary Guard | "One task, one footprint." | `roles/horsemen/HM-03_DRIFT.md` |
| 4 | PRIVILEGE | HM-04 | The Gatekeeper | "No key, no entry." | `roles/horsemen/HM-04_PRIVILEGE.md` |
| 5 | SILENT_FAILURE | HM-05 | The Judge | "If it fails silently..." | `roles/horsemen/HM-05_SILENT_FAILURE.md` |

---

## What Each Horseman Investigates

| Horseman | What It Catches | How It Catches It |
|----------|-----------------|-------------------|
| **HM-01 (Hallucination)** | Unproven claims, missing evidence | Check every claim has commit hash, test output, screenshot |
| **HM-02 (Amnesia)** | Forgotten context, broken prior work | Check D0 Ghost Index, pheromone respect, prior work preserved |
| **HM-03 (Drift)** | Scope creep, extra changes | Compare footprint plan to actual changes made |
| **HM-04 (Privilege)** | Missing approvals, unauthorized actions | Verify PATCH APPROVED token, danger surface approvals |
| **HM-05 (Silent Failure)** | Hidden bugs, passing but bad tests | Cross-reference all findings, verify tests actually test the fix |

---

## Horsemen Execution Flow (Chat-Based)

```
┌─────────────────────────────────────────────────────────────────┐
│               HORSEMEN EXECUTION FLOW v2.0.0                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  BECCA (IM-01) — CEO decides to audit                           │
│     │                                                           │
│     │ Creates AUDIT_REQUEST                                     │
│     │ Saves to inbox/horsemen/                                  │
│     ▼                                                           │
│  ┌─────────────────────────────────────────────┐                │
│  │ HM-01 HALLUCINATION                         │                │
│  │ "hallucination activate"                    │                │
│  │ Adds: HALLUCINATION_FINDINGS                │                │
│  └─────────────────┬───────────────────────────┘                │
│                    │                                            │
│                    ▼                                            │
│  ┌─────────────────────────────────────────────┐                │
│  │ HM-02 AMNESIA                               │                │
│  │ "amnesia activate"                          │                │
│  │ Adds: AMNESIA_FINDINGS                      │                │
│  └─────────────────┬───────────────────────────┘                │
│                    │                                            │
│                    ▼                                            │
│  ┌─────────────────────────────────────────────┐                │
│  │ HM-03 DRIFT                                 │                │
│  │ "drift activate"                            │                │
│  │ Adds: DRIFT_FINDINGS                        │                │
│  └─────────────────┬───────────────────────────┘                │
│                    │                                            │
│                    ▼                                            │
│  ┌─────────────────────────────────────────────┐                │
│  │ HM-04 PRIVILEGE                             │                │
│  │ "privilege activate"                        │                │
│  │ Adds: PRIVILEGE_FINDINGS                    │                │
│  └─────────────────┬───────────────────────────┘                │
│                    │                                            │
│                    ▼                                            │
│  ┌─────────────────────────────────────────────┐                │
│  │ HM-05 SILENT_FAILURE (The Judge)            │                │
│  │ "silent failure activate"                   │                │
│  │ Creates: VERDICT_PACKET                     │                │
│  └─────────────────┬───────────────────────────┘                │
│                    │                                            │
│                    ▼                                            │
│  BECCA (IM-01) — Receives VERDICT_PACKET                        │
│     │                                                           │
│     ├── ✅ CLEARED — All 5 defeated, accept work                │
│     ├── ⚠️ CONTAMINATED — Minor issues, accept with notes       │
│     └── 🛑 STOP — Critical failure, reject work                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Verdicts (What They Mean)

| Verdict | Meaning | Action |
|---------|---------|--------|
| ✅ **CLEARED** | All 5 Horsemen defeated with evidence | Accept work, merge/deploy allowed |
| ⚠️ **CONTAMINATED** | Minor issues found, risk acknowledged | Accept with notes, monitor closely |
| 🛑 **STOP** | One or more Horsemen failed critically | Reject work, Ant must fix and resubmit |

---

## How to Activate the Chain

### Step 1: BECCA creates AUDIT_REQUEST
```
In BECCA chat: "Audit ANT-006 report"

BECCA creates: inbox/horsemen/AUDIT_REQUEST_<id>.md
BECCA says: "Route to HM-01 (hallucination activate)"
```

### Step 2: Run each Horseman (separate chats)
```
Chat 1: "hallucination activate" → reads packet, adds findings
Chat 2: "amnesia activate" → reads packet, adds findings
Chat 3: "drift activate" → reads packet, adds findings
Chat 4: "privilege activate" → reads packet, adds findings
Chat 5: "silent failure activate" → creates VERDICT_PACKET
```

### Step 3: BECCA receives verdict
```
In BECCA chat: "Check horsemen verdict"

BECCA reads: outbox/horsemen/VERDICT_PACKET_<id>.md
BECCA delivers final decision
```

---

## File Locations

| Item | Path |
|------|------|
| HM-01 Role | `roles/horsemen/HM-01_HALLUCINATION.md` |
| HM-02 Role | `roles/horsemen/HM-02_AMNESIA.md` |
| HM-03 Role | `roles/horsemen/HM-03_DRIFT.md` |
| HM-04 Role | `roles/horsemen/HM-04_PRIVILEGE.md` |
| HM-05 Role | `roles/horsemen/HM-05_SILENT_FAILURE.md` |
| AUDIT_REQUEST Template | `templates/AUDIT_REQUEST.md` |
| Inbox | `inbox/horsemen/` |
| Outbox | `outbox/horsemen/` |

---

## Key Differences from v1.0.0

| Aspect | v1.0.0 (Old) | v2.0.0 (New) |
|--------|--------------|--------------|
| Codes | H1-H5 | HM-01 to HM-05 |
| Execution | API-based (5 different APIs) | Chat-based (separate sessions) |
| Orchestrator | Sentinels (IM-13) | BECCA (IM-01) |
| Cost | 5 API calls per audit | 0 API costs (chat only) |
| Complexity | Python automation required | Simple chat activation |

---

## NOTE: Separate from Main Workflow

The Horsemen chain is **SEPARATE** from Oracle/Trinity/Ant workflow.

- Main workflow: BECCA → Oracle → Trainman → Trinity → Ants → Ghost
- Horsemen: BECCA → HM-01 → HM-02 → HM-03 → HM-04 → HM-05 → BECCA

BECCA calls the Horsemen when she needs to audit completed Ant work.

---

## Changelog

### [2.0.0] 2026-02-04
- **BREAKING:** Converted from API-based H1-H5 to chat-based HM-01 to HM-05
- **BREAKING:** Removed Sentinels (IM-13) as orchestrator — BECCA now orchestrates
- Added: Chat activation commands for each Horseman
- Added: AUDIT_REQUEST template reference
- Added: File locations table
- Updated: Execution flow diagram for chat-based chain

### [1.0.0] 2026-01-30
- Initial release (API-based, now deprecated)
