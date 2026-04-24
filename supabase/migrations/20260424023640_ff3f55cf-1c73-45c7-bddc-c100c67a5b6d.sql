
-- Allow anonymous uploads to documents bucket
CREATE POLICY "Public can upload documents with loan id"
ON storage.objects
FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'documents');

-- Allow public inserts into document_uploads tracking table (user_id can be null for public submissions)
ALTER TABLE public.document_uploads ALTER COLUMN user_id DROP NOT NULL;

CREATE POLICY "Public can insert document uploads"
ON public.document_uploads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
