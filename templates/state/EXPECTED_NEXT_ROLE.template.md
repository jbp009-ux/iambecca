# EXPECTED_NEXT_ROLE (Runtime State File)
## Template — Copy to runtime/runs/<run_id>/state/EXPECTED_NEXT_ROLE.md

```markdown
# EXPECTED_NEXT_ROLE

run_id: <RUN_ID>
chain_id: <CHAIN_SA|CHAIN_HM|CHAIN_PM|CHAIN_WORKER>
expected_next_role_code: <ROLE_CODE e.g., SA-02, IM-01>
expected_next_role_display: <ROLE_DISPLAY e.g., Tenant Isolation, BECCA>
next_activation_phrase: <ACTIVATION_PHRASE e.g., "tenant isolation activate">
timestamp: <ISO_TIMESTAMP>

---

## VALIDATION RULE

When a role is activated, it MUST check:

1. Read this file
2. Compare self to expected_next_role_code
3. If mismatch:
   - Log ERROR to errors/
   - BECCA ABORT: wrong role activated
   - Expected: <expected> / Actual: <self>

---

## CHAIN SEQUENCE (for reference)

### CHAIN_SA
| Current | Expected Next | Activation Phrase |
|---------|---------------|-------------------|
| SA-01 | SA-02 | "tenant isolation activate" |
| SA-02 | SA-03 | "auth secrets activate" |
| SA-03 | SA-04 | "owasp activate" |
| SA-04 | SA-05 | "security verdict activate" |
| SA-05 | IM-01 (BECCA) | "BECCA activate" |

### CHAIN_HM
| Current | Expected Next | Activation Phrase |
|---------|---------------|-------------------|
| HM-01 | HM-02 | "hm-02 activate" |
| HM-02 | HM-03 | "hm-03 activate" |
| HM-03 | HM-04 | "hm-04 activate" |
| HM-04 | HM-05 | "hm-05 activate" |
| HM-05 | IM-01 (BECCA) | "BECCA activate" |
```

---

## Usage

1. Copy this template to `runtime/runs/<run_id>/state/EXPECTED_NEXT_ROLE.md`
2. Update when current role completes and hands off
3. Critical for recovery — determines who should run next
4. Used for validation when next role activates
