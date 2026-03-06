

## Plan: Update Borrower Name Logic + Rename to "Loan Applicant"

### What Changes

**1. Update how `borrower_name` is saved during loan application submission**

In all loan application forms (e.g., `CommercialMortgageForm.tsx` and similar), change the `borrowerName` logic from:
```
borrowerName: `${firstName} ${lastName}`
```
to:
```
borrowerName: entityName?.trim() || `${firstName} ${lastName}`
```

This applies to all form components that submit via `usePublicApplications`. I will audit each form to apply this.

**2. Update the signup flow to pull the correct name**

In `ApplicantSignup.tsx`, after Loan ID verification, create an RPC `get_borrower_display_name(_email, _loan_id)` that returns `borrower_name` from the matched `loan_program_applications` row. This already contains the correct name (entity name or first+last) from step 1. Remove the "Full Name" input field; use the fetched name for the profile instead.

**3. Rename "Borrower" to "Loan Applicant" on dashboard**

In `ApplicantDashboard.tsx`:
- Change welcome text from "Welcome back, {name}!" keeping same greeting but using "Loan Applicant" as the fallback
- Change page title references from "Borrower" to "Loan Applicant"

In `ApplicantSignup.tsx`:
- Change "Borrower Portal Sign Up" to "Loan Applicant Portal Sign Up"

**4. DB migration: New RPC function**

```sql
CREATE OR REPLACE FUNCTION public.get_borrower_display_name(_email text, _loan_id text)
RETURNS text
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT borrower_name
  FROM public.loan_program_applications
  WHERE borrower_email = _email
    AND loan_id = _loan_id
  LIMIT 1
$$;
```

**5. Update `handle_new_user` trigger**

Pull `full_name` from user metadata's `borrower_display_name` if present, falling back to `full_name`, then email.

### Files to Modify

| File | Change |
|------|--------|
| `src/components/CommercialMortgageForm.tsx` | Use entityName as primary borrowerName |
| All other form components (`DSCRLoanForm`, `RehabInvestorForm`, etc.) | Same entityName-first logic where applicable |
| `src/pages/applicant/ApplicantSignup.tsx` | Remove Full Name field, fetch name from DB after Loan ID verify, rename to "Loan Applicant" |
| `src/pages/applicant/ApplicantDashboard.tsx` | Rename "Borrower" to "Loan Applicant" |
| `src/contexts/AuthContext.tsx` | Pass fetched display name in signUp metadata |
| DB migration | Add `get_borrower_display_name` RPC, update `handle_new_user` |

### Next Steps Reminder (from previous discussion)

After this signup flow is complete, the remaining steps are:

1. **Test the full signup flow end-to-end** -- email entry, OTP 6-digit code verification, Loan ID linking
2. **Implement the multi-step signup with OTP** -- email confirmation via 6-digit code before Loan ID entry (discussed previously, still pending)
3. **Move error messages to top of form in red** (discussed previously, still pending)
4. **Add info banner** telling users to use their loan application email
5. **Test Resend email delivery** -- verify confirmation emails are actually being sent
6. **Verify the full borrower portal** -- dashboard, messages, documents all working after signup

