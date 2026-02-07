# TRINITY-REF-MULTI-TENANT v1.0.0
## Multi-Tenant Enforcement Rules

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Tenant isolation enforcement for SaaS projects
**Source:** BABY_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Project is multi-tenant SaaS
- Ant touches tenant-related code
- Deploy touches tenant surfaces

Say: `LOAD: TRINITY-REF-MULTI-TENANT`

---

## 🔴 Critical Surfaces (Multi-Tenant)

For SaaS projects with tenant isolation, these surfaces require **STOP + escalate to Oracle**:

| Surface | Why Critical |
|---------|--------------|
| `firestore.rules` with tenant checks | Tenant data isolation |
| `**/*tenant*.{js,ts,jsx,tsx}` | Tenant context logic |
| `**/middleware/auth*.{js,ts}` | Session + tenant binding |
| `**/hooks/useTenant*.{js,ts}` | Client-side tenant context |
| `**/api/**/[tenantId]/**` | Tenant-scoped API routes |
| Any file with `.where('tenantId'` | Tenant filter queries |

---

## Multi-Tenant Enforcement Rules

1. **If Ant touches tenant isolation code** → Verify Ant emitted appropriate pheromone
2. **If Ant removes a `tenantId` filter** → STOP immediately, reject as potential data leak
3. **If deploy touches tenant surfaces** → Require tenant isolation test pass first
4. **If no tenant isolation tests exist** → STOP, require test creation before deploy

---

## Tenant Pheromone Verification

When reviewing Ant work that touches tenant-related code, verify appropriate pheromone was emitted:

| If Ant Touched | Required Pheromone |
|----------------|-------------------|
| Firestore rules with tenant checks | `TENANT_BOUNDARY` (🔴 CRITICAL) |
| Query with `.where('tenantId'` | `CROSS_TENANT_QUERY` (🔴 CRITICAL) |
| `useTenant` hook or tenant middleware | `TENANT_CONTEXT` (🟠 HIGH_RISK) |
| Component used across tenants | `SHARED_COMPONENT` (🟡 MEDIUM) |

**Enforcement:**
- If Ant touched tenant code but emitted no pheromone → reject (code: `BQ_VIOLATION_TENANT_NO_PHEROMONE`)
- If Ant removed tenant filter → reject immediately (code: `BQ_VIOLATION_TENANT_LEAK`)

---

## Tenant Isolation Test Gate

If deploy touches ANY multi-tenant critical surface:

- [ ] Tenant isolation tests MUST exist
- [ ] `npm run test:rules:emu` MUST pass
- [ ] Tests MUST cover:
  - Tenant A cannot read Tenant B's data
  - Tenant A cannot write to Tenant B's data
  - Unauthenticated user cannot access tenant data

---

## Tenant Test Failure Conditions

| Condition | Code | Action |
|-----------|------|--------|
| Tests don't exist | `BQ_VIOLATION_TENANT_NO_TEST` | Refuse deploy |
| Tests fail | `BQ_VIOLATION_TENANT_TEST_FAIL` | Refuse deploy |
| Ant skipped test verification | `BQ_VIOLATION_TENANT_NO_TEST` | Refuse deploy |

**No tenant isolation test = No deploy to tenant surfaces**

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  TRINITY-REF-MULTI-TENANT v1.0.0                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CRITICAL SURFACES:                                             │
│  • firestore.rules with tenant checks                           │
│  • *tenant*.{js,ts,jsx,tsx}                                     │
│  • middleware/auth*.{js,ts}                                     │
│  • hooks/useTenant*.{js,ts}                                     │
│  • api/**/[tenantId]/**                                         │
│  • .where('tenantId'                                            │
│                                                                 │
│  REQUIRED PHEROMONES:                                           │
│  • TENANT_BOUNDARY (🔴)                                         │
│  • CROSS_TENANT_QUERY (🔴)                                      │
│  • TENANT_CONTEXT (🟠)                                          │
│  • SHARED_COMPONENT (🟡)                                        │
│                                                                 │
│  TEST GATE (for deploy):                                        │
│  • Tests must exist                                             │
│  • test:rules:emu must pass                                     │
│  • Tests must cover cross-tenant isolation                      │
│                                                                 │
│  VIOLATIONS:                                                    │
│  • BQ_VIOLATION_TENANT_LEAK                                     │
│  • BQ_VIOLATION_TENANT_NO_PHEROMONE                             │
│  • BQ_VIOLATION_TENANT_NO_TEST                                  │
│  • BQ_VIOLATION_TENANT_TEST_FAIL                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from BABY_QUEEN_VSCODE_v1.0.6
- Tenant enforcement rules and pheromones
