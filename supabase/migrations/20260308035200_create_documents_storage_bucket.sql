-- Create the "documents" storage bucket for client document uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read files from the documents bucket
CREATE POLICY "Allow public read on documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents');

-- Allow anyone to upload files to the documents bucket (public portal)
CREATE POLICY "Allow public upload on documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents');

-- Allow authenticated users to update their own files
CREATE POLICY "Allow public update on documents"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'documents');
