
CREATE TABLE public.borrower_logins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  fingerprint_id text,
  user_agent text,
  ip_address text,
  logged_in_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.borrower_logins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all logins" ON public.borrower_logins
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can insert own logins" ON public.borrower_logins
FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());
