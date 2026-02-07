# ORACLE-REF-INSPECTION-MODE v1.0.0
## Full Inspection Mode Checklist

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Full inspection checklist for verifying Trinity (BQ) batch completion
**Source:** MASTER_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- Trinity (BQ) completes a batch (up to 5 Ants)
- You need the full inspection checklist
- Verifying protocol compliance

Say: `LOAD: ORACLE-REF-INSPECTION-MODE`

---

## Inspection Checklist (Full)

After EVERY Trinity batch, you MUST run inspection:

```
INSPECTION REPORT: QIN-BQ-{##}-PH{X}-BATCH-{###}
═══════════════════════════════════════════════

A) PROTOCOL COMPLIANCE
──────────────────────
[ ] STATE lines present in all Ant messages
[ ] One gate per message honored
[ ] D0 Ghost Index Pre-Discovery performed
[ ] Budget Ledger included in discovery
[ ] SNAPSHOT format correct
[ ] Token echo rule followed
[ ] Two-Strike Rule followed

B) VS CODE EDITION COMPLIANCE
─────────────────────────────
[ ] Ants filed reports to raw-reports/inbox/
[ ] Reports use ANT-{N}-RAW.md naming
[ ] Reports have canonical headers

C) EVIDENCE VERIFICATION
────────────────────────
[ ] All claims backed by actual output
[ ] Build success shown (not claimed)
[ ] No hallucinated outputs
[ ] Backups verified before work began

D) ANT TYPE DISTRIBUTION
────────────────────────
🔥 Fire: {count}
🛠️ Carpenter: {count}
🎯 Scout: {count}
🔧 Mechanic: {count}
🏗️ Builder: {count}
📦 Carrier: {count}
📝 Scribe: {count}
🛡️ Guardian: {count}
🐛 Debugger: {count}
{...other types...}

E) CRITICAL SURFACE CHECK
─────────────────────────
[ ] No CRITICAL surfaces touched without override
[ ] Override properly documented if issued

F) PHEROMONES TO EMIT
─────────────────────
🔴 CRITICAL: {list any blocking issues}
🟠 HIGH_RISK: {list any risky patterns}
🟡 MEDIUM: {list any cautions}

G) DEVTOOLS F12 VERIFICATION
─────────────────────────────────────────
[ ] Navigated to Command Center via F12
[ ] Expanded and reviewed each completed ant card
[ ] Clicked `👑 Queen ☐` for each verified task
[ ] Confirmed BQ wrote updates for successor ants
[ ] Screenshot taken (optional but recommended)

H) VERDICT
──────────
[ ] PASS — All checks satisfied, work accepted
[ ] PARTIAL — Some issues, work accepted with notes
[ ] FAIL — Critical issues, repair tickets required

REPAIR TICKETS (if FAIL):
- {ticket description}
```

---

## Protocol v2.3.8 Enforcement Rules

Oracle ensures all Trinity (BQ) enforce these rules on their Ants:

| Rule | What Must Be Enforced |
|------|----------------------|
| STATE Line Prefix | Every Ant response begins with `STATE: {current_gate}` |
| One Gate Per Message | Ants may NOT combine multiple gates |
| Token Echo | Ants must echo received tokens with source reference |
| No Hallucinated Outputs | Ants may only report what they actually executed |
| D0 Ghost Index Check | Ants must run pre-discovery index scan |
| Budget Ledger | Ants must track files/lines read in discovery |
| Two-Strike Rule | Stop after two failed patch attempts |
| Safe Edit Pattern | Create `.new` file → `test -s` → `mv` |

---

## Ant Type Risk Profile

| Type | Risk | Inspection Focus |
|------|------|------------------|
| 🔥 Fire | HIGH | Auth, rules, encryption, secrets handling |
| 🛡️ Guardian | MEDIUM | Guard logic completeness, edge cases |
| 🛠️ Carpenter | STANDARD | Component structure, patterns |
| 🏗️ Builder | STANDARD | Infrastructure correctness |
| 📦 Carrier | STANDARD | Data handling safety, no PII leaks |
| 🔬 Researcher | LOW | Read-only verification |
| 🎯 Scout | LOW | Read-only, minimal risk |
| 🌿 Leafcutter | LOW | Accuracy, no stale info |
| 📝 Scribe | LOW | Documentation accuracy |
| 🧹 Cleaner | MEDIUM | No unintended deletions |
| 🔧 Mechanic | MEDIUM | Fix doesn't introduce new bugs |
| 👁️ Watcher | LOW | Logging correctness |
| 🐛 Debugger | LOW | Evidence quality, no fixes |

**Batches with 🔥 Fire type require extra inspection scrutiny.**

---

## Inspection Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  POST-BATCH INSPECTION FLOW                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Trinity (BQ) completes batch (up to 5 Ants)                 │
│        ↓                                                        │
│  2. Oracle runs INSPECTION MODE                                 │
│     • Check A: Protocol compliance                              │
│     • Check B: VS Code compliance                               │
│     • Check C: Evidence verification                            │
│     • Check D: Ant type distribution                            │
│     • Check E: Critical surface check                           │
│     • Check F: Emit pheromones                                  │
│     • Check G: DevTools F12 verification                        │
│        ↓                                                        │
│  3. Issue VERDICT                                               │
│     ┌─────────────────────────────────────┐                     │
│     │ PASS → Proceed to Alignment Gate    │                     │
│     │ PARTIAL → Document, proceed         │                     │
│     │ FAIL → Create repair tickets        │                     │
│     └─────────────────────────────────────┘                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  ORACLE-REF-INSPECTION-MODE v1.0.0                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  WHEN: After every Trinity (BQ) batch completes                 │
│                                                                 │
│  CHECKLIST SECTIONS:                                            │
│  A) Protocol compliance                                         │
│  B) VS Code edition compliance                                  │
│  C) Evidence verification                                       │
│  D) Ant type distribution                                       │
│  E) Critical surface check                                      │
│  F) Pheromones to emit                                          │
│  G) DevTools F12 verification                                   │
│  H) Verdict                                                     │
│                                                                 │
│  VERDICTS:                                                      │
│  • PASS — Work accepted                                         │
│  • PARTIAL — Accepted with notes                                │
│  • FAIL — Repair tickets required                               │
│                                                                 │
│  NEXT STEP: After PASS → Run Alignment Gate                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from MASTER_QUEEN_VSCODE_v1.0.6
- Full inspection checklist with all 8 sections
