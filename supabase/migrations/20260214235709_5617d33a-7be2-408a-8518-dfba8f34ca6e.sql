
CREATE TABLE public.loan_program_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  program_id TEXT NOT NULL,
  program_name TEXT NOT NULL,
  borrower_name TEXT NOT NULL,
  borrower_email TEXT NOT NULL,
  borrower_phone TEXT NOT NULL,
  property_address TEXT,
  property_city TEXT,
  property_state TEXT,
  property_zip TEXT,
  requested_amount NUMERIC,
  loan_purpose TEXT,
  program_specific_data JSONB DEFAULT '{}'::jsonb,
  application_type TEXT DEFAULT 'loan',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.loan_program_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/public inserts (no auth required)
CREATE POLICY "Anyone can submit applications"
  ON public.loan_program_applications FOR INSERT
  WITH CHECK (true);

-- Authenticated users can view their own applications
CREATE POLICY "Users can view own applications"
  ON public.loan_program_applications FOR SELECT
  USING (auth.uid() = user_id);

-- Admin access via service role (edge functions)

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_loan_program_applications_updated_at
  BEFORE UPDATE ON public.loan_program_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
