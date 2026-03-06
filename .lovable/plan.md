

## Secure Signup with Loan ID Verification

### Problem
Auto-linking by email alone is risky -- anyone who guesses a borrower's email could claim their applications. Adding a **Loan ID** as a second verification factor solves this.

### Plan

**1. Database: Add `loan_id` column to `loan_program_applications`**

- New column `loan_id` (text, nullable, unique) on `loan_program_applications`
- Admin manually sets this value per application (e.g. "CCIF-2026-0042")
- This is the ID you share with the borrower so they can sign up

**2. Signup page: Add Loan ID field**

- Add a required "Loan ID" input to `ApplicantSignup.tsx`
- Before creating the account, verify the email + Loan ID combo exists in `loan_program_applications` via a server-side check (edge function or RPC) so we don't expose application data client-side
- If no match → block signup with "Invalid Loan ID or email" error
- If match → proceed with signup, store Loan ID in user metadata for the trigger to use

**3. Database trigger: Auto-link using email + Loan ID**

- New `SECURITY DEFINER` function `link_applications_on_signup()` fires after profile insert
- Matches on BOTH `borrower_email = email` AND `loan_id = metadata.loan_id`
- Only links where `user_id IS NULL` (prevents double-linking)

**4. Verification RPC (database function)**

Create a `SECURITY DEFINER` function `verify_loan_id(email text, loan_id text)` that returns a boolean. This runs without RLS so the signup form can check the combo without exposing any data. Called from the signup page before `signUp()`.

**5. Admin Dashboard: Show/edit Loan ID**

- Display `loan_id` column in the applications list
- Allow admin to set/edit it inline (this is how you assign IDs to applications)

### Files affected

| Action | File |
|--------|------|
| Migration | Add `loan_id` column, create `verify_loan_id` RPC, create `link_applications_on_signup` trigger |
| Modify | `src/pages/applicant/ApplicantSignup.tsx` -- add Loan ID field + verification call |
| Modify | `src/contexts/AuthContext.tsx` -- pass loan_id in signUp metadata |
| Modify | `src/pages/admin/AdminDashboard.tsx` -- show/edit Loan ID per application |

