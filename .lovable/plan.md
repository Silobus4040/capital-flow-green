

## Plan: Dashboard Enhancements — Repayment Text, Draw Controls, Login Tracking, Messaging, Live Bids

### 5 Features to Implement

---

### 1. Repayment Schedule Message Update
**File**: `src/pages/applicant/LoanRepayment.tsx` (line 104)
- Change empty state text from "No repayment schedule available yet." to "No repayment schedule available yet until Loan is closed."

---

### 2. Draw Schedule Access Controls
**File**: `src/pages/applicant/DrawSchedule.tsx`
- Fetch `program_name` (or `program_id`) along with applications
- Define draw-eligible program IDs: `rehab-loan`, `acquisition-development-construction` (covers Fix & Flip and Construction)
- If selected application's program is ineligible: hide "New Draw" button, show grayed-out text "Ineligible for draws"
- If user somehow tries to click (defensive): show red toast alert "Draws are only available for Rehab, Fix & Flip, and Construction deals."
- Eligible apps show the normal "New Draw" button

---

### 3. Borrower Login Tracking with FingerprintJS
**Database migration** — new `borrower_logins` table:
```
- id (uuid PK)
- user_id (uuid, NOT NULL)
- fingerprint_id (text)
- user_agent (text)
- ip_address (text)
- logged_in_at (timestamptz, default now())
```
RLS: Admins can SELECT all, borrowers can INSERT own records.

**New file**: `src/hooks/useLoginTracking.ts`
- Install `@fingerprintjs/fingerprintjs` (open source, free)
- On borrower login (called from `AuthContext.signIn`), generate fingerprint and insert into `borrower_logins`

**File**: `src/contexts/AuthContext.tsx`
- After successful `signIn`, call the login tracking hook/function

**Admin Dashboard** (`src/pages/admin/AdminDashboard.tsx`):
- Add a new tab "Borrower Activity"
- For each borrower with a profile, show: total logins, last login timestamp, device fingerprint, and a green "Active Now" dot if last login < 5 minutes ago
- Query `borrower_logins` grouped by `user_id` with count + max timestamp

---

### 4. Messaging Dashboard (Borrower ↔ Admin Real-Time Chat)

**Borrower side** — `src/pages/applicant/ApplicantMessages.tsx`:
- Replace the placeholder "Coming Soon" with the real `CommunicationPortal` component
- Fetch borrower's applications and pass `applicationId` to `CommunicationPortal`
- Borrower can send text + voice recordings (already built in CommunicationPortal)
- Play button on incoming admin voice notes (already built)

**Admin side** — `src/pages/admin/AdminDashboard.tsx`:
- Add a "Messages" tab
- List all applications that have messages (query `closing_messages` grouped by `application_id`)
- Click an application → open inline chat panel
- Admin can: send text, convert text to TTS voice note (using existing `elevenlabs-tts` edge function), play incoming borrower voice notes
- Admin TTS flow: type text → click "Send as Voice" → call edge function → upload audio to `closing-files` bucket → insert message with `audio_url` + `transcript` (original text)

**New component**: `src/components/AdminMessaging.tsx`
- Chat interface similar to `CommunicationPortal` but with admin role
- Includes TTS "Send as Voice Note" button
- Play button for incoming voice messages

---

### 5. Live Bids on Borrower Dashboard + Admin Bid Management

**Borrower Dashboard** (`src/pages/applicant/ApplicantDashboard.tsx`):
- For each application in `closing` or `funded` status, show a "Live Bids" section using the existing `LiveBiddingFeed` component
- Shows real-time investor bids, progress bar (% funded vs requested amount)

**Admin Dashboard** — new "Bidding" tab:
- For each application, admin can manage up to 9 investor bid slots (Investor-001 through Investor-009)
- Each bid row: investor label (editable), bid amount (editable input), status dropdown (bidded/liquidation_pending/committed)
- "Add Bid" button to insert new bids
- Save/update bids inline
- Show percentage of each bid relative to loan amount
- Show a small stat next to each investor: "Total bids on CCIF platform" (count of all bids by that investor label across all applications)

**Database**: `closing_bids` table already exists with the right schema. No migration needed for bids.

**New component**: `src/components/admin/AdminBidManager.tsx`
- Per-application bid management panel
- Editable fields for investor_label, bid_amount, status
- Shows `(bid_amount / requested_amount * 100).toFixed(1)%` next to each bid
- Aggregates total bids per investor label across all applications

---

### Files Summary

| Action | File |
|--------|------|
| Modify | `src/pages/applicant/LoanRepayment.tsx` — empty state text |
| Modify | `src/pages/applicant/DrawSchedule.tsx` — access controls by program type |
| Modify | `src/pages/applicant/ApplicantMessages.tsx` — replace placeholder with real chat |
| Modify | `src/pages/applicant/ApplicantDashboard.tsx` — add live bids section for closing apps |
| Modify | `src/pages/admin/AdminDashboard.tsx` — add Borrower Activity, Messages, Bidding tabs |
| Modify | `src/contexts/AuthContext.tsx` — call login tracker on sign-in |
| Create | `src/hooks/useLoginTracking.ts` — FingerprintJS integration |
| Create | `src/components/AdminMessaging.tsx` — admin chat with TTS |
| Create | `src/components/admin/AdminBidManager.tsx` — bid management UI |
| Migration | Create `borrower_logins` table + RLS |
| Install | `@fingerprintjs/fingerprintjs` |

