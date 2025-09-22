-- Phase 1: Critical Database Security Hardening

-- 1.1 Create comprehensive audit log table for security monitoring
CREATE TABLE IF NOT EXISTS public.security_audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL, -- SELECT, INSERT, UPDATE, DELETE
  record_id UUID,
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  details JSONB DEFAULT '{}'::jsonb,
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high', 'critical'))
);

-- Enable RLS on audit logs - only admins can view
ALTER TABLE public.security_audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for audit log access - admin only
CREATE POLICY "Only admins can view audit logs" 
ON public.security_audit_logs 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- Create policy for system to insert audit logs
CREATE POLICY "System can insert audit logs" 
ON public.security_audit_logs 
FOR INSERT 
WITH CHECK (true);

-- 1.2 Create security audit function for sensitive data access
CREATE OR REPLACE FUNCTION public.audit_sensitive_data_access()
RETURNS TRIGGER AS $$
DECLARE
  current_user_id UUID;
  user_role TEXT;
BEGIN
  -- Get current user info
  current_user_id := auth.uid();
  user_role := get_current_user_role();
  
  -- Log the access attempt for sensitive tables
  IF TG_TABLE_NAME IN ('loan_program_applications', 'contact_submissions', 'referral_signups', 'profiles') THEN
    INSERT INTO public.security_audit_logs (
      user_id,
      table_name,
      operation,
      record_id,
      details,
      risk_level
    ) VALUES (
      current_user_id,
      TG_TABLE_NAME,
      TG_OP,
      COALESCE(NEW.id, OLD.id),
      jsonb_build_object(
        'user_role', user_role,
        'table_name', TG_TABLE_NAME,
        'operation', TG_OP
      ),
      CASE 
        WHEN TG_TABLE_NAME = 'loan_program_applications' THEN 'high'
        WHEN TG_TABLE_NAME IN ('contact_submissions', 'referral_signups') THEN 'medium'
        ELSE 'low'
      END
    );
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 1.3 Create triggers for audit logging on sensitive tables
CREATE TRIGGER audit_loan_applications_access
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.loan_program_applications
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_data_access();

CREATE TRIGGER audit_contact_submissions_access
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_data_access();

CREATE TRIGGER audit_referral_signups_access
  AFTER SELECT OR INSERT OR UPDATE OR DELETE ON public.referral_signups
  FOR EACH ROW EXECUTE FUNCTION public.audit_sensitive_data_access();

-- 1.4 Strengthen RLS policies for contact submissions - admin only SELECT
DROP POLICY IF EXISTS "Admins can view all contact submissions" ON public.contact_submissions;
CREATE POLICY "Only admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- 1.5 Strengthen RLS policies for referral signups - admin only SELECT  
DROP POLICY IF EXISTS "Admins can view all referral signups" ON public.referral_signups;
CREATE POLICY "Only admins can view referral signups" 
ON public.referral_signups 
FOR SELECT 
USING (get_current_user_role() = 'admin');

-- 1.6 Add enhanced security monitoring function
CREATE OR REPLACE FUNCTION public.log_suspicious_activity(
  activity_type TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  risk_level TEXT DEFAULT 'medium'
) RETURNS VOID AS $$
BEGIN
  INSERT INTO public.security_audit_logs (
    user_id,
    table_name,
    operation,
    details,
    risk_level
  ) VALUES (
    auth.uid(),
    'security_events',
    activity_type,
    details,
    risk_level
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 1.7 Create function to detect suspicious loan application access patterns
CREATE OR REPLACE FUNCTION public.check_loan_access_pattern()
RETURNS TRIGGER AS $$
DECLARE
  recent_access_count INTEGER;
  user_role TEXT;
BEGIN
  user_role := get_current_user_role();
  
  -- Check if non-admin user is accessing multiple loan applications rapidly
  IF user_role != 'admin' AND TG_OP = 'SELECT' THEN
    SELECT COUNT(*) INTO recent_access_count
    FROM public.security_audit_logs
    WHERE user_id = auth.uid()
      AND table_name = 'loan_program_applications'
      AND timestamp > now() - INTERVAL '5 minutes';
    
    -- Log suspicious activity if accessing more than 3 loan applications in 5 minutes
    IF recent_access_count > 3 THEN
      PERFORM public.log_suspicious_activity(
        'rapid_loan_access',
        jsonb_build_object(
          'access_count', recent_access_count,
          'user_role', user_role,
          'time_window', '5 minutes'
        ),
        'high'
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Apply suspicious access monitoring to loan applications
CREATE TRIGGER monitor_loan_access_patterns
  BEFORE SELECT ON public.loan_program_applications
  FOR EACH ROW EXECUTE FUNCTION public.check_loan_access_pattern();