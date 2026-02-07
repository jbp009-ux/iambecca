# PMX-SHARED-SAAS v1.1.0
## Multi-Tenant Invariants for SaaS Projects

**Version:** 1.1.0
**Date:** 2026-02-03
**Purpose:** Tenant isolation, pheromones, and test gates
**Scope:** Load for any multi-tenant work (Sonny, etc.)
**Source:** Expanded with content from CODER_ANT_VSCODE_v1.3.9

---

## Core Principle

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   TENANT ISOLATION IS SACRED                                    │
│                                                                 │
│   Every query MUST be scoped by tenant.                         │
│   Cross-tenant access is a security incident.                   │
│   Default deny. Explicit allow.                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Multi-Tenant Invariants (NEVER Break)

### 1. Tenant Scoping
```
✅ ALWAYS: Filter by tenantId/workspaceId in every query
❌ NEVER: Query across tenants without explicit aggregation permission
❌ NEVER: Remove tenantId filters from existing queries
❌ NEVER: Use collectionGroup without tenant prefix
```

### 2. Data Boundaries
```
✅ ALWAYS: Public data must be explicitly scoped (storefront vs admin)
✅ ALWAYS: Separate published vs draft data by collection or flag
❌ NEVER: Allow `read: if true` on admin collections
❌ NEVER: Allow unauthenticated writes to tenant data
```

### 3. Hook Architecture (Frontend)
```
✅ ALWAYS: Get workspaceId from useAuth() context
❌ NEVER: Pass workspaceId as a hook argument
❌ NEVER: Trust workspaceId from URL or user input
```

### 4. Cloud Function Validation
```
✅ ALWAYS: Validate tenant membership in Cloud Functions
✅ ALWAYS: Check caller's uid against workspace members
❌ NEVER: Assume Admin SDK bypasses mean security is handled
❌ NEVER: Trust tenantId from request body without validation
```

---

## Multi-Tenant Critical Surfaces

For SaaS projects with tenant isolation, these surfaces require `CRITICAL SURFACE OVERRIDE` **plus** tenant isolation verification.

### Data Isolation Layer

| Surface | Why Critical |
|---------|--------------|
| `firestore.rules` / `*.rules` | Tenant data isolation — one mistake = data leak between tenants |
| `**/security-rules/**` | RLS / row-level security definitions |
| `**/*tenant*.{js,ts,jsx,tsx}` | Tenant context logic |
| `**/middleware/auth*.{js,ts}` | Session + tenant binding |
| `**/hooks/useTenant*.{js,ts}` | Client-side tenant context |

### API Boundaries

| Surface | Why Critical |
|---------|--------------|
| `**/api/**/[tenantId]/**` | Tenant-scoped API routes |
| `**/lib/db.{js,ts}` | Database queries with tenant filters |
| Any file with `.where('tenantId'` or `.where('organizationId'` | Tenant filter queries |

### STOP Conditions (Multi-Tenant Specific)

- Any code that **removes** a `tenantId` filter → STOP immediately, flag as potential data leak
- Any code that queries across tenants without explicit aggregation permission → STOP
- Any change to tenant context injection → STOP, request security review

---

## Tenant Isolation Pheromones

When working on multi-tenant SaaS, emit these pheromones for tenant-sensitive code.

| Tag | Severity | Meaning | Example |
|-----|----------|---------|---------|
| `TENANT_BOUNDARY` | 🔴 CRITICAL | Enforces tenant isolation — DO NOT MODIFY without security review | Firestore rule checking `request.auth.token.tenantId` |
| `CROSS_TENANT_QUERY` | 🔴 CRITICAL | Query that MUST have tenant_id filter | `db.collection('orders').where('tenantId', '==', current)` |
| `TENANT_CONTEXT` | 🟠 HIGH_RISK | Sets/reads current tenant — changes affect all downstream | `useTenant()` hook, auth middleware |
| `SHARED_COMPONENT` | 🟡 MEDIUM | Component used across tenants — test with multiple tenant contexts | Menu display, order form |

### Pheromone Emission Rule

If you touch ANY code that:
- Reads or sets tenant context
- Filters data by tenant ID
- Enforces tenant boundaries in security rules
- Handles cross-tenant admin operations

→ You MUST emit the appropriate pheromone. **Missing pheromone = task incomplete.**

### Example Pheromone

```
PHEROMONE: CROSS_TENANT_QUERY
SEVERITY: 🔴 CRITICAL
TARGET: src/hooks/useOrders.js:L15-L25
WARNING: Query filters by tenantId. Removing filter would expose all tenant orders.
SAFE CHANGE: Add conditions inside .where(), never remove tenantId filter
DO NOT: Remove .where('tenantId', '==', ...) clause
```

---

## Tenant Isolation Test Gate

For any deploy in a multi-tenant project, tenant isolation MUST be verified.

### Required Test Coverage

Before `PATCH APPROVED` for deploy, these tests must exist and pass:

- [ ] Tenant A CANNOT read Tenant B's data
- [ ] Tenant A CANNOT write to Tenant B's data
- [ ] Unauthenticated user CANNOT access any tenant data
- [ ] User with manipulated token CANNOT cross tenant boundary

### Test Command
```bash
npm run test:rules:emu
```

### Gate Rules

| Condition | Action |
|-----------|--------|
| Tests exist and pass | ✅ Proceed |
| Tests exist but fail | 🛑 STATE: STOP — Cannot deploy. Fix isolation first. |
| Tests don't exist for touched tenant surface | 🛑 STATE: STOP — Request test creation before deploy. |

**No tenant isolation test = No deploy**

---

## Three-Layer Security Model

```
┌─────────────────────────────────────────────────────────────────┐
│  LAYER 1: Frontend Hooks                                        │
│  → wsId from useAuth(), never from args                         │
│  → Filter queries client-side                                   │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 2: Firestore Rules                                       │
│  → Enforce tenant scoping in security rules                     │
│  → Default deny, explicit allow                                 │
├─────────────────────────────────────────────────────────────────┤
│  LAYER 3: Cloud Functions                                       │
│  → Admin SDK bypasses rules — MUST validate manually            │
│  → Always verify membership before operations                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Safety Rules

### Schema Changes
```
✅ PREFER: Additive changes (add fields, add collections)
⚠️ CAUTION: Destructive changes (remove fields, rename)
❌ AVOID: Breaking changes without migration plan

REQUIRED for schema changes:
1. Migration plan
2. Rollback plan
3. Impact assessment
```

### Data Deletion
```
✅ DEFAULT: "Archive first, delete never"
✅ ALLOWED: Soft delete (set deletedAt timestamp)
⚠️ REQUIRES: Explicit DELETE APPROVED for hard deletes
❌ NEVER: Delete without backup/archive
```

### Published vs Draft
```
✅ ALWAYS: Separate collections or explicit flags
✅ ALWAYS: Rules enforce who can publish
❌ NEVER: Let customers see draft data
❌ NEVER: Let non-owners modify published data
```

---

## Firestore Rule Patterns

### Tenant-Scoped Collection
```javascript
// ✅ CORRECT: Tenant scoping enforced
match /tenants/{tenantId}/orders/{orderId} {
  allow read: if request.auth != null
    && request.auth.token.tenantId == tenantId;
  allow write: if request.auth != null
    && request.auth.token.tenantId == tenantId
    && isStaff(tenantId);
}
```

### Public Storefront (Read-Only)
```javascript
// ✅ CORRECT: Public read, no write
match /tenants/{tenantId}/menuPublished/{itemId} {
  allow read: if true;  // Intentionally public
  allow write: if false; // Never from client
}
```

### Anti-Pattern (Dangerous)
```javascript
// ❌ WRONG: No tenant scoping
match /orders/{orderId} {
  allow read: if request.auth != null;  // Can read ANY order!
}
```

---

## Code Patterns

### Frontend Hook (Correct)
```typescript
// ✅ CORRECT: wsId from context, not args
function useOrders() {
  const { workspaceId } = useAuth();  // From context
  return useFirestoreCollection(
    `tenants/${workspaceId}/orders`
  );
}
```

### Frontend Hook (Wrong)
```typescript
// ❌ WRONG: wsId as argument (can be spoofed)
function useOrders(workspaceId: string) {
  return useFirestoreCollection(
    `tenants/${workspaceId}/orders`
  );
}
```

### Cloud Function (Correct)
```typescript
// ✅ CORRECT: Validate membership
export const getOrders = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  const tenantId = data.tenantId;

  // MUST verify membership
  const member = await db.doc(`tenants/${tenantId}/members/${uid}`).get();
  if (!member.exists) {
    throw new functions.https.HttpsError('permission-denied', 'Not a member');
  }

  // Now safe to query
  return db.collection(`tenants/${tenantId}/orders`).get();
});
```

---

## STOP Triggers (SaaS-Specific)

STOP immediately if:
- [ ] Query would access data across tenants
- [ ] tenantId/workspaceId filter is being removed
- [ ] collectionGroup query without tenant prefix
- [ ] Hook accepts workspaceId as argument
- [ ] Cloud Function doesn't validate membership
- [ ] Security rule allows unrestricted access to admin data
- [ ] Hard delete without explicit approval
- [ ] No tenant isolation test for touched surface
- [ ] Missing pheromone for tenant-sensitive code

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-SAAS v1.1.0 — QUICK REFERENCE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TENANT ISOLATION IS SACRED                                     │
│                                                                 │
│  INVARIANTS:                                                    │
│  • Every query scoped by tenantId                               │
│  • wsId from useAuth(), never from args                         │
│  • Cloud Functions MUST validate membership                     │
│  • Default deny, explicit allow                                 │
│                                                                 │
│  PHEROMONES (emit for tenant code):                             │
│  🔴 TENANT_BOUNDARY — isolation enforcer                        │
│  🔴 CROSS_TENANT_QUERY — must have filter                       │
│  🟠 TENANT_CONTEXT — sets/reads tenant                          │
│  🟡 SHARED_COMPONENT — multi-tenant use                         │
│                                                                 │
│  TEST GATE (required before deploy):                            │
│  • Tenant A cannot read/write Tenant B                          │
│  • Unauthenticated cannot access tenant data                    │
│  • No test = No deploy                                          │
│                                                                 │
│  THREE LAYERS:                                                  │
│  1. Frontend hooks (wsId from context)                          │
│  2. Firestore rules (tenant scoping)                            │
│  3. Cloud Functions (membership validation)                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.1.0] 2026-02-03
- Added Multi-Tenant Critical Surfaces section
- Added Tenant Isolation Pheromones (4 types)
- Added Pheromone Emission Rule
- Added Example Pheromone format
- Added Tenant Isolation Test Gate
- Added test gate rules (no test = no deploy)
- Added pheromone-related STOP triggers
- Source: CODER_ANT_VSCODE_v1.3.9

### [1.0.0] 2026-01-30
- Initial release
- Multi-tenant invariants defined
- Three-layer security model
- Code patterns (correct and wrong)
- SaaS-specific STOP triggers
