# BATON PACKET TEMPLATE
## Copy to inbox/<chain>/PKT_<run_id>_<from>_to_<to>_<seq>.md

```markdown
# BATON PACKET

packet_id: PKT_<RUN_ID>_<FROM_ROLE>_to_<TO_ROLE>_<SEQ>
run_id: <RUN_ID>
target_name: <TARGET_PROJECT_NAME>
chain_id: <CHAIN_SA|CHAIN_HM|CHAIN_PM|CHAIN_WORKER>
from_role_code: <FROM_ROLE_CODE>
from_role_display: <FROM_ROLE_DISPLAY>
to_role_code: <TO_ROLE_CODE>
to_role_display: <TO_ROLE_DISPLAY>
timestamp: <ISO_TIMESTAMP>

---

## CHAIN POSITION

step_completed: <X>
step_total: <Y>
next_step: <X+1>
next_role: <NEXT_ROLE_DISPLAY>
next_activation: <ACTIVATION_PHRASE>

---

## PAYLOAD

### From Previous Step

<Findings, data, or context from the sending role>

### Accumulated Chain Data

<Data collected from all previous steps in chain>

---

## REQUIRED FROM NEXT ROLE

What the next role must produce:
1. <requirement 1>
2. <requirement 2>
...

---

## ⚫ ISOLATION CONTEXT (if applicable)

touches_tenant_data: <YES|NO|INHERITED>
isolation_findings: <summary of isolation-related findings from this step | "N/A">
isolation_status: <VERIFIED|PENDING|VIOLATION_FOUND>

---

## STOP CONDITIONS

When the next role should ABORT:
- <condition 1>
- <condition 2>
- ⚫ If isolation_status = VIOLATION_FOUND → BECCA ABORT
...

---

## EVIDENCE ATTACHED

| Type | Path |
|------|------|
| Findings | <path> |
| Report | <path> |
| ... | ... |

---

## VALIDATION CHECKSUM (optional)

required_fields_hash: <MD5 of required fields>
payload_hash: <MD5 of payload>
```

---

## Naming Convention

```
PKT_<run_id>_<from>_to_<to>_<seq>.md

Examples:
PKT_RUN20260204_001_SA-01_to_SA-02_001.md
PKT_RUN20260204_001_SA-05_to_BECCA_001.md
PKT_RUN20260204_001_Oracle_to_Trinity_001.md
```

---

## Destination Paths

| Chain | From | To | Destination |
|-------|------|----|-------------|
| SA | SA-01 | SA-02 | inbox/security-audit/ |
| SA | SA-02 | SA-03 | inbox/security-audit/ |
| SA | SA-05 | BECCA | inbox/becca/ |
| HM | HM-01 | HM-02 | inbox/horsemen/ |
| HM | HM-05 | BECCA | inbox/becca/ |
| PM | Oracle | Trinity | inbox/planning/ |
| PM | Trinity | BECCA | inbox/becca/ |

---

## Usage

1. Copy template to appropriate inbox/
2. Fill all required fields
3. Ensure payload contains everything next role needs
4. Next role validates packet before starting work
