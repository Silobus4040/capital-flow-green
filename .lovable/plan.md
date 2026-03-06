

## Plan: Enhance Applicant Dashboard with Loan Details & Progress

The dashboard already fetches applications but needs better display of key fields and a "Day X of 14" progress indicator.

### Changes — `src/pages/applicant/ApplicantDashboard.tsx`

1. **Add Borrower Name display** — show `app.borrower_name` prominently in each card
2. **Add full Property Address** — combine `property_address`, `property_city`, `property_state`, `property_zip`
3. **Add "Day X of 14" progress indicator** — calculate days since `created_at`, show as text + a `<Progress>` bar (capped at 14 days)
4. **Ensure Program Type is always visible** — already shown but improve layout
5. **Import `Progress` component** and `User` icon from lucide

### Layout per application card:
- **Header**: Program Name (left) + Status badge (right)
- **Body grid**:
  - Borrower Name (with User icon)
  - Loan Amount (with DollarSign icon)
  - Property Address (full, with MapPin icon)
  - Program Type (with FileText icon)
  - Submission Date + "Day X of 14" with progress bar (with Calendar icon)
- **Footer**: Messages + Documents buttons

### Files to Modify
| File | Change |
|------|--------|
| `src/pages/applicant/ApplicantDashboard.tsx` | Add borrower name, full address, day progress bar, improve card layout |

No database changes needed — all fields are already fetched.

