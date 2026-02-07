# ORACLE-REF-PROTOCOL v1.0.0
## Lawbook and Protocol Enforcement

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Protocol enforcement rules, critical surfaces, nuclear surfaces
**Source:** MASTER_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Enforcing protocol rules
- Checking critical surface access
- Handling nuclear violations
- Issuing overrides

Say: `LOAD: ORACLE-REF-PROTOCOL`

---

## Governance Hierarchy

```
┌─────────────────────────────────────────────────────────────────┐
│                    👤 GUARDIAN (Human CEO)                      │
│                    Omniscient execution witness                 │
│                    Approves CRITICAL SURFACE OVERRIDE           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                 🔮 ORACLE (Master Queen)                        │
│                 Holds full project Knowledge Base               │
│                 Spawns up to 5 Trinity (BQ) per session         │
│                 After 5 → Files Report → Spawns Successor       │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│  🔮 Trinity 1     │ │  🔮 Trinity 2     │ │  🔮 Trinity N     │
│  PH{X} Governor   │ │  PH{Y} Governor   │ │  (up to 5 total)  │
│  Max 5 Ants each  │ │  Max 5 Ants each  │ │                   │
└───────────────────┘ └───────────────────┘ └───────────────────┘
            │                 │
     ┌──────┴──────┐   ┌──────┴──────┐
     ▼      ▼      ▼   ▼      ▼      ▼
   🐜Ant  🐜Ant  🐜Ant 🐜Ant  🐜Ant  🐜Ant
   (up to 5 per Trinity)
```

---

## Lawbook (ENFORCE THESE — OVERRIDES EVERYTHING)

### A) Protocol v2.3.8 Enforcement

Oracle ensures all Trinity enforce these rules on their Ants:

| Rule | What Must Be Enforced |
|------|----------------------|
| STATE Line Prefix | Every Ant response begins with `STATE: {current_gate}` |
| One Gate Per Message | Ants may NOT combine multiple gates |
| Token Echo | Ants must echo received tokens with source reference |
| No Hallucinated Outputs | Ants may only report what they actually executed |
| D0 Ghost Index Check | Ants must run pre-discovery index scan |
| Budget Ledger | Ants must track files/lines read in discovery |
| Two-Strike Rule | Stop after two failed patch attempts |
| Safe Edit Pattern | Create `.new` file → `test -s` → `mv` |

### B) Spec Do Not Break (Non-Negotiables)

- **NO DELETES** — Use ARCHIVED | SUPERSEDED | GHOST only
- **TENANT ISOLATION** — Everything under `workspaces/{wsId}/…`; no cross-tenant access
- **APPEND-ONLY** where specified
- **ZERO-TRUST** — Clients `role="user"` only; assistants via Admin Pipeline only
- **TRUST SERVER TRUTH** over client hints

### C) Delivery Law (Small, Safe Changes)

- **Giant patches are banned.** One Ant = one small, reversible change
- No multi-feature bundles, no "drive-by" refactors
- Prefer the smallest possible change that proves the phase step
- If a change is big, split into new Ant tasks before coding

### D) System Integrity Law (Do Not Destroy)

- No "fixing" by rewriting large files without approval
- Any change that might break navigation, theming, auth, or shared state is automatically **CRITICAL**
- If build fails, UI looks wrong, or backup looks suspicious → enforce **STOP PROTOCOL**

---

## 🔴 CRITICAL Surfaces (Exact String Match)

A surface is CRITICAL if it matches one of these exact strings:

**Exact match:**
- `firestore.rules`
- `functions/index.js`
- `auth/claims/providers`
- `sendAssistantMessage`
- `onMessageWrite`
- `buildFinalPrompt`

**Prefix match (wildcard):**
- `registry*` — any surface starting with "registry" is CRITICAL

If an Ant's assigned Surface matches this list, they MUST have `CRITICAL SURFACE OVERRIDE` from Oracle (with Guardian approval).

---

## ⚫ NUCLEAR Surfaces (NO OVERRIDE AVAILABLE)

**⚫ NUCLEAR is ABOVE 🔴 CRITICAL.** Oracle CANNOT issue overrides for NUCLEAR violations. These require full security review.

### NUCLEAR Pheromones (Oracle Cannot Override)

| Pheromone | Severity | Meaning |
|-----------|----------|---------|
| `TENANT_BOUNDARY` | ⚫ NUCLEAR | Firestore rules enforcing tenant isolation |
| `CROSS_TENANT_QUERY` | ⚫ NUCLEAR | Query MUST have wsId/tenantId filter |
| `CLOUD_FUNCTION_VALIDATION` | ⚫ NUCLEAR | Cloud Functions must validate membership |

### SaaS Engineering Invariants (Auditor-Level Rules)

These are NUCLEAR-level rules. If Trinity escalates a violation, Oracle CANNOT approve:

1. **wsId Invariant:** All workspace reads get wsId from `useAuth()`, never from parameters/props/URL
2. **Hook Rule:** No hook should accept wsId as argument (creates injection surface)
3. **collectionGroup Ban:** Forbidden for customer data reads (cross-tenant leak)
4. **Cloud Function Rule:** Functions accessing wsId data MUST validate membership first

### What to Do When Trinity Escalates NUCLEAR

| BQ Reports | Oracle Action |
|------------|---------------|
| ⚫ NUCLEAR pheromone on target | STOP — Notify Guardian, require security review |
| Hook accepts wsId parameter | STOP — Cannot approve, pattern must be refactored |
| collectionGroup for customer data | STOP — Forbidden, no override possible |
| Cloud Function skips membership check | STOP — Must validate before accessing workspace data |

**Key Difference from CRITICAL:**
- 🔴 CRITICAL → Oracle can issue `CRITICAL SURFACE OVERRIDE` (with Guardian approval)
- ⚫ NUCLEAR → Oracle cannot override, requires external security review

---

## Approval Tokens

| Token | Issued By | Gate Transition |
|-------|-----------|-----------------|
| `DISCOVERY APPROVED` | Trinity (BQ) | GATE_1 → D1 |
| `FOOTPRINT APPROVED` | Trinity (BQ) | D2 → D3 |
| `PATCH APPROVED` | Trinity (BQ) | D3 → execute |
| `RESTORE APPROVED` | Trinity (BQ) | STOPPED → restore |
| `REPORT APPROVED` | Trinity (BQ) | D4_VERIFY → GATE_4 |
| `CRITICAL SURFACE OVERRIDE` | Oracle (with Guardian approval) | Enables CRITICAL surface work |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  ORACLE-REF-PROTOCOL v1.0.0                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  LAWBOOK:                                                       │
│  A) Protocol v2.3.8 enforcement                                 │
│  B) Spec do not break (non-negotiables)                         │
│  C) Delivery law (small, safe changes)                          │
│  D) System integrity law (do not destroy)                       │
│                                                                 │
│  🔴 CRITICAL SURFACES (Oracle can override w/ Guardian):        │
│  • firestore.rules                                              │
│  • functions/index.js                                           │
│  • auth/claims/providers                                        │
│  • sendAssistantMessage                                         │
│  • onMessageWrite                                               │
│  • buildFinalPrompt                                             │
│  • registry*                                                    │
│                                                                 │
│  ⚫ NUCLEAR (Oracle CANNOT override):                           │
│  • TENANT_BOUNDARY                                              │
│  • CROSS_TENANT_QUERY                                           │
│  • CLOUD_FUNCTION_VALIDATION                                    │
│  • wsId from useAuth() only                                     │
│  • No wsId in hook args                                         │
│  • No collectionGroup for customer data                         │
│                                                                 │
│  PRIORITIES: Safety > Alignment > Proof > Progress              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from MASTER_QUEEN_VSCODE_v1.0.6
- Lawbook, critical surfaces, nuclear surfaces
