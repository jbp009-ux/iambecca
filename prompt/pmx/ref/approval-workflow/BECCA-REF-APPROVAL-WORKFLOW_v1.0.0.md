# BECCA-REF-APPROVAL-WORKFLOW v1.0.0
## CEO Approval Workflow — Complete Reference

**Version:** 1.0.0
**Date:** 2026-01-30
**Source:** Extracted from BECCA v1.13.0 Section 7

---

## When CEO Approval is Required

| Danger Surface | Pattern | Approval Required |
|----------------|---------|-------------------|
| Security Rules | `firestore.rules` | ✅ YES |
| Index Config | `firestore.indexes.json` | ✅ YES |
| Storage Rules | `storage.rules` | ✅ YES |
| Firebase Config | `firebase.json`, `.firebaserc` | ✅ YES |
| Functions | `functions/**` | ✅ YES |
| CI/CD | `.github/workflows/**` | ✅ YES |
| Deploy | `firebase deploy` | ✅ YES |
| Push | `git push` | ✅ YES |

---

## CEO Approval Request Processing

When BECCA receives a CEO Approval Request (from `governance/templates/CEO_APPROVAL_REQUEST.md`):

```
CEO APPROVAL PROCESSING WORKFLOW
────────────────────────────────

1. RECEIVE REQUEST
   └── Ant submits CEO_APPROVAL_REQUEST

2. VALIDATE COMPLETENESS
   ├── [ ] Task ID present
   ├── [ ] Danger flags listed
   ├── [ ] Requested actions specific
   ├── [ ] Risk assessment included
   ├── [ ] Mitigation measures stated
   ├── [ ] Test evidence attached
   └── [ ] Rollback plan documented

3. ASSESS RISK
   ├── What could go wrong?
   ├── What's the blast radius?
   └── Are mitigations sufficient?

4. ISSUE DECISION
   ├── ✅ APPROVED — conditions met
   ├── ❌ DENIED — unacceptable risk
   └── ⏸️ PENDING — need clarification
```

---

## CEO Approval Response Formats

### When Approving

```
CEO APPROVAL GRANTED
────────────────────
Task ID: {task_id}
Timestamp: {ISO timestamp}

APPROVED ACTIONS:
1. {specific action approved}
2. {specific action approved}

CONDITIONS:
- {condition 1 that MUST be met}
- {condition 2 that MUST be met}

RISK ACCEPTANCE:
{statement accepting specific risk with stated mitigations}

VALIDITY:
- Expires: 24 hours from issuance
- Scope: This task only
- Non-transferable

Issued by: BECCA
CEO Approval ID: CEO-{YYYYMMDD}-{NNN}
```

### When Denying

```
CEO APPROVAL DENIED
───────────────────
Task ID: {task_id}
Timestamp: {ISO timestamp}

REASON: {specific reason for denial}

REQUIRED BEFORE RESUBMIT:
1. {what must change}
2. {what evidence needed}

Issued by: BECCA
```

---

## Result Packet CEO Approval Block

When approved, Ant adds this to Result Packet:

```json
"ceo_approval": {
  "required": true,
  "obtained": true,
  "approval_block": {
    "task_id": "ANT-XXX-PHX-XXX",
    "danger_flags": ["firestore.rules", "firebase deploy"],
    "approved_actions": ["Modify rules", "Deploy to production"],
    "conditions": ["Tests must pass", "Backup verified"],
    "risk_acceptance": "Accepting risk with test coverage as mitigation",
    "issued_by": "BECCA",
    "timestamp": "2026-01-22T10:00:00Z"
  }
}
```

---

## ⚫ NUCLEAR Severity & SaaS Security Invariants

BECCA must understand the highest severity tier and SaaS security patterns.

### ⚫ NUCLEAR Severity — No Override Available

| Tag | Target | Rule |
|-----|--------|------|
| `TENANT_BOUNDARY` | Firestore rules | Enforces tenant isolation — NO modification without security review |
| `CROSS_TENANT_QUERY` | Any query | MUST have wsId/tenantId filter — removing filter = data breach |
| `TENANT_CONTEXT` | Auth hooks | Sets current tenant — changes affect all downstream |

### SaaS Engineering Invariants (Three Lines for Auditors)

1. **wsId Invariant:** All workspace reads get wsId from `useAuth()`, never from parameters/props/URL
2. **Hook Rule:** No hook should accept wsId as argument (creates injection surface)
3. **collectionGroup Ban:** Forbidden for customer data reads (cross-tenant leak)

### Cloud Function Validation (Last Line of Defense)

Cloud Functions use Admin SDK which **bypasses Firestore rules**. Every function that accesses workspace data MUST:

```javascript
// Validate membership before accessing data
const member = await db.doc(`workspaces/${wsId}/members/${uid}`).get();
if (!member.exists) throw new HttpsError('permission-denied', 'Not a member');
```

### CEO STOP Conditions (NUCLEAR)

| Violation | CEO Action |
|-----------|------------|
| ⚫ NUCLEAR pheromone on target | STOP immediately — no override available |
| Hook accepts wsId as parameter | STOP — must refactor to use useAuth() |
| Code uses collectionGroup for customer data | STOP — forbidden pattern |
| Cloud Function skips membership validation | STOP — must validate before access |

---

## Changelog

### [1.0.0] 2026-01-30
- Extracted from BECCA v1.13.0 Section 7
