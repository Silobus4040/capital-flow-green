
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

CREATE POLICY "Users can upload own documents" ON public.document_uploads
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own documents" ON public.document_uploads
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all documents" ON public.document_uploads
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
