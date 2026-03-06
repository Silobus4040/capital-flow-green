

## Plan: Full Closing Dashboard Suite + UI Fixes

### Scope Summary
1. Remove CCIF logo from "One Last Step" Loan ID page
2. Add scrolling news ticker to all headers (public + applicant)
3. Build 10 closing dashboard modules on the Borrower Portal

---

### 1. Remove Logo from Loan ID Step
**File**: `src/pages/applicant/ApplicantSignup.tsx`
- Remove the logo `<img>` block (lines 214-216) from the `loan-id` step render

### 2. Scrolling News Ticker
**New file**: `src/components/NewsTicker.tsx`
- Persistent top banner with CSS marquee animation
- Text: "📱 CCIF APP will be available on the App Store & Google Play Store soon!"
- Dark background, white text, always visible

**Files modified**:
- `src/components/Header.tsx` — add `<NewsTicker />` above the header
- `src/components/ApplicantLayout.tsx` — add `<NewsTicker />` above the header
- `src/components/Layout.tsx` — add `<NewsTicker />` above the header

### 3. Database Migrations (8 new tables + 1 storage bucket)

```text
Tables to create:
┌─────────────────────────────┬──────────────────────────────────────┐
│ Table                       │ Purpose                              │
├─────────────────────────────┼──────────────────────────────────────┤
│ closing_bids                │ Investor bids per application        │
│ closing_messages            │ Admin↔Borrower messaging             │
│ closing_checklist_items     │ Title, insurance, escrow items       │
│ closing_documents           │ Upload/download + audit trail        │
│ closing_payments            │ Closing costs, wire tracking         │
│ draw_schedules              │ Draw request management              │
│ loan_repayments             │ Repayment tracking                   │
│ post_close_documents        │ Final docs, payoff schedules         │
└─────────────────────────────┴──────────────────────────────────────┘

Storage bucket: closing-files (for documents, voice recordings, TTS audio)
Realtime: Enable on closing_bids, closing_messages
```

Each table has `application_id` FK to `loan_program_applications.id`, RLS policies for borrower (own data) and admin (all data).

### 4. Applicant Dashboard Sidebar Nav Update
**File**: `src/components/ApplicantLayout.tsx`
- Add nav items: Closing Dashboard, Draw Schedule, Repayments, Documents

### 5. New Pages & Components

**Closing Dashboard Hub** (`src/pages/applicant/ClosingDashboard.tsx`)
- Only visible when application status = 'closing'
- Tab-based layout with 6 modules

**Module Components**:

| Component | Features |
|-----------|----------|
| `src/components/closing/LiveBiddingFeed.tsx` | Real-time table of anonymized investor bids (Investor-XXX), color-coded progress bar showing % funded vs requested amount |
| `src/components/closing/CommunicationPortal.tsx` | Thread-based messaging, admin sends TTS voice via ElevenLabs, borrower sends text + voice recordings, transcripts, 180-day retention notice |
| `src/components/closing/ClosingChecklist.tsx` | Interactive checklist (title clearance, insurance, escrow), deadline dates, automated reminder indicators |
| `src/components/closing/DocumentReview.tsx` | Upload/download documents, audit trail (who uploaded, when, viewed), e-sign status tracking |
| `src/components/closing/PaymentPortal.tsx` | Closing cost breakdown, wire instruction display, escrow balance updates |
| `src/components/closing/PostCloseAccess.tsx` | Final document access, payoff schedule display, auto-archive notice |

**Standalone Pages**:

| Page | Path | Features |
|------|------|----------|
| `src/pages/applicant/DrawSchedule.tsx` | `/applicant-draw-schedule` | Draw request submissions, status tracking, amounts |
| `src/pages/applicant/LoanRepayment.tsx` | `/applicant-repayment` | Payment history, upcoming payments, balance |

### 6. Admin-to-Borrower Real-Time Messaging
- Uses `closing_messages` table with realtime subscription
- Admin sends from AdminDashboard, borrower receives in CommunicationPortal
- ElevenLabs TTS integration for admin voice notes (already have API key configured)
- Voice recording component for borrower (reuse existing `VoiceRecorder.tsx`)

### 7. Legal Compliance Banner
- Displayed at top of Closing Dashboard
- Text: "CCIF assumes 100% liability for all communication data — fully retained for loan life + 180 days post-repayment."
- Styled as a legal notice bar

### 8. Routes
**File**: `src/App.tsx`
- Add routes for `/applicant-closing`, `/applicant-draw-schedule`, `/applicant-repayment`
- All protected with `borrower` role

### Files Summary

| Action | Count |
|--------|-------|
| New components | 8 (6 closing modules + NewsTicker + ClosingDashboard page) |
| New pages | 2 (DrawSchedule, LoanRepayment) |
| Modified files | 5 (ApplicantSignup, Header, ApplicantLayout, Layout, App.tsx) |
| DB migrations | 1 large migration (8 tables + bucket + realtime + RLS) |
| Edge functions | 0 new (reuse existing ElevenLabs + TTS functions) |

