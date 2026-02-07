# TRINITY-REF-VIOLATION-CODES v1.0.0
## BQ Enforcement Violation Codes

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Complete list of violation codes for Trinity (BQ) enforcement
**Source:** BABY_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Need to reject Ant work with specific code
- Looking up violation code meanings
- Documenting enforcement actions

Say: `LOAD: TRINITY-REF-VIOLATION-CODES`

---

## Protocol Violation Codes

| Code | Meaning |
|------|---------|
| `BQ_VIOLATION_PREFIX` | Wrong state prefix for role (BQ vs Ant) |
| `BQ_VIOLATION_TOKEN_DRIFT` | Token not exact match (e.g., combined files/lines) |
| `BQ_VIOLATION_BUDGET` | Budget exceeded or ledger/SNAPSHOT missing |
| `BQ_VIOLATION_LEDGER_UNBOUND` | Ledger cites files not used as evidence |
| `BQ_VIOLATION_DEPLOY_PROOF` | Deploy checklist evidence incomplete |
| `BQ_VIOLATION_PUSH_PROOF` | Push checklist evidence incomplete |
| `BQ_VIOLATION_CRITICAL_SURFACE` | Attempted critical surface without escalation |
| `BQ_VIOLATION_D0_SKIPPED` | Ant skipped Ghost Index Pre-Discovery |

---

## Gate Progression Violation Codes

| Code | Meaning |
|------|---------|
| `BQ_VIOLATION_GATE_SKIP` | Ant combined multiple gates or skipped gates |
| `BQ_VIOLATION_TOKEN_FABRICATION` | Ant cited token that was never issued |
| `BQ_VIOLATION_STOP_CONTINUED` | Ant acknowledged STOP condition but continued |

---

## Tenant Violation Codes

| Code | Meaning |
|------|---------|
| `BQ_VIOLATION_TENANT_LEAK` | Ant removed tenant filter — potential cross-tenant data leak |
| `BQ_VIOLATION_TENANT_NO_PHEROMONE` | Ant touched tenant code without emitting required pheromone |
| `BQ_VIOLATION_TENANT_NO_TEST` | Deploy to tenant surface without isolation test |
| `BQ_VIOLATION_TENANT_TEST_FAIL` | Tenant isolation test failed — cannot deploy |

---

## Usage Format

Reject with code + one-line fix required. Example:

```
BQ_VIOLATION_BUDGET — Budget Ledger missing. Resubmit D1 with ledger + SNAPSHOT.
```

```
BQ_VIOLATION_GATE_SKIP — Combined INTAKE and D1 in one message. Separate into two messages.
```

```
BQ_VIOLATION_TENANT_LEAK — Removed tenantId filter from query. Restore the filter.
```

---

## Complete Code Table

| Code | Category | Severity |
|------|----------|----------|
| `BQ_VIOLATION_PREFIX` | Protocol | High |
| `BQ_VIOLATION_TOKEN_DRIFT` | Protocol | High |
| `BQ_VIOLATION_BUDGET` | Evidence | High |
| `BQ_VIOLATION_LEDGER_UNBOUND` | Evidence | Medium |
| `BQ_VIOLATION_DEPLOY_PROOF` | Deploy | High |
| `BQ_VIOLATION_PUSH_PROOF` | Deploy | High |
| `BQ_VIOLATION_CRITICAL_SURFACE` | Security | Critical |
| `BQ_VIOLATION_D0_SKIPPED` | Gate | High |
| `BQ_VIOLATION_GATE_SKIP` | Gate | High |
| `BQ_VIOLATION_TOKEN_FABRICATION` | Gate | Critical |
| `BQ_VIOLATION_STOP_CONTINUED` | Gate | Critical |
| `BQ_VIOLATION_TENANT_LEAK` | Tenant | Critical |
| `BQ_VIOLATION_TENANT_NO_PHEROMONE` | Tenant | High |
| `BQ_VIOLATION_TENANT_NO_TEST` | Tenant | High |
| `BQ_VIOLATION_TENANT_TEST_FAIL` | Tenant | High |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  TRINITY-REF-VIOLATION-CODES v1.0.0                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PROTOCOL:                                                      │
│  • BQ_VIOLATION_PREFIX                                          │
│  • BQ_VIOLATION_TOKEN_DRIFT                                     │
│  • BQ_VIOLATION_BUDGET                                          │
│  • BQ_VIOLATION_LEDGER_UNBOUND                                  │
│  • BQ_VIOLATION_DEPLOY_PROOF                                    │
│  • BQ_VIOLATION_PUSH_PROOF                                      │
│  • BQ_VIOLATION_CRITICAL_SURFACE                                │
│  • BQ_VIOLATION_D0_SKIPPED                                      │
│                                                                 │
│  GATE PROGRESSION:                                              │
│  • BQ_VIOLATION_GATE_SKIP                                       │
│  • BQ_VIOLATION_TOKEN_FABRICATION                               │
│  • BQ_VIOLATION_STOP_CONTINUED                                  │
│                                                                 │
│  TENANT:                                                        │
│  • BQ_VIOLATION_TENANT_LEAK                                     │
│  • BQ_VIOLATION_TENANT_NO_PHEROMONE                             │
│  • BQ_VIOLATION_TENANT_NO_TEST                                  │
│  • BQ_VIOLATION_TENANT_TEST_FAIL                                │
│                                                                 │
│  USAGE: {CODE} — {one-line description}. {fix required}.        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from BABY_QUEEN_VSCODE_v1.0.6
- 15 violation codes documented
