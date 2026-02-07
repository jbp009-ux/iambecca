# ORACLE-REF-INDEX v1.0.0
## Reference Module Router for Oracle (MQ)

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Index for Oracle reference modules (load on demand)

---

## How This Works

Reference modules contain the **full workflows** — detailed checklists, templates, and protocols. They are NOT loaded by default. They are loaded only when Oracle needs detailed reference material.

**Why separate?** IM-02 (Oracle driver) is lean (~250 lines). Loading 500+ lines of inspection checklists for a simple planning task wastes context. Load refs only when needed.

---

## How to Load

Say or type:
```
LOAD: ORACLE-REF-{NAME}
```

Then read the corresponding file from `ref/oracle/{name}/ORACLE-REF-{NAME}_v{X.Y.Z}.md`.

---

## Available Reference Modules

| Module | Folder | File | What It Contains |
|--------|--------|------|------------------|
| **INSPECTION-MODE** | `inspection-mode/` | `ORACLE-REF-INSPECTION-MODE_v1.0.0.md` | Full inspection checklist, protocol enforcement, ant type risk profiles |
| **ALIGNMENT-GATE** | `alignment-gate/` | `ORACLE-REF-ALIGNMENT-GATE_v1.0.0.md` | Pre-BQ alignment verification, deliverables check, dependency chain, drift detection |
| **SESSION-STATE** | `session-state/` | `ORACLE-REF-SESSION-STATE_v1.0.0.md` | Session state format, Trinity tracker, session limits, handoff workflow |
| **DEVTOOLS** | `devtools/` | `ORACLE-REF-DEVTOOLS_v1.0.0.md` | Chrome DevTools F12 verification, ant card structure, Queen checkbox workflow |
| **PROTOCOL** | `protocol/` | `ORACLE-REF-PROTOCOL_v1.0.0.md` | Lawbook, critical surfaces, nuclear surfaces, approval tokens |

---

## When to Load Each Module

| Situation | Load This |
|-----------|-----------|
| "Run inspection on BQ batch" | `ref/oracle/inspection-mode/` |
| "Check alignment before next BQ" | `ref/oracle/alignment-gate/` |
| "How to track session state?" | `ref/oracle/session-state/` |
| "Verify work in app UI" | `ref/oracle/devtools/` |
| "What surfaces are critical?" | `ref/oracle/protocol/` |
| "Can I override this?" | `ref/oracle/protocol/` |

---

## Folder Structure

```
ref/oracle/
├── ORACLE-REF-INDEX.md              ← This file (router)
│
├── inspection-mode/
│   └── ORACLE-REF-INSPECTION-MODE_v1.0.0.md
│
├── alignment-gate/
│   └── ORACLE-REF-ALIGNMENT-GATE_v1.0.0.md
│
├── session-state/
│   └── ORACLE-REF-SESSION-STATE_v1.0.0.md
│
├── devtools/
│   └── ORACLE-REF-DEVTOOLS_v1.0.0.md
│
└── protocol/
    └── ORACLE-REF-PROTOCOL_v1.0.0.md
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  ORACLE-REF-INDEX v1.0.0 — REFERENCE MODULE ROUTER              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LOAD: ORACLE-REF-{NAME}                                        │
│                                                                 │
│  ORACLE REFS:                                                   │
│  • INSPECTION-MODE  — Full inspection checklist                 │
│  • ALIGNMENT-GATE   — Pre-BQ alignment verification             │
│  • SESSION-STATE    — Session tracking format                   │
│  • DEVTOOLS         — F12 verification workflow                 │
│  • PROTOCOL         — Lawbook, critical/nuclear surfaces        │
│                                                                 │
│  VERSIONED: Each in its own folder with _vX.Y.Z.md suffix       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- 5 reference modules indexed
- Source: MASTER_QUEEN_VSCODE_v1.0.6 (manual mode)
