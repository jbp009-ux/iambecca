# TRINITY-REF-INDEX v1.0.0
## Reference Module Router for Trinity (BQ)

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Index for Trinity reference modules (load on demand)

---

## How This Works

Reference modules contain the **full checklists** — detailed gate enforcement, budget rules, deploy safety, and violation codes. They are NOT loaded by default. They are loaded only when Trinity needs detailed reference material.

**Why separate?** IM-03 (Trinity driver) is lean (~350 lines). Loading 800+ lines of gate checklists for a simple task wastes context. Load refs only when needed.

---

## How to Load

Say or type:
```
LOAD: TRINITY-REF-{NAME}
```

Then read the corresponding file from `ref/trinity/{name}/TRINITY-REF-{NAME}_v{X.Y.Z}.md`.

---

## Available Reference Modules

| Module | Folder | File | What It Contains |
|--------|--------|------|------------------|
| **GATE-ENFORCEMENT** | `gate-enforcement/` | `TRINITY-REF-GATE-ENFORCEMENT_v1.0.0.md` | Full gate checklists (D0, D1, D2, D3, D4), gate progression rules |
| **EVIDENCE-BUDGET** | `evidence-budget/` | `TRINITY-REF-EVIDENCE-BUDGET_v1.0.0.md` | Anti-drowning caps, Budget Ledger format, SNAPSHOT format, math rules |
| **DEPLOY-PUSH** | `deploy-push/` | `TRINITY-REF-DEPLOY-PUSH_v1.0.0.md` | Deploy checklist (7 items), push checklist, Untracked Audit steps |
| **MULTI-TENANT** | `multi-tenant/` | `TRINITY-REF-MULTI-TENANT_v1.0.0.md` | Tenant critical surfaces, pheromone verification, test gate |
| **VIOLATION-CODES** | `violation-codes/` | `TRINITY-REF-VIOLATION-CODES_v1.0.0.md` | All 15 BQ_VIOLATION_* codes with meanings |

---

## When to Load Each Module

| Situation | Load This |
|-----------|-----------|
| "Full gate checklist for D1" | `ref/trinity/gate-enforcement/` |
| "Budget Ledger format" | `ref/trinity/evidence-budget/` |
| "Ant wants to deploy" | `ref/trinity/deploy-push/` |
| "Touched tenant code" | `ref/trinity/multi-tenant/` |
| "What's this violation code?" | `ref/trinity/violation-codes/` |

---

## Folder Structure

```
ref/trinity/
├── TRINITY-REF-INDEX.md              ← This file (router)
│
├── gate-enforcement/
│   └── TRINITY-REF-GATE-ENFORCEMENT_v1.0.0.md
│
├── evidence-budget/
│   └── TRINITY-REF-EVIDENCE-BUDGET_v1.0.0.md
│
├── deploy-push/
│   └── TRINITY-REF-DEPLOY-PUSH_v1.0.0.md
│
├── multi-tenant/
│   └── TRINITY-REF-MULTI-TENANT_v1.0.0.md
│
└── violation-codes/
    └── TRINITY-REF-VIOLATION-CODES_v1.0.0.md
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  TRINITY-REF-INDEX v1.0.0 — REFERENCE MODULE ROUTER             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LOAD: TRINITY-REF-{NAME}                                       │
│                                                                 │
│  TRINITY REFS:                                                  │
│  • GATE-ENFORCEMENT  — Full gate checklists (D0-D4)             │
│  • EVIDENCE-BUDGET   — Anti-drowning caps, ledger format        │
│  • DEPLOY-PUSH       — Deploy/push safety checklists            │
│  • MULTI-TENANT      — Tenant isolation enforcement             │
│  • VIOLATION-CODES   — All BQ_VIOLATION_* codes                 │
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
- Source: BABY_QUEEN_VSCODE_v1.0.6 (manual mode)
