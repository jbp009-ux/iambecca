# IAMBecca Tool Expansion v1.3.0

**Created:** 2026-02-05
**Updated:** 2026-02-05
**Purpose:** Register, wire, and integrate new tools into the IAMBecca ecosystem
**Rule:** Each tool must be added to IAMBECCA-TOOLS.md + affected role prompts updated

---

## Tier 0 — Figma MCP (WIRED 2026-02-05)

### T0-01: Figma Official MCP (Design-to-Code, Read-Only)
- [x] MCP server registered: `claude mcp add --transport http figma-official https://mcp.figma.com/mcp`
- [x] Registered in IAMBECCA-TOOLS.md as D-02 (11 tools: F-01 to F-11)
- [x] Added to permission matrix 3.8 (Niobe ✅, Neo 🔒)
- [x] Bootstrap check updated (10a)
- [x] Niobe role prompt updated with full tool inventory (IM-10 v1.4.0)
- [x] .claude/settings.local.json — 11 `mcp__figma-official__*` permissions added
- [x] **MANUAL:** Complete OAuth authentication flow in browser (first use)
- **Status:** WIRED — OAuth pending first use of Figma Official MCP
- **Roles:** Niobe (IM-10, full), Neo (IM-05, read-only)

### T0-02: Figma Edit MCP (Bidirectional Read/Write)
- [x] MCP server registered: `claude mcp add figma-edit -- bunx claude-talk-to-figma-mcp@latest`
- [x] Bun v1.3.8 installed globally (`npm install -g bun`)
- [x] Registered in IAMBECCA-TOOLS.md as D-03 (55 tools: FE-01 to FE-55)
- [x] Added to permission matrix 3.8 (Niobe ✅)
- [x] Bootstrap check updated (10b, port 3055)
- [x] Niobe role prompt updated with full tool inventory (IM-10 v1.4.0)
- [x] .claude/settings.local.json — 48 `mcp__figma-edit__*` permissions added
- [x] **MANUAL:** Install Figma Desktop app (if not installed)
- [x] **MANUAL:** Import Figma plugin (Plugins → Development → Import manifest.json)
- [x] **MANUAL:** Start plugin in Figma, connect to channel
- [x] **E2E TEST PASSED:** join_channel → get_document_info → create_rectangle (2026-02-05)
- **Status:** VERIFIED — full e2e bidirectional editing confirmed
- **Roles:** Niobe (IM-10)
- **Port:** 3055 (WebSocket relay)

### Environment Notes
- Docker: NOT installed (cc-fig-mcp alternative skipped, using claude-talk-to-figma-mcp instead)
- Node.js: v24.12.0 ✅
- Bun: v1.3.8 ✅
- Figma Desktop: INSTALLED ✅ (plugin imported, e2e verified)

---

## Tier 1 — Wire Immediately (Highest ROI)

### T1-01: Playwright (E2E Browser Automation)
- [x] Register in IAMBECCA-TOOLS.md Section 2.5 (P-01)
- [x] Add to permission matrix 3.5 (Tank ✅, Niobe ✅)
- [x] Add bootstrap check #15
- [x] Update IM-07 Tank prompt — added to 🛠️ TOOLS & CAPABILITIES
- [x] Update IM-10 Niobe prompt — added to 🛠️ TOOLS & CAPABILITIES
- **Why:** Tank needs automated E2E tests, not manual DevTools clicking
- **Roles:** Tank (IM-07 v1.4.0), Niobe (IM-10 v1.3.0)

### T1-02: ESLint + Prettier (Code Quality)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Neo IM-05, Tank IM-07, Ghost Twins IM-12)
- [x] Add bootstrap check
- [x] Update IM-05 Neo prompt — add lint/format to workflow
- [x] Update IM-07 Tank prompt — lint check before test pass
- [x] Update IM-12 Ghost Twins prompt — lint pass as review gate
- **Why:** Code quality enforcement across the ant ecosystem
- **Roles:** Neo (IM-05), Tank (IM-07), Ghost Twins (IM-12)

### T1-03: TypeScript Compiler (`tsc --noEmit`)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Neo IM-05, Tank IM-07)
- [x] Add bootstrap check
- [x] Update IM-05 Neo prompt — type-check as evidence
- [x] Update IM-07 Tank prompt — type-check in test pipeline
- **Why:** Type safety evidence for Ghost Twins to validate
- **Roles:** Neo (IM-05), Tank (IM-07)

### T1-04: npm audit (Dependency Vulnerability Scan)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Seraph IM-08)
- [x] Add bootstrap check
- [x] Update IM-08 Seraph prompt — add npm audit to security workflow
- **Why:** One command, massive security ROI for multi-tenant SaaS
- **Roles:** Seraph (IM-08)

---

## Tier 2 — Wire Next Sprint

### T2-01: Lighthouse CLI (Performance + A11y Audits)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Tank IM-07, Niobe IM-10)
- [x] Add bootstrap check
- [x] Update IM-07 Tank prompt — Lighthouse scores as evidence
- [x] Update IM-10 Niobe prompt — CWV validation
- **Why:** At 100K tenants you need automated CWV scoring. JSON output = machine-gradable evidence
- **Roles:** Tank (IM-07), Niobe (IM-10)

### T2-02: Docker / docker-compose (Container Management)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Link IM-09)
- [x] Add bootstrap check
- [x] Update IM-09 Link prompt — add container ops to infrastructure tools
- **Why:** Multi-tenant isolation at infra level, local dev parity
- **Roles:** Link (IM-09)

### T2-03: gitleaks (Secret Scanner)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Seraph IM-08)
- [x] Add bootstrap check
- [x] Update IM-08 Seraph prompt — add secret scanning to security audit
- **Why:** Multi-tenant SaaS with API keys — secrets in git is top risk
- **Roles:** Seraph (IM-08)

### T2-04: k6 (Load Testing)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Tank IM-07, Link IM-09)
- [x] Add bootstrap check
- [x] Update IM-07 Tank prompt — load test scripts
- [x] Update IM-09 Link prompt — infrastructure load validation
- **Why:** Can't claim 100K scale without load testing proof
- **Roles:** Tank (IM-07), Link (IM-09)

---

## Tier 3 — Wire After Evaluation

### T3-01: Storybook (Component Isolation)
- [x] Register in IAMBECCA-TOOLS.md Section 2.5 Design Tools
- [x] Add to permission matrix (Niobe IM-10, Tank IM-07)
- [x] Update IM-10 Niobe prompt — component stories
- [x] Update IM-07 Tank prompt — visual regression tests
- **Roles:** Niobe (IM-10), Tank (IM-07)

### T3-02: dependency-cruiser (Dependency Graph)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Ghost Twins IM-12, Oracle IM-02)
- [x] Update IM-12 Ghost Twins prompt — circular dep detection
- [x] Update IM-02 Oracle prompt — architecture analysis
- **Roles:** Ghost Twins (IM-12), Oracle (IM-02)

### T3-03: Sentry CLI (Error Monitoring)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Neo IM-05, Link IM-09)
- [x] Update IM-05 Neo prompt — source maps
- [x] Update IM-09 Link prompt — release tracking
- **Roles:** Neo (IM-05), Link (IM-09)

### T3-04: axe-core (Accessibility Testing)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Tank IM-07, Niobe IM-10)
- [x] Update IM-07 Tank prompt — a11y test evidence
- [x] Update IM-10 Niobe prompt — WCAG compliance checks
- **Roles:** Tank (IM-07), Niobe (IM-10)

### T3-05: draw.io Desktop (Architecture Diagrams)
- [x] Register in IAMBECCA-TOOLS.md Section 2.5 Design Tools
- [x] Add to permission matrix (Oracle IM-02, Niobe IM-10)
- [x] Update IM-02 Oracle prompt — architecture diagrams
- [x] Update IM-10 Niobe prompt — wireframe export
- **Roles:** Oracle (IM-02), Niobe (IM-10)

### T3-06: GitHub Actions CLI / `act` (Local CI)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Link IM-09, Tank IM-07)
- [x] Update IM-09 Link prompt — CI pipeline testing
- [x] Update IM-07 Tank prompt — pre-push CI validation
- **Roles:** Link (IM-09), Tank (IM-07)

### T3-07: BigQuery CLI / `bq` (Analytics)
- [x] Register in IAMBECCA-TOOLS.md Section 2.3 CLI Tools
- [x] Add to permission matrix (Apoc IM-11)
- [x] Update IM-11 Apoc prompt — analytics queries
- **Roles:** Apoc (IM-11)

---

## Role Impact Matrix

| Role | New Tools |
|------|-----------|
| Neo (IM-05) | ESLint, Prettier, tsc, Sentry CLI, **Figma Official (read-only)** |
| Morpheus (IM-06) | *(none — diagnostic only)* |
| Tank (IM-07) | Playwright, ESLint, tsc, Lighthouse, k6, Storybook, axe-core, act |
| Seraph (IM-08) | npm audit, gitleaks |
| Link (IM-09) | Docker, k6, Sentry CLI, act |
| Niobe (IM-10) | **Figma Official MCP**, **Figma Edit MCP**, Playwright, Lighthouse, Storybook, axe-core, draw.io |
| Apoc (IM-11) | BigQuery CLI |
| Ghost Twins (IM-12) | ESLint (read-only validation), dependency-cruiser |
| Oracle (IM-02) | dependency-cruiser (read-only), draw.io |
| BECCA (IM-01) | *(none — orchestrates, doesn't execute)* |
| Trinity (IM-03) | *(none — governs, doesn't execute)* |
| Trainman (IM-04) | *(none — routes, doesn't execute)* |
| Sentinels (IM-13) | *(none — advisory only)* |

---

## Progress Tracker

| Task | Status |
|------|--------|
| TODO file created | ✅ |
| IAMBECCA-TOOLS.md updated (all tiers) | ✅ v2.0.0 |
| Role prompts updated (Tier 1) | ✅ Neo, Tank, Seraph |
| Role prompts updated (Tier 2) | ✅ Link, Niobe, Apoc |
| Role prompts updated (Tier 3) | ✅ Oracle, Ghost Twins |
| Version bumps + changelogs | ✅ All 8 roles |
| Verification grep (all roles reference new tools) | ✅ 8/8 files confirmed |
| Figma Official MCP wired | ✅ IAMBECCA-TOOLS v2.1.0 |
| Figma Edit MCP wired | ✅ IAMBECCA-TOOLS v2.1.0 |
| Niobe updated with Figma tools | ✅ IM-10 v1.4.0 |
| Settings permissions for Figma | ✅ 59 permissions added |
| Figma OAuth authenticated | ⬜ MANUAL (first use of Official MCP) |
| Figma Desktop + plugin setup | ✅ Installed + e2e verified |
| Figma Edit MCP e2e test | ✅ join → read → write confirmed |

---

## Changelog

### [1.3.0] 2026-02-05
- **Figma Edit MCP E2E Verified:**
  - Figma Desktop installed, plugin imported and running
  - WebSocket relay on port 3055 confirmed operational
  - MCP server reconfigured: direct server.js (bypasses launcher port conflict)
  - E2E test passed: join_channel → get_document_info → create_rectangle
  - Created "E2E Test Rectangle" (id: 9:3) at (100,100) 200x100 in Figma
  - Bug found: sendErrorResponse in plugin UI missing `type: "message"` (fixed)
  - Bug found: Dev Mode = read-only for design ops (must use Design mode)
  - MCP config: `node C:/Users/Brito/claude-talk-to-figma-mcp/dist/talk_to_figma_mcp/server.js`

### [1.2.0] 2026-02-05
- **Figma MCP Tier 0:** Full wiring of both Figma MCP servers
  - Figma Official MCP (D-02, 11 read-only tools) — registered, permissions set
  - Figma Edit MCP (D-03, 55 read/write tools) — registered, permissions set
  - Bun v1.3.8 installed for Figma Edit MCP transport
  - IAMBECCA-TOOLS.md bumped to v2.1.0
  - Niobe IM-10 bumped to v1.4.0
  - 59 Figma MCP permissions added to settings.local.json
  - Role impact matrix updated for Neo (read-only) and Niobe (full)
  - 3 manual steps remaining: OAuth, Figma Desktop install, plugin import

### [1.1.0] 2026-02-05
- ALL TASKS COMPLETE
- IAMBECCA-TOOLS.md v2.0.0 with 28 bootstrap checks, 9 tool categories
- 8 role prompts updated with version bumps and changelogs
- Verification: 8/8 affected roles confirmed, 5 non-affected roles clean

### [1.0.0] 2026-02-05
- Initial tool expansion plan
- 15 new tools across 3 tiers
- 9 of 13 roles affected
