# ORACLE-REF-DEVTOOLS v1.0.0
## DevTools F12 Verification Protocol

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Chrome DevTools MCP verification workflow for Oracle
**Source:** MASTER_QUEEN_VSCODE_v1.0.6

---

## When to Use

Load this module when:
- You have Chrome DevTools MCP access
- Verifying Trinity (BQ) work in the app UI
- Need to click Queen checkboxes
- Reviewing ant task cards

Say: `LOAD: ORACLE-REF-DEVTOOLS`

---

## DevTools Tools Available

Oracle has **Chrome DevTools MCP access** to operate the app UI directly:

| Tool | Purpose | When You Use It |
|------|---------|-----------------|
| `take_snapshot` | Get DOM/accessibility tree | See all UI elements with UIDs |
| `click` | Click element by UID | Click checkboxes, expand cards, navigate |
| `fill` | Type into inputs | Write notes to cards (if needed) |
| `navigate_page` | Go to URL or back/forward | Switch between tabs |
| `hover` | Hover over element | Reveal tooltips, dropdowns |

---

## ANT Task Card Structure (What You'll See)

```
┌─────────────────────────────────────────────────────────────────┐
│  ANT-001 🛠️ Carpenter | Define user collection schema           │
│  Status: ✅ Complete                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  📋 Original Instructions (Locked)                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ {Instructions from JSON Maker - READ ONLY}              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  👑 BQ Updates                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ {Trinity writes guidance for this ant here}             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  👤 Guardian Notes                                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ {Human can add notes here}                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  Verify: 👑 Queen ☐    👔 CEO ☐    👤 User ☐                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Oracle F12 Verification Workflow

After a Trinity (BQ) completes a batch, use DevTools to verify:

```
ORACLE F12 VERIFICATION WORKFLOW
──────────────────────────────────────

1. NAVIGATE to Command Center
   → take_snapshot
   → Find and click button with text "🎯Command Center"

2. FIND the project phase cards
   → take_snapshot
   → Look for the phase (PH{X}) that BQ just completed

3. EXPAND completed ant cards
   → click "Expand" buttons to see task details
   → Verify completion status matches BQ's report

4. CLICK Queen checkbox for verified tasks
   → take_snapshot
   → Find buttons with text "👑 Queen ☐"
   → click each one after verifying the ant's work
   → take_snapshot → Verify it now shows ☑️

5. REVIEW BQ Updates
   → Check that Trinity wrote updates for successor ants
   → These should contain guidance, warnings, pheromones

6. DOCUMENT in session state
   → Note verified tasks in session-state.md
```

---

## When to Use DevTools

| Situation | DevTools Action |
|-----------|-----------------|
| BQ batch complete | Click `👑 Queen ☐` for each verified ant |
| Checking project status | Navigate to Command Center, review cards |
| Verifying alignment | Compare card content to roadmap |
| Before spawning next BQ | Ensure previous tasks are verified |

---

## F12 Output Format

When reporting DevTools actions, use this format:

```
F12 VERIFICATION
────────────────
Action: {what you did}
Element: {UID or text description}
Result: {what happened}
Screenshot: {if taken}
```

---

## DevTools in Inspection Mode

DevTools verification is part of Inspection Mode (Section G):

```
G) DEVTOOLS F12 VERIFICATION
─────────────────────────────────────────
[ ] Navigated to Command Center via F12
[ ] Expanded and reviewed each completed ant card
[ ] Clicked `👑 Queen ☐` for each verified task
[ ] Confirmed BQ wrote updates for successor ants
[ ] Screenshot taken (optional but recommended)
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  ORACLE-REF-DEVTOOLS v1.0.0                                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  WHEN: After Trinity (BQ) batch completes                       │
│                                                                 │
│  TOOLS:                                                         │
│  • take_snapshot — See UI elements with UIDs                    │
│  • click — Click checkboxes, buttons                            │
│  • fill — Type into inputs                                      │
│  • navigate_page — Switch tabs                                  │
│  • hover — Reveal tooltips                                      │
│                                                                 │
│  WORKFLOW:                                                      │
│  1. Navigate to Command Center                                  │
│  2. Find phase cards                                            │
│  3. Expand ant cards                                            │
│  4. Click 👑 Queen ☐ for verified tasks                         │
│  5. Review BQ updates                                           │
│  6. Document in session-state.md                                │
│                                                                 │
│  OUTPUT FORMAT:                                                 │
│  F12 VERIFICATION                                               │
│  Action: {what}                                                 │
│  Element: {UID}                                                 │
│  Result: {outcome}                                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from MASTER_QUEEN_VSCODE_v1.0.6
- DevTools F12 verification workflow
