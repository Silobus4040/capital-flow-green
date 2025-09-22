-- Fix security warning: Set search_path for existing functions
-- Update functions to have secure search_path

ALTER FUNCTION public.update_loan_status_timestamp() SET search_path = 'public';
ALTER FUNCTION public.get_current_user_role() SET search_path = 'public';
ALTER FUNCTION public.log_security_event() SET search_path = 'public';
ALTER FUNCTION public.handle_new_user() SET search_path = 'public';
ALTER FUNCTION public.update_updated_at_column() SET search_path = 'public';