

## Build Error Fix

All 6 form files have `entityName` in their TypeScript interface but are missing it in the `setFormData` reset call after successful submission. The fix is simple: add `entityName: ""` to the reset object in each file.

### Files to modify (single line addition each)

1. **`src/components/forms/DSCRLoanForm.tsx`** (line ~132) — add `entityName: ""` to reset object
2. **`src/components/forms/BusinessAcquisitionForm.tsx`** (line ~144) — add `entityName: ""` to reset object
3. **`src/components/forms/RVParkForm.tsx`** (line ~143) — add `entityName: ""` to reset object
4. **`src/components/forms/RehabInvestorForm.tsx`** (line ~152) — add `entityName: ""` to reset object
5. **`src/components/forms/SelfStorageForm.tsx`** (line ~129) — add `entityName: ""` to reset object
6. **`src/components/forms/SeniorLivingForm.tsx`** (line ~151) — add `entityName: ""` to reset object

Each reset block currently starts with a field like `borrowerName` or `loanType` — `entityName: ""` will be added as the first property in each reset object.

### Also pending: RLS policy fix + Commercial Mortgage form fix
These were discussed previously and still need to be applied:
- Database migration to make `loan_program_applications` RLS policies PERMISSIVE
- Commercial Mortgage form loan purpose options correction

