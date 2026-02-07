# IAMBECCA-ISOLATION.md v1.0.0
## Central Tenant Isolation Doctrine

**Version:** 1.0.0
**Date:** 2026-02-04
**Scope:** ALL roles must follow this doctrine
**Authority:** BECCA (IM-01)

---

## NUCLEAR INVARIANT

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

---

## Canonical Tenant Key Law (FROZEN)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   CANONICAL TENANT KEY: tenantId                                            │
│                                                                             │
│   This is FROZEN. All storage, queries, rules, and APIs use tenantId.       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tenant Key Hierarchy

| Field | Status | Usage | Storage |
|-------|--------|-------|---------|
| `tenantId` | **CANONICAL** | All DB, rules, APIs, server-side | ✅ Stored in all collections |
| `wsId` | **UI ALIAS** | Frontend state/context only | ❌ Never stored as authority |
| `businessId` | **SECONDARY** | Business entity within tenant | ✅ Stored, but tenant-scoped |

### Key Rules (FROZEN)

1. **Storage/DB/Rules/API**: MUST use `tenantId` as the tenant boundary key
2. **UI/Frontend**: May use `wsId` for display, but MUST translate to `tenantId` via auth token for any server call
3. **businessId**: Allowed only as a secondary entity WITHIN a tenant scope (businessId queries MUST also include tenantId)
4. **Auth Token**: The source of truth is `context.auth.token.tenantId` — this is the ONLY trusted tenant value

### Why This Matters

Key drift is how cross-tenant leaks happen "even though we filtered." By freezing `tenantId` as canonical:
- No agent can choose which key to use based on "mood"
- All isolation checks look for the same field
- Evidence validation is deterministic

### Migration Note

If legacy code uses `wsId` in storage:
1. Data migration required to add `tenantId` field
2. Until migrated, treat `wsId` as tenantId equivalent BUT flag for refactor
3. New code MUST use `tenantId` only

---

## The Three Isolation Pillars

### Pillar 1: Query Scoping

**EVERY Firestore query MUST include tenant filter.**

```typescript
// ✅ CORRECT
const orders = await db.collection('orders')
  .where('tenantId', '==', tenantId)  // ✅ ALWAYS
  .get();

// ❌ WRONG — NEVER
const orders = await db.collection('orders').get();  // FULL TABLE SCAN = BREACH
```

### Pillar 2: Component Isolation (useAuth Doctrine)

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

### Pillar 3: Server-Side Enforcement

**Backend MUST validate tenant from auth token, NEVER from request body.**

```typescript
// ✅ CORRECT
export const getOrders = functions.https.onCall(async (data, context) => {
  const tenantId = context.auth?.token.tenantId;  // ✅ From auth token
  if (!tenantId) {
    throw new functions.https.HttpsError('permission-denied', 'No tenant context');
  }
  // tenantId is TRUSTED because it comes from verified auth token
});

// ❌ WRONG — NEVER TRUST REQUEST DATA
export const getOrders = functions.https.onCall(async (data) => {
  const tenantId = data.tenantId;  // ❌ CLIENT COULD SEND ANY TENANT ID
});
```

---

## Role-Specific Isolation Duties

| Role | Code | Isolation Duty |
|------|------|----------------|
| **Neo** (ANT-CODER) | IM-05 | Tenant Boundary Statement in ALL reports. File:line evidence. |
| **Morpheus** (ANT-DEBUGGER) | IM-06 | Detect isolation bugs → BECCA ABORT, not fix instructions. |
| **Tank** (ANT-TEST) | IM-07 | Write isolation tests. Reject code without isolation tests. |
| **Seraph** (ANT-SECURITY) | IM-08 | 6-point verification checklist. Trigger BECCA_REVIEW_REQUEST. |
| **Link** (ANT-INFRA) | IM-09 | tenantId FIRST in schemas/indexes. Rules check on EVERY path. |
| **Niobe** (ANT-UI) | IM-10 | useAuth() doctrine. No tenant props. No URL tenant. |
| **Apoc** (ANT-DATA) | IM-11 | Every query scoped. Every transform preserves tenantId. |
| **Ghost Twins** (ANT-REVIEW) | IM-12 | Isolation Review Gate. Reject without evidence. |

---

## Isolation Evidence Requirements

### In ANT_REPORT (Section 1 - Tenant Boundary Statement)

```markdown
## TENANT BOUNDARY STATEMENT

| # | Attribute | Value |
|---|-----------|-------|
| 1 | Tenant Key | tenantId / wsId / businessId |
| 2 | Boundary Location | <file:line where enforced> |
| 3 | Enforcement Method | Query filter / Auth check / Rules |
| 4 | Cross-Tenant Risk | NONE / LOW / MEDIUM / HIGH |

If cross-tenant risk is MEDIUM or HIGH: Explain mitigation.
```

### In Review Reports (Isolation Gate)

```markdown
## TENANT ISOLATION GATE

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Boundary Statement present | ✅/🔴 | ANT_REPORT Section 1 |
| Tenant key identified | ✅/🔴 | tenantId / wsId / businessId |
| Boundary file:line | ✅/🔴 | <file:line or "NOT FOUND"> |
| Queries scoped | ✅/🔴 | <file:line with filter> |
| Isolation tests exist | ✅/🔴/N/A | <test file path> |

### Gate Result
- [ ] ✅ PASS — All isolation evidence verified
- [ ] 🔴 FAIL — Missing isolation evidence
```

---

## BECCA ABORT Triggers

These findings trigger immediate BECCA ABORT (security incident):

| Finding | Who Detects | Action |
|---------|-------------|--------|
| Query without tenantId filter on tenant data | Neo, Tank, Seraph | BECCA ABORT |
| Component accepts wsId/tenantId as prop | Niobe, Seraph | BECCA ABORT |
| User sees another user's data | Any Ant | BECCA ABORT |
| Cross-tenant data in query results | Apoc, Tank | BECCA ABORT |
| Missing tenant check in security rules | Seraph, Link | BECCA ABORT |
| Migration modifies tenantId field | Apoc | BECCA ABORT |
| API returns data for wrong tenant | Tank, Seraph | BECCA ABORT |

**Format:**
```
BECCA ABORT: <description of breach> at <file:line>
```

---

## BECCA_REVIEW_REQUEST Triggers

These changes ALWAYS require Seraph review before merge:

| Change Type | Why |
|-------------|-----|
| New Firestore query | Could leak tenant data |
| Changes to auth/useAuth | Could break tenant context |
| Security rules modification | Could open tenant boundaries |
| New Cloud Function | Could bypass tenant validation |
| Schema changes with tenantId | Could break isolation |
| Data migration touching tenant data | Could mix tenants |

**Format:**
```markdown
## BECCA_REVIEW_REQUEST

| Attribute | Value |
|-----------|-------|
| Trigger | <what triggered this request> |
| Risk | Potential tenant isolation impact |
| Requesting | Seraph (IM-08) security audit |
| Evidence | <file:line or description> |
```

---

## Isolation Anti-Patterns

### Query Anti-Patterns

| Anti-Pattern | Risk | Fix |
|--------------|------|-----|
| `collection.get()` without filter | Full table scan = all tenants | Add `.where('tenantId', '==', tenantId)` |
| `collection.where('status', '==', ...)` only | Query across tenants | Add tenantId to compound filter |
| Using `in` operator with mixed tenants | Cross-tenant query | Process one tenant at a time |

### Component Anti-Patterns

| Anti-Pattern | Risk | Fix |
|--------------|------|-----|
| `props.wsId` | Parent could pass wrong tenant | Use `useAuth()` inside component |
| `useParams().tenantId` | URL manipulation | Validate against `useAuth()` |
| Prop drilling tenant through hierarchy | Easy to leak/mix | Each component calls `useAuth()` |
| Caching with tenant in value only | Cache key collision | Include tenant in cache KEY |

### Server Anti-Patterns

| Anti-Pattern | Risk | Fix |
|--------------|------|-----|
| `request.body.tenantId` | Client could spoof | Use `context.auth.token.tenantId` |
| Missing middleware tenant check | Unvalidated requests | Add tenant validation middleware |
| Admin endpoint without tenant scope | Admin leaks | Still scope by tenant |

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ⚫ TENANT ISOLATION QUICK REFERENCE                                       │
│                                                                             │
│   QUERY:     ALWAYS .where('tenantId', '==', tenantId)                      │
│   COMPONENT: ALWAYS useAuth(), NEVER props.wsId                             │
│   SERVER:    ALWAYS context.auth.token.tenantId, NEVER request.body         │
│   RULES:     ALWAYS check request.auth.token.tenantId on EVERY path         │
│   INDEX:     ALWAYS tenantId as FIRST field                                 │
│   SCHEMA:    ALWAYS tenantId as FIRST field in collections                  │
│                                                                             │
│   IF UNSURE: Ask Seraph (IM-08)                                             │
│   IF BREACH: BECCA ABORT immediately                                        │
│                                                                             │
│   Evidence in EVERY report:                                                 │
│   • Tenant key identified                                                   │
│   • Boundary file:line provided                                             │
│   • Enforcement method documented                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-04
- Initial release
- Nuclear Invariant declaration
- Three Isolation Pillars (Query, Component, Server)
- Role-specific isolation duties table
- Evidence requirements for reports
- BECCA ABORT and BECCA_REVIEW_REQUEST triggers
- Isolation anti-patterns reference
- Quick reference card
