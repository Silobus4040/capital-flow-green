-- Closing Bids (investor bids per application)
CREATE TABLE public.closing_bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  investor_label text NOT NULL,
  bid_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'bidded',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.closing_bids ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage bids" ON public.closing_bids FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own bids" ON public.closing_bids FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

-- Closing Messages (admin <-> borrower)
CREATE TABLE public.closing_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL,
  sender_role text NOT NULL DEFAULT 'borrower',
  message_type text NOT NULL DEFAULT 'text',
  content text,
  audio_url text,
  transcript text,
  is_read boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.closing_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage messages" ON public.closing_messages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own messages" ON public.closing_messages FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

CREATE POLICY "Borrowers can send messages" ON public.closing_messages FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid())
  );

-- Closing Checklist Items
CREATE TABLE public.closing_checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  is_completed boolean DEFAULT false,
  deadline timestamptz,
  completed_at timestamptz,
  completed_by uuid,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.closing_checklist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage checklist" ON public.closing_checklist_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own checklist" ON public.closing_checklist_items FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

-- Closing Documents
CREATE TABLE public.closing_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_url text NOT NULL,
  file_type text,
  file_size bigint,
  uploaded_by uuid NOT NULL,
  uploaded_by_role text NOT NULL DEFAULT 'borrower',
  esign_status text DEFAULT 'pending',
  esign_completed_at timestamptz,
  audit_trail jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.closing_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage documents" ON public.closing_documents FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own documents" ON public.closing_documents FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

CREATE POLICY "Borrowers can upload documents" ON public.closing_documents FOR INSERT TO authenticated
  WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid())
  );

-- Closing Payments
CREATE TABLE public.closing_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  payment_type text NOT NULL DEFAULT 'closing_cost',
  description text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  wire_reference text,
  escrow_balance numeric DEFAULT 0,
  due_date timestamptz,
  paid_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.closing_payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage payments" ON public.closing_payments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own payments" ON public.closing_payments FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

-- Draw Schedules
CREATE TABLE public.draw_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  draw_number integer NOT NULL DEFAULT 1,
  description text NOT NULL,
  requested_amount numeric NOT NULL DEFAULT 0,
  approved_amount numeric,
  status text NOT NULL DEFAULT 'pending',
  requested_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  funded_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.draw_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage draws" ON public.draw_schedules FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own draws" ON public.draw_schedules FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

CREATE POLICY "Borrowers can request draws" ON public.draw_schedules FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

-- Loan Repayments
CREATE TABLE public.loan_repayments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  payment_number integer NOT NULL DEFAULT 1,
  principal numeric NOT NULL DEFAULT 0,
  interest numeric NOT NULL DEFAULT 0,
  total_amount numeric NOT NULL DEFAULT 0,
  due_date timestamptz NOT NULL,
  paid_at timestamptz,
  status text NOT NULL DEFAULT 'upcoming',
  remaining_balance numeric DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.loan_repayments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage repayments" ON public.loan_repayments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own repayments" ON public.loan_repayments FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

-- Post Close Documents
CREATE TABLE public.post_close_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.loan_program_applications(id) ON DELETE CASCADE,
  document_type text NOT NULL DEFAULT 'final_doc',
  file_name text NOT NULL,
  file_url text NOT NULL,
  description text,
  is_archived boolean DEFAULT false,
  archived_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.post_close_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage post close docs" ON public.post_close_documents FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can view own post close docs" ON public.post_close_documents FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.loan_program_applications a WHERE a.id = application_id AND a.user_id = auth.uid()
  ));

-- Storage bucket for closing files
INSERT INTO storage.buckets (id, name, public) VALUES ('closing-files', 'closing-files', false);

CREATE POLICY "Admins can manage closing files" ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'closing-files' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'closing-files' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Borrowers can upload closing files" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'closing-files' AND auth.uid() IS NOT NULL);

CREATE POLICY "Borrowers can view own closing files" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'closing-files' AND auth.uid() IS NOT NULL);

-- Enable realtime for bids and messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.closing_bids;
ALTER PUBLICATION supabase_realtime ADD TABLE public.closing_messages;

-- Update triggers for updated_at
CREATE TRIGGER update_closing_bids_updated_at BEFORE UPDATE ON public.closing_bids
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_closing_checklist_updated_at BEFORE UPDATE ON public.closing_checklist_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_closing_payments_updated_at BEFORE UPDATE ON public.closing_payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_draw_schedules_updated_at BEFORE UPDATE ON public.draw_schedules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();