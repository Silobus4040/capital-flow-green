

## Problem
Documents upload to storage successfully, but there's **no tracking table** and **no admin view**. Files go into the `documents` bucket under `{userId}/{timestamp}_{name}.ext` but nobody can see them — not you as admin, and not borrowers reviewing their history.

## Plan

### 1. Create `document_uploads` database table
Track every uploaded document with borrower association:

```sql
CREATE TABLE public.document_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  file_name text NOT NULL,
  document_name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint,
  file_type text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.document_uploads ENABLE ROW LEVEL SECURITY;

-- Borrowers can insert their own docs
CREATE POLICY "Users can upload own documents" ON public.document_uploads
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- Borrowers can view their own docs  
CREATE POLICY "Users can view own documents" ON public.document_uploads
  FOR SELECT TO authenticated USING (user_id = auth.uid());

-- Admins can view all
CREATE POLICY "Admins can manage all documents" ON public.document_uploads
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
```

### 2. Update `ApplicantDocuments.tsx`
After each successful storage upload, insert a record into `document_uploads` with `user_id`, `document_name`, `file_path`, `file_size`, `file_type`, and `notes`.

### 3. Add "Uploaded Documents" tab to Admin Dashboard
New tab in the admin dashboard showing all uploaded documents with:
- Borrower name/email (joined from profiles)
- Document name, file name, upload date
- Download link (signed URL from storage)

### 4. Add document history to Borrower Portal
Show borrowers their previously uploaded documents on the same `ApplicantDocuments` page below the upload form.

### Files to modify
- **New migration**: Create `document_uploads` table + RLS
- **`src/pages/applicant/ApplicantDocuments.tsx`**: Insert tracking record on upload; show upload history
- **`src/pages/admin/AdminDashboard.tsx`**: Add documents tab with borrower info

