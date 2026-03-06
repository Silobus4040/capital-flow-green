

## Plan: Revamp Signup & Login UI + Define Next Phase Features

This is a large plan covering: (1) UI redesign of signup/login pages, (2) signup flow simplification, (3) email validation against application data, and (4) listing all next-phase features.

---

### 1. Redesign Signup Page (`ApplicantSignup.tsx`) -- Complete Rewrite

**Layout**: Split-screen on desktop (left: hero image + feature list, right: form). Full-width stacked on mobile.

- **Left panel**: Background image of a person holding phone smiling while managing their loan (use a stock-style illustration or upload). Feature bullets:
  - Draw Schedule Management
  - Loan Repayment Tracking
  - Document Submission & E-Signing
  - Live Bidding Feed
  - Secure Communication Portal
  - Closing Checklist & Payment Portal
  - Post-Close Access & Archives
- **Right panel**: The signup form

**Simplified flow (remove step indicators)**:
1. **Screen 1**: Email + Password fields. Banner: "Use the email from your loan application." Password hint: "Use a secure password (min 8 chars, mix of letters & numbers)." On submit, call `signUp()`. **Before calling signUp**, check if the email exists in `loan_program_applications` via a new RPC. If not found, show red error at top: "This email is not associated with any loan application. Please use the email provided during your loan application."
2. **Screen 2**: 6-digit OTP verification (as currently implemented).
3. **Screen 3**: Dialog/popup styled as "One Last Step!" -- Loan ID input field. Match against email + Loan ID via `verify_loan_id` RPC. On success, link application and redirect.

**Email pre-validation RPC** (new DB function):
```sql
CREATE OR REPLACE FUNCTION public.check_application_email(_email text)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.loan_program_applications
    WHERE borrower_email = _email
  )
$$;
```

### 2. Redesign Login Page (`ApplicantLogin.tsx`)

**Same split-screen layout** as signup. Left panel with hero image and CCIF branding + feature highlights. Right panel with login form. Mobile-friendly stacked layout. Add CCIF logo at top of form. Style error messages in red at top.

### 3. Bounce Non-Application Emails

Before initiating signup, call `check_application_email` RPC. If returns `false`, display red error: "This email is not associated with any loan application. Please contact your account executive." Do NOT proceed with `signUp()`.

### 4. Update AuthContext

- Remove `fullName` parameter from `signUp` method since name comes from application data
- Keep OTP verification flow as-is

### 5. Database Migration

- Add `check_application_email` RPC function

### Files to Modify

| File | Change |
|------|--------|
| `src/pages/applicant/ApplicantSignup.tsx` | Complete rewrite: split-screen UI, feature list, simplified 2-screen + popup flow, email validation |
| `src/pages/applicant/ApplicantLogin.tsx` | Complete rewrite: split-screen UI, hero image, better styling |
| `src/contexts/AuthContext.tsx` | Remove `fullName` from `signUp` signature |
| DB migration | Add `check_application_email` RPC |

---

### Next Phase Features (Post-Signup Completion)

Here is the full list of features we discussed for the **CCIF Closing Dashboard** and beyond:

1. **Live Bidding Feed** -- Real-time table showing Investor ID (anonymized, e.g. Investor-747), Bid Amount, editable Bid Status (Bidded, Liquidation Pending, Borrower's Commitment). Progress bar showing funding completion (e.g. 65% of $20M). Backend admins update statuses in real-time.

2. **Communication Portal** -- Secure in-app messaging between Account Executives (admins) and Loan Applicants. Admin side: text messaging + ElevenLabs TTS to send voice-note-style messages (text converted to speech). Applicant side: voice recordings and text only (no TTS). Auto-generated transcripts. One-click thread export. 180-day post-repayment retention policy.

3. **Closing Checklist** -- Interactive progress tracker for title clearance, insurance binders (hazard at ARV levels), escrow. Color-coded flags. Automated deadline reminders (e.g. wires 48hrs pre-close).

4. **Document Review & E-Signing** -- Upload/download closing docs (term sheets, deeds, guaranties). E-sign with audit trails and version history.

5. **Payment & Funding Portal** -- Itemized closing cost previews (fees, payoffs). Secure wire instructions tied to bid totals. Live escrow balance updates.

6. **Post-Close Access** -- Final docs, payoff schedules, deal history for refinancing. Auto-archives 180 days post-repayment.

7. **Draw Schedule Management** -- Track construction draw requests and disbursements.

8. **Loan Repayment Tracking** -- Payment history, upcoming payments, payoff calculator.

9. **Admin-to-Borrower Real-Time Messaging** -- Live chat from admin portal to borrower portal.

10. **Legal Compliance Banner** -- "CCIF assumes 100% liability for all communication data -- fully retained for loan life + 180 days post-repayment."

