# SA-03 AUTH & SECRETS AUDIT REPORT

**Packet:** SAR_20260204_150000_001
**Auditor:** SA-03 Auth & Secrets
**Target:** Trainer OS (`D:\projects\trainer-os\`)
**Date:** 2026-02-04
**Status:** COMPLETE

---

## EXECUTIVE SUMMARY

| Severity | Count | Status |
|----------|-------|--------|
| CRITICAL | 0 | - |
| HIGH | 0 | - |
| MEDIUM | 2 | FOUND |
| LOW | 1 | FOUND |
| INFO | 6 | PASS |

**Overall Auth & Secrets Score:** 88/100 (GOOD)

---

## PASS: NO HARDCODED SECRETS

### Stripe Keys

**Location:** `functions/src/billing/index.ts`

```typescript
// Line 28-29 - Keys from environment/config, NOT hardcoded
const stripeSecretKey = functions.config().stripe?.secret_key || process.env.STRIPE_SECRET_KEY || '';
const stripeWebhookSecret = functions.config().stripe?.webhook_secret || process.env.STRIPE_WEBHOOK_SECRET || '';
```

**Assessment:** PASS - All sensitive keys externalized to Firebase Functions config or environment variables.

### Third-Party API Keys

| Service | Source | Hardcoded? |
|---------|--------|------------|
| Stripe | `functions.config().stripe.*` | NO |
| SendGrid | `functions.config().sendgrid.key` | NO |
| Twilio | `functions.config().twilio.*` | NO |
| USDA API | `functions.config().usda.apikey` | NO |

**Verdict:** PASS - No secrets in source code.

---

## PASS: FIREBASE CONFIG HANDLING

**Location:** `frontend/src/lib/firebase.ts`

```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-api-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'localhost',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'trainer-os-dev',
  // ... all from environment variables
}
```

### Security Properties

| Property | Status |
|----------|--------|
| Config from env vars | PASS |
| Fallbacks are safe defaults | PASS |
| No production keys in code | PASS |
| NEXT_PUBLIC_ prefix (client-safe) | PASS |

**Note:** Firebase `apiKey` is designed to be public - security is enforced via Firestore rules and Auth, not key secrecy.

**Verdict:** PASS - Proper configuration handling.

---

## PASS: CLOUD FUNCTION AUTH CHECKS

All callable functions have authentication guards:

```typescript
// Pattern found in ALL callable functions
if (!context.auth) {
  throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
}
```

### Functions Verified

| Function | Auth Check | Line |
|----------|------------|------|
| generateSessionForClient | `!context.auth` | sessions/index.ts:29 |
| generateWeeklyPlan | `!context.auth` | sessions/index.ts:96 |
| createCheckoutSession | `!context.auth` | billing/index.ts:98 |
| createBillingPortalSession | `!context.auth` | billing/index.ts:201 |
| setupBusinessProfile | `!context.auth` | billing/index.ts:317 |
| searchFood | `!context.auth` | nutrition/index.ts:33 |
| submitReview | `!context.auth` | coachDiscovery/index.ts:47 |
| sendNotification | `!context.auth` | notifications/index.ts:29 |
| recordHelpVote | `!context.auth` | scc/index.ts:108 |
| computeClientFlags | `!context.auth` | coachBrain/index.ts:26 |
| + 10 more | All checked | Various |

**Verdict:** PASS - Consistent auth enforcement.

---

## PASS: WEBHOOK SIGNATURE VERIFICATION

**Location:** `functions/src/billing/index.ts:245-269`

```typescript
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  if (!sig) {
    res.status(400).send('Missing signature');
    return;
  }

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.rawBody, sig, stripeWebhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${message}`);
    return;
  }
  // ... process verified event
});
```

### Security Properties

| Check | Status |
|-------|--------|
| Signature header required | PASS |
| Signature verified via Stripe SDK | PASS |
| Rejects invalid signatures | PASS |
| Uses rawBody (not parsed) | PASS |

**Verdict:** PASS - Proper webhook security.

---

## PASS: .gitignore COVERAGE

**Location:** `.gitignore`

| Pattern | Coverage |
|---------|----------|
| `.env` | Excluded |
| `.env.local` | Excluded |
| `.env.*.local` | Excluded |
| `serviceAccountKey.json` | Excluded |
| `node_modules/` | Excluded |
| `.firebase/` | Excluded |

**Evidence:** No .env files found in repository.

**Verdict:** PASS - Secrets properly excluded from version control.

---

## MEDIUM SEVERITY FINDINGS

### AS-001: Middleware Does Not Enforce Authentication

**Location:** `frontend/src/middleware.ts:39-48`

**Evidence:**
```typescript
// For now, we'll handle auth client-side since Firebase Auth is client-side
// This middleware can be enhanced later with Firebase Admin SDK for server-side verification

// Redirect root to dashboard or login
if (pathname === '/') {
  // Let the client-side handle the redirect based on auth state
  return NextResponse.next()
}

return NextResponse.next()  // <-- ALWAYS passes through
```

**Issue:** The middleware defines protected routes (lines 5-23) but NEVER actually blocks access. All requests pass through with `NextResponse.next()`.

**Impact:**
- Protected page HTML/JS loads before client-side redirect
- Initial page flash visible to unauthenticated users
- Server-side rendering doesn't respect auth state
- SEO crawlers may index protected routes

**Recommendation:**
- Implement server-side token verification with Firebase Admin SDK
- Or use Next.js App Router layouts for auth guards
- At minimum, return 401/redirect for protected routes

---

### AS-002: Weak Password Policy

**Location:** `frontend/src/app/(auth)/signup/page.tsx:32-35`

**Evidence:**
```typescript
if (password.length < 6) {
  setError('Password must be at least 6 characters')
  return
}
```

**Issue:** Password requirements are too weak:
- Minimum 6 characters (should be 8+)
- No complexity requirements (uppercase, number, symbol)
- No common password check

**Impact:**
- Users may set easily guessable passwords
- Vulnerable to brute force attacks

**Recommendation:**
- Increase minimum to 8 characters
- Add complexity requirements: 1 uppercase, 1 number, 1 symbol
- Consider Firebase Auth password policy enforcement

---

## LOW SEVERITY FINDINGS

### AS-003: Test Passwords in Seed Script

**Location:** `scripts/seed-data.ts:34,39`

**Evidence:**
```typescript
const TEST_COACH_PASSWORD = 'test1234';
const TEST_CLIENT_PASSWORD = 'test1234';
```

**Issue:** Weak, predictable test passwords visible in source.

**Risk Level:** LOW (dev/test script only)

**Recommendation:**
- Generate random passwords for test data
- Or use environment variables for test credentials

---

## INFORMATIONAL: CUSTOM CLAIMS ARCHITECTURE

Trainer OS uses Firebase Custom Claims for auth context:

```
┌─────────────────────────────────────────────────────────────────┐
│  CUSTOM CLAIMS FLOW                                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. User document created/updated in Firestore                  │
│                                                                 │
│  2. Cloud Function setUserClaims triggers                       │
│                                                                 │
│  3. Claims {businessId, role} set on Firebase Auth token        │
│                                                                 │
│  4. Frontend receives claims in auth state                      │
│                                                                 │
│  5. Firestore rules read claims from request.auth.token         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Security Benefits:**
- Claims are server-controlled (cannot be modified by client)
- No Firestore read required per request
- JWT expiry handled by Firebase

---

## RECOMMENDATIONS SUMMARY

| Priority | Action | Files Affected |
|----------|--------|----------------|
| P2 | Implement server-side auth in middleware | middleware.ts |
| P2 | Strengthen password policy | signup/page.tsx |
| P3 | Randomize test passwords | seed-data.ts |

---

## AUDIT CHAIN STATUS

| Step | Auditor | Status |
|------|---------|--------|
| SA-01 Data Leaks | COMPLETE | 6 HIGH, 1 MEDIUM |
| SA-02 Tenant Isolation | COMPLETE | 0 HIGH, 1 MEDIUM |
| SA-03 Auth & Secrets | COMPLETE | 0 HIGH, 2 MEDIUM |
| SA-04 OWASP | PENDING | Next |
| SA-05 Verdict | PENDING | - |

---

## ROUTING

**Next:** SA-04 OWASP Auditor
**Command:** `owasp activate`

---

SA-03 Auth & Secrets Audit Complete
