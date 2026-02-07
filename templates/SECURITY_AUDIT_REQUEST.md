# SECURITY_AUDIT_REQUEST Template
## For Security Audit Chain (SA-01 to SA-05)

**Created by:** BECCA (IM-01)
**Consumed by:** SA-01 (first), then passed through chain

---

## Template

```markdown
# SECURITY_AUDIT_REQUEST

packet_id: SAR_<YYYYMMDD>_<HHMMSS>_<seq>
created_by: BECCA (IM-01)
created_at: <ISO timestamp>
run_id: <run_id>

---

## SCOPE

| Attribute | Value |
|-----------|-------|
| Project | <project name> |
| Project Path | <absolute path> |
| Scope | FULL_SYSTEM / SPECIFIC_FILES / SPECIFIC_AREA |
| Focus Areas | <data leaks, tenant isolation, auth, OWASP, all> |

---

## TARGET FILES/AREAS

| Pattern | Purpose |
|---------|---------|
| `**/*.ts` | TypeScript source |
| `**/*.tsx` | React components |
| `firestore.rules` | Security rules |
| `functions/src/**` | Cloud Functions |
| `frontend/src/**` | Frontend code |

---

## SECURITY AUDIT CHAIN STATUS

| Step | Auditor | Focus | Status |
|------|---------|-------|--------|
| 1 | SA-01 Data Leaks | PII, logging, exposure | PENDING |
| 2 | SA-02 Tenant Isolation | Multi-tenant boundaries | PENDING |
| 3 | SA-03 Auth & Secrets | Auth bypass, credentials | PENDING |
| 4 | SA-04 OWASP | Top 10 vulnerabilities | PENDING |
| 5 | SA-05 Verdict | Consolidate, score, verdict | PENDING |

---

## ROUTING

| Attribute | Value |
|-----------|-------|
| Current Location | inbox/security-audit/ |
| Next | SA-01 (data leaks activate) |
| Final Output | outbox/security-audit/SECURITY_VERDICT_<id>.md |
| Returns To | BECCA (IM-01) |

---

🔑 SECURITY_AUDIT_REQUEST CREATED — Route to SA-01
```

---

## How BECCA Creates This

1. User says: "Security audit the system" or "Check for vulnerabilities"
2. BECCA determines scope (full system or specific areas)
3. BECCA creates this packet with scope details
4. BECCA saves to `inbox/security-audit/SECURITY_AUDIT_REQUEST_<id>.md`
5. BECCA tells user: "Route to SA-01 (data leaks activate)"

---

## How Each SA Auditor Updates This

Each SA adds their findings section and updates status:

```markdown
## SA-01 DATA_LEAK_FINDINGS

### Summary
| Metric | Count |
|--------|-------|
| Files Scanned | X |
| 🔴 Critical Leaks | X |
| 🟠 Risk Areas | X |
| ✅ Clean | X |

### Critical Findings
| # | File | Line | Issue | Severity |
|---|------|------|-------|----------|
| 1 | <path> | <line> | <issue> | 🔴 CRITICAL |

---

## SECURITY AUDIT CHAIN STATUS (updated)

| Step | Auditor | Status |
|------|---------|--------|
| 1 | SA-01 Data Leaks | ✅ COMPLETE |
| 2 | SA-02 Tenant Isolation | PENDING |
...

NEXT: SA-02 (tenant isolation activate)
```

---

## File Naming

```
inbox/security-audit/SECURITY_AUDIT_REQUEST_<YYYYMMDD>_<HHMMSS>_001.md
```

Example: `SECURITY_AUDIT_REQUEST_20260204_143022_001.md`

---

## Verdicts (from SA-05)

| Verdict | Criteria | Action |
|---------|----------|--------|
| ✅ **SECURE** | No critical issues | Production-ready |
| ⚠️ **AT RISK** | High issues, no critical | Fix before release |
| 🛑 **COMPROMISED** | Critical issues found | STOP. Fix immediately. |
