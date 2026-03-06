

## Plan: Fix Loan ID Step Being Skipped + Green Toast + Application Linking

### Root Cause
The Loan ID step is being **skipped** because of a race condition:
1. `verifyOtp({ type: 'signup' })` succeeds → user is authenticated immediately
2. `onAuthStateChange` fires in AuthContext → sets `user`
3. Component re-renders → line 40-42 `if (user) return <Navigate to="/applicant-dashboard" />` fires
4. User is redirected **before** the Loan ID dialog can appear

This also explains "No applications found" — the `user_id` was never linked to the application row because the Loan ID step never ran.

### Changes

**1. `src/pages/applicant/ApplicantSignup.tsx`**
- Add a `skipRedirect` ref/state that prevents the `<Navigate>` from firing when we're in the middle of signup (after OTP verify, during loan-id step)
- Change line 40-42: only redirect if `skipRedirect` is false — i.e., the user arrived at the page already logged in, not mid-signup
- Style the "Verification Code Sent" toast with a green className

**2. Toast styling**
- Add `className: 'bg-green-50 border-green-200 text-green-800'` to the success toast calls (verification sent + account linked)

### Files to Modify
| File | Change |
|------|--------|
| `src/pages/applicant/ApplicantSignup.tsx` | Add `skipRedirect` state to prevent redirect during signup flow; green toast styling |

