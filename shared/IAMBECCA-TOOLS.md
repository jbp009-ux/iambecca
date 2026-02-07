# IAMBECCA-TOOLS v2.2.0

**Purpose:** Centralized tool registry, role-to-tool mapping, permission model, environment bootstrap
**Scope:** Loaded with ALL IAMBecca roles
**Source:** Consolidated from role files + Sonny toolbox canonicalization + tool expansion v1.0.0

---

## 1) Core Doctrine

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   TOOL AUTHORITY RULE: A role may ONLY use tools listed in its row.         │
│                                                                             │
│   If a tool is marked ❌ for your role, you MUST NOT call it.               │
│   If a tool is marked 🔒 for your role, you may call it read-only.         │
│   If a tool is marked ✅ for your role, full access.                        │
│                                                                             │
│   Violation = 🔑 REJECTED by Ghost Twins.                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2) Tool Categories

### 2.1 Core Platform Tools (Claude Code / VS Code)

| ID | Tool | Description |
|----|------|-------------|
| T-01 | **Read** | Read files from filesystem |
| T-02 | **Edit** | Surgical string replacement in files |
| T-03 | **Write** | Create new files (prefer Edit for existing) |
| T-04 | **Glob** | Find files by pattern |
| T-05 | **Grep** | Search file contents by regex |
| T-06 | **Bash** | Execute shell commands |
| T-07 | **Task** | Launch subagent for parallel work |
| T-08 | **WebSearch** | Search the web |
| T-09 | **WebFetch** | Fetch and analyze URL content |

### 2.2 Chrome DevTools MCP

| ID | Tool | Description |
|----|------|-------------|
| M-01 | `navigate_page` | Navigate browser to URL |
| M-02 | `take_snapshot` | Get page accessibility tree |
| M-03 | `take_screenshot` | Capture visual evidence |
| M-04 | `click` | Click element by uid |
| M-05 | `fill` | Fill form input by uid |
| M-06 | `hover` | Hover over element |
| M-07 | `evaluate_script` | Run JS in browser context |
| M-08 | `list_console_messages` | Read browser console |
| M-09 | `list_network_requests` | Inspect network traffic |
| M-10 | `emulate` | Emulate viewport/dark mode/network |
| M-11 | `press_key` | Simulate keyboard input |

### 2.3 CLI Tools — Core (via Bash)

| ID | Tool | Description |
|----|------|-------------|
| C-01 | `npm` | Package management, scripts |
| C-02 | `git` | Version control |
| C-03 | `firebase` | Firebase CLI (deploy, emulators, logs) |
| C-04 | `cloudflared` | Cloudflare tunnel management |
| C-05 | `node` | Run Node.js scripts |

### 2.4 CLI Tools — Quality & Build (via Bash)

| ID | Tool | Command | Description |
|----|------|---------|-------------|
| Q-01 | **ESLint** | `npx eslint .` | Lint JavaScript/TypeScript — find code errors and style violations |
| Q-02 | **Prettier** | `npx prettier --check .` | Code formatting enforcement — consistent style across codebase |
| Q-03 | **TypeScript** | `tsc --noEmit` | Type-check without emitting — proves type safety as evidence |
| Q-04 | **dependency-cruiser** | `npx depcruise src --output-type err` | Dependency graph analysis — detect circular deps, enforce module boundaries |

### 2.5 CLI Tools — Testing & Performance (via Bash)

| ID | Tool | Command | Description |
|----|------|---------|-------------|
| P-01 | **Playwright** | `npx playwright test` | E2E browser automation — cross-browser test suites with screenshot evidence |
| P-02 | **Lighthouse CLI** | `npx lighthouse <url> --output json` | Performance + accessibility + SEO audit — CWV scores as machine-gradable evidence |
| P-03 | **k6** | `k6 run loadtest.js` | Load testing — throughput/latency/error rate at scale. Proves 100K capacity |
| P-04 | **axe-core** | `npx @axe-core/cli <url>` | Accessibility testing — WCAG compliance with machine-readable violations |
| P-05 | **Storybook** | `npx storybook dev` / `build` | Component isolation — visual regression testing, design system documentation |

### 2.6 CLI Tools — Security (via Bash)

| ID | Tool | Command | Description |
|----|------|---------|-------------|
| X-01 | **npm audit** | `npm audit --json` | Dependency vulnerability scan — CVE detection in dependency tree |
| X-02 | **gitleaks** | `gitleaks detect --source . --report-format json` | Secret scanner — detect API keys, tokens, passwords in git history |

### 2.7 CLI Tools — Infrastructure & Observability (via Bash)

| ID | Tool | Command | Description |
|----|------|---------|-------------|
| I-01 | **Docker** | `docker` / `docker compose` | Container management — multi-tenant isolation at infra level |
| I-02 | **act** | `act -l` / `act push` | Local GitHub Actions runner — test CI pipelines before pushing |
| I-03 | **Sentry CLI** | `sentry-cli releases` | Error monitoring — release tracking, source maps, issue linking |
| I-04 | **BigQuery CLI** | `bq query --format=json` | Analytics queries — large-scale data analysis for tenant metrics |

### 2.8 Design & Wireframing Tools (Environment-Dependent)

| ID | Tool | Description | Wired By Default? |
|----|------|-------------|-------------------|
| D-01 | Pencil Project | Desktop wireframing, mockups | NO — requires install |
| D-02 | Figma Official MCP (read-only) | Design-to-code: read designs, extract specs, variables, screenshots | YES — `figma-official` HTTP MCP |
| D-03 | Figma Edit MCP (read/write) | Bidirectional: create shapes, modify layers, text, colors, layout | YES — E2E verified 2026-02-05 (requires Figma Desktop + plugin + relay) |
| D-04 | Penpot | Self-hosted design (candidate) | NO — not yet evaluated |
| D-05 | draw.io Desktop | Architecture diagrams, flow charts | NO — requires install |

#### D-02: Figma Official MCP — Tool Inventory (Read-Only)

| ID | Tool | Description |
|----|------|-------------|
| F-01 | `get_design_context` | Retrieve design context for a layer/selection; outputs React+Tailwind, Vue, HTML/CSS, or iOS code |
| F-02 | `get_variable_defs` | Return variables and styles (colors, spacing, typography) used in a selection |
| F-03 | `get_code_connect_map` | Retrieve mappings between Figma node IDs and codebase components |
| F-04 | `add_code_connect_map` | Establish mapping between a Figma node ID and its code component |
| F-05 | `get_screenshot` | Capture visual screenshot of a selection |
| F-06 | `create_design_system_rules` | Generate rule files for agents translating designs to code |
| F-07 | `get_metadata` | Return sparse XML with layer IDs, names, types, positions, sizes |
| F-08 | `get_figjam` | Convert FigJam diagrams to XML format with metadata |
| F-09 | `whoami` | Return authenticated user identity |
| F-10 | `get_code_connect_suggestions` | Detect and propose component mappings |
| F-11 | `send_code_connect_mappings` | Confirm Code Connect mappings |

**Server:** `figma-official` (HTTP transport → `https://mcp.figma.com/mcp`)
**Auth:** OAuth — browser flow on first use
**Setup:** `claude mcp add --transport http figma-official https://mcp.figma.com/mcp`

#### D-03: Figma Edit MCP — Tool Inventory (Read/Write, Bidirectional)

**Document & Selection Tools:**

| ID | Tool | Description |
|----|------|-------------|
| FE-01 | `join_channel` | Connect to Figma plugin via WebSocket channel |
| FE-02 | `get_document_info` | Get document name, pages, component lists |
| FE-03 | `get_selection` | Get currently selected nodes in Figma |
| FE-04 | `get_node_info` | Get detailed info for a specific node |
| FE-05 | `get_nodes_info` | Batch get info for multiple nodes |
| FE-06 | `get_styles` | Get all styles in the document |
| FE-07 | `get_pages` | List all pages in the file |
| FE-08 | `export_node_as_image` | Export a node as PNG/SVG/JPG/PDF |

**Creation Tools:**

| ID | Tool | Description |
|----|------|-------------|
| FE-10 | `create_rectangle` | Create a rectangle with position, size, color |
| FE-11 | `create_frame` | Create a frame (container) with layout properties |
| FE-12 | `create_text` | Create a text node with content and styling |
| FE-13 | `create_ellipse` | Create a circle/ellipse |
| FE-14 | `create_polygon` | Create a polygon shape |
| FE-15 | `create_star` | Create a star shape |
| FE-16 | `create_page` | Create a new page in the file |
| FE-17 | `clone_node` | Duplicate an existing node |
| FE-18 | `group_nodes` | Group multiple nodes together |
| FE-18b | `ungroup_nodes` | Ungroup a group or frame back to individual nodes |
| FE-19 | `create_component_instance` | Instantiate a component from the library |

**Modification Tools:**

| ID | Tool | Description |
|----|------|-------------|
| FE-20 | `set_fill_color` | Set fill color on a node (RGBA) |
| FE-21 | `set_stroke_color` | Set stroke/border color |
| FE-22 | `move_node` | Reposition a node (x, y) |
| FE-23 | `resize_node` | Resize a node (width, height) |
| FE-24 | `delete_node` | Delete a node from the canvas |
| FE-25 | `set_corner_radius` | Set border radius |
| FE-26 | `set_auto_layout` | Apply or modify auto layout properties |
| FE-27 | `set_effects` | Apply shadows, blurs, and other effects |
| FE-27b | `set_effect_style_id` | Apply a saved effect style to a node |
| FE-28 | `rename_node` | Rename a node |
| FE-29 | `insert_child` | Insert a node as a child of another |
| FE-29b | `flatten_node` | Flatten node (boolean ops or convert to path) |

**Text Manipulation Tools:**

| ID | Tool | Description |
|----|------|-------------|
| FE-30 | `set_text_content` | Set text content of a text node |
| FE-31 | `set_multiple_text_contents` | Batch update multiple text nodes |
| FE-32 | `set_font_name` | Set font family |
| FE-33 | `set_font_size` | Set font size |
| FE-34 | `set_font_weight` | Set font weight (bold, regular, etc.) |
| FE-35 | `set_letter_spacing` | Set letter spacing |
| FE-36 | `set_line_height` | Set line height |
| FE-37 | `set_paragraph_spacing` | Set paragraph spacing |
| FE-38 | `set_text_case` | Set text case (upper, lower, title) |
| FE-39 | `set_text_decoration` | Set underline, strikethrough |
| FE-40 | `get_styled_text_segments` | Get rich text segments with individual styles |
| FE-41 | `load_font_async` | Pre-load a font before applying (REQUIRED before font changes) |
| FE-42 | `set_text_style_id` | Apply a text style from the design system |

**Component & Page Tools:**

| ID | Tool | Description |
|----|------|-------------|
| FE-50 | `get_local_components` | List all local components |
| FE-51 | `get_remote_components` | List team/library components |
| FE-52 | `set_current_page` | Switch to a different page |
| FE-53 | `rename_page` | Rename a page |
| FE-54 | `delete_page` | Delete a page |
| FE-55 | `scan_text_nodes` | Find all text nodes in selection/page |
| FE-56 | `create_component_from_node` | Convert existing node into a reusable component |
| FE-57 | `create_component_set` | Create component set (variants) from multiple components |

**Server:** `figma-edit` (stdio transport → `node C:/Users/Brito/claude-talk-to-figma-mcp/dist/talk_to_figma_mcp/server.js`)
**Status:** E2E VERIFIED 2026-02-05 (join_channel → get_document_info → create_rectangle → export confirmed)
**Requires:**
1. Figma Desktop app running (Design mode, NOT Dev Mode — Dev Mode is read-only)
2. WebSocket relay on port 3055 (started separately: `bun src/socket.ts` from repo)
3. Figma plugin imported (Plugins → Development → Import manifest.json)
4. Plugin connected to a channel ID (regenerates each reconnect — get fresh ID from plugin UI)
**Setup:** `claude mcp add figma-edit -- node C:/Users/Brito/claude-talk-to-figma-mcp/dist/talk_to_figma_mcp/server.js`
**Known Issues:**
- Do NOT use `bunx claude-talk-to-figma-mcp@latest` — it tries to start a second relay on port 3055 and fails
- Figma must be in Design mode (Shift+D) — Dev Mode = read-only for design API operations
- Channel ID regenerates on each plugin reconnect — always get fresh ID from plugin UI

### 2.9 Specialized Tools (Project-Dependent)

| ID | Tool | Description | Wired By Default? |
|----|------|-------------|-------------------|
| S-01 | `firestore-introspect` | Read-only Firestore schema inspection | NO — requires `tools/firestore-introspect.cjs` |
| S-02 | `evidence_contract.py` | Validate evidence per scoring rubric | NO — requires `becca-kernel/orchestrator/tools/` |

---

## 3) Role-to-Tool Permission Matrix

### 3.1 Core Platform Tools

| Role | Code | Read | Edit | Write | Glob | Grep | Bash |
|------|------|------|------|-------|------|------|------|
| BECCA | IM-01 | ✅ | ❌ | ✅¹ | ✅ | ✅ | 🔒 |
| Oracle | IM-02 | ✅ | ❌ | ✅¹ | ✅ | ✅ | ❌ |
| Trinity | IM-03 | ✅ | ❌ | ✅¹ | ✅ | ✅ | ❌ |
| Trainman | IM-04 | ✅ | ❌ | ✅¹ | ✅ | ✅ | ❌ |
| Neo | IM-05 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Morpheus | IM-06 | ✅ | ❌ | ✅¹ | ✅ | ✅ | 🔒 |
| Tank | IM-07 | ✅ | ✅² | ✅² | ✅ | ✅ | ✅³ |
| Seraph | IM-08 | ✅ | ✅⁴ | ✅⁴ | ✅ | ✅ | 🔒 |
| Link | IM-09 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Niobe | IM-10 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Apoc | IM-11 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ghost Twins | IM-12 | ✅ | ❌ | ✅¹ | ✅ | ✅ | 🔒 |
| Sentinels | IM-13 | ✅ | ❌ | ✅¹ | ✅ | ✅ | ❌ |

**Footnotes:**
- ¹ Write for reports/packets only, NOT code files
- ² Test files only (`**/*.test.ts`, `**/*.spec.ts`)
- ³ Test commands only (`npm test`, `npm run test:*`)
- ⁴ Security patches only, with approval

### 3.2 Chrome DevTools MCP

| Role | Code | navigate | snapshot | screenshot | click | fill | evaluate | console | network | emulate |
|------|------|----------|----------|------------|-------|------|----------|---------|---------|---------|
| Neo | IM-05 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Niobe | IM-10 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| All others | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

### 3.3 CLI Tools — Core

| Role | Code | npm | git | firebase | cloudflared | node |
|------|------|-----|-----|----------|-------------|------|
| Neo | IM-05 | ✅ | ✅ | ❌ | ❌ | ✅ |
| Tank | IM-07 | ✅³ | 🔒 | ❌ | ❌ | ✅ |
| Link | IM-09 | ✅ | ✅ | ✅ | ✅ | ✅ |
| Niobe | IM-10 | ✅ | ✅ | ❌ | ❌ | ✅ |
| Apoc | IM-11 | ✅ | ✅ | ✅⁵ | ❌ | ✅ |
| All others | — | ❌ | ❌ | ❌ | ❌ | ❌ |

**Footnotes:**
- ³ Test commands only
- ⁵ Data operations only (export/import)

### 3.4 Quality & Build Tools

| Role | Code | ESLint | Prettier | tsc | dep-cruise |
|------|------|--------|----------|-----|------------|
| Neo | IM-05 | ✅ | ✅ | ✅ | 🔒 |
| Tank | IM-07 | ✅⁶ | ✅⁶ | ✅⁶ | ❌ |
| Ghost Twins | IM-12 | 🔒⁷ | 🔒⁷ | 🔒⁷ | 🔒 |
| Oracle | IM-02 | ❌ | ❌ | ❌ | 🔒⁸ |
| All others | — | ❌ | ❌ | ❌ | ❌ |

**Footnotes:**
- ⁶ Run only, not configure (Tank runs `npx eslint`, does not edit `.eslintrc`)
- ⁷ Read-only validation: Ghost Twins run checks to verify pass/fail, never fix
- ⁸ Oracle may read dependency graphs for architecture analysis, not modify

### 3.5 Testing & Performance Tools

| Role | Code | Playwright | Lighthouse | k6 | axe-core | Storybook |
|------|------|------------|------------|-----|----------|-----------|
| Tank | IM-07 | ✅ | ✅ | ✅ | ✅ | ✅⁹ |
| Niobe | IM-10 | ✅ | ✅ | ❌ | ✅ | ✅ |
| Link | IM-09 | ❌ | ❌ | ✅¹⁰ | ❌ | ❌ |
| All others | — | ❌ | ❌ | ❌ | ❌ | ❌ |

**Footnotes:**
- ⁹ Tank runs Storybook tests (`test-storybook`), does not create stories
- ¹⁰ Link runs k6 for infrastructure load validation only

### 3.6 Security Tools

| Role | Code | npm audit | gitleaks |
|------|------|-----------|----------|
| Seraph | IM-08 | ✅ | ✅ |
| All others | — | ❌ | ❌ |

### 3.7 Infrastructure & Observability Tools

| Role | Code | Docker | act | Sentry CLI | BigQuery |
|------|------|--------|-----|------------|----------|
| Link | IM-09 | ✅ | ✅ | ✅ | ❌ |
| Neo | IM-05 | ❌ | ❌ | ✅¹¹ | ❌ |
| Apoc | IM-11 | ❌ | ❌ | ❌ | ✅ |
| Tank | IM-07 | ❌ | ✅¹² | ❌ | ❌ |
| All others | — | ❌ | ❌ | ❌ | ❌ |

**Footnotes:**
- ¹¹ Neo uses Sentry CLI for source map uploads only
- ¹² Tank uses `act` for pre-push CI validation only

### 3.8 Design & Wireframing Tools

| Role | Code | Pencil | Figma Official (read) | Figma Edit (r/w) | Penpot | draw.io | Storybook |
|------|------|--------|-----------------------|------------------|--------|---------|-----------|
| Niobe | IM-10 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Neo | IM-05 | ❌ | 🔒¹³ | ❌ | ❌ | ❌ | ❌ |
| Oracle | IM-02 | ❌ | ❌ | ❌ | ❌ | 🔒¹⁴ | ❌ |
| All others | — | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Footnotes:**
- ¹³ Neo may read Figma design specs to guide implementation, not edit designs
- ¹⁴ Oracle may view architecture diagrams for planning, not create/edit

---

## 4) Permission Model

### 4.1 Access Levels

| Symbol | Level | Meaning |
|--------|-------|---------|
| ✅ | Full | Unrestricted use within role scope |
| 🔒 | Read-Only | May read/inspect but not modify/execute destructively |
| ❌ | Forbidden | MUST NOT use — violation = 🔑 REJECTED |

### 4.2 Enforcement

```
WHO ENFORCES:
├── Self-enforcement: Each role checks its own permission row
├── Ghost Twins (IM-12): Validates tool usage in ANT_REPORT evidence
├── Trinity (IM-03): Monitors Ant tool scope per task assignment
└── BECCA (IM-01): Final authority on tool access disputes

VIOLATION CONSEQUENCE:
├── First offense: 🔑 REJECTED + resubmit with compliant tool usage
├── Repeated: Escalate to Guardian
└── If tool violation caused data damage: BECCA ABORT
```

### 4.3 Role-Specific Restrictions (Critical)

| Role | Restriction | Rationale |
|------|------------|-----------|
| Morpheus (IM-06) | ❌ Edit, ❌ code writing via Write | Diagnoses only, never fixes |
| Sentinels (IM-13) | ❌ Edit, ❌ code writing via Write | Advisory only, produces instructions |
| Ghost Twins (IM-12) | ❌ Edit | Reviews only, never modifies reviewed code |
| Oracle (IM-02) | ❌ Bash, ❌ Edit | Plans only, never executes |
| Trinity (IM-03) | ❌ Bash, ❌ Edit | Governs only, never executes |
| Trainman (IM-04) | ❌ Bash, ❌ Edit | Routes only, never executes |

---

## 5) Environment Bootstrap Protocol

When deploying IAMBecca workers to a project, verify the environment:

### 5.1 Required Capabilities (Must Pass)

| # | Check | Verification Command | Expected |
|---|-------|---------------------|----------|
| 1 | Filesystem read/write | Read + Write a temp file | Success |
| 2 | Shell execution | `Get-Location` (Win) or `pwd` (Unix) | Returns path |
| 3 | Git available | `git --version` | Version string |
| 4 | Node.js available | `node --version` | v18+ |

### 5.2 Optional Capabilities (Verify if Needed)

| # | Check | Verification Command | Required By |
|---|-------|---------------------|-------------|
| 5 | npm available | `npm --version` | Neo, Tank, Link, Niobe, Apoc |
| 6 | Firebase CLI | `firebase --version` | Link |
| 7 | Cloudflare CLI | `cloudflared --version` | Link |
| 8 | Chrome DevTools MCP | `take_snapshot` returns tree | Neo, Niobe |
| 9 | Web access | `WebFetch` on known URL | Research tasks |
| 10a | Figma Official MCP | `claude mcp list` shows `figma-official: ✓ Connected` | Niobe (design-to-code) |
| 10b | Figma Edit MCP | `Test-NetConnection 127.0.0.1 -Port 3055` + `claude mcp list` shows `figma-edit: ✓ Connected` | Niobe (design editing) |
| 11 | Pencil Project | Check install path exists | Niobe (wireframes) |
| 12 | ESLint | `npx eslint --version` | Neo, Tank, Ghost Twins |
| 13 | Prettier | `npx prettier --version` | Neo, Tank, Ghost Twins |
| 14 | TypeScript | `npx tsc --version` | Neo, Tank |
| 15 | Playwright | `npx playwright --version` | Tank, Niobe |
| 16 | Lighthouse CLI | `npx lighthouse --version` | Tank, Niobe |
| 17 | npm audit | `npm audit --json` (built into npm) | Seraph |
| 18 | gitleaks | `gitleaks version` | Seraph |
| 19 | k6 | `k6 version` | Tank, Link |
| 20 | Docker | `docker --version` | Link |
| 21 | docker compose | `docker compose version` | Link |
| 22 | act | `act --version` | Link, Tank |
| 23 | Sentry CLI | `sentry-cli --version` | Neo, Link |
| 24 | axe-core | `npx @axe-core/cli --version` | Tank, Niobe |
| 25 | dependency-cruiser | `npx depcruise --version` | Ghost Twins, Oracle |
| 26 | Storybook | `npx storybook --version` | Niobe, Tank |
| 27 | draw.io Desktop | Check install path exists | Niobe, Oracle |
| 28 | BigQuery CLI | `bq version` | Apoc |

### 5.3 Bootstrap Output

After verification, each deployment should produce:

```markdown
## TOOLBOX VERIFICATION — <project_name>

### Required
| # | Capability | Status | Notes |
|---|-----------|--------|-------|
| 1 | Filesystem | ✅ WIRED / ❌ FAIL | |
| 2 | Shell | ✅ WIRED / ❌ FAIL | |
| 3 | Git | ✅ WIRED / ❌ FAIL | |
| 4 | Node.js | ✅ WIRED / ❌ FAIL | v<version> |

### Optional — Core CLI
| # | Capability | Status | Notes |
|---|-----------|--------|-------|
| 5 | npm | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 6 | Firebase CLI | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 7 | Cloudflare CLI | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 8 | Chrome DevTools | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 9 | Web access | ✅ WIRED / ❌ FAIL / ⬜ N/A | |

### Optional — Quality & Build
| # | Capability | Status | Notes |
|---|-----------|--------|-------|
| 12 | ESLint | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 13 | Prettier | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 14 | TypeScript | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 25 | dependency-cruiser | ✅ WIRED / ❌ FAIL / ⬜ N/A | |

### Optional — Testing & Performance
| # | Capability | Status | Notes |
|---|-----------|--------|-------|
| 15 | Playwright | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 16 | Lighthouse CLI | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 19 | k6 | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 24 | axe-core | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 26 | Storybook | ✅ WIRED / ❌ FAIL / ⬜ N/A | |

### Optional — Security
| # | Capability | Status | Notes |
|---|-----------|--------|-------|
| 17 | npm audit | ✅ WIRED / ❌ FAIL / ⬜ N/A | (built into npm) |
| 18 | gitleaks | ✅ WIRED / ❌ FAIL / ⬜ N/A | |

### Optional — Infrastructure & Observability
| # | Capability | Status | Notes |
|---|-----------|--------|-------|
| 20 | Docker | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 21 | docker compose | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 22 | act | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 23 | Sentry CLI | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 28 | BigQuery CLI | ✅ WIRED / ❌ FAIL / ⬜ N/A | |

### Optional — Design
| # | Capability | Status | Notes |
|---|-----------|--------|-------|
| 10a | Figma Official MCP (read-only) | ✅ WIRED / ❌ FAIL / ⬜ N/A | OAuth auth required |
| 10b | Figma Edit MCP (read/write) | ✅ WIRED / ❌ FAIL / ⬜ N/A | Needs Figma Desktop + plugin + relay |
| 11 | Pencil | ✅ WIRED / ❌ FAIL / ⬜ N/A | |
| 27 | draw.io | ✅ WIRED / ❌ FAIL / ⬜ N/A | |

Environment verified: <timestamp>
```

---

## 6) Project-Specific Tool Contracts

Some projects define their own tool contracts (e.g., AI function-calling tools, API endpoints). These are NOT part of IAMBecca — they live in the project.

### 6.1 Contract-Only Tools (Not Runtime-Wired)

Projects may define interface contracts that describe tool behavior without runtime wiring:

```
<project>/functions/src/contracts/   ← Tool contract definitions
<project>/functions/docs/            ← Tool documentation
```

These are reference material for roles, not callable tools. Roles should:
- **Read** contracts to understand available project capabilities
- **NOT** assume contracts are runtime-wired unless verified
- **Check** project's own toolbox verification for wired status

### 6.2 Evaluation Harnesses

Projects may include offline evaluation harnesses for testing tool behavior:

```
<project>/functions/eval/   ← Offline simulation harnesses
```

These simulate tool behavior without production calls.

---

## 7) Tool Registration Protocol

When adding a new tool to IAMBecca:

### 7.1 Steps

1. **Assign ID** — Next available in category (T-XX, M-XX, C-XX, Q-XX, P-XX, X-XX, I-XX, D-XX, S-XX)
2. **Add to Category Table** (Section 2) — Tool name, description, wired status
3. **Add to Permission Matrix** (Section 3) — Which roles can use it
4. **Add Bootstrap Check** (Section 5) — Verification command
5. **Update role files** — Add to `🛠️ TOOLS & CAPABILITIES` section in affected roles
6. **Update changelog** — Document the addition

### 7.2 Tool Removal

1. Mark as DEPRECATED in category table
2. Remove from permission matrix after migration period
3. Update affected role files
4. Document in changelog

### 7.3 ID Prefix Guide

| Prefix | Category | Example |
|--------|----------|---------|
| T- | Core platform (Claude Code) | T-01 Read |
| M- | Chrome DevTools MCP | M-01 navigate_page |
| C- | CLI core (npm, git, firebase) | C-01 npm |
| Q- | Quality & build | Q-01 ESLint |
| P- | Testing & performance | P-01 Playwright |
| X- | Security | X-01 npm audit |
| I- | Infrastructure & observability | I-01 Docker |
| D- | Design & wireframing | D-01 Pencil |
| F- | Figma Official MCP (read-only) | F-01 get_design_context |
| FE- | Figma Edit MCP (read/write) | FE-10 create_rectangle |
| S- | Specialized / project-dependent | S-01 firestore-introspect |

---

## 8) Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  IAMBECCA-TOOLS v2.2.0 — QUICK REFERENCE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  PERMISSION LEVELS:                                                         │
│  ✅ Full    🔒 Read-Only    ❌ Forbidden                                    │
│                                                                             │
│  CODE WRITERS (Edit + Write code):                                          │
│  Neo (IM-05), Tank (IM-07, tests only), Seraph (IM-08, patches only),      │
│  Link (IM-09), Niobe (IM-10), Apoc (IM-11)                                │
│                                                                             │
│  READ-ONLY / ADVISORY (no Edit):                                            │
│  BECCA (IM-01), Oracle (IM-02), Trinity (IM-03), Trainman (IM-04),         │
│  Morpheus (IM-06), Ghost Twins (IM-12), Sentinels (IM-13)                  │
│                                                                             │
│  BROWSER ACCESS (Chrome DevTools + Playwright):                             │
│  Neo (IM-05), Niobe (IM-10), Tank (IM-07, Playwright E2E only)            │
│                                                                             │
│  QUALITY TOOLS (ESLint, Prettier, tsc):                                     │
│  Neo (IM-05), Tank (IM-07, run only), Ghost Twins (IM-12, read-only)      │
│                                                                             │
│  TESTING & PERF (Playwright, Lighthouse, k6, axe-core):                     │
│  Tank (IM-07, primary), Niobe (IM-10, UI perf), Link (IM-09, k6 only)    │
│                                                                             │
│  SECURITY TOOLS (npm audit, gitleaks):                                      │
│  Seraph (IM-08, exclusive)                                                  │
│                                                                             │
│  INFRASTRUCTURE (Docker, act, Sentry):                                      │
│  Link (IM-09, primary), Neo (IM-05, Sentry only), Tank (IM-07, act only) │
│                                                                             │
│  DESIGN TOOLS (Figma Official, Figma Edit, Pencil, draw.io, Storybook):   │
│  Niobe (IM-10, primary), Neo (IM-05, Figma read-only),                    │
│  Oracle (IM-02, draw.io read-only)                                        │
│                                                                             │
│  DATA TOOLS (BigQuery, Firestore introspect):                               │
│  Apoc (IM-11)                                                               │
│                                                                             │
│  ENFORCEMENT: Ghost Twins validate, Trinity monitors, BECCA arbitrates      │
│  VIOLATION: 🔑 REJECTED + resubmit                                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [2.2.0] 2026-02-05
- **Figma Edit MCP E2E Verified:** Updated D-03 status from "requires setup" to "E2E verified"
  - Fixed server config: `node server.js` (not `bunx` — bunx creates port conflict on 3055)
  - Added 5 missing tools: `ungroup_nodes` (FE-18b), `set_effect_style_id` (FE-27b), `flatten_node` (FE-29b), `create_component_from_node` (FE-56), `create_component_set` (FE-57)
  - Added Known Issues section: Dev Mode read-only, bunx port conflict, channel ID regeneration
  - Added E2E verification status with tested operations
  - Design mode requirement documented (Shift+D to toggle)

### [2.1.0] 2026-02-05
- **Figma MCP Full Wiring:** Expanded D-02 into two distinct MCP servers
  - D-02: Figma Official MCP (read-only, 11 tools, F-01 to F-11) — design-to-code
  - D-03: Figma Edit MCP (read/write, 50+ tools, FE-01 to FE-55) — bidirectional editing
- Renumbered: Penpot → D-04, draw.io → D-05
- Added F- and FE- ID prefixes to Section 7.3
- Updated permission matrix: Niobe full access, Neo read-only on Official
- Updated bootstrap checks: 10a (Official) and 10b (Edit) replacing single check 10
- Updated bootstrap output template with split Figma checks
- Updated quick reference with expanded design tools

### [2.0.0] 2026-02-05
- **MAJOR:** Tool Expansion — 15 new tools across 4 new categories
- Added Section 2.4: Quality & Build Tools (ESLint, Prettier, TypeScript, dependency-cruiser)
- Added Section 2.5: Testing & Performance Tools (Playwright, Lighthouse, k6, axe-core, Storybook)
- Added Section 2.6: Security Tools (npm audit, gitleaks)
- Added Section 2.7: Infrastructure & Observability Tools (Docker, act, Sentry CLI, BigQuery CLI)
- Added draw.io to Design Tools (D-04)
- Added permission matrices 3.4 through 3.8 for new tool categories
- Expanded bootstrap checks from 11 to 28
- Added ID prefix guide (Section 7.3)
- Updated quick reference with all new tool categories

### [1.0.0] 2026-02-05
- Initial release
- Consolidated tool access from all 13 IM role files
- Defined 5 tool categories: Core, DevTools MCP, CLI, Specialized, Design
- Created role-to-tool permission matrix with ✅/🔒/❌ model
- Defined enforcement chain (self → Ghost Twins → Trinity → BECCA)
- Added environment bootstrap protocol with 11 verification checks
- Added project-specific tool contract guidelines
- Added tool registration/removal protocol
- Integrated design tools (Pencil, Figma MCP, Penpot)
