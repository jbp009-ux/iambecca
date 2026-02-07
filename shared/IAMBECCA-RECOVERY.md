# IAMBECCA-RECOVERY v1.0.0
## Recovery Protocol — Deterministic Recovery from Context Loss

**Version:** 1.0.0
**Date:** 2026-02-04
**Purpose:** Define deterministic recovery steps when chat/context fails

---

## Recovery Principle

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   DISK IS TRUTH.                                                │
│                                                                 │
│   If chat dies, recover from:                                   │
│   1. runtime/runs/<run_id>/state/                               │
│   2. Most recent baton packet in inbox/                         │
│   3. RUNBOARD.md pointers                                       │
│                                                                 │
│   NEVER guess. ALWAYS read disk state first.                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Recovery Checklist (Always)

When resuming after context loss, execute this checklist IN ORDER:

```
□ 1. Identify run_id
     Source: RUNBOARD.md or runtime/runs/*/locks/

□ 2. Read CURRENT_ROLE.md
     Path: runtime/runs/<run_id>/state/CURRENT_ROLE.md

□ 3. Read CHAIN_POSITION.md
     Path: runtime/runs/<run_id>/state/CHAIN_POSITION.md

□ 4. Read LAST_HANDOFF.md
     Path: runtime/runs/<run_id>/state/LAST_HANDOFF.md

□ 5. Read EXPECTED_NEXT_ROLE.md
     Path: runtime/runs/<run_id>/state/EXPECTED_NEXT_ROLE.md

□ 6. Open last baton packet
     Path: from LAST_HANDOFF.md → handoff_packet field

□ 7. Confirm target_name matches active project
     If mismatch: BECCA ABORT: target mismatch

□ 8. Resume by activating the expected next role ONLY
     Use activation phrase from EXPECTED_NEXT_ROLE.md
```

---

## Recovery Scenarios

### Scenario 1: Role Forgets Identity Mid-Task

**Symptom:** AI loses track of who it is, outputs wrong role header

**Recovery Action:**
```
1. Read runtime/runs/<run_id>/state/CURRENT_ROLE.md
2. Activate that role explicitly using its activation phrase
3. Role MUST immediately print identity header:
   I_AM_STATE: <state>
   I AM <role>. <motto>
4. If header doesn't match CURRENT_ROLE.md:
   🔑 REJECTED: identity mismatch → return to BECCA
```

### Scenario 2: Context Runs Out Mid-Chain

**Symptom:** Chat ends before chain completes

**Recovery Action:**
```
1. New chat starts
2. Say: "recovery activate" OR read this protocol
3. Execute Recovery Checklist (above)
4. Activate the role listed in EXPECTED_NEXT_ROLE.md
5. That role reads its prompt, becomes that role
6. Continue chain from disk state
```

### Scenario 3: Packet is Corrupted/Incomplete

**Symptom:** Baton packet missing required fields

**Recovery Action:**
```
1. Write ERROR packet to runtime/runs/<run_id>/errors/
   - ERROR_<timestamp>_PACKET_CORRUPT.md
2. Set CURRENT_ROLE.md status to PAUSED
3. Return to BECCA with:
   "BECCA ABORT: corrupted packet — requires repair"
4. Do NOT continue chain until packet is repaired
5. BECCA decides: repair packet OR restart chain step
```

### Scenario 4: Wrong Role Activated

**Symptom:** User or system activates wrong role for chain position

**Recovery Action:**
```
1. Activated role checks EXPECTED_NEXT_ROLE.md
2. If self != expected:
   - Log to errors/ERROR_<timestamp>_WRONG_ROLE.md
   - Say: "BECCA ABORT: wrong role activated"
   - Include: expected vs actual
3. BECCA re-reads CURRENT_ROLE + LAST_HANDOFF
4. BECCA reactivates correct role
```

### Scenario 5: Run State Files Missing

**Symptom:** runtime/runs/<run_id>/state/ directory empty or missing

**Recovery Action:**
```
1. Check inbox/ for most recent baton packet
2. If found:
   - Reconstruct state files from packet metadata
   - Continue with caution flag
3. If not found:
   - BECCA ABORT: unrecoverable — no state or packets
   - Human must decide: restart run or abandon
```

### Scenario 6: Multiple Runs Active (Conflict)

**Symptom:** RUNBOARD shows multiple active runs

**Recovery Action:**
```
1. Read each run's CURRENT_ROLE.md
2. Identify which run matches user's intent
3. PAUSE other runs (set status: PAUSED)
4. Continue only the intended run
5. Log: ERROR_<timestamp>_MULTI_RUN_CONFLICT.md
```

---

## State File Recovery Templates

### Reconstruct CURRENT_ROLE.md from Packet

```markdown
run_id: <from packet>
target_name: <from packet>
active_role_code: <to_role from packet>
active_role_display: <to_role display>
timestamp: <now>
status: ACTIVE
recovery_note: Reconstructed from baton packet <packet_id>
```

### Reconstruct CHAIN_POSITION.md from Packet

```markdown
chain_id: <from packet>
step_index: <next_step from packet>
step_total: <step_total from packet>
current_step_name: <next_role from packet>
recovery_note: Reconstructed from baton packet <packet_id>
```

---

## Recovery Activation Phrase

To explicitly trigger recovery mode:

```
"recovery activate"
```

**Response:**
```
I_AM_STATE: RECOVERY

🔧 RECOVERY MODE activated.

I am the Recovery Protocol.
I will restore chain state from disk.

Executing Recovery Checklist...

[Read and report state files]
[Identify next action]
[Recommend activation phrase]
```

---

## Frozen Rules (Recovery)

| Rule | Enforcement |
|------|-------------|
| Never guess run state | Must read from disk |
| Never skip recovery checklist | Execute all 8 steps |
| Never activate without checking EXPECTED_NEXT_ROLE | Mismatch = ABORT |
| Never continue with corrupted packet | Must repair first |
| Always log recovery to errors/ | Audit trail required |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  IAMBECCA RECOVERY PROTOCOL v1.0.0 — QUICK REFERENCE            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  DISK IS TRUTH. If chat dies:                                   │
│                                                                 │
│  1. Read runtime/runs/<run_id>/state/                           │
│     - CURRENT_ROLE.md                                           │
│     - CHAIN_POSITION.md                                         │
│     - LAST_HANDOFF.md                                           │
│     - EXPECTED_NEXT_ROLE.md                                     │
│                                                                 │
│  2. Verify target_name matches                                  │
│                                                                 │
│  3. Activate EXPECTED_NEXT_ROLE only                            │
│                                                                 │
│  RECOVERY SCENARIOS:                                            │
│  • Identity forgotten → Re-read CURRENT_ROLE, reactivate        │
│  • Context lost → Execute recovery checklist                    │
│  • Packet corrupt → PAUSE + BECCA ABORT                         │
│  • Wrong role → ABORT + BECCA corrects                          │
│                                                                 │
│  TRIGGER: "recovery activate"                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-04
- Initial release
- Recovery principle: disk is truth
- 8-step recovery checklist
- 6 recovery scenarios with actions
- State file reconstruction templates
- Recovery activation phrase
