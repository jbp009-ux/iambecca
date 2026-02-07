# CURRENT_ROLE (Runtime State File)
## Template — Copy to runtime/runs/<run_id>/state/CURRENT_ROLE.md

```markdown
# CURRENT_ROLE

run_id: <RUN_ID>
target_name: <TARGET_PROJECT_NAME>
active_role_code: <ROLE_CODE e.g., SA-01, IM-05>
active_role_display: <ROLE_DISPLAY e.g., Data Leaks, Neo>
timestamp: <ISO_TIMESTAMP>
status: <ACTIVE|PAUSED|HALTED|COMPLETE>

---

## STATUS DEFINITIONS

- ACTIVE: Role is currently working
- PAUSED: Role stopped due to BLOCKER error, awaiting repair
- HALTED: Role stopped due to CRITICAL error, BECCA decides
- COMPLETE: Role finished work, handed off to next

---

## UPDATE LOG

| Timestamp | Status | Note |
|-----------|--------|------|
| <iso> | ACTIVE | Role activated |
| <iso> | COMPLETE | Work finished, handed off |
```

---

## Usage

1. Copy this template to `runtime/runs/<run_id>/state/CURRENT_ROLE.md`
2. Fill in all `<PLACEHOLDER>` values
3. Update status when role changes state
4. Add entries to UPDATE LOG for audit trail
