# PMX-SHARED-GATES v1.0.0
## State Machine & STOP Rules for Colony OS

**Version:** 1.0.0
**Date:** 2026-01-30
**Purpose:** Universal state machine and halt conditions
**Scope:** Identical across all projects

---

## State Machine

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   COLONY OS STATE MACHINE                                       │
│                                                                 │
│   DISCOVERY ──► FOOTPRINT ──► PATCH ──► VERIFY ──► REPORT       │
│       │             │           │          │          │         │
│       └─────────────┴───────────┴──────────┴──────────┘         │
│                            │                                    │
│                            ▼                                    │
│                          STOP                                   │
│                  (can occur at any point)                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## State Definitions

| State | Purpose | Entry Condition | Exit Condition |
|-------|---------|-----------------|----------------|
| **DISCOVERY** | Understand current state | Task received | Evidence gathered |
| **FOOTPRINT** | Plan the change | Discovery complete | Plan approved |
| **PATCH** | Make the change | Footprint approved | Changes applied |
| **VERIFY** | Confirm it works | Patch complete | Tests pass |
| **REPORT** | Document results | Verify complete | Report filed |
| **STOP** | Halt execution | Blocker encountered | Guardian resolves |

---

## State Transitions

### DISCOVERY → FOOTPRINT
**Requires:** Evidence of current behavior collected
**Output:** Analysis summary with file locations identified

### FOOTPRINT → PATCH
**Requires:** `FOOTPRINT APPROVED` from Guardian
**Output:** Detailed plan with exact changes proposed

### PATCH → VERIFY
**Requires:** `PATCH APPROVED` from Guardian
**Output:** Files modified, diffs shown

### VERIFY → REPORT
**Requires:** Tests pass, behavior confirmed
**Output:** Verification evidence (test output, screenshots)

### Any → STOP
**Requires:** Any STOP trigger (see below)
**Output:** Clear statement of blocker + what's needed to continue

---

## STOP Triggers (Immediate Halt)

### 🔴 Permission Blockers
- WRITE requested without `PATCH APPROVED`
- EXECUTE requested without `EXECUTE APPROVED`
- DEPLOY requested without `DEPLOY APPROVED`
- DELETE requested without `DELETE APPROVED`

### 🔴 Evidence Blockers
- Missing required file/module/context
- Cannot reproduce reported behavior
- Evidence contradicts stated plan
- Unverifiable claim encountered

### 🔴 Safety Blockers
- Test failures after patch
- Security rule violation detected
- Tenant isolation breach possible
- Data loss risk identified

### 🔴 Scope Blockers
- Task requires work outside assigned scope
- Conflicting requirements discovered
- Dependency on unfinished work
- Architecture change needed (not approved)

---

## STOP Format

When stopping, use this exact format:

```markdown
STATE: STOP

## Blocker
{One sentence description of what's blocking}

## Type
{Permission | Evidence | Safety | Scope}

## Evidence
{What you found that caused the stop}

## To Continue
{Exactly what's needed from Guardian to proceed}

## Options
1. {Option A}
2. {Option B}
3. {Abandon this direction}
```

---

## Approval Tokens

| Token | Grants Permission To |
|-------|---------------------|
| `FOOTPRINT APPROVED` | Proceed from DISCOVERY to FOOTPRINT |
| `PATCH APPROVED` | Modify files |
| `EXECUTE APPROVED` | Run commands (build, test, etc.) |
| `DEPLOY APPROVED` | Deploy to environment |
| `DELETE APPROVED` | Delete files or data |
| `SCOPE EXPANSION APPROVED` | Work outside original scope |

**Token Rules:**
- Tokens must come from Guardian (human)
- Tokens are single-use (request again for new action)
- If token not present: STOP and request it

---

## Gate Checkpoints

### Before FOOTPRINT
```
[ ] Current behavior documented with evidence
[ ] Files involved identified
[ ] No blockers encountered
```

### Before PATCH
```
[ ] FOOTPRINT APPROVED received
[ ] Exact changes specified
[ ] Rollback plan exists
[ ] No conflicting work in progress
```

### Before VERIFY
```
[ ] PATCH APPROVED received (or was already given)
[ ] All changes applied
[ ] Diffs documented
```

### Before REPORT
```
[ ] Tests pass (if applicable)
[ ] Behavior change confirmed
[ ] No regressions detected
[ ] Evidence collected
```

---

## Recovery from STOP

| STOP Type | Recovery Action |
|-----------|----------------|
| Permission | Guardian provides approval token |
| Evidence | Guardian provides missing context |
| Safety | Guardian approves risk or provides alternative |
| Scope | Guardian expands scope or reassigns task |

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-GATES v1.0.0 — QUICK REFERENCE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  STATE FLOW:                                                    │
│  DISCOVERY → FOOTPRINT → PATCH → VERIFY → REPORT                │
│            ↓ (approval)  ↓ (approval)                           │
│                                                                 │
│  STOP TRIGGERS:                                                 │
│  • Permission: Missing approval token                           │
│  • Evidence: Missing context, can't reproduce                   │
│  • Safety: Tests fail, security risk, data risk                 │
│  • Scope: Outside assigned work                                 │
│                                                                 │
│  APPROVAL TOKENS:                                               │
│  FOOTPRINT APPROVED | PATCH APPROVED | EXECUTE APPROVED         │
│  DEPLOY APPROVED | DELETE APPROVED | SCOPE EXPANSION APPROVED   │
│                                                                 │
│  STOP IS NOT FAILURE. STOP IS SAFETY.                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-01-30
- Initial release
- State machine defined
- STOP triggers enumerated
- Approval tokens listed
- Gate checkpoints added
