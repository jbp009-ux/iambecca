# TRAINER OS — ECOSYSTEM BRIEFING v1.0.0

**Target:** IAMBECCA | TRAINER-OS | SAAS | trainer-os | ALL-ROLES
**Purpose:** Complete architecture reference for all IAMBecca roles before Page-by-Page Go-Live Audit
**Produced by:** BECCA (IM-01) via 5 parallel scout deep-dives
**Date:** 2026-02-06
**Status:** 🔑 CERTIFIED — Ready for Oracle phase planning

---

## TABLE OF CONTENTS

1. [Tech Stack & Project Structure](#1-tech-stack--project-structure)
2. [Auth Architecture](#2-auth-architecture)
3. [Data Layer & Tenant Isolation](#3-data-layer--tenant-isolation)
4. [Firestore Security Rules](#4-firestore-security-rules)
5. [Firebase Functions — Server Trust Boundary](#5-firebase-functions--server-trust-boundary)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Critical Vulnerability Registry](#7-critical-vulnerability-registry)
8. [100K Readiness Scorecard](#8-100k-readiness-scorecard)
9. [Role-Specific Briefings](#9-role-specific-briefings)

---

## 1) Tech Stack & Project Structure

### 1.1 Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 14.x |
| UI | React | 18.x |
| Language | TypeScript | 5.x |
| Auth | Firebase Auth | 10.x |
| Database | Cloud Firestore | 10.x |
| Functions | Firebase Cloud Functions (v2) | 6.x |
| Storage | Firebase Cloud Storage | — |
| Payments | Stripe (checkout sessions + webhooks) | — |
| AI | OpenAI API (via Cloud Functions) | — |
| Styling | Tailwind CSS | 3.x |
| Charts | Recharts | — |
| State | React Context (AuthContext, FeatureAccessContext) | — |
| Testing | Jest (configured, ZERO tests written) | — |

### 1.2 Monorepo Layout

```
d:\projects\trainer-os\
├── frontend/                    ← Next.js 14 App Router
│   └── src/
│       ├── app/
│       │   ├── (auth)/          ← Login, signup, forgot-password
│       │   ├── (client)/        ← Member-facing (mobile-first)
│       │   ├── (dashboard)/     ← Coach-facing (desktop sidebar)
│       │   ├── (owner)/         ← System admin (role-gated)
│       │   └── (public)/        ← Marketing, pricing, landing
│       ├── components/          ← Shared UI components
│       ├── context/             ← AuthContext, FeatureAccessContext
│       ├── hooks/               ← Data hooks (useWall, useAdsAdmin, etc.)
│       ├── lib/                 ← Cache, storage, Firestore helpers
│       └── services/            ← Firestore service modules
├── functions/                   ← Firebase Cloud Functions
│   └── src/
│       ├── auth/                ← setUserClaims trigger
│       ├── billing/             ← Stripe integration
│       ├── nutrition/           ← AI meal plans, food search
│       ├── moderation/          ← Content moderation
│       ├── led/                 ← LED evaluation delivery
│       ├── messaging/           ← Push notifications
│       ├── sessions/            ← Workout session generation
│       ├── utils/               ← rateLimit, auditLog
│       └── index.ts             ← 41+ exported functions
├── contracts/                   ← TypeScript interfaces
├── data/                        ← Seed data, migrations
├── docs/                        ← Architecture docs
├── firestore.rules              ← 1,440 lines
├── storage.rules                ← Storage security rules
├── firestore.indexes.json       ← Composite indexes
├── firebase.json                ← Firebase config
└── tests/                       ← EMPTY — zero test coverage
```

### 1.3 Page Count

- **75 page.tsx files** across 5 route groups
- **16 target pages** for this audit (all confirmed to exist)
- **0 middleware.ts** — no server-side route protection
- **0 error.tsx** — no route-level error boundaries
- **0 loading.tsx** — no route-level loading states
- **1 ErrorBoundary.tsx** — class-based, root-level only

---

## 2) Auth Architecture

### 2.1 Auth Flow

```
Firebase Auth (email/password)
    │
    ├── onAuthStateChanged → AuthContext loads user
    │
    ├── Firestore trigger: users/{userId} onWrite
    │   └── setUserClaims.ts → sets JWT custom claims:
    │       { businessId: string, role: 'client'|'coach'|'admin' }
    │
    ├── AuthContext loads profile from Firestore:
    │   getDoc(doc(db, 'users', uid))
    │   (one-time read, NO real-time listener)
    │
    └── 5-second loading timeout to prevent infinite spinner
```

### 2.2 Auth Context State

| Field | Type | Source |
|-------|------|--------|
| `user` | `User \| null` | Firebase Auth |
| `profile` | `UserProfile \| null` | Firestore `users/{uid}` |
| `loading` | `boolean` | Derived |
| `isDemo` | `boolean` | sessionStorage |

**Methods:** `signIn`, `signUp`, `signOut`, `refreshProfile`, `resetPassword`

### 2.3 Route Protection Matrix

| Route Group | Auth Check | Role Check | Mechanism |
|-------------|-----------|------------|-----------|
| `(auth)` | None needed | None | Public routes |
| `(public)` | None needed | None | Public routes |
| `(client)` | ⚠️ IMPLICIT | ❌ NONE | Relies on child components |
| `(dashboard)` | ✅ `!user → /login` | ❌ NONE | Layout redirect, no role check |
| `(owner)` | ✅ Auth check | ✅ `systemRole === 'admin'` | **ONLY layout with role check** |

### 2.4 Feature Gating

**FeatureAccessContext** provides tier-based feature flags:

| Feature | `coached` tier | `public` tier |
|---------|---------------|---------------|
| canAccessWorkouts | ✅ | ❌ |
| canAccessMessages | ✅ | ❌ |
| canAccessCheckin | ✅ | ❌ |
| canAccessBookings | ✅ | ❌ |
| canAccessChallenges | ✅ | ❌ |
| maxHabits | ∞ | 3 |
| maxPodJoins | ∞ | 2 |
| maxMealShares | ∞ | 1 |

### 2.5 Auth Vulnerabilities (P0)

| ID | Vulnerability | Severity | Location |
|----|--------------|----------|----------|
| AUTH-01 | Dashboard layout has NO role check — any authenticated user sees coach UI | **CRITICAL** | `(dashboard)/layout.tsx` |
| AUTH-02 | Client layout has NO auth redirect — relies entirely on child components | **HIGH** | `(client)/layout.tsx` |
| AUTH-03 | Demo mode bypasses auth, not gated to development | **HIGH** | `(auth)/login/page.tsx` |
| AUTH-04 | Owner dev bypass: `if (!isDev && !isSystemAdmin)` | **MEDIUM** | `(owner)/layout.tsx` |
| AUTH-05 | Feature tier defaults to `'coached'` (most permissive) on null | **HIGH** | `FeatureAccessContext.tsx` |
| AUTH-06 | No middleware.ts — ALL auth is client-side only | **CRITICAL** | Project root |
| AUTH-07 | Profile loaded via one-time getDoc, not real-time — stale role possible | **MEDIUM** | `AuthContext.tsx` |

---

## 3) Data Layer & Tenant Isolation

### 3.1 Tenant Isolation Model

```
Custom Claims (JWT):
  { businessId: "biz_123", role: "coach" }
      │
      ├── Firestore Rules: matchesTenant() checks request.auth.token.businessId
      ├── Cloud Functions: context.auth.token.businessId (server-side)
      └── Frontend: profile.businessId from Firestore user doc
```

**The anchor:** `setUserClaims.ts` trigger sets claims on user doc write. All downstream isolation depends on these claims being correct and present.

### 3.2 Service Layer Patterns

| Service | Tenant Filter | Pattern Quality |
|---------|--------------|-----------------|
| `clientService.ts` | ✅ `businessId` in all queries | Good |
| `coachService.ts` | ✅ `businessId` in all queries | Good |
| `workoutService.ts` | ✅ `businessId` scoped | Good |
| `nutritionService.ts` | ✅ `businessId` scoped | Good |
| `podService.ts` | ✅ `businessId` scoped | Good |
| `billingService.ts` | ✅ `businessId` scoped | Good |
| `useWall.ts` | ❌ NO businessId filter | **CRITICAL** |
| `useAdsAdmin.ts` | ❌ Direct Firestore writes | **CRITICAL** |
| `useLeadPipeline.ts` | ⚠️ Has filter, but demo fallback leaks PII | **HIGH** |

### 3.3 Cache Layer

**File:** `frontend/src/lib/cache.ts`

```
Cache key format: generateKey(collection, docId, queryHash)
```

**CRITICAL:** Cache keys do NOT include `businessId`. If two tenants share the same browser (e.g., coach switching between businesses), cached data from Tenant A could be served to Tenant B.

### 3.4 Storage Paths

| Path Pattern | Tenant-Scoped? | Issue |
|--------------|---------------|-------|
| `progress-photos/{businessId}/{clientId}/{filename}` | ✅ Yes | — |
| `feedMedia/{userId}/{filename}` | ❌ No | Missing businessId segment |
| `wallMedia/{userId}/{filename}` | ❌ No | Missing businessId segment |

### 3.5 Data Layer Vulnerabilities (P0)

| ID | Vulnerability | Severity | Location |
|----|--------------|----------|----------|
| DATA-01 | Cache keys missing businessId — cross-tenant data leakage | **CRITICAL** | `lib/cache.ts` |
| DATA-02 | useWall queries unscoped — no businessId filter | **CRITICAL** | `hooks/useWall.ts` |
| DATA-03 | useAdsAdmin — direct Firestore writes for financial operations | **CRITICAL** | `hooks/useAdsAdmin.ts` |
| DATA-04 | feedMedia/wallMedia storage paths missing businessId | **HIGH** | `lib/storage.ts` |
| DATA-05 | useLeadPipeline demo fallback contains realistic PII | **HIGH** | `hooks/useLeadPipeline.ts` |
| DATA-06 | useAdsAdmin fetches 100 campaigns, filters client-side | **MEDIUM** | `hooks/useAdsAdmin.ts` |

---

## 4) Firestore Security Rules

### 4.1 Architecture (1,440 lines)

**Helper Functions (lines 1–80):**

| Function | Purpose |
|----------|---------|
| `getBusinessId()` | Reads `request.auth.token.businessId` from JWT |
| `getRole()` | Reads `request.auth.token.role` from JWT |
| `matchesTenant()` | `resource.data.businessId == getBusinessId()` |
| `existingMatchesTenant()` | Same check on existing doc (for updates) |
| `businessIdUnchanged()` | Prevents businessId mutation |
| `isCoachInBusiness()` | `getRole() == 'coach' && matchesTenant()` |
| `isClientInBusiness()` | `getRole() == 'client' && matchesTenant()` |
| `isPodMember(podId)` | Checks pod membership doc existence |
| `isPodAdmin(podId)` | Checks pod admin doc existence |
| `isSystemAdmin()` | `getRole() == 'admin'` |
| `isBusinessOwner()` | Checks business doc ownership |

### 4.2 Collection Coverage

**Properly isolated (28+ collections):**
`users`, `businesses`, `coaches`, `clients`, `workouts`, `workoutTemplates`, `exercises`, `nutritionPlans`, `mealPlans`, `habits`, `habitEntries`, `pods`, `podMembers`, `podMessages`, `challenges`, `challengeParticipants`, `bookings`, `bookingSlots`, `checkins`, `goals`, `announcements`, `billingPlans`, `subscriptions`, `invoices`, `payouts`, `ledgerEntries`, `notifications`, `resources`

**Intentionally cross-tenant (12 collections):**
`socialPosts`, `feedItems`, `reactions`, `comments`, `followers`, `following`, `wallPosts`, `wallComments`, `wallReactions`, `publicProfiles`, `discoverable`, `globalFeed`

### 4.3 Rules Vulnerabilities (P0)

| ID | Vulnerability | Severity | Lines | Detail |
|----|--------------|----------|-------|--------|
| RULES-01 | `clientInvitations` — `allow read: if true` | **CRITICAL** | ~450 | Anyone (even unauthenticated) can read all invitations |
| RULES-02 | `clientInvitations` — `allow update: if resource.data.token != null` | **CRITICAL** | ~455 | Anyone with a valid token can accept any invitation |
| RULES-03 | `messages` — readable by entire business, not just participants | **HIGH** | ~380 | `userBelongsToBusiness(resource.data.businessId)` instead of participant check |
| RULES-04 | `conversations` — missing `existingMatchesTenant()` on client read | **HIGH** | ~370 | Client reads don't verify the doc belongs to their tenant |
| RULES-05 | `bodyMeasurements` — missing tenant check on client read | **HIGH** | ~520 | |
| RULES-06 | `personalRecords` — missing tenant check on client read | **HIGH** | ~540 | |
| RULES-07 | `progressPhotos` — missing tenant check on client read | **HIGH** | ~560 | |
| RULES-08 | `resourceAssignments` — missing tenant check on client read | **HIGH** | ~600 | |
| RULES-09 | `mealLogs` — missing tenant check on client read | **HIGH** | ~580 | |
| RULES-10 | Default deny catch-all present | ✅ GOOD | ~1438 | `match /{document=**} { allow read, write: if false; }` |

---

## 5) Firebase Functions — Server Trust Boundary

### 5.1 Function Inventory

**41+ exported functions** across 15+ modules:

| Module | Functions | Auth? | Rate Limit? | Audit Log? |
|--------|----------|-------|-------------|------------|
| `auth/setUserClaims` | 1 trigger | N/A (trigger) | N/A | ❌ |
| `billing/` | 4 callables + 1 webhook | ✅ 100% | ✅ 75% | ❌ |
| `sessions/` | 3 callables | ✅ 100% | ✅ 33% | ❌ |
| `nutrition/` | 5 callables | ✅ 100% | ✅ 40% | ❌ |
| `messaging/` | 3 callables + 1 trigger | ✅ 100% | ❌ 0% | ❌ |
| `moderation/` | 3 callables | ✅ 100% | ❌ 0% | ❌ |
| `led/` | 2 callables | ✅ 100% | ❌ 0% | ❌ |
| `pods/` | 4 callables | ✅ 100% | ❌ 0% | ❌ |
| `social/` | 3 callables | ✅ 100% | ❌ 0% | ❌ |
| `admin/` | 5 callables | ✅ 100% | ❌ 0% | ❌ |
| `ai/` | 4 callables | ✅ 100% | ✅ 50% | ❌ |

**Totals:**
- Auth validation: **~85%** (good baseline)
- Rate limiting: **~15%** (6 of 41 functions)
- Audit logging: **0%** (utility exists but NEVER called)

### 5.2 Trust Boundary Model

```
CLIENT (untrusted)
    │
    ▼
Cloud Function (trust boundary)
    ├── Step 1: Verify auth (context.auth exists)
    ├── Step 2: Extract claims (context.auth.token.businessId)
    ├── Step 3: Validate input (data.fieldName checks)
    ├── Step 4: Rate limit (enforceRateLimit — 6 functions only)
    ├── Step 5: Execute business logic
    └── Step 6: Audit log (NEVER — auditLog() defined but unused)
```

**Exemplary pattern:** `createCheckoutSession` in billing — derives businessId from auth, rate-limited, validates all inputs, never trusts client-supplied businessId.

**Anti-pattern:** `computeDailyNutritionTotals` — accepts `clientId` from request, queries `mealLogs` without businessId filter. A client from Business A could query meals from Business B.

### 5.3 Functions Vulnerabilities (P0)

| ID | Vulnerability | Severity | Location |
|----|--------------|----------|----------|
| FUNC-01 | `computeDailyNutritionTotals` — cross-tenant query (no businessId filter) | **CRITICAL** | `nutrition/index.ts` |
| FUNC-02 | `getModerationReports` — returns ALL reports system-wide | **CRITICAL** | `moderation/index.ts` |
| FUNC-03 | `resolveModerationReport` — admin from any business can resolve any report | **CRITICAL** | `moderation/index.ts` |
| FUNC-04 | `submitModerationReport` — no businessId in report doc | **HIGH** | `moderation/index.ts` |
| FUNC-05 | `sendEvaluationDelivery` — no ownership verification | **HIGH** | `led/index.ts` |
| FUNC-06 | `auditLog()` utility exists but is called by 0 functions | **HIGH** | `utils/audit.ts` |
| FUNC-07 | Rate limiting on only 6/41 functions | **HIGH** | Global |
| FUNC-08 | `searchFoods` — queries global food DB without business scope | **MEDIUM** | `nutrition/index.ts` |

### 5.4 Rate Limit Config

| Function | Limit |
|----------|-------|
| SESSION_GENERATE | 30/min |
| WEEKLY_PLAN | 5/min |
| FOOD_SEARCH | 60/min |
| CHECKOUT | 10/min |
| AI_CHAT | 20/min |
| DEFAULT | 100/min |

---

## 6) Frontend Architecture

### 6.1 Layout Architecture

| Route Group | Layout Pattern | Auth | Responsive |
|-------------|---------------|------|------------|
| `(auth)` | Centered card, gradient background | None | ✅ |
| `(client)` | Sticky header + BottomTabBar | ⚠️ Implicit | ✅ Mobile-first |
| `(dashboard)` | 264px sidebar + top bar | ✅ No role check | Desktop-first |
| `(owner)` | Similar to dashboard | ✅ Role-checked | Desktop |
| `(public)` | Header + footer, max-w-6xl | None | ✅ |

### 6.2 Client Layout Features

- Real-time Firestore subscriptions for unread messages count
- Real-time pending connection requests count
- BottomTabBar with 5 tabs (Dashboard, Workouts, Nutrition, Community, More)
- FeatureAccessProvider wraps all children
- No explicit auth redirect in layout itself

### 6.3 Dashboard Layout Features

- 264px collapsible sidebar with 4 nav groups:
  - Overview: Dashboard, Calendar, Notifications
  - Coaching: Clients, Programs, Workouts, Nutrition, Pods
  - Growth: Analytics, Marketing, Revenue, Leads
  - Settings: Profile, Business, Billing, Integrations
- Top bar with search, notifications, quick actions
- Sidebar state persisted (likely localStorage)

### 6.4 Error Handling

| Layer | Exists? | Quality |
|-------|---------|---------|
| Root ErrorBoundary | ✅ Yes | Class-based, shows "Something went wrong" |
| Route-level error.tsx | ❌ No | None across all 75 pages |
| Route-level loading.tsx | ❌ No | None across all 75 pages |
| middleware.ts | ❌ No | No server-side protection |
| API error handling | ⚠️ Partial | Some try/catch, inconsistent |

### 6.5 Component Patterns

- **Shared components:** Extensive library in `components/` (modals, forms, cards, tables, charts)
- **Hook-based data:** `useWall`, `useAdsAdmin`, `useLeadPipeline`, etc.
- **Service modules:** `clientService`, `coachService`, `workoutService`, etc.
- **No component tests** — zero Storybook stories, zero Jest/RTL tests

---

## 7) Critical Vulnerability Registry

### 7.1 CRITICAL (Must Fix Before Go-Live)

| # | ID | Category | Description | Impact at 100K |
|---|-----|----------|-------------|----------------|
| 1 | AUTH-01 | Auth | Dashboard layout: no role check | Any user sees coach UI |
| 2 | AUTH-06 | Auth | No middleware.ts — all auth client-side | Auth bypass via direct URL |
| 3 | RULES-01 | Rules | clientInvitations `allow read: if true` | PII of all invitees exposed |
| 4 | RULES-02 | Rules | clientInvitations accept with just token | Invitation hijacking |
| 5 | DATA-01 | Data | Cache keys missing businessId | Cross-tenant data leakage |
| 6 | DATA-02 | Data | useWall unscoped queries | Cross-tenant wall post exposure |
| 7 | DATA-03 | Data | useAdsAdmin direct Firestore financial writes | Financial fraud vector |
| 8 | FUNC-01 | Functions | computeDailyNutritionTotals cross-tenant | Cross-tenant meal data leak |
| 9 | FUNC-02 | Functions | getModerationReports — global access | Sensitive report data exposed |
| 10 | FUNC-03 | Functions | resolveModerationReport — cross-business | Unauthorized moderation |

### 7.2 HIGH (Fix Before Go-Live, After Criticals)

| # | ID | Category | Description |
|---|-----|----------|-------------|
| 11 | AUTH-02 | Auth | Client layout no auth redirect |
| 12 | AUTH-03 | Auth | Demo mode not dev-gated |
| 13 | AUTH-05 | Auth | Feature tier defaults to most permissive |
| 14 | RULES-03 | Rules | Messages readable by entire business |
| 15 | RULES-04–09 | Rules | 6 collections missing tenant check on client reads |
| 16 | DATA-04 | Data | feedMedia/wallMedia paths missing businessId |
| 17 | DATA-05 | Data | Demo fallback contains realistic PII |
| 18 | FUNC-04 | Functions | Moderation reports missing businessId |
| 19 | FUNC-05 | Functions | sendEvaluationDelivery no ownership check |
| 20 | FUNC-06 | Functions | auditLog() defined but never called (0% coverage) |
| 21 | FUNC-07 | Functions | Rate limiting on only 6/41 functions |

### 7.3 MEDIUM (Fix During Audit)

| # | ID | Category | Description |
|---|-----|----------|-------------|
| 22 | AUTH-04 | Auth | Owner dev bypass not removed |
| 23 | AUTH-07 | Auth | Profile one-time read (stale role possible) |
| 24 | DATA-06 | Data | useAdsAdmin client-side filtering (100 docs) |
| 25 | FUNC-08 | Functions | searchFoods global query (may be intentional) |

### 7.4 Architecture Gaps (Address During Audit)

| # | Category | Gap |
|---|----------|-----|
| 26 | Testing | ZERO test coverage (no Jest, no Playwright, no Storybook) |
| 27 | Error UX | No route-level error.tsx or loading.tsx |
| 28 | Middleware | No Next.js middleware for server-side auth |
| 29 | Monitoring | No Sentry or error tracking integration |
| 30 | Audit Trail | auditLog utility unused — no compliance trail |

---

## 8) 100K Readiness Scorecard

Pre-audit baseline assessment against the CEO Mission Packet's 10-item checklist:

| # | Requirement | Status | Score |
|---|------------|--------|-------|
| 1 | Every page validates auth token on mount | ❌ FAIL | 2/5 — only (owner) layout checks role |
| 2 | Every Firestore query filters by businessId | ❌ FAIL | 3/5 — most services good, hooks bad |
| 3 | No direct Firestore writes from frontend for financial ops | ❌ FAIL | 1/5 — useAdsAdmin writes directly |
| 4 | All callable functions rate-limited | ❌ FAIL | 1/5 — only 6/41 |
| 5 | All user input sanitized server-side | ⚠️ PARTIAL | 3/5 — functions validate, rules partial |
| 6 | Error boundaries per route group | ❌ FAIL | 1/5 — root-only |
| 7 | Loading states per route | ❌ FAIL | 0/5 — none exist |
| 8 | Storage paths include businessId | ❌ FAIL | 2/5 — photos yes, media no |
| 9 | Audit log for sensitive operations | ❌ FAIL | 0/5 — utility unused |
| 10 | Test coverage > 80% for critical paths | ❌ FAIL | 0/5 — zero tests |

**Overall: 13/50 (26%)** — Significant hardening required before production at scale.

---

## 9) Role-Specific Briefings

### For Oracle (IM-02) — Phase Planning

**Key inputs for phase breakdown:**
- 10 CRITICAL vulnerabilities must be P0 (security gate)
- 11 HIGH vulnerabilities are P1 (reliability gate)
- 4 MEDIUM vulnerabilities are P2
- 5 architecture gaps span all phases
- Zero test infrastructure means Phase 1 must establish test harness

**Suggested phase ordering:**
1. Security hardening (auth, rules, functions) — blocks everything
2. Data isolation fixes (cache, hooks, storage paths)
3. Infrastructure (middleware, error boundaries, loading states)
4. Test coverage for all 16 target pages
5. Performance audit + 100K load testing

### For Neo (IM-05) — Code Execution

**High-touch files (will require multiple edits):**
- `frontend/src/app/(dashboard)/layout.tsx` — add role check
- `frontend/src/app/(client)/layout.tsx` — add auth redirect
- `frontend/src/context/FeatureAccessContext.tsx` — fix default tier
- `frontend/src/hooks/useWall.ts` — add businessId filter
- `frontend/src/hooks/useAdsAdmin.ts` — move to Cloud Functions
- `frontend/src/lib/cache.ts` — add businessId to cache keys
- `frontend/src/lib/storage.ts` — add businessId to media paths
- `firestore.rules` — fix 10 rule vulnerabilities
- `functions/src/nutrition/index.ts` — add businessId filter
- `functions/src/moderation/index.ts` — scope to business

**New files needed:**
- `frontend/src/middleware.ts` — server-side auth/role routing
- `frontend/src/app/(dashboard)/error.tsx` — error boundary
- `frontend/src/app/(client)/error.tsx` — error boundary
- `frontend/src/app/(dashboard)/loading.tsx` — loading state
- `frontend/src/app/(client)/loading.tsx` — loading state

### For Tank (IM-07) — Testing

**Test harness setup required first:**
- Jest + React Testing Library for component tests
- Playwright for E2E (16 target pages)
- Need Firebase emulator for Firestore rule tests
- Need mock auth context for component rendering
- Zero existing tests — everything starts from scratch

**Critical test scenarios (per CEO packet):**
- Auth redirect works for each route group
- Tenant isolation holds under cross-tenant queries
- Financial operations only go through Cloud Functions
- Error boundaries catch and display gracefully
- Loading states appear during data fetches

### For Seraph (IM-08) — Security

**Priority audit targets:**
1. `firestore.rules` — clientInvitations, messages, 6 missing tenant checks
2. `functions/src/moderation/index.ts` — global admin access
3. `functions/src/nutrition/index.ts` — cross-tenant query
4. `frontend/src/hooks/useAdsAdmin.ts` — direct financial writes
5. `frontend/src/lib/cache.ts` — cross-tenant cache poisoning

**OWASP mapping:**
- A01 Broken Access Control: AUTH-01, AUTH-02, RULES-01–09
- A04 Insecure Design: DATA-03 (financial writes from frontend)
- A07 Auth Failures: AUTH-03 (demo bypass), AUTH-06 (no middleware)

### For Link (IM-09) — Infrastructure

**Firebase config review needed:**
- Firestore indexes (composite index coverage)
- Storage rules (businessId path enforcement)
- Functions memory/timeout allocation
- Rate limiting expansion (6/41 → 41/41)
- Audit logging integration

### For Niobe (IM-10) — UI

**16 pages to verify UX for:**
- Responsive behavior (mobile + desktop)
- Loading states (currently none)
- Error states (currently root-only)
- Empty states (data-dependent components)
- Accessibility (keyboard nav, screen readers)

### For Ghost Twins (IM-12) — Review

**Evidence validation focus:**
- Every fix must include before/after code snippets
- Every security fix must include proof of mitigation
- Firestore rules changes need emulator test evidence
- Function changes need callable test evidence

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TRAINER OS ECOSYSTEM BRIEFING v1.0.0 — QUICK REFERENCE                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  STACK:        Next.js 14 + Firebase + Stripe + TypeScript                 │
│  PAGES:        75 page.tsx across 5 route groups (16 audit targets)        │
│  FUNCTIONS:    41+ exports across 15+ modules                              │
│  RULES:        1,440 lines, 28+ collections, 12 cross-tenant              │
│  TESTS:        ZERO — no Jest, no Playwright, no Storybook                 │
│                                                                             │
│  CRITICAL:     10 vulnerabilities (must fix before go-live)                │
│  HIGH:         11 vulnerabilities (fix before go-live)                     │
│  MEDIUM:       4 vulnerabilities (fix during audit)                        │
│  ARCH GAPS:    5 (testing, errors, middleware, monitoring, audit)           │
│                                                                             │
│  100K SCORE:   13/50 (26%) — significant hardening required                │
│                                                                             │
│  TOP 3 RISKS:                                                              │
│  1. Cross-tenant data leakage (cache, hooks, functions)                    │
│  2. Missing auth/role checks (dashboard, client layouts)                   │
│  3. Zero test coverage (no safety net for changes)                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Changelog

### [1.0.0] 2026-02-06
- Initial ecosystem briefing
- 5 parallel scout deep-dives completed
- 25 vulnerabilities cataloged (10 CRITICAL, 11 HIGH, 4 MEDIUM)
- 5 architecture gaps identified
- 100K readiness scored at 26%
- Role-specific briefings for Oracle, Neo, Tank, Seraph, Link, Niobe, Ghost Twins
