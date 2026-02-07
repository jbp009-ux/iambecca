# LAST_HANDOFF (Runtime State File)
## Template — Copy to runtime/runs/<run_id>/state/LAST_HANDOFF.md

```markdown
# LAST_HANDOFF

run_id: <RUN_ID>
from_role_code: <ROLE_CODE e.g., SA-01>
from_role_display: <ROLE_DISPLAY e.g., Data Leaks>
to_role_code: <ROLE_CODE e.g., SA-02>
to_role_display: <ROLE_DISPLAY e.g., Tenant Isolation>
handoff_packet: <PATH_TO_BATON_PACKET>
timestamp: <ISO_TIMESTAMP>

---

## HANDOFF DETAILS

**Reason for handoff:** <why the previous role finished>

**Data passed:**
- <list key data items passed in packet>

**Expected action from next role:**
- <what the next role should do>

---

## HANDOFF HISTORY

| # | From | To | Packet | Timestamp |
|---|------|----|--------|-----------|
| 1 | BECCA | SA-01 | inbox/security-audit/SECURITY_AUDIT_REQUEST_xxx.md | <iso> |
| 2 | SA-01 | SA-02 | inbox/security-audit/PKT_xxx_SA-01_to_SA-02_001.md | <iso> |
| ... | ... | ... | ... | ... |
```

---

## Usage

1. Copy this template to `runtime/runs/<run_id>/state/LAST_HANDOFF.md`
2. Update on EVERY handoff between roles
3. Previous entry moves to HANDOFF HISTORY table
4. handoff_packet path is critical for recovery
