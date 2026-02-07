# SONNY8 → FIGMA MIGRATION TODO

**Created:** 2026-02-05
**Purpose:** Complete page-by-page breakdown of every screen in the Sonny8 app for Figma migration
**Source App:** https://ai-waitress-31281.firebaseapp.com
**Source Code:** `d:\projects\sonny\frontend\src\`
**Status:** MASTER REFERENCE — survives chat breaks

---

## DESIGN TOKENS (Global)

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| Primary 400 | `#fb923c` | Lighter hover states |
| Primary 500 | `#f97316` | Main brand orange |
| Primary 600 | `#ea580c` | Darker active states |
| Secondary | `#ef4444` (red-500) | Gradient end color |
| Gradient | `linear-gradient(to right, #f97316, #ef4444)` | CTAs, banners, hero buttons |
| Background Light | `bg-gradient-to-br from-orange-50 to-red-50` | Landing, Auth, Pricing, Demo pages |
| Background Dark | `#111827` (gray-900) | KDS, Top Fans |
| Background Admin | `#f3f4f6` (gray-100) | Admin pages |
| Card Background | `#ffffff` | Most cards |
| Text Primary | `#111827` (gray-900) | Headings |
| Text Secondary | `#4b5563` (gray-600) | Body text |
| Text Muted | `#9ca3af` (gray-400) | Captions |
| Border | `#e5e7eb` (gray-200) | Card borders |
| Success | `#22c55e` (green-500) | Status badges |
| Error | `#ef4444` (red-500) | Error states |
| Warning | `#eab308` (yellow-500) | Warning states |

### Typography
- Font Family: Arial, Helvetica, sans-serif (+ Geist Sans/Mono vars)
- Heading sizes: text-6xl (hero), text-4xl (h1), text-3xl (h2), text-2xl (h3), text-xl (h4)
- Body: text-base (16px), text-sm (14px), text-xs (12px)
- Weights: font-bold (700), font-semibold (600), font-medium (500), regular (400)

### Corner Radii
- rounded-2xl (16px) — Cards, modals, main containers
- rounded-xl (12px) — Buttons, inputs, smaller cards
- rounded-lg (8px) — Nav items, tags
- rounded-full — Avatars, toggles, badges

### Shadows
- shadow-sm — Cards
- shadow-lg — Elevated cards
- shadow-xl — Auth cards
- shadow-2xl — Demo iframe container

---

## PAGE 1: LANDING PAGE (`/`)
**Source:** `frontend/src/app/page.tsx` (611 lines)
**Background:** `bg-gradient-to-br from-orange-50 to-red-50`

### 1.1 Navigation Bar (sticky top)
- **Background:** `bg-white/80 backdrop-blur-sm` + bottom border
- **Height:** h-16 (64px)
- **Left:** Logo (40x40 rounded-xl, orange-to-red gradient bg, pizza emoji) + "Sonny8" bold text
- **Center (desktop):** Features | How it Works | Pricing | Demo — gray-600 links
- **Right (desktop):** "Sign in" text link + "Start Free Trial" gradient button (rounded-lg)
- **Mobile:** Hamburger icon → dropdown menu with same links + "Start Free Trial" button

### 1.2 Hero Section
- **Padding:** pt-28 pb-24 (desktop), pt-12 pb-12 (mobile)
- **Max-width:** max-w-4xl centered
- **Headline:** "Turn **Conversations** into Orders" — text-6xl bold, "Conversations" is gradient text (orange-to-red)
- **Subheadline:** text-2xl gray-600, dynamic from Firestore
- **CTA Buttons:** 2 side-by-side:
  - "Try Live Demo" — gradient bg, white text, rounded-xl, shadow-lg with orange shadow
  - "View Pricing" — white bg, gray-900 text, border-2, rounded-xl
- **Sub-text:** "14-day free trial • No credit card required" — gray-500

### 1.3 Problem Section (white bg)
- **Heading:** "The Problem Every Restaurant Faces" — text-4xl centered
- **3 Problem Cards** (grid cols-3):
  - Card 1: Phone emoji (📞) + "Calls Go to Voicemail" + description
  - Card 2: Worried emoji (😰) + "Staff Overloaded" + description
  - Card 3: X emoji (❌) + "Order Mistakes" + description
  - Each has colored circle icon bg
- **Solution Banner:** Full-width gradient rounded-3xl box:
  - "Sonny8 Fixes All of This" — text-3xl white bold
  - Description text — white/90

### 1.4 How It Works Section
- **Heading:** "How Sonny8 Works" + subtitle "Three simple steps..."
- **3 Steps** (grid cols-3):
  - Step 1: Orange square with "1" + "Guest Chats or Calls"
  - Step 2: Orange square with "2" + "Sonny8 Builds the Order"
  - Step 3: Orange square with "3" + "Staff Confirms & Cooks"
  - Number boxes: 80x80 rounded-2xl, orange bg, white text-3xl bold

### 1.5 Features Grid (white bg)
- **Heading:** "Everything You Need to Modernize Ordering"
- **Subtitle:** "Click 🔊 on any feature to hear how it works"
- **6 Feature Cards** (grid 3-col):
  - Each: white card, rounded-2xl, shadow-sm, border
  - Icon (emoji in colored circle), audio button (🔊), title bold, description gray-600
  - Features: AI Ordering (🤖), Menu Management (📋), Inventory & 86 Board (📦), 40+ Languages (🌍), Allergen Support (⚠️), Team & Roles (👥)

### 1.6 Stats Section
- **4 Stats** (grid 4-col centered):
  - Dynamic from Firestore (10K+ Orders, 500+ Restaurants, 4.9/5 Rating, <2min Response)
  - Values in primary orange, labels in gray-600

### 1.7 Google Reviews Section
- **Component:** `GoogleReviews` (separate component)
- **6 review cards** with star ratings, author names, review text
- Google Business link integration

### 1.8 Trust/Restaurant Types Section
- **Heading:** "Built for Restaurants of All Sizes"
- **Subtitle:** "From food trucks to multi-location chains"
- **4 Types** (grid 4-col): Pizzerias 🍕, Food Trucks 🚚, Cafes ☕, Fast Casual 🌮

### 1.9 FAQ Section (white bg)
- **Heading:** "Frequently Asked Questions"
- **Accordion items** in gray-50 rounded-2xl container
- Each: question (font-medium) + ▼ arrow, answer expands below
- Dynamic from Firestore

### 1.10 Final CTA Section (gradient bg)
- **Full-width gradient (orange → red)**
- **Heading:** "Ready to Transform Your Ordering?" — white bold text-4xl
- **Subtitle:** white/80
- **2 Buttons:** "Start Free Trial" (white bg, orange text) + "Watch Demo" (white border, white text)
- **Sub-text:** "No credit card required • Cancel anytime"

### 1.11 Footer (gray-900 bg)
- **Left:** Logo + "Sonny8" name
- **Center:** Terms | Privacy | Contact links
- **Right:** © 2026 copyright
- **Bottom:** "Powered by Sonny8" (text-xs gray-500)

---

## PAGE 2: LOGIN (`/login`)
**Source:** `frontend/src/app/login/page.tsx` (317 lines)
**Background:** `bg-gradient-to-br from-orange-50 to-red-50`

### 2.1 Logo Block (centered)
- Orange-to-red gradient square (64x64 rounded-2xl) with 🍕 emoji
- "Sonny8" — text-3xl bold
- "AI-Powered Restaurant Platform" — gray-600

### 2.2 Form Card (white rounded-2xl shadow-xl p-8, max-w-md)
- **Heading:** "Welcome back" — text-2xl bold
- **Subtitle:** "Sign in to your restaurant dashboard." — gray-600
- **Google Button:** Full-width, border, rounded-xl, Google SVG icon + "Continue with Google"
- **Divider:** "or" line
- **Email field:** label "Email" + input rounded-xl, placeholder "john@restaurant.com"
- **Password field:** label "Password" + input rounded-xl
- **"Forgot password?"** link (orange-600, right-aligned)
- **Error banner:** red-50 bg, red-200 border, rounded-xl
- **Submit button:** Full-width gradient (orange→red), "Sign in", rounded-xl font-semibold
- **Footer link:** "Don't have an account? Start free trial" (orange-600)

### 2.3 Password Reset View (same card, toggled)
- Back arrow + "Back to sign in"
- "Reset your password" heading
- Email input + "Send reset link" gradient button

### 2.4 Reset Confirmation View
- Green circle with email icon
- "Check your email" + email address
- "Back to sign in" link

### 2.5 Page Footer
- "Back to home" link (orange-600)

---

## PAGE 3: SIGNUP (`/signup`)
**Source:** `frontend/src/app/signup/page.tsx` (473 lines)
**Background:** same peach gradient

### 3.1 Logo Block (same as login)

### 3.2 Progress Steps (3-step indicator)
- 3 circles (32x32 rounded-full) connected by lines (48px wide, h-1)
- Active step: orange-500 bg white text
- Completed: green-500 bg white checkmark
- Future: gray-200 bg gray-400 text
- Step numbers: 1, 2, 3

### 3.3 Step 1: Account Creation (white card)
- **Heading:** "Create your account"
- **Subtitle:** "Start your 14-day free trial. No credit card required."
- Google sign-in button (same as login)
- "or" divider
- **Fields:** First name + Last name (2-col grid), Email, Password ("At least 8 characters"), Confirm password
- **Submit:** "Create account" gradient button
- **Footer:** "Already have an account? Sign in"

### 3.4 Step 2: Workspace Setup
- **Heading:** "Set up your restaurant"
- **Subtitle:** "Tell us about your business to get started."
- **Fields:** Business name (with hint text), Restaurant name (with hint), Phone number
- **Submit:** "Create workspace" gradient button

### 3.5 Step 3: Complete
- Green circle with checkmark (80x80)
- "You're all set!" — text-2xl bold
- "Welcome to Sonny8! Your restaurant is ready to go."
- Orange spinner + "Redirecting to dashboard..."

### 3.6 Page Footer
- "By signing up, you agree to our Terms of Service and Privacy Policy" with links

---

## PAGE 4: ORDER/CHAT (`/order`)
**Source:** `frontend/src/app/order/page.tsx` (1000+ lines, massive)
**Background:** white/light (themed)

This is the most complex page. Major components:

### 4.1 Top Navbar
- Restaurant name ("Tony's Famous Pizza") — bold
- Order type toggle: "Pickup" / "Delivery" pill buttons
- Status: "Closed" or "Open" badge
- Estimated time: "20-30m"
- Icons: phone, call, chat, menu (hamburger)

### 4.2 Welcome/Sonny Card
- Sonny avatar (orange circle with emoji)
- "Hey! I'm Sonny, your AI assistant for Tony's Famous Pizza"
- Welcome message card with text-to-speech icon

### 4.3 Quick Action Chips
- Horizontal scrollable row
- Pills: "Show Pizzas", "Today's Special", "Full Menu", "My Usual"
- Styled chips with icons

### 4.4 Popular Items Carousel
- **"Popular Right Now"** heading
- Horizontal scroll of product cards
- Each card: food photo (square, rounded), name, price, orange "+" button
- "View Full Menu" button below

### 4.5 Chat Area
- Messages between user and Sonny
- Sonny messages: left-aligned, avatar, bg-gray-100
- User messages: right-aligned, orange bg, white text
- Rich messages with parsed AI responses
- Text-to-speech (speaker) icon on Sonny messages

### 4.6 Chat Input
- "Ask Sonny anything..." placeholder
- Mic button (voice input)
- Send button (orange)
- Input has rounded-xl border

### 4.7 Menu Grid (when "Full Menu" opened)
- Category tabs (horizontal scroll)
- Item cards in grid: photo, name, description, price, "+" button
- Customize modal for item options

### 4.8 Cart Drawer (slide-in from right)
- Header: "Your Cart" + item count
- Cart items: name, customizations, quantity +/-, price, remove X
- Subtotal, tax, total
- "Proceed to Checkout" orange button

### 4.9 Checkout Page (full screen overlay)
- Order summary
- Contact info
- Payment method
- Order type (pickup/delivery)
- Delivery address (if applicable)
- "Place Order" button

### 4.10 Additional Modals
- Customer Login Modal
- Owner Login Modal / Staff Login Modal
- Customer Settings Modal
- Order History Modal
- Customize Item Modal (V2)
- Combo Customize Modal
- Review Modal
- Voice Chat Mode
- Upsell Banner
- Order Progress Banner

### 4.11 Footer
- "Open Now" or "Closed" status
- Phone number
- Restaurant info

---

## PAGE 5: PRICING (`/pricing`)
**Source:** `frontend/src/app/pricing/page.tsx` (300+ lines)
**Background:** same peach gradient

### 5.1 Header Nav (same as landing — sticky)
- Logo + nav (Features, Pricing highlighted, Demo) + Sign in + Start Free Trial

### 5.2 Hero
- **Heading:** "Simple Per-Location Pricing" (dynamic from Firestore)
- **Subtitle:** dynamic
- **Billing Toggle:** Monthly / Yearly switch with "Save 17%" badge
  - Toggle: w-14 h-7 rounded-full, orange when yearly

### 5.3 Pricing Cards (3-col grid)
- **Starter ($49/mo):** White card, rounded-2xl, border-gray-100
- **Pro ($99/mo):** White card, orange border-2, scale-105, "Most Popular" orange badge
- **Enterprise ($249/mo):** White card, border-gray-100
- Each card has:
  - Plan name (text-2xl bold)
  - Description
  - Price: "$49" text-4xl bold + "/month"
  - Feature list with green checkmarks
  - CTA button (gradient for popular, white for others)

### 5.4 Feature Comparison Table
- Full table with plan columns (Starter, Pro, Enterprise)
- Feature rows with checkmarks/values
- Responsive: scrollable on mobile

### 5.5 Included Monthly Usage Table
- Columns: Resource, Starter, Pro, Enterprise
- Rows: SMS/month, Voice minutes/month, AI tokens(K)/month
- Overage rates row

### 5.6 ROI Calculator (PricingCalculator component)
- "Multiple Locations" section
- Location slider (range input)
- Plan selector
- Calculated pricing result
- Volume Discount Tiers table: 0%/20%/40%/60%

### 5.7 FAQ Section
- 5 questions with expandable answers

### 5.8 CTA Footer (gradient bg)
- Same pattern as landing page

### 5.9 Footer (gray-900)
- Same as landing

---

## PAGE 6: DEMO (`/demo`)
**Source:** `frontend/src/app/demo/page.tsx` (371 lines)
**Background:** same peach gradient

### 6.1 Header Nav (same as landing)

### 6.2 Orange Banner
- Gradient bg (orange → red)
- "Watch in Action" / "Try the Live App" (depends on active tab)
- Subtitle text
- "Fullscreen" button + "Get Your Own" white button

### 6.3 Tab Buttons
- Pill toggle: "Watch Video Tour" (play icon) | "Try Live App" (monitor icon)
- Active tab: gradient bg white text
- Inactive: gray text on white bg

### 6.4 Video Tab Content
- YouTube embed / local video in rounded-2xl container with shadow-2xl
- If no video: "Video coming soon!" placeholder with 🎬 emoji
- "Try Live App" fallback button

### 6.5 Live App Tab Content
- Iframe embedding `/order?theme=light` at 800px height
- Fullscreen mode: fixed inset-0 with close button

### 6.6 Tips/Prompts Section (live tab only)
- "Try These Prompts" heading
- 4-col grid of prompt cards (clickable, sends to iframe)
- Each: label (orange), quoted prompt text

### 6.7 Features Section (video tab only)
- "What You'll See in This Demo" heading
- 4-col grid of feature cards: emoji icon, title, description
- "Try It Yourself" gradient button

### 6.8 CTA + Footer (same pattern as landing)

---

## PAGE 7: ADMIN HUB (`/admin`)
**Source:** `frontend/src/app/admin/page.tsx` (201 lines)
**Background:** `bg-gray-100`

### 7.1 Admin Header (white, sticky)
- "Sonny" (orange-500 text-2xl bold) | "Admin" (gray-600)
- "Back to Site" link on right

### 7.2 Page Header (centered)
- "Admin Dashboard" — text-4xl bold
- "Manage your Sonny AI restaurant platform" — gray-500

### 7.3 Admin Tools Grid (3-col)
- **Business Dashboard card:**
  - 56x56 gradient icon (orange→red) with bar chart SVG
  - "New" badge (orange-100 bg, orange-700 text, rounded-full)
  - Title, description, "Go to Business →" link (orange-500)
- **Marketing Config card:**
  - 56x56 gradient icon (purple→pink) with megaphone SVG
  - Title, description, arrow link
- **Firebase Console card:**
  - 56x56 gradient icon (yellow→orange) with flame SVG
  - External link icon (top right)
  - Opens in new tab

### 7.4 Quick Overview Stats (white card below grid)
- "Quick Overview" heading
- 4 stat boxes (gray-50 bg, rounded-xl):
  - Total Restaurants: — (dash)
  - Pending Requests: —
  - Monthly Revenue: —
  - Active Discounts: —
- "View detailed analytics in the Business Dashboard" link

### 7.5 Footer
- "Sonny AI Admin Dashboard • 2026" centered

---

## PAGE 8: BUSINESS DASHBOARD (`/admin/subscriptions`)
**Source:** `frontend/src/app/admin/subscriptions/page.tsx` + 6 component files
**Background:** `bg-gray-100`

### 8.1 Header (same as admin — "Sonny | Business Admin")

### 8.2 Page Header
- "Business Dashboard" — text-3xl bold
- "Manage subscriptions, pricing, discounts, and view revenue analytics"

### 8.3 Tab Navigation (5 tabs with icons)
- Analytics (bar chart icon) — orange underline when active
- Requests (clipboard icon)
- Pricing (dollar icon)
- Discounts (tag icon)
- Usage (document icon)

### 8.4 TAB: Analytics (`RevenueAnalytics` component)
- **Section heading:** "Revenue Analytics" + subtitle
- **8 Metric Cards** (2 rows of 4):
  - Row 1: MRR ($0, green icon), Total Customers (0, blue icon), Total Locations (0, purple icon), Avg Revenue/Customer ($0, orange icon)
  - Row 2: Conversion Rate (0.0%, blue trend icon), Active Discount Codes (0, pink heart icon), Price Overrides (0, green edit icon), Pending Requests (0, yellow clock icon)
  - Each card: white bg, rounded border, colored icon circle (40x40), value (text-2xl bold), label, sub-label gray
- **Revenue by Plan** table (white card):
  - Starter/Pro/Enterprise rows
  - Columns: Plan name (bold), Revenue/mo, customers count, locations count
- **Recent Activity** card (right side):
  - "No recent activity" empty state
- **Business Summary** banner (orange gradient, rounded-2xl):
  - 4 stats: Monthly Revenue, Active Customers, Locations Managed, Annual Revenue
  - White text on orange bg
- **Quick Actions** (white card):
  - 3 buttons: "View Public Pricing Page" (neutral), "+ Create Discount Code" (orange outline), "View Pending Requests" (green outline)

### 8.5 TAB: Requests (`SubscriptionRequestsManager` component)
- **Section heading:** "Subscription Requests"
- **5 Stat Cards** (row): Pending (amber), Approved (green), Rejected (red), Total Locations (gray), Monthly Revenue ($, orange)
- **Error banner** (pink bg): "Failed to load subscription requests"
- **Sub-tabs:** Pending (0) | Approved (0) | Rejected (0)
- **Empty state:** Document icon + "No pending requests"
- **Quick Actions** (same as Analytics tab)

### 8.6 TAB: Pricing (`VolumePricingManager` component)
- **Section heading:** "Volume Pricing Configuration"
- **Volume Pricing Tiers** card:
  - "Enabled" checkbox (top right, checked)
  - Table: Min Locations | Max Locations | Discount | Tier Name | Pro Price | Actions
  - 4 rows: Standard (1-4, 0%, $99), Growth (5-9, 20%, $79), Scale (10-19, 40%, $59), Enterprise (20+, 60%, $40)
  - Discount badges: green rounded pills
  - Action links: Edit (blue), Delete (red)
- **"+ Add Volume Tier"** dashed border button
- **Price Preview** cards (4):
  - 3 locations ($297/mo), 8 locations ($632/mo), 15 locations ($885/mo), 25 locations ($1,000/mo)
  - Each shows per-location price and discount percentage

### 8.7 TAB: Discounts (`DiscountCodeManager` component)
- **Section heading:** "Discount Code Management"
- **"+ New Code"** orange button (top right)
- **4 Stat Cards:** Total Codes (black), Active (green), Times Used (blue), Total Savings ($, orange)
- **Error banner:** "Failed to load discount codes"
- **Quick Start: Suggested Codes** (4 cards, 2x2):
  - WELCOME20 (20% off), CHAIN50 (50% off 10+ locs), TRYIT (1% off), PARTNER100 (100% off)
  - Each: bold code name, subtitle, discount amount
- **Sub-tabs:** Active (0) | All (0) | Expired (0)
- **Empty state:** Tag icon + "No active discount codes"

### 8.8 TAB: Usage (`UsageTrackingPanel` + `UsageSettingsPanel`)
- **Section heading:** "Usage Tracking"
- **"Usage This Month"** card:
  - "Demo Data" badge (orange)
  - 4 usage meters: SMS, Voice Input, Voice Output (Today/Month toggle), AI Tokens
  - Each: icon, progress bar (colored), "X / Y" usage, percentage, "Good" status
- **Pro Plan Limits** bar: SMS 500/mo, Voice In 60 min/mo, Voice Out 100K chars/mo, AI 2000K tokens/mo + "Upgrade Plan →" link
- **Usage Settings** card:
  - **Overage Billing** section:
    - Allow SMS Overage (toggle OFF)
    - Allow Voice Overage (toggle OFF)
    - Allow AI Token Overage (toggle ON, orange)
    - Allow Voice Output (TTS) Overage (toggle OFF)
    - Note: "Daily caps (15K/day) are hard stops..."
  - **Usage Notifications:**
    - Alert at 70% (toggle ON)
    - Alert at 90% (toggle ON)
    - Notification Email: text input "admin@yourrestaurant.com"
  - **Advanced: Fallback Behavior** (collapsed disclosure)
  - "Last updated: 2/5/2026, 11:45:19 PM"
- **Plan Limits Reference** table:
  - Columns: Resource, Starter, Pro, Enterprise
  - Rows: SMS/month, Voice minutes/month, AI tokens(K)/month, SMS overage rate, Voice overage rate

### 8.9 Footer (same: "Sonny AI Business Admin Dashboard • 2026")

---

## PAGE 9: MARKETING CONFIG (`/admin/marketing`)
**Source:** `frontend/src/app/admin/marketing/page.tsx` (93 lines)
**Background:** `bg-gray-100`

### 9.1 Header ("Sonny | Marketing Config", "Back to Admin")

### 9.2 Page Header
- "Marketing Configuration" — text-3xl bold
- Subtitle text

### 9.3 Coming Soon Card (white, rounded-2xl, centered)
- Purple circle (64x64) with megaphone SVG icon
- "Coming Soon" — text-xl semibold
- Description text
- **3 Feature Preview Cards** (gray-50, rounded-xl, 3-col):
  - Landing Page, Pricing Display, Branding
  - Each: title + description
- "Back to Admin Hub" orange button with arrow icon

---

## PAGE 10: KDS — Kitchen Display (`/kds`)
**Source:** `frontend/src/app/kds/page.tsx` → `KitchenDashboard` component
**Background:** `bg-gray-900` (dark theme)

### 10.1 KDS Header
- "Kitchen Display" title (white)
- Green "Online" badge
- Station filter chips: All | Oven | Fryer | Salad | Dessert | Drinks
- Counter badges showing counts per status (New/Preparing/Ready)
- "Allergy Only" / "Rush Only" toggle buttons

### 10.2 4-Column Kanban Layout
- **New Orders** column (red header border)
- **Preparing** column (yellow header border)
- **Ready** column (green header border)
- **Completed** column (gray header, "Show" toggle — hidden by default)

### 10.3 Order Cards (within columns)
- Dark card (gray-800 bg)
- Order number, time elapsed
- Status badge (colored)
- Item list with quantities
- Order type (Pickup/Delivery) + customer name
- Allergy/rush indicators if applicable

### 10.4 Empty States
- Emoji placeholder per column
- "No X orders" text

---

## PAGE 11: TOP FANS (`/top-fans`)
**Source:** `frontend/src/app/top-fans/page.tsx` (123 lines)
**Background:** `bg-gray-900` (dark)

### 11.1 Header
- "← Back to Menu" link (primary-500)
- "🏆 Top Fans" — text-4xl bold centered
- "Our most loyal customers" — gray-400

### 11.2 Tier Legend (horizontal)
- Tier icons + names (from config)
- Flex row with gaps

### 11.3 Leaderboard List
- **#1 (Gold):** gradient from-yellow-900/30, yellow-600 border, 🥇
- **#2 (Silver):** gradient from-gray-700/30, gray-500 border, 🥈
- **#3 (Bronze):** gradient from-orange-900/30, primary-700 border, 🥉
- **#4+:** gray-800 bg, gray-700 border, "#N" text
- Each entry: Rank, Tier icon, Name (bold text-lg), "X orders", Points (text-2xl bold primary-400)

### 11.4 Footer
- "Earn 1 point for every $1 spent"
- "Points unlock exclusive rewards and perks!"

### 11.5 Empty State
- 🍕 emoji
- "No fans on the leaderboard yet."
- "Order some pizza to earn points!"

---

## PAGE 12: BILLING (`/billing`)
**Source:** `frontend/src/app/billing/page.tsx` (371 lines)
**Background:** `bg-gray-50`

### 12.1 Auth Guard
- If not logged in: "Please sign in" + "Go to login" link centered

### 12.2 Page Header
- "← Back to Home" link (orange-600)
- "Billing & Subscription" — text-3xl bold
- "Manage your subscription and billing" — gray-600

### 12.3 Success/Cancel Banners
- Green bg: "Your subscription has been activated."
- Yellow bg: "Checkout was canceled."

### 12.4 Current Plan Status Card (white, rounded-xl, shadow-sm)
- "Current Plan" heading
- Plan name (text-2xl bold) + status badge (colored)
- Next billing date
- "Manage Billing" button (border, gray-700)

### 12.5 Available Plans Grid (4-col)
- Free Trial ($0), Starter ($49), Pro ($99), Enterprise ($249)
- Each card: white, rounded-xl, shadow-sm, border-2
- Current plan: orange border
- Plan name, price ($X text-3xl bold), feature list with green checkmarks
- Button: "Current Plan" (disabled gray), "Upgrade" (orange), "Switch" (gray)

### 12.6 Footer Note
- "All paid plans include a 14-day money-back guarantee."

---

## SHARED COMPONENTS TO BUILD IN FIGMA

### Navbar Variants
1. **Marketing Nav** — Logo + 4 links + Sign in + CTA button (Landing, Pricing, Demo)
2. **Admin Nav** — "Sonny | Admin" + Back to Site (Admin hub)
3. **Business Admin Nav** — "Sonny | Business Admin" + Back to Site
4. **Order Nav** — Restaurant name + order type toggle + status + icons

### Buttons
1. **Primary Gradient** — orange-to-red gradient, white text, rounded-xl
2. **Secondary** — white bg, border, gray text, rounded-xl
3. **Outline Orange** — transparent bg, orange border, orange text
4. **Outline Green** — transparent bg, green border, green text
5. **Ghost** — no bg, gray text, hover gray-100
6. **Disabled** — gray-100 bg, gray-500 text

### Form Elements
1. **Text Input** — border gray-300, rounded-xl, py-3 px-4, focus:ring-orange-500
2. **Toggle Switch** — w-14 h-7, rounded-full, orange when on
3. **Select/Dropdown**
4. **Checkbox**

### Cards
1. **Stat Card** — icon circle + value + label + sub-label
2. **Feature Card** — emoji icon + title + description + audio button
3. **Pricing Card** — plan name, price, features, CTA
4. **Admin Tool Card** — gradient icon + badge + title + description + arrow

### Status Badges
1. **Active/Online** — green-100 bg, green-700 text
2. **Pending** — blue-100 bg, blue-700 text
3. **Error/Rejected** — red bg variants
4. **Warning/Past Due** — yellow bg variants
5. **"New" badge** — orange-100 bg, orange-700 text, rounded-full
6. **"Most Popular"** — orange bg, white text, rounded-full

### Misc
1. **Google Sign-in Button** — white bg, border, Google SVG, "Continue with Google"
2. **"or" divider** — line with "or" text in center
3. **Progress Steps** — 3 circles connected by lines
4. **FAQ Accordion** — question + expand arrow + answer
5. **Tab Navigation** — horizontal tabs with underline indicator
6. **Billing Toggle** — Monthly/Yearly with "Save X%" badge
7. **Error Banner** — red/pink bg with text
8. **Toast notifications**

---

## FIGMA PAGE STRUCTURE (Recommended)

```
Sonny8 (Figma File)
├── 00 — Design System (tokens, colors, type scale, spacing, shadows)
├── 01 — Components (all shared components above)
├── 02 — Landing Page (desktop + mobile)
├── 03 — Auth: Login (default + reset password + reset confirmation)
├── 04 — Auth: Signup (step 1 + step 2 + step 3)
├── 05 — Order/Chat (main view + menu open + cart drawer + checkout)
├── 06 — Pricing (monthly + yearly toggle states)
├── 07 — Demo (video tab + live tab)
├── 08 — Admin Hub
├── 09 — Business Dashboard: Analytics
├── 10 — Business Dashboard: Requests
├── 11 — Business Dashboard: Pricing
├── 12 — Business Dashboard: Discounts
├── 13 — Business Dashboard: Usage
├── 14 — Marketing Config
├── 15 — KDS (Kitchen Display)
├── 16 — Top Fans / Leaderboard
├── 17 — Billing
```

---

## BUILD ORDER (Recommended)

1. **Design System** — colors, typography, spacing, radii
2. **Components** — buttons, inputs, cards, navbars, badges
3. **Landing Page** — biggest page, sets the visual tone
4. **Auth (Login + Signup)** — relatively simple, uses established tokens
5. **Pricing** — reuses landing nav + components
6. **Demo** — reuses landing nav + simple layout
7. **Order/Chat** — most complex page, build after tokens established
8. **Admin Hub** — simple, uses admin nav
9. **Business Dashboard** (all 5 tabs) — complex but formulaic
10. **Marketing Config** — simple "coming soon" page
11. **KDS** — dark theme, unique layout
12. **Top Fans** — dark theme, simple list
13. **Billing** — protected page, card grid

---

## NOTES

- All marketing pages (Landing, Pricing, Demo) share the same nav and footer pattern
- All admin pages (Admin, Subscriptions, Marketing) share admin nav pattern
- Colors come from Firestore `marketingConfig` but defaults are orange-500 (#f97316) and red-500 (#ef4444)
- The Order page is the most complex — it has 10+ modals and multiple view states
- KDS and Top Fans use dark themes; everything else is light
- All forms use rounded-xl inputs with orange focus rings
- Gradient buttons: `linear-gradient(to right, #f97316, #ef4444)`
- The app is fully responsive (mobile-first with sm/md/lg breakpoints)