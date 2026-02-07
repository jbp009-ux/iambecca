# TASK PACKET

packet_kind: REACTIVATE_ANT

packet_id: PKT_TEST002_halt-debug_BQ_to_ANT-CODER_003
run_id: run_TEST002_halt-debug_2026-02-03_001

target_name: "IAMBECCA | TEST | INTEGRATION | halt-debug | MORPHEUS"

from_role_code: BQ
from_role_display: "Trinity"
from_old_name: "Baby Queen"

to_role_code: ANT-CODER
to_role_display: "Neo"
to_old_name: "Ant Coders"

parent_ant_id: ANT-003
attempt_number: 1

---

## I_AM_STATE: IMPLEMENT

ROLE: Trinity (BQ)
TARGET: IAMBECCA | TEST | INTEGRATION | halt-debug | MORPHEUS
RUN_ID: run_TEST002_halt-debug_2026-02-03_001

---

## REACTIVATION AUTHORIZED

| Attribute | Value |
|-----------|-------|
| Halted Ant | ANT-003 (Neo) |
| Original Halt | TS2307: Cannot find module '@/lib/voiceStorage' |
| Diagnostic | DBG-ANT-003-001.md |
| BACKUP_GATE | BACKUP_GATE_001.md — **PASS** ✅ |
| Attempt | 1 (first reattempt after debugger) |

---

## CONTEXT SUMMARY

- ANT-003 halted due to missing module
- Morpheus diagnosed: file frontend/src/lib/voiceStorage.ts doesn't exist
- BACKUP_GATE_001 passed (safe to proceed)
- ANT-003 now authorized to apply fix instructions

---

## DEBUGGER FINDINGS (from DBG-ANT-003-001.md)

**Root Cause:** Missing Dependency / File Not Found
**Location:** frontend/src/lib/voiceStorage.ts (does not exist)
**Confidence:** HIGH

---

## FIX INSTRUCTIONS FOR ANT-003 (from Morpheus)

The halted Ant (Neo/ANT-003) should:

1. Create the directory `frontend/src/lib/` if it doesn't exist
2. Create the file `frontend/src/lib/voiceStorage.ts`
3. Export function `getVoicePreferences` (reads from localStorage 'sonny_voice_prefs')
4. Export function `saveVoicePreferences` (writes to localStorage 'sonny_voice_prefs')
5. Define TypeScript types for VoicePreferences (enabled, speed, pitch, voice)
6. Run `npm run build` to verify module resolves

---

## VERIFICATION STEPS

After applying the fix:

1. `ls frontend/src/lib/voiceStorage.ts` — file exists
2. File exports both functions
3. `npm run build` — exit code 0
4. VoiceSettingsPanel.tsx:3 — no TS2307 error

---

## INPUTS (paths)

- Halt packet: inbox/bq/PKT_TEST002_ANT-003_HALT.md
- DEBUGGER_REQUEST: inbox/debugger/PKT_TEST002_BQ_to_DEBUGGER_001.md
- Diagnostic: outbox/debugger/DBG-ANT-003-001.md
- BACKUP_GATE: runtime/runs/.../BACKUP_GATE_001.md

---

## BACKUP GATE VERIFICATION

| Check | Status |
|-------|--------|
| BACKUP_GATE_001 exists | ✅ |
| BACKUP_GATE_001 = PASS | ✅ |
| Safe to proceed | ✅ |

**BACKUP_GATE: PASS — Reattempt authorized**

---

## EXPECTED OUTPUTS

After ANT-003 completes reattempt:
- outbox/ants/ANT_REPORT_ANT-003.md
- audit/self_evals/SE_ANT-003.md

---

## STOP CONDITIONS

- If fix doesn't resolve TS2307: HALT again with new evidence
- If additional errors appear: Document and HALT
- After 2 failed reattempts: Escalate to HORSEMEN

---

🔑 APPROVED: REACTIVATE ANT-003 with diagnostic guidance

---

NEXT: Neo (ANT-003) to apply fix instructions and reattempt task
