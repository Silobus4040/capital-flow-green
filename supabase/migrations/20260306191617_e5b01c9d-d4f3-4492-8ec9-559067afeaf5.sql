
-- 1. Fix verify_loan_id: remove user_id IS NULL restriction
CREATE OR REPLACE FUNCTION public.verify_loan_id(_email text, _loan_id text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.loan_program_applications
    WHERE borrower_email = _email AND loan_id = _loan_id
  )
$$;

-- 2. New function to link application and return details (bypasses RLS)
CREATE OR REPLACE FUNCTION public.link_application_to_user(
  _email text, _loan_id text, _user_id uuid
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _app record;
BEGIN
  UPDATE public.loan_program_applications
  SET user_id = _user_id
  WHERE borrower_email = _email AND loan_id = _loan_id
  RETURNING borrower_name, requested_amount, property_address,
    program_name, created_at, property_city, property_state
  INTO _app;

  IF NOT FOUND THEN RETURN NULL; END IF;

  RETURN jsonb_build_object(
    'borrower_name', _app.borrower_name,
    'requested_amount', _app.requested_amount,
    'property_address', _app.property_address,
    'property_city', _app.property_city,
    'property_state', _app.property_state,
    'program_name', _app.program_name,
    'created_at', _app.created_at
  );
END;
$$;
