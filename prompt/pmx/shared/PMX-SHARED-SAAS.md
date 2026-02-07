# PMX-SHARED-SAAS v1.0.0
## Multi-Tenant Invariants for SaaS Projects

**Version:** 1.0.0
**Date:** 2026-01-30
**Purpose:** Tenant isolation and SaaS safety rules
**Scope:** Load for any multi-tenant work (Sonny, etc.)

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

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-SAAS v1.0.0 — QUICK REFERENCE                       │
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
│  THREE LAYERS:                                                  │
│  1. Frontend hooks (wsId from context)                          │
│  2. Firestore rules (tenant scoping)                            │
│  3. Cloud Functions (membership validation)                     │
│                                                                 │
│  DATA SAFETY:                                                   │
│  • Archive first, delete never                                  │
│  • Additive schema changes preferred                            │
│  • Migration + rollback plan required                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-01-30
- Initial release
- Multi-tenant invariants defined
- Three-layer security model
- Code patterns (correct and wrong)
- SaaS-specific STOP triggers
