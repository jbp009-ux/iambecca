# PMX-SHARED-DEVTOOLS v1.0.0
## Chrome DevTools Integration (F12 Access)

**Version:** 1.0.0
**Date:** 2026-02-03
**Purpose:** Browser debugging and visual evidence capture
**Scope:** Identical across all projects
**Source:** Extracted from CODER_ANT_VSCODE_v1.3.9

---

## Overview

This workspace has Chrome DevTools MCP enabled. Ants can see browser console errors, network requests, and DOM elements in real-time.

---

## Setup (Required Each Session)

1. **Kill existing Chrome and start with debug port:**
   ```powershell
   powershell -Command "Stop-Process -Name chrome -Force -ErrorAction SilentlyContinue; Start-Sleep -Seconds 3; Start-Process 'C:\Program Files\Google\Chrome\Application\chrome.exe' -ArgumentList '--remote-debugging-port=9222','--user-data-dir=C:\ChromeDebug'"
   ```
2. **Start dev server:** `npm run dev`
3. **Navigate to** `http://localhost:5173` (or your dev URL) in the debug Chrome window

---

## Available Tools

| Tool | Purpose |
|------|---------|
| `mcp__chrome-devtools__take_screenshot` | See current page visually |
| `mcp__chrome-devtools__take_snapshot` | Get DOM/accessibility tree |
| `mcp__chrome-devtools__list_console_messages` | View console logs/errors |
| `mcp__chrome-devtools__list_network_requests` | See API calls |
| `mcp__chrome-devtools__click` | Click elements by uid |
| `mcp__chrome-devtools__fill` | Type into inputs |
| `mcp__chrome-devtools__hover` | Hover over elements |
| `mcp__chrome-devtools__press_key` | Press keyboard keys |
| `mcp__chrome-devtools__navigate_page` | Navigate to URL |
| `mcp__chrome-devtools__evaluate_script` | Run JavaScript |

---

## Common Patterns

### Check for Console Errors
```javascript
// Filter for errors and warnings only
mcp__chrome-devtools__list_console_messages({ types: ["error", "warn"] })
```

### Take Screenshot for Evidence
```javascript
mcp__chrome-devtools__take_screenshot({ fullPage: true })
```

### Get Page Structure
```javascript
mcp__chrome-devtools__take_snapshot({ verbose: false })
```

### Check Network Requests
```javascript
mcp__chrome-devtools__list_network_requests({ resourceTypes: ["fetch", "xhr"] })
```

---

## Evidence Bundle (Required for UI Work)

When working on UI bugs or changes, capture:

```
[ ] Console errors/warnings (from list_console_messages)
[ ] Network requests + status codes (if API-related)
[ ] Screenshot (before AND after for changes)
[ ] DOM snapshot (if structure matters)
```

---

## Debugger Ant Protocol (Test Runner Access)

When a bug is reported or a fix is made, Debugger Ants run tests to verify behavior.

### Available Test Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm run test:rules:emu` | **PRIMARY** — Auto-start emulator, run tests, shutdown | Default for all test runs |
| `npm run test:rules` | Run tests only (no emulator management) | Only if emulator already running |
| `npm run build` | Verify no build/type errors | Before every patch |
| `npm run lint` | Check code style | After fixes |

### Debugger Ant Workflow

1. **Gather evidence** — Use DevTools (console + network + screenshot) to capture symptoms
2. **Run build** — `npm run build` to verify no compile errors
3. **Run tests** — `npm run test:rules:emu` (one command, deterministic)
4. **Emit TEST REPORT** — Structured output with pass/fail and warnings
5. **Hand off** — Activate appropriate Ant (Carpenter for fix, Scout for investigation)

**STOP CONDITION:** Debugger Ants **NEVER fix code**. If a fix is needed, STOP and hand off with TEST REPORT + evidence. One ant, one job.

### Understanding Test Output

- `PERMISSION_DENIED` warnings during "MUST FAIL" tests = **expected** (rules correctly blocked)
- Actual failure = "MUST FAIL" test succeeds OR "MUST PASS" test fails

### Test Report Format

```
TEST REPORT
───────────
Trigger: {bug description or PR verification}
Commands run:
  • npm run build → {PASS|FAIL}
  • npm run test:rules:emu → {PASS|FAIL}
Result: ✅ PASS | ❌ FAIL | ⚠️ PARTIAL

Passed: {N} tests
Failed: {N} tests
Warnings: {any PERMISSION_DENIED during MUST FAIL = expected}
Errors:
  • {test name}: {error message}

Recommendation: {next action}
```

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│  PMX-SHARED-DEVTOOLS v1.0.0 — QUICK REFERENCE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SETUP:                                                         │
│  1. Kill Chrome, start with --remote-debugging-port=9222        │
│  2. Start dev server (npm run dev)                              │
│  3. Navigate to localhost in debug Chrome                       │
│                                                                 │
│  KEY TOOLS:                                                     │
│  • take_screenshot — Visual evidence                            │
│  • take_snapshot — DOM/a11y tree                                │
│  • list_console_messages — Errors/warnings                      │
│  • list_network_requests — API calls                            │
│                                                                 │
│  EVIDENCE BUNDLE:                                               │
│  Console + Network + Screenshot + Snapshot                      │
│                                                                 │
│  TEST COMMANDS:                                                 │
│  • npm run build — Verify compile                               │
│  • npm run test:rules:emu — Run security tests                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-03
- Initial release
- Extracted from CODER_ANT_VSCODE_v1.3.9
- Chrome DevTools setup and tools
- Evidence bundle requirements
- Debugger Ant test protocol
- Test Report format
