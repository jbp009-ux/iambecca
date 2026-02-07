# RUN_LOCK.json Template v1.0.0

**Purpose:** Concurrency safety for IAMBecca runs
**Location:** `runtime/runs/<run_id>/RUN_LOCK.json`
**Created by:** Source (BECCA) during P0_INVENTORY

---

## Schema (ENFORCED)

```json
{
  "status": "LOCKED",
  "target_name": "IAMBECCA | <CLIENT_ID> | <PROJECT_TYPE> | <PROJECT_SLUG> | <MATRIX_CODENAME>",
  "run_id": "run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>",
  "lock_owner": "run_<CLIENT>_<slug>_<YYYY-MM-DD>_<seq>",
  "lock_time": "<ISO 8601 timestamp>",
  "lock_reason": "P0_INVENTORY initialization",
  "release_conditions": [
    "state == COMPLETE",
    "manual override by BECCA"
  ]
}
```

---

## Field Definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | YES | `LOCKED` or `RELEASED` |
| `target_name` | string | YES | Full IAMBecca target string |
| `run_id` | string | YES | Run identifier |
| `lock_owner` | string | YES | Who holds the lock (usually same as run_id) |
| `lock_time` | string | YES | ISO 8601 timestamp when lock acquired |
| `lock_reason` | string | YES | Why lock was acquired |
| `release_conditions` | array | YES | Conditions for lock release |

---

## Example (Filled)

```json
{
  "status": "LOCKED",
  "target_name": "IAMBECCA | TEST001 | GOVERNANCE | iambecca-test-run | NEO",
  "run_id": "run_TEST001_iambecca-test-run_2026-02-02_001",
  "lock_owner": "run_TEST001_iambecca-test-run_2026-02-02_001",
  "lock_time": "2026-02-02T12:00:00Z",
  "lock_reason": "P0_INVENTORY initialization",
  "release_conditions": [
    "state == COMPLETE",
    "manual override by BECCA"
  ]
}
```

---

## Lock States

| Status | Meaning | Who Can Release |
|--------|---------|-----------------|
| `LOCKED` | Run in progress, no concurrent runs allowed | BECCA only |
| `RELEASED` | Run complete or manually released | N/A |

---

## Validation Rules

1. **Only one lock per project**: If `RUN_LOCK.json` exists with `status: LOCKED`, P0_INVENTORY must STOP
2. **Lock owner must match run_id**: Prevents orphan locks
3. **Release conditions must be met**: BECCA checks before releasing
4. **Lock time must be ISO 8601**: For sorting and debugging

---

## Release Protocol

When run completes (VERIFICATION state):

```json
{
  "status": "RELEASED",
  "target_name": "...",
  "run_id": "...",
  "lock_owner": "...",
  "lock_time": "2026-02-02T12:00:00Z",
  "lock_reason": "P0_INVENTORY initialization",
  "release_conditions": ["state == COMPLETE", "manual override by BECCA"],
  "released_at": "2026-02-02T14:30:00Z",
  "released_by": "BECCA (VERIFICATION)",
  "final_status": "COMPLETE"
}
```

---

## Changelog

### [1.0.0] 2026-02-02
- Initial release
- Schema defined
- Validation rules established
