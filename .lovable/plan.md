

## Plan: Fix Loan ID Verification + Full-Page Loan ID & Success Steps

### Problems Found

1. **`verify_loan_id` SQL function** has `AND user_id IS NULL` — fails if app was already linked (e.g., re-signup attempts)
2. **Application linking fails silently** — the direct `UPDATE loan_program_applications SET user_id = ...` on line 153-157 is blocked by RLS (only admins can update that table). Need a SECURITY DEFINER function.
3. **Loan ID step is a popup Dialog** — user wants a full-page green-themed step with a Cancel button
4. **No success screen with loan details** — user wants to see: Borrower Name, Loan Amount, Property Address, Program Type, Submission Date + days in process

### Database Migration

```sql
-- 1. Fix verify_loan_id: remove user_id IS NULL restriction
CREATE OR REPLACE FUNCTION public.verify_loan_id(_email text, _loan_id text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (
  SELECT 1 FROM public.loan_program_applications
  WHERE borrower_email = _email AND loan_id = _loan_id
) $$;

-- 2. New function to link application (bypasses RLS)
CREATE OR REPLACE FUNCTION public.link_application_to_user(
  _email text, _loan_id text, _user_id uuid
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _app record;
BEGIN
  UPDATE public.loan_program_applications
  SET user_id = _user_id
  WHERE borrower_email = _email AND loan_id = _loan_id
  RETURNING borrower_name, requested_amount, property_address,
    program_name, created_at, property_city, property_state
  INTO _app;

  IF NOT FOUND THEN RETURN NULL; END IF;

  RETURN jsonb_build_object(
    'borrower_name', _app.borrower_name,
    'requested_amount', _app.requested_amount,
    'property_address', _app.property_address,
    'property_city', _app.property_city,
    'property_state', _app.property_state,
    'program_name', _app.program_name,
    'created_at', _app.created_at
  );
END $$;
```

### Code Changes — `src/pages/applicant/ApplicantSignup.tsx`

1. **Add `'success'` to `SignupStep` type**

2. **Replace the `<Dialog>` Loan ID step** with a full-page inline step:
   - Green background (`bg-green-50`) matching existing brand
   - CCIF logo at top, checkmark icon, "One Last Step" heading
   - Loan ID input with label and helper text
   - "Link My Application" button + "Cancel" button (signs out, redirects to login)
   - Responsive for mobile and desktop

3. **Replace `handleLoanIdSubmit` logic**:
   - Call new `link_application_to_user` RPC instead of direct UPDATE (fixes RLS block)
   - Store returned loan details in state
   - Navigate to `'success'` step instead of redirecting

4. **Add full-page success step** showing:
   - Green background with checkmark
   - Borrower Name, Loan Amount, Property Address, Program Type
   - Submission Date with "Day X of Y" calculation
   - "Continue to Dashboard" button

5. **Cancel button**: calls `supabase.auth.signOut()` and navigates to `/applicant-login`

### Files to Modify
| File | Change |
|------|--------|
| Database migration | Fix `verify_loan_id`, add `link_application_to_user` RPC |
| `src/pages/applicant/ApplicantSignup.tsx` | Replace Dialog with full-page steps, use new RPC, add success screen |

