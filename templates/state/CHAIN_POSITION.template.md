# CHAIN_POSITION (Runtime State File)
## Template — Copy to runtime/runs/<run_id>/state/CHAIN_POSITION.md

```markdown
# CHAIN_POSITION

run_id: <RUN_ID>
chain_id: <CHAIN_SA|CHAIN_HM|CHAIN_PM|CHAIN_WORKER>
step_index: <CURRENT_STEP_NUMBER e.g., 1, 2, 3>
step_total: <TOTAL_STEPS_IN_CHAIN e.g., 5>
current_step_name: <CURRENT_ROLE_DISPLAY e.g., SA-01 Data Leaks>
timestamp: <ISO_TIMESTAMP>

---

## CHAIN PROGRESS

| Step | Role | Status | Completed At |
|------|------|--------|--------------|
| 1 | <role> | COMPLETE/ACTIVE/PENDING | <iso or -> |
| 2 | <role> | COMPLETE/ACTIVE/PENDING | <iso or -> |
| 3 | <role> | COMPLETE/ACTIVE/PENDING | <iso or -> |
| ... | ... | ... | ... |

---

## EXAMPLE (CHAIN_SA)

| Step | Role | Status | Completed At |
|------|------|--------|--------------|
| 1 | SA-01 Data Leaks | COMPLETE | 2026-02-04T10:00:00Z |
| 2 | SA-02 Tenant Isolation | ACTIVE | - |
| 3 | SA-03 Auth & Secrets | PENDING | - |
| 4 | SA-04 OWASP | PENDING | - |
| 5 | SA-05 Security Verdict | PENDING | - |
```

---

## Usage

1. Copy this template to `runtime/runs/<run_id>/state/CHAIN_POSITION.md`
2. Fill in chain_id and step information
3. Update CHAIN PROGRESS table as each step completes
4. step_index increments with each handoff
