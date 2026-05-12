
CREATE TABLE public.signup_otps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  code_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  attempts int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX idx_signup_otps_email ON public.signup_otps(email);
ALTER TABLE public.signup_otps ENABLE ROW LEVEL SECURITY;
-- No policies = service role only
