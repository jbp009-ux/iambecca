# AUDIT_REQUEST Template
## For Horsemen Chain (HM-01 to HM-05)

**Created by:** BECCA (IM-01)
**Consumed by:** HM-01 (first), then passed through chain

---

## Template

```markdown
# AUDIT_REQUEST

packet_id: AR_<YYYYMMDD>_<HHMMSS>_<seq>
created_by: BECCA (IM-01)
created_at: <ISO timestamp>
run_id: <run_id>

---

## ANT REPORT TO AUDIT

| Attribute | Value |
|-----------|-------|
| Ant ID | ANT-XXX |
| Ant Role | <Neo/Morpheus/Tank/etc.> |
| Task | <task description> |
| Report Path | <path to ANT_REPORT_*.md> |

---

## REPORT CONTENT

```
<paste full Ant report content here>
```

---

## AUDIT CHAIN STATUS

| Step | Horseman | Focus | Status |
|------|----------|-------|--------|
| 1 | HM-01 Hallucination | Unproven claims | PENDING |
| 2 | HM-02 Amnesia | Forgotten context | PENDING |
| 3 | HM-03 Drift | Scope creep | PENDING |
| 4 | HM-04 Privilege | Unauthorized actions | PENDING |
| 5 | HM-05 Silent Failure | Hidden bugs | PENDING |

---

## ROUTING

| Attribute | Value |
|-----------|-------|
| Current Location | inbox/horsemen/ |
| Next | HM-01 (hallucination activate) |
| Final Output | outbox/horsemen/VERDICT_PACKET_<id>.md |
| Returns To | BECCA (IM-01) |

---

🔑 AUDIT_REQUEST CREATED — Route to HM-01
```

---

## How BECCA Creates This

1. User says: "Audit ANT-006 report"
2. BECCA reads the Ant report
3. BECCA creates this packet with report content
4. BECCA saves to `inbox/horsemen/AUDIT_REQUEST_<id>.md`
5. BECCA tells user: "Route to HM-01 (hallucination activate)"

---

## How Each Horseman Updates This

Each HM adds their findings section and updates status:

```markdown
## HM-01 HALLUCINATION_FINDINGS

### Summary
| Metric | Count |
|--------|-------|
| Claims Found | X |
| ✅ Proven | X |
| 🔴 Unproven | X |

### Details
<findings table>

---

## AUDIT CHAIN STATUS (updated)

| Step | Horseman | Status |
|------|----------|--------|
| 1 | HM-01 Hallucination | ✅ COMPLETE |
| 2 | HM-02 Amnesia | PENDING |
...

NEXT: HM-02 (amnesia activate)
```

---

## File Naming

```
inbox/horsemen/AUDIT_REQUEST_<YYYYMMDD>_<HHMMSS>_001.md
```

Example: `AUDIT_REQUEST_20260204_143022_001.md`
