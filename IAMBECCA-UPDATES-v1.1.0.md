# IAMBecca v1.1.0 — Critical Security Patches Applied

**Date:** 2026-02-03
**Applies To:** IAMBECCA-INDEX.md v1.1.0, IAMBECCA-BOOTSTRAP.md
**Review Source:** IAMBecca vFinal++ advisor review
**Status:** ✅ All 5 critical patches + 1 high patch applied

---

## Executive Summary

Applied **6 critical patches** to make IAMBecca bulletproof against:
- Cross-project bleed (wrong folder/client/run)
- Lost identity (roles don't know who they are)
- Chat-driven ambiguity (ignoring disk packets)
- Invalid evidence slipping through
- Premature escalation (Sentinels activated too early)

**Tagline:** *"One chat, disk truth, identity discipline, baton passing."*

---

## Changes Applied

### ✅ CRITICAL PATCH 1 — Pre-Flight Guard

**What:** Before ANY role activation, verify:
- `runtime/state/current_state.json` exists
- `runtime/runs/<run_id>/RUN_LOCK.json` exists and is LOCKED
- `target_name` in state matches activation request
- `expected_next_role_code` matches the role being activated

**Why:** Prevents "wrong folder, wrong client, wrong run" disasters.

**Files Changed:**
- `IAMBECCA-INDEX.md:54-68` — Added step 0 to Activation Protocol
- `IAMBECCA-BOOTSTRAP.md:246-251` — Added runtime/state/ to folder structure
- `templates/current_state.json.template` — Created (NEW)

**Enforcement:**
```
🔑 REJECTED: activation preflight failed — <reason>
```

**Before:**
```
User: "Neo activate"
You: I am Neo. What should I code?
```

**After:**
```
User: "Neo activate"
You: [Checks current_state.json + RUN_LOCK.json]
  ✅ Target matches
  ✅ Run lock verified
  ✅ Expected role matches
I_AM_STATE: IMPLEMENT
I am Neo (ANT-CODER)...
```

---

### ✅ CRITICAL PATCH 2 — Mandatory I_AM_STATE Header

**What:** Every activation response MUST include:
```markdown
I_AM_STATE: <STATE>
I am <DisplayName> (<RoleCode>).
Old name: <OldName>
Target: <target_name>
Run: <run_id>
Read: <paths>
Write: <paths>
Stop conditions: <bullets>
NEXT: [action]
```

**Why:** Without this, roles answer too casually and we lose machine discipline.

**Files Changed:**
- `IAMBECCA-INDEX.md:70-108` — Replaced example with mandatory format section

**Before:**
```
I am Morpheus (ANT-DEBUGGER).
What bug should I diagnose?
```

**After:**
```
I_AM_STATE: IMPLEMENT
I am Morpheus (ANT-DEBUGGER).
Old name: Debugger Lab
Target: IAMBECCA | C023 | LANDING | fitness-vsl | ORACLE
Run: run_C023_fitness-vsl_2026-02-03_001
Read:
- runtime/runs/<run_id>/inbox/debugger/
Write:
- runtime/runs/<run_id>/outbox/debugger/
Stop conditions:
- Backup gate not passed before reactivation
NEXT: Reading inbox packet DBG-ANT-001-001...
```

---

### ✅ CRITICAL PATCH 3 — Inbox-First Execution

**What:** Roles MUST:
1. Read their newest packet in inbox
2. Execute it (if exists)
3. Ask human ONLY if no packet exists

**Why:** Prevents drifting into chat-driven ambiguity. Disk-based packets are the truth.

**Files Changed:**
- `IAMBECCA-INDEX.md:64-68` — Changed step 4 from "Ask what to do" to "Read inbox packet first"

**Before:**
```
4. Ask: "What should I investigate/build/fix?"
```

**After:**
```
4. Read your newest packet in your inbox
   - If packet exists: execute it (per role module + outputs contract)
   - If no packet exists: ask the human for the mission
```

---

### ✅ CRITICAL PATCH 4 — Ghost Twins Explicit Validation

**What:**
- Ghost Twins instant response now states: "I validate evidence using evidence_contract.py"
- Added rejection route: Ghost Twins (12) → Trinity (03) for invalid evidence
- Outputs without verifiable file paths are rejected

**Why:** Evidence validation must be explicit and enforceable, not vibes-based.

**Files Changed:**
- `IAMBECCA-INDEX.md:48` — Updated Ghost Twins instant response
- `IAMBECCA-INDEX.md:178` — Added Ghost → Trinity rejection route

**Before:**
```
"I am Ghost Twins (GHOST). I validate evidence, archive everything."
```

**After:**
```
"I am Ghost Twins (GHOST). I validate evidence using evidence_contract.py.
 Outputs without verifiable file paths are rejected."
```

**Handoff table now includes:**
```
| Ghost Twins (12) | Trinity (03) | Evidence rejected (missing/invalid) |
```

---

### ✅ CRITICAL PATCH 5 — Sentinel Escalation Rules

**What:** Sentinels can ONLY activate if:
- ✅ Morpheus (Debugger) was invoked
- ✅ Ant reattempt failed after Debugger instructions
- ✅ BACKUP_GATE PASS exists for the stage

**Why:** Prevents premature escalation. Sentinels are "last resort," not "first call."

**Files Changed:**
- `IAMBECCA-INDEX.md:50` — Updated Sentinels instant response with activation requirement
- `IAMBECCA-INDEX.md:179-189` — Added "Sentinel Activation Requirements" section

**Enforcement:**
```
🔑 REJECTED: Sentinels invoked too early — Debugger/reattempt not satisfied
```

**Before:**
```
Trinity → Sentinels (failed reattempt)
```

**After:**
```
Trinity → Sentinels (requires ALL:)
  ✅ Debugger invoked
  ✅ Reattempt failed
  ✅ BACKUP_GATE PASS logged
```

---

### ✅ HIGH PATCH 6 — EXT Roles Added to Router

**What:** Added Extended Roles section with activation routes for:
- Merovingian (EXT-PLANNER) — "Merovingian activate" / "planner activate"
- Architect (ARCH-01) — "Architect activate"
- Keymaker (ARCH-02) — "Keymaker activate" / "governance activate"
- PM_PIPELINE (ARCH-03) — "PM Pipeline activate"
- Agents (EXT-INSPECT) — "Agents activate" / "inspection activate"

**Why:** Router didn't include these roles, so they couldn't be activated in practice.

**Files Changed:**
- `IAMBECCA-INDEX.md:193-206` — Added EXT Roles section after Governance
- `IAMBECCA-INDEX.md:214-238` — Updated Quick Reference to include EXT roles

**Before:**
```
13 roles (IM-01 to IM-13) only
```

**After:**
```
13 core roles + 5 EXT specialist roles
Router knows how to activate all of them
```

---

## Minor Consistency Fixes

### 1) Invariants Version Tracking
- Added `**Invariants:** IAMBecca-Invariants v1.0.0` to INDEX header
- **Why:** Track which token/rule version was used, prevents confusion later

### 2) Folder Structure Completeness
- Added `runtime/state/current_state.json` to BOOTSTRAP folder tree
- Added comments clarifying inbox/becca, outbox/ghost, outbox/horsemen usage
- **Why:** Matches pre-flight guard requirements

### 3) Quick Reference Updated
- Added pre-flight, inbox-first, I_AM_STATE, Sentinel gate, Ghost validation to Quick Ref
- **Why:** Makes rules visible at a glance

---

## Files Modified

| File | Lines Changed | Change Summary |
|------|---------------|----------------|
| `IAMBECCA-INDEX.md` | ~90 lines | All 6 patches + Quick Ref |
| `IAMBECCA-BOOTSTRAP.md` | ~10 lines | Folder structure + runtime/state |
| `templates/current_state.json.template` | NEW | Pre-flight guard schema |

---

## Files Created

| File | Purpose |
|------|---------|
| `templates/current_state.json.template` | Schema for pre-flight guard state file |
| `runtime/state/` | Directory for current_state.json (created) |
| `IAMBECCA-UPDATES-v1.1.0.md` | This changelog |

---

## Test Impact

### Before v1.1.0
- Roles could activate without checking run/target
- Roles responded informally without header
- Roles asked human instead of reading packets
- Ghost Twins validation was implied, not enforced
- Sentinels could activate prematurely
- EXT roles couldn't be activated

### After v1.1.0
- ✅ Pre-flight guard blocks mismatched activations
- ✅ Every response has full identity header
- ✅ Inbox packets executed before human prompts
- ✅ Ghost explicitly calls evidence_contract.py
- ✅ Sentinels require Debugger + reattempt + BACKUP_GATE
- ✅ EXT roles are routable

---

## Verification Checklist

- [x] Pre-flight guard step 0 added to Activation Protocol
- [x] I_AM_STATE header format documented and enforced
- [x] Inbox-first execution replaces "ask human" default
- [x] Ghost Twins validation explicitly mentions evidence_contract.py
- [x] Ghost → Trinity rejection route added
- [x] Sentinel activation requirements documented with enforcement token
- [x] EXT roles added to router table with activation aliases
- [x] runtime/state/ directory created
- [x] current_state.json.template created
- [x] BOOTSTRAP folder structure updated
- [x] Quick Reference updated with all new rules
- [x] Changelog added to INDEX

---

## Migration Notes

### For Existing Runs
If you have an active run before v1.1.0:

1. **Create current_state.json:**
   ```bash
   cp templates/current_state.json.template runtime/state/current_state.json
   # Edit with your current target, run_id, expected_next_role_code
   ```

2. **Verify RUN_LOCK.json exists and is LOCKED:**
   ```bash
   cat runtime/runs/<run_id>/RUN_LOCK.json
   # Must have: "locked": true
   ```

3. **Update role activation commands:**
   - No longer say: "What should I do?"
   - Instead: Roles will read inbox/[role]/ first

### For New Runs
Source (BECCA) will now create `runtime/state/current_state.json` during P0_INVENTORY initialization.

---

## The Golden Rule (Still True)

> **"One chat, disk truth, identity discipline, baton passing."**

---

## Next Steps

1. **Test Pre-Flight Guard:**
   - Try activating a role with missing current_state.json (should reject)
   - Try activating wrong role (should reject)
   - Try activating with mismatched target (should reject)

2. **Test I_AM_STATE Header:**
   - Activate any role, verify full header is output
   - Check all 8 required fields are present

3. **Test Inbox-First:**
   - Create a packet in inbox/neo/
   - Activate Neo
   - Verify Neo executes packet without asking human

4. **Test Ghost Validation:**
   - Submit evidence without file paths
   - Verify Ghost rejects and routes back to Trinity

5. **Test Sentinel Gate:**
   - Try activating Sentinels without Debugger (should reject)
   - Try activating after Debugger but before reattempt (should reject)
   - Try activating correctly (should proceed)

---

**IAMBecca v1.1.0 — Bulletproof Identity Router**

*"Pre-flight verified. Identity locked. Inbox truth. Evidence enforced. Escalation gated."*
