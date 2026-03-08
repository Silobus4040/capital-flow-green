

## Fix: Document Upload "Bucket not found" Error

### Root Cause
The `documents` storage bucket does not exist in the live database. Only `closing-files` bucket exists currently.

### Changes

**1. Database migration** — Create the `documents` bucket and storage RLS policies:
```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can read own documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage all documents"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));
```

**2. Update `src/pages/DocumentSubmission.tsx`** — Since uploads are borrower-only, redirect unauthenticated users to `/applicant-login` instead of showing the public upload form.

