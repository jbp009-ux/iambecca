# ACTIVE_CHAIN (Runtime State File)
## Template — Copy to runtime/runs/<run_id>/state/ACTIVE_CHAIN.md

```markdown
# ACTIVE_CHAIN

run_id: <RUN_ID>
target_name: <TARGET_PROJECT_NAME>
chain_id: <CHAIN_SA|CHAIN_HM|CHAIN_PM|CHAIN_WORKER>
chain_purpose: <BRIEF_DESCRIPTION>
started_at: <ISO_TIMESTAMP>
started_by: <WHO_INITIATED e.g., BECCA, Human>
status: ACTIVE | PAUSED | HALTED | COMPLETE | ABORTED

---

## CHAIN DEFINITION

(Copy from IAMBECCA-CHAINS.md)

order:
  1. <role 1>
  2. <role 2>
  ...

total_steps: <N>

---

## CHAIN METRICS

| Metric | Value |
|--------|-------|
| Started | <iso> |
| Current Step | <X> of <Y> |
| Time Elapsed | <duration> |
| Errors Encountered | <count> |
| Status | <ACTIVE/PAUSED/etc> |

---

## ABORT INFO (if applicable)

aborted_at: <iso or null>
aborted_by: <role or null>
abort_reason: <reason or null>
error_log: <path or null>
```

---

## Usage

1. Copy this template to `runtime/runs/<run_id>/state/ACTIVE_CHAIN.md`
2. Create when chain starts
3. Update metrics as chain progresses
4. Fill ABORT INFO if chain is aborted
5. Set status to COMPLETE when chain finishes
