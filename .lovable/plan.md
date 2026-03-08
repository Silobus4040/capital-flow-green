

## Problem
When visiting `/loan-programs/:programId/apply`, the page still shows the full program details + terms, with the application form tacked on at the bottom. The `/apply` route should show ONLY the application form — a clean, standalone page.

## Plan

### Modify `LoanProgramDetail.tsx` — split into two views

When `isApplyRoute` is true, render **only** the application form (with a "Back to Program Details" button and program name header). Skip the program card, image, and terms entirely.

When `isApplyRoute` is false, render the current program details + terms view (no form).

**Concrete change**: In the main return block (line 122+), add an early return when `isApplyRoute` is true that renders just:
- Back button (to `/loan-programs/{programId}`)
- Program name heading
- `ProgramApplicationForm` component

The existing return (program details + terms) stays for the non-apply route, but the `showApplicationForm` conditional block at the bottom (lines 191-213) gets removed entirely since the form now only appears on the `/apply` route.

### Files to modify
- `src/pages/LoanProgramDetail.tsx` only

