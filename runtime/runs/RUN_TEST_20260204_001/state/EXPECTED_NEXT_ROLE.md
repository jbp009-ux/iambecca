# EXPECTED_NEXT_ROLE

run_id: RUN_TEST_20260204_001
chain_id: CHAIN_SA
expected_next_role_code: SA-03
expected_next_role_display: Auth & Secrets
next_activation_phrase: "auth secrets activate"
timestamp: 2026-02-04T15:30:00Z

---

## VALIDATION RULE

When SA-03 is activated, it MUST check:

1. Read this file
2. Compare self to expected_next_role_code (SA-03)
3. If mismatch:
   - Log ERROR to errors/
   - BECCA ABORT: wrong role activated
   - Expected: SA-03 / Actual: <self>

---

## CHAIN SEQUENCE (CHAIN_SA)

| Current | Expected Next | Activation Phrase |
|---------|---------------|-------------------|
| SA-01 | SA-02 | "tenant isolation activate" | ✅ DONE
| SA-02 | SA-03 | "auth secrets activate" | ◄ CURRENT
| SA-03 | SA-04 | "owasp activate" |
| SA-04 | SA-05 | "security verdict activate" |
| SA-05 | IM-01 (BECCA) | "BECCA activate" |
