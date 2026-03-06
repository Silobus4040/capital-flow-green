

## Plan: Fix CommercialMortgageForm Validation + Full-Page Success Redirect + Dashboard Linking

### 3 Issues to Address

**Issue 1: CommercialMortgageForm validation not treating Entity Name as primary**
All other 10 forms correctly use entityName as the single source of truth. `CommercialMortgageForm` (line 90) still requires `firstName` AND `lastName` always, ignoring entityName. Need to fix validation to match the pattern used in all other forms: require either entityName OR (firstName + lastName).

**Issue 2: Application form is a popup Dialog — user wants full-page redirect after submission**
Currently `LoanProgramDetail.tsx` opens application forms in a `<Dialog>` (line 157). After successful submission, user wants to be redirected to a full-page green-themed success screen showing:
- "Thank you for choosing Commercial Capital & Investment Inc for your financing needs!"
- "We've received your loan request and will review it shortly."
- "Expect a tailored Term Sheet & Loan Estimate in your email within 1–2 business days, detailing your potential rates, terms, and clear next steps."

**Issue 3: Dashboard linking**
Already implemented via `link_application_to_user` RPC and the signup flow. Need to verify no code gap exists — the `handleLoanIdSubmit` in `ApplicantSignup.tsx` calls the RPC and links the user. The dashboard fetches applications where `user_id = auth.uid()`. This should work end-to-end once Issues 1-2 are fixed.

---

### Changes

**1. `src/components/CommercialMortgageForm.tsx`**
- Update validation (line 90) from requiring firstName+lastName always, to: `(!entityName && (!firstName || !lastName))`
- Update firstName/lastName labels to show conditional `*` based on entityName presence
- Move entityName field above firstName/lastName in the form layout

**2. `src/pages/LoanProgramDetail.tsx`**
- Replace `<Dialog>` approach with navigation-based flow
- Add a `submitted` state that, when true, replaces the entire page content with a full-page green success screen
- Success screen content:
  - Green gradient background (matching existing brand)
  - CCIF logo
  - "Thank you for choosing Commercial Capital & Investment Inc for your financing needs!"
  - "We've received your loan request and will review it shortly."
  - "Expect a tailored Term Sheet & Loan Estimate in your email within 1–2 business days..."
  - "Back to Loan Programs" button
  - "Apply for Another Program" button
- Update `handleApplicationFormSuccess` to set `submitted = true` instead of closing dialog
- When `submitted` is true, render the full-page success screen instead of the program detail page
- Keep the inline form (no dialog) — show the application form directly on the page when "Apply Now" is clicked, and show the success page after submission

**3. No database changes needed** — the `link_application_to_user` function and dashboard query are already correctly implemented.

### Files to Modify
| File | Change |
|------|--------|
| `src/components/CommercialMortgageForm.tsx` | Fix validation to treat entityName as primary, reorder fields |
| `src/pages/LoanProgramDetail.tsx` | Replace Dialog with inline form + full-page green success screen |

