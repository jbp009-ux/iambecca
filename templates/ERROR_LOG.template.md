# ERROR LOG TEMPLATE
## Copy to runtime/runs/<run_id>/errors/ERROR_<timestamp>_<role_code>.md

```markdown
# ERROR LOG

error_id: ERROR_<YYYYMMDD>_<HHMMSS>_<ROLE_CODE>
run_id: <RUN_ID>
target_name: <TARGET_PROJECT_NAME>
chain_id: <CHAIN_ID or "none">
role_code: <ROLE_CODE>
role_display: <ROLE_DISPLAY>
timestamp: <ISO_TIMESTAMP>
category: RECOVERABLE | BLOCKER | CRITICAL
error_code: <E001-E010 or custom>

---

## WHAT FAILED

<Clear description of the failure>

---

## EVIDENCE CHECKED

Files/paths examined before determining error:
- <path 1>
- <path 2>
- ...

---

## WHAT WAS ATTEMPTED

Actions taken before failure:
1. <action 1>
2. <action 2>
...

---

## ROOT CAUSE (if known)

<Why this happened, if determinable>

---

## RETRY TRACKING (if applicable)

attempt: <N> of 3
previous_attempts:
  - attempt 1: <what was tried> → <result>
  - attempt 2: <what was tried> → <result>
retry_limit_exceeded: true | false

---

## RECOMMENDED NEXT ACTION

<What should happen to resolve this>

Options:
- [ ] Repair and retry
- [ ] Skip this step
- [ ] Abort chain
- [ ] Escalate to human

---

## ESCALATION

handled_by: SELF | BECCA | HUMAN
escalated_at: <iso or null>
escalation_reason: <reason or null>

---

## RESOLUTION (filled after resolved)

resolved_at: <iso or null>
resolved_by: <who or null>
resolution: <what was done or null>
```

---

## Error Codes Reference

| Code | Meaning |
|------|---------|
| E001 | Packet validation failed |
| E002 | Identity mismatch |
| E003 | Target mismatch |
| E004 | Chain position mismatch |
| E005 | Evidence file not found |
| E006 | Retry limit exceeded |
| E007 | Security critical finding |
| E008 | State file missing |
| E009 | Wrong role activated |
| E010 | Corrupted packet |

---

## Usage

1. Copy template to `runtime/runs/<run_id>/errors/`
2. Name: `ERROR_<YYYYMMDD>_<HHMMSS>_<ROLE_CODE>.md`
3. Fill all sections
4. Update RESOLUTION section when fixed
