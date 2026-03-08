

## Problem
Both "View Details" and "Apply Now" buttons on loan program cards navigate to the same URL (`/loan-programs/{id}`), which shows terms first. The actual application form only appears after scrolling to the bottom and clicking another "Apply Now". Users also can't share a direct link to the application form.

## Plan

### 1. Add a new route for direct application access
Add `/loan-programs/:programId/apply` route in `App.tsx` that renders `LoanProgramDetail` with the form auto-opened.

### 2. Update `LoanProgramDetail.tsx`
- Read a query param or route segment (`/apply`) to auto-show the application form on load
- Remove the "Ready to Apply?" card section at the bottom (lines 191-210) — the only way to reach the form will be via the direct `/apply` route or the card buttons
- Keep the application form rendering logic

### 3. Update `LoanPrograms.tsx` card buttons
- "View Details" → navigates to `/loan-programs/{id}` (terms page, no form)
- "Apply Now" → navigates to `/loan-programs/{id}/apply` (jumps straight to the form)

This gives every program a shareable apply link like `https://capital-flow-green.lovable.app/loan-programs/rv-park-financing/apply`.

### Files to modify
- **`src/App.tsx`** — add `/loan-programs/:programId/apply` route
- **`src/pages/LoanProgramDetail.tsx`** — read route to auto-show form; remove the redundant "Ready to Apply?" CTA card
- **`src/pages/LoanPrograms.tsx`** — change "Apply Now" button to navigate to `/apply` sub-route

