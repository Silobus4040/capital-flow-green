
-- Create private "documents" bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false)
ON CONFLICT (id) DO NOTHING;

-- Authenticated users can upload documents
CREATE POLICY "Authenticated users can upload documents"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

-- Authenticated users can read own documents
CREATE POLICY "Authenticated users can read own documents"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

-- Admins can manage all documents
CREATE POLICY "Admins can manage all documents"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'documents' AND public.has_role(auth.uid(), 'admin'));
